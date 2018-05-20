<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ShopService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:wujing-ds3 <wujing-ds3@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/1/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Group\Service;
use Home\Service\BaseService;

class SearchService extends BaseService
{
    public $key = 'SearchService';
    public $param = array();
    public $bs_version = 2;

    //搜索话题
    public $search_topics = 'ext/social/searchTopic';

    //用户搜索圈子
    public $search_group = 'ext/social/searchGroup';
}
