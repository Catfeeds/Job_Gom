<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                     
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                  
 * +----------------------------------------------------------------------+
 * | @程序名称：Custom.class.php                                          
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                           
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@yolo24.com>                            
 * +----------------------------------------------------------------------+
 * | Date:2016-04-07 11:50:36 CST                            
 * +----------------------------------------------------------------------+
 */
namespace Think\Log\Driver;

class Rsyslog {

	//日志配置
	protected $config  =   array(
			//'log_time_format'   =>  ' c ',
			'log_file_size'     =>  2097152,
			'log_path'          =>  '',
			);

	// 日志参数
	protected $params  =  array(
			'log_project_name'  => 'wap',   // 项目名称
			'log_type'          => 'error', // 信息类型 error/debug/info/notice
			'log_method'        => 'http',  // 日志上传方式 file/http/redis/tcp
			'log_lbs_ip'        => '',      // 负载均衡ip
			'log_client_ip'     => '',      // 客户端ip
			'log_client_port'   => '',      // 客户端端口
			'log_server_ip'     => '',      // 服务端ip
			'log_server_port'   => '',      // 服务端端口
			//'log_nginx_num'		=> '',		// 对应nginx编号
			'log_referer'       => '',      // 上个页面
			'log_request_time'  => '',      // 请求时间
			'log_request_url'   => '',      // 请求url
			'log_request_method'=> '',      // 请求方式get post
			'log_request_param' => '',      // 请求参数
			'log_user_agent'    => '',      // User-Agent
			'log_cookie'        => '',      // cookie
			'log_session_id'    => '',      // session_id
			'log_user_id'       => '',      // 用户id
			'log_message'       => '',      // 全部信息
			);

	// 实例化并传入参数
	public function __construct($config=array()){
		$this->params['log_lbs_ip'] = $_SERVER['REMOTE_ADDR'];
		$this->params['log_client_ip'] = get_client_ip(0, true);
		$this->params['log_client_port'] = $_SERVER['REMOTE_PORT'];
		$this->params['log_server_ip'] = $_SERVER['SERVER_ADDR'];
		$this->params['log_server_port'] = $_SERVER['SERVER_PORT'];
		//$this->params['log_nginx_num'] = isset($_SERVER['Server-ID']) ? $_SERVER['Server-ID'] : 'no pro';
		$this->params['log_referer'] = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
		$this->params['log_request_time'] = date('Y-m-d H:i:s');
		$this->params['log_request_url'] = (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) == "https" ? 'https://' : 'http://') . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
		$this->params['log_request_method'] = $_SERVER['REQUEST_METHOD'];
		$this->params['log_request_param'] = $_SERVER['REQUEST_METHOD'] == 'POST' ? $_POST : $_GET;
		$this->params['log_user_agent'] = $_SERVER['HTTP_USER_AGENT'];
		$this->params['log_cookie'] = $_COOKIE;
		$this->params['log_session_id'] = $_COOKIE['mx_wap_gomeplusid'];
		$this->params['log_user_id'] = $this->authcode($_COOKIE['mx_wap_userId'], 'DECODE', 'hf!a^s6&*@$f7_)@#34r(t3'); // 解密

		$this->config   =   array_merge($this->config, $config);
	}

	/**
	 * 日志写入接口
	 * @access public
	 * @param array $log 日志信息
	 * @param string $destination  写入目标
	 * @return void
	 */
	public function write($log, $destination='') {
		//$now = date($this->config['log_time_format']);
		if(empty($destination)){
			//$destination = $this->config['log_path'].date('Y').'/'.date('m').'/'.date('d').'.log';
            $destination = $this->config['log_path'].date('y_m_d').'.log';
		}
		// 自动创建日志目录
		$log_dir = dirname($destination);
		if (!is_dir($log_dir)) {
			mkdir($log_dir, 0755, true);
		}
		//检测日志文件大小，超过配置大小则备份日志文件重新生成
		if(is_file($destination) && floor($this->config['log_file_size']) <= filesize($destination) ){
			rename($destination,dirname($destination).'/'.time().'-'.basename($destination));
		}
		$this->params['log_message'] = $log;
		error_log("@cee: ".json_encode($this->params, JSON_UNESCAPED_UNICODE)."\n", 3, $destination);
	}

	/**
	 * $string： 明文 或 密文
	 * $operation：DECODE表示解密,其它表示加密
	 * $key： 密匙
	 * $expiry：密文有效期
	 */
	private function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
	{
		// 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙
		$ckey_length = 4;
		// 密匙
		$key = md5($key ? $key : C('AU_KEY'));
		// 密匙a会参与加解密
		$keya = md5(substr($key, 0, 16));
		// 密匙b会用来做数据完整性验证
		$keyb = md5(substr($key, 16, 16));
		// 密匙c用于变化生成的密文
		$keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';
		// 参与运算的密匙
		$cryptkey = $keya.md5($keya.$keyc);
		$key_length = strlen($cryptkey);
		// 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，解密时会通过这个密匙验证数据完整性
		// 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确
		$string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
		$string_length = strlen($string);
		$result = '';
		$box = range(0, 255);
		$rndkey = array();
		// 产生密匙簿
		for($i = 0; $i <= 255; $i++)
		{
			$rndkey[$i] = ord($cryptkey[$i % $key_length]);
		}
		// 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
		for($j = $i = 0; $i < 256; $i++)
		{
			$j = ($j + $box[$i] + $rndkey[$i]) % 256;
			$tmp = $box[$i];
			$box[$i] = $box[$j];
			$box[$j] = $tmp;
		}
		// 核心加解密部分
		for($a = $j = $i = 0; $i < $string_length; $i++)
		{
			$a = ($a + 1) % 256;
			$j = ($j + $box[$a]) % 256;
			$tmp = $box[$a];
			$box[$a] = $box[$j];
			$box[$j] = $tmp;
			// 从密匙簿得出密匙进行异或，再转成字符
			$result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
		}
		if($operation == 'DECODE')
		{
			// substr($result, 0, 10) == 0 验证数据有效性
			// substr($result, 0, 10) - time() > 0 验证数据有效性
			// substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16) 验证数据完整性
			// 验证数据有效性，请看未加密明文的格式
			if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16))
			{
				return substr($result, 26);
			}
			else
			{
				return '';
			}
		}
		else
		{
			// 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因
			// 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码
			return $keyc.str_replace('=', '', base64_encode($result));
		}
	}




}
