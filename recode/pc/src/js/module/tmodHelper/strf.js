/**
 * strf  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var strf = function(data) {
	return JSON.stringify(data);
};

module.exports = function() {
	tmod.helper('strf', strf);
};