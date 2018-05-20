var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint.js');
var confirm = require('module/popup/confirm');
var changeContent = require('./comment/changeContent'); //评论内容转换
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var secondComList = require('./comment/secondComList.tpl');
var is_Login = Number(checkLoginStatus()); // 判断登陆状态
module.exports = {
    affirm: function(data){
        var _this = this;
        fetch.post( data.url, {
            data: {
                group_id: data.groupId,
                topic_id: data.topicId,
                del_id: data.id
            }
        }).then(function(result) {
            if(result && result.success && result.code === 200){
                if( data.type ){
                    _this.EditDiscussNumber(data, 1);
                    data.node.parents('[data-htid]').eq(0).hide().attr('data-hide','1');
                    _this.deleteSecondBack(data);
                }else{
                    var $dl = data.node.parents('dl').eq(0);
                    _this.deleteFristBack(data);
                    _this.EditDiscussNumber(data, (parseInt($dl.attr('data-allnum'), 10) || 0) +1);
                    $dl.hide();
                    if( $dl.next()[0].nodeName !== 'DL'){
                        $dl.next().hide();
                    }
                }
                
            }else{
                hint.init(result.message);
            }
        },function(result){
            hint.init(result.message);
        });
    },
    deleteFristBack: function(data){

    },
    deleteSecondBack: function(data){
        var _this = this;
        //修改删除按钮上二级评论数量
        var $dl = data.node.parents('dl').eq(0);
        var num = parseInt($dl.attr('data-allNum'), 10) || 0;
        var isListHide = $dl.attr('data-showList') !== '1';
        num--;
        $dl.attr('data-allNum', num);
        

        //如果没有全部展示，则补全
        if( $dl.find("[data-hide='0']").length !== num){
            //补全两条二级回复
            _this.getMoreSecondDiscuss($dl.attr('data-commId'), $dl);
        }
        if( num === 2){
            $dl.next().children('a').hide();
        }
        if( num === 0 ){
            $dl.find('.comments-box ').hide();
            if( $dl.next()[0].nodeName !== 'DL'){
                $dl.next().hide().children().hide();
            }
        }
    },
    checkUser: function(replyItem){
        var userId =  $_CONFIG['userId'];
        return  is_Login == 1 && ( userId == replyItem.creatorId ||userId == replyItem.groupCreatorId ||userId == replyItem.topicCreatorId );
    },
    checkUserId: function(id) {
        if (is_Login == 1 && $_CONFIG['userId'] == id) {
            return $_CONFIG.i_domain + 'member/profileHome';
        } else {
            return $_CONFIG.group_domain + 'ta/' + id + '.html';
        }
    },
    getMoreSecondDiscuss: function(commentid, list){
        var _this = this;
        var paramList = '?page=1&pagesize=70&topic_replyid=' + commentid;
        fetch.get(url.get('getRelyListV2') + paramList).then(function(data) {
            var replyCommentList = data.data.topicSubReplys;
            
            var appendHtml = '';
            $("[data-ddlist='" + commentid + "']").find(".comments-box").empty();
            for (var i = 0, len = (replyCommentList.length > 2 ? 2 : replyCommentList.length); i < len; i++) {
                var replyaList = replyCommentList[i];
                var content = replyaList.content;
                content = changeContent(content);
                var beReplyUserName = "";
                var beReplyUserId = "";
                var replayToPub = false;
                // console.log(replyaList);
                var SenUserId = _this.checkUserId(replyaList.user.id);
                var threeUserId = "javascript:;";

                if (replyaList.topicSubReplyUser) {
                    beReplyUserName = replyaList.topicSubReplyUser.nickname;
                    beReplyUserId = replyaList.topicSubReplyUser.id;
                    replayToPub = true;
                    threeUserId = _this.checkUserId(beReplyUserId);
                }
                var showCom = {
                    "SenUserId": SenUserId,
                    "threeUserId": threeUserId,
                    "topicType": 0,
                    "backTopicId": commentid,
                    "parentCommentId": commentid, //话题id
                    "topicId": replyaList.topicId,
                    "replayToPub": replayToPub, //判断是二级回复还是三级回复
                    "content": content, //回复内容
                    "replyUserName": replyaList.user.nickname, //回复人昵称
                    "replyUserId": replyaList.user.id, //回复人id
                    "beReplyUserName": beReplyUserName, //被回复人的昵称
                    "beReplyUserId": beReplyUserId, //被回复人的id
                    "replyCommentId": replyaList.id, // 二级回复内容id
                    "canDelete": _this.checkUser(replyaList)
                }
                var item = secondComList(showCom);
                appendHtml += item;
            }
            $("[data-ddlist='" + commentid + "']").find(".comments-box").append(appendHtml);

            appendHtml = '';
          
        });
    },
    EditDiscussNumber: function(data, n){
        var $num = data.node.parents('[data-left]').eq(0).find('[data-node="topic-allNum"]');
        var num = parseInt($num.eq(0).text(), 10);
        $num.text(num-n);
    },
    deletAlert: function(data) {
        var _this = this;
        //var id = $($this.parents().eq(2)).attr('data-left');
        confirm('', {
            content: "<p class='del-pop-p'>确定要删除该评论吗？</p>",
            title: '提示',
            okCls: 'two-button two-button-red',
            cancelCls: 'two-button',
            ok: function(){
                _this.affirm(data);
            },
            btnWrapCls: 'text-center'
        });
    },
    deleteDiscuss: function(){
        var _this = this;
        $('body').on('click', '[data-action="del-discuss"]', function(){
            var $this = $(this);
            var type = $this.attr('data-type') === 'second';
            var link = type ? url.get('deleteSecondDiscuss') : url.get('deleteDiscuss');
            _this.deletAlert({
                url: link,
                groupId: $_CONFIG['groupid'],
                topicId: $this.attr("data-topicId"),
                id: $this.attr("data-delId"),
                node: $this,
                type: type
            });
        });
    },
    init: function(){
        this.deleteDiscuss();
    }
}