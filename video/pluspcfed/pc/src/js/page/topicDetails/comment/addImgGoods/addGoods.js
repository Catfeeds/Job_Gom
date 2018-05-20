//var addBox = $('[data-node=addImgGoods]');
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var dialog = require('module/addGoods');
var Pubsub = require('io/pubsub');
var pubName = require('io/channel');
var goodsInTpl = require('./goodsIn.tpl');
var loginState = require('./../loginState');
var curTopicId = "";

var showGoodsBox = function() {

    Pubsub(pubName.setPubliser.changedItem).sub(setGoods);
    $("body").on("click", "[data-node=addGoods_btn]", function() {

        // 判断是否登陆，没登录，显示登录框
        if (!checkLoginStatus()) {
            loginState.popUnion();
            return false;
        }

        var $comment_Msg = $(this).closest("[data-node=comment_Msg]");
        curTopicId = $comment_Msg.attr("data-tid");
        var $addImgGoods = $comment_Msg.find("[data-node='addImgGoods']");
        if ($addImgGoods.hasClass("hasGoods") || $(this).hasClass("disabled")) {
            return false;
        } else {
            var changedGoods = {};
            dialog(changedGoods, 1);

        }

    });
    //删除商品
    $("body").on("click", "[data-node='deletGoods']", function() {
        var $comment_Msg = $(this).closest("[data-node='comment_Msg']");
        $comment_Msg.find("[data-node='addImgGoods']").removeClass("hasGoods").attr("data-goodStr", "");
        $(this).parent().remove();
        $comment_Msg.find("[data-node='addGoods_btn']").removeClass("disabled");
    });
}

//
var setGoods = function(data) {
    //将商品添加到div
    var goodsData = data;
    var comment_Msg = $("[data-tid=" + curTopicId + "]");
    var $addImgGoods = comment_Msg.children("[data-node='addImgGoods']");
    for (var key in goodsData) {
        var v = goodsData[key];
        var strGood = {
            "pid": v.PId,
            "skuId": v.skuId,
            "img": v.img,
            "link": v.link,
            "price": v.price,
            "shopId": v.shopId,
            "title": v.title,
            //"rebate": v.rebate,
            "skuId":v.skuId
        }
    }

    if (strGood != "undefined") {
        $addImgGoods.attr("data-goodStr", JSON.stringify(strGood));
    }

    var item = goodsInTpl(strGood);
    $addImgGoods.prepend(item).addClass("hasGoods");
    comment_Msg.find("[data-node='addGoods_btn']").addClass("disabled");
}

module.exports = {
    init: showGoodsBox
};
