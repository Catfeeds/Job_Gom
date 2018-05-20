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

class TopicV2Service extends BaseService
{
	public $key = 'TopicV2Service';
	public $param = array();
    public $bs_version = 2;
	public $first_topic= 'ext/social/topicReply';	//一级话题
    public $second_topic= 'ext/social/topicSubReply';//二级话题
}
