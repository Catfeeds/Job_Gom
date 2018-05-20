<?php

namespace Group\Service;
use Home\Service\BaseService;

class ApiService extends BaseService
{
    public $key = 'ApiService';
    public $param = array();
    public $bs_version = 2;

    //话题列表 wiki编号:26
    public $topic = 'combo/topics';

    //14_分类集合接口查询
    public $categories = 'social/categories';

    public $group_lists = 'ext/social/searchGroupByCategory';


    //一级话题回复列表
    public  $mshop_reply = 'ext/social/topicReplys';
    public  $topic_reply = 'social/topicAllReplys';

    //二级话题回复列表
    public $topic_second_reply = 'ext/social/topicSubReplys';

    //下一篇话题
    public $next_topic = 'ext/social/nextTopic';

    //更多热门圈子 - 推荐圈子广场  V1升级
    public $recommend = 'ext/peapod/groups';

    //增加话题浏览量
    public $topicPageview = 'social/topicPageview';
}
