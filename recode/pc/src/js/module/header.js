var searchInit = require('module/search');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var loginPop = require('module/popup/login');
var checkLoginStatus = require('module/checkLoginStatus');
var fetch = require('io/fetch');

var $buycar = $('[data-node=buycar]');
//获取购物车数量
function getCarNum() {
    var domain = $_CONFIG.cart_service_gome;
    var api = domain + '/home/api/cart/getCartItemCount';
    fetch.get(api, {
        dataType: "jsonp"
    }).done(function(data) {
        if (data.success) {
            var cartNum = data.data;
            cartNum = cartNum > 99 ? '99+' : cartNum;
            $buycar.text(cartNum);
        } else {
            $buycar.text('0');
        }
    }).fail(function() {
        $buycar.text('0');
    })
}

var init = function() {
    var $header = $('div[data-node="header"]');
    // var $messageBtn = $header.find('a[data-node="message"]');
    var $buycar = $header.find('[data-node="buycar"]');
    var $dialog = $('div[data-node="dialogcode"]');
    // var $dialogClose = $dialog.find('a[data-node="dialogCodeClose"]');
    // APP下载二维码按钮,用于发送统计数据
    var $dlQRCode = $header.find('[data-node="dlQRCode"]');
    //IM入口选择器
    var $entryBtn = $('[data-action=entryBtn]');

    searchInit('input[data-node="selector"]');
    //购物车数量
    //getCarNum();

    //二维码弹窗
    $(document).on('click', '[data-node="dialogCodeClose"]', function() {
        $dialog.hide();
    });

    //二维码弹窗
    $('[data-action="codeDialog"]').on('click', function() {
        if ($dialog.length > 0) {
            $dialog.show().find('p').html($(this).attr('data-value'));
        } else {
            var html = '<div class="windows-bg" data-node="dialogcode">' + '<div class="windows-ma">' + '<a href="javascript:;" data-node="dialogCodeClose" class="icon icon-close">&#xea5a;</a>' + '<img src="https://js.meixincdn.com/m/pc/dist/images/public/down-ma.png">' + '<p data-node="test" data-value="查看订单、物流信息、办理退换货请下载国美APP<br/>客服电话：010-57098333">' + $(this).attr('data-value') + '</p>' + '</div>' + '</div>';
            $('body').append(html);
            $dialog = $('div[data-node="dialogcode"]');
        }
        return false;
    });
    //购物车
    /* Pubsub(channel.shopCar.headerShopCar).sub(function(data) {

        var itemNum = parseInt($_CONFIG.cartProdNumReal);
        $_CONFIG.cartProdNumReal = itemNum + data.proNum;
        if (itemNum + data.proNum <= 99) {
            $buycar.text(itemNum + data.proNum);
        } else if (itemNum + data.proNum > 99) {
            $buycar.text('99+');
        }
    });
*/
    $('[data-node="_cart_"]').on("click", function() {
        if (!checkLoginStatus()) {
            var href = $(this).attr("href");
            loginPop(function() {
                location.href = href;
            })
            return false;
        }
    })

    $('[data-action="feedback"]').on("click", function() {
        if (!checkLoginStatus()) {
            var href = $(this).attr("href");
            loginPop(function() {
                location.href = href;
            })
            return false;
        }
    });

    //IM入口
    function gotoPage() {
        var href = $entryBtn.attr('href');
        window.open(href);
        return false;
    }
    $entryBtn.on('click', function() {
        if (!checkLoginStatus()) {
            loginPop(gotoPage);
            return false;
        }
    });

    // 统计数据
    $dlQRCode.on('mouseenter', function() {
        if (window.BP) {
            BP.send({
                event_id: 'B000P003'
            });
        }
    });

};

init();
