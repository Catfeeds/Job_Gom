export const routeConfig = (router) => {
	router.map({
		'/': {
			name: 'index',
			component: require('../components/index.vue')
		},
		'/login': {
			name: 'login',
			component: require('../components/login/index.vue')
		},
		'/project': {
			component: require('../components/project/index.vue'),
			subRoutes: {
				'/new': {
					name: 'newProject',
					component: require('../components/project/new.vue')
				},
				'/list': {
					name: 'listProject',
					component: require('../components/project/list.vue')
				},
				'/detail/:id': {
					name: 'detailProject',
					component: require('../components/project/detail.vue')
				},
				'/edit/:id': {
					name: 'editProject',
					component: require('../components/project/edit.vue')
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
		'/data': {
			component: require('../components/data/index.vue'),
			subRoutes: {
				'/new': {
					name: 'newData',
					component: require('../components/data/edit.vue')
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
		'/tool': {
			name: 'tool',
			component: require('../components/tool/edit')
		},
		'/user': {
			name: 'user',
			component: require('../components/user/index.vue')
		},
		'/demo': {
			component: require('../components/demo/index.vue')
		}
	});

	router.redirect({
		'*': '/',
		'/project': '/project/list',
		'/report': '/report/list',
		'/component': '/component/list',
		'/data': '/data/list'
	});
};
