<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：MyGroupController.class.php                               |
 * +----------------------------------------------------------------------+
 * | @程序功能： 我的圈子管理                                             |
 * +----------------------------------------------------------------------+
 * | Author:zhangting <zhangting@loyo24.com>                              |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-07 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;

class GroupController extends  AuthController
{
    public function __construct()
    {
        parent::__construct();
		$this->topic_v2 = D('Ucenter/Topic');//v2
	    $this->assign('activeUrl','/group/index') ; //左侧选中的地址
    }
	/**
	 * 社交-我的圈子
	 * 
	 */
	public function index(){
		$description="";//描述
		$keywords="";//关键字
		$this -> assign('description',$description);
		$this->assign('keywords',$keywords);
		$this->assign('title', '我的圈子');
		$this -> display('Group/index');	
	}
	//处理公共部分的数据
	private function handleData(){
		$arrSendData['imaster'] = array();//创建的圈子
		$arrSendData['imember'] = array();//加入的圈子
		$arrSendData['success'] = false;
		$arrMyRelated = $this->topic_v2->getData($this->topic_v2->myRelated);
		if($arrMyRelated['success'])
		{
			$arrSendData['success'] = true;
			foreach ($arrMyRelated['data']['imaster'] as $key => $info)
			{
				$arrItem['id']   = $info['id'];
				$url =strtolower($info['icon']);
				if(!strstr('head-default.png',$url)){
					$arrItem['icon'] = getResizeImg($info['icon'],230,230);//处理图片大小
				}
				else{
					$arrItem['icon'] = $info['icon'];
				}


				$arrItem['name'] = $info['name'];
				$arrItem['topicQuantity']  = $info['topicQuantity'];//话题
				$arrItem['memberQuantity'] = $info['memberQuantity'];//成员
				$arrItem['auditState'] = $info['auditState'];//状态
				array_push($arrSendData['imaster'],$arrItem);
			}			
			foreach ($arrMyRelated['data']['imember'] as $key => $Item)
			{
				$url =strtolower($Item['icon']);
				if(!strstr('head-default.png',$url)){
					$arrItem['icon'] = getResizeImg($Item['icon'],230,230);//处理图片大小
				}
				else{
					$arrItem['icon'] = $Item['icon'];
				}
				$arrItem['name'] = $Item['name'];
				$arrItem['topicQuantity'] = $Item['topicQuantity'];
				$arrItem['memberQuantity'] = $Item['memberQuantity'];
				$arrItem['id'] = $Item['id'];
				$arrItem['auditState'] = $Item['auditState'];//状态
				array_push($arrSendData['imember'],$arrItem);
			}
		}
		return $arrSendData;
	}
	/**
	 * 得到用户圈子信息
	 * 
	 */
	public function sendgroupData(){
		$arrInfo =$this->handleData();
		$this->response($arrInfo);
	}
	/**
	 * 检测用户创建的圈子上限
	 * 
	 */
	public function check(){
		$arrReturn = array();
		$arrInfo = $this->topic_v2->getData($this->topic_v2->check_circle);	
		if($arrInfo['code'] == 403){
			$arrReturn['success'] = true;
			$arrReturn['check'] = 0;//不可以
			$arrReturn['msg'] = "";
		}
		elseif($arrInfo['code'] == 200){
			if($arrInfo['success']['data']['quantity'] >= 5){
				$arrReturn['success'] = true;
				$arrReturn['check']	= 0;//不可以
				$arrReturn['msg'] = "";
			}
			else{
				$arrReturn['success'] = true;
				$arrReturn['check']	 = 1;//可以
				$arrReturn['msg'] = "";
			}
				
		}
		else{
			$arrReturn['success'] = false;
			$arrReturn['check'] = "";
			$arrReturn['msg'] = '';
		}
		$this -> response($arrReturn);
	}
}
