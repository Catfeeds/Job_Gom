(function(){	
	//window.resourceNiche.indexHotTopic
	var utils = {
		toHumb: function( string ){
			return string.replace(/-(\w)/g, function ($0, $1) { 
				return $1.toUpperCase(); 
			}); 
		},
		hasCss: function( style ){
			var prefix = ['webkit', 'Moz', 'ms', 'o'];
			var i;
			var humpString = [];
			var htmlStyle =  document.documentElement.style
			for (var i = prefix.length - 1; i >= 0; i--) {
				humpString.push( utils.toHumb(prefix[i] + '-' + style));
				humpString.push( utils.toHumb(style)); 
			}
			for (var i = humpString.length - 1; i >= 0; i--) {
				if (humpString[i] in htmlStyle) return true; 
				return false;
			}
		}
	};
	$.fn.pluspcSlider = function(options){
		var _this = this;
		var defaultOptions = {
			auto: false, //自动播放
			delay: 5000, //延迟
			controls: {
				show: true,
				prev: '.J-silder-prev',
				next: '.J-silder-next'
			}, //是否显示按钮
			speed: 500,
			mover: 'ul',
			pager: '.J-pluspc-drinks-pager', //是否显示 icon
			mode: 'horizontal', //运动类型
			moveSlideQty: 1, //移动li个数
			hideControlOnEnd: false, //显示按钮情况下最后一个是否显示按钮
			event: 'click'
		}
		var params = $.extend( true, {}, defaultOptions, options );
		var moveJson = {
			'horizontal': 'left',
			'vertical': 'top'
		};
		var $mover = $(_this).find(params.mover);
		var $child = $mover.children();
		var len = $child.length;
		var arrowMove = len > params.moveSlideQty;
		if( arrowMove ){
			var $prev = $(_this).find(params.controls.prev);
			var $next = $(_this).find(params.controls.next);

			if( params.auto && !params.hideControlOnEnd ){
				var html = $mover.html();
				$mover.html( html + html );
				$child = $mover.children();
				len = $child.length;
			}
			params.hideControlOnEnd && $prev.hide();
			var isCss = utils.hasCss('transition');
			var index = 0;
			var $pager = $(params.pager);
			var childrenWarp;
			var timer = null;
			var isAnimated = false;

			if(moveJson[params.mode]){
				if(moveJson[params.mode] === 'left'){
					childrenWarp = $child.eq(0).width();
					$mover.width( childrenWarp * len );
				}else{
					childrenWarp = $child.eq(0).height();
					$mover.height( childrenWarp * len );
				}
			}
			function move( direction ){
				if( moveJson[params.mode] && !isAnimated){
					isAnimated = true;
					if( direction === 'prev' ){
						if(!params.hideControlOnEnd){
							index = index === 0 ? -len/2 : index;
							moveCb(index, moveJson[params.mode]);
						}
						index ++;
					}else{
						index --;
					}
					
					var styleObj = {};
					styleObj[moveJson[params.mode]] = (index*childrenWarp) +'px';
					if( isCss ){
						setTimeout(function(){
							$mover.css(styleObj);
							$mover.one('webkitTransitionEnd  oTransitionEnd transitionend MStransitionEnd msTransitionEnd', function(){
								moveEnd(direction);
							});
						},110);
					}else{
						$mover.animate(styleObj, params.speed, function(){
							isAnimated = false;
							if( params.auto && index === -len/2 && direction === 'next'){
								index = 0;
								moveCb(index, moveJson[params.mode]);
							}
							params.hideControlOnEnd && index === -(len - 1) && $next.hide();
							params.hideControlOnEnd && index === 0 && $prev.hide();
							params.hideControlOnEnd && index < 0 && !$prev.is(':visible') && $prev.show();
							params.hideControlOnEnd && index > -(len-1) && !$next.is(':visible') && $next.show();
							$pager.children().removeClass('active').eq(Math.abs(index)).addClass('active');
						});
					}
				}
				
			}
			function moveEnd( direction ){
				isAnimated = false;
				if( params.auto && index === -len/2 && direction === 'next'){
					index = 0;
					moveCb(index, moveJson[params.mode]);
				}
				params.hideControlOnEnd && index === -(len - 1) && $next.hide();
				params.hideControlOnEnd && index === 0 && $prev.hide();
				params.hideControlOnEnd && index < 0 && !$prev.is(':visible') && $prev.show();
				params.hideControlOnEnd && index > -(len-1) && !$next.is(':visible') && $next.show();
				$pager.children().removeClass('active').eq(Math.abs(index)).addClass('active');
			}
			function moveCb(index, mode){
				var arrived = {
					'-webkit-transition': 'all 0s linear',
					'-moz-transition': 'all 0s linear',
					'-o-transition': 'all 0s linear',
					'-ms-transition': 'all 0s linear',
					'transition': 'all 0s linear'
				}
				if(params.mode === 'horizontal'){
					arrived.left = index * childrenWarp;
				}else{
					arrived.top = index * childrenWarp;
				}
				if(isCss){
					$mover.css(arrived);	
					setTimeout(function(){
						$mover.css({
							'-webkit-transition': 'all '+ params.speed/1000 +'s linear',
							'-moz-transition': 'all '+ params.speed/1000 +'s linear',
							'-o-transition': 'all '+ params.speed/1000 +'s linear',
							'-ms-transition': 'all '+ params.speed/1000 +'s linear',
							'transition': 'all '+ params.speed/1000 +'s linear'
						});	
					},100);
				}else{
					$mover[0].style[mode] = index * childrenWarp;
				}
			}

			if(params.controls.show){
				$(_this).on('click', params.controls.prev, function(){
					timer && setInterval(timer);
					move('prev');
				});
				$(_this).on('click', params.controls.next, function(){
					timer && setInterval(timer);
					move('next');
				});
			}
			$pager.on( params.event, 'span', function(){
				$mover.off();
				index = - $pager.children().index($(this));
				moveCb(index, moveJson[params.mode]); 
				$mover.css(moveJson[params.mode], index * childrenWarp );
				$pager.children().removeClass('active').eq(Math.abs(index)).addClass('active');

			});
			if(params.auto && !params.hideControlOnEnd ){
				timer = setInterval(function(){
					move('next');
				}, params.delay);

				$(_this).hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(function(){
						move('next');
					}, params.delay);
				});
			}
		}

	};


	window.resourceNiche.drinksTopic = function(){
	//$(function(){
		$('.J-pluspc-drinks').pluspcSlider({
			auto: true
		});
		var timer = null;
		var hasMax = utils.hasCss('max-width');
		var oldIndex = -1;
		$('.J-drink-list').on('mouseover', '.J-drinks-topicBox', function(e){
			var index = $(this).hasClass('.J-drinks-topicBox') ? $('.J-drinks-topicBox').index($(this)) : $('.J-drinks-topicBox').index($(e.target).parents('.J-drinks-topicBox'));

			if( $(e.target).hasClass('.J-drinks-topicBox')  || $(e.target).parents('.J-drinks-topicBox').length > 0 ){

				oldIndex === index && clearTimeout(timer);
			}


			if( hasMax ){
				$(this).find('.J-drinks-topic').stop(true, true).find('span').show().parent().animate({
					'max-width': '230px'
				}, 200);
			}else{
				$(this).find('.J-drinks-topic').children().show();

			}
		
		}).on('mouseout', '.J-drinks-topicBox', function(e){
			oldIndex  = $(this).hasClass('.J-drinks-topicBox') ? $('.J-drinks-topicBox').index($(this)) : $('.J-drinks-topicBox').index($(e.target).parents('.J-drinks-topicBox'));
			var _this = this;
			timer = setTimeout( function(){
				if( hasMax ){
					$(_this).find('.J-drinks-topic').animate({
						'max-width': '0'
					}, 200, function(){
						$(this).find('span').hide();
					});
				}else{
					$(_this).find('.J-drinks-topic').children().hide();

				}
			}, 1);
		})
	}
	//})
})();