<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：GroupService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:zhanghuan <zhanghuan@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-24 13:58:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 
namespace Group\Service;
use Home\Service\BaseService;

class GroupService extends BaseService
{
	public $key = 'GroupService';
	public $param = array();
	public $bs_version = 2;

	public $group_circle_add= 'social/groupMembershipApplication';	//用户主动入群
	public $member_quit= 'social/memberQuit';	//用户 退出群
	public $topic_collect= 'collection/topicCollection';//话题收藏(取消收藏)
    //public $group_circle_add= 'socialGroup/join_group.json';	//用户主动入群
    //public $topic_collect= 'user/set_topic_collected.json';//话题收藏(取消收藏)
    public $check_circle  = 'social/ownedGroupQuantity';//检测圈子是否上限T16
}
