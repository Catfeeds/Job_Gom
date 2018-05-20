(function(){	
	window.resourceNiche.homeTopic = function(){
		/*热门话题*/
		var $homeTopicBox =$('[data-small=pluspc-homeTopic-boxS]');
		var $hotTopImg = $homeTopicBox.find('[data-node=hotTop-img]');
		for(var i=0;i<$hotTopImg.length;i++){
			var tagW = $homeTopicBox.find('.img-tag').eq(i).show().width()+1;
			$hotTopImg.eq(i).attr('data-width',tagW);
		}
		$homeTopicBox.find('.img-tag').hide();		
		$hotTopImg.hover(function(){
			var $imgTagW = $(this).attr('data-width');
			$(this).find('.img-tag').show().css({width:0}).stop().animate({width:$imgTagW+'px'});
		},function(){
			$(this).find('.img-tag').hide();
		});
		/*兴趣圈子*/
		var $listBtnBox = $homeTopicBox.find('[data-node=list-btn]');
		var $listBtn = $listBtnBox.find('span');
		var $listUl = $homeTopicBox.find('[data-node=interest-list]');
		var $listLi = $listUl.find('li');
		var $liLen = $listLi.length;
		var ulHtml = $listUl.html();
		var $interestWrap =$homeTopicBox.find('[data-node=interest-wrap]');
		var $listLiW = $listLi.width();
		var timer = null;
		var num = 0;
		if($liLen == 1){
			$listBtnBox.hide();
			$liLen = 1;
		}else{
			$listUl.html(ulHtml + ulHtml);
			$liLen = $listUl.find('li').length;
			timer = setInterval(roll,5000);
			$interestWrap.mouseover(function(){
				clearInterval(timer);
			});
			$interestWrap.mouseout(function(){
				timer = setInterval(roll,5000);
			});
		}
		$listUl.css({width:$listLiW*$liLen+'px'});
		$listBtn.mouseover(function(){
			var _thisIndex = $(this).index();
			$listUl.stop().animate({left:-$listLiW*$(this).index()+'px'});
			$listBtn.removeClass('active').eq(_thisIndex).addClass('active');
			num = $(this).index();
		});
		function roll(){
			num++;
			$listUl.stop().animate({left:-$listLiW*num+'px'},function(){
				if(num==$liLen/2){
					num=0;
					$listUl.css({left:-$listLiW*num+'px'});
				}
			});
			$listBtn.removeClass('active');
			$listBtn.eq(num).addClass('active');
			if(num==$liLen/2){
				$listBtn.eq(0).addClass('active');
			}
		}
	};
})();