<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                          |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ImController.class.php                                |
 * +----------------------------------------------------------------------+
 * | @程序功能： IM即时聊天管理                                                                                              |
 * +----------------------------------------------------------------------+
 * | Author:李帅 <lishuai@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-10-24 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Controller;
use Home\Controller\AuthController;
use Common\Lib\EpiCurl;
class ImController extends AuthController
{
	//聊天对象类型 xm:小美,shop店铺,user：用户
	const IM_XM = 'xm';
	const IM_SHOP = 'shop';
	const IM_USER = 'user';
	const IM_OBJ = array('xm','shop','user');
	public function __construct()
	{
		parent::__construct();	
	}
	

	
	/**
	 * Im入口
	 *
	 */
	public function index()
	{
		$imtype = I("param.imtype",0,'strval');
		//如果没传递类型，默认和小美聊天
		$imtype = ($imtype && in_array($imtype, self::IM_OBJ ) ) ? $imtype : self::IM_XM ;

		$imid = I("param.imid",0,'intval');
		//除了和小美聊天外都必须带id
		if(!$imid && $imtype != self::IM_XM){
			header('location:'.APP_HTTP.C('MAIN_URL') );
		}

		$data['imIconUrl'] = C('IM_ICON_URL') ;
	    $data['imSdkUrl'] = C('IM_SDK_URL') ; 
        $data['imStaticPath'] = C('IM_STATICPATH');
        $data['imExpUrl'] = C('IM_EXP_URL');
        $data['imUserId'] = $this->userId ;
        $data['appId'] = C('IM_APPID') ;
        $temp = $this->getImConf($this->userId);
        $data['token'] = $temp['token'];
	    $this->assign('ImConf',$data);
	    $this->assign("imtype",$imtype);
	    //js-pre
	    $this->assign("imid",$imid);
		$this->display('Im/index');
	}
	
	
	/*
	批量获取商家列表头像	

	*/
	public function initShopList(){
	    import('Common.Lib.EpiCurl');
	    $shopsId = I("param.shopsId","");
	    if( !$shopsId ) $this->outError(\Think\ErrorCode::PARMA_ERROR) ;

	    $shop = D("Mall/ShopV2");
	    $shopArr = explode("_", $shopsId);
	    $result = array();
	    if( $shopArr && is_array($shopArr) ){
    	    foreach ($shopArr as $val){
    	      $array[$val]    = array('url'=>connectParam($shop,$shop->get_shop_info,array('id'=>$val,'integrity'=>'simple') ) ); 
    	    }
    	    $result = multi_curl($array);
	    }
	    if($result){
		   foreach ( $result as $k => $v ) {
			   	$arr = json_decode( $v,true );
			   	$arr['data']['icon'] = getResizeImg( $arr['data']['icon'],80,80 ) ;
			    $result[$k] = $arr  ;
		    }
	    }
	    $this->ajaxReturn($result);
	}


	/*
	获取token	

	*/
	public function getToken(){
	    $data = $this->getImConf($this->userId);
	    $this->outJSON('200','ok',$data);
	}

	private function getImConf($user_id)
	{
	    $userId = $user_id ;
	    $timestamp = time();
	    $sign = $this->getSign(C('IM_APPID'),$timestamp,C('IM_APPKEY'));
	    $paraUrl = '?imUserId='.$userId.'&appId='.C('IM_APPID').'&deviceType=30&signature='.$sign.'&timestamp='.$timestamp;
	
	    $ImApi = D("Ucenter/Im");

	    $imUrl = C('IM_URL').$ImApi->tokenurl.$paraUrl ;
	    $data = curl_get( $imUrl);
	    $data = json_decode($data,true);
	    if($data['code'] === 0 ){
	        $data = $data['data'] ;
	    }
	    return $data ;
	}
	
	
	private function getSign($appId,$timestamp,$appKey)
	{
			return md5($appId."|".$timestamp."|".$appKey);
	}


	

}
