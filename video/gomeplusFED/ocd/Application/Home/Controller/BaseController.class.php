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
namespace Home\Controller;
use Think\Controller;
use Think\Crypt\Driver\Think;

class BaseController extends Controller
{
	public $userId = 0;
	public $token = '';
    public $nickName = '';
	public $mx_domain = array();

	public function __construct()
	{

		parent::__construct();

		// 前端调试使用
		$uri = 'dist';
		if(APP_STATUS == 'pre'){
			$this->update_version();
		}
		if(APP_STATUS == 'test' || APP_STATUS == 'dev'){
			$this->update_version();
			$uri = 'src';
		}
		if( isset($_GET['js_debug']) && $_GET['js_debug']===true){
			$uri = 'src';
		}
		//前端调用
		$jspath = C('STATICPATH.JS');
		$csspath = C('STATICPATH.CSS');
		$imgpath = C('STATICPATH.IMG');
		$this->mx_domain = [
			'main' => APP_HTTP.C('MAIN_URL'),
			'passport' => APP_HTTP.C('PASSPORT_URL'),
			'order' => APP_HTTP.C('ORDER_URL'),
			'group' => APP_HTTP.C('GROUP_URL'),
			'i' => APP_HTTP.C('UCENTER_URL'),
			'mall' => APP_HTTP.C('MALL_URL')
		];
		// 初始化
		$this->assign('alertIsLogin', 0);

		// 获取用户信息
		$this->checkLogin();

		// 检查登录用户token
		$this->checkToken();

        //检查是否为手机端 适配M站
        $this->switch_mobile();

		//跨站token
		$this->csrf();

		
		// 检测白名单
		//$this->whiteList();
		//意见反馈开关
		$this->assign('feed_btn_status',1);
		//显示cookie前缀
		$this->assign('cookie_prefix',C('COOKIE_PREFIX'));

		// 当前用户userId
		$this->assign('userId', $this->userId);
		$this->assign('nickName',$this->nickName);

		// 当前url
		$this->assign('current_url', base64_encode(curPageURL()));
		$this->assign('pcjspath', APP_HTTP.$jspath.$uri);
		$this->assign('pccsspath', APP_HTTP.$csspath.$uri);
		$this->assign('pcimgpath', APP_HTTP.$imgpath.$uri);
		//前端域名调用
		$this->assign('js_domain', APP_HTTP.C('STATICPATH.JS_DOMAIN'));
		$this->assign('main_domain', APP_HTTP.C('MAIN_URL'));
		$this->assign('passport_domain', APP_HTTP.C('PASSPORT_URL'));
		$this->assign('order_domain', APP_HTTP.C('ORDER_URL'));
		$this->assign('group_domain', APP_HTTP.C('GROUP_URL'));
		$this->assign('i_domain', APP_HTTP.C('UCENTER_URL'));
		$this->assign('mall_domain', APP_HTTP.C('MALL_URL'));
		$this->assign('wap_url', APP_HTTP.C('WAP_URL'));
		//默认搜索配置
		$this->assign("selectWords",$this->selectWords());
		//1.1.2头部搜索列表排序配置
		$this->assign("selectList",$this->selectList());
	}
	//返回搜索默认值
	private function selectWords(){
	    return MODULE_NAME == 'Group' ? array('name'=>'话题','keyword'=>I('param.word',''),'selectkey'=>'topic') : array('name'=>'商品','keyword'=>I( 'param.word', '' ),'selectkey'=>'goods'); 
	}
	
    //返回公共头部搜索选项
	private function selectList(){
	    //社交相关页面排序|其他页面排序
	    return MODULE_NAME == 'Group' ? array('topic'=>'话题','group'=>'圈子','goods'=>'商品','shop'=>'店铺'):  array('goods'=>'商品','shop'=>'店铺','topic'=>'话题','group'=>'圈子');
	}

	/*
	 * csrf
	 * */
	public function csrf() {

		//假token
		$csrf = get_client_ip(0, true).time();
		$tmp_token = \Think\Crypt::encrypt($csrf.'', 'abcd123a', 5); // 5分钟
		$this->assign("csrf_token", $tmp_token);

		//真正检查跨站列表并设置TOKEN,预生产不检测
		if(APP_STATUS !== 'pre'){
			$this->check_csrf();
		}
	}

