webpackJsonp([37],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 个人中心——订单详情
	 * @author Zhengchun Fu
	 */

	// 取消订单
	__webpack_require__(252).init();

	// 收货操作:确认收货，延迟收货
	__webpack_require__(255).init();

	// 联系商家
	__webpack_require__(257).init();

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(22);
	var noop = function() {};

	var create = function(content, options) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */



	var $publicMask;
	var $publicTips;
	var timer;


	var events = function() {

	    $publicMask.off().on('click', function() {
	        $publicMask.hide();
	        $publicTips.hide();
	    });

	    $publicTips.off().on('click', function() {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	}


	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function() {}
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

	    timer = setTimeout(function() {

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

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var confirm = __webpack_require__(53);
	var alert = __webpack_require__(36);
	var contactMerchant = function() {
		var $imgPath = $_CONFIG.imgpath;
		alert('', {
			okCls: 'hide',
			content: '<div class="sm-download"><img src="' + $imgPath + '/images/public/ma1.jpg"><p>描二维码，下载国美+APP联系商家</p></div>'
		});
	};

	module.exports = contactMerchant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 个人中心订单详情页
	 * @author Zhengchun Fu
	 */
	var confirm = __webpack_require__(53);
	var bubble = __webpack_require__(253);
	var cancelOrder = __webpack_require__(254);

	var tipsMsg = {
		cancelOrder: '确认要取消订单吗？',
		cancelling: '取消订单处理中'
	};

	var unPayCancelNode = '[data-action=unPayCancel]';
	var payedCancelNode = '[data-action=payedCancel]';
	var cancellingNode = '[data-action=cancelling]';
	var orderStautsNode = '[data-node=orderStauts]';

	var $orderDetail = $('[data-node=orderDetail]');
	var $orderStauts = $(orderStautsNode);

	// 未付款取消订单
	var unPayCancelOrder = function() {
		$orderDetail.on('click', unPayCancelNode, function() {
			var $this = $(this);
			var orderId = $this.data('id');
			cancelOrder({
				isPayed: false,
				id: orderId,
				okFn: function(desc) {
					$this.parent().empty();
					$orderStauts.text(desc);
				}
			});
		});
	};

	// 已付款，待发货取消订单
	var payedCancelOrder = function() {
		$orderDetail.on('click', payedCancelNode, function() {
			var $this = $(this);
			var orderId = $this.data('id');

			cancelOrder({
				isPayed: true,
				id: orderId,
				okFn: function(desc) {
					$this.addClass('order-blank-btn-disabled');
					$this.attr('data-action', 'cancelling');
					$orderStauts.text(desc);
				}
			});
		});
	};

	var init = function() {

		// 未付款取消订单
		unPayCancelOrder();

		// 待发货取消订单
		payedCancelOrder();

	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 气泡提示
	 * @author Zhengchun Fu
	 * @param  {object} data 气泡提示参数；
	 * {
	 * 		msg:提示文字信息，
	 * 		x:定位坐标left, 
	 * 		y:定位坐标top,
	 * 		delay:多少毫秒后消失
	 * }
	 * @return null
	 */
	var bubble = function(data) {
		var msg = typeof data.msg === 'string' ? data.msg : '';
		var x = data.x || 0;
		var y = data.y || 0;
		var delay = data.delay || 2000;
		var popWidth = 0;
		var popHeight = 0;

		var $tpl = $('<div class="small-mask" style="position:absolute;z-index:999;">' + msg + '</div>');

		if (msg === '') {
			return false;
		}

		$('body').append($tpl);
		popWidth = parseFloat($tpl.outerWidth());
		popHeight = parseFloat($tpl.outerHeight());
		$tpl.css({
			left: x - popWidth,
			top: y - popHeight - 10,
			right: 'auto'
		});
		$tpl.timer = setTimeout(function() {
			$tpl.stop().animate({
				opacity: 0
			}, 200, function() {
				clearTimeout($tpl.timer);
				$tpl.remove();
			});
		}, delay);
	};

	module.exports = bubble;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 取消订单方法
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var confirm = __webpack_require__(53);
	var alert = __webpack_require__(36);
	var toast = __webpack_require__(84).init;
	var tipsMsg = {
		cancelOrder: '确认要取消订单吗？',
		cancelFail: '订单取消失败!网络可能出问题了~',
		canceled: '系统已取消订单'
	};

	// 取消订单方法
	var cancelOrder = function(options) {
		var cancelUrl = options.isPayed ? 'payedCancelOrder' : 'unPayCancelOrder';
		confirm(tipsMsg.cancelOrder, {
			title: '操作',
			width: 500,
			className: 'pop-box',
			btnWrapCls: 'text-center',
			okCls: 'two-button two-button-red',
			cancelCls: 'two-button',
			ok: function() {
				fetch.get(url.get(cancelUrl), {
					data: {
						id: options.id
					}
				}).done(function(data) {
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
						setTimeout(function() {
							location.reload();
						}, 2000);
					} else {
						toast(data.message);
					}

				}).fail(function(data) {
					alert(tipsMsg.cancelFail);
				});
			}
		});
	};

	module.exports = cancelOrder;

/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 订单详情页收货操作
	 * @author Zhengchun Fu
	 */
	var confirm = __webpack_require__(53);
	var alert = __webpack_require__(36);
	var toast = __webpack_require__(84).init;
	var bubble = __webpack_require__(253);
	var receiptGoods = __webpack_require__(256);

	var confirmReceiptNode = '[data-action=confirmReceipt]';
	var delayReceiptNode = '[data-action=delayReceipt]';
	var orderStautsNode = '[data-node=orderStauts]';

	var $orderDetail = $('[data-node=orderDetail]');
	var $orderStauts = $(orderStautsNode);

	// 确认收货
	var confirmReceipt = function() {
		$orderDetail.on('click', confirmReceiptNode, function() {
			var $this = $(this);
			var orderId = $this.data('id');
			receiptGoods.confirmReceipt({
				id: orderId,
				okFn: function() {
					location.reload();
				}
			});
		});
	};

	// 延迟收货
	var delayReceipt = function() {
		$orderDetail.on('click', delayReceiptNode, function() {
			var disabledCls = 'order-blank-btn-disabled';
			var $this = $(this);
			var orderId = $this.data('id');
			if ($this.hasClass(disabledCls)) {
				return false;
			}
			receiptGoods.delayReceipt({
				id: orderId,
				okFn: function() {
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

	var init = function() {
		confirmReceipt();
		delayReceipt();
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 确认收货方法
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var confirm = __webpack_require__(53);
	var toast = __webpack_require__(84).init;
	var tipsMsg = {
		confirmReceipt: '确认已收到货了吗？',
		confirmFail: '确认收货失败!网络可能出问题了~',
		delayReceipt: '确认延长7天收货时间吗？',
		delayFail: '延迟收货失败！网络可能出问题了~',
		confirmed: '已经确认收货'
	};

	// 确认收货
	var confirmReceipt = function(options) {
		confirm(tipsMsg.confirmReceipt, {
			title: '确认收货',
			width: 500,
			className: 'pop-box',
			btnWrapCls: 'text-center',
			okCls: 'two-button two-button-red',
			cancelCls: 'two-button',
			ok: function() {
				fetch.post(url.get('confirmReceipt'), {
					data: {
						orderId: options.id
					}
				}).done(function(data) {
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

				}).fail(function(data) {
					toast(tipsMsg.confirmFail);
				});
			}
		});
	};

	var delayReceipt = function(options) {
		confirm(tipsMsg.delayReceipt, {
			title: '延迟收货',
			width: 500,
			className: 'pop-box',
			btnWrapCls: 'text-center',
			okCls: 'two-button two-button-red',
			cancelCls: 'two-button',
			ok: function() {
				fetch.post(url.get('delayReceipt'), {
					data: {
						orderId: options.id
					}
				}).done(function(data) {
					var status = data.data.status;

					if (data.success === true) {
						options.okFn();
					} else {
						toast(data.message);
						setTimeout(function() {
							location.reload();
						}, 2000);
					}

				}).fail(function(data) {
					toast(tipsMsg.delayFail);
				});
			}
		});
	};

	module.exports = {
		confirmReceipt: confirmReceipt,
		delayReceipt: delayReceipt
	};

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var contactMerchant = __webpack_require__(251);
	var init = function() {
		var $orderList = $('[data-node=orderList]');
		var contactMerchantNode = '[data-action=ContactMerchant]';
		$orderList.on('click', contactMerchantNode, function() {
			contactMerchant();
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});