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
class BaseService
{
	const BS_API_RETRY_EXPRIE = 300;
	private $_curlHandler= '';
	// 接口定义
	public $domain = '';
	public $userId = 0;
	public $token = 0; // 登录返回的token
	public $debug = false; // 是否开启debug模式
	protected $bs_version = 1;
	public $publicParam = array(
		'userId' => 0,
		'clientOs' => 5,
		'clientOsVersion' => '4.3',
		'appType' => 1,
		'appVersion' => '1.0.4',
		'mac' => 'ac+as+23+3d',
		'devId' => 0,
		'otherDevInfo' => 'someInfo',
		'pubPlat' => '0150101093000000',
	);
	public $publicParamv2 = array(
		'userId' => 0, // 当使用loginToken的时候，必须同时传递userId
		'loginToken' => '', // 用于标示用户登录状态
		'accessToken' => '', // 用于服务认证
		'appVersion' => '1.0.5', // app 版本号
		'device' => '3/1.0.0/pc/0', // 操作系统／版本号／机型／原devId
		'app' => '005/0150101093000000', // from值统计
		'net' => '4G', // 网络类型
		'traceId' => '', // 日志追踪代码
		'jsonp' => '', // 使用jsonp时的回调函数名称
	);


	/**
	 * 构造方法
	 *
	 */
	public function __construct()
	{
		$this->domain = ($this->bs_version==1) ? C('SERVICE.DOMAIN') : C('SERVICE.DOMAIN_V2');
		$this->userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$this->token = session("token_".$this->userId);
		if($this->bs_version == 1){
			$this->publicParam['devId'] = session_id(); // 使用sessionID作为唯一标示
			$this->publicParam['userId'] = intval($this->userId);
		}else{
			$this->publicParamv2['userId'] = $this->userId ? intval($this->userId) : 0;
			$this->publicParamv2['device'] .= session_id();
			$this->publicParamv2['loginToken'] = session('token_'.$this->userId) ? session('token_'.$this->userId) : '';
		}
		$this->_curlHandler = new CurlHandler($this->bs_version);
		// 判断是否开启firephp
		if(I('param.debug') == true || cookie('debug'))
		{
			$this->debug = true;
		}
	}

	/**
	 * get请求接口(支持BSv1,v2)
	 * 
	 */
	public function getData($uri = '', $param = array(), $openCache = false, $expire = 60)
	{
		$data = false;
		$this->key = md5($uri.'|'.implode('|', $param));
		if($openCache == true)
		{
			$data = S($this->key);
		}
		if($data == false)
		{
			$publicParam = ($this->bs_version==1) ? $this->publicParam : $this->publicParamv2;
			$mergeParam = array_merge($publicParam, $param);
			$paramUri = joinParam($mergeParam);
			$data = $this->_curlHandler->request($this->domain.$uri.'?'.$paramUri,array(),'get');
			// error redo
			$retry_times_key = $this->key.'_try_times';
			if($data['code'] == 504 && !S($retry_times_key))
			{
				S($retry_times_key,1,self::BS_API_RETRY_EXPRIE);
				$data = $this->_curlHandler->request($this->domain.$uri.'?'.$paramUri,array(),'get');
			}
			$data = xss_clean_recursive($data);
			if($openCache == true)
			{
				S($this->key, $data, $expire);
			}
		}
		unset($data['errorinfo']);
		return $data;
	}

	/**
	 * post请求接口(支持BSv1,v2)
	 *
	 */
	public function postData($uri = '', $param = array())
	{
		if(is_array($param)){
			$param['user_id'] = $this->userId;
			$mergeParam = array_merge($this->publicParam, $param);
		}
		if($this->bs_version == 2){
			$publicParamv2 = joinParam($this->publicParamv2);
			if(is_array($param)){
				$param = json_encode($param);
			}
			$data = $this->_curlHandler->request($this->domain.$uri.'?'.$publicParamv2,$param,'post');
		}else{
			$data = $this->_curlHandler->request($this->domain.$uri,$mergeParam,'post');
		}
		return xss_clean_recursive($data);
	}

    /**
	 * post Upload Data请求接口(目前支持V1 上传图片)
	 *
	 */
	public function postUploadData($uri = '', $vars= '') {
        $uri .= "?".joinParam( $this->publicParam );
        $data = $this->_curlHandler->request($this->domain.$uri,$vars,'post');
		return $data;
	}

	/**
	 * delete请求接口(支持BSv1,v2)(支持BSv1,v2)
	 *
	 */
	public function deleteData($uri = '', $param = array())
	{
		$publicParam = ($this->bs_version==1) ? $this->publicParam : $this->publicParamv2;
		$mergeParam = array_merge($publicParam, $param);
		$paramUri = joinParam($mergeParam);
		$data = $this->_curlHandler->del($this->domain.$uri.'?'.$paramUri,array());
		return $data;
	}


    /**
     * put请求接口(支持BSv1,v2)(支持BSv1,v2)
     *
     */
    public function putData($uri = '', $param = array())
    {

        $publicParam = ($this->bs_version==1) ? $this->publicParam : $this->publicParamv2;
        $paramUri = joinParam($publicParam);
        if( $this->bs_version == 2 ) $param = json_encode($param);

        $data = $this->_curlHandler->put($this->domain.$uri.'?'.$paramUri,$param);
        return $data;
    }

	/**
	 * 设置curl参数超时时间
	 * @param $timeout
	 */
	public function setTimeOut($timeout=5){
		$this->_curlHandler->setTimeOut($timeout);
	}

}

