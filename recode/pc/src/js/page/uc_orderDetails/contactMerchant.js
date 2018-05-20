/**
 * 联系商家
 * @author Zhengchun Fu
 */
var contactMerchant = require('module/popup/contactMerchant');
var init = function() {
	var $orderList = $('[data-node=orderList]');
	var contactMerchantNode = '[data-action=ContactMerchant]';
	$orderList.on('click', contactMerchantNode, function() {
		contactMerchant();
	});
};

module.exports = {
	init: init
};