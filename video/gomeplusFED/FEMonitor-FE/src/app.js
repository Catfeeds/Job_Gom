/*global  process.env:true*/
/*eslint no-undef: "error"*/
import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

import VueAjax from 'vue-resource';
Vue.use(VueAjax);

import VuePagination from 'vue-pagination';
Vue.use(VuePagination);

import VueValidator from 'vue-validator';
Vue.use(VueValidator);

Vue.directive('echarts', require('./assets/js/directives/echarts'));
Vue.directive('waterfall', require('./assets/js/directives/waterfall'));

import './filter/index.js';

import httpConfig from './config/http.config.js';
Vue.http.options.root = httpConfig[process.env]; // ENV from webpack plugins DefinePlugin

console.log('current process.env: ' + process.env);

import App from './app.vue';

import { routeConfig } from './config/route.config.js';

const router = new Router({
	saveScrollPosition: false,
	linkActiveClass: 'active'
});

// load all router
routeConfig(router);

import actions from 'actions';
import store from 'store';
import {getUser} from './api/user';
import { check302 } from 'utils/response.js';

(async function() {
	let res = await getUser();
	// 未登陆，跳转到登陆页
	if (res.code === 200) {
		let data = res.data;
		actions.setUserInfo(store, data.result);
		if (data.group) {
			actions.setPermission(store, data.group.permission);
		}
	} else {
		actions.alert(store, {
			show: true,
			type: 'danger',
			msg: `获取用户信息失败,详细信息:<br>${JSON.stringify(res.data, null, 4)}`,
			dismissible: true
		});
	}

	router.start(App, '#app');
	/* if (res.data.result.TN === '匿名') {
		console.log('redirct to login page');
		// window.location.href = res.data.result;
		router.go({name: 'login'});
		return;
	}*/
})();

Vue.http.interceptors.push((request, next) => {
	let loadingStartTime = Date.now();
	if (request.loading) {
		actions.loading(store, request.loading);
	}
	next((res) => {
		if (request.loading) {
			let loadingEndTime = Date.now();
			let closeAll = {
				progress: false,
				circle: false
			};
			if (loadingEndTime - loadingStartTime < 200) {
				setTimeout(() => {
					actions.loading(store, closeAll);
				}, 200);
			} else {
				actions.loading(store, closeAll);
			}
		}
		let resData = res.json();
		if (resData.permission) {
			actions.setPermission(store, resData.permission);
		}
	});
});
