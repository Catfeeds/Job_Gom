import React, { Component, PropTypes } from 'react';
// import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
// import { connect } from 'react-redux';
// import { is, fromJS} from 'immutable';
// import {Tool} from '../Config/Tool';
// import {Header,template} from './common/mixin';
import Connect from './connect/template';
import CommonLists from './widget/commonLists';

class Main extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        configs: {
          type: 'main',
          list: [{
              to: '/zl',
              iconClass: 'icon iconn-10',
              text: '总览'
            },
            {
              to: '/xmjd',
              iconClass: 'icon iconn-6',
              text: '项目阶段分析'
            },
            {
              to: '/xmzt',
              iconClass: 'icon iconn-9',
              text: '项目状态分析'
            },
            {
              to: '/xmlx',
              iconClass: 'icon iconn-7',
              text: '项目类型分析'
            },
            {
              to: '/gzl',
              iconClass: 'icon iconn-2',
              text: '工作量分析'
            },
            {
              to: '/xmsx',
              iconClass: 'icon iconn-8',
              text: '项目筛选/搜索'
            }
          ]
        }
      }
    }

    componentWillMount() {

    }

    render() {
        return (
          <div className="main">
            <div className="nav-list">
              <CommonLists configs={this.state.configs}></CommonLists>
            </div>
          </div>
        )
    }

}

export default Connect({
  _id: 'main',
  _component: Main,
  _headerBackUrls: '／', //头部回退按钮地址
  _headerTitleSets: '首页', //头部标题内容
});
