/**
 * Created by haosong on 2016/5/24.
 */
/*获取输入信息*/
var crypto = require('utils/crypto');
var fetch = require('io/fetch');
var url = require('io/url');
var qrCodeLogin = require('./qrCodeLogin');
require('placeholder');
var qqSrcfStr = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=" 
				+ $GLOBAL_CONFIG['qqid']
				+ "&redirect_uri=https://passport-pre.gomeplus.com/"
				+ $GLOBAL_CONFIG['current_url']
				+ "/qqcallback";

var userForm = "",
	userNum = "",
	userPwd = "",
	errorLi = "",
	errMes = "",
	userLogin = "",
	loginDom  = "",
	identifyPlace = "",
	changeCode = "",
	valCode = "",
	emptyUser = "",
	emptyPwd = "",
	qqHref  = "",
	flag = true;		

$(document).keydown(function(e) { //键盘enter事件
	if (e && e.keyCode == 13 && userForm.length) {
		fetchEnt();
		return false;
	}
});
$(document).delegate('[data-node=userForm]','keydown',function(e){
	if (e && e.keyCode == 13 ) {
		fetchEnt();
		return false;
	}
})
	
function nodeInit(o) {
		userForm = o.find('[data-node=userForm]');
		userNum = userForm.find($('[data-node=userNum]'));
		userPwd = userForm.find($('[data-node=userPwd]'));
		errorLi = userForm.find($('[data-node=error]'));
		errMes = errorLi.find($('[data-node=error-message]'));
		userLogin = userForm.find($('[data-node=userLogin]'));
		loginDom  = userLogin.find('span');
		identifyPlace = $('[data-node=identifyplace]');
		changeCode = $('[data-node=change-code]');
		valCode = $('[data-node=code]');
		emptyUser = userForm.find('[data-node=emptyUser]');
		emptyPwd = userForm.find('[data-node=emptyPwd]');
		qqHref  = userForm.find('[data-node=qq-href]');
		flag = true;		
	qqHref.attr('href',qqSrcfStr);	
	userNum.placeholder();
	userPwd.placeholder();
}
	//错误提示
function showError(msg){
	errorLi.removeClass('none');
	errMes.text(msg);
}
	
	//后台交互	
function fetchEnt() {
	if( !checkForm() ) return false;
	var verifyCode = valCode.val();
	if (!identifyPlace.hasClass('none')) {
		if (verifyCode == "") {
			valCode.css('border', '1px solid #f95353');
			return;
		}
	}
	var loginDa = {
		loginName: userNum.val(),
		password: encodeURIComponent(crypto(userPwd.val())),
		verifyCode: verifyCode

	};
	if (flag == false) {
		return false;
	}
	flag = false;
	loginDom.text("登录中...");
	fetch.post(url.get('loginData'), {
		data: loginDa
	}).done(function(da) {
		loginDom.text('登录');
		if (da.success) {
			if (da.data.mobileActivated == "N") {
				window.location.href = "/login/bindphonepage";
				return false;
			}
			window.location.href = window.location;
		} else {
			if (da.data.errorNum < 3) {
				showError(da.message);
				identifyPlace.addClass('none');
			} else {
				identifyPlace.removeClass('none');
				if (valCode.val() == "") {
					showError('请输入验证码');	
				} else {
					showError(da.message);
				}
				identifyPlace.find('.code-img').attr('src', "/login/captcha?t=" + new Date().getTime());
				valCode.val('');
			}
		}
	}).always(function() {
		flag = true;
	});
}

	//表单验证
function checkForm() {		
	if (userNum.val() === "") { //账号都为空
		showError('请输入账号');
		setWarnStyle(userNum);
		return false;
	} else if (userPwd.val() === "") { //密码为空
		showError('请输入密码');
		setWarnStyle(userPwd);
		return false;
	} else if (valCode.is(":visible") && valCode.val() == "") {
		showError('请输入验证码');
		return false;
	}else { //账号密码都输入的情况下
		return true;
	}
};
//事件绑定
function init(o) {
	nodeInit(o);	
	userLogin.on("click", function(e) { // 登录点击事件
		fetchEnt();
		return false;
	});
	userForm
		.on('focusin',function(e){
			var Target = $(e.target).attr('data-node');
			switch(Target) {
				case 'userNum':
					setStyle(userNum);
					break;
				case 'userPwd':
					setStyle(userPwd);
					break;
				case 'code':
					valCode.addClass('land-focus');
					break;	
				case 'change-code':
					identifyPlace.find('.code-img').attr('src', "/login/captcha?t=" + new Date().getTime());
					valCode.val('');
					changeCode.blur();
					break;
			}
		})
		.on('focusout',function(e){
			var Target = $(e.target).attr('data-node');
			switch(Target) {
				case 'userNum':
					removeStyle(userNum);
					break;
				case 'userPwd':
					removeStyle(userPwd);
					break;
				case 'code':
					valCode.removeClass('land-focus');
					break;	
			}
		})

	userNum.on("keyup", function() { //账户keyup事件
		isEmpty(userNum,emptyUser);
	});

	userPwd.on("keyup", function() { //账户keyup事件
		isEmpty(userPwd,emptyPwd);
	});

	emptyUser.on("click", function() {
		emptyInfo(userNum,emptyUser);
	});
	emptyPwd.on("click", function() {
		emptyInfo(userPwd,emptyPwd);
	});
	
	qrCodeLogin.init(userForm);
};
//事件解绑 destory 
function des(o){ 
	nodeInit(o);
	userForm.unbind();
	userNum.unbind();
	userPwd.unbind();
	errorLi.unbind();
	errMes.unbind();
	userLogin.unbind();
	loginDom.unbind();
	identifyPlace.unbind();
	changeCode.unbind();
	valCode.unbind();
	emptyUser.unbind();
	emptyPwd.unbind();
}

function emptyInfo(obj,$target) {
	obj.val('');
	$target.addClass('none');
};
function isEmpty(obj,$target) {
	if (obj.val() !== "") {
		$target.removeClass('none');
	} else {
		$target.addClass('none');
	}
};

//设置样式
function setStyle(obj) {
	obj.parent().removeClass("land-error-it").addClass("land-focus");
	errorLi.addClass('none');
};

//移除样式
 function removeStyle(obj) {
	obj.parent().removeClass("land-focus");
};
 function setWarnStyle(obj) {
	obj.parent().addClass('land-error-it');
};
	
module.exports = {
    init: init,
	des: des
};
