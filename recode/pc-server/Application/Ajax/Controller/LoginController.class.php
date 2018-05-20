<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：GroupController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:zhanghuan <zhanghuan@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-27 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 **/

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

class LoginController extends BaseController {

	const CSRF_ERR_CODE = 422;
	const CSRF_CONTROLL_TIMES = 100;
	const CSRF_EXPIRE_TIME = 86400;
	const CSRF_CHECK_MOBILE = 'CHECK_MOBILE';

    protected function _initialize() {

        $this->login = D('Login');
        $this->login_v2 = D("Passport/LoginV2");
    }

	/**
     *-------------------------------------------------------------------------
     * @title：供JS调用，获取ssid的相关状态
     * @action：/login/getSsidStatus
     * @method：GET/POST
	 * @params：ssid 类型：STRING，必须：YES
     * @author：liuzhen
     * @date：2016-07-08
	 * @note：
	 *		ssid对应的status
	 *			0：ssid刚生成
	 *			1：二维码已三分钟过期
	 *			2：已扫码但未授权PC登录
	 *			3：授权失败（包括超过60S未授权以及拒绝授权）
	 *			4：授权成功
	 *      mc中存储信息说明
	 *			array(
	 *				'ssid' => $ssid,			ssid
	 *				'genTime' => $currTime,		二维码生成时间
	 *				'ssidStatus' => 0,			二维码状态
	 *				'scanTime' => ,				扫码成功时间
	 *				'userInfo' => array()		用户信息
	 *			)
     *-------------------------------------------------------------------------
     */
	public function getSsidStatus()
	{
		$returnArr = array();
		$currTime = time();
		$scanBeforeTime = 180;		//扫码成功前二维码扫码过期时限，单位：秒
		$scanAfterTime = 60;		//扫码成功后二维码授权过期时限，单位：秒

		$code = 200;
		$message = '成功';
		$dataArr = array();

		$ssid = I('param.ssid');
		if($ssid)
		{
			$ssidArr = S($ssid);
			if(false !== $ssidArr)
			{
				$ssidStatus = $ssidArr['ssidStatus'];
				switch($ssidStatus)
				{
					case 0:
						$genTime = $ssidArr['genTime'];
						if($currTime - $genTime > $scanBeforeTime)
						{
							$ssidStatus = 1;
						}
						break;
					case 2:
						$scanTime = $ssidArr['scanTime'];
						if($currTime - $scanTime > $scanAfterTime)
						{
							$ssidStatus = 3;
						}
						break;
				}
				switch($ssidStatus)
				{
					case 1:
					case 3:
						S($ssid, null);
						break;
					case 4:
						$userInfo = $ssidArr['userInfo'];
						$this->login_v2->saveCookie($userInfo);
						$dataArr['headerUrl'] = base64_decode(session('state'));
						S($ssid, null);
						break;
				}
				$dataArr['ssidStatus'] = $ssidStatus;
			}
			else
			{
				$code = \Think\ErrorCode::CACHE_ERROR;
				$message = \Think\ErrorCode::$statusCode[$code];
			}
		}
		else
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$message = \Think\ErrorCode::$statusCode[$code];
		}

		$returnArr = output($code, $message, $dataArr);

