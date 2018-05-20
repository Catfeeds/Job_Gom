<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：RegistController.class.php                                |
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
class RegistController extends BaseController
{
	public $data = array();

	public function __construct()
	{
		parent::__construct();
		$this->regist = D('Regist');
		$this->registV2 = D('RegistV2');
		$this->assign('redirect','');
	}

	/**
     *-------------------------------------------------------------------------
     * @title：注册页面
     * @action：/passport/regist/index
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function index()
	{
		// 已登录,跳到首页
		if($this->userId)
		{
			$url = APP_HTTP.C('MAIN_URL').'index/index';
			header('location: '.$url, true, 301);
			exit;
		}
        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => "注册" )
        );

		$this->assign('title', $seoMap['title']);
		$this->assign('keywords',$seoMap['keywords']);
		$this->assign('description',$seoMap['description']);
		$this->display('Regist/index');
	}


	/**
     *-------------------------------------------------------------------------
     * @title：第一步:获取验证码 已升级到V2
     * @action：/passport/regist/firststep
     * @param：mobile，类型：STRING，必须：NO 登陆成功后跳转链接
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function firstStep()
	{
		$_SESSION['p01'] = array();
		// 页面编码
		$param['mobile'] = I('param.mobile', 0);
		$registData = $this->registV2->postData($this->registV2->registerMobileVerifitionAction, $param);
		if($registData['code'] == 200)
		{
			$param['activityNo'] = I('param.activityNo', '');
			$_SESSION['p01']['token'] = $registData['data']['token'];
			$_SESSION['p01']['activityNo'] = $param['activityNo'];
		}
		$this->ajaxReturn($registData);

	}


	/**
     *-------------------------------------------------------------------------
     * @title：第二步:检验验证码，执行注册 已升级到V2
     * @action：/passport/regist/firststep
     * @param：mobile，  类型：STRING，必须：YES 注册手机号
     * @param：password，类型：STRING，必须：YES 注册密码
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function secondStep()
	{
		$param['mobile'] = I('param.mobile', 0);
		$param['password'] = I('param.password', '');
		$param['password'] = rsa_private_decrypt($param['password']);
		$param['verificationCode'] = I('param.verifyCode', '');
		$param['membershipRefereeCode'] =  I('param.membershipRefereeCode', '');
		$param['token'] = $_SESSION['p01']['token'];
		if($_SESSION['p01']['activityNo']){
			//添加活动号
			$param['activityNo'] = $_SESSION['p01']['activityNo'];
		}
		$_SESSION['p01']['isRegist'] = true;
		$registData = $this->registV2->postData($this->registV2->personalInfo, $param);
		if($registData['code'] == 200)
		{
			$_SESSION['p01']['mobile'] = $param['mobile'];
			$_SESSION['p01']['userId'] = $registData['data']['user']['id'];
			$_SESSION['p01']['nickName'] = $registData['data']['user']['nickname'];
			$_SESSION['p01']['token'] = $registData['data']['loginToken'];
			$_SESSION['p01']['isNeedReset'] = $registData['data']['isNeedReset'];
			D('LoginV2')->saveCookie($registData['data']);
		}
		//print_r($_SESSION);exit;
		$this->ajaxReturn($registData);
	}

	/**
	 * 完善用户信息页面
	 */
	public function indexNickname() {
		if( empty( $this->token ) || empty( $this->userId ) ) login_redirect( curPageURL() );

		$title = '登录';
		$isRegist = false;
		if(isset($_SESSION['p01']['isRegist']) && $_SESSION['p01']['isRegist']){
			$title = '注册';
			$isRegist = $_SESSION['p01']['isRegist'];
		}
        $this->assign('nickName',$_SESSION['p01']['nickName']);
		$this->assign('isRegist',$isRegist);
		$this->assign('title', $title);
		$this->display('Regist/index_nickname');
	}
    
    /**
     *-------------------------------------------------------------------------
     * @title：校验昵称接口
     * @action：/passport/regist/identifynickname
     * @param：nickname，    类型：STRING，必须：YES 用户昵称
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
    public function identifyNickname(){
	$param['userId'] = $_SESSION['p01']['userId'];
        $param['nickname'] = I('param.nickname', '');
        $identifyData = $this->registV2->postData($this->registV2->nicknameCheckAction, $param);
        $this->ajaxReturn($identifyData);
    }


	/**
     *-------------------------------------------------------------------------
     * @title：第三步，完善信息接口 已升级V2接口
     * @action：/passport/regist/identifyreferralcode
     * @param：userId，      类型：STRING，必须：YES 当前账号用户id
     * @param：nickname，    类型：STRING，必须：NO 用户昵称
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function thirdStep()
	{
		$nickname = I('param.nickname', '');
		$facePicUrl = I('param.facePicUrl', '');
		$birthday = I('param.birthday', '');
		if($nickname){
			$param['nickname'] = $nickname;
		}
		if($facePicUrl){
			$param['facePicUrl'] = $facePicUrl;
		}
		if($birthday){
			$param['birthday'] = $birthday;
		}
		if(!$param){
			$this->outError(\Think\ErrorCode::PARMA_ERROR);
		}
		$param['userId'] = $_SESSION['p01']['userId'];
		$registData = $this->registV2->putData($this->registV2->personalInfo, $param);
		$this->ajaxReturn($registData);
	}


	/**
     *-------------------------------------------------------------------------
     * @title：根据推荐码判断推荐人是否存在接口
     * @action：/passport/regist/identifyreferralcode
     * @param：onlineUserId，类型：STRING，必须：YES 推荐人推荐码
     * @author:：柏凯
     * @date：2016-05-20
     *-------------------------------------------------------------------------
     */
	public function identifyReferralCode(){
		$param['referralCode'] = I('param.referralCode','');
		$param['integrity'] = 'simple';
		$userInfo_by_referral_code = $this->regist->postData($this->regist->regist_user_by_referral_code, $param);
		$this->ajaxReturn($userInfo_by_referral_code);
	}

	/**
	 * 注册完成页面
	 */
	public function indexover()
	{
		$param['mobile'] = $_SESSION['p01']['mobile'];
		cookie('userId', null);
		cookie('nickName', null);
		cookie('userInfo', null);
		cookie('gomeplusid', null); // 删除sessionid
		$this->assign('title', '注册');
		$this->assign('mobile',$param['mobile']);
		$this->display('Regist/index_over');
	}


}