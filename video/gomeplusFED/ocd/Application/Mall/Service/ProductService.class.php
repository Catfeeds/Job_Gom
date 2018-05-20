<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ProductController
 * +----------------------------------------------------------------------+
 * | @程序功能： * @package Home\Service
 * +----------------------------------------------------------------------+
 * | Author:wujing-ds3 <wujing-ds3@yolo24.com>
 * +----------------------------------------------------------------------+
 * | Date:2016/1/8 14:37
 * +----------------------------------------------------------------------+
 */

namespace Mall\Service;
use Home\Service\BaseService;

class ProductService extends BaseService
{
    public $key = 'ProductService';
    public $param = array();
    public $product_detail = 'product/get_product_detail.json';
    public $can_deliver_from_region = 'product/can_deliver_from_region.json';//是否可配送
    public $product_evaluate = 'product/product_evaluate.json';//商品评价列表
    public $product_evaluate_info = 'product/product_evaluate_info.json';//商品评价主信息（未使用）
    public $product_share_addScore = 'product/product_share_addScore.json';//分享商品得积分（未使用）
    public $product_share_Rebate = 'product/product_share_Rebate.json';//获取商品返利的Id
    public $product_is_have = 'product/is_have_store.json';//是否有货（未使用）
    public $product_more_guss = 'product/get_more_guess.json';//为你推荐（已升级到V2）
}