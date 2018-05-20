import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducer from '../Reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';

// store第一种写法，创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
//
// var store = createStore(
//   combineReducers(reducer),
//   applyMiddleware(thunk, promise, logger)
// )

// store第二种写法，创建Store
// compose函数是将多个函数组合起来
// 这里是将所有的redux enhancer组合起来
const reducers = combineReducers(reducer);

const store = compose(
  applyMiddleware(thunk, promise, logger)
)(createStore)(reducers)

export default store;
