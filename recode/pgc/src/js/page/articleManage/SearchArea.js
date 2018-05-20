
import React, {Component} from 'react';
import DropDown from 'components/DropDown';

export default class SearchArea extends Component {
    constructor(props) {
        super(props);
    }
    onChange=({e, val})=> {
        this.props.fetchData(null, val);
    }
    render() {
        return (<div className="vm-search-area">
            <div className="vm-search-label">图文状态:</div>
            <DropDown onChange={this.onChange} />
        </div>);
    }
}