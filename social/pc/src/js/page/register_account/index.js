require('placeholder');
require('textchange');
var fetch = require("io/fetch");
var url = require('io/url');
var moduleTrim = require("utils/trim");
var alert = require('module/popup/alert');
var inputTip = require("module/i18n");
var encrypt = require('module/encrypt');
var truncate = require('utils/truncate');

require("./phone_number"); //手机号输入
require("./password"); //密码输入
var modulesso = require("module/ssoAgreement");
require('./recomcode/index');

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('register');
// $Form.find();
var $Form = $("[data-node=lg-form]");

var phoneLi = $Form.find("[data-node='phone_number']");
var phoneInput = $Form.find("[data-node='input_phone_number']");
var phoneTip = $Form.find("[data-node='tip_phone_number']");

var checkCodeLi = $Form.find("[data-node='check_code_li']");
var checkCodeInput = $Form.find("[data-node='check_code_input']");
var checkCodeTip = $Form.find("[data-node='check_code_tip']");
// var checkCodeAllright = $Form.find("[data-node='check_code_allright']");
var checkCodeImg = $Form.find("[data-node='check_code_img']");
var checkCodeChange = $Form.find("[data-node='check_code_change']");

var msgTestInput = $Form.find("[data-node='input_msg_test']");
var spanCodes = $Form.find("[data-node='tip_msg_test']");
var tipMsgTest = $Form.find('[data-node=tip_msg_test]');

var pwdLi = $Form.find("[data-node='password']");
var pwdInput = $Form.find("[data-node='input_password']");
var pwdTip = $Form.find("[data-node='tip_pass']");

var codeInput = $Form.find("[data-node='code_input']");
// var codeSkip = $Form.find("[data-node='code_skip']");
// var codeComplete = $Form.find("[data-node='code_complete']");
// var codeSpan = $Form.find('[data-node=code_span]');
// var codeAllright = $Form.find('[data-node=code_allright]');

var completeBtn = $Form.find('[data-node=complete]');

modulesso.init();

//设置placehoder
$('[data-node=input_phone_number],[data-node=input_msg_test],[data-node=input_password],[data-node=input_password_confirm],[data-node=code_input]').placeholder();
//设置注册按钮和协议;
//完成按钮提交页面数据
$.fn.extend({
    tipVisible: function(str) {
        var content = str || false;
        if (this[0].nodeName == "SPAN") {
            content ? $(this).html(content).css({
                "visibility": "visible",
                "color": "#F95353"
            }) : $(this).css({
                "visibility": "visible",
                "color": "#F95353"
            });
        } else {
            $(this).css('visibility', 'visible');
        }
    },
    tipHide: function() {
        $(this).css('visibility', 'hidden');
    }
});

//点击更换验证码
var imgChange = function (data){
    var state = data||true;
    if( state != 'keep'  ){
        checkCodeImg.attr('src',$_CONFIG.passport_domain+url.get('getCheckCode')+'?setid=register&num='+(new Date().getTime()));
        checkCodeInput.val("");
    }
};
   

var codeChange = function (){
    imgChange();
    checkCodeTip.tipHide();
    checkCodeLi.removeClass('lg-form-error');
} 

