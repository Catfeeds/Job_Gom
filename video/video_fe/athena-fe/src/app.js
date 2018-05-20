/*global  process.env:true*/
/*eslint no-undef: "error"*/
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

import Router from 'vue-router';
Vue.use(Router);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);

import './filter/index.js';

console.log('current process.env: ' + process.env);

import App from './app.vue';
import store from 'store';
import { routeConfig } from './config/route.config.js';
import httpConfig from './config/http.config.js';
import actions from 'actions';

const router = new Router(routeConfig);

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

console.log(httpConfig[process.env]);
/*Vue.axios.defaults.baseURL = httpConfig[process.env];

Vue.axios.interceptors.request.use((config)=>{
    let loadingStartTime = Date.now();
    actions.loading(store, config.loading || {
            progress: true
        });
    return config;
}, (error) => {
    return Promise.reject(error);
});

Vue.axios.interceptors.response.use((response)=>{
    console.log('response...', response);
    return response;
}, function (error) {
    return Promise.reject(error);
});*/
