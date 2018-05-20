/**
 * @author 	Zhengchun Fu
 * @date 	2016/7/23
 */
var hasGoods = !!$('[data-node=submitBar]').length;
if (hasGoods) {
	// 店铺领券
	require('./tickets/index').init();

	// 选择商品
	require('./selectGoods/index').init();

	// 商品数量加减修改，价格联动
	require('./changeGoodsCount/index').init();

	// 删除商品
	require('./deleteGoods/index').init();

	// 展示更多失效商品
	require('./helper/showMoreLoseGoods').init();

	// 购物车提交结算
	require('./submitBar/index').init();
}

// 我的收藏
require('../../widget/cart/myCollect').init();

// 推荐商品
require('../../widget/cart/recommend').init();

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('shoppingCart');