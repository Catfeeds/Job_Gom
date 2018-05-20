/**
 * truncateByteLen  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var truncate = require('utils/truncate');
var byteLen = require('utils/byteLen');
var encodeHTML = require('utils/encodeHtml');
var face = require('module/popup/face/face');

var truncateByteLen = function(str, len) {
	var l = byteLen(str);
	var s;
	if (l > len) {
		s = truncate(str, len) + '...';
	} else {
		s = str;
	}
	return face.parseEmoji(encodeHTML(s));
};

module.exports = function() {
	tmod.helper('truncateByteLen', truncateByteLen);
};