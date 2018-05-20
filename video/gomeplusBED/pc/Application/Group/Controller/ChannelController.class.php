<?php
/*
 * 圈子频道
 * @by maoxiaoqi
 * */

namespace Group\Controller;
use Home\Controller\BaseController;

class ChannelController extends BaseController {

    //redis cache html body
    public $cache_html_body = "channel_index_html";

    //楼层前缀
    public $redis_floor_prefix = 'cms_channel_floor_';

    //通用缓存前缀
    public $cache_prefix = 'cms_channel_';

    //http 状态码
    protected $http = [
        '200' => 'HTTP/1.1 200 OK',
        '500' => 'HTTP/1.1 500 Internal Server Error'
    ];


    //楼层唯一ID
    protected $floor_id = [
        //时尚圈子
        'fashion' => 'group__fashionGroup',
        //生活圈子
        'live' => 'group__liveGroup',
        //逛逛商品
        'stroll' => 'group__strollProduct'
    ];

    //html 保存路径
    protected $save_html_path = APP_PATH.'Runtime/Html/';

    public function __construct() {
        parent::__construct();
		$this->_channel= D( "Services/". $this->get_class() );
        $this->_circle = D( "Services/Circle" );
        $this->_topics = D( "Services/Topics" );
        $this->_product = D( "Services/Product" );

        //老代码迁移 到 频道页
        $this->home = D("Home/Home");
        $this->feedcacheKey = 'pc_group_index_feed'; //首页寻觅的缓存key
        $this->feedcacheTime = 300; //缓存有效时长

        //埋点相关
        $this->assign( 'md_pageid', 'group-');
    }

