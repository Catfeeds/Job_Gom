/**
 * loading
 * @author Zhengchun Fu
 */
var tpl = '<div class="loading-box"><div class="loading-img"><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif"><p>加载中...</p></div></div>';
var $loading = $(tpl);

function init(css) {
	var $box = $('<div></div>');
	$loading.css(css);
	$box.append($loading);
	return $box.html();
}

module.exports = init;