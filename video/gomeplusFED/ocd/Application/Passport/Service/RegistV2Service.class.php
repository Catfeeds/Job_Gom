<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：registService.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-23 16:38:19 CST                       		     |
 * +----------------------------------------------------------------------+
 */
 
namespace Passport\Service;
use Home\Service\BaseService;
class RegistV2Service extends BaseService
{
	public $key = 'RegistV2Service';
	public $param = array();
	public $bs_version = 2;

//	注册分三步完成
//	public $regist_firststep = 'user/regist_firststep.json';
//	public $new_regist_secondstep = 'user/new_regist_secondstep.json';
//	public $new_regist_thirdstep = 'user/new_regist_thirdstep.json';
//
//	public $regist_identifyNickname = 'user/check_nickname.json'; // 检验昵称
//	public $regist_user_by_referral_code = 'user/get_user_by_referral_code.json'; // 检验推荐码

	public $registerMobileVerifitionAction = 'user/registerMobileVerifitionAction';//注册发送验证码
	public $personalInfo = 'user/personalInfo'; //会员信息
	public $userByReferralCode = 'user/userByReferralCode';
	public $nicknameCheckAction = 'user/nicknameCheckAction';//检测昵称是否存在


	
}
