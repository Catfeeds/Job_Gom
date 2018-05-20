<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 
 * +----------------------------------------------------------------------+
 * | @程序名称：GroupController.class.php                                  
 * +----------------------------------------------------------------------+
 * | @程序功能：圈子sitemap操作类                                                      
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>                            
 * +----------------------------------------------------------------------+
 * | Date:2017-03-16
 * +----------------------------------------------------------------------+
 */

namespace app\social\controller;
class Group
{
    //连接句柄
    private $mongo = null;
    //每个文件能容纳的数据上限
    private $dataFileMax = 10000;
    
    //圈子数据写入对应的文件夹
    private $dataPath = '';
    
    //普通文件命名方式：前缀+数字+'.xml'
    //普通文件命名前缀
    private $filePrefix = 'group_sitemap_';
    
    //普通文件的文件类型
    private $fileType = '.xml';
    
    //圈子日志文件名
    private $logFileName = '';
    
    //圈子对应的url
    private $groupUrl = '';
    
    //数据更新频次
    private $changefreq = 'weekly';
    
    //数据权重
    private $priority = '1.0';

    //业务日志目录
    private $logPath = '';
    
    public function __construct()
    {
        $this->dataPath = FILE_PATH.'group/';
        $this->logFileName = FILE_PATH.'group.log';
        $this->groupUrl = config('group_url').'circle/';
        $this->logPath = FILE_LOG . 'sitemap/';
        $servers = config('mongdb_server');
        $this->mongo = new \mconn\Hmongodb($servers);
        $this->mongo->selectDb("social");
    }
    
    public function index()
    {

        $mapEq['state'] = 0;  //注意条件，圈子不带s
        $mapEq['isPublic'] = true;

        $date1 = '2017-03-21';
        $date2 = '2017-05-02';
        $mapEq['createTime']['$gt'] =  new \MongoDate(strtotime($date1));
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($date2));

        $mapNq['start'] = 0;
        $mapNq['limit'] = 10;

        $fields = ['_id','createTime'];

