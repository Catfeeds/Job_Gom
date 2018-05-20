<?php

namespace Services\Service;
use Services\Service\BaseService;
class CircleService extends BaseService {

    public $key = 'CircleService';
    public $bs_version = 2;

    public $groupRecommend = 'ext/peapod/newcms/groupRecommend'; //精彩圈子
    public $myRelatedGroup     = 'ext/social/myRelatedGroups'; //我创建的圈子和我加入的圈子

    /*
     * 构造
     * */
	public function __construct() {
		parent::__construct();
	}

	/*
     * 批量获取圈子
     * @param $ids stirng 11,22,33
     * @param $is_join bool 圈子加入状态 true || false
     * @return []
     * */
    public function ids( $ids, $is_join = false ) {
        if( empty( $ids ) || !strstr( $ids, ',' ) ) return 0;

        $_ids = explode( ',', $ids );

        $ret = [];
        foreach( $_ids as $k => $v ) {
            $ret[$v]['member_num'] = "w111";
            $ret[$v]['topic_num'] = "w222";
            $ret[$v]['is_join'] = "w222";
        }

        return $ret;
    }

    /*
     * 批量获取加入圈子状态
     * @param $ids string 11,22,33
     * @return []
     * */
    public function is_join_ids( $ids ) {
        if( empty( $ids ) || !strstr( $ids, ',' ) ) return 0;

        $_ids = explode( ',', $ids );

        $ret = [];
        foreach( $_ids as $k => $v ) {
            $ret[$v] = false;
        }

        return $ret;
    }


    /*
     * 精彩圈子
     */
    public function groupRecommend(){
        $res = $this->getData($this->groupRecommend);
        return $res;
    }

    /**
     * 获取我加入的圈子和我创建的圈子
     */
    public function getMyRelatedGroups(){
        $result = $this->getData($this->myRelatedGroup);
        if($result['success'] && !empty($result['data'])){
            return $result['data'];
        }else{
            return [];
        }
    }


    /*
     * 析构
     * */
    public function __destruct() {

    }
}
