import axios from "axios";
import store from "../vuex";
import router from '../router';

function isTable(){
  var curRouteName = router.currentRoute.name;
  var nameArr = ['zl','xmjd','xmzt','lxxq','gzl'];
  var needHandle = false;
  nameArr.forEach(function(item,index){
    var reg = new RegExp(item);
    if(reg.test(curRouteName)){
      needHandle = true;
    }
  })
  return needHandle;
}

var http = axios.create({
  timeout: 15 * 1000
  // ,baseURL: 'http://jira-pluspc.atguat.com.cn/'
  // ,baseURL: 'http://10.112.170.139:9090/mock/59c0d9b7588f7c09fde757be/'
  // ,baseURL: 'http://10.112.170.139:9090/mock/59880fce588f7c09fde7578b/' 
});

http.interceptors.request.use(config => {
  store.dispatch("loading", 1);
  return config;
}, error => {
  store.dispatch("loading", 0);
  store.dispatch("error", 1);
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
  store.dispatch("loading", 0);
  //处理表格和echarts图没数据的情况
  var needHandle = isTable();
  if(needHandle){
    var noData = store.state.indexModule.noData;
    if(response.data.code == 200 && noData){
      store.dispatch('noData',0);
    }else if(response.data.code != 200 && !noData){
      store.dispatch('noData',1);
      return Promise.reject();
    }
  }
  return response;
}, error => {
  var needHandle = isTable();
  store.dispatch("loading", 0);
  if(needHandle){
    store.dispatch("error", 1);
  }
  return Promise.reject(error);
})

export default http;
