// var slider = require('../../page/goodInfo/leftSlider');
var fetch = require('io/fetch');
var url = require('io/url');
// var intersection = require('lodash/intersection');

//数量加减
require('./spinner').init();
var spinner = $('[data-trigger=spinner]').data('spinner');

var $goodInfoBox = $('div[data-node="topGoodInfo"]'),
    $leftBox = $goodInfoBox.find('[data-node="topleft"]'),
    $goodParams = $goodInfoBox.find('[data-node="firstParams"]'),
    // $secondBox = $goodInfoBox.find('div[data-node="secondContent"]'),
    $repert = $goodInfoBox.find('[data-node="repert"]'),
    $price = $goodInfoBox.find('[data-node="price"]'),
    $cargo = $goodInfoBox.find('[data-node="iscargo"]'),
    // $coupon = $goodInfoBox.find('[data-active="coupon"]'),
    // $sale = $goodInfoBox.find('[data-node="sale"]'),
    $addShopCar = $goodInfoBox.find('[data-action="addShopCar"]'),
    // $buyBtn = $goodInfoBox.find('[data-action="buybtn"]'),
    $buyBtn = $goodInfoBox.find('[data-action="buybtn"]'),
    $smallList = $goodInfoBox.find('[data-node="leftSmallBox"] li'),
    $originPrice = $goodInfoBox.find('[data-node="originPrice"]');
// var $salePrice = $goodInfoBox.find('[data-node="price"]');
var $stock = $goodInfoBox.find('[data-node="stockBox"]');
var $leftList = $leftBox.find('[data-node="leftBigBox"] li');
var $goodsThum = $('#goodsThum');
// var $addressNode = $goodInfoBox.find('[data-node="addressTop"]');
// var defaultSkuId = ~~$GLOBAL_CONFIG.default_skuid;
var skuData = $_CONFIG.sku_list;

