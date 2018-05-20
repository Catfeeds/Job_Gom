import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      active: '',
      childData1: 0
    }
  }

  onClick(list) {
    this.setState({
      active: 'blue',
      childData1: list
    }, () => {
      setTimeout(() => {
        this.props.onChildClick('child1', list)
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
               className={list === this.state.childData1?this.state.active:null} key={index}
               onClick={() => {this.onClick(list)}}
              >{list}</li>
            })
          }
        </ul>
      )
  }
}

export default Child;
