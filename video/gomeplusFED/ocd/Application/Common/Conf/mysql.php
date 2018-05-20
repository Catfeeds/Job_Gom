<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：mysql.php                                               |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:handong <handong@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-3-7 17:39:45 CST                                         |
 * +----------------------------------------------------------------------+
 */
$environmentConfig = array(
    'dev' => array(//开发
        /* 数据库设置 */
        'DB_TYPE'               =>  'mysql',     // 数据库类型
        'DB_HOST'               =>  '10.125.31.220', // 服务器地址
        'DB_NAME'               =>  'h5_ic',          // 数据库名
        'DB_USER'               =>  'develop',      // 用户名
        'DB_PWD'                =>  'ZQ2yGUJfE2',          // 密码
        'DB_PORT'               =>  '3306',        // 端口
        'DB_PREFIX'             =>  '',    // 数据库表前缀
    ),
    'test' => array(//测试
        'DB_TYPE'               =>  'mysql',     // 数据库类型
        'DB_HOST'               =>  'atlas01.test.gomeplus.com', // 服务器地址
        'DB_NAME'               =>  'h5_ic',          // 数据库名
        'DB_USER'               =>  'tester',      // 用户名
        'DB_PWD'                =>  'Test_usEr',          // 密码
        'DB_PORT'               =>  '8806',        // 端口
        'DB_PREFIX'             =>  '',    // 数据库表前缀
    ),
    'pre' => array(//预生产
        'DB_TYPE'               =>  'mysql',     // 数据库类型
        'DB_HOST'               =>  '10.125.2.9', // 服务器地址
        'DB_NAME'               =>  'h5_ic',          // 数据库名
        'DB_USER'               =>  'h5_icuser',      // 用户名
        'DB_PWD'                =>  'tE5sddfO',          // 密码
        'DB_PORT'               =>  '3306',        // 端口
        'DB_PREFIX'             =>  '',    // 数据库表前缀
    ),
    'pro' => array(//生产
        'DB_TYPE'               =>  'mysql',     // 数据库类型
        'DB_HOST'               =>  'atlas01.ic.pro.gomeplus.com', // 服务器地址
        'DB_NAME'               =>  'h5_ic',          // 数据库名
        'DB_USER'               =>  'h5_icuser',      // 用户名
        'DB_PWD'                =>  't1E5sddf2O',          // 密码
        'DB_PORT'               =>  '3306',        // 端口
        'DB_PREFIX'             =>  '',    // 数据库表前缀
    ),
);
if(isset($environmentConfig[$_SERVER['ENVIRONMENT']])){
    return $environmentConfig[$_SERVER['ENVIRONMENT']];
}