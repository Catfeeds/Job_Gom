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
	productChoose: '/product/prodRecom',
};