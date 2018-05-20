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



/**
 * 返回商品详情页链接
 * @param $shopId
 * @param $productId
 * @param $sourceCode 订单来源
 * @return mixed|string
 */
function productDetailUrlGen($shopId, $productId, $skuId = 0, $kid = '')
{
    $url = APP_HTTP_GOME.C('GOME')['URL']['MALL_ITEM_URL'];
    if($productId){
        $url .= $productId;
    }
	if($skuId)
	{
		$url .= '-'.$skuId;
	}
	$url .= '.html';
	if($kid){
		$url .= '?kid='.$kid;
	}
    if($shopId){
	    if(false === strpos($url, 'html?')){
		    $url .= '?mid='.$shopId;
	    }else{
		    $url .= '&mid='.$shopId;
	    }
    }
    return $url;
}

/**
 * 返回店铺详情页链接
 * @param $shopId
 * @return mixed|string
 */
function shopDetailUrlGen($shopId)
{
    $url = APP_HTTP.C('MALL_URL');
    if($shopId)
    {
        $url .= 'shop/'.$shopId.'.html';
    }
    return $url;
}

/**
 * 返回美店店铺详情页链接
 * @param $mshopId  美店id
 * @return mixed|string
 */
function mshopDetailUrlGen($mshopId)
{
	$url = APP_HTTP.C('MEIDIAN_URL');
	if($mshopId)
	{
		$url .= 'shop-'.$mshopId.'.html';
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
	
	$curlHandler = new CurlHandler();
	$cartUri = C('GOME')['SERVICE']['CART'].C('GOME_API')['cartNum'];
	$cartRes = $curlHandler->request($cartUri, array(), 'get');
	$cartArr = json_decode($cartRes, true);
	if(!empty($cartArr['success']))
	{
		$cartNum = intval($cartArr['data']);
	}
	
	//记录日志
	if(empty($cartArr['errMsg']))
	{
		$cartArr['errMsg'] = 'no message';
	}
	
	if(!empty($cartArr['success']))
	{
		write_log($cartArr['errMsg'], $cartUri, array());
	}
	else
	{
		if(empty($cartArr['errCode']))
		{
			$cartArr['errCode'] = 500;
		}
		
		//把接口返回数据填充在日志信息里
		$dataAppend = $cartRes;
		if(is_array($cartRes))
		{
			$dataAppend = json_encode($cartRes);
		}
		
		$cartArr['errMsg'] = $cartArr['errMsg'] . '###' . $dataAppend;
		
		write_log($cartArr['errMsg'], $cartUri, array(), $cartArr['errCode']);
	}
	
	return $cartNum;
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
 * 返回标签搜索话题页地址
 * @param $tagId
 * @param $name
 * @return mixed|string
 */
function topicTaglUrlGen($tagId,$name='')
{
    if( $tagId === "" ) return ;
    $url = APP_HTTP.C('GROUP_URL').'tag/topic?tagId='.$tagId;
    if($name){
        $url.='&name='.urlencode($name);
    }
    return $url;
}

/**
 * 返回话题详情页地址
 * @param $topicId
 * @return mixed|string
 */
function topicDetailUrlGen($topicId)
{
    if( $topicId === "" ) return ;
	$url = APP_HTTP.C('GROUP_URL').'topic/'.$topicId.'.html';
    return $url;
}

/**
 * 返回圈子主页地址
 * @param $groupId
 * @param $isEssence 是否为精品
 * @return mixed|string
 */
function groupDetailUrlGen($groupId,$isEssence=0)
{
    if( $groupId === "" ) return ;
    if($isEssence == 1){
	   $url = APP_HTTP.C('GROUP_URL').'circle/'.$groupId.'_1.html';
    }else{
	   $url = APP_HTTP.C('GROUP_URL').'circle/'.$groupId.'.html';
    }
//     $url .= source_code( $sourceCode );
	return $url;
}

/**
 * 返回个人主页客态页面地址
 * @param $userId 客态页面用户ID
 * @param $currentUserId 当前登录用户ID
 * @param $loginStatus 用户登陆状态 3时表示用户真实登录
 * @return mixed|string
 */
function userInfoUrlGen($userId,$currentUserId=0,$loginStatus=0)
{
    if( $userId === "" ) return ;
    if($userId == $currentUserId && $loginStatus==3){
        $url = APP_HTTP.C('UCENTER_URL').'group/all';
    }else{
    	$url = APP_HTTP.C('GROUP_URL').'ta/'.$userId.'.html';
    }

//     $url .= source_code( $sourceCode );
	return $url;
}

/*
 * 表情列表
 * @by maoxiaoqi
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

	//by:maoxiaoqi  2017.01.11
	$faces['xu'] = '嘘'; $faces['hengheng'] = '哼哼';
	$faces['aimu'] = '爱慕'; $faces['caimi'] = '财迷';
	$faces['ye'] = '耶'; $faces['sikao'] = '思考';
	$faces['kulou'] = '骷髅'; $faces['tongku'] = '痛哭';
	$faces['gongxi'] = '恭喜'; $faces['wulian'] = '捂脸';
	$faces['heiha'] = '嘿哈'; $faces['jizhi'] = '机智';
	$faces['zhoumei'] = '皱眉'; $faces['anwei'] = '安慰';
	$faces['feiwen'] = '飞吻'; $faces['jianxiao'] = '奸笑';
	$faces['zhutou'] = '猪头'; $faces['meigui'] = '玫瑰';
	$faces['diaoxie'] = '凋谢'; $faces['aixin'] = '爱心';
	$faces['xinsui'] = '心碎'; $faces['dangao'] = '蛋糕';
	$faces['heshui'] = '喝水'; $faces['xigua'] = '西瓜';
	$faces['kafei'] = '咖啡'; $faces['pijiu'] = '啤酒';
	$faces['baobao'] = '包包'; $faces['gaogenxie'] = '高跟鞋';
	$faces['maozi'] = '帽子'; $faces['kouhong'] = '口红';
	$faces['qunzi'] = '裙子'; $faces['txu'] = 'T恤';
	$faces['kuzi'] = '裤子'; $faces['yanjing'] = '眼镜';
	$faces['taiyangjing'] = '太阳镜'; $faces['lazhu'] = '蜡烛';
	$faces['liwu'] = '礼物'; $faces['hongbao'] = '红包';
	$faces['yongbao'] = '拥抱'; $faces['taiyang'] = '太阳';
	$faces['yueliang'] = '月亮'; $faces['bianbian'] = '便便';
	$faces['zhadan'] = '炸弹'; $faces['caidao'] = '菜刀';
	$faces['woshou'] = '握手'; $faces['shengli'] = '胜利';
	$faces['zan'] = '赞'; $faces['ok'] = 'OK';
	$faces['gouyin'] = '勾引'; $faces['no'] = 'NO';
	$faces['dalian'] = '打脸'; $faces['baoquan'] = '抱拳';
	$faces['pingpangqiu'] = '乒乓球'; $faces['zuqiu'] = '足球';
	$faces['lanqiu'] = '篮球';

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
 * @param $source_type	美信图床:MEIXIN,在线图床:ONLINE,GFS 为默认
 * @$action c为裁剪 t为图片压缩
 */
function getResizeImg($orgin_url,$width,$hight=0,$source_type='GFS',$action='c'){
    $orgin_url = str_replace(['http:','https:'], '', $orgin_url);
    if(!$orgin_url || !$width){
        return $orgin_url;
    }
    //验证图片域名是否是已知图片服务器域名
    $availHost = array(
        '.meixincdn.com',
        '.atguat.net.cn',
        '.gomein.net.cn'
    );
    $img_arr = explode('/',$orgin_url);
    $isTrue = false;
    foreach ($availHost as $host){
        if( strpos($img_arr[2],$host)){
            $isTrue = true;
            break;
        }
    }
    if(!$isTrue) return $orgin_url;
    // 如果图片是img.atguat.net.cn或img.gomein.net.cn则返回原图
    if(substr($img_arr[2], 0,3) == 'img'){
        return $orgin_url;
    }
    switch ($source_type)
    {
        case 'MEIXIN':
            $imgUrl = getMeixinImg($orgin_url,$width,$hight);
            break;
        case 'ONLINE':
            $imgUrl = getGomeResizeImg($orgin_url,$width,$hight);
            break;
        default :
            $imgUrl = getGFSResizeImg($orgin_url,$width,$hight,$action);
            break;
    }
    return $imgUrl;
}

/**
 * 美信和商城图片服务融合后的裁图方法
 * @param $orgin_url 	原始url,必选
 * @param $width	 	需要图片宽度,必选
 * @param $hight		需要图片高度,若传递0则为高自适应状态，必选
 * @$action c为裁剪 t为按比例缩小
 */
function getGFSResizeImg($orgin_url,$width,$hight,$action){
    $imgSize = C('gomeAllImgSze.cutSize');
    $thumbnailSize = C('gomeAllImgSze.thumbnailSize');
    //$hight = (intval($hight)===0)?'auto':$hight;
    $img_key = $width.'_'.$hight;
    $imgSizeArr = ($action == 'c') ? $imgSize : $thumbnailSize;
    if(in_array($img_key ,$imgSizeArr)){
        $defaultExt = '.jpg';

        $img_url = pathinfo($orgin_url);

        //如果是Gif图片则不裁图
        if($img_url['extension'] == 'gif'){
            return str_replace('gif','jpg',$orgin_url);
        }
        //忽略默认图片
        if(stripos($img_url['filename'],'default') !== false){
            return $orgin_url;
        }
        $img_arr = explode('/',$orgin_url);

        //判断图片地址中是否有类似_100_56和_100的尺寸，将其替换为空
        $img_url_array = explode('_',$img_url['filename']);

        $repString = '';
        foreach ($img_url_array as $img){
            $img = str_replace('c','',$img);
            $repString .= is_numeric($img) ? '_'.$img : '';
        }

        $tmpString = (substr_count($repString,'_') == 1) ? $repString.$repString : $repString;
        $tmpString = ltrim($tmpString,'_');
        $repString = ltrim($repString,'_');

        if($tmpString && ( in_array($tmpString,$imgSize) || in_array($tmpString, $thumbnailSize)) ) {
            $orgin_url = str_replace(['_'.$repString,'_c'.$repString], '',$orgin_url);
        }
        //根据$width,$hight，拼接一个新的图片链接
        if(isset($img_arr[0]) && isset($img_arr[2]) && isset($img_url['filename']) ){
            $newImgExt = ($action == 'c') ? '_c'.$img_key.$defaultExt : '_'.$img_key.$defaultExt ;

            return preg_replace("/.(png|jpg|jpeg|gif).*$/", $newImgExt, $orgin_url);
        }
    }
    return $orgin_url;
}
/**
 * 从美信图床获取所需尺寸的图片
 * @param $orgin_url 	原始url,必选
 * @param $width	 	需要图片宽度,必选
 * @param $hight		需要图片高度,若传递0则为高自适应状态，必选
 */
function getMeixinImg($orgin_url,$width,$hight){
    $imgSize = C('allImgSze');
    $hight = (intval($hight)===0)?'auto':$hight;
    $img_key = $width.'x'.$hight;
    if(isset($imgSize[$img_key])){
        $defaultExt = 'jpg';

        $img_url = pathinfo($orgin_url);
        //忽略默认图片
        if(stripos($img_url['filename'],'default') !== false){
            return $orgin_url;
        }
        $img_arr = explode('/',$img_url['dirname']);
        if(isset($img_arr[0]) && isset($img_arr[2]) && isset($img_url['filename'])){
            return str_replace('.gif','.jpg',$orgin_url).'.'.$imgSize[$img_key].'.'.$defaultExt;
        }
    }
    return $orgin_url;
}

/**
 * 从在线图床获取所需尺寸的图片
 * @param $orgin_url 	原始url,必选
 * @param $width	 	需要图片宽度,必选
 * @param $hight		需要图片高度,若传递0则为高自适应状态，必选
 * @return url
 */
function getGomeResizeImg($orgin_url,$width,$hight=0){

    $img_info = pathinfo($orgin_url);
    
    if(isset($img_info['extension']) && !in_array($img_info['extension'], ['jpg','jpeg','png','gif'])){
        $img_info['filename'] = $img_info['filename'].".".$img_info['extension'];
        unset($img_info['extension']);
    }
    $img_info['extension'] = isset($img_info['extension']) ? $img_info['extension'] : 'jpg';
    $last = substr($img_info['filename'], strrpos($img_info['filename'], '_')+1);
    $gomeAllImgSze = C('gomeAllImgSze');
    if($last && ( in_array($last."_".$last,$gomeAllImgSze['GFS']) || in_array($last, $gomeAllImgSze['IMG'])) ) {
        $img_info['filename'] = str_replace('_'.$last, '', $img_info['filename']);
    }
    $dirname_info = explode('//', $img_info['dirname']);
    $img_url = $orgin_url;
    if(isset($dirname_info[1])){
        $type = substr($dirname_info[1], 0,3);
        if($type == 'img'){
            $imgSize = $gomeAllImgSze['IMG'];
            if(in_array($width, $imgSize)){
                $img_url = $img_info['dirname']."/".$img_info['filename']."_".$width.".".$img_info['extension'];
            }
            
        }else if($type == 'gfs'){
            $img_key = $width.'_'.$hight;
            $imgSize = $gomeAllImgSze['GFS'];
            if(in_array($img_key, $imgSize)){
                $img_url = $img_info['dirname']."/".$img_info['filename']."_".$img_key.".".$img_info['extension'];
            }
        }
    }
    return $img_url;

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
    $common_service = D( "Services/Common" );
    if( empty($value)  || is_null($value)) return false;
    $result = $common_service->sensitive_check($value);
    if(!$result['success'] && $result['code'] == 422){
        return false;
    }
    if(!$result['success']){
        echo json_encode( output( 500, '您输入的内容带有敏感词，请重新输入', $result['data'] ) );
        exit;
    }
    /*
        $sensitive = load_config( APP_PATH.'Group/Conf/sensitive'.CONF_EXT );

        $str = implode( '|', $sensitive );

        if( preg_match( '/'.$str.'/i', $value, $m ) ) {
            echo json_encode( output( 500, '您输入的内容带有敏感词，请重新输入', $m[0] ) );
            exit;
        }*/
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

/*
 * 获取收货地址
 * @note    优先级:cookie > BS默认收货地址 > 北京北京市北京市下第一个区（比如东城区） > 北京北京市东城区（四级联动接口调用失败时）
 * @return  array()
 * @example array(
 *              'province' => array('id'=>'11000000', 'name'=>'北京'),
 *              'city' => array('id'=>'11010000', 'name'=>'北京市')
 *              'borough' => array('id'=>'11011400', 'name'=>'东城区')
 *          )
 * */
function getAddrInfo()
{
    $defaultAddr = array();
	$cookieArr = array();
	
	//四级联动接口调用失败时作备用
    $defaultAddr['province'] = array('id'=>'11000000', 'name'=>'北京');
	$defaultAddr['city'] = array('id'=>'11010000', 'name'=>'北京市');
	$defaultAddr['borough'] = array('id'=>'11011400', 'name'=>'东城区');
    
    if(cookie('addr'))
    {
        $cookieArr = json_decode(authcode(cookie('addr'), 'DECODE', C('ENCRYPT_COOKIE_KEY')), true);
		
		//$cookieArr['avail']：用户切换的收货地址
		if(!empty($cookieArr['avail']))
		{
			return $cookieArr['avail'];
		}
    }
    
    $addressV2 = D("Ucenter/AddressV2");
    
    if(cookie('userId'))
    {
        //取默认收货地址
        $res = $addressV2->getData($addressV2->defaultConsInfo, array(), false);
        if($res['success'] && $res['data']['isDefault'])
        {
            $defaultAddr['province'] = array('id'=>$res['data']['provinceId'], 'name'=>$res['data']['province']['name']);
        	$defaultAddr['city'] = array('id'=>$res['data']['cityId'], 'name'=>$res['data']['city']['name']);
        	$defaultAddr['borough'] = array('id'=>$res['data']['boroughId'], 'name'=>$res['data']['borough']['name']);
			$cookieArr['avail'] = $defaultAddr;
        }
    }
	
	if(empty($cookieArr['avail']))
    {
		//$cookieArr['default']：系统默认的收货地址
		if(cookie('addr') && !empty($cookieArr['default']))
		{
			return $cookieArr['default'];
		}
		
        //获取默认城市下的第一个区
        $param = array();
        $param['id'] = $defaultAddr['city']['id'];
        $addrData = $addressV2->getData($addressV2->childAddrNodes, $param, false);
        if($addrData['success'] && !empty($addrData['data']['nodes']))
        {
            $defaultAddr['borough'] = array('id'=>$addrData['data']['nodes'][0]['id'], 'name'=>$addrData['data']['nodes'][0]['name']);
        }
		$cookieArr['default'] = $defaultAddr;
    }
    cookie('addr', authcode(json_encode($cookieArr), 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
    
    return $defaultAddr;
}

/**
 * 存储收货地址
 * @param   $provName   String  省份名称    必填
 * @param   $provId     Integer 省份ID      必填
 * @param   $cityName   String  城市名称    必填
 * @param   $cityId     Integer 城市ID      必填
 * @param   $borName    String  区域名称    必填
 * @param   $borId      Integer 区域ID      必填
 * @return  Boolean
 */
function saveAddrCookie($provName = '', $provId = 0, $cityName = '', $cityId = 0, $borName = '', $borId = 0)
{
    if(!$provName || !$provId || !$cityName || !$cityId || !$borName || !$borId)
    {
        return false;
    }
    
	$cookieArr = array();
	if(cookie('addr'))
    {
        $cookieArr = json_decode(authcode(cookie('addr'), 'DECODE', C('ENCRYPT_COOKIE_KEY')), true);
    }
	
    $cookieArr['avail']['province'] = array('id'=>$provId, 'name'=>$provName);
	$cookieArr['avail']['city'] = array('id'=>$cityId, 'name'=>$cityName);
	$cookieArr['avail']['borough'] = array('id'=>$borId, 'name'=>$borName);    
    cookie('addr', authcode(json_encode($cookieArr), 'ENCODE', C('ENCRYPT_COOKIE_KEY')));
    
    return true;
}

/**
 * 联系客服||联系小美
 * @param   $type string  类型（小美 店铺 个人） 
 * @param   $id   int  店铺id    
 * @return  String 
 */
function imUrl( $type='xm',$id = 0 )
{
	$typeArr = array('xm','shop','user');
    if( !$id || !in_array($type, $typeArr) ){
    	$type = 'xm';
    }

    $query['imtype'] = $type;
    $query['imid'] = $id ;
    return APP_HTTP.C('UCENTER_URL').'im/index?'.http_build_query($query) ;
}

/**
 * 解析在线返回数据
 * @param   $jsonStr	jsonp数据 
 * @param   $callback   获取在线数据时传递的回调函数    
 * @return  array() 
 */
function analyzeOnline($jsonStr = '', $callback = '')
{
	if(empty($jsonStr))
	{
		return array();
	}
	
	if(empty($callback))
	{
		return json_decode($jsonStr, true);
	}
	
	return json_decode(substr($jsonStr, strlen($callback) + 1, -1), true);
}

/**
 * 返回区域信息
 * @return  
 *	array(
 *		'provId' => '11000000',	//一级区域ID
 *		'cityId' '11010000',	//二级区域ID
 *		'borId' => '默认（11010200',	//三级区域ID
 *		'areaId' => '110102002）',		//四级区域ID
 *		'address' => '北京北京市朝阳区朝外街道'	//详细信息
	)
 * note：
 *		优先级：cookie -》 默认（11010200|北京北京市朝阳区朝外街道|11010000|11000000|110102002）
 *				三级区域|区域描述|二级区域|一级区域|四级区域
 */
function getAddrGome()
{
	if(!empty($_COOKIE['atgregion']))
	{
		$addrStr = $_COOKIE['atgregion'];
	}
	else
	{
		$addrStr = '11010200|北京北京市朝阳区朝外街道|11010000|11000000|110102002';
	}
	
	$addrArr = explode('|', $addrStr);
	$returnArr = array(
		'provId' => empty($addrArr[3]) ? '' : $addrArr[3],
		'cityId' => empty($addrArr[2]) ? '' : $addrArr[2],
		'borId' => empty($addrArr[0]) ? '' : $addrArr[0],
		'areaId' => empty($addrArr[4]) ? '' : $addrArr[4],
		'address' => empty($addrArr[1]) ? '' : $addrArr[1]
	);
	
	return $returnArr;
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
 * 将链接中的协议替换为双协议
 * @param String $url URL链接
 * @return String 返回处理后的链接
 */
function handleUrl($url){
    return str_replace(['http:','https:'], '', $url);
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
    $newPageURL = APP_HTTP.$info['host'].$info['path'];
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
/*
 * 解析表情
 * @param $content string 字符串
 * */
function string_parse_face( $content, $size=false ) {
	if( empty($content) ) return $content;

	$faces = face_lists();
	foreach( $faces as $kk => $vv ) {
		if($size){
			$img = "<img src='{$vv['url']}' class='imoji' style='height:".$size."px; width:".$size."px'  data-original='{$vv['url']}' />";
		}else{
			$img = "<img src='{$vv['url']}' class='imoji' data-original='{$vv['url']}' />";
		}
		$content = str_replace( "[{$vv['name']}]", $img, $content );
	}
	return $content;
}

/**
 * 获取圈子分类URL
 * @param $category_id 分类Id
 * @return string
 */
function groupCatUrlGen($category_id)
{

    if( $category_id === "" ) return ;
    $category_id = 100000 + abs($category_id);
    $url = APP_HTTP.C('GROUP_URL').$category_id.'.html';

    return $url;
}

/**
 * 格式化数字
 * @param $num 数字参数
 * @return float
 */
function formatNum($num){
    $len = strlen($num);
    if($len >= 5 && $len <= 8){
        $num = is_int($num/10000) ? sprintf('%.2f',$num/10000) : $num/10000;

        $num = sprintf("%.1f万",substr($num, 0, -3));


    }if($len == 9){
        $num = is_int($num/100000000) ? sprintf('%.8f',$num/100000000) : $num/100000000;

        $num = sprintf("%.1f亿", substr($num, 0, -7));
    }
    return $num;
}


/**
 * 格式化数字,万和亿 整数直接返回不保留小数
 * @param $num 数字参数
 * @return float
 */
function formatNumber($num){

    $len = strlen($num);
    if($len >= 5 && $len <= 8){
        $num = $num/10000;
        if( is_int($num) ){
            $num = $num.'万';
        }else{
            $num = sprintf("%.2f万",$num);
        }
    }if($len == 9){
        $num = $num/100000000;
        if(is_int($num)){
            $num = $num.'亿';
        }
        else{
            $num = sprintf("%.2f亿", $num);
        }
    }
    return $num;
}



/*
 * 生成买点URL
 * @by maoxiaoqi
 * @param $uri url地址
 * @param $source_code 买点编码
 * @return uri|string
 * */
function maidian_uri( $uri, $source_code) {
	if( empty( $source_code ) ) return $uri;

	if( strstr( $uri, 'intcmp' ) ) return $uri;

	$str = "intcmp=$source_code";
	return ( !strstr( $uri, '?' ) ) ? $uri.'?'.$str : $uri.'&'.$str ;
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

 /*
 * 图片改成双协议
 * @param $src string 图片地址
 * @return string
 * */
function img_double_protocol( $src ) {
    if( !$src ) return $src;

    $src = str_replace( 'http:', '', $src );
    $src = str_replace( 'https:', '', $src );

    return $src;
}

