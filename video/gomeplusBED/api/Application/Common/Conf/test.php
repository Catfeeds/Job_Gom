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
		'DOMAIN' => 'http://api.bs.pre.gomeplus.com/api/',
		'DOMAIN_V2' => 'http://api.bs.pre.gomeplus.com/v3/',//BS v2接口
		'FileUpload' => 'http://api.bs.pre.gomeplus.com/api/',
	),
	/*前端页面配置*/
	'STATICPATH' => array(
	    'JS' => 'js.dev.meixincdn.com:1314/CDN8017/',
	    'CSS' => 'js.dev.meixincdn.com:1314/CDN8017/',
	    'IMG' => 'js.dev.meixincdn.com:1314/CDN8017/',
	    'JS_DOMAIN' => 'js.dev.meixincdn.com',
	),
	/*memcache配置*/
	'MEMCACHE_SETTING'=>array(
		'bj01-ic-mem01.pre.gomeplus.com:11215:1',
	),
	//显示trace调试
	'SHOW_PAGE_TRACE'=> true,

	/* 数据缓存设置 */
	'DATA_CACHE_TIME' => 3600,      // 数据缓存有效期 0表示永久缓存，单位（秒）
	'DATA_CACHE_COMPRESS' => false,   // 数据缓存是否压缩缓存
	'DATA_CACHE_CHECK' => false,   // 数据缓存是否校验缓存
	'DATA_CACHE_PREFIX' => 'pc_test_',     // 缓存前缀
	'PREDIS_EXCEPTIONS' => 0,
	'PREDIS_CLUSTER_MODE' => true, // cluster

	/*phpredis设置*/
	'PREDIS_TCP' => [
		'bj01-ops-g1rdsc01.pre.gomeplus.com:7006',
		'bj01-ops-g1rdsc02.pre.gomeplus.com:7006',
		'bj01-ops-g1rdsc03.pre.gomeplus.com:7006',
		'bj01-ops-g1rdsc05.pre.gomeplus.com:7006',
		'bj01-ops-g1rdsc05.pre.gomeplus.com:7006',
		'bj01-ops-g1rdsc06.pre.gomeplus.com:7006',
	],

    'GROUP_URL'=>'group.uatplus.com/',
    'UCENTER_URL'=>'myhome.uatplus.com/',
    'API_URL' => 'api.uatplus.com/',
	//显示trace调试
	'SHOW_PAGE_TRACE'=> true,
	// 错误定向页面,只有APP_DEBUG=false时生效
	'ERROR_PAGE'     =>  APP_HTTP.'api.uatplus.com/empty',

	'COOKIE_DOMAIN' => '.uatplus.com', //cookie的有效域名
	'COOKIE_PATH' => '/' , //保存路径

	'COOKIE_PREFIX' => 'mx_pc_', //cookie的前缀
	'COOKIE_EXPIRE' => 86400, //cookie的生存时间，一天

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_gomeplusid',   //设置session名
		'expire'              =>  86400,            //SESSION保存15天
		'use_trans_sid'       =>  1,                     //跨页传递
		'use_only_cookies'    =>  0,                     //是否只开启基于cookies的session的会话方式
		'domain'       => '.dev.gomeplus.com',
	),
	'WAP_URL' => 'm.test.gomeplus.com/',
	//cms接口域名
	'CMS_URL'=>'http://api.cms.dev.gomeplus.com/',
	//视频地址
	'VIDEO_URL' => 'http://10.69.205.12/',
    'GOME'=>[
        'URL'=>[
            'MALL_ITEM_URL'=>'item.uatplus.com/',//商品详情
            'MALL_SHOP_URL'=>'mall.uatplus.com/',//店铺
        ],
        'STATICS'=>[
        ],
        /*API接口配置*/
        'SERVICE' => array(
        )
    ],
    
);


