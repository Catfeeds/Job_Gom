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
class UserService extends Model
{
    const USER_CACHE_TIME = 5 * 24 * 60 * 60; //过期时间
    public function __construct(){
        $this->connection = C('mysql')['db'];
        $this->autoCheckFields = false;
        parent::__construct();
    }


    /*
     * 获取用户信息
     */
    public function getUserInfo($userId){
        if(empty($userId)){
            return false;
        }
        $cache = S([]);
        $user_key = C('DATA_CACHE_USER_PREFIX') . $userId;
        $field = [
          'user_id', 'sex','nick_name','icon','wh_value'
        ];
        $result = $cache->hMget($user_key,$field);
        //判断某个值有则返回缓存结果
        if(isset($result['user_id']) && $result['user_id']){
            return $result;
        }else{
            $result = $this->where('user_id='.$userId)->find();
            if($result){
                //设置缓存
                $cache->hMset($user_key,$result);
                $cache->expire($user_key,self::USER_CACHE_TIME);
            }
            return $result;
        }

    }

    /*
     * 添加用户信息
     */
    public function addUser($data){
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

        //插入redis
        return $result;
    }
}