//var alert = require('module/popup/alert');
var upload = require('module/popup/upload/uploader');
//var addBox = $('[data-node=addImgGoods]');
var confirm = require('module/popup/confirm');
var loginState = require('./../loginState');
var rotateImg = require('./rotateImg');
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var addImgTpl = require('./chooseImg.tpl');
var topFixed = require('../../topicAddMore/topicAddMore').topFixed; //右侧固定
var Pubsub = require('io/pubsub');
var channel = require('io/channel');

//插入二维码上传
var detectQr = require('module/popup/uploadfileQR');
//存储二维码
var codeArr = [];

var $showBox = $('[data-node="picPopBox"]');
var topicId = '';
var showImgBox = function() {

    $("body").on("click", '[data-node="addImg_btn"]', btnEvent)
        .on("click", "[data-node='addMoreImg']", addMoreImgFn) //+ tu
        .on("click", "[data-node='imgPics']", imgPicsBig)
        .on("click", '[data-node="imgBigHind"]', imgBigHindFn)
        .on("click", '[data-node="hideBigPic"]', hideBigPicFn)
        .on("click", '[data-node="imgBigPN"]', imgBigPNFn)
        .on("click", '[data-node="deletImg"]', deletImgFn)
        .on("click", '[data-node="showImg"]', showImgFn)
        .on("click", '[data-node="roteRo"]', rotateImg.init)
        .on("click", '[data-node="addImg_btn"]', picPopBoxEvent)
        .on("click", '[data-node="picPopBox"]', picPopBoxEvent)
        .on('click', codeBoxEvent);
}

var deletImgFn = function() {
    var $this = $($(this).parents().eq(2));
    var imgSrc = $this.children("a").children("img").attr("src");
    var ul = $this.parent();
    var $div = ul.parent();
    var imgLENG = parseInt($div.attr("data-imgnum"));
    //var arrImg=[];
    confirm('确认删除该图片？', {
        title: '提示',
        okCls: 'two-button two-button-red',
        cancelCls: 'two-button',
        btnWrapCls: 'text-center',
        ok: function() {
            $this.remove();
            var arriMG = ul.attr("data-imgsrt");
            var a = arriMG.split(',');
            var b = a;
            b.splice(imgSrc, 1);
            ul.attr("data-imgsrt", b);
            $div.attr("data-imgnum", imgLENG + 1);
            ul.children("[data-node='addMoreImg']").removeClass("hide");
            $div.parent().find("[data-node='addImg_btn']").removeClass("disabled");
            if (parseInt(imgLENG + 1) >= 9) {
                ul.addClass("hide");
            }
        }
    })
}
var addMoreImgFn = function() {
    var imgNum = $($(this).parents().eq(1)).attr("data-imgNum");
    topicId = $($(this).parents().eq(2)).children(".publish-face-bx").attr("data-publish");
    if (imgNum == 0) {
        return false
    } else {
        upload(imgNum, topicId); //
    }
}
var showImgFn = function() {
    var $this = $(this);

    if ($this.hasClass("active")) {
        return false;
    } else {
        var toPage = $(this).attr("data-active");
        var toImG = $($this.parents().eq(1)).children(".big-img").children(".img-hidden").children("[data-bigimg='" + toPage + "']");

        $(toImG).removeClass("hide").siblings().addClass("hide");
        var imgObj = $(toImG).children("img");
        if ($(imgObj).hasClass("srcError")) {
            $(imgObj).removeClass("srcError")
            $(imgObj).attr("src", $(imgObj).attr("data-imgsrc"));
        }
        $this.addClass("active").siblings().removeClass("active");
        var imgSrc = $($this.parents().eq(1)).children(".big-title").children("[data-node='imgBigSrc']");
        $(imgSrc).attr("href", $(imgObj).attr("data-imgsrc"));
    }

}
var imgBigPNFn = function() {
    var $this = $(this);
    var curPage = $($this.parents().eq(1)).children(".img-slide").children(".active").attr("data-active");
    curPage = parseInt(curPage);

    var toPage = null;
    var tootalPage = parseInt($this.parent().attr("data-piclength")) - 1;

    if ($this.attr("data-page") == "pre") {
        if (curPage == 0) {
            toPage = tootalPage;
        } else {
            toPage = curPage - 1;
        }
    } else {
        if (curPage == tootalPage) {
            toPage = 0;
        } else {
            toPage = curPage + 1;
        }
    }
    // 图片更改
    $($this.parents().eq(1)).children(".img-slide").children("[data-active='" + toPage + "']").click();

}
var hideBigPicFn = function() {
    var divObj = $(this).parents().eq(2);
    var parentObj = $(this).parents().eq(3);
    $(divObj).addClass("hide");
    $(parentObj).children("ul").removeClass("hide");
    topFixed($(window).scrollTop());
}

