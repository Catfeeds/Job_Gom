/*话题详情页 v2版本改造*/
var hint = require('module/hint.js');
var fixedTopic = require('../fixedTopic');
var alert = require('module/popup/alert');
var fromNow = require('utils/fromNow');
var fetch = require('io/fetch');
var url = require('io/url');
var face = require('module/popup/face/face');
var encodeHtml = require('utils/encodeHtml');
var commentList = require('./commentList.tpl');
var secondComList = require('./secondComList.tpl');

var loginPop = require('module/popup/login'); //登录弹窗
var checkLoginStatus = require('module/checkLoginStatus');

var Pubsub = require('io/pubsub');
var channel = require('io/channel');

var OBJELEM = {
    userIsExpert: $GLOBAL_CONFIG['isExpert'], // 当前用户是否为达人
    $comment_Msg: $("[data-node=comment_Msg]"),
    $secondCom_Key: $("[data-node=secondCom_Key]"),
    $loadlist: $("[data-node=loadlist]"),
    a_Submit: $("[data-node=a_Submit]"), // 发布按钮
    circleCom: $("[data-node=circleCom]"),
    is_Login: checkLoginStatus() == true ? 1 : 0, // 判断登陆状态
    LoginSrc: $_CONFIG.passport_domain, //登录注册域名
    mall_domain: $_CONFIG.mall_domain //商城
}


OBJELEM.$loadlist.css("display", "none");
$("[data-node=loading]").css("display", "none");
$("[data-node=noload]").css("display", "none");

var commentDomInit = function() {
    OBJELEM.$comment_Msg.on('click', commentCheck)
        //一级话题回复 绑定事件
    OBJELEM.a_Submit.on("click", a_Submit);

    //显示二级回复框
    OBJELEM.circleCom.on("click", "[data-node=secondCom_Key]", secondCom_Key);

    //点击收起 按钮，隐藏二级输入框
    OBJELEM.circleCom.on("click", "[data-node=hideComBox]", hideComBox);

    //二级话题回复
    OBJELEM.circleCom.on("click", "[data-node=a_secondComBtn]", a_secondComBtn);

    //表情添加
    OBJELEM.$comment_Msg.on('click', '[data-node=smilies_Face]', showEmoji); //表情
    //OBJELEM.$emoji.on("click", showEmoji);
    OBJELEM.circleCom.on('click', '[data-node=smilies_Face]', showEmoji);

    // 二级列表
    OBJELEM.circleCom.on("click", "[data-node=showMoreList]", showMoreList);
}

var init = function() {
    getCommentList(1, 10, 2);
    // 初始化表情
    face.init();

    // 点击评论图标页面滚动到评论区域
    goComment();
    //登陆状态以及事件绑定
    if (getLoginState()) {
        face.insert(function(data) {
            insertAtCursor(curretTextArea[0], data.reg);
        });
    }

    commentDomInit();

    //加载更多
    $("[data-node=loading]").css("display", "none");
    $("[data-node=noload]").css("display", "none");
    $("[data-node=loadlist]").on("click", function() {
        var addmorepages = $(this).attr("data-addmorepages"); //当前页
        var listsize = $(this).attr("data-listsize"); //
        var tootalPa = $(this).attr("data-tootlepa"); //总页数
        var toPage = parseInt(addmorepages) + 1;
        var nodelist = "nodelist";
        getCommentList(toPage, listsize, 5, nodelist);
        return false;
    });
}

// 点击评论图标页面滚动到评论区域
var goComment = function() {
    var $go_comment = $('[data-action=goComment]');
    $go_comment.on('click', function(e) {
        if (window.BP) {
            BP.send({
                event_id: 'G000P008',
                group_id: $GLOBAL_CONFIG.groupid,
                topic_id: $GLOBAL_CONFIG.topicid,
                circle_type: $GLOBAL_CONFIG.s_c,
                channel_id: 'in-pinglun'
            });
        }

        var offsetTop = $('[data-node=commentBox]').offset().top;
        $('html,body').animate({
            'scrollTop': offsetTop
        }, 200);

    });
}