    /*
     * 频道首页
     * */
    public function index() {
        $seoMap = seoMap();
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->build_html(__FUNCTION__, 'get');
        /////////////////////////////////////////////////////////////////幻灯片
        $banner = $this->_channel->group__banner();

        /////////////////////////////////////////////////////////////////热门内容 tab选项 带图片
        $hot_image = $this->_channel->group__hotImage();

        /////////////////////////////////////////////////////////////////热门内容 tab选项 下面蚊子
        $hot_text = $this->_channel->group__hotText();

        /////////////////////////////////////////////////////////////////推荐圈子
        $group_recommend = $this->_channel->group__groupRecommend();
        //处理批量获取数据
        $group_recommend = $this->handler_ids( $group_recommend, 'groupRecommend' );

        /////////////////////////////////////////////////////////////////话题内容
        $topic = $this->_channel->group__topic();
        //处理批量获取数据
        $topic = $this->handler_ids( $topic , 'topics' );

        ////////////////////////////////////////////////////////////////品质生活
        $quality_life = $this->_channel->group__qualityLife();
        $quality_life = $this->handler_ids( $quality_life , 'talentRecommend' );
        $quality_life = $this->handler_quality( $quality_life );

        ////////////////////////////////////////////////////////////////时尚圈子
        $fashion_group = $this->_channel->group__fashionGroup();
        $fashion_lists = $this->handler_floor_data(
            ( isset( $fashion_group['fashionGroups'] ) ) ? $fashion_group['fashionGroups'] : [],
            $this->floor_id['fashion']
        );
        $fashion_first = $this->arr_first( $fashion_lists );

        //热门活动
        $fashion_active = $this->_channel->group__fashionActivity();

        ////////////////////////////////////////////////////////////////生活圈子
        $live_group = $this->_channel->group__liveGroup();
        $live_lists = $this->handler_floor_data(
            ( isset( $live_group['liveGroups'] ) ) ? $live_group['liveGroups'] : [],
            $this->floor_id['live']
        );
        $live_first = $this->arr_first( $live_lists );

        //热门活动
        $live_active = $this->_channel->group__liveActivity();

        ////////////////////////////////////////////////////////////////视频圈子
        $video_topic = $this->_channel->group__videoTopic();
        //热门活动
        $video_topic_active = $this->_channel->group__videoActivity();


        ////////////////////////////////////////////////////////////////赚钱圈子
        $stroll_product = $this->_channel->group__strollProduct();
        //有进行redis 缓存
        $stroll_product_lists = $this->handler_floor_data(
            ( isset( $stroll_product['strollProducts'] ) ) ? $stroll_product['strollProducts'] : [],
            $this->floor_id['stroll']
        );
        $stroll_product_first = $this->arr_first( $stroll_product_lists );

        $this->assign( 'banner', ( isset( $banner['banners'] ) ) ? $banner['banners'] : [] );

        $this->assign( 'hot_image_slot', ( isset( $hot_image['slot'] ) ) ? $hot_image['slot'] : [] );
        $this->assign( 'hot_image', ( isset( $hot_image['hotImages'] ) ) ? $hot_image['hotImages'] : [] );
        $this->assign( 'hot_text', ( isset( $hot_text['hotTexts'] ) ) ? $hot_text['hotTexts'] : [] );

        $this->assign( 'hot_image', ( isset( $hot_image['hotImages'] ) ) ? $hot_image['hotImages'] : [] );

        $this->assign( 'group_recommend_slot', ( isset( $group_recommend['slot'] ) ) ? $group_recommend['slot'] : [] );
        $this->assign( 'group_recommend', ( isset( $group_recommend['groupRecommend'] ) ) ? $group_recommend['groupRecommend'] : [] );
        $this->assign( 'group_recommend_ids', ( isset( $group_recommend['ids'] ) ) ? $group_recommend['ids'] : [] );

        $this->assign( 'topic_slot', ( isset( $topic['slot'] ) ) ? $topic['slot'] : [] );
        $this->assign( 'topic', ( isset( $topic['topics'] ) ) ? $topic['topics'] : [] );
        $this->assign( 'topic_ids', ( isset( $topic['ids'] ) ) ? $topic['ids'] : [] );

        //品质生活
        $this->assign( 'quality_lift_slot', ( isset( $quality_life['slot'] ) ) ? $quality_life['slot']  : [] );
        $this->assign( 'quality_lift', ( isset( $quality_life['talentRecommend'] ) ) ? $quality_life['talentRecommend']  : [] );
        $this->assign( 'quality_lift_ids', ( isset( $quality_life['ids'] ) ) ? $quality_life['ids'] : [] );


        //时尚
        $this->assign( 'fashion_group_slot', ( isset( $fashion_group['slot'] ) ) ? $fashion_group['slot'] : [] );
        $this->assign( 'fashion_lists',  $fashion_lists);
        $this->assign( 'fashion_first',  $fashion_first);
        $this->assign( 'fashion_active',  ( isset( $fashion_active['fashionActivities'] ) ) ? $fashion_active['fashionActivities'] : [] );

        //生活
        $this->assign( 'live_group_slot', ( isset( $live_group['slot'] ) ) ? $live_group['slot'] : [] );
        $this->assign( 'live_lists',  $live_lists);
        $this->assign( 'live_first',  $live_first);
        $this->assign( 'live_active',  ( isset( $live_active['liveActivities'] ) ) ? $live_active['liveActivities'] : [] );


        //视频
        $this->assign( 'video_topic_slot', ( isset( $video_topic['slot'] ) ) ? $video_topic['slot'] : []);
        $this->assign( 'video_lists', ( isset( $video_topic['videoTopics'] ) ) ? $video_topic['videoTopics'] : [] );
        $this->assign( 'video_active_lists', ( isset( $video_topic_active['videoActivities'] ) ) ? $video_topic_active['videoActivities'] : [] );

        //逛逛商品
        $this->assign( 'stroll_product_slot', ( isset( $stroll_product['slot'] ) ) ? $stroll_product['slot'] : [] );
        $this->assign( 'stroll_product_lists', $stroll_product_lists);
        $this->assign( 'stroll_product_first',  $stroll_product_first);
        $this->assign( 'pro_num',  'a01');
        $this->build_html(__FUNCTION__, 'set');
        $this->display();
    }

