<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ExpertController.class.php                           	  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-09-08                                        			  |
 * +----------------------------------------------------------------------+
 */
 
namespace Ucenter\Controller;
use Home\Controller\AuthController;
class ExpertController extends AuthController
{
	private $expertInfo = array();
	
	public function __construct()
	{
		parent::__construct();
		$this->expert = D('Expert');
	}
	
	public function index()
	{
		$param = array();
		
		$res = $this->expert->getdata($this->expert->getExpert, $param);
		if(!$res['success'])
		{
			$this->_empty();
			exit;
		}
		
		$this->assign('title', '达人介绍');
		
		if(!$res['data']['isExpert'] && !isset($res['data']['auditStatus']))
		{
			$this->display('Expert/index');
		}
		else
		{
			$this->dealStatus();
		}
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：根据达人审核状态做相应操作
     * @action：/expert/dealStatus
	 * @note:字段说明
	 *		auditStatus：达人审核状态
	 *			0：待审核
	 *			1：审核通过(即已是达人)
	 *			2：审核不通过
	 *			另：返回数据中若无此字段，则尚未申请达人
     *-------------------------------------------------------------------------
     */
	public function dealStatus()
	{
		if(empty($this->expertInfo))
		{
			$param = array();
		
			$res = $this->expert->getdata($this->expert->getExpert, $param);
			if(!$res['success'])
			{
				$this->_empty();
				exit;
			}
			
			$this->expertInfo = $this->dealSize($res['data']);
		}
		
		$expertInfo = $this->expertInfo;
		
		if($expertInfo['isExpert'] == false)
		{
			if(isset($expertInfo['auditStatus']) && $expertInfo['auditStatus'] == 0)
			{
				$this->audit();
			}
			else if(isset($expertInfo['auditStatus']) && $expertInfo['auditStatus'] == 2)
			{
				//判断是否为申请失败后的再次申请，1：是，0：否，默认为0
				$applyFlag = I('param.apply', 0);
				if($applyFlag)
				{
					$this->apply();
				}
				else
				{
					$this->fail();
				}				
			}
			else if(!isset($expertInfo['auditStatus']))
			{
				$this->apply();
			}
		}
		else if($expertInfo['isExpert'] == true)
		{
			$this->succeed();
		}
	}
	
	private function apply()
	{
		$applyFlag = 0;
		$expertInfo = array();
		if($this->expertInfo['isExpert'] == false && $this->expertInfo['auditStatus'] == 2)
		{
			$applyFlag = 1;
			$expertInfo = $this->expertInfo;
		}
		$expertInfoJson = json_encode($expertInfo);
		
		$this->assign('title', '填写资料');
		$this->assign('applyFlag', $applyFlag);
		$this->assign('expertInfoJson', $expertInfoJson);
		$this->display('Expert/apply');
	}
	
	private function audit()
	{
		$this->assign('title', '审核中');
		$this->display('Expert/audit');
	}
	
	private function succeed()
	{
		$this->assign('title', '达人特权');
		$this->display('Expert/succeed');
	}
	
	private function fail()
	{
		$expertInfo = $this->expertInfo;
		$this->assign('title', '审核失败');
		$this->assign('expertInfo', $expertInfo);
		$this->display('Expert/fail');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：第一次达人申请
     * @action：/expert/postExpert
	 * @param：realName					必填	String	申请人真实姓名
	 * @param：idCardNo					必填	String	申请人身份证号
	 * @param：idcardPersonImageUrl		必填	String	申请人手持身份证图片路径
	 * @param：idcardFrontImageUrl		必填	String	申请人身份证正面图片路径
	 * @param：idcardBackImageUrl		必填	String	申请人身份证背面图片路径
	 * @param：categoryId				必填	Integer	达人类别ID
	 * @param：introduction				必填	String	个人介绍
     *-------------------------------------------------------------------------
     */
	public function postExpert()
	{
		$this->checkParams();
		
		$param = array();
		$param['realName'] 				= I('param.realName');
		$param['idCardNo'] 				= I('param.idCardNo');
		$param['idcardPersonImageUrl'] 	= I('param.idcardPersonImageUrl');
		$param['idcardFrontImageUrl'] 	= I('param.idcardFrontImageUrl');
		$param['idcardBackImageUrl'] 	= I('param.idcardBackImageUrl');
		$param['categoryId'] 			= I('param.categoryId', 1, 'intval');
		$param['introduction'] 			= I('param.introduction');
		//URL检查是否是本站
		if (!isTrustedDomain($param['idcardPersonImageUrl']) || !isTrustedDomain($param['idcardFrontImageUrl']) || !isTrustedDomain($param['idcardBackImageUrl']) ) {
			$this->outError(\Think\ErrorCode::IMAGE_URL_ERR);
		}
		$postRes = $this->expert->postData($this->expert->postExpert, $param);
		
		$this->ajaxReturn($postRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：申请达人失败后再次申请
     * @action：/expert/putExpert
	 * @param：realName					必填	String	申请人真实姓名
	 * @param：idCardNo					必填	String	申请人身份证号
	 * @param：idcardPersonImageUrl		必填	String	申请人手持身份证图片路径
	 * @param：idcardFrontImageUrl		必填	String	申请人身份证正面图片路径
	 * @param：idcardBackImageUrl		必填	String	申请人身份证背面图片路径
	 * @param：categoryId				必填	Integer	达人类别ID
	 * @param：introduction				必填	String	个人介绍
     *-------------------------------------------------------------------------
     */
	public function putExpert()
	{
		$this->checkParams();
		
		$param = array();
		$param['realName'] 				= I('param.realName');
		$param['idCardNo'] 				= I('param.idCardNo');
		$param['idcardPersonImageUrl'] 	= I('param.idcardPersonImageUrl');
		$param['idcardFrontImageUrl'] 	= I('param.idcardFrontImageUrl');
		$param['idcardBackImageUrl'] 	= I('param.idcardBackImageUrl');
		$param['categoryId'] 			= I('param.categoryId', 1, 'intval');
		$param['introduction'] 			= I('param.introduction');
		
		$putRes = $this->expert->putData($this->expert->putExpert, $param);
		
		$this->ajaxReturn($putRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：达人分类列表
     * @action：/expert/expertCtgy
     *-------------------------------------------------------------------------
     */
	public function expertCtgy()
	{
		$param = array();		
		$getRes = $this->expert->getData($this->expert->expertCtgy, $param);		
		$this->ajaxReturn($getRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：检测参数是否为空
     * @action：/expert/checkParams
     *-------------------------------------------------------------------------
     */
	private function checkParams()
	{
		$checkParams = array(
			'realName',
			'idCardNo',
			'idcardPersonImageUrl',
			'idcardFrontImageUrl',
			'idcardBackImageUrl',
			'categoryId',
			'introduction',
		);
		
		foreach($checkParams as $val)
		{
			$varName = 'param.'.$val;
			if(I($varName) === '' || I($varName) === null)
			{
				$code = \Think\ErrorCode::PARMA_ERROR;
				$this->outError($code);
				exit;
			}
		}
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：处理图片尺寸
     * @action：/expert/dealSize
	 * @param：expertInfo	Array
     *-------------------------------------------------------------------------
     */
	private function dealSize($expertInfo)
	{
		if(!isset($expertInfo['auditStatus']))
		{
			return $expertInfo;
		}
		
		$expertInfo['idcardBackImageUrl'] = getResizeImg($expertInfo['idcardBackImageUrl'], 230, 0);
		$expertInfo['idcardFrontImageUrl'] = getResizeImg($expertInfo['idcardFrontImageUrl'], 230, 0);
		$expertInfo['idcardPersonImageUrl'] = getResizeImg($expertInfo['idcardPersonImageUrl'], 230, 0);
		
		return $expertInfo;
	}
}
