/**
* @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
*/
/*global define */
'use strict';

const param = function (a) {
	var add = function (s, k, v) {
		v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
		s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
	}, buildParams = function (prefix, obj, s) {
		var i, len, key;

		if (Object.prototype.toString.call(obj) === '[object Array]') {
			for (i = 0, len = obj.length; i < len; i++) {
				buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i], s);
			}
		} else if (obj && obj.toString() === '[object Object]') {
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (prefix) {
						buildParams(prefix + '[' + key + ']', obj[key], s, add);
					} else {
						buildParams(key, obj[key], s, add);
					}
				}
			}
		} else if (prefix) {
			add(s, prefix, obj);
		} else {
			for (key in obj) {
				add(s, key, obj[key]);
			}
		}
		return s;
	};
	return buildParams('', a, []).join('&').replace(/%20/g, '+');
};

export default param;
