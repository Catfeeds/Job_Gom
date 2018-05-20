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
 * | Author:wujing-ds3 <wujing-ds3@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 09:43:34 CST                                         |
 * +----------------------------------------------------------------------+
 */
 
 
namespace Mall\Service;
use Home\Service\BaseService;
class SearchService extends BaseService
{
	public $key = '';
	public $param = array();
	public $cate_list = 'carefulChoose/catalog_list.json';		//未使用
	public $cate_detail = 'carefulChoose/catalog_detail.json';	//未使用
	public $research_result_product = 'carefulChoose/research_result_product.json';
	public $research_result_shop = 'carefulChoose/research_result_shop.json';	//未使用



	
}
