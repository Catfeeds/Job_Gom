<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：网站埋点modelid列表                                                |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liluming <liluming@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2017-02-15 10:28:40 CST                                         |
 * +----------------------------------------------------------------------+
 */

return array(
    'PAGE_MODEL'=>[
        //首页
        'home_index_index' => [
            'hbanner' => 'PSYBANNmd0001',
            'hrmht' => 'PSYRMHTmd0001',
            'hjrqz' => 'PSYJRQZlt',

            'hmxtj' => 'PSYMXTJlt',
            'hqzht' => 'PSYQZHTlt',
            'hggsp' => 'PSYGGSPmd0001',
            'hxqqz' => 'PSYXQQZmd0001',
            'hbdxm' => 'PSYBDXMlt',
        ],
        //精彩圈子
        'group_index_index' => [
            'jctj' => 'PJCJCTJlt',
            'qzgc' => 'PJCQZGCmd0001',
            'qzlb' => 'PJCQZLBlt'
        ],
        //圈子详情-全部话题
        'group_topic_index' => [
            'qzbt' => 'PQZQZBTmd0001',
            'qzqbht' => 'PQZQBHTlt',
            'qzjxht' => 'PQZJXHTlt',
            'qzqzxx' => 'PQZQZXXmd0001',
            'qzrmht' => 'PQZRMHTlt',
            'qzfxan' => 'PQZYCFClt',
        ],
        //圈主详情页
        'group_ta_index' => [
            'tddp' => 'PQZTDDPmd0001',
            'tdqz' => 'PQZTDQZlt',
            'htlb' => 'PQZHTLBlt',
        ],
        //话题详情页
        'group_topic_detail' => [
            'htfxan' => 'PHTFXANlt',
            'htxq' => 'PHTHTXQmd0001',
            'htcypl' => 'PHTCYPLmd0001',
            'htpllb' => 'PHTPLLBmd0001',
            'htqzxx' => 'PHTQZXXmd0001',
            'htrmht' => 'PHTRMHTlt',
            'htxyy' => 'PHTXYPZmd0001',
        ],
        //话题搜索结果页
        'group_search_topics' => [
            'sshtjg' => 'PSSHTLBlt',
        ],
        //圈子搜索结果页
        'group_search_group' => [
            'ssqzjg' => 'PSSQZLBlt',
        ],
        //个人中心
        'ucenter_index_index' => [
            'grdbtl' => 'PHYDBTLmd0001',
            'grwdzy' => 'PHYWDZYmd0001',
            'grzhxx' => 'PHYZHXXmd0001',
            'grdrzm' => 'PHYDRZMmd0001',
            'grwdqz' => 'PHYWDQZmd0001',
            'grwdht' => 'PHYWFBDlt',
            'grwddd' => 'PHYWDDDlt',
            'grtjsp' => 'PHYTJSPlt',
        ],
        //公共页面
        'public' => [
            'ggwzdh' => 'PGGSYDHmd0001',
            'ggtb' => 'PGGSYTBmd0001',
            'ggdb' => 'PGGSYWBmd0001',
            'ggfy' => 'PGGMKFYmd0001',
            'ggss' => 'PGGMKSSmd0002',
            'ggckgd' => 'PGGMKCKmd0003',
            'ggjzgd' => 'PGGMKJZmd0004',
        ],

    ],
    'PAGE_ID' => [
        'home_index_index' => ['page_id' => 'GP0001'],
        'group_index_index' => ['page_id' => 'GP0003'],
        'group_topic_index' => ['page_id' => 'GP0004'],
        'group_ta_index' => ['page_id' => 'GP0006'],
        'group_topic_detail' => ['page_id' => 'GP0005'],
        'group_search_topics' => ['page_id' => 'GP0008'],
        'group_search_group' => ['page_id' => 'GP0007'],
        'ucenter_index_index' => ['page_id' => 'GP0002'],
        'home_zt_meidou' => ['page_id'=>'ZTGP0001'],
    ]
);


