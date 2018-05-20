<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class OrderService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:zhangting-ds1 <zhangting-ds1@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/7/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Service;
use Home\Service\BaseService;

class TopicService extends BaseService
{
	//每页最大数据条数
	const PAGE_SIZE_MAX = 30;

	//接口允许的最大页码
	const PAGE_NUM_MAX = 5;

    public $key = 'TopicService';
    public $param = array();
    public $bs_version = 2;

    public $topic_list_v2 = 'ext/social/ownedTopics';//我的话题列表T25
	public $topicCollectList = 'ext/collection/myTopicCollections';	//个人中心--话题收藏列表
	public $topicCollectDel = 'collection/topicCollections';  //个人中心--删除话题收藏
	public $hotTopics = 'ext/peapod/hotTopics';//热门话题

	public $myRelated     = 'ext/social/myRelatedGroups';//我加入的圈子 && 我创建的圈子 T4
	public $check_circle  = 'social/ownedGroupQuantity';//检测圈子是否上限T16

    //圈子操作
    public $social_group = 'social/group';

    //圈子信息
    public $group_ext_info = '/ext/social/group';


	/**
	 * 获取已发布的话题
	 * @param $pageNum
	 * @param $pageSize
	 * @param $userId
	 * @param $areaCode
	 * @return mixed
	 */
	public function publishedTopic($pageNum, $pageSize, $userId, $areaCode)
	{
		$param = array();

		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['ownerUserId'] = $userId;
		$param['areaCode'] = $areaCode;

		if($param['pageNum'] > self::PAGE_NUM_MAX)
		{
			$param['pageNum'] = self::PAGE_NUM_MAX;
		}

		if($param['pageSize'] > self::PAGE_SIZE_MAX)
		{
			$param['pageSize'] = self::PAGE_SIZE_MAX;
		}

		$res = $this->getData($this->topic_list_v2, $param);

		if($res['success'])
		{
			foreach($res['data']['topics'] as &$val)
			{
				$dealRes = $this->dealTopic($val['components']);
				$val['newComponents'] = $dealRes;
				unset($val);
			}
		}

		return $res;
	}

	/**
	 * 获取热门话题
	 * @param $pageNum
	 * @param $pageSize
	 * @return array|bool|mixed|string
	 */
	public function hotTopics($pageNum, $pageSize)
	{
		$param = array();

		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;

		$res = $this->getData($this->hotTopics, $param);

		if($res['success'])
		{
			foreach($res['data']['peas'] as &$val)
			{
				$dealRes = $this->dealTopic($val['components']);
				$val['newComponents'] = $dealRes;
				unset($val);
			}
		}

		return $res;
	}

	public function collectedTopic($pageNum, $pageSize, $userId, $areaCode)
	{
		$param = array();

		$param['pageNum'] = $pageNum;
		$param['pageSize'] = $pageSize;
		$param['ownerUserId'] = $userId;
		$param['areaCode'] = $areaCode;

		if($param['pageNum'] > self::PAGE_NUM_MAX)
		{
			$param['pageNum'] = self::PAGE_NUM_MAX;
		}

		if($param['pageSize'] > self::PAGE_SIZE_MAX)
		{
			$param['pageSize'] = self::PAGE_SIZE_MAX;
		}

		$res = $this->getData($this->topicCollectList, $param);

		if($res['success'])
		{
			foreach($res['data']['collections'] as &$val)
			{
				$dealRes = $this->dealTopic($val['topic']['components']);
				$val['topic']['newComponents'] = $dealRes;
				unset($val);
			}
		}
		return $res;
	}

	/**
	 * 处理话题数据
	 * @param $componentsArr
	 */
	private function dealTopic($componentsArr)
	{
		$returnArr = array();
		if(empty($componentsArr))
		{
			return $returnArr;
		}

		$textStr = '';
		foreach($componentsArr as $itemVal)
		{
			if($itemVal['type'] == 'image' && !empty($itemVal['url']))
			{
				$returnArr['image'][] = array(
					'url' => $itemVal['url'],
					'isOnLine' => empty($itemVal['isOnLine']) ? false : true
				);
			}
			else if($itemVal['type'] == 'item' && !empty($itemVal['item']['mainImage']))
			{
				$returnArr['item'][] = array(
					'url' => $itemVal['item']['mainImage'],
					'shopId' => $itemVal['shopId'],
					'item' => $itemVal['item']
				);
			}
			else if($itemVal['type'] == 'video' && !empty($itemVal['coverImage']))
			{
				$returnArr['video'][] = array(
					'url' => $itemVal['coverImage']
				);
			}
			else if($itemVal['type'] == 'text' && empty($textStr))
			{
				$textStr = strip_tags(trim($itemVal['text']));
			}
		}
		$returnArr['text'] = $textStr;

		return $returnArr;
	}

    /**
     * 获取我加入的圈子和我创建的圈子
     */
    public function getMyRelatedGroups(){
        $result = $this->getData($this->myRelated);
        if($result['success'] && !empty($result['data'])){
            return $result['data'];
        }else{
            return [];
        }
    }

    /**
     * 获取带会员信息的圈子信息
     * @param $groupId
     * @return array
     */
    public function getGroupInfo( $groupId ){

        if(empty($groupId)){
            return [];
        }
        $result = $this->getData($this->group_ext_info,['id' => $groupId]);
        if($result['success'] && !empty($result['data']) ) {
            return $result['data'];
        }else{
            return [];
        }
    }

    /**
     * 解散圈子
     * @param $groupId
     * @return array
     */
    public function delGroupByGid( $groupId ){
        $result = $this->deleteData($this->social_group,['id' => $groupId]);
        return $result;
    }

	/**
	 * 检测用户创建的圈子上限
	 * @return array
	 */
	public function ownedGroupQuantity(){
		$result = $this->getData($this->check_circle);
		return $result;
	}

	/**
	 * 删除收藏的话题
	 * @param $ids
	 * @return array
	 */
	public function delCollectedTopics( $ids ){
		$result = $this->deleteData($this->topicCollectDel,['ids' => $ids]);
		return $result;
	}
}
