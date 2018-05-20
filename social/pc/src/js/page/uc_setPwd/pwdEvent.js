/**
 * Created by dongyukuan on 2016/7/5.
 */
var checkPwd = require('./checkPwd');
var inputTip = require("module/i18n");
var limitLen = require("utils/limitLen");
var getCount = require("utils/pwdStrength");
var check = require('utils/check');

var resetPwdBox = $('[data-node=resetPwdBox]');
var pwd = resetPwdBox.find('[data-node=pwd]');
var errorPwd = resetPwdBox.find('[data-node=errorPwd]');
// var rightTip;
var pwdTip = resetPwdBox.find('[data-node=pwdTip]');
var levelTip = pwdTip.find('span');

var pwdV = resetPwdBox.find('[data-node=surePwd]');

var errorSurePwd = resetPwdBox.find('[data-node=errorSurePwd]');
// var sureRightTip;

var errCls = 'error';
var hideCls = 'hide';
var levelWeak = "level-weak";
var levelMid = "level-md";
var levelStrong = "level-strong";

var pwdKeyUp = function() {
    var pwdVal = pwd.val() + "";
    var pwdVVal = pwdV.val() + "";
    //pwdTip.removeClass(hideCls);
    //errorPwd.addClass(hideCls);
    var len = pwdVal.length;
    if (len > 20) {
        pwd.val(limitLen(pwdVal, 20));
    }
    var score = getCount(pwdVal);
    pwd.removeClass(errCls);
    if (score > 27 && check.passwordReg(pwdVal) && !check.checkSpace(pwdVal)) {
        errorPwd.addClass(hideCls);
        pwdTip.removeClass(hideCls);
    } else {
        errorPwd.removeClass(hideCls).text(inputTip.pwd.commonTip);
        pwdTip.addClass(hideCls);
        return false;
    }
    if (score < 60) {
        levelTip.eq(0).addClass(levelWeak);
        levelTip.eq(1).removeClass(levelMid);
        levelTip.eq(2).removeClass(levelStrong);
    } else if (score >= 60 && score < 80) {
        levelTip.eq(0).removeClass(levelWeak);
        levelTip.eq(1).addClass(levelMid);
        levelTip.eq(2).removeClass(levelStrong);
    } else {
        levelTip.eq(0).removeClass(levelWeak);
        levelTip.eq(1).removeClass(levelMid);
        levelTip.eq(2).addClass(levelStrong);
    }
    if (pwdVVal !== "") {
        if (pwdVVal !== pwdVal) {
            errorSurePwd.addClass(errCls).removeClass(hideCls);
            errorSurePwd.text(inputTip.pwdV.err);
            // sureRightTip.addClass(hideCls);
        } else {
            errorSurePwd.removeClass(errCls).addClass(hideCls);
            errorSurePwd.text('');
            // sureRightTip.removeClass(hideCls);
        }
    }
};
var pwdFoc = function() {
    var pwdVal = pwd.val();
    if (!pwdVal) {
        errorPwd.removeClass(hideCls).text(inputTip.pwd.commonTip).css('color', "#f95353");
        pwd.removeClass(errCls);
    }
    // rightTip.addClass(hideCls);
};
var pwdVKeyUp = function() {
    var pwdVVal = pwdV.val() + "";
    var len = pwdVVal.length;
    if (len > 20) {
        pwdV.val(limitLen(pwdVVal, 20));
    }
};
var pweVFco = function() {
    pwdV.removeClass(errCls);
    errorSurePwd.text('');
};

var pwdEvent = function() {
    pwd.on({
        keyup: pwdKeyUp,
        focus: pwdFoc,
        blur: checkPwd.checkPwd
    });
    pwdV.on({
        keyup: pwdVKeyUp,
        blur: checkPwd.checkPwdV,
        focus: pweVFco
    });
};
module.exports = {
    init: pwdEvent
};
