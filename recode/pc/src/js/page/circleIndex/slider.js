/*
 *@author:dongyukuan
 *@desc:初始化轮播图 
 *@date:2017/5/5
 */
require('../../plugin/jquery.bxslider');

var slider = function($selector){
	$selector.bxSlider({
	    adaptiveHeight: true,
	    startSlide: 0,
	    infiniteLoop: true,
	    auto: true,
	    autoHover: true,
	    useCSS: false,
	    pagerTriggerEvent: 'mouseenter'
	})
}
//首页banner
var $bannerBox = $('[data-node=bannerBox]');
var $bannerImgBox = $bannerBox.find('[data-node=bannerImg]');
var bannerSlider = function(){
	slider($bannerImgBox)
};
//逛逛商品banner
var $goodsBannerBox = $('[data-node=goodsBannerBox]');
var $goodsBannerImg = $goodsBannerBox.find('[data-node=goodsBannerImg]');
var ggSlider = function(){
	slider($goodsBannerImg)
};
//摧毁轮播
var destorySlider = function($selector){
	$selector.destroySlider();
}
var destoryBanner = function(){
	destorySlider($bannerImgBox);
};

var destoryGG = function(){
	destorySlider($goodsBannerImg);
}
module.exports = {
	bannerSlider:bannerSlider,
	ggSlider:ggSlider,
	destoryGG:destoryGG,
	destoryBanner:destoryBanner
}
