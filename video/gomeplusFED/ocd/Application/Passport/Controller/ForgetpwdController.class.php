<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ForgetPwdController.class.php                             |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:李帅 <lishuai@gomeplus.com>                                  |
 * +----------------------------------------------------------------------+
 * | Date:2016-08-22 14:09:00 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Passport\Controller;
use Home\Controller\BaseController;
class ForgetpwdController extends BaseController
{
	public $data = array();
	
	public function index()
	{
		$this->assign('title', '找回密码');
		$this->display('Password/step1');
	}

	
	public function step2()
	{

		if( empty($_SESSION["p02"]["mobile"]) or empty($_SESSION["p02"]["onlineUserId"])){
		
			$this->redirect("/passport/forgetpwd");
		}
		
		$this->assign('title', '找回密码');
		$this->assign('mobileOrEmail', $mobileOrEmail);
		$this->display('Password/step2');

	}
	
	public function step3()
	{

		if(empty($_SESSION["p02"]["mobile"]) or empty($_SESSION["p02"]["token"])){

                	$this->redirect("/passport/forgetpwd");
         }

		$this->assign('title', '找回密码');
		$this->display('Password/step3');

	}
	
	//发送短信验证码
	public function sendVerifitionCode()
	{
	    $_SESSION["p02"] = array();
		$param['mobile']   = I('param.mobileOrEmail', '');
		$forgetPwd = D('ForgetPwdV2');
		$forgetPwdData = $forgetPwd->postData($forgetPwd->verifitionCode,$param);
		if($forgetPwdData['success']) {
		    $_SESSION["p02"]["mobile"] = $param['mobile'] ;
		    $_SESSION["p02"]["onlineUserId"] = $forgetPwdData["data"]["onlineUserId"];
		    $_SESSION["p02"]["token"]        = $forgetPwdData["data"]["token"];
		}
		$this->ajaxReturn($forgetPwdData);

	}


	
	//校验验证码
	public function checkVerifycode()
	{
	    $param['mobile']   = I('param.mobileOrEmail', '');
	    $_SESSION["p02"]['verificationCode'] = I('param.verifycode', '');
	    $forgetPwd = D('ForgetPwdV2');
	    $forgetPwdData = $forgetPwd->postData($forgetPwd->verificationCodeCheck, $_SESSION["p02"]);
	    
	    if($forgetPwdData['success']) {
	        $_SESSION["p02"]["onlineUserId"] = $forgetPwdData["data"]["onlineUserId"];
	        $_SESSION["p02"]["token"]        = $forgetPwdData["data"]["token"];
	    }
	    
	    $this->ajaxReturn($forgetPwdData);

	}

	//重置密码
	public function passwordReset()
	{
		$param['newPassword']   = I('param.newPassword', '');
		$param['newPassword'] = rsa_private_decrypt($param['newPassword']);
		$_SESSION["p02"]['newPassword'] = urldecode($param["newPassword"]) ;
		$forgetPwd = D('ForgetPwdV2');
		$forgetPwdData = $forgetPwd->putData($forgetPwd->passwordReset, $_SESSION["p02"]);
		$this->ajaxReturn($forgetPwdData);
	}
	
	
}

?>
