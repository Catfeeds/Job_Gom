<?php
/*
 * 对接集团 单点登录
 * @by maoxiaoqi 2017.01.12
 * */

namespace Passport\Controller;
use Think\Controller;
use Common\Lib\encryptHelper;
use Common\Lib\CurlHandler;

header('Content-Type: text/javascript; charset=utf-8');
class SsoController extends Controller {

	//scn信息
	protected  $scn = '';

	//scn用户信息
	protected $userinfos = '';

	protected static $invoke_from = 'gomeplus';

	//密钥
	private static $key_str="QWEF38D9";

	//md5
	private static $md5_num=32;

	const BS_TOKEN_PREFIX = 'BS_TOKEN_';

	public function __construct() {
		parent::__construct();

		//sso uri
		$this->sso_http = C( 'GOME' )['SERVICE']['SSO'].C( 'GOME_API' )['check_status'];

		//集团SDK crypt
		$this->crypt = new encryptHelper(self::$key_str);

		//curl处理类
		$this->_curlHandler = new CurlHandler();

		$this->login_v2 = D("Passport/LoginV2");
	}

	/*
	 * scn操作
	 * @return void
	 * */
	public function save_cookie() {
		//融合后，和商城共用一套COOKIE，不再单独走COOKIE
		exit( '1' );
		header('P3P:CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
		$uuid = I( 'get.uuid', '' );

		//调试
		if( $_SERVER['ENVIRONMENT'] == 'pre' && isset( $_COOKIE['sso_pre_stop'] ) && $_COOKIE['sso_pre_stop'] ) {
			echo 12;
			exit;
		}

		if( $_SERVER['ENVIRONMENT'] == 'dev' && isset( $_COOKIE['sso_dev_stop'] ) && $_COOKIE['sso_dev_stop'] ) {
			echo 11;
			exit;
		}

		//获取SCN
		$data = $this->get_scn( $uuid );

		//解析scn
		if( ( isset( $data['buessObj']['scn'] ) ) ) {
			$scn_infos = $this->parse_scn( $data['buessObj']['scn'] );
		} else {
            write_log( 'LOG_SCN', 'http://www.test.com', $data);
			die( 'SCN不存在.' );
		}

		if( !empty( $scn_infos ) && !empty( $this->userinfos ) ) {
			//success set cookie
			$users = json_decode( $this->userinfos, true );
			if( empty( $users ) ) exit( '0' );

			//打印LOG
			if( isset( $_COOKIE['debug'] ) ) write_log( 'LOG_USER_INFOS', 'http://www.test.com', $users);

			cookie('gome_id', authcode($users['id'], 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
			setcookie( 'SCN',  $this->scn, NULL, C('COOKIE_PATH'), C('COOKIE_DOMAIN'), '', true);

			//获取token  去掉token换成SCN
//			$token = $this->get_token( $users['id'],  urlencode( $this->scn) );
			//打印LOG
//			if( isset( $_COOKIE['debug'] ) ) write_log( 'LOG_TOKENS', 'http://www.test.com', $token);
//			if( isset( $token['loginToken'] ) ) {
//				S(self::BS_TOKEN_PREFIX.$users['id'],$token['loginToken'],0);
//			}

			exit( '1' );
		} else {
			exit( '0' );
		}
	}

	/*
	 * 获取通过SCN获取token
	 * @param $userid int 在线用户Id
	 * @param $scn string scn字符串
	 * @return []
	 * */
	public function get_token( $userid, $scn ) {
		if( empty( $userid ) || empty( $scn ) ) return false;

		$data = $this->login_v2->getData(
			$this->login_v2->login_token,
			array(
				'userId' => $userid,
				'scn' => urlencode( $scn )
			)
		);

		if( $data['code'] == 200 ) return $data['data'];
		return false;
	}

	/*
	 * 解析SCN
	 *
	 * @paran $scn string scnw完整字符串
	 * @return [] or bool
	 * */
	private function parse_scn( $scn ) {
		if( empty( $scn ) ) return false;

		$scn_value =  $scn ;
		$des_str = substr($scn_value,0,strlen($scn_value)-self::$md5_num);
		$md5_str = substr($scn_value,strlen($scn_value)-self::$md5_num);

		$userinfos = $this->crypt->decrypt($des_str);

		if(md5($userinfos)==$md5_str) {
			$this->scn = $scn;
			return $this->userinfos = $userinfos;
		} else {
			write_log( 'SCN解析失败', 'debug_log', $scn);
			return false;
		}
	}

	/*
	 * 获取SCN数据
	 *
	 * @param $uuid string 集团登录唯一ID
	 * @return []
	 * */
	private function get_scn( $uuid ) {
		if( empty( $uuid ) ) return false;

		$uri = [];
		$uri[0] = 'uuid='.$uuid;
		$uri[1] = 'invokeFrom='.self::$invoke_from;
		$uri = $this->sso_http.implode( '&', $uri );

		$res_data = $this->_curlHandler->request($uri,array(),'get');

		//打印LOG
		if( isset( $_COOKIE['debug'] ) ) write_log( 'LOG_SCN_URL', $uri, []);

		if( empty( $res_data ) ) return false;
		$data = json_decode( $res_data , true );

		//打印LOG
		if( isset( $_COOKIE['debug'] ) ) write_log( 'LOG_SCN_DATA', $uri, $data);

		if( $data['isSuccess'] === true ) {
			return $data;
		} else {

			$message = ( isset( $data['message'] ) ) ? $data['message'] : '未知错误.' ;
			//输出错误log
			write_log( $message, $uri, $res_data);
			echo 0;
			exit;
		}
	}

	/*
	 * 退出登录
	 *
	 * @return
	 * */
	public function logout() {

		$userId = cookie('gome_id') == '' ? 0 : authcode(cookie('gome_id'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));

		cookie('userId', null);
		cookie('gome_id', null);
		cookie('nickName', null);
        cookie('gome_scn', null);
		cookie('gomeplusid', null);
		cookie('gome_userinfos', null);
		cookie('scn_token', null);
		setcookie( 'SCN',  null, time()-3600, C('COOKIE_PATH'), C('COOKIE_DOMAIN'));

		S(self::BS_TOKEN_PREFIX.$_SESSION['userId'],null);
		unset($_SESSION[$userId]);
		exit;
	}

	/**
	 * 将userId与token写到cookie里，方便Api域名使用
	 * @param $user_id
	 * @param $token
	 */
	private function uid_token( $user_id, $token ) {
		$cookie_str = $user_id.C('auth_check_sep').$token.C('auth_check_sep').C('auth_check');
		$cookie_str = authcode($cookie_str, 'ENCODE', C('ENCRYPT_COOKIE_KEY'));
		setcookie( C('COOKIE_PREFIX').'uid_token', $cookie_str, NULL, C('COOKIE_PATH'), C('COOKIE_DOMAIN') );
	}
}