        $res = $this->mongo->find("socialGroup",$mapEq,$mapNq,$fields);
        echo '<pre>';
        print_r($res);
        echo '</pre>';
    }
    
    //数据全量更新
    public function upAll()
    {
        ini_set('max_execution_time',0);
        //date_default_timezone_set('PRC');

        //数据截止时间
        $endTime = date('Y-m').'-01';
        if(!empty($_GET['endTime']))
        {
            $endTime = trim($_GET['endTime']);
        }
        $endTime = $endTime.' 00:00:00';

        //记录日志
        $appLogFile = $this->logPath.'group_upall_'.date('Y').'.log';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
        }
        $str = date("Y-m-d H:i:s") . '  全量更新 start'."\n";
        $str .= '  查询数据区间 date<'.$endTime;

        //要查询的字段
        $fields = ['_id','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['state'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($endTime));

        //判断数据写入的文件夹是否存在
        if(!is_dir($this->dataPath))
        {
            mkdir($this->dataPath, 0755, true);
        }

        //文件名起始数字
        $fileNum = 1;

        //最后一条数据的创建时间
        $lastDataTime = array();

        //最后一个文件的数据总量
        $lastFileDataTotal = 0;

        //最后一个文件的文件名
        $lastFileName = '';

        //清空group文件夹
        clearDir($this->dataPath);

        //数据起始偏移量
        $leftNum = 0;

        //每次取数据条数
        $rightNum = $this->dataFileMax;

        //数据生成时间
        $updateTime = date('Y-m-d');

        //数据总量
        $dataCnt = 0;
        while(1)
        {
            $mapNq['start'] = $leftNum;
            $mapNq['limit'] = $rightNum;
            //$mapNq['sort'] = ['createTime'=>1];

            $res = $this->mongo->find("socialGroup",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                $resCnt = count($res);
                $dataCnt += $resCnt;
                $fileName = $this->filePrefix.$fileNum.$this->fileType;
                $xmlStr = '<?xml version="1.0" encoding="utf-8"?><urlset>';
                foreach($res as $val)
                {
                    $xmlStr .= '<url><loc>'.$this->groupUrl.$val['_id'].'.html'.'</loc><lastmod>'.$updateTime.'</lastmod><changefreq>'.$this->changefreq.'</changefreq><priority>'.$this->priority.'</priority></url>';
                }
                $xmlStr .= '</urlset>';
                file_put_contents($this->dataPath.$fileName, $xmlStr);
                chmod($this->dataPath.$fileName, 0755);

                $lastFileDataTotal = $resCnt;
                $lastFileName = $fileName;

                //查询总数不够1万,写完文件终断
                if($resCnt < $rightNum)
                {
                    break;
                }

                $leftNum += $rightNum;
                $fileNum ++;
            }
            else
            {
                break;
            }
        }

        $str .= '，数据共：'.$dataCnt.'条'."\n";
        //记录数据普通文件生成情况
        if(!empty($lastFileName) && !empty($lastFileDataTotal))
        {
            $logData = array();
            $logData['lastFileName'] = $lastFileName;
            $logData['lastFileDataTotal'] = $lastFileDataTotal;
            $logData['lastDataTime'] = $endTime;
            file_put_contents($this->logFileName, json_encode($logData));
            chmod($this->logFileName, 0755);
        }

        $str .= date("Y-m-d H:i:s") . '  全量更新 end'."\n\n";
        file_put_contents($appLogFile, $str,FILE_APPEND);
    }

    //增量更新数据
    public function upAppend()
    {
        //数据截止时间
        $endTime = date('Y-m-d');
        if(!empty($_GET['endTime']))
        {
            $endTime = trim($_GET['endTime']);
        }
        $endTime = $endTime.' 00:00:00';

        $logDataJson = file_get_contents($this->logFileName);
        $logData = json_decode($logDataJson, true);
        if(empty($logData['lastFileName']) || empty($logData['lastFileDataTotal']) || empty($logData['lastDataTime']))
        {
            return false;
        }

        //要查询的字段
        $fields = ['_id','createTime'];

        //数据起始时间
        $startTime = $logData['lastDataTime'];

        //记录日志
        $appLogFile = $this->logPath.'group_upappend_'.date('Y').'.log';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
        }
        $str = date("Y-m-d H:i:s") . '  增量更新 start'."\n";
        $str .= '  查询数据区间'.$startTime.' - '.$endTime;



        //相等的判断条件
        $mapEq = array();
        $mapEq['state'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($endTime));
        $mapEq['createTime']['$gte'] =  new \MongoDate(strtotime($startTime));
        
        //判断数据写入的文件夹是否存在
        if(!is_dir($this->dataPath))
        {
            mkdir($this->dataPath, 0755, true);
        }
        
        //循环起始执行次数
        $runTimes = 1;
        
        //文件名起始数字
        $lastFileName = pathinfo($logData['lastFileName']);
        $lastFileNameArr = explode('_', $lastFileName['filename']);
        $fileNum = array_pop($lastFileNameArr);
        if($logData['lastFileDataTotal'] == $this->dataFileMax)
        {
            $fileNum ++;
        }
        
        //最后一条数据的创建时间
        $lastDataTime = array();
        
        //最后一个文件的数据总量
        $lastFileDataTotal = 0;
        
        //最后一个文件的文件名
        $lastFileName = '';
        
        //数据起始偏移量
        $leftNum = 0;
        
        //每次取数据条数
        $rightNum = ($logData['lastFileDataTotal'] == $this->dataFileMax) ? $this->dataFileMax : ($this->dataFileMax - $logData['lastFileDataTotal']);
        
        //数据生成时间
        $updateTime = date('Y-m-d');

        //数据总量
        $dataCnt = 0;
        while(1)
        {
            $mapNq['start'] = $leftNum;
            $mapNq['limit'] = $rightNum;
            //$mapNq['sort'] = ['createTime'=>1];

            $res = $this->mongo->find("socialGroup",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                $resCnt = count($res);
                $dataCnt += $resCnt;
                $fileName = $this->filePrefix.$fileNum.$this->fileType;
                if(file_exists($this->dataPath.$fileName))
                {
                    $xmlStr = file_get_contents($this->dataPath.$fileName);
                    $xmlStr = str_replace('</urlset>', '', $xmlStr);
                }
                else
                {
                    $xmlStr = '<?xml version="1.0" encoding="utf-8"?><urlset>';
                }
                
                foreach($res as $val)
                {
                    $xmlStr .= '<url><loc>'.$this->groupUrl.$val['_id'].'.html'.'</loc><lastmod>'.$updateTime.'</lastmod><changefreq>'.$this->changefreq.'</changefreq><priority>'.$this->priority.'</priority></url>';
                }
                $xmlStr .= '</urlset>';
                file_put_contents($this->dataPath.$fileName, $xmlStr);
                chmod($this->dataPath.$fileName, 0755);
                
                $lastFileDataTotal = (($runTimes == 1 && $logData['lastFileDataTotal'] < $this->dataFileMax) ? $logData['lastFileDataTotal'] + $resCnt : $resCnt);
                $lastFileName = $fileName;
                
                if($resCnt < $rightNum)
                {
                    break;
                }

                $leftNum += $rightNum;
                $rightNum = $this->dataFileMax;
                $runTimes ++;
                $fileNum ++;
            }
            else
            {
                break;
            }
        }
        $str .= '，数据共：'.$dataCnt.'条'."\n";
        //记录数据普通文件生成情况
        if(!empty($lastFileName) && !empty($lastFileDataTotal))
        {
            $logData = array();
            $logData['lastFileName'] = $lastFileName;
            $logData['lastFileDataTotal'] = $lastFileDataTotal;
            $logData['lastDataTime'] = $endTime;
            file_put_contents($this->logFileName, json_encode($logData));
            chmod($this->logFileName, 0755);
        }

        $str .= date("Y-m-d H:i:s") . '  增量更新 end'."\n\n";
        file_put_contents($appLogFile, $str,FILE_APPEND);
    }
}