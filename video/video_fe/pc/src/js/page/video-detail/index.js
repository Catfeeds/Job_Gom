/* css */
import 'css/page/video-detail/index.scss';
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import Share from 'components/share.js';
import {page, env} from 'util/phpCommon';
import Scrollload from 'Scrollload';
import Comment from 'widgets/comment/index.js';
import player from './player';
import backTop from 'plugin/backTop.js';
import Like from 'widgets/action/like.js';
import Collect from 'widgets/action/collect.js';
import Subscribe from 'widgets/action/subscribe.js';

import CommentContainer from 'widgets/comment/CommentContainer.js';
import React, { Component } from 'react';
import ReactDom from 'react-dom';

new backTop();
if($CONFIG.videoId){
    player.init(); // 初始化播放器
}

var shareConfig = {
    title: page.title || '',
    summary: page.shareDesc || '',
    pics: page.imageUrl
};
// let wxShareUrl = page.mshare + `/${page.topicId}.html`;
let wxShareUrl = page.mshare;
new Share({
	id:'sharebox',
    targets:{  // 分享到社交平台的配置，不给则为默认值
        qq:shareConfig,
        wx:{url:wxShareUrl},
        wb:shareConfig,
        qz:shareConfig
    }
});


ReactDom.render(
    <CommentContainer topicId ={ page.topicId}/>,
    document.querySelector("[data-id=commentComponent]")
);

// const comment = new Comment({
//     data : {
//         topic_id: page.topicId // page.topicId获取 , 20170227
//     },
//     el: '[data-id=commentComponent]'
// });

/*let scrollload = new Scrollload($('[data-id=wrap]')[0], function(sl){
    comment.data.scrollload = sl;
    comment.fetchComments(page.topicId).done((sts)=>{
        if (!sts) {
            sl.throwException();
            return;
        } else {

            if (parseInt(comment.data.comment_num) === 0) {
                $('.cmt-inputtips').show();
                $('.scrollload-bottom').hide();
                return;
            } else {
                $('.cmt-inputtips').hide();
                $('.scrollload-bottom').show();
                // 没有更多数据
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
    exceptionHtml: `<div class="infinite-scroll clickHandler"><span class="clickHandler">评论加载异常，点击重试</span></a></div>`
});
scrollload.container.addEventListener('click', function (event) {
    if ($(event.target).hasClass('clickHandler')) {
        scrollload.solveException();
    }
});*/

// 赞
new Like({
	delegate: '.message'
});
// 收藏
new Collect({
	delegate: '.message'
});
new Subscribe({
	delegate: '.message'
});
