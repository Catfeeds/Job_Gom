<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AccountController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能： 账号申请以及状态                                             |
 * +----------------------------------------------------------------------+
 * | Author:   lishuai@gomeplus.com                                       |
 * +----------------------------------------------------------------------+
 * | Date:2017-09-12 10:20:06 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Home\Controller\BaseController;
class AccountController extends BaseController {

    public function __construct() {
        parent::__construct();
        $this->open = D('Open');
        $result = $this->open->getData( $this->open->officialAccounts,[] );
        if( $result['data']['status'] == 3 ||  $result['data']['status'] == -2) {
            //跳转冻结页面
            redirect('/index/index');
        }
        $this->openinfo = $result['data'];

    }



    //选择类型
    public function type()
    {
        if ( !$this->openinfo ) {
            $this->display('Account/type');
            exit;
        }

        if ( $this->openinfo['status']==1 ) {
            redirect('/account/perfectCompany');
            exit;
        }

        if( $this->openinfo['status']==2 ){
            //跳转 待审核
            if( $this->openinfo['type'] == 0 ){
                redirect('/account/awaitPrivate');
            }else{
                redirect('/account/awaitCompany');
            }
            exit;
        }
        if( $this->openinfo['status']==-1 ){
            //跳转审核失败页面
            if( $this->openinfo['type'] == 0 ){
                redirect('/account/failPrivate');
            }else{
                redirect('/account/failCompany');
            }
            exit;
        }
    }

    //企业资质
    public function createCompany(){
        if( $this->openinfo && $this->openinfo['type'] ==1 && ($this->openinfo['status']==-1 || $this->openinfo['status']==1)  ){
            //美号信息
            $this->assign('info',$this->openinfo);
            $this->display('Account/editCompany');
        }else{
            if( !$this->openinfo ) {
                $this->display('Account/createCompany');
                exit;
            }
            $this->type();
        }
    }


    //完善美号
    public function perfectCompany(){
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        if( $this->openinfo && $this->openinfo['type'] ==1 && $this->openinfo['status']==-1 ) {
            //美号信息
            $this->assign('info',$this->openinfo);
            $this->display('Account/amendCompany');
        }else{
            if ( $this->openinfo['status']==1 ) {
                $this->display('Account/perfectCompany');
                exit;
            }
            $this->type();
        }
    }

    //完善账号信息页-个人
    public function createPrivate(){
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        if( $this->openinfo && $this->openinfo['type'] ==0 &&  $this->openinfo['status']==-1 ) {
            //美号信息
            $this->assign('info',$this->openinfo);
            $this->display('Account/amendPrivate');
        }else {
            if ( !$this->openinfo) {
                $this->display('Account/createPrivate');
                exit;
            }
            $this->type();
        }
    }




    //个人账号审核中
    public function awaitPrivate(){
        if( $this->openinfo['status']==-1 ){
            //跳转审核失败页面
            if( $this->openinfo['type'] == 0 ){
                redirect('/account/failPrivate');
            }else{
                redirect('/account/failCompany');
            }
            exit;
        }
        //美号信息
        $this->assign('info',$this->openinfo);
        $this->display('Account/awaitPrivate');
    }
    //个人账号审核失败
    public function failPrivate(){
        //美号信息
        $this->assign('info',$this->openinfo);
        $this->display('Account/failPrivate');
    }

    //企业账号审核失败
    public function failCompany(){
        //美号信息
        $this->assign('info',$this->openinfo);
        $this->display('Account/failCompany');
    }

    //企业账号审核中
    public function awaitCompany(){
        if( $this->openinfo['status']==-1 ){
            //跳转审核失败页面
            if( $this->openinfo['type'] == 0 ){
                redirect('/account/failPrivate');
            }else{
                redirect('/account/failCompany');
            }
            exit;
        }
        //美号信息
        $this->assign('info',$this->openinfo);
        $this->display('Account/awaitCompany');
    }



}
