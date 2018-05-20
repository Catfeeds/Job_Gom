var identify = require('utils/IdentifyIE8-');

//二级话题回复
var getCommentList = require('./getCommentList');
var $is_Login = 1;
var alert = require('module/popup/alert');
//var hint = require('module/hint.js');
//var commentList = require('./commentList.tpl');
var changeContent = require('./changeContent'); //评论内容转换
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var fetch = require('io/fetch');
var url = require('io/url');
var loginState = require('./loginState');
//var face = require('module/popup/face/face');
//var fromNow = require('utils/fromNow');
var secondComList = require('./secondComList.tpl');

// 敏感词过滤
var sensitiveContent = require('module/sensitiveContent');

//var $comment_Msg = $("[data-node=comment_Msg]");

var a_secondComBtn = function() {

    if (!checkLoginStatus()) {
        loginState.popUnion();
        return false;
    }

    var $this = $(this);
    if( $this.hasClass('submiting') ){
        return false;
    }
    var replayToPub = $this.parents().eq(2).attr("data-ispublish"); //
    var beReplyId = "";
    //var replayImid = "";

    if (replayToPub == "1") {
        replayToPub = false;
    } else {
        replayToPub = true;
        beReplyId = $this.parents().eq(2).attr("data-replycommentid");
        // var replayImid = "b_" + $this.parents().eq(2).attr("data-replyuserid");
    }
    //var replyUserName = $comment_Msg.attr("data-nickname");
    //var beReplyUserName = $this.parents().eq(2).attr("data-replayto");
    var tId = $this.attr("data-gettopicid");
    //var groupId = $("[data-htid=" + tId + "]").attr("data-groupid");

    //var topicType = $("[data-htid=" + tId + "]").attr("data-topictype");;
    var topicId = $("[data-htid='" + tId + "']").attr("data-tid");
    var content = $this.parents().eq(1).children("textarea").val();
    content = content.trim();
    // var contentLong = "";

    // if (content.length > 200) {
    //     contentLong = true;
    // } else {
    //     contentLong = false;
    // }
    //var imId = "b_" + $comment_Msg.attr("data-userid");
    // var id = $(this).parents().eq(2).attr("data-replycommentid");
    var replyId = tId;

    var params = {
        "topic_reply_id": replyId,
        "topicid": topicId,
        "content": content,
        "topic_subreply_id": beReplyId,
        "group_id": $_CONFIG.groupid
    }
    if (content) {
        if (sensitiveContent(content,true)) {
            return false;
        }
        $this.addClass('submiting');

        var $warp = $("[data-ddlist='" + tId + "']");
        var $dl = $warp.parents('dl').eq(0);
        var dlnum = parseInt($dl.attr('data-allNum'), 10) || 0;
        var $num = $warp.parents('[data-left]').eq(0).find('[data-node="topic-allNum"]');
        var num = parseInt($num.eq(0).text(), 10);
        fetch.post(url.get('secondtopicV2'), {
            data: params
        }).then(function(data) {
            if (data.success) {

                var contentT = data.data.content;
                contentT = changeContent(contentT);
                //判断是二级回复还是三级回复
                var beReplyUserName = "";
                var beReplyUserId = "";

                var SenUserId = checkUserId(data.data.user.id);
                var threeUserId = "javascript:;"

                if (replayToPub) { //三级
                    beReplyUserName = data.data.topicSubReplyUser.nickname;
                    beReplyUserId = data.data.topicSubReplyUser.id;
                    threeUserId = checkUserId(beReplyUserId);
                }
                var showCom = {
                    "SenUserId": SenUserId,
                    "threeUserId": threeUserId,
                    "topicType": 0,
                    "backTopicId": tId,
                    "parentCommentId": tId, //话题id
                    "topicId": data.data.topicId,
                    "replayToPub": replayToPub, //判断是二级回复还是三级回复
                    "content": contentT, //回复内容
                    "replyUserName": data.data.user.nickname, //回复人昵称
                    "replyUserId": data.data.user.id, //回复人id
                    "beReplyUserName": beReplyUserName, //被回复人的昵称
                    "beReplyUserId": beReplyUserId, //被回复人的id
                    "replyCommentId": data.data.id, // 二级回复内容id
                    "canDelete": true
                }

                var item = secondComList(showCom);
                $warp.find(".comments-box").removeClass("hide").append(item);
                $("[data-parentTopicIdBtn='" + tId + "']").css("display", "none");
                $("[data-parentTopicId='" + tId + "']").css("display", "none");
                $("[data-parentTopicId='" + tId + "']").removeAttr("data-replayto");
                $(".textarea-bx", "[data-parentTopicId='" + tId + "']").val("");
                
                dlnum++;
                $dl.attr('data-allNum', dlnum);
                num++;
                $num.text(num);
            } else {
                if (data.code === 500 || data.message === "请求参数为空") {
                    alert(data.message);
                } else {
                    // console.log(data.code);
                    if (data.code === 403) {
                        data.message = "抱歉，该回复审核不通过！";
                    }
                    
                    alert(data.message, {
                        ok: function() {
                            $("[data-node=circleCom]").empty();
                            getCommentList({
                                id: topicId,
                                currPage: 1,
                                pageSize: 10,
                                listSize: 2,
                                reGet: true
                            });
                        }
                    });
                }

            }
            $this.removeClass('submiting');
        },function(){
            $this.removeClass('submiting');
        });
    } else {
        alert("请输入评论内容！");
    }
};

