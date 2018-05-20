/**
 * randomShowPic  - tmod helpers
 * 社交部分显示随机图片
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var randomShowPic = function(type) {
	// var num;
	if (type == 'face') {
		return $_CONFIG.imgpath + '/images/public/circle-default.png';
	} else if (type == 'loading') {
		return $_CONFIG.imgpath + '/images/public/loading.gif';
	}
};

module.exports = function() {
	tmod.helper('randomShowPic', randomShowPic);
};