<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：CustmoerInfoController.class.php                          |
 * +----------------------------------------------------------------------+
 * | @程序功能： 我的订单管理																																								   |
 * +----------------------------------------------------------------------+
 * | Author:zhangting <zhangting-ds1@loyo24.com>                          |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-19 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Controller;
use Home\Controller\AuthController;
use Home\Controller\PubliserController;
use Common\Lib\Page;
class CustomerInfoController extends AuthController
{
	public function __construct()
	{
		parent::__construct();
		$this->order = D('Ucenter/Order');	
		//$this->coupon= D("Ucenter/Coupon");
		$this->publiser_v1 = D("Group/PubliserV1");
	    $this->assign('activeUrl','/customerInfo/index') ; //左侧选中的地址
	}
	/**
	 *用户退货|退款商品列表
	 * 
	 */
	public function index(){
		$description="";//描述
		$keywords="";//关键字
		$this->assign('description',$description);
		$this->assign('keywords',$keywords);
		$this->assign('title', '售后服务-国美+');
	    $this->display("Customer/index");
	}
	/**
	 *用户退货|退款商品Ajax(数据)
	 * 
	 */
	public function getBackData(){
		$arrSendData['data'] = array();
		$arrSendData['page'] = array();
		$arrSendData['success'] = false;
		$arrSendData['page']['pageNum']  = $intpageNum  = I('param.pageNum',1,'intval');	
		$arrSendData['page']['pagesize'] = $intPageSize = I('param.pageSize',10,'intval');
		$arrList = $this->order->getData($this->order->customer_list,array('pageNum'=>$intpageNum,'pageSize' => $intPageSize));

		if($arrList['data'])
		{
			$arrSendData['success'] = true;
			foreach ($arrList['data']['afterSalesOrders'] as $key => $Item)
			{
				$arr = array();	
				$arr['id']      = $Item['id'];
				$arr['orderid'] = $Item['orderId'];
				$arr['paymentAmount'] = convert_price($Item['paymentAmount']);//交易金额

				if(in_array($Item['type'],array(3))){
					$arr['totalPrice'] = "";//退款总金额
				}
				else{
					$arr['totalPrice'] = convert_price($Item['refundAmount']);//退款总金额
				}
				$arr['type'] = $Item['type'];
				$arr['typedesc'] = $Item['typeDesc'];
				$arr['time'] = Date("Y-m-d H:i",intval($Item['applyTime'])/1000);//申请时间
				$arr['mail_name'] = $Item['shop']['name'];//卖家名字
				$arr['status'] = $Item['status'];
				$arr['statusDesc'] = $Item['statusDesc'];
				$strShopName = '';
			    $arrName = array();
				foreach ($Item['orderItems'] as &$Info) 
				{
					$id   = $Info['sku']['item']['id'];
					$name = $Info['sku']['item']['name'];
					$skuid =$Info['sku']['id'];
					if(mb_strlen($name) > 24 ){//产品要求大于24个字节
						$name = mb_substr($name,0,24,'utf-8')."...";	
					}
					$arrName[] = array('id' => $id,"name" => $name,'skuid' => $skuid);
				}
				$arr['shop_name'] = $arrName;
				array_push($arrSendData['data'],$arr);
			}
		}
		$this->response($arrSendData);
	}
	/**
	 *用户退货|退款订单详情
	 * 
	 */
	public function showCustomerInfo(){
		$this->assign('title', '售后订单详情-国美+');
		$arrSendData['order_info'] = array();
		$arrSendData['goods_info'] = array();
		$arrSendData['total'] = array();
		$arrSendData['shop_info'] = array();
		$id   = I('param.id',0,'intval');	
		$arrInfo = $this->order->getData($this->order->showcustomer_info,array('id' => $id));

		if($arrInfo['success']){
			$arrSendData['order_info']['type']     = $arrInfo['data']['type'];
			$arrSendData['order_info']['typeDesc'] = $arrInfo['data']['typeDesc'];
			$arrSendData['order_info']['reason']   = $arrInfo['data']['reason'];
			$arrSendData['order_info']['money_id'] = $arrInfo['data']['id'];
			$arrSendData['order_info']['returnMoney'] = isset($arrInfo['data']['refundAmount']) ? convert_price($arrInfo['data']['refundAmount']): number_format(0,2);
			$arrSendData['order_info']['statusDesc'] = $arrInfo['data']['statusDesc'];
			$arrSendData['order_info']['show_shop_name'] = $arrInfo['data']['shop'];
			$shopid= $arrInfo['data']['shop']['id'];//xpop店铺id
			$moneyTotal = 0;
			foreach ($arrInfo['data']['orderItems'] as $Item) 
			{
				$arr = array();	
				$arrSendData['shop_info']['id']   = $arr['shopid'] = $Item['mshop']['id'];
				$arrSendData['shop_info']['name'] = $arr['shopname'] = $Item['mshop']['name'];
				$arr['good_id']     = $Item['sku']['item']['id'];
				$arr['skuid'] = $Item['sku']['id'];
				if(mb_strlen($Item['sku']['item']['name']) > 24){
						$arr['good_name'] = mb_substr($Item['sku']['item']['name'],0,24,'utf-8').'...';
				}
				else{
						$arr['good_name'] = $Item['sku']['item']['name'];
				}
				$arr['good_id']     = $Item['sku']['item']['id'];//商品id
				$arr['skuid']       = $Item['sku']['id'];//skuid
				$arr['good_image']  = $Item['sku']['image'];
				$arr['good_price']  = convert_price($Item['sku']['price']);
				$arr['good_total']  = $Item['quantity'];
				$arr['attribute']   = $Item['sku']['attributes'];
				$intMshopId = $Item['mshop']['id'];//mshopid
				if($shopid== $intMshopId)
				{
					$arr['shop_type']= 1;//xpop店铺
					$arr['xpopname'] = "";//xpop名字
				}
				else{
					$arr['shop_type'] = "";//美店
					$arr['xpopname']  = $Item['mshop']['name'];//xpop名字
				}
				$arr['shop_id']  = $intMshopId;
				$moneyTotal += $Item['quantity'] * $Item['sku']['price'];
				array_push($arrSendData['goods_info'],$arr);
			}

			$arrSendData['total']['total_goods'] = $arrInfo['data']['quantity'];//商品总数量
			$arrSendData['total']['total_const'] = convert_price($arrInfo['data']['shippingCost']);
			$intSumMoney = $arrInfo['data']['platformCouponMoney']+$arrInfo['data']['shopCouponMoney'];
			$arrSendData['total']['promation'] = convert_price($intSumMoney);
			$arrSendData['total']['gome_moeny_total'] = convert_price($arrInfo['data']['gomeMoney']);
			$arrSendData['total']['money_total'] = convert_price($moneyTotal);
			$arrSendData['total']['order_total_money'] = convert_price($arrInfo['data']['paymentAmount']);
		}
		$this->assign('senddata',$arrSendData);
		$this->display("Customer/customer_order_info");
	}
	/**
	  * 一键发货
	  *
	  */
	public function sendGoods(){
		$arrSendData = array();
		$arrSendData['success'] = false;
		$intOrderId = I('param.orderid',0,'intval');//售后单id
		$logisticVenderId = I('param.logisticVenderId',0,"intval");//物流公司id
		$logisticNo = I('param.logisticNo',"",'trim');//物流单号

		if(empty($intOrderId) || empty($logisticVenderId) || empty($logisticNo))
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$arrParams = array(
					"afterSalesOrderId"	 => $intOrderId,
					"logisticsVendorId"  => $logisticVenderId,
					"logisticsNo" => $logisticNo,
		);
		$arrInfo = $this->order->postData($this->order->sellerDelivery,$arrParams);
		if($arrInfo['success'])
		{
			$arrSendData['success']	 = true;
		}
		$arrSendData['message'] = $arrInfo['message'];

		$this->response($arrSendData);
	}


