export const mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

export const copyObj = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

export const objType = (obj) => {
	return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};

export const formatDate = (value, format) => {
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
};

export const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// 时间间隔 unit {day: true ...}
export const formatTimeByUnit = (sMs, eMs, unit) => {
	let _result = {};
	let timeMsMap = {
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000,
		second: 1000
	};
	var hasGone = 0;
	if (unit.day) {
		_result.day = Math.floor((eMs - sMs - hasGone) / timeMsMap.day) + 1;
		hasGone += _result.day * timeMsMap.day;
	}
	if (unit.hour) {
		_result.hour = Math.floor((eMs - sMs - hasGone) / timeMsMap.hour);
		hasGone += _result.hour * timeMsMap.hour;
	}
	if (unit.minute) {
		_result.minute = Math.floor((eMs - sMs - hasGone) / timeMsMap.minute);
		hasGone += _result.minute * timeMsMap.minute;
	}
	if (unit.second) {
		_result.second = Math.floor((eMs - sMs - hasGone) / timeMsMap.second);
		hasGone += _result.second * timeMsMap.second;
	}
	return _result;
};

// 从 url 中获取图片尺寸
export const getImgSize = (url) => {
	let ele = document.createElement('img');
	ele.setAttribute('src', url);
	ele.style.opacity = 0;
	document.body.appendChild(ele);
	let width = ele.clientWidth;
	let height = ele.clientHeight;
	ele.remove();
	return {
		width: width,
		height: height
	};
};
