<?php

namespace Ajax\Service;

use Home\Service\BaseService;

/**
 * Class ShopService
 *
 * @author  imarting<guoquan@gomeplus.com>
 * @date    2016-05-25
 * @package Ajax\Service
 */
class ShopService extends BaseService
{
    public $get_shop_collected                  = 'shop/get_shop_collected.json';//收藏感兴趣的店铺
    public $remove_shop_collectedByShopId       = 'shop/remove_shop_collectedByShopId.json';//取消店铺收藏
    public $get_product_collected               = 'shop/get_product_collected.json';//增加店铺商品收藏
    public $remove_product_collectedByProductId = 'shop/remove_product_collectedByProductId.json';//取消店铺商品收藏
}
