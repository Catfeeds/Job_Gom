<?php
namespace Common\Lib;

class CurlHandler {
	private $curl;
	public $errno;
	public $errmsg;
	public $bs_version;
	public $bs_timeout=5;

	/*
	 * 架构方法
	 * @by maoxiaoqi 2017.01.19 修改
	 * @param $bs_version 1=v1  2=v3  3=其他站(为了设置不必要的header)
	 * */
	public function __construct($bs_version = 3) {
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
		$this->curl->options = array(
			'TIMEOUT'=>$this->bs_timeout,
		);
		if(stripos($url,'?')===false){
			$url = $url.'?traceId='.traceIdGen();
		}else{
			$url = $url.'&traceId='.traceIdGen();
		}
		$log['log_master'] = 'api';
		$log['curl_start_time'] = microtime(true);
        //去除上传图片处理参数数据
        if(isset( $param['boundary'] ) && !empty( $param['boundary'] )) {
            $log['curl_params'] = '';
            $this->curl->headers = array(
                'Content-Type' => 'multipart/form-data; boundary='.$param['boundary'],
                'Content-Length' => strlen($param['content'])
            );
            $param = $param['content'];
        }
		//设置cookie
		$this->curl->cookie_param = $this->curl_cookie();
		//获取数据
		$result = $this->curl->$method($url, $param);
		//规范LOG日志格式
		$log['curl_end_time'] = microtime(true);
		$this->filter_password($param);
		$log['curl_consume_time'] = sprintf('%.4f', $log['curl_end_time']-$log['curl_start_time']);
		$log['curl_url'] = $url;
		$log['curl_param'] = $param;
		$log['curl_method'] = $method;
		$log['curl_simple_url'] = ( stripos($url,'?') ) ? current(explode('?',$url)) : $url ;
		$log['curl_http_code'] = $this->curl->http_code;
		$log['curl_errno'] = $this->curl->errno();
		$log['curl_error'] = $this->curl->error();
		$log['curl_reponse'] = $result;
		//如果是国美在线直接返回数据
		$gome_in = false;
		foreach( [ 'gome.com.cn', 'atguat.com.cn','access.ec.api'] as $iv ) {
			if( strstr( $url, $iv ) ){
				$gome_in = true;
				break;
			}
		}
		if($gome_in === true){
			return $result;
		}
		$data = $this->parseResponse($log);
		$this->handler_err_message($data);
		return output($data['code'],$data['message'],$data['data']) ;
	}

	/*
	 * 处理接口返回的相关信息
	 * */
	private function handler_err_message( &$data ) {

		//处理logintoken 失败,更换文案
		if( $data['code'] == '422' && strstr( $data['message'], 'loginToken不能为空' ) ) {
			$data['message'] = '您已在其他浏览器登录，若需更换此浏览器，请重新登录';
    	}

    }

	/**
	 * 解析curl_respone返回结果，写log
	 * @param $log
	 * @return mixed
	 */
	private function parseResponse($log) {
		$log_type = \Think\Rsyslog::INFO;
		// debug模式
		if((isset($_COOKIE['debug']) && $_COOKIE['debug']==1) || APP_DEBUG==true){
			$log_type = \Think\Rsyslog::DEBUG;
		}
		$data = json_decode($log['curl_reponse'], TRUE);
		// 定义严重错误等级
		if(! $data || $data == '' || $data == null) {
			$log_type = \Think\Rsyslog::ERR;
		}
		if($this->bs_version===1){
			if($data['success']==false){
				$log_type = \Think\Rsyslog::ERR;
			}
		}elseif($data['message']){
			$log_type = \Think\Rsyslog::ERR;
		}
		//正常情况下忽略返回信息记录
		if($log_type == \Think\Rsyslog::INFO) {
			$log['curl_reponse'] = array();
		}
		if($log_type==\Think\Rsyslog::ERR || $log_type==\Think\Rsyslog::DEBUG){
			$log['errorInfo'] = $this->curl->errorinfo;
		}
		//格式化输出
		$format_data = array();
		$format_data['message'] = '';
		// 接口超时或者接口返回值为空的情况
		if(! $data || $data == '' || $data == null)
		{
			$format_data['code'] = $this->curl->http_code;
			$format_data['data'] = array();
			$format_data['message'] = '数据为空';
			if($log['curl_consume_time']>4.9){
				$format_data['code'] = 504;
				$format_data['message'] = '网络超时';
			}
		}
		else
		{
			//通过code来判断是否V2接口，正确返回全部为200
			if(!isset($data['code'])){
				$format_data['code'] = $this->curl->http_code;
				$format_data['message'] = $data['message'];
				//有详细的子错误码,直接使用子错误码
				if(isset($data['error']['code']) && !$data['error']['code']){
					$format_data['code'] = $data['error']['code'];
				}
				//有详细的子错误码信息,直接使用子错误信息
				if(isset($data['error']['message']) && !$data['error']['message']){
					$format_data['message'] = $data['error']['message'];
				}
			}elseif($data['code'] === 0){
				$format_data['code'] = 200;
			}
		}
		isset($format_data['code']) ? $log['code'] = $format_data['code'] : '';
		isset($format_data['message']) ? $log['message'] = $format_data['message'] : '';

		$format_data['data'] = isset($data['data']) ? $data['data'] : '';
		//写日志
		\Think\Rsyslog::write($log, $log_type);
		return $format_data;
	}

	/**
	 * 过滤接口参数中的明文密码
	 * @param $param
	 */
	private function filter_password(&$param){
		if( $this->bs_version == 2 ){
			$param = !is_array($param) ? json_decode($param,true) : $param;
			//删除明文密码
			if(isset($param['password'])){
				unset($param['password']);
			}
			if(isset($param['newPassword'])){
				unset($param['newPassword']);
			}
		}
	}

}
