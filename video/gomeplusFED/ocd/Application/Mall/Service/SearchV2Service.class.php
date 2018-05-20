<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：SearchService.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-08-18 11:23:11 CST                                         |
 * +----------------------------------------------------------------------+
 */
 
 
namespace Mall\Service;
use Home\Service\BaseService;
class SearchV2Service extends BaseService
{
   
    public $bs_version = 2;
	public $key = 'SearchService';
	public $research_result_product = 'ext/item/searchItems'; //商品搜索
	public $research_result_shop = 'ext/shop/searchShops4PC';//店铺搜索结果页（PC端）
}
