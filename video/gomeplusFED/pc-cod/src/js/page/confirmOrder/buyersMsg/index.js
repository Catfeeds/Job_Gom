/**
 * 买家留言
 * @author Zhengchun Fu
 */
require('textchange');

function checkBuyerMsg() {
	var maxLen = 30;
	var $buyerMsg = $('[data-node=buyerMsg]');
	$buyerMsg.on('textchange', function(e) {
		var $this = $(this);
		var msg = $.trim($this.val());
		var len = msg.length;
		if (len > maxLen) {
			$this.val(msg.substr(0, maxLen));
		}
	});
}

module.exports = {
	init: checkBuyerMsg
};