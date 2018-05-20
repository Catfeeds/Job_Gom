import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './Redux/Store'; //引入仓库
import route from './Router/Router'; //路由配置

import CommonHeader from './Component/widget/commonHeader'; //公用头部
import IndexContainer from './Component/container/indexContainer' //全局组件

// import './Config/Config.js';//引入默认配置

import './Style/sass/public';

store.subscribe(() => { //监听state变化
    // console.log(store.getState())
});

render(
    <Provider store={store}>
      <IndexContainer>
        {route}
      </IndexContainer>
    </Provider>,
    document.getElementById('container')
);
