<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：RdraftsService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：Redis实现草稿箱
 * +----------------------------------------------------------------------+
 * | Author:songwenchao
 * +----------------------------------------------------------------------+
 * | Date:2017-07-25
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Service;
use Common\Lib\Mconn;
use Home\Service\BaseService;
class RdraftsService extends BaseService
{

    private static $_redisHandle;
    private $minTime;
    private $maxTime;
	public function __construct()
	{
	    parent::__construct();
        self::$_redisHandle = S([]);
        $this->minTime = 0;
        $this->maxTime = 32503654800000;
        $this->bs_version = 2;
	}

	/**
	 * 获取草稿箱话题列表
	 * @param $pageNum
	 * @param $pageSize
	 * @param array $fields 需要返回的字段
	 * @return array|bool|string
	 */
	public function getDraftsList($pageNum, $pageSize, $fields=array())
	{
        $zSetName = $this->_getDataKey($this->userId);
        $start = ($pageNum - 1) * $pageSize;
        $end = $pageSize * $pageNum - 1;
        $draft = self::$_redisHandle->zrevrange($zSetName,$start, $end,true);

        $draftList = [];
        if($draft) {
            foreach ($draft as $key => $item) {
                $draftCacheId = $this->_getDataKey($this->userId."_".$key, 'item');//草稿详情真实的Key
                $info = json_decode(self::$_redisHandle->get($draftCacheId),true);
                $info['_id'] = $key;
                $topicItem = [];
                foreach ($fields as $field){
                    foreach ($info as $fkey=>$ele){
                        if($field == $fkey){
                            $topicItem[$field] = $ele;
                        }
                    }
                }
                $draftList[] = $topicItem;
            }
        }

        return ($draftList);
	}

	/**
	 * 获取草稿箱某一条数据的详细信息
	 * @param $tid  草稿箱话题ID
	 * @return array|bool|string
	 */
	public function getDraftsDetail($tid)
	{
        $draftCacheId = $this->_getDataKey($this->userId."_".$tid, 'item');//草稿详情真实的Key
		$res = self::$_redisHandle->get($draftCacheId);
		$res = json_decode($res,true);
        $res['_id'] = $tid;
		return xss_clean_recursive($res);
	}

	/**
	 * 删除草稿箱里的某条数据
	 * @param $tid  草稿箱话题ID
	 * @return array|bool|string
	 */
	public function delDraftsItem($tid)
	{
        $zSetName = $this->_getDataKey($this->userId);
        $draftCacheId = $this->_getDataKey($this->userId."_".$tid, 'item');//草稿详情真实的Key

        if(self::$_redisHandle->zrem($zSetName,$tid)){
            $res = self::$_redisHandle->del($draftCacheId);
        }else{
            $res = 0;
        }

		return xss_clean_recursive($res);
	}


	/**
	 * 新增草稿箱
	 * @param $saveData
	 * @return array|bool|string
	 */
	public function addDraftsItem($saveData)
	{
        $zSetName = $this->_getDataKey($this->userId);
        $draftId = getRandStr();//暴露给Controller的草稿ID
        $draftCacheId = $this->_getDataKey($this->userId."_".$draftId, 'item');//草稿详情真实的Key

        if(self::$_redisHandle->zadd($zSetName, $saveData['addTime'], $draftId)){
            $res = self::$_redisHandle->set($draftCacheId,json_encode($saveData),0);
//            $res = 0;
            if(!$res){
                self::$_redisHandle->zrem($zSetName,$draftId);
                $res = null;
            }
        }else{
            $res = null;
        }
        if($res){
            $result = ['insertedId' => $draftId];
            return xss_clean_recursive($result);
        }
	}

	/**
	 * 更新草稿箱
	 * @param $tid
	 * @param $saveData
	 * @return array|bool|string
	 */
	public function upDraftsItem($tid, $saveData)
	{
        $zSetName = $this->_getDataKey($this->userId);
        $draftCacheId = $this->_getDataKey($this->userId."_".$tid, 'item');//草稿详情真实的Key

        self::$_redisHandle->zadd($zSetName, $saveData['addTime'], $tid);//如果集合中存在$tid元素 zadd命令成功之后返回值为0
        if(self::$_redisHandle->zScore($zSetName, $tid) == $saveData['addTime']){
            $res = self::$_redisHandle->set($draftCacheId,json_encode($saveData),0);
        }else{
            $res = null;
        }
        if($res){
            return xss_clean_recursive($saveData);
        }
	}

	/**
	 * 获取数据总数
	 * @return array|bool|string
	 */
	public function getDraftsCount()
	{
        $zSetName = $this->_getDataKey($this->userId);
        $res = self::$_redisHandle->zcount($zSetName,$this->minTime,$this->maxTime);
        return xss_clean_recursive($res);
	}

    /**
     * 通过用户ID获取集合的Key值
     * @param $userId  用户ID
     * @param $type zset表示获取Redis集合的Key，item表示获取Redis String的Key
     * @return string
     */
    private function _getDataKey($key,$type='zset'){
        if($type == 'zset'){
            return "drafts_list_".$key;
        }else{
            return "drafts_item_".$key;
        }
    }


}
