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

class TopicController extends  AuthController
{
	public function __construct()
	{
		parent::__construct();
		$this->topic_v2 = D('Ucenter/Topic');//v2
	    $this->assign('activeUrl','/topic/index') ; //左侧选中的地址
	}
	/**
	 * 社交-我的话题列表
	 * 
	 */
	public function index(){
		$pageNum  = I('param.pageNum',1,'intval');
		$pageSize = I('param.pageSize',10,'intval');
		$description="";//描述
		$keywords="";//关键字
		$this->assign('description',$description);
		$this->assign('keywords',$keywords);
		$this->assign('title', '我的话题');
		$this-> display('Topic/list');
	}
	/**
	 * 社交-处理话题功能列表数据
	 * 
	 */
	private function handleData($pageNum,$pageSize){
		$arrSendData['data'] = array();
		$arrSendData['page'] = array();
		$arrSendData['success'] =false;
		$params = array(
				'pageNum'=>$pageNum,
				'pageSize' =>$pageSize,
				'ownerUserId'=>$this->userId,
				);
		$arrTopicList = $this->topic_v2->getData($this->topic_v2->topic_list_v2,$params);
		if($arrTopicList['success'])
		{
			$arrSendData['success'] = true;
			foreach ($arrTopicList['data']['topics'] as $key => $Item)
			{
				$arrItem['title'] = xss_clean( $Item['name'] );
				$arrItem['groupName'] = xss_clean( $Item['group']['name'] );
				$arrItem['groupicon'] = $Item['group']['icon'];
				$arrItem['groupid']   = $Item['group']['id'];
				$arrItem['time'] = Date("Y-m-d",$Item['createTime']/1000);
				$arrItem['topid'] = $Item['id'];
				array_push($arrSendData['data'],$arrItem);
			}
		}
		$arrSendData['page']['page'] = $pageNum;
		return $arrSendData;
	}

	/**
	 * 社交-得到话题列表通过ajax
	 * 
	 */
	public function getTopicByAjax(){
		$pageNum  = I('param.pageNum',1,'intval');
		$pageSize = I('param.pageSize',10,'intval');
		$arrInfo  = $this->handleData($pageNum,$pageSize);	
		$this->response($arrInfo);
	}
}
