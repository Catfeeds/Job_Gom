/**
 * 联系商家
 * @author Zhengchun Fu
 */
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');
var contactMerchant = function() {
	var $imgPath = $_CONFIG.imgpath;
	alert('', {
		okCls: 'hide',
		content: '<div class="sm-download"><img src="' + $imgPath + '/images/public/ma1.jpg"><p>描二维码，下载国美+APP联系商家</p></div>'
	});
};

module.exports = contactMerchant;