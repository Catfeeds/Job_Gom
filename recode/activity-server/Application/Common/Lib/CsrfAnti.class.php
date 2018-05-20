<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心
 * +----------------------------------------------------------------------+
 * | All rights reserved.
 * +----------------------------------------------------------------------+
 * | @程序名称：CsrfAnti.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：手机号接口调用频次限制
 * +----------------------------------------------------------------------+
 * | Author:liuchao <liuchao@gomeplus.com>
 * +----------------------------------------------------------------------+
 * | Date:2016-11-14 13:51:36 CST
 * +----------------------------------------------------------------------+
 */
namespace Common\Lib;

class CsrfAnti {
    const DAY_TRY_TIMES = 50;
    const NIGHT_TRY_TIMES = 20;
    const DAY_EXPIRE_TIME = 86400;
    const NIGHT_EXPIRE_TIME = 43200;
    const CSRF_START_ITME = 'start_time';
    private static $mobile_rate_limit = [
        'one' =>['times'=>1,'interval'=>60],
        'two' =>['times'=>2,'interval'=>120],
        'three' =>['times'=>4,'interval'=>300],
        'four' =>['times'=>5,'interval'=>600],
        'five' =>['times'=>6,'interval'=>3600],
        'six' =>['times'=>8,'interval'=>10800],
    ];

    /**
     * 手机号限制
     * @param $mobile 手机号
     * @return bool true 需要限制 false正常
     */
    public function mobile_limit($mobile){
        $key = $mobile.'_'.ACTION_NAME;
        self::get_rate_define($try_times,$expire);
        $cache = S([]);
        $start_time_key = $key.'_'.self::CSRF_START_ITME;
        $send_start_time = $cache->GET($start_time_key);
        if(!$send_start_time){
            $cache->SETEX($start_time_key,$expire,time());
        }
        //短信计数
        $interval = time()-$send_start_time;
//        echo __FUNCTION__.'_key='.$key.'_S($key)='.S($key).'_interval='.$interval.'_send_start_time='.$send_start_time.'_expire='.$expire.PHP_EOL;
        //手机号次数限制
        return self::is_rate_limit(S($key),$interval);
    }

    /**
     * IP攻击限制
     * @param $key
     * @return bool true 需要限制 false正常
     */
    public function ip_limit($key){
        $key = $key.'_'.ACTION_NAME;
        self::get_rate_define($try_times,$expire);
        $csrf_count = S($key);
//        echo __FUNCTION__.'_key='.$key.'_csrf_count='.$csrf_count.PHP_EOL;
        $try_times = 80;
        if($csrf_count > $try_times){
            return true;
        }
        return false;
    }

    /**
     * 设置用户计数
     * @param $key
     */
    public function setUserCounter($key){
        $key = $key.'_'.ACTION_NAME;
        self::get_rate_define($try_times,$expire);
//        echo __FUNCTION__.'_key='.$key.'_expire='.$expire.PHP_EOL;
        return setCounter($key,$expire);
    }

    /**
     * 获取允许IP重试次数及key过期时间
     * @param $try_times
     * @param $expire
     */
    private function get_rate_define(&$try_times,&$expire){
        //根据时间范围，限制IP的允许频次
        $cur_time = date('His');
        $try_times = self::DAY_TRY_TIMES;
        $expire = self::DAY_EXPIRE_TIME;
        if ((220000 <= $cur_time && $cur_time<=240000) ||(0 <= $cur_time && $cur_time<=60000) ){
            $try_times = self::NIGHT_TRY_TIMES;
            $expire = self::NIGHT_EXPIRE_TIME;
        }
    }

    /**
     * 是否对手机号频次限制
     * @param $times
     * @param $interval
     * @return bool
     */
    private function is_rate_limit($times,$interval){
        $times = intval($times);
        $interval = intval($interval);
        if(
            self::$mobile_rate_limit['one']['times']<$times
            && $interval<=self::$mobile_rate_limit['one']['interval']
        ){
            return true;
        }elseif (
            self::$mobile_rate_limit['two']['times']<$times
            && self::$mobile_rate_limit['one']['interval']<$interval
            && $interval<=self::$mobile_rate_limit['two']['interval']
        ){
            return true;
        }elseif (
            self::$mobile_rate_limit['three']['times']<$times
            && self::$mobile_rate_limit['two']['interval']<$interval
            && $interval<=self::$mobile_rate_limit['three']['interval']
        ){
            return true;
        }elseif (
            self::$mobile_rate_limit['four']['times']<$times
            && self::$mobile_rate_limit['three']['interval']<$interval
            && $interval<=self::$mobile_rate_limit['four']['interval']
        ) {
            return true;
        }elseif(
            self::$mobile_rate_limit['five']['times']<$times
            && self::$mobile_rate_limit['four']['interval']<$interval
            && $interval<=self::$mobile_rate_limit['five']['interval']
        ) {
            return true;
        }elseif (
            self::$mobile_rate_limit['six']['times']<$times
            && self::$mobile_rate_limit['five']['interval']<$interval
            && $interval<=self::$mobile_rate_limit['six']['interval']
        ) {
            return true;
        }
        return false;
    }


}
