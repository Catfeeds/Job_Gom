<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：GuideController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能： 操作指南                                                       |
 * +----------------------------------------------------------------------+
 * | Author:   lishuai@gomeplus.com                                       |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-12 10:20:06 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Home\Controller\BaseController;
class GuideController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    // 操作指南1
    public function index(){
        $this->display('Index/guide_1');
    }


    // 操作指南2
    public function content(){
        $this->display('Index/guide_2');
    }



}
