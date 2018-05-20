<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：BackupController.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：将队列数据备份到mysql
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2017-12-02
 * +----------------------------------------------------------------------+
 */
namespace Activity\Controller;
use Home\Controller\BaseController;
class BackupController extends BaseController
{
	//队列无数据或获取数据失败时等待时长（单位：秒）
	const WAIT_TIME = 10;

	/**
	 * 读取队列数据，同步到mysql，同步失败，则失败数据回写队列
	 */
	public function backup()
	{
		$queueData = A('Activity/Queue')->lpopQueue();
		if(false === $queueData)
		{
			//记录日志
			writeErrorLog(['队列无数据']);
			sleep(self::WAIT_TIME);
		}
		else
		{
			$userService = D('Activity/User');
			$updateRes = $userService
				->where('user_id=%d', $queueData['userId'])
				->lock(true)
				->setInc('wh_value', intval($queueData['warmNum']));
			if(false === $updateRes)
			{
				//记录日志
				$logParam = [
					'errMsg' => '暖心值更新失败',
					'errData' => json_encode($queueData)
				];
				writeErrorLog($logParam);
				A('Activity/Queue')->rpushQueue($queueData);
			}
		}
	}
}