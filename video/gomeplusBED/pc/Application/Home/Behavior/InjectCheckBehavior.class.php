<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：InjectCheckBehavior.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：                                                  |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/10/12-15:15                                                |
* +----------------------------------------------------------------------+
*/
namespace Home\Behavior;
use Think\Behavior;
class InjectCheckBehavior extends Behavior{
    private $getfilter = "'|(and|or)\\b.+?(>|<|=|in|like)|\\/\\*.+?\\*\\/|<\\s*script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
    private $postfilter = "\\b(and|or)\\b.{1,6}?(=|>|<|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
    private $cookiefilter = "\\b(and|or)\\b.{1,6}?(=|>|<|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";

    public function run(&$param)
    {
        foreach($_GET as $key=>$value){$this->sqlInjectCheck($key,$value,$this->getfilter);}
        foreach($_POST as $key=>$value){$this->sqlInjectCheck($key,$value,$this->postfilter);}
        foreach($_COOKIE as $key=>$value){$this->sqlInjectCheck($key,$value,$this->cookiefilter);}
    }

    /**
     * sql注入检测
     * @param $StrFiltKey
     * @param $StrFiltValue
     * @param $ArrFiltReq
     */
    public function sqlInjectCheck($StrFiltKey, $StrFiltValue, $ArrFiltReq){
        if(is_array($StrFiltValue))$StrFiltValue = implode($StrFiltValue);
        if (preg_match("/".$ArrFiltReq."/is",$StrFiltValue) == 1){
            $log = 'SqlInjectRecord '.$_SERVER["REMOTE_ADDR"]."    ".strftime("%Y-%m-%d %H:%M:%S")."    ".$_SERVER["PHP_SELF"]."    ".$_SERVER["REQUEST_METHOD"]."    ".$StrFiltKey."    ".$StrFiltValue;
            //写日志
            \Think\Rsyslog::write($log, \Think\Rsyslog::ERR);
            echo json_encode(array('success'=>false,'code'=>\Think\ErrorCode::SQL_INJECT_ERR,'message'=>\Think\ErrorCode::getErrMsg(\Think\ErrorCode::SQL_INJECT_ERR)));
            exit;
        }
    }

}