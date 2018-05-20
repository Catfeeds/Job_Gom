webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * @author 	Zhengchun Fu
	 * @date 	2016/7/23
	 */
	var hasGoods = !!$('[data-node=submitBar]').length;
	if (hasGoods) {
		// 店铺领券
		__webpack_require__(64).init();

		// 选择商品
		__webpack_require__(67).init();

		// 商品数量加减修改，价格联动
		__webpack_require__(70).init();

		// 删除商品
		__webpack_require__(72).init();

		// 展示更多失效商品
		__webpack_require__(76).init();

		// 购物车提交结算
		__webpack_require__(75).init();
	}

	// 我的收藏
	__webpack_require__(77).init();

	// 推荐商品
	__webpack_require__(86).init();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('shoppingCart');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
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
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
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
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 领券部分
	 * @return null
	 */

	var alert = __webpack_require__(36);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var redPackListTpl = __webpack_require__(65);
	var dateFormat = __webpack_require__(66);

	var tipsMsg = {
		success: '领取成功',
		loadFail: '加载失败。。。'
	};

	// 节点变量
	var ticketsNode = '[data-node=tickets]';
	var showTicketsNode = '[data-action=showTickets]';
	var redPackListNode = '[data-node=redPackList]';

	// load tickets list
	function loadTicketsList() {
		$(showTicketsNode).on('click', function(e) {
			e.stopPropagation();
			var $position = $(this).position();
			var left = $position.left - 80;
			var $thisTicketsBox = $(this).parents('td').find(ticketsNode);
			$thisTicketsBox.css({
				left: left
			}).show();

			$(this).parents('table').siblings('table').find(ticketsNode).hide();

			var shopId = $(this).data('shopid');
			var failTipsHtml = '<li>' + tipsMsg.loadFail + '</li>';
			var $thisTicketsList = $thisTicketsBox.find(redPackListNode);

			// 渲染店铺券列表
			fetch.get(url.get('cartGetRedPacketList'), {
				data: {
					shopId: shopId
				}
			}).done(function(data, textStatus, jqXHR) {
				if (data.success === true) {
					var redPackList = data.data.coupons;
					var list = [];
					$.each(redPackList, function(k, v) {
						var rpList = {};
						rpList.id = v.batchSn;
						rpList.money = Math.floor(v.money / 100);
						rpList.baseMoney = v.usageRule.minAmount / 100;
						rpList.bTime = dateFormat(v.effectiveStartTime, 'Y.M.D');
						rpList.eTime = dateFormat(v.effectiveEndTime, 'Y.M.D');
						list.push(rpList);
					});
					var html = redPackListTpl({
						redPackList: list
					});
					$thisTicketsList.html(html);
				} else {
					$thisTicketsList.html(failTipsHtml);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				$thisTicketsBox.find(redPackListNode).html(failTipsHtml);
			});
		});
	}

	// getTickets
	function getTickets() {
		var gotTicket = true;
		$(ticketsNode).on('click', '[data-action=getTicket]', function(e) {
			e.preventDefault();
			var ticketSn = $(this).data('ticketid');
			var shopID = $(this).data('shopId');
			var $this = $(this);

			if (gotTicket) {
				gotTicket = false;
				fetch.post(url.get('cartGetRedPacket'), {
					data: {
						batchSn: ticketSn
					}
				}).done(function(data, textStatus, jqXHR) {
					var options = {
						cancelCls: 'hide',
						ok: function() {
							gotTicket = true;
						},
						cancel: function() {
							gotTicket = true;
						}
					};

					if (data.success === true) {
						alert(tipsMsg.success, options);
					} else {
						alert(data.message, options);
					}
				}).fail(function(data) {
					alert('领取失败，可能网络出现了问题~');
				});
			}

		});
	}

	function init() {

		// 显示领券
		$(ticketsNode).on('click', function(e) {
			e.stopPropagation();
		});

		loadTicketsList();

		// 隐藏领券
		$('[data-action=close]').on('click', function() {
			$(this).parents(ticketsNode).hide();
		});

		// 点击领券
		getTickets();
	}

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/cart/tickets/tickets',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,redPackList=$data.redPackList,v=$data.v,$index=$data.$index,$escape=$utils.$escape,$out='';$each(redPackList,function(v,$index){
	$out+=' <li class="padd-bon20"> <div class="ticket-mn">￥<strong>';
	$out+=$escape(v.money);
	$out+='</strong></div> <div class="ticket-tip volume-margin8"> <p>满';
	$out+=$escape(v.baseMoney);
	$out+='元可用</p><span>';
	$out+=$escape(v.bTime);
	$out+=' - ';
	$out+=$escape(v.eTime);
	$out+='</span> </div><a data-action="getTicket" data-ticketid="';
	$out+=$escape(v.id);
	$out+='" href="javascript:;" class="btn-ticket">领取</a> </li> ';
	});
	return new String($out);
	});

