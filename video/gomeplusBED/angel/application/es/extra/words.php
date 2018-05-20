<?php
/*
 * 设置关键字
 * 结构
 *
 * 注解:  包含关键字的最近15分钟超过N条数据进行邮件提醒.
 [
    "URL地址-关键字" => [
        'times' => '15m', //当前时间-15分:最近15分钟的数据--------m=分  H=小时  M=月
        'doc_count' => '',//多少条文档信息发送邮件
    ]
 ]
 * by: maoxiaoqi
 * */

//注解:  包含关键字的最近15分钟超过N条数据进行邮件提醒.
return [
    /******************************************分隔符  API plus CMS接口监控*************************************************/
    "http://api-cms.pro.gomeplus.com/v2/slot/gome/hotTopic.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/gome/interestGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/gome/qualityLife.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/gome/topicRecommend.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/market/wonderfulGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/tuan/wonderfulTopic.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/car/wonderfulGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/alcohol/drinksClub.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/alcohol/interestGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/homes/hotTopic.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/homes/interestGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/sale/buyList.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/new/hotTopic.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/new/interestGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
        'ext' => [ 'project_name' => 'gomeo2o_pc_api' ]
    ],

    /******************************************分隔符  圈子首页 CMS接口监控*************************************************/
    "http://api-cms.pro.gomeplus.com/v2/slot/group/groupRecommend.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],

    "http://api-cms.pro.gomeplus.com/v2/slot/group/banner.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/hotImage.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],

    "http://api-cms.pro.gomeplus.com/v2/slot/group/hotText.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/groupRecommend.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/topic.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/qualityLife.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/fashionGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/fashionActivity.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/liveGroup.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/liveActivity.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/videoTopic.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/videoActivity.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    "http://api-cms.pro.gomeplus.com/v2/slot/group/strollProduct.json" => [
        'times' => '4h',
        'doc_count' => '1',
    ],
    /***********************************************分隔符  国美在线接口列表**********************************************************/
    //单点登录 UUID获取SCN  - 对接人：康宁
    "http://sso.ds.gome.com.cn/checkStatus" => [
        'times' => '30m', //当前时间-15分:最近15分钟的数据
        'doc_count' => '30',//多少条文档信息发送邮件
    ],
    //登录信息接口 - 对接人：马青荣
    "http://member.gome.com.cn/gome/index/loginStyle" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //我的订单--前两条 - 对接人：刘冬
    "http://order.gome.com.cn/orderdetail/getProfileOrderDetail" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //会员中心首页显示接口（国美币+美豆+返利） - 对接人：刘欢
    "http://member.gome.com.cn/myaccount/profitAccountDetail/getProfitAccountDetail" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //个人中心首页--优惠券 - 对接人：刘欢
    "http://member.gome.com.cn/myaccount/couponInfo/getUnusedCouponCount" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //购物车数量 - 对接人：易菊芳
    "http://cart.gome.com.cn/home/api/cart/getCartItemCount" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //个人中心商品推荐 - 对接人：李冰青
    "http://bigd.gome.com.cn/gome/rec" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //个人中心首页--确认收货  - 对接人：刘冬
    "http://order.gome.com.cn/orderlist/confirmOrderButton" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //发布话题--商品收藏  - 对接人：刘海明
    "http://member.gome.com.cn/myaccount/myFavorites/getMyFavoritesGoods" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
    //批量获取店铺信息  对接人：周天挺
    "http://access.ec.api/v2/shop/multi/topic" => [
        'times' => '30m',
        'doc_count' => '30',
    ],
];
