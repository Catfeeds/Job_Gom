/**
 * 订单评价框
 * @author zhaodonghong
 */
require('placeholder');
var byteLen = require('utils/byteLen');
var limitLenCn = require('utils/limitLenCN');



var $disTable = $('[data-node="orderDisTable"]'); //table
var $disList = $disTable.find('[data-node="orderDiscuss"]'); //list
var $disText = $disList.find('[data-node="commentContent"]'); //textarea



var limitLen = 0;
var textValue = '';


var discussText = function(){
	
	$disTable.on( 'keyup', '[data-node="commentContent"]', function(){
		textValue = $.trim($(this).val());
		limitLen = Math.ceil(byteLen( textValue )/2);
		$(this).next().find('[data-node="discussNum"]').text( limitLen );
		if( limitLen >= 200 ){
			$(this).next().find('[data-node="discussNum"]').text( 200 );
			$(this).val( limitLenCn( textValue, 400 ) );
		}
	});
}


var textPlaceholder = function(){

	//搜索框
	$disText.placeholder();
}

var init = function(){

	//placeholder
	textPlaceholder(); 
	//评论框字数
	discussText();


};











module.exports = {
	init : init
}