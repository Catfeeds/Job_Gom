/**
 * [热门订阅号]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import LimitSlider from './limitSlider.js';
import Subscribe from 'widgets/action/subscribe';
import formatNumber from 'util/formatNumber.js';

function feeds(data){
	if (data.code !== 200) {
		return false;
	}
	if (typeof data.data.publisher === 'undefined') {
		return false;
	}
	let publisher = data.data.publisher;
	if (!publisher.length) {
		return false;
	}
	let html = getHTML(publisher);
	$('[data-node=recommendSite3]').append(html);

	new LimitSlider({
		selector:'[data-node=hotSubscribe]',
		prev:'<a class="prevBtn icon-16"></a>',
		next: '<a class="nextBtn icon-17"></a>',
	});

	new Subscribe({
		delegate:'[data-node=hotSubscribe]',
		afterDoSuccess:function(data){
			var res = data.res;
			var $dom = data.$el;
			var $num = null;

			if ($dom.length) {
				$num = $dom.siblings('.text').find('[data-node=fans] span');
				$dom.addClass('active');
				$dom.data('status', 1);
				$num.text(formatNumber(res.data.total/1));
			}
		},
		afterUndoSuccess:function(data){
			var res = data.res;
			var $dom = data.$el;
			var $num = null;

			if ($dom.length) {
				$num = $dom.siblings('.text').find('[data-node=fans] span');
				$dom.removeClass('active');
				$dom.data('status', 0);
				$num.text(formatNumber(res.data.total/1));
			}
		}
	});
	
}

function getHTML(data){
	let html = `
		<div class="block-title">
		    <h2>热门订阅号</h2>
		    <a href="/sub/hot.html" target="_blank" class="more">查看更多 ></a>
		</div>
		<div class="sub-list" data-node="hotSubscribe">
		    <ul class="hot-sub clearfix">
	`;

	data.forEach((v)=>{
		html += `
	    	<li>
		    	<div class="img">
		    	    <a target="_blank" href="/sub/${v.id}.html">
		    	        <img src="${v.icon}">
		    	    </a>
		    	</div>
		    	<div class="text">
		    		<a target="_blank" href="/sub/${v.id}.html">${v.name}</a>
		    		<p>${v.summary}</p>
		    		<p class="gray" data-node="fans">粉丝：<span>${v.subscribe_num}</span></p>
		    	</div>
		    	<div class="sub-btn ${v.is_subscribe == 1 ? 'active' : ''}" data-action="subscribe" data-subscribeid="${v.id}" data-status="${v.is_subscribe}">
		    		<span class="on">+ 订阅</span>
	                <span class="off">已订阅</span>
		    	</div>
	    	</li>
		`;
	});

	html += `</ul></div>`;
	return html;
}

export default feeds;