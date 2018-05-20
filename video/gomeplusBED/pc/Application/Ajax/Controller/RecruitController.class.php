<?php
namespace Ajax\Controller;
use Ajax\Controller\BaseController;
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：RecruitController.class.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：                                                  |
* +----------------------------------------------------------------------+
* | Author:liuchao <liuchao@gomeplus.com>                                |
* +----------------------------------------------------------------------+
* | Date: 2016/8/25-15:30                                                |
* +----------------------------------------------------------------------+
*/
class RecruitController extends BaseController
{
    private $list_url = 'publish/recruit.php/interface/getList';
    private $detail_url = 'publish/recruit.php/interface/detail';
    private $sitemap_url = 'publish/Sitemap/siteMapPcHtml';

	public function __construct(){
        $callback = I('param.callback','', 'string');
        if(formatJsonpParams($callback) === false){
            $this->outError(881001);
        }
    }
	
    /**
     * 招聘列表页
     */
    public function index(){
        $page = I('param.p', 1, 'intval');
        $callback = I('param.callback','', 'string');
        $title = I('param.title','', 'string');
        $typeone = I('param.typeone','', 'string');
        $typetwo = I('param.typetwo','', 'string');
//         echo $title;exit;
        $url = C('GNS_RUL').$this->list_url.'?p='.$page.'&callback='.$callback;
        if(!empty($title)){
            $url .= '&title='.rawurlencode($title);
        }
        if(!empty($typeone)){
            $url .= '&typeone='.$typeone;
        }
        if(!empty($typetwo)){
            $url .= '&typetwo='.$typetwo;
        }
        
        $result = file_get_contents( $url );
        $this->responseJson($result);
    }

    /**
     * 招聘详情页
     */
    public function detail(){
        $id = I('param.id', 1, 'intval');
        $callback = I('param.callback','', 'string');
        $url = C('GNS_RUL').$this->detail_url.'?id='.$id.'&callback='.$callback;
        $result = file_get_contents( $url );
        $this->responseJson($result);
    }

    /**
     * 站点地图页
     */
    public function map(){
        $page = I('param.page', 1, 'intval');
        $callback = I('param.callback','', 'string');
        $url = C('GNS_RUL').$this->sitemap_url.'?page='.$page.'&callback='.$callback;
        $result = file_get_contents( $url );
        $this->responseJson($result);
    }
}