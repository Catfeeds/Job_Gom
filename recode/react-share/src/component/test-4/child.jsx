import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import PropTypes from 'prop-types';

import SubChild from './subChild.jsx';

class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      active: '',
      childData: 0
    }
  }

  onClick(list) {
    this.setState({
      active: 'blue',
      childData: list
    }, () => {
      setTimeout(() => {
        this.props.onChildClick('child', list)
      }, 500)
    })
  }

  render() {
    let lists = this.state.data;
      return (
        <div>
          <ul>
            {
              lists.map((list, index) => {
                return <li
                 className={list === this.state.childData?this.state.active:null} key={index}
                 onClick={() => {this.onClick(list)}}
                >{list}</li>
              })
            }
          </ul>
          <SubChild onSubClick={(_type, subChildData) => {
            this.props.onChildClick(_type, subChildData)
          }}/>
        </div>
      )
  }
}

Child.contextTypes = {
  data: PropTypes.array,
  subData: PropTypes.array
};

export default Child;
