import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


import store from '../../redux/store';
import { CHILK_DATA } from '../../redux/action';

import SubChild from './subChild.jsx';

class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _type: this.props._type || 'child',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      active: '',
      childData: 0
    }
  }

  onClick(e, list) {
    store.dispatch({
      type: CHILK_DATA,
      childData: list,
      _type: 'subChild'
    });

    let _state = store.getState().chilkDataModule;

    this.setState({
      _type: _state._type,
      active: 'red',
      childData: list
    });
  }

  render() {
    let lists = this.state.data;

    if(this.state._type === 'child') {
      return (
        <ul>
          {
            lists.map((list, index) => {
              return <li
               className={list === this.state.childData?this.state.active:null} key={index}
               onClick={(e) => {this.onClick(e, list)}}
              >{list}</li>
            })
          }
        </ul>
      )
    } else if (this.state._type === 'subChild') {
      return (
        <div >
          <ul className="childUl fl">
            {
              lists.map((list, index) => {
                return <li
                 className={list === this.state.childData?this.state.active:null} key={index}
                 onClick={(e) => {this.onClick(e, list)}}
                >{list}</li>
              })
            }
          </ul>
          <SubChild />
        </div>
      )
    }
  }
}

export default Child;
