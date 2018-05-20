/**
 * [文章添加到美号]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import React, {Component} from 'react';
import Scrollload from 'scrollload';
import ArticleService from 'api/article';

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribe_id: props.item.subscribe_id,
            selected: props.item.selected === 1
        }
    }
    componentDidMount(){
        if (this.state.selected) {
            this.props.onSelect(this.state.subscribe_id);
        }
    }
    onSelect=()=> {
        let that = this;
        this.setState((preState, props)=>{
            return {selected: true};
        }, ()=>{
            that.props.onSelect(that.state.subscribe_id);
        });
    }
    render() {
        return (
            <tr onClick={this.onSelect}>
                <td>
                    <label className="label" >
                        <input checked={this.state.selected} className="radio" readOnly="true" type="radio" name="demo-radio"></input>
                        <span className="icon-1"></span>{this.props.item.name}
                    </label>
                </td>
            </tr>
        )
    }
}

class SubscribeAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            result: [],
            page: 1,
            pageSize: 2
        }
    }
    fetchData=(article_id)=> {
        return ArticleService.listSubscribers(article_id);
    }
    refresh=()=> {
        this.fetchData(this.props.article_id).then(ret=>{

            let page = this.state.page + 1;
            if (this.state.result.length === 0) {
                this.setState({
                    page: page,
                    result: ret.data.data.list.list
                });
            } else { // todo，此处预留有滚动加载功能，暂时不做
                this.setState({
                    hasMore: false, // TODO,判断数量
                    result: this.state.result.concat(ret.data.data),
                    page: page
                });
            }
            this.scroolload && this.scroolload.unLock();
        });
    }
    componentDidMount() {
        let that = this;
        //this.refresh();
        /*this.scroolload = new Scrollload(document.getElementById('vm-sub-add-table'), async function (sl) {
         if (that.state.hasMore) {
         await that.refresh();
         } else {
         sl.noData();
         }
         }, {
         isInitLock: false,
         loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
         noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
         exceptionHtml: '<div class="top-line no-more clickHandler"><p>出错啦请重试</p></div>'
         });*/
    }
    render(){
        let array = [];
        // let ret = this.state.result;
        let {onSelect, result} = this.props;
        for (let i = 0, len = result.length; i < len; i++) {
            array.push(<Row key={i} item={result[i]} onSelect={onSelect} />);
        }
        return (
            <div className="vm-sub-add">
                <table>
                    <tbody id="vm-sub-add-table">
                    {array}
                    </tbody>
                </table>
            </div>
        );
    }
}

export  default SubscribeAdd