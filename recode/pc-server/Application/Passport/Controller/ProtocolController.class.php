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
 * | Author:lishuai <lishuai-ds1@gomeplus.com>                                  |
 * +----------------------------------------------------------------------+
 * | Date:2017-01-09 18:00:00 CST                                         |
 * +----------------------------------------------------------------------+
 */
 
namespace Passport\Controller;
use Home\Controller\BaseController;
use Think\Rsyslog;
class ProtocolController extends BaseController
{
	public $data = array();
	
	public function __construct()
	{
		parent::__construct();
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
     * @title：一账通登录升级(授权)
     * @action：/protocol/authorize
     * @author:：李帅
     * @date：2016-01-06
     *-------------------------------------------------------------------------
     */
	public function authorize(){
		$this->display('Protocol/authorize');
	}


	/**
     *-------------------------------------------------------------------------
     * @title：国美平台服务协议
     * @action：/protocol/gomeagreement
     * 
     * @author:：李帅
     * @date：2016-01-09
     *-------------------------------------------------------------------------
     */
	public function gomeagreement(){
		$this->display('Protocol/gomeAgreement');
	}


	/**
     *-------------------------------------------------------------------------
     * @title：美付宝用户服务协议
     * @action：/protocol/gomeagreement
     * 
     * @author:：李帅
     * @date：2016-01-09
     *-------------------------------------------------------------------------
     */
	public function mfbagreement(){
		$this->display('Protocol/mfbAgreement');
	}

    /**
     *-------------------------------------------------------------------------
     * @title：一账通提示页
     * @action：/protocol/gomeagreement
     * 
     * @author:李帅
     * @date：2016-01-09
     *-------------------------------------------------------------------------
     */
    //成功
    public function successmsg(){
        if( empty( $this->token ) || empty( $this->userId ) ) login_redirect( curPageURL() );
        $this->display('Protocol/success');
    }
    //已经升级过
    public function alreadymsg(){
       $this->display('Protocol/already');
    }
    //失败
    public function failmsg(){
     
        $this->display('Protocol/fail');
    }
	

	
}
