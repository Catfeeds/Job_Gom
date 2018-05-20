/**
 * Created by dongyukuan on 2016/5/23.
 */
var trim = require("utils/trim");
var CountDown = require("utils/countdown");
var fetch = require('io/fetch');
var url = require("io/url");
var toast = require('module/hint').init;
var inputTip = require("module/i18n");
var limitLen = require('utils/limitLen');
var check = require("utils/check");
require('placeholder');

var forgetPwdStepTwo = $('[data-node="forgetPwdStepTwo"]');
var sendMsgBtn = forgetPwdStepTwo.find('[data-action="sendMsgBtn"]');
var nextStep = forgetPwdStepTwo.find('[data-action="nextStep"]');
var errorCode = forgetPwdStepTwo.find('[data-node="errorCode"]');
var msgCode = forgetPwdStepTwo.find('[data-node="msgCode"]');
var errorBorderCode = forgetPwdStepTwo.find('[data-node="errorBorderCode"]');

var tel = forgetPwdStepTwo.find('[data-node="tel"]');
var errorTel = forgetPwdStepTwo.find('[data-node="errorTel"]');
var errorBorderTel = forgetPwdStepTwo.find('[data-node="errorBorderTel"]');

var publicErrBox = forgetPwdStepTwo.find('[data-node=publicErrBox]');
var publicErr = forgetPwdStepTwo.find('[data-node=publicErr]');

var errCls = 'lg-form-error';
var disabledCls = 'code-disabled';
var noneCls = 'none';
var flag = 1;
var telVal;

var passport_domain = $_CONFIG['passport_domain'];

//验证手机号
var checkTel = function() {
    var telNum = tel.val();
    var telTrueFalse = check.isMobileNum(telNum);
    var ret = true;
    if (!telNum) {
        errorBorderTel.addClass(errCls);
        errorTel.text(inputTip.tel.ept);
        ret = false;
    } else if (!telTrueFalse) {
        errorBorderTel.addClass(errCls);
        errorTel.text(inputTip.tel.err);
        ret = false;
    } else {
        errorBorderTel.removeClass(errCls);
        errorTel.text('');
    }
    return ret;
};
var limitTelLen = function() {
    var len = (tel.val() + "").length;
    if (len > 11) {
        tel.val(limitLen(tel.val() + "", 11));
    }
};
var telFoc = function() {
    errorBorderTel.removeClass(errCls);
    errorTel.text('');
    publicErrBox.addClass(noneCls);
    publicErr.text("");
};
var checkCode = function() {
    var codeVal = msgCode.val();
    var ret = 1;
    if (!codeVal) {
        errorBorderCode.addClass(errCls);
        errorCode.text(inputTip.msgCode.tipEpt);
        ret = 0;
    } else if (!/^\d{6}$/.test(codeVal)) {
        errorBorderCode.addClass(errCls);
        errorCode.text(inputTip.msgCode.tipErr);
        ret = 0;
    } else {
        ret = 1;
    }
    return ret;
};
var limitCodeLen = function() {
    var len = (msgCode.val() + "").length;
    if (len > 6) {
        msgCode.val(limitLen(msgCode.val() + "", 6));
    }
};
var codeFoc = function() {
    errorBorderCode.removeClass(errCls);
    errorCode.text("");
    publicErrBox.addClass(noneCls);
    publicErr.text("");
};
var sendMsg = function() {
    var telFlag = checkTel();
    if (!flag || !telFlag) {
        return false;
    }
    telVal = tel.val();
    var telData = {
        "mobileOrEmail": telVal
    };
    fetch.post(url.get('sendMsgCodeV2'), {
        "data": telData
    }).then(function(data) {
        if (data.success) {
            if (data.data.isStoreUser) {
                //增加toast提示，后跳转
                toast('您是门店会员，将为您跳转至门店重置密码页', {
                    callback: function() {
                        location.href = passport_domain + '/shop/index';
                    }
                });
                return false;
            }
            publicErrBox.addClass(noneCls);
            publicErr.text("");
            errorBorderCode.removeClass(errCls);
            errorCode.text(inputTip.msgCode.tipSend).css("color", "#f95353");
            new CountDown(60, {
                onChange: function(num) {
                    flag = 0;
                    sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(disabledCls);
                },
                onFinish: function() {
                    flag = 1;
                    sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(disabledCls);
                }
            });
        } else {
            publicErrBox.removeClass(noneCls);
            publicErr.text(data.message);
        }
    });
    //return false;
};
var submit = function() {
    var code = msgCode.val();
    var telNum = tel.val();
    var telFlag = checkTel();
    var codeFlag = checkCode();
    if (!telFlag || !codeFlag) {
        return false;
    }
    var msgCodeData = {
        "verifycode": code,
        "mobileOrEmail": telNum
    };
    fetch.post(url.get('checkCode'), {
        "data": msgCodeData
    }).then(function(data) {
        if (data.success) {
            errorBorderCode.removeClass(errCls);
            errorCode.text("");
            location.href = passport_domain + "/forgetpwd/step2";
        } else {
            publicErrBox.removeClass(noneCls);
            publicErr.text(data.message);
        }
    });
};

function initEvent() {
    msgCode.placeholder();
    tel.placeholder();

    tel.on({
        blur: checkTel,
        focus: telFoc,
        keyup: limitTelLen
    });
    sendMsgBtn.on("click", sendMsg);
    msgCode.on({
        focus: codeFoc,
        blur: checkCode,
        keyup: limitCodeLen
    });
    nextStep.on("click", submit);
}
module.exports = initEvent;