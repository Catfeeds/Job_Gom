<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class OrderService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:zhangting-ds1 <zhangting-ds1@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/7/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Service;
use Home\Service\BaseService;

class OrderService extends BaseService
{
    public $key = 'OrderService';
    public $param = array();
    public $bs_version = 2;

    //个人中心我的订单 wiki 
	public $order_status= 'trade/personalOrderStastics';//v2订单状态结果值T20
	public $order_list = 'trade/buyerOrders';//GET 买家订单列表T16
	public $order_mergerOrderCancel = 'trade/mergerOrderCancelAction';//POST 取消合单
	public $order_orderCancel = 'trade/orderCancelAction'; //POST 取消订单
	public $order_mergerOrder  = 'trade/mergerOrder'; //GET 合单--获取待付款订单详情 |POST 创建总单信息
	public $order_buyerOrderDetail = 'trade/buyerOrderDetail';//GET 买家订单详情T18
	public $order_orderLogistics = 'trade/orderLogistics';//GET 订单物流信息T11
	public $order_deliveryConfirmation = 'trade/deliveryConfirmationAction'; //POST 确认收货
	public $order_delayConfirm = "trade/delayConfirmAction"; //T37 延迟确认收货 POST
	public $goods_info = "combo/item";//商品详情信息
	public $recommend  = "ext/recommendation/items4EvaluationCompleted";//为你推荐
	public $customer_list = "trade/afterSalesOrders";//用户退款或者退货列表接口T22
	public $PcPersonal = "ext/recommendation/items4PcPersonal";//个人中心首页为你推荐
	public $showcustomer_info = "trade/afterSalesOrderDetail";//买家售后详情T24
	public $logisticsVendor = "trade/logisticsVendors";//T9 物流列表
	public $sellerDelivery = "/trade/buyerDelivery";//T28发货
	public $confirmgoods = "/trade/buyerDeliveryConfirmationForAfterSalesAction";//买家换货后确认收货T31
    public $rebate_info = "/account/accountAssets";//用户返利金额接口
    public $comment_goods="trade/orderItemsComment";//评价多个商品T15
	public $order_service = "trade/afterSalesOrder";//售后服务T26退换货公用
	public $applyType = array(1=>"退货",2=>"换货");
	public $boughtItems = 'trade/boughtItems';	//我要晒单列表T38
}
