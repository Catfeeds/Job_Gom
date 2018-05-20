<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：PromotionListController.class.php                         |
 * +----------------------------------------------------------------------+
 * | @程序功能： 我的优惠卷管理                                           |
 * +----------------------------------------------------------------------+
 * | Author:zhangting <zhangting@loyo24.com>                              |
 * +----------------------------------------------------------------------+
 * | Date:2016-07-07 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Ucenter\Controller;
use Home\Controller\AuthController;
use Common\Lib\Page;


class CouponController extends  AuthController
{
	public function __construct()
	{
		parent::__construct();
		$this->promotion= D("Ucenter/Promotion");//v2
		$this->assign('activeUrl','/coupon/index') ; //左侧选中的地址
	}
	/**
	 * 社交-我的优惠卷列表
	 * 
	 */
	public function  index(){
		$intStatus   = I('param.status',1,'intval');
		$intPageSize = I('param.pageSize',12,'intval');//美页多少条数据
		$intPageNum  = I('param.page',1,'intval');//页数
		$description="";//描述
		$keywords="";//关键字
		$arrSenData=array();
		$url_params="";
		$arrParams = array(
				'status'   => $intStatus,
				'pageSize' => $intPageSize,
				'pageNum'  => $intPageNum,
				);
		$url_params="status={$intStatus}";
		$arrDisCountInfo = $this->promotion->getData($this->promotion->couponInfo,$arrParams);
		if($arrDisCountInfo['success'])
		{
			$intTotal = $arrDisCountInfo['data']['totalQuantity'];
			foreach ($arrDisCountInfo['data']['userCoupons'] as $Item)
			{
				$arr = array();		
				$arr['money'] = $Item['batch']['money']/100;//金额
				$arr['minAmount'] = convert_price($Item['batch']['usageRule']['minAmount']);//满足使用金额
				$arr['shop_name'] = isset($Item['batch']['shop']['name']) ? $Item['batch']['shop']['name'] : "" ;
				$arr['shop_icon'] = isset($Item['batch']['shop']['icon']) ? $Item['batch']['shop']['icon'] : "" ;
				$arr['shop_id']   = isset($Item['batch']['shop']['id'])   ? $Item['batch']['shop']['id']   : "" ;
				$arr['start_time']= Date("Y.m.d",$Item['validStartTime']/1000);
				$arr['end_time']  = Date("Y.m.d",$Item['validEndTime']/1000);
				$intTime = time();
				$intEndTime = ($Item['validEndTime']/1000) - 3*24*3600;
				$intRealEndTime = $Item['validEndTime']/1000;
				if($intEndTime <= $intTime){
					$arr['show']  = 1;
				}
				else{
					$arr['show']  = 2;
				}
				$arr['batchType'] = $Item['batch']['batchType'];
				array_push($arrSenData,$arr);
			}

			//分页处理
			$page = new Page();
			$params_url ='/coupon/index?';
			$link_url   =  $page->show($intTotal,$intPageSize,$intPageNum,$params_url,$url_params);
		}
		$this->assign('link_url',$link_url);
		$this->assign('data',$arrSenData);
		$this->assign('status',$intStatus);
		$this->assign('title', '我的优惠券');
		$this->assign('description',$description);
		$this->assign('keywords',$keywords);
		$this->display('Coupons/coupons');
	}
}
