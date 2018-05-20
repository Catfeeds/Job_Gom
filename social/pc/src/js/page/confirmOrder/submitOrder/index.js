var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');

var userCardTips = require('module/popup/userCardTips');

var $submitOrder = $('[data-action=submitOrder]');

/* "invoice":{                // Object，开发票，如下信息必须填写。
     "type":1,                // Integer，发票类型1：普通发票  
     "titleType":1,           // Integer，1：个人，2：单位
     "title":"*公司",         // String，发票内容
     "content":"键盘"         // String，发票明细
 }*/

var $conf = $_CONFIG;

// 设置发票信息
var getInvoiceData = function() {
    var $invoice = $('[data-node=invoice]');
    var type = $invoice.data('t');
    var title = $invoice.data('n');
    if (type > 0) {
        return {
            hasInvoice: 1,
            invoice: {
                type: 1,
                titleType: type,
                title: title,
                content: "明细"
            }
        };
    }
    return {
        hasInvoice: 0,
        invoice: {}
    };
};

var getOrderData = function() {
    function makeData(list) {
        var newList = [];
        $.each(list, function(i, v) {
            var data = {
                "id": v.id,
                "planId": v.planId,
                "couponPlat": 0
            };
            newList.push(data);
        });
        return newList;
    }
    var productInfo = $conf.orderList;
    var couponsList = $('[data-action=useTickets]').data('coupons');
    var gomeMoneyVal = $('[data-action=useGomeCoin]').data('gomeCoins') || 0;
    var buyerMsg = $('[data-node=buyerMsg]').val();
    var invoiceData = getInvoiceData();
    couponsList = makeData(couponsList);

    return {
        "addressId": $conf.currentAddress.id, // 收货地址ID
        "payType": 4, // Integer,必填，默认为4，v2版本目前只能为4
        "delivery": { // Object,必填，发货信息
            "receivingTimeType": 1, // Integer，必填，送货时间类型,1:工作日，2：周末，3：全部
            "needConfirmation": true, // Boolean,必填，默认false，送货前是否确认
            "memo": buyerMsg // String，必填，送货备注
        },
        "hasInvoice": invoiceData.hasInvoice, // 是否开发票
        "invoice": invoiceData.invoice, // 发票信息
        "coupons": couponsList, // 优惠券使用列表
        "gomeMoney": gomeMoneyVal, // 使用的国美币
        "orders": productInfo, // 商品信息
        "accoss": $_CONFIG.isCross // 跨境商品
    };
};

var checkUserCardTips = function() {
    var offset = $submitOrder.offset();
    var tipsHTML = userCardTips({
        left: offset.left - 120,
        top: offset.top - 80,
    }, true);
    var $tips = $(tipsHTML);
    $('body').append($tips);

    setTimeout(function() {
        $tips.remove();
    }, 6000);

    $tips.on('click', 'a', function() {
        $tips.remove();
        $('body, html').scrollTop(0);
        $('[data-node=curAddr]').parents('tr').find('[data-action=editAddr]').click();
    });
};

var firing = false;
// 提交订单
var submit = function() {

    if (firing) {
        return;
    }
    firing = true;
    $submitOrder.addClass('btn-default');

    var orderData = getOrderData(); // 获取订单数据
    // console.log(JSON.stringify(orderData));
    // return false;
    var fid = $conf.fid;
    fetch.post(url.get('submitOrder') + '?fid=' + fid, {
        data: {
            proJson: JSON.stringify(orderData)
        }
    }).done(function(data) {
        if (data && data.success === true) { // 提交成功,进入支付页面
            // return false;
            location.href = $_CONFIG.order_domain + 'order/paydetail?fid=' + fid;
        } else {
            // var msg = data.msg;
            var msg = data.message;
            var code = data.code;
            var regNoAddr = /\[881064\]/;
            var regNoGoods = /\[881043\]/;
            var newMsg = msg.substring(0, msg.indexOf('错误码[') - 1);

            // 跨境商品信息核对
            if (code == '100030') {
                checkUserCardTips();
                return false;
            }

            if (code == '881011') {
                location.href = $_CONFIG.passport_domain + '/login/index';
                return false;
            }
            if (regNoAddr.test(msg)) {
                confirm(newMsg, {
                    autofocus: false,
                    okValue: '修改配送地址',
                    ok: function() {
                        $(document).scrollTop(0);
                        firing = false;
                        $submitOrder.removeClass('btn-default');
                    },
                    okCls: 'red',
                    cancelValue: '取消'
                });
                return false;
            }

            if (regNoGoods.test(msg)) {
                confirm(newMsg, {
                    autofocus: false,
                    okValue: '返回修改',
                    ok: function() {
                        window.history.back();
                    },
                    okCls: 'red',
                    cancelValue: '取消'
                });
                return false;
            }

            /*if (msg === '购买商品中存在库存不足的商品' || msg === '购买商品中存在已下架的商品') {
            	msg = '你购买的商品中包含无货或已下架的商品，请返回修改';
            }*/
            confirm(msg, {
                okValue: '返回修改',
                ok: function() {
                    window.history.back();
                },
                okCls: 'red',
                cancelValue: '取消'
            });
        }
    }).fail(function() {

    }).always(function() {
        firing = false;
        $submitOrder.removeClass('btn-default');
    });
    return false;
};

var init = function() {

    // 绑定提交事件
    if ($conf.deliverInfo.success === true && $conf.orderList.length) {
        $submitOrder.on('click', submit);
    } else {
        // 提交订单按钮置灰,不可点击
        $submitOrder.addClass('btn-default');
    }
};

module.exports = {
    init: init
};