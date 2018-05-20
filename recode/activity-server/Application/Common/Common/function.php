<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：function.php                                              |
 * +----------------------------------------------------------------------+
 * | @程序功能：功能函数文件                                              |
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@loyo24.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-29 09:51:42 CST                                         |
 * +----------------------------------------------------------------------+
 */
use Common\Lib\CurlHandler;
/**
 * 模拟post请求
 */
function curl_post($url = '', $param = array())
{
	$ch = curl_init();
	$log['now'] = date('Y/m/d H:i:s', $_SERVER['REQUEST_TIME']);
	$log['request_time'] = microtime(true);
	G('begin');
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
	curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 设置超时时间,单位(秒)
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
	$data = curl_exec($ch);
	curl_close($ch);
	$log['response_time'] = microtime(true);
	$log['time_consume'] = G('begin', 'end', 3);
	// 接口超时或者接口返回值为空的情况
	if(! $data || $data == '' || $data == null)
	{
		$data['success'] = false;
		$data['code'] = 11111; // 固定值
		$data['message'] = '网络超时';
		$data['data'] = array();
	}
	else
	{
		$data = json_decode($data, true);
	}
	$data['error'] = curl_error($ch); // 错误信息
	$data['errno'] = curl_errno($ch); // 错误号
	$data['errorinfo'] = curl_getinfo($ch);
	$log['url'] = $url;
	$log['type'] = 'post';
	$log['log_master'] = 'api';
	$message = array_merge($data,$param,$log);
	writeLog($data,$message);
	$data = json_encode($data);
	curl_close($ch);
	return $data;
}

/**
 * 模拟get请求
 */
function curl_get($url = '')
{
	$ch = curl_init();
	$log['now'] = date('Y/m/d H:i:s', $_SERVER['REQUEST_TIME']);
	$log['request_time'] = microtime(true);
	G('begin');
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 100); // 设置超时时间,单位(秒)
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
	$data = curl_exec($ch);
	// 接口超时或者接口返回值为空的情况
	if(! $data || $data == '' || $data == null)
	{
		$data['success'] = false;
		$data['code'] = 11111; // 固定值
		$data['message'] = '网络超时';
		$data['data'] = array();
	}
	else
	{
		$data = json_decode($data, true);
	}
	$data['error'] = curl_error($ch); // 错误信息
	$data['errno'] = curl_errno($ch); // 错误号
	$data['errorinfo'] = curl_getinfo($ch);
	$log['url'] = $url;
	$log['type'] = 'get';
	$log['log_master'] = 'api';
	$log['url'] = $url;
	$log['type'] = 'post';
	$log['log_master'] = 'api';
	$message = array_merge($data,$log);
	writeLog($data,$message);
	$data = json_encode($data);
	curl_close($ch);
	return $data;
}

function writeLog($data,$message){
	//接口日志监控
	$log_type = Think\Rsyslog::INFO;
	if(APP_DEBUG === true) // 开启firephp调试模式
	{
		$log_type = Think\Rsyslog::DEBUG;
	}
	//记录失败结果日志
	if((isset($data['code']) && $data['code'] !== 0) || (isset($data['success']) && $data['success']!== true)
		|| $data['errno'] !== 0 || $data['error'] !== '')//记录错误日志
	{
		$log_type = Think\Rsyslog::ERR;
	}
	//不同日志类型不同操作
	if($log_type == Think\Rsyslog::INFO)
	{//正常情况下，不记录返回结果data数组
		$message['data'] = array();
	}
	elseif($log_type == Think\Rsyslog::DEBUG)
	{//发送空DATA到firePHP
		$debugMsg = $message;
		$debugMsg['data'] = array();
		sendFirephp($debugMsg);
	}
	//写日志
	Think\Rsyslog::write($message, $log_type);
}

/**
 * 拼接接口参数
 */
function joinParam($param = array())
{
	$paramStr = '';
	if(isset($param))
	{
		foreach($param as $k => $v)
		{
			$paramStr .= $k.'='.$v.'&';
		}
		$paramStr = trim($paramStr, '&');
	}
	return $paramStr;
}


/**
 * 实例化service，组合参数
 *
 */
