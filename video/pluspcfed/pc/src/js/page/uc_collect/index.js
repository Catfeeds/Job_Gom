var batchManage = require('./batchManage');
var select = require('./selectCollect');
var delCollect = require('./delCollect');
var loadMore = require('./loadMore');
var hotTopic = require('./hotTopic');

//批量管理
batchManage.init();
//单选/全选
select.init();
//单删/全删
delCollect.init();
//加载更多
loadMore.init();
//热门话题
hotTopic.init();
