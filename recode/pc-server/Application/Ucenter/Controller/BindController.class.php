<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：BindController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：更改绑定的手机号										  |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen								                          |
 * +----------------------------------------------------------------------+
 * | Date:2016-10-12 			                                          |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;
class BindController extends AuthController 
{
	public function __construct()
	{
		parent::__construct();
		$this->bind = D('Ucenter/Bind');
		$this->sessionName = strtolower(MODULE_NAME).CONTROLLER_NAME.'Cont';
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'bind/index') ; //左侧选中的地址
	}
	
	public function index()
	{
		$this->firstStep();
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：修改绑定的手机号step1
     * @action：/bind/firstStep
     *-------------------------------------------------------------------------
     */
	private function firstStep()
	{
		$userInfo = $this->user_infos;
		$mobile = substr($userInfo['mobile'], 0, 3).'****'.substr($userInfo['mobile'], -4, 4);
		$this->delSession();
		$this->assign('mobile', $mobile);
		$this->assign('title', '验证身份');
		$this->display('Bind/first');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：修改绑定的手机号step2
     * @action：/bind/secondStep
     *-------------------------------------------------------------------------
     */
	public function secondStep()
	{
		$sessionArr = session($this->sessionName);
		// 验证：若无相应token，则回到上一步
		if(!isset($sessionArr['checkTokenOld']) || !$sessionArr['checkTokenOld'])
		{
			$this->redirect("/ucenter/bind/index");
		}
		
		$this->assign('title', '修改手机号');
		$this->display('Bind/second');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：修改绑定的手机号step3
     * @action：/bind/thirdStep
     *-------------------------------------------------------------------------
     */
	public function thirdStep()
	{
		$sessionArr = session($this->sessionName);
		// 验证：若无相应token，则回到上一步
		if(!isset($sessionArr['checkTokenNew']) || !$sessionArr['checkTokenNew'])
		{
			$this->redirect("/ucenter/bind/secondStep");
		}
		$mobile = substr($sessionArr['mobileNew'], 0, 3).'****'.substr($sessionArr['mobileNew'], -4, 4);
		
		$this->assign('mobile', $mobile);
		$this->assign('title', '修改成功');
		$this->display('Bind/third');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：旧手机发送验证码
     * @action：/bind/postVerifyCodeOld
     *-------------------------------------------------------------------------
     */
	public function postVerifyCodeOld()
	{
		$param = array();
		
		$postRes = $this->bind->postData($this->bind->postVerifyCodeOld, $param);
		
		if($postRes['success'])
		{
			$sessionArr = array();
			$sessionArr['postTokenOld'] = $postRes['data']['token'];
			session($this->sessionName, $sessionArr);
		}
		
		$this->ajaxReturn($postRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：校验旧手机验证码
     * @action：/bind/checkVerifyCodeOld
	 * @param：verifyCode	String	验证码
     *-------------------------------------------------------------------------
     */
	public function checkVerifyCodeOld()
	{
		$param = array();
		$sessionArr = session($this->sessionName) ? session($this->sessionName) : array();
		$param['verificationCode'] = I('param.verifyCode', '');
		$param['token'] = isset($sessionArr['postTokenOld']) ? $sessionArr['postTokenOld'] : '###';
		
		if($param['token'] == '###')
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$message = '请获取短信验证码';
			$returnArr = array();
			$this->outJSON($code, $message, $returnArr);
			exit;
		}
		
		$postRes = $this->bind->postData($this->bind->checkVerifyCodeOld, $param);
		
		if($postRes['success'])
		{
			$sessionArr['checkTokenOld'] = $postRes['data']['token'];
			session($this->sessionName, $sessionArr);
		}
		
		$this->ajaxReturn($postRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：新手机发送验证码
     * @action：/bind/postVerifyCodeNew
	 * @param：mobile	String	新手机号
     *-------------------------------------------------------------------------
     */
	public function postVerifyCodeNew()
	{
		$param = array();
		$sessionArr = session($this->sessionName) ? session($this->sessionName) : array();
		$param['mobile'] = I('param.mobile', '');
		$param['token'] = isset($sessionArr['checkTokenOld']) ? $sessionArr['checkTokenOld'] : '';
		
		$postRes = $this->bind->postData($this->bind->postVerifyCodeNew, $param);
		
		if($postRes['success'])
		{
			$sessionArr['postTokenNew'] = $postRes['data']['token'];
		}
		$sessionArr['mobileNew'] = $param['mobile'];
		session($this->sessionName, $sessionArr);
		
		$this->ajaxReturn($postRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：校验新手机验证码并绑定
     * @action：/bind/checkVerifyCodeNew
	 * @param：verifyCode	String	验证码
	 * @param：mobile		String	新手机号
     *-------------------------------------------------------------------------
     */
	public function checkVerifyCodeNew()
	{
		$param = array();
		$sessionArr = session($this->sessionName) ? session($this->sessionName) : array();
		$param['mobile'] = I('param.mobile', '');
		$param['verificationCode'] = I('param.verifyCode', '');
		$param['token'] = isset($sessionArr['postTokenNew']) ? $sessionArr['postTokenNew'] : '###';
		
		if($param['token'] == '###')
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$message = '请获取短信验证码';
			$returnArr = array();
			$this->outJSON($code, $message, $returnArr);
			exit;
		}
		
		$putRes = $this->bind->putData($this->bind->bindMobile, $param);
		
		if($putRes['success'])
		{
			$sessionArr['checkTokenNew'] = 1;
			session($this->sessionName, $sessionArr);
		}
		
		$this->ajaxReturn($putRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：删除对应的session信息
     * @action：/bind/delSession
     *-------------------------------------------------------------------------
     */
	private function delSession()
	{
		session($this->sessionName, null);
	}
}