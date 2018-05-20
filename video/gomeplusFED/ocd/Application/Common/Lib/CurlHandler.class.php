<?php
namespace Common\Lib;

class CurlHandler {
	private $curl;
	public $errno;
	public $errmsg;
	public $bs_version;
	public $bs_timeout=5;

	public function __construct($bs_version) {
		$this->curl = new Curl;
		$this->bs_version = $bs_version;
		if($this->bs_version===2){
			$this->curl->headers = array(
				'Content-Type'=>'application/json;charset=utf-8',
				'Accept'=>'application/json',
			);
		}
	}

	/**
	 * 设置超时时间
	 * @param int $timeout
	 */
	public function setTimeOut($timeout=5){
		$this->bs_timeout = $timeout;
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

	public function request($url, $param, $method='get') {
		$this->curl->options = array(
			'TIMEOUT'=>$this->bs_timeout,
		);
		if(stripos($url,'?')===false){
			$url = $url.'?traceId='.traceIdGen();
		}else{
			$url = $url.'&traceId='.traceIdGen();
		}
		$log['curl_url'] = $url;
		$log['curl_method'] = $method;
		$log['curl_time'] = microtime(true);


        //对上传图片处理
        if( isset( $param['boundary'] ) && !empty( $param['boundary'] )  ) {
            $log['curl_params'] = '';
            $this->curl->headers = array(
                'Content-Type' => 'multipart/form-data; boundary='.$param['boundary'],
                'Content-Length' => strlen($param['content'])
            );

            $param = $param['content'];
        } else {
            $log['curl_params'] = $param;
        }

		G('begin');
		$result = $this->curl->$method($url, $param);
		G('end');
		$log['curl_total_time'] = G('begin', 'end', 3);
		$log['curl_reponse'] = $result;
		$log['curl_status_code'] =$this->curl->http_code;
		$data = $this->parseResponse($log);
		// 接口超时或者接口返回值为空的情况
		if(! $data || $data == '' || $data == null)
		{
			$data['code'] = 504;
			$data['data'] = array();
			$data['message'] = '网络超时';
		}
		else
		{
			//通过code来判断是否V2接口，正确返回全部为200
			if(!isset($data['code'])){
				$data['code'] = $this->curl->http_code;
				//有详细的子错误码,直接使用子错误码
				if(isset($data['error']['code']) && !$data['error']['code']){
					$data['code'] = $data['error']['code'];
				}
				//有详细的子错误码信息,直接使用子错误信息
				if(isset($data['error']['message']) && !$data['error']['message']){
					$data['message'] = $data['error']['message'];
				}
			}elseif($data['code'] === 0){
				$data['code'] = 200;
			}
		}
		return output($data['code'],$data['message'],$data['data']);
	}
	
	private function parseResponse($log) {
		$log['curl_error_code'] = $this->curl->errno();
		$log['curl_error_msg'] = $this->curl->error();
		$log_type = \Think\Rsyslog::INFO;
		if(defined('FIREPHP_DEBUG_ON') || (isset($_GET['debug']) && $_GET['debug']==1)) // 开启firephp调试模式
		{
			$log_type = \Think\Rsyslog::DEBUG;
		}
		$data = json_decode($log['curl_reponse'], TRUE);
		if ((isset($log['curl_error_code']) && $log['curl_error_code']==500) || !$data) {
			$this->errno = '-1';
			$this->errmsg = isset($log['curl_error_msg']) ? $log['curl_error_msg'] : '';
			$log_type = \Think\Rsyslog::ERR;
		}
		if($this->bs_version===1){
			if($data['success']==false){
				$log['bs_return_result'] = $data;
				$log_type = \Think\Rsyslog::ERR;
			}
		}elseif($data['message']){
			$log['bs_return_result'] = $data;
			$log_type = \Think\Rsyslog::ERR;
		}
		//正常情况下，不记录返回结果data数组
		if($log_type == \Think\Rsyslog::INFO) {
			$log['curl_reponse'] = array();
		} elseif($log_type == \Think\Rsyslog::DEBUG)
		{
			//发送空DATA到firePHP;
			sendFirephp($log);
		}
		if($log['curl_error_code']){
			$log['errorInfo'] = $this->curl->errorinfo;
		}
		if( $this->bs_version == 2 ){
			//统一日志格式
			$log['curl_params'] = !is_array($log['curl_params']) ? json_decode($log['curl_params'],true) : '';
			//删除明文密码
			if(isset($log['curl_params']['password'])){
				unset($log['curl_params']['password']);
			}
			if(isset($log['curl_params']['newPassword'])){
				unset($log['curl_params']['newPassword']);
			}
		}
		//写日志
		\Think\Rsyslog::write($log, $log_type);
		return $data;
	}

}
