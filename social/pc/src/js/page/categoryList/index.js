var listCategory = require('./listCategory.js');
var checkCreateStatus = require('../createGroup/checkCreateStatus');
listCategory.init();
checkCreateStatus.init();
// 埋点
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('groupList');