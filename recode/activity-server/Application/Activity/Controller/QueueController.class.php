<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：QueueController.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：队列操作类
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2017-12-01
 * +----------------------------------------------------------------------+
 */
namespace Activity\Controller;
use Home\Controller\BaseController;
class QueueController extends BaseController
{
	//队列名称
	const QUEUE_NAME = 'queue_warm_0';

	//队列生存时间（单位：秒）
	const QUEUE_EXPIRE = 60*60*24*5;

	private static $_cache = null;

	public function __construct()
	{
		if(empty(self::$_cache))
		{
			self::$_cache = S([]);
		}
	}

	/**
	 * 向队列中写入数据
	 * @param $queueData    带入队列数据
	 * @return bool
	 */
	public function rpushQueue($queueData)
	{
		$queueDataStr = serialize($queueData);
		$dealRes = self::$_cache->rpush(self::QUEUE_NAME, $queueDataStr);

		if(false === $dealRes)
		{
			return false;
		}
		else
		{
			if(1 == $dealRes)
			{
				//初次写入数据时，设置队列生存时间
				self::$_cache->expire(self::QUEUE_NAME, self::QUEUE_EXPIRE);
			}
			return true;
		}
	}

	/**
	 * 获取队列左侧头元素
	 * @return bool
	 */
	public function lpopQueue()
	{
		$lpopData = self::$_cache->lpop(self::QUEUE_NAME);
		if(false === $lpopData)
		{
			return false;
		}
		else
		{
			return unserialize($lpopData);
		}
	}

	/**
	 * 返回队列的剩余生存时间
	 * @return bool
	 */
	private function _ttlQueue()
	{
		if(!self::$_cache->exists(self::QUEUE_NAME))
		{
			return false;
		}
		else
		{
			return self::$_cache->ttl(self::QUEUE_NAME);
		}
	}
}