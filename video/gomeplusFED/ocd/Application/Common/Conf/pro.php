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
	/*第三方登录配置*/
	// QQ登录
	'QQ_OAUTH_CONSUMER_KEY' => '',
	'QQ_OPENID' => '',
	'QQ_REDIRECT_URI' => APP_HTTP.'passport.gomeplus.com/login/qqcallback',
	'QQ_CLIENT_ID' => '101316255',
	'QQ_CLIENT_KEY' => 'd44fd54cedf4f621d16a602fd17b549d',
	// 微信登录
	'WX_APP_ID' => 'wx36f4bd2b43d55d86',
	'WX_REDIRECT_URL' => APP_HTTP.'passport.gomeplus.com/login/wechatcallback',
	'WX_APP_SECRET' => '8d64930cba63db96fd92a7e735642a12',

	// 微博登录
	'WB_AKEY' => '3007402733',
	'WB_SKEY' => '136376d88168c764f2c062fcb3e812f6',
	'WB_CALLBACK_URL' => APP_HTTP.'passport.gomeplus.com/login/wbcallback',
	
	/*BS服务配置*/
	'SERVICE' => array(
		'DOMAIN' => 'http://api.bs.pro.gomeplus.com/api/',
		'DOMAIN_V2' => 'http://api.bs.pro.gomeplus.com/v2/',//BS v2接口
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
	//域名调用
	'PASSPORT_URL'=>'passport.gomeplus.com/',
	'ORDER_URL'=>'order.gomeplus.com/',
	'GROUP_URL'=>'group.gomeplus.com/',
	'UCENTER_URL'=>'i.gomeplus.com/',
	'MALL_URL' => 'mall.gomeplus.com/',
	'MAIN_URL' => 'www.gomeplus.com/',
	// 错误定向页面,只有APP_DEBUG=false时生效
	'ERROR_PAGE'     =>  APP_HTTP.'www.gomeplus.com/empty',

	'COOKIE_DOMAIN' => '.gomeplus.com',		//cookie的有效域名
	'COOKIE_PATH' => '/' ,					//保存路径

	'COOKIE_PREFIX' => 'mx_pc_',			//cookie的前缀
	'COOKIE_EXPIRE' => 86400,				//cookie的生存时间，一天
//	'COOKIE_HTTPONLY' => true, // 设置只读
	'COOKIE_SECURE' => true, // 安全传输

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_gomeplusid',   //设置session名
		'expire'              =>  0,
		'maxlifetime'         => 86400,					 //SESSION保存15天
		'use_trans_sid'       =>  1,                     //跨页传递
		'use_only_cookies'    =>  0,                     //是否只开启基于cookies的session的会话方式
		'domain'       => '.gomeplus.com',
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
	
	'WAP_URL' => 'm.gomeplus.com/',
    //cms接口域名
    'CMS_URL'=>'https://cms.gomeplus.com/',
    //视频地址
    'VIDEO_URL' => 'https://js.meixincdn.com/',
	//站点地图内网域名
	'GNS_RUL' => 'https://gns-intra.gomeplus.com/',
	//广告脚本地址
	'ADVERT_URL' => [
		'FLIGHT' => 'https://adflight.gomeplus.com/',
		'MAIN' => 'https://js.meixincdn.com/',
	],
	//广告位ID,线上需要修改配置
	'ADVERT_IDS'=>[
		//焦点图
		'foucs'=>[
			'first'=>'10003',
			'second'=>'10004',
		],
		//逛逛滚动
		'guangguang'=>[
			'first'=>'',
			'second'=>'',
		],
	],
);