var popUnion = function() {

    var loginCallback = function() {
        OBJELEM.is_Login = 1;
        getLoginState();
        $("[data-node=circleCom]").empty();
        getCommentList(1, 10, 2);
    }

    loginPop({
        onLogin: loginCallback
    });
}

//判断是否登录
var commentCheck = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }
}

// 判断登陆状态
var getLoginState = function() {
    var ISLOGIN = null;
    if (!checkLoginStatus()) { //必须重新判断 别的无刷新事件修改了登录状态
        //没有登录
        ISLOGIN = "0";
        OBJELEM.$comment_Msg.children("textarea").attr("readonly", "readonly").css("background", "#fff");
        $("[data-node=secondCom_Key]").css("display", "none");
    } else {
        OBJELEM.$comment_Msg.children("textarea")
            .removeAttr("readonly").css("background", "transparent");

        OBJELEM.a_Submit.removeClass("pc-bj-fc8753").html("发布");

        $("[data-node=secondCom_Key]").css("display", "block");
        //添加事件
        ISLOGIN = "1";
    }
    return ISLOGIN;
}

//一级话题回复
var a_Submit = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }
    var currUserImg = OBJELEM.$comment_Msg.attr("data-headface"); //头像
    var parentDiv = $(this).parents().eq(1);
    var comment_Msg = parentDiv.children("textarea").val();
    comment_Msg = comment_Msg.trim(); //对输入空格进行过滤
    //var groupId = parentDiv.attr("data-gid");
    var data_userid = parentDiv.attr("data-userid");
    var topicid = parentDiv.attr("data-tid");

    if (comment_Msg) {
        var imId = "b_" + data_userid;
        var businessid = 0;
        var topicType = 0;

        var params = {
            "reply_type": 0, //回复的类型
            "topicid": topicid, //话题id
            "content": comment_Msg //话题回复内容
                // "pics"    : "",//话题回复图片
                // "shopid"  : //如果topicType = 1 或者 =2 那么这个字段必填
                //"itemid"  : //如果topicType = 1 那么这个字段必填 
        }

        //提交请求
        fetch.post(url.get('commentFirstV2'), {
            data: params
        }).then(function(data) {

            if (data.success) {
                //console.log(data.data);
                var Msg = data.data;
                var contentMsg = Msg.content;
                contentMsg = encodeHtml(contentMsg);
                contentMsg = delHtmlTag(contentMsg);
                contentMsg = htmlNull(contentMsg);
                parentDiv.children("textarea").val("");
                //time = timeString(Msg.createTime);
                var basics = {
                        "dlShowBorder": "clearfix bd-bottom",
                        "userIsExpert": OBJELEM.userIsExpert, //当前用户是否是达人
                        "isExpert": Msg.expertInfo.isExpert, //是否是达人
                        "userPic": Msg.user.facePicUrl, //用户头像
                        "username": Msg.user.nickname, //用户昵称
                        "backTopicId": Msg.id, //本条评论id
                        "content": face.parseEmoji(contentMsg), //过滤之后的内容 
                        "topicType": topicType, // 评论类型
                        "topicId": Msg.topicId, // 话题id
                        "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
                        "times": fromNow(timeString(Msg.createTime)), //评论时间
                        "isFirstCom": true // 是否是一级评论  --  判断是否显示二级评论
                    }
                    //$("[data-node=noload]").css("display", "none");
                $("[data-node=hidDiv]").css("display", "block");

                var item = commentList(basics);
                OBJELEM.circleCom.append($(item));
                var newDL = $("[data-ddlist=" + basics.backTopicId + "]");
                $("body").scroll(parseInt(newDL.offset().top));
                fixedTopic.init();

                // 评论成功后弹出对话框，并且页面跳转到最末尾
                $("body,html").animate({
                    scrollTop: parseInt($(".topic-lfet", ".wrap-box.wrap-reletive ").height())
                });
                hint.init("评论成功");
                /*
                alert("评论成功",{
                    ok:function(){
                        
                        $("body,html").animate({ scrollTop: parseInt($(".topic-lfet",".wrap-box.wrap-reletive ").height()) });
                    }
                }); 
                */
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
        alert("输入有错，重新输入");
    }

}

//点击回复按钮，显示二级输入框
var secondCom_Key = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }

    var replyuserid = $(this).attr("data-replyuserid");
    //var replyimId = $(this).attr("data-imId");

    var replycommentid = $(this).attr("data-replycommentid");
    var topicid = $(this).attr("data-comid");
    var username = $(this).attr("data-replayUser");
    var dataPublis = $(this).attr("data-publish");
    var isHide = $("[data-parenttopicid=" + topicid + "]").css("display");
    var dataObj = $("[data-parentTopicId=" + topicid + "]");


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
    dataObj.children(".topic-publish-content").children("textarea").attr("placeholder", username);
    if (isHide == "none") {
        dataObj.css("display", "block");
        $("[data-parentTopicIdBtn=" + topicid + "]").css("display", "block");

    }
}

