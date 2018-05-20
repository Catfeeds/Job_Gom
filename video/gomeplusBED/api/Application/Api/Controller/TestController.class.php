<?php

namespace Api\Controller;
use Api\Controller\BaseController;
class TestController extends BaseController
{
    public function __construct() {
        parent::__construct();
    }

    public function Index(){
        $this->display('Test/Index');
    }

    public function clean(){
        $pre_key = 'cms_channel_';

        //家装成家================================================
        $homesHotTopic = $pre_key.strtolower('homesHotTopic');
        $homesInterestGroup = $pre_key.strtolower('homesInterestGroup');
        $home_str1 =  "家装城的接口1-".$homesHotTopic.":";
        $home_res1 = S($homesHotTopic);
        if($home_res1){
            $home_str1.='数据不为空,执行清除操作';
            S($homesHotTopic,null);
        }else{
            $home_str1.='缓存数据为空';
        }
        echo $home_str1."<br><br>";
        $home_str2 =  "家装城的接口2-".$homesInterestGroup.":";
        $home_res2 = S($homesInterestGroup);
        if($home_res2){
            $home_str2.='数据不为空,执行清除操作';
            S($homesInterestGroup,null);
        }else{
            $home_str2.='缓存数据为空';
        }

        echo $home_str2."<br><br>";

        //新品抢先================================================
        $newHotTopic = $pre_key.strtolower('newHotTopic');
        $newInterestGroup = $pre_key.strtolower('newInterestGroup');
        $new_res1 = S($newHotTopic);
        $new_str1 =  "新品抢先-接口1-".$newHotTopic.":";
        if($new_res1){
            $new_str1.='数据不为空,执行清除操作';
            S($newHotTopic,null);
        }else{
            $new_str1.='缓存数据为空';
        }

        echo $new_str1."<br><br>";
        $new_res2 = S($newInterestGroup);
        $new_str2 =  "新品抢先-接口2-".$newInterestGroup.":";
        if($new_res2){
            $new_str2.='数据不为空,执行清除操作';
            S($newInterestGroup,null);
        }else{
            $new_str2.='缓存数据为空';
        }
        echo $new_str2."<br><br>";

        //今日特卖=============================================================
        $saleBuyList = $pre_key.strtolower('saleBuyList');
        $sale_res1 = S($saleBuyList);
        $sale_str1 =  "今日特卖-接口1-".$saleBuyList.":";
        if($sale_res1){
            $sale_str1.='数据不为空,执行清除操作';
            S($saleBuyList,null);
        }else{
            $sale_str1.='缓存数据为空';
        }
        echo $sale_str1."<br><br>";
    }
}