<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 
 * +----------------------------------------------------------------------+
 * | @程序名称：UserController.class.php                                  
 * +----------------------------------------------------------------------+
 * | @程序功能：用户sitemap操作类                                                      
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>                            
 * +----------------------------------------------------------------------+
 * | Date:2017-03-17
 * +----------------------------------------------------------------------+
 */

namespace app\social\controller;
class User
{
    //数据库连接资源
    private $conn = null;
    
    //每个文件能容纳的数据上限
    private $dataFileMax = 10000;
    
    //用户数据写入对应的文件夹绝对路径
    private $dataPath = '';
    
    //用户数据写入对应的文件夹相对路径
    private $dataPathUrl = '';
    
    //普通文件命名方式：前缀+数字+'.xml'
    //普通文件命名前缀
    private $filePrefix = 'user_sitemap_';
    
    //索引文件名
    private $indexFile = 'user_sitemap_index_1.xml';
    
    //普通文件的文件类型
    private $fileType = '.xml';
    
    //用户日志文件名
    private $logFileName = '';
    
    //存放outCreateOperator的文件路径
    private $userIdFilePath = '';
    
    //存放outCreateOperator的文件路径
    private $userIdFileName = 'userId.log';
    
    //用户对应的url
    private $userUrl = '';
    
    //数据更新频次
    private $changefreq = 'weekly';
    
    //数据权重
    private $priority = '0.8';
    
    //存放outCreateOperator的数组
    private $userIdArr = array();
    
    //最后一条数据的创建时间（圈子+话题）
    private $lastDataTime = array();

    //业务日志目录
    private $logPath = '';

    public function __construct()
    {
        $this->dataPath = FILE_PATH.'user/';
        $this->dataPathUrl = config('sitemap_url');
        $this->logFileName = FILE_PATH.'user.log';
        $this->userIdFilePath = FILE_PATH.'log/';
        $this->userUrl = config('group_url').'ta/';
        $this->logPath = FILE_LOG . 'sitemap/';

        $servers = config('mongdb_server');
        $this->mongo = new \mconn\Hmongodb($servers);
        $this->mongo->selectDb("social");
    }
    
    public function index()
    {

        //圈子
        $mapEq['state'] = 0;
        $mapEq['isPublic'] = true;

        $date1 = '2017-03-21';
        $date2 = '2017-05-02';
        $mapEq['createTime']['$gt'] =  new \MongoDate(strtotime($date1));
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($date2));

        $mapNq['start'] = 0;
        $mapNq['limit'] = 10;


        $fields = ['outCreateOperator','createTime'];

