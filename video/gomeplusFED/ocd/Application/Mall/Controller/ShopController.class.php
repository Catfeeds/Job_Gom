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
use Common\Lib\Page;
class ShopController extends BaseController
{
    //商品的类型：1，全部商品；2，上新商品；3，特惠商品；4,直降商品；5，返利商品; 6,商品分类类型
    const SHOP_PRODUCT_ALL_TYPE = 1;
    const SHOP_PRODUCT_NEW_TYPE = 2;
    const SHOP_PRODUCT_CHEAP_TYPE = 3;
    const SHOP_PRODUCT_DISCOUNT_TYPE = 4;
    const SHOP_PRODUCT_RABATE_TYPE = 5;
    const SHOP_CATEGORY_ITEM_TYPE = 6;
    const PRAISE_TOPIC_TYPE = 1;
    const PRAISE_SHOP_TYPE = 0;
    const DEFAULT_TAB_PAGE_SIZE = 15;
    const SHOP_STATUS_NORMAL = 0;
    const BANER_SHOW_CATEGORY_NUM = 4;
    const SHOP_COUPON_TYPE = 1;

    /**
     * @desc 店铺详情首页
     */
    public function index()
    {
        $param = array();
        $param['shopId'] = I('param.shopid', 0, 'intval');
        if($param['shopId']<1){
            header('location: '.APP_HTTP.C('MAIN_URL'), true, 301);
            exit;
        }
        $show_more = false;
        $mc_open = true;
        if($this->userId){
            $mc_open = false;
        }
        $shop_service = D("Shop");
        $shop = $shop_service->getData($shop_service->shop_detail, $param, $mc_open);
        $param['type'] = I('param.type', 0, 'intval');
		if($shop['data']['vshopType'] == 1){
			$param['type'] = $param['type'] ? $param['type'] : 1;
		}
        $param['sort'] = 0;
        $param['sequence'] = 0;
        $param['categoryId'] = '';
        $param['keyWord'] = '';
        $param['sort'] = 2;
        $param['sequence'] = 1;
        $param['pageNum'] = I('param.page', 1, 'intval');
        $param['numPerPage'] = I('param.numPerPage', 15, 'intval');
        $param['source'] = I('param.csid', 0, 'intval');
        $category = $this->getCategory($param);
        //判断是否tab请求
        $tab_request = false;
        if($param['type']>0 && $param['type']<7){
            if($param['type']==4 ||$param['type']==5){
                $param['type'] = 1;
            }
            $param['numPerPage'] = self::DEFAULT_TAB_PAGE_SIZE;
            $this->assign('type',$param['type']);
            $tab_request = true;
        }else{
            $this->assign('type',0);
            $param['type'] = self::SHOP_PRODUCT_ALL_TYPE;
        }

        if (!$shop['success'] || !is_array($shop['data'])) {
            header('location: '.$this->mx_domain['main'], true, 301);
            exit;
        }
        $level['medal']= '';
        $level['medalNum']= 0;
        if ($shop['data']['vshopType'] == 2) {
            $medal = levelMedal($shop['data']['shopLevel']);/*获取店铺奖章*/
            if(is_array($medal))
            {
                $level['medal']= $medal['medal'];
                $level['medalNum']= $medal['medalNum'];
            }
        }
        if($shop['data']['status']<1){
            if($param['type'] != self::SHOP_CATEGORY_ITEM_TYPE){
                $productList = $shop_service->getData($shop_service->product_list, $param, true);
                if (!is_array($productList['data'])) {
                    $productList['data']['itemList'] = array();
                }
            }else{
                //店铺分类商品逻辑
                $this->assign('type',self::SHOP_CATEGORY_ITEM_TYPE);
                $param['categoryId'] = I('param.categoryId', 0, 'intval');
                $param['categoryName'] = $_GET['categoryName'];
                $param['pageSize'] = $param['numPerPage'];
                $data = $this->getCategoryItem($param);
                if(!isset($data['data']['totalQuantity']) || $data['data']['totalQuantity'] < 1 ){
                    $rediect_url = APP_HTTP.C('MALL_URL').'shop/'.$param['shopId'].'.html';
                    header('location: '.$rediect_url, true, 301);
                    exit;
                }
                $productList['data']['itemList'] = $data['data'];
                $this->assign('categoryName',xss_clean($param['categoryName']));
                $show_more = false;
                $link_url = '';
                if($data['data']['totalQuantity'] > $param['pageSize']){
                    $show_more = true;
                    $page = new Page();
                    $params_url = APP_HTTP.C('MALL_URL').'shop-'.$param['shopId'].'-'.self::SHOP_CATEGORY_ITEM_TYPE.'.html?';
                    $urlParam = 'categoryId='.$param['categoryId'].'&categoryName='.urlencode($param['categoryName']);
                    $link_url =  $page->show($data['data']['totalQuantity'],$param['pageSize'],$param['pageNum'],$params_url,$urlParam);
                }
                $this->assign('show_more',$show_more);
                $this->assign('link_url',$link_url);
            }
            if($tab_request===false) {
                $all_product = $fifer_goods =array();
                if (!empty($shop['data']['indexItemsInfo'])) {
                    $setarr = array(self::SHOP_PRODUCT_DISCOUNT_TYPE, self::SHOP_PRODUCT_RABATE_TYPE);
                    foreach ($shop['data']['indexItemsInfo'] as $key => $val) {
                        foreach ($setarr as $k => $v) {
                            if (isset($val['type']) && $val['type'] == $v) {
                                $zdata[$k] = $shop['data']['indexItemsInfo'][$key];
                                $zdata[$k]['items'] = array_slice($shop['data']['indexItemsInfo'][$key]['items'], 0, 5);
                                foreach ($zdata[$k]['items'] as $val) {
                                    $fifer_goods[$val['id']] = 1;
                                }
                                unset($setarr[$k]);
                            } else {
                                $zdata[$k] = array('title' => '', 'haveMore' => false, 'items' => array(), 'type' => $v);
                            }
                        }
                    }

                } else {
                    $zdata[0] = array(
                        'title' => '',
                        'haveMore' => false,
                        'items' => array(),
                        'type' => self::SHOP_PRODUCT_DISCOUNT_TYPE
                    );
                    $zdata[1] = array(
                        'title' => '',
                        'haveMore' => false,
                        'items' => array(),
                        'type' => self::SHOP_PRODUCT_RABATE_TYPE
                    );
                }
                $all_product = $this->getFifterProduct($fifer_goods, $productList['data']['itemList']);
                $this->assign('zdata', $zdata);
                $this->assign('productList', $all_product);
                //控制Tab选中状态
                $this->assign('type',1);
                if($shop['data']['vshopType']==2){
                    $this->assign('type',0);
                }
            }
        }
        $shop['data']['describeGrade'] = number_format($shop['data']['describeGrade'],1);
        $shop['data']['serviceGrade'] = number_format($shop['data']['serviceGrade'],1);
        $shop['data']['expressGrade'] = number_format($shop['data']['expressGrade'],1);
        //店铺优惠券
        unset($shop['data']['coupons']);
        if($shop['data']['vshopType']==2 && ($param['type']==self::SHOP_PRODUCT_ALL_TYPE || $param['type']==self::SHOP_CATEGORY_ITEM_TYPE)){
            unset($param['categoryName']);
            $shop['data']['coupons'] = $this->getshopCoupons($param);
        }
        $this->assign('category',$category['list']);
        $this->assign('category_id',$param['categoryId']);
        $this->assign('level',$level);
        $this->assign('praise', $this->getPraise($param['shopId']));
        $this->assign('shop_crumbs',crumbsMap());
        $this->assign('shop', $shop['data']);
        
        $attach = ($tab_request===true)?$param['type']:'';
        $seoMap = seoMap($attach,array("{{1}}"=>$shop['data']['vshopName']));
        
      
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);

