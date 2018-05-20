import Vue from 'vue';

/*
 * 格式化时间
 * format: yyyy=年   MM=月  dd=天   hh=时   mm=分   ss=秒
 * example: <p>{{1482210745068 | date('yyyy-MM-dd')}}</p>
 * return: 2016-12-20
 */
Vue.filter('date', (value, format) => {
	let curDate = new Date(value);
	const o = {
		'M+': curDate.getMonth() + 1, // 月份
		'd+': curDate.getDate(), // 日
		'h+': curDate.getHours(), // 小时
		'm+': curDate.getMinutes(), // 分
		's+': curDate.getSeconds(), // 秒
		'q+': Math.floor((curDate.getMonth() + 3) / 3), // 季度
		'S': curDate.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (curDate.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	}
	return format;
});

/*
 * 格式化金钱
 * sep: ¥  $
 * dot: number 小数位数
 * example: <p>{12345 | currency('¥', 2)}}</p>
 * return: ¥123.45
 */
Vue.filter('currency', (value, sep, dot) => {
	// 以 分 为单位进行格式化
	return (sep || '') + (value/100).toFixed(dot || 2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
});
