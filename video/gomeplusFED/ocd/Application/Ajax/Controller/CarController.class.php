<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

/**
 * Class CarController
 *
 * @auhor   imarting<guoquan@gomeplus.com>
 * @date    2016-05-24
 * @package Ajax\Controller
 */
class CarController extends BaseController
{
    protected function _initialize()
    {
        $this->car = D('Car');
        $this->car_v2 = D('CarV2');
    }

    /////////////////////////////////////////////////////////////     V2接口

    /*
     * V2 删除购物车
     * @param ids string 9474@0#511,9709@0#511,9532@0#51(传递给BS需转义)
     * @return json
     * */
    public function del_v2() {
        $ids = urlencode( I( "param.ids", '' ) );

        $data = $this->car_v2->deleteData(
            $this->car_v2->cart_item,
            array(
                'ids' => $ids
            )
        );

        $this->ajaxReturn($data);
    }

	/*
     * 修改购物车
     * @return json
     * */
    public function put() {
        $mshopid = I( 'param.mshopid', '' );
        $kid = I( 'param.kid', '' );
        $skuid = I( 'param.skuid', '' );
        $quantity = I( 'param.quantity', 0 );
        $source_code = I( 'param.source_code', '');

        $source_code  = get_source_active( $source_code );

        $data = $this->car_v2->putData(
            $this->car_v2->cart_item,
            array(
                'mshopId' => (int)$mshopid,//店铺id（美店id）
                'kid' => $kid,//kid
                'skuId' => (int)$skuid,//商品的skuid
                'quantity' => (int)$quantity,//够买数量
                'sourceCode' => $source_code//商品来源
            )
        );

        $this->ajaxReturn($data);
    }


    /*
     * 添加购物车
     * @return json
     * */
    public function add() {
        $mshopid = I( 'param.mshopid', '' );
        $kid = I( 'param.kid', '' );
        $skuid = I( 'param.skuid', '' );
        $quantity = I( 'param.quantity', 0 );
        $source_code = I( 'param.source_code', '');

        $source_code  = get_source_active( $source_code );

        $data = $this->car_v2->postData(
            $this->car_v2->cart_item,
            array(
                'mshopId' => (int)$mshopid,//店铺id（美店id）
                'kid' => $kid,//kid
                'skuId' => (int)$skuid,//商品的skuid
                'quantity' => (int)$quantity,//够买数量
                'sourceCode' => $source_code//商品来源
            )
        );

        $this->ajaxReturn($data);
    }

    /////////////////////////////////////////////////////////////    V1接口

    //编辑购物车 - auth
    public function update()
    {
        $param['shopId']     = I('param.shopId', 0, 'intval');
        $param['kId']        = I('param.kId', '');
        $param['skuId']      = I('param.skuId', 0, 'intval');
        $param['proNum']     = I('param.proNum', 0, 'intval');
        $param['loginToken'] = $this->token;
        $list                = $this->car->postData($this->car->shopcart_update, $param);
        $this->ajaxReturn($list);
    }

    //删除购物车 - auth
    public function del()
    {
        $param['deleteIds']  = I('param.deleteIds', '');
        $param['deleteIds']  = urldecode($param['deleteIds']);
        $param['loginToken'] = $this->token;
        $carData             = $this->car->postData($this->car->shopcart_delete, $param);
        $this->ajaxReturn($carData);
    }

    //获取订单信息(包含优惠券) - auth
    public function orderInfo()
    {
        $paramJson['proJson']    = isset($_REQUEST['proJson']) ? trim($_REQUEST['proJson']) : '';
        $paramJson['loginToken'] = $this->token;
        $list                    = $this->car->getData($this->car->check_order_info, $paramJson, false);
        $this->ajaxReturn($list);
    }

    /**
     * 获取店铺红包列表接口 - auth
     */
    public function getRedPacketList()
    {
        $param                 = array();
        $param['shopId']       = I('param.shopId', 0, 'intval');
        $param['pageNum']      = I('param.pageNum', 1, 'intval');
        $param['numPerPage']   = I('param.numPerPage', 10, 'intval');
        $param['lastRecordId'] = I('param.lastRecordId', '');
        $data                  = $this->car->getData($this->car->get_shop_redpacket_list, $param, false);
        $this->ajaxReturn($data);
    }

    public function _before_update()
    {
        $this->validate([
            'shopId' => 'required|integer',
            'skuId'  => 'required|integer',
            'proNum' => 'required|integer'
        ]);
    }

    public function _before_del()
    {
        $this->validate([
            'deleteIds' => 'required'
        ]);
    }

    public function _before_orderInfo()
    {
        $this->validate([
            'proJson' => 'required'
        ]);
    }

    public function _before_getRedPacketList()
    {
        $this->validate([
            'shopId'     => 'required|integer',
            'pageNum'    => 'integer',
            'numPerPage' => 'integer'
        ]);
    }
}
