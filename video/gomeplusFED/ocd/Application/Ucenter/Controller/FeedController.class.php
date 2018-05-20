<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：FeedController.class.php                                  |
 * | Author:zhangting <zhangting@loyo24.com>                              |
 * +----------------------------------------------------------------------+
 * | Date:2016-10-12 10:13:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;
class FeedController extends AuthController 
{
	public function __construct()
	{
		parent::__construct();
		$this->feed = D("Ucenter/Feed");
		$this->assign('feed_btn_status',0);
	}

	/**
	 * 个人中心-检查用户信息
	 * 
	 */
	public function index(){
		$title= "";
		$desc = "";
		$arrInfo =$this->getFeedType();
		$this->assign('typeList',$arrInfo);
		$this->assign("title",$title);
		$this->assign("desc",$desc);
		$this->display('index');
	}

	/**
	 * 个人中心-获取用户反馈类型
	 * 
	 */
	
	private function getFeedType(){
	  $arrTypeList = $this->feed->getData($this->feed->feed_list);	
	  if($arrTypeList['success']){
		  $arrList= $arrTypeList['data']['list'];
	  }
	  else{
		  $arrList = array(); 
	  }

	  return $arrList;
	}
	/**
	 * 个人中心-获取用户信息接口
	 * 
	 */
	public function info(){
		$arrRetunMsg = array();
		$intFeedType = I('param.feedType','','intval');	
		$baseContent = $content     = I('param.content','','trim');
		$ImgUrl		 = I('param.imgUrl','',"trim");
		sensitive($baseContent);
		if(empty($intFeedType) || empty($content)){
			$arrRetunMsg['success']     = false;
			$arrRetunMsg['code']        = 10001;
			$arrRetunMsg['message']     = "参数格式错误";
			$arrRetunMsg['data']        = array();
			$this->response($arrRetunMsg);
			exit;
		}
		else{
			$strToken = $this->token;
			$strImgUrl = "";
			if(!empty($ImgUrl)){
				$arrImgUrl = json_decode($ImgUrl,true);
				$strImgUrl = implode(",",$arrImgUrl);
			}
			$arrParams = array(
					"loginToken"   => $strToken,
					"feedbackType" => $intFeedType,
					"content"      => $content,
					"imageUrl"     => $strImgUrl,
					);
			$arrData = $this->feed->postData($this->feed->upload_feed,$arrParams);
			$this->response($arrData);
		}
	}
	/**
	 * 个人中心-提交信息结果页面
	 * 
	 */
	public function result(){
		$intType = I('param.type',0,'intval');	
		if($intType){
			$desc = "提交成功";	
		}
		else{
			$desc = "提交失败";	
		}
		$title = "";
		$desc = "";
		$this->assign("title",$title);
		$this->assign("desc",$desc);
		$this->assign("desc",$desc);
		$this->display("show");
	}
}
