<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                    |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                              |
* +----------------------------------------------------------------------+
* | @程序功能：商品详情页                                                |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/20-15:08                                                |
* +----------------------------------------------------------------------+
*/

namespace Mall\Controller;
use Home\Controller\BaseController;
use Common\Lib\EpiCurl;
use Common\Lib\Page;
class ProductController extends BaseController
{
	const EVALUTE_PAGE_SIZE = 6;           //商品评价每页条数
	const SHARE_REBATE_SOURCE_WEB = 30;    //分享来源，30：web
	const SHOP_STATUS_NORMAL = 0;
	const PRODUCT_STATUS_ABNORMAL = 0;
	const PRODUCT_STATUS_NORMAL = 1;
	const COUPON_PAGE_SIZE = 100;         //优惠券每页条数
    const SHOP_CATEGORY_ITEM_TYPE = 6;
    
    private $shopType = 'xpop';
    private $prodType = '1'; //商品类型，1/2/3/4：xpop商品/国美自营/国美联营/O2M商品

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
		$param['kId'] = xss_clean(I("param.kId", '', 'strval'));
		$param['onlineUserId'] = xss_clean(I("param.onlineUserId", ''));
		$param['onlineUserId'] = !$param['onlineUserId'] ? 0 : $param['onlineUserId'];
		$param['source'] = xss_clean(I("param.csid", 0));
        
        //获取收货地址
		$defaultAddr = getAddrInfo();        
        $param['addressNodeId'] = $defaultAddr['borough']['id'];
        
		if($param['itemId']<1)
		{
			$url = APP_HTTP.C('MAIN_URL');
			header('location: '.$url, true, 301);
			exit;
		}
        
		$mcOpen = true;
		if($this->userId)
		{
			$mcOpen = false;
		}
        
		$productV2 = D("ProductV2");
		$productV2->setTimeOut(25);
		$productDetail = $productV2->getData($productV2->productDetail, $param, $mcOpen);
		if(!$productDetail['success'] || !is_array($productDetail['data']))
		{
			$url = APP_HTTP.C('MAIN_URL');
			header('location: '.$url, true, 301);
			exit;
		}
		
		//处理数据里的部分价格字段
		$productDetail = $this->dealPrice($productDetail['data']);
        
        //商品类型，1/2/3/4：xpop商品/国美自营/国美联营/O2M商品，O2M商品按xpop商品类型展示
		$onLineArr = array(2, 3);
        if(!empty($productDetail['item']['type']) && in_array($productDetail['item']['type'], $onLineArr))
        {
            $this->prodType = $productDetail['item']['type'];
        }
		
        //商品价格
		$skuInfo = array(
			'price' => isset($productDetail['item']['price']) ? $productDetail['item']['price'] : 0,
			'salePrice' => isset($productDetail['item']['salePrice']) ? $productDetail['item']['salePrice'] : 0,
            'skuHighestPrice' => isset($productDetail['item']['skuHighestPrice']) ? $productDetail['item']['skuHighestPrice'] : 0,
            'skuHighestSalePrice' => isset($productDetail['item']['skuHighestSalePrice']) ? $productDetail['item']['skuHighestSalePrice'] : 0,
			'skuIdDefault' => 0,
		);
		
		//促销
		$promotion =  array();
		if($productDetail['promotionMarks']['shareProspectiveRebateAmount'])
		{
			$promotion[] = '<em class="icon-fan">返</em>分享且被购买最高可得<span class="red pl6">'
            .number_format(convert_price($productDetail['promotionMarks']['shareProspectiveRebateAmount']), 2).'</span>国美币';
		}
		if($productDetail['promotionMarks']['purchaseDirectlyProspectiveRebateAmount'])
		{
			$promotion[] = '<em class="icon-fan">返</em>购买该商品最高可得<span class="red pl6">'
            .number_format(convert_price($productDetail['promotionMarks']['purchaseDirectlyProspectiveRebateAmount']), 2).'</span>国美币';
		}
		
		//促销返利标识，1：促销返利，0：不促销返利，默认0
		$isRebate = 0;
		if(!empty($promotion))
		{
			$isRebate = 1;
		}
		
		//判断店铺类型
		$shopType = 'xpop';
		if(isset($productDetail['mshop']) && $productDetail['mshop']['type'] == 'mShop')
		{
			$shopType = 'mShop';
            $this->shopType = $shopType;
		}
		
