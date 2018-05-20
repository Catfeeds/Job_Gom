// 根据字符串生成二维码
var getQRCode = function(url) {
	return $_CONFIG.wap_url + 'q.php?t=' + encodeURIComponent(url);
};

module.exports = getQRCode;