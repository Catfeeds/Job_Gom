
import Subscribe from 'components/action/subscribe.js';
import Collect from 'components/action/collect.js';
import Share from 'widgets/share/index';
import toast from 'components/toast.js';

new Subscribe({
	afterDoSuccess: function(data){
		var res = data.res;
		var $dom = data.$el;
		var $num = null;

		if ($dom.length) {
			$num = $dom.find('[data-node="count"]');
			$dom.addClass('active');
			$dom.data('status', 1);
			$num.text(this.formatNumber(res.data.total/1));
		}
		toast('订阅成功',{
			position:{
				left: 'center',
				top: '51%'
			}
		});
	},
	afterUndoSuccess: function(data){
		var res = data.res;
		var $dom = data.$el;
		var $num = null;

		if ($dom.length) {
			$num = $dom.find('[data-node="count"]');
			$dom.removeClass('active');
			$dom.data('status', 0);
			$num.text(this.formatNumber(res.data.total/1));
		}
		toast('已取消订阅',{
			position:{
				left: 'center',
				top: '51%'
			}
		});
	}
});

new Collect({
    delegate:'body',
    selector: '[data-action=collect]',
    afterDoSuccess: function(data){
    	var res = data.res;
    	var $dom = data.$el;
    	var $num = null;

    	if ($dom.length) {
    		$num = $dom.find('[data-node="count"]');
    		$dom.addClass('active');
    		$dom.data('status', 1);
    		$num.text(this.formatNumber(res.data.total/1));
    	}
    	toast('收藏成功',{
    		position:{
    			left: 'center',
    			top: '51%'
    		}
    	});
    },
    afterUndoSuccess: function(data){
    	var res = data.res;
    	var $dom = data.$el;
    	var $num = null;

    	if ($dom.length) {
    		$num = $dom.find('[data-node="count"]');
    		$dom.removeClass('active');
    		$dom.data('status', 0);
    		$num.text(this.formatNumber(res.data.total/1));
    	}
    	toast('已取消收藏',{
    		position:{
    			left: 'center',
    			top: '51%'
    		}
    	});
    }
});

new Share({
    selector: '[data-share=share]'
});