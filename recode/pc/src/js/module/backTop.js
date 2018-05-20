//返回顶部
var init = function(els, showHight) {
	var $els = els || $("[data-node=top]");
	var hight = showHight || 200;
	$els.hide();
	$els.click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 300);
		return false;
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > hight) {
			$els.show();
		} else if ($(this).scrollTop() < hight) {
			$els.hide();
		}
	});
};
init();	