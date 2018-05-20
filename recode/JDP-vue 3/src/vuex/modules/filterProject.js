import store from '../index';
const state = {
  type: 'sxjg',
  projectList: [],
  allProjectList: [],
  firstLoad: 20,
  everytime: 20,
  nowLoaded: 0,
  loadCount: 0,
  over: false,
  total: 0,
  descritText: '上拉加载更多',
  isback:0
};
const mutations = {
  setProjectAllList(state, data){
    data.forEach( item => {
      state.allProjectList.push({
        text: item.projectName,
        projectId: item.projectId
      });
    });
    store.commit('filterProjectList');
  },
  filterProjectList(state){
    if(state.over)return;
    if(!state.loadCount){
      state.loadCount = 1;
      if(state.allProjectList.length > state.firstLoad){
        state.projectList = state.allProjectList.slice(0, state.firstLoad);
        //console.log('第一次加载，比20多');
      }else{
        state.projectList = state.allProjectList;
        state.over = true;
        state.descritText = '已加载完毕';
        //console.log('第一次加载，少于20');
      }
      state.nowLoaded = state.projectList.length;
    }else{
      state.loadCount ++;
      if(state.allProjectList.length - state.projectList.length <= state.everytime){
        state.projectList = state.projectList.concat(state.allProjectList.slice(state.nowLoaded, state.allProjectList.length));
        state.descritText = '已加载完毕';
        state.nowLoaded = state.allProjectList.length;
        //console.log('第'+ state.loadCount +'次，加载完了');
        state.over = true;
      }else{
        state.projectList = state.projectList.concat(state.allProjectList.slice(state.nowLoaded, state.nowLoaded + state.everytime));
        state.nowLoaded += state.everytime;
        //console.log('第'+ state.loadCount +'次，没完');
      }
    }
    //store.dispatch("loading", 0);
  },
  initProjectState(state){
    state.projectList = [];
    state.allProjectList = [];
    state.firstLoad = 20;
    state.everytime = 20;
    state.nowLoaded = 0;
    state.loadCount = 0;
    state.over = false;
    state.total = 0;
    state.descritText = '上拉加载更多';
  },
  isReset(state){
    state.isback = 1;
  }
};

const actions = {
  setProjectAllList(context, list){
    context.commit('setProjectAllList', list);
  },
  filterProjectList(context){
    context.commit('filterProjectList');
  },
  initProjectState(context){
    context.commit('initProjectState');
  },
  isReset(context){
    context.commit('isReset');
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
