<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ModpwdController.class.php                                |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-14                                        			  |
 * +----------------------------------------------------------------------+
 */
 
namespace Ucenter\Controller;
use Home\Controller\AuthController;
class ModpwdController extends AuthController
{
	public function __construct()
	{
		parent::__construct();
		$this->modPwd = D('Modpwd');
	}
	
	public function index()
	{
		$userInfo = $this->user_infos;
		$mobile = substr($userInfo['mobile'], 0, 3).'****'.substr($userInfo['mobile'], -4, 4);
		$this->assign('title', '登录密码修改');
		$this->assign('mobile', $mobile);
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'modpwd/index') ; //左侧选中的地址
		$this->display('Modpwd/index');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：第一步：发送手机验证码
     * @action：/Modpwd/sendPsw
     * @author：刘振
     * @date：2016-07-14
     *-------------------------------------------------------------------------
     */
	public function sendPsw()
	{
		$returnArr = array();
		
		$returnArr = $this->modPwd->postData($this->modPwd->sendPsw);
		if($returnArr['success'])
		{
			$userInfo = $this->user_infos;
			
			$modPwdArr = array();
			$modPwdArr['mobile'] = $userInfo['mobile'];
			$modPwdArr['token'] = $returnArr['data']['token'];
			
			session('modPwd', $modPwdArr);
		}
		$this->ajaxReturn($returnArr);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：第二步：检验手机验证码
     * @action：/Modpwd/checkPsw
	 * @param：verifyCode       必填      string   第一步发送的手机验证码
	 * @param：newPwd           必填      string   新密码
	 * @param：newPwdConfirm    非必填    string   确认新密码
     * @author：刘振
     * @date：2016-07-14
     *-------------------------------------------------------------------------
     */
	public function checkPsw()
	{
		$modPwdArr = session('modPwd');
		
		$token = $modPwdArr['token'];
		$mobile = $modPwdArr['mobile'];
		$verifyCode = xss_clean(I('param.verifyCode', '', 'strval'));
		$newPwd = xss_clean(urldecode(I('param.newPwd', '', 'strval')));
		// $newPwd = rsa_private_decrypt($newPwd);
		$newPwdConfirm = xss_clean(urldecode(I('param.newPwdConfirm', '', 'strval')));
		
		$returnArr = array();		
		$param = array();
		
		$param['verifyCode'] = $verifyCode;
		$param['token'] = $token;
		$returnArr = $this->modPwd->postData($this->modPwd->checkPsw, $param);
		
		if($returnArr['success'])
		{
			$returnArr = $this->updatePwd($mobile, $newPwd, $returnArr['data']['token']);
		}
		
		$this->ajaxReturn($returnArr);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：第三步：设置新密码
     * @action：/Modpwd/updatePwd
	 * @param：mobile	string	手机号
	 * @param：newPwd	string	新密码
	 * @param：token	string	第二步得到的token
     * @author：刘振
     * @date：2016-07-14
     *-------------------------------------------------------------------------
     */
	public function updatePwd($mobile, $newPwd, $token)
	{
		$returnArr = array();		
		$param = array();
		
		$param['mobile'] = $mobile;
		$param['newPassword'] = $newPwd;
		$param['token'] = $token;
		
		$returnArr = $this->modPwd->postData($this->modPwd->updatePwd, $param);
		
		return $returnArr;
	}
}