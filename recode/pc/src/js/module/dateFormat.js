/**
 * 日期时间格式化
 * @author 	Zhengchun Fu
 * @date 	2016-05-27
 */

var dateFormat = function(time, template) {
	time = parseInt(time);
	var date = new Date(time);
	var Y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var i = date.getMinutes();
	var s = date.getSeconds();

	function leftPad(n) {
		if (n < 10) {
			return '0' + n;
		}
		return n + '';
	}

	var data = {
		Y: Y,
		y: Y.toString().substr(-2),
		M: leftPad(m),
		m: m,
		D: leftPad(d),
		d: d,
		H: leftPad(h),
		h: h,
		I: leftPad(i),
		i: i,
		S: leftPad(s),
		s: s
	};

	var reg = /([YMDHISymdhis])/g;
	return template.replace(reg, function(match, u1) {
		return data[u1];
	});
};

module.exports = dateFormat;