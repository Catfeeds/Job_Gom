<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：LoginController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:baikai <baikai@gomeplus.com>                                  |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-19 18:00:00 CST                                         |
 * +----------------------------------------------------------------------+
 */
 
namespace Passport\Controller;
use Home\Controller\BaseController;
use Think\Rsyslog;
class LoginController extends BaseController
{
	public $data = array();
	private $availTime = 300;	//PC扫码登录缓存有效时间
	const SNS_LOGIN_TYPE_GUOMEIPAY = 'gomepay';
	const SNS_LOGIN_TYPE_JIXIN = 'jixin';

	public function __construct()
	{
		parent::__construct();
		$this->login = D('Login');
        $this->login_v2 = D('LoginV2');
	}

    /*
     * 记录跳转SESSION
     * */
    public function set_session_redirect( $data ) {
        if( empty($data) ) return $data;

        session('state',$data);
    }

	/**
     *-------------------------------------------------------------------------
     * @title：用户登录首页
     * @action：/login/index
     * @param：state，类型：STRING，必须：NO 登陆成功后跳转链接
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function index()
	{
		// 已登录,跳到首页
        if($this->userId)
		{
            header("location:".$this->mx_domain['main']);exit;
		}
       	$this->assign('title', '登录');
       	$getRedirect = isset($_GET['redirect']) ? $_GET['redirect'] : $this->mx_domain['main'];
		if(!isset($_GET['redirect']) && isset( $_SERVER['HTTP_REFERER'] ) && $_SERVER['HTTP_REFERER']){
			$getRedirect = $_SERVER['HTTP_REFERER'];
		}
		$url_info = parse_url($getRedirect);
		$current_domain = APP_HTTP.$url_info['host'].'/';
		if(isset($url_info['port']) && !empty($url_info['port'])){
		    $current_domain = APP_HTTP.$url_info['host'].":".$url_info['port'].'/';
		}
		#对redirect验证，防止被别人利用
		$trans_domain = array_flip($this->mx_domain);
		if(isset($trans_domain[$current_domain])){
			$getRedirect = base64_encode($getRedirect);
		}else{
			header("location:".$this->mx_domain['main']);
			exit;
		}
        $this->set_session_redirect( $getRedirect );
        //SEO
        $seoMap = seoMap('', array("{{1}}" => "登录" ));
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
		$this->assign( 'redirect', base64_decode($getRedirect));
		$this->display('Login/index');
	}

	public function sns_bind_phone_test(){
		$this->display('Login/sns_bind_phone');
	}

    public function qqtest(){
        $this->display('Login/qqtest');
    }	

	/**
     *-------------------------------------------------------------------------
     * @title：用户退出接口
     * @action：/login/logout
     * @method：GET/POST
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function logout()
	{
		cookie('userId', null);
		cookie('nickName', null);
		cookie('userInfo', null);
		cookie('gomeplusid', null); // 删除sessionid
		session_destroy();
		header("location:".$this->mx_domain['passport']."login");exit;
	}

	
	/**
     *-------------------------------------------------------------------------
     * @title：查询登录错误次数接口，大于等于3次序言验证码
     * @action：/login/errornum
     * @method：GET/POST
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function errorNum()
	{
		$param['loginName'] = I('param.loginName', '');
		$list = $this->login->getData($this->login->error_num, $param, false);
		$this->ajaxReturn($list);
	}


	/**
     *-------------------------------------------------------------------------
     * @title： 微信登陆链接
     * @action：/login/connect_qq
     *-------------------------------------------------------------------------
     */
	public function connect_qq(){
        $redirect = I( 'get.redirect', '' );
        $this->set_session_redirect( $redirect );
		header("location:"."https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=".C('QQ_CLIENT_ID')."&redirect_uri=".C('QQ_REDIRECT_URI'));
	}
	/**
     *-------------------------------------------------------------------------
     * @title：qq第三方登录回调页面
     * @action：/login/qqcallback
     * @method：GET/POST
     * @author：柏凯
     *-------------------------------------------------------------------------
     */
 	function qqcallback()
    {
        $code  = I('param.code', '');
        //Step2:通过Authorization Code获取Access Token
        //若成功返回：access_token=FE04*****CCE2&expires_in=7776000&refresh_token=88E4**BE14
        //若失败返回：callback( {"error":100020,"error_description":"code is reused error"} ); 
        
        $tokenStr = file_get_contents("https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=".C('QQ_CLIENT_ID')."&client_secret=".C('QQ_CLIENT_KEY')."&code=".$code."&redirect_uri=".C('QQ_REDIRECT_URI'));
        if (strpos($tokenStr, "callback") !== false)
        {
            $lpos 	   = strpos($tokenStr, "(");
            $rpos      = strrpos($tokenStr, ")");
            $tokenStr  = substr($tokenStr, $lpos + 1, $rpos - $lpos -1);
            $msg       = json_decode($tokenStr);
            if (isset($msg->error))
            {
                Rsyslog::write($tokenStr, Rsyslog::ERR);
                //callback地址由于https协议造成跳转，使得qq服务器认为是不同的请求,导致跳转到出错页面,这里先注释
                //$this->redirect(C('ERROR_PAGE'));exit;
            }
        }
        $params = array();
        parse_str($tokenStr, $params);
        $accessToken = $params['access_token'];

        //Step3:使用Access Token来获取用户的OpenID
        //若成功返回：callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
        $openIDStr = file_get_contents("https://graph.qq.com/oauth2.0/me?access_token=".$accessToken);
        if (strpos($openIDStr, "callback") !== false)
        {
            $lpos       = strpos($openIDStr, "(");
            $rpos       = strrpos($openIDStr, ")");
            $openIDStr  = substr($openIDStr, $lpos + 1, $rpos - $lpos -1);
        }
        $user = json_decode($openIDStr);
        if (isset($user->error))
        {
            Rsyslog::write($openIDStr, Rsyslog::ERR);
            $this->redirect(C('ERROR_PAGE'));exit;
        }
        $openID = $user->openid;

        //Step4:使用Access Token以及OpenID来访问和修改用户数据
        $userInfo = file_get_contents("https://graph.qq.com/user/get_user_info?access_token=".$accessToken."&oauth_consumer_key=".C('QQ_CLIENT_ID')."&openid=".$openID);
        if(!$userInfo)
        {
            Rsyslog::write($userInfo, Rsyslog::ERR);
            $this->redirect(C('ERROR_PAGE'));exit;
        }
        $userInfo             = json_decode($userInfo, true);
        $param['thirdPartyId']   = $openID;
//        $param['snsUserName'] = $userInfo['nickname'];
        $param['type']   = 'qq'; // qq登录
        $list = $loginData    = $this->login_v2->getData($this->login_v2->sns_login, $param);
        if($list['success'] != true)
        {
            // 记录错误日志
            Rsyslog::write($list, Rsyslog::ERR);
            $this->redirect(C('ERROR_PAGE'));exit;
        }

		$sessionData = array(
			'thirdPartyId'=>$openID,
			'thirdPartyUserName'=>$userInfo['nickname'],
			'thirdPartyUserFacePicUrl'=>$userInfo['figureurl_qq_2'],
			'type'=>'qq',
			'userId' =>$list['data']['user']['id'],
			'nickName' =>$list['data']['user']['nickname'],
		);
		session('transmit_session.thirdPartyInfo',$sessionData);

        if($list['data']['isBound'] != 1 || $list['data']['isBound'] != true) // 未绑定手机号，去绑定手机号
        {
            header('location:/login/snsbindphonepage?snsUserId='.$openID.'&whereFrom=qq');exit;
        }

		//是否重新设置昵称
		if( isset( $list['data']['isNeedReset'] ) ) $this->is_need_reset( $list['data']['isNeedReset'] );

        // 已经绑定，直接登录
        $this->login_v2->saveCookie($list['data']);
        header('location:'.base64_decode(session('state')));exit;
    }

