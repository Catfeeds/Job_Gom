
const state = {
  loading: 0,
  error: 0,
  noData:0
};

const mutations = {
  loading(state, flag){
    state.loading = flag;
  },
  error(state, flag){
    state.error = flag;
  },
  noData(state,flag){
    state.noData = flag;
  }
};

const actions = {
  loading(context, flag){
    context.commit("loading", flag);
  },
  error(context, flag){
    context.commit("error", flag);
  },
  noData(context,flag){
    context.commit("noData",flag);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
