require('../../plugin/jquery.bxslider');
var slider = require('../../page/goodInfo/leftSlider');
var share = require('module/share');
// var fetch = require('io/fetch');
// var url = require('io/url');
// var Pubsub = require('io/pubsub');
var addShopCar = require('module/addShopCar');
var buynow = require('module/buynow');
var shopCollect = require('module/shopCollect');
var productCollect = require('module/productCollect');
var paramsCheck = require('../../page/goodInfo/paramsCheck');
var getMoreDiscuss = require('../../page/goodInfo/moreDiscuss');
// var couponSort = require('module/couponSort');
var imgPreviewer = require('./imgPreviewer'); // 评论图片预览
var getRedTicket = require('./getCoupon');
var getQRCode = require('utils/getQRCode');
// var infoData = $GLOBAL_CONFIG.sku_list;
var shortcutBanner = require('module/shortcutBanner');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('commodityDetail');

var $goodInfoBox = $('div[data-node="topGoodInfo"]');
// var $leftBox = $goodInfoBox.find('[data-node="topleft"]');
var $coupon = $goodInfoBox.find('[data-active="coupon"]');
var $sale = $goodInfoBox.find('[data-node="sale"]');
// var $redList = $goodInfoBox.find('[data-node="redlist"]');
// var $shopCollect = $('[data-action="shopCollect"]');
// var $addShopCar = $goodInfoBox.find('[data-action="addShopCar"]');
var $leftSmall = $goodInfoBox.find('[data-node="leftSmallBox"]');
// var $upBtn = $goodInfoBox.find('[data-action="sliderTop"]');
// var $downBtn = $goodInfoBox.find('[data-action="sliderDown"]');
// var $buyBtn = $goodInfoBox.find('[data-action="buybtn"]');
// var $proCollect = $goodInfoBox.find('[data-action="collectProduct"]');
var $goodInfo = $('[data-node="goodToDo"]');
var $shareBtn = $('[data-action="shareto"]');
var $collectProNum = $goodInfoBox.find('[data-node="proAddnum"]');
// var $collectProError = $goodInfoBox.find('[data-node="collectProError"]');
var $collectProSuccess = $goodInfoBox.find('[data-node="collectProSuccess"]');
var $collectProClose = $collectProSuccess.find('[data-action="collectProClose"]');
var $stockBox = $goodInfoBox.find('[data-node="stockBox"]');
$_CONFIG.oldStock = parseInt($stockBox.attr('data-sumstock'), 10);

//店内推荐

require('./Choose').init();

//快捷导航
shortcutBanner.init();
var /*topSlider,
    shopId = $_CONFIG.shopId,*/
    productId = $_CONFIG.productId/*,
    islogin = $_CONFIG.islogin*/; //$GLOBAL_CONFIG.islogin  //0=>未登录 1=>登录

//点击手机购买，现实二维码  lyl 7.12
var $showQRCode = $("[data-action=showQRCode]");
var $showQRCodeEm = $showQRCode.children("em");
var $showQRCodeP = $showQRCode.children("p");
var wap_url = getQRCode($_CONFIG['qr_url']);
var state = 0;
var addUrl = "no";

if (!$goodInfo.hasClass('disabled')) {
    //收货地址
    require('./addressCheck').init();
    //参数切换
    paramsCheck();
    //加入购物车
    addShopCar({
        selector: '[data-action="addShopCar"]'
    }, {
        proNum: ~~$.trim($goodInfoBox.find('[data-node="count"]').val())
    });
    //立即购买
    buynow($goodInfoBox);
}
//左侧轮播图
slider.init();

//在线商品图文详情
require('./inlineInfo').init();

//更多评论
getMoreDiscuss();

//tab切换

require('./tab').init();
//分享
var shareInfo = {
    url: window.location.href,
    title: document.title,
    onlineUserId: $_CONFIG.onlineUserId
};

// 发送统计数据
var analytic = function(channel) {
    BP.send({
        event_id: 'G000P017',
        shop_id: $_CONFIG['shopId'],
        product_id: $_CONFIG['productId'],
        channel_id: channel || ''
    });
};

