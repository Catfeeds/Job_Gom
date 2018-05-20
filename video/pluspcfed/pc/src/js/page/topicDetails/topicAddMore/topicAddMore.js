var Pubsub = require('io/pubsub');
var identify = require('utils/IdentifyIE8-');
var titel = require('./title.tpl');
var comList = require('./comList.tpl');
var commentBox = require('./commentBox.tpl');
var topicRight = require('./topicRight.tpl');
require('lazyload');

require('history');
require('module/atgregion')();

var getCommentList = require('../comment/getCommentList');
var fetch = require('io/fetch');
var url = require('io/url');

var clickTopicId = $_CONFIG['topicid'];
var clickTopicObj = {
    "name": $_CONFIG['topic_title'],
    "id": clickTopicId
};
var len = 0;
var lastScroll = 0;

var downLoadTopic = [clickTopicObj]; //已加载的有效话题id

var OpenedTop = [clickTopicObj]; //记录页面已经滑过的话题id
var ListTopsValid = [];

var arrayIdBoolean = []; //改变ul地址的判断
var idVideo = [];
var videoObj = [];
var currentId = clickTopicObj.id;
var oldCurrentId  = clickTopicObj.id;
//var vid = null;

var $no_next = $_CONFIG['no_next']; //1 false

var imgPath = $_CONFIG['imgpath'];
var isLogin = $_CONFIG['islogin'];

var jctjmodule = $_CONFIG['htfxan']; //分享按钮
var htxqmodule = $_CONFIG['htxq']; //话题详情
var htcyplmodule = $_CONFIG['htcypl']; //参与评论
var htpllbmodule = $_CONFIG['htpllb']; //评论列表
var htqzxxmodule = $_CONFIG['htqzxx']; //圈主信息
var htrmhtmodule = $_CONFIG['htrmht']; //热门话题
var htxyymodule = $_CONFIG['htxyy']; //下一篇
//$GLOBAL_CONFIG['ggckgd'] = 'PGGMKCKmd0003';  //埋点查看更多标示
var ggjzgdmodule = $_CONFIG['ggjzgd']; //埋点加载更多标示
var hotTopicUl = $("[data-node='hot_topics']").find('ul').html();
var topicRT = $(".topic-r-t").html();
var $topicWrap =  $("[data-node='more-topic']");
var $playVideo = $("#playVideo");
var videoEnv = {"sim":"dist","pro":"dist","pre":"pre","dev":"pre"},
    videoEnvironment = {env:videoEnv[$_CONFIG['environment']] || "dist"};//视频环境 dist/生产
var number = 0;
function getTopic(id, callback){
    fetch.post(url.get('getTopicList'), {
        data: {
            tid: id
            //tid: '59e1b13d7e3a7377fce76410' 
        }
    }).then(function(data){
        callback.call(null, data);
    },function(data){
        callback.call(null, data);
    });
}
function addDivHtml(newMsg1, callback) {

    var newMsg = newMsg1;
    var id = newMsg.id;
    getTopic(id, function(data){
        var showTab = data && data.code === 200 && data.data.length > 0;
        //右侧的参数
        var rightNextMsg = {
            topicRT: topicRT,
            hotTopicUl: hotTopicUl,
            id: id,
            showTab: showTab,
            tabList: data.data,
            topicDomain: $_CONFIG.group_domain + 'topic/',
            nextTopName: newMsg.topicName,
            nextTopTime: newMsg.lastReplyTime,
            htqzxxmodule: newMsg.htqzxxmodule,
            htrmhtmodule: newMsg.htrmhtmodule,
            htxyymodule: newMsg.htxyymodule
        }

        var elemTitle = titel(newMsg); //头部
        var elemCommentBox = commentBox(newMsg);
        var elemComList = comList(newMsg); //评论
        var elemRight = topicRight(rightNextMsg);

        var topicHtml = '<div class="more-topic" >'
                            + '<div class="wrap-box ovflow-hid wrap-reletive " data-node="wrap-box" id-node=' + id + '>'
                                + '<div class="topic-lfet" data-left=' + id + '>'
                                    + elemTitle
                                    + elemCommentBox
                                    + elemComList
                                + '</div>'
                                + elemRight
                            + '</div>'
                        '</div>';
        $topicWrap.append(topicHtml);
        var $leftImg = $topicWrap.children().last().find('.source-rig-box img');
        $leftImg.lazyload({
            effect: "fadeIn"
        });
        callback.call(null);
    });
}

