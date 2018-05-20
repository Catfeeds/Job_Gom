
export interface SdkBp {
	selector: string;
	_point_id: string;
	pointParam: string;
	type: 'block' | 'point';
}
import { PI } from '../../BP';
import { win, dataUrl, tid } from '../../config';
import Ajax from '../../lib/xget';
import { isMobile } from '../../utils';

export let bps: SdkBp[];
export let bplength = 0;
// getSelector
export function setData(dataArray) {
	bps = dataArray;
	bplength = dataArray.length;
}
export function fetchData() {
	let pageUrl = PI.url();
	let fetchurl = dataUrl[tid === 'dc-7' ? 'pre' : 'pro'];
	let params = {
		pageUrl,
		platform: isMobile ? 'H5' : 'PC'
	};
	/* dev-only start */
	if (win.testinfo) {
		let env = tid === 'dc-7' ? 'pre' : 'pro';
		params['id'] = win.testinfo.socketid;
		params['env'] = win.testinfo.env || env;
		fetchurl = win.testinfo.fetch;
		console.log(params);
	}
	/* dev-only end */
	if (fetchurl) {
		let getAjax = new Ajax(fetchurl, params, {
			callback(res) {
				if (res.code === '200' && res.iserror === '0') {
					let data;
					if ((data = res.data) && (data = data.result)) {
						setData(data);
					} else {
						/* dev-only start */
						console.log('埋点数据为空');
						/* dev-only end */
					}
				} else {
					/* dev-only start */
					console.log('获取埋点数据失败');
					/* dev-only end */
				}
			}
		});
		getAjax.send();
	} else {
		/* dev-only start */
		console.log('该环境无请求地址');
		/* dev-only end */
	}
}
