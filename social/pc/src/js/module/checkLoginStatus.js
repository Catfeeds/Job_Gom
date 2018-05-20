function checkLoginStatus() {
	var cookieVal = $_CONFIG.prefix + "userId";
	if ($_CONFIG.islogin !== '0' && $.cookie(cookieVal)) { //登录
		return true;
	} else {
		return false;
	}
}

module.exports = checkLoginStatus;