$shareBtn.on('click', '[data-shareto="weixin"]', function() {
    analytic('out-weixin');
    var imgList = [],
        $imgList = $leftSmall.children();
    for (var i = 0, len = $imgList.length; i < len; i++) {
        imgList.push($imgList.eq(i).find('img').attr('src'));
    }
    shareInfo.pic = imgList.join('||');
    shareInfo.url = $_CONFIG.weixin_share;

    share.shareWithKid({
        skuId: $_CONFIG.skuId,
        itemId: productId,
        parentKid: $_CONFIG.kid,
        shareInfo: shareInfo,
        isRebate: $_CONFIG.isRebate,
        shareto: 'weixin'
    });
    // share.shareto.weixin(shareInfo);
}).on('click', '[data-shareto="qq"]', function() {
    analytic('out-QQ');
    var imgList = [],
        $imgList = $leftSmall.children();
    for (var i = 0, len = $imgList.length; i < len; i++) {
        imgList.push($imgList.eq(i).find('img').attr('src'));
    }
    shareInfo.url = window.location.href;
    shareInfo.pic = imgList.length > 0 ? imgList.join('||') : $_CONFIG.imgpath + '/images/public/logo.png';
    shareInfo.title = $goodInfoBox.find('h3').text();
    shareInfo.summary = '这是我在国美Plus找到的好东西，就知道你会喜欢。';
    share.shareWithKid({
        skuId: $_CONFIG.skuId,
        parentKid: $_CONFIG.kid,
        itemId: productId,
        isRebate: $_CONFIG.isRebate,
        shareInfo: shareInfo,
        shareto: 'qq'
    });
    // share.shareto.qq(shareInfo);
}).on('click', '[data-shareto="sina"]', function() {
    analytic('out-xlwb');
    var imgList = [],
        $imgList = $leftSmall.children();
    for (var i = 0, len = $imgList.length; i < len; i++) {
        imgList.push($imgList.eq(i).find('img').attr('src'));
    }
    shareInfo.url = window.location.href;
    shareInfo.pic = imgList.length > 0 ? imgList.join('||') : $_CONFIG.imgpath + '/images/public/logo.png';
    shareInfo.title = $goodInfoBox.find('h3').text() + '我心仪的这款商品，到底是在国美Plus找到了。';
    share.shareWithKid({
        skuId: $_CONFIG.skuId,
        itemId: productId,
        parentKid: $_CONFIG.kid,
        isRebate: $_CONFIG.isRebate,
        shareInfo: shareInfo,
        shareto: 'sina'
    });
    // share.shareto.sina(shareInfo);
}).on('click', '[data-shareto="qzone"]', function() {
    analytic('out-Qqzone');
    var imgList = [],
        $imgList = $leftSmall.children();
    for (var i = 0, len = $imgList.length; i < len; i++) {
        imgList.push($imgList.eq(i).find('img').attr('src'));
    }
    shareInfo.title = $goodInfoBox.find('h3').text();

    shareInfo.url = window.location.href;
    shareInfo.summary = '我心仪的这款商品，到底是在国美Plus找到了。';
    shareInfo.pic = imgList.length > 0 ? imgList.join('||') : $_CONFIG.imgpath + '/images/public/logo.png';
    share.shareWithKid({
        skuId: $_CONFIG.skuId,
        itemId: productId,
        parentKid: $_CONFIG.kid,
        isRebate: $_CONFIG.isRebate,
        shareInfo: shareInfo,
        shareto: 'qzone'
    });
    // share.shareto.qzone(shareInfo);
});

//促销
$sale.on('click', function(e) {
    e.stopPropagation();
    var $list = $(this).find('ul');
    if ($list.css('display') !== 'none') {
        $list.hide();
    } else {
        $list.show();
    }
});

$(document).on('click', function(e) {
    e.stopPropagation();
    $sale.find('ul').hide();
    $coupon.next().hide();
});

//优惠券
if ($coupon.length > 0) {
    getRedTicket.init();
}

//收藏 店铺
shopCollect({
    selector: '[data-action="shopCollect"]'
}, function(isAdd) {
    isAdd ? $(this).text('取消收藏店铺') : $(this).text('收藏店铺');
});

//收藏商品
//收藏商品
productCollect('[data-node="topGoodInfo"]', '[data-action="collectProduct"]', {
    onCollect: function() {
        $collectProNum.show().animate({
            'top': '-20px'
        }, 500, function() {
            $collectProNum.css('top', 0).hide();
        });
        $collectProSuccess.show();
    },
    mode: 'goodInfoCollect',
    onUnCollect: function() {
        $collectProSuccess.hide();
    },
    onFailed: function() {
        $collectProClose.show();
        setTimeout(function() {
            $collectProClose.hide();
        }, 2000);
    }
});

$collectProClose.on('click', function() {
    $(this).parents('[data-node="collectProSuccess"]').hide();
});

//点击手机购买，现实二维码  lyl 7.12
$showQRCode.on("click", function() {
    if (addUrl === "no") {
        $showQRCodeP.children("img").attr("src", wap_url);
        addUrl = "yes";
    }

    if (state === 0) {
        state = 1;
        $showQRCodeEm.eq(0).css('display','inline-block').next().css('display','none');
        $showQRCodeP.css("display", "block");
    } else {
        state = 0;
        $showQRCodeEm.eq(0).css('display','none').next().css('display','inline-block');
        $showQRCodeP.css("display", "none");
    }
});

imgPreviewer.init();

// 商品图放大
require('./imgZoom');