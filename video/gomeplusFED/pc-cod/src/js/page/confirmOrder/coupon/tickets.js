/**
 * 使用优惠券
 * @author Zhengchun Fu
 */

var fenToYuan = require('utils/fenToYuan');
var ticketsTpl = require('./useTickets.tpl');
var Dialog = require('dialog');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var fetch = require('io/fetch');
var url = require('io/url');
var findBestTicket = require('module/findBestTicket');
var gomeCoin = require('../gomeCoin/index');

// tmod helpers
require('module/tmodHelper/dateFormat')();
require('module/tmodHelper/f2Y')();

var couponList = $GLOBAL_CONFIG.couponList;
if (!couponList.shopList) {
	couponList.shopList = [];
}
if (!couponList.platRedPackList) {
	couponList.platRedPackList = [];
}

// 优惠券排序：时间由近及远，金额由小到大。
function ticketsSort(list) {
	list.sort(function(a, b) {
		if (a.endTime / 1 < b.endTime / 1) {
			return -1;
		} else if (a.endTime / 1 == b.endTime / 1) {
			return a.money / 1 < b.money / 1 ? -1 : 1;
		} else {
			return 1;
		}

	});
}

// 店铺优惠券根据订单列表顺序排序
(function() {
	var shopIdArr = [];
	var orderShopInfoList = $('[data-node=shopInfo]');
	var newShopList = [];

	$.each(orderShopInfoList, function(i, v) {
		shopIdArr.push($(v).data('shopid'));
	});

	$.each(shopIdArr, function(i, shopId) {
		$.each(couponList.shopList, function(k, v) {
			if (v.shopId == shopId) {
				newShopList.push(couponList.shopList[k]);
			}
		});
	});

	couponList.shopList = newShopList;
})();

// 平台优惠券排序
ticketsSort(couponList.platRedPackList);

// 店铺优惠券排序
(function() {
	var shopList = couponList.shopList;
	for (var i = 0; i < shopList.length; i++) {
		var redPackList = shopList[i].redPackList;
		ticketsSort(redPackList);
	}
})();

// 判断是否有可用的优惠券
var noTickets = true;
if (couponList.shopList.length || (couponList.platRedPackList && couponList.platRedPackList.length)) {
	noTickets = false;
}

/*--------------------页面加载后初始化各种价格--------------------*/
// 此时单位为 分
var shippingPrice = parseFloat($('[data-node=shippingPrice]').data('shippingprice'));
var goodsTotalPrice = parseFloat($('[data-node=goodsTotalPrice]').data('goodstotalprice'));

shippingPrice = isNaN(shippingPrice) ? 0 : shippingPrice;
goodsTotalPrice = isNaN(goodsTotalPrice) ? 0 : goodsTotalPrice;

var platFirst = {},
	shopFirst = {},
	defaultFirst = [],
	submitCoupons = [], // 要提交的优惠券列表
	shopCouponList = [], // 要提交的店铺优惠券列表
	platMaxMoney = 0,
	shopMaxMoneySum = 0,
	defaultDiscount = 0, // 初始化默认抵扣的金额
	gomeCoinDiscount = 0; // 国美币抵扣金额

// 平台券最大金额
if (couponList.platRedPackList && couponList.platRedPackList.length) {
	platFirst = findBestTicket(couponList.platRedPackList, 'id');
	platMaxMoney = platFirst.money / 1;
}

// 店铺券最大金额总和
var shopList = couponList.shopList;
$.each(shopList, function(i, v) {
	if (v.redPackList.length) {
		shopFirst = findBestTicket(v.redPackList, 'id');
		shopMaxMoneySum += shopFirst.money / 1;
		shopCouponList.push(shopFirst);
	}
});

