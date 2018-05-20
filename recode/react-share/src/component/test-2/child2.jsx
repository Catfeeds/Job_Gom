import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

class Child extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      active: '',
      childData2: 0
    }
  }

  onClick(list) {
    this.setState({
      active: 'blue',
      childData2: list
    }, () => {
      setTimeout(() => {
        this.props.onChildClick('child2', list)
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
               className={list === this.state.childData2?this.state.active:null} key={index}
               onClick={() => {this.onClick(list)}}
              >{list}</li>
            })
          }
        </ul>
      )
  }
}

export default Child;
