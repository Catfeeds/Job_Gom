webpackJsonp([12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	__webpack_require__(169);
	var slider = __webpack_require__(170);
	var share = __webpack_require__(123);
	// var fetch = require('io/fetch');
	// var url = require('io/url');
	// var Pubsub = require('io/pubsub');
	var addShopCar = __webpack_require__(171);
	var buynow = __webpack_require__(174);
	var shopCollect = __webpack_require__(175);
	var productCollect = __webpack_require__(176);
	var paramsCheck = __webpack_require__(177);
	var getMoreDiscuss = __webpack_require__(179);
	// var couponSort = require('module/couponSort');
	var imgPreviewer = __webpack_require__(182); // 评论图片预览
	var getRedTicket = __webpack_require__(183);
	var getQRCode = __webpack_require__(124);
	// var infoData = $GLOBAL_CONFIG.sku_list;
	var shortcutBanner = __webpack_require__(187);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
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

	__webpack_require__(188).init();

	//快捷导航
	shortcutBanner.init();
	var /*topSlider,
	    shopId = $_CONFIG.shopId,*/
	productId = $_CONFIG.productId /*,
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
	    __webpack_require__(191).init();
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
	__webpack_require__(193).init();

	//更多评论
	getMoreDiscuss();

	//tab切换

	__webpack_require__(194).init();
	//分享
	var shareInfo = {
	    url: window.location.href,
	    title: document.title,
	    onlineUserId: $_CONFIG.onlineUserId
	};

	// 发送统计数据
	var analytic = function analytic(channel) {
	    BP.send({
	        event_id: 'G000P017',
	        shop_id: $_CONFIG['shopId'],
	        product_id: $_CONFIG['productId'],
	        channel_id: channel || ''
	    });
	};

	$shareBtn.on('click', '[data-shareto="weixin"]', function () {
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
	}).on('click', '[data-shareto="qq"]', function () {
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
	}).on('click', '[data-shareto="sina"]', function () {
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
	}).on('click', '[data-shareto="qzone"]', function () {
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
	$sale.on('click', function (e) {
	    e.stopPropagation();
	    var $list = $(this).find('ul');
	    if ($list.css('display') !== 'none') {
	        $list.hide();
	    } else {
	        $list.show();
	    }
	});

	$(document).on('click', function (e) {
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
	}, function (isAdd) {
	    isAdd ? $(this).text('取消收藏店铺') : $(this).text('收藏店铺');
	});

	//收藏商品
	//收藏商品
	productCollect('[data-node="topGoodInfo"]', '[data-action="collectProduct"]', {
	    onCollect: function onCollect() {
	        $collectProNum.show().animate({
	            'top': '-20px'
	        }, 500, function () {
	            $collectProNum.css('top', 0).hide();
	        });
	        $collectProSuccess.show();
	    },
	    mode: 'goodInfoCollect',
	    onUnCollect: function onUnCollect() {
	        $collectProSuccess.hide();
	    },
	    onFailed: function onFailed() {
	        $collectProClose.show();
	        setTimeout(function () {
	            $collectProClose.hide();
	        }, 2000);
	    }
	});

	$collectProClose.on('click', function () {
	    $(this).parents('[data-node="collectProSuccess"]').hide();
	});

	//点击手机购买，现实二维码  lyl 7.12
	$showQRCode.on("click", function () {
	    if (addUrl === "no") {
	        $showQRCodeP.children("img").attr("src", wap_url);
	        addUrl = "yes";
	    }

	    if (state === 0) {
	        state = 1;
	        $showQRCodeEm.eq(0).css('display', 'inline-block').next().css('display', 'none');
	        $showQRCodeP.css("display", "block");
	    } else {
	        state = 0;
	        $showQRCodeEm.eq(0).css('display', 'none').next().css('display', 'inline-block');
	        $showQRCodeP.css("display", "none");
	    }
	});

	imgPreviewer.init();

	// 商品图放大
	__webpack_require__(195);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 * jquery.spinner
	 * https://github.com/vsn4ik/jquery.spinner
	 * Copyright 2013-2016 vsn4ik
	 * Licensed under the MIT license
	 */

	'use strict';

	var spinningTimer;
	var Spinner;
	var Spinning = function Spinning($element, options) {
	    this.$el = $element;
	    this.options = $.extend({}, Spinning.rules.defaults, Spinning.rules[options.rule] || {}, options);
	    this.min = Number(this.options.min) || 0;
	    this.max = Number(this.options.max) || 0;

	    this.$el.on({
	        'focus.spinner': $.proxy(function (e) {
	            e.preventDefault();
	            // $(document).trigger('mouseup.spinner');
	            this.oldValue = this.value();
	        }, this),
	        'change.spinner': $.proxy(function (e) {
	            e.preventDefault();
	            this.value(this.$el.val());
	        }, this),
	        'keydown.spinner': $.proxy(function (e) {
	            var dir = {
	                38: 'up',
	                40: 'down'
	            }[e.which];

	            if (dir) {
	                e.preventDefault();
	                this.spin(dir);
	            }
	        }, this)
	    });

	    //init input value
	    this.oldValue = this.value();
	    this.value(this.$el.val());
	    return this;
	};

	Spinning.rules = {
	    defaults: {
	        min: null,
	        max: null,
	        step: 1,
	        precision: 0
	    },
	    currency: {
	        min: 0.00,
	        max: null,
	        step: 0.01,
	        precision: 2
	    },
	    quantity: {
	        min: 1,
	        max: 999,
	        step: 1,
	        precision: 0
	    },
	    percent: {
	        min: 1,
	        max: 100,
	        step: 1,
	        precision: 0
	    },
	    month: {
	        min: 1,
	        max: 12,
	        step: 1,
	        precision: 0
	    },
	    day: {
	        min: 1,
	        max: 31,
	        step: 1,
	        precision: 0
	    },
	    hour: {
	        min: 0,
	        max: 23,
	        step: 1,
	        precision: 0
	    },
	    minute: {
	        min: 1,
	        max: 59,
	        step: 1,
	        precision: 0
	    },
	    second: {
	        min: 1,
	        max: 59,
	        step: 1,
	        precision: 0
	    }
	};

	Spinning.prototype = {
	    spin: function spin(dir) {
	        /************ fuzhengchun begin *************/
	        if (this.$el.prop('disabled')) {
	            return;
	        }

	        if (this.$el.siblings('[data-spin=' + dir + ']').hasClass('disabled')) {
	            return;
	        }

	        /************ fuzhengchun end *************/

	        this.oldValue = this.value();
	        var step = $.isFunction(this.options.step) ? this.options.step.call(this, dir) : this.options.step;
	        var multipler = dir === 'up' ? 1 : -1;

	        var beforeChange = this.options.beforeChange || function () {};
	        if (beforeChange.call(this, this.oldValue, dir) !== false) {
	            this.value(this.oldValue + Number(step) * multipler);
	        }
	    },

	    value: function value(v) {
	        if (v === null || v === undefined) {
	            return this.numeric(this.$el.val());
	        }
	        v = this.numeric(v);

	        var valid = this.validate(v);
	        if (valid !== 0) {
	            if (valid === -1) {
	                v = this.min;
	                this.$el.trigger('rangemin.spinner');
	            } else {
	                v = this.max;
	                this.$el.trigger('rangemax.spinner');
	            }
	            // v = (valid === -1) ? this.min : this.max;
	            // this.$el.trigger('rangeout.spinner');
	        }
	        this.$el.val(v.toFixed(this.options.precision));

	        if (this.oldValue !== this.value()) {
	            // changing.spinner
	            this.$el.trigger('changing.spinner', [this.value(), this.oldValue]);

	            // lazy changed.spinner
	            clearTimeout(spinningTimer);
	            spinningTimer = setTimeout($.proxy(function () {
	                this.$el.trigger('changed.spinner', [this.value(), this.oldValue]);
	            }, this), Spinner.delay);
	        }
	    },

	    numeric: function numeric(v) {
	        v = this.options.precision > 0 ? parseFloat(v, 10) : parseInt(v, 10);

	        // If the variable is a number
	        if (isFinite(v)) {
	            return v;
	        }

	        return v || this.options.min || 0;
	    },

	    validate: function validate(val) {
	        if (this.options.min !== null && val < this.min) {
	            return -1;
	        }

	        if (this.options.max !== null && val > this.max) {
	            return 1;
	        }

	        return 0;
	    },

	    setMin: function setMin(val) {
	        var min = this.min = this.numeric(val);
	        this.options.min = min;
	    },

	    setMax: function setMax(val) {
	        var max = this.max = this.numeric(val);
	        this.options.max = max;
	    }
	};

	Spinner = function Spinner(element, options) {
	    this.$el = $(element);
	    this.$spinning = this.$el.find('[data-spin="spinner"]');

	    if (this.$spinning.length === 0) {
	        this.$spinning = this.$el.find(':input[type="text"]');
	    }

	    options = $.extend({}, options, this.$spinning.data());

	    this.spinning = new Spinning(this.$spinning, options);

	    this.$el.on('click.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))
	    /*.on('mousedown.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))*/
	    ;

	    /*$(document).on('mouseup.spinner', $.proxy(function() {
	        clearTimeout(this.spinTimeout);
	        clearInterval(this.spinInterval);
	    }, this));*/

	    if (options.delay) {
	        this.delay(options.delay);
	    }

	    if (options.changed) {
	        this.changed(options.changed);
	    }

	    if (options.changing) {
	        this.changing(options.changing);
	    }

	    if (options.rangemin) {
	        this.rangemin(options.rangemin);
	    }

	    if (options.rangemax) {
	        this.rangemax(options.rangemax);
	    }
	};

	Spinner.delay = 500;

	Spinner.prototype = {
	    constructor: Spinner,

	    spin: function spin(e) {
	        var dir = $(e.currentTarget).data('spin');

	        switch (e.type) {
	            case 'click':
	                e.preventDefault();
	                this.spinning.spin(dir);
	                break;
	            /*case 'mousedown':
	                if (e.which === 1) {
	                    this.spinTimeout = setTimeout($.proxy(this, 'beginSpin', dir), 300);
	                }
	                break;*/
	        }
	    },

	    delay: function delay(ms) {
	        var delay = Number(ms);

	        if (delay >= 0) {
	            this.constructor.delay = delay + 100;
	        }
	    },

	    value: function value() {
	        return this.spinning.value();
	    },

	    changed: function changed(fn) {
	        this.bindHandler('changed.spinner', fn);
	    },

	    changing: function changing(fn) {
	        this.bindHandler('changing.spinner', fn);
	    },

	    rangemax: function rangemax(fn) {
	        this.bindHandler('rangemax.spinner', fn);
	    },

	    rangemin: function rangemin(fn) {
	        this.bindHandler('rangemin.spinner', fn);
	    },

	    bindHandler: function bindHandler(t, fn) {
	        if ($.isFunction(fn)) {
	            this.$spinning.on(t, fn);
	        } else {
	            this.$spinning.off(t);
	        }
	    },

	    beginSpin: function beginSpin(dir) {
	        this.spinInterval = setInterval($.proxy(this.spinning, 'spin', dir), 100);
	    }
	};

	var old = $.fn.spinner;

	$.fn.spinner = function (options, value) {
	    return this.each(function () {
	        var data = $.data(this, 'spinner');

	        if (!data) {
	            data = new Spinner(this, options);

	            $.data(this, 'spinner', data);
	        }
	        if (options === 'delay' || options === 'changed' || options === 'changing') {
	            data[options](value);
	        } else if (options === 'step' && value) {
	            data.spinning.step = value;
	        } else if (options === 'spin' && value) {
	            data.spinning.spin(value);
	        }
	    });
	};

	$.fn.spinner.Constructor = Spinner;
	$.fn.spinner.noConflict = function () {
	    $.fn.spinner = old;
	    return this;
	};

	// $(function() {
	//     $('[data-trigger="spinner"]').spinner();
	// });

	module.exports = $.fn.spinner;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 125:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Parse or format dates
	 * @class fecha
	 */
	var fecha = {};
	var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
	var twoDigits = /\d\d?/;
	var threeDigits = /\d{3}/;
	var fourDigits = /\d{4}/;
	var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	var noop = function noop() {};

	function shorten(arr, sLen) {
	    var newArr = [];
	    for (var i = 0, len = arr.length; i < len; i++) {
	        newArr.push(arr[i].substr(0, sLen));
	    }
	    return newArr;
	}

	function monthUpdate(arrName) {
	    return function (d, v, i18n) {
	        var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
	        if (~index) {
	            d.month = index;
	        }
	    };
	}

	function pad(val, len) {
	    val = String(val);
	    len = len || 2;
	    while (val.length < len) {
	        val = '0' + val;
	    }
	    return val;
	}

	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthNamesShort = shorten(monthNames, 3);
	var dayNamesShort = shorten(dayNames, 3);
	fecha.i18n = {
	    dayNamesShort: dayNamesShort,
	    dayNames: dayNames,
	    monthNamesShort: monthNamesShort,
	    monthNames: monthNames,
	    amPm: ['am', 'pm'],
	    DoFn: function DoFn(D) {
	        return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
	    }
	};

	var formatFlags = {
	    D: function D(dateObj) {
	        return dateObj.getDate();
	    },
	    DD: function DD(dateObj) {
	        return pad(dateObj.getDate());
	    },
	    Do: function Do(dateObj, i18n) {
	        return i18n.DoFn(dateObj.getDate());
	    },
	    d: function d(dateObj) {
	        return dateObj.getDay();
	    },
	    dd: function dd(dateObj) {
	        return pad(dateObj.getDay());
	    },
	    ddd: function ddd(dateObj, i18n) {
	        return i18n.dayNamesShort[dateObj.getDay()];
	    },
	    dddd: function dddd(dateObj, i18n) {
	        return i18n.dayNames[dateObj.getDay()];
	    },
	    M: function M(dateObj) {
	        return dateObj.getMonth() + 1;
	    },
	    MM: function MM(dateObj) {
	        return pad(dateObj.getMonth() + 1);
	    },
	    MMM: function MMM(dateObj, i18n) {
	        return i18n.monthNamesShort[dateObj.getMonth()];
	    },
	    MMMM: function MMMM(dateObj, i18n) {
	        return i18n.monthNames[dateObj.getMonth()];
	    },
	    YY: function YY(dateObj) {
	        return String(dateObj.getFullYear()).substr(2);
	    },
	    YYYY: function YYYY(dateObj) {
	        return dateObj.getFullYear();
	    },
	    h: function h(dateObj) {
	        return dateObj.getHours() % 12 || 12;
	    },
	    hh: function hh(dateObj) {
	        return pad(dateObj.getHours() % 12 || 12);
	    },
	    H: function H(dateObj) {
	        return dateObj.getHours();
	    },
	    HH: function HH(dateObj) {
	        return pad(dateObj.getHours());
	    },
	    m: function m(dateObj) {
	        return dateObj.getMinutes();
	    },
	    mm: function mm(dateObj) {
	        return pad(dateObj.getMinutes());
	    },
	    s: function s(dateObj) {
	        return dateObj.getSeconds();
	    },
	    ss: function ss(dateObj) {
	        return pad(dateObj.getSeconds());
	    },
	    S: function S(dateObj) {
	        return Math.round(dateObj.getMilliseconds() / 100);
	    },
	    SS: function SS(dateObj) {
	        return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
	    },
	    SSS: function SSS(dateObj) {
	        return pad(dateObj.getMilliseconds(), 3);
	    },
	    a: function a(dateObj, i18n) {
	        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
	    },
	    A: function A(dateObj, i18n) {
	        return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
	    },
	    ZZ: function ZZ(dateObj) {
	        var o = dateObj.getTimezoneOffset();
	        return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
	    }
	};

	var parseFlags = {
	    D: [twoDigits, function (d, v) {
	        d.day = v;
	    }],
	    M: [twoDigits, function (d, v) {
	        d.month = v - 1;
	    }],
	    YY: [twoDigits, function (d, v) {
	        var da = new Date(),
	            cent = +('' + da.getFullYear()).substr(0, 2);
	        d.year = '' + (v > 68 ? cent - 1 : cent) + v;
	    }],
	    h: [twoDigits, function (d, v) {
	        d.hour = v;
	    }],
	    m: [twoDigits, function (d, v) {
	        d.minute = v;
	    }],
	    s: [twoDigits, function (d, v) {
	        d.second = v;
	    }],
	    YYYY: [fourDigits, function (d, v) {
	        d.year = v;
	    }],
	    S: [/\d/, function (d, v) {
	        d.millisecond = v * 100;
	    }],
	    SS: [/\d{2}/, function (d, v) {
	        d.millisecond = v * 10;
	    }],
	    SSS: [threeDigits, function (d, v) {
	        d.millisecond = v;
	    }],
	    d: [twoDigits, noop],
	    ddd: [word, noop],
	    MMM: [word, monthUpdate('monthNamesShort')],
	    MMMM: [word, monthUpdate('monthNames')],
	    a: [word, function (d, v, i18n) {
	        var val = v.toLowerCase();
	        if (val === i18n.amPm[0]) {
	            d.isPm = false;
	        } else if (val === i18n.amPm[1]) {
	            d.isPm = true;
	        }
	    }],
	    ZZ: [/[\+\-]\d\d:?\d\d/, function (d, v) {
	        var parts = (v + '').match(/([\+\-]|\d\d)/gi),
	            minutes;

	        if (parts) {
	            minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
	            d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
	        }
	    }]
	};
	parseFlags.dd = parseFlags.d;
	parseFlags.dddd = parseFlags.ddd;
	parseFlags.Do = parseFlags.DD = parseFlags.D;
	parseFlags.mm = parseFlags.m;
	parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
	parseFlags.MM = parseFlags.M;
	parseFlags.ss = parseFlags.s;
	parseFlags.A = parseFlags.a;

	// Some common format strings
	fecha.masks = {
	    'default': 'ddd MMM DD YYYY HH:mm:ss',
	    shortDate: 'M/D/YY',
	    mediumDate: 'MMM D, YYYY',
	    longDate: 'MMMM D, YYYY',
	    fullDate: 'dddd, MMMM D, YYYY',
	    shortTime: 'HH:mm',
	    mediumTime: 'HH:mm:ss',
	    longTime: 'HH:mm:ss.SSS'
	};

	/***
	 * Format a date
	 * @method format
	 * @param {Date|number} dateObj
	 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
	 */
	fecha.format = function (dateObj, mask, i18nSettings) {
	    var i18n = i18nSettings || fecha.i18n;

	    if (typeof dateObj === 'number') {
	        dateObj = new Date(dateObj);
	    }

	    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
	        throw new Error('Invalid Date in fecha.format');
	    }

	    mask = fecha.masks[mask] || mask || fecha.masks['default'];

	    return mask.replace(token, function ($0) {
	        return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
	    });
	};

	/**
	 * Parse a date string into an object, changes - into /
	 * @method parse
	 * @param {string} dateStr Date string
	 * @param {string} format Date parse format
	 * @returns {Date|boolean}
	 */
	fecha.parse = function (dateStr, format, i18nSettings) {
	    var i18n = i18nSettings || fecha.i18n;

	    if (typeof format !== 'string') {
	        throw new Error('Invalid format in fecha.parse');
	    }

	    format = fecha.masks[format] || format;

	    // Avoid regular expression denial of service, fail early for really long strings
	    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
	    if (dateStr.length > 1000) {
	        return false;
	    }

	    var isValid = true;
	    var dateInfo = {};
	    format.replace(token, function ($0) {
	        if (parseFlags[$0]) {
	            var info = parseFlags[$0];
	            var index = dateStr.search(info[0]);
	            if (!~index) {
	                isValid = false;
	            } else {
	                dateStr.replace(info[0], function (result) {
	                    info[1](dateInfo, result, i18n);
	                    dateStr = dateStr.substr(index + result.length);
	                    return result;
	                });
	            }
	        }

	        return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
	    });

	    if (!isValid) {
	        return false;
	    }

	    var today = new Date();
	    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
	        dateInfo.hour = +dateInfo.hour + 12;
	    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
	        dateInfo.hour = 0;
	    }

	    var date;
	    if (dateInfo.timezoneOffset != null) {
	        dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
	        date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1, dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
	    } else {
	        date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1, dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
	    }
	    return date;
	};

	module.exports = fecha;

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	/**
	 * BxSlider v4.1.2 - Fully loaded, responsive content slider
	 * http://bxslider.com
	 *
	 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
	 * Written while drinking Belgian ales and listening to jazz
	 *
	 * Released under the MIT license - http://opensource.org/licenses/MIT
	 */

	(function ($) {

	    var plugin = {};

	    var defaults = {

	        // GENERAL
	        mode: 'horizontal',
	        slideSelector: '',
	        infiniteLoop: true,
	        hideControlOnEnd: false,
	        speed: 500,
	        easing: null,
	        slideMargin: 0,
	        startSlide: 0,
	        randomStart: false,
	        captions: false,
	        ticker: false,
	        tickerHover: false,
	        adaptiveHeight: false,
	        adaptiveHeightSpeed: 500,
	        video: false,
	        useCSS: true,
	        preloadImages: 'visible',
	        responsive: true,
	        slideZIndex: 50,
	        wrapperClass: 'bx-wrapper',

	        // TOUCH
	        touchEnabled: true,
	        swipeThreshold: 50,
	        oneToOneTouch: true,
	        preventDefaultSwipeX: true,
	        preventDefaultSwipeY: false,

	        // PAGER
	        pager: true,
	        pagerType: 'full',
	        pagerShortSeparator: ' / ',
	        pagerSelector: null,
	        buildPager: null,
	        pagerCustom: null,
	        pagerTriggerEvent: 'click',

	        // CONTROLS
	        controls: true,
	        nextText: 'Next',
	        prevText: 'Prev',
	        nextSelector: null,
	        prevSelector: null,
	        autoControls: false,
	        startText: 'Start',
	        stopText: 'Stop',
	        autoControlsCombine: false,
	        autoControlsSelector: null,

	        // AUTO
	        auto: false,
	        pause: 4000,
	        autoStart: true,
	        autoDirection: 'next',
	        autoHover: false,
	        autoDelay: 0,
	        autoSlideForOnePage: false,

	        // CAROUSEL
	        minSlides: 1,
	        maxSlides: 1,
	        moveSlides: 0,
	        slideWidth: 0,

	        // CALLBACKS
	        onSliderLoad: function onSliderLoad() {},
	        onSlideBefore: function onSlideBefore() {},
	        onSlideAfter: function onSlideAfter() {},
	        onSlideNext: function onSlideNext() {},
	        onSlidePrev: function onSlidePrev() {},
	        onSliderResize: function onSliderResize() {}
	    };

	    $.fn.bxSlider = function (options) {
	        if (this.length == 0) return this;
	        // support mutltiple elements
	        if (this.length > 1) {
	            this.each(function () {
	                $(this).bxSlider(options);
	            });
	            return this;
	        }

	        // create a namespace to be used throughout the plugin
	        var slider = {};
	        // set a reference to our slider element
	        var el = this;
	        plugin.el = this;

	        /**
	         * Makes slideshow responsive
	         */
	        // first get the original window dimens (thanks alot IE)
	        var windowWidth = $(window).width();
	        var windowHeight = $(window).height();

	        /**
	         * ===================================================================================
	         * = PRIVATE FUNCTIONS
	         * ===================================================================================
	         */

	        /**
	         * Initializes namespace settings to be used throughout plugin
	         */
	        var init = function init() {
	            // merge user-supplied options with the defaults
	            slider.settings = $.extend({}, defaults, options);
	            // parse slideWidth setting
	            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
	            // store the original children
	            slider.children = el.children(slider.settings.slideSelector);
	            // check if actual number of slides is less than minSlides / maxSlides
	            if (slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
	            if (slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
	            // if random start, set the startSlide setting to random number
	            if (slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
	            // store active slide information
	            slider.active = {
	                index: slider.settings.startSlide
	            };
	            // store if the slider is in carousel mode (displaying / moving multiple slides)
	            slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
	            // if carousel, force preloadImages = 'all'
	            if (slider.carousel) slider.settings.preloadImages = 'all';
	            // calculate the min / max width thresholds based on min / max number of slides
	            // used to setup and update carousel slides dimensions
	            slider.minThreshold = slider.settings.minSlides * slider.settings.slideWidth + (slider.settings.minSlides - 1) * slider.settings.slideMargin;
	            slider.maxThreshold = slider.settings.maxSlides * slider.settings.slideWidth + (slider.settings.maxSlides - 1) * slider.settings.slideMargin;
	            // store the current state of the slider (if currently animating, working is true)
	            slider.working = false;
	            // initialize the controls object
	            slider.controls = {};
	            // initialize an auto interval
	            slider.interval = null;
	            // determine which property to use for transitions
	            slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
	            // determine if hardware acceleration can be used
	            slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && function () {
	                // create our test div element
	                var div = document.createElement('div');
	                // css transition properties
	                var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
	                // test for each property
	                for (var i in props) {
	                    if (div.style[props[i]] !== undefined) {
	                        slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
	                        slider.animProp = '-' + slider.cssPrefix + '-transform';
	                        return true;
	                    }
	                }
	                return false;
	            }();
	            // if vertical mode always make maxSlides and minSlides equal
	            if (slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
	            // save original style data
	            el.data("origStyle", el.attr("style"));
	            el.children(slider.settings.slideSelector).each(function () {
	                $(this).data("origStyle", $(this).attr("style"));
	            });
	            // perform all DOM / CSS modifications
	            setup();
	        };

	        /**
	         * Performs all DOM and CSS modifications
	         */
	        var setup = function setup() {
	            // wrap el in a wrapper
	            el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
	            // store a namspace reference to .bx-viewport
	            slider.viewport = el.parent();
	            // add a loading div to display while images are loading
	            slider.loader = $('<div class="bx-loading" />');
	            slider.viewport.prepend(slider.loader);
	            // set el to a massive width, to hold any needed slides
	            // also strip any margin and padding from el
	            el.css({
	                width: slider.settings.mode == 'horizontal' ? slider.children.length * 100 + 215 + '%' : 'auto',
	                position: 'relative'
	            });
	            // if using CSS, add the easing property
	            if (slider.usingCSS && slider.settings.easing) {
	                el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
	                // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
	            } else if (!slider.settings.easing) {
	                slider.settings.easing = 'swing';
	            }
	            var slidesShowing = getNumberSlidesShowing();
	            // make modifications to the viewport (.bx-viewport)
	            slider.viewport.css({
	                width: '100%',
	                overflow: 'hidden',
	                position: 'relative'
	            });
	            slider.viewport.parent().css({
	                maxWidth: getViewportMaxWidth()
	            });
	            // make modification to the wrapper (.bx-wrapper)
	            if (!slider.settings.pager) {
	                slider.viewport.parent().css({
	                    margin: '0 auto 0px'
	                });
	            }
	            // apply css to all slider children
	            slider.children.css({
	                'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
	                listStyle: 'none',
	                position: 'relative'
	            });
	            // apply the calculated width after the float is applied to prevent scrollbar interference
	            slider.children.css('width', getSlideWidth());
	            // if slideMargin is supplied, add the css
	            if (slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
	            if (slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
	            // if "fade" mode, add positioning and z-index CSS
	            if (slider.settings.mode == 'fade') {
	                slider.children.css({
	                    position: 'absolute',
	                    zIndex: 0,
	                    display: 'none'
	                });
	                // prepare the z-index on the showing element
	                slider.children.eq(slider.settings.startSlide).css({
	                    zIndex: slider.settings.slideZIndex,
	                    display: 'block'
	                });
	            }
	            // create an element to contain all slider controls (pager, start / stop, etc)
	            slider.controls.el = $('<div class="bx-controls" />');
	            // if captions are requested, add them
	            if (slider.settings.captions) appendCaptions();
	            // check if startSlide is last slide
	            slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
	            // if video is true, set up the fitVids plugin
	            if (slider.settings.video) el.fitVids();
	            // set the default preload selector (visible)
	            var preloadSelector = slider.children.eq(slider.settings.startSlide);
	            if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
	            // only check for control addition if not in "ticker" mode
	            if (!slider.settings.ticker) {
	                // if pager is requested, add it
	                if (slider.settings.pager) appendPager();
	                // if controls are requested, add them
	                if (slider.settings.controls) appendControls();
	                // if auto is true, and auto controls are requested, add them
	                if (slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
	                // if any control option is requested, add the controls wrapper
	                if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
	                // if ticker mode, do not allow a pager
	            } else {
	                slider.settings.pager = false;
	            }
	            // preload all images, then perform final DOM / CSS modifications that depend on images being loaded
	            loadElements(preloadSelector, start);
	        };

	        var loadElements = function loadElements(selector, callback) {
	            var total = selector.find('img, iframe').length;
	            if (total == 0) {
	                callback();
	                return;
	            }
	            var count = 0;
	            callback();
	        };

	        /**
	         * Start the slider
	         */
	        var start = function start() {
	            // if infinite loop, prepare additional slides
	            if (slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker) {
	                var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
	                var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
	                var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
	                el.append(sliceAppend).prepend(slicePrepend);
	            }
	            // remove the loading DOM element
	            slider.loader.remove();
	            // set the left / top position of "el"
	            setSlidePosition();
	            // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
	            if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
	            // set the viewport height
	            slider.viewport.height(getViewportHeight());
	            // make sure everything is positioned just right (same as a window resize)
	            el.redrawSlider();
	            // onSliderLoad callback
	            slider.settings.onSliderLoad(slider.active.index);
	            // slider has been fully initialized
	            slider.initialized = true;
	            // bind the resize call to the window
	            if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
	            // if auto is true and has more than 1 page, start the show
	            if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
	            // if ticker is true, start the ticker
	            if (slider.settings.ticker) initTicker();
	            // if pager is requested, make the appropriate pager link active
	            if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
	            // check for any updates to the controls (like hideControlOnEnd updates)
	            if (slider.settings.controls) updateDirectionControls();
	            // if touchEnabled is true, setup the touch events
	            //if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
	        };

	        /**
	         * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
	         */
	        var getViewportHeight = function getViewportHeight() {
	            var height = 0;
	            // first determine which children (slides) should be used in our height calculation
	            var children = $();
	            // if mode is not "vertical" and adaptiveHeight is false, include all children
	            if (slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight) {
	                children = slider.children;
	            } else {
	                // if not carousel, return the single active child
	                if (!slider.carousel) {
	                    children = slider.children.eq(slider.active.index);
	                    // if carousel, return a slice of children
	                } else {
	                    // get the individual slide index
	                    var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
	                    // add the current slide to the children
	                    children = slider.children.eq(currentIndex);
	                    // cycle through the remaining "showing" slides
	                    for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
	                        // if looped back to the start
	                        if (currentIndex + i >= slider.children.length) {
	                            children = children.add(slider.children.eq(i - 1));
	                        } else {
	                            children = children.add(slider.children.eq(currentIndex + i));
	                        }
	                    }
	                }
	            }
	            // if "vertical" mode, calculate the sum of the heights of the children
	            if (slider.settings.mode == 'vertical') {
	                children.each(function (index) {
	                    height += $(this).outerHeight();
	                });
	                // add user-supplied margins
	                if (slider.settings.slideMargin > 0) {
	                    height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
	                }
	                // if not "vertical" mode, calculate the max height of the children
	            } else {
	                height = Math.max.apply(Math, children.map(function () {
	                    return $(this).outerHeight(false);
	                }).get());
	            }

	            if (slider.viewport.css('box-sizing') == 'border-box') {
	                height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) + parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
	            } else if (slider.viewport.css('box-sizing') == 'padding-box') {
	                height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
	            }

	            return height;
	        };

	        /**
	         * Returns the calculated width to be used for the outer wrapper / viewport
	         */
	        var getViewportMaxWidth = function getViewportMaxWidth() {
	            var width = '100%';
	            if (slider.settings.slideWidth > 0) {
	                if (slider.settings.mode == 'horizontal') {
	                    width = slider.settings.maxSlides * slider.settings.slideWidth + (slider.settings.maxSlides - 1) * slider.settings.slideMargin;
	                } else {
	                    width = slider.settings.slideWidth;
	                }
	            }
	            return width;
	        };

	        /**
	         * Returns the calculated width to be applied to each slide
	         */
	        var getSlideWidth = function getSlideWidth() {
	            // start with any user-supplied slide width
	            var newElWidth = slider.settings.slideWidth;
	            // get the current viewport width
	            var wrapWidth = slider.viewport.width();
	            // if slide width was not supplied, or is larger than the viewport use the viewport width
	            if (slider.settings.slideWidth == 0 || slider.settings.slideWidth > wrapWidth && !slider.carousel || slider.settings.mode == 'vertical') {
	                newElWidth = wrapWidth;
	                // if carousel, use the thresholds to determine the width
	            } else if (slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal') {
	                if (wrapWidth > slider.maxThreshold) {
	                    // newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
	                } else if (wrapWidth < slider.minThreshold) {
	                    newElWidth = (wrapWidth - slider.settings.slideMargin * (slider.settings.minSlides - 1)) / slider.settings.minSlides;
	                }
	            }
	            return newElWidth;
	        };

	        /**
	         * Returns the number of slides currently visible in the viewport (includes partially visible slides)
	         */
	        var getNumberSlidesShowing = function getNumberSlidesShowing() {
	            var slidesShowing = 1;
	            if (slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0) {
	                // if viewport is smaller than minThreshold, return minSlides
	                if (slider.viewport.width() < slider.minThreshold) {
	                    slidesShowing = slider.settings.minSlides;
	                    // if viewport is larger than minThreshold, return maxSlides
	                } else if (slider.viewport.width() > slider.maxThreshold) {
	                    slidesShowing = slider.settings.maxSlides;
	                    // if viewport is between min / max thresholds, divide viewport width by first child width
	                } else {
	                    var childWidth = slider.children.first().width() + slider.settings.slideMargin;
	                    slidesShowing = Math.floor((slider.viewport.width() + slider.settings.slideMargin) / childWidth);
	                }
	                // if "vertical" mode, slides showing will always be minSlides
	            } else if (slider.settings.mode == 'vertical') {
	                slidesShowing = slider.settings.minSlides;
	            }
	            return slidesShowing;
	        };

	        /**
	         * Returns the number of pages (one full viewport of slides is one "page")
	         */
	        var getPagerQty = function getPagerQty() {
	            var pagerQty = 0;
	            // if moveSlides is specified by the user
	            if (slider.settings.moveSlides > 0) {
	                if (slider.settings.infiniteLoop) {
	                    pagerQty = Math.ceil(slider.children.length / getMoveBy());
	                } else {
	                    // use a while loop to determine pages
	                    var breakPoint = 0;
	                    var counter = 0;
	                    // when breakpoint goes above children length, counter is the number of pages
	                    while (breakPoint < slider.children.length) {
	                        ++pagerQty;
	                        breakPoint = counter + getNumberSlidesShowing();
	                        counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
	                    }
	                }
	                // if moveSlides is 0 (auto) divide children length by sides showing, then round up
	            } else {
	                pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
	            }
	            return pagerQty;
	        };

	        /**
	         * Returns the number of indivual slides by which to shift the slider
	         */
	        var getMoveBy = function getMoveBy() {
	            // if moveSlides was set by the user and moveSlides is less than number of slides showing
	            if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
	                return slider.settings.moveSlides;
	            }
	            // if moveSlides is 0 (auto)
	            return getNumberSlidesShowing();
	        };

	        /**
	         * Sets the slider's (el) left or top position
	         */
	        var setSlidePosition = function setSlidePosition() {
	            // if last slide, not infinite loop, and number of children is larger than specified maxSlides
	            if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
	                if (slider.settings.mode == 'horizontal') {
	                    // get the last child's position
	                    var lastChild = slider.children.last();
	                    var position = lastChild.position();
	                    // set the left position
	                    setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
	                } else if (slider.settings.mode == 'vertical') {
	                    // get the last showing index's position
	                    var lastShowingIndex = slider.children.length - slider.settings.minSlides;
	                    var position = slider.children.eq(lastShowingIndex).position();
	                    // set the top position
	                    setPositionProperty(-position.top, 'reset', 0);
	                }
	                // if not last slide
	            } else {
	                // get the position of the first showing slide
	                var position = slider.children.eq(slider.active.index * getMoveBy()).position();
	                // check for last slide
	                if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
	                // set the repective position
	                if (position != undefined) {
	                    if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
	                }
	            }
	        };

	        /**
	         * Sets the el's animating property position (which in turn will sometimes animate el).
	         * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
	         *
	         * @param value (int)
	         *  - the animating property's value
	         *
	         * @param type (string) 'slider', 'reset', 'ticker'
	         *  - the type of instance for which the function is being
	         *
	         * @param duration (int)
	         *  - the amount of time (in ms) the transition should occupy
	         *
	         * @param params (array) optional
	         *  - an optional parameter containing any variables that need to be passed in
	         */
	        var setPositionProperty = function setPositionProperty(value, type, duration, params) {
	            // use CSS transform
	            if (slider.usingCSS) {
	                // determine the translate3d value
	                var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
	                // add the CSS transition-duration
	                el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
	                if (type == 'slide') {
	                    // set the property value
	                    el.css(slider.animProp, propValue);
	                    // bind a callback method - executes when CSS transition completes
	                    el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
	                        // unbind the callback
	                        el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
	                        updateAfterSlideTransition();
	                    });
	                } else if (type == 'reset') {
	                    el.css(slider.animProp, propValue);
	                } else if (type == 'ticker') {
	                    // make the transition use 'linear'
	                    el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
	                    el.css(slider.animProp, propValue);
	                    // bind a callback method - executes when CSS transition completes
	                    el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
	                        // unbind the callback
	                        el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
	                        // reset the position
	                        setPositionProperty(params['resetValue'], 'reset', 0);
	                        // start the loop again
	                        tickerLoop();
	                    });
	                }
	                // use JS animate
	            } else {
	                var animateObj = {};
	                animateObj[slider.animProp] = value;
	                if (type == 'slide') {
	                    el.animate(animateObj, duration, slider.settings.easing, function () {
	                        updateAfterSlideTransition();
	                    });
	                } else if (type == 'reset') {
	                    el.css(slider.animProp, value);
	                } else if (type == 'ticker') {
	                    el.animate(animateObj, speed, 'linear', function () {
	                        setPositionProperty(params['resetValue'], 'reset', 0);
	                        // run the recursive loop after animation
	                        tickerLoop();
	                    });
	                }
	            }
	        };

	        /**
	         * Populates the pager with proper amount of pages
	         */
	        var populatePager = function populatePager() {
	            var pagerHtml = '';
	            var pagerQty = getPagerQty();
	            // loop through each pager item
	            for (var i = 0; i < pagerQty; i++) {
	                var linkContent = '';
	                // if a buildPager function is supplied, use it to get pager link value, else use index + 1
	                if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager)) {
	                    linkContent = slider.settings.buildPager(i);
	                    slider.pagerEl.addClass('bx-custom-pager');
	                } else {
	                    linkContent = i + 1;
	                    slider.pagerEl.addClass('bx-default-pager');
	                }
	                // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
	                // add the markup to the string
	                pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
	            }
	            // populate the pager element with pager links
	            slider.pagerEl.html(pagerHtml);
	        };

	        /**
	         * Appends the pager to the controls element
	         */
	        var appendPager = function appendPager() {
	            if (!slider.settings.pagerCustom) {
	                // create the pager DOM element
	                slider.pagerEl = $('<div class="bx-pager" />');
	                // if a pager selector was supplied, populate it with the pager
	                if (slider.settings.pagerSelector) {
	                    $(slider.settings.pagerSelector).html(slider.pagerEl);
	                    // if no pager selector was supplied, add it after the wrapper
	                } else {
	                    slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
	                }
	                // populate the pager
	                populatePager();
	            } else {
	                slider.pagerEl = $(slider.settings.pagerCustom);
	            }
	            // assign the pager trigger event binding
	            slider.pagerEl.on(slider.settings.pagerTriggerEvent, 'a', clickPagerBind);
	        };

	        /**
	         * Appends prev / next controls to the controls element
	         */
	        var appendControls = function appendControls() {
	            slider.controls.next = $(slider.settings.next);
	            slider.controls.prev = $(slider.settings.prev);
	            // bind click actions to the controls
	            slider.controls.next.bind('click', clickNextBind);
	            slider.controls.prev.bind('click', clickPrevBind);
	            // if nextSlector was supplied, populate it
	            if (slider.settings.nextSelector) {
	                $(slider.settings.nextSelector).append(slider.controls.next);
	            }
	            // if prevSlector was supplied, populate it
	            if (slider.settings.prevSelector) {
	                $(slider.settings.prevSelector).append(slider.controls.prev);
	            }
	            // if no custom selectors were supplied
	            if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
	                // add the controls to the DOM
	                slider.controls.directionEl = $('<div class="bx-controls-direction" />');
	                // add the control elements to the directionEl
	                slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
	                // slider.viewport.append(slider.controls.directionEl);
	                slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
	            }
	        };

	        /**
	         * Appends start / stop auto controls to the controls element
	         */
	        var appendControlsAuto = function appendControlsAuto() {
	            slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
	            slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
	            // add the controls to the DOM
	            slider.controls.autoEl = $('<div class="bx-controls-auto" />');
	            // bind click actions to the controls
	            slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
	            slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
	            // if autoControlsCombine, insert only the "start" control
	            if (slider.settings.autoControlsCombine) {
	                slider.controls.autoEl.append(slider.controls.start);
	                // if autoControlsCombine is false, insert both controls
	            } else {
	                slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
	            }
	            // if auto controls selector was supplied, populate it with the controls
	            if (slider.settings.autoControlsSelector) {
	                $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
	                // if auto controls selector was not supplied, add it after the wrapper
	            } else {
	                slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
	            }
	            // update the auto controls
	            updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
	        };

	        /**
	         * Appends image captions to the DOM
	         */
	        var appendCaptions = function appendCaptions() {
	            // cycle through each child
	            slider.children.each(function (index) {
	                // get the image title attribute
	                var title = $(this).find('img:first').attr('title');
	                // append the caption
	                if (title != undefined && ('' + title).length) {
	                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
	                }
	            });
	        };

	        /**
	         * Click next binding
	         *
	         * @param e (event)
	         *  - DOM event object
	         */
	        var clickNextBind = function clickNextBind(e) {
	            // if auto show is running, stop it
	            if (slider.settings.auto) el.stopAuto();
	            el.goToNextSlide();
	            e.preventDefault();
	        };

	        /**
	         * Click prev binding
	         *
	         * @param e (event)
	         *  - DOM event object
	         */
	        var clickPrevBind = function clickPrevBind(e) {
	            // if auto show is running, stop it
	            if (slider.settings.auto) el.stopAuto();
	            el.goToPrevSlide();
	            e.preventDefault();
	        };

	        /**
	         * Click start binding
	         *
	         * @param e (event)
	         *  - DOM event object
	         */
	        var clickStartBind = function clickStartBind(e) {
	            el.startAuto();
	            e.preventDefault();
	        };

	        /**
	         * Click stop binding
	         *
	         * @param e (event)
	         *  - DOM event object
	         */
	        var clickStopBind = function clickStopBind(e) {
	            el.stopAuto();
	            e.preventDefault();
	        };

	        /**
	         * Click pager binding
	         *
	         * @param e (event)
	         *  - DOM event object
	         */
	        var clickPagerBind = function clickPagerBind(e) {
	            // if auto show is running, stop it
	            if (slider.settings.auto) el.stopAuto();
	            var pagerLink = $(e.currentTarget);
	            if (pagerLink.attr('data-slide-index') !== undefined) {
	                var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
	                // if clicked pager link is not active, continue with the goToSlide call
	                if (pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
	                e.preventDefault();
	            }
	        };

	        /**
	         * Updates the pager links with an active class
	         *
	         * @param slideIndex (int)
	         *  - index of slide to make active
	         */
	        var updatePagerActive = function updatePagerActive(slideIndex) {
	            // if "short" pager type
	            var len = slider.children.length; // nb of children
	            if (slider.settings.pagerType == 'short') {
	                if (slider.settings.maxSlides > 1) {
	                    len = Math.ceil(slider.children.length / slider.settings.maxSlides);
	                }
	                slider.pagerEl.html(slideIndex + 1 + slider.settings.pagerShortSeparator + len);
	                return;
	            }
	            // remove all pager active classes
	            slider.pagerEl.find('a').removeClass('active');
	            // apply the active class for all pagers
	            slider.pagerEl.each(function (i, el) {
	                $(el).find('a').eq(slideIndex).addClass('active');
	            });
	        };

	        /**
	         * Performs needed actions after a slide transition
	         */
	        var updateAfterSlideTransition = function updateAfterSlideTransition() {
	            // if infinte loop is true
	            if (slider.settings.infiniteLoop) {
	                var position = '';
	                // first slide
	                if (slider.active.index == 0) {
	                    // set the new position
	                    position = slider.children.eq(0).position();
	                    // carousel, last slide
	                } else if (slider.active.index == getPagerQty() - 1 && slider.carousel) {
	                    position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
	                    // last slide
	                } else if (slider.active.index == slider.children.length - 1) {
	                    position = slider.children.eq(slider.children.length - 1).position();
	                }
	                if (position) {
	                    if (slider.settings.mode == 'horizontal') {
	                        setPositionProperty(-position.left, 'reset', 0);
	                    } else if (slider.settings.mode == 'vertical') {
	                        setPositionProperty(-position.top, 'reset', 0);
	                    }
	                }
	            }
	            // declare that the transition is complete
	            slider.working = false;
	            // onSlideAfter callback
	            slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
	        };

	        /**
	         * Updates the auto controls state (either active, or combined switch)
	         *
	         * @param state (string) "start", "stop"
	         *  - the new state of the auto show
	         */
	        var updateAutoControls = function updateAutoControls(state) {
	            // if autoControlsCombine is true, replace the current control with the new state
	            if (slider.settings.autoControlsCombine) {
	                slider.controls.autoEl.html(slider.controls[state]);
	                // if autoControlsCombine is false, apply the "active" class to the appropriate control
	            } else {
	                slider.controls.autoEl.find('a').removeClass('active');
	                slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
	            }
	        };

	        /**
	         * Updates the direction controls (checks if either should be hidden)
	         */
	        var updateDirectionControls = function updateDirectionControls() {
	            if (getPagerQty() == 1) {
	                slider.controls.prev.addClass('disabled');
	                slider.controls.next.addClass('disabled');
	            } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
	                // if first slide
	                if (slider.active.index == 0) {
	                    slider.controls.prev.addClass('disabled');
	                    slider.controls.next.removeClass('disabled');
	                    // if last slide
	                } else if (slider.active.index == getPagerQty() - 1) {
	                    slider.controls.next.addClass('disabled');
	                    slider.controls.prev.removeClass('disabled');
	                    // if any slide in the middle
	                } else {
	                    slider.controls.prev.removeClass('disabled');
	                    slider.controls.next.removeClass('disabled');
	                }
	            }
	        };

	        /**
	         * Initialzes the auto process
	         */
	        var initAuto = function initAuto() {
	            // if autoDelay was supplied, launch the auto show using a setTimeout() call
	            if (slider.settings.autoDelay > 0) {
	                var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
	                // if autoDelay was not supplied, start the auto show normally
	            } else {
	                el.startAuto();
	            }
	            // if autoHover is requested
	            if (slider.settings.autoHover) {
	                // on el hover
	                el.hover(function () {
	                    // if the auto show is currently playing (has an active interval)
	                    if (slider.interval) {
	                        // stop the auto show and pass true agument which will prevent control update
	                        el.stopAuto(true);
	                        // create a new autoPaused value which will be used by the relative "mouseout" event
	                        slider.autoPaused = true;
	                    }
	                }, function () {
	                    // if the autoPaused value was created be the prior "mouseover" event
	                    if (slider.autoPaused) {
	                        // start the auto show and pass true agument which will prevent control update
	                        el.startAuto(true);
	                        // reset the autoPaused value
	                        slider.autoPaused = null;
	                    }
	                });
	            }
	        };

	        /**
	         * Initialzes the ticker process
	         */
	        var initTicker = function initTicker() {
	            var startPosition = 0;
	            // if autoDirection is "next", append a clone of the entire slider
	            if (slider.settings.autoDirection == 'next') {
	                el.append(slider.children.clone().addClass('bx-clone'));
	                // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
	            } else {
	                el.prepend(slider.children.clone().addClass('bx-clone'));
	                var position = slider.children.first().position();
	                startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
	            }
	            setPositionProperty(startPosition, 'reset', 0);
	            // do not allow controls in ticker mode
	            slider.settings.pager = false;
	            slider.settings.controls = false;
	            slider.settings.autoControls = false;
	            // if autoHover is requested
	            if (slider.settings.tickerHover && !slider.usingCSS) {
	                // on el hover
	                slider.viewport.hover(function () {
	                    el.stop();
	                }, function () {
	                    // calculate the total width of children (used to calculate the speed ratio)
	                    var totalDimens = 0;
	                    slider.children.each(function (index) {
	                        totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
	                    });
	                    // calculate the speed ratio (used to determine the new speed to finish the paused animation)
	                    var ratio = slider.settings.speed / totalDimens;
	                    // determine which property to use
	                    var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
	                    // calculate the new speed
	                    var newSpeed = ratio * (totalDimens - Math.abs(parseInt(el.css(property))));
	                    tickerLoop(newSpeed);
	                });
	            }
	            // start the ticker loop
	            tickerLoop();
	        };

	        /**
	         * Runs a continuous loop, news ticker-style
	         */
	        var tickerLoop = function tickerLoop(resumeSpeed) {
	            speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
	            var position = {
	                left: 0,
	                top: 0
	            };
	            var reset = {
	                left: 0,
	                top: 0
	            };
	            // if "next" animate left position to last child, then reset left to 0
	            if (slider.settings.autoDirection == 'next') {
	                position = el.find('.bx-clone').first().position();
	                // if "prev" animate left position to 0, then reset left to first non-clone child
	            } else {
	                reset = slider.children.first().position();
	            }
	            var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
	            var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
	            var params = {
	                resetValue: resetValue
	            };
	            setPositionProperty(animateProperty, 'ticker', speed, params);
	        };

	        /**
	         * Initializes touch events
	         */
	        // var initTouch = function(){
	        // 	// initialize object to contain all touch values
	        // 	slider.touch = {
	        // 		start: {x: 0, y: 0},
	        // 		end: {x: 0, y: 0}
	        // 	}
	        // 	slider.viewport.bind('touchstart', onTouchStart);
	        // }

	        // /**
	        //  * Event handler for "touchstart"
	        //  *
	        //  * @param e (event)
	        //  *  - DOM event object
	        //  */
	        // var onTouchStart = function(e){
	        // 	if(slider.working){
	        // 		e.preventDefault();
	        // 	}else{
	        // 		// record the original position when touch starts
	        // 		slider.touch.originalPos = el.position();
	        // 		var orig = e.originalEvent;
	        // 		// record the starting touch x, y coordinates
	        // 		slider.touch.start.x = orig.changedTouches[0].pageX;
	        // 		slider.touch.start.y = orig.changedTouches[0].pageY;
	        // 		// bind a "touchmove" event to the viewport
	        // 		slider.viewport.bind('touchmove', onTouchMove);
	        // 		// bind a "touchend" event to the viewport
	        // 		slider.viewport.bind('touchend', onTouchEnd);
	        // 	}
	        // }

	        // /**
	        //  * Event handler for "touchmove"
	        //  *
	        //  * @param e (event)
	        //  *  - DOM event object
	        //  */
	        // var onTouchMove = function(e){
	        // 	var orig = e.originalEvent;
	        // 	// if scrolling on y axis, do not prevent default
	        // 	var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
	        // 	var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
	        // 	// x axis swipe
	        // 	if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
	        // 		e.preventDefault();
	        // 	// y axis swipe
	        // 	}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
	        // 		e.preventDefault();
	        // 	}
	        // 	if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
	        // 		var value = 0;
	        // 		// if horizontal, drag along x axis
	        // 		if(slider.settings.mode == 'horizontal'){
	        // 			var change = orig.changedTouches[0].pageX - slider.touch.start.x;
	        // 			value = slider.touch.originalPos.left + change;
	        // 		// if vertical, drag along y axis
	        // 		}else{
	        // 			var change = orig.changedTouches[0].pageY - slider.touch.start.y;
	        // 			value = slider.touch.originalPos.top + change;
	        // 		}
	        // 		setPositionProperty(value, 'reset', 0);
	        // 	}
	        // }

	        // /**
	        //  * Event handler for "touchend"
	        //  *
	        //  * @param e (event)
	        //  *  - DOM event object
	        //  */
	        // var onTouchEnd = function(e){
	        // 	slider.viewport.unbind('touchmove', onTouchMove);
	        // 	var orig = e.originalEvent;
	        // 	var value = 0;
	        // 	// record end x, y positions
	        // 	slider.touch.end.x = orig.changedTouches[0].pageX;
	        // 	slider.touch.end.y = orig.changedTouches[0].pageY;
	        // 	// if fade mode, check if absolute x distance clears the threshold
	        // 	if(slider.settings.mode == 'fade'){
	        // 		var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
	        // 		if(distance >= slider.settings.swipeThreshold){
	        // 			slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
	        // 			el.stopAuto();
	        // 		}
	        // 	// not fade mode
	        // 	}else{
	        // 		var distance = 0;
	        // 		// calculate distance and el's animate property
	        // 		if(slider.settings.mode == 'horizontal'){
	        // 			distance = slider.touch.end.x - slider.touch.start.x;
	        // 			value = slider.touch.originalPos.left;
	        // 		}else{
	        // 			distance = slider.touch.end.y - slider.touch.start.y;
	        // 			value = slider.touch.originalPos.top;
	        // 		}
	        // 		// if not infinite loop and first / last slide, do not attempt a slide transition
	        // 		if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
	        // 			setPositionProperty(value, 'reset', 200);
	        // 		}else{
	        // 			// check if distance clears threshold
	        // 			if(Math.abs(distance) >= slider.settings.swipeThreshold){
	        // 				distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
	        // 				el.stopAuto();
	        // 			}else{
	        // 				// el.animate(property, 200);
	        // 				setPositionProperty(value, 'reset', 200);
	        // 			}
	        // 		}
	        // 	}
	        // 	slider.viewport.unbind('touchend', onTouchEnd);
	        // }

	        /**
	         * Window resize event callback
	         */
	        var resizeWindow = function resizeWindow(e) {
	            // don't do anything if slider isn't initialized.
	            if (!slider.initialized) return;
	            // get the new window dimens (again, thank you IE)
	            var windowWidthNew = $(window).width();
	            var windowHeightNew = $(window).height();
	            // make sure that it is a true window resize
	            // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
	            // are resized. Can you just die already?*
	            if (windowWidth != windowWidthNew || windowHeight != windowHeightNew) {
	                // set the new window dimens
	                windowWidth = windowWidthNew;
	                windowHeight = windowHeightNew;
	                // update all dynamic elements
	                el.redrawSlider();
	                // Call user resize handler
	                slider.settings.onSliderResize.call(el, slider.active.index);
	            }
	        };

	        /**
	         * ===================================================================================
	         * = PUBLIC FUNCTIONS
	         * ===================================================================================
	         */

	        /**
	         * Performs slide transition to the specified slide
	         *
	         * @param slideIndex (int)
	         *  - the destination slide's index (zero-based)
	         *
	         * @param direction (string)
	         *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
	         */
	        el.goToSlide = function (slideIndex, direction) {
	            // if plugin is currently in motion, ignore request
	            if (slider.working || slider.active.index == slideIndex) return;
	            // declare that plugin is in motion
	            slider.working = true;
	            // store the old index
	            slider.oldIndex = slider.active.index;
	            // if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
	            if (slideIndex < 0) {
	                slider.active.index = getPagerQty() - 1;
	                // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
	            } else if (slideIndex >= getPagerQty()) {
	                slider.active.index = 0;
	                // set active index to requested slide
	            } else {
	                slider.active.index = slideIndex;
	            }
	            // onSlideBefore, onSlideNext, onSlidePrev callbacks
	            slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
	            if (direction == 'next') {
	                slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
	            } else if (direction == 'prev') {
	                slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
	            }
	            // check if last slide
	            slider.active.last = slider.active.index >= getPagerQty() - 1;
	            // update the pager with active class
	            if (slider.settings.pager) updatePagerActive(slider.active.index);
	            // // check for direction control update
	            if (slider.settings.controls) updateDirectionControls();
	            // if slider is set to mode: "fade"
	            if (slider.settings.mode == 'fade') {
	                // if adaptiveHeight is true and next height is different from current height, animate to the new height
	                if (slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()) {
	                    slider.viewport.animate({
	                        height: getViewportHeight()
	                    }, slider.settings.adaptiveHeightSpeed);
	                }
	                // fade out the visible child and reset its z-index value
	                slider.children.filter(':visible').fadeOut(slider.settings.speed).css({
	                    zIndex: 0
	                });
	                // fade in the newly requested slide
	                slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function () {
	                    $(this).css('zIndex', slider.settings.slideZIndex);
	                    updateAfterSlideTransition();
	                });
	                // slider mode is not "fade"
	            } else {
	                // if adaptiveHeight is true and next height is different from current height, animate to the new height
	                if (slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()) {
	                    slider.viewport.animate({
	                        height: getViewportHeight()
	                    }, slider.settings.adaptiveHeightSpeed);
	                }
	                var moveBy = 0;
	                var position = {
	                    left: 0,
	                    top: 0
	                };
	                // if carousel and not infinite loop
	                if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
	                    if (slider.settings.mode == 'horizontal') {
	                        // get the last child position
	                        var lastChild = slider.children.eq(slider.children.length - 1);
	                        position = lastChild.position();
	                        // calculate the position of the last slide
	                        moveBy = slider.viewport.width() - lastChild.outerWidth();
	                    } else {
	                        // get last showing index position
	                        var lastShowingIndex = slider.children.length - slider.settings.minSlides;
	                        position = slider.children.eq(lastShowingIndex).position();
	                    }
	                    // horizontal carousel, going previous while on first slide (infiniteLoop mode)
	                } else if (slider.carousel && slider.active.last && direction == 'prev') {
	                    // get the last child position
	                    var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : (getPagerQty() - 1) * getMoveBy() - (slider.children.length - slider.settings.maxSlides);
	                    var lastChild = el.children('.bx-clone').eq(eq);
	                    position = lastChild.position();
	                    // if infinite loop and "Next" is clicked on the last slide
	                } else if (direction == 'next' && slider.active.index == 0) {
	                    // get the last clone position
	                    position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
	                    slider.active.last = false;
	                    // normal non-zero requests
	                } else if (slideIndex >= 0) {
	                    var requestEl = slideIndex * getMoveBy();
	                    position = slider.children.eq(requestEl).position();
	                }

	                /* If the position doesn't exist
	                 * (e.g. if you destroy the slider on a next click),
	                 * it doesn't throw an error.
	                 */
	                if ("undefined" !== typeof position) {
	                    var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
	                    // plugin values to be animated
	                    setPositionProperty(value, 'slide', slider.settings.speed);
	                }
	            }
	        };

	        /**
	         * Transitions to the next slide in the show
	         */
	        el.goToNextSlide = function () {
	            // if infiniteLoop is false and last page is showing, disregard call
	            if (!slider.settings.infiniteLoop && slider.active.last) return;
	            var pagerIndex = parseInt(slider.active.index) + 1;
	            el.goToSlide(pagerIndex, 'next');
	        };

	        /**
	         * Transitions to the prev slide in the show
	         */
	        el.goToPrevSlide = function () {
	            // if infiniteLoop is false and last page is showing, disregard call
	            if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
	            var pagerIndex = parseInt(slider.active.index) - 1;
	            el.goToSlide(pagerIndex, 'prev');
	        };

	        /**
	         * Starts the auto show
	         *
	         * @param preventControlUpdate (boolean)
	         *  - if true, auto controls state will not be updated
	         */
	        el.startAuto = function (preventControlUpdate) {
	            // if an interval already exists, disregard call
	            if (slider.interval) return;
	            // create an interval
	            slider.interval = setInterval(function () {
	                slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
	            }, slider.settings.pause);
	            // if auto controls are displayed and preventControlUpdate is not true
	            if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
	        };

	        /**
	         * Stops the auto show
	         *
	         * @param preventControlUpdate (boolean)
	         *  - if true, auto controls state will not be updated
	         */
	        el.stopAuto = function (preventControlUpdate) {
	            // if no interval exists, disregard call
	            if (!slider.interval) return;
	            // clear the interval
	            clearInterval(slider.interval);
	            slider.interval = null;
	            // if auto controls are displayed and preventControlUpdate is not true
	            if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
	        };

	        /**
	         * Returns current slide index (zero-based)
	         */
	        el.getCurrentSlide = function () {
	            return slider.active.index;
	        };

	        /**
	         * Returns current slide element
	         */
	        el.getCurrentSlideElement = function () {
	            return slider.children.eq(slider.active.index);
	        };

	        /**
	         * Returns number of slides in show
	         */
	        el.getSlideCount = function () {
	            return slider.children.length;
	        };

	        /**
	         * Update all dynamic slider elements
	         */
	        el.redrawSlider = function () {
	            // resize all children in ratio to new screen size
	            slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
	            // adjust the height
	            slider.viewport.css('height', getViewportHeight());
	            // update the slide position
	            if (!slider.settings.ticker) setSlidePosition();
	            // if active.last was true before the screen resize, we want
	            // to keep it last no matter what screen size we end on
	            if (slider.active.last) slider.active.index = getPagerQty() - 1;
	            // if the active index (page) no longer exists due to the resize, simply set the index as last
	            if (slider.active.index >= getPagerQty()) slider.active.last = true;
	            // if a pager is being displayed and a custom pager is not being used, update it
	            if (slider.settings.pager && !slider.settings.pagerCustom) {
	                populatePager();
	                updatePagerActive(slider.active.index);
	            }
	        };

	        /**
	         * Destroy the current instance of the slider (revert everything back to original state)
	         */
	        el.destroySlider = function () {
	            // don't do anything if slider has already been destroyed
	            if (!slider.initialized) return;
	            slider.initialized = false;
	            $('.bx-clone', this).remove();
	            slider.children.each(function () {
	                $(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
	            });
	            $(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
	            $(this).unwrap().unwrap();
	            if (slider.controls.el) slider.controls.el.remove();
	            if (slider.controls.next) slider.controls.next.remove();
	            if (slider.controls.prev) slider.controls.prev.remove();
	            if (slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
	            $('.bx-caption', this).remove();
	            if (slider.controls.autoEl) slider.controls.autoEl.remove();
	            clearInterval(slider.interval);
	            if (slider.settings.responsive) $(window).unbind('resize', resizeWindow);
	        };

	        /**
	         * Reload the slider (revert all DOM changes, and re-initialize)
	         */
	        el.reloadSlider = function (settings) {
	            if (settings != undefined) options = settings;
	            el.destroySlider();
	            init();
	        };

	        init();

	        // returns the current jQuery object
	        return this;
	    };
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var $goodInfoBox = $('div[data-node="topGoodInfo"]'),
	    $leftBox = $goodInfoBox.find('[data-node="topleft"]'),
	    $leftBig = $leftBox.find('[data-node="leftBigBox"]'),
	    $leftSmall = $leftBox.find('[data-node="leftSmallBox"]'),
	    $upBtn = $leftBox.find('[data-action="sliderTop"]'),
	    $downBtn = $leftBox.find('[data-action="sliderDown"]'),
	    $smallList = $leftSmall.find('li'),
	    $bigList = $leftBig.find('li');

	var sliderIndex = 0,
	    moved = 75,
	    maxlen = 5,
	    len = $smallList.length;
	var slider = {
		init: function init() {
			if ($smallList.length > 4) {
				//初始化
				slider.setInit();
				//up
				$upBtn.on('click', function () {
					slider.moveTop();
				});
				//down
				$downBtn.on('click', function () {
					slider.moveDown();
				});
			} else {
				$downBtn.addClass('disabled');
				$upBtn.addClass('disabled');
			}
			$smallList.on('click', function () {
				if (!$(this).hasClass('active')) {
					var index = $smallList.index($(this));
					$(this).addClass('active').siblings().removeClass('active');
					$bigList.hide().eq(index).show();
				}
			});
		},
		refresh: function refresh(index) {
			sliderIndex = index;
		},
		setInit: function setInit() {
			sliderIndex === 0 ? $upBtn.addClass('disabled') : $upBtn.removeClass('disabled');
			sliderIndex === maxlen - len ? $downBtn.addClass('disabled') : $downBtn.removeClass('disabled');
			$leftSmall.css({
				position: 'relative',
				width: moved * len
				//marginTop : '-90px'
			}).parent().css({
				position: 'relative',
				width: moved * maxlen - 5,
				overflow: 'hidden'
			});
		},
		moveTop: function moveTop(index) {
			if (sliderIndex < 0) {
				if (!$leftSmall.is(':animated')) {
					sliderIndex++;
					$leftSmall.animate({
						'left': sliderIndex * moved
					}, 300);
					$downBtn.removeClass('disabled');
				}
			}
			sliderIndex === 0 ? $upBtn.addClass('disabled') : $upBtn.removeClass('disabled');
		},
		moveDown: function moveDown() {
			if (sliderIndex > maxlen - len) {
				if (!$leftSmall.is(':animated')) {
					sliderIndex--;
					$leftSmall.animate({
						'left': sliderIndex * moved
					}, 300);
					$upBtn.removeClass('disabled');
					sliderIndex === maxlen - len && $downBtn.addClass('disabled');
				}
			}
		}
	};
	module.exports = slider;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);
	var checkLoginStatus = __webpack_require__(47);
	__webpack_require__(172);

	var hint = __webpack_require__(87);
	// 尝试使用id,不推荐使用
	var $goodsThum = $('#goodsThum');
	var $wrap = $goodsThum.parent();
	// var $cart = $('[data-node=_cart_]');
	var $addCartErr = $('[data-node=addCartErr]');
	// 商品icon宽,高
	/*var goodsW;
	var goodsH;
	var cartW;
	var cartH;*/
	var addCarErrNotice = $addCartErr.text();

	// var $topElement = $('[data-node="goodsName"]');
	// var $shopContent = $('[data-node="goodsContent"]');
	var $addCarElement = $('[data-node="bannerShopCar"]');
	var animate = function animate(done, fail) {
	    var $mover = $goodsThum.clone();
	    $mover.appendTo($wrap).show();

	    var nSt = $(window).scrollTop();
	    var nSl = $(window).scrollLeft();
	    //移动元素
	    var moverOffset = $mover.offset();
	    //结束元素
	    var addCarElementH = $addCarElement.height();
	    var addCarElementW = $addCarElement.width();
	    var moverH = $mover.height();
	    var moverW = $mover.width();
	    var addCarElementOffset = $addCarElement.offset();
	    //初始位置
	    var start = {
	        top: moverOffset.top - nSt - moverH / 2,
	        left: moverOffset.left - nSl - moverW / 2
	    };
	    //结束位置
	    var end = {
	        top: addCarElementOffset.top - nSt + (addCarElementH - moverH) / 2,
	        left: addCarElementOffset.left - nSl + (addCarElementW - moverW) / 2
	    };
	    var speed = 1.2;
	    //最高点
	    var vertex_top;
	    var distance;
	    var steps;
	    var ratio;
	    var vertex_left;
	    var curvature;
	    var count = -1;
	    var endLeft;
	    var endTop;

	    $mover.velocity({
	        left: 1000, //end.left,
	        top: 1000 //end.top 
	    }, {
	        begin: function begin(elements) {
	            nSl = $(window).scrollLeft();
	            nSt = $(window).scrollTop();

	            moverOffset = $mover.offset();
	            addCarElementOffset = $addCarElement.offset();

	            count = -1; //重置

	            start = {
	                top: moverOffset.top - nSt - moverH / 2,
	                left: moverOffset.left - nSl + moverW / 2
	            };
	            end = {
	                top: addCarElementOffset.top - nSt + (addCarElementH - moverH) / 2,
	                left: addCarElementOffset.left - nSl + (addCarElementW - moverW) / 2
	            };

	            $(elements).css({
	                position: 'fixed',
	                margin: 0,
	                top: start.top,
	                left: start.left,
	                zIndex: 100
	            });

	            vertex_top = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
	            if (vertex_top < 20) {
	                // 可能出现起点或者终点就是运动曲线顶点的情况
	                vertex_top = Math.min(20, Math.min(start.top, end.top));
	            }

	            distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2));
	            // 元素移动次数
	            steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / speed);
	            ratio = start.top == vertex_top ? 0 : -Math.sqrt((end.top - vertex_top) / (start.top - vertex_top));
	            vertex_left = (ratio * start.left - end.left) / (ratio - 1);
	            // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
	            curvature = end.left == vertex_left ? 0 : (end.top - vertex_top) / Math.pow(end.left - vertex_left, 2);
	        },
	        progress: function progress(elements, complete, remaining, movestart /*, tweenValue*/) {
	            // 计算left top值
	            endLeft = start.left + (end.left - start.left) * count / steps;
	            endTop = curvature == 0 ? start.top + (end.top - start.top) * count / steps : curvature * Math.pow(endLeft - vertex_left, 2) + vertex_top;
	            // 运动过程中有改变大小
	            /*if (end.width != null && end.height != null) {
	              var i = steps / 2,
	                width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
	                height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
	              $element.css({width: width + "px", height: height + "px", "font-size": Math.min(width, height) + "px"});
	            }*/
	            count++;
	            $(elements).css({
	                left: endLeft,
	                top: endTop
	            });

	            if (count === steps + 1) {
	                $mover.velocity("stop");
	                $mover.hide().remove();
	                done && done();
	            }
	        },
	        duration: speed * 1000
	    });
	};

	var showErrorTip = function showErrorTip(msg) {
	    var timer;
	    if (timer) {
	        clearTimeout(timer);
	        timer = null;
	    }
	    $addCartErr.show().removeClass('hide').text(msg);
	    timer = setTimeout(function () {
	        $addCartErr.hide();
	    }, 2000);
	};

	var init = function init(elementSelector) {
	    var $select = elementSelector.parent ? $(elementSelector.parent) : $(elementSelector.selector),
	        $selector = elementSelector.parent ? elementSelector.selector : undefined;

	    $select.on('click', $selector, function () {
	        var _this = this,
	            proNum = ~~$('[data-node="count"]').val();
	        var objs = {
	            validate: true,
	            data: {
	                mshopid: ~~$_CONFIG.shopId,
	                skuid: ~~$_CONFIG.skuId,
	                quantity: proNum,
	                kid: $_CONFIG.kid + '',
	                source_code: $_CONFIG.sourceCode
	            },
	            onLogin: noRefreshFetch,
	            refresh: true
	        };

	        //无刷新登录
	        function noRefreshFetch(o) {

	            if ($(_this).hasClass('btn-default')) return false;
	            if ($_CONFIG.skuId === '0') {
	                hint.init('请选择规格参数');
	                return false;
	            }

	            fetch.get(url.get('addShopCar'), o).done(function (result) {
	                if (result.code === 200) {
	                    animate(function () {
	                        Pubsub(channel.shopCar.headerShopCar).pub({
	                            proNum: proNum
	                        });
	                        var itemNum = parseInt($addCarElement.find('span').text());

	                        if (itemNum + proNum <= 99) {
	                            $addCarElement.find('span').text(itemNum + proNum);
	                        } else if (itemNum + proNum > 99) {
	                            $addCarElement.find('span').text('99+');
	                        }
	                    });
	                } else {
	                    // 加入失败
	                    showErrorTip(result.message);
	                    // alert(result.message)
	                }
	            }).fail(function () {
	                if (checkLoginStatus()) showErrorTip(addCarErrNotice);
	            });
	        }
	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery, module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*! VelocityJS.org (1.3.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

	/*************************
	 Velocity jQuery Shim
	 *************************/

	/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

	/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
	/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
	/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */

	(function (window) {
		"use strict";
		/***************
	  Setup
	  ***************/

		/* If jQuery is already loaded, there's no point in loading this shim. */

		if (__webpack_provided_window_dot_jQuery) {
			return;
		}

		/* jQuery base. */
		var $ = function $(selector, context) {
			return new $.fn.init(selector, context);
		};

		/********************
	  Private Methods
	  ********************/

		/* jQuery */
		$.isWindow = function (obj) {
			/* jshint eqeqeq: false */
			return obj && obj === obj.window;
		};

		/* jQuery */
		$.type = function (obj) {
			if (!obj) {
				return obj + "";
			}

			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		};

		/* jQuery */
		$.isArray = Array.isArray || function (obj) {
			return $.type(obj) === "array";
		};

		/* jQuery */
		function isArraylike(obj) {
			var length = obj.length,
			    type = $.type(obj);

			if (type === "function" || $.isWindow(obj)) {
				return false;
			}

			if (obj.nodeType === 1 && length) {
				return true;
			}

			return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
		}

		/***************
	  $ Methods
	  ***************/

		/* jQuery: Support removed for IE<9. */
		$.isPlainObject = function (obj) {
			var key;

			if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
				return false;
			}

			try {
				if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch (e) {
				return false;
			}

			for (key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		};

		/* jQuery */
		$.each = function (obj, callback, args) {
			var value,
			    i = 0,
			    length = obj.length,
			    isArray = isArraylike(obj);

			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				}
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				}
			}

			return obj;
		};

		/* Custom */
		$.data = function (node, key, value) {
			/* $.getData() */
			if (value === undefined) {
				var getId = node[$.expando],
				    store = getId && cache[getId];

				if (key === undefined) {
					return store;
				} else if (store) {
					if (key in store) {
						return store[key];
					}
				}
				/* $.setData() */
			} else if (key !== undefined) {
				var setId = node[$.expando] || (node[$.expando] = ++$.uuid);

				cache[setId] = cache[setId] || {};
				cache[setId][key] = value;

				return value;
			}
		};

		/* Custom */
		$.removeData = function (node, keys) {
			var id = node[$.expando],
			    store = id && cache[id];

			if (store) {
				// Cleanup the entire store if no keys are provided.
				if (!keys) {
					delete cache[id];
				} else {
					$.each(keys, function (_, key) {
						delete store[key];
					});
				}
			}
		};

		/* jQuery */
		$.extend = function () {
			var src,
			    copyIsArray,
			    copy,
			    name,
			    options,
			    clone,
			    target = arguments[0] || {},
			    i = 1,
			    length = arguments.length,
			    deep = false;

			if (typeof target === "boolean") {
				deep = target;

				target = arguments[i] || {};
				i++;
			}

			if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && $.type(target) !== "function") {
				target = {};
			}

			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				if (options = arguments[i]) {
					for (name in options) {
						src = target[name];
						copy = options[name];

						if (target === copy) {
							continue;
						}

						if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && $.isArray(src) ? src : [];
							} else {
								clone = src && $.isPlainObject(src) ? src : {};
							}

							target[name] = $.extend(deep, clone, copy);
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;
		};

		/* jQuery 1.4.3 */
		$.queue = function (elem, type, data) {
			function $makeArray(arr, results) {
				var ret = results || [];

				if (arr) {
					if (isArraylike(Object(arr))) {
						/* $.merge */
						(function (first, second) {
							var len = +second.length,
							    j = 0,
							    i = first.length;

							while (j < len) {
								first[i++] = second[j++];
							}

							if (len !== len) {
								while (second[j] !== undefined) {
									first[i++] = second[j++];
								}
							}

							first.length = i;

							return first;
						})(ret, typeof arr === "string" ? [arr] : arr);
					} else {
						[].push.call(ret, arr);
					}
				}

				return ret;
			}

			if (!elem) {
				return;
			}

			type = (type || "fx") + "queue";

			var q = $.data(elem, type);

			if (!data) {
				return q || [];
			}

			if (!q || $.isArray(data)) {
				q = $.data(elem, type, $makeArray(data));
			} else {
				q.push(data);
			}

			return q;
		};

		/* jQuery 1.4.3 */
		$.dequeue = function (elems, type) {
			/* Custom: Embed element iteration. */
			$.each(elems.nodeType ? [elems] : elems, function (i, elem) {
				type = type || "fx";

				var queue = $.queue(elem, type),
				    fn = queue.shift();

				if (fn === "inprogress") {
					fn = queue.shift();
				}

				if (fn) {
					if (type === "fx") {
						queue.unshift("inprogress");
					}

					fn.call(elem, function () {
						$.dequeue(elem, type);
					});
				}
			});
		};

		/******************
	  $.fn Methods
	  ******************/

		/* jQuery */
		$.fn = $.prototype = {
			init: function init(selector) {
				/* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
				if (selector.nodeType) {
					this[0] = selector;

					return this;
				} else {
					throw new Error("Not a DOM node.");
				}
			},
			offset: function offset() {
				/* jQuery altered code: Dropped disconnected DOM node checking. */
				var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };

				return {
					top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
					left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
				};
			},
			position: function position() {
				/* jQuery */
				function offsetParentFn(elem) {
					var offsetParent = elem.offsetParent || document;

					while (offsetParent && offsetParent.nodeType.toLowerCase !== "html" && offsetParent.style.position === "static") {
						offsetParent = offsetParent.offsetParent;
					}

					return offsetParent || document;
				}

				/* Zepto */
				var elem = this[0],
				    offsetParent = offsetParentFn(elem),
				    offset = this.offset(),
				    parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? { top: 0, left: 0 } : $(offsetParent).offset();

				offset.top -= parseFloat(elem.style.marginTop) || 0;
				offset.left -= parseFloat(elem.style.marginLeft) || 0;

				if (offsetParent.style) {
					parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0;
					parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0;
				}

				return {
					top: offset.top - parentOffset.top,
					left: offset.left - parentOffset.left
				};
			}
		};

		/**********************
	  Private Variables
	  **********************/

		/* For $.data() */
		var cache = {};
		$.expando = "velocity" + new Date().getTime();
		$.uuid = 0;

		/* For $.queue() */
		var class2type = {},
		    hasOwn = class2type.hasOwnProperty,
		    toString = class2type.toString;

		var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
		for (var i = 0; i < types.length; i++) {
			class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
		}

		/* Makes $(node) possible, without having to call init. */
		$.fn.init.prototype = $.fn;

		/* Globalize Velocity onto the window, and assign its Utilities property. */
		window.Velocity = { Utilities: $ };
	})(window);

	/******************
	 Velocity.js
	 ******************/

	(function (factory) {
		"use strict";
		/* CommonJS module. */

		if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
			module.exports = factory();
			/* AMD module. */
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			/* Browser globals. */
		} else {
			factory();
		}
	})(function () {
		"use strict";

		return function (global, window, document, undefined) {

			/***************
	   Summary
	   ***************/

			/*
	   - CSS: CSS stack that works independently from the rest of Velocity.
	   - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
	   - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
	   - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
	   Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
	   - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
	   - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
	   - completeCall(): Handles the cleanup process for each Velocity call.
	   */

			/*********************
	   Helper Functions
	   *********************/

			/* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
			var IE = function () {
				if (document.documentMode) {
					return document.documentMode;
				} else {
					for (var i = 7; i > 4; i--) {
						var div = document.createElement("div");

						div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

						if (div.getElementsByTagName("span").length) {
							div = null;

							return i;
						}
					}
				}

				return undefined;
			}();

			/* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
			var rAFShim = function () {
				var timeLast = 0;

				return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
					var timeCurrent = new Date().getTime(),
					    timeDelta;

					/* Dynamically set delay on a per-tick basis to match 60fps. */
					/* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
					timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
					timeLast = timeCurrent + timeDelta;

					return setTimeout(function () {
						callback(timeCurrent + timeDelta);
					}, timeDelta);
				};
			}();

			/* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
			function compactSparseArray(array) {
				var index = -1,
				    length = array ? array.length : 0,
				    result = [];

				while (++index < length) {
					var value = array[index];

					if (value) {
						result.push(value);
					}
				}

				return result;
			}

			function sanitizeElements(elements) {
				/* Unwrap jQuery/Zepto objects. */
				if (Type.isWrapped(elements)) {
					elements = [].slice.call(elements);
					/* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
				} else if (Type.isNode(elements)) {
					elements = [elements];
				}

				return elements;
			}

			var Type = {
				isString: function isString(variable) {
					return typeof variable === "string";
				},
				isArray: Array.isArray || function (variable) {
					return Object.prototype.toString.call(variable) === "[object Array]";
				},
				isFunction: function isFunction(variable) {
					return Object.prototype.toString.call(variable) === "[object Function]";
				},
				isNode: function isNode(variable) {
					return variable && variable.nodeType;
				},
				/* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
				isNodeList: function isNodeList(variable) {
					return (typeof variable === "undefined" ? "undefined" : _typeof(variable)) === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) && variable.length !== undefined && (variable.length === 0 || _typeof(variable[0]) === "object" && variable[0].nodeType > 0);
				},
				/* Determine if variable is a wrapped jQuery or Zepto element. */
				isWrapped: function isWrapped(variable) {
					return variable && (variable.jquery || window.Zepto && window.Zepto.zepto.isZ(variable));
				},
				isSVG: function isSVG(variable) {
					return window.SVGElement && variable instanceof window.SVGElement;
				},
				isEmptyObject: function isEmptyObject(variable) {
					for (var name in variable) {
						return false;
					}

					return true;
				}
			};

			/*****************
	   Dependencies
	   *****************/

			var $,
			    isJQuery = false;

			if (global.fn && global.fn.jquery) {
				$ = global;
				isJQuery = true;
			} else {
				$ = window.Velocity.Utilities;
			}

			if (IE <= 8 && !isJQuery) {
				throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
			} else if (IE <= 7) {
				/* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
				jQuery.fn.velocity = jQuery.fn.animate;

				/* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
				return;
			}

			/*****************
	   Constants
	   *****************/

			var DURATION_DEFAULT = 400,
			    EASING_DEFAULT = "swing";

			/*************
	   State
	   *************/

			var Velocity = {
				/* Container for page-wide Velocity state data. */
				State: {
					/* Detect mobile devices to determine if mobileHA should be turned on. */
					isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
					/* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
					isAndroid: /Android/i.test(navigator.userAgent),
					isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
					isChrome: window.chrome,
					isFirefox: /Firefox/i.test(navigator.userAgent),
					/* Create a cached element for re-use when checking for CSS property prefixes. */
					prefixElement: document.createElement("div"),
					/* Cache every prefix match to avoid repeating lookups. */
					prefixMatches: {},
					/* Cache the anchor used for animating window scrolling. */
					scrollAnchor: null,
					/* Cache the browser-specific property names associated with the scroll anchor. */
					scrollPropertyLeft: null,
					scrollPropertyTop: null,
					/* Keep track of whether our RAF tick is running. */
					isTicking: false,
					/* Container for every in-progress call to Velocity. */
					calls: []
				},
				/* Velocity's custom CSS stack. Made global for unit testing. */
				CSS: {/* Defined below. */},
				/* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
				Utilities: $,
				/* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
				Redirects: {/* Manually registered by the user. */},
				Easings: {/* Defined below. */},
				/* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
				Promise: window.Promise,
				/* Velocity option defaults, which can be overriden by the user. */
				defaults: {
					queue: "",
					duration: DURATION_DEFAULT,
					easing: EASING_DEFAULT,
					begin: undefined,
					complete: undefined,
					progress: undefined,
					display: undefined,
					visibility: undefined,
					loop: false,
					delay: false,
					mobileHA: true,
					/* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
					_cacheValues: true
				},
				/* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
				init: function init(element) {
					$.data(element, "velocity", {
						/* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
						isSVG: Type.isSVG(element),
						/* Keep track of whether the element is currently being animated by Velocity.
	      This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
						isAnimating: false,
						/* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
						computedStyle: null,
						/* Tween data is cached for each animation on the element so that data can be passed across calls --
	      in particular, end values are used as subsequent start values in consecutive Velocity calls. */
						tweensContainer: null,
						/* The full root property values of each CSS hook being animated on this element are cached so that:
	      1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
	      2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
						rootPropertyValueCache: {},
						/* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
						transformCache: {}
					});
				},
				/* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
				hook: null, /* Defined below. */
				/* Velocity-wide animation time remapping for testing purposes. */
				mock: false,
				version: { major: 1, minor: 3, patch: 0 },
				/* Set to 1 or 2 (most verbose) to output debug info to console. */
				debug: false
			};

			/* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
			if (window.pageYOffset !== undefined) {
				Velocity.State.scrollAnchor = window;
				Velocity.State.scrollPropertyLeft = "pageXOffset";
				Velocity.State.scrollPropertyTop = "pageYOffset";
			} else {
				Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
				Velocity.State.scrollPropertyLeft = "scrollLeft";
				Velocity.State.scrollPropertyTop = "scrollTop";
			}

			/* Shorthand alias for jQuery's $.data() utility. */
			function Data(element) {
				/* Hardcode a reference to the plugin name. */
				var response = $.data(element, "velocity");

				/* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
				return response === null ? undefined : response;
			}

			/**************
	   Easing
	   **************/

			/* Step easing generator. */
			function generateStep(steps) {
				return function (p) {
					return Math.round(p * steps) * (1 / steps);
				};
			}

			/* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
			function generateBezier(mX1, mY1, mX2, mY2) {
				var NEWTON_ITERATIONS = 4,
				    NEWTON_MIN_SLOPE = 0.001,
				    SUBDIVISION_PRECISION = 0.0000001,
				    SUBDIVISION_MAX_ITERATIONS = 10,
				    kSplineTableSize = 11,
				    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
				    float32ArraySupported = "Float32Array" in window;

				/* Must contain four arguments. */
				if (arguments.length !== 4) {
					return false;
				}

				/* Arguments must be numbers. */
				for (var i = 0; i < 4; ++i) {
					if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
						return false;
					}
				}

				/* X values must be in the [0, 1] range. */
				mX1 = Math.min(mX1, 1);
				mX2 = Math.min(mX2, 1);
				mX1 = Math.max(mX1, 0);
				mX2 = Math.max(mX2, 0);

				var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

				function A(aA1, aA2) {
					return 1.0 - 3.0 * aA2 + 3.0 * aA1;
				}
				function B(aA1, aA2) {
					return 3.0 * aA2 - 6.0 * aA1;
				}
				function C(aA1) {
					return 3.0 * aA1;
				}

				function calcBezier(aT, aA1, aA2) {
					return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
				}

				function getSlope(aT, aA1, aA2) {
					return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
				}

				function newtonRaphsonIterate(aX, aGuessT) {
					for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
						var currentSlope = getSlope(aGuessT, mX1, mX2);

						if (currentSlope === 0.0) {
							return aGuessT;
						}

						var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
						aGuessT -= currentX / currentSlope;
					}

					return aGuessT;
				}

				function calcSampleValues() {
					for (var i = 0; i < kSplineTableSize; ++i) {
						mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
					}
				}

				function binarySubdivide(aX, aA, aB) {
					var currentX,
					    currentT,
					    i = 0;

					do {
						currentT = aA + (aB - aA) / 2.0;
						currentX = calcBezier(currentT, mX1, mX2) - aX;
						if (currentX > 0.0) {
							aB = currentT;
						} else {
							aA = currentT;
						}
					} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

					return currentT;
				}

				function getTForX(aX) {
					var intervalStart = 0.0,
					    currentSample = 1,
					    lastSample = kSplineTableSize - 1;

					for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
						intervalStart += kSampleStepSize;
					}

					--currentSample;

					var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
					    guessForT = intervalStart + dist * kSampleStepSize,
					    initialSlope = getSlope(guessForT, mX1, mX2);

					if (initialSlope >= NEWTON_MIN_SLOPE) {
						return newtonRaphsonIterate(aX, guessForT);
					} else if (initialSlope === 0.0) {
						return guessForT;
					} else {
						return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
					}
				}

				var _precomputed = false;

				function precompute() {
					_precomputed = true;
					if (mX1 !== mY1 || mX2 !== mY2) {
						calcSampleValues();
					}
				}

				var f = function f(aX) {
					if (!_precomputed) {
						precompute();
					}
					if (mX1 === mY1 && mX2 === mY2) {
						return aX;
					}
					if (aX === 0) {
						return 0;
					}
					if (aX === 1) {
						return 1;
					}

					return calcBezier(getTForX(aX), mY1, mY2);
				};

				f.getControlPoints = function () {
					return [{ x: mX1, y: mY1 }, { x: mX2, y: mY2 }];
				};

				var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
				f.toString = function () {
					return str;
				};

				return f;
			}

			/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
			/* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
	   then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
			var generateSpringRK4 = function () {
				function springAccelerationForState(state) {
					return -state.tension * state.x - state.friction * state.v;
				}

				function springEvaluateStateWithDerivative(initialState, dt, derivative) {
					var state = {
						x: initialState.x + derivative.dx * dt,
						v: initialState.v + derivative.dv * dt,
						tension: initialState.tension,
						friction: initialState.friction
					};

					return { dx: state.v, dv: springAccelerationForState(state) };
				}

				function springIntegrateState(state, dt) {
					var a = {
						dx: state.v,
						dv: springAccelerationForState(state)
					},
					    b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
					    c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
					    d = springEvaluateStateWithDerivative(state, dt, c),
					    dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
					    dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

					state.x = state.x + dxdt * dt;
					state.v = state.v + dvdt * dt;

					return state;
				}

				return function springRK4Factory(tension, friction, duration) {

					var initState = {
						x: -1,
						v: 0,
						tension: null,
						friction: null
					},
					    path = [0],
					    time_lapsed = 0,
					    tolerance = 1 / 10000,
					    DT = 16 / 1000,
					    have_duration,
					    dt,
					    last_state;

					tension = parseFloat(tension) || 500;
					friction = parseFloat(friction) || 20;
					duration = duration || null;

					initState.tension = tension;
					initState.friction = friction;

					have_duration = duration !== null;

					/* Calculate the actual time it takes for this animation to complete with the provided conditions. */
					if (have_duration) {
						/* Run the simulation without a duration. */
						time_lapsed = springRK4Factory(tension, friction);
						/* Compute the adjusted time delta. */
						dt = time_lapsed / duration * DT;
					} else {
						dt = DT;
					}

					while (true) {
						/* Next/step function .*/
						last_state = springIntegrateState(last_state || initState, dt);
						/* Store the position. */
						path.push(1 + last_state.x);
						time_lapsed += 16;
						/* If the change threshold is reached, break. */
						if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
							break;
						}
					}

					/* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
	     computed path and returns a snapshot of the position according to a given percentComplete. */
					return !have_duration ? time_lapsed : function (percentComplete) {
						return path[percentComplete * (path.length - 1) | 0];
					};
				};
			}();

			/* jQuery easings. */
			Velocity.Easings = {
				linear: function linear(p) {
					return p;
				},
				swing: function swing(p) {
					return 0.5 - Math.cos(p * Math.PI) / 2;
				},
				/* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
				spring: function spring(p) {
					return 1 - Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6);
				}
			};

			/* CSS3 and Robert Penner easings. */
			$.each([["ease", [0.25, 0.1, 0.25, 1.0]], ["ease-in", [0.42, 0.0, 1.00, 1.0]], ["ease-out", [0.00, 0.0, 0.58, 1.0]], ["ease-in-out", [0.42, 0.0, 0.58, 1.0]], ["easeInSine", [0.47, 0, 0.745, 0.715]], ["easeOutSine", [0.39, 0.575, 0.565, 1]], ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]], ["easeInQuad", [0.55, 0.085, 0.68, 0.53]], ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]], ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]], ["easeInCubic", [0.55, 0.055, 0.675, 0.19]], ["easeOutCubic", [0.215, 0.61, 0.355, 1]], ["easeInOutCubic", [0.645, 0.045, 0.355, 1]], ["easeInQuart", [0.895, 0.03, 0.685, 0.22]], ["easeOutQuart", [0.165, 0.84, 0.44, 1]], ["easeInOutQuart", [0.77, 0, 0.175, 1]], ["easeInQuint", [0.755, 0.05, 0.855, 0.06]], ["easeOutQuint", [0.23, 1, 0.32, 1]], ["easeInOutQuint", [0.86, 0, 0.07, 1]], ["easeInExpo", [0.95, 0.05, 0.795, 0.035]], ["easeOutExpo", [0.19, 1, 0.22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [0.6, 0.04, 0.98, 0.335]], ["easeOutCirc", [0.075, 0.82, 0.165, 1]], ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]], function (i, easingArray) {
				Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
			});

			/* Determine the appropriate easing type given an easing input. */
			function getEasing(value, duration) {
				var easing = value;

				/* The easing option can either be a string that references a pre-registered easing,
	    or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
				if (Type.isString(value)) {
					/* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
					if (!Velocity.Easings[value]) {
						easing = false;
					}
				} else if (Type.isArray(value) && value.length === 1) {
					easing = generateStep.apply(null, value);
				} else if (Type.isArray(value) && value.length === 2) {
					/* springRK4 must be passed the animation's duration. */
					/* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
	     function generated with default tension and friction values. */
					easing = generateSpringRK4.apply(null, value.concat([duration]));
				} else if (Type.isArray(value) && value.length === 4) {
					/* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
					easing = generateBezier.apply(null, value);
				} else {
					easing = false;
				}

				/* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
	    if the Velocity-wide default has been incorrectly modified. */
				if (easing === false) {
					if (Velocity.Easings[Velocity.defaults.easing]) {
						easing = Velocity.defaults.easing;
					} else {
						easing = EASING_DEFAULT;
					}
				}

				return easing;
			}

			/*****************
	   CSS Stack
	   *****************/

			/* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
	   It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
			/* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
			var CSS = Velocity.CSS = {
				/*************
	    RegEx
	    *************/

				RegEx: {
					isHex: /^#([A-f\d]{3}){1,2}$/i,
					/* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
					valueUnwrap: /^[A-z]+\((.*)\)$/i,
					wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
					/* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
					valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
				},
				/************
	    Lists
	    ************/

				Lists: {
					colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
					transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
					transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
				},
				/************
	    Hooks
	    ************/

				/* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
	    (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
				/* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
	    tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
				Hooks: {
					/********************
	     Registration
	     ********************/

					/* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
					/* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
					templates: {
						"textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
						"boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
						"clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
						"backgroundPosition": ["X Y", "0% 0%"],
						"transformOrigin": ["X Y Z", "50% 50% 0px"],
						"perspectiveOrigin": ["X Y", "50% 50%"]
					},
					/* A "registered" hook is one that has been converted from its template form into a live,
	     tweenable property. It contains data to associate it with its root property. */
					registered: {
						/* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
	      which consists of the subproperty's name, the associated root property's name,
	      and the subproperty's position in the root's value. */
					},
					/* Convert the templates into individual hooks then append them to the registered object above. */
					register: function register() {
						/* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
	      currently set to "transparent" default to their respective template below when color-animated,
	      and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
	      which is almost always set closer to black than white. */
						for (var i = 0; i < CSS.Lists.colors.length; i++) {
							var rgbComponents = CSS.Lists.colors[i] === "color" ? "0 0 0 1" : "255 255 255 1";
							CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
						}

						var rootProperty, hookTemplate, hookNames;

						/* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
	      Thus, we re-arrange the templates accordingly. */
						if (IE) {
							for (rootProperty in CSS.Hooks.templates) {
								hookTemplate = CSS.Hooks.templates[rootProperty];
								hookNames = hookTemplate[0].split(" ");

								var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

								if (hookNames[0] === "Color") {
									/* Reposition both the hook's name and its default value to the end of their respective strings. */
									hookNames.push(hookNames.shift());
									defaultValues.push(defaultValues.shift());

									/* Replace the existing template for the hook's root property. */
									CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
								}
							}
						}

						/* Hook registration. */
						for (rootProperty in CSS.Hooks.templates) {
							hookTemplate = CSS.Hooks.templates[rootProperty];
							hookNames = hookTemplate[0].split(" ");

							for (var j in hookNames) {
								var fullHookName = rootProperty + hookNames[j],
								    hookPosition = j;

								/* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
	        and the hook's position in its template's default value string. */
								CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
							}
						}
					},
					/*****************************
	     Injection and Extraction
	     *****************************/

					/* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
					/* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
					getRoot: function getRoot(property) {
						var hookData = CSS.Hooks.registered[property];

						if (hookData) {
							return hookData[0];
						} else {
							/* If there was no hook match, return the property name untouched. */
							return property;
						}
					},
					/* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
	     the targeted hook can be injected or extracted at its standard position. */
					cleanRootPropertyValue: function cleanRootPropertyValue(rootProperty, rootPropertyValue) {
						/* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
						if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
							rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
						}

						/* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
	      default to the root's default value as defined in CSS.Hooks.templates. */
						/* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
	      zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
						if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
							rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
						}

						return rootPropertyValue;
					},
					/* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
					extractValue: function extractValue(fullHookName, rootPropertyValue) {
						var hookData = CSS.Hooks.registered[fullHookName];

						if (hookData) {
							var hookRoot = hookData[0],
							    hookPosition = hookData[1];

							rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

							/* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
							return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
						} else {
							/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
							return rootPropertyValue;
						}
					},
					/* Inject the hook's value into its root property's value. This is used to piece back together the root property
	     once Velocity has updated one of its individually hooked values through tweening. */
					injectValue: function injectValue(fullHookName, hookValue, rootPropertyValue) {
						var hookData = CSS.Hooks.registered[fullHookName];

						if (hookData) {
							var hookRoot = hookData[0],
							    hookPosition = hookData[1],
							    rootPropertyValueParts,
							    rootPropertyValueUpdated;

							rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

							/* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
	       then reconstruct the rootPropertyValue string. */
							rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
							rootPropertyValueParts[hookPosition] = hookValue;
							rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

							return rootPropertyValueUpdated;
						} else {
							/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
							return rootPropertyValue;
						}
					}
				},
				/*******************
	    Normalizations
	    *******************/

				/* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
	    and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
				Normalizations: {
					/* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
	     the targeted element (which may need to be queried), and the targeted property value. */
					registered: {
						clip: function clip(type, element, propertyValue) {
							switch (type) {
								case "name":
									return "clip";
								/* Clip needs to be unwrapped and stripped of its commas during extraction. */
								case "extract":
									var extracted;

									/* If Velocity also extracted this value, skip extraction. */
									if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
										extracted = propertyValue;
									} else {
										/* Remove the "rect()" wrapper. */
										extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

										/* Strip off commas. */
										extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
									}

									return extracted;
								/* Clip needs to be re-wrapped during injection. */
								case "inject":
									return "rect(" + propertyValue + ")";
							}
						},
						blur: function blur(type, element, propertyValue) {
							switch (type) {
								case "name":
									return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
								case "extract":
									var extracted = parseFloat(propertyValue);

									/* If extracted is NaN, meaning the value isn't already extracted. */
									if (!(extracted || extracted === 0)) {
										var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

										/* If the filter string had a blur component, return just the blur value and unit type. */
										if (blurComponent) {
											extracted = blurComponent[1];
											/* If the component doesn't exist, default blur to 0. */
										} else {
											extracted = 0;
										}
									}

									return extracted;
								/* Blur needs to be re-wrapped during injection. */
								case "inject":
									/* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
									if (!parseFloat(propertyValue)) {
										return "none";
									} else {
										return "blur(" + propertyValue + ")";
									}
							}
						},
						/* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
						opacity: function opacity(type, element, propertyValue) {
							if (IE <= 8) {
								switch (type) {
									case "name":
										return "filter";
									case "extract":
										/* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
	          Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
										var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

										if (extracted) {
											/* Convert to decimal value. */
											propertyValue = extracted[1] / 100;
										} else {
											/* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
											propertyValue = 1;
										}

										return propertyValue;
									case "inject":
										/* Opacified elements are required to have their zoom property set to a non-zero value. */
										element.style.zoom = 1;

										/* Setting the filter property on elements with certain font property combinations can result in a
	          highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
	          value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
										if (parseFloat(propertyValue) >= 1) {
											return "";
										} else {
											/* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
											return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
										}
								}
								/* With all other browsers, normalization is not required; return the same values that were passed in. */
							} else {
								switch (type) {
									case "name":
										return "opacity";
									case "extract":
										return propertyValue;
									case "inject":
										return propertyValue;
								}
							}
						}
					},
					/*****************************
	     Batched Registrations
	     *****************************/

					/* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
					register: function register() {

						/*****************
	      Transforms
	      *****************/

						/* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
	      so that they can be referenced in a properties map by their individual names. */
						/* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
	      setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
	      Transform setting is batched in this way to improve performance: the transform style only needs to be updated
	      once when multiple transform subproperties are being animated simultaneously. */
						/* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
	      transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
	      from being normalized for these browsers so that tweening skips these properties altogether
	      (since it will ignore them as being unsupported by the browser.) */
						if ((!IE || IE > 9) && !Velocity.State.isGingerbread) {
							/* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
	       share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
							CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
						}

						for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
							/* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
	       paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
							(function () {
								var transformName = CSS.Lists.transformsBase[i];

								CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
									switch (type) {
										/* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
										case "name":
											return "transform";
										/* Transform values are cached onto a per-element transformCache object. */
										case "extract":
											/* If this transform has yet to be assigned a value, return its null value. */
											if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
												/* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
												return (/^scale/i.test(transformName) ? 1 : 0
												);
												/* When transform values are set, they are wrapped in parentheses as per the CSS spec.
	            Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
											}
											return Data(element).transformCache[transformName].replace(/[()]/g, "");
										case "inject":
											var invalid = false;

											/* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
	           Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
											/* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
											switch (transformName.substr(0, transformName.length - 1)) {
												/* Whitelist unit types for each transform. */
												case "translate":
													invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
													break;
												/* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
												case "scal":
												case "scale":
													/* Chrome on Android has a bug in which scaled elements blur if their initial scale
	             value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
	             and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
													if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
														propertyValue = 1;
													}

													invalid = !/(\d)$/i.test(propertyValue);
													break;
												case "skew":
													invalid = !/(deg|\d)$/i.test(propertyValue);
													break;
												case "rotate":
													invalid = !/(deg|\d)$/i.test(propertyValue);
													break;
											}

											if (!invalid) {
												/* As per the CSS spec, wrap the value in parentheses. */
												Data(element).transformCache[transformName] = "(" + propertyValue + ")";
											}

											/* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
											return Data(element).transformCache[transformName];
									}
								};
							})();
						}

						/*************
	      Colors
	      *************/

						/* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
	      Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
						for (var j = 0; j < CSS.Lists.colors.length; j++) {
							/* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
	       (Otherwise, all functions would take the final for loop's colorName.) */
							(function () {
								var colorName = CSS.Lists.colors[j];

								/* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
								CSS.Normalizations.registered[colorName] = function (type, element, propertyValue) {
									switch (type) {
										case "name":
											return colorName;
										/* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
										case "extract":
											var extracted;

											/* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
											if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
												extracted = propertyValue;
											} else {
												var converted,
												    colorNames = {
													black: "rgb(0, 0, 0)",
													blue: "rgb(0, 0, 255)",
													gray: "rgb(128, 128, 128)",
													green: "rgb(0, 128, 0)",
													red: "rgb(255, 0, 0)",
													white: "rgb(255, 255, 255)"
												};

												/* Convert color names to rgb. */
												if (/^[A-z]+$/i.test(propertyValue)) {
													if (colorNames[propertyValue] !== undefined) {
														converted = colorNames[propertyValue];
													} else {
														/* If an unmatched color name is provided, default to black. */
														converted = colorNames.black;
													}
													/* Convert hex values to rgb. */
												} else if (CSS.RegEx.isHex.test(propertyValue)) {
													converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
													/* If the provided color doesn't match any of the accepted color formats, default to black. */
												} else if (!/^rgba?\(/i.test(propertyValue)) {
													converted = colorNames.black;
												}

												/* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
	            repeated spaces (in case the value included spaces to begin with). */
												extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
											}

											/* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
											if ((!IE || IE > 8) && extracted.split(" ").length === 3) {
												extracted += " 1";
											}

											return extracted;
										case "inject":
											/* If this is IE<=8 and an alpha component exists, strip it off. */
											if (IE <= 8) {
												if (propertyValue.split(" ").length === 4) {
													propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
												}
												/* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
											} else if (propertyValue.split(" ").length === 3) {
												propertyValue += " 1";
											}

											/* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
	           on all values but the fourth (R, G, and B only accept whole numbers). */
											return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
									}
								};
							})();
						}
					}
				},
				/************************
	    CSS Property Names
	    ************************/

				Names: {
					/* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
	     Camelcasing is used to normalize property names between and across calls. */
					camelCase: function camelCase(property) {
						return property.replace(/-(\w)/g, function (match, subMatch) {
							return subMatch.toUpperCase();
						});
					},
					/* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
					SVGAttribute: function SVGAttribute(property) {
						var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

						/* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
						if (IE || Velocity.State.isAndroid && !Velocity.State.isChrome) {
							SVGAttributes += "|transform";
						}

						return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
					},
					/* Determine whether a property should be set with a vendor prefix. */
					/* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
	     If the property is not at all supported by the browser, return a false flag. */
					prefixCheck: function prefixCheck(property) {
						/* If this property has already been checked, return the cached value. */
						if (Velocity.State.prefixMatches[property]) {
							return [Velocity.State.prefixMatches[property], true];
						} else {
							var vendors = ["", "Webkit", "Moz", "ms", "O"];

							for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
								var propertyPrefixed;

								if (i === 0) {
									propertyPrefixed = property;
								} else {
									/* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
									propertyPrefixed = vendors[i] + property.replace(/^\w/, function (match) {
										return match.toUpperCase();
									});
								}

								/* Check if the browser supports this property as prefixed. */
								if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
									/* Cache the match. */
									Velocity.State.prefixMatches[property] = propertyPrefixed;

									return [propertyPrefixed, true];
								}
							}

							/* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
							return [property, false];
						}
					}
				},
				/************************
	    CSS Property Values
	    ************************/

				Values: {
					/* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
					hexToRgb: function hexToRgb(hex) {
						var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
						    longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
						    rgbParts;

						hex = hex.replace(shortformRegex, function (m, r, g, b) {
							return r + r + g + g + b + b;
						});

						rgbParts = longformRegex.exec(hex);

						return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
					},
					isCSSNullValue: function isCSSNullValue(value) {
						/* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
	      Thus, we check for both falsiness and these special strings. */
						/* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
	      templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
						/* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
						return !value || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value);
					},
					/* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
					getUnitType: function getUnitType(property) {
						if (/^(rotate|skew)/i.test(property)) {
							return "deg";
						} else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
							/* The above properties are unitless. */
							return "";
						} else {
							/* Default to px for all other properties. */
							return "px";
						}
					},
					/* HTML elements default to an associated display type when they're not set to display:none. */
					/* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
					getDisplayType: function getDisplayType(element) {
						var tagName = element && element.tagName.toString().toLowerCase();

						if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
							return "inline";
						} else if (/^(li)$/i.test(tagName)) {
							return "list-item";
						} else if (/^(tr)$/i.test(tagName)) {
							return "table-row";
						} else if (/^(table)$/i.test(tagName)) {
							return "table";
						} else if (/^(tbody)$/i.test(tagName)) {
							return "table-row-group";
							/* Default to "block" when no match is found. */
						} else {
							return "block";
						}
					},
					/* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
					addClass: function addClass(element, className) {
						if (element.classList) {
							element.classList.add(className);
						} else {
							element.className += (element.className.length ? " " : "") + className;
						}
					},
					removeClass: function removeClass(element, className) {
						if (element.classList) {
							element.classList.remove(className);
						} else {
							element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
						}
					}
				},
				/****************************
	    Style Getting & Setting
	    ****************************/

				/* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
				getPropertyValue: function getPropertyValue(element, property, rootPropertyValue, forceStyleLookup) {
					/* Get an element's computed property value. */
					/* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
	     style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
	     *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
					function computePropertyValue(element, property) {
						/* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
	      element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
	      offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
	      We subtract border and padding to get the sum of interior + scrollbar. */
						var computedValue = 0;

						/* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
	      of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
	      codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
	      Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
						if (IE <= 8) {
							computedValue = $.css(element, property); /* GET */
							/* All other browsers support getComputedStyle. The returned live object reference is cached onto its
	       associated element so that it does not need to be refetched upon every GET. */
						} else {
							/* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
	       toggle display to the element type's default value. */
							var toggleDisplay = false;

							if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
								toggleDisplay = true;
								CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
							}

							var revertDisplay = function revertDisplay() {
								if (toggleDisplay) {
									CSS.setPropertyValue(element, "display", "none");
								}
							};

							if (!forceStyleLookup) {
								if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
									var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
									revertDisplay();

									return contentBoxHeight;
								} else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
									var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
									revertDisplay();

									return contentBoxWidth;
								}
							}

							var computedStyle;

							/* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
	       of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
							if (Data(element) === undefined) {
								computedStyle = window.getComputedStyle(element, null); /* GET */
								/* If the computedStyle object has yet to be cached, do so now. */
							} else if (!Data(element).computedStyle) {
								computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
								/* If computedStyle is cached, use it. */
							} else {
								computedStyle = Data(element).computedStyle;
							}

							/* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
	       Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
	       So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
							if (property === "borderColor") {
								property = "borderTopColor";
							}

							/* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
	       instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
							if (IE === 9 && property === "filter") {
								computedValue = computedStyle.getPropertyValue(property); /* GET */
							} else {
								computedValue = computedStyle[property];
							}

							/* Fall back to the property's style value (if defined) when computedValue returns nothing,
	       which can happen when the element hasn't been painted. */
							if (computedValue === "" || computedValue === null) {
								computedValue = element.style[property];
							}

							revertDisplay();
						}

						/* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
	      defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
	      effect as being set to 0, so no conversion is necessary.) */
						/* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
	      property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
	      to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
						if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
							var position = computePropertyValue(element, "position"); /* GET */

							/* For absolute positioning, jQuery's $.position() only returns values for top and left;
	       right and bottom will have their "auto" value reverted to 0. */
							/* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
	       Not a big deal since we're currently in a GET batch anyway. */
							if (position === "fixed" || position === "absolute" && /top|left/i.test(property)) {
								/* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
								computedValue = $(element).position()[property] + "px"; /* GET */
							}
						}

						return computedValue;
					}

					var propertyValue;

					/* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
	     extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
					if (CSS.Hooks.registered[property]) {
						var hook = property,
						    hookRoot = CSS.Hooks.getRoot(hook);

						/* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
	      query the DOM for the root property's value. */
						if (rootPropertyValue === undefined) {
							/* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
							rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
						}

						/* If this root has a normalization registered, peform the associated normalization extraction. */
						if (CSS.Normalizations.registered[hookRoot]) {
							rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
						}

						/* Extract the hook's value. */
						propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

						/* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
	      normalize the property's name and value, and handle the special case of transforms. */
						/* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
	      numerical and therefore do not require normalization extraction. */
					} else if (CSS.Normalizations.registered[property]) {
						var normalizedPropertyName, normalizedPropertyValue;

						normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

						/* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
	      At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
	      This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
	      thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
						if (normalizedPropertyName !== "transform") {
							normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

							/* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
							if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
								normalizedPropertyValue = CSS.Hooks.templates[property][1];
							}
						}

						propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
					}

					/* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
					if (!/^[\d-]/.test(propertyValue)) {
						/* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
	      their HTML attribute values instead of their CSS style values. */
						var data = Data(element);

						if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
							/* Since the height/width attribute values must be set manually, they don't reflect computed values.
	       Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
							if (/^(height|width)$/i.test(property)) {
								/* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
								try {
									propertyValue = element.getBBox()[property];
								} catch (error) {
									propertyValue = 0;
								}
								/* Otherwise, access the attribute value directly. */
							} else {
								propertyValue = element.getAttribute(property);
							}
						} else {
							propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
						}
					}

					/* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
	     convert CSS null-values to an integer of value 0. */
					if (CSS.Values.isCSSNullValue(propertyValue)) {
						propertyValue = 0;
					}

					if (Velocity.debug >= 2) {
						console.log("Get " + property + ": " + propertyValue);
					}

					return propertyValue;
				},
				/* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
				setPropertyValue: function setPropertyValue(element, property, propertyValue, rootPropertyValue, scrollData) {
					var propertyName = property;

					/* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
					if (property === "scroll") {
						/* If a container option is present, scroll the container instead of the browser window. */
						if (scrollData.container) {
							scrollData.container["scroll" + scrollData.direction] = propertyValue;
							/* Otherwise, Velocity defaults to scrolling the browser window. */
						} else {
							if (scrollData.direction === "Left") {
								window.scrollTo(propertyValue, scrollData.alternateValue);
							} else {
								window.scrollTo(scrollData.alternateValue, propertyValue);
							}
						}
					} else {
						/* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
	      Thus, for now, we merely cache transforms being SET. */
						if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
							/* Perform a normalization injection. */
							/* Note: The normalization logic handles the transformCache updating. */
							CSS.Normalizations.registered[property]("inject", element, propertyValue);

							propertyName = "transform";
							propertyValue = Data(element).transformCache[property];
						} else {
							/* Inject hooks. */
							if (CSS.Hooks.registered[property]) {
								var hookName = property,
								    hookRoot = CSS.Hooks.getRoot(property);

								/* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
								rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

								propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
								property = hookRoot;
							}

							/* Normalize names and values. */
							if (CSS.Normalizations.registered[property]) {
								propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
								property = CSS.Normalizations.registered[property]("name", element);
							}

							/* Assign the appropriate vendor prefix before performing an official style update. */
							propertyName = CSS.Names.prefixCheck(property)[0];

							/* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
	       Try/catch is avoided for other browsers since it incurs a performance overhead. */
							if (IE <= 8) {
								try {
									element.style[propertyName] = propertyValue;
								} catch (error) {
									if (Velocity.debug) {
										console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
									}
								}
								/* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
								/* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
							} else {
								var data = Data(element);

								if (data && data.isSVG && CSS.Names.SVGAttribute(property)) {
									/* Note: For SVG attributes, vendor-prefixed property names are never used. */
									/* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
									element.setAttribute(property, propertyValue);
								} else {
									element.style[propertyName] = propertyValue;
								}
							}

							if (Velocity.debug >= 2) {
								console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
							}
						}
					}

					/* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
					return [propertyName, propertyValue];
				},
				/* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
				/* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
				flushTransformCache: function flushTransformCache(element) {
					var transformString = "",
					    data = Data(element);

					/* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
	     (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
					if ((IE || Velocity.State.isAndroid && !Velocity.State.isChrome) && data && data.isSVG) {
						/* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
	      Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
						var getTransformFloat = function getTransformFloat(transformProperty) {
							return parseFloat(CSS.getPropertyValue(element, transformProperty));
						};

						/* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
	      we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
						var SVGTransforms = {
							translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
							skewX: [getTransformFloat("skewX")], skewY: [getTransformFloat("skewY")],
							/* If the scale property is set (non-1), use that value for the scaleX and scaleY values
	       (this behavior mimics the result of animating all these properties at once on HTML elements). */
							scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
							/* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
	       defining the rotation's origin point. We ignore the origin values (default them to 0). */
							rotate: [getTransformFloat("rotateZ"), 0, 0]
						};

						/* Iterate through the transform properties in the user-defined property map order.
	      (This mimics the behavior of non-SVG transform animation.) */
						$.each(Data(element).transformCache, function (transformName) {
							/* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
	       properties so that they match up with SVG's accepted transform properties. */
							if (/^translate/i.test(transformName)) {
								transformName = "translate";
							} else if (/^scale/i.test(transformName)) {
								transformName = "scale";
							} else if (/^rotate/i.test(transformName)) {
								transformName = "rotate";
							}

							/* Check that we haven't yet deleted the property from the SVGTransforms container. */
							if (SVGTransforms[transformName]) {
								/* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
								transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

								/* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
	        re-insert the same master property if we encounter another one of its axis-specific properties. */
								delete SVGTransforms[transformName];
							}
						});
					} else {
						var transformValue, perspective;

						/* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
						$.each(Data(element).transformCache, function (transformName) {
							transformValue = Data(element).transformCache[transformName];

							/* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
							if (transformName === "transformPerspective") {
								perspective = transformValue;
								return true;
							}

							/* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
							if (IE === 9 && transformName === "rotateZ") {
								transformName = "rotate";
							}

							transformString += transformName + transformValue + " ";
						});

						/* If present, set the perspective subproperty first. */
						if (perspective) {
							transformString = "perspective" + perspective + " " + transformString;
						}
					}

					CSS.setPropertyValue(element, "transform", transformString);
				}
			};

			/* Register hooks and normalizations. */
			CSS.Hooks.register();
			CSS.Normalizations.register();

			/* Allow hook setting in the same fashion as jQuery's $.css(). */
			Velocity.hook = function (elements, arg2, arg3) {
				var value;

				elements = sanitizeElements(elements);

				$.each(elements, function (i, element) {
					/* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
					if (Data(element) === undefined) {
						Velocity.init(element);
					}

					/* Get property value. If an element set was passed in, only return the value for the first element. */
					if (arg3 === undefined) {
						if (value === undefined) {
							value = Velocity.CSS.getPropertyValue(element, arg2);
						}
						/* Set property value. */
					} else {
						/* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
						var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);

						/* Transform properties don't automatically set. They have to be flushed to the DOM. */
						if (adjustedSet[0] === "transform") {
							Velocity.CSS.flushTransformCache(element);
						}

						value = adjustedSet;
					}
				});

				return value;
			};

			/*****************
	   Animation
	   *****************/

			var animate = function animate() {
				var opts;

				/******************
	    Call Chain
	    ******************/

				/* Logic for determining what to return to the call stack when exiting out of Velocity. */
				function getChain() {
					/* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
	     default to null instead of returning the targeted elements so that utility function's return value is standardized. */
					if (isUtility) {
						return promiseData.promise || null;
						/* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
					} else {
						return elementsWrapped;
					}
				}

				/*************************
	    Arguments Assignment
	    *************************/

				/* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
	    objects are defined on a container object that's passed in as Velocity's sole argument. */
				/* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
				var syntacticSugar = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || Type.isString(arguments[0].properties)),

				/* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
				isUtility,

				/* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
	    passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
				elementsWrapped,
				    argumentIndex;

				var elements, propertiesMap, options;

				/* Detect jQuery/Zepto elements being animated via the $.fn method. */
				if (Type.isWrapped(this)) {
					isUtility = false;

					argumentIndex = 0;
					elements = this;
					elementsWrapped = this;
					/* Otherwise, raw elements are being animated via the utility function. */
				} else {
					isUtility = true;

					argumentIndex = 1;
					elements = syntacticSugar ? arguments[0].elements || arguments[0].e : arguments[0];
				}

				elements = sanitizeElements(elements);

				if (!elements) {
					return;
				}

				if (syntacticSugar) {
					propertiesMap = arguments[0].properties || arguments[0].p;
					options = arguments[0].options || arguments[0].o;
				} else {
					propertiesMap = arguments[argumentIndex];
					options = arguments[argumentIndex + 1];
				}

				/* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
	    single raw DOM element is passed in (which doesn't contain a length property). */
				var elementsLength = elements.length,
				    elementsIndex = 0;

				/***************************
	    Argument Overloading
	    ***************************/

				/* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
	    Overloading is detected by checking for the absence of an object being passed into options. */
				/* Note: The stop and finish actions do not accept animation options, and are therefore excluded from this check. */
				if (!/^(stop|finish|finishAll)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
					/* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
					var startingArgumentPosition = argumentIndex + 1;

					options = {};

					/* Iterate through all options arguments */
					for (var i = startingArgumentPosition; i < arguments.length; i++) {
						/* Treat a number as a duration. Parse it out. */
						/* Note: The following RegEx will return true if passed an array with a number as its first item.
	      Thus, arrays are skipped from this check. */
						if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
							options.duration = arguments[i];
							/* Treat strings and arrays as easings. */
						} else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
							options.easing = arguments[i];
							/* Treat a function as a complete callback. */
						} else if (Type.isFunction(arguments[i])) {
							options.complete = arguments[i];
						}
					}
				}

				/***************
	    Promises
	    ***************/

				var promiseData = {
					promise: null,
					resolver: null,
					rejecter: null
				};

				/* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
	    promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
	    method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
	    call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
				/* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
	    triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
	    grouped together for the purposes of resolving and rejecting a promise. */
				if (isUtility && Velocity.Promise) {
					promiseData.promise = new Velocity.Promise(function (resolve, reject) {
						promiseData.resolver = resolve;
						promiseData.rejecter = reject;
					});
				}

				/*********************
	    Action Detection
	    *********************/

				/* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
	    or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
	    first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
				var action;

				switch (propertiesMap) {
					case "scroll":
						action = "scroll";
						break;

					case "reverse":
						action = "reverse";
						break;

					case "finish":
					case "finishAll":
					case "stop":
						/*******************
	      Action: Stop
	      *******************/

						/* Clear the currently-active delay on each targeted element. */
						$.each(elements, function (i, element) {
							if (Data(element) && Data(element).delayTimer) {
								/* Stop the timer from triggering its cached next() function. */
								clearTimeout(Data(element).delayTimer.setTimeout);

								/* Manually call the next() function so that the subsequent queue items can progress. */
								if (Data(element).delayTimer.next) {
									Data(element).delayTimer.next();
								}

								delete Data(element).delayTimer;
							}

							/* If we want to finish everything in the queue, we have to iterate through it
	       and call each function. This will make them active calls below, which will
	       cause them to be applied via the duration setting. */
							if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
								/* Iterate through the items in the element's queue. */
								$.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {
									/* The queue array can contain an "inprogress" string, which we skip. */
									if (Type.isFunction(item)) {
										item();
									}
								});

								/* Clearing the $.queue() array is achieved by resetting it to []. */
								$.queue(element, Type.isString(options) ? options : "", []);
							}
						});

						var callsToStop = [];

						/* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
	      been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
	      is stopped, the next item in its animation queue is immediately triggered. */
						/* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
	      or a custom queue string can be passed in. */
						/* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
	      regardless of the element's current queue state. */

						/* Iterate through every active call. */
						$.each(Velocity.State.calls, function (i, activeCall) {
							/* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
							if (activeCall) {
								/* Iterate through the active call's targeted elements. */
								$.each(activeCall[1], function (k, activeElement) {
									/* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
	         clear calls associated with the relevant queue. */
									/* Call stopping logic works as follows:
	         - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
	         - options === undefined --> stop current queue:"" call and all queue:false calls.
	         - options === false --> stop only queue:false calls.
	         - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
									var queueName = options === undefined ? "" : options;

									if (queueName !== true && activeCall[2].queue !== queueName && !(options === undefined && activeCall[2].queue === false)) {
										return true;
									}

									/* Iterate through the calls targeted by the stop command. */
									$.each(elements, function (l, element) {
										/* Check that this call was applied to the target element. */
										if (element === activeElement) {
											/* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
	           due to the queue-clearing above. */
											if (options === true || Type.isString(options)) {
												/* Iterate through the items in the element's queue. */
												$.each($.queue(element, Type.isString(options) ? options : ""), function (_, item) {
													/* The queue array can contain an "inprogress" string, which we skip. */
													if (Type.isFunction(item)) {
														/* Pass the item's callback a flag indicating that we want to abort from the queue call.
	              (Specifically, the queue will resolve the call's associated promise then abort.)  */
														item(null, true);
													}
												});

												/* Clearing the $.queue() array is achieved by resetting it to []. */
												$.queue(element, Type.isString(options) ? options : "", []);
											}

											if (propertiesMap === "stop") {
												/* Since "reverse" uses cached start values (the previous call's endValues), these values must be
	            changed to reflect the final value that the elements were actually tweened to. */
												/* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
	            object. Also, queue:false animations can't be reversed. */
												var data = Data(element);
												if (data && data.tweensContainer && queueName !== false) {
													$.each(data.tweensContainer, function (m, activeTween) {
														activeTween.endValue = activeTween.currentValue;
													});
												}

												callsToStop.push(i);
											} else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
												/* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
	            they finish upon the next rAf tick then proceed with normal call completion logic. */
												activeCall[2].duration = 1;
											}
										}
									});
								});
							}
						});

						/* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
	      that the complete callback and display:none setting should be skipped since we're completing prematurely. */
						if (propertiesMap === "stop") {
							$.each(callsToStop, function (i, j) {
								completeCall(j, true);
							});

							if (promiseData.promise) {
								/* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
								promiseData.resolver(elements);
							}
						}

						/* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
						return getChain();

					default:
						/* Treat a non-empty plain object as a literal properties map. */
						if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
							action = "start";

							/****************
	       Redirects
	       ****************/

							/* Check if a string matches a registered redirect (see Redirects above). */
						} else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
							opts = $.extend({}, options);

							var durationOriginal = opts.duration,
							    delayOriginal = opts.delay || 0;

							/* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
							if (opts.backwards === true) {
								elements = $.extend(true, [], elements).reverse();
							}

							/* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
							$.each(elements, function (elementIndex, element) {
								/* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
								if (parseFloat(opts.stagger)) {
									opts.delay = delayOriginal + parseFloat(opts.stagger) * elementIndex;
								} else if (Type.isFunction(opts.stagger)) {
									opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
								}

								/* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
	        the duration of each element's animation, using floors to prevent producing very short durations. */
								if (opts.drag) {
									/* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
									opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

									/* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
	         B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
	         The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
									opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
								}

								/* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
	        reduce the opts checking logic required inside the redirect. */
								Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
							});

							/* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
	       (The performance overhead up to this point is virtually non-existant.) */
							/* Note: The jQuery call chain is kept intact by returning the complete element set. */
							return getChain();
						} else {
							var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

							if (promiseData.promise) {
								promiseData.rejecter(new Error(abortError));
							} else {
								console.log(abortError);
							}

							return getChain();
						}
				}

				/**************************
	    Call-Wide Variables
	    **************************/

				/* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
	    being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
	    avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
	    conversion metrics across Velocity animations that are not immediately consecutively chained. */
				var callUnitConversionData = {
					lastParent: null,
					lastPosition: null,
					lastFontSize: null,
					lastPercentToPxWidth: null,
					lastPercentToPxHeight: null,
					lastEmToPx: null,
					remToPx: null,
					vwToPx: null,
					vhToPx: null
				};

				/* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
	    Velocity.State.calls array that is processed during animation ticking. */
				var call = [];

				/************************
	    Element Processing
	    ************************/

				/* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
	    1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
	    2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
	    3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
	    `elementArrayIndex` allows passing index of the element in the original array to value functions.
	    If `elementsIndex` were used instead the index would be determined by the elements' per-element queue.
	    */
				function processElement(element, elementArrayIndex) {

					/*************************
	     Part I: Pre-Queueing
	     *************************/

					/***************************
	     Element-Wide Variables
	     ***************************/

					var /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
					opts = $.extend({}, Velocity.defaults, options),

					/* A container for the processed data associated with each property in the propertyMap.
	     (Each property in the map produces its own "tween".) */
					tweensContainer = {},
					    elementUnitConversionData;

					/******************
	     Element Init
	     ******************/

					if (Data(element) === undefined) {
						Velocity.init(element);
					}

					/******************
	     Option: Delay
	     ******************/

					/* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
					/* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
	     (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
					if (parseFloat(opts.delay) && opts.queue !== false) {
						$.queue(element, opts.queue, function (next) {
							/* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
							Velocity.velocityQueueEntryFlag = true;

							/* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
	       The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
							Data(element).delayTimer = {
								setTimeout: setTimeout(next, parseFloat(opts.delay)),
								next: next
							};
						});
					}

					/*********************
	     Option: Duration
	     *********************/

					/* Support for jQuery's named durations. */
					switch (opts.duration.toString().toLowerCase()) {
						case "fast":
							opts.duration = 200;
							break;

						case "normal":
							opts.duration = DURATION_DEFAULT;
							break;

						case "slow":
							opts.duration = 600;
							break;

						default:
							/* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
							opts.duration = parseFloat(opts.duration) || 1;
					}

					/************************
	     Global Option: Mock
	     ************************/

					if (Velocity.mock !== false) {
						/* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
	      Alternatively, a multiplier can be passed in to time remap all delays and durations. */
						if (Velocity.mock === true) {
							opts.duration = opts.delay = 1;
						} else {
							opts.duration *= parseFloat(Velocity.mock) || 1;
							opts.delay *= parseFloat(Velocity.mock) || 1;
						}
					}

					/*******************
	     Option: Easing
	     *******************/

					opts.easing = getEasing(opts.easing, opts.duration);

					/**********************
	     Option: Callbacks
	     **********************/

					/* Callbacks must functions. Otherwise, default to null. */
					if (opts.begin && !Type.isFunction(opts.begin)) {
						opts.begin = null;
					}

					if (opts.progress && !Type.isFunction(opts.progress)) {
						opts.progress = null;
					}

					if (opts.complete && !Type.isFunction(opts.complete)) {
						opts.complete = null;
					}

					/*********************************
	     Option: Display & Visibility
	     *********************************/

					/* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
					/* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
					if (opts.display !== undefined && opts.display !== null) {
						opts.display = opts.display.toString().toLowerCase();

						/* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
						if (opts.display === "auto") {
							opts.display = Velocity.CSS.Values.getDisplayType(element);
						}
					}

					if (opts.visibility !== undefined && opts.visibility !== null) {
						opts.visibility = opts.visibility.toString().toLowerCase();
					}

					/**********************
	     Option: mobileHA
	     **********************/

					/* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
	     on animating elements. HA is removed from the element at the completion of its animation. */
					/* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
					/* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
					opts.mobileHA = opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread;

					/***********************
	     Part II: Queueing
	     ***********************/

					/* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
	     In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
					/* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
	     the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
					function buildQueue(next) {
						var data, lastTweensContainer;

						/*******************
	      Option: Begin
	      *******************/

						/* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
						if (opts.begin && elementsIndex === 0) {
							/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
							try {
								opts.begin.call(elements, elements);
							} catch (error) {
								setTimeout(function () {
									throw error;
								}, 1);
							}
						}

						/*****************************************
	      Tween Data Construction (for Scroll)
	      *****************************************/

						/* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
						if (action === "scroll") {
							/* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
							var scrollDirection = /^x$/i.test(opts.axis) ? "Left" : "Top",
							    scrollOffset = parseFloat(opts.offset) || 0,
							    scrollPositionCurrent,
							    scrollPositionCurrentAlternate,
							    scrollPositionEnd;

							/* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
	       as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
							if (opts.container) {
								/* Ensure that either a jQuery object or a raw DOM element was passed in. */
								if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
									/* Extract the raw DOM element from the jQuery wrapper. */
									opts.container = opts.container[0] || opts.container;
									/* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
	         (due to the user's natural interaction with the page). */
									scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

									/* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
	         -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
	         the scroll container's current scroll position. */
									scrollPositionEnd = scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
									/* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
								} else {
									opts.container = null;
								}
							} else {
								/* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
	        the appropriate cached property names (which differ based on browser type). */
								scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
								/* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
								scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

								/* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
	        and therefore end values do not need to be compounded onto current values. */
								scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
							}

							/* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
							tweensContainer = {
								scroll: {
									rootPropertyValue: false,
									startValue: scrollPositionCurrent,
									currentValue: scrollPositionCurrent,
									endValue: scrollPositionEnd,
									unitType: "",
									easing: opts.easing,
									scrollData: {
										container: opts.container,
										direction: scrollDirection,
										alternateValue: scrollPositionCurrentAlternate
									}
								},
								element: element
							};

							if (Velocity.debug) {
								console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
							}

							/******************************************
	       Tween Data Construction (for Reverse)
	       ******************************************/

							/* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
	       that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
	       the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
							/* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
							/* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
	       there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
	       as reverting to the element's values as they were prior to the previous *Velocity* call. */
						} else if (action === "reverse") {
							data = Data(element);

							/* Abort if there is no prior animation data to reverse to. */
							if (!data) {
								return;
							}

							if (!data.tweensContainer) {
								/* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
								$.dequeue(element, opts.queue);

								return;
							} else {
								/*********************
	        Options Parsing
	        *********************/

								/* If the element was hidden via the display option in the previous call,
	        revert display to "auto" prior to reversal so that the element is visible again. */
								if (data.opts.display === "none") {
									data.opts.display = "auto";
								}

								if (data.opts.visibility === "hidden") {
									data.opts.visibility = "visible";
								}

								/* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
	        Further, remove the previous call's callback options; typically, users do not want these to be refired. */
								data.opts.loop = false;
								data.opts.begin = null;
								data.opts.complete = null;

								/* Since we're extending an opts object that has already been extended with the defaults options object,
	        we remove non-explicitly-defined properties that are auto-assigned values. */
								if (!options.easing) {
									delete opts.easing;
								}

								if (!options.duration) {
									delete opts.duration;
								}

								/* The opts object used for reversal is an extension of the options object optionally passed into this
	        reverse call plus the options used in the previous Velocity call. */
								opts = $.extend({}, data.opts, opts);

								/*************************************
	        Tweens Container Reconstruction
	        *************************************/

								/* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
								lastTweensContainer = $.extend(true, {}, data ? data.tweensContainer : null);

								/* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
								for (var lastTween in lastTweensContainer) {
									/* In addition to tween data, tweensContainers contain an element property that we ignore here. */
									if (lastTween !== "element") {
										var lastStartValue = lastTweensContainer[lastTween].startValue;

										lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
										lastTweensContainer[lastTween].endValue = lastStartValue;

										/* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
	          Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
	          The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
										if (!Type.isEmptyObject(options)) {
											lastTweensContainer[lastTween].easing = opts.easing;
										}

										if (Velocity.debug) {
											console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
										}
									}
								}

								tweensContainer = lastTweensContainer;
							}

							/*****************************************
	       Tween Data Construction (for Start)
	       *****************************************/
						} else if (action === "start") {

							/*************************
	       Value Transferring
	       *************************/

							/* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
	       while the element was in the process of being animated by Velocity, then this current call is safe to use
	       the end values from the prior call as its start values. Velocity attempts to perform this value transfer
	       process whenever possible in order to avoid requerying the DOM. */
							/* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
	       then the DOM is queried for the element's current values as a last resort. */
							/* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */

							data = Data(element);

							/* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
	       to transfer over end values to use as start values. If it's set to true and there is a previous
	       Velocity call to pull values from, do so. */
							if (data && data.tweensContainer && data.isAnimating === true) {
								lastTweensContainer = data.tweensContainer;
							}

							/***************************
	       Tween Data Calculation
	       ***************************/

							/* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
							/* Property map values can either take the form of 1) a single value representing the end value,
	       or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
	       The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
	       the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
							var parsePropertyValue = function parsePropertyValue(valueData, skipResolvingEasing) {
								var endValue, easing, startValue;

								/* Handle the array format, which can be structured as one of three potential overloads:
	        A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
								if (Type.isArray(valueData)) {
									/* endValue is always the first item in the array. Don't bother validating endValue's value now
	         since the ensuing property cycling logic does that. */
									endValue = valueData[0];

									/* Two-item array format: If the second item is a number, function, or hex string, treat it as a
	         start value since easings can only be non-hex strings or arrays. */
									if (!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1]) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
										startValue = valueData[1];
										/* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
									} else if (Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1]) || Type.isArray(valueData[1])) {
										easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

										/* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
										if (valueData[2] !== undefined) {
											startValue = valueData[2];
										}
									}
									/* Handle the single-value format. */
								} else {
									endValue = valueData;
								}

								/* Default to the call's easing if a per-property easing type was not defined. */
								if (!skipResolvingEasing) {
									easing = easing || opts.easing;
								}

								/* If functions were passed in as values, pass the function the current element as its context,
	        plus the element's index and the element set's size as arguments. Then, assign the returned value. */
								if (Type.isFunction(endValue)) {
									endValue = endValue.call(element, elementArrayIndex, elementsLength);
								}

								if (Type.isFunction(startValue)) {
									startValue = startValue.call(element, elementArrayIndex, elementsLength);
								}

								/* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
								return [endValue || 0, easing, startValue];
							};

							/* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
	       colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
							$.each(propertiesMap, function (property, value) {
								/* Find shorthand color properties that have been passed a hex string. */
								if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(CSS.Names.camelCase(property))) {
									/* Parse the value data for each shorthand. */
									var valueData = parsePropertyValue(value, true),
									    endValue = valueData[0],
									    easing = valueData[1],
									    startValue = valueData[2];

									if (CSS.RegEx.isHex.test(endValue)) {
										/* Convert the hex strings into their RGB component arrays. */
										var colorComponents = ["Red", "Green", "Blue"],
										    endValueRGB = CSS.Values.hexToRgb(endValue),
										    startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

										/* Inject the RGB component tweens into propertiesMap. */
										for (var i = 0; i < colorComponents.length; i++) {
											var dataArray = [endValueRGB[i]];

											if (easing) {
												dataArray.push(easing);
											}

											if (startValueRGB !== undefined) {
												dataArray.push(startValueRGB[i]);
											}

											propertiesMap[CSS.Names.camelCase(property) + colorComponents[i]] = dataArray;
										}

										/* Remove the intermediary shorthand property entry now that we've processed it. */
										delete propertiesMap[property];
									}
								}
							});

							/* Create a tween out of each property, and append its associated data to tweensContainer. */
							for (var property in propertiesMap) {

								/**************************
	        Start Value Sourcing
	        **************************/

								/* Parse out endValue, easing, and startValue from the property's data. */
								var valueData = parsePropertyValue(propertiesMap[property]),
								    endValue = valueData[0],
								    easing = valueData[1],
								    startValue = valueData[2];

								/* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
	        we force the property to its camelCase styling to normalize it for manipulation. */
								property = CSS.Names.camelCase(property);

								/* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
								var rootProperty = CSS.Hooks.getRoot(property),
								    rootPropertyValue = false;

								/* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
	        inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
	        Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
								/* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
	        there is no way to check for their explicit browser support, and so we skip skip this check for them. */
								if ((!data || !data.isSVG) && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
									if (Velocity.debug) {
										console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
									}
									continue;
								}

								/* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
	        animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
	        a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
								if ((opts.display !== undefined && opts.display !== null && opts.display !== "none" || opts.visibility !== undefined && opts.visibility !== "hidden") && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
									startValue = 0;
								}

								/* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
	        for all of the current call's properties that were *also* animated in the previous call. */
								/* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
								if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
									if (startValue === undefined) {
										startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
									}

									/* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
	         instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
	         attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
									rootPropertyValue = data.rootPropertyValueCache[rootProperty];
									/* If values were not transferred from a previous Velocity call, query the DOM as needed. */
								} else {
									/* Handle hooked properties. */
									if (CSS.Hooks.registered[property]) {
										if (startValue === undefined) {
											rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
											/* Note: The following getPropertyValue() call does not actually trigger a DOM query;
	           getPropertyValue() will extract the hook from rootPropertyValue. */
											startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
											/* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
	           just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
	           root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
	           to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
										} else {
											/* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
											rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
										}
										/* Handle non-hooked properties that haven't already been defined via forcefeeding. */
									} else if (startValue === undefined) {
										startValue = CSS.getPropertyValue(element, property); /* GET */
									}
								}

								/**************************
	        Value Data Extraction
	        **************************/

								var separatedValue,
								    endValueUnitType,
								    startValueUnitType,
								    operator = false;

								/* Separates a property value into its numeric value and its unit type. */
								var separateValue = function separateValue(property, value) {
									var unitType, numericValue;

									numericValue = (value || "0").toString().toLowerCase()
									/* Match the unit type at the end of the value. */
									.replace(/[%A-z]+$/, function (match) {
										/* Grab the unit type. */
										unitType = match;

										/* Strip the unit type off of value. */
										return "";
									});

									/* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
									if (!unitType) {
										unitType = CSS.Values.getUnitType(property);
									}

									return [numericValue, unitType];
								};

								/* Separate startValue. */
								separatedValue = separateValue(property, startValue);
								startValue = separatedValue[0];
								startValueUnitType = separatedValue[1];

								/* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
								separatedValue = separateValue(property, endValue);
								endValue = separatedValue[0].replace(/^([+-\/*])=/, function (match, subMatch) {
									operator = subMatch;

									/* Strip the operator off of the value. */
									return "";
								});
								endValueUnitType = separatedValue[1];

								/* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
								startValue = parseFloat(startValue) || 0;
								endValue = parseFloat(endValue) || 0;

								/***************************************
	        Property-Specific Value Conversion
	        ***************************************/

								/* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
								if (endValueUnitType === "%") {
									/* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
	         which is identical to the em unit's behavior, so we piggyback off of that. */
									if (/^(fontSize|lineHeight)$/.test(property)) {
										/* Convert % into an em decimal value. */
										endValue = endValue / 100;
										endValueUnitType = "em";
										/* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
									} else if (/^scale/.test(property)) {
										endValue = endValue / 100;
										endValueUnitType = "";
										/* For RGB components, take the defined percentage of 255 and strip off the unit type. */
									} else if (/(Red|Green|Blue)$/i.test(property)) {
										endValue = endValue / 100 * 255;
										endValueUnitType = "";
									}
								}

								/***************************
	        Unit Ratio Calculation
	        ***************************/

								/* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
	        %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
	        for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
	        from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
	        1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
	        2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
								/* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
	        setting values with the target unit type then comparing the returned pixel value. */
								/* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
	        of batching the SETs and GETs together upfront outweights the potential overhead
	        of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
								/* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
								var calculateUnitRatios = function calculateUnitRatios() {

									/************************
	         Same Ratio Checks
	         ************************/

									/* The properties below are used to determine whether the element differs sufficiently from this call's
	         previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
	         of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
	         this is done to minimize DOM querying. */
									var sameRatioIndicators = {
										myParent: element.parentNode || document.body, /* GET */
										position: CSS.getPropertyValue(element, "position"), /* GET */
										fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
									},

									/* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
									samePercentRatio = sameRatioIndicators.position === callUnitConversionData.lastPosition && sameRatioIndicators.myParent === callUnitConversionData.lastParent,

									/* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
									sameEmRatio = sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize;

									/* Store these ratio indicators call-wide for the next element to compare against. */
									callUnitConversionData.lastParent = sameRatioIndicators.myParent;
									callUnitConversionData.lastPosition = sameRatioIndicators.position;
									callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

									/***************************
	         Element-Specific Units
	         ***************************/

									/* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
	         of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
									var measurement = 100,
									    unitRatios = {};

									if (!sameEmRatio || !samePercentRatio) {
										var dummy = data && data.isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

										Velocity.init(dummy);
										sameRatioIndicators.myParent.appendChild(dummy);

										/* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
	          Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
										/* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
										$.each(["overflow", "overflowX", "overflowY"], function (i, property) {
											Velocity.CSS.setPropertyValue(dummy, property, "hidden");
										});
										Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
										Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
										Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

										/* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
										$.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (i, property) {
											Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
										});
										/* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
										Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

										/* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
										unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
										unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
										unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

										sameRatioIndicators.myParent.removeChild(dummy);
									} else {
										unitRatios.emToPx = callUnitConversionData.lastEmToPx;
										unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
										unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
									}

									/***************************
	         Element-Agnostic Units
	         ***************************/

									/* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
	         once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
	         that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
	         so we calculate it now. */
									if (callUnitConversionData.remToPx === null) {
										/* Default to browsers' default fontSize of 16px in the case of 0. */
										callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
									}

									/* Similarly, viewport units are %-relative to the window's inner dimensions. */
									if (callUnitConversionData.vwToPx === null) {
										callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
										callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
									}

									unitRatios.remToPx = callUnitConversionData.remToPx;
									unitRatios.vwToPx = callUnitConversionData.vwToPx;
									unitRatios.vhToPx = callUnitConversionData.vhToPx;

									if (Velocity.debug >= 1) {
										console.log("Unit ratios: " + JSON.stringify(unitRatios), element);
									}
									return unitRatios;
								};

								/********************
	        Unit Conversion
	        ********************/

								/* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
								if (/[\/*]/.test(operator)) {
									endValueUnitType = startValueUnitType;
									/* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
	         is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
	         on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
	         would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
									/* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
								} else if (startValueUnitType !== endValueUnitType && startValue !== 0) {
									/* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
									/* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
	         match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
	         which remains past the point of the animation's completion. */
									if (endValue === 0) {
										endValueUnitType = startValueUnitType;
									} else {
										/* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
	          If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
										elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

										/* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
										/* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
										var axis = /margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x" ? "x" : "y";

										/* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
	          1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
										switch (startValueUnitType) {
											case "%":
												/* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
	            Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
	            to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
												startValue *= axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight;
												break;

											case "px":
												/* px acts as our midpoint in the unit conversion process; do nothing. */
												break;

											default:
												startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
										}

										/* Invert the px ratios to convert into to the target unit. */
										switch (endValueUnitType) {
											case "%":
												startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
												break;

											case "px":
												/* startValue is already in px, do nothing; we're done. */
												break;

											default:
												startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
										}
									}
								}

								/*********************
	        Relative Values
	        *********************/

								/* Operator logic must be performed last since it requires unit-normalized start and end values. */
								/* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
	        to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
	        50 points is added on top of the current % value. */
								switch (operator) {
									case "+":
										endValue = startValue + endValue;
										break;

									case "-":
										endValue = startValue - endValue;
										break;

									case "*":
										endValue = startValue * endValue;
										break;

									case "/":
										endValue = startValue / endValue;
										break;
								}

								/**************************
	        tweensContainer Push
	        **************************/

								/* Construct the per-property tween object, and push it to the element's tweensContainer. */
								tweensContainer[property] = {
									rootPropertyValue: rootPropertyValue,
									startValue: startValue,
									currentValue: startValue,
									endValue: endValue,
									unitType: endValueUnitType,
									easing: easing
								};

								if (Velocity.debug) {
									console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
								}
							}

							/* Along with its property data, store a reference to the element itself onto tweensContainer. */
							tweensContainer.element = element;
						}

						/*****************
	      Call Push
	      *****************/

						/* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
	      being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
						if (tweensContainer.element) {
							/* Apply the "velocity-animating" indicator class. */
							CSS.Values.addClass(element, "velocity-animating");

							/* The call array houses the tweensContainers for each element being animated in the current call. */
							call.push(tweensContainer);

							data = Data(element);

							if (data) {
								/* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
								if (opts.queue === "") {

									data.tweensContainer = tweensContainer;
									data.opts = opts;
								}

								/* Switch on the element's animating flag. */
								data.isAnimating = true;
							}

							/* Once the final element in this call's element set has been processed, push the call array onto
	       Velocity.State.calls for the animation tick to immediately begin processing. */
							if (elementsIndex === elementsLength - 1) {
								/* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
	        Anything on this call container is subjected to tick() processing. */
								Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver]);

								/* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
								if (Velocity.State.isTicking === false) {
									Velocity.State.isTicking = true;

									/* Start the tick loop. */
									tick();
								}
							} else {
								elementsIndex++;
							}
						}
					}

					/* When the queue option is set to false, the call skips the element's queue and fires immediately. */
					if (opts.queue === false) {
						/* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
	      we manually inject the delay property here with an explicit setTimeout. */
						if (opts.delay) {
							setTimeout(buildQueue, opts.delay);
						} else {
							buildQueue();
						}
						/* Otherwise, the call undergoes element queueing as normal. */
						/* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
					} else {
						$.queue(element, opts.queue, function (next, clearQueue) {
							/* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
	       so it's fine if this is repeatedly triggered for each element in the associated call.) */
							if (clearQueue === true) {
								if (promiseData.promise) {
									promiseData.resolver(elements);
								}

								/* Do not continue with animation queueing. */
								return true;
							}

							/* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
	       See completeCall() for further details. */
							Velocity.velocityQueueEntryFlag = true;

							buildQueue(next);
						});
					}

					/*********************
	     Auto-Dequeuing
	     *********************/

					/* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
	     must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
	     for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
	     queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
	     first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
					/* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
	     each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
					/* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
	     Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
					if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
						$.dequeue(element);
					}
				}

				/**************************
	    Element Set Iteration
	    **************************/

				/* If the "nodeType" property exists on the elements variable, we're animating a single element.
	    Place it in an array so that $.each() can iterate over it. */
				$.each(elements, function (i, element) {
					/* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
					if (Type.isNode(element)) {
						processElement(element, i);
					}
				});

				/******************
	    Option: Loop
	    ******************/

				/* The loop option accepts an integer indicating how many times the element should loop between the values in the
	    current call's properties map and the element's property values prior to this call. */
				/* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
	    to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
	    which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
				opts = $.extend({}, Velocity.defaults, options);
				opts.loop = parseInt(opts.loop, 10);
				var reverseCallsCount = opts.loop * 2 - 1;

				if (opts.loop) {
					/* Double the loop count to convert it into its appropriate number of "reverse" calls.
	     Subtract 1 from the resulting value since the current call is included in the total alternation count. */
					for (var x = 0; x < reverseCallsCount; x++) {
						/* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
	      isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
	      call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
						var reverseOptions = {
							delay: opts.delay,
							progress: opts.progress
						};

						/* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
	      so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
						if (x === reverseCallsCount - 1) {
							reverseOptions.display = opts.display;
							reverseOptions.visibility = opts.visibility;
							reverseOptions.complete = opts.complete;
						}

						animate(elements, "reverse", reverseOptions);
					}
				}

				/***************
	    Chaining
	    ***************/

				/* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
				return getChain();
			};

			/* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
			Velocity = $.extend(animate, Velocity);
			/* For legacy support, also expose the literal animate method. */
			Velocity.animate = animate;

			/**************
	   Timing
	   **************/

			/* Ticker function. */
			var ticker = window.requestAnimationFrame || rAFShim;

			/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
	   To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
	   devices to avoid wasting battery power on inactive tabs. */
			/* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
			if (!Velocity.State.isMobile && document.hidden !== undefined) {
				document.addEventListener("visibilitychange", function () {
					/* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
					if (document.hidden) {
						ticker = function ticker(callback) {
							/* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
							return setTimeout(function () {
								callback(true);
							}, 16);
						};

						/* The rAF loop has been paused by the browser, so we manually restart the tick. */
						tick();
					} else {
						ticker = window.requestAnimationFrame || rAFShim;
					}
				});
			}

			/************
	   Tick
	   ************/

			/* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
			function tick(timestamp) {
				/* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
	    We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
	    the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
	    calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
	    the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
	    by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
				if (timestamp) {
					/* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
	     under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
					var timeCurrent = new Date().getTime();

					/********************
	     Call Iteration
	     ********************/

					var callsLength = Velocity.State.calls.length;

					/* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
	     when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
	     has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
					if (callsLength > 10000) {
						Velocity.State.calls = compactSparseArray(Velocity.State.calls);
						callsLength = Velocity.State.calls.length;
					}

					/* Iterate through each active call. */
					for (var i = 0; i < callsLength; i++) {
						/* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
						if (!Velocity.State.calls[i]) {
							continue;
						}

						/************************
	      Call-Wide Variables
	      ************************/

						var callContainer = Velocity.State.calls[i],
						    call = callContainer[0],
						    opts = callContainer[2],
						    timeStart = callContainer[3],
						    firstTick = !!timeStart,
						    tweenDummyValue = null;

						/* If timeStart is undefined, then this is the first time that this call has been processed by tick().
	      We assign timeStart now so that its value is as close to the real animation start time as possible.
	      (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
	      between that time and now would cause the first few frames of the tween to be skipped since
	      percentComplete is calculated relative to timeStart.) */
						/* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
	      first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
	      same style value as the element's current value. */
						if (!timeStart) {
							timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
						}

						/* The tween's completion percentage is relative to the tween's start time, not the tween's start value
	      (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
	      Accordingly, we ensure that percentComplete does not exceed 1. */
						var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

						/**********************
	      Element Iteration
	      **********************/

						/* For every call, iterate through each of the elements in its set. */
						for (var j = 0, callLength = call.length; j < callLength; j++) {
							var tweensContainer = call[j],
							    element = tweensContainer.element;

							/* Check to see if this element has been deleted midway through the animation by checking for the
	       continued existence of its data cache. If it's gone, skip animating this element. */
							if (!Data(element)) {
								continue;
							}

							var transformPropertyExists = false;

							/**********************************
	       Display & Visibility Toggling
	       **********************************/

							/* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
	       (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
							if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
								if (opts.display === "flex") {
									var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];

									$.each(flexValues, function (i, flexValue) {
										CSS.setPropertyValue(element, "display", flexValue);
									});
								}

								CSS.setPropertyValue(element, "display", opts.display);
							}

							/* Same goes with the visibility option, but its "none" equivalent is "hidden". */
							if (opts.visibility !== undefined && opts.visibility !== "hidden") {
								CSS.setPropertyValue(element, "visibility", opts.visibility);
							}

							/************************
	       Property Iteration
	       ************************/

							/* For every element, iterate through each property. */
							for (var property in tweensContainer) {
								/* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
								if (property !== "element") {
									var tween = tweensContainer[property],
									    currentValue,

									/* Easing can either be a pre-genereated function or a string that references a pre-registered easing
	         on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
									easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

									/******************************
	         Current Value Calculation
	         ******************************/

									/* If this is the last tick pass (if we've reached 100% completion for this tween),
	         ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
									if (percentComplete === 1) {
										currentValue = tween.endValue;
										/* Otherwise, calculate currentValue based on the current delta from startValue. */
									} else {
										var tweenDelta = tween.endValue - tween.startValue;
										currentValue = tween.startValue + tweenDelta * easing(percentComplete, opts, tweenDelta);

										/* If no value change is occurring, don't proceed with DOM updating. */
										if (!firstTick && currentValue === tween.currentValue) {
											continue;
										}
									}

									tween.currentValue = currentValue;

									/* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
	         it can be passed into the progress callback. */
									if (property === "tween") {
										tweenDummyValue = currentValue;
									} else {
										/******************
	          Hooks: Part I
	          ******************/
										var hookRoot;

										/* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
	          for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
	          rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
	          updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
	          subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
										if (CSS.Hooks.registered[property]) {
											hookRoot = CSS.Hooks.getRoot(property);

											var rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

											if (rootPropertyValueCache) {
												tween.rootPropertyValue = rootPropertyValueCache;
											}
										}

										/*****************
	          DOM Update
	          *****************/

										/* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
										/* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
										var adjustedSetData = CSS.setPropertyValue(element, /* SET */
										property, tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType), tween.rootPropertyValue, tween.scrollData);

										/*******************
	          Hooks: Part II
	          *******************/

										/* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
										if (CSS.Hooks.registered[property]) {
											/* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
											if (CSS.Normalizations.registered[hookRoot]) {
												Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
											} else {
												Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
											}
										}

										/***************
	          Transforms
	          ***************/

										/* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
										if (adjustedSetData[0] === "transform") {
											transformPropertyExists = true;
										}
									}
								}
							}

							/****************
	       mobileHA
	       ****************/

							/* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
	       It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
							if (opts.mobileHA) {
								/* Don't set the null transform hack if we've already done so. */
								if (Data(element).transformCache.translate3d === undefined) {
									/* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
									Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

									transformPropertyExists = true;
								}
							}

							if (transformPropertyExists) {
								CSS.flushTransformCache(element);
							}
						}

						/* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
	      Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
						if (opts.display !== undefined && opts.display !== "none") {
							Velocity.State.calls[i][2].display = false;
						}
						if (opts.visibility !== undefined && opts.visibility !== "hidden") {
							Velocity.State.calls[i][2].visibility = false;
						}

						/* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
						if (opts.progress) {
							opts.progress.call(callContainer[1], callContainer[1], percentComplete, Math.max(0, timeStart + opts.duration - timeCurrent), timeStart, tweenDummyValue);
						}

						/* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
						if (percentComplete === 1) {
							completeCall(i);
						}
					}
				}

				/* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
				if (Velocity.State.isTicking) {
					ticker(tick);
				}
			}

			/**********************
	   Call Completion
	   **********************/

			/* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
			function completeCall(callIndex, isStopped) {
				/* Ensure the call exists. */
				if (!Velocity.State.calls[callIndex]) {
					return false;
				}

				/* Pull the metadata from the call. */
				var call = Velocity.State.calls[callIndex][0],
				    elements = Velocity.State.calls[callIndex][1],
				    opts = Velocity.State.calls[callIndex][2],
				    resolver = Velocity.State.calls[callIndex][4];

				var remainingCallsExist = false;

				/*************************
	    Element Finalization
	    *************************/

				for (var i = 0, callLength = call.length; i < callLength; i++) {
					var element = call[i].element;

					/* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
					/* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
					/* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
					if (!isStopped && !opts.loop) {
						if (opts.display === "none") {
							CSS.setPropertyValue(element, "display", opts.display);
						}

						if (opts.visibility === "hidden") {
							CSS.setPropertyValue(element, "visibility", opts.visibility);
						}
					}

					/* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
	     a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
	     an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
	     we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
	     is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
					var data = Data(element);

					if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
						/* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
						if (data) {
							data.isAnimating = false;
							/* Clear the element's rootPropertyValueCache, which will become stale. */
							data.rootPropertyValueCache = {};

							var transformHAPropertyExists = false;
							/* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
							$.each(CSS.Lists.transforms3D, function (i, transformName) {
								var defaultValue = /^scale/.test(transformName) ? 1 : 0,
								    currentValue = data.transformCache[transformName];

								if (data.transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
									transformHAPropertyExists = true;

									delete data.transformCache[transformName];
								}
							});

							/* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
							if (opts.mobileHA) {
								transformHAPropertyExists = true;
								delete data.transformCache.translate3d;
							}

							/* Flush the subproperty removals to the DOM. */
							if (transformHAPropertyExists) {
								CSS.flushTransformCache(element);
							}

							/* Remove the "velocity-animating" indicator class. */
							CSS.Values.removeClass(element, "velocity-animating");
						}
					}

					/*********************
	     Option: Complete
	     *********************/

					/* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
					/* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
					if (!isStopped && opts.complete && !opts.loop && i === callLength - 1) {
						/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
						try {
							opts.complete.call(elements, elements);
						} catch (error) {
							setTimeout(function () {
								throw error;
							}, 1);
						}
					}

					/**********************
	     Promise Resolving
	     **********************/

					/* Note: Infinite loops don't return promises. */
					if (resolver && opts.loop !== true) {
						resolver(elements);
					}

					/****************************
	     Option: Loop (Infinite)
	     ****************************/

					if (data && opts.loop === true && !isStopped) {
						/* If a rotateX/Y/Z property is being animated by 360 deg with loop:true, swap tween start/end values to enable
	      continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
						$.each(data.tweensContainer, function (propertyName, tweenContainer) {
							if (/^rotate/.test(propertyName) && (parseFloat(tweenContainer.startValue) - parseFloat(tweenContainer.endValue)) % 360 === 0) {
								var oldStartValue = tweenContainer.startValue;

								tweenContainer.startValue = tweenContainer.endValue;
								tweenContainer.endValue = oldStartValue;
							}

							if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
								tweenContainer.endValue = 0;
								tweenContainer.startValue = 100;
							}
						});

						Velocity(element, "reverse", { loop: true, delay: opts.delay });
					}

					/***************
	     Dequeueing
	     ***************/

					/* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
	     which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
	     $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
					if (opts.queue !== false) {
						$.dequeue(element, opts.queue);
					}
				}

				/************************
	    Calls Array Cleanup
	    ************************/

				/* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
	    (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
				Velocity.State.calls[callIndex] = false;

				/* Iterate through the calls array to determine if this was the final in-progress animation.
	    If so, set a flag to end ticking and clear the calls array. */
				for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
					if (Velocity.State.calls[j] !== false) {
						remainingCallsExist = true;

						break;
					}
				}

				if (remainingCallsExist === false) {
					/* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
					Velocity.State.isTicking = false;

					/* Clear the calls array so that its length is reset. */
					delete Velocity.State.calls;
					Velocity.State.calls = [];
				}
			}

			/******************
	   Frameworks
	   ******************/

			/* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
	   If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
	   also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
	   accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
	   (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
			global.Velocity = Velocity;

			if (global !== window) {
				/* Assign the element function to Velocity's core animate() method. */
				global.fn.velocity = animate;
				/* Assign the object function's defaults to Velocity's global defaults object. */
				global.fn.velocity.defaults = Velocity.defaults;
			}

			/***********************
	   Packaged Redirects
	   ***********************/

			/* slideUp, slideDown */
			$.each(["Down", "Up"], function (i, direction) {
				Velocity.Redirects["slide" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
					var opts = $.extend({}, options),
					    begin = opts.begin,
					    complete = opts.complete,
					    computedValues = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
					    inlineValues = {};

					if (opts.display === undefined) {
						/* Show the element before slideDown begins and hide the element after slideUp completes. */
						/* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
						opts.display = direction === "Down" ? Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block" : "none";
					}

					opts.begin = function () {
						/* If the user passed in a begin callback, fire it now. */
						if (begin) {
							begin.call(elements, elements);
						}

						/* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
						for (var property in computedValues) {
							inlineValues[property] = element.style[property];

							/* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
	       use forcefeeding to start from computed values and animate down to 0. */
							var propertyValue = Velocity.CSS.getPropertyValue(element, property);
							computedValues[property] = direction === "Down" ? [propertyValue, 0] : [0, propertyValue];
						}

						/* Force vertical overflow content to clip so that sliding works as expected. */
						inlineValues.overflow = element.style.overflow;
						element.style.overflow = "hidden";
					};

					opts.complete = function () {
						/* Reset element to its pre-slide inline values once its slide animation is complete. */
						for (var property in inlineValues) {
							element.style[property] = inlineValues[property];
						}

						/* If the user passed in a complete callback, fire it now. */
						if (complete) {
							complete.call(elements, elements);
						}
						if (promiseData) {
							promiseData.resolver(elements);
						}
					};

					Velocity(element, computedValues, opts);
				};
			});

			/* fadeIn, fadeOut */
			$.each(["In", "Out"], function (i, direction) {
				Velocity.Redirects["fade" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
					var opts = $.extend({}, options),
					    originalComplete = opts.complete,
					    propertiesMap = { opacity: direction === "In" ? 1 : 0 };

					/* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
	     callbacks by firing them only when the final element has been reached. */
					if (elementsIndex !== elementsSize - 1) {
						opts.complete = opts.begin = null;
					} else {
						opts.complete = function () {
							if (originalComplete) {
								originalComplete.call(elements, elements);
							}

							if (promiseData) {
								promiseData.resolver(elements);
							}
						};
					}

					/* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
					/* Note: We allow users to pass in "null" to skip display setting altogether. */
					if (opts.display === undefined) {
						opts.display = direction === "In" ? "auto" : "none";
					}

					Velocity(this, propertiesMap, opts);
				};
			});

			return Velocity;
		}(__webpack_provided_window_dot_jQuery || window.Zepto || window, window, document);
	});

	/******************
	 Known Issues
	 ******************/

	/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
	 Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
	 will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(1), __webpack_require__(173)(module)))

