<?php

/**
 * 购物车
 * Created by PhpStorm.
 * User: wangzhibo
 * Date: 2016/5/23
 * Time: 16:11
 */
namespace Order\Controller;

use Home\Controller\AuthController;
use Think\ErrorCode;
use Order\Controller\OrderController;

class CartController extends AuthController
{
    //skulist mc key
    const SKULIST_SESS = '_cart_skulist_';
    const ADDRESSID_SESS = '_cart_addressid_';
    const CACHE_TIME = 28800;
	const ORDER_PRICE_KEY = "order_price_change_";
	const USER_ADDRESS="user_default_address_";
	const ORDER_FIRST = "user_order_first_";

    public function __construct()
    {
        //提前储存提交到确认订单页的商品信息，防止登录后丢失
        if(ACTION_NAME == 'checkout')
        {
            $fid = I('get.fid','');
            $skuList = I('param.skuList','','');
            if($fid && $skuList)
            {
                $skuListKey= self::SKULIST_SESS.$fid;
                S($skuListKey,$skuList,self::CACHE_TIME);
            }
        }
        parent::__construct();
        $this->cart = D('Home/Base');
        $this->cart_v2 = D( 'cart' );
        $this->order = D('Order');
    }

    /**
     * 购物车列表
     */
    public function index()
    {
        //控制页面缓存
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        //默认购物车为空
        $cartTpl = 'cart';
        //有效商品
        $cartList = array();
		//失效商品
        $cartListInva = array();
        $fid = orderFlowIdGen();

        //获取数据
        $res_data = $this->cart_v2->getData(
            $this->cart_v2->shopping_cart,
            array()
        );

        if( isset( $res_data['data']['shopingCartItems'] ) && !empty( $res_data['data']['shopingCartItems'] ))
        {
            $productList = $res_data['data']['shopingCartItems'];
            //将接口数据按店铺进行分组
            foreach($productList as $product)
            {
				$sourceCodeArr = json_decode($product['sourceCode'], true);
				$product['urlSourceCode'] = $sourceCodeArr['sourceCode'];
                if(!empty($product['sku']['item']['shop']['id']) && ($shopId = $product['sku']['item']['shop']['id']))
                {
					//有效、失效商品拆分
					if($product['sku']['status'] <> 1 || $product['sku']['stock'] <= 0)
					{
						if(empty($cartListInva[$shopId]))
						{
							$cartListInva[$shopId]['title'] = $product['sku']['item']['shop']['name'];
							$cartListInva[$shopId]['hasCoupon'] = $product['hasCoupon'];
						}
						$cartListInva[$shopId]['list'][] = $product;
					}
					else
					{
						if(empty($cartList[$shopId]))
						{
							$cartList[$shopId]['title'] = $product['sku']['item']['shop']['name'];
							$cartList[$shopId]['hasCoupon'] = $product['hasCoupon'];
						}
						$cartList[$shopId]['list'][] = $product;
					}
                }
            }
        }
        else
        {
            $cartTpl = 'emptyCart';
        }
		
		$this->assign('sourceCode',C('sourceCode.recommend_order_cart_index'));
        $seoMap = seoMap();
        $this->assign('title',$seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('fid',$fid);
        $this->assign('cartList',$cartList);
        $this->assign('cartListInva',$cartListInva);

        $this->display($cartTpl);
    }

    /**
     * 确认订单页
     */
    public function checkout()
    {
        $addressList = $defaultAddress =  $couponList = $currentAddressId = array();
        $orderList = array();
        $currentAddress = array(
            'userName' => '',
            'address' => '',
            'mobile' => ''
        );
        //国美币数据初始化
        $gomeCoin =  array(
            'totalRebate' => 0,
            'useableRebate' => 0
        );
        //默认可配送
        $deliverInfo = array('success' => true,'code'=>200);
        //获取收货地址
        $addressModel = D('Ucenter/AddressV2');
        $addressInfo = $addressModel->getData($addressModel->addressList, array(), false);
        if(!empty($addressInfo['data']['consigneeInfos']))
        {
            //v2接口返回数据接口跟v1略微不同，构造下数据
            $tempArr = $addressInfo['data']['consigneeInfos'];
            foreach ($tempArr as $key=>$val){
                $tempArr[$key]['userName'] = $val['name'];
                $tempArr[$key]['address'] = $val['detail'];
                $tempArr[$key]['provinceName'] = $val['province']['name'];
                $tempArr[$key]['cityName'] = $val['city']['name'];
                $tempArr[$key]['boroughName'] =$val['borough']['name'];
                $tempArr[$key]['areaName'] = $val['area']['name'];
                $tempArr[$key]['idCard'] = isset($val['idCard']) ? $val['idCard'] : '';
            }
            $addressInfo['data'] = $tempArr;
            unset($addressInfo['data']['consigneeInfos']);
            $addressList = $addressInfo;
        }
		if(array_key_exists('consigneeInfos',$addressInfo['data'])){
            unset($addressInfo['data']['consigneeInfos']);
		}
        $fid = I('get.fid','');
        //商品信息
        $skuList = I('param.skuList','','');
        //确认订单页，地址切换成功，传递地址ID
        $currentAddressId = I('param.addressId');

        $skuListKey= self::SKULIST_SESS.$fid;
        $addressKey = $this->userId.self::ADDRESSID_SESS.$fid;

        //如果不传,mc get 否则，mc set
        if($skuList)
        {
            S($skuListKey,$skuList,self::CACHE_TIME);
        }
        else
        {
            $skuList = S($skuListKey);
        }
        if($currentAddressId)
        {
            S($addressKey,$currentAddressId,self::CACHE_TIME);
        }
        else
        {
            $currentAddressId = S($addressKey);
        }
        //是否包含跨境商品
        $otherParam = I('param.otherParam','','');
        $otherParam = json_decode($otherParam,true);
        $isCross = empty($otherParam[0]['isCross']) ? 0 : $otherParam[0]['isCross'];

        if($skuList && ($skuList = json_decode($skuList,true)))
        {

            //适应v2拆单接口
            $orderItems = array();
            foreach($skuList as $sku){
                $sku['source_code']['adSourceCode'] = isset($_COOKIE['asid']) ? $_COOKIE['asid'] : '';
                $sid = '';
                $sid = C('sid')[$sku['source_code']['sourceCode']];
                //有渠道时，渠道优先
                if(session('channel')){
                    $sku['source_code']['activityNo'] = session('active_id');
                    $sku['source_code']['sourceCode'] = session('channel');
                    $sid = session('active_no');
                }
                if($sid)
                {
                    $sku['source_code']['sid'] = $sid;
                    $this->order->publicParamv2['sid'] = $sid;
                }
                $sku['sourceCode'] = json_encode($sku['source_code']);
                $sku['quantity'] = intval($sku['proNum']);
                $sku['kid'] = (string)$sku['kId'];
                unset($sku['proNum'],$sku['kId'],$sku['source_code']);
                $orderItems[] = $sku;
            }
            if(!empty($addressInfo['data']) && ($addressList = $addressInfo['data']))
            {//收货地址为空时，js会在页面加入新加表单
                foreach($addressList as &$address)
                {
                    $addressFlag = 0;
                    if($currentAddressId && ($currentAddressId == $address['id']))
                    {//地址切换后，页面刷新
                        $addressFlag = 1;
                    }
                    elseif(!$currentAddressId && !empty($address['isDefault']))
                    {//购物车或者商品详情过来，没有传地址ID，则取默认收货地址
                        $addressFlag = 1;
                    }
                    if($addressFlag)
                    {
                        $firstAddress = &$address;
                    }

                }
                if(empty($firstAddress) && !empty($addressList[0]))
                {//有收货地址，没有默认地址时和当前地址时,取第一个地址为当前地址
                    $firstAddress = &$addressList[0];
                }
				if($currentAddressId == false){
						$currentAddressId=$firstAddress['id'];	
				}

                if(!empty($firstAddress))
                {
                    $currentAddress['userName'] = $firstAddress['userName'];
                    $currentAddress['id'] = $firstAddress['id'];
                    $currentAddress['mobile'] = $firstAddress['mobile'];
                    $currentAddress['address'] .= $firstAddress['provinceName'];
                    $currentAddress['address'] .= $firstAddress['cityName'];
                    $currentAddress['address'] .= $firstAddress['boroughName'];
                    $currentAddress['address'] .= $firstAddress['areaName'];
                    $currentAddress['address'] .= $firstAddress['address'];
                    $firstAddress['currentAddress'] = 1;
                }

                #当前选中排在第一位
                $currentKey = 0;
                foreach ($addressList as $key => $val) {
                    if(isset($val['currentAddress'])){
                        $currentKey = $key;
                        break;
                    }
                }
                if($currentKey){
                    array_unshift($addressList,$addressList[$currentKey]);
                    unset($addressList[$currentKey+1]);
                }                
                //收货地址不为空时，请求确认订单接口
                $proJson = array(
                    'addressId' => isset($currentAddress['id'])?intval($currentAddress['id']):0,
                    'orderItems' => $orderItems
                );
                $this->order->setTimeOut(15);
                $orderInfo = $this->order->postData($this->order->preMergerOrderBySimpleParam,$proJson);
                $total = $orderItems =  array();
                $orderSets = $orderPriceSets = array();
                $total['total_quantity'] = 0;
                if(!empty($orderInfo['data']['orderPreviews']))
                {
                    $orderList = $orderInfo['data']['orderPreviews'];
                    //初始化平台优惠券
                    $couponList['platRedPackList'] = array();
                    $couponParam_str = '';
                    $couponParam = $crossTag = array();
                    foreach($orderList as $shop)
                    {
						$shop_id = $shop['shop']['id'];
                        $temp = array();
                        foreach ($shop['orderItems'] as $goods){
                            $temp[$shop_id] += $goods['quantity']*$goods['sku']['price'];
                            $couponParam[$shop_id] = $shop_id.':'.$temp[$shop_id];
                            //$crossTag[] = $goods['activities'][0]['type'];
							foreach ($goods['activities'] as $Item) {
								$crossTag[] = $Item['type'];
							}
                        }
                        $couponParam_str = rtrim(implode(',',$couponParam),',');
                        $orderPriceSets[$shop_id] = $shop['paymentMoney'];
                        //js使用变量,providerId 在v2接口已废弃
                        $orderSets[$shop_id] = $shop;
                        $total['total_quantity'] += $shop['quantity'];
                    }
                    $isCross = in_array(2,$crossTag) ? 1 : 0;
					$showEceipt =in_array(3,$crossTag)  ? 1 : 0;//是否显示页面默认发票模块
                    //按照订单金额从小到大排序
                    asort($orderPriceSets);
                    //获取红包列表GET请求
                    $couponList = $this->getCoupon($couponParam_str);
                    //地址可配送时，取国美币信息
                    $userAssetsInfo = $this->cart_v2->getData($this->cart_v2->userAssetsInfo);
                    if(!empty($userAssetsInfo['data']))
                    {
                        $gomeCoin = array(
                            'totalRebate'=>isset($userAssetsInfo['data']['gomeMoneyAmount']) ? $userAssetsInfo['data']['gomeMoneyAmount'] : 0,
                            'useableRebate'=>isset($userAssetsInfo['data']['useableGomeMoneyAmount']) ? $userAssetsInfo['data']['useableGomeMoneyAmount'] : 0,
                        );
                        //有国美币的情况下，判断是否设置支付密码
                        $passwordExist = $this->cart_v2->getData($this->cart_v2->paymentPasswordExistence);
                        $passwordVerify = $passwordExist['data']['isExist'];
                    }
                }
                //输出变量到js,用做送货地址可否配送判断
                $deliverInfo['success'] = $orderInfo['success'];
                if(stripos($orderInfo['message'],'881043')!==false){
                    $orderInfo['code'] = 881043;
                    $orderInfo['message'] = current(explode(',',$orderInfo['message']));
                }
                if(stripos($orderInfo['message'],'881064')!==false){
                    $orderInfo['code'] = 881064;
                    $orderInfo['message'] = current(explode(',',$orderInfo['message']));
                }
                $deliverInfo['code'] = $orderInfo['code'];
                $deliverInfo['message'] = $orderInfo['message'];
                $deliverInfo['data'] = array();
            }
            $total['totalOrderMoney'] = isset($orderInfo['data']['totalOrderMoney']) ? $orderInfo['data']['totalOrderMoney'] : 0;
            $total['totalPaymentMoney'] = $totalOrderMoney =isset($orderInfo['data']['totalPaymentMoney']) ? $orderInfo['data']['totalPaymentMoney'] : 0;
			$total['totalShippingCost'] = isset($orderInfo['data']['totalShippingCost']) ? $orderInfo['data']['totalShippingCost'] : 0;
            $total['goodsCost'] = $total['totalPaymentMoney'] - $total['totalShippingCost'];
			//记录每次地址变化价格变化
			$showStatus = 0;
			$moneykey = self::ORDER_PRICE_KEY.$this->userId;	
			$address_key = self::USER_ADDRESS .$this->userId;
			$fidkey = self::ORDER_FIRST.$fid;

			if(isset($_SESSION[$fidkey])){//第二次
				if($_SESSION[$fidkey] == $fid){//当前页
					if(($_SESSION[$moneykey] >0) && ($totalOrderMoney >0 ) && ($_SESSION[$address_key] != $currentAddressId)){
						$showStatus = $_SESSION[$moneykey] == $totalOrderMoney ? 0 : 1;	
					}
				}
			}
			else{//第一次
				$_SESSION[$fidkey]=$fid;
				$_SESSION[$address_key] = $currentAddressId;
				$_SESSION[$moneykey] = $totalOrderMoney;
			}

            $seoMap = seoMap();
            $this->assign('title',$seoMap['title']);
            $this->assign('keywords',$seoMap['keywords']);
            $this->assign('description',$seoMap['description']);
			$this->assign('total',$total);
            $this->assign('fid',$fid);//flow id
			$this->assign('showStatus',$showStatus);
            $this->assign('passwordVerify',$passwordVerify);//是否需要密码校验
            $this->assign('deliverInfo',$deliverInfo);//默认地址是否可配送
            $this->assign('skuList',$skuList);//skuList输出给js ,用于地址切换时，判断是否可配送
            $this->assign('couponList',$couponList);//优惠券列表 js 弹框
            $this->assign('addressList',$addressList);//收货地址列表
            $this->assign('orderList',$orderList);//商品列表
            $this->assign('currentAddress',$currentAddress);//当前收货地址信息 页面底部
            $this->assign('gomeCoin',$gomeCoin);//国美币信息
            $this->assign('isCross',$isCross);  //是否含有跨境商品 1是 0 否
			$this->assign("show_eceipt",$showEceipt);//是否显示默认发票模块

            $this->display('checkout');
        }
        else
        {
            $this->redirect(C('ERROR_PAGE'));
        }
    }

    private function getCoupon($couponParam){
        $shopList = [];
        $couponInfo = $this->order->getData($this->order->userUseFulCoupons,array('amountByShop'=>$couponParam));
        $data = $couponInfo['data']['coupons'];
        $packList['platRedPackList'] = array();
        if($data){
            foreach ($data as $value){
				if($value['baseMoney'] <= $value['money'])
				{
					continue;
				}
                if($value['type']==1){
                    $shopList[$value['shopId']]['shopId'] = $value['shopId'];
                    $shopList[$value['shopId']]['shopName'] = $value['shopName'];
                    $shopList[$value['shopId']]['redPackList'][] = $value;
                }else{
                    $packList['platRedPackList'][] = $value;
                }
            }
        }
        $packList['shopList'] = array_values($shopList);
        return $packList;
    }

    /**
     * 更改收货地址时，js判断商品是否可配送
     */
    public function orderDeliver()
    {
        $fid = I('param.fid','');
        $skuList = $skuListJson = I('param.skuList','','');
        //确认订单页，地址切换时，传递地址ID
        $currentAddressProvinceId = I('param.addressProvinceId',0,'intval');
        $currentAddresssId = I('param.addressId',0,'intval');

        if($skuList
            && ($skuList = json_decode($skuList,true))
            && $currentAddressProvinceId && $currentAddresssId)
        {
            //适应v2拆单接口
            $orderItems = array();
            foreach($skuList as $sku){
                $sku['sourceCode'] = json_encode($sku['source_code']);
                $sku['quantity'] = intval($sku['proNum']);
                $sku['kid'] = (string)$sku['kId'];
                unset($sku['proNum'],$sku['kId'],$sku['source_code']);
                $orderItems[] = $sku;
            }
            $proJson = array(
                'addressId' => $currentAddresssId,
                'orderItems' => $orderItems
            );
            //set mc addressId
            $addressKey = $this->userId.self::ADDRESSID_SESS.$fid;
            S($addressKey,$currentAddresssId,self::CACHE_TIME);
            //set mc skuList
            $skuListKey = self::SKULIST_SESS.$fid;
            S($skuListKey,$skuListJson,self::CACHE_TIME);
            $orderInfo = $this->order->postData($this->order->preMergerOrderBySimpleParam,$proJson);
            $deliverInfo['success'] = $orderInfo['success'];
            $deliverInfo['code'] = $orderInfo['code'];
            $deliverInfo['message'] = $orderInfo['message'];
            $deliverInfo['data'] = array();
            $this->ajaxReturn($deliverInfo);
        } else {
            $this->outError(ErrorCode::PARMA_ERROR);
        }
    }

    /**
     * 接口暂未使用
     * 用户使用国美币支付，已设置密码情况下，密码验证
     *
     */
    public function payPasswordVerify()
    {
        $password = I('param.password','','');
        if($password)
        {
            $params = array(
                'paymentPassword' => $password,
            );
            $verify = $this->cart_v2->postData($this->cart_v2->paymentPasswordVerification, $params);
            $this->ajaxReturn($verify);
        }
        else
        {
            $this->outError(ErrorCode::PARMA_ERROR);
        }
    }

	/**
     * 我的收藏--商品
     *
     */
	public function goodsCollect()
	{
		$param = array();
			
		$param = array(
			'pageSize' => I('param.pageSize', 100, 'intval'),	//取出所有收藏的商品
			'pageNum' => I('param.pageNum', 1, 'intval')
		);
		
		$collect = D('Ucenter/Collect');
		
		$res = $collect->getData($collect->goodsCollectList, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
		
		foreach($res['data']['collections'] as $key => &$val)
		{
			// 过滤藏品，当藏品“非上架状态”或者库存不足时，此藏品不展示
			if($val['item']['status'] <> 1 || $val['item']['stock'] <= 0)
			{
				unset($res['data']['collections'][$key]);
				continue;
			}
			$val['item']['originalPrice'] = convert_price($val['item']['originalPrice']);
			$val['item']['price'] = convert_price($val['item']['price']);
			$val['item']['salePrice'] = convert_price($val['item']['salePrice']);
			$val['item']['skuHighestPrice'] = convert_price($val['item']['skuHighestPrice']);
            $val['item']['mainImage'] = getResizeImg($val['item']['mainImage'],230,230);
			unset($res['data']['collections'][$key]['promotionMarks']);
			unset($val);
		}
		$res['data']['collections'] = array_merge($res['data']['collections']);
		
		$this->ajaxReturn($res);
	}
	
	/**
     * 为您推荐
     *
     */
	public function goodsRecom()
	{
		$param = array();
			
		$param = array(
			'pageSize' => I('param.pageSize', 20, 'intval'),
			'pageNum' => I('param.pageNum', 1, 'intval')
		);
		
		$order = D('Order');
		$res = $order->getData($order->emptyCarRecommend, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
		
		foreach($res['data']['items'] as $key => &$val)
		{
			$val['originalPrice'] = convert_price($val['originalPrice']);
			$val['price'] = convert_price($val['price']);
			$val['salePrice'] = convert_price($val['salePrice']);
			$val['skuHighestPrice'] = convert_price($val['skuHighestPrice']);
            $val['mainImage'] = getResizeImg($val['mainImage'],230,230);
			unset($res['data']['items'][$key]['promotionMarks']);
			unset($val);
		}
		
		$this->ajaxReturn($res);
	}
	
	/**
     * 商品详情
     *
     */
	public function goodsDetail()
	{
		$param = array();
		$param['itemId'] = I("param.itemId", 0, 'intval');
		$param['shopId'] = I("param.shopId", 0, 'intval');
		
		if(!$param['shopId'] || !$param['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		
		$product = D('Mall/ProductV2');
		$prodDetail = $product->getData($product->productDetail, $param);
		
		if(!$prodDetail['success'])
		{
			$this->ajaxReturn($prodDetail);
			exit;
		}
		
		$prodDetail['data'] = $this->dealPrice($prodDetail['data']);
		$item = $prodDetail['data']['item'];
		$shop = $prodDetail['data']['shop'];
		$mshop = $prodDetail['data']['mshop'];
		unset($prodDetail['data']);
		$prodDetail['data']['item'] = $item;
		$prodDetail['data']['shop'] = $shop;
		$prodDetail['data']['mshop'] = $mshop;
		
		$this->ajaxReturn($prodDetail);
	}
	
	/**
     * 处理价格及图片大小
     *
     */	
	private function dealPrice($productDetail)
	{
		$productDetail['item']['originalPrice'] = convert_price($productDetail['item']['originalPrice']);
		$productDetail['item']['price'] = convert_price($productDetail['item']['price']);
		$productDetail['item']['salePrice'] = convert_price($productDetail['item']['salePrice']);
		$productDetail['item']['skuHighestPrice'] = convert_price($productDetail['item']['skuHighestPrice']);
		$productDetail['item']['mainImage'] = getResizeImg($productDetail['item']['mainImage'], 230, 230);
		
		if(!empty($productDetail['item']['images']))
		{
			foreach($productDetail['item']['images'] as &$val)
			{
				$val = getResizeImg($val, 230, 230);
				unset($val);
			}
		}
		
		if(!empty($productDetail['item']['skus']))
		{
			foreach($productDetail['item']['skus'] as &$val)
			{
				$val['price'] = convert_price($val['price']);
				$val['salePrice'] = convert_price($val['salePrice']);
				unset($val);
			}
		}		
		
		if(!empty($productDetail['recommendation']['items']))
		{
			foreach($productDetail['recommendation']['items'] as &$val)
			{
				$val['originalPrice'] = convert_price($val['originalPrice']);
				$val['price'] = convert_price($val['price']);
				$val['salePrice'] = convert_price($val['salePrice']);
				$val['skuHighestPrice'] = convert_price($val['skuHighestPrice']);
				unset($val);
			}
		}		
		
		return $productDetail;
	}
}
