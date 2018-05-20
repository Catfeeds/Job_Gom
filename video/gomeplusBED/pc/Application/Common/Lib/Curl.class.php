<?php
/**
 * A basic CURL wrapper
 *
 * See the README for documentation/examples or http://php.net/curl for more information about the libcurl extension for PHP
 *
 * @package curl
 * @author Sean Huber <shuber@huberry.com>
**/
namespace Common\Lib;
use Common\Lib\CurlResponse;

class Curl {

    /*
     * curl请求传递cookie
     * @by maoxiaoqi
     * */
    public $cookie_param = '';
    /**
     * The file to read and write cookies to for requests
     *
     * @var string
    **/
    public $cookie_file;
    
    /**
     * Determines whether or not requests should follow redirects
     *
     * @var boolean
    **/
    public $follow_redirects = true;
    
    /**
     * An associative array of headers to send along with requests
     *
     * @var array
    **/
    public $headers = array();
    
    /**
     * An associative array of CURLOPT options to send along with requests
     *
     * @var array
    **/
    public $options = array();
    
    /**
     * The referer header to send along with requests
     *
     * @var string
    **/
    public $referer;
    
    /**
     * The user agent to send along with requests
     *
     * @var string
    **/
    public $user_agent;
    
    /**
     * Stores an error string for the last request if one occurred
     *
     * @var string
     * @access protected
    **/
    protected $error = '';

    /**
     * Stores an error string for the last request if one occurred
     *
     * @var string
     * @access protected
     **/
    protected $errno = 0;

    /**
     * Stores an errorinfo string for the last request if one occurred
     *
     * @var string
     * @access protected
     **/

    
    /**
     * Stores resource handle for the current CURL request
     *
     * @var resource
     * @access protected
    **/
    protected $request;
    
    public $http_code;
    public $errorinfo;

    /**
     * Initializes a Curl object
     *
     * Sets the $cookie_file to "curl_cookie.txt" in the current directory
     * Also sets the $user_agent to $_SERVER['HTTP_USER_AGENT'] if it exists, 'Curl/PHP '.PHP_VERSION.' (http://github.com/shuber/curl)' otherwise
    **/
    function __construct() {
      	//$this->cookie_file = dirname(__FILE__).DIRECTORY_SEPARATOR.'curl_cookie.txt';
        $this->user_agent = 'Curl/PHP '.PHP_VERSION;
    }
    
    /**
     * Makes an HTTP DELETE request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars 
     * @return CurlResponse object
    **/
    function delete($url, $vars = array()) {
        return $this->request('DELETE', $url, $vars);
    }
    
    /**
     * Returns the error string of the current request if one occurred
     *
     * @return string
    **/
    function error() {
        return $this->error;
    }

    /**
     * Returns the error string of the current request if one occurred
     *
     * @return string
     **/
    function errno() {
        return $this->errno;
    }
    
    /**
     * Makes an HTTP GET request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars 
     * @return CurlResponse
    **/
    function get($url, $vars = array()) {
        return $this->request('GET', $url);
    }
    
    /**
     * Makes an HTTP HEAD request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse
    **/
    function head($url, $vars = array()) {
        return $this->request('HEAD', $url, $vars);
    }
    
    /**
     * Makes an HTTP POST request to the specified $url with an optional array or string of $vars
     *
     * @param string $url
     * @param array|string $vars 
     * @return CurlResponse|boolean
    **/
    function post($url, $vars = array()) {
        return $this->request('POST', $url, $vars);
    }
    
    /**
     * Makes an HTTP PUT request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars 
     * @return CurlResponse|boolean
    **/
    function put($url, $vars = array()) {
        return $this->request('PUT', $url, $vars);
    }
    
    /**
     * Makes an HTTP request of the specified $method to a $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $method
     * @param string $url
     * @param array|string $data
     * @return CurlResponse|boolean
    **/
    function request($method, $url, $data = array()) {
        $this->error = '';
        $this->errno = '';
        $this->errorinfo = '';
        $this->request = curl_init();
        $this->set_request_method($method,$url,$data);
        $this->set_request_headers();
        $response = curl_exec($this->request);
        $this->http_code = curl_getinfo($this->request, CURLINFO_HTTP_CODE);
        $this->error = curl_error($this->request);
        $this->errno = curl_errno($this->request);
        $this->errorinfo = curl_getinfo($this->request);
        curl_close($this->request);
        return $response;
    }
    
    /**
     * Formats and adds custom headers to the current request
     *
     * @return void
     * @access protected
    **/
    protected function set_request_headers() {
        $headers = array();
        foreach ($this->headers as $key => $value) {
            $headers[] = $key.': '.$value;
        }
        if($headers){
            curl_setopt($this->request, CURLOPT_HTTPHEADER, $headers);
        }
    }
    
    /**
     * Set the associated CURL options for a request method
     *
     * @param string $method
     * @return void
     * @access protected
    **/
    protected function set_request_method($method,$url,$data) {
        curl_setopt($this->request, CURLOPT_URL, $url);
        curl_setopt($this->request, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->request, CURLOPT_TIMEOUT, $this->options['TIMEOUT']); // 设置超时时间,单位(秒)
        curl_setopt($this->request, CURLOPT_HEADER, 0);
        curl_setopt($this->request, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($this->request, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($this->request, CURLOPT_COOKIE, $this->cookie_param);
        curl_setopt($this->request, CURLOPT_USERAGENT, isset( $_SERVER['HTTP_USER_AGENT'] ) ? $_SERVER['HTTP_USER_AGENT'] : '' );
        curl_setopt($this->request, CURLOPT_REFERER, $this->referer());
        switch (strtoupper($method)) {
            case 'POST':
                curl_setopt($this->request, CURLOPT_POST, 1);
                curl_setopt($this->request, CURLOPT_POSTFIELDS, $data);
                break;
            case 'DELETE':
                curl_setopt($this->request, CURLOPT_CUSTOMREQUEST, 'DELETE');
                break;
            case 'PUT':
                curl_setopt($this->request, CURLOPT_POSTFIELDS, $data);
                curl_setopt($this->request, CURLOPT_CUSTOMREQUEST, 'PUT');
                break;
        }
    }

    /*
     * 获取当前路径
     * */
    public function referer() {
        return APP_HTTP.$_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
    }

}