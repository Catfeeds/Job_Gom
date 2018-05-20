/**
 * 提示未完善验证身份信息
 * @author Zhengchun Fu
 */
var tipsTpl = require('./userCardTips.tpl');

var positionTips = function(position, isEdit) {
	var tips = $(tipsTpl({
		hasLink: !!isEdit
	}));
	tips.css(position);
	var $wrap = $('<div></div>');
	$wrap.append(tips);
	return $wrap.html();
};
module.exports = positionTips;