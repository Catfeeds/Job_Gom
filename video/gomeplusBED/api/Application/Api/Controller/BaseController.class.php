<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：BaseController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：基类                                                      |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Api\Controller;
use Think\Controller;
use Common\Lib\CurlHandler;

class BaseController extends Controller
{
	public $userId = 0;
	public $token = '';
    public $nickName = '';
	public $mx_domain = array();
	public $userInfo = array();

	public function __construct()
	{

		parent::__construct();

		$this->userId = isset($_COOKIE['SSO_USER_ID']) ? $_COOKIE['SSO_USER_ID'] : 0;

		//获取国美在线用户信息 并对接Plus登录相关
		$uri = 'dist';
		//不是生产环境，就可以随便更改版本号
		if(APP_STATUS !== 'pro'){
			$this->update_version();
		}
		//前端调用
		$jspath = C('STATICPATH.JS');
		$csspath = C('STATICPATH.CSS');
		$imgpath = C('STATICPATH.IMG');
		$this->mx_domain = [
			'group' => '//'.C('GROUP_URL'),
			'i' => '//'.C('UCENTER_URL'),
		];
		$this->assign('mx_domain',$this->mx_domain);

		// 前端url
		$this->assign('pcimgpath', APP_HTTP.$imgpath.$uri);
		// 当前用户userId
		$this->assign('userId', $this->userId);
		// js公共地址
		$this->assign('pcjspath', '//'.$jspath);
	}

	/*
	 * 支持在线  @by maoxiaoqi
	 * 检查token
	 * */
	public function checkToken() {
		// cookie未过期，检查token
		if($this->userId) {
			$this->token = authcode(cookie('scn_token'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
//			$this->token = session("token_".$this->userId);
			$param['userId'] = intval($this->userId);
			$param['loginToken'] = $this->token;
			$tokenObj = D('Home/Token');
			$tokenData = $tokenObj->postData($tokenObj->loginTokenCheckAction, $param);
			$result = isset($tokenData['data']['result']) ? $tokenData['data']['result'] : false;
			if(isset($tokenData['success']) && ($result === false || $tokenData['success'] === false)) {
				cookie('userId', null);
				cookie('nickName', null);
				cookie('userInfo', null);
				cookie('gome_id', null);
				cookie('gomeplusid', null);
				cookie('scn_token', null);
				$this->userId = 0;
				$this->assign('alertIsLogin', 1);
			}
//			$this->nickName = $this->user_infos['nickName'] ? $this->user_infos['nickName'] : authcode(cookie('nickName'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
			$this->nickName = $this->user_infos['nickName'];
		}
	}

	public function _empty() {
  		exit('404 Not Found');
 	}

	/**
	 * JSON输出 统一结构封装output
	 * @param  int $code 错误码
	 * @param  string $msg 说明
	 * @param  string $data 数据
	 * @return json
	 */
	public function outJSON( $code, $msg, $data = '' ) {
		if( empty($code) ) exit("param error.");
		$this->response( output( $code, $msg, $data ) );
	}

	/**
	 * ajax错误判断返回
	 * @param $code 错误码
	 */
	public function outError($code){
		if($code<1) exit("param error.");
		$this->response(output($code,\Think\ErrorCode::getErrMsg($code)));
	}

	public function response( $data ){
		header('Content-Type:application/json; charset=utf-8');
		//pro 检测refer
		$check_refer = true;
		if($_SERVER['ENVIRONMENT'] == 'pro'){
			if(!isset($_SERVER['HTTP_REFERER'])){
				$this->outError(0);
			}
			$check_refer = isTrustedDomain($_SERVER['HTTP_REFERER']);
        }
		if($check_refer === true){
			exit(json_encode( $data ));
		}else{
			$this->outError(0);
		}

	}

	/**
	 * 更改js、css版本
	 */
	private function update_version(){
		$index_path = $_SERVER['DOCUMENT_ROOT'].'/index.php';
		if(isset($_GET['update_version'])){
			S('update_version',$_GET['update_version'],86400);
		}
		if(S('update_version')){
			$update_version = S('update_version');
		}else{
			$update_version = filemtime($index_path);
		}
		C('CSS_VERSION',$update_version);
		C('JS_VERSION',$update_version);
	}



	/**
	 * JSONP请求输入
	 * @param String $jsonStr
	 */
	public function responseJson( $jsonStr ){
        header('Access-Control-Allow-Origin:.gomeplus.com');
        header('Content-Type:application/json; charset=utf-8');
        exit($jsonStr);
	}

    /**
     * 成功时候返回
     * @access protected
     * @param mixed $data 要返回的数据
     * @param String $type AJAX返回数据格式
     * @param int $json_option 传递给json_encode的option参数
     * @return void
     */
    protected function ajaxSuccess($data, $type = '', $option = 0)
    {
        $this->ajaxReturn([
            'success' => true,
            'code'    => 200,
            'message' => 'ok',
            'data'    => $data
        ], $type, $option);
    }

    /**
     * 失败时候返回
     * @access protected
     * @param mixed $data 要返回的数据
     * @param String $type AJAX返回数据格式
     * @param int $json_option 传递给json_encode的option参数
     * @return void
     */
    protected function ajaxError($msg, $type = '', $option = 0)
    {
        $this->ajaxReturn([
            'success' => false,
            'code'    => 1,
            'message' => $msg,
            'data'    => new \stdClass()
        ], $type, $option);
    }

	/**
	 * 显示错误页面
	 * @param string $title 页面Title
	 * @param string $message Message
	 * @param string $images 页面要显示的图片
	 */
	protected function _displayErrorPage($title='',$message='',$images='',$tpl=''){
	    
	    $this->assign( 'title', !empty($title) ? $title : '抱歉！服务器君正在打盹' );
	    $this->assign( 'message', !empty($message) ? $message : '抱歉！服务器君正在打盹' );
	    $this->assign( 'images', !empty($images) ? $images : '/images/public/404-2.png' );
	    $this->display(!empty($tpl) ? $tpl : "Public:error_code");
	    exit;
	}

}




