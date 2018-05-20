/**
 * 确认收货
 * @author Zhengchun Fu
 */
var toast = require('module/hint').init;
var receiptGoods = require('module/ucReceiptGoods');

var confirmReceiptNode = '[data-action=confirmReceipt]';
var delayReceiptNode = '[data-action=delayReceipt]';

var $orderList = $('[data-node=orderList]');

// 确认收货
var confirmReceipt = function() {
    $orderList.on('click', confirmReceiptNode, function() {
        var $this = $(this);
        var orderId = $this.data('orderid');
        var postId = $this.data('postid');

        receiptGoods.confirmReceipt({
            orderId: orderId,
            postId: postId,
            okFn: function() {
                location.reload();
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