		//处理商品状态
		if($shopType == 'xpop')
		{
			if($productDetail['shop']['status'] !== self::SHOP_STATUS_NORMAL)
			{
				$productDetail['item']['status'] = self::PRODUCT_STATUS_ABNORMAL;
			}
		}
		else if($shopType == 'mShop')
		{
			if($productDetail['mshop']['status'] !== self::SHOP_STATUS_NORMAL)
			{
				$productDetail['item']['status'] = self::PRODUCT_STATUS_ABNORMAL;
			}
		}
		
		$shop['shopType'] = $shopType;
		$shop['shop'] = $productDetail['shop'];
		$shop['shopLevel'] = $productDetail['shopLevel'];
		$shop['shopCollectionQuantity'] = $productDetail['shopCollectionQuantity'];
		$shop['shopItemsQuantity'] = $productDetail['shopItemsQuantity'];
		
		if($shopType == 'mShop')
		{
			$shop['shop'] = $productDetail['mshop'];
			$shop['xshop'] = $productDetail['shop'];
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
		
		$extraRes = $this->getExtraInfo($param['shopId'], $param['itemId']);
        
        //商品分类
        $prodCtgyArr = array();
        if($shopType == 'xpop')
        {
            $prodCtgyRes = json_decode($extraRes['prodCtgy'], true);
            $prodCtgyArr = $this->dealProdCtgy($prodCtgyRes, $param['shopId']);
        }
		
        //优惠券
		$shopCoupons = json_decode($extraRes['shopCoupons'], true);		
		//如果是xpop店铺,且有可用的优惠券时,显示优惠券
        $showCoupon = 0;
        $shopCouponsArr = array();
		if($shopType == 'xpop' && $shopCoupons['data']['totalQuantity'])
		{
			$showCoupon = 1;
			foreach($shopCoupons['data']['batches'] as $shopCouponsval)
			{
				$shopCouponsArr[] = floor($shopCouponsval['money'] / 100);
			}
		}
		
		//判断商品是否已被收藏
		$isCollectProduct = 0;
		if($this->userId)
		{
			$prodCollect = json_decode($extraRes['prodCollect'], true);
			if($prodCollect['message'] == '' && $prodCollect['data']['result'] == true)
			{
				$isCollectProduct = 1;
			}
		}
		
		//判断店铺是否已被收藏
		$vshopCollect = 0;
		if($this->userId)
		{
			$shopCollect = json_decode($extraRes['shopCollect'], true);
			if($shopCollect['message'] == '' && $shopCollect['data']['result'] == true)
			{
				$vshopCollect = 1;
			}
		}
        
        //商品评论数
        $itemCommentCount = 0;        
        $itemCommentRes = json_decode($extraRes['itemCommentCount'], true);
        if($itemCommentRes['message'] == '')
        {
            $itemCommentCount = $itemCommentRes['data']['count'];
        }
        
		
		//描述图片不存在，则显示主图图片
		if(!$productDetail['item']['detailImages'])
		{
			$productDetail['item']['detailImages'] = $productDetail['item']['images'];
		}
        
		//商品参数属性
		$skuList = $this->getSkuAttr($productDetail['item']['skus']);
		
		$imgList = array();
		if($productDetail['item']['images'])
		{
			foreach ($productDetail['item']['images'] as $key=>$img)
			{
				$imgList[] = array('id'=>'','img'=>$img);
			}
		}
		
		//处理页面默认图片及默认属性
        $goodsThum = '';
		$dealDefaultRes = $this->dealDefault($productDetail['item']['skus']);
        $imgDefault = '';
		if($dealDefaultRes)
		{
            $imgDefault = $dealDefaultRes['imgDefault'];
			$skuInfo['skuIdDefault'] = $dealDefaultRes['skuIdDefault'];
           	$skuInfo['price'] = $dealDefaultRes['priceDefault'];
			$skuInfo['salePrice'] = $dealDefaultRes['salePriceDefault'];
            $skuInfo['skuHighestPrice'] = $dealDefaultRes['priceDefault'];
            $skuInfo['skuHighestSalePrice'] = $dealDefaultRes['salePriceDefault'];
			$goodsThum = getResizeImg($dealDefaultRes['imgDefault'], 80, 80);
		}
        
        //判断价格显示样式
        $skuInfo['priceShow'] = $skuInfo['price'] < $skuInfo['skuHighestPrice'] ? $skuInfo['price'].'~'.$skuInfo['skuHighestPrice'] : $skuInfo['price'];
        $skuInfo['salePriceShow'] = $skuInfo['salePrice'] < $skuInfo['skuHighestSalePrice'] ? $skuInfo['salePrice'].'~'.$skuInfo['skuHighestSalePrice'] : $skuInfo['salePrice'];
        
        //挂靠图片的属性如果值只有一个，则应切换页面显示图片及购物车动画图片
        if(count($skuList['colorShow']) == 1 && !$dealDefaultRes)
        {
            $colorImgArr = array_values($skuList['colorShow']);
            $imgDefault = $colorImgArr[0];
            $goodsThum = getResizeImg($colorImgArr[0], 80, 80);
        }
        
		$qrUrl = APP_HTTP.C('WAP_URL').'item/'.$param['shopId'].'-'.$param['itemId'].'.html?h=product&p=detail&productId='.$param['itemId'].'&shopId='.$param['shopId'];
		if($param['kId'])
		{
			$qrUrl .= '&kid='.$param['kId'];
		}
        $fid = orderFlowidGen();
        
		//推荐人user_id
		$this->assign('onlineUserId', $param['onlineUserId']);
		$this->assign('kid',$param['kId']);
		$this->assign('shopId', $param['shopId']);
		$this->assign('productId', $param['itemId']);
		$this->assign('sourceCode',$param['source']);
		$this->assign('defaultAddr',$defaultAddr);
        $this->assign('prodType', $this->prodType);
		$this->assign('skuInfo',$skuInfo);
		$this->assign('promotion',$promotion);
		$this->assign('shopInfo',$shop);
		$this->assign('level',$level);
        $this->assign('prodCtgyArr', $prodCtgyArr);
        $this->assign('showCoupon', $showCoupon);
        $this->assign('shopCouponsArr', $shopCouponsArr);
        $this->assign('isCollectProduct', $isCollectProduct);
		$this->assign('vshopCollect', $vshopCollect);
        $this->assign('itemCommentCount', $itemCommentCount);
		$this->assign('skuList',$skuList);
		$this->assign('imgList',$imgList);
        $this->assign('imgDefault', $imgDefault);
		$this->assign('goodsThum',$goodsThum);
		$this->assign('qrUrl',$qrUrl);
		$this->assign('isCross',$productDetail['item']['isUserIdentityRequired']);
		$this->assign('productInfo',$productDetail);
		$this->assign('fid', $fid);
		$this->assign('prodCrumbs',crumbsMap());
		$seoMap = seoMap('',array("{{1}}"=>xss_clean($productDetail['item']['name'])));
		$this->assign('title', $seoMap['title']);
		$this->assign('keywords',$seoMap['keywords']);
		$this->assign('description',$seoMap['description']);
		$this->assign('isRebate',$isRebate);
		$this->display('Product/index');
	}
	
