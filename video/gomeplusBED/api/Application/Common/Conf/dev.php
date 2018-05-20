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
	    'JS' => 'js.dev.meixincdn.com:1314/CDN8053/',
	    'CSS' => 'js.dev.meixincdn.com:1314/CDN8053/',
	    'IMG' => 'js.dev.meixincdn.com:1314/CDN8053/',
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

	'GROUP_URL'=>'group.atguat.com.cn/',
	'UCENTER_URL'=>'myhome.atguat.com.cn/',
    'API_URL' => 'api-pluspc.atguat.com.cn/',
     // 错误定向页面,只有APP_DEBUG=false时生效
    'ERROR_PAGE'     =>  APP_HTTP.'api-pluspc.uatplus.com/empty',

	'COOKIE_DOMAIN' => '.atguat.com.cn',		//cookie的有效域名
	'COOKIE_PATH' => '/' ,					//保存路径

	'COOKIE_PREFIX' => 'mx_pc_', //cookie的前缀
	'COOKIE_EXPIRE' => 86400, //cookie的生存时间，一天

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_gomeplusid',   //设置session名
		'expire'              =>  86400,            //SESSION保存15天
		'use_trans_sid'       =>  1,                     //跨页传递
		'use_only_cookies'    =>  0,                     //是否只开启基于cookies的session的会话方式
		'domain'       => '.atguat.com.cn',
	),

	'WAP_URL' => 'm-pre.gomeplus.com/',
    //cms接口域名
    'CMS_URL'=>'http://api.cms.pre.gomeplus.com/',
    
    //im接口域名
    'IM_URL'=>'http://10.125.2.154:80/',
    //im接口appid
    'IM_APPID'=>'gomeplus_pre',
    //im接口appKey
    'IM_APPKEY'=>'b6c9f4498fa6485bb777fdb04f3a2193',
    //im表情域名
    'IM_ICON_URL'=>'https://js-pre.meixincdn.com/m/pc-im',
    //im的sdk访问地址
    'IM_SDK_URL'=>'https://api-im-pre.gomeplus.com/im-platform/',
    //
    'IM_STATICPATH'=>array(
					'JS' => 'https://js-pre.meixincdn.com/m/pc-im/dist/',
					'CSS' => 'https://css-pre.meixincdn.com/m/pc-im/dist/',
					),
    //动态表情地址
    'IM_EXP_URL'=>'https://api-bs-pre.gomeplus.com/api/resource/img/expressionimg/',
    //视频地址
    'VIDEO_URL' => 'https://player-pre.gomeplus.com/',
	//站点地图内网域名
	'GNS_RUL' => 'https://gns-intra.gomeplus.com/',
	//广告脚本地址
	'ADVERT_URL' => [
		'FLIGHT' => 'https://adflight-pre.gomeplus.com/',
		'MAIN' => 'https://js-pre.gomeplus.com/',
	],
	//广告位ID
	'ADVERT_IDS'=>[
		//焦点图
		'foucs'=>[
			'first'=>'1',
			'second'=>'2',
		],
		//逛逛滚动
		'guangguang'=>[
			'first'=>'3',
			'second'=>'4',
		],
	],
    'GOME'=>[
	    'URL'=>[
		    'MALL_ITEM_URL'=>'item.atguat.com.cn/',//商品详情
		    'MALL_SHOP_URL'=>'mall.atguat.com.cn/',//店铺
	    ],
		'STATICS'=>[
        ],
        /*API接口配置*/
        'SERVICE' => array(
        )
    ],
    
);


