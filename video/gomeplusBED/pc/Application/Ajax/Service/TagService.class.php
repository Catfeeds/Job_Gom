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
 * | Author:lishuai <lishuai@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-24 13:58:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 
namespace Ajax\Service;
use Home\Service\BaseService;

class TagService extends BaseService
{
	public $key = 'TagService';
	public $param = array();
    public $bs_version = 2;
	public $create_tag= 'ext/social/customLabel';	//用户自定义标签
    public $search_tag = 'ext/social/searchTag';    //联想标签
    public $search_topic = 'ext/social/searchTopicByTag';//搜索话题
}
