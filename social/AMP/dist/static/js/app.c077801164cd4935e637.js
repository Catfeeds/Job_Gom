webpackJsonp([1,0,2],[
/* 0 */
/***/ function(module, exports) {

	import Vue from 'vue';
	
	// directive
	import './directive/index.js';
	
	// filter
	import './filter/index.js';
	
	// app component
	import App from './app.vue';
	
	// router
	import router from './route.js';
	
	// vuex
	import store from './vuex/index.js';
	
	// element-ui
	import './ui.js';
	
	// 检测登录 记录用户信息 跳转页面
	import Http from 'http';
	import actions from 'actions';
	
	Http.get('api/user', {
			hideLoading: true
		})
		.then((res) => {
			new Vue({
				el: '#app',
				store: store,
				template: '<app></app',
				components: {
					app: App
				},
				router: router
			});
			if (res.data.iserror && res.data.code === 401) {
				// 未登录
				router.push({
					name: 'login'
				});
			} else {
				actions.setUserInfo(store, res.data.data);
				if (!res.data.data.isRegistered) {
					router.push({
						name: 'register'
					});
				}
			}
		});


/***/ }
]);