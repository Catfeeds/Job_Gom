/*
 * 用户相关过滤器（用户类型，用户状态）
 */

import Vue from 'vue';

const userTypeMap = {
	0: '超级管理员',
	1: '客服经理',
	2: '客服'
};

Vue.filter('userType', function(val) {
	return userTypeMap[val];
});

const userStatusMap = {
	0: '在线',
	1: '忙碌',
	2: '离线'
};

Vue.filter('userStatus', function(val, format) {
	return userStatusMap[val];
});

Vue.filter('Date', function(value, format) {
	const type = typeof value;
	if (type === 'string') {
		return value
	} else if (type == 'number') {
		return new Date(value).Format(format);
	}
});

Date.prototype.Format = function(fmt) {
	const o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度
		'S': this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (const k in o){
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	}
	return fmt;
};

Vue.filter('faceShow', function(str) { //渲染记录的表情图片

	const reg = /\[(.*?)\]/gi;
	str = str + '';
	const arr = str.split(reg);
	let html = '';
	const faces = ["YY", "鄙视", "大哭", "大笑", "得意",
		"恶心", "愤怒", "尴尬", "惊恐", "迷茫",
		"可怜", "抠鼻", "困", "流泪", "努力",
		"亲", "色", "伤心", "石化", "睡觉",
		"微笑", "疑问", "阴险", "晕", "抓狂"
	];
	arr.forEach(function(item) {

		if (item === "YY" || item === "鄙视" || item === "大哭" || item === "大笑" || item === "得意" || item === "得意" || item === "得意" || item === "恶心" || item === "愤怒" || item === "尴尬" || item === "惊恐" || item === "迷茫" || item === "可怜" || item === "抠鼻" || item === "困" || item === "流泪" || item === "努力" || item === "亲" || item === "色" || item === "伤心" || item === "石化" || item === "睡觉" || item === "微笑" || item === "疑问" || item === "阴险" || item === "晕" || item === "抓狂") {
			html += "<img class='face' style='width:24px;' src='/dist/img/faces/" + item + ".png'/>"
		} else {
			html += item;
		}
	});
	return html;
})
