/**
 * 个人中心——订单详情
 * @author Zhengchun Fu
 */

// 取消订单
require('./cancelOrder').init();

// 收货操作:确认收货，延迟收货
require('./receiptGoods').init();

// 联系商家
require('./contactMerchant').init();