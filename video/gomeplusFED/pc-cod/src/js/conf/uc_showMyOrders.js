webpackJsonp([42],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {/**
	 * 晒单
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(36);
	var listHeadTpl = __webpack_require__(274);
	var noOrderTpl = __webpack_require__(275);
	var orderListTpl = __webpack_require__(276);

	// // tmod helpers
	__webpack_require__(85)();
	__webpack_require__(277)();

	var getShowMyOrdersUrl = 'showMyOrders';
	var curPage = 1;
	var pageSize = 15;
	var $conf = $_CONFIG;
	var tipsMsg = {
		loadFail: '加载失败'
	};
	var noOrderHTML = noOrderTpl($conf);

	var $orderList = $('[data-node=orderList]');
	var $loadMore = $('[data-node=pageLoadBtn]');
	var $pageMore = $('[data-node=pageMore]');
	var $pageLoading = $('[data-node=pageLoading]');
	var $pageNothing = $('[data-node=pageNothing]');

	var init = function() {

		// load the first page
		fetch.get(url.get(getShowMyOrdersUrl), {
			data: {
				pageNum: curPage,
				pageSize: pageSize
			}
		}).done(function(data) {
			var orders = {};
			var orderItemLength = 0;

			if (data.success === true) {
				orders.list = data.data.shareOrderItems;
				orders.domain = $conf;
				orderItemLength = orders.list.length;

				if (orderItemLength === 0) {
					$orderList.html(noOrderHTML);
					return false;
				}

				// add list head
				$orderList.html(listHeadTpl($conf));

				// render list
				var listHTML = orderListTpl(orders);
				$orderList.append(listHTML);

				// show the load more button
				$loadMore.show();
				if (orderItemLength >= pageSize) {

					// bind event for load more
					loadMore();
				} else {
					noMore();
				}

				// show my order goods
				submitToShowGoods();

			} else {
				$orderList.html(noOrderHTML);
			}
		}).fail(function(data) {
			$orderList.html(noOrderHTML);
		});
	};

	var submitToShowGoods = function() {
		$orderList.on('click', '[data-action=showGoods]', function() {
			var $itemJson = $(this).siblings('input[type=hidden]').clone();
			var $objForm = $('[data-node=showGoodsForm]');
			$objForm.append($itemJson);
			$objForm.submit();
		});
	};

	var loadMoreStyle = function(flag) {
		if (flag) {
			$pageMore.hide();
			$pageLoading.show();
		} else {
			$pageLoading.hide();
			$pageMore.show();
		}
	};

	var noMore = function() {
		$pageMore.hide();
		$pageLoading.hide();
		$pageNothing.show();
	};

	var loadMore = function() {
		$pageMore.on('click', function() {
			var page = curPage + 1;

			// 改变加载按钮样式
			loadMoreStyle(true);

			// 请求
			fetch.get(url.get(getShowMyOrdersUrl), {
				data: {
					pageNum: page,
					pageSize: pageSize
				}
			}).done(function(data) {
				var orders = {};

				if (data.success === true) {
					orders.list = data.data.shareOrderItems;
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

					// show my order goods
					submitToShowGoods();

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

	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * substrLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var substrLen = function(str, len) {
		if (typeof len !== 'number') {
			len = 24;
		}
		if (str.length > len) {
			return str.substr(0, len) + '...';
		}
		return str;
	};

	module.exports = function() {
		tmod.helper('substrLen', substrLen);
	};

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_showMyOrders/listHead',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,group_domain=$data.group_domain,$out='';$out+='<table class="order-prod-nav"> <tbody> <tr class="order-prod-nav-bg"> <th class="order-base-nav order-comment-nav"> <div class="prod-info">商品信息</div> </th> <th class="sin-price">单价（元）</th> <th class="count">状态</th> <th class="prod-opr">操作</th> </tr> </tbody> </table> <form data-node="showGoodsForm" class="hide" target="_blank" method="post" action="';
	$out+=$escape(group_domain);
	$out+='topic/publiser"></form>';
	return new String($out);
	});

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_showMyOrders/noOrder',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,mall_domain=$data.mall_domain,$out='';$out+='<div class="no-order"><em class="icon icon-order">&#xe96c;</em> <p>亲，您还没有订单，赶快 <a href="';
	$out+=$escape(mall_domain);
	$out+='search">去逛逛 </a>吧</p> </div>';
	return new String($out);
	});

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_showMyOrders/orderList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,v=$data.v,$index=$data.$index,$escape=$utils.$escape,domain=$data.domain,$out='';$each(list,function(v,$index){
	$out+=' <table class="order-prod-info"> <tbody> <tr> <td colspan="7" class="order-base-nav"> <ul class="clearfix"> <li class="order-number">订单号：<a href="javascript:;" class="color-default">';
	$out+=$escape(v.orderId);
	$out+='</a></li> </ul> </td> </tr> <tr> <td colspan="4" class="order-l clearfix"> <div class="order-l-list bor-none clearfix"><a target="_blank" href="';
	$out+=$escape(domain.mall_domain);
	$out+='item/';
	$out+=$escape(v.shopId);
	$out+='-';
	$out+=$escape(v.sku.item.id);
	$out+='.html?skuid=';
	$out+=$escape(v.sku.id);
	$out+='"><img onerror="imgError(this);" src="';
	$out+=$escape(v.sku.image);
	$out+='" class="order-img"></a> <div class="parameter"><a target="_blank" href="';
	$out+=$escape(domain.mall_domain);
	$out+='item/';
	$out+=$escape(v.shopId);
	$out+='-';
	$out+=$escape(v.sku.item.id);
	$out+='.html?skuid=';
	$out+=$escape(v.sku.id);
	$out+='">';
	$out+=$escape($helpers. substrLen(v.sku.item.name , 24));
	$out+='</a></div> </div> </td> <td class="t-price"><span class="price">￥';
	$out+=$escape(v.sku.price);
	$out+='</span></td> <td class="trading-status"><span class="mb0 font-grey-6">';
	if(v.hasComment){
	$out+='已评价';
	}else{
	$out+='---';
	}
	$out+='</span></td> <td class="order-operate"> <input type="hidden" name="itemJson" value="';
	$out+=$escape($helpers. strf(v ));
	$out+='"> <a href="javascript:;" data-action="showGoods" class="order-blank-btn order-pay-btn">晒商品</a> </td> </tr> </tbody> </table> ';
	});
	return new String($out);
	});

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * strf  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var strf = function(data) {
		return JSON.stringify(data);
	};

	module.exports = function() {
		tmod.helper('strf', strf);
	};

/***/ }

});