<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心 |
 * +----------------------------------------------------------------------+
 * | All rights reserved. |
 * +----------------------------------------------------------------------+
 * | @程序名称：ProductController.class1.php |
 * +----------------------------------------------------------------------+
 * | @程序功能：商品详情页 |
 * +----------------------------------------------------------------------+
 * | Author:liuchao <liuchao@gomeplus.com> |
 * +----------------------------------------------------------------------+
 * | Date: 2016/5/20-15:08 |
 * +----------------------------------------------------------------------+
 */
namespace Mall\Controller;

use Home\Controller\BaseController;

class ApiController extends BaseController
{

    private $_prizeList = '/lottery/getSinglePrideRank.json';

    private $_totalAmount = '/lottery/getLeftCash.json';

    private $_remainCount = '/packet/remainder.json';

    private static $_prizeMessagae = [
        30 => '奔向神之路！',
        88 => '简直无人能敌！',
        2017 => '这简直就是疯狂杀戮！'
    ];

    /**
     * 获取获奖人列表
     */
    public function getPrizesList() {
        $data = $this->getPrizeData();
        $this->response($data);
    }

    
    /**
     * 获取获奖人列表
     */
    public function getPrizeData(){
        $user_id = ($this->userId != 0) ? $this->userId : 1;
        $remain_count_data = curl_get(C('COUPON_API') . $this->_remainCount . "?user_id=" . $user_id);
        $remain_count_data = json_decode($remain_count_data, true);
        $data = curl_get(C('COUPON_API') . $this->_prizeList);
        $data = json_decode($data, true);
        unset( $data['errorinfo'],$data['error'],$data['errno'] );
        $data['success'] = true;
        if($remain_count_data['message'] != '' && $remain_count_data['message'] == '10005'){
            $res = ['message'=>'数据获取失败，请重试。','data'=>[],'success'=>false,'code'=>$remain_count_data['message']];
            return $res;
        }
        if ($data['message'] != '') {
            $res = ['message'=>'数据获取失败，请重试。','data'=>[],'success'=>false,'code'=>$data['message']];
            return $res;
        }
        $ids = '';
        foreach ($data['data'] as $key => $item) {
            if ($ids != '') {
                $ids .= ',';
            }
            $ids .= $item['user_id'];
        }
        
        // 批量获取用户信息
        $user_service = D("User");
        $params = [
            'ids' => trim($ids),
            'integrity' => 'full'
        ];
        $user_list = $user_service->getData($user_service->user_list, $params);
        if (isset($user_list['data'])) {
            foreach ($data['data'] as $k=>&$item) {
                foreach ($user_list['data']['users'] as $key => $user) {
                    if ($user['id'] == $item['user_id']) {
                        $strLen = mb_strlen($user['nickname']);
                        $item['nickname'] = mb_substr($user['nickname'], 0, 1) . "**" . mb_substr($user['nickname'], - 1);
                        continue;
                    }
                }
                $item['nickname'] = !empty($item['nickname']) ? $item['nickname'] : '**';
                $item['message'] = $item['nickname'] . '获得'.$item['amount'].'个国美币！'. self::$_prizeMessagae[$item['amount']];
            }
        }
        return $data;
    }
    /**
     * 获取总金额接口
     */
    public function getTotalAmount(){
        $res = $this->getData();
        $this->response($res);
    }
    /**
     * 获取中奖总金额和用户可抽奖次数
     * 
     */
    public function getData(){

        $amount_data = curl_get(C('COUPON_API') . $this->_totalAmount);
        $amount_data = json_decode($amount_data, true);
        
//         $remain_count_data = curl_get(C('COUPON_API') . $this->_remainCount . "?user_id=" . $this->userId);
//         $remain_count_data = json_decode($remain_count_data, true);
        
        $res = [
            'data' => [
                'total_amount' => ( isset($amount_data['data']['left_amount']) && $amount_data['data']['left_amount']>0 ) ? $amount_data['data']['left_amount'] : 0,
//              'remain_count' => isset($remain_count_data['data']['count']) ? $remain_count_data['data']['count'] : 0
            ],
            'message' => '',
            'success' => true
        ];
//         print_r($res);exit;
        if ($amount_data['data']['message'] != '') {
            $data = ['message'=>'数据获取失败，请重试。','data'=>[],'success'=>false];
            return $data;
        }
        return $res;
        
    }
}
