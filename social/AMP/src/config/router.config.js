export default [{
	path: '/',
	redirect: '/app/index'
}, {
	path: '/app',
	component: require('../components/app/main.vue'),
	redirect: '/app/index',
	children: [{
		path: 'index', // 首页
		name: 'index',
		component: require('../components/app/index/main.vue')
	}, {
		path: 'account', // 我的账户
		component: require('../components/app/account/main.vue'),
		redirect: '/app/account/account-overview',
		children: [{
			path: 'account-overview', // 账户概览
			component: require('../components/app/account/account-overview.vue'),
		}, {
			path: 'account-detail-list', // 账户明细
			component: require('../components/app/account/account-detail.vue'),
			redirect: '/app/account/account-detail-list/1',
			children:[{
				path: '/app/account/account-detail-list/:type',
				name: 'account-detail-list',
				component: require('../components/app/account/account-detail-list.vue'),
			},{
				path: '/app/account/account-day-detail/:type/:date',
				name: 'account-day-detail',
				component: require('../components/app/account/account-day-detail.vue'),
			}]
		}, {
			path: 'virtual-money-account', //虚拟金账户
			component: require('../components/app/account/virtual-money-account.vue'),
		}, {
			path: 'contact-way', // 联系方式
			component: require('../components/app/account/contact-way.vue'),
		}, {
			path: 'password', // 修改密码
			component: require('../components/app/account/password.vue'),
		}, {
			path: 'message', // 站内信
			component: require('../components/app/account/message.vue'),
			redirect: '/app/account/message/list/1',
			children: [{
				path: 'list/:type', // 站内信
				name: 'message-list',
				component: require('../components/app/account/message-list.vue')
			},{
				path: 'detail/:type/:id', // 站内信
				name: 'message-detail',
				component: require('../components/app/account/message-detail.vue')
			}]
		}, {
			path: 'balance', // 余额提醒
			component: require('../components/app/account/balance.vue'),
		}, {
			path: 'business-aptitude', // 商家资质
			component: require('../components/app/account/business-aptitude.vue'),
		}, {
			path: 'ad-standard', // 广告审核规范
			component: require('../components/app/account/ad-standard.vue'),
		}, {
			path: 'agreement1', // 用户协议 1
			component: require('../components/app/account/agreement1.vue'),
		}]
	}, {
		path: 'put', // 投放管理
		component: require('../components/app/put/main.vue'),
		redirect: '/app/put/plan',
		children: [{
			path: 'plan', // 投放计划
			component: require('../components/app/put/plan.vue'),
		}, {
			path: 'unit/:id', // 投放单元 params [id -> 投放单元 id]
			name: 'unit',
			component: require('../components/app/put/unit.vue'),
		}, {
			path: 'idea/:id', // 投放单元 params [id -> 投放单元 id]
			name: 'idea',
			component: require('../components/app/put/idea.vue'),
		}]
	}, {
		path: 'report', // 数据报表
		redirect: '/app/report/ads/1/1',
		component: require('../components/app/report/main.vue'),
		children: [{
			path: 'ads/:type/:tab',
			name: 'ads',
			component: require('../components/app/report/ads.vue')
		},{
			path: 'rebate/:tab',
			name: 'rebate',
			component: require('../components/app/report/rebate.vue')
		}]
	},{
		path: 'register', // 商家入驻,
		name: 'register',
		component: require('../components/app/register/main.vue')
	}]
}, {
	path: '/login', // 登录
	name: 'login',
	component: require('../components/login/main.vue')
}, {
	path: '*',
	redirect: '/app/index'
}];
