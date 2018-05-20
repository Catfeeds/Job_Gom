<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：获取赞列表                                    |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/27-13:13                                                |
* +----------------------------------------------------------------------+
*/
 
namespace Mall\Service;
use Home\Service\BaseService;

class PraiseService extends BaseService
{
	public $key = 'PraiseService';
	public $param = array();
	public $praised= 'praise/like';	//点赞（已迁移至AJAX、GROUP模块下）
    public $praised_list = 'ext/praise/like';//获取点赞列表
    protected $bs_version = 2;
}
