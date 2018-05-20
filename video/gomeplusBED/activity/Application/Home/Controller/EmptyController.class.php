<?php
namespace Home\Controller;
use Home\Controller\BaseController;
class EmptyController extends BaseController {

	public function _empty() {
//		header("HTTP/1.0 404 Not Found");//使HTTP返回404状态码
		$this->display("Home@Public:404");
	}

	public function index() {
//		header("HTTP/1.0 404 Not Found");
		$this->display('Home@Public:404');
	}

	/*
	 * crossdomain跨域问题
	 * */
	public function crossdomain() {
		header( 'Content-Type:text/xml;charset=utf-8 ');
		$data =<<<EOF
<?xml version="1.0"?>
<cross-domain-policy>
	<allow-access-from domain="*" />
</cross-domain-policy>
EOF;
		echo $data;

	}
}


