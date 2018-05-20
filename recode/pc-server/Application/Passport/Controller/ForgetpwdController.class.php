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
use Common\Lib\CsrfAnti;

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
        if($this->userId)
		{
			$url = APP_HTTP.C('MAIN_URL').'index/index';
			header('location: '.$url, true, 301);
			exit;
		}
        
		if(empty($_SESSION["p02"]["mobile"]) or empty($_SESSION["p02"]["token"])){
			$this->redirect("/passport/forgetpwd");
		}
		$this->assign('title', '找回密码');
		$this->display('Password/step3');
	}
	
	//发送短信验证码
	public function sendVerifitionCode()
	{
        //校验验证码
		$code = xss_clean(I('param.code', ''));
		if(!check_code($code, 0))
        {
			$this->outError(\Think\ErrorCode::VERIFY_CODE_ERR);
			exit;
		}
        
        $_SESSION["p02"] = array();
		$param['mobile'] = I('param.mobileOrEmail', '');
		if(checkMobile($param['mobile']) === false){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$ip = get_client_ip(0,true);
		$is_limit_ip = CsrfAnti::ip_limit($ip);
		$is_limit_mobile = CsrfAnti::mobile_limit($param['mobile']);
		//短信频次及ip频次限制
		if($is_limit_ip === true || $is_limit_mobile === true){
			$this->outError(\Think\ErrorCode::REGIST_MOBILE_TIMES_ERR);
		}
		$forgetPwd = D('ForgetPwdV2');
		$forgetPwdData = $forgetPwd->postData($forgetPwd->verifitionCode,$param);
		//短信计数,成功发送短信后记录
		if($forgetPwdData['code']==200){
			//手机发送次数
			CsrfAnti::setUserCounter($param['mobile']);
		}else{
			//IP计数
			CsrfAnti::setUserCounter($ip);
		}
		if($forgetPwdData['success']) {
		    $_SESSION["p02"]["mobile"] = $param['mobile'] ;
		    $_SESSION["p02"]["onlineUserId"] = $forgetPwdData["data"]["onlineUserId"];
		    $_SESSION["p02"]["token"]        = $forgetPwdData["data"]["token"];
			unset($forgetPwdData["data"]["onlineUserId"],$forgetPwdData["data"]["token"]);
		}
		$this->ajaxReturn($forgetPwdData);
	}


	
	//校验验证码
	public function checkVerifycode()
	{
	    $param['mobile']   = I('param.mobileOrEmail', '');
	    $_SESSION["p02"]['verificationCode'] = I('param.verifycode', '');
		if(checkMobile($param['mobile']) === false || !$_SESSION["p02"]['verificationCode']){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
	    $forgetPwd = D('ForgetPwdV2');
	    $forgetPwdData = $forgetPwd->postData($forgetPwd->verificationCodeCheck, $_SESSION["p02"]);
	    if($forgetPwdData['success']) {
	        $_SESSION["p02"]["onlineUserId"] = $forgetPwdData["data"]["onlineUserId"];
	        $_SESSION["p02"]["token"]        = $forgetPwdData["data"]["token"];
			unset($forgetPwdData["data"]["onlineUserId"],$forgetPwdData["data"]["token"]);
	    }
	    
	    $this->ajaxReturn($forgetPwdData);

	}

	//重置密码
	public function passwordReset()
	{
		$param['newPassword']   = I('param.newPassword', '');

		$new_pwd = rsa_private_decrypt($param['newPassword']);
		if(!$new_pwd){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}

		$param = [];
		$param['newPassword'] = $new_pwd;
		$param['mobile'] = $_SESSION['p02']['mobile'];
		$param['onlineUserId'] = $_SESSION['p02']['onlineUserId'];
		$param['token'] = $_SESSION['p02']['token'];
		$forgetPwd = D('ForgetPwdV2');
		$forgetPwdData = $forgetPwd->putData($forgetPwd->passwordReset, $param);
		$this->ajaxReturn($forgetPwdData);
	}


}

?>
