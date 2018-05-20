import React from 'react';
import adaptationEmojis from "./adaptationEmojis";
import fromNow from "util/fromNow";
import ReplyCommentList from "./ReplyCommentList";
import formatNumber from "util/formatNumber";
class CommentItem extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            replayOpen:false,
            tagShow:"hide",
            replyShow:"hide",
            id:this.props.value.comment_id
        }
        this.hideId=null;
    }

    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){

        if(nextProps.value.type==1 ){
            this.setState({
                replayOpen: nextProps.value.replayOpen
            });
        }else{
            this.setState({
                replayOpen: nextProps.value.replyState.open
            });
        }
    }

    handleReply(id,index,keyType){
        this.props.handleReply(id,index,keyType);
    }

    // 删除
    handleDelete(id,index,type){
        this.props.handleDelete(id,index,type);
    }

    // 举报
    handleReport(id,index,type){
        this.props.handleReport(id,index,type);
    }

    // 点赞
    handleLike(id,index,type){
        this.props.handleLike(id,index,type);
    }

    render(){

        var value = this.props.value;
        var curUserId = this.props.UserId;
        if(curUserId == value.user.user_id){
            var button = <p  id={"target"+value.comment_id} className={"hover "} onClick={()=>{this.handleDelete(value.comment_id,value.index,value.keyType)}}>
                        <em className="icon-52"></em><span>删除</span>
                     </p>;
        }else{
            var button = <p id={"target"+value.comment_id} className={"hover "} onClick={()=>{this.handleReport(value.comment_id,value.index,value.keyType)}}>
                        <em className="icon-51"></em><span>{value.has_report==1 ?"已举报":"举报"}</span>
                     </p>;
        }
        var replyList = "";

        if(value.type == 0){

            replyList =  <ReplyCommentList
                            key={value.comment_id}
                            indexKey={value.index}
                            comment_id={value.comment_id}
                            topic_id={value.topicId}
                            userId= {value.curUserId}
                            reply_count={value.reply_count}
                            type={value.keyType}
                            formData={{
                                topic_id: value.topicId,
                                content: '',
                                comment_id : value.comment_id,
                                to_reply_id:0,
                                to_user_id:value.user.user_id,
                                reply_type:0
                            }}
                            replyState={value.replyState}
                            totalNum={this.props.totalNum.bind(this)}
                            commentDelete={this.props.commentDelete.bind(this)}
                            changeReplyNum={this.props.changeReplyNum.bind(this)}
                            replyErrorDo={this.props.replyErrorDo.bind(this)}
                        />;


        }

        return(
            <div className="list-item">
                <div className="list-img">
                    <img src={value.user.avatar}/>
                </div>
                <div className="list-text" >
                    <div className="text-hover">
                        <div className="text-name">
                            <span>{value.user.nickname}</span>
                            <span className="gray">{fromNow(value.create_time,'yy-MM-dd hh:mm:ss')}</span>
                        </div>
                        <div className="text-con">
                            <span className="blue">{value.reply_type==1 ? "回复"+value.fromUser.nickname +": " : null}</span>
                            <span dangerouslySetInnerHTML={{__html :adaptationEmojis(value.content)}}></span>
                        </div>
                        <div className="text-edit">
                            <p onClick={()=>{this.handleLike(value.comment_id,value.index,value.keyType)}}>
                                <em className={value.has_praise==1 ? "icon-15" : "icon-14"}></em>
                                <span >{"("+formatNumber(value.praise_count)+")"}</span>
                            </p>
                            <p data-id={value.comment_id} onClick={()=>{this.handleReply(value.comment_id,value.index,value.keyType)}}>
                                <em className="icon-50"></em>
                                <span>{this.state.replayOpen ? "收起回复" :"回复"}{value.type == 0 ? "("+value.reply_count+")":null }</span>
                            </p>
                            {button}
                        </div>
                    </div>
                    <div className="" id={value.keyType+value.comment_id}>
                        {replyList}
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentItem;