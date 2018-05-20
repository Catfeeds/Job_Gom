var circle = require('module/joinCircle');
var follow = require('./follow');
var praise = require('./praise');
var commentv2 = require('./comment/commentv2');
var share = require('./share');
var collect = require('./collect');
var ulFixed = require('./ulFixed');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('topicDetail');

var fixedTopic = require('./fixedTopic');
fixedTopic.init();
ulFixed.init();
// 分享
share.init();
// 收藏
collect.init();
// 赞
praise.init();
// 加关注
follow.init($('[data-node=follow]'));
// 评论
//comment.init();
commentv2.init();
// 加入圈子
circle('[data-node=circle]', function() {
    var $els = $('[data-node=circle]');
    var approvaltype = $els.data('approvaltype');
    if (approvaltype == 0) {
        $els.css('backgroundColor', '#fc8753').html('发布话题');
        $els.attr('href', '/topic/publiser?gid=' + $els.data('groupid'));
        $els.attr('event-id', 'G000P010'); // 切换为发布话题的event_id
    } else if (approvaltype == 1) {
        $els.css('backgroundColor', '#ccc');
    }
    $els.off().show();

    commentv2.getLoginState();
});
