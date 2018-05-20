<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ShopController.class1.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：商品详情页                                                  |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/20-15:08                                                |
* +----------------------------------------------------------------------+
* | History
* |     2017-02-16  liuzhen PC融合只保留美店相关业务代码
* +----------------------------------------------------------------------+
*/

namespace Mall\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;
use Group\Controller\PubliserController;
class ShopController extends BaseController
{
    //商品的类型：1，全部商品；2，上新商品
    const SHOP_PRODUCT_ALL_TYPE = 1;
    const SHOP_PRODUCT_NEW_TYPE = 2;
    const DEFAULT_TAB_PAGE_SIZE = 20;
    const SHOP_STATUS_NORMAL = 0;
    const PAGE_SIZE = 20;  #搜索每页显示20条
    const CACHE_TIME = 28800;//缓存时间
    
    //目前可以处理的tab类型,1：全部商品，2：上新商品 3：美店说
    private $tabArr = array(1, 2 , 3);
    
    //二级城市ID
    private $addressId = '11010000';
    
    public function __construct(){
        parent::__construct();

        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];
    }

    /**
     * V2代码整理 @by maoxiaoqi
     * 这里基础代码不动,如果以后增加业务逻辑,建议将业务代码拆分
     * @desc 店铺详情首页
     */
    public function index()
    {
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        $param = array();

        $shopId = I('param.shopid', 0, 'intval');
        $type = I('param.type', 1, 'intval');
        $pageNum = 1;
        $pageSize = self::DEFAULT_TAB_PAGE_SIZE;

        if($shopId < 1)
        {
            header('location: '.APP_HTTP.C('GOME')['URL']['MALL_ITEM_URL'], true, 301);
            exit;
        }

        if(!in_array($type, $this->tabArr))
        {
            header('location: '.APP_HTTP.C('GOME')['URL']['MALL_ITEM_URL'], true, 301);
            exit;
        }
        
        //获取店铺详情
        $shopInfo = $this->_getShop($shopId);
        
        //判断店铺类型，xpop店铺不在Plus展示
        if( !isset( $shopInfo['data']['type'] ) || $shopInfo['data']['type'] !== 'mShop' )
        {
            header('location: '.APP_HTTP.C('MAIN_URL'), true, 301);
            exit;
        }

        $param['sort'] = 0;
        $param['keyWord'] = '';
        $param['pageNum'] = $pageNum;
        $param['numPerPage'] = $pageSize;
        $param['shopId'] = $shopId;

        if($shopInfo['data']['status'] < 1)
        {
            //这里数据是根据tab标签显示的
            if($type == 1)
            {
                //全部商品
                $param['sort'] = 0;
                $allItem = $this->allItem($param)['data'];
            }
            elseif($type == 2)
            {
                //上新商品
                $param['sort'] = 3;
                $productList = $this->allItem($param)['data'];
                $result = $this->_getLatest($shopId, $productList);
                $productNum = $result['productNum'];
                $productItem = $result['productItem'];
            }
            elseif($type == 3)
            {
                //美店说
                $mshopTopic = D('MshopTopic');
                $param = array();
                $param['mshopId'] = $shopId;
                $param['pageNum'] = I('param.page',1);
                $param['areaCode'] = $this->addressId;
                //美店说列表
                $mshopList = $mshopTopic->get_topics($param['mshopId'],$param['pageNum'],$param,true) ;
                $param['pageSize'] = 10;

                //分页
                $linkUrl = '';
                if( $mshopList['totalTopicQuantity'] > $param['pageSize'] ) {
                    $page = new Page();
                    $url = $this->mx_domain['meidian'] . 'shop-' . $shopId . '-' . $type;
                    $params = '';
                    $url_extension = '.html';
                    $page->show_more = false;
                    $page->show_style = 2;
                    $page->delimiter = '-';
                    $page->params = ['first_label' => '首页', 'last_label' => '最后一页'];
                    $linkUrl = $page->display($mshopList['totalTopicQuantity'], $param['pageSize'], $param['pageNum'], $url, $params, $url_extension);
                }
                //客态页判断当前访问是否是店主
                $is_author = false;
                if( ($this->userInfo['loginStatus'] ==3 && $this->userId)  && $shopInfo['data']['user']['id'] == $this->userId ){
                    $is_author = true;
                }

            }

        }
        
        $this->assign('type', $type);
        
        $attach = $type ? $type : '';
        $seoMap = seoMap($attach, array("{{1}}"=>$shopInfo['data']['name']));
        $this->assign('keywords', $seoMap['keywords']);
        $this->assign('description', $seoMap['description']);
        $this->assign('title', $seoMap['title']);

        $this->assign('shop_crumbs', crumbsMap(array(
            "{{1}}" => APP_HTTP_GOME.C('GOME')['URL']['MAIN_URL']
        )));
        $this->assign('shop', $shopInfo['data']);
        $this->assign('shopId', $shopId);
        $this->assign('weixin_share', APP_HTTP.C('GOME')['URL']['MSHOP_URL'].'mshop-'.$param['shopId'].'.html');
        #拼接店铺二维码
        $shopQrCode = $this->getShopQrCode($shopId);
        $this->assign('shopQrCode', $shopQrCode);

        //根据店铺类型区分美店与商家店铺详情模板 
        if($shopInfo['data']['status'] > self::SHOP_STATUS_NORMAL)
        {
            //休店中..
            $this->display('Shop/error');
        }
        else
        {
            $showMore = 0;
            //根据tab标签切换模板
            switch($type)
            {
                case 1:
                    //全部商品
                    if($allItem['count'] > $pageSize)
                    {
                        $showMore = 1;
                    }
                    $this->assign('allItem', $allItem);
                    $this->assign('showMore', $showMore);
                    $this->display('Shop/category');
                    break;
                case 2:
                    //上新商品
                    if($productNum == $pageSize && $productList['count'] > $pageSize)
                    {
                        $showMore = 1;
                    }
                    $this->assign('products', $productItem);
                    $this->assign('showMore', $showMore);
                    $this->display('Shop/category_news');
                    break;
                case 3:
                    //美店说
                    $this->assign('mshopList',$mshopList);
                    $this->assign('linkUrl',$linkUrl);
                    $this->assign('is_author',$is_author);
                    $this->display('Shop/topic_list');
                    break;
            }
        }
    }


    /*
     * 获取店铺信息
     * @param $shopId int 店铺ID
     * @return array
     * */
    private function _getShop($shopId)
    {
        //是否开启MC
        $shop = D("ShopV2");

        //获取店铺详情
        $shopRes = $shop->getData(
            $shop->shopDetail,
            array(
                'id' => $shopId
            ),
            false
        );
        
        if(!$shopRes['success'] || !is_array($shopRes['data']))
        {
            header('location: '.APP_HTTP.C('GOME')['URL']['MALL_ITEM_URL'], true, 301);
            exit;
        }
        
        return $shopRes;
    }

    /*
     * 全部商品
     * 根据不同类型店铺,加载不同数据
     * @by maoxiaoqi
     * @param $paramArr array 集中数据,在进入到当前方法 会重构（已重构为准）
     * @return void array || boolean
     * */
    public function allItem($paramArr)
    {
        $errArr = array(
            'success' => false,
            'code' => 500,
            'message' => '参数错误',
            'data' => (object)array()
        );
        
        if(empty($paramArr))
        {
            return $errArr;
        }
        
        $param = array();
        $shop = D('ShopV2');
        
        $param['sort'] = isset($paramArr['sort']) ? $paramArr['sort'] : 0;
        $param['shopId'] = $paramArr['shopId'];
        $param['pageNum'] = $paramArr['pageNum'];
        $param['pageSize'] = $paramArr['numPerPage'];
        $param['addressId'] = $this->addressId;

        $url = $shop->search_item_in_mshop;
                
        if(!isset($url))
        {
            return $errArr;
        }

        $data = $shop->getData($url, $param);
        
        //这里暂时留错误处理,不知如何跳转
        return $data;
    }
    
    /**
     * 上新商品格式化
     * @param Int $shopid
     * @param Array $productList
     * @return array
     */
    private function _getLatest($shopid, $productList)
    {
        $productItem = array();
        $days = 0;
        $productNum = 0;
        if(isset($productList['items']) && !empty($productList['items'])){
            foreach($productList['items'] as $pk => $pv)
            {
                //处理日期,这里讲原时间戳修改成日期
                $_time = isset($pv['onShelfAt']) ? substr($pv['onShelfAt'], 0, 10) : '';
                $date = !empty($_time) ? date('m月d日', $_time) : '';
                $dateKey = !empty($_time) ? date('Ymd', $_time) : '';
                $pv['onShelfAt'] = $date;
                $productItem["YMD".$dateKey]['title'] = $date;
                $productItem["YMD".$dateKey]['sub_title'] = "YMD".$dateKey;
                $productItem["YMD".$dateKey]['data'][] = $pv;
            }
            foreach($productItem as $key => $item)
            {
                if($days == 7)
                {
                    unset($productItem[$key]);
                }
                else
                {
                    $days++;
                    $productNum = $productNum + count($item['data']);
                }
            }
        }
        return array('productNum' => $productNum, 'productItem' => $productItem);
        //                     echo $productNum."---";
        //                     echo $days;exit;
        //                     print_r($product_item);exit;
        //（目前只用在这里）,现在是v1接口  后续需要替换v2 ====== 这个方法原来是在else里
        /* $productList = $this->get_shop_item_lst( $param );
         $product_item = [];
         if( isset( $productList['data']['itemList'] ) ) {
         foreach( $productList['data']['itemList'] as $pk => $pv ) {
         //处理日期,这里讲原时间戳修改成日期
         $_time = ( isset( $pv['onShelfTime'] ) ) ? substr( $pv['onShelfTime'], 0, 10 ) : '' ;
         $date = ( !empty( $_time ) ) ? date( 'm月d日', $_time ) : '' ;
         $dateKey = ( !empty( $_time ) ) ? date( 'Ymd', $_time ) : '' ;
         $pv['onShelfTime'] = $date;
         $product_item[ "YMD".$dateKey ]['title'] = $date;
         $product_item[ "YMD".$dateKey ]['data'][] = $pv;
         }
         } */
        
        //目前看上新商品返回的数据是按照 上架时间,如后续有变动,请手动增加排序
    }
    
    /*
     * 获取店铺二维码地址
     * */
    private function getShopQrCode($shopid)
    {
        if(empty($shopid))
        {
            return '';
        }
        else
        {
            $url = APP_HTTP.C('GOME')['URL']['MSHOP_URL'].'mshop-'.$shopid.'.html';
            return APP_HTTP.C('MEIDIAN_URL').'ajax/qrcode/urlcode?url='.urlencode($url);
        }
    }

    /*
     * 为JS提供的获取更多商品列表 
     * tabId：商品的类型：1全部商品;2上新商品
     * wiki:http://wiki.intra.gomeplus.com/pages/viewpage.action?pageId=20418220
     * */
    public function moreList()
    {
        $param = array();
        $param['shopId'] = I('param.shopId', 0, 'intval');
        $param['tabId'] = I('param.tabId', 0, 'intval');
        $param['pageNum'] = I('param.pageNum', 2, 'intval');
        $param['numPerPage'] = I('param.pageSize', self::DEFAULT_TAB_PAGE_SIZE, 'intval');
        if($param['numPerPage'] > self::DEFAULT_TAB_PAGE_SIZE)
        {
            $param['numPerPage'] = self::DEFAULT_TAB_PAGE_SIZE;
        }
        
        if(!$param['shopId'] || !$param['tabId'])
        {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        
        if(!in_array($param['tabId'], $this->tabArr))
        {
            $errMsgArr = array(
                'success' => false,
                'code' => 500,
                'message' => 'tabId有误',
                'data' => (object)array()
            );
            $this->ajaxReturn($errMsgArr);
        }
        
        $shop = $this->_getShop($param['shopId']);
        
        if($shop['data']['type'] !== 'mShop')
        {
            $errMsgArr = array(
                'success' => false,
                'code' => 500,
                'message' => 'shopId有误',
                'data' => (object)array()
            );
            $this->ajaxReturn($errMsgArr);
        }
        
        $totalNum = 0;
        $pageCount = 0;
        if($param['tabId'] == self::SHOP_PRODUCT_NEW_TYPE)
        {
            //上新商品
            $param['sort'] = 3;
            
            $productList = $this->allItem($param);
            $totalNum = !empty($productList['data']['count']) ? $productList['data']['count'] : 0 ;
            $pageCount = !empty($productList['data']['pageCount']) ? $productList['data']['pageCount'] : 0;
            
            if(!$productList['success'])
            {
                $this->ajaxReturn($productList);
            }
            
            $itemList = $this->_handleData($productList);
            $productItem = array();
            if(!empty($itemList))
            {
                foreach($itemList as $pk => $pv)
                {
                    $pv['img'] = getResizeImg($pv['img'], 260, 260);
                    //处理日期,这里将原时间戳修改成日期
                    $_time = isset($pv['onShelfTime']) ? substr($pv['onShelfTime'], 0, 10) : '';
                    $date = !empty($_time) ? date('m月d日', $_time) : '';
                    $dateKey = !empty($_time) ? date('Ymd', $_time ) : '';
                    $pv['onShelfAt'] = $date;
                    $productItem["YMD".$dateKey]['title'] = $date;
                    $productItem["YMD".$dateKey]['data'][] = $pv;
                }
            }
            $productList['data'] = array();
            $productList['data']['count'] = count($itemList);
            $productList['data']['itemList'] = $productItem;
        }
        elseif($param['tabId'] == self::SHOP_PRODUCT_ALL_TYPE)
        {
            //全部商品
            $param['sort'] = 0;
            
            $productList = $this->allItem($param);
            $totalNum = !empty($productList['data']['count']) ? $productList['data']['count'] : 0;
            $pageCount = !empty($productList['data']['pageCount']) ? $productList['data']['pageCount'] : 0;
            
            if(!$productList['success'])
            {
                $this->ajaxReturn($productList);
            }
            
            $itemList = $this->_handleData($productList);
            $productList['data'] = array();
            $productList['data']['count'] = count($itemList);
            $productList['data']['itemList'] = $itemList;
        }
        $productList['data']['pageCount'] = $pageCount;
        $productList['data']['pageNum'] = $param['pageNum'];
        $productList['data']['pageSize'] = $param['numPerPage'];
        $productList['data']['totalNum'] = $totalNum;
        
        $this->ajaxReturn($productList);
    }
    
    /**
     * 处理数据
     * @param Array $items
     */
    private function _handleData($items)
    {
        $itemList = array();
        if(!empty($items['data']['items']))
        {
            foreach($items['data']['items'] as $info)
            {
                //$item = (isset($info['item'])) ? $info['item'] : $info;
                $data = array();
                $data['id'] = $info['id'];
                $data['skuId'] = $info['skuId'];
                $data['title'] = msubstr($info['name'], 0, 27);
                $data['price'] = convert_price($info['salePrice']);
                $data['orginPrice'] = convert_price($info['price']);
                $data['img'] = isset($info['mainImage']) ? getResizeImg($info['mainImage'], 260, 260) : '';
                $data['isDiscount'] = false;//商品是否直降：融合后写死false
                $data['onShelfTime'] = $info['onShelfAt'];//上架时间
                $data['offShelfTime'] =  isset($info['offShelfAt']) ? $info['offShelfAt'] : '';//下架时间
                $data['status'] = $info['status'];
                $data['isRebate'] = !empty($info['rebate']) ? true : false;//商品是否返利
                
                array_push($itemList, $data);
            }
        }
        
        return $itemList;
    }

    /**
     * @desc 店铺搜索页面
     * 李路明  2016-11-07
     * shopId 店铺id
     * word   搜索关键字
     */
    public function search()
    {
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        $param = array();
        $param['shopId'] = I('param.shopid', 0, 'intval');
        $param['keyword'] = isset($_GET['shopword']) ? urlencode(xss_clean(urldecode($_GET['shopword']))) : '';
        $param['pageNum'] = 1;
        $param['pageSize'] = self::PAGE_SIZE;
        $param['addressId'] = $this->addressId;

        if($param['shopId'] < 1)
        {
            header('location: '.APP_HTTP.C('MAIN_URL'), true, 301);
            exit;
        }

        //获取店铺信息
        $shopInfo = $this->_getShop($param['shopId']);
        
        if($shopInfo['data']['type'] !== 'mShop')
        {
            header('location: '.APP_HTTP.C('MAIN_URL'), true, 301);
            exit;
        }
        
        #根据店铺类型获取商品
        $shop = D("ShopV2");
        
        $result = $shop->getData($shop->search_item_in_mshop, $param);
        
        //是否显示加载更多
        $showMore = $result['data']['pageCount'] > 1 ? 1 : 0;

        //拼接店铺二维码
        $shopQrCode = $this->getShopQrCode($param['shopId']);

        $this->assign('shopId',  $param['shopId']);
        $this->assign('shop', $shopInfo['data']);
        $this->assign('shopQrCode', $shopQrCode);

        $this->assign('shop_crumbs', crumbsMap(array(
            "{{1}}" => APP_HTTP_GOME.C('GOME')['URL']['MAIN_URL']
        )));

        $this->assign('products', $result['data']['items']);

        $this->assign('isSearch', 1);  #表明搜索页
        $this->assign('type', 1);      #控制搜索页不选中导航条
        //$this->assign('sourceCode', $source);
        $this->assign('showMore',$showMore);
        $this->assign('shopWord',urldecode($param['keyword']));

        $seoMap = seoMap('',array("{{1}}"=>$shopInfo['data']['name']));
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('title', $seoMap['title']);
        $this->assign('weixin_share', APP_HTTP.C('GOME')['URL']['MSHOP_URL'].'mshop-'.$param['shopId'].'.html');

        if($shopInfo['data']['status'] > self::SHOP_STATUS_NORMAL)
        {
            //休店中..
            $this->display('Shop/error');
        }else{
            $this->display('Shop/search');
        }
    }

    /**
     * 获取更多商品列表-针对店铺搜索页
     */
    public function searchMoreList()
    {
        $param = array();
        $param['shopId'] = I('param.shop_id', 0, 'intval');
        $param['keyword'] = isset($_GET['word']) ? urlencode(xss_clean(urldecode($_GET['word']))) : '';
        $param['pageNum'] = I('param.pageNum', 2, 'intval');
        $param['pageSize'] = I('param.pageSize', self::PAGE_SIZE, 'intval');
        $param['addressId'] = $this->addressId;
        
        if($param['pageSize'] > self::PAGE_SIZE)
        {
            $param['pageSize'] = self::PAGE_SIZE;
        }

        if(!$param['shopId'] || !$param['pageNum'])
        {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }

        #根据店铺类型获取商品
        $shop = D("ShopV2");
        
        $result = $shop->getData($shop->search_item_in_mshop, $param);
        if(!$result['success'])
        {
            $this->ajaxReturn($result);
        }
        
        $productList = $this->structureArr($result);
        $productList['data']['pageCount'] = $result['data']['pageCount'];
        $productList['data']['pageSize'] = $param['pageSize'];
        $productList['data']['pageNum'] = $param['pageNum'];
        $productList['data']['totalNum'] = $result['data']['count'];
        
        $this->ajaxReturn($productList);
    }
    
    /*
     * 统一数据结构
     * $result 搜索接口返回的数据
     * */
    private function structureArr($result)
    {
        $itemArr = array();
        
        if(!empty($result['data']['items']))
        {
            foreach($result['data']['items'] as $info)
            {
                $data = array();
                
                $data['id'] = $info['id'];
                $data['skuId'] = $info['skuId'];
                $data['title'] = msubstr($info['name'], 0, 27);
                $data['price'] = convert_price($info['salePrice']);
                $data['orginPrice'] = convert_price($info['price']);
                $data['img'] = isset($info['mainImage']) ? getResizeImg($info['mainImage'], 260, 260) : '';
                $data['isDiscount'] = false;//商品是否直降：融合后写死false
                $data['onShelfTime'] = $info['onShelfAt'];//上架时间
                $data['offShelfTime'] =  isset($info['offShelfAt']) ? $info['offShelfAt'] : '';//下架时间
                $data['status'] = $info['status'];
                $data['isRebate'] = !empty($info['rebate']) ? true : false;//商品是否返利
                
                $itemArr[] = $data;
            }
        }
        $result['data'] = array();
        $result['data']['count'] = count($itemArr);
        $result['data']['itemList'] = $itemArr;
        
        return $result;
    }
}
