<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                          |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AddressController.class.php                                |
 * +----------------------------------------------------------------------+
 * | @程序功能： 我的订单管理                                                                                              |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-08 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Controller;
use Home\Controller\AuthController;
use Common\Lib\Page;
class OrderController extends AuthController
{
    const pageNum = 15 ;
	public function __construct()
	{
		parent::__construct();
		$this->order = D('Ucenter/Order');	
		$this->coupon= D("Ucenter/Coupon");
		$this->assign('activeUrl',APP_HTTP.C('UCENTER_URL').'order/index') ; //左侧选中的地址
	}

	/**
	 * 订单页面
	 *
	 */
	public function index()
	{
		$list = array();
		$page['pageNum'] = $param['pageNum'] = I('param.page', 1, 'intval');
		$page['numPerPage'] = $param['pageSize'] = self::pageNum+1 ; //15
		$param['orderStatus'] = $statu = I('param.status', 0, 'intval');
		if($param['orderStatus'] === 4 ){
		    $param['hasComment'] = 0 ;
		}
		$param['loginToken'] = $this->token;
		$orderData = $this->order->getData($this->order->order_list, $param, false);

		if($orderData['success'] == true)
		{
			$list = $orderData['data']['orders'];
			$count = count($list);
			$pageMore = $count > self::pageNum ? 1 : 0 ; //是否可以点击加载更多
			$this->assign('pageMore',$pageMore); 
			if($count > self::pageNum){
			    array_pop($list) ;
			}
			foreach ($list as $k=>$v){
			    $list[$k]['paymentAmount'] = number_format( ((int)$v['paymentAmount'])/100,2 );
			    $list[$k]['shippingCost'] = number_format( ((int)$v['shippingCost'])/100 ,2 );
			    foreach ( $v['orderItems'] as $kk=>$vv ){
			        $list[$k]['orderItems'][$kk]['sku']['price'] = number_format( ((int)$vv['sku']['price'])/100,2 );
			        $tempName = xss_clean($vv['sku']['item']['name'] );
			        $list[$k]['orderItems'][$kk]['sku']['item']['shortName'] = intval(mb_strlen($tempName,"UTF-8") )  > 24 ? mb_substr( $tempName, 0,24).'...' : $tempName ;
			    }
			    $list[$k]['orderItemsCount'] = count($v['orderItems']);
			    $list[$k]['orderTime'] =  $v['orderTime'] ? date("Y-m-d H:i:s",intval( $v['orderTime']/1000) ) : '' ;
			}
			$page['total'] = $orderData['data']['total'];
			
		}
		
		//各状态订单数量
		$param = array();
		$param['userType'] = 1 ;//用户类型 （1，买家、2，卖家）
		$statusData = $this->order->getData( $this->order->order_status,$param,false );
		if($statusData['success'] == true ){
		    $status = $statusData['data'];
		    $this->assign('status',$status) ;//选中效果
		}
		
		$this->assign('title', '我的订单');
		$this->assign('statu',$statu) ;//选中效果
		$this->assign('total',$page['total']); //当前页条数
		$this->assign('list', $list);
		$this->display('Order/index');

	}
	
	/**
	 * 晒单页面
	 *
	 */
	public function shine()
	{
		//各状态订单数量
		$param = array();
		$param['userType'] = 1 ;//用户类型 （1，买家、2，卖家）
		$statusData = $this->order->getData($this->order->order_status, $param, false);
		
		$status = array();
		if($statusData['success']){
		    $status = $statusData['data'];
		}
		
		$this->assign('title', '我的订单');
		$this->assign('status',$status);
		$this->display('Order/shine');
	}
	
