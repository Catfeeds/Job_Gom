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
      subData: 0
    }
  }

  onClick = () => {
    this.setState({
      type: 'child'
    }, () => {
      this.childInstance.parentActive(this.state.subData || 0);
    })
  }

  onSubClick = (index) => {
    this.setState({
      type: 'parent',
      subData: index
    })
  }

  render() {
    if(this.state.type == 'parent') {
      return (
        <div>
          <i onClick={this.onClick} ref="myInput">单级父子组件间传值: </i>
          <i>{this.state.subData}</i>
        </div>
      )
    } else if(this.state.type == 'child') {
      return (
        <Child
         ref={(child) => {this.childInstance = child}}
         data={this.state.data}
         onSubClick={this.onSubClick}/>
      )
    }
  }
}

export default Parent;
