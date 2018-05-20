<?php
namespace Ajax\Service;
use Home\Service\BaseService;

class LoginService extends BaseService
{
	public $key = 'LoginService';
	public $param = array();
    public $uri = 'user/login.json';
    public $captcha_uri = 'user/get_check_image.json';

	/**
	 * 构造方法
	 *
	 */
	public function __construct() {
		parent::__construct();
		$this->domain = C('SERVICE.DOMAIN');
		$this->userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$this->publicParam['userId'] = $this->userId;
		$this->token = session("token_".$this->userId);
		$this->publicParam['devId'] = session_id();
	}

    /**
	 * get请求接口
	 */
	public function get_png($uri) {
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


	/**
     *-------------------------------------------------------------------------
     * @title：生成唯一的ssid，供PC端扫码登录使用
     * @action：/login/genSsid
     *-------------------------------------------------------------------------
     */
	public function genSsid($prefix = '')
	{
		$str = md5(uniqid(mt_rand(), true));
		$ssid  = substr($str, 0, 8).'-';
		$ssid .= substr($str, 8, 4).'-';
		$ssid .= substr($str, 12, 4).'-';
		$ssid .= substr($str, 16, 4).'-';
		$ssid .= substr($str, 20, 12);
		$ssid = str_replace('=', '', base64_encode($ssid));
		return $prefix.$ssid;
	}



}
