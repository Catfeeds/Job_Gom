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
    const REGIST_MOBILE_TIMES_ERR = '91002';
    const VERIFY_CODE_ERR = '9111912';
    const PARMA_CHECK_FAIL = '881013';
	const PARAM_ERROR = '100001';
	const USER_INFO_ERROR = '100008';
	const PAGE_STATUS_LOSS = '881014';
    const QRCODE_STATUS_LOSS = '881015';
    const QRCODE_EXPIRED = '881016';
    const QRCODE_FAILURE = '881017';
	const UPLOAD_PHONE_NUM = '100011';
	const WORD_IS_ERROR = '100034';
    const DATA_RECEIVE_ERROR = '9111913';
    const ADD_DRAFT_ERROR = '882001';
	const DRAFTS_OVERFLOW = '9111916';
	const DRAFTS_GET_ERROR = '911918';
	const TAG_IS_EMPTY = '911920';
	const ILLEGAL_ACTION = '911921';
	const ILLEGAL_LINK = '911922';


    //错误码对应的message信息
    public static $statusCode = array(
        self::PARMA_ERROR => '参数错误',
        self::USER_NO_LOGIN => '用户未登录',
        self::UPLOAD_ERROR => '上传图片失败',
        self::ORDER_CONFIRM_REPEAT => '不能重复提交订单',
        self::CACHE_ERROR => '数据缓存失败',
        self::SQL_INJECT_ERR => '您提交的参数非法,请尝试其它！',
        self::IMAGE_URL_ERR => '图片地址错误，请重新上传',
        self::REGIST_MOBILE_TIMES_ERR => '操作太频繁,请稍后再试！',
        self::VERIFY_CODE_ERR => '验证码输入错误,请重新输入',
        self::PARMA_CHECK_FAIL => '参数校验失败',
		self::USER_INFO_ERROR=>'用户信息验证失败',
        self::PAGE_STATUS_LOSS=>'页面状态丢失',
        self::QRCODE_STATUS_LOSS=>'二维码状态丢失',
        self::QRCODE_EXPIRED=>'二维码过期',
        self::QRCODE_FAILURE=>'二维码失效',
		self::UPLOAD_PHONE_NUM=>'上传图片越界只可以9张',
		self::WORD_IS_ERROR => '有敏感词',
	    self::DATA_RECEIVE_ERROR => '数据获取失败',
	    self::ADD_DRAFT_ERROR => '保存草稿失败',
	    self::DRAFTS_OVERFLOW => '草稿箱已满，该条草稿保存失败',
	    self::DRAFTS_GET_ERROR => '该草稿不存在',
        self::TAG_IS_EMPTY => '标签不能为空',
        self::ILLEGAL_ACTION => 'illegal action',
        self::ILLEGAL_LINK => '不支持非gome站内链接地址',
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
