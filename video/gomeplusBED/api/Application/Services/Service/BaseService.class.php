<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：BaseService.class.php                                     |
 * +----------------------------------------------------------------------+
 * | @程序功能：基类Service                                               |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-29 10:56:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Services\Service;
use Think\Rsyslog;
use Common\Lib\CurlHandler;
use Common\Lib\encryptHelper;
class BaseService
{
    const BS_API_RETRY_EXPRIE = 300;
    const MD5_NUM = 32;
    const DECRYPE_KEY_STR ="QWEF38D9";
    private $token_retry_times = 2;
    private $_curlHandler = '';
    private $_crypt = '';
    private $bsapi_token_uri = 'user/loginTokenGenerateAction';
    // 接口定义
    public $domain = '';
    public $userId = 0;
    public $token = 0; // 登录返回的token
    public $debug = false; // 是否开启debug模式
    protected $bs_version = 1;
    const BS_TOKEN_PREFIX = 'BS_TOKEN_';

    public $publicParam = array(
        'userId' => 0,
        'clientOs' => 5,
        'clientOsVersion' => '4.3',
        'appType' => 1,
        'appVersion' => '1.0.4',
        'mac' => 'ac+as+23+3d',
        'devId' => 0,
        'otherDevInfo' => 'someInfo',
        'pubPlat' => '0150101093000000',
        'sid' => 'a1_p05',  //用于标识应用、平台、来源等信息
    );
    public $publicParamv2 = array(
        'userId' => 0, // 当使用loginToken的时候，必须同时传递userId
        'loginToken' => '', // 用于标示用户登录状态
        'accessToken' => '', // 用于服务认证
        'appVersion' => '1.0.5', // app 版本号
        'device' => '3/1.0.0/pc/0', // 操作系统／版本号／机型／原devId
        'app' => '005/0150101093000000', // from值统计
        'net' => '4G', // 网络类型
        'traceId' => '', // 日志追踪代码
        'jsonp' => '', // 使用jsonp时的回调函数名称
        'sid' => 'a1_p05',  //用于标识应用、平台、来源等信息
    );


    /**
     * 构造方法
     *
     */
    public function __construct()
    {
        $this->domain = ($this->bs_version==1) ? C('SERVICE.DOMAIN') : C('SERVICE.DOMAIN_V2');
        $this->userId = isset($_COOKIE['SSO_USER_ID']) ? $_COOKIE['SSO_USER_ID'] : '';
        //$this->token = S(self::BS_TOKEN_PREFIX.$this->userId)?S(self::BS_TOKEN_PREFIX.$this->userId):'';
        $this->token = '';
        if($this->bs_version == 1){
            $this->publicParam['devId'] = session_id(); // 使用sessionID作为唯一标示
            $this->publicParam['userId'] = intval($this->userId);
            !empty($_COOKIE['ssid']) ? $this->publicParam['uniqueDeviceId'] = $_COOKIE['ssid'] : '';
        }else{
            $this->publicParamv2['userId'] = $this->userId ? intval($this->userId) : 0;
            $this->publicParamv2['device'] .= session_id();
            $this->publicParamv2['loginToken'] = '';
            !empty($_COOKIE['ssid']) ? $this->publicParamv2['uniqueDeviceId'] = $_COOKIE['ssid'] : '';
        }
        $this->_curlHandler = new CurlHandler($this->bs_version);
        $this->_crypt = new encryptHelper(self::DECRYPE_KEY_STR);
        // 判断是否开启firephp
        if(I('param.debug') == true || cookie('debug'))
        {
            $this->debug = true;
        }
    }

    /**
     * get请求接口(支持BSv1,v2)
     *
     */
    public function getData($uri = '', $param = array(), $openCache = false, $expire = 60)
    {
        $data = false;
        $this->key = md5($uri.'|'.implode('|', $param));
        if($openCache == true)
        {
            $data = S($this->key);
        }
        if($data == false)
        {
            $publicParam = ($this->bs_version==1) ? $this->publicParam : $this->publicParamv2;
            $mergeParam = array_merge($publicParam, $param);
            $paramUri = joinParam($mergeParam);
            $data = $this->_curlHandler->request($this->domain.$uri.'?'.$paramUri,array(),'get');

            // error redo
            $retry_times_key = $this->key.'_try_times';
            if($data['code'] == 504 && !S($retry_times_key))
            {
                S($retry_times_key,1,self::BS_API_RETRY_EXPRIE);
                $data = $this->_curlHandler->request($this->domain.$uri.'?'.$paramUri,array(),'get');
            }
            $data = xss_clean_recursive($data);
            if($openCache == true)
            {
                S($this->key, $data, $expire);
            }
        }
        unset($data['errorinfo']);
        return $data;
    }

