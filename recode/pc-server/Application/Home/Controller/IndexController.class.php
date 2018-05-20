<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:lishuai <lishuai@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-23 13:49:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Home\Controller;

use Home\Controller\BaseController;
use Common\Lib\CurlHandler;

class IndexController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->home = D("Home/Home");
        $this->cacheKey = 'pc_home_index'; //首页缓存key
        $this->backupKey = 'pc_home_index_back'; //备份的缓存key | 备用缓存永不过期

        $this->cacheModel2 = 'pc_home_index_model2';
        $this->backupCacheModel2 = 'pc_home_index_back2'; //备份的缓存key | 备用缓存永不过期
        $this->cacheModel3 = 'pc_home_index_model3';
        $this->backupCacheModel3 = 'pc_home_index_back3'; //备份的缓存key | 备用缓存永不过期
        $this->cacheModel4 = 'pc_home_index_model4';
        $this->backupCacheModel4 = 'pc_home_index_back4'; //备份的缓存key | 备用缓存永不过期
        $this->cacheModel5 = 'pc_home_index_model5';



        $this->cacheTime = 60; //缓存有效时长
        $this->backupTime = 3600; //更新频率1小时一次
        $this->backupTagKey = 'pc_home_backup_tag'; //备份的标识
        $this->backupTagKey2 = 'pc_home_backup_tag2'; //备份的标识2
        $this->backupTagKey3 = 'pc_home_backup_tag3'; //备份的标识3
        $this->backupTagKey4 = 'pc_home_backup_tag4'; //备份的标识4


        $this->feedcacheKey = 'pc_home_index_feed'; //首页寻觅的缓存key
        $this->feedcacheTime = 300; //缓存有效时长

    }

    /**
     * 大首页
     *
     */
    public function index()
    {
        $data = array();
        //轮播+加入圈子+热门话题
        $index = $this->getIndexData();
        //品质生活
        $commend = $this->recommendlist();
        //圈子话题
        $topic = $this->topiclist();
        //逛逛商品+兴趣圈子
        $productGroup = $this->productGrouplist();

        $myGroupData = array();
        //登录后取圈子数据
        if ($this->userId) {
            $topicObj = D('Ucenter/Topic');
            $groupData = $topicObj->getData($topicObj->myRelated);
            $groupData['data']['imaster'] = isset($groupData['data']['imaster']) ? $groupData['data']['imaster'] : array();
            $groupData['data']['imember'] = isset($groupData['data']['imember']) ? $groupData['data']['imember'] : array();
            $myGroupData = array_merge($groupData['data']['imaster'], $groupData['data']['imember']);
            unset($groupData);
            if ($myGroupData) {
                foreach ($myGroupData as $k => $val) {
                    $myGroupData[$k] = $val['id'];
                }
            }
        }

        //首页广告配置
        $conf_ad_foucs = C('ADVERT_IDS.foucs');
        $conf_ad_guang = C('ADVERT_IDS.guangguang');
        $slotId = $conf_ad_foucs['second'] ? $conf_ad_foucs['first'] . ',' . $conf_ad_foucs['second'] : $conf_ad_foucs['first'];
        $ad_flight_url = C('ADVERT_URL.FLIGHT') . "flight?slotId=" . $slotId . "&requestType=4&directJsVar=\$GLOBAL_CONFIG['advert']";
        $ad_main_url = C('ADVERT_URL.MAIN') . 'ad/js/gaxflightpage.min.js';
        $this->assign('focus_ad_ids', $conf_ad_foucs);
        $this->assign('guang_ad_ids', $conf_ad_guang);
        $this->assign('adflight_url', $ad_flight_url);
        $this->assign('admain_url', $ad_main_url);
        $this->assign('indexList', $index);
        $this->assign('commendList', $commend);
        $this->assign('topicList', $topic);
        $this->assign('productGroup',$productGroup);
        //我的圈子id
        $this->assign('myGroupData', $myGroupData);
        //新加规则大首页不用h1标
        $this->assign('nowurl', 'home/index');
        //三要素
        $this->assign('title', '边玩边分享，购物不孤单 - 国美');
        $this->assign('keywords', '国美 APP,国美 APP下载,国美官网,国美iso版下载,国美Android版下载');
        $this->assign('description', '国美 APP是全新的社交电商平台，整合国美优质商家，以兴趣圈子为基础，达人为核心的社交购物社区，用户快乐分享同时轻松赚取返利佣金！赶快下载国美 APP！');
        $this->display('Index/index');
    }


    //banner轮播 热门话题 加入圈子
    private function getIndexData()
    {
        $data = S($this->cacheKey);
        if(!$data){
            $this->home->setTimeOut(10);
            $data = $this->home->getData($this->home->homepage1);
            if ( $data['success'] && isset($data['data']) && $data['data']['banner'] && $data['data']['hotTopics'] && $data['data']['hotTopics'] >=3 && $data['data']['groups'] && $data['data']['groups'] >=6 ) {
                //数据格式化
                $data = $this->_formatData($data['data'], 1);
                //更新缓存
                S($this->cacheKey, $data, $this->cacheTime);
                if (!S($this->backupKey)) {
                    //更新备份数据
                    S($this->backupKey, $data,0);
                } elseif (!S($this->backupTagKey)) {
                    //更新备份数据
                    S($this->backupKey, $data,0);
                    S($this->backupTagKey, date('Ymd'), $this->backupTime);
                }

            } else {
                //启用备用缓存
                $data = S($this->backupKey);
                //更新缓存
                S($this->cacheKey, $data, $this->cacheTime);

            }
        }
        return $data;
    }

    //品质生活
    private function recommendlist()
    {
        //返回类型
        $data = S($this->cacheModel2);
        if (!$data) {
            $param['areaCode'] = getAddrGome()['cityId'];
            $data = $this->home->getData($this->home->homepage2, $param);
            if ($data['success'] && isset($data['data']['recommend']) && count($data['data']['recommend'] ) >= 3 ) {//更新缓存与备用缓存
                $data = $this->_formatData($data['data'], 2);
                S($this->cacheModel2, $data, $this->cacheTime);
                if (!S($this->backupCacheModel2)) {
                    S($this->backupCacheModel2, $data,0);
                } elseif (!S($this->backupTagKey2)) {
                    S($this->backupCacheModel2, $data,0);
                    S($this->backupTagKey2, date('Ymd'), $this->backupTime);
                }
            } else {//启用备用缓存
                $data = S($this->backupCacheModel2);
                S($this->cacheModel2, $data, $this->cacheTime);

            }
        }
        return $data;
    }

    //圈子话题
    private function topiclist()
    {
        $data = S($this->cacheModel4);
        if (!$data) {
            $data = $this->home->getData($this->home->homepage4);
            if ($data['success'] && isset($data['data']['topic']) && $data['data']['topic'] >=10 ) {//更新缓存与备用缓存
                $data = $this->_formatData($data['data'], 4);
                S($this->cacheModel4, $data, $this->cacheTime);
                if (!S($this->backupCacheModel4)) {
                    S($this->backupCacheModel4, $data,0);
                } elseif (!S($this->backupTagKey4)) {
                    S($this->backupCacheModel4, $data,0);
                    S($this->backupTagKey4, date('Ymd'), $this->backupTime);
                }
            } else {//启用备用缓存
                $data = S($this->backupCacheModel4);
                S($this->cacheModel4, $data, $this->cacheTime);

            }
        }

        return $data;
    }

    //逛逛商品+兴趣圈子
    public function productGrouplist()
    {
        $data = S($this->cacheModel3);
        if (!$data) {
            $data = $this->home->getData($this->home->homepage3);
            if ($data['success'] && $data['data']['group'] && $data['data']['saleBanner'] && $data['data']['saleProduct'] && $data['data']['saleRecommend']) {//更新缓存与备用缓存
                $data = $this->_formatData($data['data'], 3);
                S($this->cacheModel3, $data, $this->feedcacheTime);

                if (!S($this->backupCacheModel3)) {
                    S($this->backupCacheModel3, $data,0);
                } elseif (!S($this->backupTagKey3)) {
                    S($this->backupCacheModel3, $data,0);
                    S($this->backupTagKey3, date('Ymd'), $this->backupTime);
                }

            } else {//启用备用缓存
                $data = S($this->backupCacheModel3);
                S($this->cacheModel3, $data, $this->cacheTime);

            }

        }

        return $data;
    }

    public function feedlist()
    {
        //不断寻觅
        $feedData = S($this->feedcacheKey);
        if (!$feedData) {
            $param = array('pageNum' => 1, 'pageSize' => 5);
            if ($this->userId) {
                $param['userId'] = $this->userId;
            }
            $temp = $this->home->getData($this->home->homefeed, $param);
            if (isset($temp['data']['feedTopics'])) {
                foreach ($temp['data']['feedTopics'] as $k => &$feed) {
                    $image = '';
                    foreach ($feed['components'] as $kk => $vv) {
                        if ($vv['type'] == 'image') {
                            if (isset($vv['isOnLine']) && $vv['isOnLine']) {
                                $image = getResizeImg($vv['url'], 260, 260, 'ONLINE');
                            } else {
                                $image = getResizeImg($vv['url'], 230, 230, 'MEIXIN');
                            }
                            break;
                        }
                        if ($vv['type'] == 'item' && isset($vv['item']['mainImage'])) {
                            $image = getResizeImg($vv['item']['mainImage'], 260, 260, 'ONLINE');
                            break;
                        }
                        if ($vv['type'] == 'video') {
                            $image = getResizeImg($vv['coverImage'], 230, 230);
                            break;
                        }
                    }
                    $feed['replyQuantity'] = isset($feed['replyQuantity']) ? $feed['replyQuantity'] : 0;
                    $feedData[$k] = array('id' => $feed['id'], 'name' => $feed['name'], 'group_name' => $feed['group']['name'], 'feedReason' => $feed['feedReason'], 'userQuantity' => $feed['like']['userQuantity'], 'topicCollectionQuantity' => $feed['topicCollectionQuantity'], 'replyQuantity' => $feed['replyQuantity'] + $feed['subReplyQuantity'], 'url' => handleUrl($image));
                }
                unset($temp);
            }
            S($this->feedcacheKey, $feedData, $this->feedcacheTime);
        }
        if ($feedData) {
            $this->outJSON(200, 'ok', $feedData);
        } else {
            $this->outError(\Think\ErrorCode::CACHE_ERROR);
        }

    }

    /*
     * 底部浮层接口：供js调用
     * 
     */
    public function floatLayer()
    {
        //数据获取失败时返回信息
        $errReturn = array(
            "success" => false,
            "code" => 500,
            "message" => "失败",
            "data" => array()
        );

        $data = S($this->cacheModel5);

        if (empty($data)) {
            //调用CMS接口
            $curlObj = new CurlHandler(2);
            $data = xss_clean_recursive($curlObj->request(C('CMS_URL').$this->home->floatLayer, array(), 'get'));

            //更新缓存
            if ($data['success'] && $data['data']) {
                //返回数据处理：如果接口返回数据缺少部分关键字段，则将返回数据置为空数组
                $data = $this->_formatData($data, 5);
                S($this->cacheModel5, $data, $this->feedcacheTime);
            } else {
                //返回错误信息
                $data = $errReturn;
            }
        }

        $this->ajaxReturn($data);
    }

    //校验数据完整性
    private function _formatData($data, $m)
    {
        if (!$data) return;
        switch ($m) {
            case 1:
                //轮播
                if (isset($data['banner'])) {
                    foreach ($data['banner'] as $k => $banner) {
                        if ($k > 3) {
                            break;
                        }
                        $data['banners'][$k]['tid'] = $banner['id'];
                        $data['banners'][$k]['origin_img_url'] = handleUrl($banner['cmsIcon']);
                        $data['banners'][$k]['name'] = $banner['cmsName'];
                        $data['banners'][$k]['pc_url'] = handleUrl($banner['url']);
                        $data['banners'][$k]['type'] = $banner['type'];
                        $data['banners'][$k]['shop_id'] = isset($banner['shop_id']) ? $banner['shop_id'] : 0;
                    }
                    unset($data['banner']);
                }
                //热门话题
                $i = 0;
                if (isset($data['hotTopics']['peas'])) {
                    $data['hotTopic'] = array();
                    foreach ($data['hotTopics']['peas'] as $k => $hotTopics) {
                        if (!$hotTopics['id'] && $hotTopics['ADId']) {
                            continue;
                        }
                        if ($i > 2) {
                            break;
                        }
                        $data['hotTopic'][$k]['id'] = $hotTopics['id'];
                        $data['hotTopic'][$k]['name'] = $hotTopics['name'];
                        $data['hotTopic'][$k]['facePicUrl'] = isset($hotTopics['user']['facePicUrl']) ? handleUrl($hotTopics['user']['facePicUrl']) : '';
                        $data['hotTopic'][$k]['nickname'] = isset($hotTopics['user']['nickname']) ? $hotTopics['user']['nickname'] : '';
                        $data['hotTopic'][$k]['dataPic'] = getResizeImg($hotTopics['dataPic'], 600, 0, 'MEIXIN');
                        $data['hotTopic'][$k]['dataTitle'] = isset($hotTopics['dataTitle']) ? $hotTopics['dataTitle'] : '';
                        $data['hotTopic'][$k]['href'] = topicDetailUrlGen($hotTopics['id']);
                        $data['hotTopic'][$k]['userInfoUrl'] = isset($hotTopics['user']['id']) ? userInfoUrlGen($hotTopics['user']['id']) : '';
                        $i++;
                    }
                    unset($data['hotTopics']);
                }
                //加入圈子
                if (isset($data['groups'])) {
                    foreach ($data['groups'] as $k => $groups) {
                        if ($k > 5) {
                            break;
                        }
                        $data['groupsJ'][$k]['group_id'] = $groups['group_id'];
                        $data['groupsJ'][$k]['cmsIcon'] = isset($groups['origin_icon']) ? $groups['origin_icon'] : $groups['cmsIcon'];
                        $data['groupsJ'][$k]['cmsIcon'] = getResizeImg($data['groupsJ'][$k]['cmsIcon'], 100, 100, 'MEIXIN');
                        $data['groupsJ'][$k]['cmsName'] = $groups['cmsName'];
                        $data['groupsJ'][$k]['href'] = groupDetailUrlGen($groups['group_id']);
                    }
                    unset($data['groups']);
                }
                break;
            case 2:
                //美信推荐
                if ($data['recommend']) {
                    foreach ($data['recommend'] as $k => $commend) {
                        if ($k > 5) {
                            break;
                        }
                        $data['commend'][$k]['tid'] = $commend['topic_id'];
                        $data['commend'][$k]['origin_img_url'] = getResizeImg($commend['cmsIcon'], 390, 200, 'MEIXIN');
                        $data['commend'][$k]['voteNum'] = $commend['like']['userQuantity'] ? $commend['like']['userQuantity'] : 0;
                        $data['commend'][$k]['category_name'] = $commend['category_name'];
                        $data['commend'][$k]['name'] = $commend['cmsName'];
                        $data['commend'][$k]['group_id'] = $commend['group_id'];
                        $temp_categroy_len = intval(mb_strlen($commend['category_name'], 'UTF-8'));
                        $temp_name_len = intval(mb_strlen($commend['cmsName'], 'UTF-8'));
                        $data['commend'][$k]['short_name'] = $temp_categroy_len + $temp_name_len > 19 ? mb_substr($commend['cmsName'], 0, 19 - $temp_categroy_len) . '...' : $commend['cmsName'];
                        $num1 = isset($commend['replyQuantity']) ? $commend['replyQuantity'] : 0;
                        $num2 = isset($commend['subReplyQuantity']) ? $commend['subReplyQuantity'] : 0;
                        $data['commend'][$k]['sumQuantity'] = $num1 + $num2;
                        $data['commend'][$k]['description'] = $commend['description'];
                        $data['commend'][$k]['href'] = topicDetailUrlGen($commend['topic_id']);
                        foreach ($commend['cmsComponents'] as $kk => &$cmsComponents) {
                            if ($kk == 3) {
                                break;
                            }
                            $data['commend'][$k]['goods_ids'][$kk]['productId'] = $cmsComponents['id'];
                            $data['commend'][$k]['goods_ids'][$kk]['shopId'] = $cmsComponents['shopId'];

                            $data['commend'][$k]['goods_ids'][$kk]['name'] = isset($cmsComponents['name']) ? $cmsComponents['name'] : '';
                            $data['commend'][$k]['goods_ids'][$kk]['type'] = $cmsComponents['type'];
                            if ($cmsComponents['type'] == 'item') {
                                $data['commend'][$k]['goods_ids'][$kk]['price'] = isset($cmsComponents['item']['salePrice']) ? convert_price($cmsComponents['item']['salePrice']) : '';
                                $data['commend'][$k]['goods_ids'][$kk]['href'] = productDetailUrlGen($cmsComponents['shopId'], $cmsComponents['id']);
                                $data['commend'][$k]['goods_ids'][$kk]['image'] = isset($cmsComponents['image']) ? (is_array($cmsComponents['image']) ? getResizeImg($cmsComponents['image'][0],120,120,'ONLINE') : getResizeImg($cmsComponents['image'],120,120,'ONLINE') ) : '';
                            }
                            if($cmsComponents['type'] == 'video'){
                                $data['commend'][$k]['goods_ids'][$kk]['image'] = isset($cmsComponents['image']) ? (is_array($cmsComponents['image']) ? getResizeImg($cmsComponents['image'][0],120,85) : getResizeImg($cmsComponents['image'],120,85) ) : '';
                            }
                        }
                    }
                    unset($data['recommend']);
                }
                break;

            case 3:
                //逛逛商品+兴趣圈子
                //逛逛商品-商品

                foreach ($data['saleProduct'] as $k => $saleProduct) {
                    $data['goods']['goods'][$k]['tid'] = isset($saleProduct['id']) ? $saleProduct['id'] : '';
                    $data['goods']['goods'][$k]['select_type'] = $saleProduct['type'];
                    $data['goods']['goods'][$k]['origin_img_url'] = $saleProduct['cmsIcon'];
                    $data['goods']['goods'][$k]['name'] = isset($saleProduct['cmsName']) ? $saleProduct['cmsName'] : '';
                    $data['goods']['goods'][$k]['url'] = handleUrl($saleProduct['url']);
                    $data['goods']['goods'][$k]['shop_id'] = 0;
                    if (isset($saleProduct['item']['shopId']) && $saleProduct['type'] == 0) {
                        $data['goods']['goods'][$k]['shop_id'] = $saleProduct['item']['shopId'];
                    }
                }
                unset($data['saleProduct']);
                //逛逛商品-链接
                foreach ($data['saleRecommend'] as $k => $saleRecommend) {
                    if ($k == 10) {
                        break;
                    }
                    $data['goods']['keyword'][$k]['tid'] = isset($saleRecommend['id']) ? $saleRecommend['id'] : '';
                    $data['goods']['keyword'][$k]['select_type'] = $saleRecommend['type'];
                    $data['goods']['keyword'][$k]['keyword'] = $saleRecommend['keyword'];
                    $data['goods']['keyword'][$k]['url'] = handleUrl($saleRecommend['url']);
                    $data['goods']['keyword'][$k]['shop_id'] = isset($saleRecommend['shop_id']) ? $saleRecommend['shop_id'] : 0;

                }
                unset($data['saleRecommend']);

                //逛逛商品-轮播
                foreach ($data['saleBanner'] as $k => $saleBanner) {
                    if ($k > 5) {
                        break;
                    }
                    $data['goods']['banner'][$k]['tid'] = isset($saleBanner['id']) ? $saleBanner['id'] : '';
                    $data['goods']['banner'][$k]['select_type'] = $saleBanner['type'];
                    $data['goods']['banner'][$k]['origin_img_url'] = handleUrl($saleBanner['cmsIcon']);
                    $data['goods']['banner'][$k]['name'] = isset($saleBanner['cmsName']) ? $saleBanner['cmsName'] : '';
                    $data['goods']['banner'][$k]['url'] = handleUrl($saleBanner['url']);
                    $data['goods']['banner'][$k]['shop_id'] = 0;
                    if (isset($saleBanner['item']['shopId']) && $saleBanner['type'] == 0) {
                        $data['goods']['banner'][$k]['shop_id'] = $saleBanner['item']['shopId'];
                    }
                }
                unset($data['saleBanner']);
                //兴趣圈子
                foreach ($data['group'] as $k => $group) {
                    $data['groups'][$k]['tid'] = $group['group_id'];
                    $data['groups'][$k]['name'] = $group['cmsName'];
                    $data['groups'][$k]['category_name'] = $group['category_name'];
                    $temp_categroy_len = intval(mb_strlen($group['category_name'], 'UTF-8'));
                    $temp_name_len = intval(mb_strlen($group['cmsName'], 'UTF-8'));
                    $data['groups'][$k]['short_name'] = $temp_categroy_len + $temp_name_len > 13 ? mb_substr($group['cmsName'], 0, 13 - $temp_categroy_len) . '...' : $group['cmsName'];
                    $data['groups'][$k]['memberQuantity'] = isset($group['memberQuantity']) ? $group['memberQuantity'] : 0;
                    $data['groups'][$k]['topicQuantity'] = isset($group['topicQuantity']) ? $group['topicQuantity'] : 0 ;
                    $data['groups'][$k]['origin_img_url'] = handleUrl($group['cmsIcon']);
                    $data['groups'][$k]['href'] = groupDetailUrlGen($group['group_id']);
                }
                unset($data['group']);
                break;

            case 4:
                //圈子话题
                foreach ($data['topic'] as $k => $topic) {
                    if ($k > 9) {
                        break;
                    }
                    $data['topics'][$k]['tid'] = $topic['topic_id'];
                    $data['topics'][$k]['group_id'] = $topic['group_id'];
                    $data['topics'][$k]['group_icon'] = isset($topic['group_icon']) ? getResizeImg($topic['group_icon'], 16, 16, 'MEIXIN') : '';
                    $data['topics'][$k]['group_name'] = $topic['group_name'];
                    $data['topics'][$k]['name'] = mb_substr($topic['cmsName'], 0, 12, 'UTF-8');
                    $data['topics'][$k]['origin_img_url'] = getResizeImg($topic['cmsIcon'], 230, 153, 'MEIXIN');
                    $data['topics'][$k]['voteNum'] = $topic['like']['userQuantity'];
                    $topic['replyQuantity'] = isset($topic['replyQuantity']) ? $topic['replyQuantity'] : 0;
                    $topic['subReplyQuantity'] = isset($topic['subReplyQuantity']) ? $topic['subReplyQuantity'] : 0;
                    $data['topics'][$k]['sumQuantity'] = $topic['replyQuantity'] + $topic['subReplyQuantity'];
                    $data['topics'][$k]['topic_href'] = topicDetailUrlGen($topic['topic_id']);
                    $data['topics'][$k]['group_href'] = groupDetailUrlGen($topic['group_id']);
                }
                unset($data['topic']);
                break;
            case 5:
                //底部浮层
                //数据缺少部分关键字段，则将接口返回字段success置为false
                if (empty($data['data']['buttom'][0]['url']) || empty($data['data']['buttom'][0]['icon'])
                    || empty($data['data']['buttom'][0]['image'])) {
                    $data['success'] = false;
                    $data['code'] = 500;
                    $data['message'] = '数据缺失';
                }
                break;
        }
        return $data;
    }


}
