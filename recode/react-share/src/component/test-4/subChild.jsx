import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import PropTypes from 'prop-types';

class SubChild extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: this.context.subData || [],
      active: '',
      subChildData: 0
    }
  }

  onClick(list) {
    this.setState({
      active: 'blue',
      subChildData: list
    }, () => {
      setTimeout(() => {
        this.props.onSubClick('subChild', list)
      }, 500)
    })
  }

  render() {
    let lists = this.state.data;
      return (
        <ul>
          {
            lists.map((list, index) => {
              return <li
               className={list === this.state.subChildData?this.state.active:null} key={index}
               onClick={() => {this.onClick(list)}}
              >{list}</li>
            })
          }
        </ul>
      )
  }
}

SubChild.contextTypes = {
  data: PropTypes.array,
  subData: PropTypes.array
};

export default SubChild;
