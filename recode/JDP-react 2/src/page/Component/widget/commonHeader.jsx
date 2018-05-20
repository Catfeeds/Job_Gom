import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../Redux/Store';

import Connect from '../connect/template';

// 1.引入action的type利用最原始的dispatch方法调用。
// import { HEADER_BACK_URLS } from '../../Redux/Action';
// 2.利用action引入完成dispatch调用。
// import { headerBackUrls } from '../../Redux/Action';
// 3.合并action的dispatch到props里面。
// import * as action from '../../Redux/Action';

import '../../Style/sass/Header';

export class CommonHeader extends Component {
  // let { lists } = props.configs;
  constructor(props, context) {
    super(props, context);

    this.state = {
      headerJson : null
    }
  }

  _click() {
    // console.log(this);
    //
    // 1.引入action的type利用最原始的dispatch方法调用。
    //
    //
    // store.dispatch({
    //   type: HEADER_BACK_URLS,
    //   json: {
    //     url: 'header',
    //   }
    // });
    // console.log(store.getState())
    // 2.利用action引入完成dispatch调用。
    // store.dispatch(headerBackUrls(this.props._headerBackUrls), {});
    //

    // console.log(this)
    if(this.state.headerJson.path) {
      return this.props.router.push({
        pathname : this.state.headerJson.path
      });
    } else {
      return window.history.back();
    }
  }

  componentDidMount() {
    this.setState({
      headerJson: store.getState().headerModule.data
    }, () => {
      this.refs.HeaderTitle.innerHTML = this.state.headerJson.title;
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.props), fromJS(nextState));
  // }

  render() {
    // let {_headerTitleSets} = this.state.headerJson.title;
    return (
      <div className="header">
        <a href="javascript:void(0)">
          <em className="header-backicon iconn-1" onClick={() => this._click()}></em>
        </a>
        <span className="header-title" ref="HeaderTitle">
        </span>
      </div>
    )
  }
}

// 3.通过合并action到props然后connect到UI。
// function bindAction(dispatch) {
//     return bindActionCreators(action, dispatch)
// }

// export default connect(state => state, bindAction)(CommonHeader);

export default CommonHeader;