    public function getDataCms($uri = '', $param = array(), $openCache = false, $expire = 60)
    {
        $data = false;
        $this->key = md5($uri.'|'.implode('|', $param));
        if($openCache == true)
        {
            $data = S($this->key);
        }
        if($data == false)
        {
            $this->domain = C('CMS_URL');
            $paramUri = joinParam($param);
            $data = $this->_curlHandler->request($this->domain.$uri.'?'.$paramUri,array(),'get');
            // error redo
            $retry_times_key = $this->key.'_try_times';
            if($data['code'] == 504 && !S($retry_times_key))
            {
                S($retry_times_key,1,self::BS_API_RETRY_EXPRIE);
                $data = $this->_curlHandler->request($this->domain.$uri.'?'.$paramUri,array(),'get');
            }
            $data = xss_clean_recursive($data);
            if($openCache == true)
            {
                S($this->key, $data, $expire);
            }
        }
        unset($data['errorinfo']);
        return $data;
    }

    /**
     * post请求接口(支持BSv1,v2)
     *
     */
    public function postData($uri = '', $param = array())
    {
        if($this->bs_version == 2){
            $publicParamv2 = joinParam($this->publicParamv2);
            if(is_array($param)){
                $param = json_encode($param);
                //post空数组 bs无法解析[],转对象{}
                if( !$param ){
                    $param = (object)array();
                }
            }
            $data = $this->_curlHandler->request($this->domain.$uri.'?'.$publicParamv2,$param,'post');
        }else{
            if(is_array($param)){
                $param['user_id'] = $this->userId;
                $mergeParam = array_merge($this->publicParam, $param);
            }
            $data = $this->_curlHandler->request($this->domain.$uri,$mergeParam,'post');
        }

        return xss_clean_recursive($data);
    }

    /**
     * post Upload Data请求接口(目前支持V1 上传图片)
     *
     */
    public function postUploadData($uri = '', $vars= '') {
        $uri .= "?".joinParam( $this->publicParam );
        $data = $this->_curlHandler->request($this->domain.$uri,$vars,'post');
        return $data;
    }

    /**
     * delete请求接口(支持BSv1,v2)(支持BSv1,v2)
     *
     */
    public function deleteData($uri = '', $param = array())
    {
        $publicParam = ($this->bs_version==1) ? $this->publicParam : $this->publicParamv2;
        $mergeParam = array_merge($publicParam, $param);
        $paramUri = joinParam($mergeParam);
        $data = $this->_curlHandler->del($this->domain.$uri.'?'.$paramUri,array());
        return $data;
    }


    /**
     * put请求接口(支持BSv1,v2)(支持BSv1,v2)
     *
     */
    public function putData($uri = '', $param = array())
    {

        $publicParam = ($this->bs_version==1) ? $this->publicParam : $this->publicParamv2;
        $paramUri = joinParam($publicParam);
        if( $this->bs_version == 2 ) $param = json_encode($param);

        $data = $this->_curlHandler->put($this->domain.$uri.'?'.$paramUri,$param);
        return $data;
    }

    /**
     * 设置curl参数超时时间
     * @param $timeout
     */
    public function setTimeOut($timeout=5){
        $this->_curlHandler->setTimeOut($timeout);
    }

    /**
     * 根据SCN获取Bs的AccessToken
     * @param $scn   从cookie获取的scn
     * @param $retry 不必传，默认即可
     * @return array
     */
    private function getBsToken($scn,$retry=0){
        $diff_len = strlen($scn)-self::MD5_NUM;
        $des_str = substr($scn,0,$diff_len);
        $md5_str = substr($scn,$diff_len);
        $userinfos = $this->_crypt->decrypt($des_str);
        if(md5($userinfos)!=$md5_str) {
            return [
                "result"=>false,
                "err_msg"=>"method:".__FUNCTION__.",SCN parsing failed",
            ];
        }
        $users = json_decode( $userinfos, true );
        $uid = $users['id'];
        if(!$uid){
            return [
                "result"=>false,
                "err_msg"=>"method:".__FUNCTION__."uid get failed",
            ];
        }
        //$this->userId = $uid;
        $result = $this->getData(
            $this->bsapi_token_uri,
            array(
                'userId' => $uid,
                'scn' => urlencode(urlencode($scn))
            )
        );
        //var_dump($result);
        if($result['code']===200){
            return [
                "result" => true,
                "token" => $result['data']['loginToken'],
                "uid" => $uid,
            ];
        }
        if($result['code']!==200 && $retry<$this->token_retry_times){
            $this->getBsToken($scn,$retry+1);
        }
        $this->token_retry_times = 0;
        return [
            "result"=>false,
            "data"=>"method:".__FUNCTION__."get bs token failed",
        ];
    }

    /**
     * 通过cookie获取token
     * @return string
     */
    public function getCookieToken(){
        if(isset($_COOKIE['SCN'])){
            $bs_token = $this->getBsToken($_COOKIE['SCN']);
            if($bs_token['result']===true){
                if(isset($bs_token['token']) && $bs_token['token']){
                    S(self::BS_TOKEN_PREFIX.$bs_token['uid'],$bs_token['token'],0);
                    return $bs_token['token'];
                }
                write_log("bs http_code:200,loginToken value is empty");
            } else {
                write_log($bs_token['err_msg']);
            }
        }
        return '';
    }


}

