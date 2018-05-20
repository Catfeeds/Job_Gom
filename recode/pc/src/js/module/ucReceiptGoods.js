/**
 * 确认收货方法
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');
var toast = require('module/hint').init;
var tipsMsg = {
    confirmReceipt: '确认已收到货了吗？',
    confirmFail: '确认收货失败!网络可能出问题了~',
    delayReceipt: '确认延长7天收货时间吗？',
    delayFail: '延迟收货失败！网络可能出问题了~',
    confirmed: '已经确认收货'
};

// 确认收货
var confirmReceipt = function(options) {
    confirm(tipsMsg.confirmReceipt, {
        title: '确认收货',
        width: 500,
        className: 'pop-box',
        btnWrapCls: 'text-center',
        okCls: 'two-button two-button-red',
        cancelCls: 'two-button',
        ok: function() {
            fetch.post(url.get('confirmReceipt'), {
                data: {
                    orderId: options.orderId,
                    orderDeliveryId: options.postId
                }
            }).done(function(data) {
                var info = data.data;
                var status = info.status;
                var statusDesc = '交易成功';

                if (data.success === true) {
                    options.okFn(statusDesc);
                    return;
                }

                // 如果订单已经是待评价，执行确认收货的成功操作
                // 否则弹出失败信息
                if (status == 3) {
                    toast(tipsMsg.confirmed);
                    options.okFn(statusDesc);
                } else {
                    toast(data.message);
                }

            }).fail(function() {
                toast(tipsMsg.confirmFail);
            });
        }
    });
};

var delayReceipt = function(options) {
    confirm(tipsMsg.delayReceipt, {
        title: '延迟收货',
        width: 500,
        className: 'pop-box',
        btnWrapCls: 'text-center',
        okCls: 'two-button two-button-red',
        cancelCls: 'two-button',
        ok: function() {
            fetch.post(url.get('delayReceipt'), {
                data: {
                    orderId: options.id
                }
            }).done(function(data) {

                if (data.success === true) {
                    options.okFn();
                } else {
                    toast(data.message);
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                }

            }).fail(function() {
                toast(tipsMsg.delayFail);
            });
        }
    });
};

module.exports = {
    confirmReceipt: confirmReceipt,
    delayReceipt: delayReceipt
};