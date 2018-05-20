<?php

/**
 * Created by PhpStorm.
 * User: wangzhibo
 * Date: 2016/6/1
 * Time: 10:19
 */
namespace Order\Service;

use Home\Service\BaseService;

class OrderService extends BaseService
{
    public $bs_version = 2;
    //空购物车推荐商品
    public $emptyCarRecommend = 'ext/recommendation/items4PcShoppingCart';
    //购买后推荐商品
    public $payRecommend = 'ext/recommendation/items4PcPaymentPage';
    //简易参数拆单
    public $preMergerOrderBySimpleParam = 'trade/preMergerOrderBySimpleParam';
    //总单信息(获取、创建)
    public $mergerOrder = 'trade/mergerOrder';//T5
    //我的优惠券列表
    public $userUseFulCoupons = 'trade/userUseFulCoupons';
    //支付获取支付详情
    public $payDetail = 'pay/payDetail';
	//订单详情页接口T5
	public $orderDetail = 'trade/mergerOrder';

}
