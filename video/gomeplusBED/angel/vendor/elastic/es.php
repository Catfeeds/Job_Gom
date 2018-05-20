<?php
/*
 * php es
 * by: maoxiaoqi  17.03.14
 * */
namespace elastic;

class es {
    //默认host
    protected $host = "127.0.0.1";

	//默认port
	protected $port = 9200;

	/*
	 * 构造方法
	 * @param host [] ['host'=>'127.0.0.1','port':9200]
	 * @return void
	 * */
    public function __construct( $host = [] ) {
		$this->host = ( isset( $host['host'] ) ) ? $host['host'] : $this->host ;
		$this->port = ( isset( $host['port'] ) ) ? $host['port'] : $this->port;
    }

	/*
	 * 搜索 _search
	 * @param $path string index/type
	 * @param $doc json JSON条件
	 * @return []
	 * */
	public function search( $path, $doc ) {
		$path = $path.'/_search';
		$data = $this->request( $this->get_uri( $path ), $this->port, $doc, 'POST' );
		return $this->response_arr( $data );
	}

	/*
	 * json 转换为数组
	 * @param $data json JSON数据
	 * @return []
	 * */
	public function response_arr( $data ) {
		if( empty( $data ) ) return false;

		return json_decode( $data, 1 );
	}

	/*
	 * 获取全路径
	 * @param $path string 路径 例如 索引/文档类型/关键字
	 * @return string
	 * */
	private function get_uri( $path = '' ) {
		return 'http://'.$this->host.'/'.$path;
	}

	/*
	 * CURL 请求
	 * @param $uri string URI
	 * @param $port int 端口号
	 * @param $doc JSON文档
	 * @param $method 请求方式 默认get,如发JSON 使用POST
	 * @return json
	 * */
    protected function request( $uri, $port = 9200, $doc, $method= 'GET' ) {
		if( empty( $uri ) ) return false;

        $ci = curl_init();
		curl_setopt( $ci, CURLOPT_URL, $uri);
		curl_setopt( $ci, CURLOPT_PORT, $port);
		curl_setopt( $ci, CURLOPT_TIMEOUT, 200);
		curl_setopt( $ci, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt( $ci, CURLOPT_FORBID_REUSE, 0);
		curl_setopt( $ci, CURLOPT_CUSTOMREQUEST, $method);
//		if( $method == 'POST' ) curl_setopt( $ci, CURLOPT_POSTFIELDS, $doc);
		curl_setopt( $ci, CURLOPT_POSTFIELDS, $doc);
		$result = curl_exec($ci);
		curl_close( $ci );

		return $result;
    }

}
