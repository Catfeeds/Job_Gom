import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import Connect from './connect/template';
import CommonLists from './widget/commonLists';
import EventResSub from './eventResSub.jsx';

class EventRes extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      configs : {
        type: 'eventRes',
        list: [
          {
            index: 0,
            text: '海外事业部.海外技术中心经理海外技术中心经理海外技术中心经理',
            name: '春哥',
          },
          {
            index: 1,
            text: '技术中心.测试部总监',
            name: '飞哥',
          },
          {
            index: 2,
            text: '产品中心.产品部总监',
            name: '春飞哥',
          }
        ]
      },
      subType: 'eventRes',
      action: false,
      subIndex: null
    }
  }

  parData(index) {
    // let state = Object.assign({}, this.state.configs, {subType: 'eventResSub'})
    this.setState({subType: 'eventResSub', 'subIndex': index})
  }

  subData(index) {
    this.setState({
      subType: 'eventRes',
      action: true,
      subIndex: index
    })
  }

  renderCommonLists() {
    let state = this.state;
    switch (state.subType) {
      case 'eventRes':
        return (
          <div className="main">
            <div className="nav-list">
              <CommonLists configs={state.configs} action={state.action} subIndex={state.subIndex} onClick={(index) => this.parData(index)}></CommonLists>
              <div className="load-more"><span>上拉加载更多</span><em className="icon iconn-3"></em></div>
            </div>
          </div>
        )
        break;
      case 'eventResSub':
        let parToSub = state.configs.list[state.subIndex];
        return (
          <EventResSub user={parToSub} onClick={(index) => {this.subData(index)}}/>
        )
        break;
      default:
        return (
          <div className="main">
            <div className="nav-list">
              <div className="load-more"><span>上拉加载更多</span><em className="icon iconn-3"></em></div>
            </div>
          </div>
        )
    }
  }


  render() {
    return this.renderCommonLists();
  }
}

export default Connect({
  _id: 'eventRes',
  _component: EventRes,
  _headerBackUrls: '／', //头部回退按钮地址
  _headerTitleSets: '事件传值', //头部标题内容
});
