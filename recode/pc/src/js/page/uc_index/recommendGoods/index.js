/**
 * 个人中心首页推荐商品
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var goodListTpl = require('./goodList.tpl');

var $changeGoods = $('[data-action=changeGoods]');
var $goodList = $('[data-node=dataList]');
var $userShop = $('[data-node=userShop]');

var index = $changeGoods.data('page');
var hide = 'hide';
var goods = [];

//加载中
var load = function() {
    fetch.post(url.get('getRecommendGoods')).done(function(data) {
        if (data.success === true) {
            var goodsData = data.data;
            if (!goodsData.length) {
                $userShop.addClass(hide);
            } else {
                for (var i = 0; i < goodsData.length; i += 8) {
                    goods.push(goodsData.slice(i, i + 8));
                }
                fillContent(index);
            }
        } else {
            $userShop.addClass(hide);
        }
    }).fail(function() {
        alert('加载失败');
    });
};
var fillContent = function(index) {
    var modelPage = index * 8 + 1;
    var modelId = "";
    for (var i = 0; i < goods[index].length; i++) {
        modelId = i + modelPage;
        if (modelId.toString().length === 1) {
            modelId = "000" + modelId;
        } else if (modelId.toString().length === 2) {
            modelId = "00" + modelId;
        } else {
            modelId = "0" + modelId;
        }
        goods[index][i].modelId = $_CONFIG.grtjsp + modelId;
    }
    var html = goodListTpl({
        list: goods[index]
    });
    $goodList.append(html);
};
var changeGoods = function() {
    if (index === (goods.length - 1)) {
        index = 0;
    } else {
        index++;
    }
    $changeGoods.attr('data-page', index);
    $('[data-node=dataList] li').remove();
    fillContent(index);
};
var init = function() {
    load();
    $changeGoods.on('click', changeGoods);
};
module.exports = {
    init: init
};