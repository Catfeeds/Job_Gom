<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：DataGetService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：用户表相关操作
 * +----------------------------------------------------------------------+
 * | Author:llm
 * +----------------------------------------------------------------------+
 * | Date:2017-12-01
 * +----------------------------------------------------------------------+
 */
namespace Activity\Service;
use Think\Model;
use Common\Lib\CmsCurl;
class CouponService extends Model
{
    public function __construct(){
        $this->connection = C('mysql')['db'];
        $this->autoCheckFields = false;
        parent::__construct();
    }


    /*
     * 获取优惠券列表
     */
    public function getCouponList(){

        $coupon = [];
        $curlHandler = new CmsCurl();
        $uri = C('CMS_API')['COUPON_LIST_URL'] . '/mobile/promotion/promscms/'.C('CMS_COUPON_KEY')['WARM_HEART'].'.jsp';
        //echo $uri;die;

        $data = $curlHandler->request($uri, [], 'get');

        //print_r($data);die;
        if(isset($data['templetList']) && !empty($data['templetList'])){
            foreach ($data['templetList'] as $key=>$val){
                if($val['templetCode'] == 'carouselCouponTemplet'){
                    $coupon = $val['carouselCouponTemplet']['couponList'];
                    break;
                }
            }
        }else{
            //记录日志
            $logParam = [
                'errMsg' => '优惠券获取失败',
                'errData' => json_encode($data['templetList'])
            ];
            writeErrorLog($logParam);
        }
        return $coupon;
    }

    /**
     * 领取取优惠券
     * @param $couponParam String 优惠券编码id
     * @param $authCode    String 验证码
     * @return json
     */
    public function receiveCoupon($couponParam,$authCode = ''){

        if(empty($couponParam)){
            return false;
        }
        $param['couponParam'] = $couponParam;
        $param['isRisk'] = C('IS_RISK');
        if(!empty($authCode)){
            $param['authCode'] = $authCode;
        }
        $curlHandler = new CmsCurl();
        $uri = C('CMS_API')['COUPON_INFO_URL'] . '/wap/promotion/takeUpAllCoupon.jsp';
        //echo $uri;die;
        $param = 'body=' . json_encode($param);
        $result = $curlHandler->request($uri, $param, 'post');
        return $result;
    }


    /*
     * 添加优惠券
     */
    public function addCoupon($data){
        if(empty($data)){
            return false;
        }
        //插入数据库
        $result = $this->add($data);
        if(!$result){
            //记录日志
            $logParam = [
                'errMsg' => '添加优惠券失败',
                'errParam' => json_encode($data),
                'errData' => $result
            ];
            writeErrorLog($logParam);
        }
        return $result;
    }

    /*
     * 获取优惠券信息
     */
    public function getCouponInfo($param){
        if(empty($param)){
            return false;
        }
        $result = $this->where($param)->field('id')->find();
        if(!$result){
            //记录日志
            $logParam = [
                'errMsg' => '获取优惠券失败',
                'errParam' => json_encode($param),
                'errData' => json_encode($result),
            ];
            writeErrorLog($logParam);
        }
        return $result;
    }
}