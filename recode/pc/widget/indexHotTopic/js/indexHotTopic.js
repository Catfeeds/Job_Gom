(function(){	
	window.resourceNiche.indexHotTopic = function(){
		var $topPic = $('[data-small=pluspc-topPic-boxS]');
		/*热门话题*/
		var $hotTopImg = $topPic.find('[data-node=hotTop-img]');
		for(var i=0;i<$hotTopImg.length;i++){
			var tagW = $topPic.find('.img-tag').eq(i).show().width()+1;
			$hotTopImg.eq(i).attr('data-width',tagW);
		}
		$topPic.find('.img-tag').hide();		
		$hotTopImg.hover(function(){
			var $imgTagW = $(this).attr('data-width');
			$(this).find('.img-tag').show().css({width:0}).stop().animate({width:$imgTagW+'px'});
		},function(){
			$(this).find('.img-tag').hide();
		});
	};
})();