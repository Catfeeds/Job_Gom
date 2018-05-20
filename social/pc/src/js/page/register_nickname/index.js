require('./nickName/index');
//头像上传
require('./headImg').init();
$('[data-node=nickname_input]').nickname();
//提交信息
require('./subData').init();
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('nickname');