/* css */
import 'css/page/subrelate/index.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import BackTop from 'plugin/backTop';
import LoadMore from 'widgets/loadmore/loadmore';
import Subscribe from 'widgets/action/subscribe';
import formatNumber from 'util/formatNumber';
import toast from 'components/toast';

new BackTop();
new LoadMore({
    el: '[data-id=loadmore-btn-container]',
    data: {
        url: '/json/searchPublisher.json'
    }
});

//   订阅
new Subscribe({
    delegate:'[data-id=loadmore-container]',
    afterDoSuccess: function(data){
        var $dom = data.$el;
        var $delegate = data.$delegate;
        var count = data.res.data.total;
        $dom.addClass('active').data('status', 1);
        $dom.siblings().find("[data-id=subnum]").text(formatNumber(count));
        // toast('订阅成功');
    },
    afterUndoSuccess: function(data){
        var $dom = data.$el;
        var $delegate = data.$delegate;
        var count = data.res.data.total;
        $dom.removeClass('active').data('status', 0);
        $dom.siblings().find("[data-id=subnum]").text(formatNumber(count));
        // toast('已取消订阅');
    }
});

let $loadMore = $('[data-id=loadmore-container]');
$loadMore.on("mouseenter",'[data-action="subscribe"]',function(){
    let $this = $(this);
    var statusNum = $(this).attr("class").indexOf("active");
    if(statusNum > 0){
        $this.addClass("acAdd").removeClass("c");
    }else{
        $this.addClass("c").removeClass("acAdd");
    }
}).on("click",'[data-action="subscribe"]',function(){
    $(this).removeClass("c acAdd");
});