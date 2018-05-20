<?php
/*
 * 统一登录
 * 接口地址:
 * 1.http://wiki.intra.gomeplus.com/pages/viewpage.action?pageId=17763349
 * 2.http://wiki.intra.gomeplus.com/pages/viewpage.action?pageId=17763382
 * */

namespace  Passport\Controller;
use Home\Controller\BaseController;

class UnifiedController extends BaseController {

    public function __construct() {
        parent::__construct();

        $this->url = $this->mx_domain['main'].'?unified_404';
        $this->login = D("LoginV2");

    }

    public function make_url() {
        $url = 'http://safe.atguat.com.cn:8009/myaccount/drainage/redirctIn?pageurl=http://www.atguat.com.cn';

        echo $this->mx_domain['passport']."unified/redirect?pageurl=".rawurlencode($url);
        echo '==v1';
    }

    /*
     * 在线 to 美信
     * @param get.token string 一次性token
     * @param get.pageurl string 跳转URL
     * @return 301
     * */
    public function into() {
        session_regenerate_id();
        $token = I( 'get.token', '' );
        $pageurl = I( 'get.pageurl', '' );
        if( empty($token) ) $this->_goto( $pageurl );

        $data = $this->login->postData(
            $this->login->gome_unified_login,
            [
                "gomeAccessToken" => $token
            ]
        );

        !$data['success'] && $this->_goto( $pageurl );

        $_data = ( isset( $data['data'] ) && !empty( $data['data'] ) ) ? $data['data'] : [] ;

        //登录
        if( isset( $_data['loginToken'] ) && isset( $_data['user']['id'] ) && !empty( $_data['user']['id'] ) ) {
            $this->login->saveCookie( $_data );

            //绑定手机号码
            if( isset( $_data['user']['isMobileActivated'] ) && !$_data['user']['isMobileActivated'] ) {

                $_SESSION['unified'] = ($pageurl) ? $pageurl : $this->mx_domain['main'] ;
                $this->_goto( '/login/bindphonepage' );
            }
        }
        //昵称
//        $_data['isNeedReset'] && $this->_goto( '/regist/indexnickname' );
        //走了
        $this->_goto( $pageurl );
    }

    /*
     * 美信 to 在线
     * @param get.pageurl string 跳转URL
     * @return 301
     * */
    public function redirect() {
        $pageurl = I( 'get.pageurl', '' );

        if( empty($pageurl) ) $this->_goto( $this->url );
        if( empty( $this->token ) && empty( $this->userId ) ) $this->_goto( $pageurl );

        //获取token
        $data = $this->login->getData(
            $this->login->gome_access_token
        );

        !$data['success'] && $this->_goto( $pageurl );

        if( isset( $data['data']['gomeAccessToken'] ) ) {
            $tmp = strpos( $pageurl, '?' ) ? '&' : '?' ;
            $pageurl .= $tmp.'token='.$data['data']['gomeAccessToken'];
        }

        //走了
        $this->_goto( $pageurl );
    }

    public function _goto( $uri = '' ) {
        if( empty($uri) ) $uri = $this->url;

        header('location:'.$uri);
        exit;

    }
}