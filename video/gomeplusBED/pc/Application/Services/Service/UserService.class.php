<?php

namespace Services\Service;

use Home\Service\BaseService;
class UserService extends BaseService {

    /*
     * 构造
     * */
	public function __construct() {
        $this->bs_version = 2;
		parent::__construct();
	}

    /**
     * 人主页（客态页）获取个 combo 信息
     * @param $ownerUserId 用户Id
     */
	public function get_personal_info($ownerUserId){
        return$this->getData( 'combo/personalInfoByGuest',['ownerUserId'=>$ownerUserId ] );
    }

    /**
     * 人主页（客态页）获取用户的话题
     * @param $ownerUserId 用户Id
     * @param $page_num 页数
     * @param $page_size 每页数量
     * @param string $city_id 区域Id
     * @return array
     */
    public function get_personal_topics($ownerUserId,$page_num,$page_size,$city_id=''){
        $data = $this->getData(
            'ext/social/ownedTopics',
            array(
                'ownerUserId'=>$ownerUserId,
                'pageNum' => $page_num,
                'pageSize' => $page_size,
                'areaCode' => ($city_id) ? $city_id : getAddrGome()['cityId'],
            )
        );
        return $data;
    }

    /**
     * 人主页（客态页）获取用户圈子信息
     * @param $ownerUserId 用户Id
     * @param $page_num 页数
     * @param $page_size 每页条数
     * @return array
     */

    public function get_personal_circles($ownerUserId,$page_num,$page_size){
        $data = $this->getData(
            'ext/social/ownedGroups',
            array(
                'ownerUserId'=>$ownerUserId,
                'pageNum' => $page_num,
                'pageSize' => $page_size
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

    /*
     * 析构
     * */
    public function __destruct() {

    }
}
