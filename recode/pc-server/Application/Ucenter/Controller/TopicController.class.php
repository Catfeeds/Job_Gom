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
	//话题列表每页最大数据条数
	const PAGE_SIZE_MAX = 15;

	//热门话题每页最大数据条数
	const HOT_PAGE_SIZE_MAX = 8;

	//接口允许的最大页码
	const PAGE_NUM_MAX = 5;

	//话题列表标题最大字数
	const TOPIC_TITLE_MAX = 28;

	//话题描述最大字数
	const TOPIC_TEXT_MAX = 30;

    //二级城市ID
    private $addressId = '11010000';
    
	public function __construct()
	{
		parent::__construct();
        
        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];
		$this->myhome_url = APP_HTTP.C('GOME')['URL']['UCENTER_URL'];
		$this->group_url = APP_HTTP.C('UCENTER_URL').'group/all';
	}
	/**
	 * 社交-我的话题列表
	 * 
	 */
	public function published()
	{
		//面包屑
		$crumbs = crumbsMap(
			[
				"{{1}}" => $this->myhome_url,
				"{{2}}" => $this->group_url
			]
		);
		$this->assign('title', '我的话题');
		$this->assign('activeUrl', '/topic');
		$this->assign('crumbs', $crumbs);
		$this-> display('Topic/published');
	}

	/**
	 * 获取已发布的话题
	 */
	public function publishedTopic()
	{
		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::PAGE_SIZE_MAX, 'intval');
		$userId = $this->userId;
		$areaCode = $this->addressId;

		if($pageNum > self::PAGE_NUM_MAX)
		{
			$pageNum = self::PAGE_NUM_MAX;
		}

		if($pageSize > self::PAGE_SIZE_MAX)
		{
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$topic = D('Ucenter/Topic');

		$res = $topic->publishedTopic($pageNum, $pageSize, $userId, $areaCode);

		if($res['success'])
		{
			$res['data']['pageSize'] = $pageSize;
			foreach($res['data']['topics'] as &$val)
			{
				//话题图片显示规则：商品图片 》 话题图片 》 视频图片
				$imageArr = array();
				if(!empty($val['newComponents']['item']))
				{
					$imageArr[] = array(
						'url' => getResizeImg($val['newComponents']['item'][0]['url'], 260, 260 ),
						'type' => 'item'
					);
				}
				if(!empty($val['newComponents']['image']))
				{
					$imageArr[] = array(
						'url' => !empty($val['newComponents']['image'][0]['isOnLine']) ? getResizeImg($val['newComponents']['image'][0]['url'], 260, 260 ) : getResizeImg($val['newComponents']['image'][0]['url'], 230, 0 ,'MEIXIN'),
						'type' => 'image'
					);
				}
				if(!empty($val['newComponents']['video']))
				{
					$imageArr[] = array(
						'url' => getResizeImg($val['newComponents']['video'][0]['url'], 230, 0, 'MEIXIN'),
						'type' => 'video'
					);
				}
				if(!empty($imageArr))
				{
					$val['imageShow'] = $imageArr[0]['url'];
					$val['imageType'] = $imageArr[0]['type'];
				}
				else
				{
					$val['imageShow'] = '';
					$val['imageType'] = '';
				}

				//话题描述
				if(!empty($val['newComponents']['text']))
				{
					$val['textShow'] = msubstr($val['newComponents']['text'], 0, self::TOPIC_TEXT_MAX, C('DEFAULT_CHARSET'));
				}
				else
				{
					$val['textShow'] = '';
				}

				//话题标题
				if(!empty($val['name']))
				{
					$val['nameShow'] = msubstr($val['name'], 0, self::TOPIC_TITLE_MAX, C('DEFAULT_CHARSET'));
				}
				else
				{
					$val['nameShow'] = '';
				}

				//话题发布时间
				$val['createTimeStr'] = date('Y-m-d H:i:s', substr($val['createTime'], 0, 10));

				//话题评论数
				$val['replyShow'] = $val['replyQuantity'] + $val['subReplyQuantity'];

				unset($val);
			}
		}

		$this->response($res);
	}

	/**
	 * 热门话题
	 */
	public function hotTopics()
	{
		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::HOT_PAGE_SIZE_MAX, 'intval');

		if($pageNum > self::PAGE_NUM_MAX)
		{
			$pageNum = self::PAGE_NUM_MAX;
		}

		if($pageSize > self::HOT_PAGE_SIZE_MAX)
		{
			$pageSize = self::HOT_PAGE_SIZE_MAX;
		}

		$topic = D('Ucenter/Topic');

		$res = $topic->hotTopics($pageNum, $pageSize);

		if($res['success'])
		{
			foreach($res['data']['peas'] as $key => &$val)
			{
				//话题图片显示规则：话题图片 》 视频图片，缺失图片则对应话题不显示
				$imageArr = array();
				if(!empty($val['newComponents']['image']))
				{
					$imageArr[] = array(
						'url' => getResizeImg($val['newComponents']['image'][0]['url'], 78, 78 ),
						'type' => 'image'
					);
				}
				if(!empty($val['newComponents']['video']))
				{
					$imageArr[] = array(
						'url' => getResizeImg($val['newComponents']['video'][0]['url'], 78, 78),
						'type' => 'video'
					);

				}
				if(!empty($imageArr))
				{
					$val['imageShow'] = $imageArr[0]['url'];
					$val['imageType'] = $imageArr[0]['type'];
				}
				else
				{
					unset($res['data']['peas'][$key]);
					continue;
				}

				//话题标题
				if(!empty($val['name']))
				{
					$val['nameShow'] = msubstr($val['name'], 0, self::TOPIC_TITLE_MAX, C('DEFAULT_CHARSET'));
				}
				else
				{
					$val['nameShow'] = '';
				}

				//话题评论数
				$val['replyShow'] = $val['replyQuantity'] + $val['subReplyQuantity'];

				unset($val);
			}

			$res['data']['peas'] = array_values($res['data']['peas']);
		}

		$this->response($res);
	}

	/**
	 * 社交-我收藏的话题
	 */
	public function collected()
	{

		//面包屑
		$crumbs = crumbsMap(
			[
				"{{1}}" => $this->myhome_url,
				"{{2}}" => $this->group_url
			]
		);
		$this->assign('title', '我的话题');
		$this->assign('crumbs', $crumbs);
		$this->assign('activeUrl', '/topic');
		$this-> display('Topic/collected');
	}


	/**
	 * 获取收藏的话题
	 */
	public function collectedTopic(){

		$pageNum = I('pageNum', 1, 'intval');
		$pageSize = I('pageSize', self::PAGE_SIZE_MAX, 'intval');
		$userId = $this->userId;
		$areaCode = $this->addressId;

		if($pageNum > self::PAGE_NUM_MAX){
			$pageNum = self::PAGE_NUM_MAX;
		}
		if($pageSize > self::PAGE_SIZE_MAX){
			$pageSize = self::PAGE_SIZE_MAX;
		}

		$topic = D('Ucenter/Topic');
		$res = $topic->collectedTopic($pageNum, $pageSize, $userId, $areaCode);

		if($res['success']){

			//跟发布话题统一数据机构
			$res['data']['pageSize'] = $pageSize;
			$res['data']['topics'] = $res['data']['collections'];
			unset($res['data']['collections']);

			foreach($res['data']['topics'] as &$val) {
				$collectedTime =  date('Y-m-d H:i:s', substr($val['collectedTime'], 0, 10));
				$delId = $val['id'];  //删除收藏要用的id
				//话题图片显示规则：商品图片 》 话题图片 》 视频图片
				$val = $val['topic'];

				$imageArr = array();
				if(!empty($val['newComponents']['item'])) {
					$imageArr[] = getResizeImg($val['newComponents']['item'][0]['url'], 260, 260);
				}
				if(!empty($val['newComponents']['image'])) {
					$imageArr[] = !empty($val['newComponents']['image'][0]['isOnLine']) ? getResizeImg($val['newComponents']['image'][0]['url'], 260, 260 ) : getResizeImg($val['newComponents']['image'][0]['url'], 285, 185,'MEIXIN');
				}
				if(!empty($val['newComponents']['video'])) {
					$imageArr[] = getResizeImg($val['newComponents']['video'][0]['url'], 260, 146);
				}
				if(!empty($imageArr)) {
					$val['imageShow'] = $imageArr[0];
				}else{
					$val['imageShow'] = '';
				}

				//话题描述
				if(!empty($val['newComponents']['text'])) {
					$val['textShow'] = msubstr($val['newComponents']['text'], 0, self::TOPIC_TEXT_MAX, C('DEFAULT_CHARSET'));
				}else{
					$val['textShow'] = '';
				}

				//话题标题
				if(!empty($val['name'])){
					$val['nameShow'] = msubstr($val['name'], 0, self::TOPIC_TITLE_MAX, C('DEFAULT_CHARSET'));
				}else{
					$val['nameShow'] = '';
				}

				//话题发布时间
				$val['createTimeStr'] = $collectedTime;
				//话题评论数
				$val['replyShow'] = $val['replyQuantity'] + $val['subReplyQuantity'];

				//删除要用的id
				$val['delId'] = $delId;

				unset($val);
			}
		}
		//print_r($res);die;
		$this->response($res);
	}

	/**
	 * 删除我收藏的话题
	 */
	public function delTopic(){

		$arr = [];
		$ids = xss_clean(I('param.ids', '', 'strval'));
		$tid = xss_clean(I('param.tid', '', 'strval'));
		$gid = xss_clean(I('param.gid', '', 'strval'));

		$tid_arr = explode(',',$tid);
		$gid_arr = array_unique(explode(',',$gid));

		foreach ($tid_arr as $row){
			deleteSocialCache('topic','',$row);
		}

		foreach ($gid_arr as $val){
			deleteSocialCache('group',$val);
		}

		if(!$ids){
			$arr['success'] = false;
			$arr['code'] = \Think\ErrorCode::PARMA_ERROR;
			$arr['message'] = \Think\ErrorCode::getErrMsg($arr['code']);
			$this->response($arr);
		}

		$ids = trim($ids, ',');
		$res = D('Ucenter/Topic')->delCollectedTopics($ids);
		$this->response($res);
	}

	/**
	 * 我收藏的话题/提供给在线
	 */
	public function follow(){
		$this->assign('title', '我的收藏');
		//$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'collect/topic') ; //左侧选中的地址
		$this->display('Topic/follow');
	}
}
