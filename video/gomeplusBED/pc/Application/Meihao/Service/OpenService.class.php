<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class OpenService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:lishuai@gomeplus.com
 * +----------------------------------------------------------------------+
 * | Date:2017/9/12 18:07
 * +----------------------------------------------------------------------+
 */

namespace Meihao\Service;
use Home\Service\BaseService;

class OpenService extends BaseService
{


    public $key = 'OpenService';
    public $param = array();
    public $bs_version = 2;

    public $nameCheck = 'officialAccounts/nameCheckAction';//美号名称检测
    public $groupAndMeiTopicCount = 'social/groupAndMeiTopicCount'; //重新绑定圈子
    public $tagList = 'officialAccounts/category';//标签列表
    public $officialAccounts = 'officialAccounts/officialAccounts';//美号信息
    public $officialCategory = 'officialAccounts/category';//美号标签
    public $companyInfo = 'officialAccounts/enterpriseInformation';//企业信息
    public $totalInfo = 'social/groupAndMeiTopicCount'; //首页统计信息
    public $messageList = 'officialAccounts/notifications';//公告列表
    public $articleList = 'ext/social/mAccountTopics';//文章列表
    public $officialAccountsSettings = 'officialAccounts/setting';//美号基本和修改信息
    public $groupRebind = 'officialAccounts/groupRebind';//重新绑定圈子
    
}
