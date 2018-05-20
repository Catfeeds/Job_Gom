/**
 * 检查购物车是否为空，空车处理
 */
var checkedClass = 'icon-hook';
var countNode = '[data-node=count]';
var checkGoodsNode = '[data-node=checkGoods]';
var checkStoreNode = '[data-node=checkStore]';
var checkboxNode = '[data-action=checkbox]';
var listHeadNode = '[data-node=listHead]';
var btnDefaultClass = 'btn-default';
var $cartSubmitBtn = $('[data-action=cartSubmit]');

var checkEmptyCart = function() {
	var goods = $(countNode).length;
	var canBuyGoodsLen = $(checkGoodsNode).length;
	var canBuyStoreLen = $(checkStoreNode).length;

	if (!canBuyGoodsLen) {
		$(checkboxNode).removeClass(checkedClass);
	}

	if (!canBuyStoreLen) {
		$(listHeadNode).remove();
		$cartSubmitBtn.addClass(btnDefaultClass);
		$('[data-node=loseGoodsList] > table').removeClass('fail-title');
		$('[data-node=checkAllWrap], [data-action=delAll]').remove();
	}

	if (!goods) {
		window.location.reload();
	}
};

module.exports = checkEmptyCart;