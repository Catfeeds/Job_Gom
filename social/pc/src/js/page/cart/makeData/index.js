/**
 * 购物车数据维护
 */

var Pubsub = require('io/pubsub');
var channel = require('io/channel');


var cartGoodsInfo = {};


/**
 * 购物车商品信息维护
 * goodsInfo = 商品ID-单价-商品数量-店铺ID-返利ID-库存ID
 * @return null
 */

// 拼装购物车选择的商品信息
function makeGoodsInfo() {
	var goodsID,
		goodsCount,
		goodsUnitPrice,
		shopId,
		kId,
		skuId,
		sourceCode;

	var goodsList = $('[data-node=checkGoods].icon-hook'), // 选中的商品
		selectedGoodsCount = 0,
		totalPrice = 0,
		goodsIDs = '',
		skuList = [];

	function checkNaN(n) {
		if (n <= 0 || isNaN(n)) {
			return 0;
		}
		return n;
	}

	$.each(goodsList, function(k, v) {

		goodsID = $(v).data('goodsid');
		goodsUnitPrice = $(v).parents('tr').find('[data-node=unitPrice]').text();
		goodsCount = $(v).parents('tr').find('[data-node=count]').val();
		shopId = $(v).data('shopid');
		kId = $(v).data('kid');
		skuId = $(v).data('skuid');
		sourceCode = $(v).data('sourcecode');

		// 要提交的数据
		skuList.push({
			shopId: shopId,
			kId: kId,
			skuId: skuId,
			proNum: goodsCount,
			source_code: sourceCode
		});

		// 选中的商品的数量
		selectedGoodsCount += (goodsCount / 1);

		// 选中的商品id
		goodsIDs += goodsID + ',';

		// 选中的商品的总价
		totalPrice += goodsUnitPrice * goodsCount;
	});

	cartGoodsInfo.totalPrice = checkNaN(totalPrice);
	cartGoodsInfo.selectedGoodsCount = checkNaN(selectedGoodsCount);
	cartGoodsInfo.goodsIDs = goodsIDs.replace(/,$/, '');
	cartGoodsInfo.skuList = JSON.stringify(skuList);
	$('[data-node=goodsInfoForm]').val(JSON.stringify(skuList));
}

// 根据商品信息计算总价
function calcTotalPrice() {

	var selectedGoodsCount = cartGoodsInfo.selectedGoodsCount;
	var totalPrice = cartGoodsInfo.totalPrice;

	$('[data-node=selectedGoodsCount]').text(selectedGoodsCount);
	$('[data-node=totalPrice]').text('￥' + totalPrice.toFixed(2));
}

// 购物车商品信息维护
function shoppingCartInfo() {
	makeGoodsInfo();
	calcTotalPrice();
}

Pubsub(channel.shopCar.cartListGoods).sub(shoppingCartInfo);

module.exports = cartGoodsInfo;