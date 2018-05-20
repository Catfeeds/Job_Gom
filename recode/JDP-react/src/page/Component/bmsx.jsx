import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonLists from './widget/commonLists';
import Connect from './connect/template';

class Bmsx extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      departments: [],
      configs: {
        type: 'bmsx',
        list: [],
        id: null,
        touch: true
      }
    }
  }

  componentWillMount() {
    let id = this.props.routeParams.id;
    let query = this.props.location.query;
    var array = ['全部', '大数据', '技术中心', ' 架构部', ' 商城技术', ' 基础支撑中心'];
    // for(var i = 0; i <=3; i++) {
    let list = array.map((item, index) => {
        let name = item + '部门';
        return {
          departmentId: index,
          text: item,
          to: '/xmsx?centerId=' + id[0] + '&centerName='+ query.centerName +'&text='+ item +'&choiceId=' + index
        }
    })
    // }
    this.setState(Object.assign(this.state.configs, {
      list: list,
      touch: true
    }))
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
  _id: 'bmsx',
  _component: Bmsx,
  _headerBackUrls: `/xmsx/option/1`, //头部回退按钮地址
  _headerTitleSets: '选择部门', //头部标题内容
});
