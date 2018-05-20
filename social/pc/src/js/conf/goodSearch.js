webpackJsonp([13],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	__webpack_require__(197);
	$("img").lazyload({ effect: "fadeIn" });
	var pageBreak = __webpack_require__(198);
	var showBrand = __webpack_require__(201);
	var price = __webpack_require__(202);
	var rebate = __webpack_require__(206);
	var chooseAddress = __webpack_require__(207);

	//展示品牌、切换品牌
	showBrand.init();
	//设置价格
	price.init();
	//返利、直降
	rebate.init();
	//选择配送地址
	chooseAddress.init();
	//翻页
	pageBreak.init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	/**
	 * jQuery "splendid textchange" plugin
	 * http://benalpert.com/2013/06/18/a-near-perfect-oninput-shim-for-ie-8-and-9.html
	 *
	 * (c) 2013 Ben Alpert, released under the MIT license
	 */

	var testNode = document.createElement("input");
	var isInputSupported = "oninput" in testNode && (!("documentMode" in document) || document.documentMode > 9);

	var hasInputCapabilities = function hasInputCapabilities(elem) {
	    // The HTML5 spec lists many more types than `text` and `password` on
	    // which the input event is triggered but none of them exist in IE 8 or
	    // 9, so we don't check them here.
	    // TODO: <textarea> should be supported too but IE seems to reset the
	    // selection when changing textarea contents during a selectionchange
	    // event so it's not listed here for now.
	    return elem.nodeName === "INPUT" && (elem.type === "text" || elem.type === "password");
	};

	var activeElement = null;
	var activeElementValue = null;
	var activeElementValueProp = null;

	/**
	 * (For old IE.) Replacement getter/setter for the `value` property that
	 * gets set on the active element.
	 */
	var newValueProp = {
	    get: function get() {
	        return activeElementValueProp.get.call(this);
	    },
	    set: function set(val) {
	        activeElementValue = val;
	        activeElementValueProp.set.call(this, val);
	    }
	};

	/**
	 * (For old IE.) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	var startWatching = function startWatching(target) {
	    activeElement = target;
	    activeElementValue = target.value;
	    activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, "value");

	    Object.defineProperty(activeElement, "value", newValueProp);
	    activeElement.attachEvent("onpropertychange", handlePropertyChange);
	};

	/**
	 * (For old IE.) Removes the event listeners from the currently-tracked
	 * element, if any exists.
	 */
	var stopWatching = function stopWatching() {
	    if (!activeElement) return;

	    // delete restores the original property definition
	    delete activeElement.value;
	    activeElement.detachEvent("onpropertychange", handlePropertyChange);

	    activeElement = null;
	    activeElementValue = null;
	    activeElementValueProp = null;
	};

	/**
	 * (For old IE.) Handles a propertychange event, sending a textChange event if
	 * the value of the active element has changed.
	 */
	var handlePropertyChange = function handlePropertyChange(nativeEvent) {
	    if (nativeEvent.propertyName !== "value") return;

	    var value = nativeEvent.srcElement.value;
	    if (value === activeElementValue) return;
	    activeElementValue = value;

	    $(activeElement).trigger("textchange");
	};

	if (isInputSupported) {
	    $(document).on("input", function (e) {
	        // In modern browsers (i.e., not IE 8 or 9), the input event is
	        // exactly what we want so fall through here and trigger the
	        // event...
	        if (e.target.nodeName !== "TEXTAREA") {
	            // ...unless it's a textarea, in which case we don't fire an
	            // event (so that we have consistency with our old-IE shim).
	            $(e.target).trigger("textchange");
	        }
	    });
	} else {
	    $(document).on("focusin", function (e) {
	        // In IE 8, we can capture almost all .value changes by adding a
	        // propertychange handler and looking for events with propertyName
	        // equal to 'value'.
	        // In IE 9, propertychange fires for most input events but is buggy
	        // and doesn't fire when text is deleted, but conveniently,
	        // selectionchange appears to fire in all of the remaining cases so
	        // we catch those and forward the event if the value has changed.
	        // In either case, we don't want to call the event handler if the
	        // value is changed from JS so we redefine a setter for `.value`
	        // that updates our activeElementValue variable, allowing us to
	        // ignore those changes.
	        if (hasInputCapabilities(e.target)) {
	            // stopWatching() should be a noop here but we call it just in
	            // case we missed a blur event somehow.
	            stopWatching();
	            startWatching(e.target);
	        }
	    }).on("focusout", function () {
	        stopWatching();
	    }).on("selectionchange keyup keydown", function () {
	        // On the selectionchange event, e.target is just document which
	        // isn't helpful for us so just check activeElement instead.
	        //
	        // 90% of the time, keydown and keyup aren't necessary. IE 8 fails
	        // to fire propertychange on the first input event after setting
	        // `value` from a script and fires only keydown, keypress, keyup.
	        // Catching keyup usually gets it and catching keydown lets us fire
	        // an event for the first keystroke if user does a key repeat
	        // (it'll be a little delayed: right before the second keystroke).
	        // Other input methods (e.g., paste) seem to fire selectionchange
	        // normally.
	        if (activeElement && activeElement.value !== activeElementValue) {
	            activeElementValue = activeElement.value;
	            $(activeElement).trigger("textchange");
	        }
	    });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	__webpack_require__(197);

	var pageBreakB = __webpack_require__(199);
	var fetch = __webpack_require__(2);
	var tpl = __webpack_require__(200);
	var url = __webpack_require__(28);

	var $page = $("[data-node=page]"),
	    $pageShow = $("[data-node=pageShow]"),
	    $currentPage = $("[data-node=currentPage]"),
	    $tootlePage = $("[data-node=tootlePage]"),
	    $prePage = $("[data-node=prePage]"),
	    $searchList = $('[data-node="searchList"]'),
	    $nextPage = $("[data-node=nextPage]"),
	    $goodsNum = $("[data-node=goodsNum]"),
	    $addMoreData = $("[data-node=addMoreData]"),
	    $noDataShow = $("[data-node=noDataShow]");
	//$dataFalse = $("[data-node=dataFalse]");


	var init = function init() {
	    initPage();
	    $page.on("click", "a", checkPage);
	    $pageShow.on("click", "em", checkPage);
	};
	// 页面预加载


	//初始化翻页
	function initPage() {
	    // 判断是否有数据
	    if (parseInt($goodsNum.html) == 0) {
	        $noDataShow.removeClass("hide").addClass("show");
	    } else {
	        var option = {
	            "toPage": $currentPage.html(),
	            "tootlePage": $tootlePage.html()
	        };
	        if (option.tootlePage == 1) {
	            $prePage.addClass("disabled");
	            $nextPage.addClass("disabled");
	        } else if (option.tootlePage == 0) {
	            $page.addClass("hide");
	            $prePage.addClass("disabled");
	            $nextPage.addClass("disabled");
	        }
	        var ahtml = pageBreakB(option);
	        $page.empty().append(ahtml);
	    }

	    $addMoreData.css({
	        "height": "220px",
	        "line-height": "220px",
	        "text-align": "center"
	    });
	}

	//翻页
	function checkPage() {
	    var $this = $(this);
	    var currentPage = $currentPage.html();
	    //var tootlePage = $tootlePage.html();
	    var toPage = "";

	    if ($this.hasClass("disabled") || $this.hasClass("noClick")) {
	        return false;
	    } else {

	        if ($this.attr("data-node") == "prePage") {
	            toPage = parseInt(currentPage) - 1;
	        } else if ($this.attr("data-node") == "nextPage") {
	            toPage = parseInt(currentPage) + 1;
	        } else {
	            toPage = $this.html();
	        }
	        getNewData(toPage, $this);
	    }
	}

	//请求数据，并且显示翻页
	function getNewData(toPage, thisObj) {
	    var $this1 = thisObj;
	    $page.addClass("hide").removeClass("show");
	    //var toPage = toPage;
	    var queryStr = $_CONFIG['query_string'];
	    var csid = $_CONFIG['csid'];
	    $searchList.empty();
	    $addMoreData.removeClass("hide").addClass("show");
	    $noDataShow.removeClass("show").addClass("hide");

	    fetch.get(url.get('searchGoods') + "?" + queryStr + "&page=" + toPage).done(function (data) {
	        if (data.success === true) {
	            var goods = data.data.items;
	            if (goods.length < 1) {
	                //没数据
	                falseText();
	            } else {
	                var option = {
	                    "toPage": data.data.page,
	                    "tootlePage": data.data.pageCount
	                };
	                changePage(option);
	                var strObj = {
	                    "aSrc": $_CONFIG['mall_domain'],
	                    "csid": csid,
	                    "goods": goods,
	                    "strImg": $_CONFIG['imgpath']
	                };
	                $searchList.html(tpl(strObj));

	                $addMoreData.removeClass("show").addClass("hide");
	                $page.addClass("show").removeClass("hide");
	                $currentPage.html(data.data.page);
	                $tootlePage.html(data.data.pageCount);
	                $("img").lazyload({ effect: "fadeIn" });
	            }
	        } else {
	            falseText();
	        }
	    }).fail(function () {
	        falseText();
	    });

	    function changePage(option) {
	        if (!$this1.hasClass("noClick")) {
	            var newHtml = pageBreakB(option);
	            $page.empty().append(newHtml);
	            if (option.toPage == 1) {
	                $prePage.addClass("disabled");
	                $nextPage.removeClass("disabled");
	            } else if (option.toPage == option.tootlePage) {
	                $nextPage.addClass("disabled");
	                $prePage.removeClass("disabled");
	            } else {
	                $nextPage.removeClass("disabled");
	                $prePage.removeClass("disabled");
	            }
	        }
	    }
	}

	// 请求失败处理
	function falseText() {
	    $addMoreData.removeClass("show").addClass("hide");
	    $noDataShow.removeClass("hide").addClass("show");
	    var k = 5;
	    var time1 = setInterval(function () {
	        if (k == 1) {
	            location.reload();
	            clearInterval(time1);
	        } else {
	            $("[data-node=countDown]").html(--k);
	        }
	    }, 1000);

	    $("[data-node=spanRrfresh]").on("click", function () {
	        location.reload();
	    });
	}

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	/*
	 	单击某个按钮时，触发该事件
	*/

	var pageBreak = function pageBreak(option) {
		var pageHtml = "";
		var defauls = {
			"elmSize": 9 //大于9页显示。。。
		};

		var options = $.extend({}, defauls, option);
		var elmSize = parseInt(options.elmSize);
		var tootlePage = parseInt(options.tootlePage);
		var toPage = parseInt(options.toPage);
		var arrPage = [];
		var dataStr = {};
		if (tootlePage <= elmSize) {

			for (var i = 0; i < tootlePage; i++) {
				arrPage.push(i + 1);
			}
			dataStr = {
				"arrPage": arrPage,
				"dshow": "no"
			};

			pageHtml = joinHtml(toPage, tootlePage, dataStr);
		} else {
			// 计算当前页和总数的关系
			if (toPage + 4 >= tootlePage) {
				// 前面有点，后面没点
				//var arrPage=[];
				for (var j = 0; j < elmSize - 2; j++) {
					var num = tootlePage - (elmSize - 2) + (j + 1);
					arrPage.push(num);
				}
				//调方法，前点
				dataStr = {
					"arrPage": arrPage,
					"dshow": "before"
				};
				pageHtml = joinHtml(toPage, tootlePage, dataStr);
			} else if (toPage - 4 <= 1) {
				// 前面没点，后面有
				//var arrPage=[];
				for (var k = 0; k < elmSize - 2; k++) {
					var num1 = k + 1;
					arrPage.push(num1);
				}
				dataStr = {
					"arrPage": arrPage,
					"dshow": "last"
				};
				pageHtml = joinHtml(toPage, tootlePage, dataStr);
			} else {
				//前后都有点
				//var arrPage=[];
				for (i = 0; i < elmSize - 4; i++) {
					var num2 = parseInt(toPage - 2 + i);
					arrPage.push(num2);
				}
				dataStr = {
					"arrPage": arrPage,
					"dshow": "all"
				};
				pageHtml = joinHtml(toPage, tootlePage, dataStr);
			}
		}

		return pageHtml;
	};

	function joinHtml(currentPage, lastPage1, dataStr) {
		var arrPage = dataStr.arrPage;
		var aList = "";
		for (var j = 0; j < arrPage.length; j++) {
			var className = "";
			if (currentPage == arrPage[j]) {
				className = "active";
			}
			var num = arrPage[j];
			aList += '<a href="javascript:;" class = ' + className + '>' + num + '</a>';
		}

		var preDissable = currentPage == 1 ? "disabled" : "";
		var nextDissable = currentPage == lastPage1 ? "disabled" : "";
		var prePage = '<a href="javascript:;" class="' + preDissable + ' " data-node="prePage">上一页</a>';
		var firstPage = '<a href="javascript:;" >1</a>';
		var spot = '<a href="javascript:;" class="noClick">...</a>';
		var lastPage = '<a href="javascript:;" >' + lastPage1 + '</a>';
		var nextPage = '<a href="javascript:;" class="' + nextDissable + '" data-node="nextPage">下一页</a>';

		var _html = "";

		if (dataStr.dshow == "no") {
			_html = prePage + aList + nextPage;
		} else if (dataStr.dshow == "before") {
			_html = prePage + firstPage + spot + aList + nextPage;
		} else if (dataStr.dshow == "last") {
			_html = prePage + aList + spot + lastPage + nextPage;
		} else if (dataStr.dshow == "all") {
			_html = prePage + firstPage + spot + aList + spot + lastPage + nextPage;
		}

		return _html;
	}

	module.exports = pageBreak;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/goodSearch/searchList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,goods=$data.goods,good=$data.good,$index=$data.$index,$escape=$utils.$escape,aSrc=$data.aSrc,csid=$data.csid,strImg=$data.strImg,$out='';$each(goods,function(good,$index){
	$out+=' <li> <a href="';
	$out+=$escape(aSrc);
	$out+='item/';
	$out+=$escape(good.shopId);
	$out+='-';
	$out+=$escape(good.id);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" target="_blank" class="img"><img src="';
	$out+=$escape(strImg);
	$out+='" alt="" data-original="';
	$out+=$escape(good.mainImage);
	$out+='" onerror="imgError(this)" width="218" height="218" ></a> <div class="text"> <a href="';
	$out+=$escape(aSrc);
	$out+='item/';
	$out+=$escape(good.shopId);
	$out+='-';
	$out+=$escape(good.id);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" title="';
	$out+=$escape(good.name);
	$out+='" target="_blank"> ';
	if(good.promotionMarks.itemProspectiveRebateAmount){
	$out+='<span>返利</span>';
	}
	$out+=' ';
	$out+=$escape(good.name);
	$out+=' </a> <div class="price"><span>￥';
	$out+=$escape(good.salePrice/100);
	$out+='</span> ';
	if(good.discount){
	$out+=' <del>';
	$out+=$escape(good.price/100);
	$out+='</del>';
	}
	$out+=' </div> <p>';
	$out+=$escape(good.saleQuantity);
	$out+='人付款</p> </div> </li> ';
	});
	return new String($out);
	});

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 *  商品搜索页面--显示更多品牌、品牌切换
	 * @author Qiaoli
	 */

	var $wrap = $('[data-node=wrap]');
	var $brandList = $('[data-node=brandList]');
	var $brandLi = $('[data-node=brandList]').find('li');
	var $letterList = $('[data-node=letterList]');
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);

	var active = 'active';

	//点击更多
	var showBrandList = function showBrandList(t) {
	    var $this = $(t);
	    var parents = $this.parents('[data-node=wrap]');
	    var letterLen = parents.find('[data-node=letterList]').length;
	    if (!parents.hasClass(active)) {
	        parents.addClass(active);
	        $this.html('更多<em class="icon-down"></em>');
	        if (letterLen) {
	            $letterList.find('a').removeClass(active);
	            $letterList.find('a:eq(0)').addClass(active);
	            $brandList.find('li').show();
	        }
	    } else {
	        parents.removeClass(active);
	        $this.html('收起<em class="icon-up"></em>');
	        if (letterLen) {
	            getBrand();
	        } else {
	            return false;
	        }
	    }
	};

	var getBrand = function getBrand() {
	    if ($('[data-node=letterList] a').length > 2) {
	        return false;
	    } else {
	        fetch.get(url.get('getBrand'), {
	            data: {
	                words: $wrap.eq(0).data('brands')
	            }
	        }).done(function (data) {
	            if (data.success === true) {
	                var brandLetter = data.data.upperWord;
	                var brandWord = data.data.firstWord;
	                $.each(brandLetter, function (i, k) {
	                    k = k == 'Other' ? '#' : k;
	                    var html = '<a href="javascript:;">' + k + '</a>';
	                    $letterList.append(html);
	                });
	                $.each($brandLi, function (i, v) {
	                    $(v).attr('data-word', brandWord[i]);
	                });
	            }
	        });
	    }
	};

	//鼠标经过切换品牌字母
	var showOneBand = function showOneBand(t) {
	    var $this = $(t);
	    var curVal = $this.text().toLowerCase();
	    $letterList.find('a').removeClass(active);
	    $this.addClass(active);
	    changeBand(curVal);
	};

	//鼠标经过切换品牌
	var changeBand = function changeBand(type) {
	    type = type == '#' ? 'other' : type;
	    if (type == '所有品牌') {
	        $brandList.find('li').show();
	    } else {
	        $brandList.find('li').hide();
	        $brandList.find('li[data-word=' + type + ']').show();
	    }
	};

	var init = function init() {
	    $wrap.on('click', '[data-action=more]', function () {
	        showBrandList(this);
	    });
	    $letterList.on('mouseenter', 'a', function () {
	        showOneBand(this);
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 *  商品搜索页面--价格区间
	 * @author Qiaoli
	 */

	var newUrl = __webpack_require__(203);
	var loading = __webpack_require__(205);
	__webpack_require__(54);

	var $minPrice = $('[data-node=minPrice]');
	var $maxPrice = $('[data-node=maxPrice]');
	var $submit = $('[data-action=submit]');

	//不能输入字母
	var validateKey = function validateKey() {
	    var key = event.keyCode;
	    if (key >= 48 && key <= 57) {
	        return true;
	    } else {
	        return false;
	    }
	};

	//输入非数字置为0
	var validatePrice = function validatePrice(name) {
	    var val = name.val();
	    var reg = /^[0-9]+$/;
	    if (!reg.test(val)) {
	        name.val("");
	    }
	};

	//截取长度
	var maxLen = 8;
	var setLength = function setLength() {
	    var $this = $(this);
	    var val = $.trim($this.val());
	    var len = val.length;
	    var reg = /^[0-9]+$/;
	    if (reg.test(val) && len > maxLen) {
	        $this.val(val.substr(0, maxLen));
	    }
	    return false;
	};

	//比较大小
	var compareVal = function compareVal() {
	    var min = $minPrice.val();
	    var max = $maxPrice.val();
	    if (Number(min) > Number(max)) {
	        if (max === '') {
	            $minPrice.val(min);
	            $maxPrice.val("");
	        } else {
	            $minPrice.val(max);
	            $maxPrice.val(min);
	        }
	    }
	    if (min == 0 && max == 0) {
	        $minPrice.val(min);
	        $maxPrice.val("");
	    }
	    return {
	        min: $minPrice.val(),
	        max: $maxPrice.val()
	    };
	};

	var setPrice = function setPrice() {
	    var val = compareVal();
	    loading();
	    newUrl({
	        minPrice: val.min,
	        maxPrice: val.max
	    });
	};

	var init = function init() {
	    $minPrice.on('keypress', validateKey);
	    $maxPrice.on('keypress', validateKey);
	    $minPrice.on('textchange', setLength);
	    $maxPrice.on('textchange', setLength);
	    $minPrice.on('blur', function () {
	        validatePrice($minPrice);
	    });
	    $maxPrice.on('blur', function () {
	        validatePrice($maxPrice);
	    });
	    $submit.on('click', setPrice);
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var changeLink = __webpack_require__(204);

	var getUrl = function getUrl(options) {
	    var search = $_CONFIG.query_string;
	    var url = $_CONFIG.mall_domain + 'search/index?';
	    var link = changeLink(search);
	    var urlStr = '';
	    $.each(options, function (i, v) {
	        link[i] = v;
	    });
	    for (var k in link) {
	        urlStr += '&' + k + '=' + link[k];
	    }
	    urlStr = urlStr.substr(1);
	    location.href = url + urlStr;
	};

	module.exports = getUrl;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	/**
	 *  商品搜索页面-- 获取url参数
	 * @author Qiaoli
	 */

	var changeLink = function changeLink(node) {
	    var nodeStr = $.trim(node);
	    var list = {};
	    if (nodeStr === '') {
	        return list;
	    }
	    var result = node.split("&");
	    for (var i = 0; i < result.length; i++) {
	        var newArr = result[i].split("=");
	        list[newArr[0]] = newArr[1];
	    }
	    return list;
	};

	module.exports = changeLink;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var loading = function loading() {
	   var hide = 'hide';
	   var show = 'show';
	   var $searchList = $('[data-node=searchList]');
	   var $result = $('[data-node=result]');
	   var $noDataShow = $('[data-node=noDataShow]');
	   var $page = $('[data-node=page]');
	   var $addMoreData = $('[data-node=addMoreData]');
	   $searchList.addClass(hide);
	   $result.addClass(hide);
	   $noDataShow.removeClass(show).addClass(hide);
	   $page.removeClass(show).addClass(hide);
	   $addMoreData.removeClass(hide);
	};

	module.exports = loading;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 *  商品搜索页面--返利、直降
	 * @author Qiaoli
	 */

	var newUrl = __webpack_require__(203);
	var loading = __webpack_require__(205);

	var $rebate = $('[data-action=rebate]');
	var $drop = $('[data-action=drop]');
	var active = 'active';

	var isSelected = function isSelected(t) {
	    var $this = $(t);
	    console.log($this.text());
	    if (!$this.hasClass(active)) {
	        $this.addClass(active);
	    } else {
	        $this.removeClass(active);
	    }
	    loading();
	    newUrl({
	        rebate: !$rebate.hasClass(active) ? 0 : 1,
	        drop: !$drop.hasClass(active) ? 0 : 1
	    });
	};

	var init = function init() {
	    $rebate.on('click', function () {
	        isSelected(this);
	    });
	    $drop.on('click', function () {
	        isSelected(this);
	    });
	    $('[data-node=warning-icon]').on('click', function () {
	        $('[data-node=search-warning]').hide();
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 *  商品搜索页面--选择地区
	 * @author Qiaoli
	 */

	var goodAddress = __webpack_require__(208);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var newUrl = __webpack_require__(203);
	var loading = __webpack_require__(205);

	var init = function init() {
	    goodAddress(function (data) {
	        var postData = {
	            provName: data[0].levelName,
	            provId: parseInt(data[0].levelId, 10),
	            cityName: data[1].levelName,
	            cityId: parseInt(data[1].levelId, 10),
	            borName: data[2].levelName,
	            borId: parseInt(data[2].levelId, 10)
	        };
	        fetch.get(url.get('getCurrItemInfo'), {
	            data: postData
	        }).done(function (data) {
	            if (data.success === true) {
	                loading();
	                newUrl({
	                    'addressNodeId': postData.borId
	                });
	            } else {
	                alert(data.message);
	            }
	        }).fail(function () {
	            alert(data.message);
	        });
	    });
	};
	module.exports = {
	    init: init
	};

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2),
	    url = __webpack_require__(28);
	var init = function init(callback) {
	    var $goodInfoBox = $('div[data-node="topGoodInfo"]');
	    var $getAddressTopBox = $goodInfoBox.find('[data-action="setAddress"]');
	    var $getAddress = $getAddressTopBox.find('[data-action="setAddressTopBox"]');
	    var $getAddTopHas = $getAddress.find('[data-aid]');
	    var $setAddressBox = $goodInfoBox.find('[data-node="setAddressbox"]');
	    var $setAddressTab = $setAddressBox.find('[data-action="setAddressTab"]');
	    var $setAddressList = $setAddressBox.find('[data-node="setAddressList"]');
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
	            len = defaultList.length;
	            defaultList.splice(changeList.length, defaultList.length - changeList.length);
	            callback.call(null, defaultList);
	            changeList = [];
	        }

	        var html = '',
	            htmlTab = '';
	        for (i = 0, len = defaultList.length; i < len; i++) {
	            html += '<span data-aid="' + defaultList[i].levelId + '" data-node="addressTop">' + defaultList[i].levelName + '</span>';
	            htmlTab += '<a href="javascript:;" class="" data-aid="' + defaultList[i].levelId + '" data-action="setAddressTab">' + '<span data-node="tabName">' + defaultList[i].levelName + '</span>' + '<em class="icon icon-down"></em>' + '</a>';
	        }
	        $getAddress.html(html);
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

/***/ }

});