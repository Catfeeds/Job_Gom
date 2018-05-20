/**
 * 晒单
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var listHeadTpl = require('./listHead.tpl');
var noOrderTpl = require('./noOrder.tpl');
var orderListTpl = require('./orderList.tpl');

// // tmod helpers
require('module/tmodHelper/substrLen')();
require('module/tmodHelper/strf')();

var getShowMyOrdersUrl = 'showMyOrders';
var curPage = 1;
var pageSize = 15;
var $conf = $_CONFIG;
var tipsMsg = {
    loadFail: '加载失败'
};
var noOrderHTML = noOrderTpl($conf);

var $orderList = $('[data-node=orderList]');
var $loadMore = $('[data-node=pageLoadBtn]');
var $pageMore = $('[data-node=pageMore]');
var $pageLoading = $('[data-node=pageLoading]');
var $pageNothing = $('[data-node=pageNothing]');

var init = function() {

    // load the first page
    fetch.get(url.get(getShowMyOrdersUrl), {
        data: {
            pageNum: curPage,
            pageSize: pageSize
        }
    }).done(function(data) {
        var orders = {};
        var orderItemLength = 0;

        if (data.success === true) {
            orders.list = data.data.shareOrderItems;
            orders.domain = $conf;
            orderItemLength = orders.list.length;

            if (orderItemLength === 0) {
                $orderList.html(noOrderHTML);
                return false;
            }

            // add list head
            $orderList.html(listHeadTpl($conf));

            // render list
            var listHTML = orderListTpl(orders);
            $orderList.append(listHTML);

            // show the load more button
            $loadMore.show();
            if (orderItemLength >= pageSize) {

                // bind event for load more
                loadMore();
            } else {
                noMore();
            }

            // show my order goods
            submitToShowGoods();

        } else {
            $orderList.html(noOrderHTML);
        }
    }).fail(function() {
        $orderList.html(noOrderHTML);
    });
};

var submitToShowGoods = function() {
    $orderList.on('click', '[data-action=showGoods]', function() {
        var $itemJson = $(this).siblings('input[type=hidden]').clone();
        var $objForm = $('[data-node=showGoodsForm]');
        $objForm.append($itemJson);
        $objForm.submit();
    });
};

var loadMoreStyle = function(flag) {
    if (flag) {
        $pageMore.hide();
        $pageLoading.show();
    } else {
        $pageLoading.hide();
        $pageMore.show();
    }
};

var noMore = function() {
    $pageMore.hide();
    $pageLoading.hide();
    $pageNothing.show();
};

var loadMore = function() {
    $pageMore.on('click', function() {
        var page = curPage + 1;

        // 改变加载按钮样式
        loadMoreStyle(true);

        // 请求
        fetch.get(url.get(getShowMyOrdersUrl), {
            data: {
                pageNum: page,
                pageSize: pageSize
            }
        }).done(function(data) {
            var orders = {};

            if (data.success === true) {
                orders.list = data.data.shareOrderItems;
                orders.domain = $conf;

                // 加载按钮样式显示控制
                // 没有更多内容了
                if (!orders.list.length) {
                    noMore();
                    return false;
                }

                // TODO:加载更多
                var orderHTML = orderListTpl(orders);
                $orderList.append(orderHTML);
                curPage = page;

                // 如果加载的数据少于分页条数，则表示没有更多内容可加载了。
                if (orders.list.length < pageSize) {
                    noMore();
                } else {
                    loadMoreStyle(false);
                }

                // show my order goods
                submitToShowGoods();

            } else {
                alert(tipsMsg.loadFail);
                loadMoreStyle(false);
            }
        }).fail(function() {
            alert(tipsMsg.loadFail);
            loadMoreStyle(false);
        });
    });
};

init();
