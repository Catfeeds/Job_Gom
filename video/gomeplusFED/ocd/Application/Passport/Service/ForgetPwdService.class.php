<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ForgetPwdService.class.php                                         |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-06 12:13:00 CST                            |
 * +----------------------------------------------------------------------+
 */


namespace Passport\Service;
use Home\Service\BaseService;
class ForgetPwdService extends BaseService
{
	public $key = 'ForgetPwdService';
	public $param = array();
	public $first_step = 'user/find_psw_first_step.json';
	public $sceond_step = 'user/send_verifyfor_find_psw.json';
	public $third_step = 'user/check_verifyfor_find_psw.json';
	public $fourth_step = 'user/reset_password.json';

	/**
	 * 构造方法
	 *
	 */
	public function __construct()
	{
		parent::__construct();
		$this->domain = C('SERVICE.DOMAIN');
		$this->userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$this->publicParam['userId'] = $this->userId;
		$this->token = session("token_".$this->userId);
		$this->publicParam['devId'] = session_id();
	}



	
}

