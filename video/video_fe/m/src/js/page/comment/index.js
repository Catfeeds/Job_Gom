/* css */
import 'css/base/_reset.scss';
import 'css/components/scroll-load.scss';
import 'css/widgets/comment.scss';
/* fastclick */
/*import 'fastclick.js';*/
import Scrollload from 'Scrollload';

import Comment from 'widgets/comment/comment';

const comment = new Comment({
    data : {
      topic_id: 1
    },
    el: '#container',
    onFocus() {
        console.log(123);
    },
    onBlur() {
        console.log(456)
    }
});

let scrollload = new Scrollload(document.querySelector('#wrap'), function(sl){
    comment.fetchComments(1).done((sta)=>{
        if (!sta) {
            sl.throwException();
            return;
        } else {
            if (comment.data.noMore) {
                sl.noData();
            } else if (comment.data.error) {
                sl.throwException();
                return;
            } else {
                sl.unLock();
            }
        }
    });
}, {
    loadingHtml: '<div class="infinite-scroll"><span>加载中...</span></div>',
    noDataHtml: '<div class="infinite-scroll"><span>没有更多评论了</span></div>',
    exceptionHtml: `<div class="infinite-scroll clickHandler"><span>评论加载异常，点击重试</span></a></div>`
});

scrollload.container.addEventListener('click', function (event) {
    if ($(event.target).hasClass('clickHandler')) {
        scrollload.solveException();
    }
});
