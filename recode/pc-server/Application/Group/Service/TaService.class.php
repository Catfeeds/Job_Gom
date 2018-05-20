<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TaService.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:宋文超 <songwenchao@gomeplus.com>     	                          |
 * +----------------------------------------------------------------------+
 * | Date:2016-11-02							                          |
 * +----------------------------------------------------------------------+
 */
  
namespace Group\Service;
use Home\Service\BaseService;
class TaService extends BaseService
{
	protected $bs_version = 2;
	public $personalInfo = 'combo/personalInfoByGuest';		//个人主页（客态页） combo
	public $personalTopics = 'ext/social/ownedTopics';		//个人主页--我的话题列表 ext
	public $personalGroups = 'ext/social/ownedGroups';		//个人主页--我的圈子列表
}
