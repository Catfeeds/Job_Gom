<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：LoginController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能： 登录页                                                       |
 * +----------------------------------------------------------------------+
 * | Author:   lishuai@gomeplus.com                                       |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-12 10:20:06 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Home\Controller\BaseController;
class LoginController extends BaseController {

    public function __construct() {
        parent::__construct();
        if( $this->userInfo['loginStatus'] == 3 )
        {
            header("location:".$this->mx_domain['meihao']);exit;
        }
    }

    //系统通知分页
    public function index(){
        //系统公告
        $meihao = D('Meihao/Open');
        $param = array('pageNum'=>1,'pageSize'=>1);
        $messageList = $meihao->getData($meihao->messageList,$param);
        $this->assign('messageList',$messageList['data']);
        $this->display('Login/index');
    }

}