//大图隐藏
var imgBigHindFn = function() {
        var divObj = $(this).parents().eq(1);
        var parentObj = $(this).parents().eq(2);
        $(divObj).addClass("hide");
        $(parentObj).children("ul").removeClass("hide");
        topFixed($(window).scrollTop());
    }
    // 评论列表中大图展示
var imgPicsBig = function() {
    var parentObj = $(this).parents().eq(1);
    var ulObj = $(this).parents().eq(0);
    var divBig = $(parentObj).children("[data-node='imgBigPic']");
    $(ulObj).addClass("hide");
    divBig.removeClass("hide");

    //大图定位显示
    var pageId = $(this).attr("data-imgsort");
    //获取当前大图节点
    //div
    var thisBigPic = divBig.children(".big-img").children(".img-hidden").children("[data-bigimg='" + pageId + "']");
    var thisImage = $(thisBigPic).children("img"); //img

    $(thisBigPic).removeClass("hide").siblings().addClass("hide");
    if ($(thisImage).hasClass("srcError")) {
        $(thisImage).removeClass("srcError")
        $(thisImage).attr("src", $(thisImage).attr("data-imgsrc"));
    }

    var aBtn = divBig.children(".img-slide").children("[data-active='" + pageId + "']");
    $(aBtn).addClass("active").siblings().removeClass("active");
    //查看原图 添加链接
    var $imgSrc = divBig.children(".big-title").children("[data-node='imgBigSrc']");
    $($imgSrc).attr("href", $(thisImage).attr("data-imgsrc"));
    topFixed($(window).scrollTop());
}

//添加图片按钮事件
var btnEvent = function() {

    if (!checkLoginStatus()) {
        loginState.popUnion();
        return false;
    }

    var imgNum = $(this).parents().eq(1).children("[data-node='addImgGoods']").attr("data-imgNum");
    topicId = $(this).parent().attr("data-publish");
    $('[data-node="picPopBox"]').removeClass('webuploader-element-invisible');
    $('div[tabindex]').remove();
    if (imgNum == 0) {
        return false
    } else {
        code(topicId, $(this));
        upload(imgNum, 9);
    }
}
Pubsub(channel.setPubliser.changeImage).sub(function(data) {
    setImage(data, topicId);
});
var setImage = function(data, topicId) {
    if (data.images.length > 0) {
        var arrImg = [];
        var $div = $("[data-tid=" + topicId + "]").children("[data-node='addImgGoods']");
        var num = parseInt($div.attr("data-imgNum"));
        var nextnum = parseInt(num - data.images.length);
        $div.attr("data-imgNum", nextnum);
        var $ul = $("[data-tid='" + topicId + "']").find("[data-node='imgUl']");
        $ul.addClass("topic-imglist");
        var imgsrt = $ul.attr("data-imgsrt");
        var pictureHTML = addImgTpl(data);
        $ul.removeClass("hide").append(pictureHTML);
        if (imgsrt) {
            arrImg.push(imgsrt);
        }
        for (var i = 0; i < data.images.length; i++) {
            arrImg.push(data.images[i]);
        }
        $ul.attr("data-imgsrt", arrImg);
        var lengthImg = parseInt($ul.parent().attr("data-imgNum"));
        if (lengthImg <= 0) {
            $("[data-tid=" + topicId + "]").find("[data-node='addImg_btn']").addClass("disabled");
        }
    } else {
        return false;
    }

}

//图片二维码弹窗显示隐藏
var picPopBoxEvent = function(e) {

    $('[data-node="faceBox"]').hide();
    e.stopPropagation();
}

//body点击事件,二维码弹窗隐藏
var codeBoxEvent = function(e) {
    $showBox.hide();
}

var code = function(topicId, $this) {

    if (!window.topicQrId) {

        window.topicQrId = [];
    }
    topicId = 's' + topicId;
    //var arr = window.topicQrId;
    if (!window.topicQrId[topicId]) {

        var obj = {
            qid: topicId,
            time: 2000,
            $showBox: $showBox,
            customCb: customCb,
            $insertDom: "",
            $target: $this,
            type: 'detail',
            maxNum: 9
        }

        $.extend(obj, {
            $parent: $this.parents('[data-node="comment_Msg"]').find('[data-node="imgUl"]'),
        })
        window.topicQrId[topicId] = new detectQr(obj)

        window.topicQrId[topicId].init();

    } else {
        var _newObj = window.topicQrId[topicId]
        if (!_newObj.useNewCode) {
            _newObj.getCode();
        } else {
            if (!_newObj.checkShow()) {

                _newObj.show();
                _newObj.sendNum();
            } else {
                _newObj.hide();
            }
        }
    }
}

var customCb = function(data, obj) {
    var _this = obj;
    topicId = obj.qid.slice(1);
    var imgs = {}; //为了做兼容性 处理
    imgs.images = data;
    setImage(imgs, topicId);
}

//添加事件
var addEvent = function() {
    showImgBox();
}

module.exports = {
    init: addEvent
};
