<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：PersonalController.class.php                               |
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
class PersonalController extends AuthController
{
	public function __construct()
	{
		parent::__construct();
		$this->personal = D('Personal');
	}
	
	public function index()
	{
		$showType = I('param.type', 1, 'intval');
		
		$this->getPersonalInfo();
		$this->assign('showType', $showType);
		$this->assign('title', '个人信息');
		$this->assign('activeUrl', APP_HTTP.C('UCENTER_URL').'personal/index') ; //左侧选中的地址
		$this->display('Personal/index');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：获取个人信息
     * @action：/personal/getPersonalInfo
     * @author：liuzhen
     * @date：2016-07-14
     *-------------------------------------------------------------------------
     */
	public function getPersonalInfo()
	{
		$personalInfoRes = $this->user_infos['ext'];
		
		if($personalInfoRes)
		{
			$personalInfo = $personalInfoRes['user'];
			$qrcodeUrl = 'gomeplus://mine/userInfo?userId='.$personalInfo['id'];
			$qrcodeUrl = urlencode($qrcodeUrl);
            $genQrcodeUrl = APP_HTTP.C('MAIN_URL').'Ajax/Qrcode/urlcode?url='.$qrcodeUrl;
			$personalInfo['genQrcodeUrl'] = $genQrcodeUrl;
			
			$this->assign('personalInfo',$personalInfo);
			
			$personalInfoArr = array();
			$personalInfoArr['birthday'] 	= isset($personalInfo['birthday']) ? $personalInfo['birthday'] : '';
			$personalInfoArr['gender']		= $personalInfo['gender'];
			$personalInfoArr['nickname'] 	= $personalInfo['nickname'];
			$personalInfoArr['facePicUrl'] 	= $personalInfo['facePicUrl'];
			session('personalInfo', $personalInfoArr);
			
			// 判断是否为默认头像
			// 正式环境默认头像：https://i0.meixincdn.com/v1/img/T1GRYTByJT1R4cSCrK.png
			// 预生产环境默认头像：https://i-pre.meixincdn.com/v1/img/T1TaVTB7LT1R4cSCrK.png
			$defaultFlag = (false !== stripos($personalInfoArr['facePicUrl'], 'T1GRYTByJT1R4cSCrK') 
			|| false !== stripos($personalInfoArr['facePicUrl'], 'T1TaVTB7LT1R4cSCrK'));
			if(false !== $defaultFlag)
			{
				$this->assign('defaultFlag', 1);
			}
			else
			{
				$this->assign('defaultFlag', 0);
			}
			
			return true;
		}
		else
		{
			$this->_empty();
			exit;
		}
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：修改个人信息
     * @action：/personal/modPersonalInfo
	 * @param：birthday      修改之后的出生日期 String      非必填
	 * @param：nickname		修改之后的昵称		String		非必填
	 * @param：gender		修改之后的性别		Integer		非必填
	 * @param：facePicUrl	修改之后的头像		String		非必填
     * @author：liuzhen
     * @date：2016-07-14
     *-------------------------------------------------------------------------
     */
	public function modPersonalInfo()
	{
		$defaultVal = '###';
		//备注：①性别需强制转换成整型
		$birthday 	= xss_clean(I('param.birthday', $defaultVal, 'strval'));
		$nickname 	= xss_clean(I('param.nickname', $defaultVal, 'strval'));
		$gender 	= I('param.gender', $defaultVal, 'intval');
		$facePicUrl	= xss_clean(urldecode(I('param.facePicUrl', $defaultVal, 'strval')));
		
		$personalInfoArr = session('personalInfo');
		$orgBirthday 	= $personalInfoArr['birthday'];
		$orgNickname 	= $personalInfoArr['nickname'];
		$orgGender 		= $personalInfoArr['gender'];
		$orgfacePicUrl	= $personalInfoArr['facePicUrl'];
		
		$returnArr = array();
		$dataArr = array();
		
		if($birthday === $defaultVal && $nickname === $defaultVal && $gender === $defaultVal && $facePicUrl === $defaultVal)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
		
		$param = array();
		//生日只能修改一次
		if(!$orgBirthday && $birthday !== $defaultVal && $birthday != $orgBirthday)
		{
			$param['birthday'] = $birthday;
		}
		if($nickname !== $defaultVal && $nickname != $orgNickname)
		{
			$param['nickname'] = $nickname;
		}
		if($gender !== $defaultVal && $gender != $orgGender)
		{
			$param['gender'] = $gender;
		}
		if($facePicUrl !== $defaultVal && $facePicUrl != $orgfacePicUrl)
		{
			//URL检查是否是本站
			if (isTrustedDomain($facePicUrl)===true) {
				$param['facePicUrl'] = $facePicUrl;
			}
		}
		if(empty($param))
		{
			$code = 200;
			$message = '个人信息修改成功';			
			$returnArr = output($code, $message, $dataArr);
			$this->ajaxReturn($returnArr);
			exit;
		}
		
		$modRes = $this->personal->putData($this->personal->modPersonalInfo, $param);
		
		//如果昵称、头像有变化，需要修改cookie里的信息
		if($modRes['success'])
		{
			foreach($param as $key => $val)
			{
				$personalInfoArr[$key] = $val;
			}
			session('personalInfo', $personalInfoArr);
		}
		$this->ajaxReturn($modRes);
	}
}
