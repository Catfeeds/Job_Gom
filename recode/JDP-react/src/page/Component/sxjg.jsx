import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonLists from './widget/commonLists';
import Connect from './connect/template';

class Sxjg extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      configs: {
        type: 'sxjg',
        list: [
          {
              "projectId": "项目1id",
              "projectName": "项目1名称"
          },
          {
              "projectId": "项目2id",
              "projectName": "项目2名称"
          },
          {
              "projectId": "项目3id",
              "projectName": "项目3名称"
          },
          {
              "projectId": "项目4id",
              "projectName": "项目4名称"
          },
          {
              "projectId": "项目5id",
              "projectName": "项目5名称"
          },
          {
              "projectId": "项目6id",
              "projectName": "项目6名称"
          },
          {
              "projectId": "项目7id",
              "projectName": "项目7名称"
          },
          {
              "projectId": "项目8id",
              "projectName": "项目8名称"
          },
          {
              "projectId": "项目9id",
              "projectName": "项目9名称"
          },
          {
              "projectId": "项目10id",
              "projectName": "项目10名称"
          },
          {
              "projectId": "项目11id",
              "projectName": "项目11名称"
          },
          {
              "projectId": "项目12id",
              "projectName": "项目12名称"
          },
          {
              "projectId": "项目13id",
              "projectName": "项目13名称"
          },
          {
              "projectId": "项目14id",
              "projectName": "项目14名称"
          },
          {
              "projectId": "项目15id",
              "projectName": "项目15名称"
          },
          {
              "projectId": "项目16id",
              "projectName": "项目16名称"
          },
          {
              "projectId": "项目17id",
              "projectName": "项目17名称"
          },
          {
              "projectId": "项目18id",
              "projectName": "项目18名称"
          },
          {
              "projectId": "项目19id",
              "projectName": "项目19名称"
          },
          {
              "projectId": "项目20id",
              "projectName": "项目20名称"
          },
          {
              "projectId": "项目21id",
              "projectName": "项目21名称"
          },
          {
              "projectId": "项目22id",
              "projectName": "项目22名称"
          },
          {
              "projectId": "项目23id",
              "projectName": "项目23名称"
          },
          {
              "projectId": "项目24id",
              "projectName": "项目24名称"
          },
          {
              "projectId": "项目25id",
              "projectName": "项目25名称"
          },
          {
              "projectId": "项目26id",
              "projectName": "项目26名称"
          },
          {
              "projectId": "项目27id",
              "projectName": "项目27名称"
          },
          {
              "projectId": "项目28id",
              "projectName": "项目28名称"
          },
          {
              "projectId": "项目29id",
              "projectName": "项目29名称"
          },
          {
              "projectId": "项目30id",
              "projectName": "项目30名称"
          },
          {
              "projectId": "项目31id",
              "projectName": "项目31名称"
          },
          {
              "projectId": "项目32id",
              "projectName": "项目32名称"
          }
        ]
      }
    }
  }

  renderCommonLists() {
    return (
      <div className="main">
        <div className="nav-list">
          <CommonLists {...this.props} configs={this.state.configs}></CommonLists>
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.setState({
      configs: {
        type: 'sxjg',
        list: this.state.configs.list.map((v, i) => {
          return {
            id: v.projectId,
            text: v.projectName,
            to: '/xmsx/xmxq?projectId=' + v.projectId
          }
        })
      }
    })
  }

  render() {
    return this.renderCommonLists();
  }
}

export default Connect({
  _id: 'sxjg',
  _component: Sxjg,
  _headerBackUrls: '/xmsx', //头部回退按钮地址
  _headerTitleSets: '项目筛选结果', //头部标题内容
});
