/**
 * Created by dongyukuan on 2016/7/5.
 */
var inputTip = require('module/i18n');

var resetPwdBox = $('[data-node=resetPwdBox]');
var errorBorderCode = resetPwdBox.find('[data-node=msgCode]');
var errorCode = resetPwdBox.find('[data-node=errorCode]');

var checkCode = function(codeVal) {
    var ret = 1;
    if (!codeVal) {
        errorBorderCode.addClass("error");
        errorCode.removeClass('hide').text(inputTip.msgCode.tipEpt);
        ret = 0;
    } else if (!/^\d{6}$/.test(codeVal)) {
        errorBorderCode.addClass("error");
        errorCode.removeClass('hide').text(inputTip.msgCode.tipErr);
        ret = 0;
    } else {
        ret = 1;
        errorCode.addClass('hide');
    }
    return ret;
};
module.exports = checkCode;
