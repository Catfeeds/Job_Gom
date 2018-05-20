/**
 * 个人中心首页确认收货
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');

var $receiveGoods = $('[data-action=receiveGoods]');

var showPop = function() {
    confirm('', {
        content: '<p class="pay-pop-p del-pop-p"><em class="iconn-25"></em>请收到货后再确认收货</p>',
        okCls: '',
        ok: function() {
            receiveGoods();
        }
    });
}
var receiveGoods = function() {
    fetch.get(url.get('confirmGoods'), {
        data: {
            orderId: $receiveGoods.attr('data-orderId'),
            shippingGroupId: $receiveGoods.attr('data-shippingGroupId')
        }
    }).done(function(data) {
        if (data.success === true && data.data.pOrderConfirm === true) {
            window.location.reload();
        }
    }).fail(function() {
        alert('加载失败');
    });
};
var init = function() {
    $receiveGoods.on('click', showPop);
};
module.exports = {
    init: init
};