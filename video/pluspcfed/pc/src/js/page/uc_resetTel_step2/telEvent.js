var telTip = require("module/i18n").tel;
var check = require('utils/check');
var limitLen = require('utils/limitLen');

var formBox = $('[data-node=formBox]');

var telInput = formBox.find('[data-node=telInput]');

var publicErr = formBox.find('[data-node=publicErr]');
var rightFlag = formBox.find('[data-node=rightFlag]');
var telErrTip = formBox.find('[data-node=telErrTip]');

var telLi = formBox.find('[data-node=telLi]');

var hideCls = 'hide';
var lgFormError = 'lg-form-error';
var codeTipCls = 'code-tip';

var telFoc = function() {
    telLi.removeClass(lgFormError).addClass(codeTipCls);
    publicErr.addClass(hideCls);
    rightFlag.addClass(hideCls);
    telErrTip.addClass(hideCls);
};
var telKeyup = function() {
    var telVal = telInput.val();
    var len = telVal.length;
    if (len > 11) {
        telInput.val(limitLen(telVal, 11));
    }
};
var telBlur = function() {
    var telVal = telInput.val();
    var len = telVal.length;
    var flag = true;
    if (!check.isMobileNum(telVal)) {
        flag = false;
        telLi.removeClass(codeTipCls).addClass(lgFormError);
        telErrTip.removeClass(hideCls);
        if (!len) {
            telErrTip.text(telTip.ept);
        } else {
            telErrTip.text(telTip.err);
        }
    } else {
        flag = true;
        rightFlag.removeClass(hideCls);
    }
    return flag;
};
var telEvent = function() {
    telInput.on({
        'focus': telFoc,
        'keyup': telKeyup,
        'blur': telBlur
    });
};
module.exports = {
    initTel: telEvent,
    checkTel: telBlur
};