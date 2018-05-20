var	$goodInfoBox = $( 'div[data-node="topGoodInfo"]' ),
	$leftBox = $goodInfoBox.find( '[data-node="topleft"]' ),
	$leftBig = $leftBox.find( '[data-node="leftBigBox"]' ),
	$leftSmall = $leftBox.find( '[data-node="leftSmallBox"]' ),
	$upBtn = $leftBox.find( '[data-action="sliderTop"]' ),
	$downBtn = $leftBox.find( '[data-action="sliderDown"]' ),
	$smallList = $leftSmall.find( 'li' ),
	$bigList = $leftBig.find( 'li' );

var sliderIndex = 0,
	moved = 75,
	maxlen = 5,
	len = $smallList.length;
var slider = {
	init : function(){
		if( $smallList.length > 4 ){
			//初始化
			slider.setInit();	
			//up
			$upBtn.on( 'click', function(){
				slider.moveTop();
			});
			//down
			$downBtn.on( 'click', function(){
				slider.moveDown();
			});


		}else{
			$downBtn.addClass( 'disabled' );
			$upBtn.addClass( 'disabled' );
		}
		$smallList.on( 'click',function(){
			if( !$(this).hasClass('active') ){
				var index = $smallList.index( $(this) );
				$(this).addClass( 'active' ).siblings().removeClass( 'active' );
				$bigList.hide().eq( index ).show();
			}
		});	
	},
	refresh : function( index ){
		sliderIndex = index;
	},
	setInit : function(){
		sliderIndex === 0 ? $upBtn.addClass( 'disabled' ):$upBtn.removeClass( 'disabled' );
		sliderIndex ===  (maxlen -len) ? $downBtn.addClass( 'disabled' ) : $downBtn.removeClass( 'disabled' );
		$leftSmall.css({
			position : 'relative',
			width: moved * len 
			//marginTop : '-90px'
		})
		.parent().css({
			position : 'relative',
			width: moved * maxlen - 5,
			overflow : 'hidden'
		});
	},
	moveTop : function( index ){
		if( sliderIndex < 0  ){
			if( !$leftSmall.is(':animated') ){
				sliderIndex ++;
				$leftSmall.animate({
					'left' : sliderIndex * moved
				},300);
				$downBtn.removeClass( 'disabled' );
			}

		}
		sliderIndex === 0 ? $upBtn.addClass( 'disabled' ) : $upBtn.removeClass( 'disabled' );	
			
	},
	moveDown : function(){
		if( sliderIndex > (maxlen - len ) ){
			if( !$leftSmall.is(':animated') ){
				sliderIndex --;
				$leftSmall.animate({
					'left' : sliderIndex * moved
				},300);
				$upBtn.removeClass( 'disabled' );
				sliderIndex ===  (maxlen - len) && $downBtn.addClass( 'disabled' );
			}
		}
	}
}
module.exports = slider;