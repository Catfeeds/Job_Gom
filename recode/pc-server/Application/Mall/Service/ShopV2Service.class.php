<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ShopV2Service.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：店铺相关服务
 * +----------------------------------------------------------------------+
 * | Author:wujing-ds3 <wujing-ds3@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/1/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Mall\Service;
use Home\Service\BaseService;

class ShopV2Service extends BaseService
{
    public $key = 'ShopV2Service';
    public $bs_version = 2;
    public $param = array();

    public $shopDetail = 'ext/shop/shop';	//店铺详细信息
	public $getShopCollect = 'collection/shopCollection';	//判断店铺是否被收藏（GET方式）
	public $putShopCollect = 'collection/shopCollection';	//店铺收藏（PUT方式）
	public $delShopCollect = 'collection/shopCollection';	//取消店铺收藏（DELETE方式）
    public $get_shop_info = 'shop/shop';//店铺信息
    public $search_item_in_mshop = 'ext/shop/searchItemsInMshop';//美店内商品搜索 ext
    public $search_item_in_category = 'ext/shop/itemInShopCategory';//美店分类下的商品ext
    public $shopCate = 'shop/categories';	//店铺分类信息
    public $item_manage = 'ext/shop/itemsManagementInShop';//将商品批量移动至美店内分类
    public $itemStatus = 'shop/itemsDistributionStatus';//商品在美店内的分销状态（批量）
    public $distributionItem = 'shop/distributionItemAction'; //商品上下架（单个商品）
    public $batch_distributionItem= 'shop/distributionItems'; //商品上下架（多个商品）
    public $shareChain= 'rebate/shareChain/kid'; //分享链条
    public $item_manage_pc= 'ext/shop/itemsManagementInShop4PC'; //美店内的商品管理
}
