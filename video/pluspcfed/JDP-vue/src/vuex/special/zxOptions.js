import Vue from 'vue';
import API from '../../utils/apis';
import store from '../../vuex';
const state = {
  member: {
    type: 'all'
  },
  type: 'zxlb',
  canClick1: true,
  canClick2: true,
  canClick3: true,
  list1: {
  	list: [],
	  allList: [],
	  firstLoad: 20,
	  everytime: 20,
	  nowLoaded: 0,
	  loadCount: 0,
	  over: false,
	  total: 0,
	  isCanLoad: false,
	  isLoadMoreShow: false,
  	descritText: '上拉加载更多',
  },
  list2: {
  	list: [],
	  allList: [],
	  firstLoad: 20,
	  everytime: 20,
	  nowLoaded: 0,
	  loadCount: 0,
	  over: false,
	  total: 0,
	  isCanLoad: false,
	  isLoadMoreShow: false,
  	descritText: '上拉加载更多',
  },
  list3: {
  	list: [],
	  allList: [],
	  firstLoad: 20,
	  everytime: 20,
	  nowLoaded: 0,
	  loadCount: 0,
	  over: false,
	  total: 0,
	  isCanLoad: false,
	  isLoadMoreShow: false,
  	descritText: '上拉加载更多',
  },
  states: 'all',
  membersType: '',
  recordNum: 'all',
  recordEnd: 'all',
  n: 0
};

