
import React, {Component} from 'react';
//import VideoSubDialog from 'components/VideoSubDialog';
import  ReactDOM from 'react-dom';

import fetch from 'io/fetch';
import Notification from 'components/Notification';
import PropTypes from 'prop-types';
import AddMsgDailog from './AddMsgDailog';

// 添加视频按钮
class AddMsgBtn extends Component{
    constructor(props){
        super(props);
        this.state={
            addHtml : true,
            visible : true
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.handleArticle = this.handleArticle.bind(this);
    }

    static contextTypes={
        subscribe_id : PropTypes.string,
        callback : PropTypes.func,
        newArr : PropTypes.func
    }

    handleClick(event){
        var add_video = document.getElementById("add_video");
        if(!add_video){
            var div=document.createElement('div');
            div.innerHTML='<div id="add_video"></div>';
            document.body.appendChild(div);
        }

        ReactDOM.render(
            <AddMsgDailog
                subscribe_id={this.context.subscribe_id}
                type={this.props.type}
                onOk={this.onOk.bind(this)}

            />,
            document.getElementById('add_video')
        );

    }

    // 选择需要添加的列表
    onOk(ok){
        this.context.newArr(ok);
    }

    handleVideo(){
        this.context.callback("video");
    }

    handleArticle(){
        this.context.callback("article");
    }

    render(){

        var videoClass = this.props.type == "video"? "video active" : "video";
        var articleClass =this.props.type =="article"? "article active" : "article";
        var addBtn=null;
        if(!this.props.approve_status ){
            addBtn= <span className='video-add disable' >{this.props.type=="article"? "添加图文" : "添加视频"}</span>
        }else{
            addBtn= <span className='video-add'  onClick={this.handleClick}>{this.props.type=="article"? "添加图文" : "添加视频"}</span>
        }
        return (
            <div className='addVideo' >
                <div className="add-left">
                    <span className={videoClass}onClick={this.handleVideo}>视频</span>
                    <span className={articleClass}onClick={this.handleArticle}>图文</span>
                </div>
                {addBtn}
            </div>
        );
    }
}


export  default  AddMsgBtn;