import Vue from 'vue';
import API from '../../utils/apis';
const state = {
  type: 'search',
  isShowSearchBtn: 0,
  isShowSearch: 0,
  isInputShow: 1,
  hasSearchHistory: 0,
  historyList: [],
  isZxReferer: false,
  isShowText: true,
  recordFromXq: false,
  currentType: 'search',
  isTabShow: true,
  record: false
};

const mutations = {
  setSearchShow(state, flag){
    state.isShowSearchBtn = flag;
  },
  isSearchShow(state, flag){
    state.isShowSearch = flag;
  },
  setInputShow(state, flag){
    state.isInputShow = flag;
  },
  setHistory(state, data){
    state.hasSearchHistory = data.length ? 1 : 0;
    state.historyList = data;
  },
  setIsZxReferer(state, flag){
    state.isZxReferer = flag;
  },
  setIsShowText(state, flag){
    state.isShowText = flag;
  },
  setRecord(state, flag){
    state.record = flag;
  },
  setInputType(state, value){
    state.currentType = value;
  },
  setIsTabShow(state, value){
    state.isTabShow = value;
  },
  setIsFromXmxq(state, value){
    state.recordFromXq = value;
  }
};

const actions = {
  setSearchShow(context,flag){
    context.commit("setSearchShow",flag);
  },
  isSearchShow(context,flag){
    context.commit("isSearchShow",flag);
  },
  setInputShow(context,flag){
    context.commit("setInputShow",flag);
  },
  setHistory(context, data){
    context.commit("setHistory", data);
  },
  setIsZxReferer(context, flag){
    context.commit("setIsZxReferer", flag);
  },
  setIsShowText(context, flag){
    context.commit("setIsShowText", flag);
  },
  setRecord(context, flag){
    context.commit("setRecord", flag);
  },
  setInputType(context, value){
    context.commit("setInputType", value);
  },
  setIsFromXmxq(context, value){
    context.commit("setIsFromXmxq", value);
  },
  getHistory(context, value){
    Vue.$http.get(API('searchHistory'),{
      params: {
        num: value
     }
    }).then(function (data){
      if(data.data.success){
        context.commit('setHistory', data.data.data);
      }else{
        console.log('error');
      }
    },function (err){
      console.log(err);
    });
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;
