<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：国美在线相关API配置                                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:songwenchao <songwenchao@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2017-01-13 18:28:40 CST                                         |
 * +----------------------------------------------------------------------+
 */

return array(
    'GOME_API'=>[
        //SSO检查状态 获取SCN
        'check_status' => 'checkStatus?',

        //登录信息
        'login_style' => 'gome/index/loginStyle',
        
        //我的订单--前两条
        'top_two_order' => 'orderdetail/getProfileOrderDetail',
        //搜索请求商品数据
        'product_search' => 'p/product',
        //获取商品价格信息
        'product_price'=>'search/v1/price/single',
        
        //国美币、美豆等信息
        'account' => 'myaccount/profitAccountDetail/getProfitAccountDetail',
        
        //优惠券数量
        'coupons' => 'myaccount/couponInfo/getUnusedCouponCount',
        
        //购物车数量
        'cartNum' => 'home/api/cart/getCartItemCount',
        
        //个人中心商品推荐
        'ucenterRecom' => 'gome/rec',
        
        //确认收货
        'confirmRecv' => 'orderlist/confirmOrderButton',
        
        //商品收藏列表
        'prodCollect' => 'myaccount/myFavorites/getMyFavoritesGoods',

        //批量获取店铺信息
        'shopList' => 'v2/shop/multi/topic'
    ]
);


