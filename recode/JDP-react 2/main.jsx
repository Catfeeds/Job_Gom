import React, { Component, PropTypes } from 'react';
// import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
// import { connect } from 'react-redux';
// import { is, fromJS} from 'immutable';
// import {Tool} from '../Config/Tool';
// import {Header,template} from './common/mixin';
import CommonLists from './widget/commonLists';

class Main extends Component {
    constructor() {
      super();
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

    render() {
        return (
          <div className="main">
            <div className="nav-list">
              <ul>
                <li className="nav-list-item">
                  <Link to="/zl">
                    <em className="icon iconn-10"></em>
                    <span>总览</span>
                  </Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/xmjd">
                    <em className="icon iconn-6"></em>
                    <span>项目阶段分析</span>
                  </Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/xmzt">
                    <em className="icon iconn-9"></em>
                    <span>项目状态分析</span>
                  </Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/xmlx">
                    <em className="icon iconn-7"></em>
                    <span>项目类型分析</span>
                  </Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/gzl">
                    <em className="icon iconn-8"></em>
                    <span>工作量分析</span>
                  </Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/xmsx">
                    <em className="icon iconn-8"></em>
                    <em className="icon iconn-1"></em>
                    <em className="icon iconn-2"></em>
                    <em className="icon iconn-3"></em>
                    <em className="icon iconn-4"></em>
                    <em className="icon iconn-5"></em>
                    <span>项目筛选/搜索</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )
    }

}

export default Main;
