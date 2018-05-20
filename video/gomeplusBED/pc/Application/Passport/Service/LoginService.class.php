<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：LoginService.class.php                                         |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-04 17:03:32 CST                            |
 * +----------------------------------------------------------------------+
 */
  
namespace Passport\Service;
use Home\Service\BaseService;
class LoginService extends BaseService
{
	public $key = 'LoginService';
	public $param = array();
	public $bind_mobile_firststep = 'user/bind_mobile_firststep.json';	// 普通登录，绑定手机号第一步
	public $bind_mobile = 'user/bind_mobile.json';	// 普通登录，绑定手机号
	public $error_num = 'user/search_error_num.json';
	public $sns_login = 'user/sns_login_v1.json';	// 第三方登录
	public $sns_bind_phone_first = 'user/sns_bind_mobile_firststep.json'; // 三方登录绑定手机号
	public $sns_bind_check = 'user/sns_bind_check_mobile.json'; // 三方登录验证绑定手机号
	public $regist_user_by_referral_code = 'user/get_user_by_referral_code.json'; // 检验推荐码


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
