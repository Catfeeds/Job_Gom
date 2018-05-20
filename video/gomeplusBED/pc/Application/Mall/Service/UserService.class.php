<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：用户相关接口                                    |
* +----------------------------------------------------------------------+
* | Author:songwenchao <songwenchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2017/01/05-13:13                                                |
* +----------------------------------------------------------------------+
*/
 
namespace Mall\Service;
use Home\Service\BaseService;

class UserService extends BaseService
{
    public $user_list = 'user/users';//会员信息(无登录查询) 批量查询
    protected $bs_version = 2;
}