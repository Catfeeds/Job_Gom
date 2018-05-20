<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：HomeService.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-25 17:20:53 CST										  |
 * +----------------------------------------------------------------------+
 */
 

namespace Home\Service;
use Home\Service\BaseService;
class HomeService extends BaseService
{
	public $bs_version = 2;
	public $key = 'HomeService';
	public $param = array();
	public $homepage = 'combo/pcHomepage'; //首页接口
	public $homepage1 = 'combo/pcHomepage/model1'; //首页接口1
	public $homepage2 = 'combo/pcHomepage/model2'; //首页接口2
	public $homepage3 = 'combo/pcHomepage/model3'; //首页接口3
	public $homepage4 = 'combo/pcHomepage/model4'; //首页接口4
	public $homefeed = 'combo/feed';//首页不断寻觅
	public $floatLayer = 'v1/slot/buttom.json';//首页底部浮层

}
