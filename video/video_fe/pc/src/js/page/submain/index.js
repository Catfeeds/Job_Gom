/* css */
import 'css/page/submain/index.scss';
import toast from 'components/toast.js';
/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import './share.js';
import formatNumber from 'util/formatNumber';
import pagebreak from 'widgets/page/index.js';
import BackTop from 'plugin/backTop';
import Subscribe from 'widgets/action/subscribe';
import tpl from './indexTpl.js';
import fetch from 'io/fetch.js';

var $loadMore = $("[data-node=loadMore]");
var $subMainList = $("[data-node=subMainList]");
var $pager = $("#pageBreak");
var subId = $(".wrapLeft").find("div.userMsg").attr("data-subid");
var total = parseInt($subMainList.attr("data-totalpage"));
var $fanscount = $('[data-node="count"]');
new BackTop();

new Subscribe({
    afterDoSuccess: function(data){
        var $dom = data.$el;
        var count = data.res.data.total;
        $dom.data('status', 1);
        $dom.addClass('active');
        $fanscount.text(formatNumber(count));
     
    },
    afterUndoSuccess: function(data){
        var $dom = data.$el;
        var count = data.res.data.total;
        $dom.removeClass('active');
        $dom.data('status', 0);
        $fanscount.text(formatNumber(count));
    }
});



var $subscribeBtn = $('[data-action="subscribe"]');
$subscribeBtn.on("mouseenter",function(){

    var statusNum = $(this).attr("class").indexOf("active");
    if(statusNum > 0){
        $(this).addClass("acAdd").removeClass("c");
    }else{
        $(this).addClass("c").removeClass("acAdd");
    }
}).on("click",function(){

    //var statusNum = $(this).attr("class").indexOf("active");
        $(this).removeClass("c acAdd");
});

if(total > 1){
    showPage();
}


function showPage(){
    var page = new pagebreak($('#pageBreak'), {
        total: total,
        current: 1
    });

    page.on('pageClick', function(p){
        loatMore(p);
    });


    function loatMore(page){
        $loadMore.removeClass("hide");
        fetch.get('/json/publisherDetail.json', {
            domain: 'domain-data',
            data: {
                id: subId,//subId
                page: page //,//
               // num: 1 // 默认 10 条
            }
        }).done(function(data){
            if(data.code === 0){
                var json = data.data.publisherDetail;
                var _html = tpl(json);
                $loadMore.addClass("hide");
                $("[data-node=subMainList]").find("ul.list-card").empty().append(_html);
                window.scrollTo(0,0);
            }else{
                $loadMore.addClass("hide");
                toast("加载失败");
            }
        
      });
    }
}

