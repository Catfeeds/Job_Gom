<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                          |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：AddressController.class.php                                |
 * +----------------------------------------------------------------------+
 * | @程序功能： 客态页面                                                                                              |
 * +----------------------------------------------------------------------+
 * | Author: 宋文超<songwenchao@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-11-11 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 */

namespace Group\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;
use Services\Service\UserService;
use Services\Service\CircleService;
class TaController extends BaseController
{
    protected $maxNum = 20 ;//最大地址数
    private $personal_service;
    
    //二级城市ID
    private $addressId = '11010000';
    
	public function __construct()
	{
		parent::__construct();
		$this->personal_service = new UserService();
		$this->taServer = D('Group/Ta');
        
        //获取区域信息
        $addrArr = getAddrGome();
        $this->addressId = $addrArr['cityId'];
        
// 		$this->address = D('Ucenter/AddressV2');
// 		$this->assign('activeUrl',APP_HTTP.C('UCENTER_URL').'address/index') ; //左侧选中的地址
	}

	/**
	 * Ta的主页
	 *
	 */
	public function index()
	{
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
	    $ownerUserId = (I('param.ownerUserId','')) ? I('param.ownerUserId','') : '';
	    $list = explode("_", $ownerUserId);
	    $ownerUserId = isset($list[0]) ? intval( $list[0] ) : 0;//用户ID
	    $pageNum = isset($list[1]) ? intval( $list[1] ) : 1;//页数
        //再做一次自己访问自己客态页的判断
        if( $ownerUserId == $this->userId && $this->userInfo['loginStatus'] == 3 ){
            header('location:'.APP_HTTP.C('UCENTER_URL').'group/all');
            exit;
        }
	    $userinfo = $this->personal_service->get_personal_info($ownerUserId);
	    if( $userinfo['success'] === false ){
	        if($userinfo['code'] == '404'){
	           $this->_displayErrorPage( $userinfo['message'], $userinfo['message'], '/images/public/404-4.png' );
           }else{
	           $this->_displayErrorPage();
           }
	    }

	    $userinfo['data']['user']['facePicUrl'] = isset($userinfo['data']['user']['facePicUrl']) ? getResizeImg($userinfo['data']['user']['facePicUrl'], 260, 260) : '';
	    if(isset($userinfo['data']['shop']['icon'])){
	       $userinfo['data']['shop']['icon'] = getResizeImg($userinfo['data']['shop']['icon'],100,100);
	    }
	    $ownedGroupQuantity = isset($userinfo['data']['userOwnedGroupQuantity']['ownedGroupQuantity']) ? $userinfo['data']['userOwnedGroupQuantity']['ownedGroupQuantity'] : 0;
	    
	    $ownedTopicQuantity = isset($userinfo['data']['userOwnedTopicQuantity']['ownedTopicQuantity']) ? $userinfo['data']['userOwnedTopicQuantity']['ownedTopicQuantity'] : 0;
	    
	    $circles = $this->circles();

//print_r($circles);exit;
	    $topics = $this->topics($ownerUserId,$pageNum);
// 	    print_r($topics);exit;
	    $page = new Page();
	    $params_url = APP_HTTP.C('GROUP_URL').'ta/'.$ownerUserId;
	    $url_extension = '.html';
	    $page->page_show_row = 10;
	    $page->page_offset = 2;
	    $page->show_more = false;
	    $page->show_style = 2;
	    $page->params = ['first_label'=>'首页','last_label'=>'最后一页'];
	    $link_url =  $page->display($topics['data']['ownedTopicQuantity'], 10, $pageNum, $params_url,'', $url_extension);

	    $this->assign("userinfo",$userinfo['data']);
	    $this->assign("ownedGroupQuantity",$ownedGroupQuantity);
	    $this->assign("ownedTopicQuantity",$ownedTopicQuantity);
	    $this->assign("ownerUserId",$ownerUserId);
	    $this->assign("description",'');
	    $this->assign("pageNum",$pageNum);
	    $this->assign('circles',$circles);
	    $this->assign('topics',$topics);
	    $this->assign('keywords','');
	    $this->assign('link_url',$link_url);
	    $this->assign("title",$userinfo['data']['user']['nickname']."的主页");
	    $this->display("Index/ta");
	    
	}

