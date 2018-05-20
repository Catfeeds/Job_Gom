<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                           |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：HelpController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                                                                                     |
 * +----------------------------------------------------------------------+
 * | Author:liluming <liluming@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2017-03-30                                     |
 * +----------------------------------------------------------------------+
 */

namespace Home\Controller;
use Home\Controller\BaseController;
class TestController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index(){
        echo '<a href="http://member.gome.com.cn/gome/index/loginStyle?callback=login_users&type=1" target="_blank">跳转</a>';
    }

}
