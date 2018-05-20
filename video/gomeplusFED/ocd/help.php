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

//站点地图+帮助入口
define('HELP_PATH','../pc_help/others/');
define('FILE_EXT','.html');
$action = isset($_GET['action']) ? htmlspecialchars(trim($_GET['action'])) : '';
$dir = isset($_GET['dir']) ? htmlspecialchars(trim($_GET['dir'])) : '';
if(!$action){
	header("HTTP/1.1 404 not found");
}
// 定义应用目录
define('APP_PATH','./Application/');
//定义http协议
define('APP_HTTP', @$_SERVER['HTTP_X_FORWARDED_PROTO'] == "https" ? 'https://' : 'http://');

extract(include (APP_PATH.'Common/Conf/'.$_SERVER['ENVIRONMENT'].'.php'));
extract(include (APP_PATH.'Common/Conf/config.php'));

$main_domain = APP_HTTP.$MAIN_URL;
$passport_domain = APP_HTTP.$PASSPORT_URL;
$order_domain = APP_HTTP.$ORDER_URL;
$group_domain = APP_HTTP.$GROUP_URL;
$mall_domain = APP_HTTP.$MALL_URL;
$i_domain = APP_HTTP.$UCENTER_URL;
$wap_domain = APP_HTTP.$WAP_URL;
$dir = ($dir) ? $dir.'/' : '';
$css_version =  "?version=".$CSS_VERSION;
include (APP_PATH.'Common/Common/function.php');

//手机端跳转
if( is_mobile() ) {
    if( $_SERVER['REQUEST_URI'] == '/others/download.html' ) {
        header( 'location:'.$wap_domain.'state/appdownload' );
    }
}



header('Cache-control: no-cache,no-store');  // 页面缓存控制
require_once (HELP_PATH.$dir.$action.FILE_EXT);