	/**
	 * Ta的圈子接口
	 * @param number $userId
	 */
	public function circles(){
	    $pageNum  = I('param.pageNum',1,'intval');
	    $pageSize = I('param.pageSize',100,'intval');
	    $ownerUserId = (I('param.ownerUserId',0,'intval')) ? I('param.ownerUserId',0,'intval') : 0;
	    $params = array('pageNum'=>$pageNum,'pageSize'=>$pageSize,'ownerUserId'=>$ownerUserId);
	    $groups = $this->personal_service->get_personal_circles($ownerUserId,$pageNum,$pageSize);
	    $g_ids = '';
	    foreach ($groups['data']['groups'] as $g){
            if($g_ids != ''){
                $g_ids .= ',';
            }
	        $g_ids .= $g['id'];
        }
        $circle_service = new CircleService();
        $user_join_status = $circle_service->ids($g_ids);
//        print_r($user_join_status);
    	foreach ($groups['data']['groups'] as $key=>&$group){
//    	    print_r($group);exit;
            $groups['data']['groups'][$key]['icon'] = getResizeImg( $group['icon'], 100, 100 );;
    	    if(isset($group['category'])){
    	        if(isset($group['category']['parent']['name'])){
                    $group['cat'] = $group['category']['parent']['name'];
    	        }else{
                    $group['cat'] = $group['category']['name'];
    	        }
    	    }

            foreach ($user_join_status['data']['groups'] as $item){
                if($item['id'] == $group['id']){
                    $group['join_status'] = ($item['status'] == 1 && $group['memberQuantity'] >= $item['maxUsers'] && $this->userInfo['loginStatus'] == 3) ? 1000 : $item['status'];//用户加入圈子的状态 0为已加入 1为未加入
                    $group['max_users'] = $item['maxUsers'];
                    break;
                }
            }
    	}
//    	print_r($groups);exit;
    	if(IS_AJAX){
	       $this->response($groups);
    	}else{
    	    return $groups;
    	}
	}
	
    /**
     * Ta的话题接口
     * @param Int $userId
     */
	public function topics($ownerUserId,$pageNum,$pageSize=10){
// 	    $pageNum  = I('param.pageNum',1,'intval');
// 	    $pageSize = I('param.pageSize',10,'intval');
// 	    $ownerUserId = (I('param.ownerUserId',0,'intval')) ? I('param.ownerUserId',0,'intval') : 0;
//	    $params = array('pageNum'=>$pageNum,'pageSize'=>$pageSize,'ownerUserId'=>$ownerUserId,'areaCode'=>$this->addressId);
        $topics = $this->personal_service->get_personal_topics($ownerUserId,$pageNum,$pageSize);
	    $topics = $this->_formatTopics($topics,true);
	    if(IS_AJAX){
	        $this->response($topics);
	    }else{
	        return $topics;
	    }
	}
	
