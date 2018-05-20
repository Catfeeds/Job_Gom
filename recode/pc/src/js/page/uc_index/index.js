/**
 * 个人中心首页
 * @author QiaoLi
 */

var confirmGoods = require('./confirmGoods');
var recommendGoods = require('./recommendGoods');
var buriedPoint = require('utils/buriedPoint');
//确认收货
confirmGoods.init();

//推荐商品
recommendGoods.init();

// 发送统计数据用
buriedPoint.setPageData('ucenter');