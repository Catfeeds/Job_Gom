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
    private $group  = null;
    private $praise = null;

    public function _initialize()
    {
        $this->group  = D('Group');
        $this->praise = D('Praise');
    }

    //用户主动加入圈子 - auth
    public function circle()
    {
        $param['groupId']    = I('param.groupId', '', 'string');//群组id
        $param['imId']       = I('param.imId', '', 'string');//群组成员在IM的ID
        $param['activityId'] = I('param.activityId', '', 'string');//群组成员在IM的ID
        $param['loginToken'] = $this->token;

        $groupData = $this->group->postData($this->group->group_circle_add, $param);
        $this->ajaxReturn($groupData);
    }

    /**
     * 话题/店铺点赞(取消点赞) - auth
     */
    public function praised()
    {
        $param['id']   = I('param.id', '0', 'string');
        $param['type'] = I('param.type', 1, 'intval');//默认店铺,类型 0:店铺 1:话题 2:美店
        $isPraise      = I('param.isPraise', 1, 'intval');//默认取消点赞，类型 0:取消点赞 1:点赞
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
        $param['groupId'] = I('param.groupId', '', 'string');//群组id
        $param['topicId'] = I('param.topicId', '', 'string');//话题ID
        $type = I('param.type', 1, 'intval');//类型传递 1，收藏 ；2 ，取消收藏

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
            'groupId' => 'required',
            'imId'    => 'required',
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
}
