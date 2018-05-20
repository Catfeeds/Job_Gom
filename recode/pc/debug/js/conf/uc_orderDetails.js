webpackJsonp([37],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 个人中心——订单详情
	 * @author Zhengchun Fu
	 */
	
	// 取消订单
	__webpack_require__(295).init();
	
	// 收货操作:确认收货，延迟收货
	__webpack_require__(297).init();
	
	// 联系商家
	__webpack_require__(299).init();

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

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 个人中心订单详情页
	 * @author Zhengchun Fu
	 */
	var cancelOrder = __webpack_require__(296);
	
	var unPayCancelNode = '[data-action=unPayCancel]';
	var payedCancelNode = '[data-action=payedCancel]';
	var orderStautsNode = '[data-node=orderStauts]';
	
	var $orderDetail = $('[data-node=orderDetail]');
	var $orderStauts = $(orderStautsNode);
	
	// 未付款取消订单
	var unPayCancelOrder = function unPayCancelOrder() {
	    $orderDetail.on('click', unPayCancelNode, function () {
	        var $this = $(this);
	        var orderId = $this.data('id');
	        cancelOrder({
	            isPayed: false,
	            id: orderId,
	            okFn: function okFn(desc) {
	                $this.parent().empty();
	                $orderStauts.text(desc);
	            }
	        });
	    });
	};
	
	// 已付款，待发货取消订单
	var payedCancelOrder = function payedCancelOrder() {
	    $orderDetail.on('click', payedCancelNode, function () {
	        var $this = $(this);
	        var orderId = $this.data('id');
	
	        cancelOrder({
	            isPayed: true,
	            id: orderId,
	            okFn: function okFn(desc) {
	                $this.addClass('order-blank-btn-disabled');
	                $this.attr('data-action', 'cancelling');
	                $orderStauts.text(desc);
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

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 订单详情页收货操作
	 * @author Zhengchun Fu
	 */
	var toast = __webpack_require__(43).init;
	var receiptGoods = __webpack_require__(298);
	
	var confirmReceiptNode = '[data-action=confirmReceipt]';
	var delayReceiptNode = '[data-action=delayReceipt]';
	
	var $orderDetail = $('[data-node=orderDetail]');
	
	// 确认收货
	var confirmReceipt = function confirmReceipt() {
	    $orderDetail.on('click', confirmReceiptNode, function () {
	        var $this = $(this);
	        var orderId = $this.data('id');
	        receiptGoods.confirmReceipt({
	            id: orderId,
	            okFn: function okFn() {
	                location.reload();
	            }
	        });
	    });
	};
	
	// 延迟收货
	var delayReceipt = function delayReceipt() {
	    $orderDetail.on('click', delayReceiptNode, function () {
	        var disabledCls = 'order-blank-btn-disabled';
	        var $this = $(this);
	        var orderId = $this.data('id');
	        if ($this.hasClass(disabledCls)) {
	            return false;
	        }
	        receiptGoods.delayReceipt({
	            id: orderId,
	            okFn: function okFn() {
	                var $time = $('[data-node=time]');
	                var time = $time.data('time').split('-');
	                var day = parseInt(time[0]) + 7;
	                var hour = time[1];
	                var min = time[2];
	                toast('操作成功');
	                $time.data('time', day + '-' + hour + '-' + min);
	                $time.text(day + '天' + hour + '时' + min + '分');
	                $this.remove();
	            }
	        });
	    });
	};
	
	var init = function init() {
	    confirmReceipt();
	    delayReceipt();
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * 确认收货方法
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var confirm = __webpack_require__(64);
	var toast = __webpack_require__(43).init;
	var tipsMsg = {
	    confirmReceipt: '确认已收到货了吗？',
	    confirmFail: '确认收货失败!网络可能出问题了~',
	    delayReceipt: '确认延长7天收货时间吗？',
	    delayFail: '延迟收货失败！网络可能出问题了~',
	    confirmed: '已经确认收货'
	};
	
	// 确认收货
	var confirmReceipt = function confirmReceipt(options) {
	    confirm(tipsMsg.confirmReceipt, {
	        title: '确认收货',
	        width: 500,
	        className: 'pop-box',
	        btnWrapCls: 'text-center',
	        okCls: 'two-button two-button-red',
	        cancelCls: 'two-button',
	        ok: function ok() {
	            fetch.post(url.get('confirmReceipt'), {
	                data: {
	                    orderId: options.orderId,
	                    orderDeliveryId: options.postId
	                }
	            }).done(function (data) {
	                var info = data.data;
	                var status = info.status;
	                var statusDesc = '交易成功';
	
	                if (data.success === true) {
	                    options.okFn(statusDesc);
	                    return;
	                }
	
	                // 如果订单已经是待评价，执行确认收货的成功操作
	                // 否则弹出失败信息
	                if (status == 3) {
	                    toast(tipsMsg.confirmed);
	                    options.okFn(statusDesc);
	                } else {
	                    toast(data.message);
	                }
	            }).fail(function () {
	                toast(tipsMsg.confirmFail);
	            });
	        }
	    });
	};
	
	var delayReceipt = function delayReceipt(options) {
	    confirm(tipsMsg.delayReceipt, {
	        title: '延迟收货',
	        width: 500,
	        className: 'pop-box',
	        btnWrapCls: 'text-center',
	        okCls: 'two-button two-button-red',
	        cancelCls: 'two-button',
	        ok: function ok() {
	            fetch.post(url.get('delayReceipt'), {
	                data: {
	                    orderId: options.id
	                }
	            }).done(function (data) {
	
	                if (data.success === true) {
	                    options.okFn();
	                } else {
	                    toast(data.message);
	                    setTimeout(function () {
	                        location.reload();
	                    }, 2000);
	                }
	            }).fail(function () {
	                toast(tipsMsg.delayFail);
	            });
	        }
	    });
	};
	
	module.exports = {
	    confirmReceipt: confirmReceipt,
	    delayReceipt: delayReceipt
	};

/***/ }),

/***/ 299:
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
//# sourceMappingURL=uc_orderDetails.js.map