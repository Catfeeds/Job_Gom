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

class PubliserService extends BaseService
{
    public $key = 'PubliserService';
    public $param = array();
    public $bs_version = 2;

    //商品搜索
    public $search_items = 'ext/item/searchItems';

    //我的圈子+推荐圈子列表
    public $my_group_tj = 'combo/postingCandidateGroups';

    //我的收藏
    public $my_item_collect = 'ext/collection/myItemCollections';

    //创建话题
    public $create_topic = 'social/topic';

    //创建圈子
    public $create_circle = 'social/group';

}
