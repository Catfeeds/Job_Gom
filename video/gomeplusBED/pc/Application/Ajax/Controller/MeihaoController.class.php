<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                      |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：MeihaoController.class.php                                   |
 * +----------------------------------------------------------------------+
 * | @程序功能：美号相关                                                     |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-27 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 **/

namespace Ajax\Controller;

use Ajax\Controller\BaseController;
use Common\Lib\CurlHandler;
class MeihaoController extends BaseController
{


    public function _initialize()
    {

    }
    private $addressId = '11010000';

    /**
     *-------------------------------------------------------------------------
     * @title：美号名称校验
     * @action：/ajax/meihao/nameCheck
     * @param：name:名称 ,类型:string
     * @param：id:美号id ,类型:int（非必填）
     * @date：2017-09-18
     *-------------------------------------------------------------------------
     */
    public function nameCheck(){
        $param['name'] = I('name','');
        if(!$param['name']){}
        $id = I('id',0);
        !empty($id) ? $param['id'] = $id : '';
        $meihao = D("Meihao/Open");
        $data = $meihao->postData($meihao->nameCheck,$param);
        $this->response($data);
    }


    /**
     *-------------------------------------------------------------------------
     * @title：分类列表
     * @action：/ajax/meihao/cateList
     * @param：name:名称 ,类型:string
     * @date：2017-09-18
     *-------------------------------------------------------------------------
     */
    public function cateList(){
        $circle_service = D("Services/Circle");
        $cat_lists = $circle_service->get_categories();
        $this->response($cat_lists);
    }

