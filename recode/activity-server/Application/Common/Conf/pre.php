<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：login.php                                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          | * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-06 18:28:40 CST                                         |
 * +----------------------------------------------------------------------+
 */


return array(
	/*BS服务配置*/
	'SERVICE' => array(
		'DOMAIN' => 'http://api.bs.pre.gomeplus.com/api/',
		'DOMAIN_V2' => 'http://api.bs.pre.gomeplus.com/v3/',//BS v2接口
		'FileUpload' => 'http://api.bs.pre.gomeplus.com/api/',
	),
	/*前端页面配置*/
	'STATICPATH' => array(
		'JS' => 'js.dev.meixincdn.com:1314/CDN8176/',
		'CSS' => 'js.dev.meixincdn.com:1314/CDN8176/',
		'IMG' => 'js.dev.meixincdn.com:1314/CDN8176/',
		'JS_DOMAIN' => 'js.dev.meixincdn.com',

	),
	/*memcache配置*/
	'MEMCACHE_SETTING'=>array(
		'bj01-ic-mem01.pre.gomeplus.com:11215:1',
	),

	/* 数据缓存设置 */
	'DATA_CACHE_TIME' => 3600,			// 数据缓存有效期 0表示永久缓存，单位（秒）
	'DATA_CACHE_COMPRESS' => false,		// 数据缓存是否压缩缓存
	'DATA_CACHE_CHECK' => false,		// 数据缓存是否校验缓存
	'DATA_CACHE_PREFIX' => 'mx_pc_',	// 缓存前缀
	'PREDIS_EXCEPTIONS' => 0,
	'PREDIS_CLUSTER_MODE' => true,		// cluster

	/*phpredis设置*/
	'PREDIS_TCP' => [
        'pc-redis-one.pre.mx.db:7006',
        'pc-redis-two.pre.mx.db:7006',
        'pc-redis-three.pre.mx.db:7006',
        'pc-redis-four.pre.mx.db:7006',
        'pc-redis-five.pre.mx.db:7006',
        'pc-redis-six.pre.mx.db:7006'
	],

	'COOKIE_DOMAIN' => '.m.atguat.com.cn',		//cookie的有效域名1
	'COOKIE_PATH' => '/' ,					//保存路径
	'COOKIE_EXPIRE' => 86400,				//cookie的生存时间，一天
	'COOKIE_PREFIX' => 'mx_pc_pre_',		//cookie的前缀

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_pre_gomeplusid',   //设置session名
		'expire'              =>  0,
		'maxlifetime'         => 86400,					 	//SESSION保存1天
		'use_trans_sid'       =>  1,                     	//跨页传递
		'use_only_cookies'    =>  0,                     	//是否只开启基于cookies的session的会话方式
		'domain'       => '.atguat.com.cn',
	),

	'WAP_URL' => 'm.atguat.com.cn/',

	//用于调用m站登录状态接口
	'APP_ID'=>'pc171212',
	'APPSECRET'=>'PC171212!@#G7MtQ=',

	//活动域名
	'ACTIVITY_URL'=>'activity.m.atguat.com.cn/',

	//M站登录接口地址
	'WAP_API' => [
		'LOGIN_URL' => 'http://m.atguat.com.cn/gome_access_token.html',  //登录接口
	],
	//CMS接口地址
	'CMS_API' => [
		'COUPON_LIST_URL' => 'http://prom.mobile.atguat.com.cn',  //优惠券列表
		'COUPON_INFO_URL' => 'http://coupon.mobile.atguat.com.cn',  //优惠券领取
	],

	//CMS优惠券key
	'CMS_COUPON_KEY' => [
		'WARM_HEART' => 'salevfizALgBrGp',  //送温暖活动key
	],

	//MySql配置
	'mysql' => [
		'db' => [
			'DB_TYPE' => 'mysql',
			'DB_HOST' => '10.112.170.55',
			'DB_NAME' => 'activity',
			'DB_USER' => 'pc_dev',
			'DB_PWD' => '123456',
			'DB_PORT' => '3306',
			'DB_PREFIX' => '',
			'DB_CHARSET' => 'utf8',
			'DB_DEBUG' => false
		],
		'rdb' => [
			'DB_TYPE' => 'mysql',
			'DB_HOST' => '10.112.170.55',
			'DB_NAME' => 'activity',
			'DB_USER' => 'pc_dev',
			'DB_PWD' => '123456',
			'DB_PORT' => '3306',
			'DB_PREFIX' => '',
			'DB_CHARSET' => 'utf8',
			'DB_DEBUG' => false
		]
	],

	//csrf token加密key
	'CSRF_TOKEN_KEY' => '12345678a',

	//客态页userId加密key
	'ACTIVITY_TA_KEY' => '12345678a',

	//双十二活动埋点js域名
	'DOUBLE_BURY_DOMAIN' => '//js.uatplus.com/',
);


