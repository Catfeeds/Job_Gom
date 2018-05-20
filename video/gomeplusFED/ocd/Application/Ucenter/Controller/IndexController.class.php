<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能： 个人中心首页                                             |
 * +----------------------------------------------------------------------+
 * | Author:zhangting <zhangting@loyo24.com>                              |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-07 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;

class IndexController extends AuthController
{

    public function __construct()
    {
		parent::__construct();
		$this->coupon        = D("Ucenter/Coupon");
		$this->ucenter_order = D("Ucenter/Order");//v2
		$this->topic_v2      = D('Ucenter/Topic');//v2
		$this->promontion    = D("Ucenter/Promotion");//v2优惠卷
		$this->assign('activeUrl','/index/index') ; //左侧选中的地址
    }
	/**
	 * 个人中心-用户信息
	 * 
	 */
    public function index(){
		$descrition="";
		$keywords="";
		$arrSendData = array();
		$UserId      = $this->userId;
		$LoginToken  = $this->token;
		$arrSendData['userinfo'] = array();
		$user_info = $this->getUserInfo();
		if($user_info)
		{
			$arrSendData['userinfo'] = array(
				'imagePath'	 => $user_info['user']['facePicUrl'],//图片地址
				'nickName'	 => $user_info['user']['nickname'],//别称
				'friendNum'  => $user_info['attentionQuantity']['attentionQuantity'],//关注
				'fansNum'  => $user_info['attentionQuantity']['fansQuantity'],//粉丝
				'expertAuditStatus' => $user_info['expert']['isExpert'],//大人
			);
		}
		$params = array('loginToken'=>$LoginToken);
		$arrCouponInfo = $this->ucenter_order->getData($this->ucenter_order->rebate_info,$params);
		$arrSendData['coupinfo'] =0;
		if($arrCouponInfo['success'])
		{
			$arrSendData['coupinfo'] = convert_price($arrCouponInfo['data']['gomeMoneyAmount']);
		}
		$arrParams = array(
			'status'   => 1,
			'pageSize' => 1,
			'pageNum'  => 10,
		);
	   $intNum=0;
	   $arrDisCountInfo = $this->promontion->getData($this->promontion->couponInfo,$arrParams);
	   if($arrDisCountInfo['success'] && isset($arrDisCountInfo['data']['totalQuantity'])){
			$intNum = $arrDisCountInfo['data']['totalQuantity'];	
	   }
	   $arrSendData['promationtotal'] = $intNum;
	   $arrHandlePerson = $this->getOtherGoods($pageSize = 1,$opType = 1);
	   $arrSendData['pcpersonal'] = $arrHandlePerson;
	   $param = array('orderStatus'=>0,'pageNum'=>1,'pageSize' =>2,'integrity'=>'full');
	   $orderData = $this->ucenter_order->getData($this->ucenter_order->order_list, $param);
	   $arrHandleInfo = array();
	   if($orderData['success'])
	   {
			$arrHandleInfo = $this->handleMyOrderInfo($orderData);
	   }
	   $arrSendData['orderinfo'] = $arrHandleInfo;
	   $arrOrderStatusInfo = $this->ucenter_order->getData($this->ucenter_order->order_status,array('userType'=>1));	    
	   $arrOrderStatus = array();
	   if($arrOrderStatusInfo['success'])
	   {
			$arrOrderStatus['pendComment'] =$arrOrderStatusInfo['data']['pendComment'];
			$arrOrderStatus['pendDelivery']=$arrOrderStatusInfo['data']['pendDelivery'];
			$arrOrderStatus['pendPayment'] =$arrOrderStatusInfo['data']['pendPayment'];
			$arrOrderStatus['pendReceive'] =$arrOrderStatusInfo['data']['pendReceiving'];
			foreach ($arrOrderStatus as &$Item) {
				if($Item > 99){
					$Item = "9+";
				}		
				if(empty($Item)){
					$Item="";	
				}
			}
	   }

	   $arrSendData['orderstatus'] = $arrOrderStatus;
	   $params = array('pageNum'=>1,'pageSize' =>5,'ownerUserId'=>$UserId);
	   $arrTopicList = $this->topic_v2->getData($this->topic_v2->topic_list_v2,$params);
	   $arrSendData['topiclist'] = array();
	   if($arrTopicList['success']){
			$arrHandleTopicInfo = $this->handleTopicInfo($arrTopicList);
			$arrSendData['topiclist'] = $arrHandleTopicInfo;
	   }

	   $this->assign("description",$descrition);
	   $this->assign('keywords',$keywords);
	   $this->assign("data",$arrSendData);
	   $this->assign("title","个人中心");
	   $this->display("Index/index");
	}
	/**
	 * 个人中心-处理话题信息
	 * 
	 */
	private function handleTopicInfo($arrInfo){
		$arrSendData = array();
		foreach ($arrInfo['data']['topics'] as $key => $Item)
		{
			$arrItem['title'] = $Item['name'];
			$arrItem['groupName'] = $Item['group']['name'];
			$arrItem['groupicon'] = $Item['group']['icon'];
			$arrItem['groupid']   = $Item['group']['id'];
			$arrItem['time'] = Date("Y-m-d",$Item['createTime']/1000);
			$arrItem['topid'] = $Item['id'];
			array_push($arrSendData,$arrItem);
		}

		return $arrSendData;
	}

