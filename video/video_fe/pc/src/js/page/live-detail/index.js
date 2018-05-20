/* css */
import 'css/page/live-detail/index.scss';
import 'css/widgets/comment/comment.scss';
/* js */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import Share from 'components/share.js';
import Scrollload from 'Scrollload';
import Comment from 'widgets/comment/index.js';
// import Tab from './tab.js';
import DanMu from './danmu/index.js';
import {loginFlag, page, apiParams, env} from 'util/phpCommon';
import backTop from 'plugin/backTop.js';
import Like from 'widgets/action/like.js';
import Collect from 'widgets/action/collect.js';
import Subscribe from 'widgets/action/subscribe.js';
// import 'plugin/jquery.cookie.js';
import CommentContainer from 'widgets/comment/CommentContainer.js';
import React, { Component } from 'react';
import ReactDom from 'react-dom';

// 初始化tab
// new Tab($('[data-role=tabs]'));
// 初始化播放器(包括弹幕),
if (page.videoId != '') {
    $('[data-node=playerbox]').removeClass('hide');
    new DanMu({
        env: env,
        videoId: page.videoId,
        topicId: page.topicId,
        danmaku: 1,
        danmakuStatus: 1,
        type: 'live',
        autoplay: 1
    });
}

let shareInfo = {
    title:page.title,
    // url: page.mshare,
    desc: page.shareDesc,
    summary: page.shareDesc,
    pics: page.imageUrl

};
// let wxShareUrl = page.domain + `/s/${page.topicId}.html`;
let wxShareUrl = page.mshare;
new Share({
	id:'sharebox',
    targets:{
        qq:shareInfo,
        wx:{url:wxShareUrl},
        wb:shareInfo,
        qz:shareInfo
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
// let scrollload = new Scrollload($('[data-id=wrap]')[0], function(sl){
//     comment.data.scrollload = sl;
//     // fetchComments 传topicId
//     comment.fetchComments(page.topicId).done((sts)=>{
//         if (!sts) {
//             sl.throwException();
//             return;
//         } else {
//             if (parseInt(comment.data.comment_num) === 0) {
//                 /*$('.cmt-inputtips').click(()=>{
//                     $('#txtComment').focus();
//                 });*/
//                 $('.cmt-inputtips').show();
//                 $('.scrollload-bottom').hide();
//                 return;
//             } else {
//                 $('.cmt-inputtips').hide();
//                 $('.scrollload-bottom').show();
//                 // 没有更多数据
//                 if (comment.data.noMore) {
//                     sl.noData();
//                 } else if (comment.data.error) { //获取评论出错
//                     sl.throwException();
//                     return;
//                 } else {
//                     sl.unLock();
//                 }
//             }
//         }
//     });
// }, {
//     loadingHtml: '<div class="infinite-scroll"><span>加载中...</span></div>',
//     noDataHtml: '<div class="infinite-scroll"><span>没有更多评论了</span></div>',
//     exceptionHtml: `<div class="infinite-scroll clickHandler"><span class="clickHandler">评论加载异常，点击重试</span></a></div>`
// });

new backTop();

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