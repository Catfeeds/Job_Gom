<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                               |
* +----------------------------------------------------------------------+
* | @程序功能：商品详情页                                                  |
* +----------------------------------------------------------------------+
* | Author:lishuai <lishuai@gomeplus.com>                                   |
* +----------------------------------------------------------------------+
* | Date:2016-08-18 11:23:11 CST                                               |
* +----------------------------------------------------------------------+
*/


namespace Mall\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;

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
     * @var 店铺排序类型 |默认：0; 销量：1;人气：2;
     */
    const SEARCH_SORT_DEFAULT_TYPE_S = 0;
    const SEARCH_SORT_SALES_TYPE_S = 1;
    const SEARCH_SORT_PEOPLE_TYPE_S = 2;
     
    const PAGE_SIZE = 40; //分页每页条数
    
    /**
     * 商品搜索
     */
    public function index()
    {
        $urlArray = $params = array();
        $params['keyword'] = $urlArray['word']=  isset($_GET['word']) ? urldecode($_GET['word']) : ''; //模糊搜索关键词
        $urlParam = '';
        $show_word =   xss_clean($params['keyword']);
        $urlArray['word'] = urlencode($urlArray['word']);
        if( trim($params['keyword']) !== "" ){
            //分页规则
            $urlParam .= 'word='.$urlArray['word'].'&' ;
            $urlModel = APP_HTTP.C('MALL_URL').'search/index?word={$word}&' ;
            $seoMap = seoMap(1,array("{{1}}"=>$show_word));

        }else{
            //分页规则
            $urlModel = APP_HTTP.C('MALL_URL').'search/index?' ;
            $seoMap = seoMap(2,array("{{1}}"=>$show_word));
        }
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign("selectWords",array('name'=>'商品','keyword'=>$show_word,'selectkey'=>'goods'));
        
        $spell = I('param.spell',1,'intval') ;
        if( $spell !== 0 && trim($params['keyword']) !== "" ){//开启纠错
            $params['spellcheck'] =  'true'  ;
        }else{//不开启纠错
            $params['spellcheck'] =  'false'  ;
            $urlModel.='spell=0&'; 
            $urlParam.= 'spell=0&';
        }
        $urlModel.= 'sort={$sort}&order={$order}&page={$page}';
        $params['sort'] = $urlArray['sort'] = I('param.sort',0,'intval'); //排序字段
        $urlParam.= 'sort='.$urlArray['sort'].'&' ;
        $params['order'] = $urlArray['order'] = I('param.order',0,'intval'); //排序方式
        $urlParam.= 'order='.$urlArray['order']; 
        $params['pageNum'] =  I('param.page',1,'intval'); //第几页
        $params['pageSize'] = self::PAGE_SIZE; //每页条数
        
        $data = $this->getProductSearchData($params);

        if($data['page']['pageCount'] <=0  && $data['page']['total']<=0 ){
            $this->assign('researchWord',htmlentities($params['keyword']));
            //跳转到搜索为空页面
            $this->display('Search/error');
            exit;
        }
        
        //是否显示纠错结构
        $showSpellcheck = false ;
        if(  isset($params['spellcheck']) && $params['spellcheck'] && $data['spellcheck']['type'] ){
            $showSpellcheck = true ;
            //原来的链接地址
            $data['spellcheck']['originWordUrl'] = APP_HTTP.C('MALL_URL').'search/index?word='.$urlArray['word'].'&spell=0';
            $this->assign("selectWords",array('name'=>'商品','keyword'=>xss_clean($data['spellcheck']['suggestWord']),'selectkey'=>'goods'));
        }
        
        $search_param_1 = '';
        if ( isset($params['spellcheck']) && $params['spellcheck'] && $data['spellcheck']['type'] && $data['spellcheck']['suggestWord']){
            $search_param_1 = '找到“'.xss_clean($data['spellcheck']['suggestWord']).'”相关';
        }
        elseif($params['keyword']){
            $search_param_1 = '找到“'.$show_word.'”相关';
        }      
        //分页处理
        $page = new Page();
        $params_url = APP_HTTP.C('MALL_URL').'search/index?';
       
        $link_url =  $page->show($data['page']['total'],$data['page']['numPerPage'],$data['page']['pageNum'],$params_url,$urlParam);
        //排序链接
        $urlArray['page'] = 1 ;
        $orderUrl = $this->_urlProductOrderFormat($urlArray,$urlModel);

        $this->assign('order_url',$orderUrl);
        
        //顶部菜单选中热销商品
        $nav_active = ($urlArray['order']==1 && $urlArray['sort']==1) ? C('navActive.search_hot_item') : 0;
       
        //搜索显示
        
        $this->assign('showSpellcheck',$showSpellcheck);
        $this->assign('nav_active',$nav_active);
        $this->assign('link_url',$link_url);
        $this->assign('search_index',crumbsMap(array("{{1}}"=>$search_param_1,"{{2}}"=>$data['page']['total'])));
        $this->assign('search_params',$params);
        $this->assign('search_data',$data);
        $this->assign('sourceCode',C('sourceCode.search_mall_search_index'));
        $this->assign('bpData',$this->getProductBp($params));
    
        $this->display('Search/index');
    }

    /**
     * 店铺搜索
     */
    public function shop(){
        //控制页面缓存
        $urlArray = $params = array();
        $params['searchWord'] = $urlArray['word']=  isset($_GET['word']) ? urldecode($_GET['word']) : ''; //模糊搜索关键词
        $urlParam = '';
        $show_word =   xss_clean($params['searchWord']);
        $urlArray['word'] = urlencode($urlArray['word']);
        if( trim($params['searchWord']) !== "" ){
            //分页规则
            $urlParam .= 'word='.$urlArray['word'].'&' ;
            $urlModel = APP_HTTP.C('MALL_URL').'search/shop?word={$word}&' ;
            $seoMap = seoMap(1,array("{{1}}"=>$show_word));
        
        }else{
            //分页规则
            $urlModel = APP_HTTP.C('MALL_URL').'search/shop?' ;
            $seoMap = seoMap(2,array("{{1}}"=>$show_word));
        }
        $urlModel.= 'sort={$sort}&order={$order}&page={$page}';
        $params['order'] = $urlArray['sort'] = I('param.sort',0,'intval'); //排序字段
        $urlParam.= 'sort='.$urlArray['sort'].'&' ;
        $params['orderType'] = $urlArray['order'] = I('param.order',0,'intval'); //排序方式
        $urlParam.= 'order='.$urlArray['order'];
        $params['pageNum'] =  I('param.page',1,'intval'); //第几页
        $params['pageSize'] =  20 ; //每页条数
        $data = $this->getShopSearchData($params);

        
        $this->assign("selectWords",array('name'=>'店铺','keyword'=>$show_word,'selectkey'=>'shop'));
        
        if($data['page']['pageCount'] <=0  && $data['page']['total']<=0 ){
            $this->assign('researchWord',$show_word);
            //跳转到搜索为空页面
            $this->display('Search/error');
            exit;
        }
        $search_param_1 = '';
        if($params['searchWord']){
            //面包屑截取
            $crumbsMapstr = mb_strlen($show_word) > 10 ? mb_substr($show_word, 0,10).'...' : $show_word ;
            $search_param_1 = '找到“'.$crumbsMapstr.'”相关';
        }

        //店铺等级
        foreach ($data['list'] as $k=>$v){
            $level['medal']= '';
            $level['medalNum']= 0;
            if ($v['shop']['type'] == 'xpop') {
                $medal = levelMedal($v['shopLevel']['level']);/*获取店铺奖章*/
                if(is_array($medal))
                {
                    $level['medal']= $medal['medal'];
                    $level['medalNum']= $medal['medalNum'];
                }
            }
            $data['list'][$k]['level'] = $level ;
            $data['list'][$k]['shopLevel']['describeGrade'] = number_format($v['shopLevel']['describeGrade'],1);
            $data['list'][$k]['shopLevel']['serviceGrade'] = number_format($v['shopLevel']['serviceGrade'],1);
            $data['list'][$k]['shopLevel']['expressGrade'] = number_format($v['shopLevel']['expressGrade'],1);
            
        }
        
        //顶部菜单选中好店推荐
        $nav_active = ($urlArray['order']==1 && $urlArray['sort']==0) ? C('navActive.search_new_item') : 0;
        
        //分页处理
        $page = new Page();
        $params_url = APP_HTTP.C('MALL_URL').'search/shop?'; 
        $link_url =  $page->show($data['page']['total'],$data['page']['numPerPage'],$data['page']['pageNum'],$params_url,$urlParam);
        
        //排序链接
        $urlArray['page'] = 1 ;
        $orderUrl = $this->_urlShopOrderFormat($urlArray,$urlModel);
        $this->assign('nav_active',$nav_active);
        $this->assign('order_url',$orderUrl);
        $this->assign('link_url',$link_url);
        $this->assign('search_data', $data );
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        
        $this->assign('search_shop',crumbsMap(array("{{1}}"=>$search_param_1,"{{2}}"=>$data['page']['total'])));
        $this->assign('search_params',$params);
        $this->display('Search/shop');
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
            } else if($search_params['order']==0){
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
}