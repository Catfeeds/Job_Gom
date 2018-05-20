/**
 * 编辑器工具条滚动定位效果
 * @author Zhengchun Fu
 */

// 编辑器工具条定位
var $editorFlag = $('[data-node=editorFlag]');
var $editorBar = $('[data-node=editorBar]');
var editorY = $editorFlag.offset().top;

$(window).on('scroll', function() {
	var scrollTop = $(document).scrollTop();
	if (scrollTop >= editorY) {
		$editorBar.addClass('zone-bar');
	} else {
		$editorBar.removeClass('zone-bar');
	}
});