//完成按钮
var complete = function() {
    // BP.send({event_id: 'B000P021'}); // 发送统计数据
    if (moduleTrim(phoneInput.val()) == "") {
        imgChange();
        return function() {
            phoneLi.addClass("lg-form-error").attr("data-verification", "1");
            phoneTip.tipVisible(inputTip.tel.ept);
        }();
    }
    var phoneNumber = phoneLi.attr("data-verification");
    var dataPass = pwdLi.attr("data-pass");
    if (phoneNumber != 0) {
        return;
    }
    if (phoneNumber == 0 && moduleTrim(msgTestInput.val()) == "") {
        return tipMsgTest.tipVisible(inputTip.msgCode.tipEpt);
    }
    if (phoneNumber == 0 && !msgTestInput.val().length == 6) {
        return tipMsgTest.tipVisible(inputTip.msgCode.tipErr);
    }
    if (moduleTrim(pwdInput.val()) == "" && phoneNumber == 0) {
        return pwdTip.tipVisible();
    }
    if (codeInput.attr('data-userid') === false) {
        return alert('推荐码错误');
    }
    // if( !$("[data-node='check_agreement']").hasClass("lg-radio-true") ){
    //     return;
    // }
    if (phoneNumber == 0 && dataPass == 0 &&  (codeInput.attr('data-userid') == '' || codeInput.attr('data-userid') != false)) {
        var data = {
            "mobile": phoneInput.val(),
            "password": encrypt(pwdInput.val()),
            "verifyCode": msgTestInput.val()
        };
        if (codeInput.attr('data-code') == 0 && codeInput.attr('data-userId')) {
            data.membershipRefereeCode = codeInput.val();
        }
        fetch.post(url.get("registSubmit"), {
            data: data
        }).done(function(data/*, textStatus, XHR*/) {
            if (data.success) {
                location.href = $_CONFIG.passport_domain + "regist/indexnickname";
            } else if (data.code == "881006" || data.code == "100010") {
                tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
            } else if (data.code == '881007') {
                pwdTip.html(data.message).show();
                $('[data-node=password_allright]').tipHide();
            } else if (data.code == 422) {
                tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
            } else {
                alert(data.message);
            }
            imgChange();
        }).fail(function(/*XHR, textStatus, errorThrown*/) {
            imgChange();
            alert("数据请求失败 请稍后尝试");
        })
    }
};
//验证码按钮
var getCode = function() {
    var phoneNumberCheck = phoneLi.attr("data-verification");
    var tipMsgTest = $("[data-node='tip_msg_test']");
    var getVerifycode = $("[data-node='get_verifyCode']");
    if (phoneNumberCheck == "0") {
        if (getVerifycode.html() != inputTip.msgCode.btnDefault) {
            tipMsgTest.tipVisible(inputTip.msgCode.tipDisabled);
            return;
        } else {

        }
        if( moduleTrim(checkCodeInput.val()).length == 0 ){
            return function (){
                checkCodeLi.addClass('lg-form-error');
                checkCodeTip.tipVisible('请先输入验证码');
            }();
        }
        var option = {
            "mobile": $("[data-node = 'phone_number'] input[type = 'text']").val(),
            "code": checkCodeInput.val(),
            "setid":"register"
        };
        fetch.post(url.get("getVerificationCode"), {
            data: option
        }).done(function(data, textStatus, XHR) {
            if (data.success) {
                var i = 60;
                getVerifycode.css("background", "#DDD").html(i + inputTip.msgCode.btnAfterSend);
                checkCodeLi.removeClass('lg-form-error');
                checkCodeTip.tipHide();
                imgChange('keep');
                spanCodes.html(inputTip.msgCode.tipSend).css({
                    "visibility": "visible",
                    "color": "#F95353"
                });
                var s = setInterval(function() {
                    if (i == 1) {
                        clearInterval(s);
                        spanCodes.css("visibility", "hidden");
                        getVerifycode.html(inputTip.msgCode.btnDefault);
                        tipMsgTest.tipHide();
                    } else {
                        i--;
                        getVerifycode.html(i + inputTip.msgCode.btnAfterSend);
                    }
                }, 1030);
            } else {
                //请求返回错误 - 提示信息
                if (data.message == '该手机号已被注册') {
                    phoneTip.tipVisible(inputTip.tel.errBack);
                } else if (data.message == '发送次数超过限制') {
                    tipMsgTest.tipVisible(inputTip.msgCode.tipLimitEdit);
                } else if (data.message == '验证码输入错误,请重新输入' || data.code == "9111912"){
                    checkCodeLi.addClass('lg-form-error');
                    imgChange();
                    checkCodeTip.tipVisible(inputTip.msgCode.checkCodeWrong);
                } else if (data.message == '验证码错误') {
                    tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
                } else {
                    tipMsgTest.tipVisible(data.message);
                }
            }
        }).fail(function(XHR, textStatus, errorThrown) {
            alert("数据请求失败 请稍后尝试");
        })
    } else {
        if (phoneInput.val() == "") {
            phoneTip.tipVisible(inputTip.tel.ept);
        } else {
            phoneTip.tipVisible(inputTip.tel.err);
        }
        phoneLi.addClass("lg-form-error");
    }
};

//bindEvent
msgTestInput.on("textchange", function() {
    $("[data-node='tip_msg_test']").tipHide();
});
$("[data-node='get_verifyCode']").on("click", getCode);
$('[data-node=input_msg_test]').on('textchange', function() {
    var reg = /^[0-9]*$/;
    if ($(this).val().length < 6 || !reg.test($(this).val())) {
        if ($(this).val().length == 0) {
            $('[data-node=tip_msg_test]').tipVisible(inputTip.msgCode.tipEpt);
        } else {
            $('[data-node=tip_msg_test]').tipVisible(inputTip.msgCode.tipErr);
        }
    }
});
checkCodeInput.on('textchange',function (){
    var node = $(this);
    checkCodeLi.removeClass('lg-form-error');
    checkCodeTip.tipHide();
    if( moduleTrim(node.val()).length > 4 ){
        node.val(truncate(node.val(),4));
    }
});
checkCodeChange.on('click',codeChange);
completeBtn.unbind('input').on("click", complete);