    /*
     * 批量获取接口
     *
     * @return json
     * */
    public function api_ids() {

        $type = I( 'param.type', '' );

        $ids = I( 'param.ids', '' );

        if( empty( $type ) || empty( $ids ) ) $this->outJSON(500, '参数错误', '');

        $new_data = [];
        switch( $type ) {
            case 'topic':
                //话题
                $data = $this->_topics->ids( $ids );
                $_d = ( isset( $data['data']['topics'] ) ) ? $data['data']['topics'] : [] ;

                foreach( $_d as $k => $v ) {
                    $new_data[ $v['id'] ]['collectQuantity'] = formatNum( $v['collectQuantity'] );
                    $new_data[ $v['id'] ]['id'] = $v['id'];
                    $new_data[ $v['id'] ]['likeQuantity'] = formatNum( $v['likeQuantity'] );
                    $new_data[ $v['id'] ]['pageview'] = formatNum( $v['pageview'] );
                    $new_data[ $v['id'] ]['replyQuantity'] = formatNum( $v['replyQuantity'] );
                }

                break;
            case 'group':
                //圈子
                $data = $this->_circle->ids( $ids );
                $_d = ( isset( $data['data']['groups'] ) ) ? $data['data']['groups'] : [] ;

                foreach( $_d as $k => $v ) {
                    $new_data[ $v['id'] ]['id'] = $v['id'];
                    $new_data[ $v['id'] ]['joined'] = $v['joined'];
                    $new_data[ $v['id'] ]['maxUsers'] = $v['maxUsers'];
                    $new_data[ $v['id'] ]['status'] = $v['status'];
                    $new_data[ $v['id'] ]['memberQuantity'] = formatNum( $v['memberQuantity'] );
                    $new_data[ $v['id'] ]['topicQuantity'] = formatNum( $v['topicQuantity'] );
                }

                break;
            case 'product':
                //商品
                $data = $this->_product->get_products_price( $ids );
                $_d = json_decode( $data, true );
                $_data = ( isset( $_d['data'] ) ) ? $_d['data'] : [] ;

                foreach( $_data as $k => $v ) {
                    $new_data[ $v['id'] ]['id'] = $v['id'];
                    $new_data[ $v['id'] ]['name'] = $v['name'];
                    $new_data[ $v['id'] ]['salePrice'] = ($v['salePrice'] == 0) ? null: convert_price( $v['salePrice'] );
                    $new_data[ $v['id'] ]['mostRebate'] = $v['mostRebate'];
                    $new_data[ $v['id'] ]['mainImage'] = $v['mainImage'];
                }


                break;
        }

        $this->outJSON( 200, '成功', $new_data );
    }

    public function del() {

        S( $this->cache_html_body, null );
    }

    /*
     * HTML
     * @param $tpl_name string 模板名称
     * @param $type string set|get|rm
     * @param $word string 推荐位名称  目前只有RM时需要
     * @return void
     * */
    public function build_html( $tpl_name, $type = 'get', $word = '') {
        if( empty( $tpl_name ) ) return false;

        //检查域名,是否显示缓存,如果是uatplus就不呈现缓存
        //if( !$this->_channel->check_domain() ) return false;


//        $files = $this->get_class().'/'.$tpl_name.'.html';
//        $files = strtolower( $files );
        $word = ( !empty( $word ) ) ? strtolower( $word ) : '' ;

        if( isset( $_GET['debug'] ) && $_GET['debug'] == 23 ) echo '<br/>操作类型:'.$type.'<br/>';
        //增加容错
        switch( $tpl_name ) {
            //频道首页
            case 'index':
                if( !S( $this->cache_html_body ) && $type != 'set' ) {
                    //调试信息
                    if( isset( $_GET['debug'] ) && $_GET['debug'] == 23 ) {
                        if( $type == 'rm' ) {
                            echo "<br/>执行删除操作时,HTML缓存为空,不用继续执行下去了<br/><br/>";
                        }
                    }
                    return true;
                }
                break;
        }

        if( $type == 'set' ) {
            //生成
            $header = $this->fetch('header');
            $body = $this->fetch();
            S( $this->cache_html_body, $body, 0 );
            $footer = $this->fetch('footer');
            echo $header;
            echo $body;
            echo $footer;exit;
        } elseif( $type == 'get' ) {
            //获取
            if( S( $this->cache_html_body ) ) {
                $header = $this->fetch('header');
                $body = S( $this->cache_html_body );
                $footer = $this->fetch('footer');
                echo $header;
                echo $body;
                echo $footer;
                exit;
            }

        } elseif( $type == 'rm' ) {
            //删除
            foreach ( $this->_channel->uri as $k => $v ) {
                $_k = strtolower( str_replace( '__', '',$k ) );

                //找到首页推荐位  删除文件
                if( $_k == $word ) {
                    //删除HTML缓存
                    S( $this->cache_html_body, null );
                    if( isset( $_GET['debug'] ) && $_GET['debug'] == 23 ) {
                        echo '<br/>'.$this->cache_html_body." - {$word}缓存已删除.<br/>";
                    }
                    break;
                }
            }
        }
    }

