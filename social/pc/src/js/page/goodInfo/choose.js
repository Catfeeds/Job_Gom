var productChoose = require('./productChoose.tpl');
var shopChoose = require('./shopChoose.tpl');
var fetch = require('io/fetch');
var url = require('io/url');
var $productChooseBox = $('[data-node="productChoose"]');
var $shopChooseBox = $('[data-node="shopChoose"]');

var getChoose = function(){

	fetch.get( url.get('productChoose'), {
		data: {	
			itemId: $_CONFIG.productId,
			shopId: $_CONFIG.shopId
		}
	}).done(function( result ){
		
		if( result && result.success ){

			if( result.data.shopRecom.items.length > 0 ){
				$shopChooseBox.html(
					shopChoose({
						domian: $_CONFIG.mall_domain,
						shopId: $_CONFIG.shopId,
						data: result.data.shopRecom.items,
						csid: $_CONFIG.sourceCode
					})
				);
			}
			
			if( result.data.prodRecom.items.length > 0 ){
				$productChooseBox.html(
					productChoose({
						domian: $_CONFIG.mall_domain,
						data: result.data.prodRecom.items,
						csid: $_CONFIG.sourceCode
					})
				);
			}

		}else{
			$productChooseBox.prev().remove();
			$productChooseBox.remove();
			$shopChooseBox.prev().remove();
			$shopChooseBox.remove();

		}
	})

}

var init = function(){
	
		getChoose();
	

}




module.exports = {
	init: init
}