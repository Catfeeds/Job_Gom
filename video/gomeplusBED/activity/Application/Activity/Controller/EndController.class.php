<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                           |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：HelpController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                                                                                     |
 * +----------------------------------------------------------------------+
 * | Author:liluming <liluming@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2017-11-30                                     |
 * +----------------------------------------------------------------------+
 */

namespace Activity\Controller;
use Think\Controller;
class EndController extends Controller
{

     public function index(){
         $wap_url = APP_HTTP.C('WAP_URL');
         $imgpath = APP_HTTP.C('STATICPATH.IMG') . 'dist/20171212';
         $this->assign('wap_url',$wap_url);
         $this->assign('imgpath',$imgpath);
         $this->display( 'Index/end' );
     }
    
}
