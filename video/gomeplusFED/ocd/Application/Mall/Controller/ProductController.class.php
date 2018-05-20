<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：商品详情页                                                  |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/20-15:08                                                |
* +----------------------------------------------------------------------+
*/

namespace Mall\Controller;
use Home\Controller\BaseController;
use Common\Lib\EpiCurl;
class ProductController extends BaseController
{
	const SHOP_PRODUCT_ALL_TYPE = 1;
	const SHOP_PRODUCT_NEW_TYPE = 2;
	const SHOP_PRODUCT_CHEAP_TYPE = 3;
	const SHOP_PRODUCT_DISCOUNT_TYPE = 4;
	const SHOP_PRODUCT_RABATE_TYPE = 5;
	const EVALUTE_PAGE_SIZE = 10;
	const SHARE_REBATE_SOURCE_WEB = 30;
	const SHOP_STATUS_NORMAL = 0;
	const PRODUCT_STATUS_ABNORMAL = 0;
	const PRODUCT_STATUS_NORMAL = 1;
	const COUPON_PAGE_SIZE = 1000;

	/**
	 * 商品详情页面
	 */
	public function index()
	{
		//控制页面缓存
		C('HTTP_CACHE_CONTROL','no-cache,no-store');
		$param = array();
		$param['shopId'] = I("param.shopId", 0, 'intval');
		$param['itemId'] = I("param.productId", 1, 'intval');
		$param['kId'] = I("param.kId", '');
		$param['onlineUserId'] = I("param.onlineUserId", '');
		$param['onlineUserId'] = !$param['onlineUserId'] ? 0 : $param['onlineUserId'];
		$param['source'] = I("param.csid", 0);
		$param['skuid'] = I("param.skuid", 0, 'intval');
		if($param['itemId']<1)
		{
			$url = APP_HTTP.C('MAIN_URL');
			header('location: '.$url, true, 301);
			exit;
		}
		$mc_open = true;
		if($this->userId)
		{
			$mc_open = false;
		}
		// $product = D("Product");
		$productV2 = D("ProductV2");
		$product_detail = $productV2->getData($productV2->productDetail, $param, $mc_open);
		if(!$product_detail['success'] || !is_array($product_detail['data']))
		{
			$url = APP_HTTP.C('MAIN_URL');
			header('location: '.$url, true, 301);
			exit;
		}
		
		//处理数据里的部分价格字段
		$product_detail = $this->dealPrice($product_detail['data']);
		
		$skuInfo = array(
			'sku_one_price' => isset($product_detail['item']['salePrice']) ? $product_detail['item']['salePrice'] : 0,
			'price' => isset($product_detail['item']['price']) ? $product_detail['item']['price'] : 0,
			'skuIdDefault' => 0,
			'skuDirectRebate' => $product_detail['promotionMarks']['purchaseDirectlyProspectiveRebateAmount'] ? 1 : 0,
			'skuShareRebate' => $product_detail['promotionMarks']['shareProspectiveRebateAmount'] ? 1 :0,
			'skuDirectRebateAmt' => convert_price($product_detail['promotionMarks']['purchaseDirectlyProspectiveRebateAmount']),//直接购买得返利
			'skuShareRebateAmt' => convert_price($product_detail['promotionMarks']['shareProspectiveRebateAmount']),//分享得返利
		);
		
		//促销
		$promotion =  array();
		if($skuInfo['skuShareRebate'] == 1)
		{
			$promotion[] = '<em class="icon-fan">返</em>分享且被购买最高可得<span class="red pl6">'.number_format($skuInfo['skuShareRebateAmt'], 2).'</span>国美币';
		}
		if($skuInfo['skuDirectRebate'] == 1)
		{
			$promotion[] = '<em class="icon-fan">返</em>购买该商品最高可得<span class="red pl6">'.number_format($skuInfo['skuDirectRebateAmt'], 2).'</span>国美币';
		}
		
		//促销返利标识，1：促销返利，0：不促销返利，默认0
		$isRebate = 0;
		if(!empty($promotion))
		{
			$isRebate = 1;
		}
		
		//判断店铺类型
		$shopType = 'xpop';
		if(isset($product_detail['mshop']) && $product_detail['mshop']['type'] == 'mShop')
		{
			$shopType = 'mShop';
		}
		
		//处理商品状态
		if($shopType == 'xpop')
		{
			if($product_detail['shop']['status'] !== self::SHOP_STATUS_NORMAL)
			{
				$product_detail['item']['status'] = self::PRODUCT_STATUS_ABNORMAL;
			}
		}
		else if($shopType == 'mShop')
		{
			if($product_detail['mshop']['status'] !== self::SHOP_STATUS_NORMAL)
			{
				$product_detail['item']['status'] = self::PRODUCT_STATUS_ABNORMAL;
			}
		}
		
		$shop['shopType'] = $shopType;
		$shop['shop'] = $product_detail['shop'];
		$shop['shopLevel'] = $product_detail['shopLevel'];
		$shop['shopCollectionQuantity'] = $product_detail['shopCollectionQuantity'];
		$shop['shopItemsQuantity'] = $product_detail['shopItemsQuantity'];
		
		if($shopType == 'mShop')
		{
			$shop['shop'] = $product_detail['mshop'];
			$shop['xshop'] = $product_detail['shop'];
		}

		$level['medal']= '';
		$level['medalNum']= 0;
		if($shopType == 'xpop')
		{
			$medal = levelMedal($shop['shopLevel']['level']);/*获取店铺奖章*/
			if(is_array($medal))
			{
				$level['medal']= $medal['medal'];
				$level['medalNum']= $medal['medalNum'];
			}
		}
		
		$extra_res = $this->getExtraInfo($param['shopId'],$param['itemId']);
		
		$shop_coupons = json_decode($extra_res['shop_coupons'], true);
		
		//如果是xpop店铺,且有可用的优惠券时,显示优惠券
		if($shopType == 'xpop' && $shop_coupons['data']['totalQuantity'])
		{
			$this->assign('show_coupon', true);
			$shopCouponsArr = array();
			foreach($shop_coupons['data']['coupons'] as $shopCouponsval)
			{
				$shopCouponsArr[] = floor($shopCouponsval['money'] / 100);
			}
			$this->assign('shopCouponsArr', $shopCouponsArr);
		}
		else
		{
			$this->assign('show_coupon', false);
		}
		
		//判断商品是否已被收藏
		$isCollectProduct = 0;
		if($this->userId)
		{
			$prod_collect = json_decode($extra_res['prod_collect'], true);
			if($prod_collect['message'] == '' && $prod_collect['data']['result'] == true)
			{
				$isCollectProduct = 1;
			}
		}
		$this->assign('isCollectProduct', $isCollectProduct);
		
		//判断店铺是否已被收藏
		$vshopCollect = 0;
		if($this->userId)
		{
			$shop_collect = json_decode($extra_res['shop_collect'], true);
			if($shop_collect['message'] == '' && $shop_collect['data']['result'] == true)
			{
				$vshopCollect = 1;
			}
		}
		$this->assign('vshopCollect', $vshopCollect);
		
		#默认地址管理，调用商品详情页会用到$param['locId']来判断是否有货
		$default_address['province'] = array('id'=>'11000000','name'=>'北京');
		$default_address['city'] = array('id'=>'11010000','name'=>'北京市');
		$default_address['borough'] = array('id'=>'11010200','name'=>'朝阳区（五环里）');
		$default_address['area'] = array('id'=>'110102001','name'=>'全部区域');
		
		//获取收货地址列表
		if($this->userId)
		{
			$addressList = json_decode($extra_res['address_get_default'], true);
			if($addressList['message'] == '' && $addressList['data'])
			{
				$addressList = $addressList['data'];
				$default_address['province'] = array('id'=>$addressList['provinceId'], 'name'=>$addressList['province']['name']);
				$default_address['city'] = array('id'=>$addressList['cityId'], 'name'=>$addressList['city']['name']);
				$default_address['borough'] = array('id'=>$addressList['boroughId'], 'name'=>$addressList['borough']['name']);
				$default_address['area'] = array('id'=>$addressList['areaId'], 'name'=>$addressList['area']['name']);
			}
		}
		
		$fid = orderFlowidGen();
		$this->assign('fid', $fid);
		
		//描述图片不存在，则显示主图图片
		if(!$product_detail['item']['detailImages'])
		{
			$product_detail['item']['detailImages'] = $product_detail['item']['images'];
		}
		
		//商品参数属性
		$sku_list = $this->getSkuAttr($product_detail['item']['skus']);
		
		$img_list = array();
		$goods_thum = '';
		if($product_detail['item']['images'])
		{
			foreach ($product_detail['item']['images'] as $key=>$img)
			{
				if($key==0)
				{
					$goods_thum = getResizeImg($img, 80, 80);
				}
				$img_list[] = array('id'=>'','img'=>$img);
			}
		}
		
		//处理页面默认图片及默认属性
		$dealDefaultRes = $this->dealDefault($product_detail['item']['skus'], $param['skuid']);
		if(!$dealDefaultRes)
		{
			$this->assign('skuDefault', array());
			$this->assign('imgDefault', '');
			$this->assign('stockDefault', -1);
		}
		else
		{
			$this->assign('skuDefault', $dealDefaultRes['skuDefault']);
			$this->assign('imgDefault', $dealDefaultRes['imgDefault']);
			$this->assign('stockDefault', $dealDefaultRes['stockDefault']);
			$skuInfo['sku_one_price'] = $dealDefaultRes['salePriceDefault'];			
			$skuInfo['price'] = $dealDefaultRes['priceDefault'];			
			$skuInfo['skuIdDefault'] = $dealDefaultRes['skuIdDefault'];
			$goods_thum = getResizeImg($dealDefaultRes['imgDefault'], 80, 80);
			// 处理规格参数位置的数据显示
			$dealShowSkusRes = $this->dealShowSkus($product_detail['item']['skus'], $dealDefaultRes['skuDefault']);
			if($dealShowSkusRes)
			{
				$sku_list['page_show'] = $dealShowSkusRes;
			}
		}
		
		$qr_url = APP_HTTP.C('WAP_URL').'product/'.$param['shopId'].'-'.$param['itemId'].'.html?h=product&p=detail&productId='.$param['itemId'].'&shopId='.$param['shopId'];
		if($param['kId'])
		{
			$qr_url .= '&kid='.$param['kId'];
		}
		$this->assign('isCross',$product_detail['item']['isUserIdentityRequired']);
		$this->assign('qr_url',$qr_url);
		$this->assign('goods_thum',$goods_thum);
		$this->assign('level',$level);
		$this->assign('img_list',$img_list);
		$this->assign('kid',$param['kId']);
		$this->assign('product_crumbs',crumbsMap());
		$this->assign('shop_info',$shop);
		$this->assign('sku_attr',$sku_list['page_show']);
		$this->assign('default_address',$default_address);
		$this->assign('sku_list',json_encode(array_values($sku_list['json_show'])));
		$this->assign('skuInfo',$skuInfo);
		$this->assign('productInfo',$product_detail);
		$seoMap = seoMap('',array("{{1}}"=>xss_clean($product_detail['item']['name'])));
		$this->assign('title', $seoMap['title']);
		$this->assign('keywords',$seoMap['keywords']);
		$this->assign('description',$seoMap['description']);
		$this->assign('shopId', $param['shopId']);
		$this->assign('productId', $param['itemId']);
		$this->assign('promotion',$promotion);
		$this->assign('isRebate',$isRebate);
		//推荐人user_id
		$this->assign('onlineUserId', $param['onlineUserId']);
		$this->assign('sourceCode',$param['source']);
		$this->assign('source_code',C('sourceCode.recommend_mall_product_detail'));
		$this->display('Product/index');
	}
	
