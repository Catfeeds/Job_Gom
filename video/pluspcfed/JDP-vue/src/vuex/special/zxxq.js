import Vue from 'vue';
import API from '../../utils/apis';
import store from '../../vuex';
const state = {
  searchText: '',
  currentId: -1,
  attach: [],
  members: [],
  info: {},
  bearer: [],
  executor: [],
  fjIndex: -1
};

const mutations = {
	switchText(state, options){
		let ele = null;
		if(options.ev.target.classList.contains('switchBtn')){
			ele = options.ev.target;
		}else if(options.ev.target.classList.contains('header-backicon')){
			ele = options.ev.target.parentNode;
		}
		if(ele.classList.contains('open')){
			ele.classList.remove('open');
			if(options.flag == 0){
				ele.parentNode.classList.remove('open');
			}else{
				ele.parentNode.children[1].classList.remove('open');
			}
		}else{
			ele.classList.add('open');
			if(options.flag == 0){
				ele.parentNode.classList.add('open');
			}else{
				ele.parentNode.children[1].classList.add('open');
			}
		}
	},
  setSearchText(state, value){
    state.searchText = value;
  },
  setZxCurrentId(state, value){
    state.currentId = value;
  },
  setZxxqData(state, data){
    state.attach = data.attach;
    state.members = data.members;
    data.info.departs = (data.info.center_name&&data.info.part_name)
          ?(data.info.center_name + '/'+data.info.part_name)
          :(data.info.center_name + data.info.part_name)
    state.info = data.info;
    // state.bearer = data.bearer;
    var bearerAry = [];
    for(var i = 0,len = data.bearer.length;i<len;i++){
      // bearerStr+=data.bearer[i].username
      bearerAry.push(data.bearer[i].username);
    }
    state.bearer = bearerAry;
    var executorAry = [];
    for(var j = 0,len = data.executor.length;j < len;j++){
      executorAry.push(data.executor[j].username)
    }
    // state.executor = data.executor;
     state.executor = executorAry
  },
  setFjIndex(state, index){
    state.fjIndex = index;
  }
};

const actions = {
  setSearchText(context, value){
    context.commit('setSearchText', value);
  },
  setZxCurrentId(context, value){
  	context.commit('setZxCurrentId', value);
  },
  getXqData(context, id){
  	Vue.$http.get(API('projectDetail'),{
      params: {
      	"projectId": id,
      	"type": 1
      }
    }).then(function (data){
      context.commit('setZxxqData', data.data.data);
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