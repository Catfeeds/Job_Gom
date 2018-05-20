export const routeConfig = (router) => {
	router.map({
		'/': {
			name: 'index',
			component: require('../components/index.vue'),
			subRoutes: {
				'/listRegisterPlatforms': {
					name: 'listRegisterPlatforms',
					component: require('../components/index.vue')
				}
			}
		},
		'/login': {
			name: 'login',
			component: require('../components/login/index.vue')
		},
		'/task': {
			component: require('../components/task/index.vue'),
			subRoutes: {
				'/new': {
					name: 'newTask',
					component: require('../components/task/new.vue')
				},
				'/list': {
					name: 'listTask',
					component: require('../components/task/list.vue')
				},
				'/detail/:id': {
					name: 'detailTask',
					component: require('../components/task/detail.vue')
				},
				'/edit/:id': {
					name: 'editProject',
					component: require('../components/task/edit.vue')
				}
			}
		},
		'/component': {
			component: require('../components/component/index.vue'),
			subRoutes: {
				'/new': {
					name: 'newComponent',
					component: require('../components/component/new.vue')
				},
				'/list': {
					name: 'listComponent',
					component: require('../components/component/list.vue')
				},
				'/detail/:id': {
					name: 'detailComponent',
					component: require('../components/component/detail.vue')
				},
				'/edit/:id': {
					name: 'editComponent',
					component: require('../components/component/edit.vue')
				}
			}
		},
		'/config': {
			component: require('../components/config/index.vue'),
			subRoutes: {
				'/listSchedule': {
					name: 'listSchedule',
					component: require('../components/config/schedule/index.vue')
				},
				'/listUsers': {
					name: 'listUsers',
					component: require('../components/config/user/index.vue')
				},
				'/detailUser/:id': {
					name: 'detailUser',
					component: require('../components/config/user/detail.vue')
				},
				'/addUser': {
					name: 'addUser',
					component: require('../components/config/user/new.vue')
				},
				'/listPlatforms': {
					name: 'listPlatforms',
					component: require('../components/config/platform/index.vue')
				}
			}
		},
		'/report': {
			component: require('../components/report/index.vue'),
			subRoutes: {
				'/new': {
					name: 'newReport',
					component: require('../components/report/new.vue')
				},
				'/list': {
					name: 'listReport',
					component: require('../components/report/list.vue')
				},
				'/detail/:id': {
					name: 'detailReport',
					component: require('../components/report/detail.vue')
				},
				'/edit/:id': {
					name: 'editReport',
					component: require('../components/report/edit.vue')
				}
			}
		},
		'/data': {
			component: require('../components/data/index.vue'),
			subRoutes: {
				'/new': {
					name: 'newData',
					component: require('../components/data/new.vue')
				},
				'/list': {
					name: 'listData',
					component: require('../components/data/list.vue')
				},
				'/detail/:id': {
					name: 'detailData',
					component: require('../components/data/detail.vue')
				},
				'/edit/:id': {
					name: 'editData',
					component: require('../components/data/edit.vue')
				}
			}
		},
		'/demo': {
			component: require('../components/demo/index.vue')
		}
	});

	router.redirect({
		'*': '/',
		'/task': '/task/list',
		'/report': '/report/list',
		'/component': '/component/list',
		'/data': '/data/list'
	});
};