const mutations = {
  setMember(state, value){
    if(value.flag){
      delete state.member.flag;
    }
    Object.assign(state.member, value);
    if(value.type){
      state.recordNum = value.type;
    }
  },
  setZxAllList1(state, data){
  	state.list1.allList = [];
    data.forEach( item => {
      state.list1.allList.push({
        text: item.projectName,
        projectId: item.projectId
      });
    });
  },
  filterZxList1(state){
    if(state.list1.over)return;
    if(!state.list1.loadCount){
      state.list1.loadCount = 1;
      if(state.list1.allList.length > state.list1.firstLoad){
        state.list1.list = state.list1.allList.slice(0, state.list1.firstLoad);
        // console.log('第一次加载，比20多');
        store.commit('setIsLoadMoreShow1', true);
      }else{
        state.list1.list = state.list1.allList;
        state.list1.over = true;
        state.list1.descritText = '已加载完毕';
        // console.log('第一次加载，少于20');
        store.commit('setIsLoadMoreShow1', false);
      }
      state.list1.nowLoaded = state.list1.list.length;
    }else{
      state.list1.loadCount ++;
      if(state.list1.allList.length - state.list1.list.length <= state.list1.everytime){
        state.list1.list = state.list1.list.concat(state.list1.allList.slice(state.list1.nowLoaded, state.list1.allList.length));
        state.list1.descritText = '已加载完毕';
        state.list1.nowLoaded = state.list1.allList.length;
        // store.commit('setIsLoadMoreShow1', false);
        // console.log('第'+ state.list1.loadCount +'次，加载完了');
        state.list1.over = true;
      }else{
        state.list1.list = state.list1.list.concat(state.list1.allList.slice(state.list1.nowLoaded, state.list1.nowLoaded + state.list1.everytime));
        state.list1.nowLoaded += state.list1.everytime;
        // store.commit('setIsLoadMoreShow1', true);
        // console.log('第'+ state.list1.loadCount +'次，没完');
      }
    }
  },
  setZxAllList2(state, data){
    data.forEach( item => {
      state.list2.allList.push({
        text: item.projectName,
        projectId: item.projectId
      });
    });
  },
  filterZxList2(state){
    if(state.list2.over)return;
    if(!state.list2.loadCount){
      state.list2.loadCount = 1;
      if(state.list2.allList.length > state.list2.firstLoad){
        state.list2.list = state.list2.allList.slice(0, state.list2.firstLoad);
        // console.log('第一次加载，比20多');
        store.commit('setIsLoadMoreShow2', true);
      }else{
        state.list2.list = state.list2.allList;
        state.list2.over = true;
        state.list2.descritText = '已加载完毕';
        // console.log('第一次加载，少于20');
        store.commit('setIsLoadMoreShow2', false);
      }
      state.list2.nowLoaded = state.list2.list.length;
    }else{
      state.list2.loadCount ++;
      if(state.list2.allList.length - state.list2.list.length <= state.list2.everytime){
        state.list2.list = state.list2.list.concat(state.list2.allList.slice(state.list2.nowLoaded, state.list2.allList.length));
        state.list2.descritText = '已加载完毕';
        state.list2.nowLoaded = state.list2.allList.length;
        // console.log('第'+ state.list2.loadCount +'次，加载完了');
        state.list2.over = true;
      }else{
        state.list2.list = state.list2.list.concat(state.list2.allList.slice(state.list2.nowLoaded, state.list2.nowLoaded + state.list2.everytime));
        state.list2.nowLoaded += state.list2.everytime;
        // console.log('第'+ state.list2.loadCount +'次，没完');
      }
    }
  },
  setZxAllList3(state, data){
    var arr = [];
    data.forEach( item => {
      arr.push({
        text: item.projectName,
        projectId: item.projectId
      });
    });
    state.list3.allList = arr;
  },
  filterZxList3(state){
    if(state.list3.over)return;
    if(!state.list3.loadCount){
      state.list3.loadCount = 1;
      if(state.list3.allList.length > state.list3.firstLoad){
        state.list3.list = state.list3.allList.slice(0, state.list3.firstLoad);
        // console.log('第一次加载，比20多');
        store.commit('setIsLoadMoreShow3', true);
      }else{
        state.list3.list = state.list3.allList;
        state.list3.over = true;
        state.list3.descritText = '已加载完毕';
        // console.log('第一次加载，少于20');
        store.commit('setIsLoadMoreShow3', false);
      }
      state.list3.nowLoaded = state.list3.list.length;
    }else{
      state.list3.loadCount ++;
      if(state.list3.allList.length - state.list3.list.length <= state.list3.everytime){
        state.list3.list = state.list3.list.concat(state.list3.allList.slice(state.list3.nowLoaded, state.list3.allList.length));
        state.list3.descritText = '已加载完毕';
        state.list3.nowLoaded = state.list3.allList.length;
        // console.log('第'+ state.list3.loadCount +'次，加载完了');
        state.list3.over = true;
      }else{
        state.list3.list = state.list3.list.concat(state.list3.allList.slice(state.list3.nowLoaded, state.list3.nowLoaded + state.list3.everytime));
        state.list3.nowLoaded += state.list3.everytime;
        // console.log('第'+ state.list3.loadCount +'次，没完');
      }
    }
  },
  initZxState(state){
	  state.type = 'zxlb';
    state.canClick1 = true;
	  state.canClick2 = true;
	  state.canClick3 = true;
		state.list1.list = [];
		state.list1.allList = [];
		state.list1.firstLoad = 20;
		state.list1.everytime = 20;
		state.list1.nowLoaded = 0;
		state.list1.loadCount = 0;
		state.list1.over = false;
		state.list1.total = 0;
		state.list1.isCanLoad = false;
		state.list1.isLoadMoreShow = false;
		state.list1.descritText = '上拉加载更多';
		state.list2.list = [];
		state.list2.allList = [];
		state.list2.firstLoad = 20;
		state.list2.everytime = 20;
		state.list2.nowLoaded = 0;
		state.list2.loadCount = 0;
		state.list2.over = false;
		state.list2.total = 0;
		state.list2.isCanLoad = false;
		state.list2.isLoadMoreShow = false;
		state.list2.descritText = '上拉加载更多';
		state.list3.list = [];
		state.list3.allList = [];
		state.list3.firstLoad = 20;
		state.list3.everytime = 20;
		state.list3.nowLoaded = 0;
		state.list3.loadCount = 0;
		state.list3.over = false;
		state.list3.total = 0;
		state.list3.isCanLoad = false;
		state.list3.isLoadMoreShow = false;
		state.list3.descritText = '上拉加载更多';
    state.n = 0;
  },
  setState1(state, flag){
  	state.canClick1 = flag;
  },
  setState2(state, flag){
    state.canClick2 = flag;
  },
  setState3(state, flag){
  	state.canClick3 = flag;
  },
  setStates(state, value){
  	state.states = value;
  },
  setIsLoadMoreShow1(state, flag){
  	state.list1.isLoadMoreShow = flag;
  },
  setIsLoadMoreShow2(state, flag){
  	state.list2.isLoadMoreShow = flag;
  },
  setIsLoadMoreShow3(state, flag){
  	state.list3.isLoadMoreShow = flag;
  },
  setMembersType(state, value){
  	state.membersType = value;
  },
  setRecordNum(state, value){
    state.recordNum = value;
  },
  setRecordEnd(state, value){
    state.recordEnd = value;
  }
};

