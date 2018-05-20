<?php
namespace Passport\Controller;
use Home\Controller\BaseController;
class IndexController extends BaseController
{

	public function __construct()
	{
		parent::__construct();
	}
	
	public function index() {
		header("location:".$this->mx_domain['passport']."login");exit;
	}

	/*
	 * 验证码
	 * */
	public function code() {
		$setid = xss_clean( I('get.setid', '') );

		$arr = [ 'register', 'login', 'getpassword' ];
		if( !in_array( $setid, $arr ) ) $this->outJSON( 500 , '请求不存在.', '');

        $config = array(
			'fontSize' => 16,    // 验证码字体大小
			'imageW' =>  120,    // 验证码图片宽度
			'imageH' =>  30,     // 验证码图片高度
			'length' => 4,       // 验证码位数
			'useNoise' => false, // 关闭验证码杂点
			'useCurve' => false,
			'fontttf' => '6.ttf',
			'seKey' => C( 'ENCRYPT_COOKIE_KEY' ),
        );
        ob_clean();
        $verify = new \Think\Verify($config);
        $verify->entry( $setid );
    }
}
