//控制美店名称字数
var $nameIpt = $('[data-node="nameIpt"]');
var $nameErr = $('[data-node="nameErr"]');

function init(){
	$nameIpt.on('keyup',function(){
		var nameVal = $(this).val();
		if(nameVal.length > 15){
			$(this).val(nameVal.substr(0,15));
		}
	}).on('keydown',function(){
		var nameVal = $(this).val();
		if(nameVal.length > 0){
			$(this).addClass('text-color');
		}else{
			$(this).removeClass('text-color');
		}
	}).on('focus',function(){
		$nameIpt.removeClass('red-border');
		$nameErr.addClass('none');
	});
};

module.exports.init = init;