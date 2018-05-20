<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class OrderService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:zhangting-ds1 <zhangting-ds1@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/7/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Service;
use Home\Service\BaseService;

class TopicService extends BaseService
{
    public $key = 'TopicService';
    public $param = array();
    public $bs_version = 2;

    //个人中心我的订单 wiki 
    public $topic_list_v2 = 'ext/social/ownedTopics';//我的话题列表T25
	public $myRelated     = 'ext/social/myRelatedGroups';//我加入的圈子 && 我创建的圈子 T4
	public $check_circle  = 'social/ownedGroupQuantity';//检测圈子是否上限T16
}
