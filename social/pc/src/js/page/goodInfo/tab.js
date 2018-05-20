var $tabBtn = $('[data-node="tabBtnBox"] a');
var $tabContent = $('[data-node="tabContent"]');
var $tabBox = $('[data-node="tabBox"]');
var offsetTop = $tabBox.offset().top;
var nSt = $(window).scrollTop();
// var nWh = $(window).height();


var elementFixed = function(){
		if( nSt >= offsetTop ){
			$tabBox.addClass('tabbox-focus');
		}else{
			$tabBox.removeClass('tabbox-focus');
		}
}
var init = function(){
	$tabBtn.on('click', function(){
		var _this = $(this);
		var index = $tabBtn.index(_this);
		$tabBtn.removeClass('active').eq(index).addClass('active');
		$tabContent.addClass('hide').eq(index).removeClass('hide');
		if ($tabBox.hasClass('tabbox-focus')) {
				
			$('body,html').animate({
				'scrollTop': offsetTop 
			},300,function(){
				$tabBox.removeClass('tabbox-focus').removeAttr('style').find('.w960').removeAttr('style');
			});
		}
	});
	elementFixed();
	$(window).on('scroll', function(){
		nSt = $(window).scrollTop();
		elementFixed();
	});
}
module.exports = {
	init: init
}