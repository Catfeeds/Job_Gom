/*
 *@author:dongyukuan
 *@desc:热门内容切换
 *@date:2017/5/8
 */
var $hotConTagsBox = $('[data-node=hotConTagsBox]');
var $lis = $hotConTagsBox.find('li');

var $topicTag = $('[data-node=tabConBox]');
var $tagItem = $topicTag.find('[data-node=topicTag]');
$lis.on('mouseenter', function() {
	var index = $lis.index(this);
	$lis.removeClass('tab-li');
	$(this).addClass('tab-li');
	$tagItem.addClass('none').eq(index).removeClass('none');
});
