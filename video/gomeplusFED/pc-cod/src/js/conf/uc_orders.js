webpackJsonp([38],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 个人中心我的订单
	 * @author Zhengchun Fu
	 */

	// 取消订单
	__webpack_require__(258).init();

	// 加载更多
	__webpack_require__(259)();

	// 收货操作：确认收货，延迟收货
	__webpack_require__(261).init();

	// 联系商家
	__webpack_require__(263).init();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('uc_orders');

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

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 取消订单
	 * @author Zhengchun Fu
	 */
	var confirm = __webpack_require__(53);
	var bubble = __webpack_require__(253);
	var cancelOrder = __webpack_require__(254);

	var tipsMsg = {
		cancelling: '取消订单处理中'
	};

	var unPayCancelNode = '[data-action=unPayCancel]';
	var payedCancelNode = '[data-action=payedCancel]';
	var cancellingNode = '[data-action=cancelling]';
	var orderStautsNode = '[data-node=orderStauts]';
	var $statusNav = $('[data-node=orderStateNav]');
	var status = $statusNav.data('status');

	var $orderList = $('[data-node=orderList]');
	var maxValue = 9;

	// 未付款取消订单
	var unPayCancelOrder = function() {
		$orderList.on('click', unPayCancelNode, function() {
			var $this = $(this);
			var $toPayCount = $('[data-node=dfkNum]');
			var toPayNum = $toPayCount.data('count');
			var newCount = 0;
			var orderId = $this.data('id');

			if (toPayNum < 1) {
				return false;
			}

			cancelOrder({
				isPayed: false,
				id: orderId,
				okFn: function(desc) {
					location.reload();
				}
			});
		});
	};

	// 已付款，待发货取消订单
	var payedCancelOrder = function() {
		$orderList.on('click', payedCancelNode, function() {
			var $this = $(this);
			var $toShipCount = $('[data-node=dfhNum]');
			var toShipNum = $toShipCount.data('count');
			var newCount = 0;
			var orderId = $this.data('id');

			if (toShipNum < 1) {
				return false;
			}

			cancelOrder({
				isPayed: true,
				id: orderId,
				okFn: function(desc) {
					$this.addClass('order-blank-btn-disabled');
					$this.attr('data-action', 'cancelling');
					$this.parents('table').find(orderStautsNode).text(desc);
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

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * 加载更多
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(36);
	var orderListTpl = __webpack_require__(260);

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

	var loadMore = function() {
		$pageMore.on('click', function() {
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
			}).done(function(data) {
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
			}).fail(function(data) {
				alert(tipsMsg.loadFail);
				loadMoreStyle(false);
			});
		});
	};

	module.exports = loadMore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_orders/loadMore/orderList',function($data,$filename
	/**/) {
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
	$out+=' </li> ';
	if(v.status == 0){
	$out+=' <li class="color-default"><em class="icon icon-platform">&#xe9df;</em> <a href="javascript:;">国美+购物平台</a> </li> ';
	}
	$out+=' </ul> </td> </tr> <tr> <td colspan="4" class="order-l clearfix"> ';
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
	$out+=' }\'> <a href="javascript:;" data-action="ContactMerchant">联系商家</a> ';
	if(vv.returnGoodsForSevenDays){
	$out+=' <a href="';
	$out+=$escape(domain.i_domain);
	$out+='order/showDataInfo?orderid=';
	$out+=$escape(v.id);
	$out+='&skuid=';
	$out+=$escape(vv.sku.id);
	$out+='&optype=1&goodid=';
	$out+=$escape(vv.sku.item.id);
	$out+='" >退货</a> ';
	}
	$out+=' ';
	if(vv.changeGoodsForFifteenDays){
	$out+=' <a href="';
	$out+=$escape(domain.i_domain);
	$out+='order/showDataInfo?orderid=';
	$out+=$escape(v.id);
	$out+='&skuid=';
	$out+=$escape(vv.sku.id);
	$out+='&optype=2&goodid=';
	$out+=$escape(vv.sku.item.id);
	$out+='" >换货</a> ';
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
	if(v.hasLogistics){
	$out+=' <a target="_blank" href="';
	$out+=$escape(domain.i_domain);
	$out+='order/orderLogistics?orderId=';
	$out+=$escape(v.id);
	$out+='&statu=';
	$out+=$escape(v.status);
	$out+='" >查看物流</a> ';
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
	}else if(v.status == 2){
	$out+=' <a href="javascript:;" data-action="confirmReceipt" class="order-blank-btn marb14" data-id="';
	$out+=$escape(v.id);
	$out+='" >确认收货</a> ';
	if(v.allowDelayConfirm == 1){
	$out+=' <a href="javascript:;" data-action="delayReceipt" class="order-blank-btn" data-id="';
	$out+=$escape(v.id);
	$out+='">延迟收货</a> ';
	}
	$out+=' ';
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

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * 确认收货
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var confirm = __webpack_require__(53);
	var alert = __webpack_require__(36);
	var toast = __webpack_require__(84).init;
	var bubble = __webpack_require__(253);
	var receiptGoods = __webpack_require__(256);

	var returnChangeTpl = __webpack_require__(262);

	var confirmReceiptNode = '[data-action=confirmReceipt]';
	var delayReceiptNode = '[data-action=delayReceipt]';
	var orderStautsNode = '[data-node=orderStauts]';
	var $statusNav = $('[data-node=orderStateNav]');
	var status = $statusNav.data('status');

	var $orderList = $('[data-node=orderList]');
	var $conf = $_CONFIG;
	var maxValue = 9;

	// 添加退换货按钮
	var setReturnAndChangeBtn = function($p) {
		var $firms = $p.find('[data-node=connect-firm]');
		$.each($firms, function(k, v) {
			var $v = $(v);
			var data = $v.data('rechange');
			var html = '';
			data.i_domain = $conf.i_domain;
			html = returnChangeTpl(data);
			$v.append($(html));
		});
	};

	// 确认收货
	var confirmReceipt = function() {
		$orderList.on('click', confirmReceiptNode, function() {
			var $this = $(this);
			var $toReceipt = $('[data-node=dshNum]');
			var toReceiptNum = $toReceipt.data('count');
			var $toReviews = $('[data-node=dpjNum]');
			var toReviewsNum = $toReviews.data('count');
			var newReviewsCount = 0;
			var newCount = 0;
			var orderId = $this.data('id');

			if (toReceiptNum < 1) {
				return false;
			}

			receiptGoods.confirmReceipt({
				id: orderId,
				okFn: function(desc) {
					var $parents = $this.parents('table');
					if (status) {
						location.reload();
					} else {

						// 添加退换货按钮
						setReturnAndChangeBtn($parents);

						$parents.find(orderStautsNode).text(desc); // 交易成功
						$this.parent().html('<a href="' + $conf.i_domain + 'order/showCommentInfo?orderid=' + orderId + '" class="order-blank-btn">立即评价</a>');
						newCount = toReceiptNum - 1;
						newReviewsCount = toReviewsNum + 1;
						$toReceipt.data('count', newCount);
						$toReviews.data('count', newReviewsCount);
						if (newCount <= maxValue) {
							$toReceipt.text(newCount || '');
						}
						if (newReviewsCount > maxValue) {
							$toReviews.text(maxValue + '+');
						} else {
							$toReviews.text(newReviewsCount);
						}

					}
				}
			});

		});
	};

	// 延迟收货
	var delayReceipt = function() {
		$orderList.on('click', delayReceiptNode, function() {
			var disabledCls = 'order-blank-btn-disabled';
			var $this = $(this);
			var orderId = $this.data('id');
			var isDisabled = $this.hasClass(disabledCls);
			if (isDisabled) {
				return false;
			}
			receiptGoods.delayReceipt({
				id: orderId,
				okFn: function() {
					toast('操作成功');
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_orders/confirmReceipt/returnChange',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,i_domain=$data.i_domain,orderid=$data.orderid,skuid=$data.skuid,goodsid=$data.goodsid,$out='';$out+='<a href="';
	$out+=$escape(i_domain);
	$out+='order/showDataInfo?orderid=';
	$out+=$escape(orderid);
	$out+='&skuid=';
	$out+=$escape(skuid);
	$out+='&optype=1&goodid=';
	$out+=$escape(goodsid);
	$out+='" >退货</a> <a href="';
	$out+=$escape(i_domain);
	$out+='order/showDataInfo?orderid=';
	$out+=$escape(orderid);
	$out+='&skuid=';
	$out+=$escape(skuid);
	$out+='&optype=2&goodid=';
	$out+=$escape(goodsid);
	$out+='" >换货</a>';
	return new String($out);
	});

/***/ },

/***/ 263:
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