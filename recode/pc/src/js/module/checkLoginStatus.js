function checkLoginStatus() {
    var isLogin = $_CONFIG.islogin == '0' ? false : true;
    return isLogin;
}

module.exports = checkLoginStatus;
