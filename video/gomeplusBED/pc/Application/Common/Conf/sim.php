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

	//极信登录
	'JX_APP_ID' => 'b0b9a913-b46b-4baa-ae85-de0b8a2bbaaf',
	'JX_APP_KEY' => '4591620c-d20c-4a43-9ac2-768017db1cb0',
	'JX_REDIRECT_URL' => APP_HTTP.'passport.gomeplus.com/login/jixincallback',
	'JX_AUTHORIZE_URL' => 'http://login.10037.net/MVNO-UIP-LHDL/oauth2/authorize',

	//国美支付登录
	'GOMEPAY_APP_ID' => 'e3ad07e3d7893b8c286c5ac1568174e9',
	'GOMEPAY_APP_KEY' => '86feba91e9b14fb489b5db3d475a4d51',
	'GOMEPAY_REDIRECT_URL' => APP_HTTP.'passport.gomeplus.com/login/gomepaycallback',
	'GOMEPAY_AUTHORIZE_URL' => 'https://auth.gomepay.com/oauth2/authorize',
	
	/*BS服务配置*/
	'SERVICE' => array(
		'DOMAIN' => 'http://api.bs.pro.gomeplus.com/api/',
		'DOMAIN_V2' => 'http://api.bs.pro.gomeplus.com/v3/',//BS v2接口
		'FileUpload' => 'http://api.bs.pro.gomeplus.com/api/',
	),
	/*前端页面配置*/
	'STATICPATH' => array(
		'JS' => 'js-pre.meixincdn.com/m/pc/',
		'CSS' => 'js-pre.meixincdn.com/m/pc/',
		'IMG' => 'js-pre.meixincdn.com/m/pc/',
		'JS_DOMAIN' => 'js-pre.meixincdn.com',
	),
	/*memcache配置 仿真*/
	'MEMCACHE_SETTING'=>array(
		'g1mem01.pc.pro.gomeplus.com:30000:1',
		'g1mem02.pc.pro.gomeplus.com:30000:1',
		'g1mem03.pc.pro.gomeplus.com:30000:1',
		'g1mem04.pc.pro.gomeplus.com:30000:1',
	),
	//域名调用
	'PASSPORT_URL'=>'passport.gomeplus.com/',
	'ORDER_URL'=>'order.gomeplus.com/',
	'GROUP_URL'=>'group.gome.com.cn/',
	'UCENTER_URL'=>'myhome.gome.com.cn/',
	'MALL_URL' => 'jingpin.gome.com.cn/',
	'MAIN_URL' => 'group.gome.com.cn/',
    'MEIDIAN_URL' => 'meidian.gome.com.cn/',
    'MEIHAO_URL' => 'meihao.gome.com.cn/',
	// 错误定向页面,只有APP_DEBUG=false时生效
	'ERROR_PAGE'     =>  APP_HTTP.'group.gome.com.cn/pchome/empty',
	//显示trace调试
	//'SHOW_PAGE_TRACE'=> true,

	'COOKIE_DOMAIN' => '.gome.com.cn',			//cookie的有效域名
	'COOKIE_PATH' => '/' ,						//保存路径
	'COOKIE_PREFIX' => 'mx_pc_',				//cookie的前缀
	'COOKIE_EXPIRE' => 86400,					//cookie的生存时间，一天
