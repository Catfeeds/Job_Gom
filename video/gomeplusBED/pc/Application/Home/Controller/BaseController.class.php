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
	public $token = '';
    public $nickName = '';
	public $mx_domain = array();
	public $userInfo = array();
	const BS_TOKEN_PREFIX = 'BS_TOKEN_';

	public function __construct()
	{

		parent::__construct();

        // 限制访问跳转至社交大首页
        $this->go_plus();

		//获取国美在线用户信息 并对接Plus登录相关
		$this->get_userinfos();

		//登录态统一验证方法
        $this->auth_verify();

        //检查是否为手机端 适配M站
        $this->switch_mobile();

		//设置页面埋点modelID
		$this->setPageModelId();

		//TPL传参
        $this->_assign();
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
		$csrf_token_session_key = 'home_base_check_csrf_token';
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

			//对灌水做验证
			$check_repeat_arr = C('csrf_lists_check_repeat')['action'];
			if(isset($check_repeat_arr[$action_name])){
				$csrf_token_session_value = session($csrf_token_session_key);
				if(empty($csrf_token_session_value)){
					$csrf_token_session_value['error_count'] = 0;
					$csrf_token_session_value['token'] = '';
				}
				if($csrf_token_session_value['token'] != $csrf){
					$csrf_token_session_value['error_count'] += 1;
					cookie('content_ctag_type', null);
				}else{
					$csrf_token_session_value['error_count'] = 0;
				}
				if($csrf_token_session_value['error_count'] > 3){
					$this->outError(\Think\ErrorCode::ILLEGAL_ACTION);
					exit;
				}
			}
		}

		//没有cookie或者请求合法则更新csrf token的真实cookie，确保一个csrf token只可使用一次
		$csrf_token_cookie = cookie('content_ctag_type');
		if(empty($csrf_token_cookie) || $check_flag){
			$csrf = get_client_ip(0, true).time();
			$csrf_token = \Think\Crypt::encrypt($csrf, C('CSRF_TOKEN_KEY'));
			setcookie(C('COOKIE_PREFIX').'content_ctag_type', $csrf_token, 0, C('COOKIE_PATH'), C('COOKIE_DOMAIN'));
			$csrf_token_session_value = session($csrf_token_session_key);
			if(empty($csrf_token_session_value)){
				$csrf_token_session_value = [];
			}
			$csrf_token_session_value['token'] = $csrf;
			session($csrf_token_session_key, $csrf_token_session_value);
		}
	}

    /**
     * 给模板传递参数
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
            'main' => APP_HTTP.C('MAIN_URL'),
            'passport' => APP_HTTP.C('PASSPORT_URL'),
            'order' => APP_HTTP.C('ORDER_URL'),
            'group' => APP_HTTP.C('GROUP_URL'),
            'i' => APP_HTTP.C('UCENTER_URL'),
			'mall' => APP_HTTP.C('MALL_URL'),
			'meihao' => APP_HTTP.C('MEIHAO_URL'),
			'meidian' => APP_HTTP.C('MEIDIAN_URL')
        ];
        $this->assign('alertIsLogin', 0);
        //埋点脚本
        $this->assign('uba_sdk_uri',C('UBA_SDK_URI'));
        $this->assign('bigdata_uri',C('BIGDADA_URI'));
        //意见反馈开关
        $this->assign('feed_btn_status',1);
        //显示cookie前缀
        $this->assign('cookie_prefix',C('COOKIE_PREFIX'));

		// 当前环境
		$this->assign('environment', $_SERVER['ENVIRONMENT']);

        // 当前用户userId
        $this->assign('userId', $this->userId);
        $this->assign('nickName',$this->nickName);
        // 当前url
        $this->assign('current_url', base64_encode(curPageURL()));
        $this->assign('pcjspath', APP_HTTP.$jspath.$uri);
        $this->assign('pccsspath', APP_HTTP.$csspath.$uri);
        $this->assign('pcimgpath', APP_HTTP.$imgpath.$uri);
		//双协议图片路径
		$this->assign('img_d_proto', '//'.$imgpath.$uri);
        //前端域名调用
        $this->assign('js_domain', APP_HTTP.C('STATICPATH.JS_DOMAIN'));
        $this->assign('main_domain', APP_HTTP.C('MAIN_URL'));
        $this->assign('passport_domain', APP_HTTP.C('PASSPORT_URL'));
        $this->assign('order_domain', APP_HTTP.C('ORDER_URL'));
        $this->assign('group_domain', APP_HTTP.C('GROUP_URL'));
        $this->assign('i_domain', APP_HTTP.C('UCENTER_URL'));

		$this->assign('mall_domain', APP_HTTP.C('MALL_URL'));
		$this->assign('meihao_domain', APP_HTTP.C('MEIHAO_URL'));
		$this->assign('meidian_domain', APP_HTTP.C('MEIDIAN_URL'));
        $this->assign('wap_url', APP_HTTP.C('WAP_URL'));
        $this->assign('wap_circle_url', APP_HTTP.C('WAP_CIRCLE_URL'));
        //在线域名
        $this->assign('main_domain_gome', APP_HTTP_GOME.C('GOME')['URL']['MAIN_URL']);
        $this->assign('i_domain_gome', APP_HTTP_GOME.C('GOME')['URL']['UCENTER_URL']);
        $this->assign('i_vip_gome', APP_HTTP_GOME.C('GOME')['URL']['UCENTER_VIP_URL']);
        $this->assign('i_rights_gome', APP_HTTP_GOME.C('GOME')['URL']['UCENTER_RIGHTS_URL']);
        $this->assign('cart_gome', APP_HTTP_GOME.C('GOME')['URL']['CART_URL']);
        $this->assign('login_gome', APP_HTTP_GOME.C('GOME')['URL']['LOGIN_URL']);
        $this->assign('product_search_gome', APP_HTTP_GOME.C('GOME')['URL']['SEARCH_URL']);
        $this->assign('product_item_gome', APP_HTTP_GOME.C('GOME')['URL']['MALL_ITEM_URL']);
        $this->assign('product_item_tuan_gome', APP_HTTP_GOME.C('GOME')['URL']['MALL_ITEM_TUAN_URL']);
        $this->assign('current_module', strtolower(MODULE_NAME));
        $this->assign('js_net_domain_gome', APP_HTTP_GOME.C('GOME')['STATICS']['NET_JS']);
        $this->assign('help_domain_gome', APP_HTTP_GOME.C('GOME')['URL']['HELP_URL']);
        $this->assign('js_domain_gome', C('GOME')['STATICS']['JS']);
        $this->assign('css_domain_gome', C('GOME')['STATICS']['CSS']);
        $this->assign('img_domain_gome', C('GOME')['STATICS']['IMG']);
        $this->assign('cookie_domain_gome', C('GOME')['COOKIE_DOMAIIN']);
        $this->assign('secure_gome', C('GOME')['SECURE_URL']);
        $this->assign('context_path_gome', C('GOME')['CONTEXT_PATH']);
        $this->assign('ss_gome', C('GOME')['SERVICE']['SS_API']);
        $this->assign('cart_service_gome', C('GOME')['SERVICE']['CART']);
        $this->assign('stage_image_server', C('GOME')['STATICS']['STAGE_IMAGE_SERVER']);

        $pro_num = (strtolower(MODULE_NAME) == 'ucenter') ?  'a07' : 'a01';
        if(strtolower(MODULE_NAME) == 'ucenter' && in_array(strtolower(CONTROLLER_NAME),['group','topic'])){
            $pro_num = 'a30';
        }
        //美店主态页a08方案
        //if(strtolower(MODULE_NAME) == 'mall' && strtolower(CONTROLLER_NAME)== 'admin'){
        if(strtolower(MODULE_NAME) == 'mall'){
            $pro_num = 'a08';
        }
        $this->assign("pro_num",$pro_num);//公共头尾方案号
    }
	/*
	 * 获取在线用户信息  因为国美在线识别cookie只能在这里跳转一次后获取
	 * @by maoxiaoqi
	 * @return []
	 * */
	protected function get_userinfos() {
		$_curlHandler = new CurlHandler();

		//登录信息
		$uri = 'http://'.C( 'GOME' )['URL']['MEMBER_URL'].C( 'GOME_API' )['login_style'];
		$param = [];
		$param[0] = 'callback=login_users';
		$param[1] = 'type=1';
		$uri = $uri.'?'.implode( '&', $param );
		$data = $_curlHandler->request($uri,array(),'get');
		if( empty( $data ) ) {
			write_log( '获取国美在线-用户数据失败[1]', $uri, $data );
		}

		$login_users = substr( $data, 12,-2 );
		if( empty($login_users) ) {
			write_log( '获取国美在线-用户JSON解析失败[2]', $uri, $data );
		}
		$login_users= json_decode( $login_users, true );

		$data = array();
		$data['userId'] = $login_users['loginStatus'] == 1 ? 0 : $login_users['loginId'];//用户ID,假登陆userid置为0
		$data['imagePath'] = '';//头像
		$data['nickName'] = $login_users['loginName'];//昵称
		$data['gradeId'] = !empty($login_users['gradeId']) ? ($login_users['gradeId'] - 10) : 1;//用户等级
		$data['loginStatus'] = $login_users['loginStatus'];//用户登录状态
		$data['mobile'] = '';//手机

        //loginStatus=3时，用户是登录状态
        if($data['loginStatus'] == 3){
            $_SESSION['userId'] = $data['userId'];
            $res = $this->_getExtUserinfo();
            $data['ext'] = $res;
            $data['isExpert'] = !empty($res['account']['isExpert']) ? $res['account']['isExpert'] : false;
        }else{//非登录状态清掉Session
            $data['ext'] = [];
            $data['isExpert'] = false;
            unset( $_SESSION['userId'] );
        }
        $this->userInfo = $data;
        $this->nickName = $data['nickName'];
        $this->userId = $data['userId'] ;
        $this->assign( 'userinfos', $data );
	}


    /*
     * 切换手机端
     * */
    public function switch_mobile() {
        if( !is_mobile() ) {
            //如果不是手机端的请求，ajax接口请求添加csrf验证
            $this->_csrf();
            return false;
        }
        //TODO 紧急解决PC的H5扫码302适配跳转bug
        if( MODULE_NAME =='Group' && CONTROLLER_NAME=='Qrupload' ) return false;
        if(MODULE_NAME =='Ajax' && CONTROLLER_NAME=='Topic' && ACTION_NAME=='upload' ) return false;
        $request_uri = substr( $_SERVER['REQUEST_URI'], 1, strlen($_SERVER['REQUEST_URI']) );
        $module = explode( '/', $request_uri )[0];
        //允许跳转的模块,防止其他页面跳错了
        $allow = array( 'circle'=>1,'topic'=>1 );
		if( isset($allow[$module]) && $module == 'circle') {
			header( 'Location:'.APP_HTTP.'circle.'.C( 'WAP_URL' ).'circle-'.substr($request_uri,7) );
			exit;
		}
		if( isset($allow[$module]) && $module == 'topic') {
			header( 'Location:'.APP_HTTP.'circle.'.C( 'WAP_URL' ).'topic-'.substr($request_uri,6));
			exit;
		}
		header( 'Location:'.APP_HTTP.C( 'WAP_URL' ) );
		exit;
    }


	public function _empty() {
  		$this->display("Home@Public:404");
		exit;
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

	/*
	 * 设置活动ID
	 *
	 * @param $actid string 活动ID
	 * @return void
	 * */
	protected function setActiveNo( $actid='' ){
		$param['distribution_channel'] = I("param.distribution_channel", '');
		$active_no = 'a1_p05';
		if($param['distribution_channel']){
			$active_id = $m = $n = '';
			//$active_id = C('sale_conf')[$param['distribution_channel']];
			$active_id = $actid ? $actid : C('sale_conf')[ACTION_NAME] ;

			if($active_id){
				$m = substr($active_id,0,1);
				$n = substr($active_id,1);
				$active_no .= '_m'.$m.'_n'.$n;
				session('active_id',$active_id);
				$_SESSION['p01']['activityNo'] = $active_id.$param['distribution_channel'];
			}
			$active_no .= '_d'.$param['distribution_channel'];
			session('active_no',$active_no);
			session('channel',$param['distribution_channel']);
		}
	}

    /**
     * 获取用户帐户信息
     * @return mixed
     */
	private function _getExtUserinfo()
	{
        $curlHandler = new CurlHandler();

		$accountArgs = ['callback' => 'ckdata', 'type' => 1, '_' => time() . '000'];
        $accountUri = C('GOME')['SERVICE']['UCENTER'] . C('GOME_API')['account'] . '?' . joinParam($accountArgs);        
    	$accountRes = $curlHandler->request($accountUri, array(), 'get');
    	$accountData = analyzeOnline($accountRes, 'ckdata');

		//账户信息日志
		$accountMsg = 'no message';
		if (!empty($accountData['result'])) {
			write_log($accountMsg, $accountUri, $accountArgs);
		} else {
			if (empty($accountData['error']['message'])) {
				$accountData['error']['message'] = $accountMsg;
			}

			if (empty($accountData['error']['code'])) {
				$accountData['error']['code'] = 500;
			}
            
            //把接口返回数据填充在日志信息里
            $dataAppend = $accountRes;
            if(is_array($accountRes)) {
                $dataAppend = json_encode($accountRes);
            }
            
            $accountData['error']['message'] = $accountData['error']['message'] . '###' . $dataAppend;
            
			write_log($accountData['error']['message'], $accountUri, $accountArgs, $accountData['error']['code']);
		}
        
		$result['account'] = [];
		//帐户信息
		if (!empty($accountData['result'])) {
			$result['account'] = $accountData['result']['pInfo'];
			//计算用户等级
			$result['account']['profileGrade'] = intval($result['account']['profileGrade']) - 10;
		}
		return $result;
	}

	/**
	 * 设置埋点页面modelId
	 */
	private function setPageModelId(){
		$modelIdArr = C('PAGE_MODEL');
		$pageIdArr = C('PAGE_ID');
		//var_dump($modelIdArr);
		$param = [
			strtolower(MODULE_NAME),
			strtolower(CONTROLLER_NAME),
			strtolower(ACTION_NAME),
		];
		$key = implode('_',$param);
		$modelPage = array_key_exists($key,$modelIdArr) ? $modelIdArr[$key] : [];
		$page_id = array_key_exists($key,$pageIdArr) ? $pageIdArr[$key]['page_id'] : '';

		$this->assign('modelPage',$modelPage);
		$this->assign('page_id',$page_id);
		$this->assign('modelPub',$modelIdArr['public']);
	}

	/**
	 * 控制器访问权限限制
	 */
	private function go_plus(){
	    $this->handle_mall_module();
		$current_name = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME);
		if(APP_STATUS === 'pre'){
			$current_name = str_replace('-pre','',$current_name);
		}

		$forbid_list = [
			'order_cart'=>1,
			'order_order'=>1,
			'passport_forgetpwd'=>1,
			'passport_index'=>1,
			'passport_login'=>1,
			'passport_protocol'=>1,
			'passport_regist'=>1,
			'passport_shop'=>1,
			'passport_sso'=>1,
			'passport_unified'=>1,
			'ucenter_address'=>1,
			'ucenter_bind'=>1,
			'ucenter_coupon'=>1,
			'ucenter_customer'=>1,
			'ucenter_feed'=>1,
			'ucenter_im'=>1,
			'ucenter_modpwd'=>1,
			'ucenter_order'=>1,
			'ucenter_personal'=>1,
			'ajax_address'=>1,
			'ajax_car'=>1,
			'ajax_coupons'=>1,
			'ajax_login'=>1,
		];
		if(isset($forbid_list[$current_name]) && $forbid_list[$current_name] === 1){
			$url = APP_HTTP.C('MAIN_URL');
			header('location: '.$url, true, 301);
			exit;
		}
	}
	private function handle_mall_module(){
        $forbid_list = [
            'home_act',
            'home_api',
            'home_product',
            'home_item',
            'home_special',
            'mall_act',
            'mall_api',
            'mall_product',
            'mall_item',
            'mall_special',
        ];
        $current_name = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME);
        if(in_array($current_name, $forbid_list)){
            $url = APP_HTTP.C('MALL_URL');
            header('location: '.$url, true, 301);exit;
        }
        //生产仿真环境Mall域名下的页面跳转到jingpin.gome.com.cn
        if(strpos(APP_HTTP.$_SERVER['HTTP_HOST'],'mall.') && in_array(APP_STATUS,['pro','sim'])){
            $url = APP_HTTP.C('MALL_URL').ltrim($_SERVER['REQUEST_URI'],'/');
            header('location: '.$url, true, 301);exit;
        }
    }

    /**
     * 登录访问权限验证
     */
    private function auth_verify(){
        $current_name = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME).'_'.strtolower(ACTION_NAME);

        if( in_array($current_name,C('AUTH_LIST')) && $this->userInfo['loginStatus'] !== 3)
        {
            if(((isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || !empty($_POST[C('VAR_AJAX_SUBMIT')]) || !empty($_GET[C('VAR_AJAX_SUBMIT')]))){
                //手机端上传不验证登录
                if($current_name =='ajax_topic_upload' && is_mobile()){
                    return true;
                }
                $this->outError(\Think\ErrorCode::USER_NO_LOGIN);
            }
            //美号模块特殊处理
            if( strtolower(MODULE_NAME) =='meihao' ){
                header('location:'.APP_HTTP.C('MEIHAO_URL').'login/index?orginURI='.urlencode(curPageURL()));
                exit;
            }
            header('location:'.APP_HTTP_GOME.C('GOME')['URL']['LOGIN_URL'].'?orginURI='.urlencode(curPageURL()));
            exit;
        }
    }

}




