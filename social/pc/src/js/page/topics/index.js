var joinCircle = require('./joinCircle');
var share = require('./share');
// tmod helpers
require('module/tmodHelper/truncateLenByJson')();
require('module/tmodHelper/othersLink')();
// 发送统计
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('group');

//加入圈子
joinCircle.init();
//分享
share.init();