/***/ },

/***/ 173:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var loginPop = __webpack_require__(3);
	var hint = __webpack_require__(87);
	var checkLoginStatus = __webpack_require__(47);

	var buynow = function buynow(obj, proNum) {
		var $buyBtn = obj.find('[data-action="buybtn"]'),
		    $skuInput = obj.find('[data-node="buyInfo"]');
		var $isCrossInput = obj.find('[data-node="isCross"]');
		var proNum;
		var $self = null;
		var buy = function buy() {
			var self = $self;
			proNum = proNum || ~~obj.find('[data-node="count"]').val();
			var skuList = '[{' + '"shopId":' + $_CONFIG.shopId + ',' + '"kId":"' + ($_CONFIG.kid === '' ? '' : $_CONFIG.kid) + '",' + '"skuId":' + $_CONFIG.skuId + ',' + '"proNum":' + proNum + ',' + '"source_code":{' + '"sourceCode":"' + $_CONFIG.sourceCode + '"' + '}' + '}]';
			var otherParam = '[{' + '"isCross":"' + $_CONFIG.isCross + '"' + '}]';

			$skuInput.val(skuList);
			$isCrossInput.val(otherParam);
			self.parents('[data-node="buynow"]').submit();
		};

		obj.on('click', '[data-action="buybtn"]', function () {
			$self = $(this);
			if ($self.hasClass('btn-default')) return false;
			if ($_CONFIG.skuId === '0') {
				hint.init('请选择规格参数');
				return false;
			}
			if (!checkLoginStatus()) {
				loginPop({
					onLogin: buy
				});
				return false;
			} else {
				buy();
			}
		});
	};
	module.exports = buynow;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

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

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 *
	 * 赞/取消赞
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var noop = function noop() {};

	var setData = function setData($node, collect, count) {
	    $node.data('collect', collect);
	    $node.data('count', count);
	};

	var helper = {
	    normal: {
	        add: function add($node, data, count) {
	            $node.find('em').addClass('active');
	            $node.find('span').text(count);
	        },
	        reduce: function reduce($node, data, count) {
	            $node.find('em').removeClass('active');
	            $node.find('span').text(count);
	        }
	    },
	    goodInfoCollect: {
	        add: function add($node, data /*, count*/) {
	            $node.addClass('active');
	        },
	        reduce: function reduce($node, data /*, count*/) {
	            $node.removeClass('active');
	        }
	    }
	};

	var getCallback = function getCallback(mode) {
	    return helper[mode];
	};

	var collect = function collect(container, selector, options) {
	    var $container = $(container);
	    var onCollect = options.onCollect || noop;
	    var onUnCollect = options.onUnCollect || noop;
	    var onFailed = options.onFailed || noop;
	    var mode = options.mode || 'normal';

	    $container.on('click', selector, function () {
	        var $this = $(this);
	        var firing = $this.data('firing');
	        if (firing === 1) {
	            return;
	        }

	        $this.data('firing', 1);

	        var isCollect = $this.attr('data-isCollect');
	        var count = $this.data('count');
	        var urlAddress = ~~isCollect === 0 ? url.get('productUnCollect') : url.get('productCollect');

	        var objs = {
	            validate: true,
	            data: {
	                shopId: $_CONFIG.shopId,
	                productId: $_CONFIG.productId
	            },
	            onLogin: noRefreshFetch,
	            refresh: true
	        };

	        //无刷新登录
	        function noRefreshFetch(o) {
	            fetch.post(urlAddress, o).done(function (data /*, textStatus, jqXHR*/) {
	                var callbacks = getCallback(mode);
	                if (data && data.code === 200 && data.success) {
	                    if (~~isCollect === 1) {
	                        $this.attr('data-isCollect', 0);
	                        setData($this, 0, ++count);
	                        callbacks.add($this, data, count);
	                        onCollect.call($this, data, count);
	                    } else if (~~isCollect === 0) {
	                        $this.attr('data-isCollect', 1);
	                        setData($this, 1, --count);
	                        callbacks.reduce($this, data, count);
	                        onUnCollect.call($this, data, count);
	                    }
	                } else {
	                    onFailed.call($this);
	                }
	            }).fail(function (jqXHR /*, textStatus, errorThrown*/) {
	                onFailed.call($this);
	            }).always(function () {
	                $this.data('firing', 0);
	            });
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = collect;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	// var slider = require('../../page/goodInfo/leftSlider');
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	// var intersection = require('lodash/intersection');

	//数量加减
	__webpack_require__(178).init();
	var spinner = $('[data-trigger=spinner]').data('spinner');

	var $goodInfoBox = $('div[data-node="topGoodInfo"]'),
	    $leftBox = $goodInfoBox.find('[data-node="topleft"]'),
	    $goodParams = $goodInfoBox.find('[data-node="firstParams"]'),

	// $secondBox = $goodInfoBox.find('div[data-node="secondContent"]'),
	$repert = $goodInfoBox.find('[data-node="repert"]'),
	    $price = $goodInfoBox.find('[data-node="price"]'),
	    $cargo = $goodInfoBox.find('[data-node="iscargo"]'),

	// $coupon = $goodInfoBox.find('[data-active="coupon"]'),
	// $sale = $goodInfoBox.find('[data-node="sale"]'),
	$addShopCar = $goodInfoBox.find('[data-action="addShopCar"]'),

	// $buyBtn = $goodInfoBox.find('[data-action="buybtn"]'),
	$buyBtn = $goodInfoBox.find('[data-action="buybtn"]'),
	    $smallList = $goodInfoBox.find('[data-node="leftSmallBox"] li'),
	    $originPrice = $goodInfoBox.find('[data-node="originPrice"]');
	// var $salePrice = $goodInfoBox.find('[data-node="price"]');
	var $stock = $goodInfoBox.find('[data-node="stockBox"]');
	var $leftList = $leftBox.find('[data-node="leftBigBox"] li');
	var $goodsThum = $('#goodsThum');
	// var $addressNode = $goodInfoBox.find('[data-node="addressTop"]');
	// var defaultSkuId = ~~$GLOBAL_CONFIG.default_skuid;
	var skuData = $_CONFIG.sku_list;

	var checkParam = function checkParam(callback, emptyCallback) {
	    callback = callback || function () {};
	    emptyCallback = emptyCallback || function () {};
	    var changes = $goodParams.length;
	    var keys = []; //skulist key names
	    var selectors = []; //skulist changed names 
	    var selectorsJson = {};
	    var checked = $goodParams.find('.choose-cell-true').length;
	    var changedKey = '';
	    var disableJson = {};
	    // var isLast = false;

	    //循环key名 插入数组
	    for (var key in skuData) {
	        keys.push(key);
	    }

	    $goodParams.on('click', 'a', function () {
	        selectors = [];
	        selectorsJson = {};
	        var _this = $(this);
	        var text = _this.text();
	        if (!_this.hasClass('disabled')) {
	            var index = $goodParams.index($(this).parents('[data-node="firstParams"]').eq(0));
	            if (_this.hasClass('choose-cell-true')) {
	                checked--;
	                if (checked === 0) {
	                    emptyCallback.call(null);
	                }
	                if ($leftList.last().css('display') !== 'none' && $_CONFIG.colorShow[index + text] !== undefined) {
	                    $leftList.last().find('img').attr({
	                        'src': $leftList.last().attr('data-src'),
	                        'data-origin': $leftList.last().attr('data-origin')
	                    });
	                }
	                for (i in disableJson[index]) {
	                    var $selector = $goodParams.eq(parseInt(i)).find('a');
	                    //console.log(disableJson[index][i])
	                    for (var j = 0, len = disableJson[index][i].length; j < len; j++) {
	                        var $disabled = $selector.eq(disableJson[index][i][j]);
	                        //console.log(j)

	                        var _num = parseInt($disabled.attr('data-addNum'), 10);
	                        if (_num === 1) {
	                            $disabled.removeClass('disabled').attr('data-addNum', 0);
	                        } else {
	                            $disabled.attr('data-addNum', _num - 1);
	                        }
	                    }
	                }
	                disableJson[index] = {};
	                _this.removeClass('choose-cell-true');
	            } else {

	                if (_this.siblings().hasClass('choose-cell-true')) {
	                    for (i in disableJson[index]) {
	                        var $selector = $goodParams.eq(parseInt(i)).find('a');
	                        for (var j = 0, len = disableJson[index][i].length; j < len; j++) {
	                            //console.log(disableJson[index][i][j])
	                            var $disabled = $selector.eq(disableJson[index][i][j]);
	                            //console.log(1)
	                            var _num = parseInt($disabled.attr('data-addNum'), 10);
	                            if (_num === 1) {
	                                $disabled.removeClass('disabled').attr('data-addNum', 0);
	                            } else {
	                                $disabled.attr('data-addNum', _num - 1);
	                            }
	                        }
	                    }
	                    _this.siblings().removeClass('choose-cell-true');
	                    disableJson[index] = {};
	                } else {
	                    checked++;
	                }
	                if ($_CONFIG.colorShow[index + text] !== undefined) {
	                    $leftList.last().find('img').attr({
	                        'src': $_CONFIG.colorShow[index + text].image,
	                        'data-origin': $_CONFIG.colorShow[index + text].imageBig
	                    });
	                }
	                _this.addClass('choose-cell-true');
	                for (var i = 0, len = keys.length; i < len; i++) {
	                    //console.log(index , text)
	                    if (keys[i].indexOf(index + text) !== -1) {
	                        selectors.push(keys[i].split('!#'));
	                    }
	                }
	                //console.log(selectors)
	                for (var k = 0, slen = selectors.length; k < slen; k++) {
	                    for (var j = 0, llen = selectors[k].length; j < llen; j++) {
	                        var keyName = selectors[k][j].substr(0, 1);
	                        var keyValue = selectors[k][j].substr(1, selectors[k][j].length - 1);
	                        selectorsJson[keyName] = selectorsJson[keyName] === undefined ? '' : selectorsJson[keyName];
	                        selectorsJson[keyName] += '!#' + keyValue;
	                    }
	                }
	                for (var name in selectorsJson) {
	                    var i = parseInt(name, 10);
	                    if (i !== index) {
	                        disableJson[index] = {};
	                        var $selector = $goodParams.eq(i).find('a');
	                        for (var k = 0, alen = $selector.length; k < alen; k++) {
	                            //console.log(disableJson[index][name])
	                            disableJson[index][name] = disableJson[index][name] === undefined ? [] : disableJson[index][name];
	                            if (selectorsJson[name].indexOf('!#' + $selector.eq(k).text()) === -1) {
	                                var $disabled = $selector.eq(k);
	                                var disabledNum = $disabled.attr('data-addNum') === undefined ? 0 : parseInt($disabled.attr('data-addNum'), 10);
	                                disableJson[index][name].push(k);
	                                $disabled.addClass('disabled').attr('data-addNum', disabledNum + 1);
	                                //console.log(disableJson[index][name])
	                            }
	                        }
	                    }
	                }

	                //console.log(disableJson)
	            }
	            if (checked === changes) {
	                changedKey = '';
	                for (var i = 0, len = $goodParams.length; i < len; i++) {

	                    changedKey += '!#' + i + $goodParams.eq(i).find('.choose-cell-true').text();
	                }
	                //选择完成后生成的key name
	                changedKey = changedKey.substr(2, changedKey.length);
	                callback.call(null, changedKey);
	                //console.log(changedKey)
	            } else {

	                $_CONFIG.skuId = '0';
	                spinner.spinning.setMax($_CONFIG.oldStock > 20 ? 20 : $_CONFIG.oldStock);

	                if ($_CONFIG.prodType !== '1') {
	                    if ($_CONFIG.oldStock > 0) {
	                        $cargo.text('有货');
	                        $stock.text('有货');
	                        $buyBtn.removeClass('btn-default');
	                        $addShopCar.removeClass('btn-default');
	                        $('[data-spin="up"]').removeClass('disabled');
	                    } else {
	                        $cargo.text('无货');
	                        $stock.text('无货');
	                        $buyBtn.addClass('btn-default');
	                        $addShopCar.addClass('btn-default');
	                        $('[data-spin="up"]').addClass('disabled');
	                    }
	                } else {
	                    if ($_CONFIG.oldStock > 0) {
	                        $cargo.text('有货');
	                        $buyBtn.removeClass('btn-default');
	                        $addShopCar.removeClass('btn-default');
	                        $('[data-spin="up"]').removeClass('disabled');
	                    } else {
	                        $cargo.text('无货');
	                        $buyBtn.addClass('btn-default');
	                        $addShopCar.addClass('btn-default');
	                        $('[data-spin="up"]').addClass('disabled');
	                    }
	                    $repert.text($_CONFIG.oldStock);
	                }

	                $price.text($price.attr('data-saleprice'));
	                $originPrice.text($originPrice.attr('data-originprice'));

	                //$('[data-spin="up"]').removeClass('disabled')
	            }
	        }
	    });
	};
	var setParams = function setParams(info) {

	    $_CONFIG.skuId = parseInt(info.id, 10);
	    if ($_CONFIG.prodType !== '1') {

	        fetch.get(url.get('getCurrSkuInfo'), {
	            data: {
	                itemId: parseInt($_CONFIG.productId, 10),
	                skuId: $_CONFIG.skuId,
	                addressNodeId: parseInt($('[data-node="addressTop"]').last().attr('data-aid'), 10)
	            }
	        }).done(function (result) {

	            if (result && result.success && result.code === 200) {

	                var data = result.data;
	                var isStock = '';
	                if (data.skus.hasStock) {
	                    isStock = '有货';
	                    $buyBtn.removeClass('btn-default');
	                    $addShopCar.removeClass('btn-default');
	                    $('[data-spin="up"]').removeClass('disabled');
	                } else {
	                    isStock = '无货';
	                    $buyBtn.addClass('btn-default');
	                    $addShopCar.addClass('btn-default');
	                    $('[data-spin="up"]').addClass('disabled');
	                }

	                $stock.text(isStock);
	                $cargo.text(isStock);
	                $price.text(data.skus.salePrice);
	                $originPrice.text(data.skus.price);
	                spinner.spinning.setMax(data.skus.stock > 20 ? 20 : data.skus.stock);
	            }
	        });
	    } else {
	        spinner.spinning.setMax(info.stock > 20 ? 20 : info.stock);

	        if (parseInt(info.stock, 10) > 0) {
	            $cargo.text('有货');
	            $buyBtn.removeClass('btn-default');
	            $addShopCar.removeClass('btn-default');
	            $('[data-spin="up"]').removeClass('disabled');
	        } else {
	            $cargo.text('无货');
	            $buyBtn.addClass('btn-default');
	            $addShopCar.addClass('btn-default');
	            $('[data-spin="up"]').addClass('disabled');
	        }

	        $repert.text(info.stock);
	        $price.text(info.salePrice);
	        $originPrice.text(info.price);
	    }
	    $smallList.removeClass('active');
	    $leftList.hide().last().show().find('img').attr({
	        'src': info.image,
	        'data-origin': info.imageBig
	    });

	    $goodsThum.find('img').attr('src', info.image);
	};

	var init = function init() {
	    checkParam(function (changedKey) {

	        var info = skuData[changedKey];
	        setParams(info);
	    }, function () {

	        $goodParams.find('a').removeClass('disabled');
	        $repert.text($stock.attr('data-sumstock'));
	        //$_CONFIG.prodType !== '1' && $stock.text( $_CONFIG.oldStock > 0 ? '有货' : '无货' );
	        $cargo.text($_CONFIG.oldStock > 0 ? '有货' : '无货');
	        var lastImg = $leftList.last().attr('data-src');
	        $leftList.hide().last().show().find('img').attr(lastImg);
	        $price.text($price.attr('data-saleprice'));
	        $originPrice.text($originPrice.attr('data-originPrice'));
	        $buyBtn.addClass('btn-default');
	        $_CONFIG.oldStock > 0 && $addShopCar.removeClass('btn-default');
	    });
	};
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	__webpack_require__(74);

	var $stockBox = $('[data-node="stockBox"]');
	var $repert = $('[data-node="repert"]');
	var $min = $('[data-spin="down"]');
	var $max = $('[data-spin="up"]');
	var oSpinner = null;
	var init = function init() {
	    var max = 20;
	    if ($_CONFIG.prodType !== '1') {
	        max = parseInt($stockBox.attr('data-sumstock'), 10) > 20 ? 20 : parseInt($stockBox.attr('data-sumstock'), 10);
	    } else {
	        max = parseInt($repert.text(), 10);
	        max = max > 20 ? 20 : max;
	    }
	    $('[data-trigger=spinner]').spinner({
	        delay: 200,
	        min: 1,
	        max: max,
	        rangemin: function rangemin() {
	            $min.addClass('disabled');
	        },
	        rangemax: function rangemax() {
	            $max.addClass('disabled');
	        },
	        changed: function changed(e, newVal /*, oldVal*/) {
	            if (newVal > 1) $min.removeClass('disabled');
	            if (newVal === 1) $min.addClass('disabled');
	            newVal === oSpinner.spinning.max || newVal > oSpinner.spinning.max ? $max.addClass('disabled') : $max.removeClass('disabled');
	            if (oSpinner.spinning.max === 0) {
	                oSpinner.spinning.setMax(1);
	            }
	            if (newVal === 0) {
	                $('[data-node="count"]').val(1);
	            }
	        }
	    });
	    $('[data-node="count"]').val(1);
	    oSpinner = $('[data-trigger=spinner]').data('spinner');
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2),
	    url = __webpack_require__(28),
	    dateFormat = __webpack_require__(125);
	var discussPage = __webpack_require__(180);
	var discussList = __webpack_require__(181);
	var discussPageHtml = '';

	var $discussBox = $('[data-node="discussBox"]');
	var $discussTitle = $('[data-node="discussTitle"]');
	var $discussPage = $('[data-node="discussPage"]');
	var $discussList = $('[data-node="discussList"]');
	var pageNum = 1;

	var getDiscuss = function getDiscuss() {
	    var proId = $GLOBAL_CONFIG.productId;
	    fetch.get(url.get('getMoreDiscuss'), {
	        data: {
	            itemId: proId, //$GLOBAL_CONFIG.productId,
	            page: pageNum
	        }
	    }).done(function (result) {
	        if (result.code === 200) {
	            var listData = result.data.itemComments;
	            //列表
	            if (listData.length > 0) {
	                //分页数据
	                discussPageHtml = discussPage({
	                    data: result.data.linkUrl
	                });
	                $discussPage.html($(discussPageHtml).val());
	                for (var i = 0, len = listData.length; i < len; i++) {
	                    listData[i].solid = [];
	                    listData[i].hollow = [];
	                    listData[i].solid.length = listData[i].score;
	                    listData[i].hollow.length = 5 - listData[i].score;
	                }
	            } else {
	                pageNum === 1 && $discussPage.remove();
	            }

	            $discussList.html(discussList({
	                data: listData
	            }));
	        }
	    });
	};
	var init = function init() {

	    getDiscuss();
	    $discussPage.on('click', 'a', function () {
	        var currentPage = $(this).attr('data-current');
	        if (currentPage !== undefined) {
	            currentPage = parseInt(currentPage, 10);
	            pageNum = currentPage;
	            getDiscuss();
	        }
	    });
	};
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/discussPage',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$out='';$out+=' <input type="hidden" data-node="test" value="';
	$out+=$escape(data);
	$out+='">';
	return new String($out);
	});

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/discussList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,data=$data.data,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
	if(data.length > 0 ){
	$out+=' <ul class="clearfix" > ';
	$each(data,function($value,$index){
	$out+=' <li data-node="comments"> <div class="fr"> <a href="javascript:;"> <img src="';
	$out+=$escape($value.creater.facePicUrl);
	$out+='" onerror="imgError(this)">';
	$out+=$escape($value.creater.nickname);
	$out+=' </a> <div class="star-box"> ';
	$each($value.solid,function($value,$index){
	$out+=' <em class="iconn-43 active"></em> ';
	});
	$out+=' ';
	$each($value.hollow,function($value,$index){
	$out+=' <em class="iconn-43"></em> ';
	});
	$out+=' </div> <p>';
	$out+=$escape($value.createTime);
	$out+='</p> </div> <div class="list-con">';
	$out+=$escape($value.content === '' ? '收到宝贝了，还不错' : $value.content);
	$out+='</div> ';
	if($value.images.length > 0){
	$out+=' <div class="list-img clearfix" data-node="imgPreviewList"> ';
	$each($value.images,function($value,$index){
	$out+=' <a data-imgorigin="';
	$out+=$escape($value.origin);
	$out+='" href="javascript:;"> <img src="';
	$out+=$escape($value.small);
	$out+='"> </a> ';
	});
	$out+=' </div> ';
	}
	$out+='  ';
	if($value.replyContent !== undefined){
	$out+=' <div class="list-shop clearifx"> <span>商家回复</span>';
	$out+=$escape($value.replyContent);
	$out+=' </div> ';
	}
	$out+=' </li> ';
	});
	$out+=' </ul> ';
	}else{
	$out+=' <div class="comments-none">此商品暂无评论</div> ';
	}
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * images previewer
	 * @author Zhengchun Fu
	 */
	var activeClass = 'active';
	var commentsNode = '[data-node=comments]';
	var imgPreviewListNode = '[data-node=imgPreviewList]';
	var imgPreviewListChildA = imgPreviewListNode + '> a';
	var bigImgPreviewStageNode = '[data-node=bigImgPreviewStage]';
	var closeBigImgBtnNode = '[data-action=closeImgPreview]';
	var stageNode = '<div data-node="bigImgPreviewStage" class="list-img-big"><span><em data-action="closeImgPreview" class="icon-narrow hide"></em><img></span></div>';

	var $discussBox = $('[data-node=discussBox]');
	var $curSmallImg = null;
	var stageWidth = 740;

	// 获取图片的原始大小,获取后调用显示大图的方法。
	function getImgSize(url, cb) {
	    var img = new Image();
	    img.onload = function () {
	        var width = img.width;
	        var height = img.height;
	        if (width > height && width >= stageWidth) {
	            height = height * stageWidth / width;
	        }
	        img.onload = null;
	        img = null;
	        cb(width, height);
	    };
	    img.src = url;
	}

	// 显示隐藏关闭大图按钮
	function toggleCloseBtn() {
	    $discussBox.on('mouseenter', bigImgPreviewStageNode, function () {
	        $(this).find(closeBigImgBtnNode).removeClass('hide');
	    });
	    $discussBox.on('mouseleave', bigImgPreviewStageNode, function () {
	        $(this).find(closeBigImgBtnNode).addClass('hide');
	    });
	}

	// 初始化大图展示框
	function initStage(obj) {
	    $(stageNode).insertAfter(obj);
	}

	// 显示大图
	function showStage(list, url, imgWidth, imgHeight) {
	    var $curComments = list.parents(commentsNode);
	    var $curStage = $curComments.find(bigImgPreviewStageNode);
	    var $siblingsComments = $curComments.siblings();
	    var $siblingsStage = null;
	    var img = null;

	    // 如果没有stage就初始化一个
	    if (typeof $curStage[0] === 'undefined') {
	        initStage(list);
	        $curStage = list.siblings(bigImgPreviewStageNode);
	    }

	    $siblingsComments.find(imgPreviewListChildA).removeClass(activeClass);
	    $siblingsStage = $siblingsComments.find(bigImgPreviewStageNode);
	    stageAnimate($siblingsStage, 'hide');

	    imgWidth = imgWidth > stageWidth ? stageWidth : imgWidth;
	    img = $curStage.find('img');
	    img.attr({
	        'src': url,
	        'width': imgWidth
	    });

	    $curStage.css({
	        height: 'auto'
	    });

	    if ($curStage.is(':hidden')) {
	        stageAnimate($curStage, 'show', imgHeight);
	    }
	}

	// 大图显示隐藏的缩放动画
	function stageAnimate(obj, status, imgHeight) {
	    var delay = 300;
	    if (status === 'show') {
	        obj.css({
	            width: 0,
	            height: 0
	        }).show().stop().animate({
	            width: 740,
	            height: imgHeight
	        }, delay);
	    } else {
	        obj.stop().animate({
	            width: 0,
	            height: 0
	        }, delay, function () {
	            obj.hide();
	        });
	    }
	}

	// 关闭大图显示
	function closeStage() {
	    $discussBox.on('click', closeBigImgBtnNode, function (e) {
	        var $bigImgStage = $(this).parents(bigImgPreviewStageNode);
	        e.preventDefault();
	        $curSmallImg.removeClass(activeClass);
	        stageAnimate($bigImgStage, 'hide');
	    });
	}

	function init() {
	    $discussBox.on('click', imgPreviewListChildA, function () {
	        var bigImgUrl = $(this).data('imgorigin');
	        var $smallImgList = $(this).parent();

	        $curSmallImg = $(this);
	        $curSmallImg.addClass(activeClass).siblings().removeClass(activeClass);

	        getImgSize(bigImgUrl, function (w, h) {
	            showStage($smallImgList, bigImgUrl, w, h);
	        });

	        toggleCloseBtn();
	        closeStage();
	    });
	}

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	// var redList = require('../../widget/goodInfo/redList');
	var Dialog = __webpack_require__(22);
	var ticketDialog = __webpack_require__(184);
	var tickets = __webpack_require__(185);
	var myTickets = __webpack_require__(186);
	var dateFormat = __webpack_require__(125);
	// var couponSort = require('module/couponSort');
	var checkLoginStatus = __webpack_require__(47);

	var $goodInfoBox = $('div[data-node="topGoodInfo"]');
	var $coupon = $goodInfoBox.find('[data-active="coupon"]');

	var $ticketLoading; //优惠券loading
	var $ticketFail; //获取失败fail
	var $ticketList; //优惠券列表
	var $myTicketList;
	var ticketList = [];
	var myTicket = [];
	var couponAlert;
	var $myTicketBox;

	var getTicketByAjax = function getTicketByAjax() {

		fetch.post(url.get('ticketList'), {
			validate: true,
			data: {
				shopId: $_CONFIG.shopId,
				isLogin: $_CONFIG.islogin
			}
		}).done(function (result) {
			if (result && result.success && result.code === 200) {
				var couponServerDate = +new Date();
				$ticketFail.hide();
				ticketList = result.data.shopCoupons.batches;
				myTicket = result.data.myCoupons.userCoupons !== undefined ? result.data.myCoupons.userCoupons : [];

				/*if( ticketList.length > 0 && ticketList[0].quantities.length === 0 ){
	   	$ticketLoading.hide();
	   	$ticketFail.show().text('登录失效，请重新登录').addClass('login');
	   	$('[data-node="ticketBox"]').hide();
	   	return;
	   }*/
				//myTicket = couponSort(myTicket);
				//ticketList = couponSort(ticketList);
				for (var i = 0, len = ticketList.length; i < len; i++) {

					ticketList[i].money = parseInt(ticketList[i].money, 10) / 100;
					ticketList[i].usageRule.minAmount = parseInt(ticketList[i].usageRule.minAmount, 10) / 100;
					ticketList[i].showDay = false;
					if (ticketList[i].timeType === 1) {
						ticketList[i].timeLong = Math.ceil(ticketList[i].timeLimit / 86400);
						ticketList[i].showDay = true;
						//ticketList[i].useStartTime = dateFormat.format(new Date(couponServerDate), 'YYYY.MM.DD');
						//ticketList[i].useEndTime = dateFormat.format(new Date(couponServerDate + ticketList[i].timeLimit*1000 ), 'YYYY.MM.DD');
					} else {
						ticketList[i].useStartTime = dateFormat.format(new Date(ticketList[i].useStartTime), 'YYYY.MM.DD');
						ticketList[i].useEndTime = dateFormat.format(new Date(ticketList[i].useEndTime), 'YYYY.MM.DD');
					}
					ticketList[i].quantities[0].show = ticketList[i].quantities[0].remainingReceiveQuantity > 1 ? 'inline' : 'none';
				}
				for (var i = 0, len = myTicket.length; i < len; i++) {
					myTicket[i].validStartTime = dateFormat.format(new Date(myTicket[i].validStartTime), 'YYYY.MM.DD');
					myTicket[i].validEndTime = dateFormat.format(new Date(myTicket[i].validEndTime), 'YYYY.MM.DD');
					myTicket[i].batch.money = parseInt(myTicket[i].batch.money, 10) / 100;
					myTicket[i].batch.usageRule.minAmount = parseInt(myTicket[i].batch.usageRule.minAmount, 10) / 100;
					myTicket[i].show = myTicket[i].couponsQuantity > 1 ? 'inline' : 'none';
				}
				$ticketList.html(tickets({
					shopName: $_CONFIG.shopName,
					ticketList: ticketList,
					myTickets: myTicket,
					tDisplay: ticketList.length > 0 ? 'block' : 'none',
					show: myTicket.length > 0,
					display: myTicket.length > 0 ? 'block' : 'none'
				}));

				$myTicketList = $('[data-node="myTicketList"]');
				$myTicketBox = $('[data-node="mTicketBox"]');
			} else if (result.code === 881011) {
				$ticketLoading.hide();
				$ticketFail.show().text('登录失效，请重新登录').addClass('login');
				$('[data-node="ticketBox"]').hide();
			} else {
				$ticketFail.show().text('数据加载失败，点击重新加载');
			}
		}).fail(function () {
			if (checkLoginStatus()) {
				$ticketFail.show().text('数据加载失败，点击重新加载');
			}
		}).always(function () {
			if (checkLoginStatus()) {
				$ticketLoading.hide();
			}
			couponAlert.reset();
		});
	};

	var events = function events() {
		$(document).on('click', '[data-action="coupon-mask"]', function () {
			$(this).hide();
		}).on('click', '[data-node="ticketFail"]', function () {
			if (!$(this).hasClass('login')) {
				$ticketLoading.show();
				getTicketByAjax();
			}
		});

		getTicket();
	};

	var hintHide = function hintHide(obj) {

		setTimeout(function () {
			obj.find('[data-node="coupon-mask"]').hide();
		}, 2000);
	};

	//设置已领取优惠券
	var setMyTicket = function setMyTicket(data) {

		myTicket.push(data);
		$myTicketList.html(myTickets({
			shopName: $_CONFIG.shopName,
			myTickets: myTicket
		}));
	};

	var getTicket = function getTicket() {
		var ticketId;
		var _this;
		var $list;
		var _type;
		var mStartTime;
		var mEndTime;
		var tStartTime;
		var tEndTime;
		var $mNum;
		var mNum;
		var $tNum;
		var tNum;
		var $btn;
		var timer;
		var serverDate = +new Date();
		var index;
		var allowGet = true;
		$(document).on('click', '[data-action="getTicket"]', function () {
			if (allowGet) {
				allowGet = false;
				ticketId = $(this).attr('data-id');
				_this = $(this);
				$list = _this.parents('li').eq(0);
				tStartTime = $list.find('[data-node="tStart"]').text() === '' ? dateFormat.format(new Date(serverDate), 'YYYY.MM.DD') : $list.find('[data-node="tStart"]').text();
				tEndTime = $list.find('[data-node="tEnd"]').text() === '' ? dateFormat.format(new Date(serverDate + parseInt(_this.attr('data-second'), 10) * 1000), 'YYYY.MM.DD') : $list.find('[data-node="tEnd"]').text();
				fetch.post(url.get('getTicket'), {
					data: {
						batchSn: ticketId,
						userId: $_CONFIG.userId
					}
				}).done(function (data) {
					if (data && data.code === 200) {
						var $getedTicket = $('[data-node="' + ticketId + '"]');
						var isOk = true;
						$myTicketBox.show();
						if ($getedTicket.length > 0) {
							for (var i = 0, len = $getedTicket.length; i < len; i++) {
								_type = _this.attr('data-type');
								if (_type === '1') {
									mStartTime = dateFormat.format(new Date(serverDate), 'YYYY.MM.DD');
									mEndTime = dateFormat.format(new Date(serverDate + parseInt(_this.attr('data-second'), 10)) * 1000, 'YYYY.MM.DD');
								} else {
									mStartTime = $getedTicket.eq(i).find('[data-node="mStart"]').text();
									mEndTime = $getedTicket.eq(i).find('[data-node="mEnd"]').text();
								}

								if (mStartTime === tStartTime) {
									myTicket[i].couponsQuantity++;
									$mNum = $getedTicket.eq(i).find('[data-node="mTicketNum"]');

									mNum = parseInt($mNum.text(), 10);
									if (mNum === 1) {
										myTicket[i].show = 'inline';
										$mNum.parent().show();
									}
									$mNum.text(mNum + 1);
									isOk = false;
									break;
								}
								//循环到最后一次也没有匹配到
								if (i === len - 1 && isOk) {
									setMyTicket({
										batch: {
											money: $list.find('[data-node="ticketMoney"]').text(),
											usageRule: {
												minAmount: $list.find('[data-node="ticketMin"]').text()
											}
										},
										batchSn: ticketId,
										validEndTime: tEndTime,
										validStartTime: tStartTime,
										couponsQuantity: 1,
										show: 'none'
									});
								}
							}
						} else {
							setMyTicket({
								batch: {
									money: $list.find('[data-node="ticketMoney"]').text(),
									usageRule: {
										minAmount: $list.find('[data-node="ticketMin"]').text()
									}
								},
								batchSn: ticketId,
								validEndTime: tEndTime,
								validStartTime: tStartTime,
								couponsQuantity: 1,
								show: 'none'
							});
						}
						$tNum = $list.find('[data-node="tTicketNum"]');
						$btn = $list.find('[data-action="getTicket"]');
						tNum = parseInt($tNum.text(), 10);
						tNum === 2 && $tNum.parent().hide();
						$tNum.text(tNum - 1);

						if (data.data.userRemainingAvailableQuantity === 0) {
							$btn.html('<em class="iconn-20"></em>已领');
							$list.find('[data-node="coupon-mask"]').show().text('领取成功，领取次数已达上限');
							if ($list.siblings().length === 0) {
								timer = setTimeout(function () {
									$list.parents('[data-node="tTicketBox"]').eq(0).addClass('fadeOutUp').next().addClass('fadeUp');
									clearTimeout(timer);
									setTimeout(function () {
										$list.parents('[data-node="tTicketBox"]').eq(0).next().removeClass('fadeUp').prev().remove();
									}, 1000);
								}, 500);
							} else {
								timer = setTimeout(function () {
									$list.remove();
									clearTimeout(timer);
								}, 500);
							}
						} else {
							$list.find('[data-node="coupon-mask"]').show().text('领取成功，还可领取' + data.data.userRemainingAvailableQuantity + '张');
						}
					} else {
						if (data.code === 881011) {

							$list.find('[data-node="coupon-mask"]').show().text('登录失效，请重新登录');
						} else {

							$list.find('[data-node="coupon-mask"]').show().text('领取失败');
						}
					}
					couponAlert.reset();
					hintHide($list);
					allowGet = true;
				}).fail(function () {
					$list.find('[data-node="coupon-mask"]').show().text('领取失败');
					hintHide($list);
					allowGet = true;
				});
			}
		});
	};

	var init = function init() {

		$coupon.on('click', function () {
			couponPackage();
		});
		events();
	};

	function couponPackage() {
		if (checkLoginStatus()) {
			couponAlert = Dialog({
				title: '领取优惠券',
				modal: true,
				fixed: true,
				content: ticketDialog({
					imgUrl: $_CONFIG.imgpath
				}),
				className: 'pop-box'
			});
			couponAlert.show();
			$ticketLoading = $('[data-node="ticketLoading"]');
			$ticketFail = $('[data-node="ticketFail"]');
			$ticketList = $('[data-node="ticketBox"]');
		}
		getTicketByAjax();
	}

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/ticketDialog',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,imgUrl=$data.imgUrl,$out='';$out+=' <div class="tab-list"> <div data-node="ticketLoading" class="tab-loading" > <img src="';
	$out+=$escape(imgUrl);
	$out+='/images/public/loading.gif" alt=""> </div> <div class="tab-message" data-node="ticketFail" style="display:none;">数据加载失败，点击重新加载</div> <div data-node="ticketBox"></div> </div>';
	return new String($out);
	});

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/ticketList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,tDisplay=$data.tDisplay,$each=$utils.$each,ticketList=$data.ticketList,$value=$data.$value,$index=$data.$index,shopName=$data.shopName,display=$data.display,show=$data.show,myTickets=$data.myTickets,$out='';$out+=' <div data-node="tTicketBox" style="display: ';
	$out+=$escape(tDisplay);
	$out+='"> <h3>可领取优惠券</h3> <ul class="clearfix"> ';
	$each(ticketList,function($value,$index){
	$out+=' <li> <h4>';
	$out+=$escape(shopName);
	$out+='</h4> <p> <span data-node="ticketMoney">';
	$out+=$escape(ticketList[$index].money);
	$out+='</span>元 <em style="display:';
	$out+=$escape(ticketList[$index].quantities[0].show);
	$out+='"><span data-node="tTicketNum">';
	$out+=$escape(ticketList[$index].quantities[0].remainingReceiveQuantity);
	$out+='</span>张</em> </p> <p>满<strong data-node="ticketMin">';
	$out+=$escape(ticketList[$index].usageRule.minAmount);
	$out+='</strong>元可用</p> <div class="quan-time"> 有效期： ';
	if(!ticketList[$index].showDay){
	$out+=' <span data-node="tStart">';
	$out+=$escape(ticketList[$index].useStartTime);
	$out+='</span>-<span data-node="tEnd">';
	$out+=$escape(ticketList[$index].useEndTime);
	$out+='</span> ';
	}else{
	$out+=' 领到券后';
	$out+=$escape(ticketList[$index].timeLong);
	$out+='天内可用 ';
	}
	$out+=' </div> <a href="javascript:;" data-id="';
	$out+=$escape(ticketList[$index].batchSn);
	$out+='" data-action="getTicket" data-type="';
	$out+=$escape(ticketList[$index].timeType);
	$out+='" data-second="';
	$out+=$escape(ticketList[$index].timeLimit);
	$out+='">点击领取</a> <div class="small-mask" data-node="coupon-mask">您还可以领取2张</div> </li> ';
	});
	$out+=' </ul> </div> <div data-node="mTicketBox" style="display: ';
	$out+=$escape(display);
	$out+='"> <h3 data-node="myTicketTitle">已领取</h3> <ul class="clearfix" data-node="myTicketList"> ';
	if(show){
	$out+=' ';
	$each(myTickets,function($value,$index){
	$out+=' <li data-node="';
	$out+=$escape(myTickets[$index].batchSn);
	$out+='"> <h4>';
	$out+=$escape(shopName);
	$out+='</h4> <p><span>';
	$out+=$escape(myTickets[$index].batch.money);
	$out+='</span>元 <em style="display:';
	$out+=$escape(myTickets[$index].show);
	$out+='"><span data-node="mTicketNum">';
	$out+=$escape(myTickets[$index].couponsQuantity);
	$out+='</span>张</em> </p> <p>消费<strong>';
	$out+=$escape(myTickets[$index].batch.usageRule.minAmount);
	$out+='</strong>元可用</p> <div class="quan-time">有效期：<span data-node="mStart">';
	$out+=$escape(myTickets[$index].validStartTime);
	$out+='</span>—<span data-node="mEnd">';
	$out+=$escape(myTickets[$index].validEndTime);
	$out+='</span></div><em class="icon-quan"></em> </li> ';
	});
	$out+=' ';
	}
	$out+=' </ul> </div> ';
	return new String($out);
	});

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/myTicketList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,myTickets=$data.myTickets,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,shopName=$data.shopName,$out='';$out+=' ';
	$each(myTickets,function($value,$index){
	$out+=' <li data-node="';
	$out+=$escape(myTickets[$index].batchSn);
	$out+='"> <h4>';
	$out+=$escape(shopName);
	$out+='</h4> <p><span>';
	$out+=$escape(myTickets[$index].batch.money);
	$out+='</span>元 <em style="display:';
	$out+=$escape(myTickets[$index].show);
	$out+='"><span data-node="mTicketNum">';
	$out+=$escape(myTickets[$index].couponsQuantity);
	$out+='</span>张</em> </p> <p>消费<strong>';
	$out+=$escape(myTickets[$index].batch.usageRule.minAmount);
	$out+='</strong>元可用</p> <div class="quan-time">有效期：<span data-node="mStart">';
	$out+=$escape(myTickets[$index].validStartTime);
	$out+='</span>—<span data-node="mEnd">';
	$out+=$escape(myTickets[$index].validEndTime);
	$out+='</span></div><em class="icon-quan"></em> </li> ';
	});
	return new String($out);
	});

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

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var productChoose = __webpack_require__(189);
	var shopChoose = __webpack_require__(190);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var $productChooseBox = $('[data-node="productChoose"]');
	var $shopChooseBox = $('[data-node="shopChoose"]');

	var getChoose = function getChoose() {

		fetch.get(url.get('productChoose'), {
			data: {
				itemId: $_CONFIG.productId,
				shopId: $_CONFIG.shopId
			}
		}).done(function (result) {

			if (result && result.success) {

				if (result.data.shopRecom.items.length > 0) {
					$shopChooseBox.html(shopChoose({
						domian: $_CONFIG.mall_domain,
						shopId: $_CONFIG.shopId,
						data: result.data.shopRecom.items,
						csid: $_CONFIG.sourceCode
					}));
				}

				if (result.data.prodRecom.items.length > 0) {
					$productChooseBox.html(productChoose({
						domian: $_CONFIG.mall_domain,
						data: result.data.prodRecom.items,
						csid: $_CONFIG.sourceCode
					}));
				}
			} else {
				$productChooseBox.prev().remove();
				$productChooseBox.remove();
				$shopChooseBox.prev().remove();
				$shopChooseBox.remove();
			}
		});
	};

	var init = function init() {

		getChoose();
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/productChoose',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,domian=$data.domian,csid=$data.csid,$out='';$out+='<ul class="clearfix" data-node="lastBanner"> ';
	$each(data,function($value,$index){
	$out+=' <li > <a target="_blank" href="';
	$out+=$escape(domian);
	$out+='item/';
	$out+=$escape($value.shopId);
	$out+='-';
	$out+=$escape($value.id);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" bp-data=\'{"event_id": "G000P019", "shop_id": "';
	$out+=$escape($value.shopId);
	$out+='", "product_id": "';
	$out+=$escape($value.id);
	$out+='"}\'> <img src="';
	$out+=$escape($value.mainImage);
	$out+='" alt="';
	$out+=$escape($value.name);
	$out+='" onerror="imgError(this)"> </a> <div class="text">￥<span>';
	$out+=$escape($value.salePrice);
	$out+='</span> <p> <a target="_blank" href="';
	$out+=$escape(domian);
	$out+='item/';
	$out+=$escape($value.shopId);
	$out+='-';
	$out+=$escape($value.id);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" bp-data=\'{"event_id": "G000P019", "shop_id": "';
	$out+=$escape($value.shopId);
	$out+='", "product_id": "';
	$out+=$escape($value.id);
	$out+='"}\' title="';
	$out+=$escape($value.name);
	$out+='">';
	$out+=$escape($value.name);
	$out+='</a> </p> </div> </li> ';
	});
	$out+=' </ul>';
	return new String($out);
	});

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodInfo/shopChoose',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,domian=$data.domian,shopId=$data.shopId,csid=$data.csid,$out='';$out+='<ul class="clearfix"> ';
	$each(data,function($value,$index){
	$out+=' <li> ';
	if($value.item.rebateFlag && $value.item.discountFlag){
	$out+=' <em class="icon-fan">返</em> ';
	}else{
	$out+=' ';
	if($value.item.rebateFlag){
	$out+=' <em class="icon-fan">返</em> ';
	}
	$out+=' ';
	if($value.item.discountFlag){
	$out+=' <em class="icon-fan icon-jiang">降</em> ';
	}
	$out+=' ';
	}
	$out+=' <a href="';
	$out+=$escape(domian);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape($value.itemId);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" bp-data="{\'event_id\':\'G000P018\', \'shop_id\': \'';
	$out+=$escape($value.item.shopId);
	$out+='\',\'product_id\': \'';
	$out+=$escape($value.itemId);
	$out+='\'}" target="_blank" > <img src="';
	$out+=$escape($value.item.mainImage);
	$out+='" alt="';
	$out+=$escape($value.item.name);
	$out+='" onerror="imgError(this)"> </a> <div class="text">￥<span>';
	$out+=$escape($value.item.salePrice);
	$out+='</span> <p><a href="';
	$out+=$escape(domian);
	$out+='item/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape($value.itemId);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" bp-data="{\'event_id\':\'G000P018\', \'shop_id\': \'';
	$out+=$escape($value.item.shopId);
	$out+='\',\'product_id\': \'';
	$out+=$escape($value.itemId);
	$out+='\'}" title="';
	$out+=$escape($value.item.name);
	$out+='">';
	$out+=$escape($value.item.name);
	$out+='</a></p> </div> </li> ';
	});
	$out+=' </ul>';
	return new String($out);
	});

