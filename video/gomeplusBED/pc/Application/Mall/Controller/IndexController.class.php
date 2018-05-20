<?php

/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                       |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class1.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：美店频道页                                                   |
 * +----------------------------------------------------------------------+
 * | Author: <liluming@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date: 2017/10/25-15:08                                                |
 * +----------------------------------------------------------------------+
 */

namespace Mall\Controller;

use Home\Controller\BaseController;
use Common\Lib\Curl;
class IndexController extends BaseController {

    private $mshopData = null ;

    public function __construct() {
        parent::__construct();

        //获取美店信息
        $this->mshopData = $this->getMshopInfo();

        $mshop_icon = $this->mshopData['shop']['icon'] ? $this->mshopData['shop']['icon'] : $this->userInfo['ext']['account']['imagePath'];

        //获取顶部广告位
        $channel = D('Mall/Channel');
        $top_banner = $channel->getTopBanner();
        //print_r($top_banner);die;

        $this->assign('top_banner', current($top_banner['floorPhotoTemplet']['imgList']));
        $this->assign('mshop_icon', $mshop_icon);

    }

    /**
     * 频道页展示
     */
    public function index() {
        $channel = D('Mall/Channel');

        //获取频道页信息
        $result = $channel->getChannelData();
        //print_r($result);die;
        $this->assign('title', '国美美店 分享返利 赚丰厚佣金');
        $this->assign('mshopInfo', $this->mshopData);
        $this->assign('shopId', $this->mshopData['shop']['id']);
        $this->assign('list', $result);
        $this->assign('activeUrl', 'channel_index');
        $this->display('Admin/channel');
    }




    /**
     * 获取美店信息信息页面
     */
    private function getMshopInfo(){

        //没登录,直接返回空
        if($this->userInfo['loginStatus'] !==3){
            $data = [];
        }else{
            $channel = D('Mall/Channel');
            $result = $channel->getData($channel->mshop_info,['userId'=>$this->userId]);
            $data = $result['data'];

            //店铺升级百分比
            $data['mshopLevel']['degree'] = ($data['mshopLevel']['score']/$data['mshopLevel']['rightScore'])*100;
            $data['mshopLevel']['degree'] = is_float($data['mshopLevel']['degree']) ?  sprintf("%.2f",substr(sprintf("%.3f", $data['mshopLevel']['degree']), 0, -2)) .'%': $data['mshopLevel']['degree'] .'%' ;

            //print_r($result);die;
        }
        return $data;
    }

}
