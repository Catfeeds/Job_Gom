<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IdentifyCodeService.class.php                            |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-23 18:44:38 CST                           		     |
 * +----------------------------------------------------------------------+
 */
 
 
namespace Passport\Service;
use Home\Service\BaseService;
class CaptchaService extends BaseService
{
	public $uri = 'user/get_check_image.json';

	/**
	 * 构造方法
	 *
	 */
	public function __construct()
	{
		parent::__construct();
		$this->publicParam['devId'] = session_id();
	}



	/**
	 * get请求接口
	 * 
	 */
	public function getData($uri)
	{
		ob_clean();
		header("Content-type: image/png");
		$this->publicParam = joinParam($this->publicParam);
		$url = $this->domain.$uri.'?'.$this->publicParam;
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 0);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); 
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		$data = curl_exec($curl);
		curl_close($curl);
		return $data;
	}




}
