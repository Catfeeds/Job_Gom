//识别当前浏览器是否为IE8及以下版本
//返回值为 boolean true:当前版本为IE8及以下浏览器
var identify = function (){
	var ua = navigator.userAgent.toLowerCase();
	var version = 8.0;
	var isIE = ua.indexOf("msie")>-1;
	var currentVersion;
	if( isIE ){
		safariVersion =  ua.match(/msie ([\d.]+)/)[1];
		if( safariVersion <= version ){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
};
module.exports = identify;