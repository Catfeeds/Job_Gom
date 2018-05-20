export const routeConfig = {
    saveScrollPosition: false,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: require('../components/component/index.vue')
        },
        {
            path: '/index',
            component: require('../components/component/index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: require('../components/login/index.vue')
        },
        {
            path: '/log',
            name: 'log',
            component: require('../components/component/log.vue')
        },
        {
            path: '/releaseproject',
            name: 'releaseproject',
            component: require('../components/component/releaseproject.vue')
        }
    ]
};
