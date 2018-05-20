var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var checkLoginStatus = require('module/checkLoginStatus');
require('plugin/velocity');

var hint = require('module/hint');
// 尝试使用id,不推荐使用
var $goodsThum = $('#goodsThum');
var $wrap = $goodsThum.parent();
// var $cart = $('[data-node=_cart_]');
var $addCartErr = $('[data-node=addCartErr]');
// 商品icon宽,高
/*var goodsW;
var goodsH;
var cartW;
var cartH;*/
var addCarErrNotice = $addCartErr.text();

// var $topElement = $('[data-node="goodsName"]');
// var $shopContent = $('[data-node="goodsContent"]');
var $addCarElement = $('[data-node="bannerShopCar"]');
var animate = function(done) {
    var $mover = $goodsThum.clone();
    $mover.appendTo($wrap).show();

    var nSt = $(window).scrollTop();
    var nSl = $(window).scrollLeft();
    //移动元素
    var moverOffset = $mover.offset();
    //结束元素
    var addCarElementH = $addCarElement.height();
    var addCarElementW = $addCarElement.width();
    var moverH = $mover.height();
    var moverW = $mover.width();
    var addCarElementOffset = $addCarElement.offset();
    //初始位置
    var start = {
        top: moverOffset.top - nSt - moverH / 2,
        left: moverOffset.left - nSl - moverW / 2
    };
    //结束位置
    var end = {
        top: addCarElementOffset.top - nSt + (addCarElementH - moverH) / 2,
        left: addCarElementOffset.left - nSl + (addCarElementW - moverW) / 2
    };
    var speed = 1.2;
    //最高点
    var vertex_top;
    var distance;
    var steps;
    var ratio;
    var vertex_left;
    var curvature;
    var count = -1;
    var endLeft;
    var endTop;

    $mover.velocity({
        left: 1000, //end.left,
        top: 1000 //end.top 
    }, {
        begin: function(elements) {
            nSl = $(window).scrollLeft();
            nSt = $(window).scrollTop();

            moverOffset = $mover.offset();
            addCarElementOffset = $addCarElement.offset();

            count = -1; //重置

            start = {
                top: moverOffset.top - nSt - moverH / 2,
                left: moverOffset.left - nSl + moverW / 2
            };
            end = {
                top: addCarElementOffset.top - nSt + (addCarElementH - moverH) / 2,
                left: addCarElementOffset.left - nSl + (addCarElementW - moverW) / 2
            };

            $(elements).css({
                position: 'fixed',
                margin: 0,
                top: start.top,
                left: start.left,
                zIndex: 100
            });

            vertex_top = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
            if (vertex_top < 20) {
                // 可能出现起点或者终点就是运动曲线顶点的情况
                vertex_top = Math.min(20, Math.min(start.top, end.top));
            }

            distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2));
            // 元素移动次数
            steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / speed);
            ratio = start.top == vertex_top ? 0 : -Math.sqrt((end.top - vertex_top) / (start.top - vertex_top));
            vertex_left = (ratio * start.left - end.left) / (ratio - 1);
            // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
            curvature = end.left == vertex_left ? 0 : (end.top - vertex_top) / Math.pow(end.left - vertex_left, 2);
        },
        progress: function(elements) {
            // 计算left top值
            endLeft = start.left + (end.left - start.left) * count / steps;
            endTop = curvature == 0 ? start.top + (end.top - start.top) * count / steps : curvature * Math.pow(endLeft - vertex_left, 2) + vertex_top;
            // 运动过程中有改变大小
            /*if (end.width != null && end.height != null) {
              var i = steps / 2,
                width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
                height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
              $element.css({width: width + "px", height: height + "px", "font-size": Math.min(width, height) + "px"});
            }*/
            count++;
            $(elements).css({
                left: endLeft,
                top: endTop
            });

            if (count === steps + 1) {
                $mover.velocity("stop");
                $mover.hide().remove();
                done && done();
            }
        },
        duration: speed * 1000
    });
};

var showErrorTip = function(msg) {
    var timer;
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    $addCartErr.show().removeClass('hide').text(msg);
    timer = setTimeout(function() {
        $addCartErr.hide();
    }, 2000);
};

var init = function(elementSelector) {
    var $select = elementSelector.parent ? $(elementSelector.parent) : $(elementSelector.selector),
        $selector = elementSelector.parent ? elementSelector.selector : undefined;

    $select.on('click', $selector, function() {
        var _this = this,
            proNum = ~~$('[data-node="count"]').val();
        var objs = {
            validate: true,
            data: {
                mshopid: ~~$_CONFIG.shopId,
                skuid: ~~$_CONFIG.skuId,
                quantity: proNum,
                kid: $_CONFIG.kid + '',
                source_code: $_CONFIG.sourceCode
            },
            onLogin: noRefreshFetch,
            refresh: true
        }

        //无刷新登录
        function noRefreshFetch(o) {

            if ($(_this).hasClass('btn-default')) return false;
            if ($_CONFIG.skuId === '0') {
                hint.init('请选择规格参数');
                return false;
            }

            fetch.get(url.get('addShopCar'), o).done(function(result) {
                if (result.code === 200) {
                    animate(function() {
                        Pubsub(channel.shopCar.headerShopCar).pub({
                            proNum: proNum
                        });
                        var itemNum = parseInt($addCarElement.find('span').text());

                        if (itemNum + proNum <= 99) {
                            $addCarElement.find('span').text(itemNum + proNum);
                        } else if (itemNum + proNum > 99) {
                            $addCarElement.find('span').text('99+');
                        }

                    });
                } else {
                    // 加入失败
                    showErrorTip(result.message);
                    // alert(result.message)
                }

            }).fail(function() {
                if (checkLoginStatus()) showErrorTip(addCarErrNotice);
            });
        }
        noRefreshFetch(objs);
        return false;
    });
}

module.exports = init;