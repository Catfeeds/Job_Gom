// 防止BPConfig不存在的情况
window['BPConfig'] = window['BPConfig'] || {};
export var pageHost = window.location.host;
/* dev-only start */
if (window['testinfo']) {
	let originurl = decodeURIComponent(window.location.href.split('&')[0].split('=')[1]);
	let temp = originurl.match(/https?:\/\/(.+?)\//);
	pageHost = temp ? temp[1] : originurl.replace(/https?:\/\//g, '');
}
/* dev-only end */
export const PLUS_REGEX = /\.?(.+)\.gomeplus\.com/;
export const GOME_REGEX = /^(.+\.)*gome\.com\.cn/;
const hostList = [
	{ key: 'dc-7', rule: /pre|dev|test|atg|uat/ }, // 所有测试 pri: 1
	{ key: 'dc-14', rule: /^(.+\.)*wap\.gomegj\.com/ }, // 国美管家WAP端 pri: 2
	{ key: 'dc-10', rule: /^(.+\.)*diy\.gome\.com\.cn/ }, // C2M PC端 pri: 2
	{ key: 'dc-12', rule: /^(.+\.)*m\.gomehigo\.hk/ }, // 海外购WAP端 pri: 2
	{ key: 'dc-2', rule: /^(.+\.)*(m\.gome\.com\.cn|m\.gomeplus\.com)/ }, // 国美在线和国美Plus WAP端 pri: 2
	{ key: 'dc-6', rule: /^(.+\.)*gomehigo\.hk/ }, // 海外购PC端 pri: 3
	{ key: 'dc-1', rule: GOME_REGEX }, // 国美在线PC端 pri: 3
	{ key: 'dc-13', rule: /^(.+\.)*gomegj\.com/ }, // 国美管家PC端 pri: 3
	{ key: 'dc-16', rule: PLUS_REGEX } // 国美Plus PC端 pri: 3
];
// export let env = 'pre';
export let tid = window['BPConfig'].tid;
export const isGomePlus = PLUS_REGEX.test(pageHost);
if (tid == null) {
	for (let data of hostList) {
		if (data.rule.exec(pageHost)) {
			tid = data.key;
			break;
		}
	}
	window['BPConfig'].tid = tid;
}
