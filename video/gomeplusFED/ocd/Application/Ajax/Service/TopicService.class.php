<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TopicService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:zhanghuan <zhanghuan@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-24 13:58:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 
namespace Ajax\Service;
use Home\Service\BaseService;

class TopicService extends BaseService
{
	public $key = 'TopicService';
	public $param = array();
	public $first_topic= 'socialTopic/back_topic.json';	//一级话题 [已替换V2接口]
    public $second_topic= 'socialTopic/back_second_replys.json';//二级话题 [已替换V2接口]
}
