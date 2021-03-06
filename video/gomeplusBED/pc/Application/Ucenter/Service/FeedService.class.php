<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AddressService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-08 10:20:53 CST										  |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Service;
use Home\Service\BaseService;
class FeedService extends BaseService
{
	public $feed_list   = "user/get_feedback_type_list.json";//用户意见类型list T624 v1
	public $upload_feed = "user/add_feedback_1.json";//提交用户的建议623 V1
}
