<?php
/**
 * 订单支付
 * Created by PhpStorm.
 * User: wangzhibo
 * Date: 2016/5/26
 * Time: 18:57
 */

namespace Order\Controller;

use Home\Controller\AuthController;
use Think\ErrorCode;

class OrderController extends AuthController
{

    public $orderSubmit = 'cart/confirm_order.json';
    public $orderDetail = 'order/order_pend_payment_detail.json';
    public $orderPay = 'payment/pre_pay.json';
	public $gomeorderPay = "pay/payment";//2016-10-13临时测试添加
    public $orderPayStatus = '/paychannel/get_pay_state.json';
    public $checkPaySccess= '/paychannel/get_wechart_qr_pay_state.json';

	const GOME_CHANNEL=410004;
	const ALIPAY=210004;
    const MERGER_ID = '_order_merger_id_';
    const ORDERS_IDS = '_order_order_ids_';
	const ORDERS_WEIXIN_ID = '_order_wenxin_id_';
    const ORDER_PAY = '_order_pay_';
    const PAY_CHANNEL_ID = '_pay_channel_id_';
    const ORDER_CONFIRM_SUCCESS = '_order_confirm_success_';
    const CACHE_TIME = 28800;
	const ORDER_CANCEL=-6;//订单取消
	const PAY_FINISH=1;//完成支付
	const NEED_PAY=0;//需要支付

    public function __construct()
    {
        parent::__construct();
        $this->order = D('Home/Base');

        $this->order_v2 = D( 'order' );
    }

    /**
     * 订单ajax提交
     */
    public function confirm()
    {

        $fid = I('get.fid','');
        $mergerIdKey = $this->userId.self::MERGER_ID.$fid;
        $orderIdsKey = $this->userId.self::ORDERS_IDS.$fid;
        $orderConfirmKey = $this->userId.self::ORDER_CONFIRM_SUCCESS.$fid;
        $proJson = I('param.proJson','','');

        $orderConfirmSuccess = S($orderConfirmKey);
        if($orderConfirmSuccess)
        {
            $this->outError(ErrorCode::ORDER_CONFIRM_REPEAT);
        }
        if($postArr = json_decode($proJson,true))
        {
			$needCheck = isset($postArr['accoss']) ? $postArr['accoss'] : 0;//跨境商品表示
			if($needCheck){
				$arrInfo = $this->checkidCard($postArr['addressId']);	
                if($arrInfo['success'] == false){
                    $this->ajaxReturn($arrInfo);  
                } 
			}

            $order_model = D('Order');
            $order_model->setTimeOut(15);
            $result = $order_model->postData($order_model->mergerOrder,$proJson);
            if(!empty($result['data']['id']))
            {
                S($mergerIdKey,$result['data']['id'],self::CACHE_TIME);
                S($orderConfirmKey,1,self::CACHE_TIME);
            }
            if(!empty($result['data']['orders'])){
                foreach ($result['data']['orders'] as $value){
                    $order_ids[] = $value['id'];
                }
                S($orderIdsKey,implode(',',$order_ids),self::CACHE_TIME);
            }
            $this->ajaxReturn($result);
        }
        else
        {
            $this->outError(ErrorCode::PARMA_ERROR);
        }
    }

