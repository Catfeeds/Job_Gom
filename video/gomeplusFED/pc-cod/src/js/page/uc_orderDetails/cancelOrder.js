/**
 * 个人中心订单详情页
 * @author Zhengchun Fu
 */
var confirm = require('module/popup/confirm');
var bubble = require('module/popup/bubble');
var cancelOrder = require('module/ucCancelOrder');

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