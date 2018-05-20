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
define('SITEMAP_PATH','/gomeo2o/www/pc_help/others/sitemap/');
define('FILE_EXT','.xml');
$action = isset($_GET['action']) ? htmlspecialchars(trim($_GET['action'])) : '';
$moudle = isset($_GET['moudle']) ? htmlspecialchars(trim($_GET['moudle'])) : '';
if(!$action || !$moudle){
	header("HTTP/1.1 404 not found");
}

header('Content-type:text/xml;charset=utf-8');
require_once (SITEMAP_PATH.$moudle.'/'.$action.FILE_EXT);
