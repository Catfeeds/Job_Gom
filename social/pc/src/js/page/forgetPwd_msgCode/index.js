/**
 * Created by dongyukuan on 2016/5/23.
 */
var initEvent=require('./bindEvent');
require('placeholder');
$('input').placeholder();
initEvent();

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('forgetPwd');