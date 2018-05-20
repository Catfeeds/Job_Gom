import { win, doc, allowSendLog, PLUS_REGEX } from '../config';
import { stringSplice } from './string';
export const isMobile = function() {
	try {
		doc.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}();
// 闭包封闭img，防止低版本浏览器请求丢失
export const sendRequest = function() {
	var imgs: HTMLImageElement[] = [];
	return function(url) {
		if (allowSendLog) {
			var img = new Image();
			imgs.push(img);
			img.src = url;
		}
	};
}();
export const collects = function(Type, pre) {
	var data: string[] = [];
	for (var i in Type) {
		if (Type.hasOwnProperty(i)) {
			data.push(i + ':' + Type[i]());
		}
	}
	return pre + data.join('|');
};
export const getSource = function() {
	return 'source=' + encodeURIComponent(stringSplice(win.location.href, "source", "&", ""));
};
export const getWm = function() {
	return 'wm=' + (isMobile ? 'm' : 'www');
};
export const getRandom = function() {
	var now = new Date();
	return Math.ceil(Math.random() * 1000000000000) + "." + now.getTime();
};
export function getSubDomain(str, pattern = PLUS_REGEX) {
	let matched = str.match(pattern);
	return (matched && matched[1]);
}

export let querySelector = function(_selector) {
	if (!document.querySelector) {
		querySelector = function(selector) {
			var head = document.documentElement.firstChild;
			var styleTag = document.createElement("STYLE");
			if (head) {
				head.appendChild(styleTag);
				document['__qsResult'] = [];
				styleTag['styleSheet'].cssText = selector + "{x:expression(document.__qsResult.push(this))}";
				window.scrollBy(0, 0);
				head.removeChild(styleTag);
				return document['__qsResult'][0] || null;
			}
		};
	} else {
		querySelector = (selector) => document.querySelector(selector);
	}
	return querySelector(_selector);
};
