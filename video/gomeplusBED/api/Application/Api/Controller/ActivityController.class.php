<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：ActivityController.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：活动页接口
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2017-05-05
 * +----------------------------------------------------------------------+
 */
namespace Api\Controller;
use Api\Controller\BaseController;

class ActivityController extends BaseController
{
	//话题列表每页条数
	const TOPIC_PAGE_SIZE = 20;
	//城市ID
	private $addressId = '11010000';

	/**
	 * 获取用户创建的圈子数量+发布的话题数量
	 */
	public function socialBaseNum()
	{
		$userId = xss_clean(I('get.uid', '', 'strval'));
		$createGroup = 1;
		$joinGroup = 0;
		$topic = 1;

		if(empty($userId))
		{
			$this->outJsonpError('jsonp', \Think\ErrorCode::PARMA_ERROR);
		}

		$res = D('Services/TopicChannel')->socialBaseNum($userId, $createGroup, $joinGroup, $topic);

		$dataArr = array();
		if($res['success'])
		{
			$dataArr['topicNum'] = $res['data']['topicQuantity'];
			$dataArr['groupNum'] = $res['data']['ownedGroupQuantity'];
		}

		$res['data'] = $dataArr;

		$this->ajaxReturn($res, 'jsonp');
	}

	/**
	public function outError($code){
		if($code<1) exit("param error.");
		$this->response(output($code,\Think\ErrorCode::getErrMsg($code)));
	}
	 *

	/**
	 * 根绝圈子ID获取话题列表
	 */
	public function topicListByGid()
	{
		$groupId = xss_clean(I('get.gid', '', 'strval'));
		$pageNum = I('get.pnum', 1, 'intval');
		$pageSize = I('get.psize', self::TOPIC_PAGE_SIZE, 'intval');
		$callback = xss_clean(I('get.callback', '', 'strval'));

		if(empty($groupId))
		{
			if(!empty($callback))
			{
				$this->outJsonpError('jsonp', \Think\ErrorCode::PARMA_ERROR);
			}
			else
			{
				$this->outJsonpError('json', \Think\ErrorCode::PARMA_ERROR);
			}
			exit;
		}

		if($pageSize > self::TOPIC_PAGE_SIZE)
		{
			$pageSize = self::TOPIC_PAGE_SIZE;
		}

		$res = D('Services/Groups')->groupTopics($groupId, $pageNum, $pageSize);

		$dataArr = array();
		if($res['success'] && !empty($res['data']['topics']))
		{
			foreach($res['data']['topics'] as $val)
			{
				$tempArr = array();
				$tempArr['id'] = $val['id'];
				$tempArr['name'] = $val['name'];
				$tempArr['labels'] = !empty($val['labels']) ? $val['labels'] : array();
				$tempArr['pageview'] = !empty($val['pageview']) ? $val['pageview'] : 0;
				$tempArr['likeQuantity'] = !empty($val['like']['userQuantity']) ? $val['like']['userQuantity'] : 0;
				$tempArr['replyQuantity'] = $val['replyQuantity'] + $val['subReplyQuantity'];
				$dataArr[] = $tempArr;
			}
		}

		$res['data'] = $dataArr;

		if(!empty($callback))
		{
			$this->ajaxReturn($res, 'jsonp');
		}
		else
		{
			echo json_encode($res);
			exit;
		}

		//$this->ajaxReturn($res);
	}

	/**
	 * 根据话题Id获取话题详情（后端使用）
	 */
	public function topicDetailByTidBack()
	{
		$tid = xss_clean(I('get.tid', '', 'strval'));
		$callback = xss_clean(I('get.callback', '', 'strval'));

		if(empty($tid))
		{
			if(!empty($callback))
			{
				$this->outJsonpError('jsonp', \Think\ErrorCode::PARMA_ERROR);
			}
			else
			{
				$this->outJsonpError('json', \Think\ErrorCode::PARMA_ERROR);
			}
			exit;
		}

		$res = D('Services/TopicChannel')->topicDetail($tid);

		$dataArr = array();
		if($res['success'])
		{
			$dataArr['id'] = $res['data']['id'];
			$dataArr['name'] = $res['data']['name'];
			$dataArr['labels'] = !empty($res['data']['labels']) ? $res['data']['labels'] : array();
		}

		$res['data'] = $dataArr;

		if(!empty($callback))
		{
			$this->ajaxReturn($res, 'jsonp');
		}
		else
		{
			echo json_encode($res);
			exit;
		}

//		$this->ajaxReturn($res);
	}