		$this->ajaxReturn($returnArr);
	}

	/**
     *-------------------------------------------------------------------------
     * @title：供JS调用，获取PC扫码登录所需的二维码相关信息
     * @action：/login/getQrcodeInfo
     * @method：GET/POST
     *-------------------------------------------------------------------------
     */
	public function getQrcodeInfo() {
		$returnArr = array();
		$currTime = time();
		$url = 'https://m.gomeplus.com/state/appdownload?h=pc&p=login';
		$availTime = $this->availTime;

		$code = 200;
		$message = '成功';
		$dataArr = array();

		$ssid = $this->login->genSsid();
		$qrcodeUrl = urlencode($url.'&ssid='.$ssid);
		$genQrcodeUrl = APP_HTTP.C('MAIN_URL').'Ajax/Qrcode/urlcode?url='.$qrcodeUrl;

		$dataArr['ssid'] = $ssid;
		$dataArr['genQrcode'] = $genQrcodeUrl;

		S($ssid, null);
		$memArr = array(
			'ssid' => $ssid,
			'genTime' => $currTime,
			'ssidStatus' => 0
		);
		$returnFlag = S($ssid, $memArr, $availTime);
		if(!$returnFlag)  {
			$code = \Think\ErrorCode::CACHE_ERROR;
			$message = \Think\ErrorCode::$statusCode[$code];
		}

		$returnArr = output($code, $message, $dataArr);

		$this->ajaxReturn($returnArr);
	}


	/**
     *-------------------------------------------------------------------------
     * @title：供JS调用，删除ssid的缓存信息
     * @action：/login/delSsidInfo
     * @method：GET/POST
	 * @params：ssid 类型：STRING，必须：YES
     *-------------------------------------------------------------------------
     */
	public function delSsidInfo()
	{
		$code = 200;
		$message = '成功';
		$dataArr = array();

		$ssid = I('param.ssid');
		if($ssid)
		{
			$res = S($ssid, null);

			if(false === $res)
			{
				$code = \Think\ErrorCode::CACHE_ERROR;
				$message = \Think\ErrorCode::$statusCode[$code];
			}
		}
		else
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$message = \Think\ErrorCode::$statusCode[$code];
		}

		$this->outJSON($code, $message, $dataArr);
	}



    /**
     *-------------------------------------------------------------------------
     * @title： 获取验证码接口
     * @action：/login/identifycode
     *-------------------------------------------------------------------------
     */
    public function captcha() {
        echo $this->login->get_png($this->login->captcha_uri);
    }

	/*
     * 登录 对应v1  $this->login()
     * @param login_name $string 登录名称
     * @param password $string 密码
     * @return json
     * */
    public function login() {
		$param = array();
		$param['loginName'] = I('param.login_name', '');
		$param['password']  = I('param.password', '');
		$param['password'] = rsa_private_decrypt($param['password']);

		//新增isAuthorized|bs默认false
		!empty(I('param.isAuthorized')) ? $param['isAuthorized'] = true : false;

		//验证码
		$code  = xss_clean( I('param.verifyCode', '') );
		if( !check_code( $code ) ) {
			$this->outJSON( 500, '图片验证码错误!', ['is_code' => 1] );
			exit;
		}

		$ip = date("Ymd_").get_client_ip(0,true);
		$csrf_count_key = $ip.'_'.self::CSRF_ERR_CODE;
		$csrf_count = S($csrf_count_key);
		if($csrf_count>self::CSRF_CONTROLL_TIMES){
			$this->outJSON( '404', '登陆次数超限!' );
			exit;
		}
		if(!$param['loginName'] || !$param['password']){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$res = $this->login_v2->postData($this->login_v2->uri, $param);
		if($res['success'] == true) {

			//清除code计数
			code_count('','N');

			$_SESSION['p01']['nickName'] = ( isset( $res['data']['user']['nickname'] ) ) ? $res['data']['user']['nickname'] : '' ;
			$_SESSION['p01']['userId'] = $res['data']['user']['id'];
			$_SESSION['p01']['token'] = $res['data']['loginToken'];
			$this->login_v2->saveCookie($res['data']);
		}

		$res['data']['is_code'] = code_count( $res['code'] );

		if($res['code'] == self::CSRF_ERR_CODE){
			setCounter($csrf_count_key,self::CSRF_EXPIRE_TIME);
		}

		$this->ajaxReturn($res);
	}

	/**
	 * 清除csrf缓存
	 */
	public function csrfclean(){
		$key = I('param.key', '');
		if(!$key){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$crsf_count_key = $key.'_'.self::CSRF_ERR_CODE;
		S($crsf_count_key,null);
		$crsf_count_key = $key.'_'.self::CSRF_CHECK_MOBILE;
		S($crsf_count_key,null);
		$crsf_count_key = $key;
		S($crsf_count_key,null);
		$data = S($crsf_count_key);
		$this->response(array('success'=>true,'data'=>$data));
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：获取用户的实时信息
     * @action：/login/getCurrInfo
     * @method：GET
	 * @params：无
     *-------------------------------------------------------------------------
     */
	public function getCurrInfo()
	{
		if(!$this->userId)
		{
			$this->outError(\Think\ErrorCode::USER_NO_LOGIN);
		}
		
		$code = 200;
		$message = '成功';
		$returnArr = array();
		
		$returnArr['userId'] 		= $this->user_infos['userId'];
		$returnArr['imagePath'] 	= $this->user_infos['imagePath'];
		$returnArr['nickName'] 		= $this->user_infos['nickName'];
		$returnArr['isExpert'] 		= $this->user_infos['isExpert'];
		$returnArr['messCount'] 	= 0;
		$returnArr['carProdNum'] 	= 0;
		
		$this->outJSON($code, $message, $returnArr);
		exit;
	}
}
