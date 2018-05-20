/* css */
import 'css/page/index/index.scss';
import Vue from 'vue';
import demo from './helloVue.vue';

new Vue({
	el:'#app',
	render: h=>h(demo)
});


