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
    public  $topic_reply = 'ext/social/topicReplys';

    //二级话题回复列表
    public $topic_second_reply = 'ext/social/topicSubReplys';
}