    /**
     * 订单支付详情
     */
    public function payDetail()
    {
        
        $orderId = I('param.mergerId') ;
		$http_user_agent = strtolower($_SERVER['HTTP_USER_AGENT']);
		$is_weixin=false;
		if(strstr($http_user_agent,"windowswechat")){
			$is_weixin=true;		
		}
        if( $orderId ){//订单列表调整过来的链接
            $mergerId = $orderId ;
            $fid = orderFlowidGen();
            $mergerIdKey = $this->userId.self::MERGER_ID.$fid;
            S($mergerIdKey,$mergerId,self::CACHE_TIME);
            $orderIdsKey = $this->userId.self::ORDERS_IDS.$fid;
           
        }else{
            //购物车或者直接支付的    
            $fid = I('get.fid','');
            $mergerIdKey = $this->userId.self::MERGER_ID.$fid;
            $mergerId =  S($mergerIdKey) ;
        }
		$recommendList = $this->recommend();
		$this -> assign('recommendList',$recommendList);
		$template="";
		$arrGoodsInfo = array();
        $order_model = D('Order');
        $orderDetail = $order_model->getData($order_model->mergerOrder,array('id'=>$mergerId));
        if($mergerId && !empty($orderDetail['data']))
        {
	    if(!empty($orderDetail['data']))
        {

			$arrGoodsInfo['orderid']  = $mergerId;
			$arrGoodsInfo['baseinfo'] = $orderDetail['data']['consignee'];
			$arrGoodsInfo['status']   = $orderDetail['data']['status'];
			$arrGoodsInfo['statusDesc'] = $orderDetail['data']['statusDesc'];
			$arrGoodsInfo['paymentAmount'] = number_format($orderDetail['data']['paymentAmount']/100,2);
			$arrGoodsInfo['time'] = $orderDetail['data']['orderTime'];
            //订单列表过来的订单
            if($orderId && !empty($orderDetail['data']['orders'])){
                foreach ($orderDetail['data']['orders'] as $value){
                  $order_ids[] = $value['id'];
                }
                S($orderIdsKey,implode(',',$order_ids),self::CACHE_TIME);
             }
                
             $orderInfo = $orderDetail['data'];
             $recieverAddress = $orderInfo['consignee']['address'];
             $mergerPayMoney = $orderInfo['paymentAmount'];
             $orderTime = date('Y.m.d H:i:s',$orderInfo['orderTime'] / 1000);
             $name = $orderInfo['consignee']['name'];
             $recieverMobile = $orderInfo['consignee']['mobile'];
             if($recieverAddress && $mergerId && $mergerPayMoney && $orderTime)
             {
                $seoMap = seoMap();
                $this->assign('title',$seoMap['title']);
                $this->assign('keywords',$seoMap['keywords']);
                $this->assign('description',$seoMap['description']);
                $this->assign('fid',$fid);//flow id
				$this->assign('is_weixin',$is_weixin);

                $this->assign('orderDetail',array(
                     'recieverAddress' => $recieverAddress,
                     'mergerId' => $mergerId,
                     'mergerPayMoney' => $mergerPayMoney,
                     'orderTime' => $orderTime,
                     'orderIds' => $orderInfo['orderIds'],
                     'name' => $name,
                     'mobile' => $recieverMobile
                 ));
             }

            }
			if($arrGoodsInfo['status'] === self::NEED_PAY){//需要支付
				$template="confirm";		
			}
			elseif($arrGoodsInfo['status'] == self::ORDER_CANCEL){//订单取消
				$template="orderCancel";		
			}elseif($arrGoodsInfo['status'] == self::PAY_FINISH){//已完成支付
				$template="orderPay";	
			}else{
				$template="dataError";		
			}
			$this->assign('data',$arrGoodsInfo);
            $this->display($template);
        }
        else
        {
            redirect(C('ERROR_PAGE'));
        }

    }

    /**
     * 订单支付ajax回调接口
     */
    public function pay()
    {
        $channel = I('param.channel');
        $mergerId = I('param.mergerId');
        $orderIds = I('param.orderIds');
        $fid = I('get.fid','');
        $code = I('param.code');
        if($channel && $mergerId && $orderIds)
        {
            $params = array(
                'channel' => $channel,
                'mergerId' => $mergerId,
                'orderIds' => $orderIds,
                'loginToken' => $this->token,
                //'code' => $code,
            );
			$result = $this->order->postData($this->orderPay,$params);
            if($fid && !empty($result['success']) && !empty($result['data']))
            {
                $orderPayKey = $this->userId.self::ORDER_PAY.$fid;
                $payChannelKey = $this->userId.self::PAY_CHANNEL_ID.$fid;
                S($orderPayKey,json_decode($result['data'],true),self::CACHE_TIME);
                S($payChannelKey,$channel,self::CACHE_TIME);
            }
            $this->ajaxReturn($result);
        }
        else
        {
            $this->outError(ErrorCode::PARMA_ERROR);
        }
    }

