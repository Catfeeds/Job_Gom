// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import http from '@/utils/http'

var getMethod = http.get;
var optMthod = http;

var cached = {};
var noCatch = ['/api/getSearchLog','/total/pandectTab'];
function isNocatch(url){
	var flag = 1;
	for(var i = 0,len = noCatch.length;i<len;i++){
		let reg = new RegExp(noCatch[i],'ig');
		if(reg.test(url)){
			flag = 0
			break;
		}
	}
	return flag;
}
function getCacheKey(arg0,arg1){
	var api;
	var params = null;
	if(typeof arg0 == 'string'){
		api = arg0;
		if(arg1){
			params =  arg1.params;
		}
	}else if(typeof arg0 =='object'){
		api = arg0['url'];
		params = arg0.params
	}
	if(params){
		api+="?";
		for( var k in params){
			api+=k;
			api+="=";
			api+=params[k];
			api+="&"
		}
	}
	api = api.replace(/&$/,'');
	return api;
}
Vue.cached = cached;
Vue.$http = Vue.prototype.$http = function(opts){
	return Promise.resolve().then(()=>{
		var key = getCacheKey(opts);
		if(cached[key]){
			return cached[key];
		}else{
			return optMthod(opts).then((data)=>{
				if(data.data.success && isNocatch(opts.url)){
					cached[key] = data;
				}
				return data;
			})
		}
	})
}

Vue.$http.get = Vue.prototype.$http.get = function(url,params){
  return Promise.resolve().then(()=>{
  	//检查URL和参数是否命中缓存；
  	var key = getCacheKey(url,params)
  	if(cached[key]){
  		return cached[key];
  	}else{
  		return getMethod(url,params).then((data)=>{
  			if(data.data.success && isNocatch(url)){
  				cached[key] = data;
  			}
  			return data;
  		});
  	}
  });
}
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
	if(store.state.indexModule.noData){
		store.dispatch('noData',0);
	}
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

window.Vue = Vue;