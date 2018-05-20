<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：DraftsService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2017-05-26
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Service;
use Common\Lib\Mconn;
use Home\Service\BaseService;
class DraftsService extends BaseService
{
	//数据表名
	private $tableName = 'socialExpertDrafts';

	//数据库名
	private $dbName = 'social';

	//数据库连接资源
	private $draftsObj = null;

	public function __construct()
	{
		$this->draftsObj = new Mconn();
		parent::__construct();
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
		$skip = ($pageNum - 1) * $pageSize;
		$filter = array(
			'userId' => $this->userId,
		);
		$options = array(
			'sort' => array('addTime' => -1),
			'limit' => $pageSize,
			'skip' => $skip
		);
		if(!empty($fields))
		{
			$projectionArr = array();
			foreach($fields as $val)
			{
				$projectionArr[$val] = 1;
			}
			$options['projection'] = $projectionArr;
		}

		$res = $this->draftsObj->find($this->tableName, $filter, $options);
		return xss_clean_recursive($res);
	}

	/**
	 * 获取草稿箱某一条数据的详细信息
	 * @param $tid  草稿箱话题ID
	 * @return array|bool|string
	 */
	public function getDraftsDetail($tid)
	{
		$id = new \MongoDB\BSON\ObjectID($tid);
		$filter = array(
			'userId' => $this->userId,
			'_id' => $id
		);
		$res = $this->draftsObj->find($this->tableName, $filter);

		return xss_clean_recursive($res[0]);
	}

	/**
	 * 删除草稿箱里的某条数据
	 * @param $tid  草稿箱话题ID
	 * @return array|bool|string
	 */
	public function delDraftsItem($tid)
	{
		$id = new \MongoDB\BSON\ObjectID($tid);
		$filter = array(
			'userId' => $this->userId,
			'_id' => $id
		);
		$res = $this->draftsObj->delete($this->tableName, $filter);
		return xss_clean_recursive($res);
	}

	/**
	 * 新增草稿箱
	 * @param $saveData
	 * @return array|bool|string
	 */
	public function addDraftsItem($saveData)
	{
		$res = $this->draftsObj->insert($this->tableName, $saveData);
		return xss_clean_recursive($res);
	}

	/**
	 * 更新草稿箱
	 * @param $tid
	 * @param $saveData
	 * @return array|bool|string
	 */
	public function upDraftsItem($tid, $saveData)
	{
		$id = new \MongoDB\BSON\ObjectID($tid);
		$filter = array(
			'userId' => $this->userId,
			'_id' => $id
		);
		$res = $this->draftsObj->update($this->tableName, $filter, $saveData);
		return xss_clean_recursive($res);
	}

	/**
	 * 获取数据总数
	 * @return array|bool|string
	 */
	public function getDraftsCount()
	{
		$filter = array(
			'userId' => $this->userId
		);
		$res = $this->draftsObj->count($this->tableName, $filter);
		!empty($res) ? '' : $res = 0;
		return xss_clean_recursive($res);
	}
}
