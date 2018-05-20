<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：BaseService.class.php                                     |
 * +----------------------------------------------------------------------+
 * | @程序功能：基类Service                                               |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-29 10:56:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Home\Service;
use Think\Rsyslog;
use Common\Lib\CurlHandler;
use Common\Lib\encryptHelper;
class GomeService
{
	public $publicParam = array();

	/**
	 * 构造方法
	 *
	 */
	public function __construct()
	{
		$this->_curlHandler = new CurlHandler();
	}

	/**
	 * get请求在线接口
	 * 
	 */
	public function getData($url = '', $param = array() ,$areaCode=false, $callback='')
	{
        if($areaCode){
            $addr_arr = getAddrGome();
            $this->publicParam['areaCode'] = $addr_arr['cityId'];
        }
		$data = false;
		if($data == false)
		{
			$mergeParam = array_merge($this->publicParam, $param);
			$paramUri = joinParam($mergeParam);
			if(!empty($paramUri))
			{
				if(strpos($url, '?') === false)
				{
					$url = $url . '?' . $paramUri;
				}
				else
				{
					$url = $url . '&' . $paramUri;
				}
			}
//			echo $url;
            $data = $this->_curlHandler->request($url,array(),'get');
//            print_r($data);exit;
            if($callback){
                return $this->_analyzeOnline($data);
            }
            return $data;

		}
		unset($data['errorinfo']);
		return $data;
	}
    function _analyzeOnline($jsonStr = '', $callback = '')
    {
        if(empty($jsonStr))
        {
            return array();
        }

        if(empty($callback))
        {
            return json_decode($jsonStr, true);
        }

        return json_decode(substr($jsonStr, strlen($callback) + 1, -1), true);
    }

}