function getVideo() {
	if ($playVideo.length) {
		var v = new MeixinPlayer(),
			vId = $playVideo.attr('video-id');
		v.init(vId, 'playVideo',videoEnvironment);
	} else {
		var videoArr = $_CONFIG['video_arr'];
		var newVideo = [videoArr];
		if (videoArr.length > idVideo.length) {

			newVideo = videoArr.slice(idVideo.length);
			for (var i = 0; i < newVideo.length; i++) {

				var _video = newVideo[i];
				var video_id = _video.base.id;

				var v = new MeixinPlayer();
				v.init(video_id, 'videoContainer_' + video_id + "_" + _video.config.topicId, _video.config);
				idVideo.push(newVideo[i]);
				videoObj.push(v);

				v.on('playStart', function() {
					for (var i = 0; i < videoObj.length; i++) {
						if (videoObj[i] === v) {
							//return false;
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

}
var nextLoading = 0;

//增加话题访问量
var addVisitTopicId = function(openTopicId) {
    fetch.get(url.get('addVisitTopic'), {
        data: {
            topicid: openTopicId
        }
    })
}

//获取话题中商品价格
var getGoodsPrice = function(goodsId) {
    var ids = '';
    $.each(goodsId, function(i, v) {
        ids += ',' + $(v).attr('data-id') + '|' + $(v).attr('data-skuid');
    })
    return ids.substr(1);
}

//渲染话题中的价格

//2017.12.15 zhaodonghong delete   b:价格之类数据由后端渲染
/*var changeGoodsPrice = function(topicId) {
    var curTopicId = $('[id-node="' + topicId + '"]');
    var len = curTopicId.find('strong[data-id]').length;
    var ids = getGoodsPrice(curTopicId.find('strong[data-id]'));
    if (len !== 0) {
        fetch.get(url.get('getIndexData'), {
            data: {
                type: 'product',
                ids: ids
            }
        }).done(function(data) {
            if (data.success === true) {
                $.each(data.data, function(i, v) {
                    if (v.salePrice === null) {
                        v.salePrice = '暂无售价'
                    }
                    $('[data-id="' + v.id + '"]').text(v.salePrice);
                    $('[data-id="' + v.id + '"]').parent('[data-node="price"]').removeClass('hide');
                })
            }

        })
    }
}*/

function getNextTopicId(openTopicId) {
    arrayIdBoolean.push(openTopicId);
    fetch.get(url.get('getNextTopic') + "?topicid=" + openTopicId).then(function(data) {
        if (data.success == true && data.code == 200) {
            var $getNext = $("[data-get-next-topic='" + openTopicId + "']");
            if (nextLoading) {
                $getNext.children("a").html(data.data.name)
                    .attr("href", "/topic/" + data.data.id + ".html")
                    .attr("target", "_blank");
                $getNext.find(".f12").html(data.data.lastReplyTime);
                $getNext.slideDown("slow");
            } else {
                nextLoading = 1;
            }
            //获取下个话题的信息，id
            var userImage = $_CONFIG['headface'];
            var pathImg = $_CONFIG.imgpath;
            if (!userImage) {
                userImage = pathImg + "/images/public/head-default.png";
            }
            var isExpert = $_CONFIG['isExpert'] ? true : false; //是否为达人

            var isExpertSign = data.data.expertInfo.isExpert ? true : false; //是否为达人
            var isMeihao = data.data.extTopicType === 8;  //是否为美号
            var iconExpert = '';//达人名称
            var iconMeihao = '';//美号名称
            if(isExpertSign){
                iconExpert = data.data.expertInfo.category.name;//达人名称
            }
            if(isMeihao){
                iconMeihao = data.data.mAccount.category.name;//美号名称
            }
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
            var showReport = (isLogin == 1) && ($_CONFIG['userId'] != dataStr.user.id) ? true : false;
            var allNum = parseInt(dataStr.replyQuantity + dataStr.subReplyQuantity);
            var newMsg = {
                    jctjmodule: getModuleString(jctjmodule),
                    htxqmodule: getModuleString(htxqmodule),
                    htcyplmodule: getModuleString(htcyplmodule),
                    htpllbmodule: getModuleString(htpllbmodule),
                    htqzxxmodule: getModuleString(htqzxxmodule),
                    htrmhtmodule: getModuleString(htrmhtmodule),
                    htxyymodule: getModuleString(htxyymodule),
                    ggjzgdmodule: ggjzgdmodule,
                    UserId: UserId,
                    html: dataStr.html,
                    isEssence: dataStr.isEssence, //精品,
                    isUpper: dataStr.isUpper, //置顶,
                    style: dataStr.style == "0" ? false : true, //专访
                    topicName: dataStr.name, //话题名称
                    id: id, //话题ID
                    imgPath: imgPath,
                    facePicUrl: isMeihao ? dataStr.mAccount.imageUrl : dataStr.user.facePicUrl, // 话题 用户头像
                    nickName: isMeihao ? dataStr.mAccount.name : dataStr.user.nickname, //话题 用户名
                    iconExpert:iconExpert,//达人名称
                    iconMeihao:iconMeihao,//美号名称
                    //groupCircleName: dataStr.group.name, //来自圈子

                    lastReplyTime: dataStr.lastReplyTime, //话题时间
                    allNum: allNum, //评论数
                    //extGroupUrl: dataStr.ext.group_url, // 圈子路径

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
                    mshopFlag: dataStr.ext.mshop_flag,  //是否显示美店图标
                    mshopUrl: dataStr.ext.mshop_url,  //美店链接
                    coverPic: dataStr.coverPic,   //封面

                    is_del: dataStr.user.is_del,
                    isExpert: isExpert, //是否是达人
                    isMeihao: isMeihao, //是否是美号
                    userImage: userImage, //用户头像
                    groupId: data.data.groupId, //groupid
                    isExpertSign:isExpertSign,

                    isLoginStr: isLoginStr, //根据是否登陆判断显示 按钮内容
                    isLoginClass: isLoginClass, //根据是否登陆显示  样式
                    readyOnly: readyOnly, //根据是否登陆判断是  只读还是可写
                    showReport: showReport,  //举报
                    isGroupOwn: isMainUser(dataStr.group.createrId)

                }
                //填写数据
            addDivHtml(newMsg, function(){
                showTextareaTips();
                $("body").attr("data-module", Number($("body").attr("data-module")) + 1);
     
                if (allNum != 0) {
                    getCommentList({
                        id: id,
                        currPage: 1,
                        pageSize: 10,
                        listSize: 2
                    });
                }
                ListTopsValid.push({
                    "name": name,
                    "id": id
                });

                var topRightH = $("[data-topicrt='" + openTopicId + "']");
                var h = topRightH.children(".topic-r-t").height() + topRightH.children(".topic-position").height();

                $("[id-node='" + openTopicId + "']").css("min-height", h + "px");
            }); //添加数据到页面
            

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

        if ($("[id-node='" + id + "']").length > 0 && s > $("[id-node='" + id + "']").offset().top) {
            History.replaceState({}, name, id + ".html");
            OpenedTop.push({
                name: name,
                id: id
            });
            if ($no_next == 0 && arrayIdBoolean[arrayIdBoolean.length - 1] != id) {
                getNextTopicId(id);
                addVisitTopicId(id);
                //2017.12.15 zhaodonghong delete   b:价格之类数据由后端渲染
                //changeGoodsPrice(id);
            }
            getVideo();
            len++;
            currentId = id;
        }
    }

    if (ListTopsValid.length - 1 > len) {
        var id1 = ListTopsValid[len].id;
        var name1 = ListTopsValid[len].name;

        if ($("[id-node='" + id1 + "']").length > 0 && s > $("[id-node='" + id1 + "']").offset().top) {
            History.replaceState({}, name1, id1 + ".html");
            OpenedTop.push({
                name: name1,
                id: id1
            });
            len++;
            currentId = id1;
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
        currentId = nextiD;
    } else {
        id = OpenedTop[len].id;
        nextiD = OpenedTop[len - 1].id;
        name = OpenedTop[len - 1].name;
        currentId = id;
    }
    if (id) {
        //var scrollTop = $(this).scrollTop();
        if (t < $("[id-node='" + id + "']").offset().top) {
            History.replaceState({}, name, nextiD + ".html");
            OpenedTop.length = len;
            len--;
        }
    }
}

//右侧 固定
function topFixed(scrollTop) {

    var showTopicID = OpenedTop[OpenedTop.length - 1].id; //当前话题id

    var $showDiv = $("[id-node='" + showTopicID + "']"); //当前话题的div
    var $showRight = $showDiv.children(".topic-right "); //右侧整体
    var $thisScroll = $showRight.children("[data-node='topic_xi']"); // 滚动部分
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
var leftS = parseInt($(".wrap-box.ovflow-hid").css("margin-left"), 10) + 20;
function ulFixt(scrollTop) {
    var containerId = OpenedTop[OpenedTop.length - 1].id; //当前话题id
    var $divConter = $("[data-conter-ul='" + containerId + "']");
    var $ul = $($divConter).children("ul");
    var divTop = $divConter.offset().top;
    var divHeight = $divConter.height();
    var ulHeight = $ul.height();
    var s = divHeight + divTop - ulHeight;
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
        return $_CONFIG.i_domain + 'member/profileHome';
    } else {
        return $_CONFIG.group_domain + 'ta/' + id + '.html';
    }
}

function isMainUser(id){
    return isLogin == 1 && $_CONFIG['userId'] == id;
}

// 返回顶部a
function toTopBtn() {
    var $Btn = $("[data-node='top']");
    $Btn.off();
    var btnScroll = -1;

    $Btn.on("click", function() {

        var topicId = "";
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
            var dropTop = parseInt($("[id-node='" + topicId + "']").offset().top);
            $(window).scrollTop(dropTop);
            btnScroll = dropTop;
        }
        $(this).attr("data-btnScroll", btnScroll);
    })
}

var getModuleString = function(modulestr) {
    // var num = Number($("body").attr("data-module")) +1;
    // if(num <10 ){
    //     return modulestr+"000"+num;
    // }else if(num >=10 && num <1000 ){
    //     return modulestr+"00"+num;
    // }else if(num >=100 && num <100){
    //     return modulestr+"0"+num;
    // }else if( num >=1000 &&num <10000){
    //     return modulestr+""+num;
    // }
    return modulestr;
}

//IE显示placeholder内容
var showTextareaTips = function() {
    var $textareaTips = $('[data-node="textareaTips"]');
    if (identify()) {
        $textareaTips.removeClass('hide');
    }
}

function bindEvent(){
    $('body').on('click', '[data-node="topic-tab"] a', function(){
        var $this = $(this);
        if( $this.siblings().length > 0 && !$this.hasClass('active')){
            var $tabList = $this.parents('[data-node="hot_topics"]').eq(0).find('[data-node="topic-tab-list"]');
            var index =  parseInt($this.attr('data-index'), 10);
            $this.addClass('active').siblings().removeClass('active');
            $tabList.hide().eq(index).show();
        }
    }); 
}

var init = function() {
    bindEvent();
    getVideo();
    toTopBtn();
    History.Adapter.bind(window, 'statechange', function() {
        //var State = History.getState();
        //History.log('statechange:', State.data, State.title, State.hash);
    });
    showTextareaTips();
    //var topicRT = $(".topic-r-t").html(); // 右侧的html
    //var hotTopicUl = $("[data-node=hot_topics]").html(); //热门话题的html

    //获取下一个话题
    if ($no_next == 0) {
        getNextTopicId(clickTopicId);
    }
    addVisitTopicId(clickTopicId);

    //2017.12.15 zhaodonghong delete   b:价格之类数据由后端渲染
    /*Pubsub('getAreaId').sub(function() {
        changeGoodsPrice(clickTopicId);
    });*/

    var scrollTop = 0;
    var windowHight = $(window).height();
    var s = 0;
    var noneHeight = 0;
    //鼠标滚动事件
    $(window).on("scroll", function() {

        scrollTop = $(this).scrollTop();
        windowHight = $(window).height();
        s = parseInt(scrollTop + windowHight / 3);
        topFixed(scrollTop);
        ulFixt(scrollTop);
        var $current = $("[id-node='" + currentId + "']").parent();
        var moveDistance = Math.abs(scrollTop - lastScroll);
        // 视频暂停
        if (scrollTop - lastScroll > 0) { //下滑
            if( moveDistance > 50 ){

                //判断并加载话题
                addMoreEvent(s);
            }


        } else { //上滑

            if( moveDistance > 50 ){

                //改变ulr地址
                scrollToTop(s);
                $current.next().nextAll() !== 'none' && $current.next().nextAll().hide();

                if($current.prev().css('display') === 'none') {
                    $current.prev().show();
                    noneHeight = scrollTop + $current.prev().height();
                    $(window).scrollTop(noneHeight);
                }
            }
        }
        if( moveDistance > 50 ){
            
            if( oldCurrentId !== currentId ){
                if (scrollTop - lastScroll > 0) {
                    noneHeight = scrollTop - $current.prev().prev().height();
                    $current.prev().prevAll().css('display') !== 'none' && $current.prev().prevAll().hide();
                    $current.next().css('display') === 'none' && $current.next().show();
                    $(window).scrollTop(noneHeight);
                }
                oldCurrentId = currentId;
            }
        }

        lastScroll = scrollTop;
    });
}


module.exports = {
    init: init,
    topFixed: topFixed
}
