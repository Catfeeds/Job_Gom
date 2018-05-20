var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');

var orderState = $('[data-node=orderState]');
var subOrderBtn = orderState.find('[data-action=subOrder]');
var payRadio = orderState.find('[data-action=payRadio]');

var orderDetail = $GLOBAL_CONFIG.orderDetail;
var fid = $GLOBAL_CONFIG.fid;

var curPayMent = 'wx';

//选择支付方式
function choosePayMethod() {
    $('[data-node=paySubmit]').on('click', 'label', function() {
        var $this = $(this);
        var checkedCls = 'menu-radio-checked';
        var payRadioNode = '[data-action=payRadio]';
        var $payRadio = $this.find(payRadioNode);
        var val = $this.find('input').val();
        var activeCls = 'active';
        $payRadio.addClass(checkedCls);
        $this.siblings().find(payRadioNode).removeClass(checkedCls);
        $this.addClass(activeCls).siblings('label').removeClass(activeCls);

        switch (val) {
            case '110004':
                curPayMent = 'wx';
                break;
            case '210004':
                curPayMent = 'zfb';
                break;
                // no default
        }
    });
}

function showPayStatus() {
    confirm('请您到新打开的网银页面上进行支付，支付完成前请不要关闭窗口。', {
        content: '<p class="pay-pop-p"><em class="iconn-12"></em>请您到新打开的网银页面上进行支付，支付完成前请不要关闭窗口。</p>',
        title: '温馨提示',
        okCls: 'pay-finished-btn',
        okValue: '已完成支付',
        ok: function() {
            window.location.href = $_CONFIG.i_domain + 'order/';
        },
        cancelCls: 'pay-failed-btn',
        cancelValue: '支付遇到问题',
        btnWrapCls: 'pay-prompt-buttons'
    });
}

//提交订单支付
function submitOrder() {
    fetch.post(url.get('checkOrderPay'), {
        async: false,
        data: {
            orderid: orderDetail.mergerId
        }
    }).done(function(data) {
        var ua = navigator.userAgent.toLowerCase();
        var isWX = ua.indexOf('windowswechat') > 0 ? true : false;
        if (data.success === true) {
            $('[data-node=paySubmit]').submit();

            // 非微信访问，弹窗。
            if (!isWX) {
                showPayStatus();
            }

        } else {
            location.href = $_CONFIG.order_domain + 'order/show?orderid=' + orderDetail.mergerId;
        }
    }).fail(function(data) {
        alert('提交失败，网络似乎有问题~');
    });

}

function init() {
    choosePayMethod();
    $('[data-action=paySubmit]').on('click', submitOrder);
}

init();