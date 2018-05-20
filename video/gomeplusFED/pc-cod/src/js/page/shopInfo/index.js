var praise = require('module/praise'),
    getRedTicket = require('./getTicket'),
    shareto = require('module/share').shareto,
    shopCollect = require('module/shopCollect'),
    fetch = require('io/fetch'),
    url = require('io/url'),
    moreList = require('../../widget/shopInfo/shopInfo');
var shopSelect = require('./shopSelect');
var shortcutBanner = require('module/shortcutBanner');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('shopDetail');


var $shopTop = $('[data-node="shopTop"]'),
    $love = $shopTop.find('[data-action="love"]'), //点赞
    $loveNum = $love.find('[data-node="loveNum"]'), //点赞数量
    $collect = $shopTop.find('[data-action="collect"]'), //收藏
    $collectNum = $collect.find('[data-node="collectNum"]'),
    $redTicketBox = $('[data-node="couponBox"]'),
    // $share = $shopTop.find('[data-action="shareto"]'),
    $shareBox = $('[data-node="shareBtnBox"]'),
    $goodBox = $('[data-node="goodsBox"]'),
    $goodList = $goodBox.find('ul'),
    $moreBtn = $goodBox.find('[data-action="moreGoods"]');

var loveNum = ~~$loveNum.text();


//
shopSelect.init();
//点赞
praise('[data-node="shopTop"]', '[data-action="love"]', {
    onPraise: function(result) {
        loveNum++;        
        $loveNum.text(loveNum);
    },
    onUnPraise: function(result) {
        loveNum--;
        $loveNum.text(loveNum);
    },
    onPraised: function(result) {
        $love.find('em').addClass('active');
        $loveNum.text(loveNum);
    }
});

//收藏
//收藏 店铺
shopCollect({
    selector: '[data-action="collect"]',
    parent: '[data-node="shopTop"]'
}, function(isAdd) {
    isAdd ? $collectNum.text(~~$collectNum.text() + 1).prev().addClass('active') : $collectNum.text(~~$collectNum.text() - 1).prev().removeClass('active');
});

//领取优惠券
getRedTicket.init();


//快捷导航
shortcutBanner.init();

//分享
var shareTimer = null,
    $shareBtnBox = $('[data-node="shareBtnBox"]'),
    shareInfo = {},
    pcUrl = '';
var shareTitle = '';
$('[data-node="shopTop"]').on('mouseenter', '[data-action="shareto"]', function() {
        pcUrl = $(this).data('surl');
        if ($.isEmptyObject(shareInfo)) {
            shareInfo = {
                url: $(this).data('surl'),
                title: $(this).data('stitle'),
                pic: $(this).data('spic') === '' ? $_CONFIG.imgpath + '/images/public/logo.png' : $(this).data('spic')
            };
            shareTitle = $(this).data('stitle');
        }
        $shareBtnBox.css({
            top: $(this).offset().top + 30,
            left: $(this).offset().left - ~~$('[data-node="shareBtnBox"]').width() / 2 + ~~$(this).width() / 2
        }).show();
        // 发送统计数据
        BP.send({
            event_id: 'B000P019',
            shop_id: $GLOBAL_CONFIG['shopId']
        })
    })
    .on('mouseleave', '[data-action="shareto"]', function() {
        shareTimer = setTimeout(function() {
            $shareBtnBox.hide();
        }, 100)
    });
$shareBtnBox.on('mouseenter', function() {
        clearTimeout(shareTimer);
    })
    .on('mouseleave', function() {
        $(this).hide();
    });
// 发送统计数据
var analytic = function(channel) {
    BP.send({
        event_id: 'B000P016',
        shop_id: $GLOBAL_CONFIG['shopId'],
        channel_id: channel || ''
    });
};
//验证图片是否为图片类型以及是否为默认图片
var headPic = $shopTop.find('img').attr('src');
var isDefault = function(src) {
    if (src == 'https://i-pre.meixincdn.com/v1/img/T1gyVTBmLT1R4cSCrK.png' || src == 'https://i6.meixincdn.com/v1/img/T1YFxTByJT1R4cSCrK.png' || src == 'https://i-pre.meixincdn.com/v1/img/T1TaVTB7LT1R4cSCrK.png') {
        return false;
    }
    return true;
};
var isPic = function(src) {
    var reg = /\w+\.(jpg|gif|bmp|png)$/;
    if (isDefault(src)) {
        return reg.test(src);
    } else {
        return false;
    }
};
// shop_id，channel_id（out-weixin,out-QQ,out-xlwb，out-Qqzone）
$shareBtnBox.on('click', '[data-shareto="weixin"]', function() {
    shareInfo.url = $GLOBAL_CONFIG.weixin_share;
    shareInfo.title = shareTitle;
    shareto.weixin(shareInfo);
    analytic('out-weixin');
}).on('click', '[data-shareto="qq"]', function() {
    shareInfo.url = pcUrl;
    shareInfo.title = shareTitle;
    shareInfo.summary = '我发现了前所未有的好店，不如，你也来逛逛？';
    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
    shareto.qq(shareInfo);
    analytic('out-QQ');
}).on('click', '[data-shareto="sina"]', function() {
    shareInfo.url = pcUrl;
    shareInfo.title = shareTitle + ',这是我费尽千辛万苦找到的超级好店。';
    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
    shareto.sina(shareInfo);
    analytic('out-xlwb');
}).on('click', '[data-shareto="qzone"]', function() {
    shareInfo.url = pcUrl;
    shareInfo.title = shareTitle;
    shareInfo.summary = '这是我费尽千辛万苦找到的超级好店。';
    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
    shareto.qzone(shareInfo);
    analytic('out-Qqzone');
});
//加载更多
var morePage = 2,
    shopId = $GLOBAL_CONFIG.shopId;

$moreBtn.on('click', function() {
    var text = $(this).html(),
        _this = this;
    if (!$(_this).hasClass('disabled')) {
        $(_this).addClass('disabled').html('<span><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...</span>');
        fetch.get(url.get('moreGoods'), {
            data: {
                shop_id: ~~$GLOBAL_CONFIG.shopId,
                type: ~~$GLOBAL_CONFIG.type,
                pageNum: morePage,
                numPerPage: 15
            }
        }).done(function(result) {
            var data = result.data.itemList;
            if (data.length < 15) {
                $(_this).html('<span>没有可加载内容</span>');
            } else if (data.length == 0) {
                $(_this).html('<span>没有可加载内容</span>');
            } else {
                $(_this).removeClass('disabled').html(text);
            }
            moreList(data, shopId);
            morePage++;
        });
    }

});