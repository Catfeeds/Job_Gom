/* css */
import 'css/page/sub-main/index.scss';
/* fastclick */
import 'fastclick.js';
import fetch from 'io/fetch';
import toast from 'components/toast';
import Share from 'widgets/share/index';
import Like from 'components/action/like.js';
import Collect from 'components/action/collect.js';
import Subscribe from 'components/action/subscribe.js';
import Scrollload from 'Scrollload';
import backTop from 'plugin/backTop.js';
import indexTpl from './indexTpl.js';
import timeLenFormat from 'util/timeLenFormat';
import formatNumber from 'util/formatNumber';
import fromNow from 'util/fromNow';
//   返回顶部
new backTop();
//节点
const $mainAttention = $('.main-attention');
const $mainDesc = $('.main-desc');
const $contentList = $('.content-list');
const $fanscount = $('[data-node="fanscount"]');

let render = function(list) {
	let html = '';
	for (let i = 0, len = list.length; i < len; i++) {
		let v = list[i];
		v.flag = v.video_type == 0 ? '直播' : timeLenFormat(v.length);
		let up = new Date(parseInt(v.update_time + '000'));
		// v.update_time = fromNow(v.update_time);
		v.update_time = v.update_time;
		html += indexTpl(v);
	}
	return html;
};

// 滚动加载
// let loadMore = $CONFIG.loadMore || true;
var loadMore = $CONFIG.loadMore ==1 ?true :false;
let id = $CONFIG.publishId;
let page = 2;
let num = 10;

	new Scrollload($contentList[0], function(sl) {
		let scrollLoadError = function(){
			sl.throwException();
			toast('网络请求异常');
		};
		if (loadMore) {
			fetch.get('/publisherHome.json?publish_id=' + id + '&page=' + page + '&size=' + num + '&integration=simple').done(function(json) {
				if(json && json.code === 200){
					let list = json.data.video;
					let len = list.length;
					if(len){
						let html = render(list);
						$(sl.bottomDom).before(html);
						if(list.length < num){
							loadMore = false;
						}
						sl.unLock();
						page += 1;
					} else {
						loadMore = false;
						sl.noData();
					}
				} else {
					scrollLoadError();
				}
			}).fail(function(){
				scrollLoadError();
			});
		} else {
			sl.noData();
		}
	}, {
		isInitLock: false,
		loadingHtml: '<div class="top-line no-more"><p>加载中...</p></div>',
		noDataHtml: '<div class="top-line no-more"><span class="line-left"></span><p>没有更多了</p><span class="line-right"></span></div>',
		exceptionHtml: '<div class="top-line no-more" data-node="errorNode"><p>出错啦请重试</p></div>'
	});



//点赞&&收藏
new Like({
	delegate: 'body'
});

// 收藏
new Collect({
	delegate: 'body'
});

// 关注取消关注
new Subscribe({
	// api:'/',
	delegate:'body',
	afterDoSuccess: function(data){
		var $dom = data.$el;
		var count = data.res.data.total;
		$dom.html('<span class="subscription">已订阅</span>').addClass('active').attr('data-status', 1);
		$fanscount.text(formatNumber(count));
		toast('订阅成功');
	},
	afterUndoSuccess: function(data){
		var $dom = data.$el;
		var count = data.res.data.total;
		$dom.html('<span class="no-subscription"><em class="icon-18"></em> 订阅</span>').removeClass('active').attr('data-status', 0);
		$fanscount.text(formatNumber(count));
		toast('已取消订阅');
	}
	// selector: '[data-action=subscribe]'
});

// 分享处理
new Share({
	selector:'.main-share',
	config: $CONFIG || {}
});

$('.main-back').click(function(){
	history.go(-1);
});