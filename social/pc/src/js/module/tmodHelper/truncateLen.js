/**
 * truncateLen  - tmod helpers
 * @author Zhengchun Fu
 */
var tmod = require('tmodjs-loader/runtime');
var encodeHTML = require('utils/encodeHtml');
var face = require('module/popup/face/face');

var truncateLen = function(str, len) {
    var s = str;
    if (str.length > len) {
        s = s.substring(0, len) + '...';
    }
    return face.parseEmoji(encodeHTML(s));
};

module.exports = function() {
    tmod.helper('truncateLen', truncateLen);
};