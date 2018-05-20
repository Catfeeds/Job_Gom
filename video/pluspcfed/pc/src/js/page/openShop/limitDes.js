//控制描述字数
var $desIpt = $('[data-node="desIpt"]');
var $desErr = $('[data-node="desErr"]');
var $textNum = $('[data-node="textNum"]');
function init(){
	$desIpt.on('keyup',function(){
		var desVal = $(this).val();
		if(desVal.length > 100){
			$(this).val(desVal.substr(0,100));
		}
		$textNum.text((desVal.length >= 100 ?100:desVal.length)+'/100');
	}).on('keydown',function(){
		var desVal = $(this).val();
		if(desVal.length > 0){
			$(this).addClass('text-color');
		}else{
			$(this).removeClass('text-color');
		}
	}).on('focus',function(){
		$desIpt.removeClass('red-border');
		$desErr.addClass('none');
	});
}

module.exports.init = init;