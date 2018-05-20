import { CHILK_DATA } from '../action';

//传递点击数字的 reducer
export const chilkDataModule = (state = {}, action = {}) => {
  let setState = {};
  switch(action.type){
    case CHILK_DATA:

      if(state.subChildData)state.subChildData = 0;

      setState = Object.assign({}, state, action);

      return setState;
    break;

    default:
      return state;
  }
}
