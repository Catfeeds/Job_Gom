import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
import Immutable, { is, fromJS } from 'immutable';

import store from '../Redux/Store';

import {detailSearchResult} from '../Redux/Action';

import CommonLists from './widget/commonLists';
import Connect from './connect/template';

class Xmsx extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showFilter: true,
      showSearch: false,
      searchText: '',
      filterData: false,
      configs: {
        type: 'xmsx',
        list: [
          {
            to: '/xmsx/option/1',
            text: '选择中心/部门'
          },
          {
            to: '/xmsx/option/2',
            text: '选择类型'
          },
          {
            to: '/xmsx/option/3',
            text: '选择阶段'
          },
          {
            to: '/xmsx/option/4',
            text: '选择风险类型'
          },
          {
            to: '/xmsx/option/5',
            text: '选择状态类型'
          },
        ]
      },
      xmsxData: {
        filterTypeList: []
      },
      visited: false,
      filter: {
        centerName: '',  // 中心 id
        centerId: -1,
        departId: -1,    // 部门 id
        departName: '',
        filterCenter: false,
        typeId: -1,  // 类型 id
        typeName: '',
        filterType: false,
        stateId: -1,  // 阶段 id
        stateName: '',
        filterState: false,
        riskId: -1,  // 风险 id
        riskName: '',
        filterRisk: false,
        projectId: -1,  // 状态 id
        projectName: '',
        filterProject: false
      }
    }
  }

  _tab(n) {
    if(n) {
      this.setState({
        showFilter: true,
        showSearch: false,
      });
    } else {
      this.setState({
        showFilter: false,
        showSearch: true,
      });
    }
  }

  _toSearch() {
    if(this.state.searchText) {
      store.dispatch(detailSearchResult({
        text: this.state.searchText
      }));

      this.props.router.push({
        pathname: '/xmsx/xmxq'
      })
    }
  }

  _toFilter() {
    if(this.state.filterData) {
      this.props.router.push({
        pathname: '/xmsx/sxjg'
      })
    }
  }

  _toChange(e) {
    this.setState({
      searchText: e.target.value
    })
  }

  // _toVisited(isBoolean) {
  //   console.log(isBoolean)
  //   this.setState({
  //     visited: isBoolean
  //   })
  // }

  componentWillMount() {
    let isVisitedSearchData = Immutable.Map(this.props.searchModule).toJS() ? Immutable.Map(this.props.searchModule).toJS() : false;
    // this.state.visited = isVisitedBoolean.data.filter.visited?isVisitedBoolean.data.filter.visited:false;
    let isVisitedSearchFilter = isVisitedSearchData.data.filter;
    // console.log(isVisitedBoolean)
    if(!Object.is(undefined, isVisitedSearchFilter)){
      this.state.visited = isVisitedSearchFilter.visited;
    }
    if(this.state.visited) {
      this.setState({
        configs: Object.assign({}, this.state.configs, {type: 'xmsxVisited'})
      },() => {
        // 判断是否已经选中条件
        // let flag = [filter.filterCenter, filter.filterDepartment, filter.filterProject, filter.filterRisk, filter.filterState, filter.filterType].some(item => item);
        // if(flag){
        //   _this.state.filterData = true;
        // }
      })
    }
  }

  componentDidMount() {
    // 同步测试
    // console.log(1111111)

    let isVisitedSearchData = Immutable.Map(this.props.searchModule).toJS() ? Immutable.Map(this.props.searchModule).toJS() : false;
    // this.state.visited = isVisitedBoolean.data.filter.visited?isVisitedBoolean.data.filter.visited:false;
    let isVisitedSearchFilter = isVisitedSearchData.data.filter;
    if(this.state.visited) {
        let _this = this,
            filter = isVisitedSearchFilter;
        let filterMaps = [
          {
            "key": "filterCenter",
            "value": ["centerName", "departName"],
          },
          {
            "key": "filterType",
            "value": "typeName"
          },
          {
            "key": "filterState",
            "value": "stateName"
          },
          {
            "key": "filterRisk",
            "value": "riskName"
          },
          {
            "key": "filterProject",
            "value": "projectName"
          }
        ];
        filterMaps.forEach( (item, i) => {
          // console.log(filter[item.key])
          if(i == 0){
            if(filter[item.key]){
              // console.log({[item.value[0]]: filter[item.value[0]]});


              // 调取action，
              // dispatch触发reducer
              // 但是不能同步
              //
              // store.dispatch({
              //   ...AddupChoiceText({
              //     [item.value[0]]: filter[item.value[0]] , [item.value[1]]: filter[item.value[1]],
              //     payload: () => { _this.state.configs.list = _this.props.searchModule.data.configs.list }
              //   }),
              // });

              // 方法二:reducer里回调同步
              // _this.props.AddupChoiceText({
              //   [item.value[0]]: filter[item.value[0]] , [item.value[1]]: filter[item.value[1]],
              //   payload: () => {
              //     _this.setState({
              //       configs: {
              //         list: _this.props.searchOverModule.data.configs.list,
              //         type: 'xmsxVisited'
              //       }
              //     }))
              //   }
              // });

              // 方法三:es7 async/await promise同步
              (async () => {
                await Promise.resolve(
                  _this.props.AddupChoiceText({
                    [item.value[0]]: filter[item.value[0]] , [item.value[1]]: filter[item.value[1]]
                  })
                )

                await Promise.resolve(
                  _this.setState({
                    configs: {
                      list: _this.props.searchOverModule.data.configs.list,
                      type: 'xmsxVisited'
                    }
                  })
                );
              })()


              // 早期方案直接修改state，
              // 但是不能同步
                // _this.setState({
                //   configs: {
                //     list: _this.props.searchModule.data
                //   }
                // }）
              // _this.configs.list[i].choiceCenter = filter[item.value[0]];
              // _this.configs.list[i].choiceDepart = filter[item.value[1]];
              //
            }
          }else{
            if(filter[item.key]){



              // store.dispatch({
              //   ...AddupChoiceText({
              //     [item.value]: filter[item.value],
              //     payload: () => { _this.state.configs.list = _this.props.searchModule.data.configs.list }
              //   })
              // });



              // _this.props.AddupChoiceText({
              //   [item.value]: filter[item.value],
              //   payload: () => {
              //     console.log(2222)
              //     _this.setState({
              //       configs: {
              //         list : _this.props.searchOverModule.data.configs.list,
              //         type: 'xmsxVisited'
              //       }
              //     }))
              //   }
              // });


              (async () => {
                await Promise.resolve(
                  _this.props.AddupChoiceText({
                    [item.value]: filter[item.value]
                  })
                )

                await Promise.resolve(
                  _this.setState({
                    configs: {
                      list : _this.props.searchOverModule.data.configs.list,
                      type: 'xmsxVisited'
                    }
                  })
                )
              })()


              // _this.configs.list[i].choiceText = filter[item.value];
              //
            }
          }
        });
        // console.log(_this)
        //第一种写法 Promise
        // _this.setState({
        //   configs: {
        //     list : _this.props.searchOverModule.data.configs.list,
        //     type: 'xmsxVisited'
        //   }
        // })

        // 判断是否已经选中条件
        let flag = [filter.filterCenter, filter.filterDepartment, filter.filterProject, filter.filterRisk, filter.filterState, filter.filterType].some(item => item);
        if(flag){
          _this.state.filterData = true;
        }
    }
  }

  renderCommonLists() {
    // console.log(this.state)
    return (
      <div className="main">
        <div className="nav-list">
          <div className="search-head">
            <span onClick={() => this._tab(1)} className={this.state.showFilter?"on filter":"filter"}>筛选</span>
            <span onClick={() => this._tab(0)} className={this.state.showSearch?"on search":"search"}>搜索</span>
          </div>
          <div className="clips"></div>
          <div className="content-box">
          {
            this.state.showFilter?<div className="switch-item">
              <CommonLists configs={this.state.configs}></CommonLists>
              <div className="btn-box">
                <button className={this.state.filterData?"on filterBtn":"filterBtn"} onClick={() => this._toFilter()}>筛选</button>
              </div>
            </div>:null
          }
          {
            this.state.showSearch?<div className="switch-item">
              <ul>
                <li className="search-li">
                  <em className="icon iconn-4"></em>
                  <input type="text" ref="searchText" placeholder="请输入项目名称" onChange={(e) => this._toChange(e)} value={this.state.searchText}/>
                </li>
              </ul>
              <div className="btn-box">
                <button className={this.state.searchText?"on searchBtn":"searchBtn"} onClick={() => this._toSearch()}>搜索</button>
              </div>
            </div>:null
          }
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderCommonLists();
  }
}

export default Connect({
  _id: 'xmsx',
  _component: Xmsx,
  _headerBackUrls: '/', //头部回退按钮地址
  _headerTitleSets: '筛选/搜索', //头部标题内容
});
