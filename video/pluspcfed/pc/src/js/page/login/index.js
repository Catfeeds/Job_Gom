var loginPop = require('module/popup/login');
var checkLoginStatus = require('module/checkLoginStatus');

var $loginBtn = $('[data-node=login-btn]');
$loginBtn.on("click", function(){
	var isLogin = checkLoginStatus();
	var url = location.search.replace(/^r=/i, "");
	if (isLogin) {
		location.href = url;
	} else {
		loginPop(function() {
			location.href = url;
		})
	}
})