	private function _formatTopics($topics){
	    $data = array();
	    $arrSendData['data'] = array();
	    $arrSendData['success'] =false;

	    if($topics['success']){
	        $arrSendData['success'] = true;
	        $arrSendData['code'] = 200;
	        $arrSendData['message'] = $topics['message'];
	        foreach ($topics['data']['topics'] as $key => $Item){
			    $arrItem['title'] = $Item['name'];
// 			    $arrItem['createTime'] = $Item['createTime'];
			    $arrItem['replyQuantity'] = $Item['replyQuantity'] + $Item['subReplyQuantity'];
			    $arrItem['topicCollectionQuantity'] = $Item['topicCollectionQuantity'];
			    $arrItem['likeQuantity'] = $Item['like']['userQuantity'];
			    $arrItem['groupicon'] = $Item['group']['icon'];
			    $arrItem['groupid']   = $Item['group']['id'];
			    $arrItem['groupName']   = $Item['group']['name'];
			    $arrItem['time'] = formatDateTime($Item['createTime']/1000,'Y年m月d日');
			    $arrItem['topid'] = $Item['id'];
			    if(isset($Item['components']) && !empty($Item['components'])){
			        $res = $this->_handleComponent($Item['components']);
			        $arrItem['images'] = isset($res['images']) ? $res['images']: array();
			        $arrItem['text'] = isset($res['text']) ?  $res['text'] : '';
			        
			        $arrItem['text'] = msubstr(strip_tags( $res['text'] ),0,82);
			        $startPos = mb_strrpos($arrItem['text'], '[');
			        $endPos = mb_strrpos($arrItem['text'], ']');
			        if( $startPos && $endPos && $startPos > $endPos ){
			            $arrItem['text'] = msubstr($res['text'], 0,mb_strrpos($arrItem['text'], '['));
			        }
			        $arrItem['text'] = A('Topic')->string_parse_face( $arrItem['text'],22 );
			        
			    }else{
			        $arrItem['images'] = array();
			        $arrItem['text'] = '';
			    }
			    
			    array_push($data,$arrItem);
			}
			
		    $arrSendData['data']['topics'] = $data;
		    $arrSendData['data']['ownedTopicQuantity'] = isset($topics['data']['ownedTopicQuantity']) ? $topics['data']['ownedTopicQuantity'] : 0;
		    return $arrSendData;
		}
		$topics['data']['topics']= array();
		$topics['data']['ownedTopicQuantity'] = 0;
		return $topics;
	}
	/**
	 * 处理话题的components 
	 * 各个话题中的图片，视频，商品中的第一个元素
	 * @param Array $components
	 */
	private function _handleComponent($components){
	    $images = array();
	    $video = array();
	    $products = array();
	    $user_images = array();
	    $flag = array('img'=>0,'video'=>0,'item'=>0);
	    $text = '';
	    foreach ($components as $key=> $component){
	        if($component['type'] == 'text'){
	            if($text) continue;
	            $text = trim( xss_clean($component['text']) );
	        }
	        /*if(in_array($component['type'],['image','video','item']) ){
	            if(count($user_images) == 3) break;
                $user_images[] = $component;
            }*/
	        if($component['type'] == 'image'){
	            $images["img-".$key] = $component;
	            if($flag['img'] == 1){
    	            $blend["img-".$key] = $component;
	            }else{
	                $user_images["img-".$key] = $component;
	                $flag['img'] = 1;
	            }
	        }
	        
	        if($component['type'] == 'video'){
	            $video["video-".$key] = $component;
	            if($flag['video'] == 1){
	                $blend["video-".$key] = $component;
	            }else{
	                $user_images["video-".$key] = $component;
	                $flag['video'] = 1;
	            }
	        }
	        if($component['type'] == 'item'){
	            $products["item-".$key] = $component;
	            if($flag['item'] == 1){
	                $blend["item-".$key] = $component;
	            }else{
	                $user_images["item-".$key] = $component;
	                $flag['item'] = 1;
	            }
	        }
	    }
	    
	    if(count($user_images)<3 && !empty($blend)){
	        $flag = 3 - count($user_images);
	        foreach ($blend as $key=>$b){
	            if($flag == 0){
	                break;
	            }
	            $user_images[$key] = $b;
	            $flag -- ;
	        }
	    }
// 	    print_r($text);exit;
// 	    ksort($user_images);
	    foreach ($user_images as $key=>$item){
	        $user_images[$key]['item']['mainImage'] = isset($item['item']['mainImage']) ? $item['item']['mainImage'] : '';
	        if($item['type'] == 'item'){
	            $item['item']['salePrice'] = isset($item['item']['salePrice']) ? $item['item']['salePrice'] : null;
	            $item['item']['mainImage'] = isset($item['item']['mainImage']) ? $item['item']['mainImage'] : '';
	            $item['item']['type'] = isset($item['item']['type']) ? $item['item']['type'] : 'item';
	            $item['item']['name'] = isset($item['item']['name']) ? $item['item']['name'] : '';
	            $item['item']['rebateSummary']['refRebateMoney'] = isset($item['item']['rebateSummary']['refRebateMoney']) ? $item['item']['rebateSummary']['refRebateMoney'] : 0;
	            
	            $user_images[$key]['url'] = $item['item']['mainImage'];
	        }else if($item['type'] == 'video'){
	            $user_images[$key]['url'] = $item['coverImage'];
	        }
            $user_images[$key]['url'] = getResizeImg( $user_images[$key]['url'], 260, 146 );

	        /*if($item['type'] == 'item'){
	            $user_images[$key]['url'] = getResizeImg( $user_images[$key]['url'], 260, 146 );
	        }elseif($item['type'] == 'image'){
                $user_images[$key]['url'] = getResizeImg( $user_images[$key]['url'], 260, 146 );
	        }else{
                $user_images[$key]['url'] = getResizeImg( $user_images[$key]['url'], 260, 146 );
	        }*/
	    }
	    $result = array('images'=>array_values($user_images),'text'=>$text);
	    return $result;
	}
	


}
