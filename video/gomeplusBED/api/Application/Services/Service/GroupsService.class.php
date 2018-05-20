<?php

namespace Services\Service;

use Services\Service\BaseService;
class GroupsService extends BaseService {
    //默认城市ID
    const DEFAULT_ADDRESS_ID = '11010000';

    public $key = 'GroupsService';
    public $bs_version = 2;
    public $groupStatistics = 'social/groupStatistics'; //批量获取圈子的成员数,话题数,是否加入圈子
    public $groupTopics = 'combo/topics';//圈子话题列表 combo
    public $groupDetail = 'social/group';//圈子信息

	/*
     *
     * @param $idArr array 11,22,33
     * @return []
     * */
    public function groupStatistics( $idArr , $member=1,$topic = 1,$status=0) {
        if( empty( $idArr ) ) return ;
        $idsStr = implode(',',$idArr);
        $param['ids'] = $idsStr ;
        $param['member'] = $member ;
        $param['topic'] = $topic ;
        $param['status'] = $status ;
        $data = $this->getData($this->groupStatistics,$param);

        $ret = [];
        foreach( $idArr as $k => $v ) {
            if( $data['success'] && $data['data']['groups'] ){
                foreach($data['data']['groups'] as $kk=>$vv){
                    if( $v == $vv['id'] ){
                        $ret[$v] = $vv;
                    }
                }
                if( !isset($ret[$v]) ){
                    $ret[$v] = array('id'=>$v,'memberQuantity'=>0,'topicQuantity'=>0,'joined'=>false);
                }
            }else{
                $ret[$v] = array('id'=>$v,'memberQuantity'=>0,'topicQuantity'=>0,'joined'=>false);
            }

        }

        return $ret;
    }

    /**
     * 根据圈子ID获取话题列表
     * @param $gid          string  圈子ID
     * @param $pageNum      int     页码
     * @param $pageSize     int     每页条数
     * @param $areaCode     string  区域编码
     * @param $essenceType  int     查看精品话题标识 ：1；查看所有话题 ：0
     * @return array|bool|mixed|string
     */
    public function groupTopics($gid, $pageNum, $pageSize, $areaCode = self::DEFAULT_ADDRESS_ID, $essenceType = 0)
    {
        $data = $this->getData(
            $this->groupTopics,
            array(
                'pageNum' => $pageNum,
                'pageSize' => $pageSize,
                'essenceType' => $essenceType,
                'groupId' => $gid,
                'areaCode' => $areaCode
            )
        );

        return $data;
    }

    /**
     * 根据圈子ID获取圈子基本信息
     * @param $gid          string  圈子ID
     * @param $integrity    string  集成度 full：全量 simple：简量
     * @return array|bool|mixed|string
     */
    public function groupDetail($gid, $integrity)
    {
        $data = $this->getData(
            $this->groupDetail,
            array(
                'id' => $gid,
                'integrity' => $integrity
            )
        );

        return $data;
    }
}
