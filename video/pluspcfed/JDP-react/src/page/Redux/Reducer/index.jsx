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

      return {'data': setState, isFetch: true};

    case HEADER_BACK_URLS:
      action.pathjson.title = action.pathjson.title || state.data.title;
      setState = state.data?Object.assign({}, state.data, action.pathjson):action.pathjson;

      return {'data': setState, isFetch: false};

    default:
      return state
  }
}

export const searchModule = (state = defaultState, action = {}) => {
  let setState = {};
  switch (action.type) {
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
      setState = state.data?Object.assign({}, state.data, action):action;
      
      if(!defaultState.isOnce) {
        defaultState.data.configs.list[0].choiceId = !action.configs.list[0].choiceId ? defaultState.data.configs.list[0].choiceId : action.configs.list[0].choiceId;
        defaultState.data.configs.list[0].choiceDepart = defaultState.data.configs.list[0].choiceId == '中心1id' ? '' : defaultState.data.configs.list[0].choiceDepart;
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

      action.payload&&action.payload();
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
