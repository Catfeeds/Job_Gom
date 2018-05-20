<?php
/*
 * csrf 跨站请求列表，设置列表的接口才会接受验证
 * */
return [
	'csrf_lists_black' => [
		//模块名
		'module' => [],
		//模块名_控制器名
		'controller' => [
			'ajax_group' => 1,
			'ajax_topic' => 1
		],
		//模块名_控制器名_方法名
		'action' => [
			'group_api_next_topic' => 1,
			'group_api_recommend' => 1,
			'group_api_categories' => 1,
			'group_api_group_lists' => 1,
			'group_api_circle' => 1,
			'group_api_quit_circle' => 1,
			'group_api_search_more' => 1,
			'group_api_topic_more' => 1,
			'group_api_reply_list_v2' => 1,
			'group_api_second_reply_list_v2' => 1,
			'group_api_otherMissing' => 1
		]
	],
	//需防止灌水的接口
	'csrf_lists_check_repeat' => [
		'action' => [
			'ajax_topic_first_v2' => 1,
			'ajax_topic_create' => 1,
		]
	]
];
