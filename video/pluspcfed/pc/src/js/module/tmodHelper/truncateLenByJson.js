/**
 * truncateLenByJson  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var truncate = require('utils/truncate');
var byteLen = require('utils/byteLen');
var encodeHTML = require('utils/encodeHtml');
var face = require('module/popup/face/face');

var truncateLenByJson = function(str, len) {
	var strLength = 0;
	var Len;
	for (var i in str) {
		if (str[i] === true) {
			strLength++;
		}
	}
	if (strLength !== 0) {
		var num = strLength;
		Len = len - (num * 8);
	} else {
		Len = len;
	}
	var l = byteLen(str.str);
	var s;
	if (l > Len) {
		s = truncate(str.str, Len) + '...';
	} else {
		s = str.str;
	}
	return face.parseEmoji(encodeHTML(s));
};

module.exports = function() {
	tmod.helper('truncateLenByJson', truncateLenByJson);
};