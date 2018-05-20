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
 * | @程序功能： 搜索                                                      |
 * +----------------------------------------------------------------------+
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;

class SearchController extends BaseController {

    public function __construct() {
        parent::__construct();

        $this->search = D( 'Search' );
    }

    /*
     * 话题搜索
     * @param $_GET['word'] string 关键字
     * */
    public function topics() {
        $word =  I( "param.word", '',true );

        //页面数据
        $page_data = $this->get_topics( urlencode($word), 1, 1 )['data'];

        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => ( empty($_GET['word']) ) ? ' ' : $_GET['word']." - " )
        );

        //面包屑
        $crumbs = crumbsMap(
            array(
                "{{1}}" => APP_HTTP.C('MAIN_URL'),
                "{{2}}" => urldecode($word),
                "{{3}}" => ( isset($page_data['totalCount']) ) ? $page_data['totalCount'] : 0
            )
        );

        //模板变量
        $this->assign("selectWords",array('name'=>'话题','keyword'=>$_GET['word'],'selectkey'=>'topic') );
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('crumbs', $crumbs);
        $this->assign('word', htmlentities($_GET['word']));
        $this->display("Index/search_topics");
    }

    /*
     * 话题搜索 查看更多
     * @param $word string 关键字
     * @param $page_num int 分页
     * @param $pagesize int 分页数量
     * @return json
     * */
    public function topics_more() {
        $word =  I( "param.word", '', true ) ;
        $page_num = I( "param.page_num", 1 );
        $pagesize = I( "param.pagesize", 20 );
        if(empty($word)){
            echo $this->response( ['code'=>200,''] );exit;
        }
        $lists = $this->get_topics( urlencode($word), $page_num, $pagesize);
        foreach ($lists['data']['topics'] as $key=>&$item){
            if(isset($item['topic']['topicFirstPic'])){
                $item['topic']['topicFirstPic'] = getResizeImg($item['topic']['topicFirstPic'],230,0,"MEIXIN");
            }
            $item['user']['facePicUrl'] = getResizeImg($item['user']['facePicUrl'],60,60);
        }
        echo $this->response( $lists );
        exit;
    }

    /*
     * 获取话题搜索接口数据
     * @param $word string 关键字
     * @param $page_num int 分页
     * @param $pagesize int 分页数量
     * @return array();
     * */
    public function get_topics( $word, $page_num = 1, $pagesize = 20 ) {

        //接口
        $data = $this->search->getData(
            $this->search->search_topics,
            array(
                'pageNum' => $page_num,
                'pageSize' => $pagesize,
                'keyword' => $word,
            )
        );

        //处理数据
        if( isset( $data['data'] ) && !empty($data['data']['topics'])) {
            foreach( $data['data']['topics'] as $k => &$vv ) {
                if( isset( $vv['topic']['createTime'] ) ) {
                    $vv['topic']['time_str'] = formatDateTime( $vv['topic']['createTime'] );
                }
            }
        }

        return $data;
    }

    /*
     * 圈子搜索
     * */
    public function group() {
        $keyword = xss_clean( I( 'param.word', '' ) );

        $pagesize = 20;

        //获取圈子数据
        $lists = array();
        if( !empty($keyword) ) {
            $lists = $this->search->getData(
                $this->search->search_group,
                array(
                    'keyword' => rawurlencode( $keyword ),
                    'pageNum' => 1,
                    'pageSize' => $pagesize,
                )
            );

            //头像缩略图
            if( isset( $lists['data']['groups'] ) ) {
                foreach( $lists['data']['groups'] as $k => &$v ) {
                    $v['icon'] = getResizeImg($v['icon'], 100, 100);
                }
            }
        }

        $crumbs = crumbsMap( array( "{{1}}" => $keyword) );
        $seoMap = seoMap(
            '',
            array("{{1}}" => ( empty( $keyword ) ) ? ' ' : $keyword." - " )
        );

        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        //搜索显示
        $this->assign("selectWords",array('name'=>'圈子','keyword'=>$_GET['word'],'selectkey'=>'group'));
        $this->assign('q',  $keyword);
        $this->assign( 'lists', $lists['data']['groups']);
        $this->display( 'Index/group_search' );
    }

    
}
