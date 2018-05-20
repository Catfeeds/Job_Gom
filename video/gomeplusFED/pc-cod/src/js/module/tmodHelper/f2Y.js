/**
 * f2Y  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var fenToYuan = require('utils/fenToYuan');

module.exports = function() {
	tmod.helper('f2Y', fenToYuan);
};