/**
 *
 Created by zhangzhao on 2017/7/18.
 Email: zhangzhao@gomeplus.com
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import {createLogger} from 'redux-logger'
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducers from '../reducer/index';
import Confirm from 'components/Confirm';
import pubsub from 'io/pubsub';

let getUserConfirmation = (message, callback) => {
    var container = document.createElement('div');
    // IE10及以下不支持append,增加兼容处理
    var body = document.body;
    if(body.append){
        body.append(container);
    } else {
        body.appendChild(container);
    }
    ReactDom.render((
        <Confirm
            visible={true}
            title={message}
            okValue='保留在页面'
            cancelValue='离开页面'
            btnStyle={{
                width: 105
            }}
            onOk={() => {
                ReactDom.unmountComponentAtNode(container)
            }}
            onCancel={() => {
                if(location.pathname === '/portal/videoUploader'){
                    // 广播出去,不想把store再connect 到 app 这一级上
                    pubsub('reset_uploader').pub();
                }
                if(location.pathname === '/portal/publishArticle'){
                    pubsub('reset_article').pub();
                }
                callback(true);
                ReactDom.unmountComponentAtNode(container)
            }}
            onClose={() => {
                ReactDom.unmountComponentAtNode(container)
            }}
        />
    ), container);
}
const history = createHistory({getUserConfirmation});

const middleware = routerMiddleware(history);
const loggerMiddleware = createLogger()


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        reducers,
        router: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
            middleware,
            loggerMiddleware
        )
    )
);

export {history, store};