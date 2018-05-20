/**
 * 商品详情页地址切换回调
 * zhaodonghong
 */

var goodAddress = require('./goodAddress');
var fetch = require('io/fetch');
var url = require('io/url');
var spinner = $('[data-trigger=spinner]').data('spinner');
var init = function() {
    goodAddress(function(defaultList) {
        var $price = $('[data-node="price"]');
        var $originPrice = $('[data-node="originPrice"]');
        var $cargo = $('[data-node="iscargo"]');
        var $stock = $('[data-node="stockBox"]');
        var $addShopCar = $('[data-action="addShopCar"]');
        var $buyBtn = $('[data-action="buybtn"]');
        var postData = {
            itemId: parseInt($_CONFIG.productId, 10),
            shopId: parseInt($_CONFIG.shopId, 10),
            provName: defaultList[0].levelName,
            provId: parseInt(defaultList[0].levelId, 10),
            cityName: defaultList[1].levelName,
            cityId: parseInt(defaultList[1].levelId, 10),
            borName: defaultList[2].levelName,
            borId: parseInt(defaultList[2].levelId, 10)
        }
        if (parseInt($_CONFIG.skuId, 10) !== 0 && $_CONFIG.prodType !== '1') {
            postData.skuId = parseInt($_CONFIG.skuId, 10);
        }
        fetch.get(url.get('getCurrItemInfo'), {
            data: postData
        }).done(function(result) {
            if (result && result.code === 200 && result.success) {
                var data = result.data;
                if (data.skus !== undefined) {

                    /*var saleInterval = null;

                    var originInterval = null;

                    if( data.salePriceShow.indexOf('~') !== -1 ){

                        $price.text( data.salePriceShow ).attr( 'data-saleprice', salePriceShow );
                        $originPrice.text( data.priceShow ).attr( 'data-originprice', priceShow );

                    }else{

                        saleInterval = data.salePrice === data.skuHighestSalePrices ? data.skuHighestSalePrice : data.salePrice + '~' + data.skuHighestSalePrice;
                        originInterval = data.price === data.skuHighestPrice ? data.skuHighestPrice : data.price + '~' + data.skuHighestPrice;
                        $price.text( data.salePriceShow ).attr( 'data-saleprice', saleInterval );
                        $originPrice.text( data.priceShow ).attr( 'data-originprice', originInterval );

                    }
                    spinner.spinning.setMax( data.currStock );
                    */

                    spinner.spinning.setMax(data.skus.stock > 20 ? 20 : data.skus.stock);
                    $price.text(data.skus.salePrice);
                    $originPrice.text(data.skus.price);
                    if (data.skus.hasStock > 0) {

                        $stock.text('有货');
                        $cargo.text('有货');
                        $buyBtn.removeClass('btn-default');
                        $addShopCar.removeClass('btn-default');
                        $('[data-spin="up"]').removeClass('disabled');

                    } else {

                        $stock.text('无货');
                        $cargo.text('无货');
                        $buyBtn.addClass('btn-default');
                        $addShopCar.addClass('btn-default');
                        $('[data-spin="up"]').addClass('disabled');

                    }
                }

            }
        });
    })
}
module.exports = {
    init: init
}