<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                           |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ApiController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：暖心活动ajax接口                                                                                                                     |
 * +----------------------------------------------------------------------+
 * | Author:liluming <liluming@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2017-11-30                                     |
 * +----------------------------------------------------------------------+
 */

namespace Activity\Controller;
use Home\Controller\BaseController;
use Think\ErrorCode;
class ApiController extends BaseController
{

    private $cropServ = null;
    private $userObj = null;
    private $couponObj = null;

    //单次赠送暖心值最大数值
    const WARM_NUM_PER_MAX = 40;

    //集合名称，用于存储赠送暖心值的对应关系，验证同一用户只能给另一用户赠送一次暖心值
    const SET_WARM_RELATION_NAME = 'warm_relation_0';

    //集合生存时间（单位：秒）432000=60*60*24*5
    const SET_EXPIRE = 432000;

    public function __construct(){
        parent::__construct();
        $this->userObj = D('Activity/User');
        $this->couponObj = D('Activity/Coupon');
    }

    /**
     * 获取图片代理
     */
    public function get_content(){
        $url = I('param.url/s');
        header('Content-Type: image/jpg');
        if($url){
            echo file_get_contents($url);exit;
        }
        echo "no url";exit;
    }

    /**
     * 提交用户信息
     * @param  user_id   用户id
     * @param  sex       用户性别
     * @param  nick_name 用户昵称
     * @param  icon      用户头像
     * @return array
     */
    public function save(){
        $this->checkPost();
        $param = [];
        $param['user_id'] = $this->userId;
        $param['sex'] = I('param.sex/d',1);
        $param['nick_name'] = trim(I('param.nick_name/s'));
        $param['icon'] = I('param.icon/s');
        $param['product_type'] = I('param.product_type/s',1);
        $param['add_time'] = time();

        if(empty($param['icon']) || empty($param['nick_name'])){
            $this->outError(ErrorCode::PARAM_ERROR);exit;
        }
        if(mb_strlen(html_entity_decode($param['nick_name'])) > 10 ){
            $msg = ['code' => 11003,'success' => false, 'message' => '昵称格式不正确'];
            $this->response($msg);exit;
            $this->outError(ErrorCode::NICKNAME_ERROR);exit;
        }

        $result = $this->userObj->addUser($param);
        if($result){
            $msg = ['code' => 200,'success' => true, 'message' => '添加成功'];
        }else{
            $msg = ['code' => 11004,'success' => false, 'message' => '添加失败'];
        }
        $this->response($msg);exit;
    }

    /**
     * 获取验证码
     * @param couponParam  优惠券加密串
     * @param couponId  优惠券方案号
     */
    public function getCaptcha(){
        $this->checkPost();
        $couponId= I('param.couponId/s','');
        $couponParam = I('param.couponParam/s','');

        if(empty($couponParam) || empty($couponId) ){
            $this->outError(ErrorCode::PARAM_ERROR);exit;
        }

        //验证暖心值是否足够领取该档优惠券
        $wRes = $this->checkWhValue($couponId);
        if($wRes == false){
            $this->outError(ErrorCode::WHV_NOT_ENOUGH);exit;
        }

        //验证用户是否领取过该档次的优惠券
        $isRes = $this->checkIsReceive($couponId);
        if($isRes){
            $this->outError(ErrorCode::COUPON_RECEIVED);exit;
        }

        
        $result = $this->couponObj->receiveCoupon($couponParam);
        if(isset($result['captchaImgUrl']) && $result['captchaImgUrl']){
            $data['captchaImgUrl'] = $result['captchaImgUrl'];
            $msg = ['code' => '200','success' => true, 'message' => '','data' => $data];

        }else{
            $msg = ['code' => ErrorCode::COUPON_RECEIVE_FAIL,'success' => false, 'message' => $result['failReason'],'data' => []];
        }
        //print_r($msg);die;
        $this->response($msg);
    }

