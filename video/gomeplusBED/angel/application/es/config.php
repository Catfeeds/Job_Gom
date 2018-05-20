<?php
return [
    //邮件通知列表
    "email_lists" => [
        'zhangxiaoliang@gomeplus.com',
		'liuzhen@gomeplus.com',
		'songwenchao@gomeplus.com',
		'liuchao@gomeplus.com',
		'lishuai@gomeplus.com',
		'liluming@gomeplus.com',
    ],

    //ES HOST环境变量
    "es_env" => [
		//预生产
        'pre' => [
			'host' => '10.69.205.21',
			'port' => '9201'
		],
		//生产
		'pro' => [
			'host' => '10.125.145.21',
			'port' => '9201'
		]
    ],

	//秘钥
	"zabbix_key" => "zabbix!@@#$%^&UHGTYUJNBFTYUIKNBG",

	//慢查询相关配置
	"slow" => [
		'gte_numbers' => '1.5',
		'limit' => 20,
		'order' => 'asc',
		'times' => '60m', //当前时间-15分:最近15分钟的数据
	]
];
