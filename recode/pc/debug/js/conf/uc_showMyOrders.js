webpackJsonp([43],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';
	
	/**
	 * 晒单
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var listHeadTpl = __webpack_require__(317);
	var noOrderTpl = __webpack_require__(318);
	var orderListTpl = __webpack_require__(319);
	
	// // tmod helpers
	__webpack_require__(320)();
	__webpack_require__(321)();
	
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
	
	var init = function init() {
	
	    // load the first page
	    fetch.get(url.get(getShowMyOrdersUrl), {
	        data: {
	            pageNum: curPage,
	            pageSize: pageSize
	        }
	    }).done(function (data) {
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
	    }).fail(function () {
	        $orderList.html(noOrderHTML);
	    });
	};
	
	var submitToShowGoods = function submitToShowGoods() {
	    $orderList.on('click', '[data-action=showGoods]', function () {
	        var $itemJson = $(this).siblings('input[type=hidden]').clone();
	        var $objForm = $('[data-node=showGoodsForm]');
	        $objForm.append($itemJson);
	        $objForm.submit();
	    });
	};
	
	var loadMoreStyle = function loadMoreStyle(flag) {
	    if (flag) {
	        $pageMore.hide();
	        $pageLoading.show();
	    } else {
	        $pageLoading.hide();
	        $pageMore.show();
	    }
	};
	
	var noMore = function noMore() {
	    $pageMore.hide();
	    $pageLoading.hide();
	    $pageNothing.show();
	};
	
	var loadMore = function loadMore() {
	    $pageMore.on('click', function () {
	        var page = curPage + 1;
	
	        // 改变加载按钮样式
	        loadMoreStyle(true);
	
	        // 请求
	        fetch.get(url.get(getShowMyOrdersUrl), {
	            data: {
	                pageNum: page,
	                pageSize: pageSize
	            }
	        }).done(function (data) {
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
	        }).fail(function () {
	            alert(tipsMsg.loadFail);
	            loadMoreStyle(false);
	        });
	    });
	};
	
	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

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

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_showMyOrders/listHead',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,group_domain=$data.group_domain,$out='';$out+='<table class="order-prod-nav"> <tbody> <tr class="order-prod-nav-bg"> <th class="order-base-nav order-comment-nav"> <div class="prod-info">商品信息</div> </th> <th class="sin-price">单价（元）</th> <th class="count">状态</th> <th class="prod-opr">操作</th> </tr> </tbody> </table> <form data-node="showGoodsForm" class="hide" target="_blank" method="post" action="';
	$out+=$escape(group_domain);
	$out+='topic/publiser"></form>';
	return new String($out);
	});

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_showMyOrders/noOrder',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,mall_domain=$data.mall_domain,$out='';$out+='<div class="no-order"><em class="iconn-63"></em> <p>亲，您还没有订单，赶快 <a href="';
	$out+=$escape(mall_domain);
	$out+='search">去逛逛 </a>吧</p> </div>';
	return new String($out);
	});

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_showMyOrders/orderList',function($data,$filename
	/*``*/) {
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

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * substrLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(34);
	var substrLen = function substrLen(str, len) {
		if (typeof len !== 'number') {
			len = 24;
		}
		if (str.length > len) {
			return str.substr(0, len) + '...';
		}
		return str;
	};
	
	module.exports = function () {
		tmod.helper('substrLen', substrLen);
	};

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * strf  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(34);
	var strf = function strf(data) {
	  return JSON.stringify(data);
	};
	
	module.exports = function () {
	  tmod.helper('strf', strf);
	};

/***/ })

});
//# sourceMappingURL=uc_showMyOrders.js.map