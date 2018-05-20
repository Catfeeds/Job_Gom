var Pubsub = require('io/pubsub');
function init() {
	var $circleClassify = $('[data-node=circle-selected-classify]');
	var $categoryList = $('[data-node=category-list]');
	var typeId;
	var _node;
	$categoryList.find('a').hasClass('hoverActive');
	var $imgActive = $('[data-node=category-list-li]').find('[data-node=img-active]');
	var $List = $('[data-node=categoryList2');
	var checkedId = $circleClassify.attr('node-id');
	$List.each(function(){
		var nodeId = $(this).attr('node-id');
		if(nodeId == checkedId){
			Pubsub('setItem').pub(nodeId);
		};
	});
	function circleSelected(){
		_node = $(this);
		$circleClassify.addClass('circle-selected-classify');
		$circleClassify.html($(this).html());
		$('[data-node=category-hover]').find('a').removeClass('hoverActive');
		typeId = _node.attr('node-id');
		Pubsub('setItem').pub(typeId);		
		$circleClassify.attr("node-id",typeId);
		$(this).addClass('hoverActive');
		$circleClassify.find('[data-node=circle-selected]').html('已选择圈子分类');
		$imgActive.removeClass('img-active');
		$(this).parents('[data-node=category-list-li]').find('[data-node=img-active]').addClass('img-active');
	};
	function categoryShow(){
		$(this).css({zIndex:100});
		var categoryHoverW=$(this).find('.category-list2').show().find('.category-hover').width();
        var liLeft=$(this).position().left ;
        var categoryListW=$('[data-node=category-list]').width();
        if(categoryHoverW<110){
        	$(this).find('.category-hover').width('110px');
        }
        if(categoryHoverW+liLeft>=categoryListW){
            var rWidth=$(this).width()-categoryHoverW-4;
			$(this).find('.category-hover').css({left:rWidth+'px'});
		}
		else{
			$('[data-node=category-list2]').css({left:4+'px'});
		}
	};
	function categoryHide(){
		$(this).find('[data-node=category-list2]').hide();
		$(this).css({zIndex:1});
	};
	$("body").on('click','[data-node=category-hover] a',circleSelected)
	.on('mouseover','[data-node=category-list-li]',categoryShow)
	.on('mouseout','[data-node=category-list-li]',categoryHide);
};

module.exports = {
	init: init
};