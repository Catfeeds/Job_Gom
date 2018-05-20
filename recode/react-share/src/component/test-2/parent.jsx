import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import Child1 from './child1.jsx';
import Child2 from './child2.jsx';

class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'parent',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      childData1: 0,
      childData2: 0
    }

    this.onOff = [];
  }

  onClick = () => {
    this.setState({
      type: 'child'
    })
  }

  onChildClick = (_type, index) => {
    if(this.onOff.length < 2) {
      if(_type === 'child1') {
        this.onOff.push('child1');
        if(this.onOff.length == 2) {
          this.onOff.length = 0;
          this.setState({
            type: 'parent',
            childData1: index
          })
        } else {
          this.setState({
            type: 'child',
            childData1: index
          })
        }
      } else if(_type === 'child2') {
        this.onOff.push('child2');
        if(this.onOff.length == 2) {
          this.onOff.length = 0;
          this.setState({
            type: 'parent',
            childData2: index
          })
        } else {
          this.setState({
            type: 'child',
            childData2: index
          })
        }
      }
    }
  }

  render() {
    if(this.state.type == 'parent') {
      return (
        <div>
          <i onClick={this.onClick} ref="myInput">同级子组件间传值: </i>
          <i>{this.state.childData1}</i>
          <i> : </i>
          <i>{this.state.childData2}</i>
        </div>
      )
    } else if(this.state.type == 'child') {
      return (
        <div>
         <Child1
          ref={(child) => {this.childInstance1 = child}}
          data={this.state.data}
          onChildClick={this.onChildClick}/>
         <Child2
          ref={(child) => {this.childInstance2 = child}}
          data={this.state.data}
          onChildClick={this.onChildClick}/>
        </div>
      )
    }
  }
}

export default Parent;
