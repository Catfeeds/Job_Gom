/**
 * 购物流程，生成订单相关接口
 */
module.exports = {

    // cartGetRedPacketList: '/ajax/car/getRedPacketList', // 购物车优惠券红包列表
    cartGetRedPacketList: '/ajax/coupons/shopCoupons', // 购物车优惠券红包列表V2
    // cartGetRedPacket: '/ajax/user/getRedPacket', // 购物车优惠券红包领取
    cartGetRedPacket: '/ajax/user/getRedPacketV2', // 购物车优惠券红包领取V2
    // cartUpdateGoods: '/ajax/car/update', // 购物车商品数量修改
    cartUpdateGoods: '/ajax/car/put', // 购物车商品数量修改v2
    // cartDelGoods: '/ajax/car/del', // 购物车删除商品
    cartDelGoods: '/ajax/car/del_v2', // 购物车删除商品v2
    cartOrderCheck: '/cart/orderdeliver', // 购物车结算检测
    cartFormSubmit: '/cart/checkout', // 购物车去结算地址

    cartGoodsCollect: '/cart/goodsCollect', // 购物车收藏的商品
    cartGoodsRecommend: '/cart/goodsRecom', // 购物车推荐的商品
    cartGoodsDetail: '/cart/goodsDetail', // 购物车添加收藏或推荐的商品详情

    unPayCancelOrder: '/order/mergerOrderCancel', //未付款取消订单
    payedCancelOrder: '/order/orderCancel', //已付款取消订单,待发货
    loadMoreOrder: '/Order/orderlist', // 加载更多订单接口
    confirmReceipt: '/order/confirm', // 确认收货
    delayReceipt: '/order/delayConfirm', // 延迟收货
    checkOrderPay: '/order/payCheck', // 检测订单支付是否可行
    showMyOrders: '/order/shineOrders', // 订单列表晒单接口

    subOrder: '/order/pay', //订单详情支付
    weixinPayStatus: '/order/checkPaySuccess', // 微信支付状态

    // 订单确认页面接口
    isAddrOk: '/cart/orderdeliver', // 当前地址是否可送达
    submitOrder: '/order/confirm', // 确认订单
    orderCheck: '/order/check', //检查是否是国美在线的
    orderSendGood: '/order/sendGood'

};
