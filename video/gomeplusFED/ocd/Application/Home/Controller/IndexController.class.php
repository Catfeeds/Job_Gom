<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                           |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                                                                                     |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-23 13:49:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Home\Controller;
use Home\Controller\BaseController;
class IndexController extends BaseController
{
    protected  $cacheKey = 'pc_home_index'; //首页缓存key
    protected  $cachekeyBackups = 'pc_home_index_back'; //备份的缓存key
    protected  $delCacheParam = 'del_pc_home_index'; //删除首页缓存操作传参
   
	public function __construct()
	{
		parent::__construct();
		
	}
	
	/**
	 * 大首页
	 *
	 */
	public function index()
	{
	    $data = array();
	    $data = S($this->cacheKey);
	    $home = D("Home/Home");
	    //cms后台预览
	    if( isset($_GET['preview']) && $_GET['preview'] ){
	       if( $this->checkUrlKey( $_GET['preview'] ) ){
	           $data = curl_get(C('CMS_URL').$home->home_preview);
	           $data = json_decode($data,true) ;
	       }
	    }else{
	    
    	    if( isset( $_GET['debug_index'] ) && $_GET['debug_index'] == 'rmcache') { //更新数据
    	        //取接口数据
        	    //C('CMS_URL')cms接口网址
        	    $data = curl_get(C('CMS_URL').$home->home_index);
        	    $data = json_decode($data,true) ; 
        	    //非debug模式下才更新缓存
        	    if( $data['errorinfo']['http_code']==200 ){
        	        unset($data['errorinfo']);
        	        unset($data['error']);
        	        unset($data['errno']);
        	        foreach ($data['groups'] as $k=>$v){
        	            $temp_categroy_len = intval(mb_strlen($v['category_name'],'UTF-8') ) ;
        	            $temp_name_len = intval(mb_strlen($v['name'],'UTF-8'));
        	            $data['groups'][$k]['short_name'] = $temp_categroy_len + $temp_name_len > 13 ? mb_substr($v['name'], 0,13-$temp_categroy_len).'...' : $v['name'] ;
        	        }
        	        foreach ($data['commend'] as $k=>$v){
        	            $temp_categroy_len = intval(mb_strlen($v['category_name'],'UTF-8') ) ;
        	            $temp_name_len = intval(mb_strlen($v['name'],'UTF-8'));
        	            $data['commend'][$k]['short_name'] = $temp_categroy_len + $temp_name_len > 19 ? mb_substr($v['name'], 0,19-$temp_categroy_len).'...' : $v['name'] ;
        	        }
        	        S($this->cacheKey,$data,3600);
        	        S($this->cachekeyBackups,$data,3600*24);
        	        exit('更新成功');
        	    }else{
        	        exit('更新失败请联系管理员');
        	    }
    	    }
    	    if( !$data ){
    	        //取接口数据
    	        //C('CMS_URL')cms接口网址
    	        $data = curl_get(C('CMS_URL').$home->home_index);
    	        $data = json_decode($data,true) ;
    	        
    	        if( $data['errorinfo']['http_code']==200 ){
    	            unset($data['errorinfo']);
    	            unset($data['error']);
    	            unset($data['errno']);
    	           foreach ($data['groups'] as $k=>$v){
        	            $temp_categroy_len = intval(mb_strlen($v['category_name'],'UTF-8') ) ;
        	            $temp_name_len = intval(mb_strlen($v['name'],'UTF-8'));
        	            $data['groups'][$k]['short_name'] = $temp_categroy_len + $temp_name_len > 13 ? mb_substr($v['name'], 0,13-$temp_categroy_len).'...' : $v['name'] ;
        	        }
        	        foreach ($data['commend'] as $k=>$v){
        	            $temp_categroy_len = intval(mb_strlen($v['category_name'],'UTF-8') ) ;
        	            $temp_name_len = intval(mb_strlen($v['name'],'UTF-8'));
        	            $data['commend'][$k]['short_name'] = $temp_categroy_len + $temp_name_len > 19 ? mb_substr($v['name'], 0,19-$temp_categroy_len).'...' : $v['name'] ;
        	        }
    	            //更新缓存
    	            S($this->cacheKey,$data,3600);
    	            S($this->cachekeyBackups,$data,3600*24);
    	        }else{//启用备用缓存
    	            $data = S($this->cachekeyBackups);
        	        //更新缓存
        	        S($this->cacheKey,$data,3600);
        	        S($this->cachekeyBackups,$data,3600*24);
    	        }
    	    }
	    
	    }
        //TODO当前用户是否点赞 v2接口 接口暂时不支持
	    //页面数据
	    $data = $this->formatData($data);
		//首页广告配置
		$conf_ad_foucs = C('ADVERT_IDS.foucs');
		$conf_ad_guang = C('ADVERT_IDS.guangguang');
		$slotId = $conf_ad_foucs['second'] ? $conf_ad_foucs['first'].','.$conf_ad_foucs['second'] : $conf_ad_foucs['first'];
		$ad_flight_url = C('ADVERT_URL.FLIGHT')."flight?slotId=".$slotId."&requestType=4&directJsVar=\$GLOBAL_CONFIG['advert']";
		$ad_main_url = C('ADVERT_URL.MAIN').'ad/js/gaxflightpage.min.js';
		$this->assign('focus_ad_ids',$conf_ad_foucs);
		$this->assign('guang_ad_ids',$conf_ad_guang);
		$this->assign('adflight_url',$ad_flight_url);
		$this->assign('admain_url',$ad_main_url);

	    $this->assign('list', $data);
	    $this->assign('linkSum',count($data['friendLinks']));
	    //新加规则大首页不用h1标
	    $this->assign('nowurl','home/index');
	    //三要素
	    $this->assign('title', '国美+APP边玩边分享，购物不孤单 - 国美+官网');
	    $this->assign('keywords', '国美+APP,国美+APP下载,国美+官网,国美+iso版下载,国美+Android版下载');
	    $this->assign('description', '国美+APP是全新的社交电商平台，整合国美优质商家，以兴趣圈子为基础，达人为核心的社交购物社区，用户快乐分享同时轻松赚取返利佣金！赶快下载国美+APP！');
	    $this->display('Index/index');
	}
	
