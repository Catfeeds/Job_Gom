/**
 * 取消订单
 * @author Zhengchun Fu
 */
var confirm = require('module/popup/confirm');
var bubble = require('module/popup/bubble');
var cancelOrder = require('module/ucCancelOrder');

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