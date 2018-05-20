
import React, {Component} from 'react';
import fetch from 'io/fetch';
import SubDetail from './SubDetail';
import Video from './Video';
import Article from './Article';
import PropTypes from 'prop-types';
class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            subDetail: {},
            totalPage:0,
            type:"video"
        };
    }

    componentWillMount(){
       this._getData(1);
    }

    static childContextTypes={
        subscribe_id : PropTypes.string,
        callback : PropTypes.func // 标签切换
    }

    getChildContext(){
        return {
            subscribe_id : this.props.subscribe_id,
            callback : this.tag.bind(this)
        }
    }

    tag(msg){
        if(msg !=this.props.type){
            if(msg == "video"){
                this._getData(1);
            }else{
                this.setState({
                    type : msg
                });
            }


        }

    }

    triger(tag){
        var approve_status = this.state.subDetail.approve_status == -1 ? false : true;

       return tag=="video" ?
           <Video subscribe_id ={this.props.subscribe_id} data={this.state.data} approve_status={approve_status}/> :
           <Article subscribe_id ={this.props.subscribe_id} approve_status={approve_status}/>;
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
                        subDetail : item.subscribe,
                        type:"video"
                    });
                }
            });
    }

    render() {
        if(this.state.subDetail.subscribe_id){
            return (
                <div>
                    <SubDetail subData={this.state.subDetail}  subscribe_id={this.props.subscribe_id}/>
                    {this.triger(this.state.type)}
                </div>
            );
        }else{
            return <div></div>;
        }
    }
}

export  default  Container;