    public function handler_quality( $data ) {
        if( !is_array( $data ) ) return $data;

        $product_id = $infos = [];
        foreach( $data['talentRecommend'] as $k => $v ) {
            foreach( $v['cmsComponents'] as $kk => $vv ) {
                $product_id[$k][ $vv['id'] ] = $vv['id'];
            }
        }

        //批量获取 价格
        foreach( $product_id as $k => $v ) {

            $json = $this->_product->get_products_price( implode( ',', $v ) );
            $arr = json_decode( $json, true );
            $d = ( isset( $arr['data'] ) ) ? $arr['data'] : [] ;


            foreach( $d as $dk => $dv ) {
                $infos[ $dv['id'] ] = $dv;
            }
        }

        foreach( $data['talentRecommend'] as $k => $v ) {
            foreach( $v['cmsComponents'] as $kk => $vv ) {
                $data['talentRecommend'][ $k ]['cmsComponents'][ $kk ]['_product_ids'] = $infos[ $vv['id'] ];
            }
        }

        return $data;
    }

    /*
     * 处理旅游圈子数据
     * @param $data [] 原始数据
     * @param $type string 每个数据类别
     * @param $redis_key string redis键
     * @return []
     * */
    public function handler_floor_data( $data,  $redis_key ) {
        if( !$data || !is_array( $data ) || empty( $redis_key ) ) return [];

        $redis_name = $this->_channel->get_cache( $redis_key, 'floor' );

        //对于楼层数据 相对缓存  暂时去掉缓存
//        if( S( $redis_name ) ) return S( $redis_name );
//        echo '1111';

        $ret = [];
        //处理圈子
        foreach( $data as $k => $v ) {

            $key = $v['name'];
            $ret[ $key ]['name'] = $v['name'];
            $ret[ $key ]['sequence'] = $v['sequence'];
            $ret[ $key ]['url'] = ( isset( $v[ 'url' ] ) ) ? $v[ 'url' ] : '' ;

            switch( $redis_key ) {
                case 'group__strollProduct':
                    $ret[ $key ]['banners'] = $v[ 'banners' ];
                    $ret[ $key ]['products'] = ( isset( $v['products'] ) ) ? array_slice( $v['products'],0, 4 ) : [] ;
                    break;
                default:
                    $ret[ $key ]['groups'] = ( isset( $v[ 'groups' ] ) ) ? array_slice( $v[ 'groups' ], 0, 4 ) : [] ;
            }
        }

        switch( $redis_key ) {
            case 'group__fashionGroup': case 'group__liveGroup':
                //处理批量数据,给楼层增加一些字段
                $ret = $this->handler_ids($ret, 'groups');
                break;
            case 'group__strollProduct':
                $ret = $this->handler_ids( $ret, 'product' );
                break;
        }

//        print_r($ret);

//        S( $redis_name, $ret, 0 );

        return $ret;
    }


