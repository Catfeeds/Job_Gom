<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：Rsyslog.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：记录日志公共类.
 * +----------------------------------------------------------------------+
 * | Author:guojianing <guojianing@yolo24.com>
 * +----------------------------------------------------------------------+
 * | Date:2016-04-14 11:50:36 CST
 * +----------------------------------------------------------------------+
 */
namespace Think;

class Rsyslog {

    // 日志级别 从上到下，由低到高
    const EMERG     = 'EMERG';  // 严重错误: 导致系统崩溃无法使用
    const ALERT     = 'ALERT';  // 警戒性错误: 必须被立即修改的错误
    const CRIT      = 'CRIT';  // 临界值错误: 超过临界值的错误，例如一天24小时，而输入的是25小时这样
    const ERR       = 'ERR';  // 一般错误: 一般性错误
    const WARN      = 'WARN';  // 警告性错误: 需要发出警告的错误
    const NOTICE    = 'NOTIC';  // 通知: 程序可以运行但是还不够完美的错误
    const INFO      = 'INFO';  // 信息: 程序输出信息
    const DEBUG     = 'DEBUG';  // 调试: 调试信息
    const SQL       = 'SQL';  // SQL：SQL语句 注意只在调试模式开启时有效

    // 日志参数
    protected static $params  =  array(
        'project_name'  => 'gomeo2o_pc',   // 项目名称
        'type'          => '',      // 信息类型 error/debug/info/notice
        'method'        => 'file',  // 日志上传方式 file/http/redis/tcp
        'lbs_ip'        => '',      // 负载均衡ip
        'client_ip'     => '',      // 客户端ip
        'server_ip'     => '',      // 服务端ip
        'server_port'   => '',      // 服务端端口
        'referer'       => '',      // 上个页面
        'request_time'  => '',      // 请求时间
        'request_url'   => '',      // 请求url
        'request_method'=> '',      // 请求方式get post
        'request_params' => '',      // 请求参数
        'user_agent'    => '',      // User-Agent
        'session_id'    => '',      // session_id
        'user_id'       => '',      // 用户id
        'message'       => '',      // 全部信息
    );

    // 实例化并传入参数
    private static function initialize($options)
    {
        //将传入的数据和已有的进行合并
        if($options)
        {
            foreach($options as $key => $value)
            {
                if(isset(self::$params[$key]))
                {
                    self::$params[$key] = $value;
                }
            }
        }

        self::$params['lbs_ip']         = $_SERVER['REMOTE_ADDR'];
        self::$params['client_ip']      = self::get_client_ip(0, true);
        self::$params['server_ip']      = $_SERVER['SERVER_ADDR'];
        self::$params['server_port']    = $_SERVER['SERVER_PORT'];
        self::$params['referer']        = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
        self::$params['request_time']   = date('Y-m-d H:i:s');
        self::$params['request_url']    = (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) == "https" ? 'https://' : 'http://') . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        self::$params['request_method'] = $_SERVER['REQUEST_METHOD'];
        $request_params = $_SERVER['REQUEST_METHOD'] == 'POST' ? $_POST : $_GET ;
        //删除明文密码
        if( isset($request_params['password']) ){
            unset($request_params['password']);
        }
        if( isset($request_params['newPassword']) ){
            unset($request_params['newPassword']);
        }
        self::$params['request_params']  = http_build_query($request_params);
        self::$params['request_trace_id'] = isset($_SERVER['HTTP_REQUEST_TRACE_ID']) ? $_SERVER['HTTP_REQUEST_TRACE_ID'] : '';
        self::$params['user_agent']     = $_SERVER['HTTP_USER_AGENT'];
        self::$params['session_id']     = isset($_COOKIE['mx_pc_gomeplusid']) ? $_COOKIE['mx_pc_gomeplusid'] : '';
        self::$params['user_id']        = isset($_COOKIE['mx_pc_userId']) ? self::authcode($_COOKIE['mx_pc_userId'], 'DECODE', 'hf!a^s6&*@$f7_)@#34r(t3') : ''; // 解密
        
       
    }

    /**
     * 日志写入接口
     * @access public
     * @param array $msg 日志信息
     * @param string $level  写入级别
     * @return void
     */
    public static function write($msg = '', $level = Rsyslog::ERR,$options = array())
    {
        // 日志写入地址
        $destination = '/gomeo2o/logs/applog/pc/'.date('y_m_d').'.log';

        // 自动创建日志目录
        $log_dir = dirname($destination);
        if (!is_dir($log_dir))
        {
            mkdir($log_dir, 0755, true);
        }
        self::initialize($options);
        self::$params['type'] = $level;
        self::$params['message'] = self::text_format($msg);
        error_log("@cee: ".json_encode(self::$params, JSON_UNESCAPED_UNICODE)."\n", 3, $destination);
    }

    /**
     * $string： 明文 或 密文
     * $operation：DECODE表示解密,其它表示加密
     * $key： 密匙
     * $expiry：密文有效期
     */
    private static function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
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
     * 获取客户端IP地址
     * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
     * @param boolean $adv 是否进行高级模式获取（有可能被伪装）
     * @return mixed
     */
    private static function get_client_ip($type = 0,$adv=false) {
        $type       =  $type ? 1 : 0;
        static $ip  =   NULL;
        if ($ip !== NULL) return $ip[$type];
        if($adv){
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                $pos    =   array_search('unknown',$arr);
                if(false !== $pos) unset($arr[$pos]);
                $ip     =   trim($arr[0]);
            }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
                $ip     =   $_SERVER['HTTP_CLIENT_IP'];
            }elseif (isset($_SERVER['REMOTE_ADDR'])) {
                $ip     =   $_SERVER['REMOTE_ADDR'];
            }
        }elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     =   $_SERVER['REMOTE_ADDR'];
        }
        // IP地址合法验证
        $long = sprintf("%u",ip2long($ip));
        $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
        return $ip[$type];
    }

    /**
     * 对二级数组进行格式化,目的:
     * 1.防止中文,Rsyslog 送到es时报错
     * 2.避免太多字段在Kibana左侧展示
     * @param array $text
     * @return string
     */
    public static function text_format($text)
    {
        $text = self::array_filter_recursive($text);
        array_walk_recursive($text,'self::cb_es_fmt');
        return $text;
    }

    /**
     * 递归函数 如果数据里包含中文，则对数据的值进行urlencode
     * @param type array
     * return true
     * 用法：array_walk_recursive($data,"cb_es_fmt");
     */
    public static function cb_es_fmt(&$item,$key)
    {
        if(is_string($item) && preg_match("/\p{Han}+/u", $item)){
            $item = urlencode($item);
        }
    }

    /**
     * 为了防止空值对Field datatypes造成影响，对空值进行unset
     * @param $var
     * @return bool
     */
    public static function array_filter_recursive($input)
    {
        if(is_array($input))
        {
            foreach ($input as &$value)
            {
                if (is_array($value))
                {
                    $value = self::array_filter_recursive($value);
                }
            }
        }
        return is_array($input) ? array_filter($input) : $input;
    }
}