var checkParam = function(callback, emptyCallback) {
    callback = callback || function() {};
    emptyCallback = emptyCallback || function() {};
    var changes = $goodParams.length;
    var keys = []; //skulist key names
    var selectors = []; //skulist changed names 
    var selectorsJson = {};
    var checked = $goodParams.find('.choose-cell-true').length;
    var changedKey = '';
    var disableJson = {};
    // var isLast = false;

    //循环key名 插入数组
    for (var key in skuData) {
        keys.push(key);
    }

    $goodParams.on('click', 'a', function() {
        selectors = [];
        selectorsJson = {};
        var _this = $(this);
        var text = _this.text();
        if (!_this.hasClass('disabled')) {
            var index = $goodParams.index($(this).parents('[data-node="firstParams"]').eq(0));
            if (_this.hasClass('choose-cell-true')) {
                checked--;
                if (checked === 0) {
                    emptyCallback.call(null);
                }
                if ($leftList.last().css('display') !== 'none' && $_CONFIG.colorShow[index + text] !== undefined) {
                    $leftList.last().find('img').attr({
                        'src':$leftList.last().attr('data-src'),
                        'data-origin':$leftList.last().attr('data-origin')
                    });
                }
                for (i in disableJson[index]) {
                    var $selector = $goodParams.eq(parseInt(i)).find('a');
                    //console.log(disableJson[index][i])
                    for (var j = 0, len = disableJson[index][i].length; j < len; j++) {
                        var $disabled = $selector.eq(disableJson[index][i][j]);
                        //console.log(j)

                        var _num = parseInt($disabled.attr('data-addNum'), 10);
                        if (_num === 1) {
                            $disabled.removeClass('disabled').attr('data-addNum', 0);
                        } else {
                            $disabled.attr('data-addNum', _num - 1);
                        }
                    }
                }
                disableJson[index] = {};
                _this.removeClass('choose-cell-true');

            } else {

                if (_this.siblings().hasClass('choose-cell-true')) {
                    for (i in disableJson[index]) {
                        var $selector = $goodParams.eq(parseInt(i)).find('a');
                        for (var j = 0, len = disableJson[index][i].length; j < len; j++) {
                            //console.log(disableJson[index][i][j])
                            var $disabled = $selector.eq(disableJson[index][i][j]);
                            //console.log(1)
                            var _num = parseInt($disabled.attr('data-addNum'), 10);
                            if (_num === 1) {
                                $disabled.removeClass('disabled').attr('data-addNum', 0);
                            } else {
                                $disabled.attr('data-addNum', _num - 1);
                            }
                        }
                    }
                    _this.siblings().removeClass('choose-cell-true');
                    disableJson[index] = {};
                } else {
                    checked++;
                }
                if ($_CONFIG.colorShow[index + text] !== undefined) {
                    $leftList.last().find('img').attr({
                        'src': $_CONFIG.colorShow[index + text].image,
                        'data-origin': $_CONFIG.colorShow[index + text].imageBig
                    });
                }
                _this.addClass('choose-cell-true');
                for (var i = 0, len = keys.length; i < len; i++) {
                    //console.log(index , text)
                    if (keys[i].indexOf(index + text) !== -1) {
                        selectors.push(keys[i].split('!#'));

                    }
                }
                //console.log(selectors)
                for (var k = 0, slen = selectors.length; k < slen; k++) {
                    for (var j = 0, llen = selectors[k].length; j < llen; j++) {
                        var keyName = selectors[k][j].substr(0, 1);
                        var keyValue = selectors[k][j].substr(1, selectors[k][j].length - 1);
                        selectorsJson[keyName] = selectorsJson[keyName] === undefined ? '' : selectorsJson[keyName];
                        selectorsJson[keyName] += '!#' + keyValue;
                    }
                }
                for (var name in selectorsJson) {
                    var i = parseInt(name, 10);
                    if (i !== index) {
                        disableJson[index] = {};
                        var $selector = $goodParams.eq(i).find('a');
                        for (var k = 0, alen = $selector.length; k < alen; k++) {
                            //console.log(disableJson[index][name])
                            disableJson[index][name] = disableJson[index][name] === undefined ? [] : disableJson[index][name];
                            if (selectorsJson[name].indexOf('!#' + $selector.eq(k).text()) === -1) {
                                var $disabled = $selector.eq(k);
                                var disabledNum = $disabled.attr('data-addNum') === undefined ? 0 : parseInt($disabled.attr('data-addNum'), 10);
                                disableJson[index][name].push(k);
                                $disabled.addClass('disabled').attr('data-addNum', disabledNum + 1);
                                //console.log(disableJson[index][name])
                            }

                        }
                    }
                }

                //console.log(disableJson)
            }
            if (checked === changes) {
                changedKey = '';
                for (var i = 0, len = $goodParams.length; i < len; i++) {

                    changedKey += ('!#' + i + $goodParams.eq(i).find('.choose-cell-true').text())

                }
                //选择完成后生成的key name
                changedKey = changedKey.substr(2, changedKey.length);
                callback.call(null, changedKey);
                //console.log(changedKey)

            } else {

                $_CONFIG.skuId = '0';
                spinner.spinning.setMax($_CONFIG.oldStock > 20 ? 20 : $_CONFIG.oldStock);

                if ($_CONFIG.prodType !== '1') {
                    if ($_CONFIG.oldStock > 0) {
                        $cargo.text('有货');
                        $stock.text('有货');
                        $buyBtn.removeClass('btn-default');
                        $addShopCar.removeClass('btn-default');
                        $('[data-spin="up"]').removeClass('disabled');
                    } else {
                        $cargo.text('无货');
                        $stock.text('无货');
                        $buyBtn.addClass('btn-default');
                        $addShopCar.addClass('btn-default');
                        $('[data-spin="up"]').addClass('disabled');
                    }
                } else {
                    if ($_CONFIG.oldStock > 0) {
                        $cargo.text('有货');
                        $buyBtn.removeClass('btn-default');
                        $addShopCar.removeClass('btn-default');
                        $('[data-spin="up"]').removeClass('disabled');
                    } else {
                        $cargo.text('无货');
                        $buyBtn.addClass('btn-default');
                        $addShopCar.addClass('btn-default');
                        $('[data-spin="up"]').addClass('disabled');
                    }
                    $repert.text($_CONFIG.oldStock);
                }

                $price.text($price.attr('data-saleprice'));
                $originPrice.text($originPrice.attr('data-originprice'));

                //$('[data-spin="up"]').removeClass('disabled')
            }

        }
    });

}
var setParams = function(info) {

    $_CONFIG.skuId = parseInt(info.id, 10);
    if ($_CONFIG.prodType !== '1') {

        fetch.get(url.get('getCurrSkuInfo'), {
            data: {
                itemId: parseInt($_CONFIG.productId, 10),
                skuId: $_CONFIG.skuId,
                addressNodeId: parseInt($('[data-node="addressTop"]').last().attr('data-aid'), 10)
            }
        }).done(function(result) {

            if (result && result.success && result.code === 200) {

                var data = result.data;
                var isStock = '';
                if (data.skus.hasStock) {
                    isStock = '有货';
                    $buyBtn.removeClass('btn-default');
                    $addShopCar.removeClass('btn-default');
                    $('[data-spin="up"]').removeClass('disabled');
                } else {
                    isStock = '无货';
                    $buyBtn.addClass('btn-default');
                    $addShopCar.addClass('btn-default');
                    $('[data-spin="up"]').addClass('disabled');
                }

                $stock.text(isStock);
                $cargo.text(isStock);
                $price.text(data.skus.salePrice);
                $originPrice.text(data.skus.price);
                spinner.spinning.setMax(data.skus.stock > 20 ? 20 : data.skus.stock);

            }

        })
    } else {
        spinner.spinning.setMax((info.stock > 20 ? 20 : info.stock));

        if (parseInt(info.stock, 10) > 0) {
            $cargo.text('有货')
            $buyBtn.removeClass('btn-default');
            $addShopCar.removeClass('btn-default');
            $('[data-spin="up"]').removeClass('disabled');
        } else {
            $cargo.text('无货')
            $buyBtn.addClass('btn-default');
            $addShopCar.addClass('btn-default');
            $('[data-spin="up"]').addClass('disabled');
        }

        $repert.text(info.stock)
        $price.text(info.salePrice);
        $originPrice.text(info.price);

    }
    $smallList.removeClass('active');
    $leftList.hide().last().show().find('img').attr({
        'src': info.image,
        'data-origin': info.imageBig
    });

    $goodsThum.find('img').attr('src', info.image);
}

var init = function() {
    checkParam(function(changedKey) {

        var info = skuData[changedKey];
        setParams(info);

    }, function() {

        $goodParams.find('a').removeClass('disabled');
        $repert.text($stock.attr('data-sumstock'));
        //$_CONFIG.prodType !== '1' && $stock.text( $_CONFIG.oldStock > 0 ? '有货' : '无货' );
        $cargo.text($_CONFIG.oldStock > 0 ? '有货' : '无货');
        var lastImg = $leftList.last().attr('data-src');
        $leftList.hide().last().show().find('img').attr(lastImg);
        $price.text($price.attr('data-saleprice'));
        $originPrice.text($originPrice.attr('data-originPrice'));
        $buyBtn.addClass('btn-default');
        $_CONFIG.oldStock > 0 && $addShopCar.removeClass('btn-default');
    });
}
module.exports = init;