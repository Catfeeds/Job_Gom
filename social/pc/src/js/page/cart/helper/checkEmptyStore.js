/**
 * 检查店铺是否为空，空店处理
 */
var checkEmptyStore = function() {
	var $stores = $('[data-node=checkStore]');
	var canCheckGoodsLen;
	$.each($stores, function(i, e) {
		canCheckGoodsLen = $(e).parents('table').find('[data-node=checkGoods]').length;
		if (canCheckGoodsLen === 0) {
			$(e).remove();
		}
	});
};

module.exports = checkEmptyStore;