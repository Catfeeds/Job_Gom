<?php
return array(
    'MULTI_MODULE'=>true, //开启多模块
	'MODULE_ALLOW_LIST' => array('Home','Mall','Ucenter','Group','Order','Passport','Ajax'),//允许访问的模块
	'DEFAULT_MODULE' => 'Home',  // 默认模块
    'MODULE_DENY_LIST' =>  array('Common','Runtime'), //禁止访问的模块
	//'配置项'=>'配置值'
	'URL_CASE_INSENSITIVE' => true,	// 不区分url大小写
	'LOAD_EXT_CONFIG' => 'alias,whitelist,seo,crumbs,csrf',
	'DATA_CACHE_TYPE' => 'redis',	// 缓存类型
	'URL_HTML_SUFFIX' => 'html',	// 伪静态后缀,可指定html
	'HTML_CACHE_ON' => false,
	// 使用新模版
	'TMPL_SWITCH_ON' => true, // 启用多模版支持
	'THEME_LIST'        => 'default,Front',
	'TMPL_DETECT_THEME' => true, // 自动侦测模板主题
	'TMPL_ACTION_ERROR' => 'Public:error', // 错误跳转页
	'TMPL_ACTION_SUCCESS' => 'Public:success', // 成功跳转页
	'ERROR_MESSAGE' => '这个页面出错了哦', // 页面错误信息

	// jscss版本号
	'CSS_VERSION' => '1.5.5',
	'JS_VERSION' => '1.5.5',
	'DEFAULT_FILTER' => 'htmlspecialchars,addslashes', //  参数过滤
	'URL_MODEL' => 3,	// U方法去掉index.php
	'DEFAULT_M_LAYER' => 'Service', // 默认的模型层名称,默认的是model
	'DEFAULT_V_LAYER' => 'Template', // 设置默认的视图层名称
	'TMPL_TEMPLATE_SUFFIX'=>'.tpl',	// 设置模板文件的扩展名，默认是.html
	'DEFAULT_THEME' => 'default',	// 设置默认的模板主题

	'TMPL_L_DELIM' => '<{',	// 模板变量左标签
	'TMPL_R_DELIM' => '}>',	// 模板变量右标签
	'LOG_RECORD' => true, // 开启日志记录
	//暂时打开,解决notice
	'LOG_LEVEL' =>'INFO,DEBUG,NOTICE,WARN,EMERG,ALERT,CRIT,ERR',
	//旧日志记录类型 默认为文件方式
	'LOG_TYPE' => 'File',
	//cookie加密key
	'ENCRYPT_COOKIE_KEY' => 'hf!a^s6&*@$f7_)@#34r(t3',
	//cms验证key
	'ENCRYPT_CMS_KEY' => 'n2AHwrMgwb705uCcNZURGsjZt',
    //私钥文件地址
    'RSA_PRIVATE_PATH' => __DIR__.'/rsa_private_key.pem',
    //'RSA_PUBLIC_KEY'=>'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBrBCRrxZQruu7KWd21Qjova/JrBEfyLhjSmZeCBPn8GfT5sj5yFrJuHK/IIncRtiRN2mNZnhWMnEqjv3k93TmUcKyMMRp4COEzqgdSguVf+szQ9KbvCJwvoGhghaAPJjhmiAe8LrleH4p6aAal3bzEUna2UvbhYzaqbpNLHMYowIDAQAB',
	// 不允许跳转登录的uri
	'NO_ALLOW_LOGIN_URI' => array(
		'Login/index',
	),
	//PC端图片尺寸定义
	'allImgSze'=>array(
		'16x16' => '16x16cTzq80',
		'32x32' => '32x32cTzq80',
		'75x75' => '75x75cTzq80',
		'80x80' => '80x80cTzq80',
		'100x100' => '100x100cTzq80',
//		'120x85' =>	'120x85cTzq80',
		'120x120' => '120x120cTzq80',
		'230x153' => '230x153cTzq80',
		'230x230' => '230x230cTzq80',
		'230xauto' => '230zq80',
		'285x185' => '285x185cTzq80',
		'300x587' => '300x587cTzq80',
		'360x360' => '360x360cTzq80',
		'390x220' =>'390x220cTzq80',
        '390x250' =>'390x250cTzq80',
		'400x400' => '400x400cTzq80',
//		'600xauto' => '600zq80',
		'600xauto' => '600q80',
		'800x512' => '800x512cTzq80',
		'800xauto' => '800zq80',
		'120x85' => '120x85czq80',
	),
	//nav通用导航active状态
	'navActive'=>array(
		'default'=>0,
		'search_hot_item'=>1,
		'search_new_item'=>3,
	),
	//商品订单来源字段定义eg:来源类型代号_module_controller_页面区分
	'sourceCode'=> array(
		'social_group_topic_detail' => 150000001001,
		'social_home_index_recommend' => 150000001002,
		'operative_home_index_focus' => 150000005003,
		'operative_home_index_guangguang' => 150000005004,
		'search_mall_search_index' => 150000003005,
		'recommend_mall_product_detail' => 150000004006,
		'recommend_order_order_recommend' => 150000004007,
		'recommend_order_cart_index' => 150000004008,
		'recommend_i_index_getOtherGoods' => 150000004009,
	),
	//扩展配置
	'EXT_DEFAULT_C_EMPTY' => 'home',//所有控制器empty指向到Home by:maoxiaoqi
);
