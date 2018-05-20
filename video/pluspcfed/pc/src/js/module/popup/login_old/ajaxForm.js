//后台交互  
function login(userForm, firing) {
    if (!checkForm(userForm)) {
        return;
    }
    if (firing) { // 提交中
        return;
    }
    firing = true;

    var userNum = userForm.find('[data-node=userNum]');
    var userPwd = userForm.find('[data-node=userPwd]');
    var valCode = userForm.find('[data-node=code]');
    var errorLi = userForm.find('[data-node=error]');
    var errMes = userForm.find('[data-node=error-message]');
    var verifyCode = valCode.val();

    if (!identifyPlace.hasClass('none')) {
        if (verifyCode == "") {
            valCode.css('border', '1px solid #f95353');
            return;
        }
    }
    var loginData = {
        login_name: userNum.val(),
        password: crypto(userPwd.val()),
        setid: "login",
        verifyCode: verifyCode,
        csrf_token: $GLOBAL_CONFIG.csrf_token
    };
    loginDom.text("登录中...");
    fetch.post(url.get('ajaxLoginData'), {
        async: false,
        data: loginData,
        headers: {
            'Content-Type-Ctag': $.cookie('content_ctag') || ''
        }
    }).done(function(json) {
        loginDom.text('登录');
        if (json && json.success) {
            var aliasData = json.data;
            if (aliasData.user.isMobileActivated == false) {
                window.location.href = passDomain + "login/bindphonepage";
                // window.location.href = "/login/bindphonepage";
                return false;
            }

            if (aliasData.isNeedReset == true) { //修改重复昵称
                var _url = passDomain + "regist/indexnickname";
                selfOpenWindow(_url, 'temp_nick_name', 'true');
                return false;
            }

            loginCallback.init(popLayer, opts);
        } else {
            if (json.data.is_code == 1) {
                changeCaptcha(identifyPlace, valCode, changeCode);
            }
            showError(json.message);
        }
    }).always(function() {
        firing = false;
    });
    return false;
}