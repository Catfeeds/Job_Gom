/**
 * Created by dongyukuan on 2016/5/23.
 */
var trim = require("utils/trim");
var getCount = require("utils/pwdStrength");
var limitLen = require("utils/limitLen");
var check = require('utils/check');
var fetch = require('io/fetch');
var url = require("io/url");
var inputTip = require("module/i18n");
var encrypt = require("module/encrypt");
require('placeholder');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('newPwd');

var forgetPwdStepThree = $('[data-node="forgetPwdStepThree"]');

var pwd = forgetPwdStepThree.find('[data-node="pwd"]');
var surePwd = forgetPwdStepThree.find('[data-node="surePwd"]');

var rightTip = forgetPwdStepThree.find('[data-node=rightTip]');
var sureRightTip = forgetPwdStepThree.find('[data-node=sureRightTip]');

var errorBorderPwd = forgetPwdStepThree.find('[data-node="errorBorderPwd"]');
var errorBorderSurePwd = forgetPwdStepThree.find('[data-node="errorBorderSurePwd"]');

var pwdTip = forgetPwdStepThree.find('[data-node="pwdTip"]');
var errorPwd = forgetPwdStepThree.find('[data-node="errorPwd"]');
var errorSurePwd = forgetPwdStepThree.find('[data-node="errorSurePwd"]');

var sureBtn = forgetPwdStepThree.find('[data-action="sureBtn"]');

var publicErr = forgetPwdStepThree.find('[data-node=publicErr]');
var publicErrBox = forgetPwdStepThree.find('[data-node=publicErrBox]');

var loFormErr = 'lg-form-error';
var hideCls = 'hide';
var noneCls = 'none';
var pwdWeak = "level-weak";
var pwdMd = "level-md";
var pwdStrong = "level-strong";

