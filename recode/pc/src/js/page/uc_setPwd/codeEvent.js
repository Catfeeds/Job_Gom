/**
 * Created by dongyukuan on 2016/7/5.
 */
var checkCode = require('./checkCode');
var limitLen = require("utils/limitLen");
var errCls = 'error';

var resetPwdBox = $('[data-node=resetPwdBox]');
var msgCode = resetPwdBox.find('[data-node=msgCode]');
var errorCode = resetPwdBox.find('[data-node=errorCode]');
var initEvent = function () {
    msgCode.on({
        focus: function () {
            msgCode.removeClass(errCls);
            errorCode.addClass('hide').text("");
        },
        blur: function () {
            var codeVal = msgCode.val();
            checkCode(codeVal);
        },
        keyup: function () {
            var codeVal = msgCode.val();
            msgCode.val(limitLen(codeVal, 6));
        }
    });
};
module.exports = {
    init: initEvent
};
