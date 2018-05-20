import Immutable from 'immutable';

import {HTTP_REQUERT, HEADER_TITLE_SETS, HEADER_BACK_URLS, LIST_SELECT_TO_STRINGS, LIST_FILTER_CENTER, LIST_FILTER_DEPARTMENT,
LIST_INIT_DEPART_MENTS, LIST_FILTER_TYPE, LIST_FILTER_STATE, LIST_FILTER_RISK, LIST_FILTER_PROJECT, ADDUP_CHOICE_TEXT,
DETAIL_SEARCH_RESULT} from '../Action';

let defaultState = Immutable.fromJS({data: {
  configs: {
    list: [
    ]
  }
}, isFetch: false, isOnce: true}).toJS();

//网络拉取
export const httpModule = (state = defaultState, action = {}) => {
  let setState = {};
  switch(action.type){
    case HTTP_REQUERT:
      setState = state.data?Object.assign({}, state.data, action.optionjson):action.optionjson;
      return setState
    break;

    default:
      return state;
  }
}

//头部状态与返回设置
export const headerModule = (state = defaultState, action = {}) => {
  let setState = {};
  switch(action.type){
    case HEADER_TITLE_SETS:

      if(action.pathjson.id == 1) {
        action.pathjson.title = '选择中心'
      } else if(action.pathjson.id == 2) {
        action.pathjson.title = '选择类型'
      } else if(action.pathjson.id == 3) {
        action.pathjson.title = '选择阶段'
      } else if(action.pathjson.id == 4) {
        action.pathjson.title = '选择风险类型'
      } else if(action.pathjson.id == 5) {
        action.pathjson.title = '选择状态类型'
      }

      setState = state.data?Object.assign({}, state.data, action.pathjson):action.pathjson;
      // console.log(state)

      return {'data': setState, isFetch: true};

    case HEADER_BACK_URLS:
      action.pathjson.title = action.pathjson.title || state.data.title;
      setState = state.data?Object.assign({}, state.data, action.pathjson):action.pathjson;

      // state['data'] = {...action.pathjson};

      return {'data': setState, isFetch: false};

    //返回一个新的state
    default:
      return state
  }
}

// defaultState = Immutable.fromJS({data: {
  // configs: {
  //   list: [
  //   ]
  // }
// }, isFetch: false}).toJS();

export const searchModule = (state = defaultState, action = {}) => {
  let setState = {};
  switch (action.type) {

    //早期action
    // case LIST_SELECT_TO_STRINGS:
    //   if(action.datajson.type == 'memberList') {
    //
    //   } else if(action.datajson.type == 'listNav2') {
    //
    //   }
    //   return {'data': state, 'action': action};
    //   break;

    case LIST_FILTER_CENTER:

      setState = state.data?Object.assign({}, state.data, action):action;
      return {'data': setState};
      break;

    case LIST_FILTER_DEPARTMENT:

      setState = state.data?Object.assign({}, state.data, action):action;
      setState.filter = state.data.filter?Object.assign({}, state.data.filter, action.filter):action.filter;
      setState.filter.combineName = (setState.filter.departName&&setState.filter.centerName)?setState.filter.centerName + '/' + setState.filter.departName : setState.filter.centerName;

      return {'data': setState};
      break;

    case LIST_INIT_DEPART_MENTS:

      setState = state.data?Object.assign({}, state.data, action):action;

      return {'data': setState};
      break;

    case LIST_FILTER_TYPE:

      setState = state.data?Object.assign({}, state.data, action):action;

      return {'data': setState};
      break;

    case LIST_FILTER_STATE:

      setState = state.data?Object.assign({}, state.data, action):action;

      return {'data': setState};
      break;

    case LIST_FILTER_RISK:

      setState = state.data?Object.assign({}, state.data, action):action;

      return {'data': setState};
      break;

    case LIST_FILTER_PROJECT:

      setState = state.data?Object.assign({}, state.data, action):action;

      return {'data': setState};
      break

    default:
      return state
  }
}

export const searchOverModule = (state = defaultState, action = {}) => {
  let setState = {};
  switch (action.type) {
    case ADDUP_CHOICE_TEXT:
    // console.log(next)
      setState = state.data?Object.assign({}, state.data, action):action;
      // setState.list = state.data.list?Object.assign({}, state.data.list, action.list):action.list;
      // setState.list = setState.list.map((item, index) => {
      //   return Object.assign({}, setState.list, {
      //     to: item.to,
      //     text: item.text,
      //     choiceCenter: item.choiceCenter,
      //     choiceDepart: item.choiceDepart,
      //     choiceText: item.choiceText
      //   })
      // })
      // setState.filter.combineName = (setState.filter.departName&&setState.filter.centerName)?setState.filter.centerName + '/' + setState.filter.departName : setState.filter.centerName;


      // console.log(defaultState)
      if(!defaultState.isOnce) {
        defaultState.data.configs.list[0].choiceDepart = defaultState.data.configs.list[0].choiceDepart ? '' : defaultState.data.configs.list[0].choiceDepart;
        let setNewState = action.configs.list.map((item, index) => {
          for (var key in item) {
            if(item[key]) {
              defaultState.data.configs.list[index][key] = item[key];
            }
          }
          return Object.assign({}, item, defaultState.data.configs.list[index]);
        });

        defaultState.data.configs.list = JSON.parse(JSON.stringify(setNewState));
      } else {
        defaultState.data.configs.list = JSON.parse(JSON.stringify(action.configs.list));
        defaultState.isOnce = false;
      }
      setState = defaultState;
      // 为了保存多组件上次状态，作下次比较
      // console.log(defaultState)
      //
      // 对应xmsx.jsx中的方法二，用来回调
      // action.payload&&action.payload();
      return {...setState}
      break;

    default:
      return state
  }
}

export const detailModule = (state = defaultState, action = {}) => {
  let setState = {};
  switch (action.type) {
    case 'DETAIL_SEARCH_RESULT':

      setState = state.data?Object.assign({}, state.data, action):action;

      return {'data': setState};
      break;

    default:
      return state
  }
}
