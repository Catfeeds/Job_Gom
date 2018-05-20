var joinCircle = require('./joinCircle');
var checkCreateStatus = require('../createGroup/checkCreateStatus');
var share = require('./share');
var change = require('./changeSidebar');
// var ratio = require('./changeRatio');
var tabbar = require('./tabbar');
// tmod helpers
require('module/tmodHelper/truncateLenByJson')();
require('module/tmodHelper/othersLink')();
// 发送统计
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('group');
//加入圈子
joinCircle.init();
//创建圈子
checkCreateStatus.init();
//分享
share.init();
//换一换功能
change.init();
//宽窄屏转换
//ratio.init();
//内容选项卡切换
tabbar.init();
