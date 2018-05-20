import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


import store from '../../redux/store';
import { CHILK_DATA } from '../../redux/action';

class SubChild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
      active: '',
      subChildData: 0
    }
  }

  onClick(list) {
    this.setState({
      active: 'green',
      subChildData: list
    }, () => {

      setTimeout(() => {
        store.dispatch({
          type: CHILK_DATA,
          subChildData: list,
          _type: 'parent'
        });
      }, 500)

    });
  }

  render() {
    let lists = this.state.data;
      return (
        <ul className="subChildUl fl">
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

export default SubChild;
