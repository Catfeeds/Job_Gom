<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ExpertService.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>           	                  |
 * +----------------------------------------------------------------------+
 * | Date:2016-09-08						                              |
 * +----------------------------------------------------------------------+
 */
  
namespace Ucenter\Service;
use Home\Service\BaseService;
class ExpertService extends BaseService
{
	public $key = 'ExpertService';
    public $bs_version = 2;
    public $param = array();
	
	public $getExpert = 'user/expert';		//获取达人信息
	public $putExpert = 'user/expert';		//修改达人信息
	public $postExpert = 'user/expert';		//申请达人操作
	public $expertCtgy = 'user/expertCategories';	//达人分类列表

    public $homePage = 'combo/expert/homePage';//达人平台首页显示信息
    public $notifications = 'atomic/expert/topExpertNotifications';//达人平台首页置顶通知
    public $expertNotifications = 'atomic/expert/expertNotifications';//获取达人系统通知列表

    public $button = 'cms/peapod';  //达人特权页定制按钮
    public $certification = 'atomic/expert/certificationCheckAction';  //达人特权是否实名认证
}
