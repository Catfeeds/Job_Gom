import Vue from 'vue';
import store from '../index';
const state = {
  type: 'memberList',
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
  setAllList(state, lists){
    lists.forEach( item => {
      state.allList.push({
        text: item.text,
        name: item.name
      });
    });
    store.commit('filterList');
  },
  filterList(state){
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
  }
};

const actions = {
  setAllList(context, lists){
    context.commit('setAllList', lists);
  },
  filterList(context){
    context.commit('filterList');
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;