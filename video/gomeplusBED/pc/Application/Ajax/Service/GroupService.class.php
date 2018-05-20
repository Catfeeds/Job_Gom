<?php
namespace Ajax\Service;
use Home\Service\BaseService;

class GroupService extends BaseService
{
	public $key = 'GroupService';
	public $param = array();
    public $bs_version = 2;
	public $group_circle_add= 'socialGroup/join_group.json';	//用户主动入群
    public $topic_collect= 'collection/topicCollection';//话题收藏(取消收藏)
    //public $topic_collect= 'user/set_topic_collected.json';//话题收藏(取消收藏)

}
