<?php

if(isset($argv[1]) && $argv[1]){
    $_SERVER['ENVIRONMENT'] = $argv[1];
}

$type = (isset($argv[2]) && $argv[2]) ? $argv[2] : '';
$key = (isset($argv[3]) && $argv[3]) ? $argv[3] : '';

$function = (isset($argv[4]) && $argv[4]) ? $argv[4] : '';
//echo $_SERVER['ENVIRONMENT'];exit;
// 定义应用目录
define('APP_PATH',dirname(__FILE__).'/Application/');

//定义http协议
define('APP_HTTP', @$_SERVER['HTTP_X_FORWARDED_PROTO'] == "https" ? 'https://' : 'http://');

extract(include (APP_PATH.'Common/Conf/'.$_SERVER['ENVIRONMENT'].'.php'));
extract(include (APP_PATH.'Common/Conf/config.php'));
include (APP_PATH.'Common/Common/function.php');

$obj_cluster = new RedisCluster(NULL, $PREDIS_TCP);

if($function == 'get'){
    getCache($PREDIS_TCP,$type,$key,$DATA_CACHE_PREFIX);
}else if($function == 'del'){
    deleteCache($PREDIS_TCP,$type,$key,$DATA_CACHE_PREFIX);
}else{
    echo '未知的操作';
}


