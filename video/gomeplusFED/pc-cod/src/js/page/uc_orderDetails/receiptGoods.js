/**
 * 订单详情页收货操作
 * @author Zhengchun Fu
 */
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');
var toast = require('module/hint').init;
var bubble = require('module/popup/bubble');
var receiptGoods = require('module/ucReceiptGoods');

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