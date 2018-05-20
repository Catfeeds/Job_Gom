<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TokenService.class.php                                         |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-05 13:50:13 CST                            |
 * +----------------------------------------------------------------------+
 */
 
namespace Home\Service;
use Home\Service\BaseService;
class TokenService extends BaseService
{
	public $key = 'TokenService';
	public $param = array();
	public $bs_version = 2;
	public $loginTokenCheckAction = 'user/loginTokenCheckAction';


	
}

