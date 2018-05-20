//二级列表
var fetch = require('io/fetch');
var url = require('io/url');
var changeContent = require('./changeContent'); //评论内容转换
var secondComList = require('./secondComList.tpl');
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断

var  $is_Login = checkLoginStatus() == true ? 1 : 0; // 判断登陆状态


var showMoreList = function() {


    //var groupId = $(this).attr("data-groupId");
    //var imId = $(this).attr("data-imId");
    //var topicType = $(this).attr("data-topicType");
    var commentid = $(this).attr("data-htid");
    //var tid = $(this).attr("data-tid");
    //var tootalPages = $(this).attr("data-tootlePages"); //
    //var currentPage = $(this).attr("data-currentPage"); //当前页数
    //var pageSize = $(this).attr("data-pageSize"); //当前展示列表数
    //var a = Math.ceil(parseInt(tootalPages) / parseInt(pageSize)); //获取总页数
   // var b = parseInt(tootalPages) % parseInt(pageSize); //获取最后一页的列表数目
    //var toPage = parseInt(currentPage) + 1;
    var obj = $(this);
    var paramList = '?page=1&pagesize=70&topic_replyid=' + commentid;
    var objHtml = obj.html();
   
    if (objHtml === "查看回复...") {
        getRelyList(paramList, obj);
    } else {
        //
        var childrens = $("[data-ddlist=" + commentid + "]").find(".comments-s");
        //console.log(childrens);
        for (var k = 2; k < childrens.length; k++) {
            childrens.eq(k).remove();
        }
        obj.html("查看回复...");
    }


    function getRelyList(paramList, obj) {
        fetch.get(url.get('getRelyListV2') + paramList).then(function(data) {
            //console.log(data);

            var replyCommentList = data.data.topicSubReplys;
            if (replyCommentList.length > 2) {

                $("[data-ddlist=" + commentid + "]").find(".comments-box").empty();
                for (var i = 0; i < replyCommentList.length; i++) {

                    var replyaList = replyCommentList[i];
                    var content = replyaList.content;
                    content = changeContent(content);
                    var beReplyUserName = "";
                    var beReplyUserId = "";
                    var replayToPub = false;
                   // console.log(replyaList);
                    var SenUserId =  checkUserId(replyaList.user.id);
                    var threeUserId = "javascript:;";

                    if (replyaList.topicSubReplyUser) {
                        beReplyUserName = replyaList.topicSubReplyUser.nickname;
                        beReplyUserId = replyaList.topicSubReplyUser.id;
                        replayToPub = true;
                        threeUserId =  checkUserId(beReplyUserId);
                    }
                    var showCom = {
                         "SenUserId" : SenUserId,
                         "threeUserId" :threeUserId,
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
                        "replyCommentId": replyaList.id // 二级回复内容id 
                    }
                    var item = secondComList(showCom);
                    //console.log(showCom);
                    $("[data-ddlist=" + commentid + "]").find(".comments-box").append(item);
                    // if ($is_Login == "0") {
                    //     $("[data-node=secondCom_Key]").css("display", "none");
                    // }
                    obj.html("收起");
                    //obj.css("display", "none");

                }
            } else {
                obj.addClass("hide");
                $("[data-ddlist=" + commentid + "]").parent().addClass("bd-bottom");
            }
        });
    }
}

function checkUserId(id){
    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
        return $_CONFIG.i_domain+'index';
    } else {
        return $_CONFIG.group_domain + 'ta/' + id + '.html';
    }
}
module.exports = showMoreList;