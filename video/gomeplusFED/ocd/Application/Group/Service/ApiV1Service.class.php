<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ShopService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：接口
 * +----------------------------------------------------------------------+
 * | Author:wujing-ds3 <wujing-ds3@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/1/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Group\Service;
use Home\Service\BaseService;

class ApiV1Service extends BaseService
{
    public $key = 'ApiV1Service';
    public $param = array();
    public $bs_version = 1;

    //话题回复列表 [已替换V2接口]
    public  $topic_reply = 'socialTopic/page_query_topic_reply.json';

    //二级更多回复列表 [已替换V2接口]
    public $topic_second_reply = 'socialTopic/find_more_second_replys.json';

    //推荐圈子广场
    public $recommend = 'recommend/recommend_data_by_page.json';
}