//隐藏二级输入框
var hideComBox = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }

    var hideId = $(this).attr("data-parentTopicIdBtn");
    $("[data-parentTopicId=" + hideId + "]").css("display", "none");
    $("[data-parentTopicId=" + hideId + "]").children("textarea").attr("placeholder", "说点什么吧");
    $("[data-parentTopicIdBtn=" + hideId + "]").css("display", "none");
    $("[data-parentTopicId=" + hideId + "]").removeAttr("data-isPublish").removeAttr("data-replayTo");
    $(".textarea-bx", "[data-parentTopicId=" + hideId + "]").val("");
}

//二级话题回复
var a_secondComBtn = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }

    var replayToPub = $(this).parents().eq(2).attr("data-ispublish"); //
    var beReplyId = "";
    var replayImid = "";

    if (replayToPub == "1") {
        replayToPub = false;
    } else {
        replayToPub = true;
        beReplyId = $(this).parents().eq(2).attr("data-replycommentid");
        replayImid = "b_" + $(this).parents().eq(2).attr("data-replyuserid");
    }
    var replyUserName = $("[data-node=comment_Msg]").attr("data-nickname");
    var beReplyUserName = $(this).parents().eq(2).attr("data-replayto");
    var tId = $(this).attr("data-gettopicid");
    var groupId = $("[data-htid=" + tId + "]").attr("data-groupid");

    var topicType = $("[data-htid=" + tId + "]").attr("data-topictype");;
    var topicId = $("[data-htid=" + tId + "]").attr("data-tid");;
    var content = $(this).parents().eq(1).children("textarea").val();
    var contentLong = null;
    if (content.length > 200) {
        contentLong = true;
    } else {
        contentLong = false;
    }
    var imId = "b_" + $("[data-node=comment_Msg]").attr("data-userid");
    var id = $(this).parents().eq(2).attr("data-replycommentid");
    var replyId = tId;

    var params = {
        "topic_reply_id": replyId,
        "topicid": topicId,
        "content": content,
        "topic_subreply_id": beReplyId
    }

    /*
         topicid    是   String  回复的话题id
        content 否   String  回复内容字数在200字内含200字
        topic_reply_id  是   String  一级话题回复id
        topic_subreply_id   否   String  被回复的二级回复ID
        */

    if (content && !contentLong) {

        fetch.post(url.get('secondtopicV2'), {
            data: params
        }).then(function(data) {
            if (data.success) {
                //console.log(data);

                var contentT = data.data.content;
                contentT = encodeHtml(contentT);
                contentT = face.parseEmoji(contentT);
                contentT = delHtmlTag(contentT);
                contentT = htmlNull(contentT);
                //判断是二级回复还是三级回复


                var beReplyUserName = "";
                var beReplyUserId = "";


                if (replayToPub) {

                    beReplyUserName = data.data.topicSubReplyUser.nickname;
                    beReplyUserId = data.data.topicSubReplyUser.id;
                    // console.log("姓名" + beReplyUserName);
                }

                var showCom = {

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
                    "replyCommentId": data.data.id // 二级回复内容id 
                }

                var item = secondComList(showCom);
                $("[data-ddlist=" + tId + "]").append(item);
                $("[data-parentTopicIdBtn=" + tId + "]").css("display", "none");
                $("[data-parentTopicId=" + tId + "]").css("display", "none");
                $("[data-parentTopicId=" + tId + "]").removeAttr("data-replayto");
                $(".textarea-bx", "[data-parentTopicId=" + tId + "]").val("");

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
                            getCommentList(1, 10, 2);
                        }
                    });
                }

            }
        });
    } else {
        alert("评论内容不能超过200个汉字");
    }


};
//一级列表
var getCommentList = function(currPage, pageSize, listSize, nodelist) {
        var topicNameId = $("[data-node=comment_Msg]").attr("data-tid"); //获取话题的ID
        var currUserImg = $("[data-node=comment_Msg]").attr("data-headface");
        var paramList = '?page=' + currPage + '&pagesize=' + pageSize + '&topicid=' + topicNameId;

        $("[data-node=loadlist]").css("display", "none");
        $("[data-node=loading]").css("display", "block");

        fetch.get(url.get('commentListUrlV2') + paramList).then(function(data) {

            if (data.success) {
                //console.log(data);

                //获取所有的一级评论
                var topicReplys = data.data.topicReplys;

                if (topicReplys.length > 0) {

                    //显示 正在加载中
                    $("[data-node=loading]").css("display", "block");
                    $("[data-node=loadlist]").css("display", "block").attr("data-addMorePages", currPage).attr("data-ListSize", pageSize);

                    for (var i = 0; i < topicReplys.length; i++) {

                        //获取每个评论下的二级评论
                        var topicMsg = topicReplys[i];
                        var subReplyQuantity = topicMsg.subReplyQuantity; //二级回复的总数
                        var subTop = topicMsg.topicSubReplys; //二级回复

                        var replySecArr = []; //二级评论数组

                        //判断是否显示  查看更多按钮 
                        var showNum = null;
                        var dlShowBorder = null;
                        if (subReplyQuantity > listSize) {
                            showMall = true;
                            //删除一个class
                            dlShowBorder = "clearfix";
                            showNum = listSize;
                        } else {
                            showMall = false;
                            showNum = parseInt(subTop.length);
                            dlShowBorder = "clearfix bd-bottom";
                        }

                        for (var j = 0; j < showNum; j++) {
                            var subTopMsg = subTop[j];
                            if (subTopMsg) {
                                // console.log(subTopMsg.creatorId +" " +subTopMsg.user.id);
                                //判断是二级评论还是三级评论
                                var replayToPub = null;
                                var beReplyUserName = "";
                                var beReplyUserId = "";
                                if (subTopMsg.topicSubReplyUser) {

                                    // 三级回复 
                                    replayToPub = true;
                                    beReplyUserName = subTopMsg.topicSubReplyUser.nickname;
                                    beReplyUserId = subTopMsg.topicSubReplyUser.id;
                                } else {

                                    //二级回复
                                    replayToPub = false;
                                }

                                //console.log(replayToPub);

                                var contentSed = subTopMsg.content;
                                contentSed = encodeHtml(contentSed);
                                contentSed = face.parseEmoji(contentSed);
                                contentSed = htmlNull(contentSed);

                                //二级回复中参数
                                var replySecMsg = {
                                    "parentCommentId": topicMsg.id, //话题id
                                    // "topicId": topicId, //
                                    "replayToPub": replayToPub, //判断是二级回复还是三级回复
                                    "content": contentSed, //回复内容
                                    "replyUserName": subTopMsg.user.nickname, //回复人昵称                  
                                    "replyUserId": subTopMsg.user.id, //回复人id
                                    "beReplyUserName": beReplyUserName, //被回复人的昵称
                                    "beReplyUserId": beReplyUserId, //被回复人的id
                                    "replyCommentId": subTopMsg.id // 二级回复内容id 
                                }

                                replySecArr.push(replySecMsg);


                            }

                        }

                        var content = topicMsg.content; //获取一级评论内容
                        content = encodeHtml(content);
                        content = face.parseEmoji(content);
                        content = htmlNull(content);
                        //console.log(topicPic);
                        var topicPic = topicMsg.pics; //一级评论的图片
                        var str = "";
                        if (topicPic.length > 0) {
                            var imgArr = topicPic;
                            var imgArrLen = imgArr.length;

                            $.each(imgArr, function(index, img) {
                                str += "</br><img  style='max-height:500px;max-width:750px' src=" + img + " onerror='imgError(this)' >";
                            })
                        }
                        content = content + str;

                        //商品参数添加
                        var itemsPic = ""; //商品图标
                        var itemShopName = ""; //
                        var itemPrice = "";
                        var shopId = "";
                        var itemShopId = "";
                        if (topicMsg.item) {
                            itemsPic = topicMsg.item.mainImage;
                            itemShopName = topicMsg.item.name;
                            itemPrice = topicMsg.item.price;
                            shopId = topicMsg.item.id;
                            itemShopId = topicMsg.item.shopId;
                            rebateSummary = topicMsg.item.rebateSummary; //返利金额
                            /*
                            "discount": 0, // 直降金额
                            "id": 1179,  //商品id
                            "mainImage": "http://img.gomein.net.cn/image/prodimg/production_image/img/1000083845/1000027654",
                            "name": "尤尼克斯（YONEX）SHB-60C羽毛球鞋",
                            "originalPrice": 18400, //市场价格
                            "price": 18400,
                            "salePrice": 18400, 售价
                            "saleQuantity": 16, 销量
                            "shopId": 3,
                            "skuHighestPrice": 45900,
                            "status": -1,
                            "stock": 50000
                            */
                        }

                        //店铺参数
                        var shopPic = "";
                        var redPackage = "";

                        if (topicMsg.shop) {
                            shopPic = topicMsg.shop.icon;
                            itemShopName = topicMsg.shop.name;
                            if (topicMsg.shop.promotionMark) {
                                redPackage = topicMsg.shop.promotionMark.hasCouponPlan; //是否有优惠券
                            }
                            //redPackage = topicMsg.shop.promotionMark.hasCouponPlan; //是否有优惠券
                            itemShopId = topicMsg.shop.id;

                        }
                        //所有参数集合
                        var showDateList = {
                            "dlShowBorder": dlShowBorder,
                            "showMall": showMall,
                            "userIsExpert": OBJELEM.userIsExpert, //当前用户是否是达人
                            "isExpert": topicMsg.expertInfo.isExpert, //是否是达人
                            "userPic": topicMsg.user.facePicUrl, //用户头像
                            "username": topicMsg.user.nickname, //用户昵称
                            "backTopicId": topicMsg.id, //本条评论id
                            "content": face.parseEmoji(content), //过滤之后的内容 
                            "topicType": topicMsg.replyType, // 评论类型
                            "topicId": topicMsg.topicId, // 话题id
                            "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
                            "times": fromNow(timeString(topicMsg.createTime)), //评论时间
                            "isFirstCom": false, // 是否是一级评论  --  判断是否显示二级评论
                            "secondReply": replySecArr, // 二级评论数组
                            //商品参数
                            "mall_domain": OBJELEM.mall_domain,
                            "itemsPic": itemsPic,
                            "itemShopName": itemShopName,
                            "itemPrice": itemPrice,
                            "shopId": shopId,
                            "itemShopId": itemShopId,
                            // 店铺参数
                            "redPackage": redPackage,
                            "shopPic": shopPic


                        }

                        var item = commentList(showDateList);
                        OBJELEM.circleCom.append($(item));

                        $("[data-node=loading]").css("display", "none");
                        $("[data-node=loadlist]").css("display", "block");

                        //没有登录时不显示 “回复”
                        if (OBJELEM.is_Login == "0") {
                            $("[data-node=secondCom_Key]").css("display", "none");
                        }

                        //
                        if (topicReplys.length < pageSize) {
                            $("[data-node=loadlist]").css("display", "none");
                        }

                        fixedTopic.init();
                        if (nodelist) {
                            var windowHeight = parseInt($(window).height());
                            var height = $(".topic-lfet").height() - windowHeight;

                            $(window).scrollTop(height);
                        }

                    }

                } else {
                    //$("[data-node=noload]").css("display", "block");
                    $("[data-node=loading]").css("display", "none");
                    if (pageSize == 1) {
                        $("[data-node=hidDiv]").css("display", "none");
                    }
                }

            } else {
                $("[data-node=loadlist]").css("display", "none");
                $("[data-node=noload]").css("display", "block");
                $("[data-node=loading]").css("display", "none");
            }

        });

    }
    //二级列表
