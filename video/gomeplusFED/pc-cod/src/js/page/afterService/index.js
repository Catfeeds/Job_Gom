var orderList = require('./orderList');
orderList.init();

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('uc_afterService');