function connectParam($object, $uri, $param = array(), $version = 1) {

	$version_param = ( $version == 1 ) ? $object->publicParam : $object->publicParamv2 ;
	$userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));

	if($version == 1){
        $version_param['devId'] = session_id(); // 使用sessionID作为唯一标示
        $version_param['userId'] = $userId;
    }else{
        $version_param['userId'] = $userId ? $userId : '';
        $version_param['device'] = '3/1.0.0/wap/'.session_id();
        $version_param['loginToken'] = cookie('scn_token') ? authcode(cookie('scn_token'), 'DECODE', C('ENCRYPT_COOKIE_KEY')) : '';
    }

	$mergeParam = ( !empty($param) ) ? array_merge($param, $version_param) : $version_param ;

	$urlParam = joinParam($mergeParam);
	if( isset( $_GET['debug'] ) && $_GET['debug'] == 1 ) {
		echo $object->domain.$uri.'?'.$urlParam."<br/>";
	}
	return $object->domain.$uri.'?'.$urlParam;
}



// $string： 明文 或 密文  
// $operation：DECODE表示解密,其它表示加密  
// $key： 密匙    
// $expiry：密文有效期  
function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
{  
	// 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙  
	$ckey_length = 4;  
	// 密匙  
	$key = md5($key ? $key : C('AU_KEY'));  
	// 密匙a会参与加解密  
	$keya = md5(substr($key, 0, 16));  
	// 密匙b会用来做数据完整性验证  
	$keyb = md5(substr($key, 16, 16));  
	// 密匙c用于变化生成的密文  
	$keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';  
	// 参与运算的密匙  
	$cryptkey = $keya.md5($keya.$keyc);  
	$key_length = strlen($cryptkey);  
	// 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，解密时会通过这个密匙验证数据完整性  
	// 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确  
	$string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;  
	$string_length = strlen($string);  
	$result = '';  
	$box = range(0, 255);  
	$rndkey = array();  
	// 产生密匙簿  
	for($i = 0; $i <= 255; $i++)
	{  
		$rndkey[$i] = ord($cryptkey[$i % $key_length]);  
	}  
	// 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度  
	for($j = $i = 0; $i < 256; $i++)
	{  
		$j = ($j + $box[$i] + $rndkey[$i]) % 256;  
		$tmp = $box[$i];  
		$box[$i] = $box[$j];  
		$box[$j] = $tmp;  
	}  
	// 核心加解密部分  
	for($a = $j = $i = 0; $i < $string_length; $i++)
	{  
		$a = ($a + 1) % 256;  
		$j = ($j + $box[$a]) % 256;  
		$tmp = $box[$a];  
		$box[$a] = $box[$j];  
		$box[$j] = $tmp;  
		// 从密匙簿得出密匙进行异或，再转成字符  
		$result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));  
	}  
	if($operation == 'DECODE')
	{  
		// substr($result, 0, 10) == 0 验证数据有效性  
		// substr($result, 0, 10) - time() > 0 验证数据有效性  
		// substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16) 验证数据完整性  
		// 验证数据有效性，请看未加密明文的格式  
		if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16))
		{  
			return substr($result, 26);  
		}
		else
		{  
			return '';  
		}  
	}
	else
	{  
		// 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因  
		// 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码  
		return $keyc.str_replace('=', '', base64_encode($result));  
	}  
}





/**
 * 获取毫秒unix时间戳
 *
 */
function getMillisecond()
{
	list($t1, $t2) = explode(' ', microtime());
    return $t2 . ceil( ($t1 * 1000) );
}

/**
 * 获取完整的url地址
 *
 */
function curPageURL() 
{
	$pageURL = (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == "https") ? 'https://' : 'http://';
	$pageURL .= $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
	return $pageURL;
}

/**
 * Fire PHP 调试
 *
 */
function sendFirephp($param = array())
{
	require_once APP_PATH.'Common/Lib/FirePHPCore/fb.php';
	fb($param);
}

/*
 * 递归函数 给数据的值进行urlencode  
 * @param type array
 * return true 
 * 用法：array_walk_recursive($data,"cb_es_fmt");
 *
 */

