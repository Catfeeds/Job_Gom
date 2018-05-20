<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：CollectService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>           	                  |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-11						                              |
 * +----------------------------------------------------------------------+
 */
  
namespace Ucenter\Service;
use Home\Service\BaseService;
class CollectService extends BaseService
{	
	protected $bs_version = 2;
	public $goodsCollectList = 'ext/collection/myItemCollections';		//个人中心--商品收藏列表
	public $shopCollectList = 'ext/collection/myShopCollections';		//个人中心--店铺收藏列表
	public $topicCollectList = 'ext/collection/myTopicCollections';		//个人中心--话题收藏列表
	
	public $goodsCollectDel = 'collection/itemCollections';				//个人中心--删除商品收藏
	public $shopCollectDel = 'collection/shopCollections';				//个人中心--删除店铺收藏
	public $topicCollectDel = 'collection/topicCollections';			//个人中心--删除话题收藏
}
