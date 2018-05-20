/**
 * 确认收货
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');
var toast = require('module/hint').init;
var bubble = require('module/popup/bubble');
var receiptGoods = require('module/ucReceiptGoods');

var returnChangeTpl = require('./returnChange.tpl');

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