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
    public $shop_categories = 'ext/shop/categories';//查询店铺下的分类ext 扩展分类下的商品数量
    public $itemInShopCategory = 'ext/shop/itemInShopCategory';//获取店铺分类下的商品信息ext 扩展商品、返利信息
    public $shopCoupons = 'promotion/shopCoupons';//店铺优惠券列表
	
	public $getShopCollect = 'collection/shopCollection';	//判断店铺是否被收藏（GET方式）
	public $putShopCollect = 'collection/shopCollection';	//店铺收藏（PUT方式）
	public $delShopCollect = 'collection/shopCollection';	//取消店铺收藏（DELETE方式）
	
	public $productList = 'ext/shop/itemsInShop';	//店铺下商品列表ext


}