    /*
     * 统一处理一下  有可能某些结构不一致.
     * 批量处理需要获取 单位数据
     * @return []
     * */
    public function handler_ids( $data, $type ) {
        if( empty($data) ) {
            return $data;
        }

        $topic_id = [];
        switch( $type ) {
            //推荐圈子       批量获取成员数和话题数
            case 'groupRecommend':
                $d = ( isset( $data[ $type ] ) ) ? $data[ $type ] : [] ;
                foreach( $d as $k => $v) {
                    $group_id[ $v['group_id'] ] = $v['group_id'];
                }

                $group = $this->_circle->ids( implode( ',', $group_id ) );
                $ids = ( isset( $group['data']['groups'] ) ) ? $group['data']['groups'] : [] ;

                $_ids = [];
                foreach( $ids as $k => $v ) {
                    $_ids[ $v['id'] ]['id'] = $v['id'];
                    $_ids[ $v['id'] ]['joined'] = $v['joined'];
                    $_ids[ $v['id'] ]['maxUsers'] = $v['maxUsers'];
                    $_ids[ $v['id'] ]['status'] = $v['status'];
                    $_ids[ $v['id'] ]['memberQuantity'] = ( isset( $v['memberQuantity'] ) ) ? formatNum($v['memberQuantity']) : 0 ;
                    $_ids[ $v['id'] ]['topicQuantity'] = ( isset( $v['topicQuantity'] ) ) ? formatNum($v['topicQuantity']) : 0 ;
                }

                $data['ids'] = $_ids;
                break;
            //话题内容/品质生活      批量获取点赞和评论
            case 'topics': case 'talentRecommend':
                $d = ( isset( $data[ $type ] ) ) ? $data[ $type ] : [] ;

                foreach( $d as $k => $v) {
                    $topic_id[ $v['topic_id'] ] = $v['topic_id'];
                }

                $topic = $this->_topics->ids( implode( ',', $topic_id ) );
                $ids = ( isset( $topic['data']['topics'] ) ) ? $topic['data']['topics'] : [] ;

                $_ids = [];
                foreach( $ids as $k => $v ) {
                    $_ids[ $v['id'] ] = $v;
                }

                $data['ids'] = $_ids;
                break;
            //楼层圈子
            case 'groups':
                $group_id = [];
                foreach( $data as $k => $v) {
                    foreach( $v['groups'] as $kk => $vv ) {
                        $data[ $k ]['groups'][$kk]['_group_url'] = groupDetailUrlGen( $vv['group_id'] );

                        $data[ $k ]['groups'][$kk]['cmsIcon'] = img_double_protocol( $vv['cmsIcon'] );
                        $group_id[ $vv['group_id'] ] = $vv['group_id'];
                    }
                }

                $group = $this->_circle->ids( implode( ',', $group_id ) );
                $ids = ( isset( $group['data']['groups'] ) ) ? $group['data']['groups'] : [] ;

                $_ids = [];
                foreach( $ids as $k => $v ) {
                    $_ids[ $v['id'] ]['id'] = $v['id'];
                    $_ids[ $v['id'] ]['joined'] = $v['joined'];
                    $_ids[ $v['id'] ]['maxUsers'] = $v['maxUsers'];
                    $_ids[ $v['id'] ]['status'] = $v['status'];
                    $_ids[ $v['id'] ]['memberQuantity'] = ( isset( $v['memberQuantity'] ) ) ? formatNum($v['memberQuantity']) : 0 ;
                    $_ids[ $v['id'] ]['topicQuantity'] = ( isset( $v['topicQuantity'] ) ) ? formatNum($v['topicQuantity']) : 0 ;
                }

                //把单位规则揉到圈子里
                foreach( $data as $k => &$v) {
                    foreach( $v['groups'] as $kk => &$vv ) {
                        $data[ $k ]['groups'][$kk]['_group_ids'] = isset( $_ids[ $vv['group_id'] ] ) ? $_ids[ $vv['group_id'] ] : [] ;

                        if( isset( $data[ $k ]['groups'][$kk]['topics'] ) ) {
                            foreach( $data[ $k ]['groups'][$kk]['topics'] as $_k => $_v ) {
                                $data[ $k ]['groups'][$kk]['topics'][ $_k ]['id'] = $_v['id'];
                                $data[ $k ]['groups'][$kk]['topics'][ $_k ]['name'] = strip_tags( $_v['name'] );
                                $data[ $k ]['groups'][$kk]['topics'][ $_k ]['type'] = $_v['type'];
                            }
                        }
                    }
                }

                break;
            //楼层商品
            case 'product':
                $banners_pid = $products_pid = [];

                //批量获取ID,赋值商品URL
                foreach( $data as $k => $v ) {
                    foreach( $v['banners'] as $kk => $vv ) {
                        $data[$k]['banners'][$kk]['_product_url'] = productDetailUrlGen('',$vv['product_id']);
                        $data[$k]['banners'][$kk]['cmsImage'] = img_double_protocol( $vv['cmsImage'] );
                        $banners_pid[ $vv['product_id'] ] = $vv['product_id'];
//                        $data[$k]['banners'][$kk]['_product_ids'] = $product_infos;
                    }

                    foreach( $v['products'] as $pk => $pv ) {
                        $data[$k]['products'][$pk]['_product_url'] = productDetailUrlGen('',$pv['product_id']);
                        $data[$k]['products'][$pk]['cmsImage'] = img_double_protocol( $pv['cmsImage'] );
                        $products_pid[ $pv['product_id'] ] = $pv['product_id'];
                    }
                }

                $banner_infos = $this->slice_request( $banners_pid );
                $products_infos = $this->slice_request( $products_pid );

                //分割请求

                if( isset( $_GET['debug'] ) && $_GET['debug'] == '22' ) {
                    print_r( $banner_infos );
                    print_r( $products_infos );
                    print_r( $products_pid );
                }

                //讲处理好的商品 扔回数组
                foreach( $data as $k => $v ) {
                    foreach( $v['banners'] as $kk => $vv ) {
                        $data[$k]['banners'][$kk]['_product_ids'] = $banner_infos[ $vv['product_id'] ];
                    }

                    foreach( $v['products'] as $pk => $pv ) {
                        $data[$k]['products'][$pk]['_product_ids'] = $products_infos[ $pv['product_id'] ];
                    }

                }

                break;
        }

        return $data;
    }