function cb_es_fmt(&$item,$key)
{    
    if(substr($item, 0, 4) <> "http"){

        $item = urlencode($item);
    }
}

/**
 * 字符串截取，支持中文和其他编码
 * static
 * access public
 * @param string $str 需要转换的字符串
 * @param string $start 开始位置
 * @param string $length 截取长度
 * @param string $charset 编码格式
 * @param string $suffix 截断显示字符
 * return string
 */
function msubstr($str, $start=0, $length, $charset="utf-8", $suffix=true)
{
    if(function_exists("mb_substr")){
        if ($suffix && mb_strlen($str)>$length)
            return mb_substr($str, $start, $length, $charset)."...";
        else
            return mb_substr($str, $start, $length, $charset);
    }
    elseif(function_exists('iconv_substr')) {
        if ($suffix && iconv_strlen($str)>$length)
            return iconv_substr($str,$start,$length,$charset)."...";
        else
            return iconv_substr($str,$start,$length,$charset);
    }
    $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
    $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
    $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
    $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
    preg_match_all($re[$charset], $str, $match);
    $slice = join("",array_slice($match[0], $start, $length));
    if($suffix) return $slice."…";
    return $slice;
}

//中文截取字符串
function CHsubstr($string, $start, $length) {
    if(strlen($string)>$length)
    {
        $str='';
        $len=$start+$length;
        $i = $start;
        while($i<$len)
        {
            if(ord(substr($string, $i, 1))>=128)
            {
                $str.=substr($string, $i, 3);
                $i = $i+ 3;
            }
            else
            {
                $str.=substr($string, $i, 1);
                $i ++;
            }
        }
        return $str.'...';
    }
    else
    {
        return $string;
    }
}

/**
 * 统一结构
 * @param  int $code 错误码
 * @param  string $msg 说明
 * @param  string $data 数据
 * @return array
 */
function output( $code, $msg, $data = '' ,$error ='') {
    $d = array();

    $d['success'] = ( $code == 200 ) ? true : false ;
    $d['code'] = $code;
    $d['message'] = $msg;
    $d['data'] = $data;
    $error ? $d['error'] = $error : '';
    return $d;

}

/*
 * 转换钱,保留2位小数
 * @param $value int 分
 * @return string
 * */
function convert_price( $value ) {
	if( empty($value) ) return 0;

	return sprintf( "%01.2f",$value/100 );
}

/**
 * 根据session id和当前时间生成traceId
 * @return string traceId
 */
function traceIdGen()
{
	$sessId = session_id();
	list($msec,$sec) = explode(' ',microtime());
	$timeStr = date('His').(int)($msec * 1000);
	return $sessId.$timeStr;
}

/*
 * 判断是否为手机端
 * @return
 * */
function is_mobile() {
    // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
    if (isset ($_SERVER['HTTP_X_WAP_PROFILE'])) return true;


    //此条摘自TPM智能切换模板引擎，适合TPM开发
    if(isset ($_SERVER['HTTP_CLIENT']) &&'PhoneClient'==$_SERVER['HTTP_CLIENT']) return true;

    //如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
    if (isset ($_SERVER['HTTP_VIA']))
        //找不到为flase,否则为true
        return stristr($_SERVER['HTTP_VIA'], 'wap') ? true : false;
    //判断手机发送的客户端标志,兼容性有待提高
    if (isset ($_SERVER['HTTP_USER_AGENT'])) {
        $clientkeywords = array(
            'nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap','mobile'
        );
        //从HTTP_USER_AGENT中查找手机浏览器的关键字
        if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
            return true;
        }
    }

    //协议法，因为有可能不准确，放到最后判断
    if (isset ($_SERVER['HTTP_ACCEPT'])) {
        // 如果只支持wml并且不支持html那一定是移动设备
        // 如果支持wml和html但是wml在html之前则是移动设备
        if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
            return true;
        }
    }
    return false;
}

/*
 * 判断浏览器类型
 * @return
 * */
