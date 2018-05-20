<?php

/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                               |
* +----------------------------------------------------------------------+
* | @程序功能：商品搜索页                                                  |
* +----------------------------------------------------------------------+
* | Author:lishuai <lishuai@gomeplus.com>                                   |
* +----------------------------------------------------------------------+
* | Date:2016-08-18 11:23:11 CST                                               |
* +----------------------------------------------------------------------+
*/


namespace Mall\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;
use Common\Lib\CurlHandler;
class SearchController extends BaseController
{
    /**
     * 
     * @var 商品排序类型 |默认：0; 销量:1;价格:2; 上新:3;
     */
    const SEARCH_SORT_DEFAULT_TYPE = 0;
    const SEARCH_SORT_NEW_TYPE = 3;
    const SEARCH_SORT_PRICE_TYPE = 2;
    const SEARCH_SORT_SALES_TYPE = 1;
    /**
     *
     * @var 商品排序方式|默认:1; 0:升序,1:降序
     */
    const SEARCH_ORDER_DESC = 1 ;
    const SEARCH_ORDER_ASC = 0 ;

    //其他品牌（26首字母之外的）
    const SEARCH_BRANDS_OTHER = 'other';
    const SEARCH_BRANDS_OTHER_DESC = '其它';
    /**
     * 
     * @var 店铺排序类型 |默认：0; 销量：1;人气：2;
     */
    const SEARCH_SORT_DEFAULT_TYPE_S = 0;
    const SEARCH_SORT_SALES_TYPE_S = 1;
    const SEARCH_SORT_PEOPLE_TYPE_S = 2;
     
    const PAGE_SIZE = 40; //分页每页条数

    private $_curlHandler;

