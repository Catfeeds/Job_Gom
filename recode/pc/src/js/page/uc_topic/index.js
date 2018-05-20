var main = require('./main/index');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('uc_topics');

main.init();