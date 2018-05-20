<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - IM 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ImService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：IM服务
 * +----------------------------------------------------------------------+
 * | Author:李帅
 * +----------------------------------------------------------------------+
 * | Date:2016/11/2
 * +----------------------------------------------------------------------+
 */

namespace Ucenter\Service;
use Home\Service\BaseService;
class ImService extends BaseService
{
    public $key = 'ImService';
    public $param = array();
	public $tokenurl = 'center-im-api/user/getTokenByDeviceType.json';
}
