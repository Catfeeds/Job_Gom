<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                           |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                                                                                     |
 * +----------------------------------------------------------------------+
 * | Author:songwenchao <songwenchao@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2017-02-23 13:49:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Home\Controller;
use Home\Controller\BaseController;
class JoinController extends BaseController
{
    
	public function __construct()
	{
		parent::__construct();
	}
	

	public function index(){
	    $this->assign('nav_active', 6);
	   $this->display('Index/join');
	}

}
