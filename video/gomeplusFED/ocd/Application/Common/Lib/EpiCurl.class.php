<?php
class EpiCurl
{
    const timeout = 3;
    static $inst = null;
    static $singleton = 0;
    private $mc;
    private $msgs;
    private $running;
    private $execStatus;
    private $selectStatus;
    private $sleepIncrement = 1.1;
    private $requests = array();
    private $responses = array();
    private $properties = array();

    function __construct()
    {
        if(self::$singleton == 0)
        {
            throw new Exception('This class cannot be instantiated by the new keyword.  You must instantiate it using: $obj = EpiCurl::getInstance();');
        }

        $this->mc = curl_multi_init();
        $this->properties = array(
            'code'  => CURLINFO_HTTP_CODE,
            'time'  => CURLINFO_TOTAL_TIME,
            'length'=> CURLINFO_CONTENT_LENGTH_DOWNLOAD,
            'type'  => CURLINFO_CONTENT_TYPE,
            'url'   => CURLINFO_EFFECTIVE_URL
        );
    }

    // simplifies example and allows for additional curl options to be passed in via array
    public function addURL($url,$options=array()) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);	// https请求 不验证证书和hosts
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        foreach($options as $option=>$value) {
            curl_setopt($ch, $option, $value);
        }
        return $this->addCurl($ch);
    }

    public function addCurl($ch)
    {
        $key = $this->getKey($ch);
        $this->requests[$key] = $ch;
        curl_setopt($ch, CURLOPT_HEADERFUNCTION, array($this, 'headerCallback'));

        $code = curl_multi_add_handle($this->mc, $ch);

        // (1)
        if($code === CURLM_OK || $code === CURLM_CALL_MULTI_PERFORM)
        {
            do {
                $code = $this->execStatus = curl_multi_exec($this->mc, $this->running);
            } while ($this->execStatus === CURLM_CALL_MULTI_PERFORM);

            return new EpiCurlManager($key);
        }
        else
        {
            return $code;
        }
    }

    public function getResult($key = null)
    {
        if($key != null)
        {
            if(isset($this->responses[$key]['data']))
            {
                return $this->responses[$key];
            }

            $innerSleepInt = $outerSleepInt = 1;
            while($this->running && ($this->execStatus == CURLM_OK || $this->execStatus == CURLM_CALL_MULTI_PERFORM))
            {
                usleep($outerSleepInt);
                $outerSleepInt *= $this->sleepIncrement;
                $ms=curl_multi_select($this->mc);
                if($ms >= CURLM_CALL_MULTI_PERFORM)
                {
                    do{
                        $this->execStatus = curl_multi_exec($this->mc, $this->running);
                        usleep($innerSleepInt);
                        $innerSleepInt *= $this->sleepIncrement;
                    }while($this->execStatus==CURLM_CALL_MULTI_PERFORM);
                    $innerSleepInt = 1;
                }
                $this->storeResponses();
                if(isset($this->responses[$key]['data']))
                {
                    return $this->responses[$key];
                }
                $runningCurrent = $this->running;
            }
            return null;
        }
        return false;
    }

    public function cleanupResponses()
    {
        $this->responses = array();
    }

    private function getKey($ch)
    {
        return (string)$ch;
    }

    private function headerCallback($ch, $header)
    {
        $_header = trim($header);
        $colonPos= strpos($_header, ':');
        if($colonPos > 0)
        {
            $key = substr($_header, 0, $colonPos);
            $val = preg_replace('/^\W+/','',substr($_header, $colonPos));
            $this->responses[$this->getKey($ch)]['headers'][$key] = $val;
        }
        return strlen($header);
    }

    private function storeResponses()
    {
        while($done = curl_multi_info_read($this->mc))
        {
            $key = (string)$done['handle'];
            $this->responses[$key]['data'] = curl_multi_getcontent($done['handle']);
            foreach($this->properties as $name => $const)
            {
                $this->responses[$key][$name] = curl_getinfo($done['handle'], $const);
            }
            curl_multi_remove_handle($this->mc, $done['handle']);
            curl_close($done['handle']);
        }
        //var_dump($this->responses);
    }

    static function getInstance()
    {
        if(self::$inst == null)
        {
            self::$singleton = 1;
            self::$inst = new EpiCurl();
        }

        return self::$inst;
    }
}

class EpiCurlManager
{
    private $key;
    private $epiCurl;

    function __construct($key)
    {
        $this->key = $key;
        $this->epiCurl = EpiCurl::getInstance();
    }

    function __get($name)
    {
        $responses = $this->epiCurl->getResult($this->key);
        return $responses[$name];
    }

    function __isset($name)
    {
        $val = self::__get($name);
        return empty($val);
    }
}


function multi_curl($kv=array()){
    if(!$kv || !is_array($kv)){
        return false;
    }

    $mc = EpiCurl::getInstance();

    $result = $log_arr = array();
    foreach($kv as $k=>$v){
        if(is_array($v)){
            $url = $v['url'];//接口地址
            if(isset($v['setopt']))
                $opt = $v['setopt'];//array(),curl_setopt的相关参数
            else
                $opt = array();

            $res_handler[$k] = $mc->addURL($url,$opt);
        }else{
            $result[$k] = false;//确保每个key都返回
        }
    }

    $bs_return = true;
    if(!empty($res_handler) && is_array($res_handler)){
    	foreach($res_handler as $k=>$temp){
    		if($temp){
    			$content = $temp->__get('data');
    			$result[$k] = $content;

                $j = array();
                if( !empty( $content ) ) {
                    $j = json_decode( $content, 1 );
                }
//                if( $k == 'hot_topics' ) $j['message'] = 1;

                if( ( isset( $j['success'] ) && $j['success']==false ) || (isset($j['code']) && $j['code']>0) || !empty( $j['message'] ) ){
                    $log_arr[$k] = $j;
                    $bs_return = false;
                }
    		}
    	}
    }

    //此处记录批量请求错误日志情况
    if($bs_return===false){
        Think\Rsyslog::write(array_merge($log_arr,array('muti_url'=>$kv,'traceId'=>traceIdGen())),Think\Rsyslog::ERR);
    }
	//加入调试模式
    if(APP_DEBUG === true){
        sendFirephp(array_merge($result,array('muti_url'=>$kv)));
    }
    return xss_clean_recursive($result);
}

