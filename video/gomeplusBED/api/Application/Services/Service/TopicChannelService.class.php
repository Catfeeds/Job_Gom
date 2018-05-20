<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称： Class TopicChannelService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：频道相关接口
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2017/05/05
 * +----------------------------------------------------------------------+
 */

namespace Services\Service;
use Services\Service\BaseService;

class TopicChannelService extends BaseService
{
	//默认城市ID
	const DEFAULT_ADDRESS_ID = '11010000';

	public $key = 'TopicService';
	public $param = array();
	public $bs_version = 2;

	public $topic_list_v2 = 'ext/social/ownedTopics';//我的话题列表T25
	public $topicCollectList = 'ext/collection/myTopicCollections';	//话题收藏列表ext
	public $topicDetail = 'social/topic';//话题信息
	public $topicNum = 'social/topicStatistics';//批量获取话题评论数,点赞数,浏览量
	public $socialBaseNum = 'social/userStatistics';//获取某人创建圈子数、加入的圈子数、我发布的话题数
	public $feed = 'combo/feed';//不断寻觅

	/**
	 * 获取已发布的话题
	 * @param $pageNum  int     页码
	 * @param $pageSize int     每页条数
	 * @param $userId   long    用户ID
	 * @param $areaCode string  区域代码
	 * @return mixed
	 */
	public function publishedTopic($pageNum, $pageSize, $userId, $areaCode = self::DEFAULT_ADDRESS_ID)
	{
		$res = $this->getData(
			$this->topic_list_v2,
			array(
				'pageNum' => $pageNum,
				'pageSize' => $pageSize,
				'ownerUserId' => $userId,
				'areaCode' => $areaCode
			)
		);

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
	 * 不断寻觅
	 * @param $pageNum  int     页码
	 * @param $pageSize int     每页条数
	 * @param $userId   long    用户ID
	 * @param $areaCode string  区域代码
	 * @return array|bool|mixed|string
	 */
	public function feed($pageNum, $pageSize, $userId, $areaCode = self::DEFAULT_ADDRESS_ID)
	{
		$res = $this->getData(
			$this->feed,
			array(
				'pageNum' => $pageNum,
				'pageSize' => $pageSize,
				'ownerUserId' => $userId,
				'areaCode' => $areaCode
			)
		);

		if($res['success'])
		{
			foreach($res['data']['feedTopics'] as &$val)
			{
				$dealRes = $this->dealTopic($val['components']);
				$val['newComponents'] = $dealRes;
				unset($val);
			}
		}

		return $res;
	}

	/**
	 * 收藏的话题
	 * @param $pageNum  int     页码
	 * @param $pageSize int     每页条数
	 * @param $userId   long    用户ID
	 * @param $areaCode string  区域代码
	 * @return array|bool|mixed|string
	 */
	public function collectedTopic($pageNum, $pageSize, $userId, $areaCode = self::DEFAULT_ADDRESS_ID)
	{
		$res = $this->getData(
			$this->topicCollectList,
			array(
				'pageNum' => $pageNum,
				'pageSize' => $pageSize,
				'ownerUserId' => $userId,
				'areaCode' => $areaCode
			)
		);

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
	 * 根据话题ID获取话题详情
	 * @param $tid          string  话题ID
	 * @param $showRichText boolean 是否显示富文本
	 * @param $areaCode     string  区域编码
	 * @return array|bool|mixed|string
	 */
	public function topicDetail($tid, $showRichText = false, $areaCode = self::DEFAULT_ADDRESS_ID)
	{
		$data = $this->getData(
			$this->topicDetail,
			array(
				'id' => $tid,
				'showRichText' => $showRichText,
				'areaCode' => $areaCode
			)
		);

		return $data;
	}

	/**
	 * 根据话题ID获取话题的点赞+评论+浏览量
	 * @param $idArr    array   话题id列表,用","分隔
	 * @param $reply    int     是否需要返回评论数[0,不需要返回, 1需要返回]
	 * @param $like     int     是否需要返回点赞数[0,不需要返回, 1需要返回]
	 * @param $pageview int     是否需要返回浏览量[0,不需要返回, 1需要返回]
	 * @param $collect  int     是否需要返回收藏量[0,不需要返回, 1需要返回]
	 */
    public function topicStatistic( $idArr ,$reply=1, $like=1, $pageview=1, $collect=1) {
        if( empty( $idArr ) ) return ;
        $idsStr = implode(',',$idArr);
        $param['ids'] = $idsStr ;
        $param['like'] = $like ;
        $param['reply'] = $reply ;
        $param['pageview'] = $pageview;
        $param['collect'] = $collect;
        $data = $this->getData($this->topicNum,$param);

        $ret = [];
        foreach( $idArr as $k => $v ) {
            if( $data['success'] && $data['data']['topics'] ){
                foreach($data['data']['topics'] as $kk=>$vv){
                    if( $v == $vv['id'] ){
                        $ret[$v] = $vv;
                    }
                }
                if( !isset($ret[$v]) ){
                    $ret[$v] = array('id'=>$v,'likeQuantity'=>0,'replyQuantity'=>0,'pageview'=>0,'collectQuantity'=>0);
                }
            }else{
                $ret[$v] = array('id'=>$v,'likeQuantity'=>0,'replyQuantity'=>0,'pageview'=>0,'collectQuantity'=>0);
            }

        }

        return $ret;
    }

	/**
	 * 根据用户ID获取创建圈子+加入圈子+话题数
	 * @param $userId       long    用户ID
	 * @param $createGroup  int     是否需要返回创建圈子数[0,不需要返回, 1需要返回]
	 * @param $joinGroup    int     是否需要返回加入圈子数[0,不需要返回, 1需要返回]
	 * @param $topic        int     是否需要返回发布的话题数[0,不需要返回, 1需要返回]
	 * @return array|bool|mixed|string
	 */
	public function socialBaseNum($userId, $createGroup, $joinGroup, $topic)
	{
		$data = $this->getData(
			$this->socialBaseNum,
			array(
				'userId' => $userId,
				'createGroup' => $createGroup,
				'joinGroup' => $joinGroup,
				'topic' => $topic
			)
		);

		return $data;
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

}
