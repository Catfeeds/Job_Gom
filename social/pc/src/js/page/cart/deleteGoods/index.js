/**
 * 删除购物车商品
 * 店铺中如果没有商品，要把整个店铺删掉。
 * 如果店铺中所有商品都删掉，没有商品后，跳转链接，显示购物车为空。
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');
var checkEmptyCart = require('../helper/checkEmptyCart');
var checkEmptyStore = require('../helper/checkEmptyStore');
var cartGoodsInfo = require('../makeData/index');
var submitBar = require('../submitBar');
var submitBarFix = submitBar.submitBarFix; // 结算条定位修正


// 样式，节点变量
var hideCls = 'hide';
var countNode = '[data-node=count]';
var delLoseNode = '[data-action=delLose]';
var delLoseAllNode = '[data-action=delLoseAll]';
var loseGoodsListNode = '[data-node=loseGoodsList]';
var showMoreNode = '[data-action=showMore]';
var loseSkuTrNode = '[data-node=loseSkuTr]';

var tipsMsg = {
	delOneConfirm: '确定要删除商品吗？',
	delFail: '商品删除失败',
	notChooseGoods: '您还没有选择商品哦',
	chooseDelGoods: '请选择要删除的商品',
	delMulConfirm: '确定要删除选中的商品吗？',
	delLoseAllConfirm: '确定要删除所有失效的商品吗？'
};

var $submitBar = $('[data-node=submitBar]');


function deleteOne(cb) {
	var $this = $(this);
	var $store = $this.parents('table');
	var goodsID = $this.data('deleteid');
	var proNum = $this.parents('tr').find(countNode).val();

	confirm(tipsMsg.delOneConfirm, {
		ok: function() {
			fetch.post(url.get('cartDelGoods'), {
				data: {
					ids: encodeURI(goodsID)
				}
			}).done(function(data) {
				if (data.success === true) {
					$this.parents('tr').remove();
					checkEmptyCart();
					checkEmptyStore();

					// 通知头部购物车修改数量
					Pubsub(channel.shopCar.headerShopCar).pub({
						proNum: -proNum
					});

					if (!$store.find(countNode).length) {
						$store.remove();
					}
					submitBarFix($submitBar);
					checkEmptyCart();
					Pubsub(channel.shopCar.cartListGoods).pub();

					// 失效商品删除操作
					if (typeof cb === 'function') {
						cb();
					}

				} else {
					alert(tipsMsg.delFail);
				}
			}).fail(function() {
				alert(tipsMsg.delFail);
			});
		}
	});
}

// 删除单个失效商品补充操作
function deleteLoseOne() {
	var loseGoods;
	var $loseGoodsList = $(loseGoodsListNode);
	var $beforeSkus = $loseGoodsList.find('[data-node=loseSkuTr]:lt(3)');
	var $showMore = $(showMoreNode);

	// 获取剩余失效商品个数
	loseGoods = $loseGoodsList.find(delLoseNode).length;

	// 如果没有失效商品了，移除整个失效商品div，隐藏删除全部失效商品的按钮
	if (!loseGoods) {
		$loseGoodsList.remove();
		$(delLoseAllNode).hide();
		return false;
	}

	// 如果个数小于等于3，移除更多按钮的显示。否则后面隐藏的改一个为显示。
	if (loseGoods > 3) {
		$beforeSkus.removeClass(hideCls);
		$.each($beforeSkus, function(k, v) {
			$(v).parents('table').removeClass(hideCls);
		});
	} else {
		$loseGoodsList.find('table').removeClass(hideCls);
		$loseGoodsList.find(loseSkuTrNode).removeClass(hideCls);
		// 如果更多未展开，移除更多按钮
		if ($showMore.length) {
			$showMore.remove();
		}
	}
}

function deleteMultiple() {

	// 购物车可选择的商品个数
	var canCheckGoodsLength = $('[data-node=checkGoods]').length;

	if (canCheckGoodsLength === 0) {
		alert(tipsMsg.notChooseGoods);
		return false;
	}

	// 获取选中的商品ID
	var deleteids = [];
	var $checkedList = $('[data-node=checkGoods].icon-hook');
	$.each($checkedList, function(i, v) {
		deleteids.push($(v).data('deleteid'));
	});

	var goodsIDs = deleteids.join(',');
	var proNum = cartGoodsInfo.selectedGoodsCount;

	if (goodsIDs === '') {
		alert(tipsMsg.chooseDelGoods);
		return false;
	}

	confirm(tipsMsg.delMulConfirm, {
		ok: function() {
			fetch.post(url.get('cartDelGoods'), {
				data: {
					ids: encodeURI(goodsIDs)
				}
			}).done(function(data) {
				if (data.success === true) {
					$checkedList.parents('tr').remove();
					var $store = $('[data-node=checkStore]');
					$.each($store, function(i, v) {
						var $vParent = $(v).parents('table');
						if (!$vParent.find(countNode).length) {
							$vParent.remove();
						}
					});
					checkEmptyCart();
					checkEmptyStore();

					// 通知头部购物车修改数量
					Pubsub(channel.shopCar.headerShopCar).pub({
						proNum: -proNum
					});

					submitBarFix($submitBar);
					Pubsub(channel.shopCar.cartListGoods).pub();
				} else {
					alert(tipsMsg.delFail);
				}
			}).fail(function() {
				alert(tipsMsg.delFail);
			});
		}
	});
}

// 批量删除所有失效商品
function deleteLoseAll() {
	var $loseGoodsList = $(loseGoodsListNode);
	// 获取失效的所有删除ID集合
	var deleteids = [];
	var proNum = 0;
	var $list = $loseGoodsList.find(delLoseNode);
	$.each($list, function(i, v) {
		deleteids.push($(v).data('deleteid'));
		proNum += $(v).parents(loseSkuTrNode).find(countNode).val() / 1;
	});
	var goodsIDs = deleteids.join(',');

	confirm(tipsMsg.delLoseAllConfirm, {
		ok: function() {
			fetch.post(url.get('cartDelGoods'), {
				data: {
					ids: encodeURI(goodsIDs)
				}
			}).done(function(data) {
				if (data.success === true) {
					$loseGoodsList.remove();
					$(delLoseAllNode).remove();
					checkEmptyCart();

					// 通知头部购物车修改数量
					Pubsub(channel.shopCar.headerShopCar).pub({
						proNum: -proNum
					});

					submitBarFix($submitBar);
				} else {
					alert(tipsMsg.delFail);
				}
			}).fail(function() {
				alert(tipsMsg.delFail);
			});
		}
	});
}

function init() {

	// 单个删除
	$('body').on('click', '[data-action=del]', deleteOne);

	// 单个删除失效商品
	$('body').on('click', '[data-action=delLose]', function() {
		deleteOne.call(this, deleteLoseOne);
	});

	// 批量删除选中的商品
	$('[data-action=delAll]').on('click', deleteMultiple);

	// 批量删除失效的全部商品
	$(delLoseAllNode).on('click', deleteLoseAll);

}

module.exports = {
	init: init
};