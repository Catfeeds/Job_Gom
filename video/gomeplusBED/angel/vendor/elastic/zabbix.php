<?php
/*
 * php zabbix服务 
 * by: maoxiaoqi  17.03.14
 * */
namespace elastic;

class zabbix {
    //默认jsonrpc uri
    protected $rpc_uri = "http://10.125.136.40/zabbix/api_jsonrpc.php";

	//rpc 版本号
	protected $version = '2.0';

	//zabbix 账户密码
	protected $admin = [ "user" => 'icread', 'pwd' => 'icread' ];

    //令牌
    protected $auth = null;

	/*
	 * 构造方法
	 * @param $uri rpc地址 
	 * @return void
	 * */
    public function __construct( $uri = '' ) {
		$this->rpc_uri = ( empty( $uri ) ) ? $this->rpc_uri : $uri ;

        $this->auth = ( cookie( 'zabbix_auth' ) ) ? authcode( cookie( 'zabbix_auth' ), 'DECODE', config( 'zabbix_key' ) ) : $this->login() ;
    }

	/*
	 * 登陆 获得登陆令牌
	 * @return void
	 * */
	public function login() {
		$data = [];
		$data['method'] = 'user.login';
		$data['params']['user'] = $this->admin['user'];
		$data['params']['password'] = $this->admin['pwd'];
		$data['auth'] = null;

		$res = $this->request( $this->rpc_uri, $data );
		$auth = ( isset( $res['result'] ) ) ? $res['result'] : die( 'zabbix 登陆失败' ) ;

		cookie( 'zabbix_auth', authcode( $auth, 'ENCODE', config( 'zabbix_key' ) ) );

        return $auth;
	}
	
	/*
	 * API接口请求
	 * @param $doc 接口文档 数组
	 * @return []
	 * */
	public function api( $doc ) {
        //令牌
        $doc['auth']= $this->auth;
		$data = $this->request( $this->rpc_uri, $doc );
        return ( isset( $data['result'] ) && !empty( $data['result'] ) ) ? $data['result'] : [] ;
	}

	/*
	 * CURL 请求
	 * @param $uri string URI
	 * @param $doc 数组 
	 * @param $method 请求方式 GET POST
	 * @return json
	 * */
    protected function request( $uri, $doc, $method= 'POST' ) {
		if( empty( $uri ) || empty( $doc ) ) return false;

		$doc['jsonrpc'] = $this->version;
		$doc['id'] = rand( 1, 100 );

        $ci = curl_init();
		curl_setopt( $ci, CURLOPT_URL, $uri);
		//curl_setopt( $ci, CURLOPT_PORT, $port);
		curl_setopt( $ci, CURLOPT_TIMEOUT, 200);
		curl_setopt( $ci, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt( $ci, CURLOPT_FORBID_REUSE, 0);
		curl_setopt( $ci, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt( $ci, CURLOPT_POSTFIELDS, json_encode( $doc ) );
		curl_setopt( $ci, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
		$result = curl_exec($ci);
		curl_close( $ci );

		return ( $result ) ? json_decode( $result, 1 ) : [] ;
    }

}
