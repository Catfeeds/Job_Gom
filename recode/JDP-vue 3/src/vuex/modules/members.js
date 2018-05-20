import store from '../index';
const state = {
  type: 'xmcy',
  memberList: [],
  allList: [],
  firstLoad: 20,
  everytime: 20,
  nowLoaded: 0,
  loadCount: 0,
  over: false,
  descritText: '上拉加载更多'
};

const mutations = {
  setMembersAllList(state, data){
    data.forEach( item => {
      state.allList.push({
        text: item.position,
        name: item.userName
      });
    });
    store.commit('filterMembersList');
  },
  filterMembersList(state){
    if(state.over)return;
    if(!state.loadCount){
      state.loadCount = 1;
      if(state.allList.length > state.firstLoad){
        state.memberList = state.allList.slice(0, state.firstLoad);
      }else{
        state.memberList = state.allList;
        state.over = true;
        state.descritText = '已加载完毕';
      }
      state.nowLoaded = state.memberList.length;
    }else{
      state.loadCount ++;
      if(state.allList.length - state.memberList.length <= state.everytime){
        state.memberList = state.memberList.concat(state.allList.slice(state.nowLoaded, state.allList.length));
        state.descritText = '已加载完毕';
        state.nowLoaded = state.allList.length;
        state.over = true;
      }else{
        state.memberList = state.memberList.concat(state.allList.slice(state.nowLoaded, state.nowLoaded + state.everytime));
        state.nowLoaded += state.everytime;
      }
    }
    //store.dispatch("loading", 0);
  },
  initMembersState(state){
    state.memberList = [];
    state.allList = [];
    state.firstLoad = 20;
    state.everytime = 20;
    state.nowLoaded = 0;
    state.loadCount = 0;
    state.over = false;
    state.descritText = '上拉加载更多';
  }
};

const actions = {
  setMembersAllList(context, lists){
    context.commit('setMembersAllList', lists);
  },
  filterMembersList(context){
    context.commit('filterMembersList');
  },
  initMembersState(context){
    context.commit('initMembersState');
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;