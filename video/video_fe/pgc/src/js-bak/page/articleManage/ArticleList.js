/**
 * [图文列表]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';
import Pager from "components/Pager";
import RowContent from './row_content';
import Notification from 'components/Notification';

let notification = Notification();

const Thead = ()=>{
    return (
        <thead className="thead">
        <tr>
            <th className="text-left">标题</th>
            <th className="stater">状态</th>
            <th className="operate">操作</th>
        </tr>
        </thead>
    );
};

class ArticleList extends Component{
    constructor(props){
        super(props);
    }

    getList=(page)=> {
        this.props.fetchData(page, this.props.status);
    }

    refreshList=()=>{
        this.props.fetchData(1, this.props.status);
    }

    render() {
        let {data, actions, page_total, fetchData, history, page} = this.props;
        return (
            <div>
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

export default ArticleList;