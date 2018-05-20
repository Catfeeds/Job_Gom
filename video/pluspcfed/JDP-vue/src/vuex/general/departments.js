import store from '../index';
const state = {
  type: 'bmsx',
  departList: [],
  allDepartList: [],
  firstLoad: 20,
  everytime: 20,
  nowLoaded: 0,
  loadCount: 0,
  over: false,
  descritText: '上拉加载更多'
};
const mutations = {
  setDepartAllList(state, options){
    let {list, cid, centerName, id} = options;
    if(!list || !list.length)return;
    list.forEach( item => {
      state.allDepartList.push({
        text: item.departmentName,
        departmentId: item.departmentId,
        optionsId: item.optionsId
      });
    });
    store.commit('filterDepartList');
  },
  filterDepartList(state){
    if(state.over)return;
    if(!state.loadCount){
      state.loadCount = 1;
      if(state.allDepartList.length > state.firstLoad){
        state.departList = state.allDepartList.slice(0, state.firstLoad);
      }else{
        state.departList = state.allDepartList;
        state.over = true;
        state.descritText = '已加载完毕';
      }
      state.nowLoaded = state.departList.length;
    }else{
      state.loadCount ++;
      if(state.allDepartList.length - state.departList.length <= state.everytime){
        state.departList = state.departList.concat(state.allDepartList.slice(state.nowLoaded, state.allDepartList.length));
        state.descritText = '已加载完毕';
        state.nowLoaded = state.allDepartList.length;
        state.over = true;
      }else{
        state.departList = state.departList.concat(state.allDepartList.slice(state.nowLoaded, state.nowLoaded + state.everytime));
        state.nowLoaded += state.everytime;
      }
    }
    //store.dispatch("loading", 0);
  },
  initDepartState(state){
    state.departList = [];
    state.allDepartList = [];
    state.firstLoad = 20;
    state.everytime = 20;
    state.nowLoaded = 0;
    state.loadCount = 0;
    state.over = false;
    state.descritText = '上拉加载更多';
  }
};

const actions = {
  setDepartAllList(context, options){
    context.commit('setDepartAllList', options);
  },
  filterDepartList(context){
    context.commit('filterDepartList');
  },
  initDepartState(context){
    context.commit('initDepartState');
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;