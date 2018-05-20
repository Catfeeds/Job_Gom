import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import Immutable, { is, fromJS } from 'immutable';

import CommonHeader from '../widget/commonHeader'; //头部入口

import store from '../../Redux/Store';
import * as action from '../../Redux/Action';

const Connect = optionSetting => {
  let option = {
    _id: '', //应用唯一id表示
    _responseUrl: '', //请求地址
    _responseData: {}, //发送给服务器的数据
    _component: <div></div>, //数据回调给的组件
    _headerBackUrls: '', //头部回退按钮地址
    _headerTitleSets: '', //头部标题内容
  }

  for(let key in optionSetting) {
    option[key] = optionSetting[key];
  }

  class Temp extends Component {
    static defaultProps = option;

    constructor(props, context) {
      super(props, context);
    }

    componentWillMount() {
      if(this.props._id == 'lxxx') {
        this.props.headerTitleSets({id: this.props.params.id, path : this.props._headerBackUrls, title: this.props._headerTitleSets});
      } else if(this.props._id == 'xmxq') {
        this.props.headerTitleSets({path : this.props._headerBackUrls, title: this.props.detailModule.data.projectName});
      } else {
        this.props.headerBackUrls({path : this.props._headerBackUrls, title: this.props._headerTitleSets});
      }
    }

    componentDidMount() {
      //获取数据
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
      return !is(fromJS(this.props), fromJS(nextProps)) || !(fromJS(this.props), fromJS(nextState));
    }

    render() {
      return (
        <div>
          <CommonHeader {...this.props} state={Immutable.Map(this.props.state).toJS()}/>
          <this.props._component {...this.props} state={Immutable.Map(this.props.state).toJS()} />
        </div>
      )
    }
  }
  
  return connect(state => {
    return state
  }, action)(Temp);
}

export default Connect;
