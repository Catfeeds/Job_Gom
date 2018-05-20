/**
 * 获取字数长度
 */
var getCharLength = function(str) {
	var len = 0,
		code = 0;
	for (var i = 0; i < str.length; i++) {
		code = str.charCodeAt(i);
		if (code >= 0 && code < 128) {
			len += 0.5;
		} else {
			len += 1;
		}
	}
	return Math.ceil(len);
};

module.exports = getCharLength;
