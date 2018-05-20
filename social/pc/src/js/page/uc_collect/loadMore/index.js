/**
 * 加载更多收藏的商品、店铺、话题
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var Tiles = require('tiles');
var goodsTpl = require('./collectGoods.tpl');
var shopTpl = require('./collectShop.tpl');
var topicTpl = require('./collectTopic.tpl');
var noCollect = require('./no_collect.tpl');

require('module/tmodHelper/truncateLenByJson')();

var $collectList = $('[data-node=collectList]');
var $dataList = $('[data-node=dataList]');
var $showBatch = $('[data-node=showBatch]');
var $hideBatch = $('[data-node=hideBatch]');
var $tabListA = $('[data-node=tabList] a.active');
var $loadMore = $('[data-action=loadMore]');
var $loadedMore = $('[data-node=loadedMore]');
var $loaded = $('[data-node=loaded]');
var $noContent = $('[data-node=noContent]');
var $dataFail = $('[data-node=dataFail]');
var $dataFailed = $('[data-node=dataFailed]');
var dataListBox = '[data-node=dataListBox]';
var selectLayer = '[data-node=selectLayer]';
var delPopUp = '[data-node=delPopUp]';

var hide = 'hide';
var removeDel = 'remove-del';

var tiles = new Tiles({
    columnWidth: 242
}, '[data-node=tiles]');
var type = $tabListA.data('type');

var firing = false;
var page = 1;
var finished = false;

var beforeLoad = function() {
    $loadedMore.addClass(hide);
    $loaded.removeClass(hide);
    $dataFail.addClass(hide);
    $dataFailed.addClass(hide);
    $(dataListBox).removeClass(removeDel);
    $(selectLayer).addClass(hide);
    $(delPopUp).addClass(hide);
    $hideBatch.addClass(hide);
};

var loadMore = function() {
    $loadedMore.removeClass(hide);
    $loaded.addClass(hide);
};

var noMoreData = function() {
    $noContent.removeClass(hide);
    $loadedMore.addClass(hide);
    $loaded.addClass(hide);
};

var dataFail = function() {
    if (!$(dataListBox).length) {
        $loaded.addClass(hide);
        $dataFail.removeClass(hide);
        $showBatch.addClass(hide);
    } else {
        $loaded.addClass(hide);
        $dataFailed.removeClass(hide);
    }
};

var param = {
    url: {
        goods: url.get('getCollectGoods'),
        shop: url.get('getCollectShop'),
        topic: url.get('getCollectTopic')
    },
    tpl: {
        goods: goodsTpl,
        shop: shopTpl,
        topic: topicTpl
    }
};

//加载中
var load = function() {
    if (firing) {
        return;
    }
    if (finished) {
        noMoreData();
        return;
    }
    firing = true;
    beforeLoad();
    fetch.post(param.url[type], {
        data: {
            pageNum: page
        }
    }).done(function(data) {
        if (data.success === true) {
            page++;
            var loadData = data.data || {};
            var collect = loadData.collections || [];
            collect.mallDomain = $_CONFIG.mall_domain;
            collect.groupDomain = $_CONFIG.group_domain;
            collect.type = type;
            if (collect.length == 0) {
                finished = true;
                if (!$(dataListBox).length) {
                    $loaded.addClass(hide);
                    $dataList.addClass(hide);
                    $collectList.append($(noCollect({
                        type: type,
                        mainDomain: $_CONFIG.main_domain
                    })));
                    $showBatch.addClass(hide);
                } else {
                    noMoreData();
                }
            } else {
                $showBatch.removeClass(hide);
                if (type == 'topic') {
                    tiles.appended($(param.tpl[type]({
                        list: collect
                    })));
                } else {
                    $dataList.append($(param.tpl[type]({
                        list: collect
                    })));
                }
                if (collect.length < loadData.pageSize) {
                    noMoreData();
                } else {
                    loadMore();
                }
            }
        } else {
            dataFail();
        }
    }).fail(function() {
        dataFail();
    }).always(function() {
        firing = false;
    });
    return false;
};
var init = function() {

    load();
    $loadMore.on('click', load);
};
module.exports = {
    init: init
};