/**
 *
 Created by zhangzhao on 2017/8/1.
 Email: zhangzhao@gomeplus.com
 */

import React, {Component} from 'react';
import Pager from "components/Pager";
import RowContent from './row_content';
import Notification from 'components/Notification';

const Thead = ()=>{
    return (
        <thead className="thead">
        <tr>
            <th className="text-left">视频封面</th>
            <th className="stater">状态</th>
            <th className="operate">操作</th>
        </tr>
        </thead>
    );
}

var notification = Notification();

class VideoList extends Component{
    constructor(){
        super();
    }
    getList=(page)=> {
        this.props.fetchData(page, this.props.status);
    }
    componentDidMount(){

    }
    refreshList=()=>{
        this.props.fetchData(1, this.props.status);
    }
    render() {
        let {data, actions, page_total, fetchData, history, page} = this.props;
        return (
            <div>
				{/*
		            <div className="rc-notification rc-notification-notice">
		                <span className="rc-icon">
		                    <em className="icon-21"></em>
		                    <em className="icon-22"></em>
		                </span>
		                <span>提交成功</span>
		            </div>
		        */}
                <table className="video-list-table">
                    <Thead/>
                    <RowContent 
                        fetchData={this.refreshList}
                        actions={actions} 
                        list={data} 
                        notification={notification}
                        history={history}
                    />
                </table>
                {page_total > 0 ? <Pager size={page_total} page={page} callbackFn={this.getList} />: null}
            </div>
        );
    }
}
export  default  VideoList