    /*
     * 分割商品请求
     * @param $products [] 商品数组
     * @param $limit int 分割数量
     * @reurn void
     * */
    public function slice_request( $products = [], $limit = 10 ) {
        $tmp = [];
        $p_count = count( $products )/$limit;
        if( !empty( $p_count ) ) for( $i=0; $i < $p_count; $i++ ) {
            $slice_product = array_slice( $products,0, $limit, true);

            $arr = $this->_product->get_products_price( implode( ',', $slice_product ) );
            $tmp[] = $this->handler_products( $arr );

            if( $slice_product ) foreach( $slice_product as $k1 => $v1 ) {
                unset( $products[ $v1 ] );
            }
        }

        //合并数组
        $products_infos = [];
        if( !empty( $tmp ) ) foreach( $tmp as $tk => $tv ) {
            foreach( $tv as $k => $v ) {
                $products_infos[ $k ] = $v;
            }
        }

        return $products_infos;
    }

    /*
     * 处理商品  拿商品ID当键
     * @param $data [] 数组
     * @return []
     * */
    public function handler_products( $data ) {
        if( empty( $data ) ) return false;

        $d = json_decode( $data, true );
        $d = ( isset( $d['data'] ) ) ? $d['data'] : [] ;

        $new = [];
        foreach( $d as $k => $v ) {
//            $new[ $v['id'] ]['price'] = convert_price( $v['price'] );
            $new[ $v['id'] ]['salePrice'] = ( isset($v['salePrice']) && ($v['salePrice']) ) ? convert_price( $v['salePrice'] ) : null;
            $new[ $v['id'] ]['mostRebate'] = $v['mostRebate'];
        }

        return $new;
    }

    /*
     * API 楼层导航
     * @param $id string 楼层ID
     * @param $cat string 分类中文
     * @return json
     * */
    public function floor_category() {
        $id = I( 'param.id', '' );
        $cat = I( 'param.cat', '' );
        $id = ( empty( $id ) ) ? $this->outJSON( 500, '请输入唯一KEY', [] ) : strtolower( $id ) ;
        $floor_id = ( isset( $this->floor_id[ $id ] ) ) ? strtolower( $this->floor_id[ $id ] ) : $this->outJSON( 500, 'Floor不存在', [] ) ;
//        echo $this->floor_id[ $id ];

//        $data = S( $this->_channel->get_cache( $floor_id, 'floor' ) );

        //如果缓存读取失败   重新拼装数据
//        if( !$data ) {
            switch( $id ) {
                //时尚圈子
                case 'fashion':
                    $fashion_group = $this->_channel->group__fashionGroup();
                    $data = $this->handler_floor_data(
                        ( isset( $fashion_group['fashionGroups'] ) ) ? $fashion_group['fashionGroups'] : [],
                        $this->floor_id['fashion']
                    );
                    break;
                //生活圈子
                case 'live':
                    $live_group = $this->_channel->group__liveGroup();
                    $data = $this->handler_floor_data(
                        ( isset( $live_group['liveGroups'] ) ) ? $live_group['liveGroups'] : [],
                        $this->floor_id['live']
                    );
                    break;
                //赚钱圈子
                case 'stroll':
                    $stroll_product = $this->_channel->group__strollProduct();
                    $data = $this->handler_floor_data(
                        ( isset( $stroll_product['strollProducts'] ) ) ? $stroll_product['strollProducts'] : [],
                        $this->floor_id['stroll']
                    );
                    break;
                default:
            }
//        }

        $ret = ( isset( $data[ $cat ] ) ) ? $data[ $cat ] : [] ;

        $this->outJSON( '200', '成功',$ret );
    }



