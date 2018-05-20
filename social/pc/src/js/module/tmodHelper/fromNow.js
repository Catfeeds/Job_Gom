//将日期时间转换为显示距现在时间
var tmod = require('tmodjs-loader/runtime');
var fromNow = require('utils/fromNow');

module.exports = function() {
	tmod.helper('fromNow',fromNow);
};