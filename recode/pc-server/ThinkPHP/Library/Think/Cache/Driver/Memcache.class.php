<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2014 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
namespace Think\Cache\Driver;
use Think\Cache;
defined('THINK_PATH') or exit();
/**
 * Memcache缓存驱动
 */
class Memcache extends Cache {

    /**
     * 架构函数
     * @param array $options 缓存参数
     * @access public
     */
    function __construct($options=array()) {
        if ( !extension_loaded('memcache') ) {
            E(L('_NOT_SUPPORT_').':memcache');
        }
        $this->options      =   $options;
        $this->options['expire'] =  isset($options['expire'])?  $options['expire']  :   C('DATA_CACHE_TIME');
        $this->options['prefix'] =  isset($options['prefix'])?  $options['prefix']  :   C('DATA_CACHE_PREFIX');        
        $this->options['length'] =  isset($options['length'])?  $options['length']  :   0;
        $memcache = C('MEMCACHE_SETTING');
        settype($memcache, 'array');
        $this->handler = new \Memcache;
        foreach ($memcache AS $one) {
            $server = (string)$one;
            list($ip, $port, $weight) = explode(':', $server);
            if (!$ip && !$port && !$weight) {
                continue;
            }
            $this->handler->addServer($ip
                , $port
                , false
                , $weight
                , 1
                , 15
                , true
            );
            $this->handler->setCompressThreshold(1000,0.2);
        }
    }

    /**
     * 读取缓存
     * @access public
     * @param string $name 缓存变量名
     * @return mixed
     */
    public function get($name) {
        N('cache_read',1);
        return $this->handler->get($this->options['prefix'].$name);
    }

    /**
     * 写入缓存
     * @access public
     * @param string $name 缓存变量名
     * @param mixed $value  存储数据
     * @param integer $expire  有效时间（秒）
     * @return boolean
     */
    public function set($name, $value, $expire = null) {
        N('cache_write',1);
        if(is_null($expire)) {
            $expire  =  $this->options['expire'];
        }
        $name   =   $this->options['prefix'].$name;
        if($this->handler->set($name, $value, 0, $expire)) {
            if($this->options['length']>0) {
                // 记录缓存队列
                $this->queue($name);
            }
            return true;
        }
        return false;
    }

    /**
     * 删除缓存
     * @access public
     * @param string $name 缓存变量名
     * @return boolean
     */
    public function rm($name, $ttl = false) {
        $name   =   $this->options['prefix'].$name;
        return $ttl === false ?
            $this->handler->delete($name) :
            $this->handler->delete($name, $ttl);
    }

    /**
     * 清除缓存
     * @access public
     * @return boolean
     */
    public function clear() {
        return $this->handler->flush();
    }
}
