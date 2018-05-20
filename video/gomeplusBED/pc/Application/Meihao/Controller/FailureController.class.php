<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能： 首页                                                       |
 * +----------------------------------------------------------------------+
 * | Author:   lishuai@gomeplus.com                                       |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-12 10:20:06 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Home\Controller\BaseController;
class FailureController extends BaseController {

    public function __construct() {
        parent::__construct();

    }


    //圈子失效页面
    public function index(){

        $this->open = D('Open');
        $this->openinfo = $this->open->getData( $this->open->officialAccounts,[] );
        if( $this->openinfo['data']['status'] ==3 && $this->openinfo['data']['group']['status']==1 )
        {
            $this->assign('mh_info',$this->openinfo['data']);
            $this->display('Index/failure');
            exit;
        }else{
            $this->_empty();
        }
    }

   

}
