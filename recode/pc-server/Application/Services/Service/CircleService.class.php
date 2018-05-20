<?php

namespace Services\Service;

use Home\Service\BaseService;
class CircleService extends BaseService {

    /*
     * 构造
     * */
	public function __construct() {
        $this->bs_version = 2;
		parent::__construct();
	}

    /**
     *
     * 批量获取圈子
     * @param $ids 圈子id列表,用","分隔
     * @param bool $member 是否需要返回成员数[0,不需要返回, 1需要返回]
     * @param bool $status 是否需要返回加入圈子状态[0,不需要返回, 1需要返回]
     * @param bool $topic_num 是否需要返回话题数[0,不需要返回, 1需要返回]
     * @return array
     *
     */
    ///v3/social/groupStatistics?ids={ids}&userId={userId}&member={member}&status={status}&topic={topic}
    public function ids( $ids, $member=true,$status=true,$topic_num=true ) {
        if( empty( $ids ) ) return 0;
        $url = 'social/groupStatistics';
        $data = $this->getData(
            $url,
            array(
                'ids'=>$ids,
                'member' => $member,
                'status' => $status,
                'topic' => $topic_num
            )
        );
//        print_r($data);exit;
        return $data;
        /*$_ids = explode( ',', $ids );

        $ret = [];

        foreach( $_ids as $k => $v ) {
            $ret[$k]['id'] = $v;
            $ret[$k]['memberQuantity'] = 1;
            $ret[$k]['topicQuantity'] = 1;
            $ret[$k]['joined'] = false;
        }

        return [
            'message' => '返回成功',
            'data' => [
                'groups' => $ret
            ]
        ];;*/
    }

    /*
     * 批量获取加入圈子状态
     * @param $ids string 11,22,33
     * @return []
     * */
    public function is_join_ids( $ids ) {
        if( empty( $ids ) || !strstr( $ids, ',' ) ) return 0;

        $result = $this->ids($ids);
//        print_r($result);exit;
        $ret = [];
        $_ids = explode( ',', $ids );
        if(isset($result['data']['groups'])) {
            foreach ($_ids as $k => $v) {
                foreach ($result['data']['groups'] as $item) {
                    if ($item['id'] == $v) {
                        $ret[$v] = $item['joined'];
                        break;
                    }
                }
            }
        }else{
            foreach( $_ids as $k => $v ) {
                $ret[$v] = false;
            }
        }
        return $ret;
    }

    /**
     * 获取圈子分类下的圈子
     * @param $category_id 分类ID
     * @param int $category_type 分类级别1为一级，2为二级分类
     * @param int $page_num 页数
     * @param int $page_size 每页条数
     * @return array
     */
    public function get_category_groups($category_id,$category_type=1,$page_num=1,$page_size=19){
        $url = 'ext/social/searchGroupByCategory';

        $lists = $this->getData(
            $url,
            array(
                'categoryId'=>$category_id,
                'type' => $category_type,
                'pageNum' => $page_num,
                'pageSize' => $page_size
            )
        );
        return $lists;
    }

    public function get_group_info($gid,$info_type='full'){
        return $data = $this->getData(
            'ext/social/group',
            array(
                'id' => $gid,
                'integrity' => $info_type
            )
        );
    }

    /**
     * 分类集合
     * @return mixed
     */
    public function get_categories(){
        return $this->getData( 'social/categories',[] );
    }
    /*
     * 析构
     * */
    public function __destruct() {

    }
}
