var titel = require('./title.tpl');
var comList = require('./comList.tpl');
var commentBox = require('./commentBox.tpl');
var topicRight = require('./topicRight.tpl');
require('lazyload');

require('history');

var getCommentList = require('../comment/getCommentList');
var fetch = require('io/fetch');
var url = require('io/url');

var clickTopicId = $_CONFIG['topicid'];
var clickTopicObj = { "name": $_CONFIG['topic_title'], "id": clickTopicId };
//console.log(clickTopicObj);
var len = 0;
var lastScroll = 0;

var downLoadTopic = [clickTopicObj]; //已加载的有效话题id  

var OpenedTop = [clickTopicObj]; //记录页面已经滑过的话题id	 
var ListTopsValid = [];

var arrayIdBoolean = []; //改变ul地址的判断
var idVideo = [];
var videoObj = [];
//var vid = null;

var $no_next = $_CONFIG['no_next']; //1 false

var imgPath = $_CONFIG['imgpath'];
var isLogin = $_CONFIG['islogin'];

function addDivHtml(newMsg1) {
    var newMsg = newMsg1;
    var id = newMsg.id;
    var borderBox = $('<div class="more-topic"></div>');
    var elemTopicBox = $('<div class="wrap-box ovflow-hid wrap-reletive " data-node="wrap-box" id-node=' + id + '></div>'), //总第div
        elemTopicLeft = $('<div class="topic-lfet" data-left=' + id + '></div>')/*, //左侧
        elemTopicRight = $('<div class="topic-right topic-absolute"></div>')*/; //右侧
    var topicRT = $(".topic-r-t").html();
    var hotTopicUl = $("[data-node=hot_topics]").html();

    //右侧的参数
    var rightNextMsg = {
        topicRT: topicRT,
        hotTopicUl: hotTopicUl,
        id: id,
        nextTopName: newMsg.topicName,
        nextTopTime: newMsg.lastReplyTime
    }

    var elemTitle = titel(newMsg); //头部
    var elemCommentBox = commentBox(newMsg);
    var elemComList = comList(newMsg); //评论
    var elemRight = topicRight(rightNextMsg);

    $(elemTopicLeft).append(elemTitle);
    $(elemTopicLeft).append(elemCommentBox);
    $(elemTopicLeft).append(elemComList);

    $(elemTopicBox).append($(elemTopicLeft));
    $(elemTopicBox).append($(elemRight));

    $(borderBox).append(elemTopicBox);

    $("[data-node=more-topic]").append($(borderBox));
    $("img").lazyload({ effect: "fadeIn" });
}

function getVideo() {

    var videoArr = $_CONFIG['video_arr'];
    var newVideo = [];
    if (videoArr.length > idVideo.length) {

        newVideo = videoArr.slice(idVideo.length);
        for (var i = 0; i < newVideo.length; i++) {

            var _video = newVideo[i];
            var video_id = _video.base.id;

            var v = new MeixinPlayer();
            v.init(video_id, 'videoContainer_' + video_id, _video.config);
            idVideo.push(newVideo[i]);
            videoObj.push(v);

            v.on('playStart', function() {
                for (var i = 0; i < videoObj.length; i++) {
                    if (videoObj[i] === v) {
                        return false;
                    } else {
                        videoObj[i].stopVideo();
                    }
                }
            }, v);
        }
    } else {
        return false;
    }
}



