/**
 * 商品数量加减修改，价格联动
 * @author Zhengchun Fu
 */
require('spinner');
var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var alert = require('module/popup/alert');

// 样式，节点变量
var disabledClass = 'disabled';
var stockNode = 'stock';
var upBtnNode = '[data-spin=up]';
var downBtnNode = '[data-spin=down]';
var spinnerNode = '[data-node=spinner]';
var overCountNode = '[data-node=overCount]';

// 数据配置信息
var maxBuyCount = 20;

// 提示信息文案
var tipsMsg = {
    updateFail: '商品数量修改失败,网络可能异常'
};

function changeGoodsCount() {
    $(spinnerNode).spinner({
        min: 1,
        max: 21,
        changing: function(e, newVal, oldVal) {

            function setVal(obj, val) {
                obj.val(val);
                obj.attr('value', val);
            }

            var stock = $(this).data(stockNode);
            var upBtn = $(this).siblings(upBtnNode);
            var downBtn = $(this).siblings(downBtnNode);
            var $overCountTips = $(this).parent(spinnerNode).siblings(overCountNode);

            if (newVal > maxBuyCount) {
                if (newVal < stock) {
                    $overCountTips.show();
                }
                newVal = maxBuyCount;
                upBtn.addClass(disabledClass);

            } else {
                $overCountTips.hide();
            }

            setVal($(this), newVal);

            if (newVal >= stock) {
                setVal($(this), stock);
                newVal = stock;
                upBtn.addClass(disabledClass);
            } else {
                upBtn.removeClass(disabledClass);
            }

            if (newVal == 1) {
                downBtn.addClass(disabledClass);
            } else {
                downBtn.removeClass(disabledClass);
            }

            // 服务器交互
            var diffCount = newVal - oldVal;

            var $thisGood = $(this).parents('tr').find('[data-node=checkGoods]'),
                shopId = $thisGood.data('shopid'),
                skuId = $thisGood.data('skuid'),
                proNum = diffCount,
                sourceCode = $thisGood.data('sourcecode').sourceCode;

            $(this).prop('disabled', true);
            var $this = $(this);
            fetch.get(url.get('cartUpdateGoods'), {
                data: {
                    mshopid: shopId,
                    skuid: skuId,
                    quantity: proNum,
                    source_code: sourceCode
                }
            }).done(function(data) {

                if (data.success === true) {

                    // 通知头部购物车修改数量
                    Pubsub(channel.shopCar.headerShopCar).pub({
                        proNum: proNum
                    });

                } else {
                    setVal($(this), oldVal);
                }

            }).fail(function() {

                setVal($this, oldVal);
                alert(tipsMsg.updateFail);

            }).always(function() {

                $this.prop('disabled', false);

            });

            var unitPrice = $(this).parents('tr').find('[data-node=unitPrice]').text();
            var count = $(this).val();
            var price = unitPrice * count;

            $(this).parents('tr').find('[data-node=price]').text(price.toFixed(2));

            // 广播修改选择的商品数量信息
            Pubsub(channel.shopCar.cartListGoods).pub();
        }
    });

}

// 初始化商品数量为1，减号置灰
function checkIsOnlyOne() {
    var $countList = $('[data-node=count]');
    $.each($countList, function(i, ele) {
        if ($(ele).val() == 1) {
            $(ele).siblings(downBtnNode).addClass(disabledClass);
        }
    });
}

function init() {
    checkIsOnlyOne();
    changeGoodsCount();
}

module.exports = {
    init: init
};