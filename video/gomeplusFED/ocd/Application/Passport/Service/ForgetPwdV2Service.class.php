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
 * | Author:李帅 <lishuai@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-08-22 16:22:00 CST                            |
 * +----------------------------------------------------------------------+
 */


namespace Passport\Service;
use Home\Service\BaseService;
class ForgetPwdV2Service extends BaseService
{
        public $key = 'ForgetPwdV2Service';
        public $param = array();
        public $bs_version = 2;
        public $verifitionCode = 'user/passwordRetrievingVerifitionAction';
        public $verificationCodeCheck = 'user/passwordVerificationCodeCheckAction';
        public $passwordReset = 'user/passwordResetAction';
	
}