	/**
	 * 订单列表接口
	 *
	 */
	public function orderlist()
	{
	    $list = array();
	    $param['pageNum'] = I('param.page', 2, 'intval');
	    $param['pageSize'] = I('param.pageSize', 15, 'intval');
	    $param['orderStatus'] = $statu = I('param.status', '0', 'intval');
	    $param['loginToken'] = $this->token;
	    $orderData = $this->order->getData($this->order->order_list, $param, false);
	    if($orderData['success'] == true)
	    {
	        foreach ($orderData['data']['orders'] as $k=>$v){
	            $orderData['data']['orders'][$k]['paymentAmount'] = number_format( ((int)$v['paymentAmount'])/100,2 );
	            $orderData['data']['orders'][$k]['shippingCost'] = number_format( ((int)$v['shippingCost'])/100 ,2 );
	            foreach ( $v['orderItems'] as $kk=>$vv ){
	                $orderData['data']['orders'][$k]['orderItems'][$kk]['sku']['price'] = number_format( ((int)$vv['sku']['price'])/100,2 );
	                $tempName = xss_clean($vv['sku']['item']['name'] );
	                $orderData['data']['orders'][$k]['orderItems'][$kk]['sku']['item']['shortName'] = intval(mb_strlen($tempName,"UTF-8") )  > 24 ? mb_substr( $tempName, 0,24).'...' : $tempName ;
    	            $orderData['data']['orders'][$k]['orderItems'][$kk]['sku']['image'] = getResizeImg( $vv['sku']['image'],80,80 );
	            }
	            //下单时间
	            if(  $orderData['data']['orders'][$k]['orderTime'] ){
	                 $orderData['data']['orders'][$k]['orderTime'] = date("Y-m-d H:i:s",intval( $v['orderTime']/1000) );   
	            }
	        }
	        

	    }
	    $this->ajaxReturn($orderData);
	
	}
	

