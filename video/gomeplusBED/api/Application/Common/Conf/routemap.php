<?php
return [
    'URL_ROUTE_RULES'=>[
//        'news/:year/:month/:day' => array('News/archive', 'status=1'),
//        'news/:id'               => 'News/read',
//        'news/read/:id'          => '/news/:1',
//        '/^new\/(\d{4})\/(\d{2})$/' => 'News/achive?year=:1&month=:2',
        'test/widget' => array('Index/index', 'status=1'),
        'social/basenum' => array('activity/socialBaseNum', 'status=1'),
        'socialtopic/listbygid' => array('activity/topicListByGid', 'status=1'),
        'socialtopic/detailbytidback' => array('activity/topicDetailByTidBack', 'status=1'),
        'socialtopic/detailbytidfront' => array('activity/topicDetailByTidFront', 'status=1'),
        'socialgroup/numbyuid' => array('activity/groupNumByUid', 'status=1'),
        'socialgroup/detailbygid' => array('activity/groupDetailByGid', 'status=1'),
    ]
];