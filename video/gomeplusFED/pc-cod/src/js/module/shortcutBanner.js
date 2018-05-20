var isLogin = require('module/checkLoginStatus');
var loginPop = require('module/popup/login');

var init = function(){
	$('[data-action="shortcutBanner"]').on('click', 'a', function(e){
		var _self = $(this);
		if (!isLogin()) {
			e.preventDefault();
            loginPop({
            	onLogin:function(){
            		window.location.href= _self.attr('href');
            	}
            });
        }
	});
}

module.exports = {
	init : init
}