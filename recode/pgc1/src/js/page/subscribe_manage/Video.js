
import React, {Component} from 'react';
import Pager from "components/Pager";
import AddMsgBtn from './AddMsgBtn';
import Table from './Table';
import fetch from 'io/fetch';
import PropTypes from 'prop-types';

class Video extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            totalPage: 1,
            curPage : 1,
            subDetail: {}
        };
        this.pager = null;
    }

    componentWillMount(){
       // this._getData(1);
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
    _getData(page){
        var subscribe_id= this.props.subscribe_id;
        fetch.get('/subscribe/videoList?subscribe_id='+subscribe_id+'&page='+page ,{loading: true})
            .then((data) => {
                if(data.data.message == 'success'){
                    var item = data.data.data;
                    this.setState({
                        data : item.list,
                        totalPage : item.page.page_total,
                        curPage : page,
                        subDetail : item.subscribe
                    });
                }
            });
    }

    _toNextPageCallBack(page){
        if(page !=this.state.curPage){
            this._getData(page);
        }
    }

    _addVideoCallback(isOk){
        var value = {};
        if(isOk){
            this._getData(1);
            this.pager.toFirstPage(1);
        }
    }

    deleteCallback(ok){
        var value = {};
        if(ok){
            if(this.state.data.length <= 1 && this.state.curPage > 1){
                this._getData(this.state.curPage -1);
            }else{
                this._getData(this.state.curPage);
            }
        }

    }

    render() {

            return (
                <div>
                    <AddMsgBtn
                        type="video"
                        approve_status={this.props.approve_status}
                    />
                    <Table data = {this.state.data}
                           subscribe_id ={this.props.subscribe_id}
                           deleteCallback={this.deleteCallback.bind(this)}
                           toastShow = {this.props.toastShow}
                           type="video"
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

export  default  Video;