function getNextTopicId(openTopicId) {
    //console.log(openTopicId);
    arrayIdBoolean.push(openTopicId);

    fetch.get(url.get('getNextTopic') + "?topicid=" + openTopicId).then(function(data) {

        if (data.success == true && data.code == 200) {
            var $getNext = $("[data-get-next-topic = " + openTopicId + "]");
            $getNext.children("a").html(data.data.name)
                .attr("href", "/topic/" + data.data.id + ".html")
                .attr("target", "_blank");
            $getNext.children(".f12").html(data.data.lastReplyTime);
            $getNext.slideDown("slow");
            //获取下个话题的信息，id
            var userImage = $_CONFIG['headface'];
            var pathImg = $_CONFIG['pcimgpath'];
            if (!userImage) {
                userImage = pathImg + "/images/public/head-default.png";
            }
            var isExpert = $_CONFIG['isExpert'] ? true : false; //是否为达人

            //console.log(isLogin);
            var isLoginClass = "";
            var isLoginStr = '';
            var readyOnly = '';
            if (isLogin == "0") {
                isLoginStr = "登录";
                isLoginClass = "pc-bj-fc8753";
                readyOnly = "readonly";
                //var headface
            } else {
                isLoginStr = "发布";
                isLoginClass = "";
                readyOnly = "";
            }

            var dataStr = data.data;
            var id = dataStr.id;
            var name = data.data.name;
            $("body").attr("data-currentTopicId", openTopicId);
            $("body").attr("data-nextTopicId", id);

            downLoadTopic.push({
                "name": name,
                "id": id
            });


            // 点赞和收藏
           
            //var likeIS = dataStr.ext.praise.isLike == false ? "" : "active";
            var UserId = checkUserId(dataStr.user.id);
            var allNum = parseInt(dataStr.replyQuantity + dataStr.subReplyQuantity);
            var newMsg = {
                    UserId: UserId,
                    html: dataStr.html,
                    isEssence: dataStr.isEssence, //精品,
                    isUpper: dataStr.isUpper, //置顶,
                    style: dataStr.style == "0" ? false : true, //专访
                    topicName: dataStr.name, //话题名称
                    id: id, //话题ID
                    imgPath: imgPath,
                    facePicUrl: dataStr.user.facePicUrl, // 话题 用户头像
                    nickName: dataStr.user.nickname, //话题 用户名
                    groupCircleName: dataStr.group.name, //来自圈子
                    lastReplyTime: dataStr.lastReplyTime, //话题时间
                    allNum: allNum, //评论数
                    extGroupUrl: dataStr.ext.group_url, // 圈子路径

                    extImagesLst: dataStr.ext.surl, //左侧ul上添加的数据
                    share_text: dataStr.ext.share_text, // 左侧ul上的data-content 属性值
                    extSpic: dataStr.ext.images_lst,
                    extStitle: dataStr.name,

                    isLike: dataStr.ext.praise.isLike == false ? "" : "active", //点赞
                    isLikeName: dataStr.ext.praise.isLike == false ? "点赞" : "取消点赞", //点赞
                    userQuantity: dataStr.ext.praise.userQuantity, // 点赞数
                    userCollection: dataStr.userCollection.result == 0 ? "" : "active", //收藏
                    userCollectionName: dataStr.userCollection.result == 0 ? "收藏" : "取消收藏", //收藏
                    userCollectionStatu: dataStr.userCollection.result == 0 ? 0 : 1,
                    dataParise: dataStr.ext.praise.isLike == false ? "1" : "0", //点赞

                    isExpert: isExpert, //是否是达人
                    userImage: userImage, //用户头像
                    groupId: data.data.groupId, //groupid

                    isLoginStr: isLoginStr, //根据是否登陆判断显示 按钮内容
                    isLoginClass: isLoginClass, //根据是否登陆显示  样式
                    readyOnly: readyOnly //根据是否登陆判断是  只读还是可写

                }
                //填写数据
            addDivHtml(newMsg); //添加数据到页面
            if (allNum != 0) {
                getCommentList(id, 1, 10, 2);
            }
            ListTopsValid.push({
                "name": name,
                "id": id
            });

            var topRightH = $("[data-topicrt=" + openTopicId + "]");
            var h = topRightH.children(".topic-r-t").height() + topRightH.children(".topic-position").height();

            $("[id-node=" + openTopicId + "]").css("min-height", h + "px");

        } else if (data.success == false && data.code == 404) {
            return false;
        }



    });

}


