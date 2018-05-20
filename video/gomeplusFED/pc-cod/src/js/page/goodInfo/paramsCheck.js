var slider = require('../../page/goodInfo/leftSlider'),

    spinner = require('spinner');


var $goodInfoBox = $( 'div[data-node="topGoodInfo"]' ),
	$leftBox = $goodInfoBox.find( '[data-node="topleft"]' ),
	$goodParams = $goodInfoBox.find( '[data-node="firstParams"]' ),
	$firstParams = $goodParams.eq(0).find( 'a' ),
	$secondParams = $goodParams.eq(1).find( 'a' ),
	$secondBox = $goodInfoBox.find( 'div[data-node="secondContent"]' ),
	$repert = $goodInfoBox.find( '[data-node="repert"]' ),
	$price = $goodInfoBox.find( '[data-node="price"]' ),
	$cargo = $goodInfoBox.find( '[data-node="iscargo"]' ),
	$coupon = $goodInfoBox.find( '[data-active="coupon"]' ),
	$sale = $goodInfoBox.find( '[data-node="sale"]' ),
	$addShopCar = $goodInfoBox.find( '[data-action="addShopCar"]' ),
	$buyBtn = $goodInfoBox.find( '[data-action="buybtn"]' ),
	$min = $goodInfoBox.find( '[data-spin="down"]' ),
	$max = $goodInfoBox.find( '[data-spin="up"]' ),
	$buyBtn = $goodInfoBox.find( '[data-action="buybtn"]' ),
	$smallList = $goodInfoBox.find( '[data-node="leftSmallBox"] li' ),
	$originPrice = $goodInfoBox.find('[data-node="originPrice"]');
var $leftList = $leftBox.find('[data-node="leftBigBox"] li');
var $goodsThum = $('#goodsThum');
var defaultSkuId =  ~~$GLOBAL_CONFIG.default_skuid;

var init = function( infoData ){
	
	var spinner,
		first =  $firstParams.index( $('.choose-cell-true') ),
		second = 0,
		hasSecond = ( infoData[0].second !== undefined ) ? true : false;

	
	//一级切换
	$firstParams.on( "click", function(){
		if ( $( this ).hasClass( 'choose-cell-true' ) ) return;
		//只有一级
		first = $( this ).parent().find( 'a' ).index( $( this ) );
		if( $secondParams.length === 0 ){
			var firstMax = infoData[ first ].value.stock > 20 ? 20 : infoData[ first ].value.stock ;
			setParams( infoData[ first ] );	
			spinner.spinning.setMax( firstMax );
			infoData[ first ].value.stock > 0 ? spinner.spinning.value( 1 ) : $('[data-node="count"]').val(1);	
			max = firstMax;
			

		}else{

			var html = '',dataSecond;
			var second = $goodParams.eq(1).find( 'a' ).index( $goodParams.eq(1).find('.choose-cell-true') );
			
			dataSecond = infoData[ first ].second;
			for ( var j = 0, len = dataSecond.length; j < len; j++ ){
				html += '<a href="javascript:;" class="choose-cell">' + dataSecond[j].key + '</a>'
			}
			$goodParams.eq(1).find('div').html( html );
			second = second >= dataSecond.length ? 0 : second;
			setContent( first, second );

			$secondParams = $goodParams.eq(1).find( 'a' );
			$secondParams.removeClass( 'choose-cell-true' ).eq( second ).addClass( 'choose-cell-true' );
		}
		$firstParams.removeClass( 'choose-cell-true' ).eq( first ).addClass( 'choose-cell-true' );
	});
	 
	//二级切换
	$goodParams.eq(1).on( 'click', 'a', function(){
		if ( $( this ).hasClass( 'choose-cell-true' ) ) return;
		second = $(this).parent().find('a').index( $( this ) );
		$secondParams.removeClass( 'choose-cell-true' ).eq( second ).addClass( 'choose-cell-true' );
		setContent( first, second );
	});

	//设置内容
	function setContent( first, second ){
		var secondMax = infoData[ first ]['second'][ second ].value.stock > 20 ? 20 : infoData[ first ].second[ second ].value.stock ;
		setParams( infoData[ first ].second[ second ] );
		spinner.spinning.setMax( secondMax );
		infoData[ first ].second[ second ].value.stock > 0 ? spinner.spinning.value( 1 ) : $('[data-node="count"]').val(1);		
		max = secondMax;
		
		parseFloat(infoData[ first ].second[ second ].value.price) > parseFloat(infoData[ first ].second[ second ].value.salePrice) ? $originPrice.removeClass('hide') : $originPrice.addClass('hide');
		
	}



	//数量
	var max = ~~$repert.text() > 20 ? 20 : ~~$repert.text();
	$('[data-trigger=spinner]').spinner({
	    delay: 200,
	    min: 1,
	    max: max,
	    rangemin: function(){
	      $min.addClass( 'disabled' );
	    },
	    rangemax: function(){
	      $max.addClass( 'disabled' );
	    },
	    changed: function(e, newVal, oldVal){
	        if( newVal > 1 )$min.removeClass( 'disabled' );
	        if( newVal === 1 )$min.addClass( 'disabled' );
	        newVal === max  || newVal > max ? $max.addClass( 'disabled' ) : $max.removeClass( 'disabled' );
	    	if( max === 0 ){
				spinner.spinning.setMax( 1 );
	    	}
	    }
	});
	spinner = $('[data-trigger=spinner]').data('spinner');
	$('[data-node="count"]').val(1);		

	
}
var setParams = function( data ){
	$repert.text( data.value.stock );
	$price.text( data.value.salePrice );
	$('[data-spin="down"]').addClass('disabled');
	if( ~~data.value.stock === 0 ) {
		$cargo.text( '无货' );
		$buyBtn.addClass( 'btn-default' );
		$('[data-spin="up"]').addClass('disabled');
	}else{
		$buyBtn.removeClass( 'btn-default' );
		$cargo.text( '有货' );		
		$('[data-spin="up"]').removeClass('disabled');
	}  
	$GLOBAL_CONFIG.skuId = data.value.id;
	parseFloat(data.value.price) > parseFloat(data.value.salePrice) ? $originPrice.removeClass('hide') : $originPrice.addClass('hide');
	$smallList.removeClass('active');
	$leftList.hide().last().show().find('img').addClass('loading').attr('src',$_CONFIG.imgpath + '/images/public/goods-loading.gif');
	var oImg = new Image();
	oImg.onload = function(){
		$leftList.last().find('img').removeClass('loading').attr('src',data.value.images[0]);
	};
	oImg.src=data.value.images[0];
	$goodsThum.find('img').attr('src', data.value.images[0]);
}

/*var setLeftSlider = function( selector ){
	var index  = $smallList.index( selector ),
		_top = 0;
	if( 1 < index && index < $smallList.length - 2 ){
		_top = -(index - 1 ) * 90;
	}else if( index <= 1 ){
		_top = 0;
	}else{
		_top = -( $smallList.length - 5 )*90;
	}

	$smallList.parent().animate({
		'top' : _top
	},function(){
		slider.refresh( index -1 > 0 ? index-1 :0 )
	})
	selector.click();
}*/
module.exports = init;