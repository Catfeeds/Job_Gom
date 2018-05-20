import store from '../index';
const state = {
  curName: '',
  curProjectId: 0,
  reffer: '',
  mainReffer: '',
  searchText: '',
  isShowList: false,
  isShowNoData: false,
  isLoadMoreShow: false
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
  },
  setIsShowList(state, flag){
    state.isShowList = flag;
  },
  setIsShowNoData(state, flag){
    state.isShowNoData = flag;
  },
  setIsLoadMoreShow(state, flag){
    state.isLoadMoreShow = flag;
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
  },
  setIsShowList(context, flag){
    context.commit('setIsShowList', flag);
  },
  setIsShowNoData(context, flag){
    context.commit('setIsShowNoData', flag);
  },
  setIsLoadMoreShow(context, flag){
    context.commit('setIsLoadMoreShow', flag);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;