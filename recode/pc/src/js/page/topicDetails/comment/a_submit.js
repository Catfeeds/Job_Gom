/*
	一级评论
*/
var $is_Login = 1;
var alert = require('module/popup/alert');
var hint = require('module/hint.js');
//var fixedTopic = require('../fixedTopic');
var commentList = require('./commentList.tpl');
var changeContent = require('./changeContent'); //评论内容转换
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var fetch = require('io/fetch');
var url = require('io/url');
var loginState = require('./loginState');
var face = require('module/popup/face/face');
var fromNow = require('utils/fromNow');
//var addImg = require('./addImgGoods/addIMG');
var addImageTpl = require('./addImageTpl.tpl');

// 敏感词过滤
var sensitiveContent = require('module/sensitiveContent');

var $comment_Msg = $("[data-node='comment_Msg']");
var $userIsExpert = $_CONFIG['isExpert'];
//var $circleCom = $("[data-node=circleCom]");

var $mall_domain = $_CONFIG["product_item_gome"]; // 商城

var a_Submit = function() {

    // 判断是否登陆，没登录，显示登录框
    if (!checkLoginStatus()) {
        loginState.popUnion();
        return false;
    }

    var currUserImg = $comment_Msg.attr("data-headface"); //头像
    var parentDiv = $(this).parents().eq(1);
    var comment_Msg = parentDiv.children("textarea").val();
    comment_Msg = comment_Msg.trim(); //对输入空格进行过滤
    if (comment_Msg) {
        if (sensitiveContent(comment_Msg,true)) {
            return false;
        }
    }

    //var data_userid = parentDiv.attr("data-userid");
    var topicid = parentDiv.attr("data-tid");

    //var imgPics = parentDiv.find("[data-node=imgUl]").attr("data-imgsrt");
    var lis = parentDiv.find("[data-node='imgUl']").children("li");
    var imgPics = [];

    for (var i = 0; i < lis.length; i++) {
        //console.log(lis[i]);
        var imgObj = $(lis[i]).find("img").attr("src");
        if (imgObj) {
            imgPics.push(imgObj);
        }
    }

    var $addImgGoods = parentDiv.find("[data-node='addImgGoods']");

    //var shopid = $("[data-node=goodsDiv]").attr("data-shopId");

    if (comment_Msg || imgPics.length || $addImgGoods.hasClass("hasGoods")) {
        //var imId = "b_" + data_userid;
        //var businessid = 0;
        var topicType = null;
        var shopId = "";
        var itemid = "";
        var skuId = "";
        if ($addImgGoods.hasClass("hasGoods")) {
            var $goodIn = $addImgGoods.find("[data-node='goodsIn']");
            shopId = $goodIn.attr("data-shopId");
            itemid = $goodIn.attr("data-itemId");
            skuId = $goodIn.attr("data-skuId");
            topicType = 1;
        } else {
            topicType = 0;
        }
        var params = {
            "reply_type": topicType, //回复的类型
            "topicid": topicid, //话题id
            "content": comment_Msg, //话题回复内容
            "pics": imgPics, //话题回复图片
            "shopid": shopId, //如果topicType = 1 或者 =2 那么这个字段必填
            "itemid": itemid //如果topicType = 1 那么这个字段必填
        }
        if(skuId){
            params.skuid = skuId;
        }

        //提交请求
        fetch.post(url.get('commentFirstV2'), {
            data: params
        }).then(function(data) {
            if (data.success) {
                var Msg = data.data;
                var contentMsg = Msg.content;
                contentMsg = changeContent(contentMsg);
                parentDiv.children("textarea").val("");

                var imageStr = null;

                if (Msg.pics.length > 0) {
                    var imgsrcPic = {
                        "picsSrc": Msg.pics,
                        "picture": Msg.pictures,
                        "length": Msg.pics.length
                    }
                    imageStr = addImageTpl(imgsrcPic);
                    //console.log(Msg.pics);
                }
                var mall_domain = "",
                    itemsPic = "",
                    itemShopName = "",
                    itemPrice = "",
                    shopId = "",
                    itemShopId = "",
                    skuId = "";
                    //rebate= "";
                if (Msg.item) {
                    // var goodStr = $("[data-node=addImgGoods]").attr("data-goodStr");
                    var goodObj = Msg.item;
                    mall_domain = $mall_domain;
                    itemsPic = goodObj.mainImage;
                    itemShopName = goodObj.name;
                    itemPrice = goodObj.salePrice !== null ? goodObj.salePrice : '暂无售价';
                    shopId = goodObj.id;
                    itemShopId = Msg.id;
                    skuId = Msg.skuId ? "-" + Msg.skuId : "";
                    //rebate = goodObj.rebateSummary.mostRebate;
                }

                //time = timeString(Msg.createTime);
                var UserId = checkUserId(data.data.user.id);
                var showReport = ($is_Login == 1) && ($_CONFIG['userId'] != data.data.user.id) ? true : false;
                var basics = {
                    "showSecComm": "hide",
                    "mall_domain": mall_domain,
                    "itemsPic": itemsPic,
                    "itemShopNameItem": itemShopName,
                    "itemPrice": itemPrice,
                    "shopId": shopId,
                    "itemShopId": itemShopId,
                    "skuId":skuId,
                    "imageStr": imageStr,
                    "UserId": UserId,
                    "dlShowBorder": "clearfix bd-bottom",
                    "userIsExpert": $userIsExpert, //当前用户是否是达人
                    "isExpert": Msg.expertInfo.isExpert, //是否是达人
                    "userPic": Msg.user.facePicUrl, //用户头像
                    "username": Msg.user.nickname, //用户昵称
                    "backTopicId": Msg.id, //本条评论id
                    "content": face.parseEmoji(contentMsg), //过滤之后的内容
                    "topicType": topicType, // 评论类型
                    "topicId": Msg.topicId, // 话题id
                    "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
                    "times": fromNow(timeString(Msg.createTime)), //评论时间
                    "isFirstCom": true, // 是否是一级评论  --  判断是否显示二级评论
                    "userSubmit": true,   //是否用户自己发布的评论
                    "showReport": showReport,  //是否显示举报
                    //"rebate": rebate, //是否显示返利
                    "kid": Msg.kid
                }
                //$("[data-node=noload]").css("display", "none");
                $("[data-node='hidDiv']").css("display", "block");

                var item = commentList(basics);
                //$circleCom.append($(item));

                $("[data-circlecom='" + topicid + "']").append($(item));
                //console.log($("[data-circlecom="+topicid+"]").attr("class"));
                //var newDL = $("[data-ddlist=" + basics.backTopicId + "]");

                // 商品选择列表清空
                // 图片列表清空
                $("[data-tid='" + topicid + "']").children('[data-node="addImgGoods"]').attr("data-imgnum", 9)
                    .attr("data-goodstr", "")
                    .removeClass("hasGoods");
                $("[data-tid='" + topicid + "']").find("[data-node='imgUl']")
                    .attr("data-imgsrt", "").addClass("hide").children(".imgClass").remove();
                $("[data-tid='" + topicid + "']").find("[data-node='addGoods_btn']").removeClass("disabled");
                $("[data-tid='" + topicid + "']").find("[data-node='addImg_btn']").removeClass("disabled");
                $("[data-node='goodsIn']").remove();

                var idNode = $("[id-node='" + topicid + "']");
                $("body,html").animate({ //？？？？？有问题
                    scrollTop: parseInt(idNode.height() + idNode.offset().top - $(window).height() / 2)

                });
                hint.init("评论成功");

            } else {

                if (data.code === 881001) {
                    alert("评论内容不能超过200个汉字");
                } else if (data.code === 404 || data.code === 410) {
                    alert("抱歉，该话题已被删除", {
                        ok: function() {
                            window.location.href = "/index/get_error?code=topic_404";
                        }
                    });
                } else if (data.code === 422) {
                    alert("抱歉，服务器君正在打盹", {
                        ok: function() {
                            window.location.href = "/index/get_error?code=500";
                        }
                    });
                } else if (data.code === 403) {
                    alert("抱歉，该话题审核不通过！", {
                        ok: function() {
                            window.location.href = "/index/get_error?code=topic";
                        }
                    });
                } else {
                    alert(data.message);
                }

            }
        });
    } else {
        alert("请输入评论内容！");
    }

}

function checkUserId(id) {
    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
        return $_CONFIG.i_domain + 'member/profileHome';
    } else {
        return $_CONFIG.group_domain + 'ta/' + id + '.html';
    }
}

function timeString(str) {
    var date = new Date(str);
    var fullYear = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    function addZero(num) {

        var newNum = "";
        if (parseInt(num) < 10) {
            newNum = "0" + num;
        } else {
            newNum = num;
        }
        return newNum;
    }

    return fullYear + "-" + addZero(month) + "-" + addZero(day) + " " + addZero(hh) + ":" + addZero(mm) + ":" + addZero(ss);

}

module.exports = a_Submit;