	/**
	 * 处理价格
	 * @param array $product_detail
	 * @return array
	 */
	private function dealPrice($product_detail)
	{
		$product_detail['item']['originalPrice'] = convert_price($product_detail['item']['originalPrice']);
		$product_detail['item']['price'] = convert_price($product_detail['item']['price']);
		$product_detail['item']['salePrice'] = convert_price($product_detail['item']['salePrice']);
		$product_detail['item']['skuHighestPrice'] = convert_price($product_detail['item']['skuHighestPrice']);
		
		if(!empty($product_detail['item']['skus']))
		{
			foreach($product_detail['item']['skus'] as &$val)
			{
				$val['price'] = convert_price($val['price']);
				$val['salePrice'] = convert_price($val['salePrice']);
				unset($val);
			}
		}		
		
		if(!empty($product_detail['recommendation']['items']))
		{
			foreach($product_detail['recommendation']['items'] as &$val)
			{
				$val['originalPrice'] = convert_price($val['originalPrice']);
				$val['price'] = convert_price($val['price']);
				$val['salePrice'] = convert_price($val['salePrice']);
				$val['skuHighestPrice'] = convert_price($val['skuHighestPrice']);
				unset($val);
			}
		}		
		
		return $product_detail;
	}

	/**
	 * 获取sku属性值
	 * @param array $sku_list
	 * @return array
	 */
	private function getSkuAttr($sku_list=array())
	{
		$sku_array = array(
			'page_show' => '',
			'json_show' => array()
		);
		if(!$sku_list)
		{
			return $sku_array;
		}
		
		foreach($sku_list as $key => $val)
		{
			if(isset($val['attributes']))
			{
				foreach($val['attributes'] as $itemKey => $itemVal)
				{
					$itemKey ++;
					$sku_array['page_show'][$itemVal['name']][$itemVal['value']] = $itemVal['value'];
					$sku_list[$key]['propertyName'.$itemKey] = $itemVal['name'];
					$sku_list[$key]['propertyValue'.$itemKey] = $itemVal['value'];
				}
			}
		}
		
		foreach ($sku_list as $key => $value)
		{
			if(isset($value['images'][0]))
			{
				$value['images'][0] = getResizeImg($value['images'][0],400,400);
			}
			if(isset($value['propertyName2']))
			{
				$sku_array['json_show'][$value['propertyValue1']]['key'] = $value['propertyValue1'];
				$sku_array['json_show'][$value['propertyValue1']]['second'][] = array(
					'key'=>$value['propertyValue2'],
					'value'=>$value
				);
			}
			else
			{
				$sku_array['json_show'][$key] = array('key'=>$value['propertyValue1'],'value'=>$value);
			}
		}
		return $sku_array;
	}
	
