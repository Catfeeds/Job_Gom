require('./topicTitle');

//剪裁封面
require('./cropper').init();
// 选择圈子
require('./selectGroup').init();
require('./showShop');

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('publishTopic');
require('./labelItem').searchLenovo();

//预览话题
require('./preview/preview').init();
//发布话题
require('./public').init();

var showItem = require("./showItem");

var showData = $_CONFIG.itemJson;
if (showData !== '') {
    showItem.init(showData);
}
