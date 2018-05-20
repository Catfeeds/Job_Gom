
import { setCookie, getCookie } from '../../utils';
const CMPID_REGEX = /([?&])cmpid=(.+?)(&(.+))?(#.*)?$/;
const CMPID_FLAG = 'plus_';
var cmpid;
export function storeCmpid(href, host, time) {
	/* dev-only start */
	if (window['testinfo']) {
		href = window['testinfo'].url;
		host = window.location.host.replace(/:\d+/, '');
	}
	/* dev-only end */
	let matched = href.match(CMPID_REGEX);
	cmpid = (matched && matched[2]);
	if (cmpid) {
		if (cmpid.indexOf(CMPID_FLAG) !== 0) {
			cmpid = CMPID_FLAG + cmpid;
		}
		// store it to cookie
		setCookie('cmpid', cmpid, time, host, 60000);
	}
	return cmpid;
}
export function getCmpid() {
	return cmpid || (cmpid = getCookie('cmpid'));
}