    /*
     * 支付宝支付结果
     * by:zhangliang 2016.07.18
     * */
    public function alipay() {

        //支付宝相关
//        $sign = I( 'param.sign' ,'' );
//        $body = I( 'param.body' ,'' );
//        $subject = I( 'param.subject', '' );
//        $total_fee = I( 'param.total_fee', '' );
        $is_success = I( 'param.is_success' );
        $trade_status = I( 'param.trade_status' );
        $out_trade_no = I( 'param.out_trade_no' );
        $notify_id = I( 'param.notify_id' );

        if( empty( $notify_id ) || empty($out_trade_no) || empty( $trade_status ) ) return false;

        //获取订单信息
        $order_infos = $this->order_v2->getData(
            $this->order_v2->payDetail,
            array(
                "tradeNo" => $out_trade_no
            )
        )['data'];

        //为你推荐商品
        $recommendList = $this->recommend();

        //获取订单详细信息
        $params = array(
                'mergerId' => $order_infos['mergerOrder']['id'],
                'loginToken' => $this->token
            );
        $orderDetail = $this->order->postData($this->orderDetail,$params);

        $orderInfo = $orderDetail['data'];
        $recieverAddress = $orderInfo['recieverAddress'];
        $mergerId = $orderInfo['mergerId'];
        $mergerPayMoney = $orderInfo['mergerPayMoney'];
        $orderTime = date('Y.m.d H:i:s',$orderInfo['orderTime']);
        $name = $orderInfo['recieverName'];
        $recieverMobile = $orderInfo['recieverMobile'];
        $this->assign('orderDetail',array(
            'recieverAddress' => $recieverAddress,
            'mergerId' => $mergerId,
            'mergerPayMoney' => $mergerPayMoney,
            'orderTime' => $orderTime,
            'name' => $name,
            'mobile' => $recieverMobile
        ));

        //SEO
        $seoMap = seoMap();
        if($is_success != 'T' && $trade_status != 'TRADE_SUCCESS'){
            $seoMap['title'] = "支付失败 - 国美";
        }

        //模拟支付状态
        $pay_success = array();
        $pay_success['success'] = $is_success;
        $pay_success['data']['payState'] = $trade_status;

        $this->assign('title',$seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('recommendList',$recommendList);
        $this->assign('paySuccess',$pay_success);
        $this->display('payResult');
        exit;
    }

    /*
     * 为您推荐
     * by:zhangliang 2016.07.18
     * */
    public function recommend() {
        $recommend = $this->order_v2->getData($this->order_v2->payRecommend,array('pageNum' => 1,'pageSize' => 15));

        $recommendList = array();
        if(isset( $recommend['data']['items'] ) && !empty($recommend['data']['items'])) {
            $recommendList = $recommend['data']['items'];
        }

        return $recommendList;
}
    /**
     * 订单支付结果页
     * 目前此方法返回结果 只适用于二维码 支付返回结果
     */
    public function payResult()
    {
        $fid = I('get.fid','');

        //支付宝支付
        $this->alipay();

        $mergerIdKey = $this->userId.self::MERGER_ID.$fid;
        $orderIdsKey = $this->userId.self::ORDERS_IDS.$fid;
		$wenxinorderkey =$this->userId.self::ORDERS_WEIXIN_ID.$fid;


        $mergerId = S($mergerIdKey);
        $orderIds = S($orderIdsKey);
		$tradeNo  = S($wenxinorderkey);
        $payStatusKey = $tradeNo.$mergerId;//支付成功缓存key


		//查询支付结果
		$arrResult = array();
		if($mergerId && $tradeNo){
			$arrResult = $this ->getCacheInfo($tradeNo,$mergerId);
		}

        if($mergerId && $orderIds)
        {
            $params = array(
                'mergerId' => $mergerId,
                'loginToken' => $this->token
            );
            $orderDetail = $this->order->postData($this->orderDetail,$params);
            if(!empty($orderDetail['data']))
            {
                $orderInfo = $orderDetail['data'];
                //if(empty($orderInfo['mergerStatus']))
                //{//订单未支付
                //    send_http_status(307);
                //    redirect('/order/paydetail?fid='.$fid);
                //}
                $recieverAddress = $orderInfo['recieverAddress'];
                $mergerId = $orderInfo['mergerId'];
                $mergerPayMoney = $orderInfo['mergerPayMoney'];
                $orderTime = date('Y.m.d H:i:s',$orderInfo['orderTime']);
                $name = $orderInfo['recieverName'];
                $recieverMobile = $orderInfo['recieverMobile'];
                if($recieverAddress && $mergerId && $mergerPayMoney
                    && $orderTime && $name && $recieverMobile)
                {
                    $this->assign('orderDetail',array(
                        'recieverAddress' => $recieverAddress,
                        'mergerId' => $mergerId,
                        'mergerPayMoney' => $mergerPayMoney,
                        'orderTime' => $orderTime,
                        'name' => $name,
                        'mobile' => $recieverMobile
                    ));
                    //为你推荐商品
                    $recommendList = $this->recommend();

                    $seoMap = seoMap();
					if(empty($arrResult['success']) || empty($arrResult['data']['payState'])){
						$seoMap['title'] = "支付失败 - 国美";
					}
                    $this->assign('title',$seoMap['title']);
                    $this->assign('keywords',$seoMap['keywords']);
                    $this->assign('description',$seoMap['description']);
					$this->assign('paySuccess',$arrResult);
					$this->assign('fid',$fid);

                    $this->assign('recommendList',$recommendList);
                    $this->assign('source_code',C('sourceCode.recommend_order_order_recommend'));
                    $this->display('payResult');
                    exit;
                }
            }
        }
        $this->redirect(C('ERROR_PAGE'));
    }

    /**
     * 合单-订单详情,可以用来判断支付状态
     */
    public function detail()
    {
        //合单ID
        $mergerId = I('param.mergerId');

        if($mergerId)
        {
            $params = array(
                'mergerId' => $mergerId,
                'loginToken' => $this->token
            );
            $orderDetail = $this->order->postData($this->orderDetail, $params);
            //目前只把订单的支付状态传给前端
            if(isset($orderDetail['data']['mergerStatus']))
            {
                $data = array(
                    'mergerId' => $orderDetail['data']['mergerId'],
                    'orderIds' => $orderDetail['data']['orderIds'],
                    'mergerStatus' => $orderDetail['data']['mergerStatus'],
                    'mergerStatusDesc' => $orderDetail['data']['mergerStatusDesc'],
                );
                $orderDetail['data'] = $data;
            }
            $this->ajaxReturn($orderDetail);
        }
        else
        {
            $this->outError(ErrorCode::PARMA_ERROR);
        }
    }

    /**
     * 微信支付二维码页
     */
    public function payCode()
	{
		$channel =trim($_REQUEST['channel']);
		$fid     =trim($_REQUEST['fid']);
		if($fid)
        {
            $mergerIdKey = $this->userId.self::MERGER_ID.$fid;
            $orderIdsKey = $this->userId.self::ORDERS_IDS.$fid;
			$wenxinorderIdKey = $this->userId.self::ORDERS_WEIXIN_ID.$fid;//by zhangting add
            $mergerId = S($mergerIdKey);
            $orderIds = S($orderIdsKey);
            $payChannelKey = $this->userId.self::PAY_CHANNEL_ID.$fid;
            if(!$channel)
            {
                $channel = S($payChannelKey);
            }
            else
            {
                S($payChannelKey,$channel,self::CACHE_TIME);
            }

            if($mergerId && $orderIds && $channel)
            {
				/*
                //取支付详情页返回的交易信息
                $params = array(
                    'channel' => $channel,
                    'mergerId' => $mergerId,
                    'orderIds' => $orderIds,
                    'loginToken' => $this->token,
                );
				if($channel != self::GOME_CHANNEL){
					$result = $this->order->postData($this->orderPay,$params);
				}
				else{
					$arrIds = explode(",",$orderIds);
					foreach ($arrIds as $key=> $value) {
						$arrIds[$key] = intval($value);
					}
					$params = array(
								"wechatAuthCode" =>"",	
								"mergerOrder" => array(
										"id"  => intval($mergerId),
										"orderIds" => $arrIds,
									),
							);	
					$this->order_v2->publicParamv2['channel'] = self::GOME_CHANNEL;
					$newUrl = $this->gomeorderPay;
					$result = $this->order_v2->postData($newUrl,$params);
				}
				*/

				$arrIds = explode(",",$orderIds);
				foreach ($arrIds as $key=> $value) {
						$arrIds[$key] = intval($value);
				}
				$params = array(
								"wechatAuthCode" =>"",	
								"mergerOrder" => array(
										"id"  => intval($mergerId),
										"orderIds" => $arrIds,
									),
							);	
				$this->order_v2->publicParamv2['channel'] = $channel;
				$newUrl = $this->gomeorderPay;
				$result = $this->order_v2->postData($newUrl,$params);
                if(!empty($result['success']) && !empty($result['data']))
                {
                    //支付跳转 根据频道号
                    $this->pay_jump( $channel, $result['data'] );
                    //下面是二维码
                    $payDetail =$result['data'];
                    if($payDetail)
                    {
                        $codeUrl = $payDetail['wechatQrParameters']['codeUrl'];
                        $qrCodeApi = $this->mx_domain['main'];
                        $codeUrl =  $qrCodeApi.'ajax/qrcode/urlcode?url='.$codeUrl;
                        $tradeNo = $payDetail['tradeNo'];
						S($wenxinorderIdKey,$tradeNo,self::CACHE_TIME);//by zhangting add
                        $tradeDate = date('Y-m-d');
                        $fee = $payDetail['wechatQrParameters']['fee'];
                        $fee = sprintf( "%01.2f",$fee);

                        if($codeUrl && $tradeNo)
                        {
                            $this->assign('codeUrl',$codeUrl);
                            $this->assign('tradeNo',$tradeNo);
                            $this->assign('tradeDate',$tradeDate);
                            $this->assign('mergerId',$mergerId);
                            $this->assign('fee',$fee);
                            $this->assign('fid',$fid);//flow id

                            $this->display('payCode');
                            exit;
                        }
                    }
                }
				else{
					header("location: /order/show?orderid={$mergerId}");	
					exit;
				}
            }
        }
        $this->redirect(C('ERROR_PAGE'));
    }

    /*
     * 支付跳转
     * */
    public function pay_jump( $channel, $url ) {
        switch( $channel ) {
			case self::ALIPAY://支付宝
                header( "location:".$url['alipayWebUrl'] );
                exit;
                break;
			case self::GOME_CHANNEL://国美钱包
				$jumpUrl = $url['gomepayWebUrl'];
				header("location:".$jumpUrl);
				exit;
                break;
        }
    }

    /**
     * 支付状态判断
     */
    public function payStatus()
    {
        $mergerId = I('get.mergerId','');
        if($mergerId)
        {
            $params = array(
                'mergerId' => $mergerId,
                'loginToken' => $this->token,
            );
            $result = $this->order->postData($this->orderPayStatus,$params);
            $this->ajaxReturn($result);
        }
        else
        {
            $this->outError(ErrorCode::PARMA_ERROR);
        }
    }

	/**
     * 判读微信支付是否成功
     */
	public function checkPaySuccess(){
		$tradeNo   = I('param.tradeNo','','trim');//订单id
		$mergerId  = I('param.mergerId','','trim');//合单号id
		if($tradeNo && $mergerId){
			$result = $this->getCacheInfo($tradeNo,$mergerId);
			$this -> ajaxReturn($result);
		} 
		else{
            $this->outError(ErrorCode::PARMA_ERROR);
		}
	}

	/**
     * 判读微信支付是否成功成功写入缓存
     */
	
	public function getCacheInfo($tradeNo,$mergerId){
        $payStatusKey = $tradeNo.$mergerId;//支付成功缓存key
		$result = S($payStatusKey);
		if(empty($result)){//没有缓存
				$params = array(
					"tradeNo" =>$tradeNo,
					"mergerId" =>$mergerId,
		        );	
				$result = $this->order->postData($this->checkPaySccess,$params);
				$strData = serialize($result);
				if($result['success'] && $result['data']['payState']){
						S($payStatusKey,$strData,self::CACHE_TIME);//by zhangting add
				}    
		}else{
				$strData = S($payStatusKey);	
				$result = unserialize($strData);
		}
	    return $result;
	}

	/**
     *-------------------------------------------------------------------------
     * @author：张挺
     * @date：2016-08-17
	 * @params $orderId(正向订单id)
	 * @desc ajax调用判断订单状态
     *-------------------------------------------------------------------------
     */
	public function payCheck(){
		$arrReturn = array();
		$orderId = I('param.orderid','','intval');	
		if(empty($orderId)){
			$this->outError(\Think\ErrorCode::UPLOAD_ERROR);
		}
		$info = $this -> orderInfo($orderId);
		if(empty($info))
		{
			$arrReturn['success'] = false;
			$arrReturn['code']    = 500;
			$arrReturn['msg']     = "订单异常";
		}elseif($info['status'] == self::ORDER_CANCEL)//取消
		{
			$arrReturn['success'] = false;
			$arrReturn['code']    = 101;
			$arrReturn['msg']     = $info['status'];
		}elseif($info['status'] == self::PAY_FINISH)//完成
		{
			$arrReturn['success'] = false;
			$arrReturn['code']    = 102;
			$arrReturn['msg']     = $info['status'];
		}elseif($info['status'] == self::NEED_PAY){//待支付
			$arrReturn['success'] = true;
			$arrReturn['code']    = 200;
			$arrReturn['msg']     = '';
		}
		else{
			$arrReturn['success'] = false;
			$arrReturn['code'] = 201;
			$arrReturn['msg'] = '';
		}

		$this -> response($arrReturn);
	}

	/**
     *-------------------------------------------------------------------------
     * @author：张挺
     * @date：2016-08-17
	 * @params $orderId(正向订单id)合单id
     *-------------------------------------------------------------------------
     */
	public function  show(){
		$orderId = I('param.orderid','','trim');	
		if(empty($orderId))
		{
			$this ->_empty();
		}
		$arr = $this -> orderInfo($orderId);
		$template = "";
		if($arr['status'] == self::ORDER_CANCEL){//订单取消
			$template="orderCancel";		
		}elseif($arr['status'] == self::PAY_FINISH){//已完成支付
			$template="orderPay";	
		}else{//其他所有状态
			$template="dataError";	
		}
        //为你推荐商品
        $recommendList = $this->recommend();
		$this -> assign('data',$arr);
		$this -> assign('title',$title);
		$this -> assign('recommendList',$recommendList);
		$this -> display($template);
	}

	/**
     *-------------------------------------------------------------------------
     * @author：张挺
     * @date：2016-08-17
	 * @params $orderId(正向订单id)合单id
     *-------------------------------------------------------------------------
     */
	private function orderInfo($orderId){
		$arrReturnData = array();
		$arrInfo = $this->order_v2->getData($this->order_v2->mergerOrder,array('id'=>$orderId));
		if(!empty($arrInfo['data'])){
			$arrReturnData['orderid']  = $orderId;
			$arrReturnData['baseinfo'] = $arrInfo['data']['consignee'];
			$arrReturnData['status']   = $arrInfo['data']['status'];
			$arrReturnData['statusDesc'] = $arrInfo['data']['statusDesc'];
			$arrReturnData['paymentAmount'] = number_format($arrInfo['data']['paymentAmount']/100,2);
			$arrReturnData['time'] = $arrInfo['data']['orderTime'];
		}
		return $arrReturnData;
	}
	/**
     *-------------------------------------------------------------------------
     * @author：张挺11
     * @date：2016-10-19
	 * @params  检查跨境商品收货地址是否有idacard(身份证号码)
     *-------------------------------------------------------------------------
     */
	private function checkidCard($addressId){
		$arrReturn = array();
        $param['id'] = $addressId; 

        $this->address_v2 = D('Ucenter/AddressV2'); 
		$arrAddressInfo = $this->address_v2->getData($this->address_v2->addressDetail,$param);
		$idCard = "";
		if($arrAddressInfo['success'] && $arrAddressInfo['data']){
			$idCard = $arrAddressInfo['data']['idCard'];	
		}
		if(empty($idCard)){
			$arrReturn['success'] =false;
			$arrReturn['code'] =100030;
			$arrReturn['message'] ="跨境商品身份信息不完整";
		}
		else{
			$arrReturn['success'] = true;
			$arrReturn['code'] = "";
			$arrReturn['message'] = "";
		}
		return $arrReturn;
	}
}
