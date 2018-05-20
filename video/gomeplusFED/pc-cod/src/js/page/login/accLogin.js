var fetch = require('io/fetch');
var url = require('io/url');
var crypto = require('module/encrypt');

var userForm = $('[data-node=userForm]');
var userNum = userForm.find($('[data-node=userNum]'));
var userPwd = userForm.find($('[data-node=userPwd]'));
var errorLi = userForm.find($('[data-node=error]'));
var userLogin = userForm.find($('[data-node=userLogin]'));
var identifyPlace = $('[data-node=identifyplace]');
var changeCode = $('[data-node=change-code]');
var valCode = $('[data-node=code]');
var emptyUser = userForm.find('[data-node=emptyUser]');
var emptyPwd = userForm.find('[data-node=emptyPwd]');
var flag = true;
require('placeholder');
userNum.placeholder();
userPwd.placeholder();


//表单验证
var checkForm = function() {
    if (userNum.val() === "") { //账号都为空
        errorLi.removeClass('none').find('span').text("请输入账号");
        setWarnStyle(userNum);
        return false;
    } else if (userPwd.val() === "") { //密码为空
        errorLi.removeClass('none').find('span').text("请输入密码");
        setWarnStyle(userPwd);
        return false;
    } else { //账号密码都输入的情况下
        var verifyCode = valCode.val();
        if (!identifyPlace.hasClass('none')) {
            if (verifyCode == "") {
                valCode.css('border', '1px solid #f95353');
                return;
            }
        }
        var loginData = {
            login_name: userNum.val(),
            password: crypto(userPwd.val()),
            verifyCode: verifyCode,
            csrf_token: $GLOBAL_CONFIG.csrf_token
        };
        if (flag == false) {
            return false;
        }
        flag = false;
        userLogin.find('span').text("登录中...");
        fetch.post(url.get('loginData'), {
            data: loginData,
            headers: {
                'Content-Type-Ctag': $.cookie('content_ctag') || ''
            }
        }).done(function(da) {
            userLogin.find('span').text('登录');
            if (da.success) {
				var data = da.data;
                if (data.user.isMobileActivated == false) {
                    window.location.href = "/login/bindphonepage";
                    return false;
                }
				if (data.isNeedReset) {
					window.location.href = "/regist/indexnickname"; //跳到完善昵称页
					return false;
				}
                window.location.href = $GLOBAL_CONFIG['redirect'];
            } else {
				errorLi.removeClass('none').find('span').text(da.message);
				/*
                if (da.data.errorNum < 3) {
                    errorLi.removeClass('none').find('span').text(da.message);
                    identifyPlace.addClass('none');
                } else if (da.data.errorNum >= 3) {
                    identifyPlace.removeClass('none');
                    if (valCode.val() == "") {
                        errorLi.removeClass('none').find('span').text('请输入验证码');
                        identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
                        valCode.val('');
                    } else if (valCode.val() != "") {
                        errorLi.removeClass('none').find('span').text(da.message);
                        identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
                        valCode.val('');
                    }
                }
				*/
            }
        }).always(function() {
            flag = true;
        });
    }
};
//绑定事件
var fireEvent = function() {
    $(document).keydown(function(e) { //键盘enter事件
        if (e && e.keyCode == 13) {
            e.preventDefault();
            checkForm();
        }
    });
    userLogin.on("click", function(e) { // 登录点击事件
        e.preventDefault();
        checkForm();
    });
    userNum.on("focus", function() { //账户focus事件
        setStyle($(this));
    });
    userNum.on("keyup", function() { //账户keyup事件
        isEmpty(userNum);
    });
    userNum.on("blur", function() { //账户blur事件
        removeStyle($(this));
    });
    userPwd.on("focus", function() { //密码focus事件
        setStyle($(this));
    });
    userPwd.on("blur", function() { //密码blur事件
        removeStyle($(this));
    });
    userPwd.on("keyup", function() { //账户keyup事件
        isEmpty(userPwd);
    });
    valCode.on('focus', function() { //验证码获取焦点事件
        valCode.css('border', '1px solid #e5e5e5');
    });
    changeCode.on("click", function() {
        identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
        valCode.val('');
    });
    emptyUser.on("click", function() {
        emptyInfo(userNum);
    });
    emptyPwd.on("click", function() {
        emptyInfo(userPwd);
    });
};
var emptyInfo = function(obj) {
    obj.val('');
    obj.parent().find('em').addClass('none');
};
var isEmpty = function(obj) {
    if (obj.val() !== "") {
        obj.parent().find('em').removeClass('none');
    } else {
        obj.parent().find('em').addClass('none');
    }
};

//设置样式
var setStyle = function(obj) {
    obj.parent().removeClass("land-error-it").addClass("land-focus");
    errorLi.addClass('none');
};
//移除样式
var removeStyle = function(obj) {
    obj.parent().removeClass("land-focus");
};
var setWarnStyle = function(obj) {
    obj.parent().addClass('land-error-it');
};

module.exports = {
    init: fireEvent
};
