<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：HomeService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-25 17:20:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 

namespace Home\Service;
use Home\Service\BaseService;
class HomeService extends BaseService
{
	public $key = 'HomeService';
	public $param = array();
	public $home_index = '/interface/return-all'; //首页多个推荐位
	public $home_preview = '/interface/return-all?is_preview=1'; //首页预览

}
