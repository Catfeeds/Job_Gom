<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ShopController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能： 找回门店密码controller.class.php                         |
 * +----------------------------------------------------------------------+
 * | Author:zhangting <zhangting@loyo24.com>                              |
 * +----------------------------------------------------------------------+
 * | Date:2016-09-08 10:13:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Passport\Controller;
use Home\Controller\BaseController;

class ShopController extends BaseController 
{
	const _SHOP_PWD  = 'find_shop_pwd_';
	const CACHE_TIME = 28800;
	public function __construct()
	{
		parent::__construct();
		$this->shop = D('Shop');//v2
	}
	/**
	 * 展示门店页面index
	 * 
	 */
	public function index(){
		$this->writeMc($url="index",$status=0);
		$title="门店密码找回";
		$this->assign('title',$title);
		$this->display('index');
	}
	/**
	 *检查门店信息是否匹配
	 * 
	 */
	public function check(){
		$cardNo = I('param.carid','','trim');	
		$mobile = I('param.mobile','','trim');
		if(empty($cardNo) || empty($mobile)){
			$this->outError(\Think\ErrorCode::UPLOAD_ERROR);
		}
		$arrParams = array(
					"cardNo"=>$cardNo,
					"mobile"=>$mobile,
				);
		$this->shop->setTimeOut(15);
		$arrData = $this->shop->postData($this->shop->ResetPassword,$arrParams);
		if($arrData['success']){
			$status = 1;
		}
		else{
			$status = 0;	
		}

		$this->writeMc($url='',$status=1,$mobile);	
		$this->response($arrData);
	}
	/**
	 * 写入缓存
	 * 
	 */
	private function writeMc($url,$status,$mobile){
		$userId = $this->userId;
		$mcKeys = self::_SHOP_PWD.$userId;
		$strData = S($mcKeys);
		if(!empty($strData)){
		  $arrData=unserialize($strData);	
		  if(!empty($url)){
			$arrData['url']=$url;
		  }
		  if(!empty($status)){
			$arrData['status']=$status;
		  }
		  if(!empty($mobile)){
			$arrData['mobile'] = $mobile;
		  }
		}else{
			$arrData['url'] = $url;
			$arrData['status'] = $status;
			$arrData['mobile'] = $mobile;
		}
		$strData = serialize($arrData);
		S($mcKeys,$strData,self::CACHE_TIME);
		return $arrData;
	}
	/**
	 *展示结果页面
	 * 
	 */
	public function result(){
		$arrInfo =$this -> writeMc($url="",$status=0);	
		$intStatus = $arrInfo['status'];
		$mobile	   = $arrInfo['mobile'];
		$url       = $arrInfo['url'];
		if(empty($url) || ($url != "index")){
			header("location: /shop/index");	
			exit;
		}
		$this->assign('status',$intStatus);
		$this->assign('mobile',$mobile);
		$this->display('result');
	}
}
