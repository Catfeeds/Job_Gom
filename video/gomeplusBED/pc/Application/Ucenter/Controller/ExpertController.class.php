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
use Home\Controller\BaseController;
class ExpertController extends BaseController
{
	private $expertInfo = array();
	
	public function __construct()
	{
		parent::__construct();
		$this->expert = D('Expert');
	}

    /**
     * 达人招募入口
     * $status = 0; //0-介绍页 1-申请页面 2-审核页面 3-审核失败页面 4-修改页面 5-成功页面
     */
    public function index(){
        $res = $this->expert->getdata($this->expert->getExpert, []);
        if(!$res['success']){
            $this->_empty();
            exit;
        }

        $urlArr = [
          'introduce','apply','audit','fail','apply','succeed'
        ];
        //根据达人信息对达人状态对应页面拆解
        if(!$res['data']['isExpert']){

            $apply = I('param.apply', 3, 'intval'); //申请和修改页面的标示

            if(!isset($res['data']['auditStatus'])){
                $status = 0;
                if($apply === 0 && $res['data']['isPersonalInfoCompleted'] && $res['data']['isMeetTheNeedsOfTopic']){
                    $status = 1;
                }
            }else{
                $status = 2;
                if($res['data']['auditStatus'] == 2){
                    $status = 3;
                    if($apply == 1){
                        $status =4;
                    }
                }
            }
        }else{
            $status = 5;
        }
        $this->expertInfo = $res['data'];
        $url = $urlArr[$status];
        $this->$url($apply);
    }

    /**
     * 达人介绍页面
     */
    private function introduce(){
        $this->assign('result', $this->expertInfo);
        $this->assign('title', '达人招募');
        $this->display('Expert/index');
    }

    /**
     * @desc 申请/再次申请
     * @param int $applyFlag =1 再次申请
     */
	private function apply($applyFlag=0){
        C('HTTP_CACHE_CONTROL', 'no-store, no-cache, must-revalidate,post-check=0, pre-check=0');
        $randStr = time();
        $key = 'is_access_'.$this->userId;
        S($key,$randStr,600);

		if($applyFlag){
            $this->assign('result', $this->expertInfo);
		}
		$this->assign('title', '达人招募');
		$this->assign('xm_tag', 1);
        $this->assign('randStr',$randStr);
        $this->assign('applyFlag', $applyFlag);
		$this->display('Expert/apply');
	}

    /**
     * 审核中
     */
	private function audit(){
        $this->assign('result', $this->expertInfo);
		$this->assign('title', '达人招募');
		$this->display('Expert/audit');
	}

    /**
     * 审核成功
     */
	private function succeed(){
	    $buttonInfo = [];
	    $param['id'] = 84333;
        $res = $this->expert->getdata($this->expert->button, $param);
        if(isset($res['data']['peas']) && !empty($res['data']['peas'])){
            foreach ($res['data']['peas'] as $key=>$val){
                if($val['platformType'] == 'PC'){
                    $buttonInfo['text'] = $val['buttonText'];
                    $buttonInfo['url'] = $val['redirectValue'];
                    $buttonInfo['noteText'] = $val['noteText'];
                }
            }
        }

        $isAuth = $this->expert->postdata($this->expert->certification, []);

        $auth_url = 'https://'.C('gome')['URL']['GCOIN_URL'].'realAuth/inits.dhtml?type=10';
		$this->assign('auth_url', $auth_url);
		$this->assign('buttonInfo', $buttonInfo);
		$this->assign('isAuth', $isAuth);
		$this->assign('title', '达人招募');
		$this->display('Expert/succeed');
	}

    /**
     * 审核失败
     */
	private function fail(){
		$this->assign('title', '达人招募');
		$this->assign('result', $this->expertInfo);
		$this->display('Expert/fail');
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：第一次达人申请1
     * @action：/expert/postExpert
	 * @param：realName					必填	String	申请人真实姓名
	 * @param：mobile					必填	String	联系方式
	 * @param：categoryId				必填	Integer	达人类别ID
	 * @param：introduction				必填	String	个人介绍
     *-------------------------------------------------------------------------
     */
	public function postExpert(){
		$this->checkParams();
        $param = array();
        $param['realName'] 				= xss_clean(I('param.realName'));
        $param['mobile'] 				= xss_clean(I('param.mobile'));
        $param['categoryId'] 			= I('param.categoryId', 1, 'intval');
        $param['introduction'] 			= xss_clean(I('param.introduction'));
        $postRes = $this->expert->postData($this->expert->postExpert, $param);
        $this->response($postRes);
	}
	
	/**
     *-------------------------------------------------------------------------
     * @title：申请达人失败后再次申请
     * @action：/expert/putExpert
	 * @param：realName					必填	String	申请人真实姓名
	 * @param：mobile					必填	String	联系方式
	 * @param：categoryId				必填	Integer	达人类别ID
	 * @param：introduction				必填	String	个人介绍
     *-------------------------------------------------------------------------
     */
	public function putExpert(){
        $this->checkParams();
        $key = 'is_access_'.$this->userId;
        if(S($key) == I('param.randStr')){
            S($key,null);
            $param = array();
            $param['realName'] 				= xss_clean(I('param.realName'));
            $param['mobile'] 				= xss_clean(I('param.mobile'));
            $param['categoryId'] 			= I('param.categoryId', 1, 'intval');
            $param['introduction'] 			= xss_clean(I('param.introduction'));
            $putRes = $this->expert->putData($this->expert->putExpert, $param);
            $this->response($putRes);
        }else{
            $data = [
                'success'=>true,
                'code'=>500,  //与添加接口保持一致
                'message'=>"提交完毕，不允许重复提交哦！",
                'data'=>[]
            ];
            $this->response($data);
        }
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
		$this->response($getRes);
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
			'mobile',
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
}
