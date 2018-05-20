/**
 * Created by zhangmike on 16/8/24.
 */
import fetch from 'utils/fetch';
export async function getGroups(params = {}) {
	let res = await fetch.get(
		'/group', {
			params,
			loading: {
				progress: true
			}
		});
	res = res.data;
	return res;
}
