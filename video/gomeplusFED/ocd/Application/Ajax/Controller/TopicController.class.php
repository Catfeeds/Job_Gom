<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TopicController.class.php                                 |
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

class TopicController extends BaseController
{
    private $topic= null;

    public function _initialize()
    {
        $this->topic = D('Topic');
        $this->topic_v2 = D('TopicV2');
    }

    /******************************************下面是V2*********************************************/
    /*
     * 一级话题回复
     * @return json
     * */
    public function first_v2() {

        if( empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);

        $param['replyType']    = I('param.reply_type', '');//类型 0:普通 1:商品 2:店铺 必填=数字
        $param['topicId']    = I('param.topicid', '');//话题ID 必填
        $param['pics']    = I('param.pics', array());//话题回复图片  数组
        $param['content']    = I('param.content', '');//话题内容字数在200字内含200字
        $param['shopId']    = I('param.shopid', 0);//如果topicType = 1 或者 =2 那么这个字段必填
        $param['itemId']    = I('param.itemid', 0);//如果topicType = 1 那么这个字段必填

                //过滤敏感词
        sensitive( $param['content'] );

        //转换类型
        $param['replyType'] = (int)$param['replyType'];

        $data = $this->topic_v2->postData($this->topic_v2->first_topic, $param);
        $this->ajaxReturn( $data );
    }


    /*
     * 二级回复
     * */
    public function second_v2() {

        if( empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);

        $param['topicId']    = I('param.topicid', '');//话题id
        $param['content']    = I('param.content', '');//内容字数在200字内含200字
        $param['topicReplyId']    = I('param.topic_reply_id', '');//一级话题回复id
        $param['topicSubReplyId']    = I('param.topic_subreply_id', '');//被回复的二级回复ID

        $data = $this->topic_v2->postData($this->topic_v2->second_topic, $param);
        $this->ajaxReturn( $data );
    }

    /******************************************下面是V1*********************************************/

    /**
     * @desc:一级话题回复
     * @return : json
     **/
    public function first()
    {
        $param['groupId']    = I('param.groupId', '', 'string');//群组id
        $param['imId']       = I('param.imId', '', 'string');//群组成员在IM的ID
        $param['businessId'] = I('param.businessId',0 , 'intval');//如果用户输入的话题不是普通话题那么必须输入此参数,商品需要输入商品id,店铺需要输入店铺id
        $param['topicType'] = I('param.topicType',0 , 'intval');//0:普通 1:商品 2:店铺
        $param['topicId'] = I('param.topicId', 0, 'string');//回复话题ID
        $param['pic'] = I('param.pic', '', 'string');//回复话题ID
        $param['content'] = I('param.content', '', 'string');//回复话题ID
        $param['shopId'] = I('param.shopId', '', 'string');//如果类型是 1 那么这个字段必填
        $param['loginToken'] = $this->token;


        //过滤敏感词
        sensitive( $param['content'] );

        $groupData = $this->topic->postData($this->topic->first_topic, $param);
        $this->ajaxReturn($groupData);
    }

    /**
     * @desc:话题详情页发表话题二级回复
     */
    public function second()
    {
        $param['groupId']    = I('param.groupId', '', 'string');//群组id
        $param['imId']       = I('param.imId', '', 'string');//群组成员在IM的ID
        $param['businessId'] = I('param.businessId',0 , 'intval');//如果用户输入的话题不是普通话题那么必须输入此参数
        $param['topicType'] = I('param.topicType',0 , 'intval');//0:普通 1:商品 2:店铺
        $param['topicId'] = I('param.topicId', 0, 'string');//回复话题ID
        $param['pic'] = I('param.pic', '', 'string');//按逗号隔开的图片地址
        $param['content'] = I('param.content', '', 'string');//话题内容字数在200字内含200字
        $param['replyId'] = I('param.replyId', '', 'string');//被回复id
        $param['replyImId'] = I('param.replyImId', '', 'string');//被回复用户imid
        $param['beReplyId'] = I('param.beReplyId', '', 'string');//被回复的二级回复ID
        $param['loginToken'] = $this->token;

        //过滤敏感词
        sensitive( $param['content'] );

        $groupData = $this->topic->postData($this->topic->second_topic, $param);
        $this->ajaxReturn($groupData);
    }
    
    public function _before_first()
    {
        $rules = [
            'groupId' => 'required',
            'imId'    => 'required',
            'topicType'    => 'required|integer',
            'topicId'      => 'required',
            //'content'      => 'required',//因测试提交一些特殊字符 例如 <br/> 导致没有通过验证，故撤销验证
            'businessId'   => 'required_if:topicType,1,topicType,2',
        ];
        $this->validate($rules);
    }

    public function _before_second()
    {
        $rules = [
            'groupId' => 'required',
            'imId'    => 'required',
            'topicType'    => 'required|integer',
            'topicId'      => 'required',
            //'content'      => 'required',//因测试提交一些特殊字符 例如 <br/> 导致没有通过验证，故撤销验证
            'replyId'      => 'required',
            'businessId'   => 'required_if:topicType,1,topicType,2',
        ];
        $this->validate($rules);
    }
    
}