	/**
	 *
	 * 订单详情页
	 */
	public function detail()
	{
		$list = array();
		$type = I('param.type', '', 'intval');
		$param['id'] = I('param.id','','intval');
		$param['loginToken'] = $this->token;
		if($type === 1) // 待付款
		{
			$detailData = $this->order->getData($this->order->order_mergerOrder, $param, false);
			$detail_template = 'Order/defaultdetail';
		}
		else // 非待付款
		{
			$detailData = $this->order->getData($this->order->order_buyerOrderDetail, $param, false);
			$detail_template = 'Order/detail';
		}
		if( !$detailData['success'] )
		{ 
		   $this->assign('message',C('ERROR_MESSAGE'));
	       $this->display('Order/error');
	       exit;
		}
		$list = $detailData['data'];
		/*$list['consignee']['mobile'] = substr_replace($list['consignee']['mobile'], '****', 3,4);*/
		//倒计时 自动确认收货时间
		if( $list['status'] === 2 ){
		    if( isset($list['deliveryTime'] ) ){
		        
		    $remainingTimes = (7*24*3600) - ( time()-intval($list['deliveryTime']/1000) );
		    }
		    
		    //已经点击过延迟收货 +7天时间
		    if( !$list['allowDelayConfirm'] ){
		        $remainingTimes = intval($remainingTimes)+7*24*3600 ;
		    }
		    $param_day = floor($remainingTimes/(24*3600));
		    $param_hour = floor(intval($remainingTimes % (24*3600))/3600);
		    $param_minute = floor(intval(intval($remainingTimes % (24*3600)) % 3600)/60);
		    $list['remainingDay'] = $param_day ;
		    $list['remainingHour'] = $param_hour ;
		    $list['remainingMinute'] = $param_minute ;
		    $list['remainingTime'] = $param_day.'天'.$param_hour.'时'.$param_minute.'分';
		}
		
		//下单时间
		if( isset($list['orderTime']) ){
		    $list['orderTime_time'] = date("Y-m-d",intval($list['orderTime']/1000) );
		    $list['orderTime_clock'] = date("H:i:s",intval($list['orderTime']/1000) );
		}
		
		//付款时间
		if( isset($list['paymentTime']) ){
		    $list['paymentTime_time'] = date("Y-m-d",intval($list['paymentTime']/1000) );
		    $list['paymentTime_clock'] = date("H:i:s",intval($list['paymentTime']/1000) );
		}
		
		//发货时间
		if( isset($list['deliveryTime']) ){
		    $list['deliveryTime_time'] = date("Y-m-d",intval($list['deliveryTime']/1000) );
		    $list['deliveryTime_clock'] = date("H:i:s",intval($list['deliveryTime']/1000) );
		} 
		
		//确认时间
		if( isset($list['confirmationTime']) ){
		    $list['confirmationTime_time'] = date("Y-m-d",intval($list['confirmationTime']/1000) );
		    $list['confirmationTime_clock'] = date("H:i:s",intval($list['confirmationTime']/1000) );
		}
		
		//运费
		$list['shippingCost'] = number_format( ( (int)$list['shippingCost'] )/100,2 ); 
		
		
		//平台券
		if($list['platformCouponMoney']){
		    $list['platformCouponMoney'] = number_format( ((int)$list['platformCouponMoney'])/100,2 );
		}
		//店铺券
		if($list['shopCouponMoney']){
		    $list['shopCouponMoney'] = number_format( ((int)$list['shopCouponMoney'])/100,2 );
		}
		//国美币
		$list['gomeMoney'] = number_format( ((int)$list['gomeMoney'])/100,2 );

		$list['paymentAmount'] = number_format( ( (int)$list['paymentAmount'] )/100,2 );
		if($type === 1){
		    $itemsCount = 0 ;
		    $itemsMoney = 0 ;
		    foreach ($list['orders'] as $k=>$v){
		        foreach ($v['orderItems'] as $kk=>$vv){
		            $itemsCount += intval($vv['quantity']);
		            $itemsMoney += intval($vv['sku']['price']*$vv['quantity']);
		            $list['orders'][$k]['orderItems'][$kk]['sku']['price'] = number_format( ( (int)$vv['sku']['price'] )/100,2 );  
		            $tempName = xss_clean($vv['sku']['item']['name'] );
		            $list['orders'][$k]['orderItems'][$kk]['sku']['item']['shortName'] = intval(mb_strlen($tempName,"UTF-8") )  > 24 ? mb_substr( $tempName, 0,24).'...' : $tempName;
		        } 
		        $list['orders'][$k]['orderItemsCount'] = count($list['orders'][$k]['orderItems']);
		    }
		    //商品总数
		    $list['itemsCount'] = $itemsCount ;
		    //商品总价
		    $list['itemsMoney'] = number_format( ((int)$itemsMoney)/100,2 );
		}else{
		    $itemsCount = 0 ;
		    $itemsMoney = 0 ;
		    foreach ($list['orderItems'] as $k=>$v){
		        $itemsCount += intval($v['quantity']);
		        $itemsMoney += intval($v['sku']['price']*$v['quantity']);
		        $list['orderItems'][$k]['sku']['price'] = number_format( ( (int)$v['sku']['price'] )/100,2 );
		        $tempName = xss_clean($v['sku']['item']['name'] );
		        $list['orderItems'][$k]['sku']['item']['shortName'] = intval(mb_strlen($tempName,"UTF-8") )  > 24 ? mb_substr( $tempName, 0,24).'...' : $tempName ;
		    }
		    $list['orderItemsCount'] = count($list['orderItems']) ;
		    //商品总数
		    $list['itemsCount'] = $itemsCount ;
		    //商品总价
		    $list['itemsMoney'] = number_format( ((int)$itemsMoney)/100,2 );
		}
        $this->assign('orderId',$param['id'] ) ;
		$this->assign('title', '订单详情');
		$this->assign('list', $list);
		$this->display($detail_template);
	}

	/**
	 * 取消订单|待发货状态
	 *
	 */
	
