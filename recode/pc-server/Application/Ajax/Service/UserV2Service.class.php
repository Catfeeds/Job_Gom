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
	public $getCoupons = 'promotion/userCoupon';	//领取优惠券
	public $accountUpgrade = 'user/accountUpgradeAction'; //升级一账通

	//生成分享链条唯一KID
	public $rebateKid = 'rebate/shareChain/kid';
}