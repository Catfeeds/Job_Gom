var address = require('./address/index');
var useTickets = require('./coupon/tickets');
var invoice = require('./invoice/index');
var buyersMsg = require('./buyersMsg/index');
var submitOrder = require('./submitOrder/index');

// 初始化收货地址
address.init();
// 初始化发票选择
invoice.init();
// 提交订单
submitOrder.init();

// 买家留言
buyersMsg.init();

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('confirmOrder');