<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

/**
 * Class CouponsController
 *
 * @author  liuzhen
 * @date    2016-08-11
 * @package Ajax\Controller
 */
class CouponsController extends BaseController
{
	const COUPON_PAGE_SIZE = 100;

	/**
	 * 店铺优惠券
	 * @param $pageSize		Integer	非必填	每页条数
	 * @param $pageNum		Integer	非必填	第几页
	 * @param $shopId		Long	必填	店铺ID
	 */
	public function shopCoupons()
	{
		// 券类型：1为店铺券，2为平台券
		$batchType	= 1;
		$pageSize 	= I('param.pageSize', self::COUPON_PAGE_SIZE, 'intval');
		$pageNum 	= I('param.pageNum', 1, 'intval');
		$shopId 	= I('param.shopId', 0, 'intval');
		
		if(!$shopId)
		{
			$code = \Think\ErrorCode::PARMA_ERROR;
			$this->outError($code);
			exit;
		}
        
        if($pageSize > self::COUPON_PAGE_SIZE)
        {
            $pageSize = self::COUPON_PAGE_SIZE;
        }
		
		$param = array();
		$param['batchType'] = $batchType;
		$param['pageSize'] = $pageSize;
		$param['pageNum'] = $pageNum;
		$param['shopId'] = $shopId;
        
        $shopCouponsV2 = D("Mall/ShopV2");
        
		$res = $shopCouponsV2->getData($shopCouponsV2->shopCouponsUser, $param);
		$this->ajaxReturn($res);
		exit;
	}
}