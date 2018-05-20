function checkLoginStatus() {
    var isLogin = $GLOBAL_CONFIG['islogin'] == '0' ? false : true;
    return isLogin;
}

module.exports = checkLoginStatus;
