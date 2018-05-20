/**
 * @author Zhengchun Fu
 * 确认订单页--优惠券--使用国美币
 */
var gomeCoinTpl = require('./gomeCoin.tpl');
var Dialog = require('dialog');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var f2Y = require('utils/fenToYuan'); // 分转成元

// tmod helpers
require('module/tmodHelper/f2Y')();

var gomeCoin = $_CONFIG.gomeCoin;
var total = parseFloat(gomeCoin.totalRebate);
var useable = parseFloat(gomeCoin.useableRebate);

var canUseCoinPrice = useable >= total ? total : useable;

var useGomeCoin = {
    canUse: 0,
    checked: false,
    bindTips: function(price) {

        function setTips(str) {
            $('[data-node=useGomeCoin]').html(str);
        }

        var basePrice = price - 100;
        var tips = '';
        var status = this.checked ? '已抵扣' : '当前可用';

        basePrice = basePrice >= canUseCoinPrice ? canUseCoinPrice : basePrice;

        if (basePrice <= 0) {
            this.canUse = 0;
            tips = '无可用国美币';
        } else {
            this.canUse = basePrice;
            tips = status + '：<span class="looked-up">￥' + f2Y(basePrice) + '</span>';
        }
        setTips(tips);

    },
    initUseCoin: function(orderDiscountPrice) {
        this.bindTips(orderDiscountPrice);
        return 0;
    },
    showPop: function(data, okfn) {
        data = data || {};
        okfn = okfn || function() {};

        var defaults = {
            modal: true,
            fixed: true,
            content: gomeCoinTpl(data),
            className: 'pop-box',
            okValue: '确定',
            okCls: 'pc-btn coupon-btn',
            ok: okfn
        };
        return Dialog(defaults).show();
    },
    bindEvents: function() {
        var _this = this;
        var usePrice = 0;
        var ticketsDiscount,
            orderDiscountPrice,
            gomeCoinDiscount = 0;

        var saveGomeCoinData = function(coins) {
            $('[data-action=useGomeCoin]').data('gomeCoins', coins);
        };

        Pubsub(channel.confirmOrder.setGomeCoin).sub(function(data) {

            // 抵扣的优惠券
            ticketsDiscount = data.ticketsDiscount;

            // 订单折扣后的价格：商品总价-抵扣的优惠券价格
            orderDiscountPrice = data.orderDiscountPrice;

            // 国美币抵扣价格
            // gomeCoinDiscount = parseFloat(data.gomeCoinDiscount);
            _this.bindTips(orderDiscountPrice);

            gomeCoinDiscount = _this.canUse;
            reUseGomeCoin();

        });

        // 修改优惠券使用后重新判断国美币的使用
        var reUseGomeCoin = function() {
            if (_this.checked) {
                usePrice = gomeCoinDiscount;
            } else {
                usePrice = 0;
            }
            saveGomeCoinData(usePrice);

            Pubsub(channel.confirmOrder.setFinalPrice).pub({
                // 优惠券抵扣金额
                ticketsDiscount: ticketsDiscount,
                // 订单折扣后的金额：商品总价-优惠券抵扣的金额
                orderDiscountPrice: orderDiscountPrice,
                // 国美币已抵扣的金额
                gomeCoinDiscount: usePrice
            });

            // 更新国美币使用信息
            Pubsub(channel.confirmOrder.gomeMoney).pub({
                gomeMoney: usePrice
            });

        };

        // 保存国美币使用情况
        var saveGomeCoin = function() {
            if ($('[data-action=gomeCoinRadio]').hasClass('menu-radio-checked')) {
                usePrice = $('[data-action=gomeCoinRadio]').data('coin') / 1;
                saveGomeCoinData(usePrice);
                _this.checked = true;
            } else {
                usePrice = 0;
                _this.checked = false;

                saveGomeCoinData(0);
            }

            _this.bindTips(orderDiscountPrice);
            Pubsub(channel.confirmOrder.setFinalPrice).pub({
                // 优惠券抵扣金额
                ticketsDiscount: ticketsDiscount,
                // 订单折扣后的金额：商品总价-优惠券抵扣的金额
                orderDiscountPrice: orderDiscountPrice,
                // 国美币已抵扣的金额
                gomeCoinDiscount: usePrice
            });

        };

        // 弹窗显示
        $('[data-action=useGomeCoin]').on('click', function() {
            if (_this.canUse <= 0) {
                return false;
            }
            var data = {
                checked: _this.checked,
                coinVal: _this.canUse
            };
            _this.showPop(data, saveGomeCoin);

        });
        // 选择是否使用国美币
        $('body').on('click', '[data-action=gomeCoinRadio]', function() {
            $(this).toggleClass('menu-radio-checked');
        });
    }
};

module.exports = useGomeCoin;