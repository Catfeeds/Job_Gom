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

    const PARMA_ERROR = '881001';
    const USER_NO_LOGIN = '881011';
    const UPLOAD_ERROR = '881014';
    const ORDER_CONFIRM_REPEAT = '930001';
    const CACHE_ERROR = '911911';
    const SQL_INJECT_ERR = '91000';
    const IMAGE_URL_ERR = '91001';


    //错误码对应的message信息
    public static $statusCode = array(
        self::PARMA_ERROR => '参数错误',
        self::USER_NO_LOGIN => '用户未登录',
        self::UPLOAD_ERROR => '上传图片失败',
        self::ORDER_CONFIRM_REPEAT => '不能重复提交订单',
        self::CACHE_ERROR => '数据缓存失败',
        self::SQL_INJECT_ERR => '您提交的参数非法,系统已记录!',
        self::IMAGE_URL_ERR => '图片地址错误，请重新上传',
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