var pwdFoc = function() {
    errorPwd.text(inputTip.pwd.commonTip).css('color', "#f95353");
    rightTip.addClass(hideCls);
    publicErrBox.addClass(noneCls);
};
var pwdBlur = function() {
    var pwdVal = pwd.val();
    var pwdCount = getCount(pwdVal);
    if (pwdVal.length === 0) {
        errorBorderPwd.addClass(loFormErr);
        errorPwd.show().text(inputTip.pwd.commonTip).css('color', "#f95353");
        rightTip.addClass(hideCls);
        return false;
    }
    if (!check.passwordReg(pwdVal) || check.checkSpace(pwdVal)) {
        errorBorderPwd.addClass(loFormErr);
        errorPwd.show().text(inputTip.pwd.commonTip);
        rightTip.addClass(hideCls);
        return false;
    }
    if (pwdCount < 27) {
        errorBorderPwd.addClass(loFormErr);
        errorPwd.show().text(inputTip.pwd.commonTip);
        rightTip.addClass(hideCls);
        return false;
    } else {
        rightTip.removeClass(hideCls);
        errorBorderPwd.removeClass(loFormErr);
        errorPwd.hide().text('');
    }
};
var pwdKeyup = function() {
    var pwdVal = pwd.val();
    var surePwdVal = surePwd.val();
    var len = pwd.val().length;
    var pwdLevelSpan = pwdTip.find('span');
    // pwdTip.removeClass(hideCls);
    if (len > 20) {
        pwd.val(limitLen(pwd.val(), 20));
    }
    var score = getCount(pwdVal);
    errorBorderPwd.removeClass(loFormErr);
    if (score > 27 && check.passwordReg(pwdVal) && !check.checkSpace(pwdVal)) {
        pwdTip.removeClass(hideCls);
        errorPwd.hide();
    } else {
        errorPwd.show().text(inputTip.pwd.commonTip);
        return false;
    }
    if (score < 60) {
        pwdLevelSpan.eq(0).addClass(pwdWeak);
        pwdLevelSpan.eq(1).removeClass(pwdMd);
        pwdLevelSpan.eq(2).removeClass(pwdStrong);
    } else if (score >= 60 && score < 80) {
        pwdLevelSpan.eq(0).removeClass(pwdWeak);
        pwdLevelSpan.eq(1).addClass(pwdMd);
        pwdLevelSpan.eq(2).removeClass(pwdStrong);
    } else {
        pwdLevelSpan.eq(0).removeClass(pwdWeak);
        pwdLevelSpan.eq(1).removeClass(pwdMd);
        pwdLevelSpan.eq(2).addClass(pwdStrong);
    }
    if (surePwdVal !== "") {
        if (surePwdVal !== pwdVal) {
            errorBorderSurePwd.addClass(loFormErr);
            errorSurePwd.text(inputTip.pwdV.err);
            sureRightTip.addClass(hideCls);
        } else {
            errorBorderSurePwd.removeClass(loFormErr);
            errorSurePwd.text('');
            sureRightTip.removeClass(hideCls);

        }
    }
};
var sPwdBlur = function() {
    var pwdVal = pwd.val();
    var surePwdVal = surePwd.val();
    if (surePwdVal.length === 0) {
        sureRightTip.addClass(hideCls);
        return false;
    }
    if (errorBorderPwd.hasClass(loFormErr)) {
        sureRightTip.addClass(hideCls);
        return false;
    }
    if (pwdVal !== surePwdVal) {
        errorBorderSurePwd.addClass(loFormErr);
        errorSurePwd.text(inputTip.pwdV.err);
        sureRightTip.addClass(hideCls);
    } else {
        errorBorderSurePwd.removeClass(loFormErr);
        errorSurePwd.text('');
        sureRightTip.removeClass(hideCls);
    }
};
var sPwdKeyup = function() {
    publicErrBox.addClass(noneCls);
    var len = (surePwd.val()).length;
    if (len > 20) {
        surePwd.val(limitLen(surePwd.val(), 20));
    }
};
var submit = function() {
    var pwdVal = trim(pwd.val());
    var surePwdVal = trim(surePwd.val());
    // var pwdData = { 'newPassword': encodeURIComponent(encrypt.encrypt($.trim(pwd.val())).toString()) };
    var pwdEncrypt = encrypt(pwdVal);
    var pwdData = {
        // 'newPassword': encodeURIComponent($.trim(pwd.val()))
        'newPassword': pwdEncrypt
    };
    publicErrBox.addClass(noneCls);
    if (!pwdVal && !surePwdVal) {
        errorPwd.text(inputTip.pwd.commonTip);
        errorBorderPwd.addClass(loFormErr);
        rightTip.addClass(hideCls);
        errorSurePwd.text(inputTip.pwdV.ept);
        errorBorderSurePwd.addClass(loFormErr);
        sureRightTip.addClass(hideCls);
        return false;
    }
    if (!pwdVal) {
        errorPwd.text(inputTip.pwd.commonTip);
        errorBorderPwd.addClass(loFormErr);
        rightTip.addClass(hideCls);
        return false;
    } else if (errorBorderPwd.hasClass(loFormErr)) {
        return false;
    } else {
        errorPwd.text('');
        errorBorderPwd.removeClass(loFormErr);
    }
    if (!surePwdVal) {
        errorSurePwd.text(inputTip.pwdV.ept);
        errorBorderSurePwd.addClass(loFormErr);
        sureRightTip.addClass(hideCls);
        return false;
    } else {
        errorSurePwd.text('');
        errorBorderSurePwd.removeClass(loFormErr);
        sureRightTip.removeClass(hideCls);
    }
    if (surePwdVal !== pwdVal) {
        errorBorderSurePwd.addClass(loFormErr);
        errorSurePwd.text(inputTip.pwdV.err);
        sureRightTip.addClass(hideCls);
    } else {
        fetch.post(url.get('passwordReset'), {
            "data": pwdData
        }).done(function(data) {
            if (data.success) {
                errorBorderSurePwd.removeClass(loFormErr);
                errorBorderPwd.removeClass(loFormErr);
                errorSurePwd.text("");
                errorPwd.text("");
                location.href = $_CONFIG['passport_domain'] + "forgetpwd/step3";
            } else {
                sureRightTip.addClass(hideCls);
                rightTip.addClass(hideCls);
                publicErrBox.removeClass(noneCls);
                publicErr.text(data.message);
            }
        }).fail(function() {
            alert('请求错误！');
        });
    }
};
var initEvent = function() {
    pwd.placeholder();
    surePwd.placeholder();
    surePwd.on({
        keyup: sPwdKeyup,
        blur: sPwdBlur
    });
    pwd.on({
        keyup: pwdKeyup,
        blur: pwdBlur,
        focus: pwdFoc
    });
    sureBtn.on('click', submit);
};

initEvent();