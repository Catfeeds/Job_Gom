import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import PropTypes from 'prop-types';

class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      active: '',
      parData: 0
    }
  }

  onClick(list) {
    this.props.onSubClick(list)
  }

  parentActive (parData) {
    this.setState({
      active: 'blue',
      parData: parData
    })
  }

  render() {
    let lists = this.state.data;
      return (
        <ul>
          {
            lists.map((list, index) => {
              return <li
               className={list === this.state.parData?this.state.active:null} key={index}
               onClick={() => {this.onClick(list)}}
              >{list}</li>
            })
          }
        </ul>
      )
  }
}

export default Child;
