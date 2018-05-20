webpackJsonp([38],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 个人中心我的订单
	 * @author Zhengchun Fu
	 */
	
	// 取消订单
	__webpack_require__(300).init();
	
	// 加载更多
	__webpack_require__(301)();
	
	// 收货操作：确认收货，延迟收货
	// require('./confirmReceipt/index').init();
	
	// 联系商家
	__webpack_require__(303).init();
	
	// 发送统计数据用
	var buriedPoint = __webpack_require__(40);
	buriedPoint.setPageData('uc_orders');

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

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
	    var defaults = {
	        fixed: true,
	        modal: true,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop,
	        cancel: noop,
	        btnWrapCls: 'two-buttons'
	    };
	    $.extend(true, defaults, options);
	
	    var d = Dialog(defaults);
	
	    // var header = d._$('header');
	    // var title = d._$('title');
	    // title.css('borderBottom', 'none');
	    // header.show();
	
	    d.show();
	    return d;
	};
	
	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var alert = __webpack_require__(36);
	var contactMerchant = function contactMerchant() {
		var $imgPath = $_CONFIG.imgpath;
		alert('', {
			okCls: 'hide',
			content: '<div class="sm-download"><img src="' + $imgPath + '/images/public/ma1.jpg"><p>扫描二维码，下载国美APP联系商家</p></div>'
		});
	};
	
	module.exports = contactMerchant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 取消订单方法
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var confirm = __webpack_require__(64);
	var alert = __webpack_require__(36);
	var toast = __webpack_require__(43).init;
	var tipsMsg = {
	    cancelOrder: '确认要取消订单吗？',
	    cancelFail: '订单取消失败!网络可能出问题了~',
	    canceled: '系统已取消订单'
	};
	
	// 取消订单方法
	var cancelOrder = function cancelOrder(options) {
	    var cancelUrl = options.isPayed ? 'payedCancelOrder' : 'unPayCancelOrder';
	    confirm(tipsMsg.cancelOrder, {
	        title: '操作',
	        width: 500,
	        className: 'pop-box',
	        btnWrapCls: 'text-center',
	        okCls: 'two-button two-button-red',
	        cancelCls: 'two-button',
	        ok: function ok() {
	            fetch.get(url.get(cancelUrl), {
	                data: {
	                    id: options.id
	                }
	            }).done(function (data) {
	                var info = data.data;
	                var status = info.status;
	                var statusDesc = info.statusDesc;
	
	                if (data.success === true) {
	                    options.okFn(statusDesc);
	                    return;
	                }
	
	                // 如果订单已经是取消状态，执行取消的成功操作
	                // 否则弹出失败信息
	                if (status == -1 || status == -6) {
	                    options.okFn(statusDesc);
	                } else if (status != 1 || status != 0) {
	                    toast(tipsMsg.canceled);
	                    setTimeout(function () {
	                        location.reload();
	                    }, 2000);
	                } else {
	                    toast(data.message);
	                }
	            }).fail(function () {
	                alert(tipsMsg.cancelFail);
	            });
	        }
	    });
	};
	
	module.exports = cancelOrder;

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 取消订单
	 * @author Zhengchun Fu
	 */
	var cancelOrder = __webpack_require__(296);
	
	var unPayCancelNode = '[data-action=unPayCancel]';
	var payedCancelNode = '[data-action=payedCancel]';
	var orderStautsNode = '[data-node=orderStauts]';
	
	var $orderList = $('[data-node=orderList]');
	
	// 未付款取消订单
	var unPayCancelOrder = function unPayCancelOrder() {
	    $orderList.on('click', unPayCancelNode, function () {
	        var $this = $(this);
	        var $toPayCount = $('[data-node=dfkNum]');
	        var toPayNum = $toPayCount.data('count');
	        var orderId = $this.data('id');
	
	        if (toPayNum < 1) {
	            return false;
	        }
	
	        cancelOrder({
	            isPayed: false,
	            id: orderId,
	            okFn: function okFn() {
	                location.reload();
	            }
	        });
	    });
	};
	
	// 已付款，待发货取消订单
	var payedCancelOrder = function payedCancelOrder() {
	    $orderList.on('click', payedCancelNode, function () {
	        var $this = $(this);
	        var $toShipCount = $('[data-node=dfhNum]');
	        var toShipNum = $toShipCount.data('count');
	        var orderId = $this.data('id');
	
	        if (toShipNum < 1) {
	            return false;
	        }
	
	        cancelOrder({
	            isPayed: true,
	            id: orderId,
	            okFn: function okFn(desc) {
	                $this.addClass('order-blank-btn-disabled');
	                $this.attr('data-action', 'cancelling');
	                $this.parents('table').find(orderStautsNode).text(desc);
	            }
	        });
	    });
	};
	
	var init = function init() {
	
	    // 未付款取消订单
	    unPayCancelOrder();
	
	    // 待发货取消订单
	    payedCancelOrder();
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/**
	 * 加载更多
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var orderListTpl = __webpack_require__(302);
	
	var loadMoreUrl = 'loadMoreOrder';
	var tipsMsg = {
	    loadFail: '加载失败'
	};
	var curPage = 1;
	var curStatus = parseInt($('[data-node=orderStateNav]').data('status'));
	var pageSize = 15;
	
	var $orderList = $('[data-node=orderList]');
	var $pageMore = $('[data-node=pageMore]');
	var $pageLoading = $('[data-node=pageLoading]');
	var $pageNothing = $('[data-node=pageNothing]');
	var $conf = $_CONFIG;
	
	var loadMore = function loadMore() {
	    $pageMore.on('click', function () {
	        var page = curPage + 1;
	
	        function loadMoreStyle(flag) {
	            if (flag) {
	                $pageMore.hide();
	                $pageLoading.show();
	            } else {
	                $pageLoading.hide();
	                $pageMore.show();
	            }
	        }
	
	        // 改变加载按钮样式
	        loadMoreStyle(true);
	
	        // 请求
	        fetch.get(url.get(loadMoreUrl), {
	            data: {
	                page: page,
	                status: curStatus,
	                pageSize: pageSize
	            }
	        }).done(function (data) {
	            var orders = {};
	
	            function noMore() {
	                $pageMore.hide();
	                $pageLoading.hide();
	                $pageNothing.show();
	            }
	
	            if (data.success === true) {
	                orders.list = data.data.orders;
	                orders.domain = $conf;
	
	                // 加载按钮样式显示控制
	                // 没有更多内容了
	                if (!orders.list.length) {
	                    noMore();
	                    return false;
	                }
	
	                // TODO:加载更多
	                var orderHTML = orderListTpl(orders);
	                $orderList.append(orderHTML);
	                curPage = page;
	
	                // 如果加载的数据少于分页条数，则表示没有更多内容可加载了。
	                if (orders.list.length < pageSize) {
	                    noMore();
	                } else {
	                    loadMoreStyle(false);
	                }
	            } else {
	                alert(tipsMsg.loadFail);
	                loadMoreStyle(false);
	            }
	        }).fail(function () {
	            alert(tipsMsg.loadFail);
	            loadMoreStyle(false);
	        });
	    });
	};
	
	module.exports = loadMore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_orders/loadMore/orderList',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,v=$data.v,$index=$data.$index,$escape=$utils.$escape,vv=$data.vv,i=$data.i,domain=$data.domain,attr=$data.attr,$out='';$each(list,function(v,$index){
	$out+=' <table class="order-prod-info"> <tr> <td colspan="7" class="order-base-nav"> <ul class="clearfix"> <li class="time">';
	$out+=$escape(v.orderTime);
	$out+='</li> <li class="order-number">订单号： ';
	if(v.status == 0){
	$out+=' <a href="javascript:;" class="color-default">';
	$out+=$escape(v.mergerId);
	$out+='</a> ';
	}else{
	$out+=' <a href="javascript:;" class="color-default">';
	$out+=$escape(v.id);
	$out+='</a> ';
	}
	$out+=' </li> </ul> </td> </tr> <tr> <td colspan="4" class="order-l clearfix"> ';
	$each(v.orderItems,function(vv,i){
	$out+=' <div class="order-l-list ';
	if((i+1) == v.orderItems.length){
	$out+='bor-none';
	}
	$out+=' clearfix"> <a target="_blank" href="';
	$out+=$escape(domain.mall_domain);
	$out+='item/';
	$out+=$escape(v.orderItems[0].mshop.id);
	$out+='-';
	$out+=$escape(vv.sku.item.id);
	$out+='.html?skuid=';
	$out+=$escape(vv.sku.id);
	$out+='"> <img src="';
	$out+=$escape(vv.sku.image);
	$out+='" onerror="imgError(this);" class="order-img"> </a> <div class="parameter"> <a target="_blank" href="';
	$out+=$escape(domain.mall_domain);
	$out+='item/';
	$out+=$escape(v.orderItems[0].mshop.id);
	$out+='-';
	$out+=$escape(vv.sku.item.id);
	$out+='.html?skuid=';
	$out+=$escape(vv.sku.id);
	$out+='">';
	$out+=$escape(vv.sku.item.shortName);
	$out+='</a> <p>';
	$each(vv.sku.attributes,function(attr,i){
	$out+=$escape(attr.name);
	$out+='：';
	$out+=$escape(attr.value);
	if(i < vv.sku.attributes.length - 1){
	$out+='&emsp;';
	}
	});
	$out+='</p> </div> <span class="s-price">￥';
	$out+=$escape(vv.sku.price);
	$out+='</span> <span class="count-num">';
	$out+=$escape(vv.quantity);
	$out+='</span> <div class="connect-shop more" data-node="connect-firm" data-rechange=\'{"orderid":';
	$out+=$escape(v.id);
	$out+=',"skuid":';
	$out+=$escape(vv.sku.id);
	$out+=',"goodsid":';
	$out+=$escape(vv.sku.item.id);
	$out+=' }\'> ';
	if(v.status != 0){
	$out+=' ';
	if(v.orderType != 6 && v.orderType != 7){
	$out+=' <a href="javascript:;" data-action="ContactMerchant">联系商家</a> ';
	}else{
	$out+=' <a href="javascript:;" class="gm-gray">联系商家</a> ';
	}
	$out+=' ';
	}
	$out+=' ';
	if(vv.afterSalesFlag){
	$out+=' <a href="';
	$out+=$escape(domain.i_domain);
	$out+='order/showDataInfo?orderid=';
	$out+=$escape(v.id);
	$out+='&skuid=';
	$out+=$escape(vv.sku.id);
	$out+='&goodid=';
	$out+=$escape(vv.sku.item.id);
	$out+='" >申请售后</a> ';
	}
	$out+=' </div> </div> ';
	});
	$out+=' </td> <td class="t-price"><span class="price">￥';
	$out+=$escape(v.paymentAmount);
	$out+='</span> <p class="fare">（含运费：￥';
	$out+=$escape(v.shippingCost);
	$out+='）</p> </td> <td class="trading-status"> <span>';
	$out+=$escape(v.statusDesc);
	$out+='</span> ';
	if(v.status == 0){
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.i_domain);
	$out+='order/detail?id=';
	$out+=$escape(v.mergerId);
	$out+='&type=1">查看详情</a> ';
	}else{
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.i_domain);
	$out+='order/detail?id=';
	$out+=$escape(v.id);
	$out+='">查看详情</a> ';
	}
	$out+='  ';
	if(v.status == 2 || v.status == 3 || v.status == -12 || v.status == -5){
	$out+=' ';
	if(v.orderType != 6 && v.orderType != 7){
	$out+=' ';
	if(v.hasLogistics){
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.i_domain);
	$out+='order/orderParcels?orderId=';
	$out+=$escape(v.id);
	$out+='" >查看包裹</a> ';
	}
	$out+=' ';
	}else{
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.i_domain);
	$out+='order/orderParcels?orderId=';
	$out+=$escape(v.id);
	$out+='" >查看包裹</a> ';
	}
	$out+=' ';
	}
	$out+=' </td> <td class="order-operate"> ';
	if(v.status == 0){
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.order_domain);
	$out+='order/payDetail?mergerId=';
	$out+=$escape(v.mergerId);
	$out+='" class="order-blank-btn order-pay-btn marb14">立即支付</a> <a href="javascript:;" data-action="unPayCancel" class="order-blank-btn" data-id="';
	$out+=$escape(v.mergerId);
	$out+='">取消订单</a> ';
	}else if(v.status == 1){
	$out+=' <a class="order-blank-btn" data-action="payedCancel" href="javascript:;" data-id="';
	$out+=$escape(v.id);
	$out+='" >取消订单</a> ';
	}else if(v.status == -1){
	$out+=' <a class="order-blank-btn order-blank-btn-disabled" data-action="cancelling" href="javascript:;">取消订单</a> ';
	}else if(v.status == 3 && v.hasComment == 0){
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.i_domain);
	$out+='order/showCommentInfo?orderid=';
	$out+=$escape(v.id);
	$out+='" class="order-blank-btn">立即评价</a> ';
	}else if(v.status == -12){
	$out+=' ';
	}else if(v.status == -5){
	$out+=' ';
	}
	$out+=' </td> </tr> </table> ';
	});
	return new String($out);
	});

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var contactMerchant = __webpack_require__(294);
	var init = function init() {
		var $orderList = $('[data-node=orderList]');
		var contactMerchantNode = '[data-action=ContactMerchant]';
		$orderList.on('click', contactMerchantNode, function () {
			contactMerchant();
		});
	};
	
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })

});
//# sourceMappingURL=uc_orders.js.map