<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：MshopController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:wangjunzi <wangjunzi@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2017-10-10 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 **/

namespace Ajax\Controller;

use Ajax\Controller\BaseController;
use Common\Lib\Curl;

class MshopController extends BaseController
{
    
    const BEST = 0; //精选
    const SHOP = 1; //门店
    const COMM = 2; //佣金
    const SALE = 3; //销量
    const POP = 4; //人气
    const PAGET_SIZE = 16 ;//每页条数
    const NAME_POST_ERROR_CODE = '711001';
    const DESC_POST_ERROR_CODE = '712001';
    //二级城市ID
    private $addressId = '11010000';

    public function __construct() {
        parent::__construct();
        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];
    }

    public function index() {
        $pageNum = I('param.pageNum', 1);
        $shopInfo = $this->getMshop($this->userId);
        $shopId = $shopInfo['id'] ;
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
            $itemList['items'][$k]['item']['mainImage'] = getResizeImg($item['item']['mainImage'],260,260,'ONLINE',$action='c');
            if( $item['item']['price'] >= 1000000 ) {
                $itemList['items'][$k]['item']['salePrice'] = formatNumber( $item['item']['salePriceString'] / 100 );
            }else{
                $itemList['items'][$k]['item']['salePrice'] = convert_price( $item['item']['salePriceString'] );
            }

            if (isset($item['trId'])) {
                $itemList['items'][$k]['item']['sUrl'] = APP_HTTP_GOME . C('GOME')['URL']['MALL_ITEM_URL'] . $item['itemId'] . '-' . $item['skuId'] . '.html?stid=' . $item['trId'] . '&mid=' . $shopId;
            }else{
                $itemList['items'][$k]['item']['sUrl'] = APP_HTTP_GOME . C('GOME')['URL']['MALL_ITEM_URL'] . $item['itemId'] . '-' . $item['skuId'] . '.html?mid=' . $shopId;
            }
        }
        echo json_encode($itemList);
        exit;
    }

    /**
     * 添加更多好货商品
     */
    public function addItem() {
        $pageNum = I('param.pageNum', 1);
        $shopInfo = $this->getMshop($this->userId);

        $source = 0; //0:CMS 1:大数据
        $type = I('type', ($shopInfo['isStaff'] == 1) ? SELF::SHOP : self::BEST); //默认精选

        if ($type == self::BEST) {
            //精品(CMS)
            $itemList = $this->getBestItems();
        } else {
            //门店、人气、销量、佣金(大数据)
            $orgId = isset($shopInfo['orgId']) && $shopInfo['orgId'] ? $shopInfo['orgId'] : 0 ;
            $itemList = $this->getOtherItems($type, $shopInfo['id'], $orgId, $pageNum, self::PAGET_SIZE);
            $source = 1;
            if( $pageNum > 10 ){
                echo json_encode(array('items' => array()));
                exit;
            }
        }

        $itemList = $this->processItem($itemList, $source);
        $itemIds = array_column($itemList, 'id');
        //商品在美店内的分销状态
        $itemListStatus = $this->getItemStatus($shopInfo['id'], $itemIds);

        foreach ($itemList as &$item) {
            $item['onShelf'] = $itemListStatus[$item['id']];
            $item['imageUrl'] = getResizeImg($item['imageUrl'], 260, 260, 'ONLINE', $action = 'c');
            if (isset($item['trId'])) {
                $item['sUrl'] = APP_HTTP_GOME . C('GOME')['URL']['MALL_ITEM_URL'] . $item['id'] . '-' . $item['skuID'] . '.html?stid=' . $item['trId'] . '&mid=' . $shopId;
            }else{
                $item['sUrl'] = APP_HTTP_GOME . C('GOME')['URL']['MALL_ITEM_URL'] . $item['id'] . '-' . $item['skuID'] . '.html?mid=' . $shopId;
            }
        }
        echo json_encode(['items' => $itemList]);
        exit;
    }

    /**
     * ajax 商品上下架
     * 默认上架 下架 status传1
     */
    public function itemMangeInShop() {
        //判断是否开通美店
        $shopInfo = $this->getMshop($this->userId);
        if(!$shopInfo['id']){
            $this->outError(\Think\ErrorCode::MSHOP_NO_OPEN);exit;
        }
        $param['shopId'] = empty(I('param.shopId')) ? $shopInfo['id'] : I('param.shopId', 0, 'intval'); 
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
     * 商品管理
     * @param shopId 是	Int	美店铺id
     * @param items  是	Array	商品信息=> [
     *     itemId    是  String  商品id
     *     skuId	 是	String	skuId
     *     identification	是	String	线上线下标识（线上:online 线下:offline），不传默认线上
     *     pshopId	 否	String	pop店铺
     * ]
     * @return string
     */
    public function itemBatchMangeInShop() {
        //判断是否开通美店
        $shopInfo = $this->getMshop($this->userId);
        if(!$shopInfo['id']){
            $this->outError(\Think\ErrorCode::MSHOP_NO_OPEN);exit;
        }
         
        $param['shopId'] = empty(I('param.shopId')) ? $shopInfo['id'] : I('param.shopId', 0, 'intval');
        $param['items'] = I('param.items', []);
        $param['items'] = json_encode($param['items']);
        if (empty($param['shopId']) || empty($param['items'])) {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        $M_shopV2 = D('Mall/ShopV2');
        $data = $M_shopV2->postData($M_shopV2->batch_distributionItem, $param);
        $this->response($data);
    }


    /**
     * 根据用户user_id 获取美店信息（开店状态等）
     * @param $user_id
     * @return array
     */
    private function getMshop($user_id) {
        $data = [];
        $shop = D('Mall/ShopV2');
        $result = $shop->getData($shop->shopDetail, ['userId' => $user_id]);
        if ($result['code'] == 200 && isset($result['data']['id'])) {
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
        if ($orgId) {
            $req['org'] = $orgId;
        }
        $queryString = http_build_query($req);

        $CurlHandler = new Curl();
        $result = $CurlHandler->request('GET', C('GOODS_RECOMMEND_OTHER') . $queryString);
        $data = json_decode($result, true);
        if (empty($data) || empty($data['lst']) || $data['msg'] != 'success') {
            write_log( '美店4项tab页-大数据接口异常', C('GOODS_RECOMMEND_OTHER'), $req,500);
        }else{
            write_log( '美店4项tab页-大数据接口正常', C('GOODS_RECOMMEND_OTHER'), $req);
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
                    'commission' => $item['goodsBean']['distributionRatio'],
                    'imageUrl' => $item['goodsBean']['skuThumbImgUrl'],
                    'identification' => !empty($item['orgcode']) ? 'offline' : 'online',
                    'flag' => $flag
                ];
            }
        } elseif ($source == 1) {//大数据
            $itemlist = $data['lst'];
            //print_r($itemlist);
            foreach ($itemlist as $item) {
                //print_r($item);
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
     * 获取分享链条kid
     * @return string
     */
    public function getmshopKid() {
        $data = array('success'=>false, 'data'=>'');
        if( $this->userInfo['loginStatus'] ==3 && $this->userId  ) {
            $M_shopV2 = D('Mall/ShopV2');
            $param = [
                'callfrom' => 30,
                'channel' => 1
            ];
            $data = $M_shopV2->getData($M_shopV2->shareChain, $param);
        }
        $this->response($data);
    }

    /**
     * 编辑店铺
     * @param int backgroundIndex 美店背景编号
     * @param string name 美店名称
     * @param string icon 美店logo
     * @param string description 美店描述
     * @param string mainCategoryNames 主营类目 |“洗衣机,电冰箱”
     * @param string backgroundUrlPc (PC端)店铺背景图url
     *
     */
    public function editshop(){
        $param = array();
        $shopId = I('shopId',0,"intval");
        I('param.backgroundIndex',0) ? $param['backgroundIndex'] = (int)I('param.backgroundIndex',1) : '' ;
        I('param.name','') ? $param['name'] = I('param.name','',"trim") : '';
        I('param.icon','') ? $param['icon'] = I('param.icon','') : '';
        isset($_POST['description']) ? $param['description'] = I('param.description','',"trim") : '';
        $param['isSkip'] = 0; //不跳过
        isset($_POST['mainCategoryNames']) ? $param['mainCategoryNames'] = I('param.mainCategoryNames','',"trim") : '';
        I('param.backgroundUrlPc','') ? $param['backgroundUrlPc'] = I('param.backgroundUrlPc') : '';
        $param['source'] = 'pc';//区分请求来自app or pc

        //店铺id丢失
        if( !session('mshop_id') && !$shopId ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        if( isset($param['name']) && mb_strlen($param['name']) >15 ){
            $this->outError(\Think\ErrorCode::MSHOP_POST_FORM);
            exit;
        }
        $M_shopV2 = D('Mall/ShopV2');
        $M_shopV2->setTimeOut(10);
        $M_shopV2->publicParamv2['id'] = session('mshop_id') ? session('mshop_id') : $shopId;

        /*if( isset($param['backgroundUrlPc'] )  ){
            //选择自定义背景时候 需要设置backgroundIndex为1默认值
            $param['backgroundIndex'] = 1 ;
        }*/
        if( !isset($param['backgroundUrlPc'] ) && isset($param['backgroundIndex']) ){
            //选择默认背景需要将之前的自定义背景置为空(app与pc自定义背景均设置为空)
            $param['backgroundUrlPc'] = '';
            $param['backgroundUrl'] = '';
        }

        $data = $M_shopV2->putData($M_shopV2->get_shop_info, $param);
        $this->response($data);
    }

    /**
     * 创建店铺-新增
     * @param string name
     * @param string icon
     * @return json
     */
    public function saveMshop(){
        if( !session('mshop_id') ){
            $userinfo = $this->userInfo;
            $param['name'] = empty(I('param.name')) ? $userinfo['nickName'].'的美店' : trim(I('param.name'));
            $param['icon'] = empty(I('param.icon')) ? $userinfo['ext']['account']['imagePath'] : trim(I('param.icon'));
            $param['description'] = empty(I('param.description')) ? '' : trim(I('param.description'));
            $param['isSkip'] = 0;
            $param['source'] = 'pc';
            //print_r($param);die;
            
            //校验美店名称
            $this->checkField($param['name'],15,self::NAME_POST_ERROR_CODE);

            //校验描述信息
            if($param['description']){
                $this->checkField($param['description'],100,self::DESC_POST_ERROR_CODE);
            }

            $shop = D('Mall/ShopV2');
            $result = $shop->putData($shop->get_shop_info,$param);
            //print_r($result);die;
            $this->response($result);exit;
        }else{
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }

    }

    /**
     * 校验字段
     * @param $field string 字段名程
     * @param $len string   字段长度
     * @param $field string 业务类型
     */
    private function checkField($field,$len,$bus_code){ 
        //过滤长度
        if(mb_strlen(html_entity_decode($field)) > $len ){
            $msg = [
                'code' => $bus_code,
                'success' => false,
                'message' => \Think\ErrorCode::getErrMsg($bus_code),
            ];
            $this->response($msg);exit;
        }

    }
    /**
     * 美店频道页-排行榜
     * @return json
     */
    public function shopRankingList(){

        $channel = D('Mall/Channel');
        $result = $channel->getRankingList();
        array_unshift($result['data']['topList'],$result['data']['pkList'][0]);
        $this->response($result['data']);
    }
}

