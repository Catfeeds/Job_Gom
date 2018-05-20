import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';

import Test1 from './test-1/parent.jsx';

import Test2 from './test-2/parent.jsx';

import {Provider} from 'react-redux'; //开始供应商
import store from '../redux/store'; //引入仓库

import Test3 from './test-3/parent.jsx';

import Test4 from './test-4/parent.jsx';

import '../style/index.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Test1 />
        <Test2 />
        <Test3 />
        <Test4 />
      </div>
    )
  }
}

export default Main;
