/**
 * substrLen  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var substrLen = function(str, len) {
	if (typeof len !== 'number') {
		len = 24;
	}
	if (str.length > len) {
		return str.substr(0, len) + '...';
	}
	return str;
};

module.exports = function() {
	tmod.helper('substrLen', substrLen);
};