    /*
     * CMS消费者处理
     * @return http code + json
     * */
    public function cms_consumer() {
        $system = I( 'param.system', '' );
        $time = I( 'param.time', '' );//暂时没用
        $unique_key = I( 'param.unique_key', '' );
        $slot_id = I( 'param.slot_id', '' );

        if( empty( $unique_key ) || empty( $system ) || empty( $slot_id ) ) {
            write_log( 'CMS通知 - 参数错误', 'http://cms.gomeplus.com', $_REQUEST);
            header( $this->http['500'] );
            exit;
        }

        $code = ( S( $this->_channel->get_cache( $unique_key ), NULL ) ) ? 200 : 500 ;

        //后台有任何通知 删除频道 html
        $this->build_html('index' ,'rm', $unique_key);

        //删除大数组 连带删除对应楼层数据
//        if( $code == 200 ) S( $this->_channel->get_cache( $unique_key, 'floor' ), NULL );

        //错误记录
        $error = [];
        $error['request'] = $_REQUEST;
        $error['cache_name'] = $this->cache_prefix.$unique_key;
        $error['code'] = $code;

        if( $code == 500 )  write_log( 'CMS - 缓存删除失败', 'http://cms.gomeplus.com', $error);

        if( $_GET['debug'] == 23 ) print_r( $error );

        //如果这接口报错500  就表示之前缓存没创建,存在问题.
        header( $this->http[ '200' ] );
    }

    /*
     * 不断寻觅
     * @return json
     * */
    public function feedlist() {
        //不断寻觅
        if( $_GET['debug'] == 22 ) S($this->feedcacheKey, null);
        $feedData = S($this->feedcacheKey);
        if (!$feedData) {
            $param = array('pageNum' => 1, 'pageSize' => 10);
            if ($this->userId) {
                $param['userId'] = $this->userId;
            }
            $temp = $this->home->getData($this->home->homefeed, $param);
            if (isset($temp['data']['feedTopics'])) {
                foreach ($temp['data']['feedTopics'] as $k => &$feed) {
                    $image = '';
                    foreach ($feed['components'] as $kk => $vv) {
                        if ($vv['type'] == 'image') {
                            $image = getResizeImg($vv['url'], 260, 146);
                            break;
                        }

                        if ($vv['type'] == 'item' && isset($vv['item']['mainImage'])) {
                            $image = getResizeImg($vv['item']['mainImage'], 260, 146);
                            break;
                        }
                        if ($vv['type'] == 'video') {
                            $image = getResizeImg($vv['coverImage'], 260, 146);
                            break;
                        }
                        if ($vv['type'] == 'link') {
                            $image = getResizeImg($vv['coverImage'], 260, 146);
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
     * 获取数组第一个键值,因为不能使用Pos  current 只能单独写方法,原因就是内核指针参数在改变时不同 导致不能使用pos
     * @param $data [] 数组
     * @return []
     * */
    public function arr_first( $data ) {
        $first = [];
        foreach( $data as $kk => $vv ){
            if( isset( $vv['groups'] ) && empty( $vv['groups'] ) ) continue;
            $first = $vv;
            break;
        }
        return $first;

    }

    /*
     * 刷新cookie
     * */
    public function refresh_cookie() {
        print_r( $_COOKIE );
        if( isset( $_COOKIE['atgregion'] ) ) echo $_COOKIE['atgregion'];
    }

    /*
     * 获取类名
     * @return string
     * */
    private function get_class() {
        $arr = explode( '\\', get_class() );

        return ( isset( $arr[2] ) ) ? str_replace( 'Controller', '', $arr[2] ) : '' ;
    }


}
