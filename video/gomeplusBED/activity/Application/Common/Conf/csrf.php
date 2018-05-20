<?php
/*
 * csrf 跨站请求列表，设置列表的接口才会接受验证
 * */
return [
	'csrf_lists_black' => [
		//模块名（小写）
		'module' => [],
		//模块名_控制器名（小写）
		'controller' => [],
		//模块名_控制器名_方法名（小写）
		'action' => [
			'activity_api_incrwarm' => 1
		]
	]
];
