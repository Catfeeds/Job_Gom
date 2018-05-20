/**
 * 个人中心我的订单
 * @author Zhengchun Fu
 */

// 取消订单
require('./cancelOrder/index').init();

// 加载更多
require('./loadMore/index')();

// 收货操作：确认收货，延迟收货
require('./confirmReceipt/index').init();

// 联系商家
require('./contactMerchant/index').init();

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('uc_orders');