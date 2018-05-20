<?php

namespace Services\Service;

use Home\Service\GomeService;

class ProductService extends GomeService {

    /*
     * 构造
     * */
	public function __construct() {
		parent::__construct();
	}

    /**
     * 批量获取商品价格
     * @param $productIds 商品ID ID之间以逗号隔开
     * @return array
     */
	public function get_products_price($productIds){
	    if(empty($productIds)) return [];
	    $ids_arr = explode(',',$productIds);
	    $ids = '';
        $addr_arr = getAddrGome();
        foreach ($ids_arr as $id) {
            if(!empty($ids)){
                $ids .=",";
            }
            if(strpos($id, '|')){
                $ids .= str_replace("|","_",$id)."_".$addr_arr['cityId'];
            }else{
                $ids .= $id."__".$addr_arr['cityId'];
            }
	    }
        $ids = str_replace('_0_','__',$ids);
//	    echo $ids;exit;
        //更换新接口  by:maoxiaoqi 在线接口由:周天挺提供
        $url =  C('GOME')['SERVICE']['ACCESS'].'v3/pro/info';
        $url .= '?id='.$ids;
	    $data = $this->getData($url);
	    return $data;

    }
    /*
     * 析构
     * */
    public function __destruct() {

    }
}
