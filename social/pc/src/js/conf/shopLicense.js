webpackJsonp([33],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(267);

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

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2),
	    url = __webpack_require__(28),
	    moduleTrim = __webpack_require__(51),
	    truncate = __webpack_require__(42),
	    praise = __webpack_require__(256),
	    shareto = __webpack_require__(123).shareto,
	    shopCollect = __webpack_require__(175);
	__webpack_require__(54);

	var $Form = $('[data-node=Form]');
	var $codeBtn = $Form.find('[data-node=codeBtn]'),
	    $codeImg = $Form.find('[data-node=codeImg]'),
	    $codeInput = $Form.find('[data-node=codeInput]'),
	    $codeVilid = $Form.find('[data-node=codeVilid]'),
	    $codeTip = $Form.find('[data-node=codeVilid] .red'),
	    $submitBtn = $Form.find('[data-node=submitBtn]'),
	    $shopTop = $('[data-node="shopTop"]'),
	    $love = $shopTop.find('[data-action="love"]'),
	    //点赞
	$loveNum = $love.find('[data-node="loveNum"]'),
	    //点赞数量
	$collect = $shopTop.find('[data-action="collect"]'),
	    //收藏
	$collectNum = $collect.find('[data-node="collectNum"]'),
	    Timeliness = true; //控制数据提交按钮点击频率

	module.exports = $(function () {
	    var loveNum = ~~$loveNum.text();
	    var tipshow = function tipshow(msg) {
	        $codeTip.html(msg);
	        $codeVilid.removeClass('hide');
	    };

	    var codeInput = function codeInput() {
	        $codeVilid.addClass('hide');
	        if (moduleTrim($codeInput.val()).length > 4) {
	            $codeInput.val(truncate($codeInput.val(), 4));
	        }
	    };

	    var submit = function submit() {
	        if (Timeliness == false) {
	            return;
	        }
	        Timeliness = false;
	        setTimeout(function () {
	            Timeliness = true;
	        }, 3000);
	        var value = moduleTrim($codeInput.val());
	        // if( value.length == 0  ){
	        // 	tipshow('验证码不能为空');
	        // }
	        fetch.get(url.get('shopCodeCheck'), {
	            data: {
	                shopId: $_CONFIG.shopId,
	                code: value
	            }
	        }, {
	            async: false
	        }).done(function (data /*, textStatus, jqXHR*/) {
	            if (data.success) {
	                location.href = $_CONFIG.mall_domain + 'shop/show?shopId=' + $_CONFIG.shopId + '&code=' + value;
	            } else {
	                tipshow(data.msg);
	            }
	        }).fail(function () {
	            alert("数据请求失败 请稍后尝试");
	        });
	    };
	    var codeChange = function codeChange() {
	        $codeVilid.addClass('hide');
	        fetch.get(url.get('getCodeOfBusiness'), {
	            async: false
	        }).done(function (data) {
	            if (data.success) {
	                $codeImg.attr('src', 'data:image/gif;base64,' + data.data);
	            } else {
	                alert("数据请求失败 请稍后尝试");
	            }
	        }).fail(function () {
	            alert("数据请求失败 请稍后尝试");
	        });
	    };
	    if ($_CONFIG.type == '9') {
	        codeChange();
	    }

	    var init = function () {
	        //点赞
	        praise('[data-node="shopTop"]', '[data-action="love"]', {
	            onPraise: function onPraise() {
	                loveNum++;
	                $loveNum.text(loveNum);
	            },
	            onUnPraise: function onUnPraise() {
	                loveNum--;
	                $loveNum.text(loveNum);
	            },
	            onPraised: function onPraised() {
	                $love.find('em').addClass('active');
	                $loveNum.text(loveNum);
	            }
	        });
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
	                shop_id: $_CONFIG.shopId
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
	        //bindEvent
	        $codeInput.on('textchange', codeInput);
	        $submitBtn.on('click', submit);
	        $codeBtn.on('click', function () {
	            $codeInput.val('');
	            codeChange();
	        });
	    }();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});