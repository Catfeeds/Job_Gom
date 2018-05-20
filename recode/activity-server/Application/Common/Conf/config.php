<?php
return array(
    'MULTI_MODULE'=>true, //开启多模块
	'MODULE_ALLOW_LIST' => array('Home','Activity'),//允许访问的模块
	'DEFAULT_MODULE' => 'Home',  // 默认模块
    'MODULE_DENY_LIST' =>  array('Common','Runtime'), //禁止访问的模块
	//'配置项'=>'配置值'
	'URL_CASE_INSENSITIVE' => true,	// 不区分url大小写
	'LOAD_EXT_CONFIG' => 'alias,seo,crumbs,gome,modelid,auth,csrf',
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
	'CSS_VERSION' => '2.4.1',
	'JS_VERSION' => '2.4.1',
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
	//网站application验证key
	'ENCRYPT_APP_KEY' => 'W2AHwrMgwb705uCcNZURGsUf',
    //私钥文件地址
    'RSA_PRIVATE_PATH' => __DIR__.'/rsa_private_key.pem',
    //'RSA_PUBLIC_KEY'=>'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBrBCRrxZQruu7KWd21Qjova/JrBEfyLhjSmZeCBPn8GfT5sj5yFrJuHK/IIncRtiRN2mNZnhWMnEqjv3k93TmUcKyMMRp4COEzqgdSguVf+szQ9KbvCJwvoGhghaAPJjhmiAe8LrleH4p6aAal3bzEUna2UvbhYzaqbpNLHMYowIDAQAB',
	//扩展配置
	'EXT_DEFAULT_C_EMPTY' => 'home',//所有控制器empty指向到Home by:maoxiaoqi
	//手写的错误日志地址
	'ERROR_LOG_DIR' => '/gomeo2o/logs/applog/activity/',
);
