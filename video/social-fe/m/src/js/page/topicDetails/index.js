/* css */
import 'css/page/topicDetails/topicDetails.scss';
import Vue from 'vue';
import App from './app.vue';
// import VueScroller from 'vue-scroller';
// Vue.use(VueScroller);
new Vue({
	el:'#app',
	render: h=>h(App)
});