//点击回复按钮，显示二级输入框
var secondCom_Key = function() {
    if (!checkLoginStatus()) {
        loginState.popUnion();
        return false;
    }
    var $this = $(this);
    var replyuserid = $this.attr("data-replyuserid");
    //var replyimId = $this.attr("data-imId");

    var replycommentid = $this.attr("data-replycommentid");
    var topicid = $this.attr("data-comid");
    var username = $this.attr("data-replayUser");
    var dataPublis = $this.attr("data-publish");
    var isHide = $("[data-parenttopicid='" + topicid + "']").css("display");

    var dataObj = $("[data-parentTopicId='" + topicid + "']");
    dataObj.removeAttr("data-replyuserid");
    //dataObj.removeAttr("data-imId");
    dataObj.removeAttr("data-replayTo");
    dataObj.removeAttr("data-replycommentid");
    dataObj.removeAttr("data-isPublish");
    //dataObj.attr("data-imId",replyimId);
    dataObj.attr("data-replyuserid", replyuserid);
    dataObj.attr("data-replayTo", username);
    dataObj.attr("data-isPublish", dataPublis);
    dataObj.attr("data-replycommentid", replycommentid);

    dataObj.children(".topic-publish-content").children("textarea").attr("placeholder", "回复: " + username);
    if (identify()) {
        dataObj.children(".topic-publish-content").children("label").html("回复: " + username);
    }
    if (isHide == "none") {
        $(".secondText").css("display", "none");
        $(".pack-up").css("display", "none");
        $this.parents('dl').eq(0).next().show();
        dataObj.css("display", "block");
        $("[data-parentTopicIdBtn='" + topicid + "']").css("display", "block");

        var a = $(window).scrollTop() + $(window).height();
        var b = dataObj.offset().top;
        if (a + 60 < b) {

            $('html,body').animate({
                'scrollTop': dataObj.offset().top - $(window).height() + 185
            }, 200);
        }

        dataObj.children(".topic-publish-content").children("textarea").focus();
        dataObj.find('[data-node="a_secondComBtn"]').attr('data-allNum', $this.attr('data-allNum'));
        if (identify()) {
            dataObj.children(".topic-publish-content").children("label").removeClass('hide');
        }

    }
}

//隐藏二级输入框
var hideComBox = function() {
    if (!checkLoginStatus()) {
        loginState.popUnion();
        return false;
    }
    var hideId = $(this).attr("data-parentTopicIdBtn");
    $("[data-parentTopicId='" + hideId + "']").css("display", "none");
    $("[data-parentTopicId='" + hideId + "']").children("textarea").attr("placeholder", "说点什么吧");
    $("[data-parentTopicIdBtn='" + hideId + "']").css("display", "none");
    $("[data-parentTopicId='" + hideId + "']").removeAttr("data-isPublish").removeAttr("data-replayTo");
    $(".textarea-bx", "[data-parentTopicId='" + hideId + "']").val("");
}

function checkUserId(id) {
    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
        return $_CONFIG.i_domain + 'member/profileHome';
    } else {
        return $_CONFIG.group_domain + 'ta/' + id + '.html';
    }
}
module.exports = {
    a_secondComBtn: a_secondComBtn,
    secondCom_Key: secondCom_Key,
    hideComBox: hideComBox
};