//	'COOKIE_HTTPONLY' => true, // 设置只读
	'COOKIE_SECURE' => true, // 安全传输

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_gomeid',    //设置session名
		'expire'              =>  0,
		'maxlifetime'         => 86400,					 //SESSION保存1天
		'use_trans_sid'       =>  1,                     //跨页传递
		'use_only_cookies'    =>  0,                     //是否只开启基于cookies的session的会话方式
		'domain'       => '.gome.com.cn',
	),

	/* 数据缓存设置 */
	'DATA_CACHE_TIME' => 3600,			// 数据缓存有效期 0表示永久缓存，单位（秒）
	'DATA_CACHE_COMPRESS' => false,		// 数据缓存是否压缩缓存
	'DATA_CACHE_CHECK' => false,   		// 数据缓存是否校验缓存
	'DATA_CACHE_PREFIX' => 'mx_pc_',	// 缓存前缀
	'PREDIS_EXCEPTIONS' => 0,
	'PREDIS_CLUSTER_MODE' => true, 		// cluster

	/*predis设置*/
	'PREDIS_TCP' => [
		'g1rdsc01.h5.pro.gomeplus.com:7003',
		'g1rdsc02.h5.pro.gomeplus.com:7003',
		'g1rdsc03.h5.pro.gomeplus.com:7003',
		'g1rdsc04.h5.pro.gomeplus.com:7003',
		'g1rdsc05.h5.pro.gomeplus.com:7003',
		'g1rdsc06.h5.pro.gomeplus.com:7003'
	],
	
	'WAP_URL' => 'm.gome.com.cn/',

	//WAP站圈子子域名
	'WAP_CIRCLE_URL' => 'circle.m.gomeplus.com/',
    //cms接口域名
    'CMS_URL'=>'http://api-cms.pro.gomeplus.com/',
    //im接口域名
    'IM_URL'=>'http://bj02-im-apiim01.pro.gomeplus.com/',
    //im接口appid
    'IM_APPID'=>'gomeplus_pro',
    //im接口appKey
    'IM_APPKEY'=>'456cf5adff644bfb9d6c77653a48980a',
    //im表情域名
    'IM_ICON_URL'=>'https://js-pre.meixincdn.com/m/pc-im',
     //im的sdk访问地址
    'IM_SDK_URL'=>'https://im-platform.gomeplus.com/im-platform/',
 
     //
    'IM_STATICPATH'=>array(
					'JS' => 'https://js-pre.meixincdn.com/m/pc-im/dist/',
					'CSS' => 'https://js-pre.meixincdn.com/m/pc-im/dist/',
					),
    //动态表情地址
    'IM_EXP_URL'=>'https://api-bs.gomeplus.com/api/resource/img/expressionimg/',
    //视频地址
    'VIDEO_URL' => 'https://js.meixincdn.com/',
	//美众号视频信息地址
	'AUTHOR_VIDEO' => 'http://api-v.gomeplus.com/',

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
	//埋点脚本
	'UBA_SDK_URI' => '/m/uba-sdk/uba-sdk.min.js',
	'BIGDADA_URI' => '/m/uba-sdk/bigdata.js',
    //红包活动接口
    'COUPON_API'=>'http://api.redpacket.pro.gomeplus.com',
    'GOME'=>[
        'URL'=>[
            'LOGIN_URL'=>'login.gome.com.cn/',//登录
            'REG_URL'=>'reg.gome.com.cn/',//注册
            'UCENTER_URL'=>'myhome.gome.com.cn/',//个人中心
            'SEARCH_URL'=>'search.gome.com.cn',//搜索
            'CART_URL'=>'cart.gome.com.cn/',//购物车
            'MAIN_URL'=>'www.gome.com.cn/',//主页
            'MEIDIAN_URL' => 'meidian.gome.com.cn',//美店URL
            'MEIHAO_URL' => 'meihao.gome.com.cn',//美店URL
            'MALL_ITEM_URL'=>'item.gome.com.cn/',//商品详情
            'MALL_SHOP_URL'=>'mall.gome.com.cn/',//店铺
			'MEMBER_URL' => 'member.gome.com.cn/',//会员
            'UCENTER_VIP_URL'=>'v.gome.com.cn',//会员俱乐部
			'UCENTER_RIGHTS_URL'=>'quanyi.gome.com.cn',//会员权益
			'SHOP_URL'=>'mall.gome.com.cn',
			'HELP_URL'=>'help.gome.com.cn/',//帮助中心
			'MSHOP_URL'=>'shop.m.gomeplus.com/',//国美美店地址
            'GCOIN_URL'=>'gcoin.gome.com.cn/',//实名认证
	        'MALL_ITEM_TUAN_URL'=>'tuan.gome.com.cn/',//团抢的商品详情页
        ],
        'STATICS'=>[
            'CSS'=>'css.gome.com.cn',
            'JS'=>'js.gome.com.cn',
            'IMG'=>'img.gome.com.cn',
			'STAGE_IMAGE_SERVER' => 'img.gome.net.cn/',
            'NET_JS'=>'js.gomein.net.cn/',
        ],
        'COOKIE_DOMAIIN'=>'.gome.com.cn',
        'SECURE_URL'=>'https://g.gome.com.cn:443',
        'CONTEXT_PATH'=>'/ec/homeus',
        /*API接口配置*/
        'SERVICE' => array(
			'SSO' => 'http://sso.ds.gome.com.cn/',
			'PRODUCT_SEARCH_API' => 'http://apis.gome.com.cn/',
			'SS_API' => '//ss.gome.com.cn/',
			'ORDER' => 'http://order.gome.com.cn/',
			'UCENTER' => 'http://member.gome.com.cn/',
			'CART' => '//cart.gome.com.cn/',
			'RECOMMEND' => 'http://bigd.gome.com.cn/',
			'SHOP' => 'http://access.ec.api/',
			'ACCESS'=>'http://access.ec.api/'
        ),
        'API_PARAMS'=>array('COOKIE'=>';route=true'),
    ],
    'MONGO'=>[
        'DB_HOST' => '10.125.141.177:30000,10.125.141.178:30000,10.125.141.179:30000',
        'DB_USER' => '',
        'DB_PWD' => '',
        'DB_NAME' => 'social',
    ],
     /*好货推荐-精选*/
    'GOODS_RECOMMEND_BEST' => 'http://prom.mobile.gome.com.cn/wap/shop/fillGoodsExtProperty.jsp?body=',
    /*好货推荐-门店、人气、佣金、销量*/
    'GOODS_RECOMMEND_OTHER' => 'http://bi-api.gomeplus.com/mshop/mshop-ranks/rankTab?',
	
	//美店广告位获取
	'MSHOP_CMS_BANNER' => 'http://prom.mobile.gome.com.cn/wap/promotion/originalcms/',
	
	//csrf token加密key
	'CSRF_TOKEN_KEY' => '94bugaosuni'
);

