<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

/**
 * Class AddressController
 *
 * @author   imarting<guoquan@gomeplus.com>
 * @date     2016-05-24
 * @package  Ajax\Controller
 */
class AddressController extends BaseController
{
    private $address = null;

    public function _initialize()
    {
        $this->address = D('Ucenter/Address');
        $this->addressV2 = D('Ucenter/AddressV2');
    }

	//收获地址-添加 - auth
	public function add()
	{
		$param['name']         = I('param.userName', '');
		$param['detail']       = I('param.address','','trim');
		$param['mobile']       = I('param.mobile', '','trim');
		$param['idCard']       = I('param.idCard','','trim');
		$param['provinceId']   = I('param.provinceId', 0, 'intval');
		$param['cityId']       = I('param.cityId', 0, 'intval');
		$param['boroughId']    = I('param.boroughId', 0, 'intval');
		$param['areaId']       = I('param.areaId',0,'intval');
		$this->checkParams($param);
        if(I('param.isDefault') == 0){
            $param['isDefault'] = false;
            #第一次添加需要设置为默认地址
            $addressInfo = $this->addressV2->getData($this->addressV2->addressList, array(), false);
            if(empty($addressInfo['data']['consigneeInfos'])){
                $param['isDefault'] = true;
            }
        }else{
            $param['isDefault'] = true;
        }
		$addressRes = $this->addressV2->postData($this->addressV2->addressPub,$param);
        $addressRes['data']['addressId'] = $addressRes['data']['id'];
		$this->ajaxReturn($addressRes);
    }
    
	//收获地址-编辑 - auth
	public function edit()
	{
		$param['name']         = I('param.userName', '');
		$param['detail']       = I('param.address','','trim');
		$param['mobile']       = I('param.mobile', '','trim');
		$param['idCard']       = I('param.idCard','','trim');
		$param['isDefault']    = I('param.isDefault') == 0 ? false:true;
		$param['provinceId']   = I('param.provinceId', 0, 'intval');
		$param['cityId']       = I('param.cityId', 0, 'intval');
		$param['boroughId']    = I('param.boroughId', 0, 'intval');
		$param['areaId']       = I('param.areaId',0,'intval');
		$addressId             = I('param.addressId');
		$this->checkParams($param);
		$this->addressV2->publicParamv2['id'] =intval($addressId); 
		$addressData = $this->addressV2->putData($this->addressV2->addressPub,$param);
		$this->ajaxReturn($addressData);
    }

    //收货地址-删除 - auth
    public function del()
    {
        $param['id'] = I('param.addressId', 0, 'intval');

        #如果删除默认地址后，将最后更新的地址设为默认地址
        $addressInfo = $this->addressV2->getData($this->addressV2->addressList, array(), false);
        $data = $addressInfo['data']['consigneeInfos'];
        if(count($data)>1){
            $idDefault = 0;
            foreach ($data as $key=>$val){
                if($val['id'] == $param['id'] && $val['isDefault']){
                    unset($data[$key]);
                    break;
                }
            }
            $firstArr = current($data);
            $paramArr['id'] = intval($firstArr['id']);
            $this->addressV2->putData($this->addressV2->addressSetDefault, $paramArr);
        }
        $addressData = $this->addressV2->deleteData($this->addressV2->addressPub, $param);
        $this->ajaxReturn($addressData);
    }

    //收货地址-设置默认 - auth
    public function setDefault()
    {
        $param['id'] = I('param.addressId', 0, 'intval');
        $addressData = $this->addressV2->putData($this->addressV2->addressSetDefault, $param);
        $this->ajaxReturn($addressData);
    }

    //收货地址-四级联动
    public function regionDivision()
    {
        $param['parentId'] = I('param.parentId', 0, 'intval');
        $addressData       = $this->address->getData($this->address->address_region_division, $param, false);
        $this->ajaxReturn($addressData);
    }
	
	//收货地址-四级联动V2
    public function regionDivisionV2()
    {
        $param['id'] = I('param.parentId', 0, 'intval');
        $addressData = $this->addressV2->getData($this->addressV2->childAddrNodes, $param, false);
        $this->ajaxReturn($addressData);
    }

    public function _before_add()
    {
        $rules = [
            'userName'     => 'required',
            'provinceId'   => 'required|integer',
            'cityId'       => 'required|integer',
            'boroughId'    => 'required|integer',
            'areaId'       => 'integer',
            'address'      => 'required',
            'mobile'       => 'required',
            'isDefault'    => 'required|integer',
            'provinceName' => 'required',
            'cityName'     => 'required',
            'boroughName'  => 'required',
            'areaName'     => ''
        ];
        $this->validate($rules);
    }

    public function _before_edit()
    {
        $rules = [
            'addressId'    => 'required|integer',
            'userName'     => 'required',
            'provinceId'   => 'required|integer',
            'cityId'       => 'required|integer',
            'boroughId'    => 'required|integer',
            'areaId'       => 'integer',
            'address'      => 'required',
            'mobile'       => 'required',
            'isDefault'    => 'required|integer',
            'provinceName' => 'required',
            'cityName'     => 'required',
            'boroughName'  => 'required',
            'areaName'     => ''
        ];
        $this->validate($rules);
    }

    public function _before_del()
    {
        $rules = [
            'addressId' => 'required|integer'
        ];
        $this->validate($rules);
    }

