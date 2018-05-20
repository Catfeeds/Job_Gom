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
 * | Author:liluming                             |
 * +----------------------------------------------------------------------+
 * | Date:2017-05-02                                    |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;

class GroupController extends  AuthController
{
	private $topic ;
    public function __construct(){
        parent::__construct();
		$this->topic = D('Ucenter/Topic');//v2
    }

	/**
	 * 社交-我的圈子
	 */
	public function all(){

        //面包屑
        $crumbs = crumbsMap(
            [
                "{{1}}" => APP_HTTP.C('GOME')['URL']['UCENTER_URL'],
                "{{2}}" => APP_HTTP.C('UCENTER_URL').'group/all'
            ]
        );
        $this->assign('crumbs', $crumbs);

		$description = '';//描述
		$keywords = '';//关键字
		$this->assign('description',$description);
		$this->assign('keywords',$keywords);
		$this->assign('title', '我的圈子');
		$this->assign('activeUrl','/group/all') ; //左侧选中的地址
		$this->display('Group/index');

	}



	/**
	 * 获取我的圈子
	 */
	public function getMyGroups(){

		$arr['imaster'] = [];
		$arr['imember'] = [];
		$arr['success'] = false;

		$result = $this->topic->getMyRelatedGroups();
		if(!empty($result)){
			$arr['success'] = true;
			if(isset($result['imaster']) && !empty($result['imaster'])){
				$arr['imaster'] = $this->getIMasterData($result['imaster']);
			}
			if(isset($result['imember']) && !empty($result['imember'])){
				$arr['imember'] = $this->getIMemberData($result['imember']);
			}
		}
		//print_r($arr);die();
		$this->response($arr);
	}


	/**
	 * 处理我创建的圈子信息
	 * getIMasterData()
	 * @param $data
	 * @return arr
	 */
	private function getIMasterData($data){

		$arr = [];
		foreach ($data as $key => $info) {

			$item['id']   = $info['id'];
			$url =strtolower($info['icon']);
			if(strpos($url,'circle-default.png') === false){
				$item['icon'] = getResizeImg($info['icon'],260,260);//处理图片大小
			}else{
				$item['icon'] = str_replace('circle-default','circle-default2',$info['icon']);
			}
			$item['name'] = $info['name'];
			$item['topicQuantity']  = formatNum($info['topicQuantity']);//话题
			$item['memberQuantity'] = formatNum($info['memberQuantity']);//成员
			$item['auditState'] = $info['auditState'];//状态
			$arr[] = $item;
		}
		return $arr;
	}

	/**
	 * 处理我加入的圈子信息
	 * getIMemberData()
	 * @param $data
	 * @return arr
	 */
	private function getIMemberData($data){

		$arr = [];
		foreach ($data as $key => $info) {
			$url = strtolower($info['icon']);
			if(strpos($url,'circle-default.png') === false){
				$item['icon'] = getResizeImg($info['icon'],260,260);//处理图片大小
			}else{
				$item['icon'] = str_replace('circle-default','circle-default2',$info['icon']);
			}
			$item['name'] = $info['name'];
			$item['topicQuantity'] = formatNum($info['topicQuantity']);
			$item['memberQuantity'] = formatNum($info['memberQuantity']);
			$item['id'] = $info['id'];
			$item['auditState'] = $info['auditState'];//状态

			//获取创建人的信息
			$result = $this->topic->getGroupInfo($info['id']);
			if($result['user']['facePicUrl']){
				$result['user']['facePicUrl'] = getResizeImg($result['user']['facePicUrl'],80,80,'ONLINE');
			}
			$item['user'] = $result['user'];
			$arr[] = $item;
		}
		//print_r($arr);die;
		return $arr;
	}

	/**
	 * 解散圈子
	 * delGroupByGid
	 */
	public function delGroupByGid(){

		$arr = [];
		$groupId = I('param.groupId','','trim');
		if(empty($groupId)) {
			$arr['success'] = false;
			$arr['code'] = \Think\ErrorCode::PARMA_ERROR;
			$arr['message'] = \Think\ErrorCode::getErrMsg($arr['code']);
			$this->response($arr);
		}
		$result = $this->topic->delGroupByGid($groupId);
		$this->response($result);
	}
	
}
