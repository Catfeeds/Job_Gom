/*
@desc:月份专项module
*/

import Vue from 'vue';
import echarts from 'echarts';
import getApis from '@/utils/apis.js';

const state = {
  total:0,
  date:'',
  lists:[]
};

const mutations = {
  getYfData(state,data){
    state.total = data.totalProNum;
    state.lists = data.list;
  },
  getMonth(state,date){
    state.date = date;
  }
};

const actions = {
  getYfData(context,date){
    context.commit('getMonth',date);
    Vue.$http.get(getApis('proMonth'),{
      params:{
        date:date
      }
    }).then(function(data){
      if(data.data.success){
         context.commit('getYfData',data.data.data);
      }
    })
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
