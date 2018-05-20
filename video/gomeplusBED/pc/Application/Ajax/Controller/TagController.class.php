<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TopicController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能：话题标签                                                      |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-27 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 **/

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

class TagController extends BaseController
{


    public function _initialize()
    {

    }

    /**
     *-------------------------------------------------------------------------
     * @title：用户自定义标签
     * @action：/ajax/tag/create
     * @param：name，    类型:string
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function create(){
        $param = array();
        $param['labelName'] =  I('post.name','','trim');
        if( !$param['labelName'] ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        if(strip_tags($param['labelName']) != $param['labelName']){
            $this->outError(\Think\ErrorCode::SQL_INJECT_ERR);
            exit;
        }
        //敏感词过滤
        $sensitive = load_config( APP_PATH.'Group/Conf/sensitive'.CONF_EXT );
        $sensitive_word = '';
        foreach($sensitive as $v){
            if(strstr($param['labelName'],$v)){
                $sensitive_word = $v;
                break;
            }
        }
        if($sensitive_word){
            $arrReturn['success'] = false;
            $arrReturn['code'] = \Think\ErrorCode::WORD_IS_ERROR;
            $arrReturn['message'] = \Think\ErrorCode::getErrMsg(ErrorCode::WORD_IS_ERROR);
            $arrReturn['data'] =$sensitive_word;
            $this->response($arrReturn);
        }
        $tag = D("Ajax/Tag");
        $data = $tag->postData($tag->create_tag,$param);
        $this->response($data);
    }

    /**
     *-------------------------------------------------------------------------
     * @title：搜索标签
     * @action：/ajax/tag/search
     * @param：keyword:标签名称 ,类型:string
     * @param：pageNum:分页页数 ,类型:int
     * @param：pageSize:分页页码 ,类型:int
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function search(){
        $param = array();
        $param['keyword'] =  I('get.keyword','');
        $param['pageSize'] = I('get.pageSize',20);
        $param['pageNum'] =  I('get.pageNum',1);
        if( !$param['keyword'] ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        $tag = D("Ajax/Tag");
        $data = $tag->getData($tag->search_tag,$param);
        $data['data']['keyword'] = $param['keyword'];
        $this->response($data);
    }

    /**
     *-------------------------------------------------------------------------
     * @title：搜索话题
     * @action：/ajax/tag/topic
     * @param：tagId:标签Id ,类型:string
     * @param：pageNum:分页页数 ,类型:int
     * @param：pageSize:分页页码 ,类型:int
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function topic(){
        $param = array();
        $param['tagId'] =  I('get.tagId','','trim');
        $param['pageSize'] = I('get.pageSize',20,'intval');
        $param['pageNum'] =  I('get.pageNum',1,'intval');
        if( !$param['tagId'] ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        $tag = D("Ajax/Tag");
        $data = $tag->getData($tag->search_topic,$param);
        if( $data['success'] ){
            foreach ($data['data']['topics'] as $key => &$value) {
                foreach ($value['components'] as &$component){
                    if($component['type'] == 'image'){
                        $component['url'] = getResizeImg($component['url'],230,0,"MEIXIN");
                    }else if($component['type'] == 'item'){
                        $component['item']['mainImage'] = getResizeImg($component['item']['mainImage'],260,346);
                    }
                }
                $value['user']['facePicUrl'] = getResizeImg($value['user']['facePicUrl'],60,60);
//                print_r($value);exit;
                $topicFirstPic = isset($value['components']) && $value['components'] ? $this->findFirstPic($value['components']) : '' ;
                $topicContent = isset($value['components']) && $value['components'] ? $this->findTopicContent($value['components']) : '' ;

                $data['data']['topics'][$key]['topic'] = array(
                    'name'=>$value['name'],
                    'topicFirstPic'=>$topicFirstPic,
                    'id'=>$value['id'],
                    'picType'=>$topicFirstPic ? 'image':'',
                    'topicReplyNum'=>$value['replyQuantity'],
                    'time_str'=>formatDateTime($value['createTime']),
                    'topicContent'=>$topicContent
                    );
            }
        }
        $this->response($data);
    }

    //查找第一张图片
    private function findFirstPic($lists){
        $topicFirstPic = '';
        foreach($lists as $k=>$v){

              if( $v['type']=='image' && $v['url'] ){
                    $topicFirstPic = $v['url'];
                    break;
              } 
        }
        return $topicFirstPic;
    }

    //查找第一张图片
    private function findTopicContent($lists){
        $topicContent = '';
        foreach($lists as $k=>$v){

              if( $v['type']=='text' && $v['text'] ){
                    $topicContent = $v['text'];
                    break;
              } 
        }
        return $topicContent;
    }
}
