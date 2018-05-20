var loginPop = require('module/popup/login');	//登录弹窗
var checkLoginStatus = require('module/checkLoginStatus');

var $node = $("[data-node=createCircle]");

var gotoPage = function(){
	var href = $node.attr("href");
	window.location.href =  href;
}

var init = function(){
	$node.on("click",function(){
		if(!checkLoginStatus()){
			loginPop({
				onLogin:gotoPage
			})
			return false;
		}		
	})
};

module.exports = {
	init: init
};
