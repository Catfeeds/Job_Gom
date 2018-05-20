/**
 * author: qiaoli
 */
var Pubsub = require('io/pubsub');
var check = require('utils/check');
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var uploadFace = require('./uploadFace');

var $companyInfo = $('[data-node=companyInfo]');
var $companyName = $companyInfo.find('[data-node=companyName]');
var $licenseNum = $companyInfo.find('[data-node=licenseNum]');
var $userName = $companyInfo.find('[data-node=userName]');
var $tipsCompanyName = $companyInfo.find('[data-node=tipsCompanyName]');
var $userName = $companyInfo.find('[data-node=userName]');
var $userId = $companyInfo.find('[data-node=userId]');
var $tipsLicense = $companyInfo.find('[data-node=tipsLicense]');
var $uploadBox = $companyInfo.find('[data-node=uploadBox]');
var $tipsPic = $companyInfo.find('[data-node=tipsPic]');
var $tipsUserName = $companyInfo.find('[data-node=tipsUserName]');
var $tipsUserId = $companyInfo.find('[data-node=tipsUserId]');
var $phone = $companyInfo.find('[data-node=phone]');
var $email = $companyInfo.find('[data-node=email]');
var $tipsPhone = $companyInfo.find('[data-node=tipsPhone]');
var $tipsEmail = $companyInfo.find('[data-node=tipsEmail]');
var $save = $('[data-node=save]');
var $back = $('[data-node=back]');

var error = 'right-error';
var cont= 'continue'

var arr;
var type;
var nameDefault = '需与当地政府颁发的商业许可证书或企业注册证上的企业名称完全一致，信息审核审核成功后，企业名称不可修改';
var nameError = '请输入正确的企业名称，2-60字以内';

//过滤空格
var checkSpace = function(val) {
    return val.replace(/\s+/g, '');
};

//判断页面状态(创建/编辑)
var isState = function(){
    $($companyInfo.find('input:not([data-node=email])')).each(function(i,v){
        if($(v).val()!=''){
            arr = [1, 1, 1, 1, 1, 1];
            type = 'edit';
        }else {
            arr = [0, 0, 0, 0, 0, 0];
            type = 'create';
        }
    })
}

//验证企业名称
var validateCompanyName = function() {
	var rule = /^([\u4e00-\u9fa5]{2,60})$/;
    var valOld = $companyName.val();
    var val = checkSpace(valOld);
    $companyName.val(val);
    var ret = true;
    if (!rule.test(val)) {
        ret = false;
        $tipsCompanyName.addClass(error);
        $tipsCompanyName.html(nameError);
        arr[0] = 0;
    } else {
        $tipsCompanyName.removeClass(error);
        arr[0] = 1;
    }
    return ret;
}

//验证营业执照注册号
var validateLicenseNum = function() {
    var rule = /^([A-Z]*\d+[A-Z]*)+$/;
    var valOld = $licenseNum.val();
    var val = checkSpace(valOld);
    var len = val.length;
    $licenseNum.val(val);
    var ret = true;
    if (!rule.test(val) || (len!==15 && len!==18)) {
        ret = false;
        $tipsLicense.addClass(error);
        arr[1] = 0;
    } else {
        $tipsLicense.removeClass(error);
        arr[1] = 1;
    }
    return ret;
}

//验证姓名
var validateUserName = function() {
    var valOld = $userName.val();
    var val = checkSpace(valOld);
    $userName.val(val);
    var rule = /^([\u4e00-\u9fa5]|[a-zA-Z·])+$/;
    var ret = true;
    if (!rule.test(val)) {
        ret = false;
        $tipsUserName.addClass(error);
        arr[3] = 0;
    } else {
        $tipsUserName.removeClass(error);
        arr[3] = 1;
    }
    return ret;
}

//验证身份证号
var validateUserId = function() {
    var valOld = $userId.val();
    var val = checkSpace(valOld);
    $userId.val(val);
    var ret = true;
    if (!check.isCertificate(val)) {
        ret = false;
        $tipsUserId.addClass(error);
        arr[4] = 0;
    } else {
        $tipsUserId.removeClass(error);
        arr[4] = 1;
    }
    return ret;
}

//验证联系人电话
var validatePhone = function() {
    var valOld = $phone.val();
    var val = checkSpace(valOld);
    $phone.val(val);
    var ret = true;
    if (!check.isMobileNum(val)) {
        ret = false;
        $tipsPhone.addClass(error);
        arr[5] = 0;
    } else {
        $tipsPhone.removeClass(error);
        arr[5] = 1;
    }
    return ret;
}

//判断按钮状态
var isSuccess = function() {
    if (arr.indexOf(0) == -1) {
        $save.parent().addClass(cont);
    } else {
        $save.parent().removeClass(cont);
    }
}

//获取数据
var getData = function() {
    var data = {
        enterpriseName: $companyName.val(),
        businessLicenseNumber: $licenseNum.val(),
        businessLicenseImageUrl: $uploadBox.find('img').attr('src'),
        operatorName: $userName.val(),
        operatorIDNumber: $userId.val(),
        operatorPhone: $phone.val(),
        contactInformation: $email.val()
    }
    return data;
}

//验证营业执照上传
Pubsub('upload').sub(function(data){
    if(data === 1){
        $tipsPic.removeClass(error);
        arr[2] = 1;
    }else {
        $tipsPic.addClass(error);
        arr[2] = 0;
    }
    isSuccess();
});

var saveData = function(){
	var urlStr = {
		create: url.get('createCompany'),
        edit: url.get('editCompany')
	}
    fetch.post(urlStr[type],{
        data: getData()
    }).done(function(data){
        if(data.success === true){
             window.onbeforeunload = null;
             window.location.href = '/account/perfectCompany'
        } else {
            alert(data.message);
        }
    }).fail(function(data){
        alert(data.message);
    })
}

var init = function() {
    isState();
    isSuccess();
    $companyName.on('blur', function() {
        validateCompanyName();
        isSuccess();
    });
    $licenseNum.on('blur', function() {
        validateLicenseNum();
        isSuccess();
    });
    $userName.on('blur', function() {
        validateUserName();
        isSuccess();
    });
    $userId.on('blur', function() {
        validateUserId();
        isSuccess();
    });
    $phone.on('blur', function() {
        validatePhone();
        isSuccess();
    });
    $companyName.on('focus', function() {
    	$tipsCompanyName.html(nameDefault);
        $tipsCompanyName.removeClass(error);
    });
    $licenseNum.on('focus', function() {
        $tipsLicense.removeClass(error);
    });
    $userName.on('focus', function() {
        $tipsUserName.removeClass(error);
    });
    $userId.on('focus', function() {
        $tipsUserId.removeClass(error);
    });
    $phone.on('focus', function() {
        $tipsPhone.removeClass(error);
    });
    $email.on('focus', function() {
        $tipsEmail.removeClass(error);
    });

    $save.on('click', function() {
        if($(this).parent().hasClass(cont)){
            saveData();
        }else {
            return false
        }
    })
    uploadFace.init();
    window.onbeforeunload = function() {
        return ''
    }
}

init();
