import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import Child from './child.jsx';

import PropTypes from 'prop-types';

class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'parent',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      childData: 0,
      subChildData: 0
    }

    this.onOff = [];
  }

  getChildContext() {
    return {
      data: [],
      subData: [10, 20, 30, 40, 50, 60, 70, 80, 90]
    };
  }

  onClick = () => {
    this.setState({
      type: 'child'
    })
  }

  onChildClick = (_type, index) => {
    if(this.onOff.length < 2) {
      if(_type === 'child') {
        this.onOff.push('child');
        if(this.onOff.length == 2) {
          this.onOff.length = 0;
          this.setState({
            type: 'parent',
            childData: index
          })
        } else {
          this.setState({
            type: 'child',
            childData: index
          })
        }
      } else if(_type === 'subChild') {
        this.onOff.push('subChild');
        if(this.onOff.length == 2) {
          this.onOff.length = 0;
          this.setState({
            type: 'parent',
            subChildData: index
          })
        } else {
          this.setState({
            type: 'child',
            subChildData: index
          })
        }
      }
    }
  }

  render() {
    if(this.state.type == 'parent') {
      return (
        <div>
          <i onClick={this.onClick} ref="myInput">Context跨组件父子组件间传值: </i>
          <i>{this.state.childData}</i>
          <i> - </i>
          <i>{this.state.subChildData}</i>
        </div>
      )
    } else if(this.state.type == 'child') {
      return (
        <Child
         ref={(child) => {this.childInstance = child}}
         data={this.state.data}
         onChildClick={this.onChildClick}/>
      )
    }
  }
}

Parent.childContextTypes = {
  data: PropTypes.array,
  subData: PropTypes.array
};

export default Parent;
