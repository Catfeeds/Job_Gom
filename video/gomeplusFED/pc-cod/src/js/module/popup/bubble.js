/**
 * 气泡提示
 * @author Zhengchun Fu
 * @param  {object} data 气泡提示参数；
 * {
 * 		msg:提示文字信息，
 * 		x:定位坐标left, 
 * 		y:定位坐标top,
 * 		delay:多少毫秒后消失
 * }
 * @return null
 */
var bubble = function(data) {
	var msg = typeof data.msg === 'string' ? data.msg : '';
	var x = data.x || 0;
	var y = data.y || 0;
	var delay = data.delay || 2000;
	var popWidth = 0;
	var popHeight = 0;

	var $tpl = $('<div class="small-mask" style="position:absolute;z-index:999;">' + msg + '</div>');

	if (msg === '') {
		return false;
	}

	$('body').append($tpl);
	popWidth = parseFloat($tpl.outerWidth());
	popHeight = parseFloat($tpl.outerHeight());
	$tpl.css({
		left: x - popWidth,
		top: y - popHeight - 10,
		right: 'auto'
	});
	$tpl.timer = setTimeout(function() {
		$tpl.stop().animate({
			opacity: 0
		}, 200, function() {
			clearTimeout($tpl.timer);
			$tpl.remove();
		});
	}, delay);
};

module.exports = bubble;