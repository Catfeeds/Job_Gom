/* css */
import 'css/page/sublist/index.scss';
/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';

import BackTop from 'plugin/backTop';
import Subscribe from 'widgets/action/subscribe';
import formatNumber from 'util/formatNumber';


//var $fanscount = $('[data-node="count"]');

new BackTop();
new Subscribe({
	afterDoSuccess: function(data){
        var $dom = data.$el;
        var count = data.res.data.total;
        $dom.data('status', 1);
        $dom.addClass('active');
        var $fanscount =$dom.parent().find('[data-node="count"]');   //$('[data-node="count"]');
        $fanscount.text(formatNumber(count));
     
    },
    afterUndoSuccess: function(data){
        var $dom = data.$el;
        var count = data.res.data.total;
        $dom.removeClass('active');
        $dom.data('status', 0);
         var $fanscount =$dom.parent().find('[data-node="count"]');
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