	/*
	 * 验证跨站列表
	 * */
	public function check_csrf() {

		$action = strtolower(MODULE_NAME).'-'.strtolower(CONTROLLER_NAME).'-'.strtolower(ACTION_NAME);

		if( isset( C( 'csrf-lists' )[ $action ] ) ) {
			
			$csrf_token = ( isset( $_SERVER['HTTP_CONTENT_TYPE_CTAG'] ) ) ? $_SERVER['HTTP_CONTENT_TYPE_CTAG'] : '' ;
			$csrf = \Think\Crypt::decrypt($csrf_token,'gomeplus');

			//验证token
			if( empty( $csrf ) ) {
				$this->outJSON( '404', '请刷新页面重试!' );
				exit;
			}
		} else {
			$time = 300;
			$csrf = get_client_ip(0, true).time();
			$csrf_token = \Think\Crypt::encrypt($csrf, 'gomeplus', $time); // 5分钟

			setcookie( 'content_ctag', $csrf_token, 0, C('COOKIE_PATH'), C('COOKIE_DOMAIN') );
		}
	}

    /*
     * 切换手机端
     * */
    public function switch_mobile() {
        if( !is_mobile() ) return false;

        $request_uri = substr( $_SERVER['REQUEST_URI'], 1, strlen($_SERVER['REQUEST_URI']) );
        $module = explode( '/', $request_uri )[0];

        //手机端首页跳转
        if( $_SERVER['REQUEST_URI'] == '/' ) {
            header( 'Location:'.'https://'.C( 'WAP_URL' ) );
        }

        //允许跳转的模块,防止其他页面跳错了
        $allow = array( 'circle', 'shop', 'item', 'topic' );
        if( in_array( $module, $allow ) ) {
            header( 'Location:'.'https://'.C( 'WAP_URL' ).$request_uri );
        }

    }

	/**
	 * 判断是否登录
	 *
	 */
	public function checkLogin()
	{
		// userId赋值
		$this->userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));

	}

	/**
	 * 检查token
	 *
	 */
	public function checkToken()
	{
		// cookie未过期，检查token
		if($this->userId)
		{
			$this->token = session("token_".$this->userId);
			$param['userId'] = intval($this->userId);
			$param['loginToken'] = $this->token;
			$tokenObj = D('Home/Token');
			$tokenData = $tokenObj->postData($tokenObj->loginTokenCheckAction, $param);
			if(isset($tokenData['success']) && ($tokenData['data']['result'] === false || $tokenData['success'] === false))
			{
				// token失效，清空cookie
				cookie('userId', null);
				cookie('nickName', null);
				cookie('userInfo', null);
				cookie('gomeplusid', null); // 删除sessionid
				session("token_".$this->userId, null);
				$this->userId = 0;
				$this->assign('alertIsLogin', 1);
			}
			//cookie 赋值
			$this->user_infos = $this->user_infos();
			$this->nickName = $this->user_infos['nickName'] ? $this->user_infos['nickName'] : authcode(cookie('nickName'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		}

	}

	/*
    * 获取COOKIE 用户信息
    * */
	public function user_infos() {
		//$userinfos = authcode(cookie( 'userInfo' ), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$user_info  = $this->getUserInfo();
		if( empty($user_info) ) return false;
		$data = array();
		$data['userId'] = $user_info['user']['id'];//用户ID
		$data['imagePath'] = $user_info['user']['facePicUrl'];//头像
		$data['nickName'] = $user_info['user']['nickname'];//昵称
		$data['mobile'] = isset($user_info['user']['mobile'])?$user_info['user']['mobile']:'';//手机
		$data['isExpert'] = isset($user_info['expert']['isExpert']) ? $user_info['expert']['isExpert'] : false;
		$data['ext'] = $user_info;
		$this->assign( 'userinfos', $data );
		return $data;
	}


	/**
	 * 判断白名单
	 *
	 */
	public function whiteList()
	{
		if(in_array(strtolower(CONTROLLER_NAME).'/'.strtolower(ACTION_NAME), C('WHITE_LIST')))
		{
			if(! $this->userId || $this->userId == 0)
			{
				//$this->redirect('login/index?redirect='.base64_encode(curPageURL()));
				header('location:/login/index?redirect='.base64_encode(curPageURL()));
			}
		}
	}

	public function _empty() {
  		$this->display("Home@Public:404");
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
		$check_refer = isTrustedDomain($_SERVER['HTTP_REFERER']);
		if($check_refer === true){
			exit(json_encode( $data ));
		}else{
			$this->outError();
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
	 * 获取用户信息
	 * @return array
	 */
	public function getUserInfo(){
		$user_model = D('Home/User');
		$info = $user_model->getData($user_model->personalInfo);
		return (isset($info['data']['user'])) ? $info['data'] : array();
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
}




