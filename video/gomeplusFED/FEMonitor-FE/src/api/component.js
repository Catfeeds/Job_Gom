import Vue from 'vue';

export async function getConfsCount(params) {
	let res = await Vue.http.get(
		'config/count',
		{
			params
		});
	res = res.json().data.count;
	return res;
}

export async function getConfsList(params) {
	let res = await Vue.http.get(
		'config/',
		{
			params,
			loading: {
				progress: true
			}
		});
	res = res.json().data.result;
	return res;
}

export async function getConfsDetail(compid) {
	let res = await Vue.http.get(
		`config/${compid}`);
	res = res.json().data.result;
	return res;
}

