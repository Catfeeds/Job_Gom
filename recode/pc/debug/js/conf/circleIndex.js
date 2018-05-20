webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//判断是否窄屏
	__webpack_require__(41).init();
	//获取首页动态数据
	__webpack_require__(42).init();
	//轮播
	var slider = __webpack_require__(46);
	slider.bannerSlider();
	slider.ggSlider();
	//图片懒加载
	__webpack_require__(48);
	//热门内容tab切换
	__webpack_require__(50);
	//初始化楼层tab切换
	__webpack_require__(51).init();
	//初始化加入圈子
	__webpack_require__(55).init();
	//不断寻觅滚动加载
	__webpack_require__(59).init();

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
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
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	function screenChange() {
		$(window).width() > 1024 ? $('body').removeClass('screen-lit') : $('body').addClass('screen-lit');
	};
	function init() {
		window.onresize = screenChange;
		screenChange();
	}
	module.exports.init = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';
	
	/*
	 *@author:dongyukuan
	 *@desc:圈子、话题、商品的数据动态获取渲染
	 *@date:2017/5/8
	 */
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var toast = __webpack_require__(43).init;
	var Pubsub = __webpack_require__(44);
	__webpack_require__(45)();
	//拆分数组
	var chunkAry = function chunkAry(arr, num) {
	    num = num * 1 || 1;
	    var ret = [];
	    arr.forEach(function (item, i) {
	        if (i % num === 0) {
	            ret.push([]);
	        }
	        ret[ret.length - 1].push(item);
	    });
	    return ret;
	};
	var getData = function getData(ids, type, cb) {
	    var da = {
	        type: type,
	        ids: ids
	    };
	    var groupDomain = $_CONFIG['group_domain'];
	    var api = groupDomain + url.get('getIndexData');
	    fetch.get(api, {
	        data: da
	    }).done(function (data) {
	        if (data.success) {
	            cb(data);
	        }
	    });
	};
	// 渲染话题的点赞数及评论数
	var renderTopic = function renderTopic($container, selector) {
	    return function (da) {
	        var data = da.data;
	        $.each(data, function (key, val) {
	            var sel = '[data-id="' + key + '"]';
	            var $item = $container.find(sel);
	            var topicLike = val.likeQuantity || 0;
	            var topicSpeak = val.replyQuantity || 0;
	            if ($item.length) {
	                $item.find('[data-node=topicLike]').text(topicLike);
	                $item.find('[data-node=topicSpeak]').text(topicSpeak);
	            }
	        });
	    };
	};
	//操作按钮的状态
	//overrun为圈子成员是否达到上限
	//joinStatus为加入圈子的状态
	var circleStatus = function circleStatus($item, joinStatus, overrun) {
	    $item.find('[data-action=joinCircle]').attr('data-overrun', overrun);
	    switch (joinStatus) {
	        case 0:
	            $item.find('[data-action=joinCircle]').addClass('none');
	            $item.find('[data-node=joinCircleRef]').addClass('none');
	            $item.find('[data-node=joinCircleChk]').addClass('none');
	            $item.find('[data-node=joinCircleSuc]').removeClass('none');
	            break;
	        case 1:
	            $item.find('[data-action=joinCircle]').removeClass('none');
	            $item.find('[data-node=joinCircleSuc]').addClass('none');
	            $item.find('[data-node=joinCircleRef]').addClass('none');
	            $item.find('[data-node=joinCircleChk]').addClass('none');
	            break;
	        case 2:
	            $item.find('[data-action=joinCircle]').addClass('none');
	            $item.find('[data-node=joinCircleSuc]').addClass('none');
	            $item.find('[data-node=joinCircleRef]').addClass('none');
	            $item.find('[data-node=joinCircleChk]').removeClass('none');
	            break;
	    }
	};
	//渲染圈子的成员、话题数及加入状态
	var renderCircle = function renderCircle($container, selector, cb) {
	    return function (da) {
	        var data = da.data;
	        $.each(data, function (key, val) {
	            var sel = '[data-id="' + key + '"]';
	            var $item = $container.find(sel);
	            var circleMember = val.memberQuantity || 0;
	            var circleTopic = val.topicQuantity || 0;
	            var joinStatus = val.status;
	            var overrun = !!(val.memberQuantity >= val.maxUsers); //是否超出最大人数
	            if ($item.length) {
	                $item.find('[data-node=circleTopic]').text(circleTopic);
	                $item.find('[data-node=circleMember]').text(circleMember);
	                circleStatus($item, joinStatus, overrun);
	                cb = cb || function () {};
	                cb();
	            }
	        });
	    };
	};
	//渲染商品价格及返利标识
	var renderGoods = function renderGoods($container, selector) {
	    return function (da) {
	        var data = da.data;
	        $.each(data, function (key, val) {
	            var sel = '[data-id="' + key + '"]';
	            var $item = $container.find(sel);
	            var salePrice = val.salePrice !== null ? val.salePrice : '暂无售价';
	            var mostRebate = val.mostRebate || 0;
	            if ($item.length) {
	                $item.find('[data-node=goodsPrice]').text(salePrice);
	                var $moneyBox = $item.find('[data-node=moneyBox]');
	                var $goodsPrice = $item.find('[data-node=goodsPrice]');
	                var $returnMoney = $item.find('[data-node=returnMoney]');
	                if (salePrice) {
	                    //price是否存在
	                    $moneyBox.removeClass('none');
	                    $goodsPrice.text(salePrice);
	                    if (mostRebate > 0) {
	                        //返利
	                        $returnMoney.removeClass('none');
	                    }
	                };
	            }
	        });
	    };
	};
	var getIds = function getIds(selector, $container) {
	    var ary = [];
	    $container.find(selector).each(function (idx, val) {
	        var id = $(val).attr('data-id');
	        if ($.inArray(id, ary) < 0) {
	            ary.push(id);
	        }
	    });
	    var idStr = ary.join(',');
	    return idStr;
	};
	
	var initTopic = function initTopic($container) {
	    $container = $container || $('body');
	    var selector = '[data-node=topicData]';
	    var topicIds = getIds(selector, $container);
	    var type = 'topic';
	    getData(topicIds, type, renderTopic($container, selector));
	};
	var initCircle = function initCircle(cb, $container) {
	    $container = $container || $('body');
	    cb = cb || function () {};
	    var selector = '[data-node=circleData]';
	    var circleIds = getIds(selector, $container);
	    var type = 'group';
	    getData(circleIds, type, renderCircle($container, selector, cb));
	};
	var initGoods = function initGoods($container) {
	    $container = $container || $('body');
	    var selector = '[data-node=goodsData]';
	    var goodIds = getIds(selector, $container);
	    var goodAry = goodIds.split(',');
	    var chunk = chunkAry(goodAry, 10);
	    var type = 'product';
	    chunk.forEach(function (item, index) {
	        var idStr = item.join(',');
	        getData(idStr, type, renderGoods($container, selector));
	    });
	};
	var init = function init() {
	    initTopic();
	    initCircle();
	    Pubsub('getAreaId').sub(initGoods);
	};
	module.exports = {
	    init: init,
	    initCircle: initCircle,
	    initGoods: initGoods,
	    initTopic: initTopic
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),
/* 43 */
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
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';
	
	var fetch = __webpack_require__(21);
	var Pubsub = __webpack_require__(44);
	
	var url = location.hostname.split('.');
	var len = url.length;
	var domain = url[len - 2] + '.' + url[len - 1];
	var getCookieArea = function getCookieArea() {
	    fetch.get($_CONFIG.ss_service_gome + 'item/v1/cookie/getregion/flag/public/ip', {
	        dataType: 'jsonp',
	        jsonpCallback: "ip"
	    }).done(function (data) {
	        var value = data.atgregion;
	        if (data.success === true) {
	            $.cookie('atgregion', value, {
	                expires: 1,
	                path: '/',
	                domain: domain
	            });
	            Pubsub('getAreaId').pub();
	        }
	    });
	};
	module.exports = getCookieArea;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/*
	 *@author:dongyukuan
	 *@desc:初始化轮播图 
	 *@date:2017/5/5
	 */
	__webpack_require__(47);
	
	var slider = function slider($selector) {
		$selector.bxSlider({
			adaptiveHeight: true,
			startSlide: 0,
			infiniteLoop: true,
			auto: true,
			autoHover: true,
			useCSS: false,
			pagerTriggerEvent: 'mouseenter'
		});
	};
	//首页banner
	var $bannerBox = $('[data-node=bannerBox]');
	var $bannerImgBox = $bannerBox.find('[data-node=bannerImg]');
	var bannerSlider = function bannerSlider() {
		slider($bannerImgBox);
	};
	//逛逛商品banner
	var $goodsBannerBox = $('[data-node=goodsBannerBox]');
	var $goodsBannerImg = $goodsBannerBox.find('[data-node=goodsBannerImg]');
	var ggSlider = function ggSlider() {
		slider($goodsBannerImg);
	};
	//摧毁轮播
	var destorySlider = function destorySlider($selector) {
		$selector.destroySlider();
	};
	var destoryBanner = function destoryBanner() {
		destorySlider($bannerImgBox);
	};
	
	var destoryGG = function destoryGG() {
		destorySlider($goodsBannerImg);
	};
	module.exports = {
		bannerSlider: bannerSlider,
		ggSlider: ggSlider,
		destoryGG: destoryGG,
		destoryBanner: destoryBanner
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

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
	                // store if the slider is in carousel mode (displaying / moving multiple slides)
	            };slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
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
	
	            //value = Math.round(value/10) * 10;
	
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
	                pagerHtml += '<span class="bx-pager-item"><a href="javascript:void(0)" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></span>';
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
	            if (slider.settings.auto) {
	                el.stopAuto();
	                slider.interval = 1;
	            }
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	__webpack_require__(49);
	var $container = $('[data-node=container]');
	var tabLazy = function tabLazy($selector) {
		$selector.find('img').lazyload({
			effect: 'fadeIn',
			failure_limit: 10
		});
	};
	tabLazy($container);
	module.exports = tabLazy;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 * Lazy Load - jQuery plugin for lazy loading images
	 *
	 * Copyright (c) 2007-2012 Mika Tuupola
	 *
	 * Licensed under the MIT license:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * Project home:
	 *   http://www.appelsiini.net/projects/lazyload
	 *
	 * Version:  1.7.2
	 *
	 */
	(function($, window) {
	
	    var $window = $(window);
	    var $container;
	
	    $.fn.lazyload = function(options) {
	        var elements = this;
	        var settings = {
	            threshold: 0,
	            failure_limit: 0,
	            event: "scroll",
	            effect: "show",
	            container: window,
	            data_attribute: "original",
	            skip_invisible: true,
	            appear: null,
	            load: null
	        };
	
	        function update() {
	            var counter = 0;
	
	            elements.each(function() {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) ||
	                    $.leftofbegin(this, settings)) {
	                    /* Nothing. */
	                } else if (!$.belowthefold(this, settings) &&
	                    !$.rightoffold(this, settings)) {
	                    $this.trigger("appear");
	                } else {
	                    if (++counter > settings.failure_limit) {
	                        return false;
	                    }
	                }
	            });
	
	        }
	
	        if (options) {
	            /* Maintain BC for a couple of versions. */
	            if (undefined !== options.failurelimit) {
	                options.failure_limit = options.failurelimit;
	                delete options.failurelimit;
	            }
	            if (undefined !== options.effectspeed) {
	                options.effect_speed = options.effectspeed;
	                delete options.effectspeed;
	            }
	
	            $.extend(settings, options);
	        }
	
	        /* Cache container as jQuery as object. */
	        $container = (settings.container === undefined ||
	            settings.container === window) ? $window : $(settings.container);
	
	        /* Fire one scroll event per scroll. Not one scroll event per image. */
	        if (0 === settings.event.indexOf("scroll")) {
	            $container.bind(settings.event, function() {
	                return update();
	            });
	        }
	
	        this.each(function() {
	            var self = this;
	            var $self = $(self);
	
	            self.loaded = false;
	
	            /* When appear is triggered load original image. */
	            $self.one("appear", function() {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .bind("load", function() {
	                            $self
	                            //.hide()
	                                .attr("src", $self.data(settings.data_attribute))[settings.effect](settings.effect_speed);
	                            self.loaded = true;
	
	                            /* Remove image from array so it is not looped next time. */
	                            var temp = $.grep(elements, function(element) {
	                                return !element.loaded;
	                            });
	                            elements = $(temp);
	
	                            if (settings.load) {
	                                var elements_left = elements.length;
	                                settings.load.call(self, elements_left, settings);
	                            }
	                        })
	                        .attr("src", $self.data(settings.data_attribute));
	                }
	            });
	
	            /* When wanted event is triggered load original image */
	            /* by triggering appear.                              */
	            if (0 !== settings.event.indexOf("scroll")) {
	                $self.bind(settings.event, function() {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });
	
	        /* Check if something appears when window is resized. */
	        $window.bind("resize", function() {
	            update();
	        });
	
	        /* Force initial check if images should appear. */
	        update();
	
	        return this;
	    };
	
	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */
	
	    $.belowthefold = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.height() + $window.scrollTop();
	        } else {
	            fold = $container.offset().top + $container.height();
	        }
	
	        return fold <= $(element).offset().top - settings.threshold;
	    };
	
	    $.rightoffold = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $container.offset().left + $container.width();
	        }
	
	        return fold <= $(element).offset().left - settings.threshold;
	    };
	
	    $.abovethetop = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $container.offset().top;
	        }
	
	        return fold >= $(element).offset().top + settings.threshold + $(element).height();
	    };
	
	    $.leftofbegin = function(element, settings) {
	        var fold;
	
	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollLeft();
	        } else {
	            fold = $container.offset().left;
	        }
	
	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };
	
	    $.inviewport = function(element, settings) {
	        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) &&
	            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	    };
	
	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() */
	
	    $.extend($.expr[':'], {
	        "below-the-fold": function(a) {
	            return $.belowthefold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "above-the-top": function(a) {
	            return !$.belowthefold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "right-of-screen": function(a) {
	            return $.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "left-of-screen": function(a) {
	            return !$.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "in-viewport": function(a) {
	            return !$.inviewport(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold": function(a) {
	            return !$.belowthefold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "right-of-fold": function(a) {
	            return $.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "left-of-fold": function(a) {
	            return !$.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        }
	    });
	
	})(jQuery, window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/*
	 *@author:dongyukuan
	 *@desc:热门内容切换
	 *@date:2017/5/8
	 */
	var $hotConTagsBox = $('[data-node=hotConTagsBox]');
	var $lis = $hotConTagsBox.find('li');
	
	var $topicTag = $('[data-node=tabConBox]');
	var $tagItem = $topicTag.find('[data-node=topicTag]');
	$lis.on('mouseenter', function () {
	  var index = $lis.index(this);
	  $lis.removeClass('tab-li');
	  $(this).addClass('tab-li');
	  $tagItem.addClass('none').eq(index).removeClass('none');
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var tabWidget = __webpack_require__(52);
	
	var $circleFloor = $('[data-node = circleFloor]');
	var $circleTabBox = $circleFloor.find('[data-node=travelTags]');
	var $moneyFloor = $('[data-node = moneyFloor]');
	var $moneyTabBox = $moneyFloor.find('[data-node=moneyTags]');
	window._$ = $;
	var clickFn = function clickFn() {
		var $this = $(this);
		$this.siblings().removeClass('hoverCls');
		$this.addClass('hoverCls');
		var floorName = $this.parents('[floor-node]').attr('floor-node');
		var tagName = $this.text();
		tabWidget(floorName, tagName, $this);
	};
	var initEvent = function initEvent() {
		$circleTabBox.on('click', 'a', clickFn);
		$moneyTabBox.on('click', 'a', clickFn);
	};
	module.exports.init = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/*
	 *@author:dongyukuan
	 *@desc:圈子首页各圈子楼层的tab切换组件
	 *@date:2017/5/4
	 */
	var lazy = __webpack_require__(48);
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var toast = __webpack_require__(43).init;
	var slider = __webpack_require__(46);
	var repFace = __webpack_require__(53);
	var joinCircle = __webpack_require__(55);
	
	var moneyTpl = __webpack_require__(56);
	var moneyRTpl = __webpack_require__(57);
	var circleTpl = __webpack_require__(58);
	
	var $travelTab = $('[data-node = travelTab]');
	var $beautyTab = $('[data-node = beautyTab]');
	var $homeTab = $('[data-node = homeTab]');
	var $videoTab = $('[data-node = videoTab]');
	var $moneyTab = $('[data-node = moneyTab]');
	var $moneyRTab = $('[data-node=ggRight]');
	var $goodsBannerImg = $('[data-node=goodsBannerImg]');
	var $moneyTabsBox = $('[data-node=moneyTabsBox]');
	
	var topic_path = $_CONFIG['group_domain'] + '/topic/';
	
	//缓存tab切换数据
	var tabObj = {};
	var renderTab = function renderTab(floorName, data, $selector) {
	    var $circleCon = $selector.parents('[data-node="circleFloor"]').find('[data-node="circleTab"]');
	    var isCircle = $circleCon.length;
	    var dpBefore = 'group-' + $selector.attr('dp-data'); //埋点前缀
	    var htmlStr = '';
	    if (isCircle) {
	        data = data.data.groups;
	        data.forEach(function (val, index) {
	            if (!val.status) {
	                val.status = val._group_ids ? val._group_ids.status : false;
	                val.memberQuantity = val._group_ids ? val._group_ids.memberQuantity : '';
	                val.topicQuantity = val._group_ids ? val._group_ids.topicQuantity : '';
	            }
	            //埋点
	            if (val._group_url.indexOf('intcmp=') < 0) {
	                val._group_url = val._group_url + '?intcmp=' + dpBefore + (index + 1) + '-1';
	            }
	            val.topics.forEach(function (v, i) {
	                v.name = repFace(v.name);
	                if (!v.topic_url) {
	                    v.topic_url = topic_path + v.id + '.html?intcmp=' + dpBefore + (index + 1) + '-' + (i + 2);
	                }
	            });
	        });
	        htmlStr = circleTpl({
	            data: data
	        });
	        $circleCon.html(htmlStr);
	
	        lazy($circleCon);
	        joinCircle.init();
	    } else {
	        slider.destoryGG();
	        var daBanner = data.data.banners;
	        daBanner.forEach(function (val, idx) {
	            val.mostRebate = val._product_ids ? val._product_ids.mostRebate : 0;
	            val.salePrice = val._product_ids && val._product_ids.salePrice !== null ? val._product_ids.salePrice : '暂无售价';
	            if (val._product_url.indexOf('intcmp=') < 0) {
	                val._product_url = val._product_url + '?intcmp=' + dpBefore + '1-' + (idx + 1);
	            }
	        });
	        htmlStr = moneyTpl({
	            data: daBanner
	        });
	
	        var daR = data.data.products;
	
	        daR.forEach(function (val, idx) {
	            val.mostRebate = val._product_ids ? val._product_ids.mostRebate : 0;
	            val.salePrice = val._product_ids && val._product_ids.salePrice !== null ? val._product_ids.salePrice : '暂无售价';
	            if (val._product_url.indexOf('intcmp=') < 0) {
	                val._product_url = val._product_url + '?intcmp=' + dpBefore + '2-' + (idx + 1);
	            }
	        });
	        var rightStr = moneyRTpl({
	            da: daR
	
	        });
	        $goodsBannerImg.html(htmlStr);
	        $moneyRTab.html(rightStr);
	        slider.ggSlider();
	        lazy($moneyTabsBox);
	    }
	};
	
	var fromFetch = function fromFetch(floorName, tagName, $selector) {
	    var feData = {
	        "id": floorName,
	        "cat": tagName
	    };
	    var groupDomain = $_CONFIG['group_domain'];
	    var api = groupDomain + url.get('tabChannel');
	    fetch.get(api, {
	        data: feData
	    }).done(function (data) {
	        if (data.success) {
	            renderTab(floorName, data, $selector);
	            if (typeof tabObj[floorName] !== 'undefined') {
	                if (!tabObj[floorName][tagName]) {
	                    tabObj[floorName][tagName] = data;
	                }
	            } else {
	                tabObj[floorName] = {};
	                tabObj[floorName][tagName] = data;
	            }
	        }
	    }).fail(function () {
	        toast('获取数据失败');
	    });
	};
	var fromCatch = function fromCatch(floorName, tagName, $selector) {
	    var tabFloor = tabObj[floorName];
	    var hasData = !!(tabFloor && tabFloor[tagName]);
	    var ret = false;
	    if (hasData) {
	        renderTab(floorName, tabFloor[tagName], $selector);
	        ret = true;
	    }
	    return ret;
	};
	var init = function init(floorName, tagName, $selector) {
	    !fromCatch(floorName, tagName, $selector) ? fromFetch(floorName, tagName, $selector) : void 0;
	};
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var emoji = __webpack_require__(54);
	var reg = /(\[([\s\S]+?)\])/g;
	var repFace = function repFace(str) {
	    str = str.replace(reg, function () {
	        var imgStr;
	        var originText = arguments[0];
	        var text = arguments[2];
	        emoji.forEach(function (item, index) {
	            if (item.name == text) {
	                imgStr = '<img class="imoji" style="width:16px;height:16px;display:inline-block;"  src=' + item.url + '>';
	            }
	        });
	        return imgStr ? imgStr : originText;
	    });
	    return str;
	};
	module.exports = repFace;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	var format = function format(arr) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var emoji = arr[i];
	        emoji.url = imgPath + emoji.url + ext;
	    }
	    return arr;
	};
	
	module.exports = format(groupOne.concat(groupTwo, groupThree, groupFour, groupFive));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/*
	 *@author:dongyukuan
	 *@desc:加入圈子
	 *@date:2017/5/4
	 */
	
	var toast = __webpack_require__(43).init;
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var loginPop = __webpack_require__(22);
	var checkLoginStatus = __webpack_require__(23);
	var getCircleStatus = __webpack_require__(42).initCircle;
	
	var $sucPop = $('[data-node=sucPop]');
	var $sucCha = $('[data-action=sucCha]');
	var $failPop = $('[data-node=failPop]');
	var $failCha = $('[data-action=failCha]');
	
	var $failText = $failPop.find('[data-node=failText]');
	var $sucText = $sucPop.find('[data-node=sucText]');
	
	var sucTimer = null;
	var failTimer = null;
	
	//加入圈子pop提示
	var initCha = function initCha() {
	    $sucCha.on('click', function () {
	        $sucPop.hide();
	        window.clearTimeout(sucTimer);
	    });
	    $failCha.on('click', function () {
	        $failPop.hide();
	        window.clearTimeout(failTimer);
	    });
	};
	
	var handlePop = function handlePop(status, msg) {
	    //初始化点击×号
	    initCha();
	    if (status == 'suc') {
	        msg ? $sucText.text(msg) : void 0;
	        $sucPop.show();
	        sucTimer = setTimeout(function () {
	            $sucPop.hide();
	        }, 2000);
	    } else if (status == 'fail') {
	        msg ? $failText.text(msg) : void 0;
	        $failPop.show();
	        failTimer = setTimeout(function () {
	            $failPop.hide();
	        }, 2000);
	    }
	};
	
	var joinFlag = 1; //点击加入圈子按钮的开关，避免重复点击
	var joinCircle = function joinCircle($this, fromLogin) {
	    var groupId = $this.data('groupid');
	
	    function join() {
	        var groupDomain = $_CONFIG['group_domain'];
	        var api = groupDomain + url.get('joinCircle2');
	        fetch.post(api, {
	            "data": {
	                groupid: groupId
	            }
	        }).done(function (result) {
	            if (result.code == 200) {
	                var status = result.data.status;
	                if (status == 0) {
	                    var $joinCircleSuc = $this.siblings('[data-node = joinCircleSuc]');
	                    $this.addClass('none');
	                    $joinCircleSuc.removeClass('none');
	                    handlePop('suc', result.message);
	                } else if (status == 1) {
	                    var $joinCircleChk = $this.siblings('[data-node = joinCircleChk]');
	                    $this.addClass('none');
	                    $joinCircleChk.removeClass('none');
	                    handlePop('suc', result.message);
	                }
	            } else if (result.code == 409) {
	                switch (result.error.code) {
	                    case "1":
	                        //已加入状态
	                        var $joinCircleSuc = $this.siblings('[data-node = joinCircleSuc]').eq(0);
	                        $this.addClass('none');
	                        $joinCircleSuc.removeClass('none');
	                        handlePop('suc', result.message);
	                        break;
	                    case "2":
	                        //圈子人数达到上限
	                        var $joinCircleRef = $this.siblings('[data-node = joinCircleRef]').eq(0);
	                        $this.addClass('none');
	                        $joinCircleRef.removeClass('none');
	                        handlePop('fail', result.message);
	                        break;
	                    case "3":
	                        //待审核
	                        var $joinCircleChk = $this.siblings('[data-node = joinCircleChk]');
	                        $this.addClass('none');
	                        $joinCircleChk.removeClass('none');
	                        handlePop('suc', result.message);
	                        break;
	                }
	            } else {
	                var $joinCircleRef = $this.siblings('[data-node = joinCircleRef]');
	                $this.addClass('none');
	                $joinCircleRef.removeClass('none');
	                handlePop('fail', result.message);
	            }
	        }).fail(function () {
	            handlePop('fail');
	            joinFlag = 1;
	        }).always(function () {
	            joinFlag = 1;
	        });
	    }
	    if (fromLogin) {
	        getCircleStatus(join);
	    } else {
	        join();
	    }
	};
	
	var initJoin = function initJoin(e) {
	    if (!joinFlag) return;
	    joinFlag = 0;
	    var $this = $(this);
	    var isLogin = checkLoginStatus();
	    if (isLogin) {
	        joinCircle($this);
	    } else {
	        joinFlag = 1;
	        loginPop(function () {
	            joinCircle($this, true);
	        });
	    }
	    return false;
	};
	var initEvent = function initEvent() {
	    $('body').on('click', '[data-action = joinCircle]', initJoin);
	};
	module.exports.init = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/circleIndex/tabWidget/money',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' ';
	$each(data,function(v,i){
	$out+=' <li class="slider-item-container" data-id="';
	$out+=$escape(v.product_id);
	$out+='">  <a href="';
	$out+=$escape(v._product_url);
	$out+='" target="_blank" title="';
	$out+=$escape(v.cmsName);
	$out+='"> <div class="backgroundImg" style="width: 600px;height:390px"> <img src="';
	$out+=$escape(v.cmsImage);
	$out+='"> </div> </a> <div class="item-big-one-bottom clearfixclass="item-big-one-price""> <p class="item-big-one-price">  <a href="';
	$out+=$escape(v._product_url);
	$out+='" target="_blank"> <span class="item-b-o-title overflow-one"> ';
	$out+=$escape(v.cmsName);
	$out+='</span> </a> </p> <p class="item-b-o-p">  ';
	if(v.mostRebate > 0){
	$out+=' <span class="item-b-o-rebate"> <i>返利</i> </span> ';
	}
	$out+=' <span class="item-b-o-price">';
	$out+=$escape(v.salePrice);
	$out+='</span> <em>¥</em> </p> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/circleIndex/tabWidget/money-right',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,da=$data.da,v=$data.v,idx=$data.idx,$escape=$utils.$escape,$out='';$each(da,function(v,idx){
	$out+=' ';
	if(idx < 4){
	$out+=' <li data-node="goodsData" data-id="';
	$out+=$escape(v.product_id);
	$out+='"> <div class="backgroundImg-lit" style="width:160px;height:160px"> <a href="';
	$out+=$escape(v._product_url);
	$out+='" target="_blank"> <img data-original="';
	$out+=$escape(v.cmsImage);
	$out+='"> </a> </div> <a class="item-s-f-a overflow-one" href="';
	$out+=$escape(v._product_url);
	$out+='" target="_blank" title="';
	$out+=$escape(v.cmsName);
	$out+='"> ';
	$out+=$escape(v.cmsName);
	$out+=' </a> <p class="item-s-f-money" data-node="moneyBox"> ';
	if(v.mostRebate > 0){
	$out+=' <span class="item-b-o-rebate" data-node="returnMoney"> <i>返利</i></span> ';
	}
	$out+=' ';
	if(v.salePrice){
	$out+='<em>¥</em>';
	}
	$out+=' <span class="item-b-o-price" data-node="goodsPrice">';
	$out+=$escape(v.salePrice);
	$out+='</span> </p> </li> ';
	}
	$out+=' ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/circleIndex/tabWidget/circleTab',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,v=$data.v,idx=$data.idx,$escape=$utils.$escape,val=$data.val,$index=$data.$index,$string=$utils.$string,$out='';$each(data,function(v,idx){
	$out+=' <li> <div class="rec-circle-top"> <span class="circle-img-item"> <div class="backgroundImg" style="width: 290px;height: 190px"> <a href="';
	$out+=$escape(v._group_url);
	$out+='" target="_blank" title="';
	$out+=$escape(v.cmsName);
	$out+='"> <img data-original="';
	$out+=$escape(v.cmsIcon);
	$out+='"> </a> </div> ';
	if(v.introduction){
	$out+=' <div class="r-c-t-block overflow-one"> ';
	$out+=$escape(v.introduction);
	$out+='</div> ';
	}
	$out+=' <span class="babel overflow-one">';
	$out+=$escape(v.category_name);
	$out+='</span> </span> </div> <div class="rec-circle-bottom"> <p class="r-c-b-p1"> <a href="';
	$out+=$escape(v._group_url);
	$out+='" target="_blank"> <span class="r-c-b-title overflow-one">';
	$out+=$escape(v.cmsName);
	$out+='</span> </a> ';
	if(v.topicQuantity){
	$out+=' <span class="r-c-b-member last">话题<i class="r-c-b-i">';
	$out+=$escape(v.topicQuantity);
	$out+='</i></span> ';
	}
	$out+=' ';
	if(v.memberQuantity){
	$out+=' <span class="r-c-b-member">成员<i class="r-c-b-i">';
	$out+=$escape(v.memberQuantity);
	$out+='</i></span> ';
	}
	$out+=' </p> ';
	$each(v.topics,function(val,$index){
	$out+=' <p class="r-c-b-p2"> <a class="overflow-one" href="';
	$out+=$escape(val.topic_url);
	$out+='" data-id=\'';
	$out+=$escape(val.id);
	$out+='\' target="_blank"> ';
	if(val.type==1){
	$out+=' [话题] ';
	}else{
	$out+=' [活动] ';
	}
	$out+=' ';
	$out+=$string(val.name);
	$out+='</a> </p> ';
	});
	$out+='  ';
	if(v.status == 0){
	$out+=' <a class="add-circle add-hover none" href="javascript:void(0)" data-action="joinCircle" data-groupid=';
	$out+=$escape(v.group_id);
	$out+='> <em></em> <span>加入圈子</span> </a> <a class="ok-add-circle" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleSuc" target="_blank"> <em></em> <span>已加入</span> </a> <a class="add-circle check-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleChk" target="_blank"><em> </em><span>审核中</span></a> <a class="add-circle refuse-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>  ';
	}else if(v.status == 2){
	$out+=' <a class="add-circle add-hover none" href="javascript:void(0)" data-action="joinCircle" data-groupid=';
	$out+=$escape(v.group_id);
	$out+='> <em></em> <span>加入圈子</span> </a> <a class="ok-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleSuc" target="_blank"> <em></em> <span>已加入</span> </a> <a class="add-circle check-add-circle" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleChk" target="_blank"><em> </em><span>审核中</span></a> <a class="add-circle refuse-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a>  ';
	}else{
	$out+=' <a class="add-circle add-hover" href="javascript:void(0)" data-action="joinCircle" data-groupid=';
	$out+=$escape(v.group_id);
	$out+='> <em></em> <span>加入圈子</span> </a> <a class="ok-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleSuc" target="_blank"> <em></em> <span>已加入</span> </a> <a class="add-circle check-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleChk" target="_blank"><em> </em><span>审核中</span></a> <a class="add-circle refuse-add-circle none" href="';
	$out+=$escape(v._group_url);
	$out+='" data-node="joinCircleRef" target="_blank"> <em> </em><span>加入圈子</span></a> ';
	}
	$out+=' </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/*
	 *@author:dongyukuan
	 *@desc:不断寻觅滚动加载
	 *@date:2017/5/8
	 */
	
	__webpack_require__(49);
	var url = __webpack_require__(24);
	var fetch = __webpack_require__(21);
	var goOnTpl = __webpack_require__(60);
	
	var $container = $('[data-node=container]');
	
	var bpBefore = 'group-PGPH0101-';
	
	var initGoOn = function initGoOn() {
	    var topicPath = $_CONFIG.group_domain + 'topic/';
	    var imgDomain = $GLOBAL_CONFIG.pcimgpath;
	    var groupDomain = $_CONFIG['group_domain'];
	    var api = groupDomain + url.get('getHomepageGoOn');
	    fetch.get(api).done(function (data) {
	        if (!data.success || !data.data.length) return;
	        var dataAry = data.data;
	        for (var i = 0; i < dataAry.length; i++) {
	            var modNum = i + 1;
	            dataAry[i].topicURL = topicPath + dataAry[i].id + '.html?intcmp=' + bpBefore + modNum;
	        }
	        var html = goOnTpl({
	            goOnData: dataAry,
	            imgpath: imgDomain
	        });
	        $container.append($(html));
	        var $goOn = $('[data-node=goOn]');
	        $goOn.find('img').lazyload({
	            effect: 'fadeIn',
	            failure_limit: 10
	        });
	    });
	};
	var goOnFlag = 1;
	
	var scrollLoading = function scrollLoading() {
	    if (!goOnFlag) return;
	    if ($(document).scrollTop() + $(window).height() + 400 >= $container.offset().top + $container.height()) {
	        //加载不断寻觅
	        initGoOn();
	        goOnFlag = 0;
	    }
	};
	var initEvent = function initEvent() {
	    $(window).on('scroll', scrollLoading);
	};
	module.exports.init = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/circleIndex/goon/goOn',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,goOnData=$data.goOnData,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="index-circle go-on" data-node="goOn"> <div class="index-title clearfix"> <h2 class="title-h2">不断寻觅</h2> </div> <div class="index-circle-list"> <ul class="clearfix"> ';
	$each(goOnData,function($value,$index){
	$out+=' <li> <div class="mg-negative"> <div class="img scale-small backgroundImg-lit"> <a href="';
	$out+=$escape($value.topicURL);
	$out+='" target="_blank"> <img data-original="';
	$out+=$escape($value.url);
	$out+='"> </a> </div> <div class="text"> <a href="';
	$out+=$escape($value.topicURL);
	$out+='" target="_blank"> <span class="list-title overflow-one">';
	$out+=$escape($value.name);
	$out+='</span> </a> <span class="from-title overflow-one">';
	$out+=$escape($value.feedReason||$value.group_name);
	$out+='</span> <div class="text-icon"> <a href="';
	$out+=$escape($value.topicURL);
	$out+='" target="_blank"> <span class="ticon-like"><i>';
	$out+=$escape($value.userQuantity);
	$out+='</i></span> <span class="ticon-speak"><i>';
	$out+=$escape($value.replyQuantity);
	$out+='</i></span> <span class="ticon-star"><i>';
	$out+=$escape($value.topicCollectionQuantity);
	$out+='</i></span> </a> </div> </div> </div> </li> ';
	});
	$out+=' </ul> </div> </div> ';
	return new String($out);
	});

/***/ })
]);
//# sourceMappingURL=circleIndex.js.map