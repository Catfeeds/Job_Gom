/* css */
import 'css/page/circleindex/circle.scss';
import Vue from 'vue';
import circleContain from './circleContain.vue';
new Vue({
	el:'#app',
	render: h=>h(circleContain)
});


