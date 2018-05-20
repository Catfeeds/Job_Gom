/**
 * dateFormat  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var dateFormat = require('module/dateFormat');

module.exports = function() {
	tmod.helper('dateFormat', dateFormat);
};