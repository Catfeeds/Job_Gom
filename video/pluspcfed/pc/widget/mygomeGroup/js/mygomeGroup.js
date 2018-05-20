(function(){

	window.resourceNiche.mygomeGroup = function(){
		var $tab = $('.J-pluspc-tab');
		var $tabs = $tab.find('a');
		var $tabBox = $('.J-pluspc-tabBox');
		//tab
		$tab.on('click', 'a', function(e){
			if(!$(this).hasClass('active')){
				var index = $tabs.index( $(this) );
				$tabs.removeClass('active').eq(index).addClass('active');
				$tabBox.hide().eq(index).show();
				index === 1 ? $('.J-pluspc-createGroup').show() : $('.J-pluspc-createGroup').hide();
				currentIndex = parseInt($tabBox.eq(index).find('ul').attr('data-index') || 0) ;
			}
		});
		//for list to set width
		var $ul;
		var $li;
		var liWid = $tabBox.find('ul li').eq(0).outerWidth(true);
		for (var i = $tabBox.length - 1; i >= 0; i--) {
			$ul = $tabBox.eq(i).find('ul');
			$li = $ul.find('li');
			$ul.width($li.length * liWid);
		}

		//bottom tab
		var $left = $('.J-pluspc-left');
		var $right = $('.J-pluspc-right');		
		var $currentList;
		var currentIndex = 0;
		var showNum = $('body').hasClass('w990') || $('body').hasClass('w1000') ? 4 : 6;;
		var $parent;
		//animte move
		function move(obj, isLeft){
			$parent = $(obj).parents('.J-pluspc-tabBox').eq(0);
			$currentList = $parent.find('ul');
			$right = $parent.find('.J-pluspc-right');
			$left =  $parent.find('.J-pluspc-left');
			if( !$(obj).hasClass('pluspc-btn-disable') && !$currentList.is(':animated')){
				isLeft ? currentIndex ++ : currentIndex -- ;
				$currentList.animate({left: liWid * currentIndex}, function(){
					(currentIndex === 0) ? $left.addClass('pluspc-btn-disable') : $left.removeClass('pluspc-btn-disable');
					(currentIndex === -($currentList.find('li').length - showNum)) ?
						$right.addClass('pluspc-btn-disable') : 
						$right.removeClass('pluspc-btn-disable');
					$(this).attr('data-index', currentIndex);
				})
			}	
		}
		
		$tabBox.on('click', '.J-pluspc-left', function(){
			move(this, true);
		}).on('click', '.J-pluspc-right', function(){
			move(this, false);
		});
		
		//get width 
		function getData() {
			liWid = $tabBox.find('ul li').eq(0).outerWidth(true);
			var index;
			for (var i = $tabBox.length - 1; i >= 0; i--) {
				$ul = $tabBox.eq(i).find('ul');
				$li = $ul.find('li');
				$ul.width($li.length * liWid);
				index = parseInt($ul.attr('data-index'), 10);
				if( index && showNum - $li.length > index ){
					$ul.css('left', -($li.length - showNum)*liWid);
				}else{
					$ul.css('left', (index || 0)*liWid);
				}
			}
		}
		
		//hover
		$('.J-pluspc-tabBox').on('mouseover', function(e){
			e.stopPropagation();
			if( $(this).find('ul li').length > showNum ){

				$(this).addClass('pluspc-btn-show');
			}
		}).on('mouseout', function(e){
			e.stopPropagation();
			$(this).removeClass('pluspc-btn-show');
		});
	}
})();