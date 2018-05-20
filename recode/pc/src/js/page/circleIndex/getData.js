/*
 *@author:dongyukuan
 *@desc:圈子、话题、商品的数据动态获取渲染
 *@date:2017/5/8
 */

var fetch = require('io/fetch');
var url = require("io/url");
var toast = require('module/hint').init;
var Pubsub = require('io/pubsub');
require('module/atgregion')();
//拆分数组
var chunkAry = function(arr, num) {
    num = num * 1 || 1;
    var ret = [];
    arr.forEach(function(item, i) {
        if (i % num === 0) {
            ret.push([]);
        }
        ret[ret.length - 1].push(item);
    });
    return ret;
};
var getData = function(ids, type, cb) {
    var da = {
        type: type,
        ids: ids
    };
    var groupDomain = $_CONFIG['group_domain'];
    var api = groupDomain + url.get('getIndexData');
    fetch.get(api, {
        data: da
    }).done(function(data) {
        if (data.success) {
            cb(data);
        }
    })
};
// 渲染话题的点赞数及评论数
var renderTopic = function($container, selector) {
    return function(da) {
        var data = da.data;
        $.each(data, function(key, val) {
            var sel = '[data-id="' + key + '"]';
            var $item = $container.find(sel);
            var topicLike = val.likeQuantity || 0;
            var topicSpeak = val.replyQuantity || 0;
            if ($item.length) {
                $item.find('[data-node=topicLike]').text(topicLike);
                $item.find('[data-node=topicSpeak]').text(topicSpeak);
            }
        })
    }
};
//操作按钮的状态
//overrun为圈子成员是否达到上限
//joinStatus为加入圈子的状态
var circleStatus = function($item, joinStatus, overrun) {
        $item.find('[data-action=joinCircle]').attr('data-overrun', overrun);
        switch (joinStatus) {
            case 0:
                $item.find('[data-action=joinCircle]').addClass('none');
                $item.find('[data-node=joinCircleRef]').addClass('none');
                $item.find('[data-node=joinCircleChk]').addClass('none');
                $item.find('[data-node=joinCircleSuc]').removeClass('none');
                break;
            case 1:
                $item.find('[data-action=joinCircle]').removeClass('none');
                $item.find('[data-node=joinCircleSuc]').addClass('none');
                $item.find('[data-node=joinCircleRef]').addClass('none');
                $item.find('[data-node=joinCircleChk]').addClass('none');
                break;
            case 2:
                $item.find('[data-action=joinCircle]').addClass('none');
                $item.find('[data-node=joinCircleSuc]').addClass('none');
                $item.find('[data-node=joinCircleRef]').addClass('none');
                $item.find('[data-node=joinCircleChk]').removeClass('none');
                break;
        }
    }
    //渲染圈子的成员、话题数及加入状态
var renderCircle = function($container, selector, cb) {
    return function(da) {
        var data = da.data;
        $.each(data, function(key, val) {
            var sel = '[data-id="' + key + '"]';
            var $item = $container.find(sel);
            var circleMember = val.memberQuantity || 0;
            var circleTopic = val.topicQuantity || 0;
            var joinStatus = val.status;
            var overrun = !!(val.memberQuantity >= val.maxUsers); //是否超出最大人数
            if ($item.length) {
                $item.find('[data-node=circleTopic]').text(circleTopic);
                $item.find('[data-node=circleMember]').text(circleMember);
                circleStatus($item, joinStatus, overrun);
                cb = cb || function() {};
                cb();
            }
        })
    }
};
//渲染商品价格及返利标识
var renderGoods = function($container, selector) {
    return function(da) {
        var data = da.data;
        $.each(data, function(key, val) {
            var sel = '[data-id="' + key + '"]';
            var $item = $container.find(sel);
            var salePrice = val.salePrice !== null ? val.salePrice : '暂无售价';
            var mostRebate = val.mostRebate || 0;
            if ($item.length) {
                $item.find('[data-node=goodsPrice]').text(salePrice);
                var $moneyBox = $item.find('[data-node=moneyBox]');
                var $goodsPrice = $item.find('[data-node=goodsPrice]');
                var $returnMoney = $item.find('[data-node=returnMoney]');
                if (salePrice) { //price是否存在
                    $moneyBox.removeClass('none');
                    $goodsPrice.text(salePrice);
                    if (mostRebate > 0) { //返利
                        $returnMoney.removeClass('none');
                    }
                };
            }
        })
    }
};
var getIds = function(selector, $container) {
    var ary = [];
    $container.find(selector).each(function(idx, val) {
        var id = $(val).attr('data-id');
        if ($.inArray(id, ary) < 0) {
            ary.push(id);
        }
    });
    var idStr = ary.join(',');
    return idStr;
}

var initTopic = function($container) {
    $container = $container || $('body');
    var selector = '[data-node=topicData]';
    var topicIds = getIds(selector, $container);
    var type = 'topic';
    getData(topicIds, type, renderTopic($container, selector));
}
var initCircle = function(cb, $container) {
    $container = $container || $('body');
    cb = cb || function() {};
    var selector = '[data-node=circleData]';
    var circleIds = getIds(selector, $container);
    var type = 'group';
    getData(circleIds, type, renderCircle($container, selector, cb));
}
var initGoods = function($container) {
    $container = $container || $('body');
    var selector = '[data-node=goodsData]';
    var goodIds = getIds(selector, $container);
    var goodAry = goodIds.split(',');
    var chunk = chunkAry(goodAry, 10);
    var type = 'product';
    chunk.forEach(function(item, index) {
        var idStr = item.join(',');
        getData(idStr, type, renderGoods($container, selector));
    })
}
var init = function() {
    initTopic();
    initCircle();
    Pubsub('getAreaId').sub(initGoods);
}
module.exports = {
    init: init,
    initCircle: initCircle,
    initGoods: initGoods,
    initTopic: initTopic
}