	public function upload_img(){
		$name = 'meixin_files';
		$size = $_FILES[$name]['size'];
		if(!empty($_FILES[$name]['tmp_name']))
		{
			$filePath = $_FILES[$name]['tmp_name'];
			$data = array('size'=>$size,'imageArray'=>'@'.$filePath);
			if(version_compare(PHP_VERSION,'5.5.0','>'))
			{
				//PHP 版本大于5.5.0 文件上传使用CURLFile类
				$data['imageArray'] = new \CURLFile($filePath);
			}   
			$result = $this->publiser_v1->postData($this->publiser_v1->upload_img,$data);  
			$this->response( $result );
		} 
		else {
			$this->outError(\Think\ErrorCode::UPLOAD_ERROR);
		}   
	}

	/**
	  * 物流信息
	  *
	  */
	public function getGoodsStreamInfo(){
		$arrStreamInfo = array();
		$arrStreamInfo['success'] = false;
		$arrVendor = $this->order->getData($this->order->logisticsVendor,array('pageNum'=>1,'pageSize'=>300));

		if($arrVendor['success']){
			$arrStreamInfo['success'] = true;
			$arrInfo= $arrVendor['data']['logisticsVendors'];	
			$arrStreamInfo['data'] = $arrInfo;
		}

		$this -> response($arrStreamInfo);
	}

	/**
	 * 物流log信息(换货退货物流信息) 
	 *
	 */

	public function getOrderLogistics(){
		$list = array();
		$intId = I('param.id','','intval');//售后单id
		$intOrderId = I('param.orderId','','intval');//订单id
		if(empty($intId) || empty($intOrderId)){
			$this->outError(\Think\ErrorCode::UPLOAD_ERROR);
		}
		//物流信息
		$param['type']     = 2;//查看物流类型（1：查看正向订单，2：查看逆向订单）
		$param['shopType'] = 1 ;//店铺类型 1：XPOP店 2:员工达人店
		$param['orderId']  = $intId;//售后单id
		$list = $this->order->getData($this->order->order_orderLogistics,$param);
		$list = $list['success']== true ? $list['data'] : '';
		if($list['messages']){
			foreach ($list['messages'] as $k=>&$v){
				$v['date'] = date("Y-m-d",intval($v['time']/1000));
				$weekarray = array("日","一","二","三","四","五","六");
				$v['week'] = '星期'.$weekarray[date("w",intval($v['time']/1000))];
				$v['hour'] = date("H:i:s",intval($v['time']/1000) );
			}
		}
		$this->assign('title', '物流信息');
		$this->assign('list', $list);
		$this->assign('detailData',$detailData);
		$this->display('Customer/wuliuinfo');
	}

	/**
	 * 买家换货确认收
	 *
	 */
	public function buyCheckGoods(){
		$intId = I('param.id','','intval');	
		if(empty($intId)){
			$this->outError(\Think\ErrorCode::UPLOAD_ERROR);
		}
		$params = array(
			'afterSaleOrderId'=>$intId,
		);
		$arrReturn = $this->order->postData($this->order->confirmgoods,$params);
		$this -> response($arrReturn);
	}
}
