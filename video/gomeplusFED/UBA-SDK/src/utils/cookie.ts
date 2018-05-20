import { doc } from '../config';
import { stringSplice } from './string';
export const getCookie = function(ckName) {
	if (undefined === ckName || "" === ckName) {
		return "";
	}
	return stringSplice(doc.cookie, ckName, ";", "");
};
// 写Cookie
export const setCookie = function(ckName, ckValue, ckDays, ckDomain?, times = 86400000) {
	if (ckValue != null) {
		let cookie = ckName + "=" + ckValue + ";path=/";
		if (ckDays) {
			var now = new Date();
			var time = now.getTime();
			time = time + times * ckDays;
			now.setTime(time);
			// time = now.getTime();
			cookie += ";expires=" + now.toUTCString();
		}
		ckDomain && (cookie += ";domain=" + ckDomain);
		doc.cookie = cookie;
	}
};
// 删cookie
export const delCookie = function(key, value, domain) {
	let cookie = '';
	key && (cookie = key + "=");
	value && (cookie += value);
	cookie += ';path=/;expires=Fri, 31 Dec 1999 23:59:59 GMT';
	domain && (cookie += ";domain=" + domain);
	doc.cookie = cookie;
};
