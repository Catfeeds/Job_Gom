import React from 'react';
import ReactDom from 'react-dom';
import CommentItem from "./CommentItem.js";
//import ReplyCommentList from "./ReplyCommentList";
import CommentDialog from './CommentDialog';
import fetch from 'io/fetch.js';
import {apiParams} from 'util/phpCommon';
import { loginFlag, page} from 'util/phpCommon.js';
import {login} from 'common/commonLogin.js';
import toast from 'components/toast';

class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.init.data,
            curPage : 0,
            addMoreBtn:this.props.init.addMoreBtn,
            newMsg:{},
            loadState:"load",
            cursor:this.props.init.cursor,
            replayOpen:{
                id:null,
                isOpen: false
            }
        };
        this.handleAddMore= this.handleAddMore.bind(this);
        this.curUserId = $CONFIG.userId;
        this.topicId = this.props.init.topicId;
    }

    componentDidMount(){
        var newMsg = this.props.newMsg;
        if(this.props.init.type=="list" && Object.keys(newMsg).length!=0 ){
            this.state.data.push(newMsg);
            this.setState({
                data:this.state.data
            });
        }else{
            var propsData= this.props.init.data;
            for(var i = 0;i<propsData.length; i++){
                var data = propsData[i];
                data.replyState ={
                    open: false,
                    list:[],
                    isFetched:false,
                    replyCursor:"",
                    replyCurPage:0,
                    replyAddMoreBtn:false,
                    replyLoadState:"load"
                }
            }
            this.setState({
                data:propsData
            });
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.init.type=="list" && Object.keys(nextProps.newMsg).length!=0 ){
                var curData = this.state.data;
                curData.unshift(nextProps.newMsg);
                this.setState({
                    data:curData
                });
        }
    }

    fetchData() {
        var that = this;
        var apiParamskey =  loginFlag ?apiParams.inParams : apiParams.outParams;
            fetch.get("/v1/comment/list"+"?"+apiParamskey, {
                domain: 'domain-user',
                data: {
                    topic_id: this.props.init.topicId,
                    page_num: 10,
                    cursor:that.state.cursor
                },
                success:(data)=>{
                    if(data.code == 200){
                        var list = data.data.list;
                        for(var i = 0; i< list.length; i++){
                            list[i].replyState ={
                                open: false,
                                list:[],
                                isFetched:false,
                                replyCursor:"",
                                replyCurPage:0,
                                replyAddMoreBtn:false,
                                replyLoadState:"load"
                            }
                        }
                        var addMoreShow = false;
                        var curPage = that.state.curPage +1;
                        var loadState = "";
                        var total = Math.ceil(parseInt(data.data.total)/10);
                        if(list.length == 10 && curPage < total ){
                            addMoreShow = true;
                        }
                        if(total > 1 && curPage == total){
                            loadState = "noData";
                        }else{
                            loadState="load"
                        }

                        that.setState({
                            data: that.state.data.concat(list),
                            cursor: data.data.cursor,
                            addMoreBtn : addMoreShow,
                            curPage: curPage,
                            loadState: loadState,
                        });
                    }else{
                        that.setState({
                            addMoreBtn:that.state.addMoreBtn,
                            loadState: "error"
                        });
                    }
                },
                error:()=>{
                    that.setState({
                        addMoreBtn:that.state.addMoreBtn,
                        loadState: "error"
                    });
                }
            });

    }

    itemHtml(){
        var data = this.state.data;
        if(data.length > 0){
            return data.map((value,index)=>{
                var v = {
                    type:0,// 评论列表
                    keyType:this.props.init.type,
                    index:index,
                    reply_type:0,
                    topicId:this.topicId,
                    curUserId:this.curUserId,
                    replyState:{
                        open :value.replyState !=undefined ? value.replyState.open : false,
                        list :value.replyState ==undefined? []: value.replyState.list,
                        isFetched :value.replyState==undefined ? false: value.replyState.isFetched,
                        replyCursor: value.replyState==undefined ? "": value.replyState.replyCursor,
                        replyCurPage:value.replyState==undefined ? 0: value.replyState.replyCurPage,
                        replyAddMoreBtn:value.replyState==undefined ? false: value.replyState.replyAddMoreBtn,
                        replyLoadState:value.replyState==undefined ? "load": value.replyState.replyLoadState
                    },
                    comment_id : value.comment_id , // 该条评论的id
                    content : value.content,  // 该条评论内容
                    create_time : value.create_time, // 该条评论的时间
                    has_praise : value.has_praise, // 是否点赞
                    has_report : value.has_report, // 是否举报
                    praise_count : value.praise_count, // 点赞数
                    reply_count : value.reply_count,  // 回复数
                    user: {
                        avatar : value.user.avatar , // 评论者 头像
                        nickname : value.user.nickname, // 评论者 昵称
                        user_id: value.user.user_id //  评论者ID
                     },
                    user_id :value.user_id,
                    fromUser:{
                        nickname:"",
                        user_id:"",
                        comment_id:""
                    }
                }
                return (
                    <CommentItem
                        value={v}
                        key={index}
                        UserId={this.curUserId}
                        handleReply={this.handleReply.bind(this)}
                        handleDelete={this.handleDelete.bind(this)}
                        handleReport={this.handleReport.bind(this)}
                        handleLike={this.handleLike.bind(this)}

                        totalNum={this.totalNum.bind(this)}
                        commentDelete={this.commentDelete.bind(this)}
                        changeReplyNum={this.changeReplyNum.bind(this)}
                        replyErrorDo={this.replyErrorDo.bind(this)}
                    />
                );
            });
        }
    }

    handleAddMore(){
        this.setState({
            loadState : "loading"
        });
        this.fetchData();
    }

    totalNum(index,state){
        var data = this.state.data[index];
        data.reply_count = state=="add" ? parseInt(data.reply_count) + 1 : parseInt(data.reply_count) -1;
        this.setState({
            data:this.state.data
        });

    }

    commentDelete(id,index,type){
        ReactDom.render(
            <CommentDialog
                onOk = {this.deleteOnOk.bind(this)}
                fetch={{
                    type: type,
                    keyValue:"delete",
                    id:id,
                    index:index
                }}
                param={{
                    title: "原评论已被作者删除"
                }}
            />,
            document.getElementById("CommentDialog")
        );
    }

    changeReplyNum(index,param){
        var data = this.state.data[index].replyState;
        data.open=true;
        data.list=data.list.concat(param.data),
        data.isFetched=true,
        data.replyCursor=param.cursor,
        data.replyCurPage=param.curPage,
        data.replyAddMoreBtn=param.addMoreBtn,
        data.replyLoadState=param.loadState

        this.setState({
            data:this.state.data
        });
    }

    replyErrorDo(id,isopen,index,list){

        // this.state.data[index].open = isopen;
        // this.state.data[index].list = list;
        // this.setState({
        //     data: this.state.data
        // });

    }


    replyFetch(key,id,index){
        var that = this;
        var cursor = key == "add" ? that.state.replyCursor : "" ;
        var apiParamskey = loginFlag ? apiParams.inParams : apiParams.outParams;
        fetch.get("/v1/reply/list"+"?"+apiParamskey, {
            domain: 'domain-user',
            data: {
                comment_id:id,
                page_size: 10,
                cursor:cursor
            },
            success: (data)=>{
                var replyItem = that.state.data[index];
                if(data.code == 200){
                    var list = data.data.list;
                    var totalPage = Math.ceil(parseInt(data.data.total)/10);
                    var curPage = replyItem.replyCurPage;
                    replyItem.replyState={
                        open: true,
                        list: key == "add" ? replyItem.replyState.list.concat(list) : list,
                        isFetched:true,
                        replyCursor:data.data.cursor,
                       // replyCurPage: key !="add" ? 1 : replyItem.replyState.replyCurPage +1,
                        replyCurPage: 1,
                        replyAddMoreBtn:list.length == 10 && 1 < totalPage ? true : false,
                        replyLoadState:totalPage > 1 && curPage == totalPage ? "noData" : "load"
                    };
                    replyItem.reply_count = data.data.total;
                    that.setState({
                       data: that.state.data
                    });
                    return ;
                }
                if(data.code==500003 && data.message == "原评论已被作者删除"){
                    that.commentDelete(id,index,that.props.init.type);
                }else {
                    toast(data.message);
                }
            },
            error:(data)=>{
                toast('网络异常，请稍后再试');
            }
        });
    }


    handleReply(id,index,keyType){
        var data = this.state.data[index].replyState;
        // 计算高度
        var documentScrollTop = getScrollTop(); // 滚动条的高度
        var itemHeight =pageY(document.getElementById(keyType+id));// 元素在页面中的位置
        var windowHeight = document.documentElement.clientHeight; // 浏览器窗口的高度
        var bodyHeight = document.body.offsetHeight; // 页面可视区域的高度
        var h = parseInt(documentScrollTop) + parseInt(windowHeight)-parseInt(itemHeight);
        if(!data.open && !data.isFetched){
            this.replyFetch("",id,index);
            if(h <160){
                var s = 0
                var time =setInterval(function(){
                    s+=20;
                    if(document.documentElement&&document.documentElement.scrollTop){
                        document.documentElement.scrollTop= documentScrollTop+s;
                    }else if(document.body){
                        document.body.scrollTop=documentScrollTop+s;
                    }
                },30);

                setTimeout(function(){
                    clearInterval(time);
                },160);

            }
        }else if(!data.open && data.isFetched){
            data.open = true;
        }else {
            data.open=false;
            data.list=[],
            data.isFetched=false,
            data.replyCursor="",
            data.replyCurPage=0,
            data.replyAddMoreBtn=false,
            data.replyLoadState="load"

            this.setState({
                data: this.state.data
            });
        }
    }

    deleteOnOk(param){
        if(param.type =="list"){
            this.state.data.splice(param.index,1);
            this.props.totalNum(param.type,"delete",param.index);
            this.setState({
                data: this.state.data
            });
            return ;
        }
        this.props.totalNum(param.type,"delete",param.index);

    }
    onOk(param){

        var that = this;
        if(!param.keyValue){
            fetch.get(param.url+"?"+apiParams.inParams, {
                domain: 'domain-user',
                data: param.data,
                success:(data)=>{
                    if(data.code == 200){
                        if(param.event == "has_report"){
                            that.state.data[param.index].has_report = 1;
                            that.setState({
                                data: that.state.data
                            })
                            toast("举报成功");
                        }else if(param.event == "deleteTopic"){
                            that.props.totalNum(param.type,"delete",param.index);
                            if(param.type=="list"){
                                that.state.data.splice(param.index,1);
                                that.setState({
                                    data: that.state.data
                                });
                            }
                            toast("删除成功");
                        }
                    }else{

                        if(param.event == "deleteTopic"){
                            toast("删除失败");
                        }else{

                            if (data.message =="原评论已被作者删除") {
                                ReactDom.render(
                                    <CommentDialog
                                        onOk = {that.deleteOnOk.bind(that)}
                                        fetch={{
                                            type: that.props.init.type,
                                            keyValue:"delete",
                                            id:param.data.comment_id,
                                            index:param.index
                                        }}
                                        param={{
                                            title: "原评论已被作者删除"
                                        }}
                                    />,
                                    document.getElementById("CommentDialog")
                                );

                               return ;
                            }
                            toast("举报失败");
                        }
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
                    event:"deleteTopic",
                    index: index,
                    url: "/v1/comment/delete",
                    keyValue:"",
                    data: {
                        comment_id: parseInt(id)
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
                                type: 0,
                                type_id: data.comment_id
                            },
                            toUser:{
                                nickname : data.user.nickname,
                                user_id : data.user.user_id
                            },
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
                    topic_id: parseInt(this.props.init.topicId),
                    type : 0,
                    type_id: dataLike.comment_id
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
                    }else{
                        let delTypes = ['原评论已被作者删除','原回复已被作者删除'];
                        if (delTypes.indexOf(data.message) != -1) {
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
                                        title: "原评论已被作者删除"
                                    }}
                                />,
                                document.getElementById("CommentDialog")
                            );
                            return ;
                        }
                        toast("点赞失败");
                    }
                },
                error:()=>{
                    toast('网络异常，请稍后再试');
                }
            });
        }
    }

    addMoreBtnHtml(){
        if(this.props.init.type == "list" && this.state.addMoreBtn){
            switch (this.state.loadState){
                case "load" : return<a onClick={this.handleAddMore} href="javascript:;" className="more">查看更多</a>;
                case "loading" : return<a href="javascript:;" className="more disabled"><em className="icon-49"></em>正在加载…</a>;
                case "error" : return<a onClick={this.handleAddMore} href="javascript:;" className="more">加载错误，点击重新加载</a>;
                default: break;
            }
        }else if(this.props.init.type == "list" && !this.state.addMoreBtn && this.state.curPage>0){
            return<a href="javascript:;" className="more disabled">没有更多了</a>
        }
    }

    render(){
        return(
            <div className="comment-list">
                <div className="hot-title">{this.props.init.type=="hotList"?"热门评论":"最新评论"}</div>
                {this.itemHtml()}
                {this.addMoreBtnHtml()}
            </div>
        );
    }


}

export default CommentList;


function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

function pageY(elem) {
    return elem.offsetParent?(elem.offsetTop+pageY(elem.offsetParent)):elem.offsetTop;
}