/**
 * Created by dongyukuan on 2016/7/5.
 */
var CountDown = require("utils/countdown");
var fetch = require('io/fetch');
var url = require("io/url");
var inputTip = require("module/i18n");

var errCls = 'error';
var disabledCls = 'disabled';
var hideCls = 'hide';

var flag = 1;
var resetPwdBox = $('[data-node=resetPwdBox]');
var sendMsgBtn = resetPwdBox.find('[data-action=sendMsgBtn]');
var errorCode = resetPwdBox.find('[data-node=errorCode]');
var errorBorderCode = resetPwdBox.find('[data-node=msgCode]');


var sendEvent = function() {
    if (!flag) {
        return false;
    }
    flag = 0;
    fetch.post(url.get('ucSendMsgCode')).done(function(data) {
        if (data.success) {
            errorBorderCode.removeClass(errCls);
            errorCode.removeClass(hideCls).text(inputTip.msgCode.tipSend).css("color", "#f95353");
            new CountDown(60, {
                onChange: function(num) {
                    sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(disabledCls);
                },
                onFinish: function() {
                    flag = 1;
                    sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(disabledCls);
                }
            });
        } else {
            flag = 1;
            errorCode.removeClass(hideCls).text(data.message);
            errorBorderCode.addClass(errCls);
        }
    }).fail(function() {
        flag = 1;
        errorCode.removeClass(hideCls).text(inputTip.errLine.tip);
        errorBorderCode.addClass(errCls);
    });
    return false;
};
var initEvent = function() {
    sendMsgBtn.on("click", sendEvent);
};
module.exports = {
    init: initEvent
};