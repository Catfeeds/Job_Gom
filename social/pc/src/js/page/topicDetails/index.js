require('lazyload');
$("img").lazyload({ effect : "fadeIn"});
var commentv2 = require('./comment/commentv2');
var circle = require('module/joinCircle');
var follow = require('./follow');
var praise = require('./praise');

var share = require('./share');
var collect = require('./collect');
var topicAddMore = require('./topicAddMore/topicAddMore');
// 发送统计数据用

var buriedPoint = require('utils/buriedPoint');
var addImg = require('./comment/addImgGoods/addIMG');
var addGoods = require('./comment/addImgGoods/addGoods');
buriedPoint.setPageData('topicDetail');
 
commentv2.init();// 评论
share.init();// 分享
collect.init();// 收藏
praise.init();// 赞
follow.init($('[data-node=follow]'));// 加关注
topicAddMore.init();//加载更多话题

addGoods.init();//商品选择
addImg.init();//添加图片事件

// 加入圈子
$('body').on('click','[data-node=circle]',{done:function(){
    commentv2.getLoginState();
    window.location.reload();
}},circle);
$("img").lazyload({ effect : "fadeIn"});