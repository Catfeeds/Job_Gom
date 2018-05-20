<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：ChannelService.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:liluming <liluming@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2017-10-25 11:23:11 CST                                         |
 * +----------------------------------------------------------------------+
 */
 
 
namespace Mall\Service;
use Home\Service\BaseService;
use Common\Lib\CurlHandler;
class ChannelService extends BaseService
{
    //控制是否使用缓存
    const CACHE_FLAG = true;

    //缓存前缀
    const CACHE_PREFIX = 'mshop_wap_';

    //备份缓存
    const BAK_CACHE_PREFIX = 'bak_mshop_wap_';

    //缓存时间10分钟
    const CACHE_TIME = 600;

    //心跳检测频率 10秒
    const CACHE_HEARTBAT = 10;

    public $bs_version = 2;
	public $key = 'MshopChannelService';

    public $top_banner = 'channelgWzTGNLkMiZ'; //顶部导航 key 
    public $left_banner = 'channellzhcx34ReMQ'; //左侧导航 key
    public $good_recommend = 'channelY9Sa7aBjDg8'; //好货推荐-自然流量 key 
    public $good_recommend_shop = 'channelaARiHKOZNBE'; //好货推荐-门店 key
    public $mshop_guide = 'channeldy8CWZnNsZS'; //美店引导页背景图 key
    public $ranking_list = 'shop/shopRankingListInfoForPC';  //频道页排行榜
    public $channel_index = 'shop/shopRecommendedInfoForPC';  //频道页整块内容
    public $mshop_info = 'shop/shopForPC';  //频道页整块内容


    /*
     * 获取我的美店-顶部和左侧导航
     */
    public function getTopBanner(){
        $result = $this->getBannerByKey($this->top_banner); 
        return empty($result) ? [] : $result;
    }


    /*
     * 获取我的美店-顶部和左侧导航
     */
    public function getLeftBanner(){
        $result = $this->getBannerByKey($this->left_banner);
        return empty($result) ? [] : $result;
    }


    /*
     * 获取我的美店-引导页北京图
     */
    public function getGuideBanner(){
        $result = $this->getBannerByKey($this->mshop_guide);
        return empty($result) ? [] : $result;
    }

    /*
     * 获取我的美店-好货推荐
     */
    public function getGoodsRecommend(){
        $result = $this->getBannerByKey($this->good_recommend); 
        return empty($result) ? [] : $result;
    }

    /*
     * 获取我的美店-好货推荐(门店)
     */
    public function getGoodsRecommendShop(){
        $result = $this->getBannerByKey($this->good_recommend_shop);
        return empty($result) ? [] : $result;
    }

    /*
     * 获取广告位共用方法
     */
    private function getBannerByKey($keyName){
        if(empty($keyName)){ return ''; }

        $cacheKey = self::CACHE_PREFIX.strtolower($keyName);  //key小写兼容上一版
        $bak_cacheKey = self::BAK_CACHE_PREFIX.strtolower($keyName);

        if(self::CACHE_FLAG){
            $data = S($cacheKey);
        }else{
            $data = '';
        }
        if(empty($data)){
            $uri = C('MSHOP_CMS_BANNER') . $keyName . '.jsp';
            $curlObj = new CurlHandler();
            $result = $curlObj->request($uri,[]);
            $result = json_decode($result,true);
            //print_r($result);
            $data = $result['templetList'][0];

            if(isset($result['templetList']) && !empty($data)){
                S($cacheKey, $data, self::CACHE_TIME);
                S($bak_cacheKey,$data,0);
            }
        }
        if(empty($data)){
            $data = S($bak_cacheKey);
            S($cacheKey,$data,self::CACHE_HEARTBAT);
        }
        return $data;
    }


    /**
     * 获取排行榜数据
     */

    public function getRankingList(){
        $result = $this->getData($this->ranking_list,[]);
        //print_r($result);
        return $result;
    }

    /**
     * 获取频道页展示内容
     */

    public function getChannelData(){

        //获取区域信息
        $addrArr = getAddrGome();
        $addressId = $addrArr['cityId'];
        $cache_key = 'mshop_chanel_index';

        $result = []; 
        if(!$this->userId){
            $result = S($cache_key);
        }

        if(empty($result)){ 
            $data = $this->getData($this->channel_index,['secondLevelAddressId'=>$addressId]);
            //print_r($result);die;

            //构造数组
            $result = [];
            foreach ($data['data']['templet'] as $key=>$val){
                //轮播图
                if($val['templetCode'] == 'focusPhotoListTemplet'){

                    $result['focusPhotoListTemplet'] = $val['focusPhotoListTemplet'];
                    $result['focusPhotoListTempletCnt'] = count($result['focusPhotoListTemplet']);
                }
                //爆品推荐
                if($val['templetCode'] == 'goodsTemplet'){
                    //遍历处理
                    $result['goodsTemplet'] = array_chunk($val['goodsTemplet'],6);
                    $result['goodsTempletCnt'] = count($result['goodsTemplet']);
                }

                //广告位
                if($val['templetCode'] == 'floorPhotoTemplet' && $val['imgRowNum']==1 ){
                    $result['floorPhotoTemplet'] = current($val['floorPhotoTemplet']);
                }
                //最美美店
                if($val['templetCode'] == 'dailyPhotosTemplet'){
                    $result['dailyPhotosTemplet'] = $val['dailyPhotosTemplet'];
                    $result['dailyPhotosTemplet_title'] = $val['title'];
                }

                //四图
                if($val['templetCode'] == 'floorPhotoTemplet' && $val['imgRowNum']==4){
                    $result['floorPhotoTemplet_4'] = $val['floorPhotoTemplet'] ;
                    $result['floorPhotoTemplet_4_title'] = isset($val['title']) ? $val['title'] : '' ;
                }
                
                //大小图
                if($val['templetCode'] == 'bigSmallTemplet' && $val['bigSmallImgNum']==4){
                    $result['bigSmallTemplet'][] = $val['bigImgList'][0];
                    $result['bigSmallTemplet'][] = $val['smallImgList'][0];
                    $result['bigSmallTemplet'][] = $val['smallImgList'][1];
                    $result['bigSmallTemplet'][] = $val['imgList'][0];
                    $result['bigSmallTemplet_title'] = isset($val['title']) ? $val['title'] : '' ;

                }

                //热门话题
                if($val['templetCode'] == 'selectTopicsTemplet'){
                    $result['selectTopicsTemplet'] = $val['selectTopicsTemplet'];
                    $result['selectTopicsTemplet_title'] = $val['title'];
                    //无线话题url转为pc话题url
                    foreach ($result['selectTopicsTemplet'] as $kk=>$vv){
                        $topicId = explode('-',$vv['detailScheme']);
                        $topicId = explode('.',$topicId[1]);
                        $result['selectTopicsTemplet'][$kk]['detailScheme'] = APP_HTTP.C('GROUP_URL') . 'topic/'.$topicId[0].'.html';
                    }
                }
            }
            //print_r($result);die;
            //有值并且没登录的情况,添加缓存
            if($this->CACHE_FLAG && $result && !$this->userId){
                S($cache_key,$result,self::CACHE_TIME);
            }
        }

        return $result;
    }

}
