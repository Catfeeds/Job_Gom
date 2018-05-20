/**
 * 展示更多失效的商品
 * @author Zhengchun Fu
 */
var submitBar = require('../submitBar');
var submitBarFix = submitBar.submitBarFix; // 结算条定位修正

var showMoreNode = '[data-action=showMore]';
var loseGoodsListNode = '[data-node=loseGoodsList]';
var $showMoreBtn = $(showMoreNode);
var $loseGoodsList = $(loseGoodsListNode);
var $submitBar = $('[data-node=submitBar]');

var init = function() {
	$showMoreBtn.on('click', function() {
		var $this = $(this);
		var hideCls = 'hide';

		// 删掉更多按钮
		$this.parent('div').remove();

		// 展示全部失效商品
		$loseGoodsList.find('table.hide').removeClass(hideCls);
		$loseGoodsList.find('tr.hide').removeClass(hideCls);

		// 修正结算条位置
		submitBarFix($submitBar);
	});
};

module.exports = {
	init: init
};