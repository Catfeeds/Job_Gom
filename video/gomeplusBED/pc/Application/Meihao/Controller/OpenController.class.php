<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：OpenController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能：美号基础类                                                 |
 * +----------------------------------------------------------------------+
 * | Author:lishuai@gomeplus.com                                          |
 * +----------------------------------------------------------------------+
 * | Date:2016-01-05 17:15:36 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Meihao\Controller;
use Home\Controller\BaseController;

class OpenController extends BaseController
{

    protected $openinfo = null;
    protected $open = null;
	public function __construct()
	{
		parent::__construct();
		//协议地址不用检测状态，协议页面在index控制器 暂时这么判断一下
        if(  !(strtolower(CONTROLLER_NAME) =='index' && strtolower(ACTION_NAME) =='protocol') ){
            $this->open = D('Open');
            $this->cdStatus();
        }
	}


    //状态检查
    private function cdStatus(){

        $this->openinfo = $this->open->getData( $this->open->officialAccounts,[] );
        $result = $this->openinfo['data'];
        if( empty($result) || !$result['status']){//没有创建美号
            redirect('/account/type');
            exit;
        }else{ 
            //取头像缩略图
            $result['imageUrl'] =  getResizeImg($result['imageUrl'],'40','40','GFS','t');
            $this->assign('mh_info',$result);
        }
        //账号状态
        $status = $result['status'] ;//1：企业信息提交完成（企业账号开通第一步）、2：待审核（审核中）、3：审核成功、-1：审核失败、-2：冻结
        //账号类型
        $type = $result['type'] ;//0：用户；1：企业

        //圈子失效
        if( $status ==3 && $result['group']['status']==1){
            redirect('/failure/index');
            exit;
        }
        switch ( $status ){
            case 1:
                //企业信息提交完成了（进到完善账号信息）
                redirect('/account/perfectCompany');
                break;
            case 2:
                //跳转 待审核
                if( $type == 0 ){
                    redirect('/account/awaitPrivate');
                }else{
                    redirect('/account/awaitCompany');
                }
                break;
            case -1:

                //跳转审核失败页面
                if( $type == 0 ){
                    redirect('/account/failPrivate');
                }else{
                    redirect('/account/failCompany');
                }
                break;
            case -2:
                //跳转冻结页面
                redirect('/disabled/index');
                break;
        }

    }



}