    /**
     *-------------------------------------------------------------------------
     * @title：标签列表
     * @action：/ajax/meihao/taglist
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function taglist(){
        //$param = array();
        /*if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }*/
        $meihao = D("Meihao/Open");
        $data = $meihao->getData($meihao->tagList);
        $this->response($data);
    }



    /**
     *-------------------------------------------------------------------------
     * @title：完善企业信息
     * @action：/ajax/meihao/createCompany
     * @param：enterpriseName:起码名称 ,类型:string
     * @param：businessLicenseNumber:营业执照注册号 ,类型:string
     * @param：businessLicenseImageUrl:营业执照图片URL ,类型:string
     * @param：operatorName:运营者姓名 ,类型:string
     * @param：operatorIDNumber:运营者身份证号 ,类型:string
     * @param：operatorPhone:运营者手机号 ,类型:string
     * @param：contactInformation:联系方式：QQ/微信/邮箱 ,类型:string =>
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function createCompany(){
        $param = array();
        $param['enterpriseName'] = (string)I('enterpriseName','');
        $param['businessLicenseNumber'] = (string)I('businessLicenseNumber','');
        $param['businessLicenseImageUrl'] = (string)I('businessLicenseImageUrl','');
        $param['operatorName'] = (string)I('operatorName','');
        $param['operatorIDNumber'] = (string)I('operatorIDNumber','');
        $param['operatorPhone'] = (string)I('operatorPhone','');
        $contactInformation = (string)I('contactInformation','');
        !empty($contactInformation)? $param['operatorContactInfo'] = $contactInformation : '';

        if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        $meihao = D("Meihao/Open");
        $data = $meihao->putData($meihao->companyInfo,$param);
        $this->response($data);
    }


    /**
     *-------------------------------------------------------------------------
     * @title：添加美号信息
     * @action：/ajax/meihao/createMeihao
     * @param：type:美号类型 ,类型:Long
     * @param：imageUrl:美众号头像 ,类型:String
     * @param：name:美众号名称 ,类型:String
     * @param：categoryId:美众号标签ID ,类型:Long
     * @param：introduction:美众号简介 ,类型:String
     * @param：groupCategoryId:绑定的圈子的二级分类Id ,类型:Long
     * @param：groupName:绑定的圈子名称 ,类型:String
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function createMeihao(){
        $param = array();
        $param['type'] = (int)I('type',0);
        $param['imageUrl'] = I('imageUrl','');
        $param['name'] = I('name','');
        $param['categoryId'] = (int)I('categoryId',0);
        $param['introduction'] = I('post.introduction','');
        $param['groupCategoryId'] = (int)I('groupCategoryId',0);
        $param['groupName'] = I('groupName','');
        if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        if( $param['introduction'] != htmlspecialchars_decode($param['introduction']) ){
            $this->outError(\Think\ErrorCode::SQL_INJECT_ERR);
            exit;
        }
        $meihao = D("Meihao/Open");
        $data = $meihao->postData( $meihao->officialAccounts,$param );
        $this->response($data);
    }

    /**
     *-------------------------------------------------------------------------
     * @title：更新企业信息
     * @action：/ajax/meihao/editCompany
     * @param：enterpriseName:起码名称 ,类型:string
     * @param：businessLicenseNumber:营业执照注册号 ,类型:string
     * @param：businessLicenseImageUrl:营业执照图片URL ,类型:string
     * @param：operatorName:运营者姓名 ,类型:string
     * @param：operatorIDNumber:运营者身份证号 ,类型:string
     * @param：operatorPhone:运营者手机号 ,类型:string
     * @param：contactInformation:联系方式：QQ/微信/邮箱 ,类型:string =》operatorContactInfo
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function editCompany(){
        $param = array();
        $param['enterpriseName'] = (string)I('enterpriseName','');
        $param['businessLicenseNumber'] = (string)I('businessLicenseNumber','');
        $param['businessLicenseImageUrl'] = (string)I('businessLicenseImageUrl','');
        $param['operatorName'] = (string)I('operatorName','');
        $param['operatorIDNumber'] = (string)I('operatorIDNumber','');
        $param['operatorPhone'] = (string)I('operatorPhone','');
        $contactInformation = (string)I('contactInformation','');
        !empty($contactInformation)? $param['operatorContactInfo'] = $contactInformation : '';

        if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        $meihao = D("Meihao/Open");
        $data = $meihao->putData($meihao->companyInfo,$param);
        $this->response($data);
    }

    /**
     *-------------------------------------------------------------------------
     * @title：更新美号信息
     * @action：/ajax/meihao/editMeihao
     * @param：name:名称 ,类型:string
     * @param：imageUrl:头像 ,类型:string
     * @param：categoryId:美众号标签ID ,类型:string
     * @param：introduction:简介 ,类型:string
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function editMeihao(){
        $meihao = D("Meihao/Open");
        //美号信息
        $meihaoInfo = $meihao->getData( $meihao->officialAccounts,[] );
        $param = array();
        $param['name'] = I('name','');
        $param['imageUrl'] = I('imageUrl','');
        $param['categoryId'] = (int)I('categoryId','');
        $param['introduction'] = trim(I('introduction',''));
        $meihao->publicParamv2['id'] = $meihaoInfo['data']['id'] ;
        if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        if( $param['introduction'] != htmlspecialchars_decode($param['introduction']) ){
            $this->outError(\Think\ErrorCode::SQL_INJECT_ERR);
            exit;
        }
        $data = $meihao->putData($meihao->officialAccounts,$param);
        $this->response($data);
    }

    /**
     *-------------------------------------------------------------------------
     * @title：美众号重新绑定圈子
     * @action：/ajax/meihao/groupRebind
     * @param：groupCategoryId:圈子二级分类Id ,类型:int
     * @param：groupName:圈子名称 ,类型:string
     * @date：2017-09-21
     *-------------------------------------------------------------------------
     */
    public function groupRebind(){
        $meihao = D("Meihao/Open");
        //美号信息
        $meihaoInfo = $meihao->getData( $meihao->officialAccounts,[] );
        $meihao->publicParamv2['id'] = $meihaoInfo['data']['id'];

        $param = array();
        $param['groupCategoryId'] = (int)I('groupCategoryId',0);
        $param['groupName'] =  I('groupName','');
        if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        $data = $meihao->postData($meihao->groupRebind,$param);
        $this->response($data);
    }



    /**
     * 获取视频信息
     */
    public function getVideoInfo(){
        $curlHandler = new CurlHandler();

        $video_id = I('param.video_id', 0);
        //$video_id = 2872;
        $uri = C('AUTHOR_VIDEO').'video/play?video_id='.$video_id;
        $data = $curlHandler->request($uri, [], 'get');
        $data = json_decode($data,true);

        //print_r($data);die;
        if($data['message'] == '' && isset($data['data']['video_id'])){
            $result = [
                'success'=>true,'code'=>'200','message'=>$data['message'],'data'=>$data['data']
            ];
        }else{
            $result = [
                'success'=>false,'code'=>'500','message'=>$data['message'],'data'=>$data['data']
            ];
        }
        $this->response($result);
    }

    /**
     * 获取话题详情信息
     */
    public function topicInfo(){
        $tid = xss_clean(I('param.tid', '', 'strval'));
        if(empty($tid)){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }

        $topic = D('Group/Topic');
        $res = $topic->getData(
            $topic->topic_detail,
                [
                    'id' => $tid,
                    'areaCode' => $this->addressId
                ]
        );
        //print_r($res);die;
        if(!$res['success']){
            $this->ajaxReturn($res);
        }

        //获取商品价格、图片等信息
        $prodIdArr = array();
        foreach($res['data']['components'] as $val) {
            if($val['type'] == 'item' && !empty($val['outProductId'])) {
                $prodIdArr[] = $val['outProductId'];
            }
        }

        if(!empty($prodIdArr)) {
            $prodIdStr = trim(implode(',', $prodIdArr), ',');
            $prodInfoArr = json_decode(D( "Services/Product" )->get_products_price($prodIdStr), true);
            if(empty($prodInfoArr['data'])) {
                //接口调用失败或没数据，则赋值为空数组
                $prodInfoArr['data'] = array();
            }

            $prodArr = array();
            foreach($prodInfoArr['data'] as $val) {
                $prodArr[$val['id']] = array(
                    'id' => $val['id'],
                    'mainImage' => getResizeImg($val['mainImage'], 260, 260, 'ONLINE'),
                    'name' => $val['name'],
                    'salePrice' => convert_price($val['salePrice']),
                    'skuId' => $val['skuId'],
                    'itemDetailUrl' => productDetailUrlGen($val['shopId'], $val['id'], $val['skuId'])
                );
            }

            //将components里的数据替换为接口数据
            foreach($res['data']['components'] as $key => &$val) {
                if($val['type'] == 'item') {
                    if(!empty($prodArr[$val['outProductId']])) {
                        $val['item'] = $prodArr[$val['outProductId']];
                    }else{
                        unset($res['data']['components'][$key]);
                    }
                }
                unset($val);
            }
            $res['data']['components'] = array_merge($res['data']['components']);
        }

        $this->response($res);
    }
    /**
     *-------------------------------------------------------------------------
     * @title：取消美号修改
     * @action：/ajax/meihao/cancelModifySetting
     * @param：modifyInfoId:修改记录Id,类型:int
     * @param：officialAccountsId:美众号Id,类型:int
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function cancelModifySetting(){
        $meihao = D("Meihao/Open");
        //美号信息
        $meihaoInfo = $meihao->getData( $meihao->officialAccounts,[] );
        $officialAccountsId = $meihaoInfo['data']['id'];
        $settingInfo = $meihao->getData( $meihao->officialAccountsSettings,['id' => $officialAccountsId] );
        $meihao->publicParamv2['modifyInfoId'] = $settingInfo['data']['modifyInfo']['id'];
        $data = $meihao->deleteData($meihao->officialAccountsSettings);
        $this->response($data);
    }
    /**
     *-------------------------------------------------------------------------
     * @title：修改美众号设置
     * @action：/ajax/meihao/modifySetting
     * @param：modifyInfoId:修改记录Id,类型:int
     * @param：name:名称 ,类型:string
     * @param：imageUrl:头像 ,类型:string
     * @param：categoryId:美众号标签ID ,类型:string
     * @param：introduction:简介 ,类型:string
     * @date：2017-03-27
     *-------------------------------------------------------------------------
     */
    public function modifySetting(){
        $meihao = D("Meihao/Open");
        //美号信息
        $meihaoInfo = $meihao->getData( $meihao->officialAccounts,[] );
        $officialAccountsId = $meihaoInfo['data']['id'];
        $param = array();
        $param['name'] = I('name','');
        $param['imageUrl'] = I('imageUrl','');
        $param['categoryId'] = intval(I('categoryId',''));
        $param['introduction'] = trim(I('introduction',''));
        $meihao->publicParamv2['id'] = $officialAccountsId ;
        if( !$param ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        if( $param['introduction'] != htmlspecialchars_decode($param['introduction']) ){
            $this->outError(\Think\ErrorCode::SQL_INJECT_ERR);
            exit;
        }
        $data = $meihao->postData($meihao->officialAccountsSettings,$param);
        $this->response($data);
    }
}
