import fetch from 'utils/fetch';

export async function getUser(params) {
	let res = await fetch.get(
		'user/getUser');
	res = res.data;
	return res;
}

export async function login(params) {
	let res = await fetch.post(
		'/user/login', params, {
            loading: {
                circle: true
            }
        });
	res = res.data;
	return res;
}

export async function logout() {
	let res = await fetch.get(
		'user/logout');
	res = res.data;
	return res;
}

export async function syncData(userid) {
	let res = await fetch.get(
	`user/syncuserdata`);
	res = res.data;
	return res;
}