    /**
     * 领取优惠券
     * @param couponId  优惠券方案号
     * @param couponParam  优惠券加密串
     * @param authCode  领券验证码
     * @param money  优惠券金额
     * @param type  优惠券类型 1满50 2
     */
    public function receiveCoupon(){
        //$this->checkPost();
        $couponId= I('param.couponId/s','');
        $couponParam = I('param.couponParam/s','');
        $authCode = I('param.authCode/s','');
        $money = I('param.money/d',0);

        if(empty($couponParam) || empty($authCode) || empty($couponId) || empty($money)){
            $this->outError(ErrorCode::PARAM_ERROR);exit;
        }

        //验证暖心值是否足够领取该档优惠券
        $wRes = $this->checkWhValue($couponId);
        if($wRes == false){
            $this->outError(ErrorCode::WHV_NOT_ENOUGH);exit;
        }

        //验证用户是否领取过该档次的优惠券
        $isRes = $this->checkIsReceive($couponId);
        if($isRes){
            $this->outError(ErrorCode::COUPON_RECEIVED);exit;
        }
        //如果没有领取
        $result = $this->couponObj->receiveCoupon($couponParam,$authCode);
        //print_r($result);

        if($result['isSuccess'] == 'Y' && $result['status'] == 'Y'){
            //领取成功插入数据库
            $param = [];
            $param['user_id'] = $this->userId;
            $param['coupon_id'] = $couponId;
            $param['money'] = $money;
            $param['type'] = C("COUPON_TO_TYPE")[$couponId];
            $param['add_time'] = time();
            $res = $this->couponObj->add($param);
            //to do 记录日志
            $msg = ['code' => '200','success' => true, 'message' => '领取成功','data' => []];
        }else{
            //领取接口失败后的文案直接提示
            $msg = ['code' => ErrorCode::COUPON_RECEIVE_FAIL,'success' => false, 'message' => $result['msgContent'],'data' => []];
        }

        $this->response($msg);exit;
    }

    /**
     * 判断用户暖心值是否足够领取某档位的券
     * @param type 1满50可领 2满100可领 3满150可领
     * @return boolean
     */
    private function checkWhValue($couponId){
        //查看用户暖心值是否足够
        $type = C("COUPON_TO_TYPE")[$couponId];
        $userInfo = $this->userObj->getUserInfo($this->userId);
        $result = false;
        if($type == 1){
            if($userInfo['wh_value'] >= 50){
                $result = true;
            }
        }elseif($type == 2){
            if($userInfo['wh_value'] >= 100){
                $result = true;
            }
        }elseif($type == 3){
            if($userInfo['wh_value'] >= 150){
                $result = true;
            }
        }
        return $result;
    }

    /**
     * 判断用户是否领取过该档次的优惠券
     * @param type 1满50可领 2满100可领 3满150可领
     * @return boolean
     */
    private function checkIsReceive($couponId){

        //根据券方案号取类型
        $result = false;
        $type = C("COUPON_TO_TYPE")[$couponId];
        $param = [
            'user_id' => $this->userId,
            'type' => $type,
        ];

        $couponInfo = $this->couponObj->getCouponInfo($param);
        if(!empty($couponInfo)){
            $result = true;
        }
        return $result;
    }


    /**
     * 上传图片
     */
    public function upload(){
        $this->checkPost();
        $Content = I('param.content/s',"");//图片的base64编码
        if(empty($Content)){
            $this->outError(ErrorCode::PARAM_ERROR);exit;
        }

        $arrContent  = is_array($Content) ? $Content : array($Content);
        //print_r($arrContent);die;
        $this->cropServ = D("Activity/Crop");

        $arrImgPath = $this->_batchImg($arrContent); //批量图片路径
        $result		= $this->_upload($arrImgPath);  //批量上传

        $this->response($result);
    }

