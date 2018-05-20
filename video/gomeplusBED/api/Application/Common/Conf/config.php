<?php
return array(
    'MULTI_MODULE'=>true, //开启多模块
	'MODULE_ALLOW_LIST' => array( 'Api'),//允许访问的模块
	'DEFAULT_MODULE' => 'Api',  // 默认模块
    'MODULE_DENY_LIST' =>  array('Common','Runtime'), //禁止访问的模块
	//'配置项'=>'配置值'
	'URL_CASE_INSENSITIVE' => true,	// 不区分url大小写
	'LOAD_EXT_CONFIG' => 'alias,crumbs,gome,routemap',
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
	'CSS_VERSION' => '1.9.2',
	'JS_VERSION' => '1.9.2',
	'DEFAULT_FILTER' => 'htmlspecialchars,addslashes', //  参数过滤
	'URL_MODEL' => 3,	// U方法去掉index.php
	'URL_ROUTER_ON'   => true,//启用路由
	'DEFAULT_M_LAYER' => 'Service', // 默认的模型层名称,默认的是model
	'DEFAULT_V_LAYER' => 'Template', // 设置默认的视图层名称
	'TMPL_TEMPLATE_SUFFIX'=>'.tpl',	// 设置模板文件的扩展名，默认是.html
	'DEFAULT_THEME' => 'Front',	// 设置默认的模板主题

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
        '160xauto' => '160zq80',
        '800x800' => '800x800cTzq80',
    ),
    'gomeAllImgSze'=>array(
        'IMG'=>[50,60,80,100,120,130,140,160,210,260,360,400,800],
        'GFS'=>[
            '50_50',
            '60_60',
            '80_80',
            '100_100',
            '120_120',
            '130_130',
            '140_140',
            '160_160',
            '210_210',
            '260_260',
            '360_360',
            '375_200',
            '219_138',
            '400_400',
            '800_800',
        ],
        //Gfs图片缩放尺寸
        'thumbnailSize'=>[
            '27_27','30_30','40_40','50_50','57_57','60_60','61_61','62_44','70_70','80_80','91_91','94_94',
            '105_105','100_100','120_60','120_120','130_130','140_140','160_160','165_147','165_177','185_185','188_250','192_192',
            '206_206','219_138','210_210','220_220','220_275','238_238','260_260','225_200','275_275',
            '300_400','306_78','320_480','360_200','360_360','375_200','375_400','400_400','430_430','450_200','480_800',
            '750_98','750_128','750_160','750_224','750_265','750_267','750_296',
            '640_960','640_1136','720_1280','800_800','801_801','1080_1080'
        ],
        //GFS图片裁剪尺寸
        'cutSize'=>[
            '60_14','60_24','60_29','60_33','60_60','60_80','78_78','78_244',
            '100_24','100x40','100_49','100_56','100_100','100_133',
            '120_28','120_48','120_59','120_67','120_120','120_160',
            '160_38','160_64','160_78','160_90','160_160','160_231',
            '240_86','244_78',
            '260_62','260_128','260_104','260_146','260_260','260_346',
            '360_86','360_144','360_177','360_360','360_202','360_480',
            '400_96','400_160','400_197','400_225','400_400','400_533',
            '800_320','800_394','800_450','800_800','800_1066',
            '1080_259','1080_432','1080_532','1080_607','1080_1080','1080_1440'
        ],
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
    //新增公参商品订单来源字段sid，由sourceCode映射，值构成：应用_平台_来源(类型_位置)_营销活动(活动类型_活动序列号)_渠道
	'sid'=>array(
		'150000001001' => 'a1_p05_t01_s001',
		'150000001002' => 'a1_p05_t01_s002',
		'150000005003' => 'a1_p05_t05_s003',
		'150000005004' => 'a1_p05_t05_s004',
		'150000003005' => 'a1_p05_t03_s005',
		'150000004006' => 'a1_p05_t04_s006',
		'150000004007' => 'a1_p05_t04_s007',
		'150000004008' => 'a1_p05_t04_s008',
		'150000004009' => 'a1_p05_t04_s009',
	),
	//活动统计配置
	'A10002001060030001' => 'a1_p05_t1060030001_s10002001',
	'A10002001060030002' => 'a1_p05_t1060030001_s10002001',
	//活动配置
	//ACTION_NAME=>活动编号
	'sale_conf' => array(
		'axfpbr1n9byk' => '10002001',
		'ykmc3gpd8h3k' => '10004001',
		'tqgss06uk5mb' => '70005002',
		'gngwezbn1alr' => '10005001',
		'qxiji81znlue' => '10006001',
	),
    'cache_prefix'=>array(
        'group_info'=>'p_t_',
        'topic_info'=>'p_g_',
        'hot_topics'=>'hot_topics',
        'category_groups'=>'category_groups',
    ),
	//检测cookie值是否被篡改:md5(abcdefg)
	'auth_check' => '7ac66c0f148de9519b8bd264312c4d64',
	//被检测cookie值的字符串分隔符
	'auth_check_sep' => '!@#@!'
);
