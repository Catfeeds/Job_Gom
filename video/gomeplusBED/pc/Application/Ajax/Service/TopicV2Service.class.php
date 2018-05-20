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
	public $first_topic= 'ext/social/topicReply';	//创建话题一级回复
	public $first_topic_del= 'social/topicReply';	//删除话题一级回复
    public $second_topic= 'ext/social/topicSubReply';//创建话题二级回复
    public $second_topic_del= 'social/topicSubReply';//删除话题二级回复
    public $personalTopics = 'ext/social/ownedTopics'; //--我的话题列表 ext
    public $personalInfo = 'combo/personalInfoByGuest'; //--个人主页
}