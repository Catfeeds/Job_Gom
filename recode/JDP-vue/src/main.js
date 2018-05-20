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

router.beforeEach((to, from, next) => {
    switch(to.name){
    	case 'index':
    	case 'main':
    	case 'zx':
    		store.dispatch('setSearchShow', 1);
    		store.dispatch('setInputShow', 0);
    		break;
    	case 'sxjg':
    		// store.dispatch('setInputShow', 1);

		    /*if(store.state.search.isInputShow){
		      console.log('展示了');
		    }else{
		      console.log('没展示');
		    }*/

		    if(store.state.search.recordFromXq){
		      // console.log('从详情来记录了 去拿记录:' +  store.state.search.record);
		      store.dispatch('setInputShow', store.state.search.record);
		    }else{
		      // console.log('不是从详情来');

		      switch(from.name){
		        case 'xmsx':
		        case 'zl':
		        case 'xmjd':
		        case 'lxxq':
		        case 'gzlxq':
		          store.commit('setIsZxReferer', false);
		          store.commit('setInputShow', 0);
		        case 'xmxq': 
		        	// console.log('aaaaa');
		        	break;
		        default :
		        	store.dispatch('setInputShow', 1);
		        	break;
		      }
		      store.commit('setRecord', store.state.search.isInputShow);
		    }

		    
    		store.dispatch('setSearchShow', 0);
    		break;
    	default:
    		store.dispatch('setSearchShow', 0);
    		store.dispatch('setInputShow', 0);
    		break;
    }
    next();
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})