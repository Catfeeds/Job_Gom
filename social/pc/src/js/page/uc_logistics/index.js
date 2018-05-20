/**
 * 查看物流
 * @author Zhengchun Fu
 */
var contactMerchant = require('module/popup/contactMerchant');
var $contactMerchantNode = $('[data-action=ContactMerchant]');

$contactMerchantNode.on('click', function() {
	contactMerchant();
});