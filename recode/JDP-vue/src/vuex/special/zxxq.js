import Vue from 'vue';
import API from '../../utils/apis';
import store from '../../vuex';
const state = {
  searchText: '',
  currentId: -1,
  attach: [],
  members: [],
  info: {},
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
    state.info = data.info;
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