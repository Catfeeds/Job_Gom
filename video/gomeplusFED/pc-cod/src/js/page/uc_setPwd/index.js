/**
 * Created by dongyukuan on 2016/7/5.
 */
require('./sendCode').init();
require('./codeEvent').init();
require('./pwdEvent').init();
require('./submitEvent').init();
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('uc_setPwd');