	/**
	 * 根据话题Id获取话题详情（前端使用）
	 */
	public function topicDetailByTidFront()
	{
		$ids = trim(xss_clean(I('get.tid', '', 'strval')), ',');
		$callback = xss_clean(I('get.callback', '', 'strval'));
		$reply = 1;
		$like = 1;
		$pageview = 1;
		$collect = 0;

		if(empty($ids))
		{
			if(!empty($callback))
			{
				$this->outJsonpError('jsonp', \Think\ErrorCode::PARMA_ERROR);
			}
			else
			{
				$this->outJsonpError('json', \Think\ErrorCode::PARMA_ERROR);
			}
			exit;
		}

		$idArr = explode(',', $ids);
		$res = D('Services/TopicChannel')->topicStatistic($idArr, $reply, $like, $pageview, $collect);

		if(!empty($res))
		{
			$dataArr = array_values($res);
			$returnArr = array(
				'success' => true,
				'code'    => 200,
				'message' => '成功',
				'data'    => $dataArr
			);
			if(!empty($callback))
			{
				$this->ajaxReturn($returnArr, 'jsonp');
			}
			else
			{
				echo json_encode($returnArr);
				exit;
				//$this->ajaxReturn($returnArr, 'json');
			}
		}
		else
		{
			if(!empty($callback))
			{
				$this->outJsonpError('jsonp', \Think\ErrorCode::DATA_RECEIVE_ERROR);
			}
			else
			{
				$this->outJsonpError('json', \Think\ErrorCode::DATA_RECEIVE_ERROR);
			}
			exit;
		}
	}

	/**
	 * 根据用户ID获取用户创建的圈子数量
	 */
	public function groupNumByUid()
	{
		$userId = xss_clean(I('get.uid', '', 'strval'));
		$callback = xss_clean(I('get.callback', '', 'strval'));
		$createGroup = 1;
		$joinGroup = 0;
		$topic = 0;

		if(empty($userId))
		{
			if(!empty($callback))
			{
				$this->outJsonpError('jsonp', \Think\ErrorCode::PARMA_ERROR);
			}
			else
			{
				$this->outJsonpError('json', \Think\ErrorCode::PARMA_ERROR);
			}
			exit;
		}

		$res = D('Services/TopicChannel')->socialBaseNum($userId, $createGroup, $joinGroup, $topic);

		$dataArr = array();
		if($res['success'])
		{
			$dataArr['groupNum'] = $res['data']['ownedGroupQuantity'];
		}

		if(!empty($callback))
		{
			$this->ajaxReturn($res, 'jsonp');
		}
		else
		{
			echo json_encode($res);
			exit;
		}
	}

	/**
	 * 根据圈子ID获取圈子基本信息
	 */
	public function groupDetailByGid()
	{
		$groupId = xss_clean(I('get.gid', '', 'strval'));
		$callback = xss_clean(I('get.callback', '', 'strval'));
		$integrity = 'simple';

		if(empty($groupId))
		{
			if(!empty($callback))
			{
				$this->outJsonpError('jsonp', \Think\ErrorCode::PARMA_ERROR);
			}
			else
			{
				$this->outJsonpError('json', \Think\ErrorCode::PARMA_ERROR);
			}
			exit;
		}

		$res = D('Services/Groups')->groupDetail($groupId, $integrity);

		$dataArr = array();
		if($res['success'])
		{
			$dataArr['id'] = $res['data']['id'];
			$dataArr['name'] = $res['data']['name'];
			$dataArr['icon'] = $res['data']['icon'];
		}

		$res['data'] = $dataArr;

		if(!empty($callback))
		{
			$this->ajaxReturn($res, 'jsonp');
		}
		else
		{
			echo json_encode($res);
			exit;
		}

//		$this->ajaxReturn($res);
	}

	/**
	 * 接口参数错误时返回
	 * @param $backType 返回类型    json||jsonp
	 */
	private function outJsonpError($backType, $errorCode)
	{
		switch($backType)
		{
			case 'json':
				$this->ajaxReturn(output($errorCode,\Think\ErrorCode::getErrMsg($errorCode)));
				break;
			case 'jsonp':
				$this->ajaxReturn(output($errorCode,\Think\ErrorCode::getErrMsg($errorCode)), 'jsonp');
				break;
		}
	}
}
