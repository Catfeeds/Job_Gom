/*global  process.env:true*/
/*eslint no-undef: "error"*/
import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

import VueAjax from 'vue-resource';
Vue.use(VueAjax);

import VuePagination from 'vue-pagination';
Vue.use(VuePagination);

import './filter/index.js';

import httpConfig from './config/http.config.js';
Vue.http.options.root = httpConfig[process.env]; // ENV from webpack plugins DefinePlugin
Vue.http.options.emulateJSON = true;

console.log('current process.env: ' + process.env);

import App from './app.vue';

import {
	routeConfig
} from './config/route.config.js';

// 过滤器
import filterConfig from './config/filter.config.js';

filterConfig(Vue);

const router = new Router({
	saveScrollPosition: false,
	linkActiveClass: 'active'
});

// load all router
routeConfig(router);

import actions from 'actions';
import store from 'store';
import {
	check302, logout
} from 'utils/response.js';
Vue.http.options.credentials = true;
Vue.http.options.headers = {
	isFront: true
};

Vue.http.interceptors.push((request, next) => {
	let loadingStartTime = Date.now();
	if (request.loading) {
		actions.loading(store, true);
	}
	next((res) => {
		if (request.loading) {
			let loadingEndTine = Date.now();
			if (loadingEndTine - loadingStartTime < 200) {
				setTimeout(() => {
					actions.loading(store, false);
				}, 200);
			} else {
				actions.loading(store, false);
			}
		}
		if (!res.body) {
			logout();
			return false;
		}
		let resData = res.json();
		if (resData.permission) {
			actions.setPermission(store, resData.permission);
		}

		// 未登陆，跳转到登陆页)
		if (check302(resData)) {
			logout();
			return false;
		}
		if (resData.code && resData.code === '403') {
			// 无权限
			actions.alert(store, {
				show: true,
				msg: '无权限！',
				type: 'danger'
			});
			// location.href = '/#!/';
		}
	});
});

// headers: {Cookie: document.cookie},
Vue.http.get('user/getUser').then((res) => {
	return res.json();
}).then((res) => {
	actions.setUserInfo(store, res.data.result);
	actions.setPermission(store, res.permission);
	router.start(App, '#app');
});
