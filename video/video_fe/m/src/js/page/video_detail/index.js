"use strict";
import 'css/page/video_detail/index.scss';
import 'css/components/scroll-load.scss';
import 'css/widgets/comment.scss';

import 'fastclick.js';
import backTop from 'plugin/backTop.js';
import Scrollload from 'Scrollload';
import Comment from 'widgets/comment/comment';
import Share from 'widgets/share/index';
import {loginFlag, page} from 'util/phpCommon';

import toast from 'components/toast.js';
import subscribe from 'components/action/subscribe.js';
import like from 'components/action/like.js';
import collect from 'components/action/collect.js';
import unloginSaveRecord from './unloginSaveRecord.js';
import loginSaveRecord from './loginSaveRecord.js';
import SearchPage from 'widgets/search/search';
import historyBack from 'util/historyback';
import updateTime from './updateTime';

import 'widgets/openapp/index.js';

$('[data-id="search"]').click(()=>{
	new SearchPage();
});

historyBack();


new Share({
	selector:'[data-share="share"]',
	config:page
});

new subscribe({
	delegate:".article"
});
new like({
	delegate:".article"
});
new collect({
	delegate:".article"
});

var topicId = page.topicId;

var v = new MeixinPlayer();
v.init(page.videoId, 'videoContainer', {
	type: page.type || 'vod', // 直播：live，点播：vod
	poster: '', // 播放器封面图
	env: page.env || 'pre', // dev, pre, dist
});

// 记录观看记录
if (loginFlag) {
	updateTime(topicId,v);
	loginSaveRecord({tid:topicId});
}else{
	unloginSaveRecord({tid: topicId});
}

var backtop = new backTop();
const comment = new Comment({
	data : {
		topic_id: topicId // page.topicId获取 , 20170227
	},
	el: '[data-id=commentComponent]',
	onFocus() {
		setTimeout(()=>{
			backtop.hide();
		}, 200);
	},
	onBlur() {
		setTimeout(()=>{
			backtop.show();
		}, 200);
	}
});

let scrollload = new Scrollload($('[data-id=wrap]')[0], function(sl){
    comment.data.scrollload = sl;
	comment.fetchComments(topicId).done((sts)=>{
		if (!sts) {
			sl.throwException();
			return;
		} else {
            if (parseInt(comment.data.comment_num) === 0) {
                $('.cmt-no-data').show();
                $(sl.bottomDom).hide();
                return;
            } else {
                $('.cmt-no-data').hide();
                $(sl.bottomDom).show();
                if (comment.data.noMore) {
                    sl.noData();
                } else if (comment.data.error) { //获取评论出错
                    sl.throwException();
                    return;
                } else {
                    sl.unLock();
                }
            }
		}
	});
}, {
	loadingHtml: '<div class="infinite-scroll"><span>加载中...</span></div>',
	noDataHtml: '<div class="infinite-scroll"><span>没有更多评论了</span></div>',
	exceptionHtml: `<div class="infinite-scroll clickHandler"><span class="clickHandler">评论加载异常，点击重试</span></div>`
});

scrollload.container.addEventListener('click', function (event) {
	if ($(event.target).hasClass('clickHandler')) {
		scrollload.solveException();
	}
});