        $this->assign('title', $seoMap['title']);
        $this->assign('shopId',  $param['shopId']);
        $this->assign('shop_status',$shop['data']['status']);
        $this->assign('sourceCode',$param['source']);
        //根据店铺类型区分美店与商家店铺详情模板
        if($shop['data']['status']>self::SHOP_STATUS_NORMAL){
            //休店中..
            $this->display('Shop/error');
        }elseif($tab_request === true){
            if(count($productList['data']['itemList'])==self::DEFAULT_TAB_PAGE_SIZE){
                $show_more = true;
            }
            $this->assign('show_more',$show_more);
            $this->assign('products',$productList['data']['itemList']);
            $this->display('Shop/category');
        } else{
            if(empty($zdata[1]['items']) && empty($zdata[0]['items']) && empty($all_product)){
                $this->display('Shop/error');
            }else{
                $show_more = true;
                $this->assign('show_more',$show_more);
                $this->display('Shop/index');
            }
        }
    }

    /**
     * 店铺详情页全部商品过滤直降和返利商品
     * @param $fifter_goods_ids 直降和返利商品id
     * @param $all_goods
     * @return array
     */
    public function getFifterProduct($fifter_goods_ids,$all_goods){
        if(!$fifter_goods_ids){
            return $all_goods;
        }
        $res = [];
        foreach ($all_goods as $goods){
            if(isset($fifter_goods_ids[$goods['id']])){
                continue;
            }
            $res[] = $goods;
        }
        return $res;
    }

    /**
     * 获取更多商品列表
     */
    public function moreList(){
        $param = array();
        $param['shopId'] = I('param.shop_id', 0, 'intval');
        $param['type'] = I('param.type', 0, 'intval');
        $param['sort'] = 0;
        $param['sequence'] = 0;
        $param['categoryId'] = '';
        $param['keyWord'] = '';
        $param['pageNum'] = I('param.pageNum', 1, 'intval');
        $param['numPerPage'] = I('param.numPerPage', 15, 'intval');
        if(!$param['shopId'] ||!$param['type']){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        $shop = D("Shop");
        if($param['type'] == 3){
            $param['sort'] = 3;
            $param['sequence'] = 1;
        }else{
            $param['sort'] = 2;
            $param['sequence'] = 1;
        }
        $productList = [];
        $productList = $shop->getData($shop->product_list, $param, false);
        if(isset($productList['data']['itemList'])){
            foreach ($productList['data']['itemList'] as &$value){
                $value['img'] = getResizeImg($value['img'],230,230);
            }
        }
        $this->response($productList);
        exit;
    }

    /**
     * 获取赞列表
     * @param $shop_id
     * @return mixed
     */
    private function getPraise($shop_id){
        $param['id'] = $shop_id;
        $param['type'] = self::PRAISE_SHOP_TYPE;//默认店铺,类型 0:店铺 1:话题 2:美店
        $praise = D("Praise");
        $result = $praise->getData($praise->praised_list,$param);
        return $result['data'];
    }

    /**
     * 获取店铺下商品分类
     */
    public function getCategory($param){
        $shop = D("ShopV2");
        $result = $shop->getData($shop->shop_categories, $param, false);
        $all_category = $cate_ids =array();
        $cate_ids = array();
        if(isset($result['data']['categories'])){
            foreach ($result['data']['categories'] as $key=>$va){
                $category_name = $va['name'];
                $va['name'] = msubstr($va['name'],0,8,'utf-8',false);
                if($va['quantity']['totalQuantity'] < 1){
                    continue;
                }
                $va['url'] = APP_HTTP.C('MALL_URL').'shop-'.$param['shopId'].'-'.self::SHOP_CATEGORY_ITEM_TYPE.'.html?categoryId='.$va['id'].'&categoryName='.urlencode($category_name);
                $all_category[] = $va;
                $cate_ids[$va['id']] = 1;
            }
        }
        return array('ids'=>$cate_ids,'list'=>$all_category);
    }


    /**
     * 获取分类下的商品列表
     */
    public function getCategoryItem($param){
        $shop = D("ShopV2");
        $param['categoryName'] = urlencode($param['categoryName']);
        $data = $shop->getData($shop->itemInShopCategory, $param, false);
        return $data;
    }

    /**
     * 获取店铺优惠券
     */
    public function getshopCoupons($param){
        $param['batchType'] = self::SHOP_COUPON_TYPE;
        $param['pageNum'] = 1;
        $param['pageSize'] = 50;
        $shop = D("ShopV2");
        $data = $shop->getData($shop->shopCoupons, $param, false);
        $coupons = array();
        if( isset( $data['data']['totalQuantity'] ) && !empty( $data['data']['coupons'] ) ) {
            $coupons = $data['data']['coupons'];
            foreach( $coupons as $ck => $cv ) {
                $start_time[ $ck ] = $cv['effectiveStartTime'];
                $valid_time[ $ck ] = $cv['effectiveEndTime'];
                $money[ $ck ] = $cv['money'];
                $cv['money'] = $cv['money']/100;
                $cv['minAmount'] =  convert_price($cv['usageRule']['minAmount']);
                $coupons[$ck] = $cv;
            }
            array_multisort( $valid_time, SORT_ASC, $money,SORT_ASC, $start_time, SORT_ASC,$coupons);
        }
        return $coupons;
    }

}