    public function __construct(){
        parent::__construct();

        $this->_curlHandler = new CurlHandler();
    }
    /**
     * 商品搜索
     */
    public function index()
    {
        //该方法弃用,暂时做跳转处理。2017-03-06
        $url = APP_HTTP.C('MAIN_URL');
        header('location: '.$url, true, 301);
        exit;
        
        //入参，请求接口
        $result = $this->_productSearch();
        $get = I('get.');
        //面包屑 关键词 ||三要素
        if( $result['params']['keyword'] ){
            $seoMap = seoMap(1,array("{{1}}"=>urldecode($result['params']['keyword'] ) ) );
            $get['word'] = urldecode($_GET['word']);
        }else{
            $seoMap = seoMap(2,array("{{1}}"=>''));
        }
        $actionurl = APP_HTTP.C('MALL_URL').'search/index';
        

        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign("selectWords",array('name'=>'商品','keyword'=>urldecode($result['params']['keyword']),'selectkey'=>'goods'));

        if( $result['data']['count'] <=0  && $result['data']['pageCount']<=0 ){
            $this->assign('researchWord',urldecode($result['params']['keyword']));
            $result['data']['page'] = 0 ;
            //品牌面包屑
            if( isset($get['brandIds']) && $get['brandIds'] ){
                $crumbs['brand']['id'] = $get['brandIds'];
                $crumbs['brand']['name'] = $this->_brandInfo($get['brandIds']);
                $tempGet = $get ;
                unset($tempGet['brandIds'] );
                $crumbs['brand']['url'] = !empty($tempGet) ? $actionurl.'?'.http_build_query($tempGet) : $actionurl ;
            }

            //分类面包屑
            /*if( isset($get['categoryId']) && $get['categoryId'] ){
                $crumbs['cate']['id'] = $get['categoryId'] ;
                $crumbs['cate']['name'] = $this->_cateGoryInfo($get['categoryId']);
                
                $tempGet = $get ;
                unset($tempGet['categoryId']);
                $crumbs['cate']['url'] = !empty($tempGet) ? $actionurl.'?'.http_build_query($tempGet) : $actionurl ;    
            }*/
        }
        //关键词-面包屑
        $crumbs['keyword'] = xss_clean(urldecode($result['params']['keyword'] ) );
        //是否显示纠错结构
        if( $result['data']['spellcheck']['type'] ){
            //原来的链接地址
            $result['data']['spellcheck']['originWordUrl'] = curPageURL().'&spellcheck=1 ';
            $this->assign("selectWords",array('name'=>'商品','keyword'=>xss_clean($result['data']['spellcheck']['suggestWord']),'selectkey'=>'goods'));
            $crumbs['keyword'] = xss_clean( $result['data']['spellcheck']['suggestWord'] );
        }

        //顶部菜单选中好店推荐
        $nav_active = ($result['params']['order']==1 && $result['params']['sort']==1) ? C('navActive.search_hot_item') : 0;
        
        $result['data']['firstBrandStr'] = '';
        if( $result['data']['facet']['brands'] ){
            foreach($result['data']['facet']['brands'] as $k=>$v){
                //品牌链接
                $result['data']['facet']['brands'][$k]['url'] = $this->getBrandRequestUrl($actionurl,$get,$v['id']);
               
                //品牌-面包屑
                if( isset($get['brandIds']) && $get['brandIds'] == $v['id'] ){
                    $crumbs['brand']['id'] = $v['id'];
                    $crumbs['brand']['name'] = $v['name'];
                    $tempGet = $get ;
                    unset($tempGet['brandIds'] );
                    $crumbs['brand']['url'] = !empty($tempGet) ? $actionurl.'?'.http_build_query($tempGet) : $actionurl ;
                }
                //品牌首字母拼接字符串
                $result['data']['firstBrandStr'] .= mb_substr( $v['name'], 0,1,'UTF-8');
            }
        }
        if( $result['data']['facet']['categories'] ){
            //分类集合
            foreach ($result['data']['facet']['categories'] as $k => $v) {
                $result['data']['facet']['categories'][$k]['url'] = $this->getCateRequestUrl( $actionurl,$get,$v['id'] );
                //分类-面包屑
                if( isset($get['categoryId'] ) && $get['categoryId'] == $v['id'] ){
                    $crumbs['cate']['id'] = $v['id'] ;
                    $crumbs['cate']['name'] = $v['name'];
                    $tempGet = $get ;
                    unset($tempGet['categoryId']);
                    $crumbs['cate']['url'] = !empty($tempGet) ? $actionurl.'?'.http_build_query($tempGet) : $actionurl ;
                }
            }
        }
       
        //排序集合
        //类型
        $sortArr = array(self::SEARCH_SORT_DEFAULT_TYPE,self::SEARCH_SORT_SALES_TYPE,self::SEARCH_SORT_PRICE_TYPE,self::SEARCH_SORT_NEW_TYPE);
        foreach($sortArr as $k=>$v){
            $tempGet = $get ;
            $tempGet['sort'] = $v ;
            //方式
            if( $v == self::SEARCH_SORT_PRICE_TYPE ){
                $tempGet['order'] = ($get['sort'] != self::SEARCH_SORT_PRICE_TYPE) || ( $get['sort'] == self::SEARCH_SORT_PRICE_TYPE && $get['order'] == 1 )? 2 : 1 ;
            }else{
                $tempGet['order'] = 1 ;
            }
            
            $result['data']['OrderData'][$v] = $actionurl.'?'.http_build_query($tempGet);
            
        }
        //参数字符串
        if( isset($get['page'] ) ){
            unset( $get['page'] );
        }
        $query_string = http_build_query($get);
        
        //默认收货地址
        $this->assign('address',getAddrInfo() );
        $this->assign('query_string',$query_string );
        $result['params']['minPrice'] = isset($result['params']['minPrice']) ? $result['params']['minPrice']/100 : '' ;
        $result['params']['maxPrice'] = isset($result['params']['maxPrice']) ? $result['params']['maxPrice']/100 : '' ;
        $this->assign('search_params',$result['params']);
        $this->assign('search_crumbs',$crumbs);
        $this->assign('search_data',$result['data']);
        
        $this->assign('sourceCode',C('sourceCode.search_mall_search_index'));
        //埋点数据
        $this->assign('bpData',$this->getProductBp($result['params']));
        //默认选中
        $this->assign('nav_active',$nav_active);
        $this->display('Search/product');
    }
    
    private function _brandInfo( $id ){
        if( !$id ) return;
        $search = D("SearchV2");
        $params['id'] = $id ;
        $rs = ''; 
        $data = $search->getData($search->searchBrandInfo,$params,false);
        if($data['success']){
            $rs = $data['data']['name'];
        }
        return $rs;
    }

    private function _cateGoryInfo( $id ){
        if( !$id ) return;
        $search = D("SearchV2");
        $params['id'] = $id ;
        $data = $search->getData($search->searchCategoryInfo,$params,false);
        $rs = '';
        if($data['success']){
            $rs = $data['data']['name'];
        }
        
        return $rs;
        
    }