/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * 日期时间格式化
	 * @author 	Zhengchun Fu
	 * @date 	2016-05-27
	 */

	var dateFormat = function(time, template) {
		time = parseInt(time);
		var date = new Date(time);
		var Y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var i = date.getMinutes();
		var s = date.getSeconds();

		function leftPad(n) {
			if (n < 10) {
				return '0' + n;
			}
			return n + '';
		}

		var data = {
			Y: Y,
			y: Y.toString().substr(-2),
			M: leftPad(m),
			m: m,
			D: leftPad(d),
			d: d,
			H: leftPad(h),
			h: h,
			I: leftPad(i),
			i: i,
			S: leftPad(s),
			s: s
		};

		var reg = /([YMDHISymdhis])/g;
		return template.replace(reg, function(match, u1) {
			return data[u1];
		});
	};

	module.exports = dateFormat;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * select goods
	 * @author Zhengchun Fu
	 */
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var checkEmptyStore = __webpack_require__(69);


	// 节点变量
	var checkBoxClass = 'icon-hook';
	var btnDefaultClass = 'btn-default';
	var activeCls = 'active';

	var checkGoodsNode = '[data-node=checkGoods]';
	var checkSkuTrNode = '[data-node=skuTr]';
	var checkStoreNode = '[data-node=checkStore]';
	var checkAllNode = '[data-node=checkAll]';
	var checkboxNode = '[data-action=checkbox]';
	var notCheckedGoodsNode = '[data-node=checkGoods]:not(.icon-hook)';
	var checkedGoodsNode = '[data-node=checkGoods].icon-hook';

	var $cartSubmitBtn = $('[data-action=cartSubmit]');
	var $checkAllBtn = $(checkAllNode);
	var $checkboxBtn = $(checkboxNode);



	/**
	 * 置灰提交按钮，激活提交按钮
	 */
	function setSubmitStatus() {
		var checkedGoodsLength = $(checkedGoodsNode).length;
		if (checkedGoodsLength === 0) {
			$cartSubmitBtn.addClass(btnDefaultClass);
		} else {
			$cartSubmitBtn.removeClass(btnDefaultClass);
		}
	}

	/**
	 * 选择单个商品
	 */
	function checkOneGoods() {
		var $this = $(this);
		var $thisParent = $this.parents('table');
		var $thisParentTr = $this.parents(checkSkuTrNode);

		if ($this.hasClass(checkBoxClass)) {
			$this.removeClass(checkBoxClass);
			$thisParentTr.removeClass(activeCls);

			// 取消全选
			$thisParent.find(checkStoreNode).removeClass(checkBoxClass);
			$checkAllBtn.removeClass(checkBoxClass);

		} else {

			$this.addClass(checkBoxClass);
			$thisParentTr.addClass(activeCls);

			// 判断所有是否选择
			if (!$(notCheckedGoodsNode).length) {
				$checkboxBtn.addClass(checkBoxClass);
			}

			// 判断店铺内的是否全选
			if (!$thisParent.find(notCheckedGoodsNode).length) {
				$thisParent.find(checkStoreNode).addClass(checkBoxClass);
			}
		}

		setSubmitStatus();
		Pubsub(channel.shopCar.cartListGoods).pub();
	}

	/**
	 * 店铺全选
	 */
	function checkStore() {
		var $this = $(this);
		var $thisParent = $this.parents('table');
		var canBuyGoodsLength = $thisParent.find(checkGoodsNode).length;
		var $storeCheckboxes = $thisParent.find(checkboxNode);
		var $skuTrs = $thisParent.find(checkSkuTrNode);

		// 如果没有可购买的商品，就阻止。
		if (!canBuyGoodsLength) {
			return false;
		}

		if ($this.hasClass(checkBoxClass)) {
			$storeCheckboxes.removeClass(checkBoxClass);
			$checkAllBtn.removeClass(checkBoxClass);
			$skuTrs.removeClass(activeCls);

		} else {
			$storeCheckboxes.addClass(checkBoxClass);
			$skuTrs.addClass(activeCls);

			// 判断所有是否选择
			if (!$(notCheckedGoodsNode).length) {
				$checkboxBtn.addClass(checkBoxClass);
			}
		}

		setSubmitStatus();
		Pubsub(channel.shopCar.cartListGoods).pub();
	}

	/**
	 * 整个购物车列表全选
	 */
	function checkCartAll() {

		// 购物车可选择的商品个数,要取新的
		var canCheckGoodsLength = $(checkGoodsNode).length;

		if (canCheckGoodsLength === 0) {
			return false;
		}

		// 复选框按钮，取最新的
		var checkbox = $(checkboxNode);

		// 所有SKU的tr
		var $skuTrs = $(checkSkuTrNode);

		if ($(this).hasClass(checkBoxClass)) {
			checkbox.removeClass(checkBoxClass);
			$skuTrs.removeClass(activeCls);
		} else {
			checkbox.addClass(checkBoxClass);
			$skuTrs.addClass(activeCls);
		}

		setSubmitStatus();

		// 广播触发修改选择的商品信息
		Pubsub(channel.shopCar.cartListGoods).pub();
	}

	/**
	 * 初始化方法
	 */
	function init() {

		// 页面加载：店铺商品如果全都下架或无货，移除店铺前面的选择按钮框
		checkEmptyStore();

		// 单个商品，判断是否全选
		$(checkGoodsNode).on('click', checkOneGoods);

		// 店铺全选，取消全选
		$(checkStoreNode).on('click', checkStore);

		// 列表全选，取消全选
		$(checkAllNode).on('click', checkCartAll);
	}

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 68 */,
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 检查店铺是否为空，空店处理
	 */
	var checkEmptyStore = function() {
		var $stores = $('[data-node=checkStore]');
		var canCheckGoods;
		$.each($stores, function(i, e) {
			canCheckGoodsLen = $(e).parents('table').find('[data-node=checkGoods]').length;
			if (canCheckGoodsLen === 0) {
				$(e).remove();
			}
		});
	};

	module.exports = checkEmptyStore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 商品数量加减修改，价格联动
	 * @author Zhengchun Fu
	 */
	var spinner = __webpack_require__(71);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(53);

	// 样式，节点变量
	var disabledClass = 'disabled';
	var stockNode = 'stock';
	var upBtnNode = '[data-spin=up]';
	var downBtnNode = '[data-spin=down]';
	var spinnerNode = '[data-node=spinner]';
	var overCountNode = '[data-node=overCount]';

	// 数据配置信息
	var maxBuyCount = 20;

	// 提示信息文案
	var tipsMsg = {
		updateFail: '商品数量修改失败,网络可能异常'
	};

	function changeGoodsCount() {
		$(spinnerNode).spinner({
			min: 1,
			max: 21,
			changing: function(e, newVal, oldVal) {

				function setVal(obj, val) {
					obj.val(val);
					obj.attr('value', val);
				}


				var stock = $(this).data(stockNode);
				var upBtn = $(this).siblings(upBtnNode);
				var downBtn = $(this).siblings(downBtnNode);
				var $overCountTips = $(this).parent(spinnerNode).siblings(overCountNode);

				if (newVal > maxBuyCount) {
					if (newVal < stock) {
						$overCountTips.show();
					}
					newVal = maxBuyCount;
					upBtn.addClass(disabledClass);

				} else {
					$overCountTips.hide();
				}

				setVal($(this), newVal);

				if (newVal >= stock) {
					setVal($(this), stock);
					newVal = stock;
					upBtn.addClass(disabledClass);
				} else {
					upBtn.removeClass(disabledClass);
				}

				if (newVal == 1) {
					downBtn.addClass(disabledClass);
				} else {
					downBtn.removeClass(disabledClass);
				}

				// 服务器交互
				var diffCount = newVal - oldVal;

				var $thisGood = $(this).parents('tr').find('[data-node=checkGoods]'),
					shopId = $thisGood.data('shopid'),
					skuId = $thisGood.data('skuid'),
					kId = $thisGood.data('kid'),
					proNum = diffCount,
					sourceCode = $thisGood.data('sourcecode').sourceCode;

				$(this).prop('disabled', true);
				$this = $(this);
				fetch.get(url.get('cartUpdateGoods'), {
					data: {
						mshopid: shopId,
						skuid: skuId,
						quantity: proNum,
						source_code: sourceCode
					}
				}).done(function(data) {

					if (data.success === true) {

						// 通知头部购物车修改数量
						Pubsub(channel.shopCar.headerShopCar).pub({
							proNum: proNum
						});

					} else {
						setVal($(this), oldVal);
					}

				}).fail(function() {

					setVal($this, oldVal);
					alert(tipsMsg.updateFail);

				}).always(function() {

					$this.prop('disabled', false);

				});

				var unitPrice = $(this).parents('tr').find('[data-node=unitPrice]').text();
				var count = $(this).val();
				var price = unitPrice * count;

				$(this).parents('tr').find('[data-node=price]').text(price.toFixed(2));

				// 广播修改选择的商品数量信息
				Pubsub(channel.shopCar.cartListGoods).pub();
			}
		});

	}

	// 初始化商品数量为1，减号置灰
	function checkIsOnlyOne() {
		var $countList = $('[data-node=count]');
		$.each($countList, function(i, ele) {
			if ($(ele).val() == 1) {
				$(ele).siblings(downBtnNode).addClass(disabledClass);
			}
		});
	}

	function init() {
		checkIsOnlyOne();
		changeGoodsCount();
	}

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 71 */
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
	var Spinning = function($element, options) {
	    this.$el = $element;
	    this.options = $.extend({}, Spinning.rules.defaults, Spinning.rules[options.rule] || {}, options);
	    this.min = Number(this.options.min) || 0;
	    this.max = Number(this.options.max) || 0;

	    this.$el.on({
	        'focus.spinner': $.proxy(function(e) {
	            e.preventDefault();
	            // $(document).trigger('mouseup.spinner');
	            this.oldValue = this.value();
	        }, this),
	        'change.spinner': $.proxy(function(e) {
	            e.preventDefault();
	            this.value(this.$el.val());
	        }, this),
	        'keydown.spinner': $.proxy(function(e) {
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
	    spin: function(dir) {
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

	        var beforeChange = this.options.beforeChange || function() {};
	        if (beforeChange.call(this, this.oldValue, dir) !== false) {
	            this.value(this.oldValue + Number(step) * multipler);
	        }
	    },

	    value: function(v) {
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
	            spinningTimer = setTimeout($.proxy(function() {
	                this.$el.trigger('changed.spinner', [this.value(), this.oldValue]);
	            }, this), Spinner.delay);
	        }
	    },

	    numeric: function(v) {
	        v = this.options.precision > 0 ? parseFloat(v, 10) : parseInt(v, 10);

	        // If the variable is a number
	        if (isFinite(v)) {
	            return v;
	        }

	        return v || this.options.min || 0;
	    },

	    validate: function(val) {
	        if (this.options.min !== null && val < this.min) {
	            return -1;
	        }

	        if (this.options.max !== null && val > this.max) {
	            return 1;
	        }

	        return 0;
	    },

	    setMin: function(val) {
	        var min = this.min = this.numeric(val);
	        this.options.min = min;
	    },

	    setMax: function(val) {
	        var max = this.max = this.numeric(val);
	        this.options.max = max;
	    }
	};

	Spinner = function(element, options) {
	    this.$el = $(element);
	    this.$spinning = this.$el.find('[data-spin="spinner"]');

	    if (this.$spinning.length === 0) {
	        this.$spinning = this.$el.find(':input[type="text"]');
	    }

	    options = $.extend({}, options, this.$spinning.data());

	    this.spinning = new Spinning(this.$spinning, options);

	    this.$el
	        .on('click.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))
	        /*.on('mousedown.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))*/;

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

	    spin: function(e) {
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

	    delay: function(ms) {
	        var delay = Number(ms);

	        if (delay >= 0) {
	            this.constructor.delay = delay + 100;
	        }
	    },

	    value: function() {
	        return this.spinning.value();
	    },

	    changed: function(fn) {
	        this.bindHandler('changed.spinner', fn);
	    },

	    changing: function(fn) {
	        this.bindHandler('changing.spinner', fn);
	    },

	    rangemax: function(fn) {
	        this.bindHandler('rangemax.spinner', fn);
	    },

	    rangemin: function(fn) {
	        this.bindHandler('rangemin.spinner', fn);
	    },

	    bindHandler: function(t, fn) {
	        if ($.isFunction(fn)) {
	            this.$spinning.on(t, fn);
	        } else {
	            this.$spinning.off(t);
	        }
	    },

	    beginSpin: function(dir) {
	        this.spinInterval = setInterval($.proxy(this.spinning, 'spin', dir), 100);
	    }
	};

	var old = $.fn.spinner;

	$.fn.spinner = function(options, value) {
	    return this.each(function() {
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
	$.fn.spinner.noConflict = function() {
	    $.fn.spinner = old;
	    return this;
	};

	// $(function() {
	//     $('[data-trigger="spinner"]').spinner();
	// });

	module.exports = $.fn.spinner;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 删除购物车商品
	 * 店铺中如果没有商品，要把整个店铺删掉。
	 * 如果店铺中所有商品都删掉，没有商品后，跳转链接，显示购物车为空。
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(53);
	var checkEmptyCart = __webpack_require__(73);
	var checkEmptyStore = __webpack_require__(69);
	var cartGoodsInfo = __webpack_require__(74);
	var submitBar = __webpack_require__(75);
	var submitBarFix = submitBar.submitBarFix; // 结算条定位修正


	// 样式，节点变量
	var hideCls = 'hide';
	var countNode = '[data-node=count]';
	var delLoseNode = '[data-action=delLose]';
	var delLoseAllNode = '[data-action=delLoseAll]';
	var loseGoodsListNode = '[data-node=loseGoodsList]';
	var showMoreNode = '[data-action=showMore]';
	var loseSkuTrNode = '[data-node=loseSkuTr]';

	var tipsMsg = {
		delOneConfirm: '确定要删除商品吗？',
		delFail: '商品删除失败',
		notChooseGoods: '您还没有选择商品哦',
		chooseDelGoods: '请选择要删除的商品',
		delMulConfirm: '确定要删除选中的商品吗？',
		delLoseAllConfirm: '确定要删除所有失效的商品吗？'
	};

	var $submitBar = $('[data-node=submitBar]');


	function deleteOne(cb) {
		var $this = $(this);
		var $store = $this.parents('table');
		var goodsID = $this.data('deleteid');
		var proNum = $this.parents('tr').find(countNode).val();

		confirm(tipsMsg.delOneConfirm, {
			ok: function() {
				fetch.post(url.get('cartDelGoods'), {
					data: {
						ids: encodeURI(goodsID)
					}
				}).done(function(data) {
					if (data.success === true) {
						$this.parents('tr').remove();
						checkEmptyCart();
						checkEmptyStore();

						// 通知头部购物车修改数量
						Pubsub(channel.shopCar.headerShopCar).pub({
							proNum: -proNum
						});

						if (!$store.find(countNode).length) {
							$store.remove();
						}
						submitBarFix($submitBar);
						checkEmptyCart();
						Pubsub(channel.shopCar.cartListGoods).pub();

						// 失效商品删除操作
						if (typeof cb === 'function') {
							cb();
						}

					} else {
						alert(tipsMsg.delFail);
					}
				}).fail(function() {
					alert(tipsMsg.delFail);
				});
			}
		});
	}

	// 删除单个失效商品补充操作
	function deleteLoseOne() {
		var loseGoods;
		var $loseGoodsList = $(loseGoodsListNode);
		var $beforeSkus = $loseGoodsList.find('[data-node=loseSkuTr]:lt(3)');
		var $showMore = $(showMoreNode);

		// 获取剩余失效商品个数
		loseGoods = $loseGoodsList.find(delLoseNode).length;

		// 如果没有失效商品了，移除整个失效商品div，隐藏删除全部失效商品的按钮
		if (!loseGoods) {
			$loseGoodsList.remove();
			$(delLoseAllNode).hide();
			return false;
		}

		// 如果个数小于等于3，移除更多按钮的显示。否则后面隐藏的改一个为显示。
		if (loseGoods > 3) {
			$beforeSkus.removeClass(hideCls);
			$.each($beforeSkus, function(k, v) {
				$(v).parents('table').removeClass(hideCls);
			});
		} else {
			$loseGoodsList.find('table').removeClass(hideCls);
			$loseGoodsList.find(loseSkuTrNode).removeClass(hideCls);
			// 如果更多未展开，移除更多按钮
			if ($showMore.length) {
				$showMore.remove();
			}
		}
	}

	function deleteMultiple() {

		// 购物车可选择的商品个数
		var canCheckGoodsLength = $('[data-node=checkGoods]').length;

		if (canCheckGoodsLength === 0) {
			alert(tipsMsg.notChooseGoods);
			return false;
		}

		// 获取选中的商品ID
		var deleteids = [];
		var $checkedList = $('[data-node=checkGoods].icon-hook');
		$.each($checkedList, function(i, v) {
			deleteids.push($(v).data('deleteid'));
		});

		var goodsIDs = deleteids.join(',');
		var proNum = cartGoodsInfo.selectedGoodsCount;

		if (goodsIDs === '') {
			alert(tipsMsg.chooseDelGoods);
			return false;
		}

		confirm(tipsMsg.delMulConfirm, {
			ok: function() {
				fetch.post(url.get('cartDelGoods'), {
					data: {
						ids: encodeURI(goodsIDs)
					}
				}).done(function(data) {
					if (data.success === true) {
						$checkedList.parents('tr').remove();
						var $store = $('[data-node=checkStore]');
						$.each($store, function(i, v) {
							var $vParent = $(v).parents('table');
							if (!$vParent.find(countNode).length) {
								$vParent.remove();
							}
						});
						checkEmptyCart();
						checkEmptyStore();

						// 通知头部购物车修改数量
						Pubsub(channel.shopCar.headerShopCar).pub({
							proNum: -proNum
						});

						submitBarFix($submitBar);
						Pubsub(channel.shopCar.cartListGoods).pub();
					} else {
						alert(tipsMsg.delFail);
					}
				}).fail(function() {
					alert(tipsMsg.delFail);
				});
			}
		});
	}

	// 批量删除所有失效商品
	function deleteLoseAll() {
		var $loseGoodsList = $(loseGoodsListNode);
		// 获取失效的所有删除ID集合
		var deleteids = [];
		var proNum = 0;
		var $list = $loseGoodsList.find(delLoseNode);
		$.each($list, function(i, v) {
			deleteids.push($(v).data('deleteid'));
			proNum += $(v).parents(loseSkuTrNode).find(countNode).val() / 1;
		});
		var goodsIDs = deleteids.join(',');

		confirm(tipsMsg.delLoseAllConfirm, {
			ok: function() {
				fetch.post(url.get('cartDelGoods'), {
					data: {
						ids: encodeURI(goodsIDs)
					}
				}).done(function(data) {
					if (data.success === true) {
						$loseGoodsList.remove();
						$(delLoseAllNode).remove();
						checkEmptyCart();

						// 通知头部购物车修改数量
						Pubsub(channel.shopCar.headerShopCar).pub({
							proNum: -proNum
						});

						submitBarFix($submitBar);
					} else {
						alert(tipsMsg.delFail);
					}
				}).fail(function() {
					alert(tipsMsg.delFail);
				});
			}
		});
	}

	function init() {

		// 单个删除
		$('body').on('click', '[data-action=del]', deleteOne);

		// 单个删除失效商品
		$('body').on('click', '[data-action=delLose]', function() {
			deleteOne.call(this, deleteLoseOne);
		});

		// 批量删除选中的商品
		$('[data-action=delAll]').on('click', deleteMultiple);

		// 批量删除失效的全部商品
		$(delLoseAllNode).on('click', deleteLoseAll);

	}

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 检查购物车是否为空，空车处理
	 */
	var checkedClass = 'icon-hook';
	var countNode = '[data-node=count]';
	var checkGoodsNode = '[data-node=checkGoods]';
	var checkStoreNode = '[data-node=checkStore]';
	var checkboxNode = '[data-action=checkbox]';
	var listHeadNode = '[data-node=listHead]';
	var btnDefaultClass = 'btn-default';
	var $cartSubmitBtn = $('[data-action=cartSubmit]');

	var checkEmptyCart = function() {
		var goods = $(countNode).length;
		var canBuyGoodsLen = $(checkGoodsNode).length;
		var canBuyStoreLen = $(checkStoreNode).length;

		if (!canBuyGoodsLen) {
			$(checkboxNode).removeClass(checkedClass);
		}

		if (!canBuyStoreLen) {
			$(listHeadNode).remove();
			$cartSubmitBtn.addClass(btnDefaultClass);
			$('[data-node=loseGoodsList] > table').removeClass('fail-title');
			$('[data-node=checkAllWrap], [data-action=delAll]').remove();
		}

		if (!goods) {
			window.location.reload();
		}
	};

	module.exports = checkEmptyCart;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 购物车数据维护
	 */

	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);


	var cartGoodsInfo = {};


	/**
	 * 购物车商品信息维护
	 * goodsInfo = 商品ID-单价-商品数量-店铺ID-返利ID-库存ID
	 * @return null
	 */

	// 拼装购物车选择的商品信息
	function makeGoodsInfo() {
		var goodsID,
			goodsCount,
			goodsUnitPrice,
			shopId,
			kId,
			skuId,
			sourceCode;

		var goodsList = $('[data-node=checkGoods].icon-hook'), // 选中的商品
			selectedGoodsCount = 0,
			totalPrice = 0,
			goodsIDs = '',
			skuList = [];

		function checkNaN(n) {
			if (n <= 0 || isNaN(n)) {
				return 0;
			}
			return n;
		}

		$.each(goodsList, function(k, v) {

			goodsID = $(v).data('goodsid');
			goodsUnitPrice = $(v).parents('tr').find('[data-node=unitPrice]').text();
			goodsCount = $(v).parents('tr').find('[data-node=count]').val();
			shopId = $(v).data('shopid');
			kId = $(v).data('kid');
			skuId = $(v).data('skuid');
			sourceCode = $(v).data('sourcecode');

			// 要提交的数据
			skuList.push({
				shopId: shopId,
				kId: kId,
				skuId: skuId,
				proNum: goodsCount,
				source_code: sourceCode
			});

			// 选中的商品的数量
			selectedGoodsCount += (goodsCount / 1);

			// 选中的商品id
			goodsIDs += goodsID + ',';

			// 选中的商品的总价
			totalPrice += goodsUnitPrice * goodsCount;
		});

		cartGoodsInfo.totalPrice = checkNaN(totalPrice);
		cartGoodsInfo.selectedGoodsCount = checkNaN(selectedGoodsCount);
		cartGoodsInfo.goodsIDs = goodsIDs.replace(/,$/, '');
		cartGoodsInfo.skuList = JSON.stringify(skuList);
		$('[data-node=goodsInfoForm]').val(JSON.stringify(skuList));
	}

	// 根据商品信息计算总价
	function calcTotalPrice() {

		var selectedGoodsCount = cartGoodsInfo.selectedGoodsCount;
		var totalPrice = cartGoodsInfo.totalPrice;

		$('[data-node=selectedGoodsCount]').text(selectedGoodsCount);
		$('[data-node=totalPrice]').text('￥' + totalPrice.toFixed(2));
	}

	// 购物车商品信息维护
	function shoppingCartInfo() {
		makeGoodsInfo();
		calcTotalPrice();
	}

	Pubsub(channel.shopCar.cartListGoods).sub(shoppingCartInfo);

	module.exports = cartGoodsInfo;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 购物车底部结算栏
	 * @author Zhengchun Fu
	 */

	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var cartGoodsInfo = __webpack_require__(74);

	var floatingLayerClass = 'floating-layer';

	/**
	 * 结算条定位
	 */
	function submitBarFix($obj) {
		var winH = $(window).height(),
			offsetTop = $('[data-node=submitForm]').offset().top + $obj.height(),
			scrollTop;

		$obj.addClass(floatingLayerClass);

		function submitBarFixed() {
			scrollTop = $(window).scrollTop();
			if ((scrollTop + winH) >= offsetTop) {
				$obj.removeClass(floatingLayerClass);
			} else {
				$obj.addClass(floatingLayerClass);
			}
		}

		submitBarFixed();
		$(window).on('scroll', submitBarFixed);
		$(window).on('resize', function() {
			winH = $(window).height();
			window.setTimeout(submitBarFixed, 200);
		});
	}

	/**
	 * 购物车数据提交
	 */
	function cartSubmit() {
		$('[data-action=cartSubmit]').on('click', function() {

			if ($(this).hasClass('btn-default')) {
				return false;
			}

			var skuList = cartGoodsInfo.skuList;
			$('#skuList').val(skuList);

			if (skuList !== '[]' && skuList) {

				var fid = '?fid=' + $GLOBAL_CONFIG.fid;
				var $submitForm = $('[data-node=submitForm]');
				var action = $submitForm.attr('action');
				$submitForm.attr('action', action + fid);
				$submitForm.submit();
			}
		});
	}



	/**
	 * 初始化方法
	 */
	function init() {

		// 结算条定位
		submitBarFix($('[data-node=submitBar]'));

		// 购物车数据提交
		cartSubmit();
	}

	module.exports = {
		init: init,
		submitBarFix: submitBarFix
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 展示更多失效的商品
	 * @author Zhengchun Fu
	 */
	var submitBar = __webpack_require__(75);
	var submitBarFix = submitBar.submitBarFix; // 结算条定位修正

	var showMoreNode = '[data-action=showMore]';
	var loseGoodsListNode = '[data-node=loseGoodsList]';
	var $showMoreBtn = $(showMoreNode);
	var $loseGoodsList = $(loseGoodsListNode);
	var $submitBar = $('[data-node=submitBar]');

	var init = function() {
		$showMoreBtn.on('click', function() {
			var $this = $(this);
			var hideCls = 'hide';

			// 删掉更多按钮
			$this.parent('div').remove();

			// 展示全部失效商品
			$loseGoodsList.find('table.hide').removeClass(hideCls);
			$loseGoodsList.find('tr.hide').removeClass(hideCls);

			// 修正结算条位置
			submitBarFix($submitBar);
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {/**
	 * 购物车-我的收藏商品
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var goodsCollectTpl = __webpack_require__(78);
	var slider = __webpack_require__(79);
	var quikAddToCart = __webpack_require__(80);

	var init = function() {
		fetch.get(url.get('cartGoodsCollect'), null).done(function(data) {
			var collectData = null;
			var html = '';
			if (data.success === true) {
				collectData = data.data;
				collectData.length = collectData.collections.length;
				collectData.mallDomain = $_CONFIG.mall_domain;
				collectData.csid = $GLOBAL_CONFIG.sourceCode;
				if (collectData.length >= 5) {
					html = goodsCollectTpl(collectData);
					$('[data-node=myCollectWrap]').html(html);
					slider({
						element: '[data-node=myCollectWrap]',
					});
					quikAddToCart('[data-node=myCollectWrap]');
				}
			}
		}).fail(function(data) {
			// nothing
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/widget/cart/goodsCollect',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,length=$data.length,$each=$utils.$each,collections=$data.collections,v=$data.v,$index=$data.$index,$escape=$utils.$escape,mallDomain=$data.mallDomain,csid=$data.csid,$out='';$out+='<h2 class="title">我的收藏</h2> <div class="shop-list" data-node="sliderBox"> <a href="javascript:;" data-action="sliderLeft" class="icon icon-left hide">&#xe970;</a> <a href="javascript:;" data-action="sliderRight" class="icon icon-right ';
	if(length == 5){
	$out+='hide';
	}
	$out+='">&#xe98c;</a> <div class="shop-list-scroll"> <ul class="clearfix" data-node="sliderList"> ';
	$each(collections,function(v,$index){
	$out+=' <li> <a title="';
	$out+=$escape(v.item.name);
	$out+='" href="';
	$out+=$escape(mallDomain);
	$out+='item/';
	$out+=$escape(v.shopId);
	$out+='-';
	$out+=$escape(v.itemId);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" target="_blank" rel="noopenner"> <img onerror="imgError(this)" src="';
	$out+=$escape(v.item.mainImage);
	$out+='"> <div class="text">￥<span>';
	$out+=$escape(v.item.salePrice);
	$out+='</span> <p>';
	$out+=$escape(v.item.name);
	$out+='</p> </div> <div class="btn-box"> <a href="javascript:;" data-action="addCart" data-shopId="';
	$out+=$escape(v.shopId);
	$out+='" data-itemId="';
	$out+=$escape(v.itemId);
	$out+='" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> </a> </li> ';
	});
	$out+=' </ul> </div> </div>';
	return new String($out);
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 商品左右滑动切换
	 * @author Zhengchun Fu
	 */
	var slider = function(options) {
		var defaults = {
			element: '#slider',
			leftBtn: '[data-action=sliderLeft]',
			rightBtn: '[data-action=sliderRight]',
			list: '[data-node=sliderList]',
			tabDot: '[data-node=sliderTabDot]',
			children: 'li',
			speed: 200,
			showLength: 5,
			moveLength: 1,
			showTab: false
		};
		$.extend(defaults, options);
		var speed = defaults.speed;
		var index = 0;
		var tabDotIndex = 0;
		var $slider = $(defaults.element);
		var hideCls = 'hide';

		var getTabDotHTML = function(len) {
			// show tab
			var tabHTML = '';
			var activeStr = 'class="active"';
			for (var i = 0; i < len; i++) {
				activeStr = i === 0 ? activeStr : '';
				tabHTML += '<a href="javascript:;" ' + activeStr + '>' + i + '</a>';
			}
			return tabHTML;
		};

		$.each($slider, function(i, o) {
			var $left = $(o).find(defaults.leftBtn);
			var $right = $(o).find(defaults.rightBtn);
			var $list = $(o).find(defaults.list);
			var $li = $list.children(defaults.children);

			var liLen = $li.length;
			var liW = $li.outerWidth(true);
			var overIndex = defaults.showLength;

			listWidth = liW * liLen;
			listShowWidth = liW * defaults.showLength;

			$list.css({
				width: liW * liLen
			});

			if (defaults.showTab) {
				tabDotHTML = getTabDotHTML(Math.ceil(liLen / defaults.showLength));
				$(o).find(defaults.tabDot).html(tabDotHTML);
			}

			$(o).on('click', defaults.leftBtn, function() {
				var left = 0;
				index -= defaults.moveLength;
				left = -liW * index;
				if (defaults.showTab) {
					tabDotIndex--;
					$(o).find(defaults.tabDot).find('a').eq(tabDotIndex).addClass('active').siblings('a').removeClass('active');
				}

				if (index <= 0) {
					$left.addClass(hideCls);
				}
				if (index <= liLen - overIndex) {
					$right.removeClass(hideCls);
				}

				$list.stop().animate({
					'left': left
				}, speed, function() {});
			});

			$(o).on('click', defaults.rightBtn, function() {
				var left = 0;
				if (defaults.showTab) {
					tabDotIndex++;
					$(o).find(defaults.tabDot).find('a').eq(tabDotIndex).addClass('active').siblings('a').removeClass('active');
				}
				index += defaults.moveLength;
				left = -liW * index;
				if (index >= liLen - overIndex) {
					$right.addClass(hideCls);
				}
				if (index > 0) {
					$left.removeClass(hideCls);
				}
				$list.stop().animate({
					'left': left
				}, speed, function() {});
			});
		});
	};

	module.exports = slider;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 快速添加到购物车
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Dialog = __webpack_require__(22);
	var loadingTpl = __webpack_require__(81);
	var tipsTpl = __webpack_require__(82);
	var quikAddToCartTpl = __webpack_require__(83);
	var slider = __webpack_require__(79);
	var checkLoginStatus = __webpack_require__(42);
	var loginPop = __webpack_require__(3);
	var toast = __webpack_require__(84).init;

	// // tmod helpers
	__webpack_require__(85)();

	var $conf = $GLOBAL_CONFIG;
	var tipsMsg = {
		success: '商品加入成功',
		fail: '添加失败，请稍后再试',
		netFail: '网络请求失败，请稍后重试',
		notSelectGoods: '请选择商品属性'
	};

	var skusAttrsNode = '[data-node=skusAttrs]';
	var sliderListNode = '[data-node=sliderList]';
	var sliderLeftNode = '[data-action=sliderLeft]';
	var sliderRightNode = '[data-action=sliderRight]';
	var quikAddBoxNode = '[data-node=quikAddBox]';
	var quikAddPriceNode = '[data-node=quikAddPrice]';
	var addCartNode = '[data-action=addCart]';

	var hideCls = 'hide';
	var activeCls = 'active';
	var disabledCls = 'disabled';

	var quikAddData = {
		mshopid: 0,
		skuid: 0,
		quantity: 1,
		kid: '',
		source_code: $conf.sourceCode
	};

	// 存放过滤后的数据
	var itemData = {};
	var skus = [];

	// 处理过后的sku属性数据
	var skusAttrData = {};
	var afterFilterSkusArr = [];

	// 显示弹窗
	var goodsDetailPop = function(content, callback) {
		var d = Dialog({
			fixed: true,
			modal: true,
			title: '选择商品规格',
			content: content,
			className: 'pop-box pop-pad-btm65',
			okCls: 'pc-btn pc-btnh40 pc-btnw120',
			ok: addToCart,
			okValue: '添加到购物车',
			btnWrapCls: 'two-buttons',
			onshow: callback
		});
		d._$('header').hide();
		d._$('footer').hide();
		d.show();
		return d;
	};

	// 过滤库存为0的sku
	function filterData(data) {
		var newSkus = [];
		$.each(data, function(i, v) {
			if (v.stock > 0) {
				v.chungeAddIndex = i;
				newSkus.push(v);
			}
		});

		// 售价由低到高排序
		newSkus.sort(function(a, b) {
			return a.salePrice - b.salePrice || a.chungeAddIndex - b.chungeAddIndex;
		});
		return newSkus;
	}

	// 转换适配数据
	function getSkusAttrs(skus) {
		var skuAttrsStrData = {};
		var newData = {};
		var newArr = [];
		$.each(skus, function(i, v) {
			var skuAttrs = [];
			var skuStr = '';
			$.each(v.attributes, function(k, sv) {
				if (typeof newData[sv.name] === 'undefined') {
					newData[sv.name] = [sv.value];
				} else {
					if ($.inArray(sv.value, newData[sv.name]) < 0) {
						newData[sv.name].push(sv.value);
					}
				}
				skuStr += sv.value;

				skuAttrs.push(sv.value);
			});
			skuAttrsStrData[skuStr] = v.id;
			newArr.push(skuAttrs);
		});
		return {
			skusAttrs: newData,
			skusArr: newArr,
			skuAttrsStrData: skuAttrsStrData
		};
	}

	// 加载显示商品详情
	var loadGoodsDetail = function(ele) {
		$(ele).on('click', addCartNode, function() {
			var $this = $(this);
			var shopId = $this.data('shopid');
			var itemId = $this.data('itemid');
			var showHTML = '';
			var pop = null;

			if (!checkLoginStatus()) {
				loginPop();
				return false;
			}

			showHTML = loadingTpl($conf);
			pop = goodsDetailPop(showHTML, function() {
				fetch.get(url.get('cartGoodsDetail'), {
					data: {
						shopId: shopId,
						itemId: itemId
					}
				}).done(function(data) {
					var originItemData = data.data.item;
					if (data.success === true) {
						if (data.data.mshop === null) {
							quikAddData.mshopid = data.data.shop.id;
						} else {
							quikAddData.mshopid = data.data.mshop.id;
						}
						$.extend(itemData, originItemData);
						itemData.skus = filterData(itemData.skus);
						skus = itemData.skus;
						skusAttrData = getSkusAttrs(originItemData.skus);
						afterFilterSkusArr = getSkusAttrs(itemData.skus).skusArr;
						itemData.skusAttrs = skusAttrData.skusAttrs;

						pop._$('content').html(quikAddToCartTpl(itemData));
						pop._$('header').show();
						pop._$('footer').show();
						pop.reset();

						loadedInit();
						slider({
							element: quikAddBoxNode,
							showLength: 1
						});
					} else {

						// 先要判断登录是否已经失效，失效弹出登录窗口
						if (data.code === "881011") {
							loginPop();
							pop.remove();

						} else {
							popTips(data.message);
						}
					}
				}).fail(function(data) {
					popTips(tipsMsg.netFail);
				});
			});

			function popTips(content) {
				var msg = tipsTpl({
					msg: content
				});
				pop._$('content').html(msg);
				pop.reset();
				setTimeout(function() {
					pop.remove();
				}, 2000);
			}
		});
	};

	// loadedInit
	var loadedInit = function() {
		var $first = $(skusAttrsNode).find('a.active');
		$.each($first, function(i, v) {
			ctrlAttrShow($(v));
		});
		checkSkuSelect();
		bindEvent();
	};

	// 控制属性的选择
	function ctrlAttrShow($first) {
		var $skusAttrs = $(skusAttrsNode);
		var skusArr = afterFilterSkusArr;
		var $attrs = $skusAttrs.find('a');
		var $dl = $skusAttrs.find('dl');
		var firstAttr = $.trim($first.data('val'));
		var $otherAttrs = $first.parents('dl').siblings('dl').find('a');

		function changeClass($v, flag) {
			if (flag) {
				$v.removeClass(activeCls).addClass(disabledCls);
			} else {
				$v.removeClass(disabledCls);
			}
		}
		if ($dl.length > 1) {
			$.each($otherAttrs, function(i, v) {
				var attrStr = $.trim($(v).data('val'));
				var flag = true;
				var isRepeatAttr = false;
				var repeatAttr = '';
				if (firstAttr === attrStr) {
					isRepeatAttr = true;
					repeatAttr = firstAttr + attrStr + '';
				}

				$.each(skusArr, function(k, vv) {
					if ($.inArray(attrStr, vv) >= 0 && $.inArray(firstAttr, vv) >= 0) {

						// 不同属性的值可能一样的，需要判断。
						if (isRepeatAttr && repeatAttr !== vv.join('')) {
							flag = true;
						} else {
							flag = false;
						}
					}
				});
				changeClass($(v), flag);
			});
		} else {
			$.each($attrs, function(i, v) {
				var attrStr = $.trim($(v).data('val'));
				var flag = true;
				$.each(skusArr, function(k, vv) {
					if ($.inArray(attrStr, vv) >= 0) {
						flag = false;
					}
				});
				changeClass($(v), flag);
			});
		}
	}

	// 取消控制属性选择
	function cancelCtrlAttr() {
		var a_disabledCls = 'a.disabled';
		var $skusAttrs = $(skusAttrsNode);
		var $first = $skusAttrs.find('a.active');
		$first.parents('dl').find(a_disabledCls).removeClass(disabledCls);
		if (!$first.length) {
			$skusAttrs.find(a_disabledCls).removeClass(disabledCls);
		}
		ctrlAttrShow($first);
	}

	// 绑定属性选择事件
	var bindEvent = function() {
		$(skusAttrsNode).on('click', 'a', function() {
			var $this = $(this);
			var curAttr = $this.data('val');
			var skuId = 0;
			if ($this.hasClass(disabledCls)) {
				return false;
			}
			if ($this.hasClass(activeCls)) {
				$this.removeClass(activeCls);
				cancelCtrlAttr();
			} else {
				$this.addClass(activeCls).siblings('a').removeClass(activeCls);
				ctrlAttrShow($this);
				skuId = checkSkuSelect();
				if (!!~~skuId) {
					skuData = getSkuById(skuId);
					repaintHTML(skuData);
				}
			}
		});
	};

	// 取消绑定
	var offEvent = function() {
		$(skusAttrsNode).off();
	};

	// get sku's data
	function getSkuById(id) {
		var sku = null;
		$.each(skus, function(i, v) {
			if (v.id == id) {
				sku = v;
				return;
			}
		});
		return sku;
	}

	// check that is full sku
	function checkSkuSelect() {
		var $selecteds = $(skusAttrsNode).find('a.active');
		var skuStr = '';
		var skuId = 0;
		$.each($selecteds, function(i, v) {
			skuStr += $.trim($(v).data('val'));
		});

		skuId = skusAttrData.skuAttrsStrData[skuStr];
		quikAddData.skuid = skuId;
		return skuId;
	}

	// 添加选择的商品到购物车
	var addToCart = function() {
		var skuId = checkSkuSelect();
		if (!skuId) {
			toast(tipsMsg.notSelectGoods);
			return false;
		}
		fetch.get(url.get('addShopCar'), {
			data: quikAddData
		}).done(function(data) {
			if (data.success === true) {

				// 清空变量存储的值
				itemData = {};
				skus = [];
				skusAttrData = {};
				afterFilterSkusArr = [];

				// 提示并刷新当前页
				toast(tipsMsg.success, {
					callback: function() {
						location.reload();
					}
				});
			} else {
				toast(data.message);
			}
		}).fail(function(data) {
			toast(tipsMsg.fail);
		});

		offEvent();
	};

	// 根据选择的sku重绘商品信息
	var repaintHTML = function(data) {
		var $popBox = $(quikAddBoxNode);
		var images = data.images.length ? data.images : itemData.images;
		var price = data.price;
		var salePrice = data.salePrice;
		var imgHTML = '';
		var priceHTML = '<p>价格：<span><em>￥</em>' + data.salePrice + '</span></p>';
		var originalPriceHTML = '<p class="del">原价：￥' + data.price + '</p>';

		// 重置图片列表
		$popBox.find(sliderListNode).css('left', 0);
		$.each(images, function(i, img) {
			imgHTML += '<li><img onerror="imgError(this)" src="' + img + '"></li>';
		});
		$popBox.find(sliderListNode).html(imgHTML);
		$popBox.find(sliderLeftNode).addClass(hideCls);

		if (images.length < 2) {
			$popBox.find(sliderRightNode).addClass(hideCls);
		} else {
			$popBox.find(sliderRightNode).removeClass(hideCls);
		}

		// 重置价格
		if (data.price != data.salePrice) {
			priceHTML += originalPriceHTML;
		}
		$(quikAddPriceNode).html(priceHTML);

	};



	module.exports = loadGoodsDetail;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/addToCart/loading',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,pcimgpath=$data.pcimgpath,$out='';$out+='<div class="pop-shopcar"> <div style="width: 480px;" class="shop-chooseload"><img src="';
	$out+=$escape(pcimgpath);
	$out+='/images/public/loading.gif"></div> </div>';
	return new String($out);
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/addToCart/tips',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,msg=$data.msg,$out='';$out+='<div class="pop-shopcar"> <div style="width: 480px;" class="shop-chooseload">';
	$out+=$escape(msg);
	$out+='</div> </div>';
	return new String($out);
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/addToCart/quikAddToCart',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,images=$data.images,$each=$utils.$each,img=$data.img,$index=$data.$index,$escape=$utils.$escape,name=$data.name,skus=$data.skus,skusAttrs=$data.skusAttrs,v=$data.v,key=$data.key,vv=$data.vv,av=$data.av,$out='';$out+='<div class="pop-shopcar" style="width: 480px;" data-node="quikAddBox"> <em data-action="sliderLeft" class="icon icon-left hide">&#xe970;</em> <em data-action="sliderRight" class="icon icon-right ';
	if(images.length == 1){
	$out+='hide';
	}
	$out+='">&#xe98c;</em> <div class="pop-shopcar-scroll"> <ul data-node="sliderList"> ';
	$each(images,function(img,$index){
	$out+=' <li><img onerror="imgError(this)" src="';
	$out+=$escape(img);
	$out+='"></li> ';
	});
	$out+=' </ul> </div> <div class="pop-shopcar-title">';
	$out+=$escape(name);
	$out+='</div> <div class="pop-shopcar-price" data-node="quikAddPrice"> <p>价格：<span><em>￥</em>';
	$out+=$escape(skus[0].salePrice);
	$out+='</span></p> ';
	if(skus[0].salePrice != skus[0].price){
	$out+=' <p class="del">原价：￥';
	$out+=$escape(skus[0].price);
	$out+='</p> ';
	}
	$out+=' </div> <div class="pop-shopcar-max" data-node="skusAttrs"> ';
	$each(skusAttrs,function(v,key){
	$out+=' <dl class="pop-shopcar-class clearfix"> <dt>';
	$out+=$escape(key);
	$out+='：</dt> <dd> ';
	$each(v,function(vv,$index){
	$out+=' <a href="javascript:;" data-val="';
	$out+=$escape(vv);
	$out+='" ';
	$each(skus[0].attributes,function(av,$index){
	$out+=' ';
	if(av.value === vv && av.name === key){
	$out+='class="active"';
	}
	$out+=' ';
	});
	$out+='>';
	$out+=$escape($helpers. substrLen(vv , 10));
	$out+='</a> ';
	});
	$out+=' </dd> </dl> ';
	});
	$out+=' </div> </div>';
	return new String($out);
	});

/***/ },
/* 84 */
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
/* 85 */
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * 购物车推荐商品
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var recommendTpl = __webpack_require__(87);
	var slider = __webpack_require__(79);
	var quikAddToCart = __webpack_require__(80);
	var getLoadingHTML = __webpack_require__(88);

	var recommendWrapNode = '[data-node=recommendWrap]';
	var $recommendWrap = $(recommendWrapNode);

	var init = function() {
		var loadingHtml = getLoadingHTML({
			height: 420
		});
		$recommendWrap.html(loadingHtml);
		fetch.get(url.get('cartGoodsRecommend'), null).done(function(data) {
			var recommendData = null;
			var html = '';
			if (data.success === true) {
				recommendData = data.data;
				recommendData.length = recommendData.items.length;
				recommendData.mallDomain = $_CONFIG.mall_domain;
				recommendData.csid = $GLOBAL_CONFIG.sourceCode;
				recommendData.tabDots = new Array(Math.ceil(recommendData.length / 5));
				if (recommendData.length >= 5) {
					html = recommendTpl(recommendData);
					$recommendWrap.html(html);
					slider({
						element: '[data-node=recommendWrap]',
						moveLength: 5,
						speed: 400,
						showTab: true
					});
					quikAddToCart('[data-node=recommendWrap]');
				}
			}
		}).fail(function(data) {
			// nothing
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/widget/cart/goodsRecommend',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,length=$data.length,$each=$utils.$each,items=$data.items,v=$data.v,$index=$data.$index,$escape=$utils.$escape,mallDomain=$data.mallDomain,csid=$data.csid,$out='';$out+='<h2 class="title">为您推荐</h2> <div class="shop-list" data-node="sliderBox"> <a href="javascript:;" data-action="sliderLeft" class="icon icon-left hide">&#xe970;</a> <a href="javascript:;" data-action="sliderRight" class="icon icon-right ';
	if(length == 5){
	$out+='hide';
	}
	$out+='">&#xe98c;</a> <div class="shop-list-scroll"> <ul class="clearfix" data-node="sliderList"> ';
	$each(items,function(v,$index){
	$out+=' <li> <a title="';
	$out+=$escape(v.name);
	$out+='" href="';
	$out+=$escape(mallDomain);
	$out+='item/';
	$out+=$escape(v.shopId);
	$out+='-';
	$out+=$escape(v.id);
	$out+='.html?csid=';
	$out+=$escape(csid);
	$out+='" target="_blank" rel="noopenner"> <img onerror="imgError(this)" src="';
	$out+=$escape(v.mainImage);
	$out+='"> <div class="text">￥<span>';
	$out+=$escape(v.salePrice);
	$out+='</span> <p>';
	$out+=$escape(v.name);
	$out+='</p> </div> <div class="btn-box"> <a href="javascript:;" data-action="addCart" data-shopId="';
	$out+=$escape(v.shopId);
	$out+='" data-itemId="';
	$out+=$escape(v.id);
	$out+='" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> </a> </li> ';
	});
	$out+=' </ul> </div> <div class="shop-list-tab" data-node="sliderTabDot"></div> </div>';
	return new String($out);
	});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {/**
	 * loading
	 * @author Zhengchun Fu
	 */
	var tpl = '<div class="loading-box"><div class="loading-img"><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif"><p>加载中...</p></div></div>';
	var $loading = $(tpl);

	function init(css) {
		var $box = $('<div></div>');
		$loading.css(css);
		$box.append($loading);
		return $box.html();
	}

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ }
]);