/**
 * [点赞组件]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import toast from '../toast';
import Base from './base.js';

class Like extends Base{
	constructor(opts = {}) {
		var defaults = {
			api: '/praise.json',
			selector: '[data-action=like]',
			action: 'like'
		};
		super(Object.assign(defaults, opts));
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
		toast('点赞成功');
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
		toast('已取消点赞');
	}
}

export default Like;
