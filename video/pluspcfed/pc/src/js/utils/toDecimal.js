/**
 * 精确位数
 * @author Zhengchun Fu
 * @param  {[type]} num 要转换的数字
 * @param  {[type]} l   要精确的位数
 * @param  {[type]} r   是否四舍五入
 * @return {[type]}     转换后的数值
 */
var toDecimal = function(num, digit, r) {
    digit = digit === undefined ? 2 : digit;
    var newVal = 0;
    var len = Math.pow(10, digit);
    var newNum = num / 1;

    if (r) {
        return Math.round(newNum * len) / len;
    }
    return Math.floor(newNum * len) / len;
};

module.exports = toDecimal;