    public function _before_setDefault()
    {
        $rules = [
            'addressId' => 'required|integer'
        ];
        $this->validate($rules);
    }

    public function _before_regionDivision()
    {
        $rules = [
            'parentId' => 'required|integer'
        ];
        $this->validate($rules);
    }

	public function _before_regionDivisionV2()
	{
		$rules = [
			'parentId' => 'required|integer'
			];
		$this->validate($rules);
	}

    //参数校验方法
	private function checkParams($param){
		$checkParams = true;
		foreach ($param as $key => $value) {
			if(($key == "idCard") || ($key=="areaId") || ($key == "isDefault")){
				continue;	
			}	
			if(empty($value)){
				$checkParams = false;	
			}
		}
		if($checkParams == false){
			$arrResult = array(
					"success" => false,
					"code"    => 100001,
					"msg"     => "请输入完整的送货信息",
					);	
			$this->ajaxReturn($arrResult);
			exit;
		}
	}
    
    /**
     * 收货地址切换后获取商品价格信息，并将切换后的收获地址存储在cookie中
     * @param   $provName   String  省份名称    必填
     * @param   $provId     Integer 省份ID      必填
     * @param   $cityName   String  城市名称    必填
     * @param   $cityId     Integer 城市ID      必填
     * @param   $borName    String  区域名称    必填
     * @param   $borId      Integer 区域ID      必填
     * @param   $itemId     Integer 商品ID      非必填（在有$skuId的情况下必填）
     * @param   $skuId      Integer SKUID       非必填
     * @return  String
     */
    public function getCurrItemInfo()
    {
        $provName = xss_clean(I('get.provName', '', 'strval'));
        $provId = I('get.provId', 0, 'intval');
        $cityName = xss_clean(I('get.cityName', '', 'strval'));
        $cityId = I('get.cityId', 0, 'intval');
        $borName = xss_clean(I('get.borName', '', 'strval'));
        $borId = I('get.borId', 0, 'intval');
        $itemId = I('get.itemId', 0, 'intval');
        $skuId = I('get.skuId', 0, 'intval');
        
        if(!$provName || !$provId || !$cityName || !$cityId || !$borName || !$borId)
        {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
        }
        
        saveAddrCookie($provName, $provId, $cityName, $cityId, $borName, $borId);
        
        if($skuId && !$itemId)
        {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
			exit;
        }
        
        $returnArr = array();
        
        if($skuId)
        {
            $param = array();
    		$param['itemId'] = $itemId;
            $param['skuId'] = $skuId;                                    
            $param['addressNodeId'] = $borId;
            
            $product = D("Mall/ProductV2");
            $res = $product->getData($product->stockAndPrice, $param);
            
            if(!$res['success'])
    		{
    			$this->ajaxReturn($res);
    			exit;
    		}
            
            $res['data']['price'] = convert_price($res['data']['price']);
            $res['data']['salePrice'] = convert_price($res['data']['salePrice']);
            $skuArr = $res['data']['skus'][0];
            $skuArr['price'] = convert_price($skuArr['price']);
            $skuArr['salePrice'] = convert_price($skuArr['salePrice']);
            $res['data']['skus'] = $skuArr;
            
            $this->ajaxReturn($res);                                                                                                
        }
        else
        {
            $this->outJSON(200, '', $returnArr);
        }
        
        /*
        因BS combo接口不支持在商品多个sku的情况下调用实时数据，因此在未选中sku时切换收获地址，不调用BS combo接口，在选中sku的情况下切换收获地址，调用BS ‘item/stockAndPrice’接口获取sku级数据        
        $productDetail = $res['data'];
        $returnArr = array();
        $returnArr['stock'] = $productDetail['item']['stock'];
        $returnArr['currStock'] = $productDetail['item']['stock'];
        $returnArr['price'] = isset($productDetail['item']['price']) ? convert_price($productDetail['item']['price']) : 0;
        $returnArr['salePrice'] = isset($productDetail['item']['salePrice']) ? convert_price($productDetail['item']['salePrice']) : 0;
        $returnArr['skuHighestPrice'] = isset($productDetail['item']['skuHighestPrice']) ? convert_price($productDetail['item']['skuHighestPrice']) : 0;
        $returnArr['skuHighestSalePrice'] = isset($productDetail['item']['skuHighestSalePrice']) ? convert_price($productDetail['item']['skuHighestSalePrice']) : 0;
        $returnArr['priceShow'] = $returnArr['price'] < $returnArr['skuHighestPrice'] ? $returnArr['price'].'~'.$returnArr['skuHighestPrice'] : $returnArr['price'];
        $returnArr['salePriceShow'] = $returnArr['salePrice'] < $returnArr['skuHighestSalePrice'] ? $returnArr['salePrice'].'~'.$returnArr['skuHighestSalePrice'] : $returnArr['salePrice'];
        
        if($skuId)
        {
            foreach($productDetail['item']['skus'] as $val)
            {
                if($val['id'] = $skuId)
                {
                    $returnArr['currStock'] = $val['stock'];
                    $returnArr['priceShow'] = convert_price($val['price']);
                    $returnArr['salePriceShow'] = convert_price($val['salePrice']);
                    break;
                }
            }
        }
        */
    }
}