	/**
	 * 个人中心-处理订单信息
	 * 
	 */
	private function handleMyOrderInfo($arrOrderInfo){
		$arrSendData = array();
		foreach ($arrOrderInfo['data']['orders'] as $key => $ItemInfo)
		{
			$arrOrderInfo = array();
			$arrOrderInfo['order_id'] = $ItemInfo['id'];
			$arrOrderInfo['mergerid'] = $ItemInfo['mergerId'];
			$arrOrderInfo['money']    = convert_price($ItemInfo['paymentAmount']);
			$arrOrderInfo['name']     = $orderName = isset($ItemInfo['consigneeName']) ? $ItemInfo['consigneeName'] : "";
			$arrOrderInfo['time']     = $orderCreateTime = Date("Y-m-d H:i:s",intval($ItemInfo['orderTime'])/1000);

			$arrImage = array();
			foreach ($ItemInfo['orderItems'] as $k =>$v)
			{
				$goods_info = array();
				$goods_info['image']   = $imageUrl  = $v['sku']['image'];
				$goods_info['shopId']  = $intShopId = $v['mshop']['id'];
				$goods_info['id']      = $intGoodId = $v['sku']['item']['id'];
				if(count($arrImage) < 3)
				{
					array_push($arrImage,$goods_info);
				}
			}
			$arrOrderInfo['info']       = $arrImage;
			$arrOrderInfo['status']     = $ItemInfo['status'];//订单状态
			$arrOrderInfo['order_desc'] = $ItemInfo['statusDesc'];

			if(count($ItemInfo['orderItems']) > 3){
				$arrOrderInfo['show'] = 2;
			}
			else{
				$arrOrderInfo['show'] = 1;
			}
			array_push($arrSendData,$arrOrderInfo);
		}	

		return $arrSendData;
	}

	//个人中心推荐商品
	public function getOtherGoods($pageNum=1,$opType=''){
		$arrHandlePerson = array();
		$arrPersonal= array('pageSize'=>8,'pageNum'=>$pageNum);
	    $arrInfo = $this->ucenter_order->getData($this->ucenter_order->PcPersonal,$arrPersonal);

		if($arrInfo['success'])
		{
			if(!empty($arrInfo['data']['items']))
			{
				$arrHandlePerson = $arrInfo['data']['items'];	
			    foreach ($arrHandlePerson as &$Item)
				{
					$Item['price']	            = convert_price($Item['price']);
					$Item['salePrice']	        = convert_price($Item['salePrice']);
					$Item['skuHighestPrice']	= convert_price($Item['skuHighestPrice']);
					$Item['originalPrice']	    = convert_price($Item['originalPrice']);
				}
			}
		}

	    return $arrHandlePerson;	
	}

	//ajax调用接口个人推荐
	public function sendOtherGoods(){
		$arrSendData = array();
		$pageNum = I('param.pageNum',1,'intval');
		$arrInfo= $this->getOtherGoods($pageNum);	

		if(!empty($arrInfo))
		{
			$arrSendData['success'] = true;
			$arrSendData['data']    = $arrInfo;
			$arrSendData['page']    = $pageNum;
		}
		else{
			$arrSendData['success'] = false;
			$arrSendData['data'] = array();
			$arrSendData['page'] = $pageNum;
		}

		$this->response($arrSendData);
	}
}
