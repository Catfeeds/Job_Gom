var productChoose = require('./productChoose.tpl');
var fetch = require('io/fetch');
var url = require('io/url');

var $productChooseBox = $('[data-node="productChoose"]');

var getProductChoose = function(){

	fetch.get( url.get('productChoose'), {
		data: {
			itemId: $GLOBAL_CONFIG.productId,
			shopId: $GLOBAL_CONFIG.shopId
		}
	}).done(function( result ){
		
		if( result && result.success && result.data.items.length > 0){

			$productChooseBox.removeClass('shop-chooseload').removeAttr('style').html(productChoose({
				domian: $_CONFIG.mall_domain,
				data: result.data.items,
				csid: $GLOBAL_CONFIG.sourceCode
			}));

			//底部轮播
			if ($('ul[data-node = "lastBanner"]').children().length > 5) {

			    $('ul[data-node = "lastBanner"]').bxSlider({
			        slideWidth: 1200,
			        minSlides: 5,
			        prev: '<a href="javascript:;" class="icon icon-left">&#xe970;</a>',
			        next: '<a href="javascript:;" class="icon icon-right">&#xe98c;</a>',
			        maxSlides: 20,
			        moveSlides: 5,
			        slideMargin: 12,
			        pager: false
			    });
			}

		}else{

			$productChooseBox.prev().remove();
			$productChooseBox.remove();

		}
	})

}

var init = function(){
	var offTop =  $productChooseBox.offset().top;
	var sT = $(window).scrollTop();
	var wH = $(window).height();
	var isFirst = true;
	if( sT + wH > offTop - 50 ){
		getProductChoose();
	}else{
		$(window).on('scroll',function(){
			sT = $(window).scrollTop();
			if( sT + wH > offTop - 50  && isFirst){
				isFirst = false;
				getProductChoose();
			}
		});
	}
}




module.exports = {
	init: init
}