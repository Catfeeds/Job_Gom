<?php
namespace Common\Lib;

class CmsCurl {
	private $curl;
	public $errno;
	public $errmsg;
	public $bs_version;
	public $timeout=5;

	/*
	 * 构造方法
	 * */
	public function __construct() {
		$this->curl = new Curl;
	}
	
	public function get($url, $param) {
		return $this->request($url, $param, 'get');
	}
	
	public function post($url, $param) {
		return $this->request($url, $param, 'post');
	}

    public function del($url, $param) {
        return $this->request($url, $param, 'delete');
	}

	public function put($url, $param) {
		return $this->request($url, $param, 'put');
	}

	/*
	 * curl设置COOKIE
	 * @by maoxiaoqi
	 * */
	private function curl_cookie(){
		if( empty( $_COOKIE ) ) return false;

		$arr = [];
		foreach( $_COOKIE as $k => $v ) {
			$arr[] = $k.'='.urlencode( $v );
		}
		$str = implode( $arr, '; ' );
        $str .= C('GOME')['API_PARAMS']['COOKIE'];

		return ( $str ) ? $str : '' ;
	}

	public function request($url, $param, $method='get') {

		//设置超时时间
		$this->curl->options = array(
			'TIMEOUT'=>$this->timeout,
		);

		//设置cookie
		$this->curl->cookie_param = $this->curl_cookie();

		$log['log_master'] = 'api';
		$log['curl_start_time'] = microtime(true);

		//获取数据
		$result = $this->curl->$method($url, $param);

		//规范LOG日志格式
		$log['curl_end_time'] = microtime(true);
		$log['curl_consume_time'] = sprintf('%.4f', $log['curl_end_time']-$log['curl_start_time']);
		$log['curl_url'] = $url;
		$log['curl_param'] = $param;
		$log['curl_method'] = $method;
		$log['curl_simple_url'] = ( stripos($url,'?') ) ? current(explode('?',$url)) : $url ;
		$log['curl_http_code'] = $this->curl->http_code;
		$log['curl_errno'] = $this->curl->errno();
		$log['curl_error'] = $this->curl->error();
		$log['curl_reponse'] = $result;

		//获取失败记录日志
		if($log['curl_http_code'] != 200){
			writeErrorLog(json_encode($log));
		}
		return json_decode($result,true);
	}
}
