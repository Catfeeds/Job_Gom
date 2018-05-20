import Vue from 'vue';

export async function createTask(params) {
	let res = await Vue.http.post(
		'task/', params, {
			loading: {
				circle: true
			}
		});
	res = res.json();
	return res;
}

export async function getTasksCount(params) {
	let res = await Vue.http.get(
		'task/count',
		{
			params
		});
	res = res.json().data.count;
	return res;
}

export async function getTasksPagination(params) {
	let res = await Vue.http.get(
		'task/',
		{
			params,
			loading: {
				progress: true
			}
		});
	res = res.json().data.result;
	return res;
}

export async function getTaskInfo(taskid) {
	let res = await Vue.http.get(
	`task/${taskid}`);
	res = res.json().data.result;
	return res;
}

export async function getRecordInfo(taskid, types) {
	let res = await Vue.http.get(
	`record/${taskid}`,
		{
			params: {
				types
			},
			loading: {
				circle: true
			}
		});
	res = res.json().data;
	return res;
}

export async function deleteTasks(ids) {
	let res = await Vue.http.delete(
		'task/', {
			body: {
				ids
			},
			loading: {
				circle: true
			}
		});
	res = res.json();
	return res;
}
