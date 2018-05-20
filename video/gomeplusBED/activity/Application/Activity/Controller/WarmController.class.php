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
use Home\Controller\BaseController;
use Common\Lib\CurlHandler;
class WarmController extends BaseController
{

    private $couponObj = null;
    private $userObj = null;
    private $accountInfo = null;
    public function __construct(){
        parent::__construct();
        $this->couponObj = D('Activity/Coupon');
        $this->userObj = D('Activity/User');
        $this->accountInfo = $this->userObj->getUserInfo($this->userId);
    }


    /**
     * 游戏开始页面
     */
    public function index(){
        $share_weixin = $this->getWeiXinAuth();
        $this->assign('share_weixin',$share_weixin);
        //判断用户是否填写资料
        if($this->accountInfo){
            empty($this->accountInfo['wh_value']) ? $this->accountInfo['wh_value'] = 0 : '';

            //计算温度计的显示高度
            $warmHeight = min(ceil($this->accountInfo['wh_value'] * 100 / 150), 100);

            //判断暖心值的显示文案
            if($this->accountInfo['wh_value'] > 10000){
                $warmDesc = '当前暖心值已爆表';
                $warmValue = '10000+';
            }else if($this->accountInfo['wh_value'] >= 150){
                $warmDesc = '当前暖心值已爆表';
                $warmValue = $this->accountInfo['wh_value'];
            }else{
                $warmDesc = '当前暖心值';
                $warmValue = $this->accountInfo['wh_value'];
            }

            $warmInfo = [
                'warmHeight' => $warmHeight,
                'warmDesc' => $warmDesc,
                'warmValue' => $warmValue
            ];
            $this->assign('warmInfo', $warmInfo);
            $this->assign("userInfo", $this->accountInfo);
            //主会场
            $this->assign("mainUrl", APP_HTTP_GOME.C('MAIN_VENUE_URL'));
            $this->display('Index/home');
        }else{
            $this->assign('link_ta',$this->userInfo['link_ta']);
            $this->display('Index/introduction');
        }
    }

    /**
     * 获取微信分享签名参数
     */
	public function getWeiXinAuth(){
        $current_url = curPageURL();
        $wap_api = 'http://m.gome.com.cn/index.php?ctl=product&act=getShareHandler&url='.urlencode($current_url);
        $curlHandler = new CurlHandler();
        $result = $curlHandler->request($wap_api, array(), 'get');

        $share_weixin = json_decode($result,true);
        //渲染微信分享签名相关
        if(!isset($share_weixin['appid']) || $share_weixin['errcode']!=1){
            $share_weixin['appid']='';
            $share_weixin['noncestr']='';
            $share_weixin['url']='';
            $share_weixin['signature']='';
            $share_weixin['timestamp']='';
        }

        $share_url = APP_HTTP.C('ACTIVITY_URL').'warm/index';
        if($this->accountInfo){
            $share_url = taUrlGen($this->userId);
        }
        $share_weixin['url'] = $share_url;

	    return $share_weixin;
	}

    /**
     * 用户客态页
     */
    public function ta(){
        $userStr = xss_clean(I('get.t', '', 'strval'));
        $userId = xss_clean(I('get.u', '', 'strval'));

        //判断客态页地址是否合法
        if(encryptStr($userId) != $userStr){
            $this->redirect("/activity/warm/index");
        }

        //判断是否为用户自己访问客态页
        if(!empty($this->userInfo['userId'])){
            if($this->userInfo['userId'] == $userId){
                $this->redirect("/activity/warm/index");
            }
        }

        $taUserInfo = $this->userObj->getUserInfo($userId);
        if(empty($taUserInfo)){
            $this->redirect("/activity/warm/index");
        }else{
            empty($taUserInfo['wh_value']) ? $taUserInfo['wh_value'] = 0 : '';
            $this->assign("userStr", $userStr);
            $this->assign("userInfo", $taUserInfo);
            //主会场
            $this->assign("mainUrl", APP_HTTP_GOME.C('MAIN_VENUE_URL'));

            //重写客态页地址
            $linkTa = taUrlGen($userId);
            $this->userInfo['link_ta'] = $linkTa;
            $this->assign('user_info', $this->userInfo);

            //微信分享信息
            $share_weixin = $this->getWeiXinAuth();
            $share_weixin['url'] = $linkTa;
            $this->assign('share_weixin',$share_weixin);

            $this->display('Index/ta');
        }
    }

    /**
     * 领券页
     */
    public function couponList(){
        if(empty($this->accountInfo)){
            //显示活动开始页面
            $this->assign('link_ta',$this->userInfo['link_ta']);
            $this->display( 'Index/introduction' );exit;
        }

        $list = [];
        $couponArr = C('COUPON_LIST');
        $date = date("Ymd");

        $result = $this->couponObj->getCouponList();
        //处理数据
        if($result){
            foreach($result as $key=>$val){
                if($val['promoCaseId'] == $couponArr['FIRST'][$date]){
                    $warm_val = 50;
                    $tmp = $this->handleData($val,$warm_val);
                    $list[$warm_val] = $tmp;
                }
                if($val['promoCaseId'] == $couponArr['SECOND'][$date]){
                    $warm_val = 100;
                    $tmp = $this->handleData($val,$warm_val);
                    $list[$warm_val] = $tmp;
                }
                if($val['promoCaseId'] == $couponArr['THIRD'][$date]){
                    $warm_val = 150;
                    $tmp = $this->handleData($val,$warm_val);
                    $list[$warm_val] = $tmp;
                }
            }
        }
        //print_r($list);die;

        $more_link  = APP_HTTP_GOME . C('COUPON_MORE_URL');
        $main_link  = APP_HTTP_GOME . C('MAIN_VENUE_URL');
        $coupon_url = APP_HTTP . C('ACTIVITY_URL').'warm/couponlist';
        $this->assign( "more_link", $more_link );
        $this->assign( "main_link", $main_link );
        $this->assign( "coupon_url", $coupon_url );

        //获取暖心值
        $wh_value = $this->accountInfo['wh_value'] > 10000 ? "10000+" : $this->accountInfo['wh_value'];
        $this->assign( "wh_value", $wh_value );

        //获取用户信息
        $this->assign( "userInfo", $this->accountInfo );
        $this->assign( "list", $list );


        //微信分享信息
        $share_weixin = $this->getWeiXinAuth();
        $this->assign('share_weixin',$share_weixin);

        $this->display( 'Index/coupon' );
    }

    /**
     * 处理数据
     * $value 暖心值的档次
     */
    private function handleData($data,$value){
        $arr = [];
        $arr['couponId'] = $data['promoCaseId'];
        $arr['couponParam'] = $data['couponParam'];
        $arr['money'] = intval($data['couponAmount']);
        $arr['isReceive'] = 0; //默认没有领取过

        //根据券方案号取类型
        $type = C("COUPON_TO_TYPE")[$data['promoCaseId']];
        $param = [
            'user_id' => $this->userId,
            'type' => $type,
        ];
        //print_r($param);die;
        $couponInfo = $this->couponObj->getCouponInfo($param);
        if(!empty($couponInfo)){
            $arr['isReceive'] = 1;
        }
        return $arr;
    }
}
