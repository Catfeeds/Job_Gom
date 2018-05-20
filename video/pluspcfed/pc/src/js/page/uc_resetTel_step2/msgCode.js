var fetch = require('io/fetch');
var url = require("io/url");
var inputTip = require("module/i18n");
var msgTip = inputTip.msgCode;
var CountDown = require("utils/countdown");
var check = require('utils/check');
var limitLen = require('utils/limitLen');

var checkTel = require('./telEvent').checkTel;

var formBox = $('[data-node=formBox]');
var publicErr = formBox.find('[data-node=publicErr]');
var errText = formBox.find('[data-node=errText]');

var telInput = formBox.find('[data-node=telInput]');

var sendMsgBtn = formBox.find('[data-action=sendMsg]');
var msgCode = formBox.find('[data-node=msgCode]');
var codeLi = formBox.find('[data-node=codeLi]');
var codeTip = formBox.find('[data-node=codeTip]');
var codeIcon = formBox.find('[data-node=codeIcon]');
var codeText = formBox.find('[data-node=codeText]');

var sendFlag = 1;

var hideCls = 'hide';
var lgFormError = 'lg-form-error';
var codeTipCls = 'code-tip';
var codeDisabled = 'code-disabled';

//公共提示隐藏显示
var hideErrBox = function() {
    publicErr.addClass(hideCls);
};
var showErrBox = function(str) {
    publicErr.removeClass(hideCls);
    errText.text(str);
};

var sendMsg = function() {
    if (!sendFlag) {
        return false;
    }
    var telFlag = checkTel();
    if (!telFlag) {
        return false;
    }
    var telVal = telInput.val();
    var sendData = {
        "mobile": telVal
    };
    sendFlag = 0;
    fetch.get(url.get('sendNewCode'), {
        data: sendData
    }).done(function(data) {
        if (data.success) {
            //input框下方提示
            codeTip.removeClass(hideCls);
            codeIcon.removeClass(hideCls);
            codeText.text(msgTip.send);
            //去掉li边框红色
            codeLi.removeClass(lgFormError).addClass(codeTipCls);
            //隐藏公共错误提示
            hideErrBox();

            new CountDown(60, {
                onChange: function(num) {
                    sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(codeDisabled);
                },
                onFinish: function() {
                    sendFlag = 1;
                    sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(codeDisabled);
                }
            });
        } else {
            sendFlag = 1;
            showErrBox(data.message);
        }
    }).fail(function() {
        sendFlag = 1;
        showErrBox(inputTip.errLine.tip);
    });
    return false;
};
var inputFoc = function() {
    hideErrBox();
    if (codeLi.hasClass(lgFormError)) {
        codeLi.removeClass(lgFormError).addClass(codeTipCls);
        codeTip.addClass(hideCls);
    }
};
var inputKeyup = function() {
    var codeVal = msgCode.val();
    var len = codeVal.length;
    if (len > 6) {
        msgCode.val(limitLen(codeVal, 6));
    }
    // if (codeVal) {
    // 	nextStep.addClass(activeCls);
    // } else {
    // 	nextStep.removeClass(activeCls);
    // }
};
var inputBlur = function() {
    var flag = true;
    var codeVal = msgCode.val();
    var len = codeVal.length;
    if (!check.isMsgCode(codeVal)) {
        flag = false;
        codeLi.removeClass(codeTipCls).addClass(lgFormError);
        codeTip.removeClass(hideCls);
        codeIcon.addClass(hideCls);
        if (!len) {
            codeText.text(msgTip.tipEpt);
        } else {
            codeText.text(msgTip.tipErr);
        }
    } else {
        flag = true;
    }
    return flag;
};
var initCode = function() {
    sendMsgBtn.on('click', sendMsg);
    msgCode.on({
        "focus": inputFoc,
        "keyup": inputKeyup,
        "blur": inputBlur
    });
};
module.exports = {
    initCode: initCode,
    checkCode: inputBlur
};