<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：login.php                                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-06 18:28:40 CST                                         |
 * +----------------------------------------------------------------------+
 */


return array(
	/*BS服务配置*/
	'SERVICE' => array(
		'DOMAIN' => 'http://api.bs.pro.gomeplus.com/api/',
		'DOMAIN_V2' => 'http://api.bs.pro.gomeplus.com/v3/',//BS v3接口
		'FileUpload' => 'http://api.bs.pro.gomeplus.com/api/',
	),
    /*前端页面配置*/
    'STATICPATH' => array(
        'JS' => 'js.meixincdn.com/m/pc/',
        'CSS' => 'css.meixincdn.com/m/pc/',
        'IMG' => 'js.meixincdn.com/m/pc/',
        'JS_DOMAIN' => 'js.meixincdn.com',
    ),
	/*memcache配置*/
	'MEMCACHE_SETTING'=>array(
		'bj02-h5-mem01.pro.gomeplus.com:20000:1',
		'bj02-h5-mem02.pro.gomeplus.com:20000:1',
		'bj02-h5-mem03.pro.gomeplus.com:20000:1',
		'bj02-h5-mem04.pro.gomeplus.com:20000:1',
	),

	'COOKIE_DOMAIN' => '.m.gome.com.cn',		//cookie的有效域名
	'COOKIE_PATH' => '/' ,					//保存路径
	'COOKIE_PREFIX' => 'mx_pc_',			//cookie的前缀
	'COOKIE_EXPIRE' => 86400,				//cookie的生存时间，一天
//	'COOKIE_HTTPONLY' => true, // 设置只读
	'COOKIE_SECURE' => true, // 安全传输

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_gomeid',   //设置session名
		'expire'              =>  86400,				//COOKIE保存1天
		'maxlifetime'         => 86400,					 //SESSION保存1天
		'use_trans_sid'       =>  1,                     //跨页传递
		'use_only_cookies'    =>  0,                     //是否只开启基于cookies的session的会话方式
		'domain'       => '.m.gome.com.cn',
	),

	/* 数据缓存设置 */
	'DATA_CACHE_TIME' => 3600,      	 // 数据缓存有效期 0表示永久缓存，单位（秒）
	'DATA_CACHE_COMPRESS' => false,   	 // 数据缓存是否压缩缓存
	'DATA_CACHE_CHECK' => false,   		 // 数据缓存是否校验缓存
	'DATA_CACHE_PREFIX' => 'mx_pc_',     // 缓存前缀
	'PREDIS_EXCEPTIONS' => 0,
	'PREDIS_CLUSTER_MODE' => true, 		 // cluster

	/*phpredis设置*/
	'PREDIS_TCP' => [
		'bj02-ops-rdsc01.pro.gomeplus.com:7000',
		'bj02-ops-rdsc02.pro.gomeplus.com:7000',
		'bj02-ops-rdsc03.pro.gomeplus.com:7000',
		'bj02-ops-rdsc04.pro.gomeplus.com:7000',
		'bj02-ops-rdsc05.pro.gomeplus.com:7000',
		'bj02-ops-rdsc06.pro.gomeplus.com:7000',
	],

	//csrf token加密key
	'CSRF_TOKEN_KEY' => '94bugaosuni',

	//客态页userId加密key
	'ACTIVITY_TA_KEY' => '!@#$%^&*',

	//双十二活动埋点js域名
	'DOUBLE_BURY_DOMAIN' => '//js.gomein.net.cn/',
);

