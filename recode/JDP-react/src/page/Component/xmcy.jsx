import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonLists from './widget/commonLists';

class Xmcy extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      configs : {
        type: 'memberList',
        list: [
          {
            text: '海外事业部.海外技术中心经理海外技术中心经理海外技术中心经理',
            name: '1.名字'
          },
          {
            text: '技术中心.测试部总监',
            name: '2.名字'
          },
          {
            text: '产品中心.产品部总监',
            name: '3.名字'
          }
        ]
      }
    }
  }

  _loadMoreData() {
    console.log(1);
  }

  renderCommonLists() {
    return (
      <div className="main">
        <div className="nav-list" onClick={() => this._loadMoreData()}>
          <CommonLists configs={this.state.configs}></CommonLists>
          <div className="load-more"><span>上拉加载更多</span><em className="icon iconn-3"></em></div>
        </div>
      </div>
    )
  }


  render() {
    return this.renderCommonLists();
  }
}

export default Xmcy;
