/*
 *@author:dongyukuan
 *@desc:圈子首页各圈子楼层的tab切换组件
 *@date:2017/5/4
 */
var lazy = require('../imgLazyload');
var fetch = require('io/fetch');
var url = require("io/url");
var toast = require('module/hint').init;
var slider = require('../slider');
var repFace = require('./repFace');
var joinCircle = require('../joinCircle');

var moneyTpl = require('./money.tpl');
var moneyRTpl = require('./money-right.tpl');
var circleTpl = require('./circleTab.tpl');

var $travelTab = $('[data-node = travelTab]');
var $beautyTab = $('[data-node = beautyTab]');
var $homeTab = $('[data-node = homeTab]');
var $videoTab = $('[data-node = videoTab]');
var $moneyTab = $('[data-node = moneyTab]');
var $moneyRTab = $('[data-node=ggRight]');
var $goodsBannerImg = $('[data-node=goodsBannerImg]');
var $moneyTabsBox = $('[data-node=moneyTabsBox]');

var topic_path = $_CONFIG['group_domain'] + '/topic/';

//缓存tab切换数据
var tabObj = {};
var renderTab = function(floorName, data, $selector) {
    var $circleCon = $selector.parents('[data-node="circleFloor"]').find('[data-node="circleTab"]');
    var isCircle = $circleCon.length;
    var dpBefore = 'group-' + $selector.attr('dp-data'); //埋点前缀
    var htmlStr = '';
    if (isCircle) {
        data = data.data.groups;
        data.forEach(function(val, index) {
            if (!val.status) {
                val.status = val._group_ids ? val._group_ids.status : false;
                val.memberQuantity = val._group_ids ? val._group_ids.memberQuantity : '';
                val.topicQuantity = val._group_ids ? val._group_ids.topicQuantity : '';
            }
            //埋点
            if (val._group_url.indexOf('intcmp=') < 0) {
                val._group_url = val._group_url + '?intcmp=' + dpBefore + (index + 1) + '-1';
            }
            val.topics.forEach(function(v, i) {
                v.name = repFace(v.name);
                if (!v.topic_url) {
                    v.topic_url = topic_path + v.id + '.html?intcmp=' + dpBefore + (index + 1) + '-' + (i + 2);
                }
            });
        })
        htmlStr = circleTpl({
            data: data
        });
        $circleCon.html(htmlStr);

        lazy($circleCon);
        joinCircle.init();
    } else {
        slider.destoryGG();
        var daBanner = data.data.banners;
        daBanner.forEach(function(val, idx) {
            val.mostRebate = val._product_ids ? val._product_ids.mostRebate : 0;
            val.salePrice = val._product_ids && val._product_ids.salePrice !== null ? val._product_ids.salePrice : '暂无售价';
            if (val._product_url.indexOf('intcmp=') < 0) {
                val._product_url = val._product_url + '?intcmp=' + dpBefore + '1-' + (idx + 1);
            }
        });
        htmlStr = moneyTpl({
            data: daBanner
        });

        var daR = data.data.products;

        daR.forEach(function(val, idx) {
            val.mostRebate = val._product_ids ? val._product_ids.mostRebate : 0;
            val.salePrice = val._product_ids && val._product_ids.salePrice !== null ? val._product_ids.salePrice : '暂无售价';
            if (val._product_url.indexOf('intcmp=') < 0) {
                val._product_url = val._product_url + '?intcmp=' + dpBefore + '2-' + (idx + 1);
            }
        });
        var rightStr = moneyRTpl({
            da: daR

        });
        $goodsBannerImg.html(htmlStr);
        $moneyRTab.html(rightStr);
        slider.ggSlider();
        lazy($moneyTabsBox)
    }
};

var fromFetch = function(floorName, tagName, $selector) {
    var feData = {
        "id": floorName,
        "cat": tagName
    };
    var groupDomain = $_CONFIG['group_domain'];
    var api = groupDomain + url.get('tabChannel');
    fetch.get(api, {
        data: feData
    }).done(function(data) {
        if (data.success) {
            renderTab(floorName, data, $selector);
            if (typeof tabObj[floorName] !== 'undefined') {
                if (!tabObj[floorName][tagName]) {
                    tabObj[floorName][tagName] = data;
                }
            } else {
                tabObj[floorName] = {};
                tabObj[floorName][tagName] = data;
            }
        }
    }).fail(function() {
        toast('获取数据失败');
    })
}
var fromCatch = function(floorName, tagName, $selector) {
    var tabFloor = tabObj[floorName];
    var hasData = !!(tabFloor && tabFloor[tagName]);
    var ret = false;
    if (hasData) {
        renderTab(floorName, tabFloor[tagName], $selector);
        ret = true;
    }
    return ret;
}
var init = function(floorName, tagName, $selector) {
    !fromCatch(floorName, tagName, $selector) ? fromFetch(floorName, tagName, $selector) : void 0;
}
module.exports = init;
