import { pageHost } from './tid';
const domainList = [
	'gomegj.com',
	'gome.com.cn',
	'gomehigo.hk',
	'gomeplus.com',
	'atguat.com.cn'
];
export let mainhost;
for (let i = 0, len = domainList.length; i < len; i++) {
	let dm = domainList[i];
	if (pageHost.indexOf(dm) > -1) {
		mainhost = dm;
		break;
	}
}
