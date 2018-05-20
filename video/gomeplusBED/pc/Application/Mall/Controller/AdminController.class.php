<?php

/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                       |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AdminController.class1.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：美店商品管理页                                                    |
 * +----------------------------------------------------------------------+
 * | Author:liuchao <liuchao@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date: 2017/9/18-15:08                                                |
 * +----------------------------------------------------------------------+
 */

namespace Mall\Controller;

use Home\Controller\BaseController;
use Common\Lib\Curl;
use Common\Lib\Page;
class AdminController extends BaseController {

    const BEST = 0; //精选
    const SHOP = 1; //门店
    const COMM = 2; //佣金
    const SALE = 3; //销量
    const POP = 4; //人气
    const PAGET_SIZE = 16 ;//每页条数
    private $mshopData = null ;
    //二级城市ID
    private $addressId = '11010000';

    public function __construct() {
        parent::__construct();
        //美店信息
        $this->mshopData = $this->getMshop($this->userId);
        $mshop_icon = $this->mshopData['icon'] ? $this->mshopData['icon'] : $this->userInfo['ext']['account']['imagePath'];

        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];

        //获取顶部广告位
        $channel = D('Mall/Channel');
        $top_banner = $channel->getTopBanner();
        $this->assign('top_banner', current($top_banner['floorPhotoTemplet']['imgList']));

        //获取左侧广告位
        $channel = D('Mall/Channel');
        $left_banner = $channel->getLeftBanner();
        $this->assign('left_banner', current($left_banner['floorPhotoTemplet']['imgList']));

