import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonLists from './widget/commonLists';
import Connect from './connect/template';

class Lxxx extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      configs : {
        type : 'lxxx',
        list : [],
        touch: true
      }
    }
  }

  renderCommonLists() {
    // console.log({...this.props});
    return (
      <div className="main">
        <div className="nav-list">
          <CommonLists {...this.props} configs={this.state.configs}></CommonLists>
        </div>
      </div>
    )
  }

    componentWillMount() {
    // console.log(this.props.routeParams)
    var resData = {
        //中心、部门数据
        "center": [{
                "centerId": "中心1id",
                "centerName": "中心1名称",
                "departmentData": [{
                        "departmentId": "部门1id",
                        "departmentName": "部门1名称"
                    },
                    {
                        "departmentId": "部门2id",
                        "departmentName": "部门2名称"
                    }
                ]
            },
            {
                "centerId": "中心2id",
                "centerName": "中心2名称",
                "departmentData": [{
                        "departmentId": "部门1id",
                        "departmentName": "部门1名称"
                    },
                    {
                        "departmentId": "部门2id",
                        "departmentName": "部门2名称"
                    },
                    {
                        "departmentId": "部门3id",
                        "departmentName": "部门3名称"
                    },
                    {
                        "departmentId": "部门4id",
                        "departmentName": "部门4名称"
                    },
                    {
                        "departmentId": "部门5id",
                        "departmentName": "部门5名称"
                    },
                    {
                        "departmentId": "部门6id",
                        "departmentName": "部门6名称"
                    },
                    {
                        "departmentId": "部门7id",
                        "departmentName": "部门7名称"
                    },
                    {
                        "departmentId": "部门8id",
                        "departmentName": "部门8名称"
                    },
                    {
                        "departmentId": "部门9id",
                        "departmentName": "部门9名称"
                    },
                    {
                        "departmentId": "部门10id",
                        "departmentName": "部门10名称"
                    },
                    {
                        "departmentId": "部门11id",
                        "departmentName": "部门11名称"
                    },
                    {
                        "departmentId": "部门12id",
                        "departmentName": "部门12名称"
                    },
                    {
                        "departmentId": "部门13id",
                        "departmentName": "部门13名称"
                    },
                    {
                        "departmentId": "部门14id",
                        "departmentName": "部门14名称"
                    },
                    {
                        "departmentId": "部门15id",
                        "departmentName": "部门15名称"
                    },
                    {
                        "departmentId": "部门16id",
                        "departmentName": "部门16名称"
                    },
                    {
                        "departmentId": "部门17id",
                        "departmentName": "部门17名称"
                    },
                    {
                        "departmentId": "部门18id",
                        "departmentName": "部门18名称"
                    },
                    {
                        "departmentId": "部门19id",
                        "departmentName": "部门19名称"
                    },
                    {
                        "departmentId": "部门20id",
                        "departmentName": "部门20名称"
                    },
                    {
                        "departmentId": "部门21id",
                        "departmentName": "部门21名称"
                    },
                    {
                        "departmentId": "部门22id",
                        "departmentName": "部门22名称"
                    },
                    {
                        "departmentId": "部门23id",
                        "departmentName": "部门23名称"
                    },
                    {
                        "departmentId": "部门24id",
                        "departmentName": "部门24名称"
                    },
                    {
                        "departmentId": "部门25id",
                        "departmentName": "部门25名称"
                    },
                    {
                        "departmentId": "部门26id",
                        "departmentName": "部门26名称"
                    },
                    {
                        "departmentId": "部门27id",
                        "departmentName": "部门27名称"
                    },
                    {
                        "departmentId": "部门28id",
                        "departmentName": "部门28名称"
                    },
                    {
                        "departmentId": "部门29id",
                        "departmentName": "部门29名称"
                    },
                    {
                        "departmentId": "部门30id",
                        "departmentName": "部门30名称"
                    },
                    {
                        "departmentId": "部门31id",
                        "departmentName": "部门31名称"
                    },
                    {
                        "departmentId": "部门32id",
                        "departmentName": "部门32名称"
                    },
                    {
                        "departmentId": "部门33id",
                        "departmentName": "部门33名称"
                    },
                    {
                        "departmentId": "部门34id",
                        "departmentName": "部门34名称"
                    },
                    {
                        "departmentId": "部门35id",
                        "departmentName": "部门35名称"
                    },
                    {
                        "departmentId": "部门36id",
                        "departmentName": "部门36名称"
                    },
                    {
                        "departmentId": "部门37id",
                        "departmentName": "部门37名称"
                    },
                    {
                        "departmentId": "部门38id",
                        "departmentName": "部门38名称"
                    },
                    {
                        "departmentId": "部门39id",
                        "departmentName": "部门39名称"
                    },
                    {
                        "departmentId": "部门40id",
                        "departmentName": "部门40名称"
                    },
                    {
                        "departmentId": "部门41id",
                        "departmentName": "部门41名称"
                    },
                    {
                        "departmentId": "部门42id",
                        "departmentName": "部门42名称"
                    },
                    {
                        "departmentId": "部门43id",
                        "departmentName": "部门43名称"
                    },
                    {
                        "departmentId": "部门44id",
                        "departmentName": "部门44名称"
                    },
                    {
                        "departmentId": "部门45id",
                        "departmentName": "部门45名称"
                    },
                    {
                        "departmentId": "部门46id",
                        "departmentName": "部门46名称"
                    },
                    {
                        "departmentId": "部门47id",
                        "departmentName": "部门47名称"
                    },
                    {
                        "departmentId": "部门48id",
                        "departmentName": "部门48名称"
                    },
                    {
                        "departmentId": "部门49id",
                        "departmentName": "部门49名称"
                    },
                    {
                        "departmentId": "部门50id",
                        "departmentName": "部门50名称"
                    },
                    {
                        "departmentId": "部门51id",
                        "departmentName": "部门51名称"
                    },
                    {
                        "departmentId": "部门52id",
                        "departmentName": "部门52名称"
                    },
                    {
                        "departmentId": "部门53id",
                        "departmentName": "部门53名称"
                    },
                    {
                        "departmentId": "部门54id",
                        "departmentName": "部门54名称"
                    },
                    {
                        "departmentId": "部门55id",
                        "departmentName": "部门55名称"
                    },
                    {
                        "departmentId": "部门56id",
                        "departmentName": "部门56名称"
                    },
                    {
                        "departmentId": "部门57id",
                        "departmentName": "部门57名称"
                    },
                    {
                        "departmentId": "部门58id",
                        "departmentName": "部门58名称"
                    },
                    {
                        "departmentId": "部门59id",
                        "departmentName": "部门59名称"
                    },
                    {
                        "departmentId": "部门60id",
                        "departmentName": "部门60名称"
                    },
                    {
                        "departmentId": "部门61id",
                        "departmentName": "部门61名称"
                    },
                    {
                        "departmentId": "部门62id",
                        "departmentName": "部门62名称"
                    },
                    {
                        "departmentId": "部门63id",
                        "departmentName": "部门63名称"
                    },
                    {
                        "departmentId": "部门64id",
                        "departmentName": "部门64名称"
                    },
                    {
                        "departmentId": "部门65id",
                        "departmentName": "部门65名称"
                    }
                ]
            }
        ],
        //项目类型数据
        "projectType": [{
                "projectTypeId": "类型1id",
                "projectTypeName": "类型1名称"
            },
            {
                "projectTypeId": "类型2id",
                "projectTypeName": "类型2名称"
            }
        ],
        //项目阶段数据
        "process": [{
                "processId": "阶段1id",
                "processName": "阶段1名称"
            },
            {
                "processId": "阶段2id",
                "processName": "阶段2名称"
            }
        ],
        //项目风险类型数据
        "riskType": [{
                "riskTypeId": "风险1id",
                "riskTypeName": "风险1名称"
            },
            {
                "riskTypeId": "风险2id",
                "riskTypeName": "风险2名称"
            }
        ],
        //项目状态数据
        "projectStatus": [{
                "projectStatusId": "状态1id",
                "projectStatusName": "状态1名称"
            },
            {
                "projectStatusId": "状态2id",
                "projectStatusName": "状态2名称"
            }
        ]
    }
    var id = this.props.routeParams.id,
      filterTypeList = resData,
      arr = [],
      keys = ['center', 'projectType', 'process', 'riskType', 'projectStatus'];
    arr = filterTypeList[keys[id - 1]];
    // console.log(filterTypeList)
    if(id == 1) {
      arr = Object.keys(arr).map(function(item) {
        return arr[item];
      })

      this.setState({
        configs : {
          type : 'lxxx',
          list : arr.map((v, i) => {
            return {
              choiceId: v.centerId,
              text: v.centerName,
              to: '/xmsx/option/1/' + v.centerId + '?centerName=' + v.centerName + '&id=' + id
            }
          }),
          touch : true
        }
      })
    } else {
      this.state.configs.type = 'lxxx';
      arr = Object.keys(arr).map(function(item) {
        return arr[item];
      });
      this.setState({
        configs : {
          type : 'lxxx',
          list : arr.map((v, i) => {
            return {
              choiceId: v[Object.keys(v)[0]],
              text: v[Object.keys(v)[1]],
              to: '/xmsx?id=' + id + '&text='+ v[Object.keys(v)[1]] +'&choiceId=' + v[Object.keys(v)[0]]
            }
          }),
          touch : true
        }
      })
    }
  }

  render() {
    // console.log(this.state)
    return this.renderCommonLists();
  }
}

export default Connect({
  _id: 'lxxx',
  _component: Lxxx,
  _headerBackUrls: '/xmsx', //头部回退按钮地址
});
