<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

/**
 * Class ShopController
 *
 * 店铺相关操作接口
 *
 * @author  imarting<guoquan@gomeplus.com>
 * @date    2016-05-25
 * @package Ajax\Controller
 */
class ShopController extends BaseController
{
    private $shop = null;

    protected function _initialize()
    {
        $this->shop = D('Shop');
		$this->shopV2 = D('Mall/ShopV2');
		$this->productV2 = D('Mall/ProductV2');
    }

    //添加店铺收藏 - Auth
    public function collectShop()
    {
        $ret = $this->shop->postData($this->shop->get_shop_collected, [
            'shopId' => I('param.shopId', 0, 'intval'),
        ]);
        $this->ajaxReturn($ret);
    }

    //取消店铺收藏 - Auth
    public function uncollectShop()
    {
        $ret = $this->shop->postData($this->shop->remove_shop_collectedByShopId, [
            'vshopId' => I('param.shopId', 0, 'intval'),
        ]);
        $this->ajaxReturn($ret);
    }

    //添加店铺商品收藏 - Auth
    public function collectProduct()
    {
        $ret = $this->shop->postData($this->shop->get_product_collected, [
            'shopId'    => I('param.shopId', 0, 'intval'),
            'productId' => I('param.productId', 1, 'intval')
        ]);
        $this->ajaxReturn($ret);
    }

    //取消店铺商品收藏 - Auth
    public function uncollectProduct()
    {
        $ret = $this->shop->postData($this->shop->remove_product_collectedByProductId, [
            'vshopId'   => I('param.shopId', 0, 'intval'),
            'productId' => I('param.productId', 1, 'intval')
        ]);
        $this->ajaxReturn($ret);
    }
	
	//添加店铺收藏V2
    public function collectShopV2()
    {
        $ret = $this->shopV2->putData($this->shopV2->putShopCollect, [
            'shopId' => I('param.shopId', 0, 'intval'),
        ]);
        $this->ajaxReturn($ret);
    }

    //取消店铺收藏V2
    public function uncollectShopV2()
    {
        $ret = $this->shopV2->deleteData($this->shopV2->delShopCollect, [
            'shopId' => I('param.shopId', 0, 'intval'),
        ]);
        $this->ajaxReturn($ret);
    }

    //添加店铺商品收藏V2
    public function collectProductV2()
    {
        $ret = $this->productV2->putData($this->productV2->putProdCollect, [
            'shopId'    => I('param.shopId', 0, 'intval'),
            'itemId' => I('param.productId', 1, 'intval')
        ]);
        $this->ajaxReturn($ret);
    }

    //取消店铺商品收藏V2
    public function uncollectProductV2()
    {
        $ret = $this->productV2->deleteData($this->productV2->delProdCollect, [
            'shopId'   => I('param.shopId', 0, 'intval'),
            'itemId' => I('param.productId', 1, 'intval')
        ]);
        $this->ajaxReturn($ret);
    }
	
    public function _before_collectShop()
    {
        $this->validate([
            'shopId' => 'required'
        ]);
    }

    public function _before_uncollectShop()
    {
        $this->validate([
            'shopId' => 'required'
        ]);
    }

    public function _before_collectProduct()
    {
        $this->validate([
            'shopId'    => 'required',
            'productId' => 'required'
        ]);
    }

    public function _before_uncollectProduct()
    {
        $this->validate([
            'shopId'    => 'required',
            'productId' => 'required'
        ]);
    }
	
	public function _before_collectShopV2()
    {
        $this->validate([
            'shopId' => 'required'
        ]);
    }

    public function _before_uncollectShopV2()
    {
        $this->validate([
            'shopId' => 'required'
        ]);
    }

    public function _before_collectProductV2()
    {
        $this->validate([
            'shopId'    => 'required',
            'productId' => 'required'
        ]);
    }

    public function _before_uncollectProductV2()
    {
        $this->validate([
            'shopId'    => 'required',
            'productId' => 'required'
        ]);
    }
}