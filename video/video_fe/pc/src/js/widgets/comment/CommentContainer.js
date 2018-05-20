/**
 * [comment]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import {apiParams} from 'util/phpCommon';
import fetch from 'io/fetch.js';
import { loginFlag, page} from 'util/phpCommon.js';

class CommentContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newMsg:{},
            list:[],
            hotList:[],
            total:0,
            addMoreBtn: "",
            cursor:"",
            hotNum:0,
            initLoading:false
        }
    }

    replyMsg(data){
        var newData = {
            comment_id:data.comment_id,
            content : data.content,
            create_time:new Date(),// 获取当前的评论时间
            has_praise:0,
            has_report : 0,
            praise_count : 0,
            reply_count:0,
            user:{
                avatar : data.user.avatar , // 评论者 头像
                nickname : data.user.nickname, // 评论者 昵称
                user_id: data.user.user_id //  评论者ID
            },
            replyState:{
                open: false,
                list:[],
                isFetched:false,
                replyCursor:"",
                replyCurPage:0,
                replyAddMoreBtn:false,
                replyLoadState:"load"
            }
        };

        this.setState({
            newMsg: newData,
            total:parseInt(this.state.total) +1
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    componentWillReceiveProps(nextProps){

    }

    fetchData(){
        var that = this;
        var cursor = that.state.cursor;
        var apiParamskey =  loginFlag ?apiParams.inParams : apiParams.outParams;
        if(that.props.topicId){
            fetch.get("/v1/comment/integration_list"+"?"+apiParamskey, {
                domain: 'domain-user',
                data: {
                    topic_id :that.props.topicId
                },
                success:(data)=>{
                    if(data.code == 200){
                        that.setState({
                            list:data.data.list,
                            hotList: data.data.hot_list,
                            total:data.data.total,
                            addMoreBtn : Math.ceil(parseInt(data.data.total)/10) > 1 ? true :false,
                            cursor:data.data.cursor,
                            hotNum:data.data.hot_list.length,
                            initLoading: true
                        });
                    }else{
                        that.setState({
                            initLoading: true
                        })
                    }
                },
                error:()=>{
                    that.setState({
                        initLoading: true
                    })
                }
            });
        }
    }

    totalNum(type,state,index){
        if(type == "list"){
            this.setState({
                total: state=="delete" ? parseInt(this.state.total) -1 : parseInt(this.state.total) +1,
                newMsg:""
            });
        }else{
            var hotList = this.state.hotList;
            hotList.splice(index,1);
            this.setState({
                hotNum: state=="delete" ? parseInt(this.state.hotNum) -1 : parseInt(this.state.hotNum) +1,
                hotList:hotList,
                newMsg:""
            });
        }

    }

    render(){
        var topicId = $CONFIG['topicId'];
        var list = null;
        var hot = null;
        var nodata=null

        if(!this.state.initLoading){
            nodata=<div><a href="javascript:;" className="more disabled"><em className="icon-49"></em>正在加载…</a></div>
        }

        if(this.state.initLoading && this.state.total == 0 && this.state.hotNum == 0){
            nodata =  <div className="no-comment">还没有评论，快来抢沙发~</div>;
        }

        if(this.state.total != 0) {
            list = <CommentList
                newMsg={this.state.newMsg}
                init={{
                    addMoreBtn:this.state.addMoreBtn,
                    data: this.state.list,
                    type: "list",
                    topicId:topicId,
                    cursor:this.state.cursor,
                    hotNum:this.state.hotNum,
                    total:this.state.total
                }}
                totalNum={this.totalNum.bind(this)}
            />;
        }
        if(this.state.hotNum > 0){
            hot = <CommentList
                init={{
                    data: this.state.hotList,
                    type: "hotList",
                    topicId:topicId,
                    hotNum:this.state.hotNum,
                    total:this.state.total
                }}
                totalNum={this.totalNum.bind(this)}
            />
        }

        return(
			<div className="new-comment">
				<div className="comment-title">
                    评论<span>（{this.state.total}条评论）</span>
                </div>
				<CommentInput
                    param={{
                        fetchUrl: "/v1/comment/post",
                        formData: {
                            topic_id: topicId,
                            content: ''
                        }
                    }}
					replyMsg={this.replyMsg.bind(this)}
				/>
                {hot}
                {list}
                {nodata}
                <div id="CommentDialog"></div>
			</div>
        )
    }
}

export default CommentContainer;