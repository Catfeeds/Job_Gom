<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：PraiseService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:zhanghuan <zhanghuan@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-24 13:58:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 
namespace Group\Service;
use Home\Service\BaseService;

class PraiseService extends BaseService
{
	public $key = 'PraiseService';
	public $param = array();
	public $praised= 'praise/like';	//点赞
    public $praised_list = 'ext/praise/like';//获取点赞列表
    public $bs_version = 2;
}
