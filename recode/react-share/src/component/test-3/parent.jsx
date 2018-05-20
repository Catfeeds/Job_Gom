import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import Child from './child.jsx';

import store from '../../redux/store';
import { CHILK_DATA } from '../../redux/action';

class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _type: 'parent',
      childData: 0,
      subChildData: 0
    }
  }

  onClick = () => {
    store.dispatch({
      type: CHILK_DATA,
      _type: 'child'
    });

    let _state = store.getState().chilkDataModule;

    this.setState({
      _type: _state._type
    })
  }

  componentDidMount() {
    store.subscribe(()=> {
      let _state = store.getState().chilkDataModule;
      this.setState({
        _type: _state._type,
        childData: _state.childData,
        subChildData: _state.subChildData
      })
    });
  }

  render() {
    if(this.state._type == 'parent') {
      return (
        <div>
          <i onClick={this.onClick} ref="myInput">Redux跨组件父子组件间传值: </i>
          <i>{this.state.childData}</i>
          <i> - </i>
          <i>{this.state.subChildData}</i>
        </div>
      )
    } else {
      return (
        <Child
         _type={this.state._type}
         ref={(child) => {this.childInstance = child}}
         onSubClick={this.onSubClick}/>
      )
    }
  }
}

export default Parent;
