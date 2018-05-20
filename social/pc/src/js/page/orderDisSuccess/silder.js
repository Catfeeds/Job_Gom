/**
 * 订单评价结果页--silder
 * @author zhaodonghong
 */
require('../../plugin/jquery.bxslider');


//底部轮播
var init = function() {
    if ($('ul[data-node="resultList"]').children().length > 5) {
        $('ul[data-node="resultList"]').bxSlider({
            slideWidth: 1200,
            minSlides: 5,
            prev: '<a href="javascript:;" class="iconn-8"></a>',
            next: '<a href="javascript:;" class="iconn-9"></a>',
            maxSlides: 20,
            moveSlides: 5,
            slideMargin: 12,
            pager: false
        });
    }
}

module.exports = {
    init: init
}