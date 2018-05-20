import React, {Component} from 'react';
import Pager from "components/Pager";
import AddMsgBtn from './AddMsgBtn';
import Table from './Table';
import fetch from 'io/fetch';
import PropTypes from 'prop-types';
class Article extends Component{
    constructor(){
        super();
        this.state={
            data : [],
            totalPage: 1,
            curPage : 1
            
        }
        this.pager=null;
    }

    static childContextTypes={
        newArr : PropTypes.func
    }

    getChildContext(){
        return{
            newArr : this.getNewData.bind(this)
        }
    }

    getNewData(ok){
        if(ok){
            this._getData(1)
        }
    }

    componentDidMount(){
        this._getData(1)
    }
    

    // 请求数据列表
    _getData(page){
        var subscribe_id= this.props.subscribe_id;
        fetch.get('/article/listBySubscribeId?subscribe_id='+subscribe_id+'&page='+page ,{loading: true})
            .then((data) => {
                if(data.data.message == 'success'){

                    var item = data.data.data;
                    this.setState({
                        data : item.list,
                        totalPage : item.page.page_total,
                        curPage: page
                    });
                }
            });
    }

    deleteCallback(ok){
        var value = {};
        if(ok){
            if(this.state.data.length <= 1 && this.state.curPage > 1){
                this._getData(parseInt(this.state.curPage) -1);
            }else{
                this._getData(this.state.curPage)
            }
        }
    }
    _toNextPageCallBack(page){
        if(page !=this.state.curPage){
            this._getData(page);
        }
    }


    render(){
        return(
            <div>
                <AddMsgBtn
                    type="article"
                    approve_status={this.props.approve_status}
                />
                <Table
                    data = {this.state.data}
                    subscribe_id ={this.props.subscribe_id}
                    deleteCallback={this.deleteCallback.bind(this)}
                    toastShow = {this.props.toastShow}
                    type="article"
                />
                <Pager
                    page={this.state.curPage}
                    size= {this.state.totalPage}
                    callbackFn={this._toNextPageCallBack.bind(this)}
                    ref={(pager) => {this.pager = pager;}}
                />
            </div>
        );
    }
}

export default Article;