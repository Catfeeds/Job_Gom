<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：MshopTopic.class.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：用户相关接口                                    |
* +----------------------------------------------------------------------+
* | Author:lishuai <lishuai@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2017/12/07-15:30                                                |
* +----------------------------------------------------------------------+
*/

namespace Mall\Service;
use Home\Service\BaseService;
class MshopTopicService extends BaseService
{
    const OPEN_GROUP_CACHE = 0; //默认打开缓存
    public $key = 'MshopTopicService';
    public $param = array();
    public $bs_version = 2;

    public $mshopTopic = 'ext/social/mshopTopic';//美店说详情页 ext
    public $mshopTopicsNew = 'social/mshopTopicsNew';//美店说话题列表(12月版本之后)
    //缓存时间
    public $cachetime = 3600;
    public $g_cachetime = 600; //美店说列表第一页缓存10分钟


    /**
     * 获取美店说列表
     * @param String $gid  shopID或者groupID
     * @param Int $param 入参
     * @param Int $page_num 页码
     * @param boolean $parse_components 是否需要处理components
     * @return array
     */
    public function get_topics($gid,$page_num,$param,$parse_components=false) {
        if( empty($gid) ) {
            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
            exit;
        }
        if( $page_num == 1  && self::OPEN_GROUP_CACHE){
            $cache_k = $this->_get_cache_k('group', $gid);
            $topicsData = S($cache_k);

            if ( $topicsData &&  (isset($topicsData['topics']) && $topicsData['topics'])  ) {
                $res = $topicsData;
            }else{
                $all_res = $this->getData($this->mshopTopicsNew,$param);
                if($all_res['code'] == 200 && isset($all_res['data']['topics'])){
                    S($cache_k, $all_res['data'], $this->g_cachetime);
                }
                $res = $all_res['data'];
            }
        }else{
            $this->setTimeOut(10);
            $all_res = $this->getData($this->mshopTopicsNew,$param);
            $res = $all_res['data'];
        }
        //处理话题数据
        if( isset( $res['topics'] ) && $res['topics'] && $parse_components) {
            $res['topics'] = $this->parse_components( $res['topics'] );
        }
        return $res;
    }

    /*
 * 获取缓存KEY
 * @param $name string 类型
 * @param $value string 值
 * */
    public function _get_cache_k( $name, $value ) {

        switch( $name ) {
            case 'detail':
                $k = 'p_t_'.$value;
                break;
            case 'group':
                $k = 'p_g_'.$value;
                break;
            default:
                $k = '';

        }
        return $k;
    }
    /*
     * 解析components
     * @param $topics array 话题详细数据
     * @return array
     * */
    public function parse_components( $topics ) {
        if( empty($topics) ) return $topics;

        foreach( $topics as $k => &$v ) {

            $images_lst = [];
            $text = '';
            if( $v['components'] ) {
                foreach( $v['components'] as $kk =>$vv ) {
                    if(count( $images_lst ) == 3 && in_array($vv['type'], ['item','image','shop','video']) ){
                        continue;
                    }

                    //text
                   /* if( $vv['type'] == 'text' ) {
                        $vv['text'] = trim( $vv['text'] );
                        $text .= trim( $vv['text'] )." ";
                    }*/

                    //components images 图片转换
                    if( $vv['type'] == 'image' ) {
                        $vv['url'] = getResizeImg( $vv['url'], 260, 146);
                        //过滤
                        $vv['url'] = strip_tags( $vv['url'] );
                        if( !isTrustedDomain( $vv['url'] ) ) $vv['url'] = '';

                        $vv['url'] = (pathinfo($vv['url'], PATHINFO_EXTENSION) == "gif") ? str_replace(".gif", ".jpg", $vv['url']) : $vv['url'];
                        $images_lst[] = [
                            'mainImage'=>$vv['url'],
                            'type'=>'image',
                            'name'=>$v['name']
                        ];
                    }
                    //components item 图片转换
                    if( $vv['type'] == 'item' ) {

                        $vv['item']['salePrice'] = isset($vv['item']['salePrice']) ? $vv['item']['salePrice'] : null;
                        $vv['item']['mainImage'] = isset($vv['item']['mainImage']) ? $vv['item']['mainImage'] : '';
                        $vv['item']['type'] = isset($vv['item']['type']) ? $vv['item']['type'] : 'item';
                        $vv['item']['name'] = isset($vv['item']['name']) ? $vv['item']['name'] : '';
                        $vv['item']['rebateSummary']['mostRebate'] = isset($vv['item']['rebateSummary']['mostRebate']) ? $vv['item']['rebateSummary']['mostRebate'] : 0;

                        $vv['item']['salePrice'] = ($vv['item']['salePrice']) ? convert_price( $vv['item']['salePrice'] ) : null;
                        $vv['item']['mainImage'] = getResizeImg( $vv['item']['mainImage'], 260, 146);

                        if(pathinfo($vv['item']['mainImage'], PATHINFO_EXTENSION) == "gif"){
                            $vv['item']['mainImage'] = str_replace(".gif", ".jpg", $vv['item']['mainImage']);
                        }
                        $vv['item']['type'] = 'item';
                        $images_lst[] = $vv['item'];
                    }

                    if( $vv['type'] == 'video'){
                        $images_lst[] = [
                            'mainImage'=>getResizeImg($vv['coverImage'],260,146),
                            'type'=>'video',
                            'name'=>isset($vv['name']) ? $vv['name'] : $v['name']
                        ];
                    }

                    unset( $v['components'] );
                }
            } else {
                $v['new_components'] = array();
            }

            //统计图片数量
            $v['image_number'] = ( !empty( $images_lst ) ) ? count( $images_lst ) : 0 ;
            $v['images_lst'] = $images_lst ;

            //$v['content'] = msubstr( strip_tags($v['content']) ,0,140 );
            $v['content'] = msubstr( $v['content'] ,0,140 );

            //最后回复时间
            if( $v['lastReplyTime'] ) $v['time_str'] = date("Y-m-d H:i", substr( $v['lastReplyTime'], 0, 10) );

        }

        return $topics;
    }
}
