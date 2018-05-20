import Vue from 'vue';
import store from 'store';

export const check302 = (res = {}) => {
	// 302 未登陆，需要重定向到到登陆页
	return parseInt(res.code) === 302 && parseInt(res.iserror) === 1;
};

export const check403 = (res) => {
	// 403 访问接口无权限
	return parseInt(res.code) === 403 && parseInt(res.iserror) === 1;
};

export const logout = () => {
	Vue.http({
		url: store.state.logoutUrl,
		method: 'get'
	}).then(() => {
		// 统一登陆页
		window.location.href = store.state.loginUrl;
	});
};
