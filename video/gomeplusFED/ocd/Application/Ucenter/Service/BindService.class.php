<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称：BindService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：更改绑定的手机号
 * +----------------------------------------------------------------------+
 * | Author:liuzhen 
 * +----------------------------------------------------------------------+
 * | Date:2016-10-12
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Service;
use Home\Service\BaseService;

class BindService extends BaseService
{
    public $key = 'BindService';
    public $bs_version = 2;
	public $param = array();
	
	public $postVerifyCodeOld = 'user/currentMobileVerificationAction';
	public $checkVerifyCodeOld = 'user/currentMobileVerificationConfirmationAction';
	public $postVerifyCodeNew = 'user/newMobileVerificationAction';
	public $bindMobile = 'user/mobile';
}