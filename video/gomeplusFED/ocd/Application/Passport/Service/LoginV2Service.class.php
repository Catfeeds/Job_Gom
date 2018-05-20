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
class LoginV2Service extends BaseService
{
	public $key = 'LoginV2Service';
	public $param = array();
    public $bs_version = 2;

	public $uri = 'user/login';
//	public $bind_mobile_firststep = 'user/bind_mobile_firststep.json';	// 普通登录，绑定手机号第一步
//	public $bind_mobile = 'user/bind_mobile.json';	// 普通登录，绑定手机号
//	public $error_num = 'user/search_error_num.json';
	public $sns_login = 'user/thirdPartyAccountLogin';	// 第三方登录
	public $sns_bind_phone_first = 'user/thirdPartyRegisterMobileVerifitionAction'; // 三方登录绑定手机号
	public $sns_bind_check = 'user/thirdPartyRegistAction'; // 三方登录验证绑定手机号
//	public $sns_bind_check = 'user/sns_bind_check_mobile.json'; // 三方登录验证绑定手机号
//	public $regist_user_by_referral_code = 'user/get_user_by_referral_code.json'; // 检验推荐码
	public $regist_user_by_referral_code = 'user/userByReferralCode'; // 检验推荐码

	//统一登录: 获取出口token(必须登录)
	public $gome_access_token = 'user/gomeAccessToken';

	//统一登录: token获取用户数据(非必须登录)
	public $gome_unified_login = 'user/gomeUnifiedLogin';



	/**
	 * 构造方法
	 *
	 */
	public function __construct()
	{	
		parent::__construct();
		$this->userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$this->publicParam['userId'] = $this->userId;
		$this->token = session("token_".$this->userId);
		$this->publicParam['devId'] = session_id();
	}


    /**
     * 登录统一设置存储cookie信息
     *
     */
    public function saveCookie($data = array()) {

        if($data) {

            cookie('userId', authcode($data['user']['id'], 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
            cookie('nickName', authcode($data['user']['nickname'], 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
            cookie('userInfo', authcode(json_encode($data), 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
            session("token_".$data['user']['id'], $data['loginToken']);
        }
    }






}
