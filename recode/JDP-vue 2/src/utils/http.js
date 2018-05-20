import axios from "axios";
import store from "../vuex";


var http = axios.create({
  timeout: 15 * 1000,
  baseURL:'http://10.112.170.139:9090/mock/59880fce588f7c09fde7578b/'
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
  return response;
}, error => {
  store.dispatch("loading", 0);
  store.dispatch("error", 1);
  return Promise.reject(error);
})

export default http;
