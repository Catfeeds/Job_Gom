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
	curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 设置超时时间,单位(秒)
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
        $version_param['loginToken'] = session('token_'.$userId) ? session('token_'.$userId) : '';
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
	$pageURL = isset($_SERVER['HTTP_X_FORWARDED_PROTO']) == "https" ? 'https://' : 'http://';
	$pageURL .= $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
	return $pageURL;
}



/**
 *
 * 替换图片url地址
 *
 */
function replaceImage($url, $size = 260)
{
	if(! $url)
	{
		return '';
	}
	$sizes = array(260, 60, 360);
	if(in_array($size, $sizes))
	{
		$fileNameAry = pathinfo($url);
		return $fileNameAry['dirname'].'/'.$fileNameAry['filename'].'_'.$size.'.'.$fileNameAry['extension'];
	}
	else
	{
		return $url;
	}
}

/**
 *  时间转换
 * @param type $timestamp
 * @return type
 */
function humanDate($timestamp) {
	$seconds = time() - $timestamp;
	if($seconds > 31536000) {
		return date('Y-n-j',$timestamp);
	} elseif($seconds > 2592000) {
		return ceil($seconds / 2592000).'月前';
	} elseif($seconds > 86400) {
		return ceil($seconds / 86400).'天前';
	} elseif($seconds > 3600) {
		return ceil($seconds / 3600).'小时前';
	} elseif($seconds > 60) {
		return ceil($seconds / 60).'分钟前';
	} else {
		return $seconds.'秒前';
	}
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
 * seo
 * @param  string $attach         附加信息
 * @param  array  $replaceContent 要替换的内容  替换规则 array("{{1}}"=>"11111","{{2}}"=>"22222")
 * @return [type]                 [description]
 */
function seoMap($attach = '', $replaceContent = array()){
	$keystr = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME).'_'.strtolower(ACTION_NAME);

	if($attach){
		$keystr .= '_'.$attach;
	}

	$result = C($keystr);
	if($replaceContent){
		foreach ($result as $key => $row) {
			if($replaceContent && !empty($row)){
				foreach ($replaceContent as $rc => $value) {
					//if(strpos($rc, $row) >= 0 && $value!==""){
						$result[$key] = str_replace($rc, $value, $row);
						$row = $result[$key] ;
					//}
				}
			}
		}
	}
	return $result;
}


/*
 * 面包屑
 * @param array $replaceContent 要替换的内容 替换规则 array("{{1}}"=>"11111","{{2}}"=>"22222")
 * @result string
 * */