    private function _productSearch(){
        //开启商品品牌
        $params['isFacetsIncluded'] = 'true' ;
        
        $params['pageNum'] = I('param.page',1,'intval') ;
        $params['pageSize'] = self::PAGE_SIZE; //每页条数
        $params['keyword'] = isset( $_GET['word'] ) ? urldecode( $_GET['word'] ) : '' ;
        //是否纠错
        $params['spellcheck'] = $params['keyword'] ?  'true' : 'false';
        if( !empty( I('param.spellcheck') ) && $params['keyword'] ) {
            $params['spellcheck'] = 'false' ;
        }
        $params['sort'] = I('param.sort',self::SEARCH_SORT_DEFAULT_TYPE,'intval') ;
        //1：降 2：升

        //价格排序
        if( $params['sort'] == self::SEARCH_SORT_PRICE_TYPE ){
            I('param.order',2,'intval') == 1 ? $params['order'] = self::SEARCH_ORDER_DESC : $params['order'] = self::SEARCH_ORDER_ASC;
        }else{
            $params['order'] = self::SEARCH_ORDER_DESC ;
        }
        !empty(I('param.brandIds','','intval') ) ?  $params['brandIds'] = I('param.brandIds','','intval'): '';
        !empty(I('param.categoryId','','intval') ) ? $params['categoryId'] = I('param.categoryId','','intval') : '';
        if(!empty(I('param.addressNodeId','','intval') )){
            $params['addressNodeId'] =  I('param.addressNodeId','','intval') ;
        }else{
            $address = getAddrInfo();
            $params['addressNodeId'] = $address['borough']['id'] ;
        } 
        
        isset($_GET['minPrice']) && $_GET['minPrice'] !=""  ? $params['minPrice'] = I('param.minPrice')*100 : '';
        isset($_GET['maxPrice']) && $_GET['maxPrice'] !=""   ? $params['maxPrice'] = I('param.maxPrice')*100 : '';
        $params['isDiscounted'] = !empty( I('param.drop',0,'intval') ) ? 'true':'false';
        $params['isProspectiveRebateItem'] = !empty(I('param.rebate',0,'intval') ) ? 'true':'false';

        $search = D("SearchV2");
        $params['keyword'] = urlencode($params['keyword']) ;
        $search->setTimeOut(15);
        $result = $search->getData($search->research_result_product,$params,false);
        $result['data']['page'] = $params['pageNum'];         //当前页
        $result['data']['pageCount']  = $result['data']['pageCount'] ; //总页数
        $result['data']['count'] = $this->getProductCount($result['data']['count']);
        $result['params'] = $params ;
        foreach ($result['data']['items'] as $k => $v) {
            $result['data']['items'][$k]['mainImage'] = getResizeImg($v['mainImage'],260,260);
            unset($result['data']['items'][$k]['promotionMarks']['itemProspectiveRebates']);
            unset($result['data']['items'][$k]['shop']);
        }
        return $result ;
    }
   /**
    *商品件数转格式
    *
    */
   private function getProductCount($num,$n=9999){
     if($num <= $n) return $num;
     $str = substr($num, 0,-3);
     return substr($str, 0,-1).'.'.substr($str,-1).'万';
   }

    /**
     *商品列表接口
     */
    public function productList(){
        $result = $this->_productSearch();
        unset( $result['data']['facet'] );
        unset($result['data']['params'] );
        $this->response($result);
    }


    /*
     *批量返回所有品牌首字母以及排序
     */
    public function productbrandfirstWordList(){
        $words = I('param.words','','strval');
        if(!$words || $words==""){
            $this->outError();
        }
        $pinyin =  new \Org\Util\Pinyin;
        $englishLetter = englishLetter();
        $str = mb_substr($words, 0,100,'UTF-8') ;
        $strArr = preg_split('/(?<!^)(?!$)/u', $str );
        if($strArr){
            
            foreach( $strArr as $k=>$v ){
                $firstWord = $pinyin->qupinyin($v,true);
                $firstWord = strtolower($firstWord);
                if( !in_array($firstWord,$englishLetter) ){
                    $firstWord = 'other'; 
                    //其他标示
                    $other = 'Other';
                }
                $data['firstWord'][] = $firstWord ;
                $upper = strtoupper($firstWord);
                if( (!in_array($upper, $data['upperWord']) && $firstWord != 'other' ) ){
                    $data['upperWord'][] = $upper;
                }
            }
            
            array_multisort($data['upperWord'],SORT_ASC) ;
            //如果有OTHER，那么放在数组尾部
            if( isset($other) ){
                $data['upperWord'][]=$other;
            }
        }
        $this->outJSON(200,'success',$data);
    }
    
