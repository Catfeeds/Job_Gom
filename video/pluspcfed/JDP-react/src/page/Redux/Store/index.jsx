import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducer from '../Reducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';

const reducers = combineReducers(reducer);

const store = compose(
  applyMiddleware(thunk, promise, logger)
)(createStore)(reducers)

export default store;