	public function orderCancel(){
	    $list = array();
	    $param['id'] = I('param.id',0,'intval');
	    $param['loginToken'] = $this->token;
	    $list = $this->order->postData($this->order->order_orderCancel, $param);
	    if( $list['success'] == true ){
	        $list['data']['status'] = -1;
	        $list['data']['statusDesc'] = "取消待审核";
	    }else{
	        $detailData = $this->order->getData($this->order->order_buyerOrderDetail, $param, false);
	        
	        $list['data']['status'] = $detailData['data']['status'];
	        $list['data']['statusDesc'] = $detailData['data']['statusDesc'];
	    }
	    $this->ajaxReturn($list);
	}

	/**
	 * 取消订单|未付款状态
	 *
	 */
	public function mergerOrderCancel(){
		$list = array();
		$param['id'] = I('param.id',0,'intval');
		$list = $this->order->postData($this->order->order_mergerOrderCancel, $param);
		if( $list['success'] == true ){
		    $list['data']['status'] = -6;
		    $list['data']['statusDesc'] = "交易关闭";
		}else{
		    $detailData = $this->order->getData($this->order->order_mergerOrder, $param, false);
		    $list['data']['status'] = $detailData['data']['status'];
		    $list['data']['statusDesc'] = $detailData['data']['statusDesc'];
		}
		$this->ajaxReturn($list);
	}

	/**
	 * 物流信息
	 *
	 */
	public function orderLogistics(){
	    $list = array();
	    $param['orderId'] = I('param.orderId',0,'intval');
	    //收货信息
	    $detailData = $this->order->getData($this->order->order_buyerOrderDetail, array('id'=>$param['orderId']), false);
	    
	    if( !$detailData['success'] )
	    {
	        $this->assign('message',C('ERROR_MESSAGE'));
	        $this->display('Order/error');
	        exit;
	    }
	    $detailData = $detailData['data'] ;
	    //物流信息
	    $param['type'] = 1;//查看物流类型（1：查看正向订单，2：查看逆向订单）
	    $param['shopType'] = 1 ;//店铺类型 1：XPOP店 2:员工达人店
	    $statu = I('param.statu',0,'intval');
	    $list = $this->order->getData($this->order->order_orderLogistics, $param);
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
		$this->assign('statu',$statu);
		$this->display('Order/logistics');
	}
	
	/**
	 * 确认收货
	 *
	 */
	public function confirm()
	{
		$orderId = $param['orderId'] = I('param.orderId',0,'intval');
		$list = $this->order->postData($this->order->order_deliveryConfirmation, $param);
		if( $list['success'] == true){
		    $list['data']['status'] = 3;
		    $list['data']['statusDesc'] = "交易成功";
		}else{
		    $param = array();
		    $param['id'] = $orderId ;
		    $detailData = $this->order->getData($this->order->order_buyerOrderDetail, $param, false);
		    $list['data']['status'] = $detailData['data']['status'];
		    $list['data']['statusDesc'] = $detailData['data']['statusDesc'];
		}
		$this->ajaxReturn($list);

		
	}
	
	/**
	 * 延迟收货
	 * 
	 */
	public function delayConfirm()
	{
	    $orderId = $param['orderId'] = I('param.orderId',0,'intval');
	    $list = $this->order->postData($this->order->order_delayConfirm,$param);
	    if( !$list['success'] ){
	        $param = array();
	        $param['id'] = $orderId ;
	        $detailData = $this->order->getData($this->order->order_buyerOrderDetail, $param, false);
	        $list['data']['status'] = $detailData['data']['status'];
	        $list['data']['statusDesc'] = $detailData['data']['statusDesc'];
	        $list['data']['allowDelayConfirm'] = $detailData['data']['allowDelayConfirm'];
	    }
	    $this->ajaxReturn($list);
	}