	/**
	 * 处理价格
	 * @param array $productDetail
	 * @return array
	 */
	private function dealPrice($productDetail)
	{
		$productDetail['item']['price'] = convert_price($productDetail['item']['price']);
		$productDetail['item']['salePrice'] = convert_price($productDetail['item']['salePrice']);
		$productDetail['item']['skuHighestPrice'] = convert_price($productDetail['item']['skuHighestPrice']);
        $productDetail['item']['skuHighestSalePrice'] = convert_price($productDetail['item']['skuHighestSalePrice']);
		
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
				$val['price'] = convert_price($val['price']);
				$val['salePrice'] = convert_price($val['salePrice']);
				$val['skuHighestPrice'] = convert_price($val['skuHighestPrice']);
				unset($val);
			}
		}		
		
		return $productDetail;
	}

	/**
	 * 获取sku属性值
	 * @param array $skuList
	 * @return array
	 */
	private function getSkuAttr($skuList=array())
	{
		$skuArr = array(
			'pageShow' => '',
			'jsonShow' => array(),
            'colorShow' => array()
		);
          
		if(!$skuList || empty($skuList[0]['attributes']))
		{
			return $skuArr;
		}
		
		foreach($skuList as $val)
		{
			if(isset($val['attributes']) && !empty($val['attributes']))
			{
				foreach($val['attributes'] as $itemVal)
				{
					$skuArr['pageShow'][$itemVal['name']][$itemVal['value']] = $itemVal['value'];
				}
			}
		}
        
        $skuKeyArr = array_keys($skuArr['pageShow']);
        
        foreach ($skuList as $skuVal)
        {
            $keyStr = '';
            $valArr = array();
            $valArr['id'] = $skuVal['id'];
            $valArr['image'] = getResizeImg($skuVal['images'][0], 400, 400);
            $valArr['imageBig'] = getResizeImg($skuVal['images'][0], 800, 800);
            $valArr['price'] = $skuVal['price'];
            $valArr['salePrice'] = $skuVal['salePrice'];
            $valArr['stock'] = $skuVal['stock'];
            foreach($skuKeyArr as $key => $keyVal)
            {
                foreach($skuVal['attributes'] as $attrVal)
                {
                    if($keyVal == $attrVal['name'])
                    {
                        $keyStr .= '!#'.$key.$attrVal['value'];
                        if(!isset($skuArr['colorShow'][$key.$attrVal['value']]) && $attrVal['isImageRelated'])
                        {
                            $skuArr['colorShow'][$key.$attrVal['value']]['image'] = getResizeImg($skuVal['images'][0], 400, 400);
                            $skuArr['colorShow'][$key.$attrVal['value']]['imageBig'] = getResizeImg($skuVal['images'][0], 800, 800);
                        }
                        break;
                    }
                }
            }
            $keyStr = trim($keyStr, '!#');
            $skuArr['jsonShow'][$keyStr] = $valArr;
        }
        
		return $skuArr;
	}
	
	/**
	 * 获取页面的默认属性值
	 * @param array $skus
	 * @param integer $skuId
	 * @return mixed
	 */
	private function dealDefault($skus = array())
	{
		if(empty($skus) || count($skus) > 1)
		{
			return false;
		}
        
		$returnArr = array();
		
		$returnArr['imgDefault'] = $skus[0]['images'][0];
		$returnArr['skuIdDefault'] = $skus[0]['id'];
        $returnArr['priceDefault'] = $skus[0]['price'];
        $returnArr['salePriceDefault'] = $skus[0]['salePrice'];
		
		return $returnArr;
	}

	/**
	 * 获取店铺下的商品分类、商品收藏数，判断店铺是否有优惠券，商品、店铺是否收藏
	 * @param $shopId
	 * @param $proId
	 * @return mixed
	 */
	private function getExtraInfo($shopId,$proId)
	{
		import('Common.Lib.EpiCurl');
		$args = [
			'shopCollect' =>  [
				'shopId' => $shopId,
			],
			'prodCollect' => [
				'itemId' => $proId,
				'shopId' => $shopId,
			],
			'shopCoupons' => [
				'batchType' => 1,
				'pageSize' => 2,
				'pageNum' => 1,
				'shopId' => $shopId,
			],
            'prodCtgy' => [
                'shopId' => $shopId,
            ],
            'itemCommentCount' => [
                'itemId' => $proId,
            ],
		];
		$productV2 = D("ProductV2");
        $shopV2    = D("ShopV2");
                
		$kv_params = [
			'shopCoupons' => ['url' => connectParam($shopV2, $shopV2->shopCoupons, $args['shopCoupons'], 2)],
            'itemCommentCount' => ['url' => connectParam($productV2, $productV2->itemCommentCount, $args['itemCommentCount'], 2)],
		];
		if($this->userId)
		{
			$kv_params['shopCollect'] = array('url' => connectParam($shopV2, $shopV2->getShopCollect
			, $args['shopCollect'], 2));
			$kv_params['prodCollect'] = array('url' => connectParam($productV2, $productV2->getProdCollect
			, $args['prodCollect'], 2));
		}
        if($this->shopType == 'xpop')
        {
            $kv_params['prodCtgy'] = array('url' => connectParam($shopV2, $shopV2->shop_categories
			, $args['prodCtgy'], 2));
        }
		$res = multi_curl($kv_params);
		return $res;
	}
    
    /**
     * 处理商品详情页的商品分类
     */
    private function dealProdCtgy($prodCtgyRes, $shopId)
    {
        $returnArr = array();
        if($prodCtgyRes['message'] == '' && !empty($prodCtgyRes['data']['categories'])){
            foreach ($prodCtgyRes['data']['categories'] as $val){
                $categoryName = $val['name'];
                $val['name'] = msubstr($val['name'], 0, 8, 'utf-8', false);
                if($val['quantity']['totalQuantity'] < 1){
                    continue;
                }
                $val['url'] = APP_HTTP.C('MALL_URL').'shop-'.$shopId.'-'.self::SHOP_CATEGORY_ITEM_TYPE.'.html?categoryId='.$val['id'].'&categoryName='.urlencode($categoryName);
                $returnArr[] = $val;
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
     * 店内推荐+商品推荐
     * @param integer $itemId 商品ID
     * @param integer $shopId 店铺ID
     * @retrun string
     */
     public function recommend()
     {
        $returnArr = array();
        $param = array();
        
        $returnArr['success'] = true;
        $returnArr['code'] = 200;
        $returnArr['message'] = '成功';
        
		$param['itemId'] = I("param.itemId", 0, 'intval');
		$param['shopId'] = I("param.shopId", 0, 'intval');        
        if(!$param['shopId'] || !$param['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
        
        //店内推荐
		$shopRecom = $this->shopRecom($param);
		if(!$shopRecom['success'])
		{
			$this->ajaxReturn($shopRecom);
			exit;
		}
        $returnArr['data']['shopRecom'] = $shopRecom['data'];
        
        //商品推荐
        $prdoRecom = $this->prodRecom($param, $shopRecom['data']);
        if(!$prdoRecom['success'])
		{
			$this->ajaxReturn($prdoRecom);
			exit;
		}        
        $returnArr['data']['prodRecom'] = $prdoRecom['data'];
        
        $this->ajaxReturn($returnArr);
     }
    
	/**
	 * 店内推荐
     * @param array $param
	 * @return array
	 */
	private function shopRecom($param)
	{
		$param['pageNum'] = 1;
		$param['pageSize'] = 4;
		
		$shop = D('ShopV2');
		
		$res = $shop->getData($shop->productList, $param);
		
		if(!$res['success'])
		{
			return $res;
		}
		
		foreach($res['data']['items'] as $key => $val)
		{
			if($val['itemId'] == $param['itemId'])
			{
				unset($res['data']['items'][$key]);
				continue;				
			}
			$res['data']['items'][$key] = $this->dealPrice($val);
			$res['data']['items'][$key]['item']['mainImage'] = getResizeImg($val['item']['mainImage'], 230, 230);
            $res['data']['items'][$key]['item']['discountFlag'] = isset($val['item']['isDiscount']) ? $val['item']['isDiscount'] : false;
            $res['data']['items'][$key]['item']['rebateFlag'] = $val['promotionMarks']['itemProspectiveRebateAmount'] ? true : false;
            unset($res['data']['items'][$key]['promotionMarks']);
            unset($res['data']['items'][$key]['item']['skus']);
		}
		$res['data']['items'] = array_merge($res['data']['items']);
		$res['data']['items'] = array_slice($res['data']['items'], 0, 3);
		
		return $res;
	}
	
	/**
	 * 商品推荐
     * @param array $param
     * @param array $shopRecom
	 * @return array
	 */
	private function prodRecom($param, $shopRecom)
	{
		$param['pageNum'] = 1;
		$param['pageSize'] = 7;
		
		$product = D('ProductV2');
		
		$res = $product->getData($product->recommend, $param);
		
		if(!$res['success'])
		{
			return $res;
		}
		
        $itemIdArr = array();
        if(!empty($shopRecom['items']))
        {
            foreach($shopRecom['items'] as $val)
            {
                $itemIdArr[] = $val['item']['id'];
            }
        }
        
		foreach($res['data']['items'] as $key => &$val)
		{
            if(in_array($val['id'], $itemIdArr))
            {
                unset($res['data']['items'][$key]);
                continue;
            }
			$val['price'] = convert_price($val['price']);
			$val['salePrice'] = convert_price($val['salePrice']);
			$val['skuHighestPrice'] = convert_price($val['skuHighestPrice']);
			$val['mainImage'] = getResizeImg($val['mainImage'], 230, 230);
            $val['discountFlag'] = isset($val['isDiscount']) ? $val['isDiscount'] : false;
            $val['rebateFlag'] = $val['promotionMarks']['itemProspectiveRebateAmount'] ? true : false;
            unset($res['data']['items'][$key]['promotionMarks']);
            unset($val);
		}
        $res['data']['items'] = array_merge($res['data']['items']);
		$res['data']['items'] = array_slice($res['data']['items'], 0, 4);
		
		return $res;
	}

	/**
	 * 商品评价列表获取
     * @param integer $pageSize 每页条数
     * @param integer $page     页码
     * @param integer $itemId   商品ID
	 * @return array
	 */
	public function getEvaluate()
	{
		$param = array();
		$param['itemId'] = I('param.itemId', 0, 'intval');
		$param['pageNum'] = I('param.page', 1, 'intval');
		$param['pageSize'] = self::EVALUTE_PAGE_SIZE;
                
		if(!$param['itemId'])
		{
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
                
		$productV2 = D("ProductV2");
                
		$itemComments = $productV2->getData($productV2->itemComments, $param, false);        
        if(!$itemComments['success'])
        {
            $this->ajaxReturn($itemComments);
        }
        
        $itemCommentCount = $productV2->getData($productV2->itemCommentCount, $param, false);
        if(!$itemCommentCount['success'])
        {
            $this->ajaxReturn($itemCommentCount);
        }
        
		$charSet = C('DEFAULT_CHARSET');
        $hideChars = '***';
		foreach($itemComments['data']['itemComments'] as &$val)
		{
            $val['createTime'] = date('Y-m-d H:i', substr($val['createTime'], 0, 10));
            isset($val['replyTime']) ? $val['replyTime'] = date('Y-m-d H:i', substr($val['replyTime'], 0, 10)) : '';
			$val['creater']['facePicUrl'] = getResizeImg($val['creater']['facePicUrl'], 32, 32);
            $lastWord = '';
		    if(mb_strlen($val['creater']['nickname'], $charSet) > 1)
            {
                $lastWord = msubstr($val['creater']['nickname'], -1, 1, $charSet, false);
            }			
			$val['creater']['nickname'] = $hideChars.$lastWord;
			
			//处理评论图片
			$commentImg = array();
			if(!empty($val['images']))
			{
				foreach($val['images'] as $imgVal)
				{
					$commentImg[] = array(
						'origin' => $imgVal,
						'small' => getResizeImg($imgVal, 75, 75)
					);
				}
				$val['images'] = $commentImg;
			}
			unset($val);
		}
        
        //分页
        $page = new Page();
        $paramsUrl = 'javascript:;';
        $linkUrl =  $page->showNofr($itemCommentCount['data']['count'], $param['pageSize'], $param['pageNum'], $paramsUrl);
        $itemComments['data']['linkUrl'] = $linkUrl;
        
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
	 * @param $status		Integer	非必填	优惠券使用状态：1：未使用；2：已使用；3；4：过期
	 * @param $pageSize		Integer	非必填	每页条数
	 * @param $pageNum		Integer	非必填	第几页
	 * @param $shopId		Long	必填	店铺ID
	 * @param $isLogin		Integer	非必填	是否登录：1登录，0未登录
	 */
	public function coupons()
	{
		$pageSize 	= I('param.pageSize', self::COUPON_PAGE_SIZE, 'intval');
		$pageNum 	= I('param.pageNum', 1, 'intval');
		$shopId 	= I('param.shopId', 0, 'intval');
		$isLogin 	= I('param.isLogin', 0);
		$status 	= 1;
		$batchType 	= 1;
        
		if(!$shopId)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
		
		if($isLogin && empty($this->userId))
		{
			$code = intval(\Think\ErrorCode::USER_NO_LOGIN);
			$message = '登录失效，请重新登录';
			$this->outJSON($code, $message);
			exit;
		}
		
        if($pageSize > self::COUPON_PAGE_SIZE)
        {
            $pageSize = self::COUPON_PAGE_SIZE;
        }
        
		$param = array();
		$returnArr = array();
		
		//店铺优惠券
		$param['batchType'] = $batchType;
		$param['pageSize'] = $pageSize;
		$param['pageNum'] = $pageNum;
		$param['shopId'] = $shopId;
        
		$shopCouponsRes = $this->shopCoupons($param);
		
		if(!$shopCouponsRes['success'])
		{
			$this->ajaxReturn($shopCouponsRes);
			exit;
		}
		
		$returnArr = $shopCouponsRes;
		unset($returnArr['data']);
		$returnArr['data']['shopCoupons'] = $shopCouponsRes['data'];
		$returnArr['data']['myCoupons'] = array();
		
		if(!$isLogin)
		{
			$this->ajaxReturn($returnArr);
			exit;
		}
        
        //个人优惠券
        $param['status'] = $status;
        
        $userCouponsRes = $this->userCoupons($param);
		
		if(!$userCouponsRes['success'])
		{
			$this->ajaxReturn($userCouponsRes);
			exit;
		}
		
		$returnArr['data']['myCoupons'] = $userCouponsRes['data'];
		
		$this->ajaxReturn($returnArr);
		exit;
	}
    
    /**
	 * 店铺优惠券
	 * @param array $param
	 * @return array
	 */
    private function shopCoupons($param)
    {
        $ShopV2 = D("ShopV2");
        
        $res = $ShopV2->getData($ShopV2->shopCouponsUser, $param);
        
        if(!$res['success'] || empty($res['data']['batches']) || $res['data']['totalQuantity'] == 0)
        {
            return $res;
        }
        
        foreach($res['data']['batches'] as $key => $val)
        {
            if(!empty($val['quantities']) && $val['quantities'][0]['remainingReceiveQuantity'] < 1)
            {
                unset($res['data']['batches'][$key]);
            }
        }
        
		$res['data']['batches'] = array_values($res['data']['batches']);
        $res['data']['totalQuantity'] = count($res['data']['batches']);
        
        return $res;
    }
    
    /**
	 * 个人优惠券
	 * @param array $param
	 * @return array
	 */
    private function userCoupons($param)
    {
        $userCoupons = D('Ucenter/Promotion');
		
		$res = $userCoupons->getData($userCoupons->couponInfo, $param);
        
        if(!$res['success'] || empty($res['data']['userCoupons']) || $res['data']['totalQuantity'] == 0)
        {
            return $res;
        }
        
        //批次号及优惠券可用时间（只判断开始时间，精确到年月日）相同的优惠券合并显示
        $couponsArr = array();
        foreach($res['data']['userCoupons'] as $val)
        {
            $key = $val['batchSn'].'_'.date('Y-m-d', substr($val['validStartTime'], 0, 10));
            if(isset($couponsArr[$key]))
            {
                $couponsArr[$key]['couponsQuantity'] ++;
            }
            else
            {
                $couponsArr[$key] = $val;
                $couponsArr[$key]['couponsQuantity'] = 1;
            }
        }
        $res['data']['userCoupons'] = array_values($couponsArr);
        $res['data']['totalQuantity'] = count($couponsArr);
        
        return $res;
    }
	
    /**
     * 获取国美在线的SKU级区域库存、价格信息
     * @param   $itemId         Integer 商品ID            必填
     * @param   $skuId          Integer skuID             必填
     * @param   $addressNodeId  Integer 三级区域编码      必填
     * @return  String
     */
    public function getCurrSkuInfo()
    {
        $param = array();
        $param['itemId'] = I('get.itemId', 0, 'intval');
        $param['skuId'] = I('get.skuId', 0, 'intval');
        $param['addressNodeId'] = I('get.addressNodeId', 0, 'intval');
        
        if(!$param['itemId'] || !$param['skuId'] || !$param['addressNodeId'])
        {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
        }
        
        $product = D("ProductV2");
        $res = $product->getData($product->stockAndPrice, $param);
		
		if(!$res['success'])
		{
			$this->ajaxReturn($res);
			exit;
		}
        
        $res['data']['price'] = convert_price($res['data']['price']);
        $res['data']['salePrice'] = convert_price($res['data']['salePrice']);
        $skuArr = $res['data']['skus'][0];
        $skuArr['price'] = convert_price($skuArr['price']);
        $skuArr['salePrice'] = convert_price($skuArr['salePrice']);
        $res['data']['skus'] = $skuArr;
        
        $this->ajaxReturn($res);
    }
}

