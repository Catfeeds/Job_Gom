<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]

ini_set('mongo.long_as_object', 1);
// 定义应用目录
define('APP_PATH', __DIR__ . '/application/');
define('FILE_PATH','/gomeo2o/data/sitemap/');
define('FILE_LOG','/gomeo2o/logs/applog/');
// 应用模式状态（dev：开发、pre：预生产、pro：生产）
define('APP_STATUS','pro');
// 加载框架引导文件
require __DIR__ . '/thinkphp/start.php';
