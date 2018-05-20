/**
 * 取消订单
 * @author Zhengchun Fu
 */
var cancelOrder = require('module/ucCancelOrder');

var unPayCancelNode = '[data-action=unPayCancel]';
var payedCancelNode = '[data-action=payedCancel]';
var orderStautsNode = '[data-node=orderStauts]';

var $orderList = $('[data-node=orderList]');

// 未付款取消订单
var unPayCancelOrder = function() {
    $orderList.on('click', unPayCancelNode, function() {
        var $this = $(this);
        var $toPayCount = $('[data-node=dfkNum]');
        var toPayNum = $toPayCount.data('count');
        var orderId = $this.data('id');

        if (toPayNum < 1) {
            return false;
        }

        cancelOrder({
            isPayed: false,
            id: orderId,
            okFn: function() {
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