/**
 * othersLink  - tmod helpers
 * 他人主页链接跳转
 * @author Qiaoli
 */

var tmod = require('tmodjs-loader/runtime');
var othersLink = function(id) {
    if ($_CONFIG.islogin !== '0' && $_CONFIG.userId == id) {
        return $_CONFIG.i_domain + 'index';
    } else {
        return $_CONFIG.group_domain + 'ta/' + id + '.html';
    }
};

module.exports = function() {
    tmod.helper('othersLink', othersLink);
};
