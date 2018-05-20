<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class AddressV2Service.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：店铺相关服务
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2016/08/25
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Service;
use Home\Service\BaseService;
class AddressV2Service extends BaseService
{
    public $key = 'AddressV2Service';
    public $bs_version = 2;
    public $param = array();
    public $defaultConsInfo = 'ext/user/defaultConsigneeInfo';	//默认收货地址 ext
	public $childAddrNodes = 'user/childAddressNodes';	//地址区域信息的下级区域信息列表（四级联动）
    public $addressList = 'ext/user/myConsigneeInfos';	//收货地址列表详细信息的资源
    public $addressPub = 'user/consigneeInfo';	//删除添加修改收货地址信息
    public $addressSetDefault = 'user/defaultConsigneeInfo';	//设置默认收货地址
    public $addressDetail = 'user/consigneeInfo';  //收货地址详情
}