	/**
     *-------------------------------------------------------------------------
     * @title： 微信登陆链接
     * @action：/login/connect_wechat
     *-------------------------------------------------------------------------
     */
	public function connect_wechat(){
        $redirect = I( 'get.redirect', '' );
        $this->set_session_redirect( $redirect );

		header("location:"."https://open.weixin.qq.com/connect/qrconnect?appid=".C('WX_APP_ID')."&redirect_uri=".C('WX_REDIRECT_URL')."&response_type=code&scope=snsapi_login#wechat_redirect");
	}
	/**
     *-------------------------------------------------------------------------
     * @title：微信第三方登录回调页面
     * @action：/login/wechatcallback
     * @method：GET/POST
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function wechatcallback()
	{
		$code = I('param.code', '');
		$tokenArr = file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=".C('WX_APP_ID')."&secret=".C('WX_APP_SECRET')."&code=".$code."&grant_type=authorization_code");
		if(isset($tokenArr['errcode']))
		{
			// 记录错误日志
			Rsyslog::write($tokenArr, Rsyslog::ERR);
			$this->redirect(C('ERROR_PAGE'));exit;
		}
		$tokenArr = json_decode($tokenArr, true);
		$accessToken = $tokenArr['access_token'];
		$openId = $tokenArr['openid'];
		$userInfo = file_get_contents("https://api.weixin.qq.com/sns/userinfo?access_token=".$accessToken."&openid=".C('WX_APP_ID')."&lang=zh_CN");
		if(! $userInfo)
		{
			// 记录错误日志
			Rsyslog::write($userInfo, Rsyslog::ERR);
			$this->redirect(C('ERROR_PAGE'));exit;
		}
		$userInfo = json_decode($userInfo, true);
		$param['thirdPartyId'] = $userInfo['openid'];
//		$param['snsUserName'] = $userInfo['nickname'];
		$param['unionId'] = $userInfo['unionid'];
		$param['type'] = 'wechat'; // 微信登录
		$list = $loginData = $this->login_v2->getData($this->login_v2->sns_login, $param);
		if($list['success'] != true)
		{
			// 记录错误日志
			Rsyslog::write($list, Rsyslog::ERR);
			$this->redirect(C('ERROR_PAGE'));exit;
		}

		$sessionData = array(
			'thirdPartyId'=>$userInfo['openid'],
			'unionId'	  =>$userInfo['unionid'],
			'thirdPartyUserName'	  =>$userInfo['nickname'],
			'thirdPartyUserFacePicUrl'=>$userInfo['headimgurl'],
			'type'		=>'wechat',
			'userId'		=>$list['data']['user']['id'],
			'nickName'  =>$list['data']['user']['nickname'],
		);

		session('transmit_session.thirdPartyInfo',$sessionData);
		if($list['data']['isBound'] != 1 || $list['data']['isBound'] != true) // 未绑定手机号，去绑定手机号
		{
			header('location:/login/snsbindphonepage?snsUserId='.$userInfo['openid'].'&unionId='.$userInfo['unionid'].'&whereFrom=wechat');exit;
		}

		//是否重新设置昵称
		if( isset( $list['data']['isNeedReset'] ) ) $this->is_need_reset( $list['data']['isNeedReset'] );

		$this->login_v2->saveCookie($list['data']);
		header('location:'.base64_decode(session('state')));exit;
	}

	/**
     *-------------------------------------------------------------------------
     * @title： 微博登陆链接
     * @action：/login/connect_wb
     *-------------------------------------------------------------------------
     */
	public function connect_wb(){
        $redirect = I( 'get.redirect', '' );
        $this->set_session_redirect( $redirect );

		import('Passport.Lib.SaeTOAuthV2');
		$TOAuthV2 = new \SaeTOAuthV2(C('WB_AKEY'), C('WB_SKEY'));
		$code_url = $TOAuthV2 -> getAuthorizeURL(C('WB_CALLBACK_URL'), 'code');
		header("location:".$code_url);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：微博第三方登录回调页面
     * @action：/login/wbcallback
     * @method：GET/POST
     * @author：刘振
     * @date：2016-07-07
     *-------------------------------------------------------------------------
     */
	public function wbcallback(){
        import('Passport.Lib.SaeTOAuthV2');
		$TOAuthV2 = new \SaeTOAuthV2(C('WB_AKEY'), C('WB_SKEY'));
		$code = I('param.code', '');
		
		$errorCode = I('param.error_code');		
		if($errorCode == 21330)
		{
			header('Location:'.APP_HTTP.C('PASSPORT_URL').'login');exit;
		}
		
		if($code)
		{
			$keys = array('code' => $code, 'redirect_uri' => C('WB_CALLBACK_URL'));
			$tokenArr = $TOAuthV2 -> getAccessToken('code', $keys) ;
		}
		if(!$tokenArr['access_token'])
		{
			// token获取失败记录错误日志
			Rsyslog :: write($tokenArr, Rsyslog::ERR);
			$this -> redirect(C('ERROR_PAGE'));exit;
		}
		if($tokenArr)
		{
			$TClientV2 = new \SaeTClientV2(C('WB_AKEY'), C('WB_SKEY'), $tokenArr['access_token']);
			$uid_get = $TClientV2 -> get_uid();
			$uid = $uid_get['uid'];
			$userInfo = $TClientV2 -> show_user_by_id($uid);

			if(!$userInfo)
			{
				Rsyslog::write($userInfo, Rsyslog::ERR);
				$this->redirect(C('ERROR_PAGE'));exit;
			}
			
			//微博登陆
			$param['thirdPartyId'] = $uid;
			$param['type'] = 'weibo'; // 微博登录
			$loginData = $this->login_v2->getData($this->login_v2->sns_login, $param);
			if($loginData['success'] != true)
			{
				Rsyslog::write($loginData, Rsyslog::ERR);
				$this -> redirect(C('ERROR_PAGE'));exit;
			}
			
			$sessionData = array(
				'thirdPartyId'=>strval($userInfo['id']),
				'thirdPartyUserName'=>$userInfo['name'],
				'thirdPartyUserFacePicUrl'=>$userInfo['avatar_hd'],
				'type'=>'weibo',
				'userId' =>$loginData['data']['user']['id'],
				'nickName'=>$loginData['data']['user']['nickname'],
			);

			session('transmit_session.thirdPartyInfo',$sessionData);
			// 未绑定手机号，去绑定手机号
			if($loginData['data']['isBound'] != 1 || $loginData['data']['isBound'] != true) 
			{
				header('location:/login/snsbindphonepage?snsUserId='.$uid.'&whereFrom=weibo');exit;
			}

			//是否重新设置昵称
			if( isset( $loginData['data']['isNeedReset'] ) ) $this->is_need_reset( $loginData['data']['isNeedReset'] );

			// 已经绑定，直接登录			
			$this->login_v2->saveCookie($loginData['data']);
			header('location:'.base64_decode(session('state')));exit;
		}
	}

	/*
	 * 是否重新设置昵称
	 * */
	public function is_need_reset( $is_nick ) {
		if( empty( $is_nick ) ) return false;

		if( $is_nick ) {
			header('location:/regist/indexnickname');
			exit;
		}
	} 

	/**
     *-------------------------------------------------------------------------
     * @title：供BS调用，推送ssid的相关状态及用户信息
     * @action：/login/pushUserInfo
     * @method：GET/POST
	 * @params：ssid		类型：STRING			必须：YES
	 * @params：status		类型：INTEGER			必须：YES
	 * @params：userInfo	类型：ARRAY（数组）		必须：当status为4时，必填
     * @return：json串
	 *		httpCode说明：
	 *			400：ssid为空
	 *			404：ssid在memcache中不存在
	 *			500：memcache操作失败
     * @author：liuzhen
     * @date：2016-07-08
     *-------------------------------------------------------------------------
     */
	public function pushUserInfo()
	{
		$returnArr = array();
		$currTime = time();
		$scanBeforeTime = 180;
		$scanAfterTime = 60;
		$endStatusArr = array(1, 3, 4);
		$availTime = $this->availTime;
		$httpCodeArr = array(400 => 'ssid为空', 404 => 'ssid在memcache中不存在', 500 => 'memcache操作失败');
		
		$code = 200;
		$message = '成功';
		$dataArr = (object)array();
		
		$jsonStr = file_get_contents('php://input');
		$jsonArr = json_decode($jsonStr, true);
		
		$ssid = I('param.ssid') ? I('param.ssid') : $jsonArr['ssid'];
		$status = I('param.status') ? I('param.status') : $jsonArr['status'];
		$userInfo = I('param.userInfo') ? I('param.userInfo') : $jsonArr['userInfo'];
		$token = I('param.loginToken') ? I('param.loginToken') : $jsonArr['loginToken'];
		
		if(!$ssid)
		{
			$code = 400;
			$returnArr['message'] 	= $httpCodeArr[$code];
			$returnArr['data'] 		= $dataArr;
			
			http_response_code($code);
			$this->ajaxReturn($returnArr);
			exit;
		}
		
		$ssidArr = S($ssid);
		if(false === $ssidArr)
		{
			$code = 404;
			$returnArr['message'] 	= $httpCodeArr[$code];
			$returnArr['data'] 		= $dataArr;
			
			http_response_code($code);
			$this->ajaxReturn($returnArr);
			exit;
		}
		
		$ssidStatus = $ssidArr['ssidStatus'];
		if(!in_array($ssidStatus, $endStatusArr) && $ssidStatus != $status)
		{
			switch($status)
			{
				case 2:
					$ssidArr['scanTime'] = $currTime;
					$genTime = $ssidArr['genTime'];
					if($currTime - $genTime > $scanBeforeTime)
					{
						$status = 1;
					}
					break;
				case 4:
					//V1、V2接口用户信息数据适配
					$storeArr = array();
					$storeArr['loginToken'] = $token;
					$storeArr['user'] = $userInfo;
					$ssidArr['userInfo'] = $storeArr;
					$scanTime = $ssidArr['scanTime'];
					if($currTime - $scanTime > $scanAfterTime)
					{
						$status = 3;
					}
					break;
			}
			$ssidArr['ssidStatus'] = $status;
			
			$memFlag = S($ssid, $ssidArr, $availTime);
			if(!$memFlag)
			{			
				$code = 500;
				$message = $httpCodeArr[$code];
			}
		}
		
		$returnArr['message'] 	= $message;
		$returnArr['data'] 		= $dataArr;
		
		if($code != 200)
		{
			http_response_code($code);
		}		
		
		$this->ajaxReturn($returnArr);
	}

	/**
     *-------------------------------------------------------------------------
     * @title：三方登录绑定手机号页面（微信、qq、微博通用）
     * @action：passport/login/snsbindphonepage
     * @method：GET/POST
     * @params：snsUserId，类型：STRING，必须：NO ，描述:微信openid/微博uid
     * @params：unionId，  类型：STRING，必须：NO ，微信登陆，微信用户id，qq不需要此参数
     * @params：whereFrom，类型：STRING，必须：YES ，登陆来源 [qq、wechat、weibo、jixin、gomepay]
     * @params：state，    类型：STRING，必须：NO ，描述:登陆成功后跳转地址
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function snsBindPhonePage()
	{
		$snsUserId = I('param.snsUserId', '');
		$unionId = I('param.unionId', '');
		$whereFrom = I('param.whereFrom', ''); // qq、wechat、weibo、jixin、gomepay
		$sns_info = session('transmit_session.thirdPartyInfo');
		//验证是否经过上一步操作
		if( !isset($sns_info['thirdPartyId']) || !$sns_info['thirdPartyId'] || !isset($sns_info['type']) || !$sns_info['type']){
			$login_url = APP_HTTP.C('PASSPORT_URL').'login/index';
			header("location: ".$login_url );
			exit;
		}
		$_SESSION['p01']['isRegist'] = false;
		$this->assign('snsUserId', $snsUserId);
		$this->assign('unionId', $unionId);
		$this->assign('whereFrom', $whereFrom);
        $this->display('Login/sns_bind_phone');
	}

	/**
     *-------------------------------------------------------------------------
     * @title：三方首次登录绑定手机号（微信、qq、微博通用）
     * @action：passport/login/snsBindPhoneFirst
     * @method：GET/POST
     * @params：mobile，   类型：STRING，必须：YES ，绑定手机号码
     * @params：type，类型：STRING，必须：YES ，来源：QQ: qq;微信：wechat;微博: weibo
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function snsBindPhoneFirst()
	{
		$param['mobile'] = I('param.mobile', '');
		$param['type'] = I('param.type', ''); // qq or wechat
		$sns_info = session('transmit_session.thirdPartyInfo');
		//open_id有问题
		if(!isset($sns_info['thirdPartyId']) && !$sns_info['thirdPartyId']){
			$this->outError(\Think\ErrorCode::VERIFY_CODE_ERR);
		}
		if(checkMobile($param['mobile'])===false || !$param['type']){
			$this->outError(\Think\ErrorCode::VERIFY_CODE_ERR);
		}
		$list = $this->login_v2->postData($this->login_v2->sns_bind_phone_first, $param);
		$this->ajaxReturn($list);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：三方登录验证绑定手机号（微信、qq、微博通用）
     * @action：passport/login/snsBindPhoneFirst
     * @method：GET/POST
     * @params：mobile，      类型：STRING，必须：YES ，手机号
     * @params：verifyCode，  类型：STRING，必须：YES ，校验码
     * @params：whereFrom，   类型：STRING，必须：YES ，来源：QQ: qq;微信：wechat; 微博: weibo
     * @params：type，        类型：Int   ，必须：YES ，上一步返回，手机号对应的账号类型：1,已经是国美用户；2，非国美用户、国美在线用户；3，非国美和国美在线用户
     * @params：password，    类型：STRING，必须：NO  ，密码(加密后)，type=3时进行注册，必填
     * @params：recommendCode 类型：STRING，必须：NO  ，推荐码，type=2或3需要，选填
     * @params：token，       类型：STRING，必须：YES ，用于安全性校验
     * @params：snsUserId，   类型：STRING，必须：YES ，第三方登录id
     * @params：unionId，     类型：STRING，必须：YES ，微信的unionId
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function snsBindPhoneSecond()
	{
		$param['mobile'] = I('param.mobile', '');
		$param['verifyCode'] = I('param.verifyCode', '');
		$param['type'] = I('param.type', '');
		//活动来源Id
		$param['activityNo'] = I('param.activityNo', '');
		//手机号对应的账号类型：1,已经是国美用户；2，非国美用户、国美在线用户；3，非国美和国美在线用户
		$param['mobileType'] = I('param.mobileType', '');
		$param['mobileType'] = intval( $param['mobileType'] );
		$param['token'] = I('param.token', '');
		$param['membershipRefereeCode'] = I('param.recommendCode', '');
		$password = I('param.password', '');
		if($password){
			$param['password'] = rsa_private_decrypt($password);
		}
		$param['thirdPartyId'] = session('transmit_session.thirdPartyInfo')['thirdPartyId'];
		$param['thirdPartyUserName']  = $_SESSION['p01']['nickName'] = session('transmit_session.thirdPartyInfo')['thirdPartyUserName'];
		$param['thirdPartyUserFacePicUrl'] = session('transmit_session.thirdPartyInfo')['thirdPartyUserFacePicUrl'];
		$param['unionId'] = I('param.unionId', '');
		if(!$param['unionId']){
			$param['unionId'] = session('transmit_session.thirdPartyInfo')['unionId'];
		}
        //验证码校验
        if(!empty($param['membershipRefereeCode']) || $param['membershipRefereeCode'] != null){
            $userInfo_by_referral_code = $this->login_v2->getData($this->login_v2->regist_user_by_referral_code, array('referralCode'=>$param['membershipRefereeCode']));
            if(!$userInfo_by_referral_code['success']){
                $this->ajaxReturn($userInfo_by_referral_code);exit;
            }
        }

		$list = $this->login_v2->postData($this->login_v2->sns_bind_check, $param);

		if($list['success'] == true) {
			// 设置cookie
			$this->login_v2->saveCookie($list['data']);
		}

		$this->ajaxReturn($list);
	}


	/**
     *-------------------------------------------------------------------------
     * @title：登录成功，绑定手机号页面
     * @author：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function bindPhonePage() {
		if( empty( $this->token ) || empty( $this->userId ) ) login_redirect( curPageURL() );
		$this->display('Login/bindPhone');
	}


	/**
     *-------------------------------------------------------------------------
     * @title：普通登录绑定手机号
     * @action：BindPhoneFirst
     * @method：GET/POST
     * @params：mobile，   类型：STRING，必须：YES ，绑定手机号码
     * @author：柏凯
     *-------------------------------------------------------------------------
     */
	public function bindPhoneFirst()
	{
		$param['mobile'] = I('param.mobile', '');
		$list = $this->login->postData($this->login->bind_mobile_firststep, $param);
		$this->ajaxReturn($list);
	}

	/**
	 * 绑定手机号完成
	 *
	 */
	public function bindPhone()
	{
		$param['mobile'] = I('param.mobile', '');
		$param['verifyCode'] = I('param.verifyCode', '');
		$param['token'] = I('param.token', ''); // 检验token
		$loginData = $this->login->postData($this->login->bind_mobile, $param);
		$this->ajaxReturn($loginData);
	}

	/**
	 * 登录统一设置存储cookie信息
	 *
	 */
	public function saveCookie($data = array())
	{
		if($data){
			cookie('userId', authcode($data['userId'], 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
			cookie('nickName', authcode($data['nickName'], 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
			cookie('userInfo', authcode(json_encode($data), 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
			session("token_".$data['userId'], $data['token']);
		}
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：生成唯一的ssid，供PC端扫码登录使用
     * @action：/login/genSsid
     * @author：刘振
     * @date：2016-07-08
     *-------------------------------------------------------------------------
     */
	private function genSsid($prefix = '')
	{
		$str = md5(uniqid(mt_rand(), true));   
		$ssid  = substr($str, 0, 8).'-';   
		$ssid .= substr($str, 8, 4).'-';   
		$ssid .= substr($str, 12, 4).'-';   
		$ssid .= substr($str, 16, 4).'-';   
		$ssid .= substr($str, 20, 12);
		$ssid = str_replace('=', '', base64_encode($ssid));
		return $prefix.$ssid;
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：V1、V2接口用户信息数据适配
     * @action：/login/fieldAdap
     * @author：刘振
     * @date：2016-07-11
     *-------------------------------------------------------------------------
     */
	private function fieldAdap($userInfo)
	{
		$returnArr = array();
		
		$returnArr['isBound'] = true;
		$returnArr['userId'] = $userInfo['id'];
		$returnArr['nickName'] = $userInfo['nickname'];
		$returnArr['roleId'] = $userInfo['roleType'];
		$returnArr['recommonId'] = $userInfo['referralCode'];
		$returnArr['token'] = $userInfo['token'];
		$returnArr['imId'] = 'b_'.$userInfo['id'];
		$returnArr['mobileActivated'] = $userInfo['isMobileActivated'];
		$returnArr['mobile'] = $userInfo['mobile'];
		$returnArr['imagePath'] = $userInfo['facePicUrl'];
		
		return $returnArr;
	}

	/**
	 *  极信第三方授权
	 */
	public function connect_jx(){
		$params = array();
		$params['app_id'] = C('JX_APP_ID');
		$params['redirect_uri'] = C('JX_REDIRECT_URL');
		$params['response_type'] = 'code';
		$params['state'] = time();
		header("location: ".C('JX_AUTHORIZE_URL') . "?" . http_build_query($params));
		exit;
	}

	/**
	 * 极信回调登录接口
	 */
	public function jixincallback(){
		$code = I('param.code', '');
		$login_url = APP_HTTP.C('PASSPORT_URL').'login/index';
		if(!$code){
			header("location: ".$login_url );
			exit;
		}
		$param['authorizationCode'] = $code;
		$param['type'] = self::SNS_LOGIN_TYPE_JIXIN;
		$result = $this->login_v2->postData($this->login_v2->gomeThirdPartyInfo,$param);
		if($result['success']===true && $result['data']['thirdPartyId'] && $result['data']['unionId']){
			$this->sns_login($result['data'],self::SNS_LOGIN_TYPE_JIXIN);
		}else{
			Rsyslog::write(array_merge($param,$result), Rsyslog::ERR);
			header("location: ".$login_url );
			exit;
		}
	}

	/**
	 * 国美支付第三方授权
	 */
	public function connect_gm(){

		$params = array();
		$params['app_id'] = C('GOMEPAY_APP_ID');
		$params['response_type'] = 'code';
		$params['state'] = time();
		header("location: ".C('GOMEPAY_AUTHORIZE_URL') . "?" . http_build_query($params));
		exit;
	}

	/**
	 * 国美支付第三方登录
	 */
	public function gomepaycallback(){
		$code = I('param.code', '');
		$login_url = APP_HTTP.C('PASSPORT_URL').'login/index';
		if(!$code){
			header("location: ".$login_url );
			exit;
		}
		$param['authorizationCode'] = $code;
		$param['type'] = self::SNS_LOGIN_TYPE_GUOMEIPAY;
		$result = $this->login_v2->postData($this->login_v2->gomeThirdPartyInfo,$param);
		if($result['success']===true && $result['data']['thirdPartyId'] && $result['data']['unionId']){
			$this->sns_login($result['data'],self::SNS_LOGIN_TYPE_GUOMEIPAY);
		}else{
			Rsyslog::write(array_merge($param,$result), Rsyslog::ERR);
			header("location: ".$login_url );
			exit;
		}
	}

	/**
	 * 极信与国美支付登录
	 * @param $data
	 * @param $type
	 */
	private function sns_login($data,$type){
		$param['thirdPartyId'] = $data['thirdPartyId'];
		$param['unionId'] = $data['unionId'];
		$param['type']   = $type;
		$list = $loginData    = $this->login_v2->getData($this->login_v2->sns_login, $param);
		if($list['success'] != true)
		{
			// 记录错误日志
			Rsyslog::write($list, Rsyslog::ERR);
			$this->redirect(C('ERROR_PAGE'));exit;
		}

		$sessionData = array(
			'thirdPartyId' => $data['thirdPartyId'],
			'thirdPartyUserName' => $data['thirdPartyUserName'],
			'unionId' => $data['unionId'],
			'type'=>$type,
			'thirdPartyUserFacePicUrl'=>"",
			'userId' =>$list['data']['user']['id'],
			'nickName' =>$list['data']['user']['nickname'],
		);
		session('transmit_session.thirdPartyInfo',$sessionData);

		if($list['data']['isBound'] != 1 || $list['data']['isBound'] != true) // 未绑定手机号，去绑定手机号
		{
			header('location:/login/snsbindphonepage?snsUserId='. $data['thirdPartyId'].'&whereFrom='.$type);exit;
		}
		//是否重新设置昵称
		if( isset( $list['data']['isNeedReset'] ) ){
			$this->is_need_reset( $list['data']['isNeedReset'] );
		}
		// 已经绑定，直接登录
		$this->login_v2->saveCookie($list['data']);
		header('location:'.base64_decode(session('state')));exit;
	}

}