function crumbsMap( $replaceContent = array() ) {
	$keystr = strtolower(MODULE_NAME).'_'.strtolower(CONTROLLER_NAME).'_'.strtolower(ACTION_NAME);


	$keystr = 'crumbs_'.$keystr;
	$result = C($keystr);

	if($replaceContent){
		foreach ($replaceContent as $key => $value) {
			if( !$key ){
				continue;
			}

			$result = str_replace( $key, $value, $result );
			
		}
	}

	return $result;
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
        if ($suffix && strlen($str)>$length)
            return mb_substr($str, $start, $length, $charset)."...";
        else
            return mb_substr($str, $start, $length, $charset);
    }
    elseif(function_exists('iconv_substr')) {
        if ($suffix && strlen($str)>$length)
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
function output( $code, $msg, $data = '' ) {
    $d = array();

    $d['success'] = ( $code == 200 ) ? true : false ;
    $d['code'] = $code;
    $d['message'] = $msg;
    $d['data'] = $data;

    return $d;

}

/*
 * 格式化时间戳,目前给话题使用
 * @param int $create_time 时间戳
 * @return string
 * */
function formatTime( $create_time ) {
    $time = substr( $create_time, 0, 10);

    $time_str = time() - $time;

    if( $time_str < 3600 ) {
        return ceil( $time_str/60 ).'分钟前';
    } else if( $time_str <= 82800 ) {
        return ceil( $time_str/3600 ).'小时前';
    } else if( $time_str > 82800 && $time_str < 172800) {
        return "昨天";
    } elseif($time_str >= 172800 && $time_str <= 604800) {
        $time_num = intval($time_str / 86400);
        return $time_num.'天前';
    } else {
        return date( 'Y.m.d', $time );
    }
}

/**
 * 返回商品详情页链接
 * @param $shopId
 * @param $productId
 * @param $sourceCode 订单来源
 * @return mixed|string
 */
function productDetailUrlGen($shopId,$productId,$sourceCode=0)
{
    $url = APP_HTTP.C('MALL_URL');
    if($shopId && $productId)
    {
		//注意,预生产线上rewrite改变
        $url .= 'item/'.$shopId.'-'.$productId.'.html';
        $url .= source_code( $sourceCode );
    }
    return $url;
}

/**
 * 返回店铺详情页链接
 * @param $shopId
 * @param $sourceCode 订单来源
 * @return mixed|string
 */
function shopDetailUrlGen($shopId,$sourceCode=0)
{
    $url = APP_HTTP.C('MALL_URL');
    if($shopId)
    {
        $url .= 'shop/'.$shopId.'.html';
        $url .= source_code( $sourceCode );
    }
    return $url;
}

/*
 * 埋点相关
 * @param $sid int sourcecode
 * */
function source_code( $sid ) {

    $aid = I( 'param.activeid', '' );
    $url = '';
    if( $sid > 0 && !empty($aid)) {
        $url = "?csid={$sid}-A{$aid}";
    } else if( $aid>0 ) {
        $url = '?csid=A'.$aid;
    } else if( $sid > 0 ) {
        $url = '?csid='.$sid;
    }

    return $url;
}

/**
 * 返回当前用户购物车商品数量
 * @return int
 */
function cartProductNum()
{
    $cartNum = 0;
    $cart = D('Ajax/CarV2');
	if($cart->token){
		$userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$res_data = $cart -> getData($cart->shopping_num,array('userId'=>$userId));	
		if($res_data['success'] && !empty($res_data['data'])){
			$cartNum = $res_data['data']['quantity'];	
		}
	}
	
	if($cartNum > 99)
	{
		$cartNum = '99+';
	}

	return $cartNum;
	/*
    //购物车列表
    $cartNum = 0;
    $cart = D('Ajax/CarV2');
    if($cart->token)
    {
		//登录用户
		$res_data = $cart->getData($cart->shopping_cart,array('loginToken' => $cart->token));
		if( isset( $res_data['data']['shopingCartItems'] ) && !empty( $res_data['data']['shopingCartItems'] ))
		{
			$products = $res_data['data']['shopingCartItems'];
			foreach($products as $product)
			{
				if(isset($product['sku']['status'])
					&& isset($product['sku']['stock'])
					&& $product['sku']['stock'] > 0
					&& $product['sku']['status'] == 1
					&& isset($product['quantity']))
				{
					//购物车数量计算时无货或已下架商品不应计算在内
					$cartNum += $product['quantity'];
				}
			}
		}
    }
    return $cartNum;
	*/
}

/**
 * 返回当前用户购物车商品数量
 * @return int
 */
function cartProductNumReal()
{
    $cartNum = 0;
    $cart = D('Ajax/CarV2');
	if($cart->token){
		$userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
		$res_data = $cart -> getData($cart->shopping_num,array('userId'=>$userId));	
		if($res_data['success'] && !empty($res_data['data'])){
			$cartNum = $res_data['data']['quantity'];	
		}
	}
	
	return $cartNum;
}

/**
 * 返回话题详情页地址
 * @param $topicId
 * @param $sourceCode 订单来源
 * @return mixed|string
 */
function topicDetailUrlGen($topicId,$sourceCode=0)
{
    if( $topicId === "" ) return ;
	$url = APP_HTTP.C('GROUP_URL').'topic/'.$topicId.'.html';
    $url .= source_code( $sourceCode );
    return $url;
}

/**
 * 返回圈子主页地址
 * @param $groupId
 * @param $sourceCode 订单来源
 * @return mixed|string
 */
function groupDetailUrlGen($groupId,$sourceCode=0)
{
    if( $groupId === "" ) return ;
	$url = APP_HTTP.C('GROUP_URL').'circle/'.$groupId.'.html';

    $url .= source_code( $sourceCode );
	return $url;
}

/*
 * 表情列表
 * @param $url string 表情完整地址
 * @return array()
 * */
function face_lists( $url = '' ) {
	if( empty($url) ) $url = APP_HTTP.C('STATICPATH')['JS'].'dist/images/emoji/';

	$faces = $faces_arr = array();

	//表情列表
	$faces['weixiao'] = '微笑';  $faces['se'] = '色';
	$faces['qinqin'] = '亲亲'; $faces['deyi'] = '得意';
	$faces['liulei'] = '流泪'; $faces['haixiu'] = '害羞';
	$faces['bizui'] = '闭嘴';$faces['guzhang'] = '鼓掌';
	$faces['daku'] = '大哭'; $faces['ganga'] = '尴尬';
	$faces['shengqi'] = '生气'; $faces['tiaopi'] = '调皮';
	$faces['ciya'] = '呲牙'; $faces['jingya'] = '惊讶';
	$faces['weiqu'] = '委屈'; $faces['tuxue'] = '吐血';
	$faces['lenghan'] = '冷汗';$faces['zhuakuang'] = '抓狂';
	$faces['nanguo'] = '难过';$faces['touxiao'] = '偷笑';
	$faces['baiyan'] = '白眼';$faces['buxie'] = '不屑';
	$faces['kuaikule'] = '快哭了';$faces['kun'] = '困';
	$faces['zhuangku'] = '装酷';$faces['daxiao'] = '大笑';
	$faces['toumiao'] = '偷瞄';$faces['fendou'] = '奋斗';
	$faces['zhouma'] = '咒骂';$faces['yiwen'] = '疑问'; 
	$faces['yun'] = '晕';$faces['chuida'] = '捶打';
	$faces['zaijian'] = '再见';$faces['koubi'] = '抠鼻'; 
	$faces['fadai'] = '发呆';$faces['huaixiao'] = '坏笑';
	$faces['haqian'] = '哈欠';$faces['bishi'] = '鄙视';
	$faces['shuijiao'] = '睡觉';$faces['e'] = '饿';
	$faces['yinxian'] = '阴险'; $faces['nanshou'] = '难受'; 
	$faces['kelian'] = '可怜';$faces['piezui'] = '撇嘴';
	$faces['shihua'] = '石化'; $faces['leiyan'] = '泪眼';

	//diff 兼容
	$faces['qinqin_diff'] = '亲'; $faces['shengqi_diff'] = '愤怒';
	$faces['jingya_diff'] = '惊恐';$faces['weiqu_diff'] = '迷茫';
	$faces['nanguo_diff'] = '伤心';$faces['fendou_diff'] = '努力';
	$faces['huaixiao_diff'] = 'YY';$faces['nanshou_diff'] = '恶心';

 
	$i = 0;
	foreach( $faces as $k => $v ) {
		$faces_arr[$i]['name'] = $v;

		if( strpos( $k, '_diff' ) > 0 ) $k = substr($k, 0, -5);
		$faces_arr[$i]['url'] = $url.$k.'.png';
		$i++;
	}

	return $faces_arr;
}

/**
 * 生成购物流程ID,储存购物结算商品，收货地址等信息在缓存中
 */
function orderFlowIdGen()
{
	$userId = cookie('userId') == '' ? 0 : authcode(cookie('userId'), 'DECODE', C('ENCRYPT_COOKIE_KEY'));
	$fid = microtime(true).$userId;
	return $fid;
}

/**
 * 从图床获取所需尺寸的图片
 * @param $orgin_url 	原始url,必选
 * @param $width	 	需要图片宽度,必选
 * @param $hight		需要图片高度,若传递0则为高自适应状态，必选
 */
function getResizeImg($orgin_url,$width,$hight=0){
	if(!$orgin_url || !$width){
		return $orgin_url;
	}
	$imgSize = C('allImgSze');
	$hight = (intval($hight)===0)?'auto':$hight;
	$img_key = $width.'x'.$hight;
	if(isset($imgSize[$img_key])){
		$img_url = pathinfo($orgin_url);
		//忽略默认图片
		if(stripos($img_url['filename'],'.') !== false || stripos($img_url['filename'],'default') !== false){
			return $orgin_url;
		}
		$img_arr = explode('/',$img_url['dirname']);
		if(isset($img_arr[0]) && isset($img_arr[2]) && isset($img_url['filename']) && isset($img_url['extension'])){
			$img_domain = $img_arr[0].'//'.$img_arr[2].'/';
			return $img_domain.$img_url['filename'].'.'.$imgSize[$img_key].'.'.$img_url['extension'];
		}
	}
	return $orgin_url;
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
 * 商品在列表中显示的价格
 * @param $orginPrice
 * @param $price
 */
function show_list_price($orginPrice,$price){
    
    $_orginPrice = sprintf( "%01.2f", $orginPrice);
    $_price = sprintf( "%01.2f", $price);
	return ( $_orginPrice > $_price ) ? $_price : $_orginPrice ;
}

/**
 * desc :店铺等级与勋章计算
 * @param : [int] - $level - 默认为1级
 * @return: [array] - $data
 */
function levelMedal($level= 0 )
{
	$data = array();
	$level = intval($level);
	$level = $level > 0 ? $level : 0;
	if(!$level) return false;
	if($level < 5)
	{
		$data['medal'] = 'copper';
		$data['medalNum'] = $level;
	}
	else if($level < 9)
	{
		$data['medal'] = 'silver';
		$data['medalNum'] = $level-4;
	}
	else if($level < 12)
	{
		$data['medal'] = 'gold';
		$data['medalNum'] = $level-8;
	}
	//因考虑具体情况超过目前封顶级别,默认处理
	else
	{
		$data['medal'] = 'gold';
		$data['medalNum'] = 3;
	}
	return $data;
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
 * 登录 redirect跳转
 * @param $url string 需要跳转URL
 * @return
 * */
function login_redirect( $url ) {
    header('location:'.APP_HTTP.C('PASSPORT_URL').'login/index?redirect='.base64_encode($url));
}

/*
     * 敏感词过滤
     * @param $value string 字符串
     * */
function sensitive( $value ) {
    if( empty($value) ) return false;

    $value = html_entity_decode( $value );
    $sensitive = load_config( APP_PATH.'Group/Conf/sensitive'.CONF_EXT );

    $str = implode( '|', $sensitive );

    if( preg_match( '/'.$str.'/i', $value, $m ) ) {
        echo json_encode( output( 500, '您输入的内容带有敏感词，请重新输入', $m[0] ) );
        exit;
    }
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
 * 获取变量
 * @param $data string 值
 * @return string
 * */
function _get( &$data ) {
    return $data;
}


/*
 * 获取 sourceCode和active id
 * */
function get_source_active( $value ) {

    $data = $arr = array();
    if( strstr( $value, '-' ) ) {
        $exp = explode( '-', $value );

        foreach( $exp as $k => $v ) {

            $arr = source_active_data($v);
            $data[$arr['type']] = $arr['value'];
        }
    } else {

        $arr = source_active_data( $value );
        $data[$arr['type']] = $arr['value'];
        if( $arr['type'] == 'activityNo' ) {
            $data['sourceCode'] = '';
        } else {
            $data['activityNo'] = '';
        }
    }

    return json_encode( $data );
}

function source_active_data( $value ) {

    $data = array();
    if( substr( $value, 0, 1 ) == 'A' ) {
        $data['type'] = 'activityNo';
        $data['value'] = substr( $value, 1, strlen($value) );
    } else {
        $data['type'] = 'sourceCode';
        $data['value'] = $value;
    }
    return $data;
}

/**
 * 设置计数器
 * @param $key				计数KEY
 * @param int $expire_time	过期时间
 * @return array('count'=>'key的统计次数'，'ttl'=>'剩余时间')
 */
function setCounter($key,$expire_time=20){
	$cache = S([]);
	$count = $cache->incr($key);
	$ttl = $cache->ttl($key);
	if($ttl<0){
		$cache->expire($key,$expire_time);
	}
	return array('count'=>$count,'ttl'=>$ttl);
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
    $domain1 = '.gomeplus.com';
    $domain2 = '.meixincdn.com';
    $referer = parse_url($referer);
    if(strpos($referer['host'],$domain1)===false && strpos($referer['host'],$domain2)===false ){
        return false;
    }else{
        return true;
    }
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