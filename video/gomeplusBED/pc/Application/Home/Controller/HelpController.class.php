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
class HelpController extends BaseController
{
    
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * 联系我们
	 */
	public function contact(){
	    $seoMap = seoMap('', ["{{1}}" => '商务合作']);
	    $this->assign('title',$seoMap['title']);
		//nav_active 设置值使导航栏不选中
		$this->assign('nav_active', 10);
	    $this->display('Help/contact');
	}
	/**
	 * 平台规则
	 */
	public function rule(){
	    $seoMap = seoMap('', ["{{1}}" => '平台规则']);
	    $this->assign('title',$seoMap['title']);
		$this->assign('nav_active', 10);
		$this->display('Help/rule');
	}
	
	public function download(){
	    $this->assign('nav_active', 11);
	    $this->display('Help/download');
	}
}
