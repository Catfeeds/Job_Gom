import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable, { is, fromJS } from 'immutable';

import Connect from '../connect/template';
import * as action from '../../Redux/Action';

// @connect (
//   state => state
// )
class IndexContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default IndexContainer;
