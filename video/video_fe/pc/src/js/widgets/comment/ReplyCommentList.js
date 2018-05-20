import React from 'react';
import ReactDom from 'react-dom';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import {apiParams} from 'util/phpCommon';
import fetch from 'io/fetch.js';
import { loginFlag, page} from 'util/phpCommon.js';
import {login} from 'common/commonLogin.js';
import toast from 'components/toast';
import CommentDialog from './CommentDialog';

class ReplyCommentList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:this.props.replyState.open,
            reply_count:this.props.reply_count,
            data: this.props.replyState.list,
            inputShow : {
                id:null,
                isOpen:false
            },
            cursor: this.props.replyState.replyCursor,
            loadState:this.props.replyState.replyLoadState,
            curPage : this.props.replyState.replyCurPage,
            addMoreBtn:this.props.replyState.replyAddMoreBtn
        };
        this.handleAddMore= this.handleAddMore.bind(this);
        this.USER = {
            userId:  $CONFIG.userId, //用户id，为0标识未登录
            nickName:  $CONFIG.nickName,
            avatar:  $CONFIG.avatar,
        };
        this.index = this.props.indexKey;
        this.COMMENID = this.props.comment_id;
        this.TOPICID = this.props.topic_id;
    }

    componentDidMount(){
        var replyState = this.props.replyState;
        this.setState({
           show:replyState.open,
           reply_count:this.props.reply_count,
           data: replyState.list,
           inputShow : {
               id:null,
               isOpen:false
           },
           cursor: replyState.replyCursor,
           loadState:replyState.replyLoadState,
           curPage : replyState.replyCurPage,
           addMoreBtn:replyState.replyAddMoreBtn
       });
    }

    fetchData(key){

            var that = this;
            var cursor =  that.state.cursor ;
            var apiParamskey = loginFlag ? apiParams.inParams : apiParams.outParams;
            fetch.get("/v1/reply/list"+"?"+apiParamskey, {
                domain: 'domain-user',
                data: {
                    comment_id: this.COMMENID,
                    page_size: 10,
                    cursor:cursor
                },
                success: (data)=>{
                    if(data.code == 200){

                        var list = data.data.list;
                        var curPage = that.state.curPage +1;
                        var totalPage = Math.ceil(parseInt(data.data.total)/10);
                        var array=that.state.data.concat(list);

                        var addMoreShow = list.length == 10 && curPage < totalPage ? true : false;
                        var loadState =  totalPage > 1 && curPage == totalPage ? "" : "load";

                        // that.setState({
                        //     data: array,
                        //     cursor: data.data.cursor,
                        //     addMoreBtn : addMoreShow,
                        //     curPage: curPage,
                        //     loadState: loadState,
                        //     show:true
                        // });
                        //
                        var param = {
                            data: list,
                            cursor: data.data.cursor,
                            addMoreBtn : addMoreShow,
                            curPage: curPage,
                            loadState: loadState,
                            show:true
                        }
                         that.props.changeReplyNum(that.index,param);
                         return ;
                    }
                    if(data.code==500003 && data.message == "原评论已被作者删除"){
                        that.props.commentDelete(that.COMMENID, that.index,that.props.type);
                        return ;
                    }

                    that.setState({
                        addMoreBtn:that.state.addMoreBtn,
                        loadState: "error"
                    });

                },
                error:(data)=>{
                    toast('网络异常，请稍后再试');
                    that.props.replyErrorDo(that.COMMENID,false,that.index,[]);
                }
            });
    }

    handleAddMore(){
        this.fetchData("add");
    }

    componentWillReceiveProps(nextProps){
        if(this.state.inputShow.id){
            ReactDom.render(<div></div>, document.getElementById(this.props.type+this.state.inputShow.id));
        }
        if(nextProps.replyState.open == true){
            this.setState({
                show:nextProps.replyState.open,
                reply_count:nextProps.reply_count,
                data: nextProps.replyState.list,
                inputShow : {
                    id:"",
                    isOpen: false
                },
                cursor: nextProps.replyState.replyCursor,
                loadState:nextProps.replyState.replyLoadState,
                curPage : nextProps.replyState.replyCurPage,
                addMoreBtn:nextProps.replyState.replyAddMoreBtn
            });
        }else{
            this.setState({
                show :false
            });
        }
    }

    itemHtml(){
        var data = this.state.data;
        if(data && data.length > 0){
            return data.map((value,index)=>{
                var open = this.state.inputShow;
                var replayOpen = value.reply_id == open.id && open.isOpen? true : false;
                value.index = index;
                var v = {
                    type: 1,
                    keyType:this.props.type,
                    replayOpen:replayOpen,
                    index:index,
                    reply_type: value.reply_type,
                    comment_id : value.reply_id , // 该条评论的id
                    content : value.content,  // 该条评论内容
                    create_time : value.create_time, // 该条评论的时间
                    has_praise : value.has_praise, // 是否点赞
                    has_report : value.has_report, // 是否举报
                    praise_count : value.praise_count, // 点赞数
                    reply_count : value.reply_count,  // 回复数
                    user : {
                        avatar : value.from_user.avatar , // 评论者 头像
                        nickname : value.from_user.nickname, // 评论者 昵称
                        user_id: value.from_user.user_id //  评论者ID
                    },
                    user_id :value.user_id,
                    fromUser:{
                        nickname : value.to_user.nickname,
                        user_id : value.to_user.user_id,
                        comment_id : value.to_user.to_reply_id
                    }
                }
                return (
                    <CommentItem
                        value={v}
                        key={index}
                        UserId={ this.USER.userId}
                        handleReply={this.handleReply.bind(this)}
                        handleDelete={this.handleDelete.bind(this)}
                        handleReport={this.handleReport.bind(this)}
                        handleLike={this.handleLike.bind(this)}
                    />
                );
            });
        }
    }

    handleReply(id,index,) {
        var lastShowId = this.state.inputShow.id;
        var onOff = null;
        var data = this.state.data[index];
        var InputDom =
            <CommentInput
                param={{
                    fetchUrl: "/v1/reply/add",
                    formData: {
                        topic_id: this.TOPICID,
                        content: '',
                        comment_id : this.COMMENID,
                        to_reply_id: data.reply_id,
                        to_user_id:data.from_user.user_id,
                        reply_type:1
                    },
                    to_user_nickname:data.from_user.nickname,
                    returnMsg:{
                        index:index,
                        id:id,
                        delete:""
                    }
                }}
                replyMsg={this.replyMsg.bind(this)}
                replyMsgError={this.replyMsgError.bind(this)}
            />;

        if(lastShowId != id ){
            ReactDom.render(
                InputDom,
                document.getElementById(this.props.type+id)
            );

            if(this.state.inputShow.id){
                ReactDom.render(<div></div>, document.getElementById(this.props.type+this.state.inputShow.id));
            }
            onOff = true;

        }else if(lastShowId == id ){

            if(this.state.inputShow.isOpen){
                ReactDom.render(<div></div>, document.getElementById(this.props.type+id));
                onOff = false;
            }else{
                ReactDom.render(
                    InputDom,
                    document.getElementById(this.props.type+id)
                );
                onOff = true;
            }
        }

        this.setState({
            inputShow : {
                id:id,
                isOpen : onOff
            }
        });

    }

    deleteOnOk(param){

        this.props.totalNum(this.index,"delete");
        if(this.state.inputShow.id == param.id ){
            ReactDom.render(<div></div>,document.getElementById(param.type+param.id));
        }
        this.state.data.splice(param.index,1);
        this.setState({
            data: this.state.data,
            inputShow:{
                id:null,
                isOpen:false

            }
        });
    }

    onOk(param){
        var that = this;
        if(!param.keyValue){
            fetch.get(param.url+"?"+apiParams.inParams, {
                domain: 'domain-user',
                data: param.data,
                success: (data)=>{
                    if(data.code == 200){
                        if(param.event == "has_report"){
                            that.state.data[param.index].has_report = 1;
                            that.setState({
                                data: that.state.data
                            });
                            toast("举报成功");
                            return ;
                        }
                        if(param.event == "deleteTopic"){
                            that.props.totalNum(that.index,"delete");

                            if(that.state.inputShow.id){
                                ReactDom.render(<div></div>,document.getElementById(param.type+that.state.inputShow.id));
                            }

                            that.state.data.splice(param.index,1);
                            that.setState({
                                data: that.state.data,
                                inputShow:{
                                    id:null,
                                    isOpen:false

                                }
                            });
                            toast("删除成功");
                            return ;
                        }
                        return ;
                    }else{
                        if(param.event == "deleteTopic"){
                            toast("系统异常，请稍后再试");
                            return ;
                        }
                        if (data.message =='原评论已被作者删除') {
                            that.props.commentDelete(that.COMMENID, that.index,that.props.type);
                            return ;
                        }
                        if (data.message =='原回复已被作者删除') {
                            ReactDom.render(
                                <CommentDialog
                                    onOk = {that.deleteOnOk.bind(that)}
                                    fetch={{
                                        type: param.data.type,
                                        keyValue:"delete",
                                        id:param.data.type_id,
                                        index:param.index
                                    }}
                                    param={{
                                        title: "原回复已被作者删除"
                                    }}
                                />,
                                document.getElementById("CommentDialog")
                            );
                            return ;
                        }

                        toast(data.message);

                    }
                },
                error:()=>{
                    toast('网络异常，请稍后再试');
                }
            });
        }
    }

    handleDelete(id,index,type){
        ReactDom.render(
            <CommentDialog
                onOk = {this.onOk.bind(this)}
                fetch={{
                    type:type,
                    keyValue:"",
                    event:"deleteTopic",
                    index: index,
                    url: "/v1/reply/delete",
                    data: {
                        reply_id: parseInt(id)
                    }
                }}
                param={{
                    title: "确定要删除该条评论吗"
                }}
            />,
            document.getElementById("CommentDialog")
        );
    }

    handleReport(id,index){

        if(!loginFlag){
            login();
        }else {
            var data = this.state.data[index];

            if (data.has_report == 1) {
                toast('您已举报过该评论');
            }else {
                ReactDom.render(
                    <CommentDialog
                        onOk={this.onOk.bind(this)}
                        fetch={{
                            event:"has_report",
                            index: index,
                            url: "/v1/report/add",
                            data: {
                                type: 1,
                                type_id: id
                            },
                            toUser:{
                                nickname : data.from_user.nickname,
                                user_id : data.from_user.user_id
                                //comment_id : data.user.to_reply_id
                            }
                        }}
                        param={{
                            title: "确定要举报该评论吗"
                        }}
                    />,
                    document.getElementById("CommentDialog")
                );

            }
        }
    }

    handleLike(id,index,type){
        var dataLike = this.state.data[index];
        if(!loginFlag) {
            if (dataLike.has_praise == 0) {
                dataLike.has_praise = 1;
                dataLike.praise_count = parseInt(dataLike.praise_count) + 1;
            } else {
                dataLike.has_praise = 0;
                dataLike.praise_count = parseInt(dataLike.praise_count) - 1;
            }
            this.setState(
                {data: this.state.data}
            )
        }else{
            var url = dataLike.has_praise == 0 ? "/v1/praise/add" : "/v1/praise/cancel";
            var that = this;
            fetch.post(url+"?"+apiParams.inParams, {
                domain: 'domain-user',
                data: {
                    topic_id: parseInt(this.TOPICID),
                    type : 1,
                    type_id: id
                },
                success:(data)=>{
                    if(data.code == 200){
                        if (dataLike.has_praise == 0) {
                            dataLike.has_praise = 1;
                            dataLike.praise_count = parseInt(dataLike.praise_count) + 1;
                        } else {
                            dataLike.has_praise = 0;
                            dataLike.praise_count = parseInt(dataLike.praise_count) - 1;
                        }
                        that.setState(
                            {data: that.state.data}
                        )
                        return;
                    }

                    if (data.message =='原评论已被作者删除') {
                        that.props.commentDelete(that.COMMENID, that.index,that.props.type);
                        return ;
                    }
                    if (data.message =='原回复已被作者删除') {
                        ReactDom.render(
                            <CommentDialog
                                onOk = {that.deleteOnOk.bind(that)}
                                fetch={{
                                    type: type,
                                    keyValue:"delete",
                                    id:id,
                                    index:index
                                }}
                                param={{
                                    title: "原回复已被作者删除"
                                }}
                            />,
                            document.getElementById("CommentDialog")
                        );
                        return ;
                    }

                    toast(data.message);
                },
                error:()=>{
                    toast("网络异常，请稍后再试");
                }

            });
        }
    }
    
    replyMsgError(data,returnMsg){

        if( data.message=="原评论已被作者删除"){
            this.props.commentDelete(this.COMMENID, this.index,this.props.type);
        }else{
            ReactDom.render(
                <CommentDialog
                    onOk = {this.deleteOnOk.bind(this)}
                    fetch={{
                        type: "list",
                        keyValue:"delete",
                        id:returnMsg.id,
                        index:returnMsg.index,
                        deleteType:deleteType
                    }}
                    param={{
                        title: data.message
                    }}
                />,
                document.getElementById("CommentDialog")
            );
        }

    }

    replyMsg(data,returnMsg){

            var newData = {
                reply_type: data.reply_type, //
                reply_id : data.reply_id , // 该条评论的id
                content : data.content,  // 该条评论内容
                create_time : data.create_time, // 该条评论的时间
                has_praise : 0, // 是否点赞
                has_report : 0, // 是否举报
                praise_count : 0, // 点赞数
                reply_count : 0,  // 回复数
                from_user : {
                    avatar : this.USER.avatar , // 评论者 头像
                    nickname : this.USER.nickName, // 评论者 昵称
                    user_id: this.USER.userId //  评论者ID
                },
                user_id :this.USER.userId,
                to_user:{
                    nickname : data.to_user_nickname,
                    user_id : data.to_user_id,
                    comment_id : data.to_reply_id
                }

            }
            this.state.data.unshift(newData);

            this.props.totalNum(this.index,"add");
            if(this.state.inputShow.id){
                ReactDom.render(<div></div>, document.getElementById(this.props.type+this.state.inputShow.id));
            }
            this.setState({
                data:this.state.data,
                inputShow : {
                    id:null,
                    isOpen:false
                }
            });
    }

    addMoreBtnHtml(){
        if(this.state.addMoreBtn){
            switch (this.state.loadState){
                case "load" : return<a onClick={this.handleAddMore} href="javascript:;" className="more">查看更多</a>;
                case "loading" : return<a href="javascript:;" className="more disabled"><em className="icon-49"></em>正在加载…</a>;
                case "error" : return<a onClick={this.handleAddMore} href="javascript:;" className="more">加载错误，点击重新加载</a>;
                default: break;
            }
        }
    }

    render(){

        var show = this.state.show;
        if(show){
            return(
                <div className="text-comment" >
                    <CommentInput
                        param={{
                            fetchUrl: "/v1/reply/add",
                            formData: this.props.formData,
                            to_user_nickname:"",
                            returnMsg:{
                                index:this.props.indexKey,
                                id:this.props.comment_id,
                                delete:""
                            }
                        }}

                        replyMsg={this.replyMsg.bind(this)}
                        replyMsgError={this.replyMsgError.bind(this)}
                    />
                    {this.itemHtml()}
                    {this.addMoreBtnHtml()}
                </div>
            );
        }else {
            return <div></div>;
        }
    }
}

export default ReplyCommentList;