    /*
     *返回品牌请求地址
     *
     */
    private function getBrandRequestUrl( $actionurl,$query_array,$brandId ){
            if(!$brandId) return ;
            $query_array['brandIds'] = $brandId ;
            return $actionurl.'?'.http_build_query($query_array);
    }
    
    /*
     *返回品牌首字母
     *@param $pinyinObj 拼音对象
     *@param $name 品牌名称
     *@return string 品牌名称第一个字的首字母
     */
     private function getBrandFirstWord( $pinyinObj,$name ){
            if( !$name ) return ;
            $firstWord = $pinyinObj->qupinyin( mb_substr($name,0,1,'UTF-8'),true);
            $firstWord = strtolower($firstWord);
            return $firstWord ;
     }
     
    /*
     *返回分类请求地址
     *
     */
    private function getCateRequestUrl( $actionurl,$query_array,$cateId ){
            if(!$cateId) return ;
            $query_array['categoryId'] = $cateId ;
            return $actionurl.'?'.http_build_query($query_array);
    }
     



    /**
     * 店铺搜索
     */
    public function shop(){

        $addrArr = getAddrGome();
        $param = [
            'callback' => 'rec',
            'boxid' => 'grec1191100',
            'cid' => isset($_COOKIE['__clickidc']) ? $_COOKIE['__clickidc'] : '',
            'currentpage' => I('param.page',1,'intval'),
            'area' => $addrArr['borId'],
            'imagesize' => '260',
            'uid' => $this->userId,
            'pagingid' => I('param.pagingid','','strval'),
            '_' => time().'000'
        ];

        $recomUri = C('GOME')['SERVICE']['RECOMMEND'].C('GOME_API')['ucenterRecom'].'?'.joinParam($param);
        $recomRes = $this->_curlHandler->request($recomUri, array(), 'get');
        $recomArr = analyzeOnline($recomRes, 'rec');
        //print_r($recomArr);
        $this->assign('nav_active',C('navActive.search_new_item'));
        $this->assign("selectWords",array('name'=>'店铺','selectkey'=>'shop'));
        //echo $recomUri; echo "<br>";
        if(isset($recomArr['lst']) && !empty($recomArr['lst']) && $recomArr['isSuccess'] == 'Y'){
            //拼接店铺id,批量获取店铺信息
            $shopids = array_column($recomArr['lst'], 'shopid');
            $shopids = implode(',',$shopids);
            $url = C('GOME')['SERVICE']['SHOP'].C('GOME_API')['shopList'].'?sid='.$shopids;
            //echo $url;
            $shopArr = $this->_curlHandler->request($url, array(), 'get');
            $shopArr = json_decode($shopArr,true);
            $res = [];
            if(isset($shopArr['data']) && !empty($shopArr['data'])){
                foreach ($shopArr['data'] as $key => $val){
                    $res[$val['id']] = $val;
                    $res[$val['id']]['shop_url'] = APP_HTTP . C('GOME')['URL']['SHOP_URL'].'/'.$val['id'];
                }
            }
            //print_r($res);

            //分页处理
            $page = new Page();
            $params_url = APP_HTTP.C('MALL_URL').'search/shop?';
            $page_param['pagingid'] = empty($recomArr['pagingid']) ? $param['pagingid'] : $recomArr['pagingid'];
            $link_url =  $page->show($recomArr['totalCount'],$recomArr['pageSize'],$param['currentpage'],$params_url,joinParam($page_param));
			$link_url = $this -> _handle_page_url($link_url);
            $this->assign('link_url',$link_url);
            $this->assign('shopArr',$res);
            $this->assign('recomArr',$recomArr['lst']);
            $this->display('Search/shop');
        }else{
            write_log($recomRes,$recomUri,$param,500);
            $this->display('Search/error');
        }
    }
    
    //计算商品排序链接
    private function _urlProductOrderFormat($array,$urlModel,$defOrder = 1){
        $keys = array(self::SEARCH_SORT_DEFAULT_TYPE,self::SEARCH_SORT_NEW_TYPE,self::SEARCH_SORT_PRICE_TYPE,self::SEARCH_SORT_SALES_TYPE);  
        $rs = array_fill_keys($keys,'');
        foreach ($rs as $k=>$v){
            $temp = $array ;
            $temp['sort'] = $k ;
            //综合和新品只走默认排序 ,2016-09-21 销量也走默认连接
            if( $k === self::SEARCH_SORT_DEFAULT_TYPE || $k===self::SEARCH_SORT_NEW_TYPE || $k===self::SEARCH_SORT_SALES_TYPE ){
                $temp['order'] = $defOrder ;
            }else{
                $temp['order'] = ($k===$array['sort'] && $array['order'] === $defOrder ) ? 0 :$defOrder ;
            }
            $findme = $replaceme = array();
            foreach ($temp as $kk=>$vv){
                $findme[] = '{$' . $kk . '}';
                $replaceme[] = $vv;
            }            
            $url = str_replace($findme, $replaceme, $urlModel);
            $rs[$k] = $url ;
        }
        return $rs ;
    }
    