// 设置弹窗默认显示
if (platMaxMoney > shopMaxMoneySum) {
	if (couponList.platRedPackList && couponList.platRedPackList.length) {
		couponList.platRedPackList[platFirst._index_].isFirst = true;
		defaultFirst.push('p-' + platFirst._index_);
	}
	couponList.platShow = true;
	couponList.shopShow = false;
	defaultDiscount = platMaxMoney;
	submitCoupons.push(platFirst);

} else {
	$.each(shopList, function(i, v) {
		if (v.redPackList.length) {
			shopFirst = findBestTicket(v.redPackList, 'id');
			shopFirst.shopId = v.shopId;
			v.redPackList[shopFirst._index_].isFirst = true;
			defaultFirst.push('s-' + i + '-' + shopFirst._index_);
			submitCoupons.push(shopFirst);
		}
	});
	couponList.platShow = false;
	couponList.shopShow = true;
	defaultDiscount = shopMaxMoneySum;

}

// 要提交的优惠券列表
function setSubmitCouponsData(data) {
	$('[data-action=useTickets]').data('coupons', data);
}

setSubmitCouponsData(submitCoupons);

// 设置默认折扣价格
var orderDiscountPrice = goodsTotalPrice - defaultDiscount;

// 调用国美币的方法
// 国美币可抵扣金额
gomeCoinDiscount = gomeCoin.initUseCoin(orderDiscountPrice);
gomeCoin.bindEvents();

/*------------------接收广播--------------------*/

// 设置优惠券折扣金额展示
Pubsub(channel.confirmOrder.changeUseTickets).sub(function(data) {
	var $ticketsDiscountName = $('[data-node=ticketsDiscountName]');
	var $ticketsDiscount = $('[data-node=ticketsDiscount]');
	var price = data.ticketsDiscount;
	if (price > 0) {
		$ticketsDiscountName.text('已抵扣：');
		$ticketsDiscount.html('￥' + fenToYuan(price));
		return;
	}
	if (noTickets) {
		$ticketsDiscountName.text('无可用优惠券');
		$ticketsDiscount.html('');
	} else {
		$ticketsDiscountName.text('最高可抵用：');
		$ticketsDiscount.html('￥' + fenToYuan(defaultDiscount));
	}

});

// 设置最终结算价格展示
Pubsub(channel.confirmOrder.setFinalPrice).sub(function(data) {
	var price = data.ticketsDiscount || 0;
	var gomeCoinDiscount = data.gomeCoinDiscount || 0;
	var finalPrice = (shippingPrice + goodsTotalPrice) - price - gomeCoinDiscount;

	// 使用优惠券
	$('[data-node=useTicketsPrice]').text('￥' + fenToYuan(price));

	// 设置国美币使用的金额
	$('[data-node=useGomeCoinPrice]').text('￥' + fenToYuan(gomeCoinDiscount));

	// 总的应付金额
	$('[data-node=finalPrice]').text(fenToYuan(finalPrice));
});


/*-------------初始化优惠信息-----------------*/

// 抛出初始化后的优惠信息
Pubsub(channel.confirmOrder.changeUseTickets).pub({

	// 优惠券已抵扣的金额
	ticketsDiscount: defaultDiscount,

	// 订单折扣后的金额：商品总价-优惠券抵扣的金额
	orderDiscountPrice: orderDiscountPrice,

	// 国美币已抵扣的金额
	gomeCoinDiscount: gomeCoinDiscount
});

Pubsub(channel.confirmOrder.setGomeCoin).pub({

	// 优惠券已抵扣的金额
	ticketsDiscount: defaultDiscount,

	// 订单折扣后的金额：商品总价-优惠券抵扣的金额
	orderDiscountPrice: orderDiscountPrice,

	// 国美币已抵扣的金额
	gomeCoinDiscount: gomeCoinDiscount
});

// 初始化后抛出金额设置最终价。
Pubsub(channel.confirmOrder.setFinalPrice).pub({

	// 优惠券已抵扣的金额
	ticketsDiscount: defaultDiscount,

	// 订单折扣后的金额：商品总价-优惠券抵扣的金额
	orderDiscountPrice: orderDiscountPrice,

	// 国美币已抵扣的金额
	gomeCoinDiscount: gomeCoinDiscount
});



/*-------------滑腻的分割线--下面是需要点击操作的----------------*/

var ticketsShow = function(data, okfn) {
	data = data || {};
	okfn = okfn || function() {};

	var defaults = {
		modal: true,
		fixed: true,
		content: ticketsTpl(data),
		className: 'pop-box',
		okValue: '确定',
		okCls: 'pc-btn coupon-btn',
		ok: okfn
	};
	return Dialog(defaults).show();
};

