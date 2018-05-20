<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                          |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AddressController.class.php                                |
 * +----------------------------------------------------------------------+
 * | @程序功能： 收货地址管理                                                                                              |
 * +----------------------------------------------------------------------+
 * | Author:李帅 <lishuai@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-10-24 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Controller;
use Home\Controller\AuthController;
class AddressController extends AuthController
{
    protected $maxNum = 20 ;//最大地址数
	public function __construct()
	{
		parent::__construct();
		$this->address = D('Ucenter/AddressV2');
		$this->assign('activeUrl',APP_HTTP.C('UCENTER_URL').'address/index') ; //左侧选中的地址
	}

	/**
	 * 我的收货地址页面
	 *
	 */
	public function index()
	{
		$list = array();
/* 		// 判断来源,来自收货地址 source:0,来自下订单页面 source:1
		$source = I('param.source', 0, 'intval'); */
		$addressData = $this->address->getData($this->address->addressList, array(), false);
		$list = array();
		if($addressData['success'] == true)
		{
			$temp = $addressData['data']['consigneeInfos'];
			foreach ($temp as $k=>$v){
			    $list[$k]['id'] = $v['id'];
			    $list[$k]['userId'] = $v['userId'];
			    $list[$k]['userName'] = $v['name'];
			    $list[$k]['provinceId'] = $v['provinceId'];
			    $list[$k]['cityId'] = $v['cityId'];
			    $list[$k]['boroughId'] = $v['boroughId'];
			    $list[$k]['areaId'] = $v['areaId'];
			    $list[$k]['address'] = $v['detail'];
			    $list[$k]['mobile'] = $v['mobile'];
			    $list[$k]['phone'] = $v['mobile'];
			    $list[$k]['isDefault'] = (int)$v['isDefault'];
			    $list[$k]['provinceName'] = $v['province']['name'];
			    $list[$k]['cityName'] = $v['city']['name'];
			    $list[$k]['boroughName'] = $v['borough']['name'];
			    $list[$k]['areaName'] = $v['area']['name'];
			    $list[$k]['idCard'] = $v['idCard'];
			}
		}
		$this->assign('list', $list);
		$this->assign('maxNum',$this->maxNum);
		$this->assign('num',count($list));
		$this->assign('title', '收货人信息');
		$this->display('Address/index');
	}

	

	/**
	 * 获取四级联动信息(内部调用)
	 *
	 */
	private function getProvinceCityById($parentId = 0)
	{
	    $list = array();
	    $param['parentId'] = $parentId;
	    $addressData = $this->address->getData($this->address->address_region_division, $param, false);
	    if($addressData['success'] == true)
	    {
	        $list = $addressData['data'];
	    }
	    return $list;
	}
    


}
