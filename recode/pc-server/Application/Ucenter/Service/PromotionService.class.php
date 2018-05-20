<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class OrderService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:zhangting-ds1 <zhangting-ds1@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/7/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Service;
use Home\Service\BaseService;

class PromotionService extends BaseService
{
    public $key = 'PromotionService';
    public $param = array();
    public $bs_version = 2;
    //个人中心我的优惠卷
	//public $couponInfo  = 'ext/promotion/myCoupons';//优惠卷v2废弃不用
	public $couponInfo  = 'ext/promotion/userCoupons';//优惠卷v2.1 T8
}
