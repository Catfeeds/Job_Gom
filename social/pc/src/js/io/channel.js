/**
 * 定义所有的页面的pub/sub通道
 */

var channels = {
	// 确认订单页
	confirmOrder: {
		invoice: 'change', // 发票信息发生变化时
		changeUseTickets: 'changeUseTickets', // 改变使用优惠券时
		setGomeCoin: 'setGomeCoin', // 改变国美币使用状态时
		setFinalPrice: 'setFinalPrice', // 设置最终价格信息
		couponsList: 'couponsList', // 优惠券列表
		gomeMoney: 'gomeMoney' // 使用的国美币金额
	},
	postTopic: {
		selectCircle: 'done' // 圈子选择完毕
	},
	//发话题
	setPubliser: {
		changedItem: 'changeItem', //选择商品弹窗
		changeImage: 'uploadImg', //图片上传弹窗
		delItem: 'delItem' // 删除已插入的商品
	},
	//购物车
	shopCar: {
		headerShopCar: 'addShopCar', // 更新商品数量
		cartListGoods: 'cartListGoods' // 购物车选择的商品列表信息改变时
	},
	comment:{
		enableEditor: 'enableEditor'
	}
};

module.exports = channels;