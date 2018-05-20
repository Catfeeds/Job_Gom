<?php

namespace Ajax\Service;

use Home\Service\BaseService;

class CarV2Service extends BaseService
{
    public $key = 'CarV2Service';
    public $param = array();
    public $bs_version = 2;

    //购物车
    public $cart_item = "trade/shoppingCartItem";
    //购物车列表
    public $shopping_cart = 'trade/shoppingCart';
	//购物车商品数量接口T42
	public $shopping_num = "trade/shoppingCartItemQuantity";
}
