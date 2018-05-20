"use strict";
/* css */
import 'css/page/video_detail/index.scss';
import 'css/components/scroll-load.scss';
import 'css/widgets/comment.scss';
/* fastclick */
import 'fastclick.js';
/* backTop */
import backTop from 'plugin/backTop.js';
import Scrollload from 'Scrollload';
import Comment from 'widgets/comment/comment';
import Share from 'widgets/share/share';
import {page} from 'util/phpCommon';
import callAppShare from 'widgets/share/callAppShare';
 //import 'util/vconsole.min.js'

var topicId = page.topicId;
// var backtop = new backTop();

var v = new MeixinPlayer();
v.init(page.videoId || 428, 'videoContainer', {
    type: page.type || 'vod', // 直播：live，点播：vod
    poster: '', // 播放器封面图
    env: page.env || 'pre', // dev, pre, dist
});

const comment = new Comment({
    data : {
        topic_id: topicId // page.topicId获取 , 20170227
    },
    el: '[data-id=commentComponent]'/*,
    onFocus() {
        setTimeout(()=>{
            backtop.hide();
        }, 200);
    },
    onBlur() {
        setTimeout(()=>{
            backtop.show();
        }, 200);
    }*/
});

let scrollload = new Scrollload($('[data-id=wrap]')[0], function(sl){
    // fetchComments 传topicId
    comment.fetchComments(topicId).done((sts)=>{
        if (!sts) {
            sl.throwException();
            return;
        } else {
            // 没有更多数据
            if (comment.data.noMore) {
                sl.noData();
            } else if (comment.data.error) { //获取评论出错
                sl.throwException();
                return
            } else {
                sl.unLock();
            }
        }
    }).fail((err)=>{
        sl.throwException();
    });
}, {
    loadingHtml: '<div class="infinite-scroll"><span>加载中...</span></div>',
    noDataHtml: '<div class="infinite-scroll"><span>没有更多评论了</span></div>',
    exceptionHtml: `<div class="infinite-scroll clickHandler"><span class="clickHandler">评论加载异常，点击重试</span></a></div>`
});

scrollload.container.addEventListener('click', function (event) {
    if ($(event.target).hasClass('clickHandler')) {
        scrollload.solveException();
    }
});

new Share({
    selector:'.iconbox em',
    config: page
});

callAppShare();
