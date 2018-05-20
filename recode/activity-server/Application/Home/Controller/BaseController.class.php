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
use Common\Lib\CurlHandler;

class BaseController extends Controller
{
    public $userId = 0;
	public $mx_domain = [];
	public $userInfo = [];
	const BS_TOKEN_PREFIX = 'BS_TOKEN_';

	public function __construct(){
		parent::__construct();

        //获取用户信息
        $this->getUserInfo();

        //验证是否登录
        $this->auth_verify();

        //ajax接口请求添加csrf验证
        $this->_csrf();

        //TPL传参
        $this->_assign();
	}
    /*
     * 空控制器和空方法,需要跳到首页
     */
    public function _empty(){
        header('location:'.APP_HTTP_GOME.C('WAP_URL'));
    }
    /**
     * 种csrf token到cookie
     */
    private function _csrf(){
        //假token
        $csrf = get_client_ip(0, true).time();
        $bad_token = \Think\Crypt::encrypt($csrf.'', 'abcd123a');
        setcookie(C('COOKIE_PREFIX').'csrf_token', $bad_token, 0, C('COOKIE_PATH'), C('COOKIE_DOMAIN'));
        $this->_check_csrf();
    }

    /**
     * 种csrf token到cookie，检测csrf token
     */
    private function _check_csrf(){
        $check_flag = false;
        $module_name = strtolower(MODULE_NAME);
        $controller_name = $module_name.'_'.strtolower(CONTROLLER_NAME);
        $action_name = $controller_name.'_'.strtolower(ACTION_NAME);

        $check_csrf_lists = C('csrf_lists_black');

        if(isset($check_csrf_lists['module'][$module_name])){
            $check_flag = true;
        }

        if(isset($check_csrf_lists['controller'][$controller_name])){
            $check_flag = true;
        }

        if(isset($check_csrf_lists['action'][$action_name])){
            $check_flag = true;
        }

        if($check_flag){
            $csrf_token = isset($_SERVER['HTTP_SOURCE_MARK_TYPE'])
                ? $_SERVER['HTTP_SOURCE_MARK_TYPE'] : '' ;
            $csrf = \Think\Crypt::decrypt($csrf_token, C('CSRF_TOKEN_KEY'));

            //验证token、判断是否为ajax请求
            if(empty($csrf) || !IS_AJAX){
                cookie('content_ctag_type', null);
                $this->outError(\Think\ErrorCode::ILLEGAL_ACTION);
                exit;
            }
        }

        //没有cookie或者请求合法则更新csrf token的真实cookie，确保一个csrf token只可使用一次
        $csrf_token_cookie = cookie('content_ctag_type');
        if(empty($csrf_token_cookie) || $check_flag){
            $csrf = get_client_ip(0, true).time();
            $csrf_token = \Think\Crypt::encrypt($csrf, C('CSRF_TOKEN_KEY'));
            setcookie(C('COOKIE_PREFIX').'content_ctag_type', $csrf_token, 0, C('COOKIE_PATH'), C('COOKIE_DOMAIN'));
        }
    }

    /**
     * 模板传参
     */
    private function _assign(){
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
            'main' => APP_HTTP.C('ACTIVITY_URL'),
        ];

        //当前url
        $this->assign('current_url', base64_encode(curPageURL()));

        //显示cookie前缀
        $this->assign('cookie_prefix',C('COOKIE_PREFIX'));

        $this->assign('pcjspath', APP_HTTP.$jspath.$uri);
        $this->assign('pccsspath', APP_HTTP.$csspath.$uri);
        $this->assign('pcimgpath', APP_HTTP.$imgpath.$uri);

        //前端域名调用
        $this->assign('activity_domain', APP_HTTP.C('ACTIVITY_URL'));

        //双十二活动埋点js域名
        $this->assign('double_bury_domain', C('DOUBLE_BURY_DOMAIN'));

        $this->userInfo['link_ta'] = '';
        if(!empty($this->userInfo['userId'])){
            $this->userInfo['link_ta'] = taUrlGen($this->userInfo['userId']);
        }
        $this->assign('user_info', $this->userInfo);
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
     * 获取用户信息,判断是否登录
     */
    private function getUserInfo(){

        $token  = md5(sha1($_COOKIE['gm_sid']).C('APPSECRET'));
        $uri    = C('WAP_API')['LOGIN_URL'] . '?app_id='. C('APP_ID') . '&token='. $token;

        $curlHandler = new CurlHandler();
        $data = $curlHandler->request($uri, [], 'get');
        $result = json_decode($data,true);
        //var_dump($result);die;

        if(isset($result['STATUS']) && $result['STATUS'] == 200){
            $tmp['userId'] = $result['DYN_USER_ID'];
            $tmp['nikeName'] = $result['nikeName'];
            $this->userId = $result['DYN_USER_ID'];
            $this->userInfo = $tmp;
        }

    }

    /**
     * 登录访问权限验证
     */
    private function auth_verify(){

        $current_name = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME).'_'.strtolower(ACTION_NAME);
        if( in_array($current_name,C('AUTH_LIST')) && $this->userId === 0 ) {
            if(((isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || !empty($_POST[C('VAR_AJAX_SUBMIT')]) || !empty($_GET[C('VAR_AJAX_SUBMIT')]))){
                $this->outError(\Think\ErrorCode::USER_NO_LOGIN);
            }
            header('location:'.APP_HTTP_GOME.C('WAP_URL').'login.html?return_url='.base64_encode(curPageURL()));
            exit;
        }
    }

    /**
     * ajax错误判断返回
     * @param $code 错误码
     */
    public function outError($code){
        if($code<1) exit("param error.");
        $this->response(output($code,\Think\ErrorCode::getErrMsg($code)));
    }

    /**
     * ajax格式化输出
     * @param $data
     */
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
}




