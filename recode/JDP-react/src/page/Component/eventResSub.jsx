import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { History, Link } from 'react-router';

import CommonLists from './widget/commonLists';

class EventResSub extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      configs : {
        type: 'eventResSub',
      }
    }
  }

  subData(index) {
    this.props.onClick(index)
  }

  renderCommonLists() {
    return (
      <div className="main">
        <div className="marginTop">
          <h3>{this.props.user.name}</h3>
          <h2>{this.props.user.text}</h2>
          <div className="userButton" onClick={() => {this.subData(this.props.user.index)}}></div>
        </div>
      </div>
    )
  }


  render() {
    return this.renderCommonLists();
  }
}

export default EventResSub;
