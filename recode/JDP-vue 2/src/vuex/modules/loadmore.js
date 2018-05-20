import Vue from 'vue';

const state = {
  isWillLoad: false
};

const mutations = {
  setIsLoad(state, flag){
    state.isWillLoad = flag;
  }
};

const actions = {
  setIsLoad(context, flag){
    context.commit('setIsLoad', flag);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;