<?php

namespace Ajax\Service;

use Home\Service\BaseService;

class CarService extends BaseService
{
    public $key = 'CarService';
    public $param = array();
    //已升级v2
    public $shopcart_list = 'cart/get_shopcart_list.json';
    //已升级v2
    public $shopcart_add = 'cart/add_shopcart.json';
    //未使用
    public $shopcart_update = 'cart/update_shop_num.json';
    //已升级v2
    public $shopcart_delete = 'cart/del_shopcart_product.json';
    //未使用
    public $shopcart_join = 'cart/join_shopcart.json';	// 合并未登录时的购物车

    //购物车确认订单页接口
    public $check_order_info = 'cart/get_check_order_info.json';
    //未使用
    public $my_acount = 'account/my_acount.json';
    //未使用
    public $default_address = 'user/get_default_address.json';
    //未使用
    public $address_detail = 'user/address_detail.json';
    //未使用
    public $confirm_order = 'cart/confirm_order.json';
    public $get_shop_redpacket_list = 'cheap/get_shop_redpacket_list.json';//店铺红包列表
}