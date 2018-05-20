/**
 * 购物车推荐商品
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var recommendTpl = require('./goodsRecommend.tpl');
var slider = require('module/noRepeatSlider');
var quikAddToCart = require('module/popup/addToCart/quikAdd');
var getLoadingHTML = require('module/loading');

var recommendWrapNode = '[data-node=recommendWrap]';
var $recommendWrap = $(recommendWrapNode);

var init = function() {
    var loadingHtml = getLoadingHTML({
        height: 420
    });
    $recommendWrap.html(loadingHtml);
    fetch.get(url.get('cartGoodsRecommend'), null).done(function(data) {
        var recommendData = null;
        var html = '';
        if (data.success === true) {
            recommendData = data.data;
            recommendData.length = recommendData.items.length;
            recommendData.mallDomain = $_CONFIG.mall_domain;
            recommendData.csid = $_CONFIG.sourceCode;
            recommendData.tabDots = new Array(Math.ceil(recommendData.length / 5));
            if (recommendData.length >= 5) {
                html = recommendTpl(recommendData);
                $recommendWrap.html(html);
                slider({
                    element: '[data-node=recommendWrap]',
                    moveLength: 5,
                    speed: 400,
                    showTab: true
                });
                quikAddToCart('[data-node=recommendWrap]');
            }
        }
    }).fail(function() {
        // nothing
    });
};

module.exports = {
    init: init
};