var fetch = require('io/fetch');
var url = require('io/url');
var redList = require('../../widget/goodInfo/redList');
var Dialog = require('dialog');
var ticketDialog = require('./ticketDialog.tpl');
var tickets = require('./ticketList.tpl');
var dateFormat = require('utils/fecha');
var couponSort = require('module/couponSort');
var checkLoginStatus = require('module/checkLoginStatus');


var $goodInfoBox = $('div[data-node="topGoodInfo"]');
var $coupon = $goodInfoBox.find('[data-active="coupon"]');


var $ticketLoading; //优惠券loading
var $ticketFail; //获取失败fail
var $ticketNormal; //无领取normal
var $ticketList; //优惠券列表
var $ticketLose; //优惠券列表为空提示
var $tabBox;
var ticketList = [];
var myTicket = [];
var couponAlert;


var getTicketByAjax = function(index) {

	fetch.post(url.get('ticketList'), {
		validate: true,
		data: {
			shopId: $GLOBAL_CONFIG.shopId,
			isLogin: $_CONFIG.islogin
		}
	}).done(function(result) {
		
		if (result && result.success && result.code === 200) {
			$ticketFail.hide();
			ticketList = result.data.shopCoupons.coupons;
			myTicket = result.data.myCoupons.coupons !== undefined ? result.data.myCoupons.coupons : [];
			myTicket = couponSort(myTicket);
			ticketList = couponSort(ticketList);

			for (var i = 0, len = ticketList.length; i < len; i++) {
				ticketList[i].effectiveStartTime = dateFormat.format(new Date(ticketList[i].effectiveStartTime), 'YYYY.MM.DD');
				ticketList[i].effectiveEndTime = dateFormat.format(new Date(ticketList[i].effectiveEndTime), 'YYYY.MM.DD').substr(5, 10);
				ticketList[i].money = ~~(ticketList[i].money / 100);
				ticketList[i].usageRule.minAmount = ~~(ticketList[i].usageRule.minAmount / 100);
			}
			for (var i = 0, len = myTicket.length; i < len; i++) {
				myTicket[i].effectiveStartTime = dateFormat.format(new Date(myTicket[i].effectiveStartTime), 'YYYY.MM.DD');
				myTicket[i].effectiveEndTime = dateFormat.format(new Date(myTicket[i].effectiveEndTime), 'YYYY.MM.DD').substr(5, 10);
				myTicket[i].money = ~~(myTicket[i].money / 100);
				myTicket[i].usageRule.minAmount = ~~(myTicket[i].usageRule.minAmount / 100);
			}
			setList();

		} else {
			$ticketFail.show();
		}
	}).fail(function() {
		if (checkLoginStatus()) {
			$ticketFail.show();
		}
	}).always(function() {
		if (checkLoginStatus()) {
			$ticketLoading.hide();
			if( !isNaN(index) ) {
				$tabBox.hide().eq(index || 0).show();
			} else {
				$tabBox.hide().eq(0).show();
			}	
		}
	});
}

var getTicketList = function() {
	$ticketLoading = $('[data-node="ticketLoading"]');
	$ticketFail = $('[data-node="ticketFail"]');
	$ticketNormal = $('[data-node="ticketNormal"]');
	$tabBox = $('[data-node="ticketBox"]');
	$ticketList = $tabBox.find('[data-node="ticketList"]');
	$ticketLose = $('[data-node="ticketLose"]');

	if (ticketList.length === 0) {
		getTicketByAjax();
	} else {
		$ticketLoading.hide();
		$tabBox.eq(0).show();
		setList();
	}
}

var setMyList = function() {

	$ticketNormal.hide();
	$ticketList.eq(1).html(tickets({
		isMy: true,
		myTickets: myTicket
	}));

	setTimeout(function() {

		couponAlert.reset();

	}, 100);
}

var setList = function() {
	
	if (ticketList.length > 0) {

		$ticketList.eq(0).html(tickets({
			isMy: false,
			ticketList: ticketList
		}));

	} else {
		$ticketLose.show();
	}

	if (myTicket.length === 0) {

		$ticketNormal.show();

	} else {

		setMyList();
	}

	setTimeout(function() {

		couponAlert.reset();
		
	}, 100);
}

var events = function() {
	$(document).on('click', '[data-action="getSuccess"]', function() {
		$(this).hide();
	}).on('click', '[data-action="ticketTab"]', function() {
		if (!$(this).hasClass('active')) {
			var $tabs = $('[data-action="ticketTab"]');
			var index = $tabs.index($(this));
			var $tabBoxs = $('[data-node="ticketBox"]');
			$tabBoxs.hide().eq(index).show();
			$tabs.removeClass('active').eq(index).addClass('active');
			couponAlert.reset();
		}
	}).on('click', '[data-action="toGetTicket"]', function() {

		var $tabs = $('[data-action="ticketTab"]');
		var $tabBoxs = $('[data-node="ticketBox"]');
		$tabBoxs.hide().eq(0).show();
		$tabs.removeClass('active').eq(0).addClass('active');
	}).on('click', '[data-node="ticketFail"]', function() {

		$ticketLoading.show();
		getTicketByAjax($('[data-node="ticketFail"]').index($(this)));
	});
}

var hintHide = function(obj) {

	setTimeout(function() {
		obj.find('[data-action="getSuccess"]').hide();
	}, 2000);
}

var getTicket = function() {
	var ticketId;
	var _this;
	var ticketInfo = {};
	var $list;
	$(document).on('click', '[data-action="getTicket"]', function() {
		ticketId = $(this).attr('data-id');
		_this = $(this);
		if ($_CONFIG.islogin === '0') {
			window.location.href = $_CONFIG.passport_domain + 'login/index?redirect=' + $_CONFIG.current_url
		} else {
			$list = _this.parents('li').eq(0);
			fetch.post(url.get('getTicket'), {
				data: {
					batchSn: ticketId,
					userId: $_CONFIG.userId
				}
			}).done(function(data) {
				if (data && data.code === 200) {
					_this.next().text('领取成功').show();
					ticketInfo = {
						money: $list.find('[data-node="ticketMoney"]').text(),
						usageRule: {
							minAmount: $list.find('[data-node="ticketMin"]').text()
						},
						effectiveEndTime: $list.find('[data-node="ticketEnd"]').text(),
						effectiveStartTime: $list.find('[data-node="ticketStart"]').text()
					}
					myTicket.push(ticketInfo);
					setMyList();
					if (~~data.data.userRemainingAvailableQuantity === 0) {
						$list.addClass('success');
						_this.text('领取成功').removeAttr('data-action');
					}

				} else if (data && data.code === 422 && data.message.indexOf('领取更多了') !== -1) {

					_this.next().text('领取超限').show();
					$list.addClass('success');
					_this.text('领取成功').removeAttr('data-action');

				} else {
					_this.next().text('领取失败').show();
				}
				hintHide($list);
			}).fail(function() {

				_this.next().text('领取失败').show();
				hintHide($list);
			});
		}
	});
}

var init = function() {

	$coupon.on('click', function() {
		couponPackage();		
	});
	events();
}

function couponPackage(){
	if (checkLoginStatus()) {
		couponAlert = Dialog({
			title: '领取优惠券',
			modal: true,
			fixed: true,
			content: ticketDialog({
				imgUrl: $_CONFIG.imgpath
			}),
			className: 'pop-box'
		});
		couponAlert.show();
		getTicket();
	}
	getTicketList();	
}

module.exports = {
	init: 　init
}