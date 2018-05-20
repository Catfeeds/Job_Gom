webpackJsonp([22],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var praise = __webpack_require__(204),
	    //点赞
	// getRedTicket = require('./getTicket'),//获取优惠券
	shareto = __webpack_require__(102).shareto,
	    //分享
	shopCollect = __webpack_require__(205),
	    //收藏
	fetch = __webpack_require__(21),
	    url = __webpack_require__(24),
	    moduleTrim = __webpack_require__(88),
	    newGoods = __webpack_require__(206),
	    //加载更多
	moreList = __webpack_require__(208); //加载更多
	// dynamic = require('./dynamic');//店铺动态,话题
	// var shopSelect = require('./shopSelect');//页面下拉
	var shortcutBanner = __webpack_require__(210); //右侧banner
	var tab = __webpack_require__(211);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(40);
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
	// shopSelect.init();
	
	//领取优惠券
	// getRedTicket.init();
	
	//快捷导航
	shortcutBanner.init();
	
	//店铺动态
	/*if ($_CONFIG['type'] == '8') {
	    dynamic.init();
	}*/
	
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
	    shareto.wb(shareInfo);v;
	    analytic('out-xlwb');
	}).on('click', '[data-shareto="qzone"]', function () {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle;
	    shareInfo.summary = '这是我费尽千辛万苦找到的超级好店。';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.qz(shareInfo);
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
	            shop_id: ~~$_CONFIG.shopId,
	            pageNum: morePage,
	            word: $_CONFIG.word
	        };
	    } else {
	        _url = url.get('moreGoods');
	        _data = {
	            shopId: ~~$_CONFIG.shopId,
	            tabId: ~~$_CONFIG.type,
	            pageNum: morePage,
	            pagesize: 20
	        };
	    }
	    if (!$(_this).hasClass('disabled')) {
	        $(_this).addClass('disabled').html('<span><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...</span>');
	        fetch.get(_url, {
	            data: _data
	        }).done(function (result) {
	            var data = result.data.itemList;
	            var length = result.data.count;
	            /*if (length < 20) {
	                $(_this).html('<span>没有可加载内容</span>');
	            } else */if (data.length == 0) {
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
	        location.href = $_CONFIG.meidian_domain + 'shop/search?shopid=' + $_CONFIG.shopId + '&shopword=' + encodeURIComponent(val);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}
	
		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}
	
		function c(a) {
			return l[a]
		}
	
		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}
	
		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}
	
		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}
	
		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}
	
		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}
	
		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}
	
		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
	    content = content || '';
	    options = options || {};
	    var defaults = {
	        fixed: true,
	        modal: true,
	        autofocus: false,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop
	    };
	    $.extend(true, defaults, options);
	    var d = Dialog(defaults);
	
	    var header = d._$('header');
	    var title = d._$('title');
	    if (!options.title) {
	        title.css('borderBottom', 'none');
	    }
	    header.show();
	    d.show();
	    return d;
	};
	
	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 删除字符串str的收尾空格
	 */
	
	var trim = function trim(str) {
	  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
	};
	
	module.exports = trim;

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var getQRCode = __webpack_require__(103);
	var checkLoginStatus = __webpack_require__(23);
	
	var APIS = {
	    qq: "http://connect.qq.com/widget/shareqq/index.html",
	    wb: "http://v.t.sina.com.cn/share/share.php",
	    qz: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
	};
	
	var defaultInfo = {
	    url: 'https://group.gomeplus.com/',
	    title: '国美APP边玩边分享，购物不孤单',
	    pic: '../../images/public/logo.png', // logo图片地址
	    summary: '国美APP边玩边分享，购物不孤单'
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
	        //desc: p.desc,
	        site: p.site
	    };
	
	    for (var i in data) {
	        s.push(i + '=' + encodeURIComponent(data[i] || ''));
	    }
	    if (pics) {
	        s.push('pics=' + p.pic);
	    } else {
	        s.push('pic=' + p.pic);
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
	    wb: function wb(options) {
	        var link = APIS.wb + '?' + formatParams(options);
	        open(link);
	    },
	    qz: function qz(options) {
	        var link = APIS.qz + '?' + formatParams(options, true);
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
	    }).fail(function () {
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
	    var $item = null;
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function () {
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
	    $item.on('mouseleave', selector, function () {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });
	
	    $('body').on('click', '[data-shareto]', function (e) {
	        e.preventDefault();
	        var shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function () {};
	        beforeShare.call(null, shareInfo);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	// 根据字符串生成二维码
	var getQRCode = function getQRCode(url) {
	    return $_CONFIG.group_domain + 'ajax/qrcode/urlcode?url=' + encodeURIComponent(url);
	};
	
	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/**
	 *
	 * 赞/取消赞
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var Pubsub = __webpack_require__(44);
	var channel = __webpack_require__(99);
	var checkLoginStatus = __webpack_require__(23);
	var loginPop = __webpack_require__(22);
	
	var isLogin = checkLoginStatus(); //页面初始化是否登录判断
	var popFlag = 0;
	
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
	        /* var firing = $this.data('firing');
	         if (firing === 1) {
	             return;
	         }*/
	
	        // $this.data('firing', 1);
	        var t = $this.data('type');
	        var isPraise = $this.data('praise');
	        var id = $this.data('id');
	        var count = $this.data('count');
	
	        var objs = {
	            data: {
	                groupId: $_CONFIG['groupid'],
	                id: id,
	                type: t, // 0 店铺,  1 话题
	                isPraise: isPraise // 0 取消点赞, 1 点赞
	
	                /*,
	                            onLogin: noRefreshFetch,
	                            refresh: true*/
	            }
	
	            //无刷新登录
	        };function noRefreshFetch() {
	            var o = objs;
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
	                } else if (data.code === 409) {
	                    //409点过赞  已经登录 把点赞状态回带，不刷新
	                    onPraised.call($this, data, count);
	                    if (!popFlag) {
	                        alert(data.message);
	                    }
	                } else {
	                    var message = data.message;
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
	                if (popFlag) {
	                    window.location.reload();
	                }
	            }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	                // 点赞失败时,如何处理
	            }).always(function () {
	                // $this.data('firing', 0);
	            });
	        }
	        if (!checkLoginStatus()) {
	            popFlag = 1;
	            loginPop(noRefreshFetch);
	        } else {
	            popFlag = 0;
	            noRefreshFetch();
	        }
	        return false;
	    });
	};
	
	module.exports = praise;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var hint = __webpack_require__(43);
	var checkLoginStatus = __webpack_require__(23);
	var loginPop = __webpack_require__(22);
	
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
	            // validate: true,
	            data: {
	                shopId: $_CONFIG.shopId
	            }
	
	            //无刷新登录
	        };function noRefreshFetch(refreshFlag) {
	            fetch.post(collectUrl, objs).done(function (result) {
	                if (result.code === 200) {
	                    if (isAdd) {
	                        $(_this).addClass('active').attr('data-collect', 'collect');
	                    } else {
	                        $(_this).removeClass('active').attr('data-collect', '');
	                    }
	                    if (!refreshFlag) {
	                        changed.call(_this, isAdd);
	                    }
	                } else {
	                    hint.init(result.message);
	                }
	            }).fail(function () {
	                if (checkLoginStatus()) {
	                    hint.init('店铺收藏失败');
	                }
	            }).always(function () {
	                isCollect = false;
	                if (refreshFlag) {
	                    window.location.reload();
	                }
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
	
	        if (checkLoginStatus()) {
	            noRefreshFetch();
	        } else {
	            loginPop(function () {
	                noRefreshFetch(1);
	            });
	        }
	        return false;
	    });
	};
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var tpl = __webpack_require__(207);
	var init = function init(data, shopId) {
	    var $goodBox = $('[data-node="goodsBox"]'),
	        $moreComments = $goodBox.find('.more-comments'),
	        $moreBtn = $goodBox.find('[data-action="moreGoods"]'),
	        html = '',
	        hostName = $_CONFIG.product_item_gome;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/shopInfo/newGoods/goods',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,group=$data.group,$index=$data.$index,$escape=$utils.$escape,hostName=$data.hostName,shopId=$data.shopId,$out='';$each(data,function(group,$index){
	$out+=' <li> <a target="_blank" href="';
	$out+=$escape(hostName);
	$out+=$escape(group.id);
	$out+='-';
	$out+=$escape(group.skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='"> ';
	if(group.isRebate && group.isDiscount ){
	$out+=' <em class="icon-fan">返</em> ';
	}else{
	$out+=' ';
	if(group.isRebate  ){
	$out+=' <em class="icon-fan">返</em> ';
	}
	$out+=' <!-- ';
	if(group.isDiscount  ){
	$out+=' <em class="icon-fan icon-jiang">降</em> ';
	}
	$out+=' --> ';
	}
	$out+=' <div class="mg-negative"> <a href="';
	$out+=$escape(hostName);
	$out+=$escape(group.id);
	$out+='-';
	$out+=$escape(group.skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='" target="_blank" title="';
	$out+=$escape(group.title);
	$out+='"> <img src=';
	$out+=$escape(group.img);
	$out+=' alt="';
	$out+=$escape(group.title);
	$out+='" onerror="imgError(this)"> </a> <div class="btn-box"> <a href="';
	$out+=$escape(hostName);
	$out+=$escape(group.id);
	$out+='-';
	$out+=$escape(group.skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(hostName);
	$out+=$escape(group.id);
	$out+='-';
	$out+=$escape(group.skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>';
	$out+=$escape(group.price);
	$out+='</span> <p title="';
	$out+=$escape(group.title);
	$out+='"> <a target="_blank" href="';
	$out+=$escape(hostName);
	$out+=$escape(group.id);
	$out+='-';
	$out+=$escape(group.skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='">';
	$out+=$escape(group.title);
	$out+='</a> </p> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var tpl = __webpack_require__(209);
	var init = function init(data, shopId) {
	    var $goodBox = $('[data-node="goodsBox"]'),
	        $goodList = $goodBox.find('ul'),
	        html = '',
	        hostName = $_CONFIG.product_item_gome;
	    html = tpl({
	        data: data,
	        shopId: shopId,
	        hostName: hostName
	    });
	    $goodList.append(html);
	};
	
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/widget/shopInfo/shopInfo',function($data,$filename
	/*``*/) {
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
	$out+=' <!-- ';
	if(data[$index].isDiscount  ){
	$out+=' <em class="icon-fan icon-jiang">降</em> ';
	}
	$out+=' --> ';
	}
	$out+=' <div class="mg-negative"> <a href="';
	$out+=$escape(hostName);
	$out+=$escape(data[$index].id);
	$out+='-';
	$out+=$escape(data[$index].skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='" target="_blank" title="';
	$out+=$escape(data[$index].title);
	$out+='"> <img src=';
	$out+=$escape(data[$index].img);
	$out+=' alt="';
	$out+=$escape(data[$index].title);
	$out+='" onerror="imgError(this)"> </a> <div class="btn-box"> <a href="';
	$out+=$escape(hostName);
	$out+=$escape(data[$index].id);
	$out+='-';
	$out+=$escape(data[$index].skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(hostName);
	$out+=$escape(data[$index].id);
	$out+='-';
	$out+=$escape(data[$index].skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>';
	$out+=$escape(data[$index].price);
	$out+='</span> <p title="';
	$out+=$escape(data[$index].title);
	$out+='"> <a target="_blank" href="';
	$out+=$escape(hostName);
	$out+=$escape(data[$index].id);
	$out+='-';
	$out+=$escape(data[$index].skuId);
	$out+='.html?mid=';
	$out+=$escape(shopId);
	$out+='">';
	$out+=$escape(data[$index].title);
	$out+='</a> </p> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var isLogin = __webpack_require__(23);
	var loginPop = __webpack_require__(22);
	
	var init = function init() {
	    $('[data-action="shortcutBanner"]').on('click', 'a', function (e) {
	        var _self = $(this);
	        if (!isLogin()) {
	            e.preventDefault();
	            loginPop(function () {
	                window.location.href = _self.attr('href');
	            });
	        }
	    });
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })

});
//# sourceMappingURL=shopInfo.js.map