    //计算店铺排序链接
    private function _urlShopOrderFormat($array,$urlModel,$defOrder = 1){
        $keys = array(self::SEARCH_SORT_DEFAULT_TYPE_S,self::SEARCH_SORT_SALES_TYPE_S,self::SEARCH_SORT_PEOPLE_TYPE_S);
        $rs = array_fill_keys($keys,'');
        foreach ($rs as $k=>$v){
            $temp = $array ;
            $temp['sort'] = $k ;
            //综合和销量和人气 都走默认排序 
            if( $k === self::SEARCH_SORT_DEFAULT_TYPE || $k===self::SEARCH_SORT_SALES_TYPE_S || $k=== self::SEARCH_SORT_PEOPLE_TYPE_S){
                //不做任何处理
                $temp['order'] = $defOrder ;
            }else{
                $temp['order'] = ($k===$array['sort'] && $array['order'] === 1 ) ? 0 : 1 ;
            }
            $findme = $replaceme = array();
            foreach ($temp as $kk=>$vv){
                $findme[] = '{$' . $kk . '}';
                $replaceme[] = $vv;
            }
            $url = str_replace($findme, $replaceme, $urlModel);
            $rs[$k] = $url ;
        }
        return $rs ;
    }
    
    //返回商品搜索结果
    private function getProductSearchData($params){
        $search = D("SearchV2");
        $params['keyword'] = urlencode($params['keyword']) ;
        $result = $search->getData($search->research_result_product,$params,false);
        $fifter_data = array();
        if($result['success'] && is_array($result['data'])){
            $fifter_data['page'] = array(
                'total' => $result['data']['count'],
                'pageNum' => $params['pageNum'],
                'numPerPage' => $params['pageSize'],
                'pageCount' => $result['data']['pageCount']
            );
            $fifter_data['list'] = $result['data']['items'];
            $fifter_data['spellcheck'] = $result['data']['spellcheck'];
        }
        return $fifter_data;
    }
    
    
    //返回埋点变量
    private function getProductBp($search_params){
        $pagename = '';
        $pageid = '';
        if($search_params['sort']==0){
            $pagename = '商品搜索-综合';
            $pageid = 'D001';
        } else if($search_params['sort']==1){
            $pagename = '商品搜索-销量';
            $pageid = 'D002';
        } else if($search_params['sort']==2){
            if($search_params['order']==1){
                $pagename = '商品搜索-价格大到小';
                $pageid = 'D004';
            } else if($search_params['order']==2){
                $pagename = '商品搜索-价格小到大';
                $pageid = 'D005';
            }
        } else if($search_params['sort']==3){
            $pagename = '商品搜索-新品';
            $pageid = 'D006';
        }
        return array('pagename'=>$pagename,'pageid'=>$pageid);
    }
    //返回店铺搜索结果
    private function getShopSearchData($params){
        $search = D("SearchV2");
        $params['searchWord'] = urlencode($params['searchWord']) ;
        $result = $search->getData($search->research_result_shop,$params,false);
        $fifter_data = array();
        if($result['success'] && is_array($result['data']))
        {
            $fifter_data['page'] = array(
                'total' => $result['data']['count'],
                'pageNum' => $params['pageNum'],
                'numPerPage' => $params['pageSize'],
                'pageCount' => $result['data']['pageCount']
            );
            $fifter_data['list'] = $result['data']['shops'];
        }
        return $fifter_data ;
    }


	//分页参数伪静态
	private function _handle_page_url ($str){
		$split = "  ";
		$str = trim($str);
		$arr = explode($split,$str);
		foreach ($arr as &$Item) {
			$pattern = "/shop\?pagingid=(\d+)&page=(\d+)/";
			$newStr  =Preg_replace($pattern,'shop_\\2.html?pagingid=\\1',$Item);
			$Item = $newStr;
		}
		return implode($split,$arr);
	}

}
