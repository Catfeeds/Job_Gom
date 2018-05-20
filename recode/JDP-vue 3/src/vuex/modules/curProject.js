import store from '../index';
const state = {
  curName: '',
  curProjectId: 0,
  reffer: '',
  mainReffer: '',
  searchText: ''
};

const mutations = {
  setCurProject(state, options){
    state.curName = options.curName;
    state.curProjectId = options.curProjectId;
  },
  setReffer(state, value){
    state.reffer = value;
  },
  setMainReffer(state, value){
    state.mainReffer = value;
  },
  setSearchText(state, value){
    state.searchText = value;
  }
};

const actions = {
  setCurProject(context, options){
    context.commit('setCurProject', options);
  },
  setReffer(context, value){
    context.commit('setReffer', value);
  },
  setMainReffer(context, value){
    context.commit('setMainReffer', value);
  },
  setSearchText(context, value){
    context.commit('setSearchText', value);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;