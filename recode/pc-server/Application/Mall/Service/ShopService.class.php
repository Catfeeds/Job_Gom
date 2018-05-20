<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ShopService.class.php
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

class ShopService extends BaseService
{
    public $key = 'ShopService';
    public $param = array();
    public $shop_detail = 'shop/shop_detail.json';//店铺详情 以替换V2
    //public $product_list = 'shop/product_list.json';//店铺商品列表
    public $product_list = 'vshop/item_list.json';//店铺商品列表
    public $shop_collected = 'shop/get_shop_collected.json';//添加店铺收藏（已迁移至AJAX模块下）
    public $product_collected = 'shop/get_product_collected.json';//添加店铺商品收藏（已迁移至AJAX模块下）
    public $remove_shop_collected = 'shop/remove_shop_collectedByShopId.json';//移除店铺收藏（已迁移至AJAX模块下）
    public $shop_discount = 'shop/down_list.json';//店铺优惠详情（未使用）
    public $remove_product_collected = 'shop/remove_product_collectedByProductId.json';//移除店铺商品收藏（已迁移至AJAX模块下）
    public $shop_redPacket = 'cheap/get_shop_redpacket_list.json';//店铺红包列表
    //public $shop_classify = 'shop/shop_classify_list.json';//店铺商品分类
    public $shop_classify = 'vshop/query_vshop_category_list.json';//店铺商品分类（未使用）
    //public $shop_cate_product_list = 'shop/catalog_product_list.json';//店铺分类商品列表
    public $shop_cate_product_list = 'vshop/query_vshop_product_list_by_category.json';//店铺分类商品列表（未使用）

}