	/**
	 * 获取页面的默认属性值
	 * @param array $skus
	 * @param integer $skuId
	 * @return mixed
	 */
	private function dealDefault($skus = array(), $skuId = 0)
	{
		if(!$skus)
		{
			return false;
		}
		
		$returnArr = array();
		foreach($skus as $val)
		{
			if($skuId == 0 || $val['id'] == $skuId)
			{
				foreach($val['attributes'] as $item)
				{
					$returnArr['skuDefault'][$item['name']] = $item['value'];
				}
				$returnArr['imgDefault'] = $val['images'][0];
				$returnArr['stockDefault'] = $val['stock'];
				$returnArr['salePriceDefault'] = $val['salePrice'];
				$returnArr['priceDefault'] = $val['price'];
				$returnArr['skuIdDefault'] = $val['id'];
				break;
			}
		}
		
		if(empty($returnArr))
		{
			$returnArr = $this->dealDefault($skus, 0);
		}
		
		return $returnArr;
	}

	/**
	 * 获取默认收货地址，判断店铺是否有优惠券，店铺、商品是否收藏
	 * @param $shopId
	 * @param $proId
	 * @return mixed
	 */
	private function getExtraInfo($shopId,$proId)
	{
		import('Common.Lib.EpiCurl');
		$args = [
			'shop_collect' =>  [
				'shopId' => $shopId,
			],
			'prod_collect' => [
				'itemId' => $proId,
				'shopId' => $shopId,
			],
			'shop_coupons' => [
				'batchType' => 1,
				'pageSize' => 2,
				'pageNum' => 1,
				'shopId' => $shopId,
			],
		];
		$addressV2 = D("Ucenter/AddressV2");
		$shopV2 = D("ShopV2");
		$productV2 = D("ProductV2");
		$kv_params = [
			'shop_coupons' => ['url' => connectParam($productV2, $productV2->shopCoupons, $args['shop_coupons'], 2)],
		];
		if($this->userId)
		{
			$kv_params['address_get_default'] = array('url' => connectParam($addressV2, $addressV2->defaultConsInfo, array(), 2));
			$kv_params['shop_collect'] = array('url' => connectParam($shopV2, $shopV2->getShopCollect
			, $args['shop_collect'], 2));
			$kv_params['prod_collect'] = array('url' => connectParam($productV2, $productV2->getProdCollect
			, $args['prod_collect'], 2));
		}
		$res = multi_curl($kv_params);
		return $res;
	}
	
