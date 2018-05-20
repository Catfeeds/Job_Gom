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
}
