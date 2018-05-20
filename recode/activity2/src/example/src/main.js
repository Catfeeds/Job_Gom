import Vue from 'vue'
import App from './App.vue'


import Croppa from 'vue-croppa'

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(Croppa)
