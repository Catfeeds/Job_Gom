<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用入口文件

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');
//本框架会根据全局变量的值自动加载CONF_PATH下的配置文件
if(!in_array($_SERVER['ENVIRONMENT'],array('dev','test','pre','sim','pro'))) die('global variable $_SERVER[\'ENVIRONMENT\'] is not Found');

$debugMap = array(
    'dev' => true,
    'test' => true,
    'pre' => false,
    'sim' => false,
    'pro' => false,
);

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
$APP_DEBUG = TRUE;
if($_SERVER['ENVIRONMENT'] == 'pro' || $_SERVER['ENVIRONMENT'] == 'sim' ){
    $APP_DEBUG = FALSE;
}
define('APP_DEBUG',$APP_DEBUG);

// 定义应用目录
define('APP_PATH','./Application/');

//应用状态,从全局变量里读取开发状态
define('APP_STATUS',$_SERVER['ENVIRONMENT']);

//定义http协议
define('APP_HTTP', @$_SERVER['HTTP_X_FORWARDED_PROTO'] == "https" ? 'https://' : 'http://');
// 引入anti_xss
require './vendor/autoload.php';
// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单