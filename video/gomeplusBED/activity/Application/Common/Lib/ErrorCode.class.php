<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：CodeStatus.class.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：错误状态码输出                                                  |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/28-14:08                                                |
* +----------------------------------------------------------------------+
*/
namespace Think;

class ErrorCode {

    const PARAM_ERROR = '881001';
    const USER_NO_LOGIN = '881002';
    const CACHE_ERROR = '881003';
    const REQUEST_ERROR = '881004';
    const NICKNAME_ERROR = '881005';
    const ILLEGAL_ACTION = '881006';

    const WHV_NOT_ENOUGH = '882001';
    const COUPON_RECEIVED = '882002';
    const COUPON_RECEIVE_FAIL = '882003';


    //错误码对应的message信息
    public static $statusCode = array(
        self::PARAM_ERROR => '参数错误',
        self::USER_NO_LOGIN => '用户未登录',
        self::CACHE_ERROR => '数据缓存失败',
        self::REQUEST_ERROR => '请求方式错误',
        self::NICKNAME_ERROR => '昵称格式不正确',
        self::ILLEGAL_ACTION => 'illegal action',

        self::WHV_NOT_ENOUGH => '暖心值不足哦，快去分享吧',
        self::COUPON_RECEIVED => '您已领取，不要贪心哦',
    );

    /**
     * 获取对应的错误码提示信息
     * @param $errno int 错误码
     * @return mixed
     */
    public static function getErrMsg($errno){
        if(self::$statusCode[$errno]){
            return self::$statusCode[$errno];
        }else{
            return 'ERROR_CODE NO DEFINE!';
        }

    }
    
}
