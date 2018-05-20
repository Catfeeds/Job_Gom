var fetch = require('io/fetch');
var url = require("io/url");
var alert = require('module/popup/alert');

var $desIpt = $('[data-node="desIpt"]');
var $nameIpt = $('[data-node="nameIpt"]');
var $avatar = $('[data-node="avatar"]');
var $create = $('[data-node="create"]');

var $nameErr = $('[data-node="nameErr"]');
var $desErr = $('[data-node="desErr"]');

//美店名称错误提示
var nameErrTip = function(text){
	$nameIpt.addClass('red-border');
	$nameErr.removeClass('none').text(text);
};
//描述错误提示
var desErrTip = function(text){
	$desIpt.addClass('red-border');
	$desErr.removeClass('none').text(text);
}

var subEvent = function(){
	var desVal = $desIpt.val();
	var nameVal = $nameIpt.val();
	var avatarImg = $avatar.attr('src');
	if(nameVal.length > 15){
		nameErrTip('不限制输入类型，最大可输入15个汉字。')
		return;
	}
	if(desVal.length > 100){
		desErrTip('不限制输入类型，最大可输入100个汉字。')
		return;
	}
	fetch.post(url.get('saveMshop'),{
		"data":{
			"name":nameVal,
			"icon":avatarImg,
			"description":desVal
		}
	}).done(function(data){
		if(data.code == 200){
			window.location.href = $_CONFIG['meidian_domain']+'admin';
		}else{
			alert(data.message);
		}
	})
};

function init(){
	$create.on('click',subEvent);
}

module.exports.init = init;