/**
 * 加载更多收藏的商品、店铺、话题
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var resize = require('module/resize');
var Tiles = require('tiles');
var topicTpl = require('./collectTopic.tpl');
var noCollect = require('./no_collect.tpl');

require('module/tmodHelper/truncateLenByJson')();
require('module/tmodHelper/truncateByteLen')();

var $collectList = $('[data-node=collectList]');
var $dataList = $('[data-node=dataList]');
var $batchDel = $('[data-node=batch-del]');
var $showBatch = $('[data-node=showBatch]');
var $hideBatch = $('[data-node=hideBatch]');
var $total = $('[data-node=total]');
var $tabList = $('[data-node=tabList]');
var $tabListA = $('[data-node=tabList] a.active');
var $loadMore = $('[data-action=loadMore]');
var $loading = $('[data-action=loadMore] a');
var $loadSpan = $('[data-action=loadMore] span');
var $loadImg = $('[data-action=loadMore] img');
var $noContent = $('[data-node=noContent]');
var userName = '[data-node=userName]';
var dataListBox = '[data-node=dataListBox]';
var selectLayer = '[data-node=selectLayer]';
var showDelLayer = '[data-action=showDelLayer]';
var delPopUp = '[data-node=delPopUp]';

var hide = 'hide';
var disabled = 'disabled';
var removeDel = 'remove-del';
var loadingGif = $_CONFIG['imgpath'] + '/images/public/loading.gif';
var loadingPng = $_CONFIG['imgpath'] + '/images/circle/small-logo.png';

var firing = false;
var page = 1;
var finished = false;

var tiles;
var collect = '';
var dataAll = [];
var width = 250;

var beforeLoad = function() {
    $loadMore.removeClass(hide);
    $loadImg.attr('src', loadingGif);
    $loadSpan.html('正在加载更多话题…');
    $(dataListBox).removeClass(removeDel);
    $(selectLayer).addClass(hide);
    $(delPopUp).addClass(hide);
    $hideBatch.addClass(hide);
};

var loadMore = function() {
    $loadImg.attr('src', loadingPng);
    $loadSpan.html('下拉加载更多话题');
};

var noMoreData = function() {
    $loadImg.attr('src', loadingPng);
    $loadSpan.html('无更多加载项');
};

var dataFail = function() {
    $loadImg.attr('src', loadingPng);
    $loadSpan.html('加载失败，请重新尝试');
};

//加载
var load = function(page) {
    if (firing) {
        return;
    }
    if (finished) {
        noMoreData();
        return;
    }
    firing = true;
    beforeLoad();
    fetch.post(url.get('getCollectTopic'), {
        data: {
            pageNum: page
        }
    }).done(function(data) {
        if (data.success === true) {
            page++;
            var loadData = data.data || {};
            collect = loadData.topics || [];
            collect.groupDomain = $_CONFIG.group_domain;
            if (collect.length == 0) {
                finished = true;
                if (!$(dataListBox).length) {
                    $loadMore.addClass(hide);
                    $dataList.addClass(hide);
                    $collectList.append($(noCollect({
                        groupDomain: $_CONFIG.group_domain
                    })));
                    $showBatch.addClass(hide);
                } else {
                    noMoreData();
                }
            } else {
                $batchDel.removeClass(hide);
                $showBatch.removeClass(hide);
                tiles.appended($(topicTpl({
                    list: collect
                })));
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

//宽窄屏
var columnWidth = function() {
    var colWidth;
    var ss = resize();
    if (ss == 'small') {
        colWidth = 277
    } else {
        colWidth = 250
    }
    return colWidth;
}

//加载数据
var resizeLoad = function(page) {
    var colWidth = columnWidth();
    tiles = new Tiles({
        columnWidth: colWidth
    }, '[data-node=tiles]');

    load(page);
}

//显示删除按钮
var showDelBtn = function() {
    var $this = $(this);
    $this.find($(showDelLayer)).show();
    $this.find($(userName)).css({
        'width': 'auto',
        'white-space': 'nowrap'
    })
}

//隐藏删除按钮
var hideDelBtn = function() {
    var $this = $(this);
    $this.find($(showDelLayer)).hide();
    $this.find($(userName)).css({
        'width': '11px'
    })
}

var $topicTab = $(window.parent.document.body).find(".tabsHeader li").eq(3);

var init = function() {
    if ($topicTab.hasClass('cur')) {
        resizeLoad(page);
    }
    $topicTab.on('click', function() {
        page = 1;
        $('[data-node=tiles]').html('');
        resizeLoad(page);
    }); //点击话题显示数据
    $collectList.on('mouseover', dataListBox, showDelBtn); //显示删除按钮
    $collectList.on('mouseout', dataListBox, hideDelBtn); //隐藏删除按钮
    $loading.on('click', function() { //加载下一页
        var text = $loadSpan.html();
        Pubsub('topicPage').sub(function(data) {
            page = data;
        });
        if (text == '无更多加载项') {
            return false;
        }
        if (text != '加载失败，请重新尝试') {
            page++;
        }
        load(page);
    });
};

module.exports = {
    init: init,
    reload: resizeLoad
};
