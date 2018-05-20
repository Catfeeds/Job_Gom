<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能： 首页                                                       |
 * +----------------------------------------------------------------------+
 * | Author:   lishuai@gomeplus.com                                       |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-12 10:20:06 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
class IndexController extends OpenController {

    public function __construct() {
        parent::__construct();
    }

    //首页2
    public function index(){
        $meihao = D('Meihao/Open');
        //美号和圈子浏览量信息
        $param['groupId'] = $this->openinfo['data']['group']['id'];
        $param['mAccountId'] = $this->openinfo['data']['id'];
        $totalInfo = $meihao->getData($meihao->totalInfo,$param);
        //文章列表
        $param = array();
        $param['pageNum'] = 1 ;
        $param['mAccountId'] = $this->openinfo['data']['id'];
        $param['pageSize'] = 5 ;
        $articleList = $meihao->getData($meihao->articleList,$param);

        //系统公告
        $param = array('pageNum'=>1,'pageSize'=>1);
        $messageList = $meihao->getData($meihao->messageList,$param);
        $this->assign('totalInfo',$totalInfo['data']);
        $this->assign('articleList',$articleList['data']);
        $this->assign('messageList',$messageList['data']);
        $this->assign('activeUrl','home');
        $this->display('Index/index');
    }



    //平台协议
    public function protocol(){
        $this->display('Index/protocol');
    }


    /**
     *-------------------------------------------------------------------------
     * @title：首页文章列表
     * @action：/index/articleList
     * @param：page:页码 ,类型:int
     * @date：2017-09-20
     *-------------------------------------------------------------------------
     */
    public function articleList(){
        $meihao = D("Meihao/Open");
        $param = array();
        $param['pageNum'] = I('param.page',1);
        $param['mAccountId'] = $this->openinfo['data']['id'];
        $param['pageSize'] = 5;
        $data = $meihao->getData($meihao->articleList,$param);
        $this->response($data);
    }

}