	/**
	 * 处理规格参数位置的数据显示
	 * @param array $skus
	 * @param array $skuDefault
	 * @return mixed
	 */
	private function dealShowSkus($skus, $skuDefault)
	{
		if(!$skus || count($skus[0]['attributes']) < 2)
		{
			return false;
		}
		
		$returnArr = array();
		
		foreach($skus as $key => $val)
		{
			if($key == 0)
			{
				$skusName = $val['attributes'][0]['name'];
			}
			
			if($val['attributes'][0]['name'] == $skusName)
			{
				$returnArr[$skusName][$val['attributes'][0]['value']] = $val['attributes'][0]['value'];
				if($val['attributes'][0]['value'] == $skuDefault[$skusName])
				{
					$returnArr[$val['attributes'][1]['name']][$val['attributes'][1]['value']] = $val['attributes'][1]['value'];
				}
			}
			else if($val['attributes'][1]['name'] == $skusName)
			{
				$returnArr[$skusName][$val['attributes'][1]['value']] = $val['attributes'][1]['value'];
				if($val['attributes'][1]['value'] == $skuDefault[$skusName])
				{
					$returnArr[$val['attributes'][0]['name']][$val['attributes'][0]['value']] = $val['attributes'][0]['value'];
				}
			}
		}
		
		return $returnArr;
	}