function getBrowser(){
    $agent=$_SERVER["HTTP_USER_AGENT"];
    if(strpos($agent,'MSIE')!==false || strpos($agent,'rv:11.0')) //ie11判断
        return "ie";
    else if(strpos($agent,'Firefox')!==false)
        return "firefox";
    else if(strpos($agent,'Chrome')!==false)
        return "chrome";
    else if(strpos($agent,'Opera')!==false)
        return 'opera';
    else if((strpos($agent,'Chrome')==false)&&strpos($agent,'Safari')!==false)
        return 'safari';
    else
        return 'unknown';
}

/**
 * 判断浏览器版本
 * @return version
 */
function getBrowserVer(){
    if (empty($_SERVER['HTTP_USER_AGENT'])){    //当浏览器没有发送访问者的信息的时候
        return 'unknow';
    }
    $agent= $_SERVER['HTTP_USER_AGENT'];
    if (preg_match('/MSIE\s(\d+)\..*/i', $agent, $regs))
        return $regs[1];
    elseif (preg_match('/FireFox\/(\d+)\..*/i', $agent, $regs))
        return $regs[1];
    elseif (preg_match('/Opera[\s|\/](\d+)\..*/i', $agent, $regs))
        return $regs[1];
    elseif (preg_match('/Chrome\/(\d+)\..*/i', $agent, $regs))
        return $regs[1];
    elseif ((strpos($agent,'Chrome')==false)&&preg_match('/Safari\/(\d+)\..*$/i', $agent, $regs))
        return $regs[1];
    else
        return 'unknow';
}

/*
 * 获取变量
 * @param $data string 值
 * @return string
 * */
function _get( &$data ) {
    return $data;
}

/**
 * rsa私钥解密
 * @param $encrypted		已加密的字符
 * @return $decrypted       解密后的字符
 */
function  rsa_private_decrypt($encrypted)
{
    //echo $private_key;
    $private_key = file_get_contents(C('RSA_PRIVATE_PATH'));
    $pi_key =  openssl_pkey_get_private($private_key);//这个函数可用来判断私钥是否是可用的，可用返回资源id Resource id
    openssl_private_decrypt(base64_decode($encrypted),$decrypted,$pi_key);//私钥解密
    return $decrypted ;
}

/**
 * 过滤并验证Jsonp的Callback参数
 * @param String $str
 * @return boolean
 */
function formatJsonpParams($str) {
    $jsonpCallback = array("success_jsonpCallback","join_list_callback","detail_jsonpCallback","comm_header_jsonpCallback");
    $str= urldecode($str);
    $str = preg_replace( "@<script(.*?)</script>@is", "", $str );
    $str = preg_replace( "@<iframe(.*?)</iframe>@is", "", $str );
    $str = preg_replace( "@<style(.*?)</style>@is", "", $str );
    $str = preg_replace( "@<(.*?)>@is", "", $str );
    if(empty($str) || !in_array($str, $jsonpCallback)){
        return false;
    }
    return true;
}

/*
 * 验证是否是可信任的referer
 * @param String $str
 * @return boolean
 * */
function isTrustedDomain($referer){
    $domain = ['.gomeplus.com','.meixincdn.com', '.atguat.net.cn', '.atguat.com.cn','.gomein.net.cn','.uatplus.com','.gome.com.cn'];
    $referer = parse_url($referer);
    $isTrue = false;
    foreach ($domain as $d){
        if( strpos($referer['host'],$d)){
            $isTrue = true;
            break;
        }
    }
    return $isTrue;
}

/*
 * 清除XSS
 * */

function xss_clean($html)
{
	static $antiXss;
	if (null === $antiXss) {
		$antiXss = new \voku\helper\AntiXSS();
	}
	return $antiXss->xss_clean($html);
}

/**
 * xss clean recursive
 */
function xss_clean_recursive($data)
{
	if (is_array($data)) {
		foreach ($data as $key => $value) {
			$data[$key] = xss_clean_recursive($value);
		}
	} elseif (is_string($data)) {
		$data = xss_clean($data);
	}
	return $data;
}

//手机号验证
function checkMobile($mobile)
{
	if (!$mobile) {
		return false;
	}
	if (!preg_match('/^1[345789]\d{9}$/', $mobile)) {
		return false;
	}
	return true;
}


/*
 * 验证码计数
 * @maoxiaoqi
 * @param code int 错误码
 * @param type Y|N  Y=yes N=清除
 * @return int
 * */
