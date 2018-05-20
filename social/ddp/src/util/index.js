export const mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};

export const isEmptyObject = (e) => {
	for (let t in e) {
		return !1;
	}
	return !0;
};

export const isHttp = (url) => {
	return /^http|https:\/\//.test(url);
};

export const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

let utils = {};

utils.mixin = mixin;

export default utils;