    /**
     * 增加暖心值接口
     * @param userStr  用户id加密串
     * @param warmNum  暖心值
     * @return json
     */
    public function incrWarm(){
        $userId = xss_clean(I('post.userId', '', 'strval'));
        $userStr = xss_clean(I('post.userStr', '', 'strval'));
        $warmNum = I('post.warmNum', 0, 'intval');

        if(empty($userId) || empty($userStr) || $warmNum <= 0){
            $this->outError(ErrorCode::PARAM_ERROR);
            exit;
        }

        //判断userId是否被篡改
        if(encryptStr($userId) != $userStr){
            $this->outError(ErrorCode::PARAM_ERROR);
            exit;
        }

        if($warmNum > self::WARM_NUM_PER_MAX){
            $warmNum = self::WARM_NUM_PER_MAX;
        }

        //验证同一用户只能给另一用户赠送一次暖心值
        $checkRes = $this->_checkWarmTimes($userId);
        if(!$checkRes){
            $this->outError(ErrorCode::ILLEGAL_ACTION);
            exit;
        }

        //将暖心值的操作数据拼合后写入队列
        $queueData = [
            'userId' => $userId,
            'warmNum' => $warmNum,
            'genTime' => date('YmdHis', time())
        ];
        A('Activity/Queue')->rpushQueue($queueData);

        //更新缓存里暖心值数据
        $cache = S([]);
        $dealRes = $cache->hincrby(C('DATA_CACHE_USER_PREFIX').$userId, 'wh_value', $warmNum);
        if(!empty($dealRes)){
            $returnArr = [
                'success' => true,
                'code' => 200,
                'message' => 'success',
                'data' => [
                    'warmNum' => $dealRes
                ]
            ];
            $this->ajaxReturn($returnArr);
        }else{
            $this->outError(ErrorCode::CACHE_ERROR);
            exit;
        }
    }

    /**
     * 对base64解码生成临时图片
     * @param $arrInfo
     * @return array
     */
    private function _batchImg($arrInfo){
        $arrReturn = array();
        foreach ($arrInfo as $imgInfo){
            preg_match('/^(data:\s*image\/(\w+);base64,)/', $imgInfo, $result);
            $name=$result[2];
            if($name == "jpeg"){
                $name = "jpg";
            }
            elseif($name == "png"){
                $name = "png";
            }elseif($name=="gif"){
                $name="gif";
            }
            $content = str_replace($result[1],"",$imgInfo);
            $str = microtime().mt_rand(0,10000);
            $filePath = "/tmp/".md5($str).".{$name}";
            $img = base64_decode($content);
            file_put_contents($filePath,$img);
            array_push($arrReturn,$filePath);
        }
        return $arrReturn;
    }

    private function _upload($arrFilePath){
        $arrImgContent = array();
        $delimiter = md5(time());
        $data = '';
        foreach ($arrFilePath as $imgPath) {
            $arr =array();
            $fp         = fopen($imgPath,"r");
            $arrType    = pathInfo($imgPath);
            $type       = $arrType['extension'];
            $content = fread($fp,filesize($imgPath));
            $arr['content'] = $content;
            if($type == "jpg"){
                $type = "image/jpeg";
            }
            elseif($type == "png"){
                $type = "image/png";
            }elseif($type == "gif"){
                $type = "image/gif";
            }
            $arr['type']    = $type;
            array_push($arrImgContent,$arr);
        }

        foreach ($arrImgContent as $content) {
            $data .= "--" . $delimiter . "\r\n";
            $data .= 'Content-Disposition: form-data; name="imageArray"; filename="imageArray"'."\r\n";
            $data .= 'Content-Type: ' . $content['type'] . "\r\n";
            $data .= "\r\n";
            $data .= $content['content'] . "\r\n";
        }
        $data .= "--" . $delimiter . "--\r\n";
        $arr['content'] = $data;
        $arr['boundary'] = $delimiter;
        $arr = $this->cropServ->postUploadData($this->cropServ->upload_img,$arr);
        return $arr;
    }

    /**
     *验证post提交
     */
    private function checkPost(){
        if(!IS_POST){
            $this->outError(ErrorCode::REQUEST_ERROR);exit;
        }
    }

    /**
     * 验证赠送暖心值的对应关系是否存在，不存在则写入集合
     * @param $userId
     * @return bool 关系存在：false 不存在：true
     */
    private function _checkWarmTimes($userId){
        $checkStr = $userId.'_'.session_id();
        $cache = S([]);
        if(!$cache->exists(self::SET_WARM_RELATION_NAME)){
            $addRes = $cache->sadd(self::SET_WARM_RELATION_NAME, $checkStr);
            $cache->expire(self::SET_WARM_RELATION_NAME, self::SET_EXPIRE);
        }else{
            $addRes = $cache->sadd(self::SET_WARM_RELATION_NAME, $checkStr);
        }

        return $addRes;
    }
}
