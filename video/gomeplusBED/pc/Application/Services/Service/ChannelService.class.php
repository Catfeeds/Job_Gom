<?php
/*
 * 频道页
 * @by maoxiaoqi
 * */
namespace Services\Service;
use Home\Service\BaseService;

import('Common.Lib.EpiCurl');
class ChannelService extends BaseService {

	//CMS接口地址
	public $uri = [
		//幻灯片
		'group__banner' => 'v2/slot/group/banner.json',
		//热门内容 tab选项
		'group__hotImage' => 'v2/slot/group/hotImage.json',

        //热门内容 底部蚊子
        'group__hotText' => 'v2/slot/group/hotText.json',

        //推荐圈子
        'group__groupRecommend' => 'v2/slot/group/groupRecommend.json',
        //话题内容
        'group__topic' => 'v2/slot/group/topic.json',
        //品质生活
        'group__qualityLife' => 'v2/slot/group/qualityLife.json',

        //时尚圈子
        'group__fashionGroup' => 'v2/slot/group/fashionGroup.json',

        //时尚圈子 热门活动
        'group__fashionActivity' => 'v2/slot/group/fashionActivity.json',

        //生活圈子
        'group__liveGroup' => 'v2/slot/group/liveGroup.json',

        //生活圈子 热门活动
        'group__liveActivity' => 'v2/slot/group/liveActivity.json',

        //视频圈子
        'group__videoTopic' => 'v2/slot/group/videoTopic.json',

        //视频圈子 热门活动
        'group__videoActivity' => 'v2/slot/group/videoActivity.json',

        //逛逛商品
        'group__strollProduct' => 'v2/slot/group/strollProduct.json',
	];

    //cache前缀
    public $cache_prefix = 'cms_channel_';


    //楼层前缀
    public $cache_floor_prefix = 'cms_channel_floor_';

    /*
     * 构造
     * */
	public function __construct() {
		$this->bs_version = 2;
		parent::__construct();

	}

    /*
     * 幻灯片
     * @return [];
     * */
	public function group__banner() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 热门内容 tab图
     * @return [];
     * */
	public function group__hotImage() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 热门内容  文字
     * @return [];
     * */
	public function group__hotText() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 推荐圈子
     * @return [];
     * */
	public function group__groupRecommend() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 话题内容
     * @return [];
     * */
	public function group__topic() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 品质生活
     * @return [];
     * */
	public function group__qualityLife() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 时尚圈子
     * @return [];
     * */
	public function group__fashionGroup() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 时尚圈子 热门活动
     * @return [];
     * */
	public function group__fashionActivity() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 生活圈子
     * @return [];
     * */
	public function group__liveGroup() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 生活圈子 热门活动
     * @return [];
     * */
	public function group__liveActivity() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}


    /*
     * 视频圈子
     * @return [];
     * */
	public function group__videoTopic() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 视频圈子 热门活动
     * @return [];
     * */
	public function group__videoActivity() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}


    /*
     * 赚钱圈子
     * @return [];
     * */
	public function group__strollProduct() {
		$data = $this->get( __FUNCTION__ );

        return ( isset( $data['code'] ) && $data['code'] == 200 ) ? $data['data'] : [] ;
	}

    /*
     * 获取数据
     * @param $word string uri关键字
     * @return []
     * */
	public function get( $word ) {
		if( empty( $word ) || !isset( $this->uri[ $word ] ) ) return false;

		$cache_name = $this->get_cache( $word );

        //缓存开关,如果等2  清楚缓存   不用时可以删除
        if( isset( $_GET['__cache'] ) && $_GET['__cache'] == 2 ) {
			echo "清除缓存.";
            S( $cache_name, null );
        }

        if( S( $cache_name ) ) return S( $cache_name );

        $ret = $this->getDataCms( $this->uri[ $word ] );
        $data = ( is_array( $ret ) && !empty( $ret['data'] ) ) ? $ret : [] ;

        if( !empty( $data ) ) $ss = S( $cache_name, $data, 0);

		if( ( isset( $_GET['debug'] ) && $_GET['debug'] == 23 ) || !$ss || empty( $data ) ) {
			$error = [];
			$error['cache_name'] = $cache_name;
			$error['cache'] = $ss;
			$error['request'] = $_REQUEST;
			write_log( 'cache', 'http://debug.gomeplus.com', $error);

			if( $_GET['debug'] == 23 ) print_r( $error );
		}

		return $data;
	}

    /*
     * 获取缓存key
     * @param $word string 缓存key
     * @param $type string 默认 '' == 大数组, floor == 楼层数组
     * @return string
     * */
    public function get_cache( $word, $type = '' ) {
        if( empty( $word ) ) return false;

        $word = str_replace( '__', '', $word );
        switch( $type ) {
            //楼层key
            case 'floor':
                $prefix = $this->cache_floor_prefix;
                break;
            default:
                $prefix = $this->cache_prefix;
        }

        return $prefix.strtolower( $word );
    }

	/*
	 * 检查domian 如果是本地跳过
	 * */
	public function check_domain() {
		$s = ( isset( $_SERVER['HTTP_HOST'] ) ) ? $_SERVER['HTTP_HOST'] : '' ;
		if( !$s ) return false;
		$str = explode( '.',$s );

		$url = $str[ count($str)-2 ].".".$str[ count($str)-1 ];

		return ( $url == 'gomeplus.com' ) ? true : false ;
	}

    /*
     * 重载
     * */
    public function __call( $name, $args ) {
        echo "{$name} 方法不存在.";
        exit;
    }

    /*
     * 析构
     * */
    public function __destruct() {

    }
}
