var fetch = require('io/fetch');
var url = require('io/url');
var qrCodeLogin = require('./qrCodeLogin');
var crypto = require('module/encrypt');
var loginCallback = require('./loginCallback');
var truncate = require('utils/truncate');
//验证表单
var checkForm = require('./checkForm');
//更新校验码
var changeCaptcha = require('./changeCaptcha');
require('placeholder');

var CaptchaUrl = url.get('ajaxCaptcha') + '?setid=';
var cookieVal = $_CONFIG.prefix + "userId";
var passDomain = $_CONFIG.passport_domain;
CaptchaUrl = passDomain + CaptchaUrl + 'login&t=';

var opts, // 登录配置选项
    popLayer; //父级节点

var screenWidth = screen.width,
    screenHeight = screen.height;

var userForm = "",
    userNum = "",
    userPwd = "",
    errorLi = "",
    errMes = "",
    userLogin = "",
    loginDom = "",
    identifyPlace = "",
    changeCode = "",
    valCode = "",
    emptyUser = "",
    emptyPwd = "",
    $oauth, // 第三方登录区域的父节点
    firing = false;

$(document).keydown(function(e) { //键盘enter事件
    if (e && e.keyCode == 13 && userForm.length) {
        userLogin.trigger("click");
        return false;
    }
});

function initNodes(o) {
    userForm = o.find('[data-node=userForm]');
    userNum = userForm.find($('[data-node=userNum]'));
    userPwd = userForm.find($('[data-node=userPwd]'));
    errorLi = userForm.find($('[data-node=error]'));
    errMes = errorLi.find($('[data-node=error-message]'));
    userLogin = userForm.find($('[data-node=userLogin]'));
    loginDom = userLogin.find('span');
    identifyPlace = $('[data-node=identifyplace]');
    changeCode = $('[data-node=change-code]');
    valCode = $('[data-node=code]');
    emptyUser = userForm.find('[data-node=emptyUser]');
    emptyPwd = userForm.find('[data-node=emptyPwd]');
    $oauth = userForm.find('[data-node=oauth]');
    firing = false;
    setTimeout(function() {
        userNum.placeholder();
        userPwd.placeholder();
    }, 100)
}

function openWinArg(w, h) {
    var left = (screenWidth - w) / 2,
        top = (screenHeight - h) / 2;
    return 'width=' + w +
        ',height=' + h +
        ',top=' + top +
        ',left=' + left;

}

function selfOpenWindow(src, cookieName, exp) {
    var arg = openWinArg(800, 500);
    var openWin = window.open(src, "", arg, true);
    var t = setInterval(function() {
        if ($.cookie(cookieVal) && $.cookie(cookieName) == exp) {
            clearInterval(t);
            openWin.close();
            loginCallback.init(popLayer, opts);
        }
    }, 200);
    return false;
}

function thirdLogin() { //第三方 登录检测cookie
    var src = this.getAttribute("href");
    var arg = openWinArg(800, 500);
    var openWin = window.open(src, "", arg, true);
    var t = setInterval(function() {
        if ($.cookie(cookieVal)) {
            clearInterval(t);
            openWin.close();
            loginCallback.init(popLayer, opts);
        }
    }, 200);
    return false;
}
//错误提示
function showError(msg) {
    errorLi.removeClass('none');
    errMes.text(msg);
}

//后台交互  
function login() {
    if (!checkForm(userForm)) {
        return;
    }
    if (firing) { // 提交中
        return;
    }
    firing = true;
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
        setid: "login",
        verifyCode: verifyCode,
        csrf_token: $_CONFIG.csrf_token
    };
    loginDom.text("登录中...");
    fetch.post(url.get('ajaxLoginData'), {
        async: false,
        data: loginData,
        headers: {
            'Content-Type-Ctag': $.cookie('content_ctag') || ''
        }
    }).done(function(json) {
        loginDom.text('登录');
        if (json && json.success) {
            var aliasData = json.data;
            if (aliasData.user.isMobileActivated == false) {
                window.location.href = passDomain + "login/bindphonepage";
                // window.location.href = "/login/bindphonepage";
                return false;
            }

            if (aliasData.isNeedReset == true) { //修改重复昵称
                var _url = passDomain + "regist/indexnickname";
                selfOpenWindow(_url, 'temp_nick_name', 'true');
                return false;
            }

            loginCallback.init(popLayer, opts);
        } else {
            if (json.data.is_code == 1) {
                changeCaptcha(identifyPlace, valCode, changeCode);
            }
            showError(json.message);
        }
    }).always(function() {
        firing = false;
    });
    return false;
}
/*
//表单验证
function checkForm() {
    var ret = true;
    if (userNum.val() === "") { //账号为空
        showError('请输入账号');
        setWarnStyle(userNum);
        ret = false;
    } else if (userPwd.val() === "") { //密码为空
        showError('请输入密码');
        setWarnStyle(userPwd);
        ret = false;
    } else if (valCode.is(":visible") && valCode.val() == "") {
        showError('请输入验证码');
        ret = false;
    }
    return ret;
}

*/
/*
//更新验证码
function changeCaptcha() {

    identifyPlace.removeClass("none")
        .find('.code-img')
        .attr('src', CaptchaUrl + new Date().getTime());

    valCode.val('');
    changeCode.blur();
}
*/

//事件绑定
function init(pa, opt) {
    var o = $(pa._$('content'));
    opts = opt || {};
    initNodes(o); // 初始化节点
    popLayer = pa;
    userLogin.on("click", login);

    userForm
        .on('focusin', function(e) {
            var Target = $(e.target).attr('data-node');
            switch (Target) {
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
                    changeCaptcha(identifyPlace, valCode, changeCode);
                    break;
            }
            return false;
        })
        .on('focusout', function(e) {
            var Target = $(e.target).attr('data-node');
            switch (Target) {
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
            return false;
        })

    userNum.on("keyup", function() { //账户keyup事件
        isEmpty(userNum, emptyUser);
    });

    userPwd.on("keyup", function() { //账户keyup事件
        isEmpty(userPwd, emptyPwd);
    });

    emptyUser.on("click", function() {
        emptyInfo(userNum, emptyUser);
    });
    emptyPwd.on("click", function() {
        emptyInfo(userPwd, emptyPwd);
    });

    valCode.on('textchange', function() {
        var node = $(this);
        if (node.val().length > 4) {
            node.val(truncate(node.val(), 4));
        }
    })

    $oauth.on('click', '[data-node=openid]', thirdLogin);

    qrCodeLogin.init(userForm, opts, pa);
}
//事件解绑 destory 
//function destroy(o) {
function destroy() {
    // var o = $(pa._$('content')); //备用
    userForm.off();
    userNum.off();
    userPwd.off();
    errorLi.off();
    errMes.off();
    userLogin.off();
    loginDom.off();
    identifyPlace.off();
    changeCode.off();
    valCode.off();
    emptyUser.off();
    emptyPwd.off();
    $oauth.off();
    valCode.off();
}

function emptyInfo(obj, $target) {
    obj.val('');
    $target.addClass('none');
}

function isEmpty(obj, $target) {
    if (obj.val() !== "") {
        $target.removeClass('none');
    } else {
        $target.addClass('none');
    }
}

//设置样式
function setStyle(obj) {
    obj.parent().removeClass("land-error-it").addClass("land-focus");
    errorLi.addClass('none');
}

//移除样式
function removeStyle(obj) {
    obj.parent().removeClass("land-focus");
}

function setWarnStyle(obj) {
    obj.parent().addClass('land-error-it');
}

module.exports = {
    init: init,
    destroy: destroy
};