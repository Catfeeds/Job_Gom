/**
 * select goods
 * @author Zhengchun Fu
 */
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var checkEmptyStore = require('../helper/checkEmptyStore');


// 节点变量
var checkBoxClass = 'icon-hook';
var btnDefaultClass = 'btn-default';
var activeCls = 'active';

var checkGoodsNode = '[data-node=checkGoods]';
var checkSkuTrNode = '[data-node=skuTr]';
var checkStoreNode = '[data-node=checkStore]';
var checkAllNode = '[data-node=checkAll]';
var checkboxNode = '[data-action=checkbox]';
var notCheckedGoodsNode = '[data-node=checkGoods]:not(.icon-hook)';
var checkedGoodsNode = '[data-node=checkGoods].icon-hook';

var $cartSubmitBtn = $('[data-action=cartSubmit]');
var $checkAllBtn = $(checkAllNode);
var $checkboxBtn = $(checkboxNode);



/**
 * 置灰提交按钮，激活提交按钮
 */
function setSubmitStatus() {
	var checkedGoodsLength = $(checkedGoodsNode).length;
	if (checkedGoodsLength === 0) {
		$cartSubmitBtn.addClass(btnDefaultClass);
	} else {
		$cartSubmitBtn.removeClass(btnDefaultClass);
	}
}

/**
 * 选择单个商品
 */
function checkOneGoods() {
	var $this = $(this);
	var $thisParent = $this.parents('table');
	var $thisParentTr = $this.parents(checkSkuTrNode);

	if ($this.hasClass(checkBoxClass)) {
		$this.removeClass(checkBoxClass);
		$thisParentTr.removeClass(activeCls);

		// 取消全选
		$thisParent.find(checkStoreNode).removeClass(checkBoxClass);
		$checkAllBtn.removeClass(checkBoxClass);

	} else {

		$this.addClass(checkBoxClass);
		$thisParentTr.addClass(activeCls);

		// 判断所有是否选择
		if (!$(notCheckedGoodsNode).length) {
			$checkboxBtn.addClass(checkBoxClass);
		}

		// 判断店铺内的是否全选
		if (!$thisParent.find(notCheckedGoodsNode).length) {
			$thisParent.find(checkStoreNode).addClass(checkBoxClass);
		}
	}

	setSubmitStatus();
	Pubsub(channel.shopCar.cartListGoods).pub();
}

/**
 * 店铺全选
 */
function checkStore() {
	var $this = $(this);
	var $thisParent = $this.parents('table');
	var canBuyGoodsLength = $thisParent.find(checkGoodsNode).length;
	var $storeCheckboxes = $thisParent.find(checkboxNode);
	var $skuTrs = $thisParent.find(checkSkuTrNode);

	// 如果没有可购买的商品，就阻止。
	if (!canBuyGoodsLength) {
		return false;
	}

	if ($this.hasClass(checkBoxClass)) {
		$storeCheckboxes.removeClass(checkBoxClass);
		$checkAllBtn.removeClass(checkBoxClass);
		$skuTrs.removeClass(activeCls);

	} else {
		$storeCheckboxes.addClass(checkBoxClass);
		$skuTrs.addClass(activeCls);

		// 判断所有是否选择
		if (!$(notCheckedGoodsNode).length) {
			$checkboxBtn.addClass(checkBoxClass);
		}
	}

	setSubmitStatus();
	Pubsub(channel.shopCar.cartListGoods).pub();
}

/**
 * 整个购物车列表全选
 */
function checkCartAll() {

	// 购物车可选择的商品个数,要取新的
	var canCheckGoodsLength = $(checkGoodsNode).length;

	if (canCheckGoodsLength === 0) {
		return false;
	}

	// 复选框按钮，取最新的
	var checkbox = $(checkboxNode);

	// 所有SKU的tr
	var $skuTrs = $(checkSkuTrNode);

	if ($(this).hasClass(checkBoxClass)) {
		checkbox.removeClass(checkBoxClass);
		$skuTrs.removeClass(activeCls);
	} else {
		checkbox.addClass(checkBoxClass);
		$skuTrs.addClass(activeCls);
	}

	setSubmitStatus();

	// 广播触发修改选择的商品信息
	Pubsub(channel.shopCar.cartListGoods).pub();
}

/**
 * 初始化方法
 */
function init() {

	// 页面加载：店铺商品如果全都下架或无货，移除店铺前面的选择按钮框
	checkEmptyStore();

	// 单个商品，判断是否全选
	$(checkGoodsNode).on('click', checkOneGoods);

	// 店铺全选，取消全选
	$(checkStoreNode).on('click', checkStore);

	// 列表全选，取消全选
	$(checkAllNode).on('click', checkCartAll);
}

module.exports = {
	init: init
};