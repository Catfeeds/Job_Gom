var fetch = require('io/fetch');
var url = require("io/url");
var toast = require('module/hint').init;
var alert = require('module/popup/alert');

var $nameIpt = $('[data-node="nameIpt"]');
var $avatar = $('[data-node="avatar"]');
var $desIpt = $('[data-node="desIpt"]');
var $saveBtn = $('[data-node="saveBtn"]');
var $typeBox = $('[data-node="typeBox"]');

var $nameErr = $('[data-node="nameErr"]');
var $desErr = $('[data-node="desErr"]');

var reg = /(^\s\s*)|(\s\s*)$/g;

//美店名称错误提示
var nameErrTip = function(text){
	$nameIpt.addClass('red-border');
	$nameErr.removeClass('none').text(text);
};
//描述错误提示
var desErrTip = function(text){
	$desIpt.addClass('red-border');
	$desErr.removeClass('none').text(text);
};
//检测美店名称是否为空
var valiName = function(){
	var nameVal = $nameIpt.val().replace(reg,'');
	var ret = true;
	if(!nameVal){
		ret = false;
		nameErrTip('请输入美店名称');
	}
	return ret;
}

//拼装类目数据
var getTypeData = function(){
	var $typeItems = $typeBox.find('[data-node="typeItem"]')
	var hasType = $typeItems.length;
	var typeStr = [];
	var strList = '';
	if(hasType){
		$typeItems.map(function(index,item){
			typeStr.push($(item).find('p').text());
		});
		//拼装类目数据，以,分割的字符串
		strList = typeStr.join(',');
	};
	return strList;
};
//提交保存
var clickFlag = 1;//点击开关
var subEvent = function(){
	var hasName = valiName();//美店名称不能为空
	if(!hasName || !clickFlag) return;
	clickFlag = 0;

	var desVal = $desIpt.val().replace(reg,'');
	var nameDefault = $nameIpt.attr('placeholder');
	var nameVal = $nameIpt.val().replace(reg,'');
	var avatarImg = $avatar.attr('src');
	var typeStr = getTypeData();
	if(nameVal.length > 15){
		nameErrTip('不限制输入类型，最大可输入15个汉字。')
		return;
	}
	if(desVal.length > 100){
		desErrTip('不限制输入类型，最大可输入100个汉字。')
		return;
	}
	fetch.post(url.get('editshop'),{
		"data":{
			"shopId":$GLOBAL_CONFIG['shopId'],
			"name":nameVal,
			"icon":avatarImg,
			"description":desVal||'',
			"mainCategoryNames":typeStr
		}
	}).done(function(data){
		clickFlag = 1;
		if(data.code == 200){
			toast('保存成功！',{
              	callback: function() {
                        	window.location.href = window.location;

                       	}
           })
			
		}else {
			alert(data.message);
		}
	}).always(function(){
		clickFlag = 1;
	})
}

function init(){
	$saveBtn.on('click',subEvent);
	$nameIpt.on('blur',valiName);
}

module.exports.init = init;