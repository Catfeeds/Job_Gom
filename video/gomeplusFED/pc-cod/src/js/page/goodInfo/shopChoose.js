var shopChoose = require('./shopChoose.tpl');
var fetch = require('io/fetch');
var url = require('io/url');

var $shopChooseBox = $('[data-node="shopChoose"]');

var getShopChoose = function(){

	fetch.get( url.get('shopChoose'), {
		data: {
			itemId: $GLOBAL_CONFIG.productId,
			shopId: $GLOBAL_CONFIG.shopId
		}
	}).done(function( result ){

		if( result && result.success && result.data.items.length > 0){

			$shopChooseBox.removeClass('shop-chooseload').removeAttr('style').html(shopChoose({
				shopId: $GLOBAL_CONFIG.shopId,
				domian: $_CONFIG.mall_domain,
				data: result.data.items,
				csid: $GLOBAL_CONFIG.sourceCode
			}));

		}else{

			$shopChooseBox.prev().remove();
			$shopChooseBox.remove();

		}
	})

}

var init = function(){
	var offTop =  $shopChooseBox.offset().top;
	var sT = $(window).scrollTop();
	var isFirst = true;
	var wH = $(window).height();
	if( sT + wH > offTop - 50 ){
		getShopChoose();
	}else{
		$(window).on('scroll',function(){
			sT = $(window).scrollTop();
			if( sT + wH > offTop - 50 && isFirst){
				isFirst = false;
				getShopChoose();
			}
		});
	}
}



module.exports = {
	init: init
}