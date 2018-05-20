<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 
 * +----------------------------------------------------------------------+
 * | @程序名称：TopicController.class.php                                  
 * +----------------------------------------------------------------------+
 * | @程序功能：话题sitemap操作类                                                      
 * +----------------------------------------------------------------------+
 * | Author:liuzhen <liuzhen@gomeplus.com>                            
 * +----------------------------------------------------------------------+
 * | Date:2017-03-16
 * +----------------------------------------------------------------------+
 */

namespace app\social\controller;
class Topic
{
    //每个文件能容纳的数据上限
    private $dataFileMax = 10000;
    
    //话题数据写入对应的文件夹绝对路径
    private $dataPath = '';
    
    //话题数据写入对应的文件夹相对路径
    private $dataPathUrl = '';
    
    //普通文件命名方式：前缀+数字+'.xml'
    //普通文件命名前缀
    private $filePrefix = 'topic_sitemap_';
    
    //索引文件名
    private $indexFile = 'topic_sitemap_index_1.xml';
    
    //普通文件的文件类型
    private $fileType = '.xml';
    
    //话题日志文件名
    private $logFileName = '';
    
    //话题对应的url
    private $topicUrl = '';
    
    //数据更新频次
    private $changefreq = 'weekly';
    
    //数据权重
    private $priority = '0.8';

    //业务日志目录
    private $logPath = '';

    public function __construct()
    {
        $this->dataPath = FILE_PATH.'topic/';
        $this->dataPathUrl = config('sitemap_url');
        $this->logFileName = FILE_PATH.'topic.log';
        $this->topicUrl = config('group_url').'topic/';
        $this->logPath = FILE_LOG . 'sitemap/';
        $servers = config('mongdb_server');
        $this->mongo = new \mconn\Hmongodb($servers);
        $this->mongo->selectDb("social");
    }
    
    public function index()
    {
        $mapEq['states'] = 0;
        $mapEq['isPublic'] = true;

        $date1 = '2017-03-20';
        $date2 = '2017-05-02';
        $mapEq['createTime']['$gt'] =  new \MongoDate(strtotime($date1));
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($date2));

        $mapNq['start'] = 0;
        $mapNq['limit'] = 10;


        $fields = ['_id','createTime'];

        $res = $this->mongo->find("socialTopic",$mapEq,$mapNq,$fields);
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
        $appLogFile = $this->logPath.'topic_upall_'.date('Y').'.log';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
        }
        $str = date("Y-m-d H:i:s") . '  全量更新 start'."\n";
        $str .= '  查询数据区间 date<'.$endTime."\n";

        //要查询的字段
        $fields = ['_id','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['states'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($endTime));

        //判断数据写入的文件夹是否存在
        if(!is_dir($this->dataPath))
        {
            mkdir($this->dataPath, 0755, true);
        }
        
        //生成的普通文件名称数组
        $fileNameArr = array();
        
        //文件名起始数字
        $fileNum = 1;
        
        //最后一条数据的创建时间
        $lastDataTime = array();
        
        //最后一个文件的数据总量
        $lastFileDataTotal = 0;
        
        //最后一个文件的文件名
        $lastFileName = '';
        
        //清空topic文件夹
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
            $res = $this->mongo->find("socialTopic",$mapEq,$mapNq,$fields);

            if(!empty($res))
            {
                $resCnt = count($res);
                $dataCnt += $resCnt;
                $fileName = $this->filePrefix.$fileNum.$this->fileType;
                $fileNameArr[] = $fileName;
                $xmlStr = '';
                $xmlStr .= '<?xml version="1.0" encoding="utf-8"?><urlset>';
                foreach($res as $val)
                {
                    $xmlStr .= '<url><loc>'.$this->topicUrl.$val['_id'].'.html'.'</loc><lastmod>'.$updateTime.'</lastmod><changefreq>'.$this->changefreq.'</changefreq><priority>'.$this->priority.'</priority></url>';
                }
                $xmlStr .= '</urlset>';
                file_put_contents($this->dataPath.$fileName, $xmlStr);
                chmod($this->dataPath.$fileName, 0755);
                
                $lastFileDataTotal = $resCnt;
                $lastFileName = $fileName;
                
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
        
        //向索引文件写入数据,倒叙排列
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
        $str .= date("Y-m-d H:i:s") . '  全量更新 end'."\n";
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
        
        //数据起始时间
        $startTime = $logData['lastDataTime'];

        //记录日志
        $appLogFile = $this->logPath.'topic_upappend_'.date('Y').'.log';
        if(!is_dir($this->logPath)){
            mkdir($this->logPath, 0755, true);
        }
        $str = date("Y-m-d H:i:s") . '  增量更新 start'."\n";
        $str .= '  查询数据区间'.$startTime.' - '.$endTime."\n";


        //要查询的字段
        $fields = ['_id','createTime'];

        //相等的判断条件
        $mapEq = array();
        $mapEq['states'] = 0;
        $mapEq['isPublic'] = true;
        $mapEq['createTime']['$lt'] =  new \MongoDate(strtotime($endTime));
        $mapEq['createTime']['$gte'] =  new \MongoDate(strtotime($startTime));
        
        //判断数据写入的文件夹是否存在
        if(!is_dir($this->dataPath))
        {
            mkdir($this->dataPath, 0755, true);
        }
        
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

            $res = $this->mongo->find("socialTopic",$mapEq,$mapNq,$fields);
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
                    $fileNameArr[] = $fileName;
                    $xmlStr = '<?xml version="1.0" encoding="utf-8"?><urlset>';
                }
                
                foreach($res as $val)
                {
                    $xmlStr .= '<url><loc>'.$this->topicUrl.$val['_id'].'.html'.'</loc><lastmod>'.$updateTime.'</lastmod><changefreq>'.$this->changefreq.'</changefreq><priority>'.$this->priority.'</priority></url>';
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
        $str .= '  数据共：'.$dataCnt.'条'."\n";
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
                $comXml .= '<sitemap><loc>'.$this->dataPathUrl.$val.'</loc><lastmod>'.$updateTime.'</lastmod></sitemap>';
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

        $str .= date("Y-m-d H:i:s") . '  增量更新 end'."\n\n";
        file_put_contents($appLogFile, $str,FILE_APPEND);
    }
    /**
     * 添加测试数据
     */
    public function addTestData(){

        //圈子 state 话题 states
        $model = D('SocialTopic');
        //$model = D('SocialGroup');
        $date1 = strtotime('2017-03-22');
        $time = new \MongoDate($date1);

        for ($i=0;$i<19000;$i++){
            $data['states'] = 0;
            $data['isPublic'] = true;
            $data['createTime'] = $time;
            $data['outCreateOperator'] = '40'.$i;
            $result = $model->add($data);
        }
        echo 22;
    }
}