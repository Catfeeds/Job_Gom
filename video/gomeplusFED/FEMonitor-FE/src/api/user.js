import Vue from 'vue';

export async function getUser(params) {
	let res = await Vue.http.get(
		'user/getUser');
	res = res.json();
	return res;
}

export async function checkPassword(params) {
	let res = await Vue.http.get(
		'user/checkpassword', {
			params,
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}
export async function checkValidate(params) {
	let res = await Vue.http.get(
		'user/checkValidate', {
			params,
			loading: {
				progress: true
			}
		});
	res = res.json();
	return res;
}
export async function signUp(params) {
	params.method = 'signup';
	let res = await Vue.http.post(
		'user', params);
	res = res.json();
	return res;
}

export async function signIn(params) {
	params.method = 'signin';
	let res = await Vue.http.post(
		'user', params);
	res = res.json();
	return res;
}

export async function signOut() {
	let res = await Vue.http.post(
		'user/signout');
	res = res.json();
	return res;
}

export async function getUsersCount(params) {
	let res = await Vue.http.get(
		'user/count',
		{
			params
		});
	res = res.json().data.count;
	return res;
}

export async function getUsersPagination(params) {
	let res = await Vue.http.get(
		'user/',
		{
			params,
			loading: {
				progress: true
			}
		});
	res = res.json().data.result;
	return res;
}

export async function getUserInfo(userid) {
	let res = await Vue.http.get(
	`user/${userid}`);
	res = res.json().data.result;
	return res;
}

export async function deleteUsers(ids) {
	let res = await Vue.http.delete(
		'user/', {
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

export async function updateUserInfo(userid, data) {
	let res = await Vue.http.put(
		`user/${userid}`, data, {
			loading: {
				circle: true
			}
		});
	res = res.json();
	return res;
}
export async function banUser(userid) {
	let res = await Vue.http.post(
		`user/${userid}/ban`
		);
	res = res.json();
	return res;
}

export async function activateUser(userid) {
	let res = await Vue.http.post(
		`user/${userid}/activate`
		);
	res = res.json();
	return res;
}
