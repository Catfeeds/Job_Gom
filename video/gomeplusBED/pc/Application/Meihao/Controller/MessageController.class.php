<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：MessageController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能： 公告列表                                                       |
 * +----------------------------------------------------------------------+
 * | Author:   lishuai@gomeplus.com                                       |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-12 10:20:06 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;
class MessageController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    //系统通知分页
    public function index(){
        $expertObj = D('Meihao/Open');
        if($this->userInfo['loginStatus'] == 3){
         $result = $expertObj->getData( $expertObj->officialAccounts,[] );
         $this->assign('mh_info',$result['data']);
        }

        $param['pageNum'] = I('param.page',1);
        $param['pageSize'] = 5;
        $data = $expertObj->getdata($expertObj->messageList,$param);
        if( $data['data']['notifications'] ){
            foreach ($data['data']['notifications'] as $k=>$v){
                //$data['data']['notifications'][$k]['short_title'] = htmlentities(mb_substr($v['title'],0,30,'UTF-8'));
                $data['data']['notifications'][$k]['short_title'] = htmlentities($v['title']);
                $data['data']['notifications'][$k]['title'] = htmlentities($v['title']);
                $data['data']['notifications'][$k]['description'] = htmlentities($v['description']);
            }
        }
        //分页
        $page = new Page();
        $paramsUrl = $this->mx_domain['meihao'].'message/index';
        $linkUrl =  $page->show($data['data']['quantity'], $param['pageSize'], $param['pageNum'], $paramsUrl);

        $this->assign('message',$data['data']);
        $this->assign('message',$data['data']);
        $this->assign('linkUrl',$linkUrl);
        $this->display('Message/index');
    }

}
