/**
 * 分享到 微信，QQ，微博，空间
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var getQRCode = require('utils/getQRCode');
var checkLoginStatus = require('module/checkLoginStatus');


var APIS = {
    qq: "http://connect.qq.com/widget/shareqq/index.html",
    sina: "http://v.t.sina.com.cn/share/share.php",
    qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
};

var defaultInfo = {
    url: 'http://www.gomeplus.com',
    title: '国美PlusAPP边玩边分享，购物不孤单',
    pic: 'http://www.gomeplus.com/images/logo.png', // logo图片地址
    summary: '国美PlusAPP边玩边分享，购物不孤单'
};

var open = function(url) {
    window.open(url);
};

// 分享按钮渲染
var hasShareBtnsHTML = false;
var initShareBtns = function() {
    var shareBtns = '<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>';
    $('body').append(shareBtns);
    hasShareBtnsHTML = true;
};
var showShareToBtns = function(style) {
    !hasShareBtnsHTML && initShareBtns();
    $('[data-node=shareBtnBox]').css({
        left: style.x,
        top: style.y
    }).show();
};

// 微信弹层渲染
var hasWeixinHTML = false;
var initWeixinHTML = function() {

    var weixinBox = '<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';
    $('body').append(weixinBox);
    hasWeixinHTML = true;
};

// pics: 图片参数是否为pics，默认是pic。
var formatParams = function(p, pics) {
    var s = [];
    var data = {
        title: p.title,
        url: p.url,
        summary: p.summary,
        desc: p.desc,
        site: p.site
    };
    if (pics) {
        data.pics = p.pic;
    } else {
        data.pic = p.pic;
    }
    for (var i in data) {
        s.push(i + '=' + encodeURIComponent(data[i] || ''));
    }
    return s.join('&');
};

// 单个调用方法
// 分享的图片多个用||隔开。
var shareTo = {
    weixin: function(options) {
        var link = getQRCode(options.url);
        !hasWeixinHTML && initWeixinHTML();

        $('[data-node=shareWeixinCode]')[0].src = link;
        $('.share-weixin').show();
        $('.wx-close').on('click', function() {
            $('.share-weixin').hide();
        });
    },
    qq: function(options) {
        var link = APIS.qq + '?' + formatParams(options, true);
        open(link);
    },
    sina: function(options) {
        var link = APIS.sina + '?' + formatParams(options);
        open(link);
    },
    qzone: function(options) {
        var link = APIS.qzone + '?' + formatParams(options, true);
        open(link);
    }
};

// share with kid
var shareWithKid = function(args) {
    var isRebate = args.isRebate === '0' ? false : true;
    fetch.get(url.get('shareGetGoodsKid'), {
        validate: isRebate,
        data: {
            skuId: args.skuId,
            itemId: args.itemId,
            parentKid: args.parentKid
        },
        async: false // 防止新窗口被拦截
    }).done(function(data) {
        if (data.success === true) {
            var kid = data.data.kid;
            var shareInfo = args.shareInfo;
            // 替换分享链接
            // 规则：mall_domain+product/shopid-productId.html?onlineUserId=xxxx&kid=xxxx
            var url = shareInfo.url;
            var index = url.indexOf('?');
            if (index > 0) {
                url = url.substring(0, index);
            }
            shareInfo.url = url + '?onlineUserId=' + shareInfo.onlineUserId + '&kId=' + kid;
            shareTo[args.shareto](shareInfo);
        } else {
            shareTo[args.shareto](args.shareInfo);
        }
    }).fail(function(data) {
        if (isRebate) {
            if (checkLoginStatus()) {
                shareTo[args.shareto](args.shareInfo);
            }
        } else {
            shareTo[args.shareto](args.shareInfo);
        }
    });
};

// 统一方法
var go = function(obj) {
    // {type:x,title:x,url:x,pic:x}
    var info = {
        title: obj.title || defaultInfo.title,
        url: obj.url || defaultInfo.url,
        pic: obj.pic || defaultInfo.pic,
        summary: obj.summary || '',
        desc: obj.desc || ''
    };

    !!shareTo[obj.type] && shareTo[obj.type](info);

};


/**
 * 简化分享
 * @param  {str} [parent] [容器节点]
 * @param {str} [selector] [子节点选择器]
 */
var shareItem = function(parent, selector, beforeShare) {
    var shareInfo = null;
    $item = typeof parent === 'string' ? $(parent) : parent;
    selector = selector || '[data-action=shareto]';
    // 显示分享按钮
    $item.on('mouseenter', selector, function(e) {
        var shareUrl = $(this).data('surl');
        var shareTitle = $(this).data('stitle');
        var sharePic = $(this).data('spic');

        shareInfo = {
            url: shareUrl,
            title: shareTitle,
            pic: sharePic
        };

        var pw = $(this).width();
        var ph = $(this).height();
        var px = ($(this).offset().left / 1 + pw / 2 - 80) + 'px';
        var py = ($(this).offset().top / 1 + (ph - 1)) + 'px';

        showShareToBtns({
            x: px,
            y: py
        });
        return false;
    });
    // 隐藏分享按钮
    $item.on('mouseleave', selector, function(e) {
        $('[data-node=shareBtnBox]').hide();
        return false;
    });

    $('body').on('click', '[data-shareto]', function(e) {
        e.preventDefault();
        shareType = $(this).data('shareto');
        shareInfo.type = shareType;
        beforeShare = beforeShare || function() {};
        beforeShare.call(null, shareInfo);
        // console.log(shareInfo);
        go(shareInfo);
    });

    $('body').on('mouseenter', '[data-node=shareBtnBox]', function() {
        $(this).show();
    });
    $('body').on('mouseleave', '[data-node=shareBtnBox]', function() {
        $(this).hide();
    });
};


module.exports = {
    share: go,
    shareto: shareTo,
    shareItem: shareItem,
    shareWithKid: shareWithKid
};

/**
 * 分享到 使用说明
 * 在[data-action=shareto]节点上输出要获取的数据 
 * data-surl,data-stitle,data-spic
 * url要是绝对地址，带https?://的
 * pic是要分享的图片绝对地址，多张图片用||隔开。
 *
 * 页面中在分享按钮加 [data-action=shareto] 自定义属性；
 * 如果是分享当前页面的也要加shareInfo,值为当前页面对应的信息。格式都一样。
 *
 * 调用方法:
 * var share = require(..);
 * share.shareItem(要分享的区域父节点字符串e.g. 'data-node=shareList');
 *
 * shareto.weixin({shareInfo})
 * shareto.qq({shareInfo})
 * shareto.sina({shareInfo})
 * shareto.qzone({shareInfo})
 *
 *
 * share.share({shareInfo});这个shareInfo里要有type：[weixin,qq,sina,qzone]
 */