        $res = $this->mongo->find("socialGroup",$mapEq,$mapNq,$fields);
        echo '<pre>';
        print_r($res);
        echo '</pre>';
    }
    
    //数据全量更新
    public function upAll()
    {
        ini_set('max_execution_time',0);
        
        //数据截止时间
        $endTime = date('Y-m').'-01';
        if(!empty($_GET['endTime']))
        {
            $endTime = trim($_GET['endTime']);
        }
        $endTime = $endTime.' 00:00:00';


        //记录日志
        $appLogFile = $this->logPath.'user_upall_'.date('Y').'.log';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
        }
        $str = date("Y-m-d H:i:s") . '  全量更新 start'."\n";
        $str .= '  查询数据区间 date<'.$endTime;

        //判断数据写入的文件夹是否存在
        if(!is_dir($this->dataPath))
        {
            mkdir($this->dataPath, 0755, true);
        }
        
        //清空topic文件夹
        clearDir($this->dataPath);
        
        $this->upAllGroup($endTime);
        $this->upAllTopic($endTime);

        //生成的普通文件名称数组
        $fileNameArr = array();
        
        //所有不重复的outCreateOperator（发过话题的用户+创建过圈子用户）
        $userIdArr = array_merge(array_unique($this->userIdArr));
        $str .= '，数据共：'.count($userIdArr).'条'."\n";
        if(!empty($userIdArr))
        {
            //切分outCreateOperator数组
            $userIdArrChunk = array_chunk($userIdArr, $this->dataFileMax);
            
            //生成的文件总数
            $fileTotalNum = count($userIdArrChunk);
            
            //最后一个文件的数据总量
            $lastFileDataTotal = (count($userIdArr) % $this->dataFileMax) == 0 ? $this->dataFileMax : (count($userIdArr) % $this->dataFileMax);
            
            //最后一个文件的文件名
            $lastFileName = $this->filePrefix.$fileTotalNum.$this->fileType;
            
            for($i = 1; $i <= $fileTotalNum; $i ++)
            {
                $tempUserIdArr = array();
                $tempUserIdArr = $userIdArrChunk[$i - 1];
                $fileName = $this->filePrefix.$i.$this->fileType;
                $fileNameArr[] = $fileName;
                $xmlStr = '';
                $xmlStr .= '<?xml version="1.0" encoding="utf-8"?><urlset>';
                foreach($tempUserIdArr as $val)
                {
                    $xmlStr .= '<url><loc>'.$this->userUrl.$val.'.html'.'</loc><lastmod>'.date('Y-m-d').'</lastmod><changefreq>'.$this->changefreq.'</changefreq><priority>'.$this->priority.'</priority></url>';
                }
                $xmlStr .= '</urlset>';
                file_put_contents($this->dataPath.$fileName, $xmlStr);
                chmod($this->dataPath.$fileName, 0755);
            }
            
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
            
            //向索引文件写入数据
            if(!empty($fileNameArr))
            {
                krsort($fileNameArr);
                $xmlStr = '';
                $xmlStr .= '<?xml version="1.0" encoding="utf-8"?><sitemapindex>';
                foreach($fileNameArr as $val)
                {
                    $xmlStr .= '<sitemap><loc>'.$this->dataPathUrl.$val.'</loc><lastmod>'.date('Y-m-d').'</lastmod></sitemap>';
                }
                $xmlStr .= '</sitemapindex>';
                file_put_contents($this->dataPath.$this->indexFile, $xmlStr);
                chmod($this->dataPath.$this->indexFile, 0755);
            }
            
            //写入outCreateOperator
            if(!is_dir($this->userIdFilePath))
            {
                mkdir($this->userIdFilePath, 0755, true);
            }
            file_put_contents($this->userIdFilePath.$this->userIdFileName, implode(',', $userIdArr));
            chmod($this->userIdFilePath.$this->userIdFileName, 0755);
        }
        $str .= date("Y-m-d H:i:s") . '  全量更新 end'."\n\n";
        file_put_contents($appLogFile, $str,FILE_APPEND);
    }
    
    //获取圈子对应的outCreateOperator
    private function upAllGroup($endTime)
    {
        //要查询的字段
        $fields = ['outCreateOperator','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['state'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($endTime));
        
        //最后一条数据的创建时间
        $lastDataTime = array();
        
        //数据起始偏移量
        $leftNum = 0;
        
        //每次取数据条数
        $rightNum = $this->dataFileMax;
        
        while(1)
        {
            $mapNq['start'] = $leftNum;
            $mapNq['limit'] = $rightNum;
            //$mapNq['sort'] = ['createTime'=>1];
            $res = $this->mongo->find("socialGroup",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                foreach($res as $val)
                {
                    if(!empty($val['outCreateOperator']))
                    {
                        $this->userIdArr[] = $val['outCreateOperator'];
                    }
                }

                
                if(count($res) < $rightNum)
                {
                    break;
                }
                
                $leftNum += $rightNum;
            }
            else
            {
                break;
            }
        }

    }
    
    //获取话题对应的outCreateOperator
    private function upAllTopic($endTime)
    {
        //要查询的字段
        $fields = ['outCreateOperator','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['states'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($endTime));
        
        //最后一条数据的创建时间
        $lastDataTime = array();
        
        //数据起始偏移量
        $leftNum = 0;
        
        //每次取数据条数
        $rightNum = $this->dataFileMax;
        
        while(1)
        {
            $mapNq['start'] = $leftNum;
            $mapNq['limit'] = $rightNum;
            //$mapNq['sort'] = ['createTime'=>1];
            $res = $this->mongo->find("socialTopic",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                foreach($res as $val)
                {
                    if(!empty($val['outCreateOperator']))
                    {
                        $this->userIdArr[] = $val['outCreateOperator'];
                    }
                }
                if(count($res) < $rightNum)
                {
                    break;
                }
                
                $leftNum += $rightNum;
            }
            else
            {
                break;
            }
        }

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
        
        //数据起始时间
        $this->lastDataTime = $logData['lastDataTime'];

        //记录日志
        $appLogFile = $this->logPath.'user_upappend_'.date('Y').'.log';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
        }
        $startTime =  $this->lastDataTime;
        $str = date("Y-m-d H:i:s") . '  增量更新 start'."\n";
        $str .= '  group查询数据区间'.$startTime.' - '.$endTime."\n";
        $str .= '  topic查询数据区间'.$startTime.' - '.$endTime."\n";

        //判断数据写入的文件夹是否存在
        if(!is_dir($this->dataPath))
        {
            mkdir($this->dataPath, 0755, true);
        }
        
        $this->upAppendGroup($endTime);
        $this->upAppendTopic($endTime);

        //读取log文件保存的outCreateOperator
        $oldUserIdArr = array();
        if(file_exists($this->userIdFilePath.$this->userIdFileName))
        {
            $oldUserIdStr = file_get_contents($this->userIdFilePath.$this->userIdFileName);
            $oldUserIdArr = explode(',', trim($oldUserIdStr, ','));
        }
        
        //所有增量中不重复的outCreateOperator（发过话题的用户+创建过圈子用户）
        $newUserIdArr = array_merge(array_unique($this->userIdArr));

        //outCreateOperator去重
        $userIdArr = array_merge(array_diff($newUserIdArr, $oldUserIdArr));

        $str .= '  数据共：'.count($userIdArr).'条'."\n";
        if(!empty($userIdArr))
        {
            //生成的普通文件名称数组
            $fileNameArr = array();
            
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
            
            //每次截取数组的偏移量
            $offset = 0;
            
            //每次截图数组的长度
            $length = ($logData['lastFileDataTotal'] == $this->dataFileMax) ? $this->dataFileMax : ($this->dataFileMax - $logData['lastFileDataTotal']);
            
            while(1)
            {
                $tempUserIdArr = array();
                $tempUserIdArr = array_slice($userIdArr, $offset, $length);
                $fileName = $this->filePrefix.$fileNum.$this->fileType;
                if(!file_exists($this->dataPath.$fileName))
                {
                    $fileNameArr[] = $fileName;
                    $xmlStr = '<?xml version="1.0" encoding="utf-8"?><urlset>';
                }
                else
                {
                    $xmlStr = file_get_contents($this->dataPath.$fileName);
                    $xmlStr = str_replace('</urlset>', '', $xmlStr);
                }
                
                foreach($tempUserIdArr as $val)
                {
                    $xmlStr .= '<url><loc>'.$this->userUrl.$val.'.html'.'</loc><lastmod>'.date('Y-m-d').'</lastmod><changefreq>'.$this->changefreq.'</changefreq><priority>'.$this->priority.'</priority></url>';
                }
                $xmlStr .= '</urlset>';
                file_put_contents($this->dataPath.$fileName, $xmlStr);
                chmod($this->dataPath.$fileName, 0755);
                
                $lastFileDataTotal = (($runTimes == 1 && $logData['lastFileDataTotal'] < $this->dataFileMax) ? $logData['lastFileDataTotal'] + count($tempUserIdArr) : count($tempUserIdArr));
                $lastFileName = $fileName;
                
                if(count($tempUserIdArr) < $length)
                {
                    break;
                }
                
                $offset += $length;
                $length = $this->dataFileMax;
                $runTimes ++;
                $fileNum ++;
            }
            
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

            //向索引文件写入数据
            if(!empty($fileNameArr))
            {
                krsort($fileNameArr);
                $comXml = '';
                foreach($fileNameArr as $val)
                {
                    $comXml .= '<sitemap><loc>'.$this->dataPathUrl.$val.'</loc><lastmod>'.date('Y-m-d').'</lastmod></sitemap>';
                }
                
                if(file_exists($this->dataPath.$this->indexFile))
                {
                    $xmlStr = file_get_contents($this->dataPath.$this->indexFile);
                    $replaceStr = '<sitemapindex>'.$comXml;
                    $xmlStr = str_replace('<sitemapindex>', $replaceStr, $xmlStr);
                }
                else
                {
                    $xmlStr = '<?xml version="1.0" encoding="utf-8"?><sitemapindex>';
                    $xmlStr .= $comXml;
                    $xmlStr .= '</sitemapindex>';
                }
                
                file_put_contents($this->dataPath.$this->indexFile, $xmlStr);
                chmod($this->dataPath.$this->indexFile, 0755);
            }
            
            //写入outCreateOperator
            if(!is_dir($this->userIdFilePath))
            {
                mkdir($this->userIdFilePath, 0755, true);
            }
            $userIdStr = trim($oldUserIdStr, ',').','.implode(',', $userIdArr);
            file_put_contents($this->userIdFilePath.$this->userIdFileName, $userIdStr);
            chmod($this->userIdFilePath.$this->userIdFileName, 0755);
        }
        $str .= date("Y-m-d H:i:s") . '  全量更新 end'."\n\n";
        file_put_contents($appLogFile, $str,FILE_APPEND);
    }
    
    //获取圈子对应的outCreateOperator
    private function upAppendGroup($endTime)
    {
        if(empty($this->lastDataTime))
        {
            return false;
        }
        
        //数据起始时间
        $startTime = $this->lastDataTime;

        //要查询的字段
        $fields = ['outCreateOperator','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['state'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] = new \MongoDate(strtotime($endTime));
        $mapEq['createTime']['$gte'] = new \MongoDate(strtotime($startTime));

        //最后一条数据的创建时间
        $lastDataTime = array();
        
        //数据起始偏移量
        $leftNum = 0;
        
        //每次取数据条数
        $rightNum = $this->dataFileMax;
        
        while(1)
        {
            $mapNq['start'] = $leftNum;
            $mapNq['limit'] = $rightNum;
            //$mapNq['sort'] = ['createTime'=>1];
            $res = $this->mongo->find("socialGroup",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                foreach($res as $val)
                {
                    if(!empty($val['outCreateOperator']))
                    {
                        $this->userIdArr[] = $val['outCreateOperator'];
                    }
                }
                

                if(count($res) < $rightNum)
                {
                    break;
                }
                
                $leftNum += $rightNum;
            }
            else
            {
                break;
            }
        }

    }
    
    //获取话题对应的outCreateOperator
    private function upAppendTopic($endTime)
    {
        if(empty($this->lastDataTime))
        {
            return false;
        }
        
        //数据起始时间
        //$startTime = $this->lastDataTime['topic'];
        $startTime = $this->lastDataTime;

        //要查询的字段
        $fields = ['outCreateOperator','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['states'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] = new \MongoDate(strtotime($endTime));
        $mapEq['createTime']['$gt'] = new \MongoDate(strtotime($startTime));
        
        //最后一条数据的创建时间
        $lastDataTime = array();
        
        //数据起始偏移量
        $leftNum = 0;
        
        //每次取数据条数
        $rightNum = $this->dataFileMax;
        
        while(1)
        {
            $mapNq['start'] = $leftNum;
            $mapNq['limit'] = $rightNum;
            //$mapNq['sort'] = ['createTime'=>1];
            $res = $this->mongo->find("socialTopic",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                foreach($res as $val)
                {
                    if(!empty($val['outCreateOperator']))
                    {
                        $this->userIdArr[] = $val['outCreateOperator'];
                    }
                }
                

                if(count($res) < $rightNum)
                {
                    break;
                }
                
                $leftNum += $rightNum;
            }
            else
            {
                break;
            }
        }

    }
}