        $this->assign('mshop_icon', $mshop_icon);

    }


    //是否开通美店 跳转APP扫码登录界面
    private function mshopGuide() {
        if( !isset($this->mshopData['id']) || !$this->mshopData['id'] ){
            $channel = D('Mall/Channel');
            $result = $channel->getGuideBanner();
            $this->assign('imgArr', $result['focusPhotoListTemplet']);
            $this->assign('title', '国美美店 分享返利 赚丰厚佣金');
            $this->assign('activeUrl', 'admin_index');
            $this->assign('openMshopUrl', $this->mx_domain['meidian']. 'admin/openMshop');
            $this->display('Admin/guide');
            exit;
        }
    }


    public function index() {
        //开通美店引导页
        $this->mshopGuide();
        $pageNum = I('param.pageNum', 1);
        $shopInfo = $this->mshopData;
        //店铺升级百分比
        $shopInfo['mshopLevel']['degree'] = ($shopInfo['mshopLevel']['score']/$shopInfo['mshopLevel']['rightScore'])*100;
        $shopInfo['mshopLevel']['degree'] = is_float($shopInfo['mshopLevel']['degree']) ?  sprintf("%.2f",substr(sprintf("%.3f", $shopInfo['mshopLevel']['degree']), 0, -2)) .'%': $shopInfo['mshopLevel']['degree'] .'%' ;
        $param = ['shopId' => $shopInfo['id'], 'status' => 1, 'pageNum' => $pageNum, 'pageSize' => self::PAGET_SIZE];
        $itemList = $this->getItemsManage($param);
        foreach ( $itemList['items'] as $k=>$item ) {
            $itemList['items'][$k]['item']['flag'] = 0;
            if( $item['identification'] == 'offline' ){
                $itemList['items'][$k]['item']['flag'] = 3;
            }
            elseif ( isset($item['item']['shopFlag']) && $item['item']['shopFlag'] ){
                $itemList['items'][$k]['item']['flag'] = 2;
            }
            elseif ( $item['item']['productTag'] === 1 ){
                $itemList['items'][$k]['item']['flag'] = 1;
            }
        }
        if (IS_AJAX) {
            echo json_encode($itemList);
            exit;
        } else {
            $seoMap = seoMap('', array("{{1}}"=>$shopInfo['name']));
            $this->assign('keywords', $seoMap['keywords']);
            $this->assign('description', $seoMap['description']);
            $this->assign('title', $seoMap['title']);
            $this->assign('activeUrl', 'admin_index');
            $this->assign('totalQuantity', isset($itemList['totalQuantity']) ? $itemList['totalQuantity'] : 0);
            $totalPageQuantity = ceil($itemList['totalQuantity']/self::PAGET_SIZE);
            $this->assign('totalPageQuantity', isset($totalPageQuantity ) ? $totalPageQuantity  : 0 );
            $this->assign('shopInfo', $shopInfo);
            $this->assign('shopId', $shopInfo['id']);
            $this->assign('itemList', $itemList['items']);
            //拼接店铺二维码
            $shopQrCode = $this->getShopQrCode($shopInfo['id']);
            $this->assign('mshop', APP_HTTP . C('GOME')['URL']['MSHOP_URL'] . 'mshop-' . $shopInfo['id'] . '.html' );
            $this->assign('myshop', APP_HTTP . C('MEIDIAN_URL') . 'shop-' . $shopInfo['id'] . '.html');
            $this->assign('shopQrCode', $shopQrCode);
            $this->display();
        }
    }

    /**
     * 添加更多好货商品
     */
    public function addItem() {
        //是否开通美店 跳转开通美店引导页
        //$this->mshopGuide();
        $pageNum = I('param.pageNum', 1);
        $shopInfo = $this->mshopData;
        
        //轮播图
        $channel = D('Mall/Channel');
        if(isset($shopInfo['trId']) && !empty($shopInfo['trId'])){
            $focusImg = $channel->getGoodsRecommendShop();
        }else{
            $focusImg = $channel->getGoodsRecommend();
        }


        $source = 0; //0:CMS 1:大数据
        $type = I('type', isset($shopInfo['trId']) && !empty($shopInfo['trId']) ? SELF::SHOP : self::BEST); //默认精选

        if ($type == self::BEST) {
            //精品(CMS)
            $itemList = $this->getBestItems();

        } else {
            //门店、人气、销量、佣金(大数据)
            $orgId = isset($shopInfo['orgId']) && $shopInfo['orgId'] ? $shopInfo['orgId'] : 0 ;
            $itemList = $this->getOtherItems($type, $shopInfo['id'], $orgId, $pageNum, self::PAGET_SIZE);
            $source = 1;
        }

        $itemList = $this->processItem($itemList, $source);
        $itemIds = array_column($itemList, 'id');
        //商品在美店内的分销状态
        $itemListStatus = $this->getItemStatus($shopInfo['id'], $itemIds);

        foreach ($itemList as &$item) {
            $item['onShelf'] = $itemListStatus[$item['id']];
        }

        if (IS_AJAX) {
            echo json_encode(['items' => $itemList]);
            exit;
        } else {
            $seoMap = seoMap();
            $this->assign('title', $seoMap['title']);
            $this->assign('keywords', $seoMap['keywords']);
            $this->assign('description', $seoMap['description']);
            //面包屑
            $crumbs = crumbsMap(
                [
                    "{{1}}" => APP_HTTP.C('GOME')['URL']['UCENTER_URL'],
                    "{{2}}" => APP_HTTP.C('MEIDIAN_URL').'admin'
                ]
            );
            $this->assign('activeUrl', 'admin_addItem');
            $this->assign('crumbs', $crumbs);
            $this->assign('tab', $type);
            $this->assign('shopInfo', $shopInfo);
            $this->assign('shopId', $shopInfo['id']);
            $this->assign('isShop', $shopInfo['trId']);
            $this->assign('itemList', $itemList);
            $this->assign('focusImg', $focusImg['focusPhotoListTemplet']); //轮播图
            $this->assign('isMore', (count($itemList) < self::PAGET_SIZE) ? false : true);
            $this->display('additem');
        }
    }

    /**
     * ajax 商品上下架
     * 默认上架 下架 status传1
     */
    public function itemMangeInShop() {
        $param['shopId'] = I('param.shopId', 0, 'intval');
        $param['itemId'] = I('param.itemId', '', 'string');
        $param['skuId'] = I('param.skuId', '', 'string');
        $param['identification'] = I('param.identification', 'online', 'string');
        $param['status'] = I('param.status', '0', 'intval');
        $result = $this->manageItem($param, $param['status']);
        if (is_numeric($result)) {
            $this->outError($result);
        }
        $this->response($result);
    }

    /**
     * 根据用户user_id 获取美店信息（开店状态等）
     * @param $user_id
     * @return array
     */
    private function getMshop($user_id) {
        $data = [];
        $shop = D('Mall/ShopV2');
        $result = $shop->getData($shop->shopDetail, ['userId' => $user_id,'integrity'=>'full']);
        if ($result['code'] == 200 && isset($result['data']['id'])) {
            if( !session('mshop_id') || session('mshop_id') != $result['data']['id'] ){
            session('mshop_id',$result['data']['id'] );
            }
            return $result['data'];
        }
        return $data;
    }


    /**
     * 商品管理（主态）
     * @param $paramArr
     * @return string
     */
    private function getItemsManage($paramArr) {
        if (empty($paramArr)) {
            return \Think\ErrorCode::PARMA_ERROR;
        }
        $param = array();
        $param['shopId'] = $paramArr['shopId'];
        $param['status'] = $paramArr['status'];
        $param['pageNum'] = $paramArr['pageNum'];
        $param['pageSize'] = $paramArr['pageSize'];
        $param['areaCode'] = $this->addressId;
        $M_shopV2 = D('Mall/ShopV2');
        $data = $M_shopV2->getData($M_shopV2->item_manage_pc, $param);
        //$data = $M_shopV2->getData($M_shopV2->item_manage, $param);
        return $data['data'];
    }

    /**
     * 商品管理
     * @param $paramArr=[
     *      shopId	是	String	美店铺id
     *      itemId	是	String	商品ID
     *      skuId	是	String	skuId
     *      identification	是	String	线上线下标识（线上:online 线下:offline），不传默认线上
     *      pshopId	否	String	pop店铺id
     *      trId	否	String	员工绑定门店id
     *      ]
     * @param int $status 上架 其它 下架
     * @return string
     */
    private function manageItem($paramArr, $status = 0) {
        if (!isset($paramArr['shopId']) || !isset($paramArr['itemId']) || !isset($paramArr['skuId'])) {
            return \Think\ErrorCode::PARMA_ERROR;
        }
        $param = array();
        $M_shopV2 = D('Mall/ShopV2');
        if ($status === 0) {
            $param['shopId'] = $paramArr['shopId'];
            $param['itemId'] = $paramArr['itemId'];
            $param['skuId'] = $paramArr['skuId'];
            isset($paramArr['identification']) ? $param['identification'] = $paramArr['identification'] : '';
            isset($paramArr['pshopId']) ? $param['pshopId'] = $paramArr['pshopId'] : '';
            isset($paramArr['trId']) ? $param['trId'] = $paramArr['trId'] : '';
            $data = $M_shopV2->postData($M_shopV2->distributionItem, $param);
        } else {
            $param['shopId'] = $paramArr['shopId'];
            $param['itemId'] = $paramArr['itemId'];
            $param['skuId'] = $paramArr['skuId'];
            $data = $M_shopV2->deleteData($M_shopV2->distributionItem, $param);
        }
        return $data;
    }

    /**
     * 商品在美店内的分销状态(批量)
     * @param $shopId
     * @param $itemids
     * @return string
     */
    private function getItemStatus($shopId, $itemids = []) {
        if ($shopId < 0 || empty($itemids)) {
            return \Think\ErrorCode::PARMA_ERROR;
        }
        $M_shopV2 = D('Mall/ShopV2');
        $param['shopId'] = $shopId;
        $param['itemIds'] = implode(',', $itemids);
        $data = $M_shopV2->getData($M_shopV2->itemStatus, $param);
        $items = $data['data']['result'];
        $_items = [];
        if (!empty($items)) {
            foreach ($items as $item) {
                $_items[$item['itemId']] = $item['isDistribution'];
            }
        }
        return $_items;
    }



    /**
     * 获取精选商品(CMS提供)
     * @return array 商品列表
     */
    private function getBestItems() {
        $addrArr = getAddrGome();
        $req = ["keyProms" => "channelGomeShopHaohuoNonemployees", "provinceId" => $addrArr['provId'], "cityId" => $addrArr['cityId']];
        $queryString = json_encode($req);

        $CurlHandler = new Curl();
        $result = $CurlHandler->request('GET', C('GOODS_RECOMMEND_BEST') . $queryString);
        $data = json_decode($result, true);
        if( empty($data) || empty($data['items']) ){
            write_log( '美店精选tab页-cms接口异常', C('GOODS_RECOMMEND_BEST'), $req,500);
        }else{
            write_log( '美店精选tab页-cms接口异常', C('GOODS_RECOMMEND_BEST'), $req);
        }
        return $data;
    }

    /**
     * 获取门店、人气、销量、佣金商品(大数据提供)
     * @param int $type tab分类 2:佣金、3:销量、4:人气
     * @param int $shopId 店铺ID
     * @param int $page 当前页
     * @param int $pageSize 每页显示条数
     * @return array 商品列表
     */
    private function getOtherItems($type, $shopId, $orgId, $page = 1, $pageSize = self::PAGET_SIZE) {
        if (!isset($type) || empty($type))
            $type = self::SALE;

        $req = ['pnum' => $page - 1, 'psize' => $pageSize, 'tab' => $type, 'areacode' => $this->addressId,
            'shopId' => $shopId, 'catid1' => 'all'
        ];
        if ( $orgId ) {
            $req['org'] = $orgId;
        }
        $queryString = http_build_query($req);

        $CurlHandler = new Curl();
        $result = $CurlHandler->request('GET', C('GOODS_RECOMMEND_OTHER') . $queryString);

        $data = json_decode($result, true);
        if (empty($data) || empty($data['lst']) || $data['msg'] != 'success') {
            write_log( '美店4项tab页-大数据接口异常', C('GOODS_RECOMMEND_OTHER').$queryString, $req,500);
        }else{
            write_log( '美店4项tab页-大数据接口正常', C('GOODS_RECOMMEND_OTHER').$queryString, $req);
        }
        //print_r($data);
        return $data;
    }

    /**
     * 好货商品数据统一处理 输出统一格式
     * @param array $data 商品列表
     * @param int $source 数据源 0:cms 1:大数据
     * @return array 统一格式的商品列表
     */
    private function processItem($data, $source) {
        $datalist = [];
        if ($source == 0) {//CMS
            $itemlist = $data['templetList'][1]['goodsTemplet']['goodsList'];
            //第一次只显示18条
            $itemlist = array_slice($itemlist,0,self::PAGET_SIZE);
            foreach ($itemlist as $item) {
                $flag = 0 ;
                if( $item['identification']=='offline'){
                    $flag = 3;
                }
                elseif ( isset($item['item']['shopFlag']) && $item['item']['shopFlag'] ){
                    $flag = 2;
                }
                elseif ( $item['item']['productTag'] === 1 ){
                    $flag = 1;
                }
                $datalist[] = [
                    'id' => $item['goodsBean']['productID'],
                    'skuID' => $item['goodsBean']['skuID'],
                    'name' => $item['goodsBean']['skuName'],
                    'price' => number_format($item['goodsBean']['priceBean']['skuPrice'],2),
                    'commission' => sprintf('%.2f',$item['goodsBean']['distributionRatio']),
                    'imageUrl' => $item['goodsBean']['skuThumbImgUrl'],
                    'identification' => !empty($item['orgcode']) ? 'offline' : 'online',
                    'flag' => $flag
                ];
            }
        } elseif ($source == 1) {//大数据
            $itemlist = $data['lst'];
            foreach ($itemlist as $item) {
                $flag = 0;
            if( $item['itemFlag']=='true' ) {
                    $flag = 3; //门店
                }
                elseif ($item['hwgflag']=='true') {
                    $flag = 2; //海外购
                }
                elseif ($item['selfflag']=='true') {
                    $flag = 1; //自营
                }

                $datalist[] = [
                    'id' => $item['productid'],
                    'skuID' => $item['skuid'],
                    'name' => $item['productname'],
                    'price' => $item['price'],
                    'commission' => $item['commission'],
                    'imageUrl' => $item['productimage'],
                    'identification' => !empty($item['orgcode']) ? 'offline' : 'online',
                    'flag' => $flag
                ];
            }
        }

        return $datalist;
    }

    /**
     * 获取分享链条
     * 
     */
    private function getshareChainKid($paramArr) {
        if (empty($paramArr)) {
            return \Think\ErrorCode::PARMA_ERROR;
        }
        $param = array();
        $param['callfrom'] = 0;
        $param['channel'] = 2;
        $param['parentKid'] = '';
        $param['merchantId'] = intval($paramArr['shopId']);
        $param['itemId'] = $paramArr['itemId'];
        $param['skuId'] = $paramArr['skuId'];
        $M_shopV2 = D('Mall/ShopV2');
        $data = $M_shopV2->getData($M_shopV2->shareChain, $param);
        return $data['data'];
    }

    /**
     * 获取分享链条kid
     * @param string $itemId
     * @param string $skuId
     * @param int $shopId
     * @return string
     */
    public function getKid() {
        $param['itemId'] = I('param.itemId', '', 'string');
        $param['skuId'] = I('param.skuId', '', 'string');
        $param['shopId'] = I('param.skuId', '', 'int');
        $result = $this->getshareChainKid($param);
        if (is_numeric($result)) {
            $this->outError($result);
        }
        $this->response(['kid' => $result['kid']]);
    }

    /**
     * 获取店铺二维码地址
     * @param int $shopId 店铺ID
     * @return string
     */
    private function getShopQrCode($shopId) {
        if (empty($shopId)) {
            return '';
        } else {
            $url = APP_HTTP . C('GOME')['URL']['MSHOP_URL'] . 'mshop-' . $shopId . '.html';
            return APP_HTTP . C('GROUP_URL') . 'ajax/qrcode/urlcode?url=' . urlencode($url);
        }
    }



    /**
     * 创建美店
     */
    public function openMshop(){
        if( isset($this->mshopData['id']) && $this->mshopData['id'] ){
            //说明已开通,跳到我的美店页面
            header('location:'.$this->mx_domain['meidian']. 'admin');
        }else{
            $this->assign('title', '国美美店 分享返利 赚丰厚佣金');
            $this->assign('userIcon', $this->userInfo['ext']['account']['imagePath']);
            if(empty($this->userInfo['ext']['account']['imagePath']) || strpos($this->userInfo['ext']['account']['imagePath'],'T1YvKTBsDv1RCvBVdK') || strpos($this->userInfo['ext']['account']['imagePath'],'T1o4KTBTWQ1RCvBVdK')){
                $this->assign('mshopHeadimg', 0);
            }else{
                $this->assign('mshopHeadimg', 1);
            }
            $this->display('Admin/open_shop');
        }
    }

    /**
     * 创建店铺-跳过
     * @param string name
     * @param string icon
     * @return json
     */
    public function skipMshop(){
        
        //没开通的美店可以点跳过
        if(!session('mshop_id')){

            $userinfo = $this->userInfo;
            $param['name'] = $userinfo['nickName'].'的美店';
            $param['icon'] = $userinfo['ext']['account']['imagePath'];
            $param['isSkip'] = 1;
            $param['source'] = 'pc';
            $shop = D('Mall/ShopV2');
            $result = $shop->putData($shop->get_shop_info,$param);
            //var_dump($result);die;
            header('location:'.$this->mx_domain['meidian']. 'admin');
        }else{
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
    }


    /**
     * 编辑美店
     */
    public function setMshop(){
        //开通美店引导页
        $this->mshopGuide();
        $this->assign('title', '国美美店 分享返利 赚丰厚佣金');
        $this->assign('shopInfo',$this->mshopData);
        $this->assign('shopId', $this->mshopData['id']);
        $this->assign('activeUrl', 'admin_index');
        if(empty($this->userInfo['ext']['account']['imagePath']) || strpos($this->userInfo['ext']['account']['imagePath'],'T1YvKTBsDv1RCvBVdK') || strpos($this->userInfo['ext']['account']['imagePath'],'T1o4KTBTWQ1RCvBVdK')){
            $this->assign('mshopHeadimg', 0);
        }else{
            $this->assign('mshopHeadimg', 1);
        }
        $this->display('Admin/set_shop');
    }


    /**
     * 美店说列表(主态)
     */
    public function topics(){
        $this->mshopGuide();
        //美店列表
        $mshopTopic = D('MshopTopic');
        $param = array();
        $param['mshopId'] = $this->mshopData['id'];
        $param['pageNum'] = I('param.page',1);
        $param['areaCode'] = $this->addressId;
        //美店说列表
        $mshopList = $mshopTopic->get_topics($param['mshopId'],$param['pageNum'],$param,true) ;
        $param['pageSize'] = 10;
        //分页
        $page = new Page();
        $paramsUrl = $this->mx_domain['meidian'].'admin/topics';
        //最大页数
        if( $param['pageNum'] > $mshopList['totalPage']  && $mshopList['totalTopicQuantity']  > 0 )
        {
            header('location: '.APP_HTTP.C('GOME')['URL']['MEIDIAN_URL'].'/admin/topics?page='.$mshopList['totalPage'], true);
            exit;
        }
        $linkUrl =  $page->show($mshopList['totalTopicQuantity'], $param['pageSize'], $param['pageNum'], $paramsUrl);

        $seoMap = seoMap();
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);

        $this->assign('mshopList',$mshopList);
        $this->assign('shopInfo', $this->mshopData );
        $this->assign('shopId',$this->mshopData['id']);
        $this->assign('linkUrl',$linkUrl);
        $this->assign('activeUrl', 'admin_topics');
        $this->display('Admin/topics');
    }



    /*
    * 发布话题
    **/
    public function publiser () {
        if($this->userInfo['loginStatus'] !==3 && !$this->userId)
        {
            header('location:'.APP_HTTP_GOME.C('GOME')['URL']['LOGIN_URL'].'?orginURI='.curPageURL());
            exit;
        }
        $this->mshopGuide();
        $item_json = I( 'post.itemJson','',false);
        // 如果有Post数据，则计算用户评论时添加的图片数量
        if (!empty($item_json)){
            $item = json_decode($item_json,true);
            $commentPicNum = count($item['commentImages']);
        }

        $seoMap = seoMap(
            '',
            array("{{1}}" => ( isset($this->mshopData['name']) ) ? $this->mshopData['name'].' - ' : ' '  )
        );

        //随机字符 uid|token|随机数字符串|数时间戳
        do{
            $randStr1 =  $this->userId.'|'.$this->token.'|'.'addpage'.rand().'|'.time();
        }
        while( S(substr(md5($randStr1),8,16) ) );

        $pageId = authcode($randStr1,  'ENCODE', C('ENCRYPT_APP_KEY') );
        $qrcodeUrlmodel = APP_HTTP.C('MAIN_URL').'qrupload/index?pageId={pageId}&qrcodeId={qrcodeId}';



        $crumbs = crumbsMap();
        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);

        $this->assign('item_json', $item_json);
        $this->assign('shinePicNum', isset($commentPicNum) ? (9 - $commentPicNum) : 9);
        $this->assign('pageId',$pageId);
        $this->assign('qrcodeUrlmodel',$qrcodeUrlmodel);
        $this->assign('mshop_infos',$this->mshopData);
        $this->assign('shopId',$this->mshopData['id']);
        $this->assign('channel','meidian');
        $this->display( "Admin/publish");

    }
}
