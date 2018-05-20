/**
 * Created by dongyukuan on 2016/5/23.
 */
var check = require("utils/check");
var CountDown = require("utils/countdown");
var fetch = require('io/fetch');
var url = require("io/url");
var inputTip = require("module/i18n");
var trim = require('utils/trim');
var limitLen = require('utils/limitLen');
require('placeholder');

var bindPhoneForm = $('[data-node="bindPhoneForm"]');

var sendMsgBtn = bindPhoneForm.find('[data-action="sendMsgCode"]');
var phone = bindPhoneForm.find('[data-node="telNum"]');
var msgCode = bindPhoneForm.find('[data-node="msgCode"]');
var errorBorderTel = bindPhoneForm.find('[data-node="errorBorderTel"]');
var errTel = bindPhoneForm.find('[data-node="errorTel"]');
var errorMsgCode = bindPhoneForm.find('[data-node="errorMsgCode"]');
var errorBorderCode = bindPhoneForm.find('[data-node="errorBorderCode"]');
var sureBind = bindPhoneForm.find('[data-action="sureBind"]');

var publicErrBox = bindPhoneForm.find('[data-node=publicErrBox]');
var publicErr = bindPhoneForm.find('[data-node=publicErr]');

var jumpFlag = $_CONFIG['isMobileActivated'];
var passportDomain = $_CONFIG.passport_domain;
var mainDomain = $_CONFIG['redirect'];
var unified = $_CONFIG['unified'];
var unifiedUrl = $_CONFIG['unified_url'];

var checkTel = function(telNum) {
    var ret = true;
    if (!telNum) {
        errorBorderTel.addClass('lg-form-error');
        errTel.text(inputTip.tel.ept);
        ret = false;
    } else if (!check.isMobileNum(telNum)) {
        errorBorderTel.addClass('lg-form-error');
        errTel.text(inputTip.tel.err);
        ret = false;
    } else {
        errorBorderTel.removeClass('lg-form-error');
        errTel.text('');
        ret = true;
    }
    return ret;
};
var checkCode = function(codeVal) {
    var ret = true;
    if (!codeVal) {
        errorBorderCode.addClass("lg-form-error");
        errorMsgCode.text(inputTip.msgCode.tipEpt);
        ret = false;
    } else if (!/^\d{6}$/.test(codeVal)) {
        errorBorderCode.addClass("lg-form-error");
        errorMsgCode.text(inputTip.msgCode.tipErr);
        ret = false;
    } else {
        ret = true;
    }
    return ret;
};
var limitCodeLen = function() {
    var len = (msgCode.val() + "").length;
    if (len > 6) {
        msgCode.val(limitLen(msgCode.val() + "", 6));
    }
};
//dfghgjtretr
function initEvent() {
    phone.placeholder();
    msgCode.placeholder();

    var flag = 1;
    var token = "";
    phone.on({
        blur: function() {
            var telNum = phone.val();
            checkTel(telNum);
        },
        focus: function() {
            errorBorderTel.removeClass('lg-form-error');
            errTel.text('');
            publicErrBox.addClass('none');
            publicErr.text("");

        },
        keyup: function() {
            var len = (phone.val() + "").length;
            if (len > 11) {
                phone.val(limitLen(phone.val() + "", 11));
            }
        }
    });
    msgCode.on({
        focus: function() {
            errorBorderCode.removeClass('lg-form-error');
            errorMsgCode.text('');
            publicErrBox.addClass('none');
            publicErr.text("");
        },
        blur: function() {
            var codeVal = msgCode.val();
            checkCode(codeVal);
        },
        keyup: limitCodeLen
    });
    sendMsgBtn.on("click", function() {
        if (flag === 0) {
            return false;
        }
        var telNum = phone.val();
        var telFlag = checkTel(telNum);
        if (!telFlag) {
            return false;
        }
        flag = 0;
        msgCode.removeAttr('disabled');
        var telData = {
            "mobile": telNum
        };
        fetch.post(url.get('sendCode'), {
            "data": telData
        }).then(function(data) {
            if (data.success) {
                errorBorderTel.removeClass('lg-form-error');
                errTel.text("");
                errorMsgCode.text(inputTip.msgCode.tipSend).css("color", "#f95353");
                token = data.data.token;
                new CountDown(60, {
                    onChange: function(num) {
                        sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass('code-disabled');
                    },
                    onFinish: function() {
                        flag = 1;
                        sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass('code-disabled');
                    }
                });
            } else {
                publicErrBox.removeClass('none');
                publicErr.text(data.message);
                flag = 1;
            }
        }).fail(function() {
            flag = 1;
            publicErrBox.removeClass('none');
            publicErr.text(inputTip.errLine.tip);
        });
    });
    sureBind.on("click", function() {
        var telNum = trim(phone.val() + "");
        var msgCodeNum = trim(msgCode.val() + "");
        var telFlag = checkTel(telNum);
        var codeFlag = checkCode(msgCodeNum);
        if (!telFlag) {
            return false;
        }
        if (!codeFlag) {
            return false;
        }
        var subData = {
            "mobile": telNum,
            "verifyCode": msgCodeNum,
            "token": token
        };
        fetch.post(url.get('bindPhone'), {
            "data": subData
        }).done(function(data) {
            if (data.success) {
                publicErrBox.addClass('none');
                errorBorderCode.removeClass('lg-form-error');
                errorMsgCode.text("");
                if (unified) {
                    location.href = unifiedUrl;
                } else {
                    if (jumpFlag) {
                        location.href = mainDomain;
                    } else {
                        location.href = passportDomain + 'regist/indexnickname';
                    }
                }
            } else {
                publicErrBox.removeClass('none');
                publicErr.text(data.message);
            }
        }).fail(function() {
            publicErrBox.removeClass('none');
            publicErr.text(inputTip.errLine.tip);
        });
    });
}
module.exports = initEvent;