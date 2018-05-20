/**
 * Created by zhangmike on 16/8/24.
 */
import Vue from 'vue';

export async function findUrls(params = {}) {
	let res = await Vue.http.get(
		'urls/', {
			params,
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}

export async function getUrlsCount(params) {
	let res = await Vue.http.get(
		'urls/count',
		{
			params
		});
	res = res.json().count;
	return res;
}

export async function regCancelUrl(params) {
	let res = await Vue.http.put(
		'urls/regcancelUrl',
		{
			params
		});
	res = res.json().data;
	return res;
}

export async function checkReg(params) {
	console.log('check...', params);
	let res = await Vue.http.get(
		'urls/checkReg',
		{
			params
		});
	res = res.json();
	console.log(res);
	return res;
}
