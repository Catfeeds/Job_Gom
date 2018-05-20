
import Vue from 'vue';
import echarts from 'echarts';

const state = {
  loading: 0,
  error: 0
};

const mutations = {
  loading(state, flag){
    state.loading = flag;
  },
  error(state, flag){
    state.error = flag;
  }
};

const actions = {
  loading(context, flag){
    context.commit("loading", flag);
  },
  error(context, flag){
    context.commit("error", flag);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
