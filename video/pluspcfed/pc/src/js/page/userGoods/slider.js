/*
*@des:顶部轮播
*/
require('../../plugin/jquery.bxslider');

var $sliderBox = $('[data-node="slider"]');
function init(){
	$sliderBox.bxSlider({
	    adaptiveHeight: true,
	    startSlide: 0,
	    infiniteLoop: true,
	    auto: true,
	    autoHover: true,
	    useCSS: false,
	    pagerTriggerEvent: 'mouseenter'
	})
}
module.exports.init = init;