const actions = {
  setMember(context, value){
    context.commit('setMember', value);
  },
  //请求
  getData(context, value){
  	// context.commit('setStates', value);
  	// 区分来源
  	let params = {};
  	let URL = '';
    if(state.member.flag){
      switch(state.member.flag){
        // 1/ lists/ 专项任务列表
        case 'lists':
          params = {
            flag: state.member.flag,
            type: value
          };
          break;
        // 3/ doneLists /完成专项列表表格 xy
        case 'doneLists':
          params = {
            done: state.member.done,
            flag: state.member.flag,
            name: state.member.name,
            type: value
          };
          break;
        // 3/ replyLists /回复专项列表表格 xy
        case 'replyLists':
          params = {
            reply: state.member.reply,
            flag: state.member.flag,
            name: state.member.name,
            type: value
          };
          break;
        // 2/ personalLists：人员专项列表，
        case 'personalLists':
          params = {
            flag: state.member.flag,
            name: state.member.name,
            type: value
          };
          break;
      }
      URL = API('zxList');
    }else{
      // 4/ monPerLists：人员专项列表(2017-09月于斌平)
      var query = window.location.search;
      if(query.indexOf('name')>0){
        params = {
          month: state.member.month,
          assume: state.member.name
        };
      }else{
        // 5/ monLists (2017-09月)
        params = {
          month: state.member.month
        };
      }
      URL = API('zxSpeList');
    }
  	Vue.$http.get(URL ,{
      params:params
    }).then(function (data){
      if(data.data.success){
      	switch(value){
      		case 'all':
      			context.commit('setZxAllList1', data.data.data);
    				context.commit('filterZxList1');
    				break;
      		case 'threeMonths':
      			context.commit('setZxAllList2', data.data.data);
    				context.commit('filterZxList2');
    				break;
      		case 'oneMonth':
      			context.commit('setZxAllList3', data.data.data);
    				context.commit('filterZxList3');
    				break;
      	}
        if(window.localStorage && localStorage.scrolltop4){
          setTimeout(function (){
            document.body.scrollTop = parseInt(localStorage.getItem('scrolltop4'));
          }, 10);
        }
      }else{
        switch(value){
          case 'all':
            context.commit('setZxAllList1', []);
            context.commit('filterZxList1');
            break;
          case 'threeMonths':
            context.commit('setZxAllList2', []);
            context.commit('filterZxList2');
            break;
          case 'oneMonth':
            context.commit('setZxAllList3', []);
            context.commit('filterZxList3');
            break;
        }
      }
    },function (err){
      // console.log(err);
    });
  },
  initZxState(context){
    context.commit('initZxState');
  },
  isReset(context){
    context.commit('isReset');
  },
  setMembersType(context, value){
    context.commit('setMembersType', value);
  }
};

const indexModule = {
  state,
  mutations,
  actions
};
export default indexModule;