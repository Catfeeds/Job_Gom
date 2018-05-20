/**
 * [订阅组件]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import toast from 'components/toast';
import Base from './base.js';

class Subscribe extends Base{
	constructor(opts = {}) {
		var defaults = {
			api: '/v1/subscribe/set',
			selector: '[data-action=subscribe]',
			action: 'subscribe'
		};
		super(Object.assign(defaults, opts));
		
	}

	getReqData(data){
		var type = data.status ^ 1;
		return {
			id: data.id,
			actionType: type,
			formData:{
				publish_id: data.id,
				type: type
			}
		};
	}

	_defaultDoSuccess(data){
		var res = data.res;
		var $dom = data.$el;
		var $num = null;

		if ($dom.length) {
			$num = $dom.find('[data-node="count"]');
			$dom.addClass('active');
			$dom.data('status', 1);
			$num.text(this.formatNumber(res.data.total/1));
		}
		//toast('订阅成功');
	}

	_defaultUndoSuccess(data){
		var res = data.res;
		var $dom = data.$el;
		var $num = null;

		if ($dom.length) {
			$num = $dom.find('[data-node="count"]');
			$dom.removeClass('active');
			$dom.data('status', 0);
			$num.text(this.formatNumber(res.data.total/1));
		}
		//toast('已取消订阅');
	}
}

export default Subscribe;