<?php

namespace Ajax\Service;

use Home\Service\BaseService;

/**
 * Class UserService
 *
 * @author  liuzhen
 * @date    2016-07-27
 * @package Ajax\Service
 */
class UserV2Service extends BaseService
{
	public $bs_version = 2;
	public $getCoupons = 'promotion/myCoupons';	//领取优惠券
}