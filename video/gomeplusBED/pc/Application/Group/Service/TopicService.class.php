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

class TopicService extends BaseService
{
    public $key = 'TopicService';
    public $param = array();
    public $bs_version = 2;

    //圈子信息
    public $group_infos = '/ext/social/group';

    //2 圈子信息combo 带会员的圈子信息
    public $group_member_infos = 'combo/groupInfo';


    //话题列表 wiki编号:26
    public $topic = 'ext/social/topics';

    public $combo_topic = 'combo/topics';

    //话题详情 wiki编号:42
    public $topic_detail = 'ext/social/topic';

    //获取点赞列表
    public $praised_list = 'ext/praise/like';

	//获取热门话题推荐
	public $hot_topics = 'ext/peapod/hotTopics';

	//删除话题
	public $del_topic = 'social/topic';

	//某分类下的圈子列表
    public $category_groups = 'ext/social/searchGroupByCategory';

    //举报
    public $socialReport = 'social/socialReport';

    //话题
    public $base_topic = 'social/topic';

    //相关话题
    public $relatedTopics = 'social/relatedTopics';

}
