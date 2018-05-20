<?php

namespace Services\Service;

use Services\Service\BaseService;
class CommendService extends BaseService {
    //缓存key前缀
    const CACHE_PREFIX = 'cms_channel_';

    //备份缓存key
    const BAK_CACHE_PREFIX = 'bak_cms_channel_';

    //缓存标识，false：不取缓存，true：取缓存
    const CACHE_FLAG = true;

    //心跳检测频率 10秒
    const CACHE_HEARTBAT = 10;

    public $bs_version = 2;
    public $key = 'CommendService';
    public $param = array();

    public $gomeHotTopic = 'v2/slot/gome/hotTopic.json';//热门话题|主页-热门话题
    public $gomeInterestGroup = 'v2/slot/gome/interestGroup.json';//兴趣圈子|主页-热门话题
    public $gomeQualitylife = 'v2/slot/gome/qualityLife.json';//品质生活|主页-品质生活
    public $gomeTopicRecommend = 'v2/slot/gome/topicRecommend.json';//主题推荐|主页-主题推荐
    public $fashionHotRecommend = 'v2/slot/fashion/hotRecommend.json';//热门推荐|服装城首页-热门推荐
    public $marketWonderfulGroup = 'v2/slot/market/wonderfulGroup.json';//精彩圈子|超市首页-精彩圈子
    public $tuanWonderfulTopic = 'v2/slot/tuan/wonderfulTopic.json';//精彩话题|团抢频道页-精彩话题
    public $carGroupRecommend = 'v2/slot/car/wonderfulGroup.json'; //圈子推荐|汽车首页-精彩圈子
    public $alcoholDrinksClub = 'v2/slot/alcohol/drinksClub.json';////酒水茶叶-畅饮俱乐部
    public $alcoholInterestGroup = 'v2/slot/alcohol/interestGroup.json';//酒水茶叶-兴趣圈子

    public $homesHotTopic = 'v2/slot/homes/hotTopic.json';//家装城首页-热门话题|家装城首页-热门话题
    public $homesInterestGroup = 'v2/slot/homes/interestGroup.json';//家装城首页-兴趣圈子|家装城首页-兴趣圈子
    public $saleBuyList = 'v2/slot/sale/buyList.json';//今日特卖-必买清单|今日特卖-必买清单
    public $newHotTopic =  'v2/slot/new/hotTopic.json';//新品抢先首页-热门话题|新品抢先首页-热门话题
    public $newInterestGroup= 'v2/slot/new/interestGroup.json';//新品抢先首页-兴趣圈子|新品抢先首页-兴趣圈子


    /*
     * 统一获取数据入口
     *
     */
    public function getCmsList($apiName){
        if(empty($apiName)){ return ''; }

        $cacheKey = self::CACHE_PREFIX.strtolower($apiName);  //key小写兼容上一版
        $bak_cacheKey = self::BAK_CACHE_PREFIX.strtolower($apiName);

        if(self::CACHE_FLAG){
            $data = S($cacheKey);
        }else{
            $data = '';
        }

        if(empty($data)){
            $result = $this->getDataCms($this->$apiName,$this->param);
            $data = $result['data'];
            if($result['success'] && !empty($result['data'])){
                S($cacheKey, $data, 0);
                S($bak_cacheKey,$data,0);
            }
        }
        if(empty($data)){
            $data = S($bak_cacheKey);
            S($cacheKey,$data,self::CACHE_HEARTBAT);
        }
        return $data;
    }
}
