/**评论一级列表**/
var changeContent = require('./changeContent'); //评论内容转换
var fetch = require('io/fetch');
var url = require('io/url');
var checkLoginStatus = require('module/checkLoginStatus'); // 登陆判断
var face = require('module/popup/face/face');
var fromNow = require('utils/fromNow');
var commentList = require('./commentList.tpl');
var addImageTpl = require('./addImageTpl.tpl');
//var fixedTopic = require('../fixedTopic');

var $is_Login = checkLoginStatus() == true ? 1 : 0; // 判断登陆状态
//var  $LoginSrc = $_CONFIG.passport_domain; //登录注册域名
var $mall_domain = $_CONFIG['product_item_gome']; // 商城
var $userIsExpert = $_CONFIG['isExpert']; // 当前用户是否为达人

var $secondCom_Key = $("[data-node='secondCom_Key']");

var LoadListStr = "[data-node='loadlist']";
var LoadtingStr = "[data-node='loading']";
//var NoLoadStr = "[data-node=noload]";
function checkUser(replyItem, type){
    var userId =  $_CONFIG['userId'];
    return type ? ($_CONFIG['islogin'] == 1 && ( userId == replyItem.createrId ||userId == replyItem.groupCreaterId ||userId == replyItem.topicCreaterId )) : ($_CONFIG['islogin'] == 1 && ( userId == replyItem.creatorId ||userId == replyItem.groupCreatorId ||userId == replyItem.topicCreatorId ));
}
/*
 *修改传参方式，改为object方便参数扩展
*/
var getCommentList = function(options) {

    var id = options.id;
    var currPage = options.currPage;
    var pageSize = options.pageSize;
    var listSize = options.listSize;
    var nodelist = options.nodelist;
    var $hidDiv = $("[id-node='" + id + "']").children(".topic-lfet").children("[data-node='hidDiv']");

    var $thisObjId = $("[data-circlecom='" + id + "']"); //每个话题的评论容器
    var $ComTopicId = $thisObjId.parent(".bjfff");
    //var $ComTopicId = $("[data-ComTopicId="+id+"]");
    var $loadlist = $($ComTopicId.children(LoadListStr));
    var $loading = $($ComTopicId.children(LoadtingStr));
    //var $noload = $($ComTopicId.children(NoLoadStr));

    $loadlist.css("display", "none");
    $loading.css("display", "block");

    var currUserImg = $("[data-tid='" + id + "']").attr("data-headface");
    var paramList = '?page=' + currPage + '&pagesize=' + pageSize + '&topicid=' + id;

    fetch.get(url.get('commentListUrlV2') + paramList).then(function(data) {

        if (data.success) {
            //获取所有的一级评论
            //console.log(data);
            var topicReplys = data.data.topicReplys;
            // var windowHeight = parseInt($(window).height());
            var height = $("[data-comtopicid='" + id + "']").offset().top;
            if (topicReplys.length > 0) {

                //显示 正在加载中
                $loading.css("display", "block");
                $loadlist.css("display", "block").attr("data-addMorePages", currPage).attr("data-ListSize", pageSize);
                var appendHtml = '';
                for (var i = 0; i < topicReplys.length; i++) {

                    //获取每个评论下的二级评论
                    var topicMsg = topicReplys[i];
                    var subReplyQuantity = topicMsg.subReplyQuantity; //二级回复的总数
                    var subTop = topicMsg.topicSubReplys; //二级回复
                    var replySecArr = []; //二级评论数组

                    //判断是否显示  查看更多按钮
                    var showNum = null;
                    var dlShowBorder = null;
                    var showMall = null;
                    if (subReplyQuantity > listSize) {
                        showMall = true;
                        dlShowBorder = "clearfix";
                        showNum = listSize;
                    } else {
                        showMall = false;
                        showNum = subTop.length;
                        dlShowBorder = "clearfix bd-bottom";
                    }
                    var UserId = checkUserId(topicMsg.user.id);
                    var showReport = ($is_Login == 1) && ($_CONFIG['userId'] != topicMsg.user.id) ? true : false;
                    var showSecComm = showNum > 0 ? "" : "hide";
                    for (var j = 0; j < showNum; j++) {
                        var subTopMsg = subTop[j];
                        if (subTopMsg) {
                            // console.log(subTopMsg.creatorId +" " +subTopMsg.user.id);
                            //判断是二级评论还是三级评论
                            var replayToPub = null;
                            var beReplyUserName = "";
                            var beReplyUserId = "";
                            var threeUserId = "javascript:;";
                            if (subTopMsg.topicSubReplyUser) {
                                // 三级回复

                                replayToPub = true;
                                beReplyUserName = subTopMsg.topicSubReplyUser.nickname;
                                beReplyUserId = subTopMsg.topicSubReplyUser.id;
                                threeUserId = checkUserId(beReplyUserId)
                            } else {
                                //二级回复
                                replayToPub = false;
                            }

                            var contentSed = subTopMsg.content;
                            contentSed = changeContent(contentSed);
                            var SenUserId = "";
                            if (subTopMsg.user) {
                                SenUserId = checkUserId(subTopMsg.user.id);
                            }
                            //var SenUserId =  checkUserId(subTopMsg.user.id);

                            //二级回复中参数
                            var replySecMsg = {
                                "threeUserId": threeUserId,
                                "SenUserId": SenUserId,
                                "parentCommentId": topicMsg.id, //话题id
                                // "topicId": topicId, //
                                "replayToPub": replayToPub, //判断是二级回复还是三级回复
                                "content": contentSed, //回复内容
                                "replyUserName": subTopMsg.user.nickname, //回复人昵称
                                "replyUserId": subTopMsg.user.id, //回复人id
                                "beReplyUserName": beReplyUserName, //被回复人的昵称
                                "beReplyUserId": beReplyUserId, //被回复人的id
                                "replyCommentId": subTopMsg.id, // 二级回复内容id
                                "sCanDelete": checkUser(subTopMsg, 0),
                                "commentId": subTopMsg.id
                            }
                            replySecArr.push(replySecMsg);

                        }

                    }

                    var content = topicMsg.content; //获取一级评论内容
                    content = changeContent(content);
                    var imageStr = "";
                    if( topicMsg.pics ){

                        var topicPic = topicMsg.pics; //一级评论的图片
                        //var str = "";
                        if (topicPic.length > 0) {
                            var imgsrcPic = {
                                picsSrc: topicPic,
                                picture: topicMsg.pictures,
                                length: topicPic.length
                            }
                            imageStr = addImageTpl(imgsrcPic);

                            //addImageTpl
                            // var imgArr = topicPic;
                            // var imgArrLen = imgArr.length;

                            // $.each(imgArr, function(index, img) {
                            //     str += '<li><a href="javascript:;"><img src="'+img+'"></a></li>';
                            //     //str += "</br><img     data-original=" + img + "  >";
                            // })
                            // imageStr =  '<ul class="clearfix comments-imglist">'+str+'</ul>';
                        }
                    }
                    //content = content + str;
                    //商品参数添加

                    var itemsPic = ""; //商品图标
                    var itemShopName = ""; //
                    var itemPrice = "";
                    var shopId = "";
                    var itemShopId = "";
                    var itemShopNameItem = "";
                    var skuId = "";
                    //var rebate = "";
                    //var rebateSummary = "";
                    if (topicMsg.item) {

                        itemsPic = topicMsg.item.mainImage;
                        itemShopNameItem = topicMsg.item.name;
                        itemPrice = topicMsg.item.salePrice !== null ? topicMsg.item.salePrice : '暂无售价';
                        shopId = topicMsg.item.id;
                        itemShopId = topicMsg.item.id;
                        skuId = topicMsg.skuId;
                        //rebate = topicMsg.item.rebateSummary.mostRebate;
                        // rebateSummary = topicMsg.item.rebateSummary; //返利金额

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
                        "showSecComm": showSecComm,
                        "imageStr": imageStr,
                        "itemShopNameItem": itemShopNameItem,
                        "UserId": UserId,
                        "dlShowBorder": dlShowBorder,
                        "showMall": showMall,
                        "userIsExpert": $userIsExpert, //当前用户是否是达人
                        "isExpert": topicMsg.user.isExpert, //是否是达人
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
                        //"mall_domain": topicMsg.item && topicMsg.item.itemId && ($.trim(topicMsg.item.pricetype) === 'PUSHBUYPRICE' || $.trim(topicMsg.item.pricetype) === 'TUANPRICE') ? $_CONFIG["product_item_gome"] : $mall_domain, 
                        
                        "mall_domain": $_CONFIG["product_item_gome"],
                        "itemsPic": itemsPic,
                        "itemShopName": itemShopName,
                        "itemPrice": itemPrice,
                        "shopId": shopId,
                        "itemShopId": itemShopId,
                        "skuId":skuId ? "-" + skuId : "",
                        // 店铺参数
                        "redPackage": redPackage,
                        "shopPic": shopPic,
                        //举报
                        "showReport": showReport,
                        //"rebate": rebate,
                        "kid": topicMsg.kid,
                        "canDelete": checkUser(topicMsg, 1),
                        "subReplyQuantity": topicMsg.subReplyQuantity,
                        "userQuantity": topicMsg.like.userQuantity,
                        "isLike": topicMsg.like.isLike,
                        "pricetype": topicMsg.item ? $.trim(topicMsg.item.pricetype) : '',
                        "itemId": topicMsg.item && topicMsg.item.itemId ? topicMsg.item.itemId : ''

                    }
                    var item = commentList(showDateList);
                    appendHtml += item;
                    //$circleCom.append($(item));

                }
                $thisObjId.append(appendHtml);
                appendHtml = '';
                $loading.css("display", "none");
                $loadlist.css("display", "block");

                $thisObjId.find('img').lazyload({
                    effect: "fadeIn"
                });

                //没有登录时不显示 “回复”
                if ($is_Login == "0") {
                    $secondCom_Key.css("display", "none");
                }
                if (topicReplys.length < pageSize) {
                    $loadlist.css("display", "none");
                }
                /*if (nodelist) {
                    $(window).scrollTop(height);
                }*/
            } else {
                $loading.css("display", "none");
                if (pageSize == 1) {
                    $hidDiv.css("display", "none");
                }
            }
            if( options.reGet ){
                $("[id-node='" + id + "']").find('[data-node="topic-allNum"]').text(data.data.subReplyTotal + data.data.total);
            }
        } else {
            $loadlist.css("display", "none");
            // $noload.css("display", "block");
            $loading.css("display", "none");
        }

    });

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

module.exports = getCommentList;
