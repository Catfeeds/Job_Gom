require('./qrCodeLogin').init();
require('./accLogin').init();
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('login');
