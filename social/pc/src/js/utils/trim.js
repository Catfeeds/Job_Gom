/**
 * 删除字符串str的收尾空格
 */

var trim = function (str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
};

module.exports = trim;