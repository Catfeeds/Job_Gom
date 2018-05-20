const state = {
  tableTitle: '',
  tableText: '',
  tableMonth: '',
  refferTitle: '',
  bToDetail: true
};

const mutations = {
  setCurrentTitle(context, value){
    state.tableTitle = value;
  },
  setCurrentTableMes(context, options){
    state.tableText = options.text;
    state.tableMonth = options.month;
    state.refferTitle = options.refferTitle;
  },
  setTurnToDetail(context, flag){
    state.bToDetail = flag;
  }
};

const actions = {
  setCurrentTitle(context, value){
    context.commit('setCurrentTitle', value);
  },
  setCurrentTableMes(context, options){
    context.commit('setCurrentTableMes', options);
  },
  setTurnToDetail(context, flag){
    context.commit('setTurnToDetail', flag);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