// 保存使用优惠券
var saveTickets = function() {
	var list = $('[data-action=ticketRadio].menu-radio-checked');
	var price = 0; // 优惠券抵扣金额
	var firstList = [];
	var newSubmitCoupons = [];
	$.each(list, function(i, e) {
		price += $(e).data('discount') / 1;
		firstList.push($(e).data('index'));
		newSubmitCoupons.push($(e).data('info'));
	});

	// 订单折扣后的金额 = 商品总价 - 优惠券抵扣金额
	orderDiscountPrice = goodsTotalPrice - price;



	// 设置下次默认显示的选项
	var whichshow = firstList.length ? firstList[0].charAt(0) : 'p';
	switch (whichshow) {
		case 's':
			couponList.platShow = false;
			couponList.shopShow = true;
			break;
		default:
			couponList.platShow = true;
			couponList.shopShow = false;
	}

	// 更新维护数组对象
	// 直接取消初始最优isFirst
	$.each(defaultFirst, function(i, o) {

		// s-0-0, s-1-1  / p-1
		var listArr = o.split('-');
		if (listArr[0] == 'p') {

			// 设置平台的选中项
			couponList.platRedPackList[listArr[1]].isFirst = false;
		} else {

			// 设置店铺的选中项
			couponList.shopList[listArr[1]].redPackList[listArr[2]].isFirst = false;
		}
	});

	// 根据列表数据设置isFirst
	$.each(firstList, function(i, o) {

		// s-0-0, s-1-1  / p-1
		var listArr = o.split('-');
		if (listArr[0] == 'p') {

			// 设置平台的选中项
			var platNewFirst = couponList.platRedPackList[listArr[1]];
			platNewFirst.isFirst = true;

		} else {

			// 设置店铺的选中项
			var shopNewFirst = couponList.shopList[listArr[1]].redPackList[listArr[2]];
			shopNewFirst.isFirst = true;
			shopNewFirst.shopId = couponList.shopList[listArr[1]].shopId;

		}
	});

	Pubsub(channel.confirmOrder.changeUseTickets).pub({

		// 优惠券抵扣金额
		ticketsDiscount: price,

		// 订单折扣后的金额
		orderDiscountPrice: orderDiscountPrice,

		// 国美币可使用的金额
		gomeCoinDiscount: gomeCoinDiscount
	});

	Pubsub(channel.confirmOrder.setGomeCoin).pub({

		// 优惠券抵扣金额
		ticketsDiscount: price,

		// 订单折扣后的金额
		orderDiscountPrice: orderDiscountPrice,

		// 国美币可使用的金额
		gomeCoinDiscount: gomeCoinDiscount
	});

	// 要提交的优惠券列表
	setSubmitCouponsData(newSubmitCoupons);

	// 把上一次的选择作为初始值
	defaultFirst = firstList.splice(0);
};

// 显示优惠券弹窗
$('[data-action=useTickets]').on('click', function() {

	// 显示优惠券
	ticketsShow(couponList, saveTickets);

	$('[data-node=ticketsMenu]').on('click', 'a', function(e) {
		var hasEm = $(this).children('em').length;
		var index = $(this).index();
		e.preventDefault();
		$(this).addClass('active').siblings('a').removeClass('active');

		if (!hasEm) {
			$(this).append('<em class="up-arrow"></em>').siblings('a').children('em').remove();
		}

		$('[data-node=ticketsList] > div').eq(index).show().siblings().hide();
	});
});

// 选择使用券
$('body').on('click', '[data-action="ticketRadio"]', function() {
	var checkedCls = 'menu-radio-checked';
	var ticketRadioNode = '[data-action=ticketRadio]';
	var $this = $(this);

	if ($this.hasClass(checkedCls)) {
		$this.removeClass(checkedCls);
	} else {
		$this.addClass(checkedCls).parent().parent().siblings().find(ticketRadioNode).removeClass(checkedCls);
		$this.parents('[data-node=ticketsBox]').siblings('div').find(ticketRadioNode).removeClass(checkedCls);
	}
});