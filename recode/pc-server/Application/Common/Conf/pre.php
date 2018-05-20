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
	/*第三方登录配置*/
	// QQ登录
	'QQ_OAUTH_CONSUMER_KEY' => '',
	'QQ_OPENID' => '',
	'QQ_REDIRECT_URI' => APP_HTTP.'passport.pre.gomeplus.com/login/qqcallback',
	'QQ_CLIENT_ID' => '101316255',
	'QQ_CLIENT_KEY' => 'd44fd54cedf4f621d16a602fd17b549d',
	// 微信登录
	'WX_APP_ID' => 'wx2c5f1e94d0cb806a',
	'WX_REDIRECT_URL' => APP_HTTP.'passport.pre.gomeplus.com/login/wechatcallback',
	'WX_APP_SECRET' => '529871fae1ad7aa8e93139b23533b980',
	// 微博登录
	'WB_AKEY' => '92483714',
	'WB_SKEY' => '2c345886be0726bbd3adc83e42ccdfbc',
	'WB_CALLBACK_URL' => APP_HTTP.'passport.pre.gomeplus.com/login/wbcallback',

	//极信登录
	'JX_APP_ID' => '708ad1c5-a096-4b39-97c0-5caa79ef8d0c',
	'JX_APP_KEY' => 'f29d461b-7c66-4e79-82f3-2f29a0d14cd7',
	'JX_REDIRECT_URL' => APP_HTTP.'passport.pre.gomeplus.com/login/jixincallback',
	'JX_AUTHORIZE_URL' => 'http://10.128.11.110:16391/MVNO-UIP-LHDL/oauth2/authorize',

	//国美支付登录
	'GOMEPAY_APP_ID' => 'e3ad07e3d7893b8c599964f672b529ab',
	'GOMEPAY_APP_KEY' => 'b0be0f440c8542c88b962a1192c7fad5',
	'GOMEPAY_REDIRECT_URL' => APP_HTTP.'passport.pre.gomeplus.com/login/gomepaycallback',
	'GOMEPAY_AUTHORIZE_URL' => 'http://authtest.bonusepay.com/oauth2/authorize',

	/*BS服务配置*/
	'SERVICE' => array(
		'DOMAIN' => 'http://api.bs.pre.gomeplus.com/api/',
		'DOMAIN_V2' => 'http://api.bs.pre.gomeplus.com/v3/',//BS v2接口
		'FileUpload' => 'http://api.bs.pre.gomeplus.com/api/',
	),
	/*前端页面配置*/
	'STATICPATH' => array(
		'JS' => 'js.dev.meixincdn.com:1314/CDN8181/',
		'CSS' => 'js.dev.meixincdn.com:1314/CDN8181/',
		'IMG' => 'js.dev.meixincdn.com:1314/CDN8181/',
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
	
	'PASSPORT_URL'=>'passport.pre.gomeplus.com/',
	'ORDER_URL'=>'order.pre.gomeplus.com/',
	'GROUP_URL'=>'group.atguat.com.cn/',
	'UCENTER_URL'=>'myhome.atguat.com.cn/',
	'MALL_URL' => 'mall.pre.gomeplus.com/',
	'MAIN_URL' => 'www.pre.gomeplus.com/',
    'MEIDIAN_URL' => 'meidian.atguat.com.cn/',
     // 错误定向页面,只有APP_DEBUG=false时生效
    'ERROR_PAGE'     =>  APP_HTTP.'group.atguat.com.cn/pchome/empty',

	'COOKIE_DOMAIN' => '.atguat.com.cn',		//cookie的有效域名1
	'COOKIE_PATH' => '/' ,					//保存路径

	'COOKIE_PREFIX' => 'mx_pc_pre_',		//cookie的前缀
	'COOKIE_EXPIRE' => 86400,				//cookie的生存时间，一天

	'SESSION_OPTIONS'         =>  array(
		'name'                =>  'mx_pc_pre_gomeplusid',   //设置session名
		'expire'              =>  0,
		'maxlifetime'         => 86400,					 	//SESSION保存1天
		'use_trans_sid'       =>  1,                     	//跨页传递
		'use_only_cookies'    =>  0,                     	//是否只开启基于cookies的session的会话方式
		'domain'       => '.atguat.com.cn',
	),

	'WAP_URL' => 'm.uatplus.com/',

	//WAP站圈子子域名
	'WAP_CIRCLE_URL' => 'circle.m.uatplus.com/',
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
    'VIDEO_URL' => '//js.meixincdn.com/',
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
	//埋点脚本
	'UBA_SDK_URI' => '/m/UBA-SDK/dist/uba-sdk.min.js',
	'BIGDADA_URI' => '/m/UBA-SDK/dist/bigdata.js',
    //红包活动接口
    'COUPON_API'=>'http://api.redpacket.pre.gomeplus.com',
    'GOME'=>[
		'URL'=>[
            'LOGIN_URL'=>'login.atguat.com.cn/',//登录
            'REG_URL'=>'reg.atguat.com.cn/',//注册
            'UCENTER_URL'=>'myhome.atguat.com.cn/',//个人中心
            'SEARCH_URL'=>'search.atguat.com.cn',//搜索
            'CART_URL'=>'cart.atguat.com.cn/',//购物车
            'MAIN_URL'=>'www.atguat.com.cn/',//主页
            'MEIDIAN_URL' => 'meidian.atguat.com.cn',//美店URL
            'MALL_ITEM_URL'=>'item.atguat.com.cn/',//商品详情
            'MALL_SHOP_URL'=>'mall.atguat.com.cn/',//店铺
            'MEMBER_URL' => 'member.atguat.com.cn/',//会员
            'UCENTER_VIP_URL'=>'v.atguat.com.cn',//会员俱乐部
            'UCENTER_RIGHTS_URL'=>'quanyi.atguat.com.cn',//会员权益
            'SHOP_URL'=>'mall.atguat.com.cn',
            'HELP_URL'=>'help.atguat.com.cn/',//帮助中心
            'MSHOP_URL'=>'shop.m.atguat.com.cn/',//国美美店地址
            'GCOIN_URL'=>'gcoin.atguat.com.cn:10104/'//实名认证
        ],
		'STATICS'=>[
            'CSS'=>'css.atguat.com.cn',
            'JS'=>'js.atguat.com.cn',
            'IMG'=>'img.atguat.com.cn',
            'STAGE_IMAGE_SERVER' => 'img.atguat.net.cn',
            'NET_JS'=>'js.atguat.net.cn/',
        ],
        'COOKIE_DOMAIIN'=>'.atguat.com.cn',
        'SECURE_URL'=>'//g.atguat.com.cn',
        'CONTEXT_PATH'=>'/ec/homeus',
        /*API接口配置*/
        'SERVICE' => array(
            'SSO' => 'http://ssouat.ds.gome.com.cn/',
            'PRODUCT_SEARCH_API' => 'http://apis.atguat.com.cn/',
            'SS_API' => '//ss.atguat.com.cn/',
            'ORDER' => 'http://order.atguat.com.cn/',
            'UCENTER' => 'http://member.atguat.com.cn/',
            'CART' => 'http://cart.atguat.com.cn/',
            'RECOMMEND' => 'http://bigd.atguat.com.cn/',
            'SHOP' => 'http://access.ec.api/',
            'ACCESS'=>'http://accessuat.ec.api/'
        ),
        'API_PARAMS'=>array('COOKIE'=>';route=9e3550b0d4f5ed66a7d88ddf0cd715ce'),
    ],
    'MONGO'=>[
        'DB_HOST' => '10.125.194.44:30000,10.125.194.45:30000,10.125.194.46:30000',
        'DB_USER' => '',
        'DB_PWD' => '',
        'DB_NAME' => 'social',
    ],
    /*好货推荐-精选*/
    'GOODS_RECOMMEND_BEST' => 'http://prom.mobile.gome.com.cn/wap/shop/fillGoodsExtProperty.jsp?body=',
    /*好货推荐-门店、人气、佣金、销量*/
    'GOODS_RECOMMEND_OTHER' => 'http://bi-api.gomeplus.com/mshop/mshop-ranks/rankTab?',
	//csrf token加密key
	'CSRF_TOKEN_KEY' => '12345678a'
);


