import {win} from '../config';
// 从字符串 src 中查找 k+sp 和  e 之间的字符串，如果 k==e 且 k 只有一个，或者 e 不存在，从 k+sp 截取到字符串结束
// abcd=1&b=1&c=3;
// abdc=1;b=1;a=3;
export const stringSplice = function(src, k, e, sp) {
	if (src === "") {
		return "";
	}
	sp = (sp === "") ? "=" : sp;
	k += sp;
	var ps = src.indexOf(k);
	if (ps < 0) {
		return "";
	}
	ps += k.length;
	var pe = src.indexOf(e, ps);
	if (pe < ps) {
		pe = src.length;
	}
	return src.substring(ps, pe);
};
// 惰性函数trim
export const trim = function() {
	if (String.prototype.trim) {
		return function(str) {
			return str.trim();
		};
	} else {
		return function (str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}
}();
export const jsonToQuery = function(json) {
	var query = '';
	for (var i in json) {
		if (json.hasOwnProperty(i)) {
			query += i + '=' + json[i] + '&';
		}
	}
	return query.substr(0, query.length - 1);
};
// 惰性函数addEvent
export const JSONParse = function() {
	if (win['JSON']) {
		return JSON.parse;
	} else {
		return function(jsonstr) {
			return (new Function("return" + jsonstr))();
		};
	}
}();

export const insertQuery = function(href, json) {
	let query = jsonToQuery(json);
	if (!query) {
		return false;
	}
	// 提取可能的锚点
	let hash = href.match(/(.+?)(#.*)$/);
	let _href;
	if (hash) {
		_href = hash[1];
		hash = hash[2];
	} else {
		_href = href;
	}
	return (_href.indexOf('?') > -1 ? `${_href}&${query}` : `${_href}?${query}`) + (hash || '');
};