//鼠标下滑			
function addMoreEvent(s) {
    //var TopicIdNext = $("body").attr("data-nexttopicid"); //
    if (len == -1) {
        // 已经滑过的对象数字
        OpenedTop.push(clickTopicObj); //clickTopic
        len = 0;
    }

    if (ListTopsValid.length - 1 == len) {

        var id = ListTopsValid[ListTopsValid.length - 1].id;
        var name = ListTopsValid[ListTopsValid.length - 1].name;

        if (s > $("[id-node=" + id + "]").offset().top) {

            History.replaceState({}, name, id + ".html");
            OpenedTop.push({
                name: name,
                id: id
            });

            if ($no_next == 0 && arrayIdBoolean[arrayIdBoolean.length - 1] != id) {
                getNextTopicId(id);
            }
            getVideo();
            len++;
        }
    }

    if (ListTopsValid.length - 1 > len) {
        var id1= ListTopsValid[len].id;
        var name1 = ListTopsValid[len].name;
        
        if (s > $("[id-node=" + id1 + "]").offset().top) {
            History.replaceState({}, name1, id1 + ".html");
            OpenedTop.push({
                name: name1,
                id: id1
            });
            len++;
        }
    }
}
//鼠标上滑
function scrollToTop(t) {

    var id = "";
    var nextiD = "";
    var name = "";
    if (len < 1) {
         nextiD = clickTopicObj.id;
         name = clickTopicObj.name;
    } else {
        id = OpenedTop[len].id;
         nextiD = OpenedTop[len - 1].id;
         name = OpenedTop[len - 1].name;
    }
    if (id) {
        //var scrollTop = $(this).scrollTop();
        if (t < $("[id-node=" + id + "]").offset().top) {
            History.replaceState({}, name, nextiD + ".html");
            OpenedTop.length = len;
            len--;
        }
    }
}

//右侧 固定
function topFixed(scrollTop) {

    var showTopicID = OpenedTop[OpenedTop.length - 1].id; //当前话题id
    var $showDiv = $("[id-node=" + showTopicID + "]"); //当前话题的div
    var $showRight = $showDiv.children(".topic-right "); //右侧整体
    var $thisScroll = $showRight.children("[data-node=topic_xi]"); // 滚动部分
    var $showLeft = $showDiv.children(".topic-lfet"); //左侧

    var showDivHeight = $showDiv.height(); // 话题整体高度
    var showRightHeight = $showRight.height(); //右侧高度
    var thisScrollHeight = $thisScroll.height(); //热门话题的高度
    var windowHight = $(window).height(); //窗口高度
    var showLeftHeight = $showLeft.height(); //左侧高度

    var floatRight = $("body").width() - $(".wrap-box").width();
    floatRight = parseInt(floatRight) / 2; //右边浮动的宽度

    var s = scrollTop; //鼠标滚动的高度
    var TopShow = parseInt($showDiv.offset().top); //整个话题div距离顶部的高度
    var topicRT = TopShow + 320; //热门话题距离页面顶部的距离
    var BottomShow = parseInt(TopShow) + showDivHeight; //热门话题距离页面底部的距离，应该减去热门话题的高度


    // 左侧小于右侧，不操作
    if (showLeftHeight <= showRightHeight) {
        return false;
    } else {
        var pp = null;
        var autoTop = null;
        var opx = null;
        //var toTopHeight = $(".topic-r-t").height();

        var h = 0;
        //var m = 0;
        if (windowHight > thisScrollHeight) {
            h = windowHight - thisScrollHeight;
        } else {
            //m = thisScrollHeight - windowHight;
        }

        if (thisScrollHeight <= windowHight) {
            //吸顶
            pp = topicRT;
            autoTop = "0px";
            opx = "auto";
        } else {
            //吸底
            pp = topicRT - windowHight + thisScrollHeight;
            autoTop = "auto";
            opx = "0px";
        }


        //var h = windowHight - thisScrollHeight;
        if (s > pp && s + windowHight <= BottomShow + h) {
            $($thisScroll).css({
                "position": "fixed",
                "right": floatRight + "px",
                "top": autoTop,
                "bottom": opx
            });
        } else if (s + windowHight > BottomShow + h) {
            $($thisScroll).css({
                "position": "absolute",
                "right": "0px",
                "top": "auto",
                "bottom": "0px"
            });
        } else if (s < pp) {
            $($thisScroll).css({
                "position": "absolute",
                "right": "0px",
                "top": "320px",
                "bottom": "auto"
            });
        }

    }

}