/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * 商品详情页地址切换回调
	 * zhaodonghong
	 */

	var goodAddress = __webpack_require__(192);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var spinner = $('[data-trigger=spinner]').data('spinner');
	var init = function init() {
	    goodAddress(function (defaultList) {
	        var $price = $('[data-node="price"]');
	        var $originPrice = $('[data-node="originPrice"]');
	        var $cargo = $('[data-node="iscargo"]');
	        var $stock = $('[data-node="stockBox"]');
	        var $addShopCar = $('[data-action="addShopCar"]');
	        var $buyBtn = $('[data-action="buybtn"]');
	        var postData = {
	            itemId: parseInt($_CONFIG.productId, 10),
	            shopId: parseInt($_CONFIG.shopId, 10),
	            provName: defaultList[0].levelName,
	            provId: parseInt(defaultList[0].levelId, 10),
	            cityName: defaultList[1].levelName,
	            cityId: parseInt(defaultList[1].levelId, 10),
	            borName: defaultList[2].levelName,
	            borId: parseInt(defaultList[2].levelId, 10)
	        };
	        if (parseInt($_CONFIG.skuId, 10) !== 0 && $_CONFIG.prodType !== '1') {
	            postData.skuId = parseInt($_CONFIG.skuId, 10);
	        }
	        fetch.get(url.get('getCurrItemInfo'), {
	            data: postData
	        }).done(function (result) {
	            if (result && result.code === 200 && result.success) {
	                var data = result.data;
	                if (data.skus !== undefined) {

	                    /*var saleInterval = null;
	                     var originInterval = null;
	                     if( data.salePriceShow.indexOf('~') !== -1 ){
	                         $price.text( data.salePriceShow ).attr( 'data-saleprice', salePriceShow );
	                        $originPrice.text( data.priceShow ).attr( 'data-originprice', priceShow );
	                     }else{
	                         saleInterval = data.salePrice === data.skuHighestSalePrices ? data.skuHighestSalePrice : data.salePrice + '~' + data.skuHighestSalePrice;
	                        originInterval = data.price === data.skuHighestPrice ? data.skuHighestPrice : data.price + '~' + data.skuHighestPrice;
	                        $price.text( data.salePriceShow ).attr( 'data-saleprice', saleInterval );
	                        $originPrice.text( data.priceShow ).attr( 'data-originprice', originInterval );
	                     }
	                    spinner.spinning.setMax( data.currStock );
	                    */

	                    spinner.spinning.setMax(data.skus.stock > 20 ? 20 : data.skus.stock);
	                    $price.text(data.skus.salePrice);
	                    $originPrice.text(data.skus.price);
	                    if (data.skus.hasStock > 0) {

	                        $stock.text('有货');
	                        $cargo.text('有货');
	                        $buyBtn.removeClass('btn-default');
	                        $addShopCar.removeClass('btn-default');
	                        $('[data-spin="up"]').removeClass('disabled');
	                    } else {

	                        $stock.text('无货');
	                        $cargo.text('无货');
	                        $buyBtn.addClass('btn-default');
	                        $addShopCar.addClass('btn-default');
	                        $('[data-spin="up"]').addClass('disabled');
	                    }
	                }
	            }
	        });
	    });
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2),
	    url = __webpack_require__(28);
	var init = function init(callback) {
	    var $goodInfoBox = $('div[data-node="topGoodInfo"]'),
	        $getAddressTopBox = $goodInfoBox.find('[data-action="setAddress"]'),
	        $getAddress = $getAddressTopBox.find('[data-action="setAddressTopBox"]'),
	        $getAddressTops = $getAddress.find('[data-node="addressTop"]'),
	        $getAddTopHas = $getAddress.find('[data-aid]'),
	        $setAddressBox = $goodInfoBox.find('[data-node="setAddressbox"]'),
	        $setAddressTab = $setAddressBox.find('[data-action="setAddressTab"]'),
	        $setAddressList = $setAddressBox.find('[data-node="setAddressList"]') /*,
	                                                                              $cargo = $goodInfoBox.find('[data-node="iscargo"]')*/;
	    // var $repert = $goodInfoBox.find('[data-node="repert"]');
	    var isShow = false;
	    var defaultList = [],
	        changeList = [],
	        index = $getAddTopHas.length - 1,
	        isClick = true,
	        checked = true;
	    //遍历插入数据
	    for (var i = 0, len = $getAddTopHas.length; i < len; i++) {
	        defaultList[i] = {};
	        defaultList[i].levelId = $getAddTopHas.eq(i).attr('data-aid');
	        defaultList[i].levelName = $getAddTopHas.eq(i).text();
	    }
	    //配送地址
	    $getAddressTopBox.on('click', function (e) {
	        e.stopPropagation();
	        // var _this = this;
	        if (!isShow) {

	            isShow = true;
	            $getAddTopHas = $getAddress.find('[data-aid]');
	            var pId = $getAddTopHas.eq($getAddTopHas.length - 2).attr('data-aid');
	            addAjax(pId, function (result) {
	                var _index = $getAddTopHas.length - 1 < 0 ? 0 : $getAddTopHas.length - 1;
	                $setAddressTab.removeClass('selected-span').eq(_index).addClass('selected-span').nextAll().remove();
	                $setAddressBox.css('display') === 'none' && $setAddressBox.show();
	                setAddressList(result, _index);
	            });
	        }
	    });

	    //弹窗组织默认事件
	    $setAddressBox.on('click', function (e) {
	        e.stopPropagation();
	    })
	    //市区切换
	    .on('click', '[data-action="setAddressTab"]', function (e) {
	        e.stopPropagation();
	        index = $getAddressTopBox.find('[data-action="setAddressTab"]').index($(this));
	        var pId;
	        if ($(this).children().eq(0).text() !== '请选择') {
	            $setAddressTab.removeClass('selected-span').eq(index).addClass('selected-span');
	            pId = $(this).prev().attr('data-aid') || 0;
	            if (index === 0) {
	                if ($setAddressList.eq(index).children().length === 0) {

	                    addAjax(pId, function (result) {
	                        setAddressList(result, index);
	                    });
	                } else {
	                    $setAddressList.hide().eq(index).show();
	                }
	            } else {
	                addAjax(pId, function (result) {
	                    setAddressList(result, index);
	                });
	            }
	        }
	    })
	    //市区列表切换
	    .on('click', 'li', function (e) {
	        e.stopPropagation();
	        if (isClick) {
	            isClick = false;
	            var pId = $(this).attr('data-id'),
	                addressName = $(this).text(),
	                listIndex = $setAddressList.index($(this).parents('ul'));
	            checked = listIndex === 0 ? false : true;
	            $setAddressTab.removeClass('selected-span').eq(listIndex).nextAll().remove();
	            $setAddressTab.eq(listIndex).children().eq(0).text(addressName);
	            $setAddressTab.eq(listIndex).attr('data-aid', $(this).attr('data-id'));

	            if (listIndex !== $setAddressList.length - 1) {
	                addAjax(pId, function (result) {
	                    $setAddressTab.removeClass('selected-span').eq(listIndex + 1).addClass('selected-span');

	                    setAddressList(result, listIndex + 1);
	                    $setAddressTab.eq(0).parent().append('<a href="javascript:;" data-action="setAddressTab" class="selected-span">' + '<span data-node="tabName">请选择</span>' + '<em class="icon icon-down"></em>' + '</a>');
	                    $setAddressTab = $setAddressBox.find('[data-action="setAddressTab"]');
	                    changeList[listIndex] = {};
	                    changeList[listIndex].levelId = pId;
	                    changeList[listIndex].levelName = addressName;
	                });
	            } else {
	                changeList[listIndex] = {};
	                changeList[listIndex].levelId = pId;
	                changeList[listIndex].levelName = addressName;
	                getProductStock(callback);
	            }
	        }
	    })
	    //关闭按钮
	    .on('click', '[data-action="addressClose"]', function (e) {
	        e.stopPropagation();
	        if ($setAddressBox.css('display') !== 'none') {

	            getProductStock(callback);

	            $setAddressBox.hide();
	        }
	    });
	    //设置地址列表
	    function setAddressList(data, index) {
	        isClick = true;
	        var html = '';
	        for (var i = 0, len = data.nodes.length; i < len; i++) {
	            html += '<li data-id="' + data.nodes[i].id + '">' + data.nodes[i].name + '</li>';
	        }
	        $setAddressList.hide().eq(index).show().html(html);
	    }

	    //请求数据，判断是否有货

	    function getProductStock(callback) {
	        callback = callback || function () {};
	        if (changeList.length > 2 && checked) {
	            for (var i = 0, len = changeList.length; i < len; i++) {
	                if (changeList[i] !== undefined) defaultList[i] = changeList[i];
	            }
	            /*var delNum = 0,
	                changeIndex = 0;*/
	            len = defaultList.length;
	            defaultList.splice(changeList.length, defaultList.length - changeList.length);
	            callback.call(null, defaultList);
	            //console.log(defaultList);

	            /*if( changeList[2] !== undefined ){
	              	fetch.get( $_CONFIG.mall_domain + url.get( 'getProduct' ), {
	            		data : {
	            			itemId : productId,
	            			regionId : defaultList[2].levelId
	              		}
	            	}).done(function( result ){
	            		var stock = $repert.text() > 0
	            		if( result && result.success ){
	            			if( result.data.result ){
	            				if( stock ){
	            					$cargo.text( '有货' );
	            				}else{
	            					$cargo.text( '无货' );
	            				}
	            			}else{
	            				$cargo.text( '不可配送' );
	            			}
	            			
	            		}else if( result.code === 881012 ){
	            			$cargo.text( result.message )
	            		}
	            	});
	              }*/
	            changeList = [];
	        }

	        var html = '',
	            htmlTab = '';
	        for (i = 0, len = defaultList.length; i < len; i++) {
	            html += '<span data-aid="' + defaultList[i].levelId + '" data-node="addressTop">' + defaultList[i].levelName + '</span>';
	            htmlTab += '<a href="javascript:;" class="" data-aid="' + defaultList[i].levelId + '" data-action="setAddressTab">' + '<span data-node="tabName">' + defaultList[i].levelName + '</span>' + '<em class="icon icon-down"></em>' + '</a>';
	        }
	        $getAddress.html(html);
	        $getAddressTops = $getAddress.find('[data-aid]');
	        $setAddressBox.children().eq(1).html(htmlTab);
	        $setAddressTab = $setAddressBox.find('[data-action="setAddressTab"]');

	        isClick = true;
	        $setAddressBox.hide();
	    }

	    function addAjax(id, callback) {
	        if (window.localStorage) {
	            var local = JSON.parse(localStorage.getItem('address' + id));
	            var isLose;
	            if (local !== null) {
	                if (local.hasOwnProperty('time')) {
	                    isLose = local.time < +new Date();
	                }
	            } else {
	                isLose = true;
	            }
	            if (isLose) {
	                fetch.get(url.get('getAddress') + id, {}).done(function (result) {
	                    if (result.code === 200) {
	                        callback.call(null, result.data);
	                        var addressLocal = {
	                            data: result.data,
	                            time: +new Date() + 604800000
	                        };
	                        localStorage.removeItem('address' + id);
	                        localStorage.setItem('address' + id, JSON.stringify(addressLocal));
	                    }
	                }).fail(function (xhr, error) {
	                    console.log(xhr, error);
	                }).always(function () {
	                    if (isShow) {
	                        isShow = false;
	                    }
	                });
	            } else {
	                callback.call(null, local.data);
	                if (isShow) {
	                    isShow = false;
	                }
	            }
	        } else {
	            fetch.get(url.get('getAddress') + id, {}).done(function (result) {
	                if (result.code === 200) {
	                    callback.call(null, result.data);
	                }
	            }).fail(function (xhr, error) {
	                console.log(xhr, error);
	            }).always(function () {
	                if (isShow) {
	                    isShow = false;
	                }
	            });
	        }
	    }

	    $(document).on('click', function (e) {
	        e.stopPropagation();
	        if ($setAddressBox.css('display') !== 'none') {

	            getProductStock(callback);

	            $setAddressBox.hide();
	        }
	    });
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);

	var $iframe = $('[data-node="infoIframe"]');
	var iframe = null;
	var iframeBody = null;
	var $iframeBody = null;

	var cur = 0;
	var oImage = new Image();
	var timer = null;
	var sum = 0;
	var iframeHeight = 0;
	var setHeight = 0;
	var truethSrc = '';
	var imgLoad = function imgLoad(images) {

	    truethSrc = images.eq(cur).attr('gome-src') !== undefined ? images.eq(cur).attr('gome-src') : images.eq(cur).attr('src');
	    oImage.onload = function () {
	        if (cur <= images.length) {
	            imgLoad(images); //递归
	            images.eq(cur).attr('src', truethSrc);
	            iframeHeight = $iframe.height();
	            setHeight = Math.max(iframeBody.offsetHeight, oImage.height);

	            iframe.height = setHeight;
	            if (cur === images.length) {
	                timer = setInterval(function () {
	                    setHeight = iframeBody.offsetHeight;
	                    iframe.height = setHeight;
	                    if (iframeHeight === setHeight) {
	                        sum++;
	                        if (sum > 30) {
	                            clearInterval(timer);
	                        }
	                    }
	                }, 300);
	            }
	        }
	        cur++;
	    };
	    oImage.onerror = function () {
	        if (cur <= images.length) {
	            imgLoad(images); //递归
	            images.eq(cur).css('width', '750px').attr('src', $_CONFIG.imgpath + '/images/public/img-error.png');
	            iframeHeight = $iframe.height();
	            setHeight = Math.max(iframeBody.offsetHeight, oImage.height);
	            iframe.height = setHeight;
	            if (cur === images.length) {
	                timer = setInterval(function () {
	                    setHeight = iframeBody.offsetHeight;
	                    iframe.height = setHeight;
	                    if (iframeHeight === setHeight) {
	                        sum++;
	                        if (sum > 30) {
	                            clearInterval(timer);
	                        }
	                    }
	                }, 300);
	            }
	        }
	        cur++;
	    };
	    oImage.src = truethSrc;
	};
	var init = function init() {
	    if ($_CONFIG.prodType !== '1') {
	        // 1:xpop商品,2/3:在线自营,联营商品,4:o2m商品
	        iframe = $iframe[0];
	        iframeBody = iframe.contentWindow.document.body;
	        $iframeBody = $(iframeBody);
	        var url = $_CONFIG.detailUrl;

	        if (url === '') {
	            $iframeBody.html('<div style="font-family: PingFang SC,Myriad Pro,Hiragino Sans GB,Microsoft YaHei,sans-serif;height: 600px;line-height: 600px;color: #999;text-align: center;font-size:14px;">此商品暂无图文详情</div>');

	            iframe.height = iframeBody.offsetHeight;
	            return;
	        }
	        fetch.get(url, {
	            dataType: "jsonp",
	            jsonp: "jianjie", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
	            jsonpCallback: "jianjie" //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
	        }).done(function (data) {
	            if (data !== '') {
	                $iframeBody.html(data);
	                imgLoad($iframeBody.find('img'));
	            } else {
	                $iframeBody.html('<div style="font-family: PingFang SC,Myriad Pro,Hiragino Sans GB,Microsoft YaHei,sans-serif;height: 600px;line-height: 600px;color: #999;text-align: center;font-size:14px;">此商品暂无图文详情</div>');

	                iframe.height = iframeBody.offsetHeight;
	            }
	        }).fail(function () {
	            $iframeBody.html('<div style="font-family: PingFang SC,Myriad Pro,Hiragino Sans GB,Microsoft YaHei,sans-serif;height: 600px;line-height: 600px;color: #999;text-align: center;font-size:14px;">此商品暂无图文详情</div>');
	            iframe.height = iframeBody.offsetHeight;
	        });
	    }
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var $tabBtn = $('[data-node="tabBtnBox"] a');
	var $tabContent = $('[data-node="tabContent"]');
	var $tabBox = $('[data-node="tabBox"]');
	var offsetTop = $tabBox.offset().top;
	var nSt = $(window).scrollTop();
	// var nWh = $(window).height();


	var elementFixed = function elementFixed() {
		if (nSt >= offsetTop) {
			$tabBox.addClass('tabbox-focus');
		} else {
			$tabBox.removeClass('tabbox-focus');
		}
	};
	var init = function init() {
		$tabBtn.on('click', function () {
			var _this = $(this);
			var index = $tabBtn.index(_this);
			$tabBtn.removeClass('active').eq(index).addClass('active');
			$tabContent.addClass('hide').eq(index).removeClass('hide');
			if ($tabBox.hasClass('tabbox-focus')) {

				$('body,html').animate({
					'scrollTop': offsetTop
				}, 300, function () {
					$tabBox.removeClass('tabbox-focus').removeAttr('style').find('.w960').removeAttr('style');
				});
			}
		});
		elementFixed();
		$(window).on('scroll', function () {
			nSt = $(window).scrollTop();
			elementFixed();
		});
	};
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * [产品图放大]
	 * @Author: Fu Xiaochun
	 * @Email:     fuzhengchun@gomeplus.com
	 */
	__webpack_require__(196);

	$('[data-node=leftBigBox] > li').imgZoom({
	  boxWidth: 400,
	  boxHeight: 400
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * [图片放大镜]
	 * @Author: Fu Xiaochun
	 * @Email:  fuzhengchun@gomeplus.com
	 */
	function ImgZoom(options) {
	    this.opts = options;
	    this.$el = options.$el;
	    this.$sImg = options.$el.find('img');
	    this.$zoomDiv = null;
	    this.$bigImg = null;
	    this.imgWidth = 0;
	    this.imgHeight = 0;
	    this.$mask = null;
	    this.maskWidth = 0;
	    this.maskHeight = 0;
	    this.elWidth = 0;
	    this.elHeight = 0;
	    this.flag = true;
	    this._init();
	}
	ImgZoom.prototype = {
	    constructor: ImgZoom,
	    _init: function _init() {
	        this.$el.css('position', 'relative');
	        this.bindEvent();
	    },
	    createHTML: function createHTML() {
	        var _this = this;
	        var boxWidth = this.opts.boxWidth;
	        var boxHeight = this.opts.boxHeight;
	        this.elWidth = this.$el.outerWidth(true);
	        this.elHeight = this.$el.outerHeight(true);

	        createZoomDiv();
	        createMask();

	        function createZoomDiv() {
	            _this.$zoomDiv || (_this.$zoomDiv = $('<div/>'));
	            var offset = _this.$el.offset();
	            var zoomDivLeft = offset.left / 1 + _this.$el.outerWidth(true) / 1 + _this.opts.marginLeft / 1;
	            var zoomDivTop = offset.top / 1;
	            _this.$bigImg.css('position', 'absolute');
	            _this.$zoomDiv.append(_this.$bigImg);
	            _this.$zoomDiv.css({
	                position: 'absolute',
	                left: zoomDivLeft,
	                top: zoomDivTop,
	                zIndex: 999,
	                width: boxWidth,
	                height: boxHeight,
	                overflow: 'hidden',
	                border: '1px solid #eee',
	                background: '#FFF'
	            });
	            $('body').append(_this.$zoomDiv);
	        }

	        function createMask() {
	            _this.maskWidth = Math.ceil(boxWidth / _this.imgWidth * _this.elWidth);
	            _this.maskHeight = Math.ceil(boxHeight / _this.imgHeight * _this.elHeight);
	            _this.maskWidth > _this.elWidth && (_this.maskWidth = _this.elWidth);
	            _this.maskHeight > _this.elHeight && (_this.maskHeight = _this.elHeight);
	            _this.$mask || (_this.$mask = $('<div/>'));
	            _this.$mask.css({
	                position: 'absolute',
	                background: 'rgba(238,130,34,.4) url("' + $_CONFIG.imgpath + '/images/shop/move.png") no-repeat center',
	                width: _this.maskWidth,
	                height: _this.maskHeight,
	                cursor: 'none'
	            });
	            _this.$el.append(_this.$mask);
	        }
	    },
	    bindEvent: function bindEvent() {
	        var _this = this;
	        this.$el.on({
	            'mouseenter': function mouseenter() {
	                _this.flag = true;
	                var imgOrigin = _this.$sImg.attr(_this.opts.origin);
	                var img = new Image();
	                img.onload = function () {
	                    if (_this.flag) {
	                        _this.imgWidth = img.width;
	                        _this.imgHeight = img.height;
	                        _this.$bigImg = $(img);
	                        _this.createHTML();
	                        _this.flag = false;
	                    }
	                };
	                img.src = imgOrigin;
	            },
	            'mouseleave': function mouseleave() {
	                if (_this.flag) {
	                    _this.flag = false;
	                } else {
	                    _this.$zoomDiv && _this.$zoomDiv.remove();
	                    _this.$mask && _this.$mask.remove();
	                }
	            },
	            'mousemove': function mousemove(e) {
	                if (!_this.$bigImg) {
	                    return false;
	                }
	                var offset = _this.$el.offset();
	                var maskW = _this.maskWidth;
	                var maskH = _this.maskHeight;
	                var left = e.pageX - offset.left - Math.ceil(maskW / 2);
	                var top = e.pageY - offset.top - Math.ceil(maskH / 2);
	                var maxX = _this.elWidth - maskW;
	                var maxY = _this.elHeight - maskH;

	                left = left < 0 ? 0 : left;
	                top = top < 0 ? 0 : top;
	                left = left > maxX ? maxX : left;
	                top = top > maxY ? maxY : top;

	                var bigLeft = -left * _this.imgWidth / _this.elWidth;
	                var bigTop = -top * _this.imgHeight / _this.elHeight;

	                _this.$mask.css({
	                    left: left,
	                    top: top
	                });
	                _this.$bigImg.css({
	                    left: bigLeft,
	                    top: bigTop
	                });
	            }
	        });
	    }
	};

	$.fn.imgZoom = function (options) {
	    var defaults = {
	        boxWidth: 360,
	        boxHeight: 360,
	        marginLeft: 5,
	        origin: 'data-origin'
	    };
	    $.each(this, function (i, t) {
	        var config = $.extend(defaults, options);
	        config.$el = $(t);
	        new ImgZoom(config);
	    });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});