	/**
	 * 个人中心-跳转商品评价页面(测试通过)
	 * 
	 */
	public function showCommentInfo(){
		$arrSendData = array();
		$intOrderId= I('param.orderid',0,'intval');	
		if(empty($intOrderId)){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$arrGoodsInfo = $this->order->getData($this->order->order_buyerOrderDetail,array('id' => $intOrderId));
		$arrOrderInfo = array();
		if($arrGoodsInfo['success']){
			$arrOrderInfo['order_id']=$intOrderId = $arrGoodsInfo['data']['id'];
			foreach ($arrGoodsInfo['data']['orderItems'] as $key => $Item) {
				if($Item['hasComment']){//已经评价过的商品
					continue;	
				}
				$goodsInfo = array();
				$goodsInfo['orderitem']  = $Item['id'];
				$goodsInfo['image']      = $Item['sku']['image'];
				$goodsInfo['good_id']    = $Item['sku']['item']['id'];
				$goodsInfo['good_name']  = $Item['sku']['item']['name'];
				$goodsInfo['order_id']   = $intOrderId;
				$goodsInfo['attributes'] = $Item['sku']['attributes'];
				$goodsInfo['shop_id']    = $Item['mshop']['id'];
				$goodsInfo['shop_name']  = $Item['mshop']['name'];
				$goodsInfo['skuid']      = $Item['sku']['id'];
				array_push($arrSendData,$goodsInfo);
			}	
		}
		$title="商品评价-国美+";
		$this->assign('title',$title);
		$this->assign('good_info',$arrSendData);
		$this->assign('order_info',$arrOrderInfo);
		if(!empty($arrSendData))
		{
			$this->display("Order/comment");
		}
		else{
			if(empty($intOrderId))
			{
				$content = "亲，此订单不存在，请点击";
			}
			else{
				$content = "亲，此订单已评价，请点击";
			}
			$this->assign("content",$content);	
			$this->display("Order/commenterror");
		}
	}
	/**
	 * 个人中心-用户商品评论(测试通过没有问题ajax调用)
	 * 
	 */

	public function getCommentInfo(){
		$arrSendData = array();
		$goodsInfo = I('param.goods_info');//商品信息
		$shopInfo = I('param.shop_info');//店铺信息
		/*
		   $goodsInfo = array(
		   array(
				"productId"=>15610,//orderItemId
				"commentScore"=>1,
				"commentContent"=>"不好",
				"imageUrlArray" => array( //images
					"http://123" 
				),
		   ),	
		   );
		   $shopInfo = array(
		   'serviceGrade' => 5,
		   'expressService' =>5,
		   );
		 */

		if(!empty($goodsInfo)){
			foreach ($goodsInfo as $Item) {
				$str = $Item['commentContent'];	
				$str = sensitive($str);
			}	
		}
		if(!empty($goodsInfo) && is_array($goodsInfo)){
			foreach ($goodsInfo as $key=>&$value){
				$value['orderItemId'] = intval($value['productId']);
				$value['images'] = !empty($value['imageUrlArray']) && is_array($value['imageUrlArray']) ? $value['imageUrlArray'] : array();
				$value['serviceGrade'] = intval($shopInfo['serviceGrade']);//服务评分
				$value['expressService'] = intval($shopInfo['expressService']);//物流评分
				$value['commentScore'] = intval($value['commentScore']);
				unset($value['productId']);
			}
			$arrParams  = array(
			 'orderItemComments'=>$goodsInfo,
			 'userId' => $this->userId,
			);
			$arrData = $this->order->postData($this->order->comment_goods,$arrParams);
		}else{
			$arrData = array(
					'success' => false,
					'code'    =>307,
					'msg'     => "参数不对",
					'data'    => array(),
					);		
		}
		$this->response($arrData);
	}
	/**
	 * 个人中心-用户商品评论结果展示页面
	 * 
	 */
	public function showFinishInfo(){
		$arrSendData = $this->handleCommentDataInfo();
		$title = "商品评价-国美+";
		$this->assign("title",$title);
		$this->assign('data',$arrSendData);
		$this->display("Order/showresult");	
	}

	/**
	 * 个人中心-用户商品评论结果展示页面获取数据
	 * 
	 */
	private function handleCommentDataInfo(){
		$intPageSize = I('param.pageSize',1,'intval');
		$intOpType = I('param.optype',1,'inval');
		$arrSendData = array();
		$arrNeedGoodsinfo = array();
		$arrPageParams = array(
				"loginToken" => $this->token,
				'pageNum'=>$intPageSize,
				'numPerPage' => 10,
				'lastRecordId' =>0,
				);
		$arrNeedCommentGoods = $this->coupon->getData($this->coupon->need_comment_goods,$arrPageParams);	
		if($arrNeedCommentGoods['success']){
			$arrNeedGoodsinfo=$arrNeedCommentGoods['data'];
		}
		$arr = array('userId'=>$this->userId,'pageSize' => 25);
		$arrRecommend = $this->order->getData($this->order->recommend,$arr);
		$arrHandleInfo = array();
		if($arrRecommend['success']){
			foreach ($arrRecommend['data']['items'] as $key=>$Item) {
				$goodsInfo = array();
				$goodsInfo['id'] = $Item['id'];
				$goodsInfo['shopid'] = $Item['shopId'];
				$goodsInfo['name']   = $Item['name'];
				$goodsInfo['image']  = $Item['mainImage'];
				$goodsInfo['price']  = convert_price($Item['price']);
				array_push($arrHandleInfo,$goodsInfo);
			}	
		}
		$arrSendData['goods_info']  = $arrNeedGoodsinfo;
		$arrSendData['commend']     = $arrHandleInfo;
		return $arrSendData;
	}

	/**
	 * 个人中心-用户商品评论结果展示页面获取数据(ajax调用)
	 * 
	 */
	public function getFinishData(){
		$arrInfo =$this->handleCommentDataInfo();	
		$this->response($arrInfo);
	}

	/**
	 * 申请退货|换货展示页面
	 * 
	 */
	public function showDataInfo(){
		$arrReturnData = array();
		$arrShopInfo = array();
		$intOrderId = I('param.orderid',0,'intval');	
		$intOpType  = I('param.optype','','intval');
		$skuId      = I('param.skuid','','intval');
		$Good_Id    = I('param.goodid','','intval');

		if(empty($intOrderId) || empty($intOpType) || empty($skuId) || empty($Good_Id))
		{
			//$this->outError(\Think\ErrorCode::PARMA_ERROR);
			$this ->_empty();
			exit;
		}
		$arrOrderInfo=$this->order->getData($this->order->order_buyerOrderDetail,array('id'=>$intOrderId));//详情信息

		if($arrOrderInfo['data'])
		{
			$arrShopInfo['shop_id']   = $arrOrderInfo['data']['shop']['id'];
			$arrShopInfo['shop_name'] = $arrOrderInfo['data']['shop']['name'];
			$intBigOrderId            = $arrOrderInfo['data']['id'];
			foreach ($arrOrderInfo['data']['orderItems'] as $key => $Info) {
				$arr = array();	
				$arr['order_id'] = $Info['id'];
				$intGoodId = $Info['sku']['item']['id'];
				$ItemSkuId = $Info['sku']['id'];
				$arr['good_id']  = $intGoodId;
				$arr['shop_id']  = $Info['mshop']['id'];
			    if($ItemSkuId==$skuId )
				{
					$arrShopInfo['order_id']    = $Info['id'];
					$arrShopInfo['big_orderid'] = $intBigOrderId;
					
					$this->assign('skuNum',$Info['quantity']); //售后数量
				}	
				$arr['good_name']     =$Info['sku']['item']['name'];
				$arr['good_image']    =$Info['sku']['image'];
				$arr['attributes']    =$Info['sku']['attributes'];
				$arr['quantity']      =$Info['quantity'];
				//$sumTotal=$Info['paymentAmount'] * $Info['quantity'];//总付款
				$sumTotal=$Info['paymentAmount'];//总付款
				$arr['paymentAmount'] = convert_price($sumTotal);
				$arr['shippingCost']  = convert_price($arrOrderInfo['data']['shippingCost']);//运费
				$arr['skuid'] = $ItemSkuId;
				$arr['returnGoodsForSevenDays']   = $Info['returnGoodsForSevenDays'];//退货
				$arr['changeGoodsForFifteenDays'] = $Info['changeGoodsForFifteenDays'];//退货
				
				array_push($arrReturnData,$arr);
			}	
		}
		$arrHandleData = array();
		foreach ($arrReturnData as $key => $Item){
			if($skuId == $Item['skuid']){
				$arrHandleData[] = $Item;
			}
		}
		if($intOpType== 1)
		{
			$title ="退货-国美+";
		}elseif($intOpType == 2){
			$title = "换货-国美+";
		}
		$template_name = "Order/changegoods";
		if($intOpType == 1){//退货
			if($arrHandleData[0]['returnGoodsForSevenDays'] == false){
				$message = "已经退货过了，不可以在退货";	
				$this->assign('message',$message);
				$template_name = "Order/report_error";
			}
			elseif($arrHandleData[0]['changeGoodsForFifteenDays'] == false){
			    $message = "已经退货过了，不可以在换货";
			    $this->assign('message',$message);
			    $template_name = "Order/report_error";
			}
		}
		elseif($intOpType == 2){//换货
			if($arrHandleData[0]['changeGoodsForFifteenDays'] == false){
				$message = "已经换货过了，不可以在换货";	
				$this->assign('message',$message);
				$template_name = "Order/report_error";
			}
			elseif($arrHandleData[0]['returnGoodsForSevenDays'] == false){
			    $message = "已经换过了，不可以在退货";
			    $this->assign('message',$message);
			    $template_name = "Order/report_error";
			}
		
		}
		$this->assign("goods_info",$arrHandleData);
		$this->assign("shop_info",$arrShopInfo);
		$this->assign("optype",$intOpType);
		$this->assign("title",$title);
		$this->display($template_name);
	}
	/**
	 * 退货|退款申请提交信息明天写 1:退货2:换货没有测试没有数据测试 退货：收货后7天内 换货：确认收货后14天内
	 * 
	 */
	public function getRefundInfo(){
		$orderId  = I('param.orderid','','intval');
		$type     = I('param.type',0,'intval');	
		$resion   = I('param.reasion','','trim');
		$content  = I('param.content','','trim');
		$quantity = I('param.quantity',1,'intval');
		if(empty($type))
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$imgPath = I('param.imgsrc','','trim');
		$arrParams = array(
			'orderItemId' => $orderId,
			'type' => $type,
			'reason' => $resion,
			'memo'   => $content,
		//  'quantity' => $quantity,暂时不上线退换货数量
			'imgsrc' => $imgPath,
		);
		$arrData=$this->order->postData($this->order->order_service,$arrParams);
		$this->response($arrData);
	}
	
	public function orderError(){
	    $this->assign('message',C('ERROR_MESSAGE'));
	    $this->display('Order/error');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：晒单列表
     * @action：/order/shineOrders
	 * @param：pageNum	非必填	Integer	页码
	 * @param：pageSize	非必填	Integer	每页条数
     *-------------------------------------------------------------------------
     */
	public function shineOrders()
	{
		$param = array();
		$param['pageNum'] 	= I('param.pageNum', 1, 'intval');
		$param['pageSize'] 	= I('param.pageSize', self::pageNum, 'intval');
		
		$getRes = $this->order->getData($this->order->boughtItems, $param, false);
		
		if(!$getRes['success'])
		{
			$this->ajaxReturn($getRes);
			exit;
		}
		
		//处理返回数据的金额字段及图片商品大小
		foreach($getRes['data']['shareOrderItems'] as &$val)
		{
			$val['sku']['price'] = convert_price($val['sku']['price']);
			$val['sku']['image'] = getResizeImg($val['sku']['image'], 230, 230);
			unset($val);
		}
		$getRes['data']['pageNum'] 	= $param['pageNum'];
		$getRes['data']['pageSize'] = $param['pageSize'];
		
	    $this->ajaxReturn($getRes);
	}
}