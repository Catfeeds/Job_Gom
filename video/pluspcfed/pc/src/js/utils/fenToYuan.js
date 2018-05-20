/**
 * 分转化成元
 * @param  {[Number]} val 要转换的值
 * @return {[String]}     转换成元后精确到两位小数的字符串
 */
function fenToYuan(val) {
	var newVal = (val / 100).toFixed(2);
	newVal = newVal == '0.00' ? '0' : newVal;
	return newVal;
}

module.exports = fenToYuan;