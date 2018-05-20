import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducer from '../reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducers = combineReducers(reducer);


const store = createStore(reducers, applyMiddleware(
  // 这里是打印reducer
  logger
));

export default store;
