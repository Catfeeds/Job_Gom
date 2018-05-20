import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import store from 'store';

// router
import routerConfig from './config/router.config.js';

const router = new VueRouter({
	routes: routerConfig
});

router.beforeEach((to, from, next) => {
	if (to.path === '/app/index' || to.path === '/app/register') {
		// hack 掉左侧白边
		document.body.style['background-image'] = 'none';
	} else if (to.path === '/login') {
		document.body.className = 'body-none';
	} else {
		document.body.style['background-image'] = '';
	}
	next();
});

export default router;
