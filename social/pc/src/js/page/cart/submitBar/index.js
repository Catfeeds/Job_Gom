/**
 * 购物车底部结算栏
 * @author Zhengchun Fu
 */

var cartGoodsInfo = require('../makeData/index');

var floatingLayerClass = 'floating-layer';

/**
 * 结算条定位
 */
function submitBarFix($obj) {
    var winH = $(window).height(),
        offsetTop = $('[data-node=submitForm]').offset().top + $obj.height(),
        scrollTop;

    $obj.addClass(floatingLayerClass);

    function submitBarFixed() {
        scrollTop = $(window).scrollTop();
        if ((scrollTop + winH) >= offsetTop) {
            $obj.removeClass(floatingLayerClass);
        } else {
            $obj.addClass(floatingLayerClass);
        }
    }

    submitBarFixed();
    $(window).on('scroll', submitBarFixed);
    $(window).on('resize', function() {
        winH = $(window).height();
        window.setTimeout(submitBarFixed, 200);
    });
}

/**
 * 购物车数据提交
 */
function cartSubmit() {
    $('[data-action=cartSubmit]').on('click', function() {

        if ($(this).hasClass('btn-default')) {
            return false;
        }

        var skuList = cartGoodsInfo.skuList;
        $('#skuList').val(skuList);

        if (skuList !== '[]' && skuList) {

            var fid = '?fid=' + $_CONFIG.fid;
            var $submitForm = $('[data-node=submitForm]');
            var action = $submitForm.attr('action');
            $submitForm.attr('action', action + fid);
            $submitForm.submit();
        }
    });
}

/**
 * 初始化方法
 */
function init() {

    // 结算条定位
    submitBarFix($('[data-node=submitBar]'));

    // 购物车数据提交
    cartSubmit();
}

module.exports = {
    init: init,
    submitBarFix: submitBarFix
};