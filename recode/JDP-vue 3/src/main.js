// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import http from './utils/http';

Vue.prototype.$http = Vue.$http = http;
Vue.config.productionTip = false;

//过滤文字字符
Vue.filter('subText',function(input, n){
  let _oldLen = input.length;
	let _len = input.replace(/[^\x00-\xff]/g, 'xx').length;
	if(_len <= n){
		return input;
	}else{
		var arr = [];
		for(var i =0 ;i < input.length;i ++){
			if(/.*[\u4e00-\u9fa5]+.*$/.test(input[i])){
				arr.push(2);
			}else{
				arr.push(1);
			}
		}
		let len = 0;
		let result = '';
		for(var i = 0 ;i < arr.length; i ++){
			if(len + 1 >= n){
				result += '...';
				break;
			}else{
				len += arr[i];
				result += input[i];
			}
		}
		return result;
	}
});


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})