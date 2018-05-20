<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AddressService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-08 10:20:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 

namespace Ucenter\Service;
use Home\Service\BaseService;
class AddressService extends BaseService
{
	public $key = 'AddressService';
	public $param = array();
	public $address_list = 'user/address_list.json';
	public $address_add = 'user/address_add.json';
	public $address_edit = 'user/address_update.json';
	public $address_del = 'user/address_del.json';
	public $address_detail = 'user/address_detail.json';
	public $address_set_default = 'user/address_set_default.json';	// 变更默认
	public $address_region_division = 'user/query_region_division.json';	// 四级联动
	public $address_get_default = 'user/get_default_address.json';


}
