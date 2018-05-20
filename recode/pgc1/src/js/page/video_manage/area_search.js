/**
 *
 Created by zhangzhao on 2017/8/1.
 Email: zhangzhao@gomeplus.com
 */
import React, {Component} from 'react';
import DropDown from 'components/DropDown';

export default class AreaSearch extends Component {
    constructor(props) {
        super(props);
    }
    onChange=({e, val})=> {
        this.props.fetchData(null, val);
    }
    render() {
        return (<div className="vm-search-area">
            <div className="vm-search-label">视频状态:</div>
            <DropDown onChange={this.onChange} />
        </div>);
    }
}