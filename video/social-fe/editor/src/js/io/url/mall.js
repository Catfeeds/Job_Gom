/**
 * 商城相关接口
 */
module.exports = {
	shareGetGoodsKid: '/product/shareRebateId', // 分享到获取商品的kid
	//获取优惠券列表
	ticketList: '/product/coupons',
	//领取优惠券
	getTicket: '/ajax/user/getRedPacketV2',
	//店铺领取优惠券
	getShopTicket: '/ajax/user/getRedPacket',
	//商品详情页店内推荐
	shopChoose: '/product/shopRecom',
	//商品详情页商品推荐
	productChoose: '/product/recommend',
	//店铺内搜索加载更多
	searchGetMore:'shop/searchMoreList',
	//店铺动态页内容加载 
	dynamicGetData:'/ajax/topic/ta',
	//在线商品获取sku价格
	getCurrSkuInfo: '/product/getCurrSkuInfo',
	//在线商品切换地址获取价格
	getCurrItemInfo: '/ajax/address/getCurrItemInfo',
	//商品搜素
	searchGoods: '/search/productList',
	getBrand: '/search/productbrandfirstWordList',
	//店铺营业执照查看获取验证码
	getCodeOfBusiness:'/shop/getcode',
	//店铺营业执照查看发送数据监测验证码
	shopCodeCheck:'/shop/check'
};