var showMoreList = function() {


    var groupId = $(this).attr("data-groupId");
    var imId = $(this).attr("data-imId");
    var topicType = $(this).attr("data-topicType");
    var commentid = $(this).attr("data-htid");
    var tid = $(this).attr("data-tid");
    var tootalPages = $(this).attr("data-tootlePages"); //
    var currentPage = $(this).attr("data-currentPage"); //当前页数
    var pageSize = $(this).attr("data-pageSize"); //当前展示列表数
    var a = Math.ceil(parseInt(tootalPages) / parseInt(pageSize)); //获取总页数
    var b = parseInt(tootalPages) % parseInt(pageSize); //获取最后一页的列表数目
    var toPage = parseInt(currentPage) + 1;
    var obj = $(this);
    var paramList = '?page=1&pagesize=70&topic_replyid=' + commentid;
    var objHtml = obj.html();
    console.log(11)
    if (objHtml === "查看回复...") {
        getRelyList(paramList, obj);
    } else {
        //
        var childrens = $("[data-ddlist=" + commentid + "]").children(".comments-s");
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

                $("[data-ddlist=" + commentid + "]").children(".comments-s").remove();
                for (var i = 0; i < replyCommentList.length; i++) {

                    var replyaList = replyCommentList[i];
                    var content = replyaList.content;
                    content = encodeHtml(content);
                    content = face.parseEmoji(content);
                    content = htmlNull(content);
                    var beReplyUserName = "";
                    var beReplyUserId = "";
                    var replayToPub = false;

                    if (replyaList.topicSubReplyUser) {
                        beReplyUserName = replyaList.topicSubReplyUser.nickname;
                        beReplyUserId = replyaList.topicSubReplyUser.id;
                        replayToPub = true;
                    }
                    var showCom = {

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
                    $("[data-ddlist=" + commentid + "]").append(item);
                    if (OBJELEM.is_Login == "0") {
                        $("[data-node=secondCom_Key]").css("display", "none");
                    }
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


//表情添加
var curretTextArea;
var selectText = function(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRagen) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex);
        range.moveEnd('character', stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
};

var insertAtCursor = function(textbox, text) {
    if (textbox.selectionStart >= 0) {
        var val = textbox.value;
        var startIndex = textbox.selectionStart;
        var endIndex = textbox.selectionEnd;
        textbox.value = val.substring(0, startIndex) + text + val.substring(textbox.selectionEnd);
        textbox.selectionStart = textbox.selectionEnd = startIndex + text.length;
        textbox.focus();
    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
        textbox.focus();
        var range = document.selection.createRange();
        range.text = text;
        range.select();
    }
};
var showEmoji = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }

    var $this = $(this);
    var offset = $this.offset();
    var x = offset.left - 2;
    var y = offset.top + 38;

    curretTextArea = $this.closest('div').prev();
    if ($('[data-node=faceBox]').is(':hidden')) {
        face.show(x, y);
    } else {
        face.hide();
    }
    return false;
};



function timeString(str) {
    var date = new Date(str);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

}

function delHtmlTag(str) {
    return str.replace(/&lt(.*?)&gt;/g, ""); //去掉所有的html标记
}



function htmlNull(str) {
    var re = str.replace(/\n|\r\n/g, "</br>");
    return re; //去掉所有的html标记
}


 // 订阅
    Pubsub(channel.comment.enableEditor).sub(function(data) {
       if(data.pid == "enable"){
             getLoginState();
       }  
    });


module.exports = {
    init: init,
    getLoginState: getLoginState
}