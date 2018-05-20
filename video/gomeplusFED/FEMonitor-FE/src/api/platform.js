/**
 * Created by zhangmike on 16/8/24.
 */
import Vue from 'vue';

export async function findPlatform(params = {}) {
	let res = await Vue.http.get(
		'platform/findplatform', {
			params,
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}

export async function getPlatformCount(params) {
	let res = await Vue.http.get(
		'platform/count',
		{
			params
		},
		{
			loading: {
				progress: true
			}
		});
	res = res.json().data.count;
	return res;
}

export async function createPlatform(params = {}) {
	let res = await Vue.http.post(
		'platform/createplatform', params, {
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}

export async function findPlatformById(params = {}) {
	let res = await Vue.http.get(
		'platform/findplatformbyid', params, {
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}

export async function updatePlatform(params = {}) {
	let res = await Vue.http.post(
		'platform/updateplatform', params, {
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}

export async function deletePlatform(params = {}) {
	let res = await Vue.http.delete(
		'platform/deleteplatform/' + params, {
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}

export async function findUrlsByPlatid(params = {}) {
	let res = await Vue.http.get(
		'platform/findurlsbyplatid/' + params, {
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}
