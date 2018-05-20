var fetch = require('io/fetch');
var url = require('io/url');

var changeCaptcha = require('module/popup/login/changeCaptcha');
var crypto = require('module/encrypt');
var confirmPopUp = require('./popup');

var passDomain = $_CONFIG.passport_domain;

var firing = false;

function unloginUpdate($userForm) {

    if (firing) {
        return;
    }

    firing = true;

    var $loginBtn = $userForm.find('[data-node=userLogin]');

    var $identifyPlace = $userForm.find('[data-node=identifyplace]');
    var $valCode = $userForm.find('[data-node=code]');
    var $changeCode = $userForm.find('[data-node=change-code]');

    var $userNum = $userForm.find($('[data-node=userNum]'));
    var $userPwd = $userForm.find($('[data-node=userPwd]'))

    var $loginDom = $userForm.find('[data-node=userLogin]');
    var $errorLi = $userForm.find('[data-node=error]');
    var $errMes = $userForm.find('[data-node=error-message]');

    var loginData = {
        login_name: $userNum.val(),
        password: crypto($userPwd.val()),
        setid: "login",
        verifyCode: $valCode.val(),
        csrf_token: $GLOBAL_CONFIG.csrf_token,
        isAuthorized: true
    };

    //错误提示
    function showError(msg) {
        $errorLi.removeClass('none');
        $errMes.text(msg);
    }

    $loginDom.text("升级中...");

    fetch.post(url.get('ajaxLoginData'), {
        //fetch.get('1.json', {//调试用
        async: false,
        data: loginData,
        headers: {
            'Content-Type-Ctag': $.cookie('content_ctag') || ''
        }
    }).done(function(json) {

        if (json && json.success) {
            var aliasData = json.data;
            if (aliasData.user.isMobileActivated == false) {
                window.location.href = passDomain + "login/bindphonepage";
                // window.location.href = "/login/bindphonepage";
                return;
            }
            if (aliasData.isNeedReset) {
                window.location.href = passDomain + "regist/indexnickname"; //跳到完善昵称页
                return;
            }
            confirmPopUp(json.data.authorizedMessage);
        } else {
            if (json.data.is_code == 1) {
                changeCaptcha($identifyPlace, $valCode, $changeCode);
            }
            showError(json.message);
        }
    }).always(function() {
        firing = false;
        $loginDom.text('升级一账通账户');
    });
    return false;
}

module.exports = unloginUpdate;