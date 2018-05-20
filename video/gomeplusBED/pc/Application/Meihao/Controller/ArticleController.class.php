<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ArticleController.class.php                               |
 * +----------------------------------------------------------------------+
 * | @程序功能： 文章管理                                                  |
 * +----------------------------------------------------------------------+
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-05 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Meihao\Controller\OpenController;
use Common\Lib\Page;
class ArticleController extends OpenController {

    const PAGE_SIZE = 10;
    public function __construct() {
        parent::__construct();
    }

    /**
     * 获取已发文章列表
     */
    public function topicList(){
        $obj = D('Open');
        $pageNum = I('page', 1, 'intval');
        $pageSize = self::PAGE_SIZE;

        $param['mAccountId'] = $this->openinfo['data']['id'];
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;

        $result = $obj->getData($obj->articleList,$param);
        //print_r($result);die;

        if(!empty($result['data'])){
            $data = $result['data']['topics'];
            foreach ($data as $key=>$val){
                $pic = APP_HTTP.C('STATICPATH.IMG')."dist/images/public/img-error.png";
                $data[$key]['pic'] = empty($val['pic']) ? $pic : getResizeImg($val['pic'],'120','67');
            }
            //分页
            $page = new Page();
            $paramsUrl = $this->mx_domain['meihao'].'article/topicList?';
            $linkUrl =  $page->show($result['data']['totalTopicQuantity'], $pageSize, $pageNum, $paramsUrl);
            $this->assign('linkUrl',$linkUrl);
        }
        $this->assign('list',$data);
        $this->assign('activeUrl','topicList');
        $this->display('Article/list');
    }

    /**
     * 创建和修改文章
     * from 0-发布话题 1-已发话题 2-草稿箱
     */
    public function publish(){
        $tid = I( 'param.tid','');
        $from = I( 'param.from',0);
        $fromArr = [1,2];
        if($tid && !in_array($from,$fromArr)){
            $this->_empty();
            exit;
        }
        //随机字符 uid|token|随机数字符串|数时间戳
        do{
            $randStr1 =  $this->userId.'|'.$this->token.'|'.'addpage'.rand().'|'.time();
        }
        while( S(substr(md5($randStr1),8,16) ) );

        $pageId = authcode($randStr1,  'ENCODE', C('ENCRYPT_APP_KEY') );
        $qrcodeUrlmodel = APP_HTTP.C('MAIN_URL').'qrupload/index?pageId={pageId}&qrcodeId={qrcodeId}';

        $seoMap = seoMap();
        $crumbs = $from == 0 ? '新建文章' : '编辑文章';
        $this->assign('title', $seoMap['title']);
        $this->assign('crumbs', $crumbs);
        $this->assign('tid',$tid);
        $this->assign('from',$from);
        $this->assign('activeUrl','topicList');
        $this->assign('pageId',$pageId);
        $this->assign('qrcodeUrlmodel',$qrcodeUrlmodel);
        $this->assign('channel','meihao'); //前端用来判断发话题是否添加richJson字段
        $this->display('Article/publish');
    }
}