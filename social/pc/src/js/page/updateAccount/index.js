var isLogin = require('module/checkLoginStatus');
var modulesso = require("module/ssoAgreement");
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');

//验证表单
var checkForm = require('module/popup/login/checkForm');
//更新校验码
var changeCaptcha = require('module/popup/login/changeCaptcha');
var crypto = require('module/encrypt');
var truncate = require('utils/truncate');
//账号升级
var update = require('./update');
var unloginUpdate = require('./unloginUpdate');

var $userForm = $('[data-node=userForm]');
var $loginBtn = $userForm.find('[data-node=userLogin]');

var $identifyPlace = $userForm.find('[data-node=identifyplace]');
var $valCode = $userForm.find('[data-node=code]');
var $changeCode = $userForm.find('[data-node=change-code]');
var $error = $userForm.find('[data-node=error]');

var $loginDom = $userForm.find('[data-node=userLogin]');

var $remainTime = $('[data-node=remainTime]');

//限制验证码4位
function textchange(node) {
    if (node.val().length > 4) {
        node.val(truncate(node.val(), 4));
    }
}

function updateAccount() {
    //协议校验
    if (!modulesso.valid()) {
        alert("你没有通过协议,请刷新页面重试");
        return false;
    }
    //表单校验
    if (!checkForm($userForm)) {
        return false;
    }

    //是否登陆校验

    if (isLogin()) {
        update($userForm);
    } else {
        unloginUpdate($userForm);
    }
    return false;
}

function initEvent() {

    if (isLogin()) {
        modulesso.init($_CONFIG.main_domain);
    } else {
        modulesso.init();
    }

    $loginBtn.on('click', updateAccount);

    $valCode.on('textchange', function() {
        textchange($(this));
    });

    $changeCode.on('click', function() {
        changeCaptcha($identifyPlace, $valCode, $changeCode);
    });

    $valCode.on('keydown', function() {
        $error.addClass('none');
    })
}

initEvent();