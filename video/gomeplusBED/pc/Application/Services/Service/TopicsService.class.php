<?php

namespace Services\Service;

use Home\Service\BaseService;
class TopicsService extends BaseService {

    /*
     * 构造
     * */
	public function __construct() {
        $this->bs_version = 2;
		parent::__construct();
        $this->hotTopic_time = 300; //热门话题缓存时间5分钟
	}



    /**
     *
     * 批量获取话题
     * @param $ids 话题id列表,用","分隔
     * @param bool $reply 是否需要返回评论数[0,不需要返回, 1需要返回]
     * @param bool $like 是否需要返回点赞数[0,不需要返回, 1需要返回]
     * @param bool $page_view 是否需要返回浏览量[0,不需要返回, 1需要返回]
     * @return array
     *
     */
    public function ids( $ids, $reply=true,$like=true,$page_view=true, $collect=true ) {
        if( empty( $ids ) ) return 0;
        $url = 'social/topicStatistics';
        $data = $this->getData(
            $url,
            array(
                'ids'=>$ids,
                'reply' => $reply,
                'like' => $like,
                'pageview' => $page_view,
                'collect' => $collect
            )
        );
        return $data;
    }

    /**
     * 获取圈子下的话题列表
     * @param $gid 圈子ID
     * @param $essence_type 是否为精品话题标识 1为精品 0为普通
     * @param $page_num 页数
     * @param $page_size 每页数量
     * @param $city_id 区域Id
     * @return array|bool|mixed|string
     */
    public function get_group_topics_list($gid,$essence_type,$page_num,$page_size,$city_id=''){
        $url = 'combo/topics';
        $data = $this->getData(
            $url,
            array(
                'pageNum' => $page_num,
                'pageSize' => $page_size,
                'essenceType' => $essence_type,
                'groupId' => $gid,
                'areaCode' => ($city_id) ? $city_id : getAddrGome()['cityId'],
            )
        );
        return $data;

    }

    /**
     * 获取热门话题
     * @param int $page_num 页数
     * @param int $page_size 每页数量
     * @return array
     */
    public function get_hot_topics($page_num=1,$page_size=18,$is_cached=true){
        $cache_k = get_cache_k( 'hot_topics' );
        $hot_topics = S($cache_k);
//        $hot_data = null;
        if(!$hot_topics || !$is_cached) {
            $url = 'ext/peapod/hotTopics';
            $lists = $this->getData(
                $url,
                array(
                    'pageNum' => $page_num,
                    'pageSize' => 18
                )
            );
            $hot_topics = (isset($lists['data'])) ? $lists['data'] : array();
            $text = '';
            $res = S($cache_k,$hot_topics,$this ->hotTopic_time);
        }
        $hot_data = array();
        if (isset($hot_topics['peas']) && !empty($hot_topics['peas'])) {
            foreach ($hot_topics['peas'] as $k => $v) {
                $v['replyQuantity'] = $v['replyQuantity'] + $v['subReplyQuantity'];
                if (isset($v['components'])) {
                    foreach ($v['components'] as $kk => $vv) {
                        if ($vv['type'] == 'image' && !isset($v['hot_image'])) {
                                $v['hot_image'] = getResizeImg($vv['url'], 100, 56);
                        }
                        if ($vv['type'] == 'video' && !isset($v['hot_image'])) {
                            $v['hot_image'] = getResizeImg($vv['coverImage'], 100, 56);
                        }
                        if ($vv['type'] == 'item' && !isset($v['hot_image'])) {
                            $v['hot_image'] = getResizeImg($vv['item']['mainImage'], 100, 56);
                        }

                        $v['hot_type'] = $vv['type'];
                    }
                    unset($v['components']);
                    if (empty($v['hot_image'])) continue;
                    $hot_data[] = $v;
                }
                if($page_size <= count($hot_data)){
                    break;
                }
            }
            $v['text'] = isset($v['text']) ? $this->string_parse_face($v['text'], 22) : '';
        }
//        print_r($hot_data);exit;
        return $hot_data;
    }


    /**
     *
     * @param $tid 查询点赞的标示
     * @param int $type 默认店铺,类型 0:店铺 1:话题 2:美店
     * @param $page_num 分页页数 如果是full必传
     * @param $page_size 分页页数 如果是full必传
     * @param string $integrity 集成度
     * @return array
     */
    public function get_like_info($tid,$type=1,$page_num,$page_size,$integrity='simple'){
        //获取点赞信息
        $data = $this->getData(
            'ext/praise/like',
            array(
                'id' => $tid,
                'type' => $type,
                'pageNum' => $page_num,
                'pageSize' => $page_size,
                'integrity' => $integrity,
            )
        );
        return $data;
    }

    /**
     * 根据话题ID获取下一篇话题
     * @param $tid 话题ID
     * @return array
     */
    public function get_next_topic_info($tid){
        return $this->getData('ext/social/nextTopic',[ 'topicId' => $tid ] );
    }

    public function topcollect($type,$topicId,$groupId){
        $param['groupId'] = $groupId;//群组id
        $param['topicId'] = $topicId;//话题ID
        $uri = 'collection/topicCollection';
        switch ($type) {
            case 1 :
                $data = $this->putData(
                    $uri,
                    $param
                );
                break;
            case 2 :
                $data = $this->deleteData(
                    $uri,
                    $param
                );
                break;
            case 3 :
                $data = $this->getData(
                    $uri,
                    $param
                );
                break;
        }
        return $data;
    }
    /*
     * 析构
     * */
    public function __destruct() {

    }
}
