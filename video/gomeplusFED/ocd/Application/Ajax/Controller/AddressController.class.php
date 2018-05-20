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
}
