/**
 * Created by dongyukuan on 2016/7/5.
 */
var getCount = require("utils/pwdStrength");
var inputTip = require("module/i18n");
var check = require('utils/check');

var resetPwdBox = $('[data-node=resetPwdBox]');
var errorPwd = resetPwdBox.find('[data-node=errorPwd]');
//var rightTip;
var pwd = resetPwdBox.find('[data-node=pwd]');
var pwdTip = resetPwdBox.find('[data-node=pwdTip]');

//var sureRightTip;
var errorSurePwd = resetPwdBox.find('[data-node=errorSurePwd]');
var pwdV = resetPwdBox.find('[data-node=surePwd]');

var errCls = 'error';
var hideCls='hide';

var checkPwd = function () {
    var pwdVal = pwd.val() + "";
    var pwdCount = getCount(pwdVal);
    var ret = true;
    if (pwdVal.length === 0) {
        pwd.addClass(errCls);
        errorPwd.removeClass('hide').text(inputTip.pwd.commonTip).css('color', "#f95353");
        pwdTip.addClass('hide');
        //rightTip.addClass(hideCls);
        ret = false;
        return ret;
    }
    if (!check.passwordReg(pwdVal) || check.checkSpace(pwdVal)) {
        pwd.addClass(errCls);
        errorPwd.removeClass('hide').text(inputTip.pwd.commonTip);
        pwdTip.addClass('hide');
        //rightTip.addClass(hideCls);
        ret = false;
        return ret;
    }
    if (pwdCount < 27) {
        pwd.addClass(errCls);
        errorPwd.removeClass('hide').text(inputTip.pwd.commonTip);
        pwdTip.addClass('hide');
        //rightTip.addClass(hideCls);
        ret = false;
        return ret;
    } else {
        //rightTip.removeClass(hideCls);
        pwd.removeClass(errCls);
        errorPwd.addClass('hide').text('');
        ret = true;
        return ret;
    }
};
var checkPwdV = function () {
    var pwdVal = pwd.val() + "";
    var pwdVVal = pwdV.val() + "";
    var ret = true;
    if (pwdVVal.length === 0) {
        //sureRightTip.addClass(hideCls);
        pwdV.addClass(errCls);
        errorSurePwd.removeClass(hideCls).text(inputTip.pwdV.ept);
        ret = false;
        return ret;
    }
    if (pwd.hasClass(errCls)) {
        //sureRightTip.addClass(hideCls);
         pwdV.addClass(errCls);
        errorSurePwd.removeClass(hideCls).text(inputTip.pwd.commonTip);
        ret = false;
        return ret;
    }
    if (pwdVal !== pwdVVal) {
        pwdV.addClass(errCls);
        errorSurePwd.removeClass(hideCls).text(inputTip.pwdV.err);
        //sureRightTip.addClass(hideCls);
        ret = false;
        return ret;
    } else {
        pwdV.removeClass(errCls);
        errorSurePwd.addClass(hideCls).text('');
        //sureRightTip.removeClass(hideCls);
        ret = true;
        return ret;
    }
};
module.exports = {
    checkPwd: checkPwd,
    checkPwdV: checkPwdV
};