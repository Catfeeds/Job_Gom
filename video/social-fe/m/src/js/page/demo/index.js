import 'css/page/demo/index.scss';
import Vue from 'vue';
import App from './app.vue';
new Vue({
	el: '#app',
	template: '<app></app>',
	components: { App },
	replace: false
});