	/**
	 * 是否可配送
	 */
	public function canDeliver()
	{
		$param = array();
		$param['regionId'] = I("param.regionId",0,'intval');
		$param['itemId'] = I("param.itemId",0,'intval');
		if(!$param['regionId'] || !$param['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$productV2 = D("ProductV2");
		$data = $productV2->getData($productV2->deliverCheck, $param,false);
		$this->ajaxReturn($data);
	}
	
	/**
	 * 店内推荐
	 */
	public function shopRecom()
	{
		$param = array();
		$itemId = I("param.itemId", 0, 'intval');
		$param['shopId'] = I("param.shopId", 0, 'intval');
		$param['pageNum'] = I('param.pageNum', 1, 'intval');
		$param['pageSize'] = I('param.pageSize', 11, 'intval');
		
		if(!$param['shopId'] || !$itemId)
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		
		$shop = D('ShopV2');
		
		$res = $shop->getData($shop->productList, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
		
		foreach($res['data']['items'] as $key => $val)
		{
			if($val['itemId'] == $itemId)
			{
				unset($res['data']['items'][$key]);
				continue;				
			}
			$res['data']['items'][$key] = $this->dealPrice($val);
			$res['data']['items'][$key]['item']['mainImage'] = getResizeImg($val['item']['mainImage'], 230, 230);
		}
		$res['data']['items'] = array_merge($res['data']['items']);
		$res['data']['items'] = array_slice($res['data']['items'], 0, 10);
		
		$this->ajaxReturn($res);
	}
	
	/**
	 * 商品推荐
	 */
	public function prodRecom()
	{
		$param = array();
		$param['itemId'] = I("param.itemId", 0, 'intval');
		$param['shopId'] = I("param.shopId", 0, 'intval');
		$param['pageNum'] = I('param.pageNum', 1, 'intval');
		$param['pageSize'] = I('param.pageSize', 15, 'intval');
		
		if(!$param['shopId'] || !$param['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		
		$product = D('ProductV2');
		
		$res = $product->getData($product->recommend, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
		
		foreach($res['data']['items'] as &$val)
		{
			$val['originalPrice'] = convert_price($val['originalPrice']);
			$val['price'] = convert_price($val['price']);
			$val['salePrice'] = convert_price($val['salePrice']);
			$val['skuHighestPrice'] = convert_price($val['skuHighestPrice']);
			$val['mainImage'] = getResizeImg($val['mainImage'], 230, 230);
		}
		
		$this->ajaxReturn($res);
	}

	/**
	 * 商品评价列表获取
	 */
	public function getEvaluate()
	{
		$param = array();
		$param['itemId'] = I('param.itemId', 0, 'intval');
		$param['pageNum'] = I('param.pageNum', 1, 'intval');
		$param['pageSize'] = I('param.pageSize', self::EVALUTE_PAGE_SIZE, 'intval');
		if(!$param['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$productV2 = D("ProductV2");
		$itemComments = $productV2->getData($productV2->itemComments, $param,false);
		$itemComments['current_page'] = $param['pageNum'];
		$charSet = C('DEFAULT_CHARSET');
		foreach($itemComments['data']['itemComments'] as &$val)
		{
			$firstWord = msubstr($val['creater']['nickname'], 0, 1, $charSet, false);
			$middleWords = msubstr($val['creater']['nickname'], 1, -1, $charSet, false);
			$lastWord = msubstr($val['creater']['nickname'], -1, 1, $charSet, false);
			$val['creater']['nickname'] = $firstWord.str_repeat('*', mb_strlen($middleWords, $charSet)).$lastWord;
			unset($val);
		}
		$this->ajaxReturn($itemComments);
	}

	/**
	 * 商品返利Id获取
	 */
	public function shareRebateId()
	{
		$params = array();
		$params['callfrom'] = I('param.callfrom', self::SHARE_REBATE_SOURCE_WEB, 'intval');
		$params['flow'] = I('param.flow', 1, 'intval');
		$params['itemUrl'] = I('param.url');
		$params['parentKid'] = I('param.shareKey');
		$params['skuId'] = I('param.skuId');
		$params['itemId'] = I('param.itemId');
		$params['distributorId'] = I('param.distributorId');
		$params['merchantId'] = I('param.merchantId');
		if(!$params['skuId'] || !$params['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$productV2 = D('ProductV2');
		$rebateId = $productV2->postData($productV2->shareRebateKid,$params);
		$this->ajaxReturn($rebateId);
	}
	
	/**
	 * 店铺优惠券及个人拥有的本店铺优惠券
	 * @param $status		Integer	非必填	优惠券使用状态：1：未使用；2：已使用；3：冻结；4：过期
	 * @param $pageSize		Integer	非必填	每页条数
	 * @param $pageNum		Integer	非必填	第几页
	 * @param $shopId		Long	必填	店铺ID
	 * @param $isLogin		Integer	非必填	是否登录：1登录，0未登录
	 */
	public function coupons()
	{
		$batchType 	= 1;
		$pageSize 	= I('param.pageSize', self::COUPON_PAGE_SIZE, 'intval');
		$pageNum 	= I('param.pageNum', 1, 'intval');
		$status 	= I('param.status', 1, 'intval');
		$shopId 	= I('param.shopId', 0, 'intval');
		$isLogin 	= I('param.isLogin', 0);
		
		if(!$shopId)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
		
		$product = D("ProductV2");
		$param = array();
		$returnArr = array();
		
		//店铺优惠券
		$param['batchType'] = $batchType;
		$param['pageSize'] = $pageSize;
		$param['pageNum'] = $pageNum;
		$param['shopId'] = $shopId;
		$res = $product->getData($product->shopCoupons, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
		
		$returnArr = $res;
		unset($returnArr['data']);
		$returnArr['data']['shopCoupons'] = $res['data'];
		$returnArr['data']['myCoupons'] = array();
		
		if(!$isLogin)
		{
			$this->ajaxReturn($returnArr);
			exit;
		}
		
		$param['status'] = $status;
		$res = $product->getData($product->myCoupons, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
		
		$returnArr['data']['myCoupons'] = $res['data'];
		
		$this->ajaxReturn($returnArr);
		exit;
	}
	
}
