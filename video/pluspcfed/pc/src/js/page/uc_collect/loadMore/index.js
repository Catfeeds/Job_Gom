/**
 * 加载更多收藏的商品、店铺、话题
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
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
var $loadSpan = $('[data-action=loadMore] span');
var $loadImg = $('[data-action=loadMore] img');
var $noContent = $('[data-node=noContent]');
var userName = '[data-node=userName]';
var $dataFail = $('[data-node=dataFail]');
var $dataFailed = $('[data-node=dataFailed]');
var dataListBox = '[data-node=dataListBox]';
var selectLayer = '[data-node=selectLayer]';
var showDelLayer = '[data-action=showDelLayer]';
var delPopUp = '[data-node=delPopUp]';

var hide = 'hide';
var disabled = 'disabled';
var removeDel = 'remove-del';
var loadingGif = $_CONFIG['imgpath'] + '/images/public/loading.gif';
var loadingPng = $_CONFIG['imgpath'] + '/images/circle/small-logo.png';
var type = $tabListA.data('type');
var typeTopic = $tabList.data('type');

var tiles;
var firing = false;
var page = 1;
var finished = false;

if (type == undefined) {
    type = 'collect';
}

if (typeTopic == undefined) {
    typeTopic = 'collectTopic';
}

var collect = '';
var dataAll = [];

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
    $loadMore.off('click');
    $loadImg.attr('src', loadingPng);
    $loadSpan.html('无更多加载项');
};

var dataFail = function() {
    $loadImg.attr('src', loadingPng);
    $loadSpan.html('加载失败，请重新尝试');
};

var param = {
    url: {
        published: url.get('publishedTopic'), //发布话题
        collect: url.get('getCollectTopic') //收藏话题
    },
    tpl: {
        published: topicTpl,
        collect: topicTpl
    }
};

//加载
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
            collect = loadData.topics || [];
            collect.mallDomain = $_CONFIG.mall_domain;
            collect.groupDomain = $_CONFIG.group_domain;
            collect.type = type;
            if (collect.length == 0) {
                finished = true;
                if (!$(dataListBox).length) {
                    $loadMore.addClass(hide);
                    $dataList.addClass(hide);
                    $collectList.append($(noCollect({
                        type: type,
                        groupDomain: $_CONFIG.group_domain
                    })));
                    $showBatch.addClass(hide);
                } else {
                    noMoreData();
                }
            } else {
                $batchDel.removeClass(hide);
                $showBatch.removeClass(hide);
                $total.html('共' + loadData.ownedTopicQuantity + '条');
                if (type == 'collect' || type == 'published') {
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
            //解决IE7加载更多显示位置问题
            $loadMore.addClass('a');
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
    var ss = resize();
    if (ss == 'small') {
        param.columnWidth = {
            myTopic: 290,
            collectTopic: 275
        }
    } else {
        param.columnWidth = {
            myTopic: 243,
            collectTopic: 250
        }
    }
}

//加载数据
var resizeLoad = function() {
    columnWidth();
    tiles = new Tiles({
        columnWidth: param.columnWidth[typeTopic]
    }, '[data-node=tiles]');
    load();
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

var init = function() {
    resizeLoad();
    $collectList.on('mouseover', dataListBox, showDelBtn); //显示删除按钮
    $collectList.on('mouseout', dataListBox, hideDelBtn); //隐藏删除按钮
    $loadMore.on('click', 'a', load); //加载下一页
};
module.exports = {
    init: init
};
