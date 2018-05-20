/**
 * 购物车-我的收藏商品
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var goodsCollectTpl = require('./goodsCollect.tpl');
var slider = require('module/noRepeatSlider');
var quikAddToCart = require('module/popup/addToCart/quikAdd');

var init = function() {
	fetch.get(url.get('cartGoodsCollect'), null).done(function(data) {
		var collectData = null;
		var html = '';
		if (data.success === true) {
			collectData = data.data;
			collectData.length = collectData.collections.length;
			collectData.mallDomain = $_CONFIG.mall_domain;
			collectData.csid = $GLOBAL_CONFIG.sourceCode;
			if (collectData.length >= 5) {
				html = goodsCollectTpl(collectData);
				$('[data-node=myCollectWrap]').html(html);
				slider({
					element: '[data-node=myCollectWrap]',
				});
				quikAddToCart('[data-node=myCollectWrap]');
			}
		}
	}).fail(function(data) {
		// nothing
	});
};

module.exports = {
	init: init
};