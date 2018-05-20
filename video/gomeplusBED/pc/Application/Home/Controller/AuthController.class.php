<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AuthController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：登录用户继承此类                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-05 17:15:36 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Home\Controller;
use Home\Controller\BaseController;
class AuthController extends BaseController
{

	public function __construct()
	{

		parent::__construct();
		// 判断是否登录
		$this->isLogin();
        C('HTTP_CACHE_CONTROL', 'no-store, no-cache');
	}

	/**
	 * 判断用户是否登录
	 *
	 */
	public function isLogin()
	{
		if($this->userInfo['loginStatus'] !== 3)
		{
			if(((isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || !empty($_POST[C('VAR_AJAX_SUBMIT')]) || !empty($_GET[C('VAR_AJAX_SUBMIT')]))){
				$this->outError(\Think\ErrorCode::USER_NO_LOGIN);
			}
			header('location:'.APP_HTTP_GOME.C('GOME')['URL']['LOGIN_URL'].'?orginURI='.curPageURL());
            exit;
		}
	}





}