function ulFixt(scrollTop) {
    var containerId = OpenedTop[OpenedTop.length - 1].id; //当前话题id
    var $divConter = $("[data-conter-ul=" + containerId + "]");
    var $ul = $($divConter).children("ul");
    var divTop = $divConter.offset().top;
    var divHeight = $divConter.height();
    var ulHeight = $ul.height();
    var s = divHeight + divTop - ulHeight;

    var leftS = $(".wrap-box.ovflow-hid").css("margin-left");
    leftS = parseInt(leftS.substring(0, leftS.length - 2)) + 20;

    if (scrollTop > divTop && scrollTop < s) {
        $ul.css({
            "position": "fixed",
            "top": "6px",
            "left": leftS + "px",
            "bottom": "auto"
        });
    } else if (scrollTop > s) {
        $ul.css({
            "position": "absolute",
            "top": "auto",
            "left": "0px",
            "bottom": "0px"
        });
    } else if (scrollTop < divTop) {
        $ul.css({
            "position": "absolute",
            "top": "0",
            "bottom": "auto",
            "left": "0px"
        });
    }

}

function checkUserId(id) {
    if (isLogin == 1 && $_CONFIG['userId'] == id) {
        return $_CONFIG.i_domain + 'index';
    } else {
        return $_CONFIG.group_domain + 'ta/' + id + '.html';
    }
}

// 返回顶部a
function toTopBtn() {
    var $Btn = $("[data-node=top]");
    $Btn.off();
    var btnScroll = -1;

    $Btn.on("click", function() {

        var topicId ="";
        var winScrollTop = parseInt($(window).scrollTop());
        $(this).attr("data-winScrollTop", winScrollTop);
        if (btnScroll == winScrollTop) {
            OpenedTop = [clickTopicObj];
            topicId = OpenedTop[OpenedTop.length - 1]; //当前话题id
            len = 0;
            $("html, body").scrollTop(10);
            History.replaceState({}, topicId.name, topicId.id + ".html");

        } else {
            topicId = OpenedTop[OpenedTop.length - 1].id; //当前话题id
            var dropTop = parseInt($("[id-node=" + topicId + "]").offset().top);
            $(window).scrollTop(dropTop);
            btnScroll = dropTop;
        }
        $(this).attr("data-btnScroll", btnScroll);
        //console.log("winScrollTop: "+winScrollTop +" dropTop: "+dropTop);
    })
}


var init = function() {
    getVideo();
    toTopBtn();
    History.Adapter.bind(window, 'statechange', function() {
        //var State = History.getState(); 
        //History.log('statechange:', State.data, State.title, State.hash);
    });

    //var topicRT = $(".topic-r-t").html(); // 右侧的html
    //var hotTopicUl = $("[data-node=hot_topics]").html(); //热门话题的html

    //获取下一个话题
    if ($no_next == 0) {
        getNextTopicId(clickTopicId);
    }


    //鼠标滚动事件
    $(window).on("scroll", function() {


        var scrollTop = $(this).scrollTop();
        var windowHight = $(window).height();
        var s = parseInt(scrollTop + windowHight / 3);
        topFixed(scrollTop);
        ulFixt(scrollTop);
        // 视频暂停	
        if (scrollTop - lastScroll > 0) { //下滑
            // 判断并加载话题		
            //addMoreEvent(s,ListTopsSub);
            addMoreEvent(s);
        } else { //上滑
            //改变ulr地址
            scrollToTop(s);
        }
        lastScroll = scrollTop;
    });
}
module.exports = {
    init: init
}
