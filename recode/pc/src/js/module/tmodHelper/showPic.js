/**
 * showPic  - tmod helpers
 * 社交部分显示默认图片
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var showPic = function(pic, defaultpic) {
	if (pic === '') {
		return $_CONFIG.imgpath + '/images/public/' + defaultpic;
	} else {
		return pic;
	}
};

module.exports = function() {
	tmod.helper('showPic', showPic);
};