import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';
import Immutable, { is, fromJS } from 'immutable';

import store from '../../Redux/Store';

import {listFilterCenter, listFilterDepartment, listInitDepartMents, listFilterType,
listFilterState, listFilterRisk, listFilterProject, detailSearchResult} from '../../Redux/Action';


import '../../Style/sass/list';

export class CommonLists extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchJson : null
    }
  }

  //自定义事件回调父级事件
  // _toVisited() {
  //   console.log(this.props)
  //   this.props.onVisited && this.props.onVisited(true);
  // }

  //早期dispatch
  // _click(event) {
  //   if(this.props.configs.touch) {
  //     let {configs} = this.props;
  //     this.props.selectToStrings({type: configs.type, name: configs.name});
  //   }
  // }

  goToxmxq(item) {
    store.dispatch(detailSearchResult(item));
  }

  addFilter(item, index) {
    let _this = this;
    let id = this.props.routeParams.id;
    let optionsId = parseInt(item.optionsId);

    switch(id) {
      case "1":
        if(index == 0) {
          // store.dispatch(listInitDepartMents());
          store.dispatch(listFilterCenter(item));
          this.props.router.push({
            pathname : '/xmsx'
          });
          return;
        } else {
          store.dispatch(listInitDepartMents());
          store.dispatch(listFilterCenter(item));
        }
      break;

      case "2":
        store.dispatch(listFilterType(item));
      break;

      case "3":
        store.dispatch(listFilterState(item));
      break;

      case "4":
        store.dispatch(listFilterRisk(item));
      break;

      case "5":
        store.dispatch(listFilterProject(item));
      break;
    }
    if(id == "1") {
      this.props.router.push({
        pathname: `/xmsx/option/1/${item.choiceId}`
      })
    } else {
      this.props.router.push({
        pathname: '/xmsx'
      })
    }
  }

  addFilterDepart(item) {
    store.dispatch(listFilterDepartment(item));

    // 因为没有通过Link路由所以，this.props.router属性不会存在。
    //
    // this.props.router.push({
    //   pathname : '/xmsx'
    // });
  }

  componentWillMount() {
    let searchJson = Immutable.Map(store.getState().searchModule).toJS();
    searchJson = searchJson.data.filter?searchJson.data.filter:null;
    this.setState({
      searchJson: searchJson
    })
  }

  subNumber(index) {
    this.props.onClick(index);
  }

  render() {
    let {list, type} = this.props.configs;
    let {searchJson} = this.state;
    // 早期jsx版本
    // return <ul>
    //   {
    //     list.length > 0?list.map((item, index) => {
    //       return (
    //         <div key={index} className="nav-list-item" onClick={(event) => this._click(event)}>
    //           {item.to?<Link to={`${item.to}`}>
    //             {type=='main'?<em className={`${item.iconClass}`}></em>:null}
    //             <span>{item.text}</span>
    //             {type=='listNav'?<em className="icon iconn-5 icon-info"></em>:null}
    //           </Link>:<span className={type == 'memberList'?'navListItemTitle':null}>
    //             {type=='memberList'?<strong>{item.name}<span>{item.text}</span></strong>:null}
    //           </span>}
    //         </div>
    //       )
    //     }):null
    //   }
    // </ul>
    //
    // 上线版本
    //
    return (
      <ul>
        {
          list.length > 0?list.map((item, index) => {
            return (
              <li key={index}>
                {type=="eventRes"?<div key={index} className={(this.props.action)&&(this.props.subIndex==index)?"navListItemTitle itemAction":"navListItemTitle"} onClick={() => {this.subNumber(index)}}>
                  <strong>{index+1}.{item.name}</strong>
                  <span>{item.text}</span>
                </div>:null}
                {type=='main'?<div key={index} className="nav-list-item">
                  <Link to={`${item.to}`}>
                    <em className={`${item.iconClass}`}></em>
                    <span>{item.text}</span>
                    <em className="icon iconn-5 icon-info"></em>
                  </Link>
                </div>:null}
                {type=='xmlx'?<div key={index} className="nav-list-item">
                  <Link to={`${item.to}`}>
                    <span>{item.text}</span>
                    <em className="icon iconn-5 icon-info"></em>
                  </Link>
                </div>:null}
                {type=="sxjg"?<div key={index} className="nav-list-item mr80" onClick={() => this.goToxmxq(item)}>
                  <Link to={`${item.to}`}>
                    <span>{item.text}</span>
                    <em className="icon iconn-5 icon-info"></em>
                  </Link>
                </div>:null}
                {type=="gzl"?<div key={index} className="nav-list-item">
                  <Link to={`${item.to}`}>
                    <span>{item.text}</span>
                    <em className="icon iconn-5 icon-info"></em>
                  </Link>
                </div>:null}
                {type=="xmsx"?<div key={index} className="nav-list-item">
                  <Link to={`${item.to}`}>
                    <span>{item.text}</span>
                    <em className="icon iconn-5 icon-info"></em>
                  </Link>
                </div>:null}
                {type=="xmsxVisited"?<div key={index} className="nav-list-item">
                  <Link to={`${item.to}`}>
                    <span>{item.text}</span>
                    <em className="icon iconn-5 icon-info"></em>
                    {/*
                      reducer数据结构改写，注释掉
                      {(index == 0)?(searchJson.centerName?<strong id={`${searchJson.center}_${searchJson.departId}`}>{searchJson.centerName}{searchJson.departName?<span>/</span>:null}{searchJson.departName}</strong>:null):null}
                      {(index == 1)?(searchJson.typeName?<strong id={searchJson.typeId}>{searchJson.typeName}</strong>:null):null}
                      {(index == 2)?(searchJson.stateName?<strong id={searchJson.stateId}>{searchJson.stateName}</strong>:null):null}
                      {(index == 3)?(searchJson.riskName?<strong id={searchJson.riskId}>{searchJson.riskName}</strong>:null):null}
                      {(index == 4)?(searchJson.projectName?<strong id={searchJson.projectId}>{searchJson.projectName}</strong>:null):null}
                    */}
                    {item.choiceCenter?(<strong>{item.choiceCenter}{item.choiceDepart?<span>/</span>:null}{item.choiceDepart}</strong>):null}
                    {item.choiceText?<strong>{item.choiceText}</strong>:null}
                  </Link>
                </div>:null}
                {type=="lxxx"?<div key={index} className="nav-list-item" onClick={() => this.addFilter(item, index)}>
                  <span>{item.text}</span>
                  <em className="icon iconn-5 icon-info"></em>
                </div>:null}
                {type=="bmsx"?<div key={index} className="nav-list-item" onClick={() => this.addFilterDepart(item)}>
                  <Link to={`${item.to}`}>
                    <span>{item.text}</span>
                  </Link>
                </div>:null}
                {type=="xmcy"?<div key={index} className="navListItemTitle">
                  <strong>{index+1}.{item.name}</strong>
                  <span>{item.text}</span>
                </div>:null}
              </li>
            )
          }):null
        }
      </ul>
    )
  }
}

export default CommonLists;
