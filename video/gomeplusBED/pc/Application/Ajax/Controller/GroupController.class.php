<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：GroupController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:zhanghuan <zhanghuan@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-27 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 **/

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

class GroupController extends BaseController
{

    public function __construct() {
        parent::__construct();
        $this->group  = D('Group/Group');
        $this->praise = D('Praise');
    }

    /*
     * 用户主动加入群
     * */
    public function circle() {
     /*   $param['groupId'] = I('param.groupid', '', 'string');//圈子id
        !empty( I('param.activityid', '', 'string') ) ? $param['activityId'] : '';//圈子活动id
        $data = $this->group->postData($this->group->group_circle_add,$param);
        $this->ajaxReturn($data);*/


        $param['groupId'] = I('post.groupid', '', 'string');//圈子id
        $param['activityId'] = I('post.activityid', '', 'string');//圈子活动id

        $data = $this->group->postData(
            $this->group->group_circle_add,
            $param
        );
        $this->response( $data );
        
    }

    /*
     * 用户退出圈子
     * */
    public function quit_circle(){
        $param['id'] = I('param.groupid', '', 'string');//圈子id
        $data = $this->group->postData(
            $this->group->member_quit,
            $param
        );
        $this->response( $data );
    }
    

    /**
     * 话题/店铺点赞(取消点赞) - auth
     */
    public function praised()
    {
        $groupId        = I('post.groupId', '', 'string');//群组id
        $param['id']    = I('post.id', '0', 'string');
        //数据类型 0:店铺 1:话题 2:美店（BS接口未提供2这个类型） 3:团购 4:有好货 5:一级回复点赞，默认1
        $param['type']  = I('post.type', 1, 'intval');
        $isPraise       = I('post.isPraise', 1, 'intval');//操作类型 0:取消点赞 1:点赞，默认1

        //对话题点赞，需清除缓存
        if (1 == $param['type']) {
            deleteSocialCache('all',$groupId,$param['id']);
        }

        if ($isPraise) {
            //点赞默认走post方法
            $data = $this->praise->postData($this->praise->praised, $param);
        } else {
            //取消点赞
            $data = $this->praise->deleteData($this->praise->praised, $param);
        }
        $this->ajaxReturn($data);
    }
    
    /**
     * 话题/店铺点赞人员列表 - auth
     *
     **/
    public function praiselist()
    {
        $param['id']        = I('param.id', '0', 'string');//查询点赞的标示
        $param['type']      = I('param.type', 0, 'intval');//默认店铺,类型 0:店铺 1:话题 2:美店
        $param['pageNum']   = I('param.pageNum', 10, 'intval');//分页页数 如果是full必传
        $param['pageSize']  = I('param.pageSize', 10, 'intval');//分页页数 如果是full必传
        $param['integrity'] = I('param.integrity', 'simple', 'string');//集成度
        $data               = $this->praise->getData($this->praise->praised_list, $param);
        $this->ajaxReturn($data);
    }
    
    public function topcollect() {
        $param['groupId'] = I('post.groupId', '', 'string');//群组id
        $param['topicId'] = I('post.topicId', '', 'string');//话题ID
        $type = I('post.type', 1, 'intval');//类型传递 1，收藏 ；2 ，取消收藏

        //清除缓存
        deleteSocialCache('all',$param['groupId'],$param['topicId']);
        if( $type == 1 ) {
            $data = $this->group->putData(
                $this->group->topic_collect,
                $param
                );

        } else {
            $data = $this->group->deleteData(
                $this->group->topic_collect,
                $param
                );
    
        }

        $this->ajaxReturn($data);
    }
    
    public function _before_circle()
    {
        $rules = [
            'groupid' => 'required',
        ];
        $this->validate($rules);
    }
    
    public function _before_praised()
    {
        $rules = [
            'id'   => 'required',
            'type' => 'required|integer',
        ];
        $this->validate($rules);
    }
    
    public function _before_topcollect()
    {
        $rules = [
            'groupId' => 'required',
            'topicId' => 'required',
            'type'    => 'required|integer',
        ];
        $this->validate($rules);
    }
    
    public function _before_praiselist()
    {
        $rules = [
            'id'   => 'required',
            'type' => 'required|integer',
        ];
        $this->validate($rules);
    }

    /**
     * 检测用户创建的圈子上限
     *
     */
    public function check(){
        $arrReturn = array();
        $arrInfo = $this->group->getData($this->group->check_circle);
        if($arrInfo['code'] == 403){
            $arrReturn['success'] = true;
            $arrReturn['check'] = 0;//不可以
            $arrReturn['msg'] = "";
        }
        elseif($arrInfo['code'] == 200){
            if($arrInfo['success']['data']['quantity'] >= 5){
                $arrReturn['success'] = true;
                $arrReturn['check']	= 0;//不可以
                $arrReturn['msg'] = "";
            }
            else{
                $arrReturn['success'] = true;
                $arrReturn['check']	 = 1;//可以
                $arrReturn['msg'] = "";
            }

        }
        else{
            $arrReturn['success'] = false;
            $arrReturn['check'] = "";
            $arrReturn['msg'] = '';
        }
        $this -> response($arrReturn);
    }
  
}
