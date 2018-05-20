// 发送统计数据,统一调用

var setPageId = function(id){
	window._page_id_ = id;
};

var setPageName = function(name){
	window._page_name_ = name;
};

// 数据统计用
var map = {
	home: {
		id: 'A001',
		name: '大首页'
	},
	groupList: {
		id: 'B001',
		name: '圈子列表页'
	},
	group: {
		id: 'B002',
		name: '圈子主页'
	},
	topicDetail: {
		id: 'B003',
		name: '话题详情页'
	},
	publishTopic: {
		id: 'B004',
		name: '发布话题'
	},
	createGroup: {
		id: 'B005',
		name: '创建圈子'
	},
	commodityDetail: {
		id: 'C001',
		name: '商品详情'
	},
	shopDetail: {
		id: 'C002',
		name: '店铺详情'
	},
	/* 搜索 */
	searchGroup: {
		id: 'D007',
		name: '圈子搜索'
	},
	searchTopic: {
		id: 'D008',
		name: '话题搜索'
	},
	searchShop: {
		id: 'D009',
		name: '店铺搜索'
	},
	/* 登录,注册,找回密码等 */
	login: {
		id: 'E001',
		name: '登录'
	},
	register: {
		id: 'E002',
		name: '注册'
	},
	nickname: {
		id: 'E003',
		name: '填写昵称、推荐码'
	},
	/*registerComplete: {
		id: 'E004',
		name: '注册完成'
	},*/
	relevancePhone: {
		id: 'E005',
		name: '关联手机号'
	},
	bindTelNum: {
		id: 'E006',
		name: '绑定手机号'
	},
	forgetPwd: {
		id: 'E007',
		name: '忘记密码'
	},
	newPwd: {
		id: 'E009',
		name: '设置新密码'
	},
	/*newPwd: {
		id: 'E010',
		name: '重置完成'
	}*/
	/* 个人中心 */
	ucenter: {
		id: 'F001',
		name: '个人中心首页'
	},
	uc_circle: {
		id: 'F002',
		name: '个人中心-我的圈子'
	},
	uc_topics: {
		id: 'F003',
		name: '个人中心-我的话题'
	},
	uc_orders: {
		id: 'F004',
		name: '个人中心-我的订单'
	},
	/*
	优惠券页面没有引用page级的脚本,所以埋在页面上
	因为收藏用的是一个模版,所以也埋在页面上
	uc_coupon: {
		id: 'F005',
		name: '个人中心-我的优惠券'
	},
	uc_: {
		id: 'F006',
		name: '个人中心-商品收藏'
	},
	newPwd: {
		id: 'F007',
		name: '个人中心-店铺收藏'
	},
	newPwd: {
		id: 'F008',
		name: '个人中心-话题收藏'
	},
	*/
	uc_setPwd: {
		id: 'F009',
		name: '个人中心-修改密码'
	},
	uc_address: {
		id: 'F010',
		name: '个人中心-收货地址'
	},
	uc_afterService: {
		id: 'F011',
		name: '个人中心-退款售后'
	},
	/* 购物车 */
	shoppingCart: {
		id: 'G001',
		name: '购物车'
	},
	/* 确认订单 */
	confirmOrder: {
		id: 'G002',
		name: '确认订单'
	},
	/* 收银台 */
	payDetail: {
		id: 'G003',
		name: '收银台'
	},
	paycode: {
		id: 'G004',
		name: '支付页面(微信)'
	}
};

var setPageData = function(name){
	var data = map[name];
	if(data){
		setPageId(data.id);
		setPageName(data.name);
	}
};

module.exports = {
	setPageData: setPageData
};