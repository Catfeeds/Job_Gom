/**
 * 找回门店密码
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var check = require('utils/check');
var storeTip = require('module/i18n');

var $storeList = $('[data-node=storeList]');
var $storeLi = $storeList.find('li');
var $storeName = $storeList.find('[data-node=storeName]');
var $phone = $storeList.find('[data-node=phone]');
var $nameTip = $storeList.find('[data-node=nameTip]');
var $phoneTip = $storeList.find('[data-node=phoneTip]');
var $errorTip = $storeList.find('[data-node=errorTip]');
var $okTip = $storeList.find('[data-node=okTip]');
var $reset = $('[data-action=reset]');

var hide = 'hide';
var ok = 'iconn-20';
var borderLine = 'lg-form-error';
$phone.attr({
    maxlength: '11'
});

var emptyInput = function(name) {
    name.text('');
    hideBorder(name);
};

var showOkTip = function(name) {
    name.parent($storeLi).find($okTip).addClass(ok);
};

var hideOkTip = function(name) {
    name.parent($storeLi).find($okTip).removeClass(ok);
};

var showBorder = function(name) {
    name.parent($storeLi).addClass(borderLine);
};

var hideBorder = function(name) {
    name.parent($storeLi).removeClass(borderLine);
};

//验证门店账号
var validateName = function() {
    var val = $.trim($storeName.val());
    var reg = /^[0-9a-zA-Z]+$/;
    var ret = true;
    if (val === '') {
        ret = false;
        $nameTip.text('请输入帐号');
        showBorder($nameTip);
    } else if (!reg.test(val)) {
        ret = false;
        $nameTip.text('门店帐号格式错误');
        showBorder($nameTip);
    } else {
        emptyInput($storeName);
        showOkTip($storeName);
    }
    return ret;
};

//验证手机号
var validatePhone = function() {
    var val = $.trim($phone.val());
    var ret = true;
    if (val === '') {
        ret = false;
        $phoneTip.text(storeTip.tel.ept);
        showBorder($phoneTip);
    } else if (!check.isMobileNum(val)) {
        ret = false;
        $phoneTip.text(storeTip.tel.err);
        showBorder($phoneTip);
    } else {
        emptyInput($phone);
        showOkTip($phone);
    }
    return ret;
};

//验证门店账号和手机号
var validate = function() {
    var ret = true;
    if (!validateName()) {
        ret = false;
    } else if (!validatePhone()) {
        ret = false;
    }
    return ret;
};

//重置
var flag = false;
var changePwd = function() {
    if (validate()) {
        if (flag) {
            return;
        }
        flag = true;
        $reset.text('重置中…');
        fetch.get(url.get('storePwd'), {
            data: {
                carid: $storeName.val(),
                mobile: $phone.val()
            }
        }).done(function(data) {
            $reset.text('重置');
            if (data.success === true) {
                location.href = $_CONFIG['passport_domain'] + "shop/result";
            } else {
                $errorTip.removeClass(hide).find('span').text(data.message);
            }
        }).fail(function(data) {
            $errorTip.removeClass(hide).find('span').text(data.message);
        }).always(function() {
            flag = false;
        });
    }
    return false;
};

var init = function() {
    $storeName.on({
        blur: validateName,
        focus: function() {
            emptyInput($nameTip);
            hideOkTip($storeName);
        }
    });
    $phone.on({
        blur: validatePhone,
        focus: function() {
            emptyInput($phoneTip);
            hideOkTip($phone);
        }
    });
    $reset.on('click', changePwd);
};

module.exports = {
    init: init
};