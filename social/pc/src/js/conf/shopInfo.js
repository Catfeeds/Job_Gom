webpackJsonp([32],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var praise = __webpack_require__(256),
	    getRedTicket = __webpack_require__(257),
	    shareto = __webpack_require__(123).shareto,
	    shopCollect = __webpack_require__(175),
	    fetch = __webpack_require__(2),
	    url = __webpack_require__(28),
	    moduleTrim = __webpack_require__(51),
	    newGoods = __webpack_require__(258),
	    moreList = __webpack_require__(260),
	    dynamic = __webpack_require__(262);
	var shopSelect = __webpack_require__(265);
	var shortcutBanner = __webpack_require__(187);
	var tab = __webpack_require__(266);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('shopDetail');

	var $shopTop = $('[data-node="shopTop"]'),
	    $detailMenu = $('[data-node=detail-menu]'),
	    $love = $shopTop.find('[data-action="love"]'),
	    //点赞
	$loveNum = $love.find('[data-node="loveNum"]'),
	    //点赞数量
	$collect = $shopTop.find('[data-action="collect"]'),
	    //收藏
	$collectNum = $collect.find('[data-node="collectNum"]'),

	// $redTicketBox = $('[data-node="couponBox"]'),
	$searchBtn = $detailMenu.find('[data-node=searchBtn]'),
	    $searchInput = $detailMenu.find('[data-node=searchInput]'),

	// $share = $shopTop.find('[data-action="shareto"]'),
	// $shareBox = $('[data-node="shareBtnBox"]'),
	$goodBox = $('[data-node="goodsBox"]'),

	// $goodList = $goodBox.find('ul'),
	$moreBtn = $goodBox.find('[data-action="moreGoods"]');

	var loveNum = ~~$loveNum.text();
	//店铺选择hover
	shopSelect.init();

	//领取优惠券
	getRedTicket.init();

	//快捷导航
	shortcutBanner.init();

	//店铺动态
	if ($_CONFIG['type'] == '8') {
	    dynamic.init();
	}

	//点赞
	praise('[data-node="shopTop"]', '[data-action="love"]', {
	    onPraise: function onPraise() /*result*/{
	        loveNum++;
	        $loveNum.text(loveNum);
	    },
	    onUnPraise: function onUnPraise() /*result*/{
	        loveNum--;
	        $loveNum.text(loveNum);
	    },
	    onPraised: function onPraised() /*result*/{
	        $love.addClass('active');
	        $loveNum.text(loveNum);
	    }
	});

	//收藏
	//收藏 店铺
	shopCollect({
	    selector: '[data-action="collect"]',
	    parent: '[data-node="shopTop"]'
	}, function (isAdd) {
	    isAdd ? $collectNum.text(~~$collectNum.text() + 1).prev().addClass('active') : $collectNum.text(~~$collectNum.text() - 1).prev().removeClass('active');
	});

	//分享
	var shareTimer = null,
	    $shareBtnBox = $('[data-node="shareBtnBox"]'),
	    shareInfo = {},
	    pcUrl = '';
	var shareTitle = '';
	$('[data-node="shopTop"]').on('mouseenter', '[data-action="shareto"]', function () {
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
	        shop_id: $_CONFIG['shopId']
	    });
	}).on('mouseleave', '[data-action="shareto"]', function () {
	    shareTimer = setTimeout(function () {
	        $shareBtnBox.hide();
	    }, 100);
	});
	$shareBtnBox.on('mouseenter', function () {
	    clearTimeout(shareTimer);
	}).on('mouseleave', function () {
	    $(this).hide();
	});
	// 发送统计数据
	var analytic = function analytic(channel) {
	    BP.send({
	        event_id: 'B000P016',
	        shop_id: $_CONFIG['shopId'],
	        channel_id: channel || ''
	    });
	};
	//验证图片是否为图片类型以及是否为默认图片
	var headPic = $shopTop.find('img').attr('src');
	var isDefault = function isDefault(src) {
	    if (src == 'https://i-pre.meixincdn.com/v1/img/T1gyVTBmLT1R4cSCrK.png' || src == 'https://i6.meixincdn.com/v1/img/T1YFxTByJT1R4cSCrK.png' || src == 'https://i-pre.meixincdn.com/v1/img/T1TaVTB7LT1R4cSCrK.png') {
	        return false;
	    }
	    return true;
	};
	var isPic = function isPic(src) {
	    var reg = /\w+\.(jpg|gif|bmp|png)$/;
	    if (isDefault(src)) {
	        return reg.test(src);
	    } else {
	        return false;
	    }
	};
	// shop_id，channel_id（out-weixin,out-QQ,out-xlwb，out-Qqzone）
	$shareBtnBox.on('click', '[data-shareto="weixin"]', function () {
	    shareInfo.url = $_CONFIG.weixin_share;
	    shareInfo.title = shareTitle;
	    shareto.weixin(shareInfo);
	    analytic('out-weixin');
	}).on('click', '[data-shareto="qq"]', function () {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle;
	    shareInfo.summary = '我发现了前所未有的好店，不如，你也来逛逛？';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.qq(shareInfo);
	    analytic('out-QQ');
	}).on('click', '[data-shareto="sina"]', function () {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle + ',这是我费尽千辛万苦找到的超级好店。';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.sina(shareInfo);
	    analytic('out-xlwb');
	}).on('click', '[data-shareto="qzone"]', function () {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle;
	    shareInfo.summary = '这是我费尽千辛万苦找到的超级好店。';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.qzone(shareInfo);
	    analytic('out-Qqzone');
	});
	//加载更多
	var morePage = 2,
	    shopId = $_CONFIG.shopId;
	$moreBtn.on('click', function () {
	    var text = $(this).html(),
	        _this = this,
	        _url = '',
	        _data = {};
	    if ($_CONFIG.isSearch == '1') {
	        _url = $_CONFIG.mall_domain + url.get('searchGetMore');
	        _data = {
	            shop_type: ~~$_CONFIG.shoptype,
	            shop_id: ~~$_CONFIG.shopId,
	            pageNum: morePage,
	            word: $_CONFIG.word
	        };
	    } else {
	        _url = url.get('moreGoods');
	        _data = {
	            shopId: ~~$_CONFIG.shopId,
	            type: ~~$_CONFIG.shoptype,
	            tabId: ~~$_CONFIG.type,
	            pageNum: morePage,
	            pagesize: 20
	        };
	    }
	    if (!$(_this).hasClass('disabled')) {
	        $(_this).addClass('disabled').html('<span><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...</span>');
	        fetch.get(_url, { data: _data }).done(function (result) {
	            var data = result.data.itemList;
	            var length = result.data.count;
	            if (length < 20) {
	                $(_this).html('<span>没有可加载内容</span>');
	            } else if (data.length == 0) {
	                $(_this).html('<span>没有可加载内容</span>');
	            } else {
	                $(_this).removeClass('disabled').html(text);
	            }
	            if ($_CONFIG.type == '2') {
	                newGoods(data, shopId);
	            } else {
	                moreList(data, shopId);
	            }
	            morePage++;
	        });
	    }
	});
	//search 
	var search = function search() {
	    var val = $searchInput.val();
	    if (moduleTrim(val) != '') {
	        location.href = $_CONFIG.mall_domain + 'shop/search?shopid=' + $_CONFIG.shopId + '&shopword=' + encodeURIComponent(val);
	    }
	};
	$searchBtn.on('click', search);
	$(document).keydown(function (e) {
	    if (e.which == "13") {
	        search();
	    }
	});
	//menu fixed
	tab.init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 51:
/***/ function(module, exports) {

	'use strict';

	/**
	 * 删除字符串str的收尾空格
	 */

	var trim = function trim(str) {
	  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
	};

	module.exports = trim;

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */

	var $publicMask;
	var $publicTips;
	var timer;

	var events = function events() {

	    $publicMask.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });

	    $publicTips.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	};

	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function init(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function callback() {}
	    };

	    $.extend(defaults, options || {});

	    clearTimeout(timer);
	    $publicMask = $('[data-action="publicMask"]');
	    $publicTips = $('[data-action="publicTips"]');

	    if ($publicMask.length > 0) {

	        $publicMask.show();
	        $publicTips.show().text(msg);
	    } else {

	        $('body').append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">' + msg + '</div>');
	        $publicMask = $('[data-action="publicMask"]');
	        $publicTips = $('[data-action="publicTips"]');
	        events();
	    }

	    $publicTips.css('margin', -$publicTips[0].offsetHeight / 2 + 'px 0 0 ' + -$publicTips.width() / 2 + 'px');

	    timer = setTimeout(function () {

	        $publicMask.hide();
	        $publicTips.hide();

	        defaults.callback();
	    }, defaults.duration);
	};

	module.exports = {
	    init: init,
	    events: events
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * substrLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var substrLen = function substrLen(str, len) {
		if (typeof len !== 'number') {
			len = 24;
		}
		if (str.length > len) {
			return str.substr(0, len) + '...';
		}
		return str;
	};

	module.exports = function () {
		tmod.helper('substrLen', substrLen);
	};

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var getQRCode = __webpack_require__(124);
	var checkLoginStatus = __webpack_require__(47);

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

	var open = function open(url) {
	    window.open(url);
	};

	// 分享按钮渲染
	var hasShareBtnsHTML = false;
	var initShareBtns = function initShareBtns() {
	    var shareBtns = '<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>';
	    $('body').append(shareBtns);
	    hasShareBtnsHTML = true;
	};
	var showShareToBtns = function showShareToBtns(style) {
	    !hasShareBtnsHTML && initShareBtns();
	    $('[data-node=shareBtnBox]').css({
	        left: style.x,
	        top: style.y
	    }).show();
	};

	// 微信弹层渲染
	var hasWeixinHTML = false;
	var initWeixinHTML = function initWeixinHTML() {

	    var weixinBox = '<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';
	    $('body').append(weixinBox);
	    hasWeixinHTML = true;
	};

	// pics: 图片参数是否为pics，默认是pic。
	var formatParams = function formatParams(p, pics) {
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
	    weixin: function weixin(options) {
	        var link = getQRCode(options.url);
	        !hasWeixinHTML && initWeixinHTML();

	        $('[data-node=shareWeixinCode]')[0].src = link;
	        $('.share-weixin').show();
	        $('.wx-close').on('click', function () {
	            $('.share-weixin').hide();
	        });
	    },
	    qq: function qq(options) {
	        var link = APIS.qq + '?' + formatParams(options, true);
	        open(link);
	    },
	    sina: function sina(options) {
	        var link = APIS.sina + '?' + formatParams(options);
	        open(link);
	    },
	    qzone: function qzone(options) {
	        var link = APIS.qzone + '?' + formatParams(options, true);
	        open(link);
	    }
	};

	// share with kid
	var shareWithKid = function shareWithKid(args) {
	    var isRebate = args.isRebate === '0' ? false : true;
	    fetch.get(url.get('shareGetGoodsKid'), {
	        validate: isRebate,
	        data: {
	            skuId: args.skuId,
	            itemId: args.itemId,
	            parentKid: args.parentKid
	        },
	        async: false // 防止新窗口被拦截
	    }).done(function (data) {
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
	    }).fail(function (data) {
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
	var go = function go(obj) {
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
	var shareItem = function shareItem(parent, selector, beforeShare) {
	    var shareInfo = null;
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function (e) {
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
	        var px = $(this).offset().left / 1 + pw / 2 - 80 + 'px';
	        var py = $(this).offset().top / 1 + (ph - 1) + 'px';

	        showShareToBtns({
	            x: px,
	            y: py
	        });
	        return false;
	    });
	    // 隐藏分享按钮
	    $item.on('mouseleave', selector, function (e) {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });

	    $('body').on('click', '[data-shareto]', function (e) {
	        e.preventDefault();
	        shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function () {};
	        beforeShare.call(null, shareInfo);
	        // console.log(shareInfo);
	        go(shareInfo);
	    });

	    $('body').on('mouseenter', '[data-node=shareBtnBox]', function () {
	        $(this).show();
	    });
	    $('body').on('mouseleave', '[data-node=shareBtnBox]', function () {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	// 根据字符串生成二维码
	var getQRCode = function getQRCode(url) {
		return $_CONFIG.wap_url + 'q.php?t=' + encodeURIComponent(url);
	};

	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var imgPath = $_CONFIG.imgpath + '/images/emoji/';

	var ext = '.png';

	var groupOne = [{
	    name: '微笑',
	    url: 'weixiao'
	}, {
	    name: '色',
	    url: 'se'
	}, {
	    name: '亲亲',
	    url: 'qinqin'
	}, {
	    name: '得意',
	    url: 'deyi'
	}, {
	    name: '流泪',
	    url: 'liulei'
	}, {
	    name: '害羞',
	    url: 'haixiu'
	}, {
	    name: '闭嘴',
	    url: 'bizui'
	}, {
	    name: '鼓掌',
	    url: 'guzhang'
	}, {
	    name: '大哭',
	    url: 'daku'
	}, {
	    name: '尴尬',
	    url: 'ganga'
	}, {
	    name: '生气',
	    url: 'shengqi'
	}, {
	    name: '调皮',
	    url: 'tiaopi'
	}, {
	    name: '呲牙',
	    url: 'ciya'
	}, {
	    name: '惊讶',
	    url: 'jingya'
	}, {
	    name: '委屈',
	    url: 'weiqu'
	}, {
	    name: '吐血',
	    url: 'tuxue'
	}, {
	    name: '冷汗',
	    url: 'lenghan'
	}, {
	    name: '抓狂',
	    url: 'zhuakuang'
	}, {
	    name: '难过',
	    url: 'nanguo'
	}, {
	    name: '偷笑',
	    url: 'touxiao'
	}, {
	    name: '白眼',
	    url: 'baiyan'
	}, {
	    name: '不屑',
	    url: 'buxie'
	}, {
	    name: '快哭了',
	    url: 'kuaikule'
	}];

	var groupTwo = [{
	    name: '困',
	    url: 'kun'
	}, {
	    name: '装酷',
	    url: 'zhuangku'
	}, {
	    name: '大笑',
	    url: 'daxiao'
	}, {
	    name: '偷瞄',
	    url: 'toumiao'
	}, {
	    name: '奋斗',
	    url: 'fendou'
	}, {
	    name: '咒骂',
	    url: 'zhouma'
	}, {
	    name: '疑问',
	    url: 'yiwen'
	}, {
	    name: '晕',
	    url: 'yun'
	}, {
	    name: '捶打',
	    url: 'chuida'
	}, {
	    name: '再见',
	    url: 'zaijian'
	}, {
	    name: '抠鼻',
	    url: 'koubi'
	}, {
	    name: '发呆',
	    url: 'fadai'
	}, {
	    name: '坏笑',
	    url: 'huaixiao'
	}, {
	    name: '哈欠',
	    url: 'haqian'
	}, {
	    name: '鄙视',
	    url: 'bishi'
	}, {
	    name: '睡觉',
	    url: 'shuijiao'
	}, {
	    name: '饿',
	    url: 'e'
	}, {
	    name: '阴险',
	    url: 'yinxian'
	}, {
	    name: '难受',
	    url: 'nanshou'
	}, {
	    name: '可怜',
	    url: 'kelian'
	}, {
	    name: '撇嘴',
	    url: 'piezui'
	}, {
	    name: '石化',
	    url: 'shihua'
	}, {
	    name: '泪眼',
	    url: 'leiyan'
	}];
	/*
	var groupThree = [{
	    name: '嘘',
	    url: 'xu'
	}, {
	    name: '哼哼',
	    url: 'hengheng'
	}, {
	    name: '爱慕',
	    url: 'aimu'
	}, {
	    name: '财迷',
	    url: 'caimi'
	}, {
	    name: '耶',
	    url: 'ye'
	}, {
	    name: '思考',
	    url: 'sikao'
	}, {
	    name: '骷髅',
	    url: 'kulou'
	}, {
	    name: '痛哭',
	    url: 'tongku'
	}, {
	    name: '恭喜',
	    url: 'gongxi'
	}, {
	    name: '捂脸',
	    url: 'wulian'
	}, {
	    name: '嘿哈',
	    url: 'heiha'
	}, {
	    name: '机智',
	    url: 'jizhi'
	}, {
	    name: '皱眉',
	    url: 'zhoumei'
	}, {
	    name: '安慰',
	    url: 'anwei'
	}, {
	    name: '飞吻',
	    url: 'feiwen'
	}, {
	    name: '奸笑',
	    url: 'jianxiao'
	}, {
	    name: '猪头',
	    url: 'zhutou'
	}, {
	    name: '玫瑰',
	    url: 'meigui'
	}, {
	    name: '凋谢',
	    url: 'diaoxie'
	}, {
	    name: '爱心',
	    url: 'aixin'
	}, {
	    name: '心碎',
	    url: 'xinsui'
	}, {
	    name: '蛋糕',
	    url: 'dangao'
	}, {
	    name: '喝水',
	    url: 'heshui'
	}];

	var groupFour = [{
	    name: '西瓜',
	    url: 'xigua'
	}, {
	    name: '咖啡',
	    url: 'kafei'
	}, {
	    name: '啤酒',
	    url: 'pijiu'
	}, {
	    name: '包包',
	    url: 'baobao'
	}, {
	    name: '高跟鞋',
	    url: 'gaogenxie'
	}, {
	    name: '帽子',
	    url: 'maozi'
	}, {
	    name: '口红',
	    url: 'kouhong'
	}, {
	    name: '裙子',
	    url: 'qunzi'
	}, {
	    name: 'T恤',
	    url: 'txu'
	}, {
	    name: '裤子',
	    url: 'kuzi'
	}, {
	    name: '眼镜',
	    url: 'yanjing'
	}, {
	    name: '太阳镜',
	    url: 'taiyangjing'
	}, {
	    name: '蜡烛',
	    url: 'lazhu'
	}, {
	    name: '礼物',
	    url: 'liwu'
	}, {
	    name: '红包',
	    url: 'hongbao'
	}, {
	    name: '拥抱',
	    url: 'yongbao'
	}, {
	    name: '太阳',
	    url: 'taiyang'
	}, {
	    name: '月亮',
	    url: 'yueliang'
	}, {
	    name: '便便',
	    url: 'bianbian'
	}, {
	    name: '炸弹',
	    url: 'zhadan'
	}, {
	    name: '菜刀',
	    url: 'caidao'
	}, {
	    name: '握手',
	    url: 'woshou'
	}, {
	    name: '胜利',
	    url: 'shengli'
	}];

	var groupFive = [{
	    name: '赞',
	    url: 'zan'
	}, {
	    name: 'OK',
	    url: 'ok'
	}, {
	    name: '勾引',
	    url: 'gouyin'
	}, {
	    name: 'NO',
	    url: 'no'
	}, {
	    name: '打脸',
	    url: 'dalian'
	}, {
	    name: '抱拳',
	    url: 'baoquan'
	}, {
	    name: '乒乓球',
	    url: 'pingpangqiu'
	}, {
	    name: '足球',
	    url: 'zuqiu'
	}, {
	    name: '篮球',
	    url: 'lanqiu'
	}];
	*/
	var format = function format(arr) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var emoji = arr[i];
	        emoji.url = imgPath + emoji.url + ext;
	    }
	    return arr;
	};

	module.exports = format(groupOne.concat(groupTwo /*, groupThree, groupFour, groupFive*/));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var path = $_CONFIG.imgpath + '/images/emoji/';
	var ext = '.png';

	var backward = {
	    '亲': {
	        name: '亲亲',
	        url: path + 'qinqin' + ext
	    },
	    '愤怒': {
	        name: '生气',
	        url: path + 'shengqi' + ext
	    },
	    '惊恐': {
	        name: '惊讶',
	        url: path + 'jingya' + ext
	    },
	    '迷茫': {
	        name: '委屈',
	        url: path + 'weiqu' + ext
	    },
	    '伤心': {
	        name: '难过',
	        url: path + 'nanguo' + ext
	    },
	    '努力': {
	        name: '奋斗',
	        url: path + 'fendou' + ext
	    },
	    'YY': {
	        name: ' 坏笑',
	        url: path + 'huaixiao' + ext
	    },
	    '恶心': {
	        name: '难受',
	        url: path + 'nanshou' + ext
	    }
	};

	module.exports = backward;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/face/face',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,v=$data.v,i=$data.i,face=$data.face,$index=$data.$index,$escape=$utils.$escape,page=$data.page,$out='';$out+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ';
	$each(list,function(v,i){
	$out+=' <div class="imoj-content clearfix ';
	if(i){
	$out+='hide';
	}
	$out+='"> ';
	$each(v,function(face,$index){
	$out+=' <a href="javascript:;"> <img width="22" height="22" data-face="[';
	$out+=$escape(face.name);
	$out+=']" src="';
	$out+=$escape(face.url);
	$out+='" alt="';
	$out+=$escape(face.name);
	$out+='" title="';
	$out+=$escape(face.name);
	$out+='"> </a> ';
	});
	$out+=' </div> ';
	});
	$out+=' </div> <ul data-action="facePage" class="pagination"> ';
	$each(page,function(v,i){
	$out+=' <li ';
	if(i==0){
	$out+='class="active"';
	}
	$out+='>';
	$out+=$escape(i+1);
	$out+='</li> ';
	});
	$out+=' </ul> </div>';
	return new String($out);
	});

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var hint = __webpack_require__(87);
	var checkLoginStatus = __webpack_require__(47);

	var isCollect = false;
	var collectUrl;
	var init = function init(elementSelector, onChanged) {
	    var $select = elementSelector.parent ? $(elementSelector.parent) : $(elementSelector.selector),
	        $selector = elementSelector.parent ? elementSelector.selector : undefined;

	    $select.on('click', $selector, function () {
	        var _this = this,
	            isAdd = true,
	            changed = onChanged || function () {};

	        var objs = {
	            validate: true,
	            data: {
	                shopId: $_CONFIG.shopId
	            }
	        };

	        //无刷新登录
	        function noRefreshFetch(o) {
	            fetch.post(collectUrl, o).done(function (result) {
	                if (result.code === 200) {
	                    if (isAdd) {
	                        $(_this).addClass('active').attr('data-collect', 'collect');
	                    } else {
	                        $(_this).removeClass('active').attr('data-collect', '');
	                    }
	                    changed.call(_this, isAdd);
	                } else {
	                    hint.init(result.message);
	                }
	            }).fail(function (xhr /*, error*/) {
	                if (checkLoginStatus()) {
	                    hint.init('店铺收藏失败');
	                }
	            }).always(function () {
	                isCollect = false;
	            });
	        }

	        if (!isCollect) {
	            isCollect = true;
	            if ($(_this).attr('data-collect') === '') {
	                collectUrl = url.get('shopCollect');
	                isAdd = true;
	            } else {
	                collectUrl = url.get('unShopCollect');
	                isAdd = false;
	            }
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var isLogin = __webpack_require__(47);
	var loginPop = __webpack_require__(3);

	var init = function init() {
	    $('[data-action="shortcutBanner"]').on('click', 'a', function (e) {
	        var _self = $(this);
	        if (!isLogin()) {
	            e.preventDefault();
	            loginPop({
	                onLogin: function onLogin() {
	                    window.location.href = _self.attr('href');
	                }
	            });
	        }
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * truncateByteLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var truncate = __webpack_require__(42);
	var byteLen = __webpack_require__(43);
	var encodeHTML = __webpack_require__(233);
	var face = __webpack_require__(234);

	var truncateByteLen = function truncateByteLen(str, len) {
		var l = byteLen(str);
		var s;
		if (l > len) {
			s = truncate(str, len) + '...';
		} else {
			s = str;
		}
		return face.parseEmoji(encodeHTML(s));
	};

	module.exports = function () {
		tmod.helper('truncateByteLen', truncateByteLen);
	};

/***/ },

/***/ 233:
/***/ function(module, exports) {

	'use strict';

	var html = function html(str, reg) {
	    return str ? str.replace(reg || /[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
	        if (b) {
	            return a;
	        } else {
	            return {
	                '<': '&lt;',
	                '&': '&amp;',
	                '"': '&quot;',
	                '“': '&ldquo;',
	                '”': '&rdquo;',
	                '>': '&gt;',
	                "'": '&#39;'
	            }[a];
	        }
	    }) : '';
	};

	module.exports = html;

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var emojis = __webpack_require__(157);
	var backward = __webpack_require__(158);
	var faceTpl = __webpack_require__(159);

	var faceReg,
	    faceUrl,
	    defaultIndex = 0;

	// 将表情转换成map
	var emojiMap = {};

	// 数据适配转换
	var makeData = function makeData(data) {
	    var total = data.length;
	    var offset = 24;
	    var page = Math.ceil(total / offset);
	    var list = [];

	    for (var i = 0; i < page; i++) {
	        list[i] = [];
	        var end = offset * (i + 1);
	        end = end > total ? total : end;
	        for (var j = i * offset; j < end; j++) {
	            var emoji = data[j];
	            list[i].push(emoji);
	            emojiMap[emoji.name] = emoji.url;
	        }
	    }
	    return {
	        page: new Array(page),
	        list: list
	    };
	};
	// 表情层显示
	var show = function show(x, y) {
	    setShowIndex(0);
	    $('[data-node=faceBox]').css({
	        left: x + 'px',
	        top: y + 'px'
	    }).show();
	};
	// 表情层隐藏
	var hide = function hide() {
	    $('[data-node=faceBox]').hide();
	};
	// tab方式显示所选页
	var setShowIndex = function setShowIndex(index) {
	    index = index || defaultIndex;

	    $('[data-action=facePage] > li').eq(index).addClass('active').siblings('li').removeClass('active');
	    $('[data-node=faceList] > div').eq(index).removeClass('hide').siblings('div').addClass('hide');
	};

	/**
	 * 插入表情，回调数据
	 * @param  {Function} fn     回调函数
	 * @param  {Boolean}  isHide 点击表情后是否隐藏表情浮层，默认隐藏
	 * @return {[type]}          null
	 */
	var insertFace = function insertFace(fn, isHide) {
	    $('body').on('click', '[data-face]', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        faceReg = $(this).data('face');
	        faceUrl = $(this).attr('src');
	        fn({
	            reg: faceReg,
	            url: faceUrl
	        });
	        isHide !== false && $('[data-node=faceBox]').hide();
	    });
	};
	// 初始化表情弹层
	var initHTML = function initHTML(fn) {
	    var data = makeData(emojis);
	    var faceHTML = faceTpl(data);
	    $('body').append(faceHTML);
	    fn();
	};
	// 初始化事件
	var initEvent = function initEvent() {
	    $('body').on('click', '[data-node=faceBox]', function (e) {
	        e.stopPropagation();
	    });
	    $(document).on('click', function () {
	        $('[data-node=faceBox]').hide();
	    });
	    // 分页切换显示
	    $('[data-node=faceBox]').on('mouseenter', '[data-action=facePage] > li', function () {
	        var index = $(this).index();
	        setShowIndex(index);
	    });
	};

	var isEmpty = function isEmpty(obj) {
	    var ret = true;
	    for (var key in obj) {
	        ret = false;
	        break;
	    }
	    return ret;
	};

	// 把表情占位符替换成img
	var parseEmoji = function parseEmoji(str) {
	    var r = /(\[([\s\S]+?)\])/g;
	    if (isEmpty(emojiMap)) {
	        makeData(emojis);
	    }

	    return str.replace(r, function (s, $1, name) {
	        var img = emojiMap[name];
	        if (img) {
	            return '<img width="22" height="22" src="' + img + '" />';
	        } else {
	            // 兼容旧版表情
	            var old = backward[name];
	            if (old) {
	                return '<img width="22" height="22" src="' + old.url + '" />';
	            }
	            return s;
	        }
	    });
	};

	var init = function init() {
	    initHTML(initEvent);
	};

	module.exports = {
	    init: init,
	    insert: insertFace,
	    show: show,
	    hide: hide,
	    parseEmoji: parseEmoji
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 *
	 * 赞/取消赞
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);
	var checkLoginStatus = __webpack_require__(47);

	var isLogin = checkLoginStatus(); //页面初始化是否登录判断

	var noop = function noop() {};
	var setData = function setData($node, praise, count) {
	    $node.data('praise', praise);
	    $node.data('count', count);
	};

	var helper = {
	    normal: {
	        add: function add($node, data, count) {
	            $node.addClass('active');
	            if (!count) {
	                count = "取消点赞";
	            }
	            $node.find('span').text(count);
	        },
	        reduce: function reduce($node, data, count) {
	            $node.removeClass('active');
	            if (!count) {
	                count = "点赞";
	            }
	            $node.find('span').text(count);
	        }
	    }
	};

	var getCallback = function getCallback(mode) {
	    return helper[mode];
	};

	var praise = function praise(container, selector, options) {
	    var $container = $(container);
	    var onPraise = options.onPraise || noop;
	    var onUnPraise = options.onUnPraise || noop;
	    var onPraised = options.onPraised || noop;
	    var mode = options.mode || 'normal';

	    $container.on('click', selector, function () {
	        var $this = $(this);
	        var firing = $this.data('firing');
	        if (firing === 1) {
	            return;
	        }

	        $this.data('firing', 1);
	        var t = $this.data('type');
	        var isPraise = $this.data('praise');
	        var id = $this.data('id');
	        var count = $this.data('count');

	        var objs = {
	            validate: true,
	            data: {
	                id: id,
	                type: t, // 0 店铺,  1 话题
	                isPraise: isPraise // 0 取消点赞, 1 点赞
	            },
	            onLogin: noRefreshFetch,
	            refresh: true
	        };

	        //无刷新登录
	        function noRefreshFetch(o) {
	            fetch.post(url.get('praise'), o).done(function (data /*, textStatus, jqXHR*/) {
	                var callbacks = getCallback(mode);
	                //推送 评论区状态
	                Pubsub(channel.comment.enableEditor).pub({
	                    pid: "enable"
	                });

	                if (data && data.code === 200 && data.success) {
	                    if (isPraise === 1) {
	                        setData($this, 0, ++count);
	                        callbacks.add($this, data, count);
	                        onPraise.call($this, data, count);
	                    } else if (isPraise === 0) {
	                        setData($this, 1, --count);
	                        callbacks.reduce($this, data, count);
	                        onUnPraise.call($this, data, count);
	                    }
	                } else if (data && data.code === 422) {
	                    // window.location.href = $_CONFIG.passport_domain + 'login/index';
	                } else if (data && data.code === 403) {
	                    alert('抱歉！该话题审核未通过', {
	                        ok: function ok() {
	                            window.location.href = $_CONFIG.group_domain + 'index/error?code=topic';
	                        }
	                    });
	                } else {
	                    var message = data.message;
	                    //409点过赞  已经登录 把点赞状态回带，不刷新
	                    if (data.code === 409) {

	                        onPraised.call($this, data, count);

	                        if (isLogin) {
	                            alert(message);
	                        }

	                        return false;
	                    }
	                    if (t === 0) {
	                        if (data.code === 404) {
	                            alert(message, {
	                                ok: function ok() {
	                                    window.location.reload();
	                                }
	                            });
	                        } else {
	                            alert(message);
	                        }
	                    } else {
	                        alert(message);
	                    }
	                }
	            }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	                // 点赞失败时,如何处理
	            }).always(function () {
	                $this.data('firing', 0);
	            });
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = praise;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var alert = __webpack_require__(37);
	var url = __webpack_require__(28);
	var fetch = __webpack_require__(2);
	var init = function init() {
	    var ticketId;
	    var allowGet = true;
	    $(document).on('click', '[data-action="getRed"]', function () {
	        if (allowGet) {
	            allowGet = false;
	            ticketId = $(this).attr('data-redid');

	            var noRefreshFetch = function noRefreshFetch() {
	                fetch.post(url.get('getTicket'), {
	                    validate: true,
	                    data: {
	                        batchSn: ticketId,
	                        userId: $_CONFIG.userId
	                    },
	                    onLogin: noRefreshFetch
	                }).done(function (data) {

	                    var surplus = 0;
	                    var msg = '';

	                    if (data && data.success && data.code === 200) {
	                        surplus = data.data.userRemainingAvailableQuantity;
	                        msg = '还可以领取' + surplus + '张';

	                        if (surplus < 1) {
	                            msg = '领取次数已达上限';
	                        }
	                        alert('领取成功，' + msg);
	                    } else {

	                        alert(data.message);
	                    }
	                    allowGet = true;
	                }).fail(function () {
	                    alert('网络可能出问题了，请稍后重试');
	                    allowGet = true;
	                });
	            };
	            noRefreshFetch();

	            return false;
	        }
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var tpl = __webpack_require__(259);
	var init = function init(data, shopId) {
	    var $goodBox = $('[data-node="goodsBox"]'),
	        $moreComments = $goodBox.find('.more-comments'),
	        $moreBtn = $goodBox.find('[data-action="moreGoods"]'),
	        html = '',
	        hostName = $_CONFIG.mall_domain;
	    for (var i in data) {
	        var $goodList = $goodBox.find('[data-node=' + i + ']');
	        var dateTitles = $goodBox.find('[data-tip=dateTitle]');
	        if ($goodList.length == 0) {
	            if (dateTitles.length >= 7) {
	                $moreBtn.html('<span>没有可加载内容</span>');
	                return;
	            }
	            $moreComments.before('<h2 class="title">' + data[i].title + '</h2><ul class="clearfix" data-node="' + i + '" data-tip="dateTitle"></ul>');
	            $goodList = $goodBox.find('[data-node=' + i + ']');
	        }
	        html = tpl({
	            data: data[i].data,
	            shopId: shopId,
	            hostName: hostName
	        });
	        $goodList.append(html);
	    }
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/shopInfo/newGoods/goods',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,group=$data.group,$index=$data.$index,$escape=$utils.$escape,hostName=$data.hostName,shopId=$data.shopId,$out='';$each(data,function(group,$index){
	$out+=' <li> <a target="_blank" href="';
	$out+=$escape(hostName);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(group.id);
	$out+='.html"> ';
	if(group.isRebate && group.isDiscount ){
	$out+=' <em class="icon-fan">返</em> ';
	}else{
	$out+=' ';
	if(group.isRebate  ){
	$out+=' <em class="icon-fan">返</em> ';
	}
	$out+=' ';
	if(group.isDiscount  ){
	$out+=' <em class="icon-fan icon-jiang">降</em> ';
	}
	$out+=' ';
	}
	$out+=' <div class="mg-negative"> <a href="';
	$out+=$escape(hostName);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(group.id);
	$out+='.html" target="_blank"> <img src=';
	$out+=$escape(group.img);
	$out+=' alt="';
	$out+=$escape(group.title);
	$out+='"> </a> <div class="btn-box"> <a href="';
	$out+=$escape(hostName);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(group.id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(hostName);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(group.id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>';
	$out+=$escape(group.price);
	$out+='</span> <p title="';
	$out+=$escape(group.title);
	$out+='"> <a target="_blank" href="';
	$out+=$escape(hostName);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(group.id);
	$out+='.html">';
	$out+=$escape(group.title);
	$out+='</a> </p> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var tpl = __webpack_require__(261);
	var init = function init(data, shopId) {
	    var $goodBox = $('[data-node="goodsBox"]'),
	        $goodList = $goodBox.find('ul'),
	        html = '',
	        hostName = $_CONFIG.mall_domain;
	    html = tpl({
	        data: data,
	        shopId: shopId,
	        hostName: hostName
	    });
	    $goodList.append(html);
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/widget/shopInfo/shopInfo',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,hostName=$data.hostName,shopId=$data.shopId,$out='';$out+=' ';
	$each(data,function($value,$index){
	$out+=' <li> ';
	if(data[$index].isRebate && data[$index].isDiscount ){
	$out+=' <em class="icon-fan">返</em> ';
	}else{
	$out+=' ';
	if(data[$index].isRebate  ){
	$out+=' <em class="icon-fan">返</em> ';
	}
	$out+=' ';
	if(data[$index].isDiscount  ){
	$out+=' <em class="icon-fan icon-jiang">降</em> ';
	}
	$out+=' ';
	}
	$out+=' <div class="mg-negative"> <a href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html" target="_blank"> <img src=';
	$out+=$escape(data[$index].img);
	$out+=' alt="';
	$out+=$escape(data[$index].title);
	$out+='"> </a> <div class="btn-box"> <a href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>';
	$out+=$escape(data[$index].price);
	$out+='</span> <p title="';
	$out+=$escape(data[$index].title);
	$out+='"> <a target="_blank" href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html">';
	$out+=$escape(data[$index].title);
	$out+='</a> </p> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	//店铺动态

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var topic = __webpack_require__(263);
	var noTopic = __webpack_require__(264);

	__webpack_require__(232)();
	__webpack_require__(88)();
	// require('module/tmodHelper/fromNow')();

	// var $topicContent = $('[data-node=topicContent]');
	var $topicList = $('[data-node=shopTopic]');
	var $topicLi = $('[data-node=topicList] li');
	var $loadMore = $('[data-node=loadMore]');
	var $loading = $('[data-node=loading]');
	var $noData = $('[data-node=noMore]');
	var $dataFail = $('[data-action=dataFail]');

	var firing = false; //是否正在加载
	var page = 1;
	var finished = false; //数据是否全部加载完毕

	var hide = 'hide';

	//默认显示加载更多
	var showMoreLoad = function showMoreLoad() {
	    $loadMore.removeClass(hide);
	    $loading.addClass(hide);
	};

	//加载中
	var beforeLoad = function beforeLoad() {
	    $loadMore.addClass(hide);
	    $noData.addClass(hide);
	    $loading.removeClass(hide);
	};

	//加载无数据
	var noData = function noData() {
	    $loading.addClass(hide);
	    $noData.removeClass(hide);
	};

	// 加载失败
	var dataFail = function dataFail() {
	    $loading.addClass(hide);
	    $dataFail.removeClass(hide);
	};

	//获取话题列表
	var getTopicList = function getTopicList() {
	    if (firing) {
	        return;
	    }
	    if (finished) {
	        noData();
	        return;
	    }
	    firing = true;
	    beforeLoad();
	    fetch.get(url.get('dynamicGetData'), {
	        data: {
	            ownerUserId: $_CONFIG['ownerUserId'], //24229,//
	            pageNum: page,
	            pageSize: 20
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            page++;
	            var list = data.data.topics;
	            //表情截取
	            $.each(list, function (i, v) {
	                if (v.text !== "" && v.text.length > 98) {
	                    var value = v.text;
	                    var newVal = "";
	                    var str = value.substr(0, 98);
	                    var valueLeft = str.slice(0, -6);
	                    var valueRight = str.slice(-6);
	                    var rIndex = valueRight.indexOf('[');
	                    if (rIndex > -1) {
	                        newVal = valueRight.substr(0, rIndex) + '...';
	                    } else {
	                        newVal = valueRight + '...';
	                    }
	                    v.text = valueLeft + newVal;
	                } else {
	                    v.text = v.text;
	                }
	            });
	            list.groupDomain = $_CONFIG.group_domain;
	            list.shopname = $_CONFIG.shop_name;
	            list.shopicon = $_CONFIG.shop_icon;
	            if (list.length === 0) {
	                finished = true;
	                if (!$topicLi.length) {
	                    $topicList.append(noTopic({
	                        url: $_CONFIG.mall_domain,
	                        shopId: $_CONFIG.shopId
	                    }));
	                    $loading.addClass(hide);
	                } else {
	                    noData();
	                }
	            } else {
	                var html = topic({
	                    list: list
	                });
	                if ($('[data-node=shopTopicList]').length === 0) {
	                    $topicList.append('<ul class="topic-list" data-node="shopTopicList"></ul>');
	                }
	                $('[data-node=shopTopicList]').append(html);
	                if (list.length < 20) {
	                    $loading.addClass(hide);
	                } else {
	                    showMoreLoad();
	                }
	            }
	        } else {
	            finished = true;
	            dataFail();
	        }
	    }).fail(function () {
	        dataFail();
	    }).always(function () {
	        firing = false;
	    });
	    return false;
	};

	var init = function init() {
	    $('[data-node=shopTopic]').children().remove();
	    getTopicList();
	    $loadMore.on('click', getTopicList);
	    $dataFail.on('click', getTopicList);
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/shopInfo/dynamic/topicList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,imgs=$data.imgs,i=$data.i,$out='';$each(list,function(value,$index){
	$out+=' <li> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topid);
	$out+='.html" target="_blank">';
	$out+=$escape(value.title);
	$out+='</a> ';
	if(value.text !== ""){
	$out+=' <p><a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topid);
	$out+='.html" target="_blank">';
	$out+=$string($helpers. truncateByteLen(value.text , '238'));
	$out+='</a></p> ';
	}
	$out+=' ';
	if(value.images.length !== 0){
	$out+=' <dl class="clearfix"> ';
	$each(value.images,function(imgs,i){
	$out+=' <dd> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topid);
	$out+='.html" target="_blank"> <img src="';
	$out+=$escape(imgs.url);
	$out+='" alt="" onerror="imgError(this,\'l\')"> ';
	if(imgs.type !== "image"){
	$out+=' ';
	if(imgs.type == "item"){
	$out+=' <em class="icon icon-goods"></em> ';
	}else if(imgs.type == "video"){
	$out+=' <em class="icon icon-video"></em> ';
	}
	$out+=' ';
	}
	$out+=' ';
	if(value.count > 3 && i == 2){
	$out+=' <em class="icon icon-num">';
	$out+=$escape(value.count);
	$out+='</em> ';
	}
	$out+=' </a> </dd> ';
	});
	$out+=' </dl> ';
	}
	$out+=' <div class="clearfix"> <div class="fl"> <span class="m0">';
	$out+=$escape(value.time);
	$out+='</span> <span>来自圈子：</span> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.groupid);
	$out+='.html" target="_blank">';
	$out+=$escape(value.groupName);
	$out+='</a> <span class="name"> <a><img src="';
	$out+=$escape(list.shopicon);
	$out+='">';
	$out+=$escape(list.shopname);
	$out+='</a> </span> </div> <div class="fr"> <span><em class="iconn-56"></em>';
	$out+=$escape(value.likeQuantity);
	$out+='</span> <span><em class="iconn-11"></em>';
	$out+=$escape(value.replyQuantity);
	$out+='</span> <span><em class="iconn-57"></em>';
	$out+=$escape(value.topicCollectionQuantity);
	$out+='</span> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/shopInfo/dynamic/no_topic',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url=$data.url,shopId=$data.shopId,$out='';$out+='<div class="no-topic"> <div class="txt clearfix"><em class="iconn-55"></em> <p>店主暂无动态，去看看店铺的<a href="';
	$out+=$escape(url);
	$out+='shop-';
	$out+=$escape(shopId);
	$out+='-1.html">商品</a>吧！</p> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var $selector = $('[data-action="shopSelector"]');
	var $selectList = $('[data-node="shopSelectList"]');
	var timer;

	var init = function init() {

	    $selector.on('mouseenter', function () {
	        $selector.addClass('hover');
	        $selectList.show();
	    });

	    $selector.on('mouseleave', function () {
	        timer = setTimeout(function () {

	            $selector.removeClass('hover');
	            $selectList.hide();
	        }, 200);
	    });

	    $selectList.on('mouseenter', function () {
	        clearTimeout(timer);
	    });

	    $selectList.on('mouseleave', function () {
	        $selector.removeClass('hover');
	        $selectList.hide();
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var $fixMenu = $('[data-node=fixMenu]');
	var $detailMenu = $('[data-node=detail-menu]');
	var $menuTab = $('[data-node=detail-menu] a');
	var $searchBox = $('[data-node=searchBox]');

	var fix = 'fixed-menu';
	var active = 'active';

	var offsetTop = $detailMenu.offset().top;
	var wScrollTop = $(window).scrollTop();

	//menu定位到顶部
	var elementFixed = function elementFixed() {
	    if (wScrollTop >= offsetTop) {
	        $fixMenu.addClass(fix);
	        $searchBox.hide();
	    } else {
	        $fixMenu.removeClass(fix);
	        $searchBox.show();
	    }
	};

	//点击menu a标签增加选中标签
	var changeContent = function changeContent(t) {
	    var $this = $(t);
	    var index = $menuTab.index($this);
	    $menuTab.removeClass(active).eq(index).addClass(active);
	};

	var init = function init() {
	    elementFixed();
	    $(window).on('scroll', function () {
	        wScrollTop = $(window).scrollTop();
	        elementFixed();
	    });
	    $detailMenu.on('click', 'a', function () {
	        changeContent(this);
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});