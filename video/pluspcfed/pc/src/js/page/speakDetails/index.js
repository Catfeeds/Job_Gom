$("body").attr("data-module", "1");
require('lazyload');

var commentv2 = require('./comment/commentv2');
var praise = require('./praise');
var share = require('./share');


var topicAddMore = require('./topicAddMore/topicAddMore');
// 发送统计数据用
var delTopic = require('module/deletTopic');
var addImg = require('./comment/addImgGoods/addIMG');
var addGoods = require('./comment/addImgGoods/addGoods');
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('topicDetail');
var reportTopic = require('./report');

commentv2.init(); // 评论
share.init(); // 分享
praise.init(); // 赞
topicAddMore.init(); //加载更多话题

//删除美店说
$('[data-node=userTopic-del]').on('click',function(){
	var topicId = $(this).parents('[data-node=wrap-box]').attr('id-node');
	var options = {
		id: topicId,
		groupid: $_CONFIG['groupid'],
		content: '是否要删除美店说？',
		res: function(){
			location.replace($GLOBAL_CONFIG['meidian_domain'] + 'admin/topics.html');
		}
	}
	delTopic(options); 
})


addGoods.init(); //商品选择
addImg.init(); //添加图片事件

reportTopic.init();  //举报话题

$("img").lazyload({
    effect: "fadeIn"
});

/*$(".source-rig-box img").not('.publish-item img').attr('src', '').on('error', function() {
    imgError(this, 'l');
})
*/
