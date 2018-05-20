<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ModpwdService.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>     	                          |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-14							                          |
 * +----------------------------------------------------------------------+
 */
  
namespace Ucenter\Service;
use Home\Service\BaseService;
class ModpwdService extends BaseService
{
	protected $bs_version = 1;	
	public $sendPsw = 'user/send_vcfor_update_psw.json';		//发送手机验证码
	public $checkPsw = 'user/check_vcfor_update_psw.json';		//检验手机验证码
	public $updatePwd = 'user/update_password.json';			//设置新密码
}
