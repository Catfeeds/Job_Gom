<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能： 圈子                                                      |
 * +----------------------------------------------------------------------+
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;
use Home\Service\BaseService;

class IndexController extends BaseController {

    public function __construct() {

        parent::__construct();
		$this->index = D( "Index" );

        //缓存时间
        $this->cachetime = 3600;

        //检查方法登录态
        $this->__check_user();
    }


    /*
     * 检查用户登录态
     * */
    private function __check_user() {

        //jump
        $_jump_lst = [ 'create' ];
        if( in_array( ACTION_NAME, $_jump_lst) ) {
            if( empty( $this->token ) || empty( $this->userId ) ) login_redirect( curPageURL() );
        }

        //JSON
        /*
        $_lst= [] ;
        if( in_array( ACTION_NAME, $_lst) ) {
            if( empty( $this->token ) && empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);
        }
        */

    }


	/*
	 * 圈子首页列表
	 * */
	public function index() {
        //KEY
        $cache_k = $this->_get_cache_k('tj12');

        //CMS URL全路径
        $url = C('CMS_URL').'interface/return-group-commend?is_preview=';

        //后台预览
        if( isset( $_GET['preview'] ) && $this->checkUrlKey( $_GET['preview'] ) ) {
            $url .= '1';
            $data = json_decode(curl_get( $url ), 1);
        } else {
            $url .= '0';
            if( !S($cache_k) ) {
                $data = json_decode(curl_get( $url ), 1);
                S($cache_k, $data, $this->cachetime);
            } else {
                $data = S($cache_k);
            }
        }


        //处理数据
        $lists = ( isset($data['data']) ) ? $data['data'] : array() ;
        foreach( $lists as $k => &$v ) {
            if( isset( $v['topics_ids'] ) && !empty( $v['topics_ids'] ) ) {
                $v['topics_ids'] = json_decode( $v['topics_ids'], 1 );
            }
        }

        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => "圈子列表" )
        );

        $this->assign('nav_active', 4);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign( "lists", $lists);
        $this->display( 'Index/group_lists' );
	}

    //与cms预览定义验证方式
	private  function checkUrlKey($string){
	    $urlKey = C('ENCRYPT_CMS_KEY');
	    $str = md5($urlKey.date("Ymd"));
	    if( $str === $string ){
	        return true ;
	    }else{
	        return false;
	    }
	}

	/*
	 * 创建圈子
	 * */
	public function create() {

		$cat_lists = $this->index->getData(
            $this->index->cat,
            array(
            )
        );

		$cat_lists = ( isset( $cat_lists ) && !empty( $cat_lists ) ) ? $cat_lists['data'] : array() ;

        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => "创建圈子" )
        );


        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
		$this->assign( "cat_lists", $cat_lists );
        $this->display( 'Index/create_group' );
	}

    public function get_error() {

        $code = I( 'get.code', '' );
        switch( $code ) {
            case 'group':
                $this->display('Public:error_group_verify');
                break;
            case 'topic':
                $this->display('Public:error_topic_verify');
                break;
			case 'topic_404';
				$this->assign( 'title', '抱歉！该话题已被删除' );
				$this->assign( 'message', '抱歉！该话题已被删除' );
				$this->assign( 'images', '/images/public/404-4.png' );
				$this->display("Public:error_code");
				break;
			case 'group_dissolve':
				$this->assign( 'title', '该圈子已被创建人解散.' );
				$this->display("Public:error_group_dissolve");
				break;
			case '500':
				$this->assign( 'title', '抱歉！服务器君正在打盹' );
				$this->assign( 'message', '抱歉！服务器君正在打盹' );
				$this->assign( 'images', '/images/public/404-2.png' );
				$this->display("Public:error_code");
				break;

        }

    }

    /*
     * 获取当前全路径
     * */
    public function _get_cache_k( $value ) {
        if( !empty( $value ) ) $value = '_'.$value;
        return MODULE_NAME.'_'.CONTROLLER_NAME.'_'.ACTION_NAME.$value;
    }
}
