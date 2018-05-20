<?php

namespace Order\Service;

use Home\Service\BaseService;

class CartService extends BaseService
{
    public $bs_version = 2;

    //支付获取支付详情
    public $shopping_cart = 'trade/shoppingCart';
    //A14.用户资产信息 combo
    public $userAssetsInfo = 'combo/userAssetsInfo';
    //A6.校验支付密码是否存在
    public $paymentPasswordExistence = 'account/paymentPasswordExistence';
    //A7.校验支付密码,接口暂未使用
    public $paymentPasswordVerification = 'account/paymentPasswordVerification';


}