	//与cms预览定义验证方式
	private  function checkUrlKey($string){
	    $urlKey = C('ENCRYPT_CMS_KEY');
	    $str = md5($urlKey.date("Ymd"));
	    if( $str === $string ){
	        return true ;
	    }else{
	        return false;
	    }
	} 
	
	public function test(){
	    echo md5('n2AHwrMgwb705uCcNZURGsjZt'.date("Ymd"));
	}
	//校验数据完整性
	private function formatData($data){
	    if( !$data ) return ;
	    unset($data['goods']);
	    foreach ($data['banner'] as $k=>$v){
	        $data['banner'][$k]['tid'] = $v['tid'] ;
	        $data['banner'][$k]['name'] = $v['name'];
	    }
	    foreach ($data['commend'] as $k=>$v){
	        $data['commend'][$k]['voteNum'] = $v['voteNum'] ? $v['voteNum'] : 0 ;
	        $data['commend'][$k]['category_name'] = $v['category_name'] ;
	        $data['commend'][$k]['name'] = $v['name'] ;
	        $data['commend'][$k]['group_id'] = $v['group_id'] ;
	        $data['commend'][$k]['short_name'] = $v['short_name'] ;
	        $data['commend'][$k]['description'] = $v['description'] ;
	        $data['commend'][$k]['replyQuantity'] = $v['replyQuantity'];
	        foreach ($data['commend'][$k]['goods_ids'] as $kk=>$vv){
	            $data['commend'][$k]['goods_ids'][$kk]['mainImage'] = isset($vv['mainImage']) ? $vv['mainImage'] : '';
	            $data['commend'][$k]['goods_ids'][$kk]['name'] = isset($vv['name']) ? $vv['name']:'';
	            $data['commend'][$k]['goods_ids'][$kk]['price'] = isset($vv['price']) ? $vv['price']:'';
	            $data['commend'][$k]['goods_ids'][$kk]['coverImage'] = isset($vv['coverImage'] ) ? $vv['coverImage'] : '';
	        }
	    }
	    
	   
	    
	    foreach ($data['topics'] as $k=>$v){
	       $data['topics'][$k]['group_icon'] = $v['group_icon'] ;
	       $data['topics'][$k]['group_name'] = $v['group_name'] ;
	       $data['topics'][$k]['name'] = mb_substr($v['name'], 0,10,'UTF-8') ;
	       $data['topics'][$k]['origin_img_url'] = $v['origin_img_url'] ;
	       $data['topics'][$k]['voteNum'] = $v['voteNum'] ;
	       $data['topics'][$k]['replyQuantity'] = $v['replyQuantity'] ;
	    }
	    
	    foreach ($data['groups'] as $k=>$v){
	         $data['groups'][$k]['name'] = $v['name'] ;
	         $data['groups'][$k]['category_name'] = $v['category_name'] ;
	         $data['groups'][$k]['short_name'] = $v['short_name'] ;
	         $data['groups'][$k]['memberQuantity'] = $v['memberQuantity'] ;
	         $data['groups'][$k]['topicQuantity'] = $v['topicQuantity'] ;
	    }
	    
	    $data['goods'] = $data['newGoods'] ;
	    unset($data['newGoods']);
	    /* if( isset($data['goods']['keyword']) ){
    	    foreach ($data['goods']['keyword'] as $k=>$v){
    	        $data['goods']['keyword'][$k]['shortkeyword'] = mb_substr($v['keyword'], 0,6,'UTF-8');
    	    }
	    } */
	    for ($i=0;$i<=8;$i++){
	            $data['goods']['goods'][$i] = isset($data['goods']['goods'][$i] ) ? $data['goods']['goods'][$i] : array('tid'=>'','shop_id'=>'', 'name'=>'','select_type'=>'','origin_img_url '=>'','url'=>'');
	            $data['goods']['goods'][$i]['origin_img_url'] = isset($data['goods']['goods'][$i]['origin_img_url']) ? $data['goods']['goods'][$i]['origin_img_url']: '';
	    }
	    return $data ;
	    
	}
}
