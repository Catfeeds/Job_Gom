//密码校验
var moduleTrim = require("utils/trim");
var check = require("utils/check");
var modulesPwdStrength = require("utils/pwdStrength");
var textchange = require('textchange');
var inputTip = require("module/i18n");

var liPassword = $("[data-node='password']");
var inputPassword = $("[data-node='input_password']");
var passwordAllright = $('[data-node=password_allright]');
var inputPassConfirm = $('[data-node=input_password_confirm]');
var passConfirmAllright = $('[data-node=password_confirm_allright]');
var liPassConfirm = $('[data-node=password_confirm]');
var tipPassConfirm = $('[data-node=tip_password_confirm]');
var tipPass = $("[data-node='tip_pass']");

$.fn.extend({
    visible: function () {
        $(this).css('visibility', 'visible');
    },
    hidden: function () {
        $(this).css('visibility', 'hidden');
    }
});
var inputEvent = {
    onfocus: function () {
        tipPass.css({"visibility": "visible", "color": "#F95353"});
    },
    input: function () {
        var val = moduleTrim(inputPassword.val());
        var checkVal = inputPassConfirm.val();
        if (val != "") {
            $("[data-node='pass_level']").css("display", "block");
            if (modulesPwdStrength(val) < 60) {	//密码强度分数小于60
                $("[data-node='level_strong'],[data-node='level_md']").css("background-color", "#CCC");
                $("[data-node='level_weak']").css("background-color", "#e60012");
                if (modulesPwdStrength(val) <= 27 || !check.passwordReg(val) || val.length < 6) {
                    tipPass.html(inputTip.pwd.commonTip).show();
                    liPassword.attr("data-pass", "1");
                } else {
                    tipPass.html(inputTip.pwd.commonTip).hide();
                    liPassword.attr("data-pass", "0");
                }
            } else if (modulesPwdStrength(val) >= 60 && modulesPwdStrength(val) < 80) {
                if (!check.checkSpace(inputPassword.val())) {
                    $("[data-node='level_weak'],[data-node = 'level_strong']").css("background-color", "#CCC");
                    $("[data-node='level_md']").css("background-color", "#f39800");
                    liPassword.attr("data-pass", "0");
                }
            } else if (modulesPwdStrength(val) >= 80) {
                if (!check.checkSpace(inputPassword.val())) {
                    $("[data-node='level_weak'],[data-node = 'level_md']").css("background-color", "#CCC");
                    $("[data-node='level_strong']").css("background-color", "#22ac38");
                    liPassword.attr("data-pass", "0");
                }
            }
            if (val.length >= 6 && val.length <= 20 && check.passwordReg(val)) {
                if (modulesPwdStrength(val) > 27 && !check.checkSpace(inputPassword.val())) {
                    passwordAllright.visible();
                    liPassword.attr("data-pass", "0");
                } else {
                    if (check.checkSpace(inputPassword.val())) {
                        passwordAllright.hidden();
                        liPassword.attr("data-pass", "1");
                        tipPass.html(inputTip.pwd.commonTip).show();
                    }
                }
            } else {
                passwordAllright.hidden();
                liPassword.attr("data-pass", "1");
            }
            if (checkVal != val && liPassConfirm.attr('data-passconfirm') == 0 && !check.checkSpace(inputPassword.val())) {
                liPassConfirm.attr('data-passconfirm', 1);
                passConfirmAllright.hidden();
                tipPassConfirm.visible();
            } else if (checkVal == val && liPassConfirm.attr('data-passconfirm') == 1) {
                if (passwordAllright.css('visibility') == 'visible') {
                    liPassConfirm.attr('data-passconfirm', 0);
                    passConfirmAllright.visible();
                }
                tipPassConfirm.hidden();
            } else if (checkVal != val && liPassConfirm.attr('data-passconfirm') == 1 && check.checkSpace(inputPassword.val())) {
                passConfirmAllright.hidden();
                tipPassConfirm.hidden();
            } else {
                passConfirmAllright.hidden();
            }
        } else {
            if (check.checkSpace(inputPassword.val())) {
                tipPass.html(inputTip.pwd.commonTip).show();
                if (checkVal == inputPassword.val()) {
                    tipPassConfirm.hidden();
                }
            }
            $("[data-node='pass_level']").css("display", "none");
            tipPass.html(inputTip.pwd.commonTip).show();
            liPassword.attr("data-pass", "1");
        }
    }
};
inputPassword.on({
    focus: inputEvent.onfocus,
    textchange: inputEvent.input
});