function code_count( $code = 0, $type = 'Y' ) {
    if( $type == 'N' ) cookie( 'code_total', null );

    $total_num = authcode(cookie('code_total'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
	$code_num = ( !$total_num ) ? 1 : $total_num ;

    $arr = [422];
    if( in_array( $code, $arr ) ) {

        $auth_num = authcode($code_num + 1, 'ENCODE', C('ENCRYPT_COOKIE_KEY'));
        cookie('code_total', $auth_num, 3600);

		if( $total_num >= 3 ) return 1;
    }

    return 0;
}


/*
 * 检查验证码
 * @maoxiaoqi
 * @param $code string 验证码
 * @param $num 检查数量 默认3次
 * @return bool
 * */
function check_code( $code, $num = 4 ) {
	$setid  = xss_clean( I('param.setid', '') );

    $total_num = authcode(cookie('code_total'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));

	$config = [
		'seKey' => C( 'ENCRYPT_COOKIE_KEY' ),
	];

    if( $total_num >= $num && !( new \Think\Verify( $config ) )->check( $code, $setid) ) {
		return false;
    }
	return true;
}


function englishLetter($bool = true){
	
	$upperLetter = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Z','Y','Z');
	$lowerLetter = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
	return $bool ? $lowerLetter :  $upperLetter ;
}

/**
 * 业务日志记录
 * @param string $message
 * @param string $url
 * @param array $post_param
 * @param int $code
 */
function write_log($message,$url,$post_param,$code=200){
	if(!$message || !$url){
		return '';
	}

	$msg['curl_url'] = $url;
	$msg['curl_simple_url'] = ( stripos($url,'?') ) ? current(explode('?',$url)) : $url ;
	$msg['code'] = $code;
	$msg['message'] = $message;
	$msg['param'] = $post_param;
	$msg['log_master'] = 'api';
	$level = Think\Rsyslog::INFO;
	if($code != 200){
		$level = Think\Rsyslog::ERR;
	}
	Think\Rsyslog::write($msg,$level);
}

/*
 * 格式化时间戳
 * @param int $create_time 时间戳
 * @return string
 * */
function formatDateTime( $create_time, $format='Y.m.d' ) {
    $time = substr( $create_time, 0, 10);
    $time_str = time() - $time;
    if( $time_str < 60 ) {
        return '刚刚';
    }if( $time_str>=60 && $time_str < 3600  ) {
        return intval( $time_str/60 ).'分钟前';
    } else if( $time_str >= 3600 && $time_str < 3600*24 ) {
        return intval( $time_str/3600 ).'小时前';
    } else if( $time_str >= 3600*24 && $time_str < 3600*24*2) {
        return "昨天";
    } elseif($time_str >= 3600*24*2 && $time_str < 3600*24*8) {
        $time_num = intval($time_str / 86400);
        return $time_num.'天前';
    } else {

        return date( $format, $time );
    }
}

/**
 * 获取页面唯一的url地址
 *
 */
function curCanonicalURL()
{
    //过滤的参数
    $param = array('csid','intcmp','pagingid');
    $pageURL = APP_HTTP.$_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
    $info = parse_url($pageURL);
    if( isset($info['query']) && $info['query'] ){ //过滤埋点参数
        parse_str($info['query'], $output);
        foreach($param as $v){
            if(isset($output[$v] )){
                unset($output[$v]);
            }
        }
        $info['query'] =  http_build_query($output) ;
    }
    $newPageURL = '//'.$info['host'].$info['path'];
    if( isset($info['query']) && $info['query'] && !strpos($info['path'],'.html')){
        $newPageURL.='?'.$info['query'];
    }
    return $newPageURL;
}

/*
 * elastaicsearch 转义
 * by:maoxiaoqi
 * */
function es_url_replace( $str ) {
	if( empty($str) ) return false;

	$str = str_replace( '.', 'fdian', $str );
	$str = str_replace( '/', 'fxiegang', $str );
	$str = str_replace( ':', 'fmaohao', $str );
	$str = str_replace( '&', 'fhe', $str );
	$str = str_replace( '?', 'fwenhao', $str );
	$str = str_replace( '=', 'fdenghao', $str );
	$str = str_replace( '_', 'fxiahuaxian', $str );

	return strtolower( $str );
}

/**
 * deleteSocialCache 删除缓存
 * @param String type 类型 val: all group topic
 * @param String groupId 圈子Id
 * @param String topicId 话题Id
 * @return boolean true false
 */
function deleteSocialCache($type,$groupId,$topicId=''){

	$typeArr = ['all','group','topic'];
	if(!in_array($type,$typeArr)){
		return false;
	}
	$topicKey = 'p_t_' . $topicId;
	$groupkey = 'p_g_' . $groupId;

	if($type == 'all' && $topicId && $groupId){
		S($topicKey,null);
		S($groupkey,null);
		return 1;
	}elseif($type == 'group' && $groupId){
		return S($groupkey,null);
	}elseif($type == 'topic' && $topicId){
		return S($topicKey,null);
	}
}


function deleteCache($redisCluster,$type,$key)
{
    $typeArr = ['group' => 'p_g_', 'topic' => 'p_t_', 'home' => 'pc_home_'];
    if (!array_key_exists($type, $this->_typeArr)) {
        return false;
    }
    $obj_cluster = new RedisCluster(NULL, $redisCluster);

    $result  = $obj_cluster->get($typeArr[$type] . $key);

    if($result){
        $result = S($typeArr[$type] . $key, null);
        exit('key为'.$typeArr[$type] . $key.'的缓存删除成功');
    }else{
        exit('key为'.$typeArr[$type] . $key.'的缓存不存在。');
    }
}

function get_cache_k($prefix,$key=''){
	return C('cache_prefix.' . $prefix) . $key;
}

function get_whole_url($pathInfo){
    if(!strpos($pathInfo,'http')){
        $pathInfo = APP_HTTP.str_replace('//','',$pathInfo);
    }
    return $pathInfo;
}

/*
 * 生成随机字符串
 * */
function getRandStr($length=24){
	$chars = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');  
	$char_txt = '';  
	for($i = 0; $i < $length; $i++){  
	   $char_txt .= $chars[array_rand($chars)];  
	}
	return $char_txt;
}

/**
 * 记录运行日志
 * @param array $logExt 补充字段
 */
function writeErrorLog($logExt = [])
{
	$traceArr = debug_backtrace(false, 2);
	$logArr = [
		//请求路径
		'accessPath' => __SELF__,
		//请求对应文件
		'filePath' => $traceArr[0]['file'],
		//报错行号
		'errorLine' => $traceArr[0]['line'],
		//当前时间
		'nowTime' => date('Y-m-d H:i:s', NOW_TIME),
		//报错方法||函数
		'currFunction' => $traceArr[1]['function'],
		//入参
		'args' => $traceArr[1]['args']
	];

	$logArr = array_values($logArr);
	if(!empty($logExt))
	{
		$logExt = array_values($logExt);
		$logArr = array_merge($logArr, $logExt);
	}

	$logDir = C('ERROR_LOG_DIR');
	if(!is_dir($logDir))
	{
		mkdir($logDir, 0777);
	}

	$fileName = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME).'_'.date('y_m_d').'.log';

	foreach($logArr as &$val)
	{
		if(is_array($val))
		{
			$val = json_encode($val);
		}
	}

	$sepStr = '  ||  ';

	$logStr = implode($sepStr, $logArr);
	$logStr .= PHP_EOL;

	file_put_contents($logDir.$fileName, $logStr, FILE_APPEND);
}

/**
 * 生成客态页url
 * @param $userId   用户id
 * @return string
 */
function taUrlGen($userId)
{
	if(empty($userId))
	{
		return '';
	}

	$taUrl = APP_HTTP.C('ACTIVITY_URL').'warm/ta?';
	$t = encryptStr($userId);
	$taUrl .= 'u='.$userId.'&t='.$t;
	return $taUrl;
}

/**
 * 对传过来的字符串做散列操作
 * @param $str  待处理字符串
 * @return string
 */
function encryptStr($str)
{
	return md5(C('ACTIVITY_TA_KEY').$str);
}