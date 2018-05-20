/**
 * Created by zhangmike on 16/8/24.
 */
import Vue from 'vue';

export async function executeStartSchedule(params) {
	let res = await Vue.http.post(
		'schedule/executeStartRule', params);
	res = res.json();
	return res;
}

export async function executeCloseSchedule(params) {
	let res = await Vue.http.post(
		'schedule/executeCloseRule', params);
	res = res.json();
	return res;
}
