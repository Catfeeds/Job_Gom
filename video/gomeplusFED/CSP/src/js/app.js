/*
 * APP Entrance
 */

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed);

import VueAjax from 'vue-resource';
Vue.use(VueAjax);

import env from 'env'; // set in webpack config of alias
import httpConfig from './config/http.json';
Vue.http.options.root = httpConfig[env];

const router = new Router({
	saveScrollPosition: true,
	linkActiveClass: 'active'
});

// filter
import './filter/index.js';

// directive
// import './directive/tips.js';

// 过滤所有的ajax请求
import store from 'store';
import actions from 'actions';
Vue.http.interceptors.push((request, next) => {
	actions.loading(store, true);
	next((response) => {
		response.data = JSON.parse(response.body);
		actions.loading(store, false);
		if (!response.data.result) {
			actions.alert(store, {
				show: true,
				msg: response.data.message,
				type: 'danger'
			});
		}
	});
});

import App from './component/app.vue';

import Login from './component/login/index.vue';
import Im from './component/im/index.vue';

import Dashboard from './component/dashboard/index.vue';
import AccountManage from './component/dashboard/account-manage.vue';
import ChatRecord from './component/dashboard/chat-record.vue';
import Password from './component/dashboard/password.vue';
import CommonMsg from './component/dashboard/common-msg.vue';
import Configuration from './component/dashboard/config.vue';

router.map({
	'/login': {
		name: 'Login',
		component: Login
	},
	'/im': {
		name: 'Im',
		component: Im
	},
	'/dashboard': {
		component: Dashboard,
		subRoutes: {
			'/account-manage': {
				name: 'AccountManage',
				component: AccountManage
			},
			'/chat-record': {
				name: 'ChatRecord',
				component: ChatRecord
			},
			'/password': {
				name: 'Password',
				component: Password
			},
			'/common-msg': {
				name: 'CommonMsg',
				component: CommonMsg
			},
			'/config': {
				name: 'Configuration',
				component: Configuration
			}
		}
	}
});

router.redirect({
	'*': '/dashboard'
});

router.start(App, '#app');

// console.log(`%c ___________/\\\\\\\\\\\\\\\\\\_____________/\\\\\\\\\\\\\\\\\\\\\\____________/\\\\\\\\\\\\\\\\\\\\\\\\\\__________
// _________/\\\\\\////////____________/\\\\\\/////////\\\\\\_________\\/\\\\\\/////////\\\\\\__________
// ________/\\\\\\/____________________\\//\\\\\\______\\///__________\\/\\\\\\_______\\/\\\\\\__________
// ________/\\\\\\_______________________\\////\\\\\\_________________\\/\\\\\\\\\\\\\\\\\\\\\\\\\\/__________
// ________\\/\\\\\\__________________________\\////\\\\\\______________\\/\\\\\\/////////__________
// _________\\//\\\\\\____________________________\\////\\\\\\___________\\/\\\\\\________________
// ___________\\///\\\\\\___________________/\\\\\\______\\//\\\\\\__________\\/\\\\\\_______________
// ______________\\////\\\\\\\\\\\\\\\\\\_________\\///\\\\\\\\\\\\\\\\\\\\\\/___________\\/\\\\\\______________
// _________________\\/////////____________\\///////////_____________\\///______________

// `, 'color: rgba(127,41,38,1)');
