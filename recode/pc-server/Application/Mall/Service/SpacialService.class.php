<?php
/*
 * 专题相关接口
 *
 * @author maoxiaoqi
 **/
 
namespace Mall\Service;
use Home\Service\BaseService;

class SpacialService extends BaseService
{
	public $key = 'SpacialService';
	public $param = array();
	protected $bs_version = 2;
	//21.pc专题活动模板_ext
	//http://wiki.intra.gomeplus.com/pages/viewpage.action?pageId=22676013
	public $model1 = 'ext/peapod/pcSpecialActivity/model1';	//数据1
    public $model2 = 'ext/peapod/pcSpecialActivity/model2';//数据2
}
