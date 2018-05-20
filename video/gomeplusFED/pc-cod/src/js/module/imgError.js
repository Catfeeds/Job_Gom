/**
 * 图片加载失败，用默认图片替换
 * @author  Zhengchun Fu
 * 
 * 使用方法：
 * <img src="#" onerror="imgError(this)" />   使用小图，正方形
 * <img src="#" onerror="imgError(this, 'l')" />   使用大图，横向矩形
 * 			
 * @param  {[obj]} img  图片对象
 * @param  {[string]} type 图片size，'m'或不给为小图，正方形。 'l'为大图，横向举矩形。'h'为默认头像。
 */
var imgs = {
	m: 'img-error.png',
	l: 'img-error-big.png',
	h: 'head-default.png'
};

window.imgError = function(img, type) {
	var imgOrigin = imgs[type];
	imgOrigin = imgOrigin ? imgOrigin : imgs.m;
	img.onerror = '';
	img.src = $_CONFIG.imgpath + '/images/public/' + imgOrigin;
};