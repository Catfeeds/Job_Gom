<?php

/**
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TopicController.class.php                                 |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                          |
 * +----------------------------------------------------------------------+
 * | Author:zhanghuan <zhanghuan@gomeplus.com>                            |
 * +----------------------------------------------------------------------+
 * | Date:2016-05-27 10:23:10 CST                                         |
 * +----------------------------------------------------------------------+
 **/

namespace Ajax\Controller;

use Ajax\Controller\BaseController;
use Common\Lib\CurlHandler;
use Think\ErrorCode;

class TopicController extends BaseController
{
    private $publiser = null;
    private $topic_v2 = null;
    private $topic = null;
    private $cachetime = null;
    //二维码当前最大数量 前缀
    public $qrcodeMaxNum = 'qrcodeIdMaxNum_';

    public function __construct(){
        parent::__construct();
        $this->publiser = D("Group/Publiser");
        $this->topic = D('Topic');
        $this->topic_v2 = D('TopicV2');

        $this->cachetime = 3600;
    }

    /******************************************下面是V2*********************************************/
    /*
     * 一级话题回复
     * @return json
     * */
    public function first_v2() {

        if(empty($this->userId)){
			$this->outError(\Think\ErrorCode::USER_NO_LOGIN);
		}

        $param['replyType']    = I('post.reply_type', '');//类型 0:普通 1:商品 2:店铺 必填=数字
        $param['topicId']    = I('post.topicid', '');//话题ID 必填
        $param['pics']    = I('post.pics', array());//话题回复图片  数组
        $param['content']    = I('post.content', '');//话题内容字数在200字内含200字
        $param['shopId']    = I('post.shopid', 0);//如果topicType = 1 或者 =2 那么这个字段必填
        $param['itemId']    = I('post.itemid', 0);//如果topicType = 1 那么这个字段必填
        $param['skuId']    = I('post.skuid', '');//如果topicType = 1 那么这个字段必填

        //过滤敏感词
        sensitive( $param['content'] );
        $param['replyType'] = intval($param['replyType']);
        $param['shopId'] = $param['shopId'];
        $param['itemId'] = $param['itemId'];

        //如果评论中含有商品，则生成返利kid
        if(1 == $param['replyType']){
            $param['kid'] = '';
            $user_service = D('Ajax/UserV2');
            $rebate_param = [
                'callfrom' => 30,
                'channel' => 1
            ];
            $rebate_kid_res = $user_service->getData($user_service->rebateKid, $rebate_param);
            if($rebate_kid_res['success']){
                $param['kid'] = $rebate_kid_res['data']['kid'];
            }
        }

		/*
        //内容不能为空
        if( !$param['content'] ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
		*/

        //城市ID参数areaCode需放在url参数里，否则不起效果
        $this->topic_v2->publicParamv2['areaCode'] = getAddrGome()['cityId'];
        
        $data = $this->topic_v2->postData($this->topic_v2->first_topic, $param);

		if($data['success']){
			foreach ($data['data']['pics'] as &$Item) {
				$Item=getResizeImg($Item,100,100);
			}	
		}
		if(isset($data['data']['item']['salePrice'])){
            $data['data']['item']['salePrice'] = ($data['data']['item']['salePrice']) ? convert_price($data['data']['item']['salePrice']) : null;
        }

        $this->ajaxReturn( $data );
    }


    /*
     * 二级回复
     * */
    public function second_v2() {

        if( empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);

        $param['topicId']    = I('param.topicid', '');//话题id
        $param['content']    = I('param.content', '');//内容字数在200字内含200字
        $param['topicReplyId']    = I('param.topic_reply_id', '');//一级话题回复id
        $param['topicSubReplyId']    = I('param.topic_subreply_id', '');//被回复的二级回复ID
        //内容不能为空
       /* if( !$param['content'] ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }*/
       sensitive($param['content']);
        $data = $this->topic_v2->postData($this->topic_v2->second_topic, $param);
        $this->ajaxReturn( $data );
    }

    /******************************************下面是V1*********************************************/

    /**
     * @desc:一级话题回复
     * @return : json
     **/
    public function first()
    {
        $param['groupId']    = I('param.groupId', '', 'string');//群组id
        $param['imId']       = I('param.imId', '', 'string');//群组成员在IM的ID
        $param['businessId'] = I('param.businessId',0 , 'intval');//如果用户输入的话题不是普通话题那么必须输入此参数,商品需要输入商品id,店铺需要输入店铺id
        $param['topicType'] = I('param.topicType',0 , 'intval');//0:普通 1:商品 2:店铺
        $param['topicId'] = I('param.topicId', 0, 'string');//回复话题ID
        $param['pic'] = I('param.pic', '', 'string');//回复话题ID
        $param['content'] = I('param.content', '', 'string');//回复话题ID
        $param['shopId'] = I('param.shopId', '', 'string');//如果类型是 1 那么这个字段必填
        $param['loginToken'] = $this->token;


        //过滤敏感词
        sensitive( $param['content'] );

        $groupData = $this->topic->postData($this->topic->first_topic, $param);
        $this->ajaxReturn($groupData);
    }

    /**
     * @desc:话题详情页发表话题二级回复
     */
    public function second()
    {
        $param['groupId']    = I('param.groupId', '', 'string');//群组id
        $param['imId']       = I('param.imId', '', 'string');//群组成员在IM的ID
        $param['businessId'] = I('param.businessId',0 , 'intval');//如果用户输入的话题不是普通话题那么必须输入此参数
        $param['topicType'] = I('param.topicType',0 , 'intval');//0:普通 1:商品 2:店铺
        $param['topicId'] = I('param.topicId', 0, 'string');//回复话题ID
        $param['pic'] = I('param.pic', '', 'string');//按逗号隔开的图片地址
        $param['content'] = I('param.content', '', 'string');//话题内容字数在200字内含200字
        $param['replyId'] = I('param.replyId', '', 'string');//被回复id
        $param['replyImId'] = I('param.replyImId', '', 'string');//被回复用户imid
        $param['beReplyId'] = I('param.beReplyId', '', 'string');//被回复的二级回复ID
        $param['loginToken'] = $this->token;

        //过滤敏感词
        sensitive( $param['content'] );

        $groupData = $this->topic->postData($this->topic->second_topic, $param);
        $this->ajaxReturn($groupData);
    }
    
    public function _before_first()
    {
        $rules = [
            'groupId' => 'required',
            'imId'    => 'required',
            'topicType'    => 'required|integer',
            'topicId'      => 'required',
            //'content'      => 'required',//因测试提交一些特殊字符 例如 <br/> 导致没有通过验证，故撤销验证
            'businessId'   => 'required_if:topicType,1,topicType,2',
        ];
        $this->validate($rules);
    }

    public function _before_second()
    {
        $rules = [
            'groupId' => 'required',
            'imId'    => 'required',
            'topicType'    => 'required|integer',
            'topicId'      => 'required',
            //'content'      => 'required',//因测试提交一些特殊字符 例如 <br/> 导致没有通过验证，故撤销验证
            'replyId'      => 'required',
            'businessId'   => 'required_if:topicType,1,topicType,2',
        ];
        $this->validate($rules);
    }
    
    
    /**
     * Ta的话题接口
     * @param Int $userId
     */
    public function ta(){
        $pageNum  = I('param.pageNum',1,'intval');
        $pageSize = I('param.pageSize',20,'intval');
        $ownerUserId = (I('param.ownerUserId',0,'intval')) ? I('param.ownerUserId',0,'intval') : 0;
        $params = array('pageNum'=>$pageNum,'pageSize'=>$pageSize,'ownerUserId'=>$ownerUserId);
        
        $topics = $this->_formatTopics($params,true);
        $this->response($topics);
    }
    
    private function _formatTopics($params){
        $data = array();
        $arrSendData['data'] = array();
        $arrSendData['success'] =false;
        $topics = $this->topic_v2->getData($this->topic_v2->personalTopics,$params);
        $ownerUserId = (I('param.ownerUserId',0,'intval')) ? I('param.ownerUserId',0,'intval') : 0;
        $userinfo = $this->topic_v2->getData($this->topic_v2->personalInfo , ['ownerUserId'=>$ownerUserId]);
        
        if($topics['success']){
            $arrSendData['success'] = true;
            $arrSendData['code'] = 200;
            $arrSendData['message'] = $topics['message'];
            foreach ($topics['data']['topics'] as $key => $Item){
                $arrItem['title'] = htmlspecialchars($Item['name']);
                // 			    $arrItem['createTime'] = $Item['createTime'];
                $arrItem['replyQuantity'] = $Item['replyQuantity'] + $Item['subReplyQuantity'];
                $arrItem['topicCollectionQuantity'] = $Item['topicCollectionQuantity'];
                $arrItem['likeQuantity'] = $Item['like']['userQuantity'];
                $arrItem['groupicon'] = $Item['group']['icon'];
                $arrItem['groupid']   = $Item['group']['id'];
                $arrItem['groupName']   = $Item['group']['name'];
                $arrItem['time'] = formatDateTime($Item['createTime']/1000);
                $arrItem['topid'] = $Item['id'];
                $arrItem['facePicUrl'] = isset($userinfo['data']['user']['facePicUrl']) ? getResizeImg($userinfo['data']['user']['facePicUrl']) : '';
                if(isset($Item['components']) && !empty($Item['components'])){
                    $res = $this->_handleComponent($Item['components']);
                    $arrItem['count'] = isset($res['count']) ? $res['count'] : 0;
                    $arrItem['images'] = isset($res['images']) ? $res['images']: array();
                    $arrItem['text'] = isset($res['text']) ? $res['text'] : '';
                }else{
                    $arrItem['count'] = 0;
                    $arrItem['images'] = array();
                    $arrItem['text'] = '';
                }
//                 print_r($arrItem);exit;
                array_push($data,$arrItem);
            }
            	
            $arrSendData['data']['topics'] = $data;
            return $arrSendData;
        }
        $topics['data']['topics']= array();
        return $topics;
    }
    
    
    /**
     * 处理话题的components
     * 各个话题中的图片，视频，商品中的第一个元素
     * @param Array $components
     */
    private function _handleComponent($components){
        $text = '';
        $images = array();
        $video = array();
        $products = array();
        $user_images = array();
        $flag = array('img'=>0,'video'=>0,'item'=>0);
        $count = 0;
        foreach ($components as $key=> $component){
            if($component['type'] == 'text'){
                $text .= trim( xss_clean($component['text']) ).' ';
            }
            if($component['type'] == 'image'){
                $count++;
                $images["img-".$key] = $component;
                if($flag['img'] == 1){
                    $blend["img-".$key] = $component;
                }else{
                    $user_images["img-".$key] = $component;
                    $flag['img'] = 1;
                }
            }
             
            if($component['type'] == 'video'){
                $count++;
                $video["video-".$key] = $component;
                if($flag['video'] == 1){
                    $blend["video-".$key] = $component;
                }else{
                    $user_images["video-".$key] = $component;
                    $flag['video'] = 1;
                }
            }
            if($component['type'] == 'item'){
                $count++;
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
        // 	    print_r($user_images);exit;
        // 	    ksort($user_images);
        foreach ($user_images as $key=>$item){
            if($item['type'] == 'item'){
                $user_images[$key]['url'] = $item['item']['mainImage'];
            }else if($item['type'] == 'video'){
                $user_images[$key]['url'] = $item['coverImage'];
            }
            $user_images[$key]['url'] = getResizeImg( $user_images[$key]['url'], 285, 185 );
        }
        $result = array('images'=>array_values($user_images),'text'=>$text,'count'=>$count);
        return $result;
    }

    /*
     * 删除话题
     * @param gid   圈子ID
     * @param tid   话题ID
     * */
    public function del(){
        $groupId = xss_clean(I('param.gid','','trim'));
        $topicId = xss_clean(I('param.tid','','trim'));
        if(empty($groupId) || empty($topicId)) {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }

        //s清除缓存
        deleteSocialCache('all', $groupId, $topicId);

        $topic = D('Group/Topic');
        $param = array('id' => $topicId);
        $res = $topic->deleteData($topic->del_topic, $param);
        $this->response($res);
    }



    //发布话题相关公用以下代码


    /*
    * 表情列表
    * 访问地址:http://pc.meixin.com/group/publiser/faces?url=http://10.69.207.16:8006/dist/images/
    * @param $url string http://10.69.207.16:8006/dist/images/
    */
    public function faces()
    {
        $url = I('param.url');
        if (empty($url))
            $this->outError(\Think\ErrorCode::PARMA_ERROR);

        $faces_arr = face_lists($url);

        $this->response($faces_arr);
    }

    /*
     * 选择圈子
     */
    public function select_group()
    {
        $lists = $this->publiser->getData($this->publiser->my_group_tj, array());

        // 处理数据
        if (isset($lists['data']['myRelatedGroups']) && ! empty($lists['data']['myRelatedGroups'])) {

            foreach ($lists['data']['myRelatedGroups'] as $k => &$v) {
                foreach ($v as $kk => &$vv) {
                    $vv['icon'] = getResizeImg($vv['icon'], 80, 80);
                }
            }
        }

        if (isset($lists['data']['recommendGroups']['peas']) && ! empty($lists['data']['recommendGroups']['peas'])) {
            foreach ($lists['data']['recommendGroups']['peas'] as $k => &$v) {
                $v['icon'] = isset($v['icon']) ? getResizeImg($v['icon'], 80, 80) : '';
            }
        }

        $this->response($lists);
    }

    /*
     * 创建话题 POST
     * @param $_POST array 完整JSON1
     */
    public function create(){
        if (empty($_POST) || ($_POST['tid'] && strlen($_POST['tid']) != 24)){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);exit;
        }

        if(isset($_POST['from']) && $_POST['from']==1 && $_POST['tid']){
            $this->updateTopic($_POST);
        }else{
            $this->addTopic($_POST);
        }
    }

    /**
     * 发布话题
     * @param $data
     */
    private function addTopic($data){
        $from = $data['from'];
        $tid = $data['tid'];
        $tag = 0;
        //验证草稿箱是否存在
        if(isset($from) && $from==2 && $tid){
            $tag = 1;
            $obj = D('Ucenter/Rdrafts');
            $res = $obj->getDraftsDetail($tid);
            if(empty($res)){
                $this->outError(\Think\ErrorCode::DRAFTS_GET_ERROR);
                exit;
            }
        }

        $_P = $data;
        $limit_nums = 20;
        $good_nums = 9;

        //标签验证|每个话题必须携带一个标签
        if( empty($_P['labels']) ){
            $this->outError(\Think\ErrorCode::TAG_IS_EMPTY);
            exit;
        }
        if (! empty($_P['name']))
            sensitive($_P['name']);

        //验证详情页添加的链接有无问题
        if(!empty($_P['links'])){
            $links = $_P['links'];
            foreach($links as $link_val){
                if(!isTrustedDomain($link_val)){
                    $this->outError(\Think\ErrorCode::ILLEGAL_LINK);
                    exit;
                }
            }
            unset($_P['links']);
        }

        //验证详情页添加的封面图是否为合法域名下的图片
        if(!empty($_P['coverPic'])){
            if(!isTrustedDomain($_P['coverPic'])){
                echo json_encode(output(500, '图片上传失败,请重新上传.', ''));
                exit();
            }
        }

        if (isset($_P['components']) && ! empty($_P['components'])) {
            $images_count = $item_count = 0;
            $rebate_kid = '';
            foreach ($_P['components'] as $k => &$v) {
                switch ($v['type']) {
                    // 图片
                    case 'image':
                        // 敏感词过滤
                        sensitive($v['text']);
                        // URL检查是否是本站
                        if (isset($v['url']) && ! empty($v['url'])) {
                            if (! isTrustedDomain($v['url'])) {
                                echo json_encode(output(500, '图片上传失败,请重新上传.', ''));
                                exit();
                            }
                            $v['url'] = strrpos($v['url'],'//') === 0 ? APP_HTTP.substr($v['url'],2) : $v['url'];
                        }
                        break;
                    // 文本和商品
                    case 'text':
                        sensitive($v['text']);
                        $v['text'] = strip_tags($v['text']);
                        break;
                    case 'item':
                        if(empty($rebate_kid)) {
                            $user_service = D('Ajax/UserV2');
                            $param = [
                                'callfrom' => 30,
                                'channel' => 1
                            ];
                            $rebate_kid_res = $user_service->getData($user_service->rebateKid, $param);
                            if($rebate_kid_res['success']) {
                                $rebate_kid = $rebate_kid_res['data']['kid'];
                            }
                        }
                        $v['kid'] = $rebate_kid;
                        sensitive($v['text']);
                        $v['text'] = strip_tags($v['text']);
                        $v['shopId'] = "0";
                        $v['outProductId'] = $v['id'];
                        $v['id'] = 0;
                        // $v['text'] = nl2br($v['text']);
                        break;
                }
                switch ($v['type']) {
                    case 'image':
                        if (! isTrustedDomain($v['url'])) {
                            $this->outJSON(102, '上传图片存在非法提交.');
                        }
                        $images_count ++;
                        break;
                    case 'item':
                        $item_count ++;
                        break;
                    case 'text':
                        break;
                    case 'html':
                        unset($_P['components'][$k]);
                        break;
                }
            }

            // 检查图片数量
            if ($images_count > $limit_nums) {
                $this->outJSON(101, '您最多能添加20张图片哦！[' . $limit_nums . '].');
            }

            // 检查商品数量
            if ($item_count > $good_nums) {
                $this->outJSON(103, '您最多能添加9个商品哦！[' . $good_nums . '].');
            }
        }

        unset($_P['from']);
        unset($_P['tid']);
        unset($_P['group']);
        $lists = $this->publiser->postData($this->publiser->create_topic, $_P);
        if($lists['code']== 200 && $tag){
            //删除草稿
            $obj->delDraftsItem($tid);
        }
        $this->response($lists);

        $lists = $this->publiser->postData($this->publiser->create_topic, $_P);
        $this->response($lists);
    }

    /**
     * 修改话题
     * @param $data
     */
    private function updateTopic($data){
        $limit_nums = 20;
        $good_nums = 9;
        $_P = $data;
        if (! empty($_P['name']))
            sensitive($_P['name']);

        if (isset($_P['components']) && ! empty($_P['components'])) {
            $images_count = $item_count = 0;
            foreach ($_P['components'] as $k => &$v) {
                $_P['components'][$k]['kid'] = isset($v['kid']) ? $v['kid'] : '';
                //$_P['components'][$k]['coverImage'] = isset($v['coverImage']) ? $v['coverImage'] : '';
                switch ($v['type']) {
                    // 图片
                    case 'image':
                        // 敏感词过滤
                        sensitive($v['text']);
                        // URL检查是否是本站
                        if (isset($v['url']) && ! empty($v['url'])) {
                            if (! isTrustedDomain($v['url'])) {
                                echo json_encode(output(500, '图片上传失败,请重新上传.', ''));
                                exit();
                            }
                            $v['url'] = strrpos($v['url'],'//') === 0 ? APP_HTTP.substr($v['url'],2) : $v['url'];
                        }
                        break;
                    // 文本和商品
                    case 'text':
                        sensitive($v['text']);
                        $v['text'] = strip_tags($v['text']);
                        break;
                    case 'item':
                        sensitive($v['text']);
                        $v['text'] = strip_tags($v['text']);
                        $v['shopId'] = "0";
                        $v['outProductId'] = $v['id'];
                        $v['id'] = 0;
                        // $v['text'] = nl2br($v['text']);
                        break;
                }
                switch ($v['type']) {
                    case 'image':
                        if (! isTrustedDomain($v['url'])) {
                            $this->outJSON(102, '上传图片存在非法提交.');
                        }
                        $images_count ++;
                        break;
                    case 'item':
                        $item_count ++;
                        break;
                    case 'text':
                        break;
                    case 'html':
                        unset($_P['components'][$k]);
                        break;
                }
            }

            // 检查图片数量
            if ($images_count > $limit_nums) {
                $this->outJSON(101, '您最多能添加20张图片哦！[' . $limit_nums . '].');
            }

            // 检查商品数量
            if ($item_count > $good_nums) {
                $this->outJSON(103, '您最多能添加9个商品哦！[' . $good_nums . '].');
            }
        }

            $uri = $this->publiser->create_topic;
            $tid = $_P['tid'];
            $this->publiser->publicParamv2['id'] = $tid;
            unset($_P['from']);
            unset($_P['tid']);
            unset($_P['group']);

            $lists = $this->publiser->putData($uri, $_P);
            if($lists['success'] && $lists['code']==200 ){

                //删除缓存
                deleteSocialCache('all',$_P['groupId'],$tid);
                unset($lists['data']);
                $lists['data']['id'] =  $tid;
            }
            $this->response($lists);
    }
    /*
     * 我的收藏
     * @param pagesize int 分页数量
     * @param page int 页码
     * */
    public function my_item_collect() {
        $pagesize = I( 'param.pagesize', 10, 'intval' );
        $page = I( 'param.page', 1, 'intval' );

        if ( $pagesize > 10 ) {
            $pagesize = 10;
        }

        $return_arr = array(
            'success' => false,
            'code' => 500,
            'message' => '失败',
            'data' => array()
        );

        //获取区域信息
        $addr_arr = getAddrGome();

        $param = array(
            'currPageNum' => $page,
            'pageSize' => $pagesize,
            'callback' => 'ckdata',
            'districtCode' => $addr_arr['cityId'],
            '_' => time().'000'
        );

        $prod_collect_uri = C('GOME')['SERVICE']['UCENTER'].C('GOME_API')['prodCollect'].'?'.joinParam($param);

        $curlHandler = new CurlHandler();
        $prod_collect_res = $curlHandler->request($prod_collect_uri, array(), 'get');
        $prod_collect_arr = analyzeOnline($prod_collect_res, 'ckdata');

        if ( !empty($prod_collect_arr['result']) ) {
            if ( !empty($prod_collect_arr['result']['favoritesList']['pagination']['list']) ) {
                foreach ( $prod_collect_arr['result']['favoritesList']['pagination']['list'] as &$val ) {
                    $val['pId'] = $val['productId'];
                    $val['sUrl'] = $val['productUrl'];
                    $val['mainImage'] = getResizeImg($val['imageUrl'],260,260,'ONLINE');
                    $val['name'] = $val['displayName'];
                    $val['salePrice '] = $val['skuPrice'];
                    unset($val);
                }
            }
            $prod_collect_arr['result']['favoritesList']['pagination']['items'] = $prod_collect_arr['result']['favoritesList']['pagination']['list'];
            unset($prod_collect_arr['result']['favoritesList']['pagination']['list']);
            $return_arr = array(
                'success' => true,
                'code' => 200,
                'message' => '成功',
                'data' => $prod_collect_arr['result']['favoritesList']['pagination']
            );
        }

        //记录日志
        $msg = 'no message';
        if ( !empty($prod_collect_arr['result']) ) {
            write_log($msg, $prod_collect_uri, $param);
        } else {
            write_log($msg, $prod_collect_uri, $param, 500);
        }

        $this->ajaxReturn( $return_arr );
    }

    /*
     * 搜索商品
     * @param pagesize int 每页的数量
     * @param page int 页码
     * @param q string 关键字
     * @param sort_type int //(买家)排序条件（默认：0，新品:6，价格:9, 销量:10）（卖家）排序条件（佣金：5，销量:2，价格:1）
     * @param order int 1升序2降序(默认)
     */
    public function search_item()
    {
        // 参数
        $pagesize = I('param.pagesize', 20);
        $pagenum = I('param.pagenum', 1);
        $word = urlencode(I('param.word', ''));
        $sort = I('param.sort', 0);
        $order = I('param.order', 2);

        $url = C("GOME")['SERVICE']['PRODUCT_SEARCH_API'] . C("GOME_API.product_search") . "/$pagesize/$pagenum/$sort/$word/0/0/0/10/0/0/?from=search_plus";
//         echo $url;
        $curlHandler = new CurlHandler();
        $data = $curlHandler->request($url, array(), 'get');
        $data = json_decode($data, true);
        if(!isset($data['content'])){
            write_log($data, $url, []);
            write_log('没有获取到商品数据', $url, []);
        }
        // 请求数据
        $lists = isset($data['content']['prodInfo']) ? $data['content']['prodInfo'] : [];
        $area_code = '11010000';
        $area = getAddrGome();
        if (! empty($area)) {
            $area_code = $area['cityId'];
        }
        // 缩略图
        if (! empty($lists) && isset($lists['products'])) {
            foreach ($lists['products'] as $k => &$v) {
//                 echo $v  ['sImg'];
                $v['mainImage'] = getResizeImg($v['sImg'] , 260, 260,'ONLINE') ;
//                 echo $v['mainImage'];exit;
                $callback_function = 'product_item';
                $product_price_url = 'http:'.C("GOME")['SERVICE']['SS_API'] . C("GOME_API.product_price") . "/" . $v['pId'] . "/" . $v['skuId'] . "/" . $area_code . "/flag/item/$callback_function";
                $product_price = $curlHandler->request($product_price_url, array(), 'get');
                $product_price = $this->getResult($callback_function, $product_price);

                if(!isset($product_price['success'])){
                    write_log('没有获取到商品价格', $product_price_url, []);
                }
                if (isset($product_price['success']) && $product_price['success']) {
                    $v['price'] = isset($product_price['result']['price']) ? $product_price['result']['price'] : null;
                } else {
                    $v['price'] = isset($v['price']) ? $v['price'] : null;
                }
                $v['salePrice'] = $v['price'];
            }
        }
        $result['data'] = [
            'items' => isset($lists['products']) ? $lists['products'] : [],
            'count' => isset($data['content']['pageBar']['totalCount']) ? $data['content']['pageBar']['totalCount'] : 0,
            'pageCount' => isset($data['content']['pageBar']['totalPage']) ? $data['content']['pageBar']['totalPage'] : 0
        ];
        $result['code'] = 200;
        $result['message'] = '';
        $result['success'] = true;
        // 输出
        $this->response($result);
    }

    private function getResult($callbackFun, $data)
    {
        $result = preg_match_all('/' . $callbackFun . '\((.*)\)/i', $data, $data);
        return isset($data[1][0]) ?  json_decode($data[1][0], true) : [];
    }


    //话题页面二维码地址唯一串
    public function topicQrcode(){

        //页面唯一值
        $pageId = I('param.pageId');
        $qrcodeId = I('param.qrcodeId');

        //老的二维码|如果是重新生成 需要传递
        if( $qrcodeId ){
            $qrcodeId = str_replace(" ", "+", $qrcodeId );
            $qrcodeStr = authcode($qrcodeId,  'DECODE', C('ENCRYPT_APP_KEY') );
            $qrcodeCache = $this->_keyturn( $qrcodeStr );
            S("topicQrcodeId_".$qrcodeCache,'2',300); //二维码废弃
        }
        //可传递的最大数
        $maxNum = I('param.maxNum',0);

        if( !$pageId ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        $pageId = str_replace(" ", "+", $pageId );
        $pageVal = authcode($pageId,  'DECODE', C('ENCRYPT_APP_KEY'),0 );

        if(!$pageVal){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        $pageArr = explode("|", $pageVal);


        $qrcodeVal = $pageArr[0].'|'.$pageArr[1].'|'.'qrcode'.rand().'|'.time();
        $newcodeKey = $this->_keyturn( $qrcodeVal  );
        S("qrcodeIdMaxNum_".$newcodeKey,$maxNum,3600);

        $qrcodeId = authcode($qrcodeVal, 'ENCODE', C('ENCRYPT_APP_KEY') );
        $aucodetest = authcode($qrcodeId,  'DECODE', C('ENCRYPT_APP_KEY') );
        $code = 200;
        $message = '成功';
        $dataArr = array('pageId'=>$pageId,'qrcodeId'=>$qrcodeId,'teststr'=> S("qrcodeIdMaxNum_".$newcodeKey) ,'num'=>$maxNum);
        $returnArr = output($code, $message, $dataArr);
        $this->ajaxReturn($returnArr);

    }

    //算出 图片缓存、页面状态缓存的key，
    private function _keyturn($string){
        return substr( md5($string),8,16 );
    }

    //二维码与页面可以需要单独的空格处理
    private function _strturn($string){
        return str_replace(" ","+",$string);
    }

    //更新能够上传的最大数量
    public function putMaxNum(){
        //可传递的最大数
        $maxNum = I('param.maxNum',0);
        $qrcodeId= I('param.qrcodeId');
        $qrcodeId = $this->_strturn($qrcodeId);
        $qrcodeStr = authcode( $qrcodeId,  'DECODE', C('ENCRYPT_APP_KEY') );
        if( !$qrcodeStr){
            $this->outError(\Think\ErrorCode::PARMA_CHECK_FAIL);
        }
        $qrcodeArr = explode("|", $qrcodeStr);
        if(!is_array($qrcodeArr)){
            $this->outError(\Think\ErrorCode::PARMA_CHECK_FAIL);
        }
        $qrcodekey = $this->_keyturn($qrcodeStr);
        S('qrcodeIdMaxNum_'.$qrcodekey,$maxNum,3600);
        $data = S('qrcodeIdMaxNum_'.$qrcodekey);
        $code = 200;
        $message = '成功';
        $this->outJSON($code, $message, $data);
    }

    /*
     * js调用监控接口
     * @param $code varchar 缓存的key
     * */
    public function checkInfo(){
        $arrResult = array();
        $code      = I("param.code","","trim");
        $code      = $this->_strturn($code);
        $groupkey  = I("param.groupkey","","trim");
        $groupkey  = $this->_strturn($groupkey);
        if(empty($code) || empty($groupkey)){
            $arrResult['success'] = false;
            $arrResult['code']    = ErrorCode::PARMA_ERROR;
            $arrResult['msg']     = ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR);
            $arrResult['data']    = array();
            $arrResult['isload']  = 0;//判断是否开始加载
        }
        else{
            $bigInfo  = authcode($code,  'DECODE', C('ENCRYPT_APP_KEY') );//缓存大key
            $smInfo   = authcode($groupkey,  'DECODE', C('ENCRYPT_APP_KEY') );//缓存小key
            $code     = $this->_keyturn($bigInfo);
            $groupkey = $this->_keyturn($smInfo);
            $numCacheKey    = "MAX_IMG_NUM".$groupkey;
            $maxRcacheKey   = "qrcode_key_request_time_{$groupkey}";
            $maxkeyCachekey = "page_key_request_time_{$code}";
            $flushCacheTime  = "topicQrcodeView_{$groupkey}";
            //$pageNumCacheKey = "qrcodeIdMaxNum_{$groupkey}";

            $timeNow    = time();
            $isload		= 1;
            $cache      =S([]);
            $arrImgInfo = $cache->lrange($groupkey,0,-1);
            $imgNum     = $cache->llen($groupkey);
            $num        = S($numCacheKey);
            $arr        = explode("|",$smInfo);
            $arrFlush   = S($flushCacheTime);
            if(!empty($arrFlush) || is_array($arrFlush)){//二维码刷新时间延迟300s
                $Flush  = explode("|",$arrFlush);
                $goTime = $Flush[2] + 300;
            }else{
                $goTime = intval($arr[3])+ 300;//5分钟二维码过期
            }
            if($timeNow > $goTime){
                $isload = 10000;
            }
            /*
            //配合前端去掉这个状态
            elseif(($imgNum > 1) && ($imgNum < $num )){
                $isload = 2;
            */
            elseif(($imgNum > 0 && $num > 0)){
                $isload =3;
            }
            S($maxRcacheKey,$timeNow,300);
            S($maxkeyCachekey,$timeNow,$this->cachetime);

            $arrResult['success'] = true;
            $arrResult['code'] = 1;
            $arrResult['msg'] = "";
            $arrResult['data'] = $arrImgInfo;
            $arrResult['isload'] =$isload;
        }
        $this->response($arrResult);
    }

    //图片上传接口1.1.7使用
    public function upload(){
        $code = I('param.cachekey',"","trim");//缓存大key
        $num  = I('param.num',0,"intval");//本次的总数量
        $Content     = I('param.content',"","trim");//图片的base64编码
        $arrContent  = is_array($Content) ? $Content : array($Content);
        $groupkey    = I('param.groupkey',"","trim");//缓存组key
        $this->cropServ = D("Ajax/Crop");
        $cache = S([]);
        $maxUploadImg   = 20;
        $arrResult      = array();
        if(empty($code) || empty($num) || empty($groupkey)){
            $arrResult['success'] = false;
            $arrResult['code']	  = ErrorCode::PARAM_ERROR;
            $arrResult['data']	  = array();
            $msg = ErrorCode::getErrMsg(ErrorCode::PARAM_ERROR);
            $arrResult['msg']	  = $msg;
            $this->response($arrResult);
            exit;
        }

        $code      = $this->_strturn($code);
        $bigInfo   = authcode($code,  'DECODE', C('ENCRYPT_APP_KEY') );//缓存大key
        $arrInfo   = explode("|",$bigInfo);
        $bigUid    = current($arrInfo);
        $groupkey  = $this->_strturn($groupkey);
        $smInfo    = authcode($groupkey,  'DECODE', C('ENCRYPT_APP_KEY') );//缓存小key
        $arrSmInfo = explode("|",$smInfo);
        $smUid     = current($arrSmInfo);
        $smStrKey  = $this->_keyturn($smInfo);
        if($bigUid != $smUid){
            $arrResult['success'] = false;
            $arrResult['code']    = ErrorCode::USER_INFO_ERROR;
            $arrResult['data']    = array();
            $arrResult['msg']     = ErrorCode::getErrMsg(ErrorCode::USER_INFO_ERROR);
            $this -> response($arrResult);
            exit;
        }
        /*
        //数量去掉该有前端控制图片数量
        if($num > $maxUploadImg){
            $arrResult['success'] = false;
            $arrResult['code']    = ErrorCode::UPLOAD_PHONE_NUM;
            $arrResult['data']    = array();
            $arrResult['msg']     = ErrorCode::getErrMsg(ErrorCode::UPLOAD_PHONE_NUM);

            $this->response($arrResult);
            exit;
        }
        */
        $arrImgPath = $this->_batchImg($arrContent);//批量图片路径
        $result		= $this->_upload($arrImgPath);
        if($result['success']){
            foreach ($result['data'] as $imgUrl) {
                $cache ->rpush($smStrKey,$imgUrl);
            }
        }
        $maxStrKey = "MAX_IMG_NUM{$smStrKey}";
        S($maxStrKey,$num,$this->cachetime);
        if(is_array($arrImgPath)){
            foreach ($arrImgPath as $path) {
                unlink($path);
            }
        }
        $this->response($result);
    }

    private function _batchImg($arrInfo){
        $arrReturn = array();
        foreach ($arrInfo as $imgInfo){
            preg_match('/^(data:\s*image\/(\w+);base64,)/', $imgInfo, $result);
            $name=$result[2];
            if($name == "jpeg"){
                $name = "jpg";
            }
            elseif($name == "png"){
                $name = "png";
            }elseif($name=="gif"){
                $name="gif";
            }
            $content = str_replace($result[1],"",$imgInfo);
            $str = microtime().mt_rand(0,10000);
            $filePath = "/tmp/".md5($str).".{$name}";
            $img=base64_decode($content);
            file_put_contents($filePath,$img);
            array_push($arrReturn,$filePath);
        }
        return $arrReturn;
    }

    private function _upload($arrFilePath){
        $arrImgContent = array();
        $delimiter = md5(time());
        $data = '';
        foreach ($arrFilePath as $imgPath) {
            $arr =array();
            $fp         = fopen($imgPath,"r");
            $arrType    = pathInfo($imgPath);
            $type       = $arrType['extension'];
            $content = fread($fp,filesize($imgPath));
            $arr['content'] = $content;
            if($type == "jpg"){
                $type = "image/jpeg";
            }
            elseif($type == "png"){
                $type = "image/png";
            }elseif($type == "gif"){
                $type = "image/gif";
            }
            $arr['type']    = $type;
            array_push($arrImgContent,$arr);
        }

        foreach ($arrImgContent as $content) {
            $data .= "--" . $delimiter . "\r\n";
            $data .= 'Content-Disposition: form-data; name="imageArray"; filename="imageArray"'."\r\n";
            $data .= 'Content-Type: ' . $content['type'] . "\r\n";
            $data .= "\r\n";
            $data .= $content['content'] . "\r\n";
        }
        $data .= "--" . $delimiter . "--\r\n";
        $arr['content'] = $data;
        $arr['boundary'] = $delimiter;
        $arr = $this->cropServ->postUploadData($this->cropServ->upload_img,$arr);
        return $arr;
    }

    /*
     * 敏感词过滤
     * @param text
     * */
    public function check(){
        $text = I('post.text','','trim');
        if(empty($text)){
            $arr = array(
                'success' => false,
                'code'    => ErrorCode::PARMA_ERROR,
                'message' =>ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR),
            );

            $this -> response($arr);
        }
		$commonService = D( "Services/Common" );
        $arrReturn = $commonService->sensitive_check($text);
/*
        $sensitive = load_config( APP_PATH.'Group/Conf/sensitive'.CONF_EXT );
        $str = implode( '|', $sensitive );
        preg_match_all( '/'.$str.'/i',$text,$info );
        if(!empty($info[0])){
            $arr = $info[0];
            $arrReturn['success'] = false;
            $arrReturn['code'] = ErrorCode::WORD_IS_ERROR;
            $arrReturn['message'] = ErrorCode::getErrMsg(ErrorCode::WORD_IS_ERROR);
            $arrReturn['data'] =$arr;
        }else{
            $arr  = array();
            $arrReturn['success'] = true;
            $arrReturn['code'] = 0;
            $arrReturn['message'] = "";
            $arrReturn['data'] =$arr;

        }*/
        $this->response($arrReturn);
    }

    /*
     * 处理外部图片链接地址转换本地图片路径
     * @param src 图片链接地址
     * */
    public function url(){
        $arrReturn = array();
        $res = I("param.src","","trim");
        //处理双协议的图片
        $res = strpos(substr($res,0,4),"http") === false ? 'http:'.$res: $res;
        $this->cropServ = D("Ajax/Crop");
        $arrRes = is_array($res) ? $res : array($res);
        foreach($arrRes as $Info){
            $arr = getimagesize($Info);
            if(!is_array($arr) || empty($arr)) {
                $arrReturn['success'] = false;
                $arrReturn['code'] = ErrorCode::PARMA_ERROR;
                $arrReturn['message'] = ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR);
                $this->response($arrReturn);
                break;
            }
        }
        $imgArr = array();
        foreach($arrRes as $Item){
            $arr = getimagesize($Item);
            switch ($arr['mime']){
                case 'image/jpeg':
                    $fileType = ".jpg";
                    break;
                case 'image/png':
                    $fileType = ".png";
                    break;
                case 'image/gif':
                    $fileType = ".gif";
                    break;
                default:
                    $fileType = ".jpg";
                    break;
            }

            $fileName = md5(microtime()+mt_rand());
            $fileName = "/tmp/{$fileName}{$fileType}";
            $file     = file_get_contents($Item);
            file_put_contents($fileName,$file,FILE_APPEND);
            array_push($imgArr,$fileName);
        }
        /*$percent =1;
        $degree  =75;
        $arrInfo = $this->_comp_img($imgArr,$percent,$degree);
        $result  = $this->_upload($arrInfo);*/

        $result  = $this->_upload($imgArr);
        if(is_array($imgArr) ) {
            foreach ($imgArr as $file) {
                unlink($file);
            }
        }
        $this->response($result);
    }
    private function _comp_img($imgArr,$percent=1,$degree=100){
        $arrInfo = array();
        foreach ($imgArr as $info) {
            $type = explode(".",$info)[1];
            $newFileName = md5(microtime()+microtime()+mt_rand());
            $newFileName ="/tmp/{$newFileName}.{$type}";

            list($oldwidth,$oldHeight) = getimagesize($info);
            $newWidth  = $oldwidth   * $percent;
            $newHeigth = $oldHeight * $percent;
            $new_res = imagecreatetruecolor($newWidth, $newHeigth);

            if($type == "jpg"){
                $old_res = imagecreatefromjpeg($info);
                imagecopyresampled($new_res,$old_res,0,0,0,0,$newWidth,$newHeigth,$oldwidth,$oldHeight);
                imagejpeg($new_res, $newFileName, $degree);
            }elseif($type == "png") {
                $old_res=imagecreatefrompng($info);
                imagecopyresampled($new_res,$old_res,0,0,0,0,$newWidth,$newHeigth,$oldwidth,$oldHeight);
                imagepng($new_res, $newFileName, $degree);
            }
            imagedestroy($new_res);
            imagedestroy($old_res);

            array_push($arrInfo,$newFileName);
            unset($info);
        }
        unset($imgArr);
        return $arrInfo;
    }


    /*
     * 处理图片旋转接口
     * @param $imgPath
     * @param direction
     * */
    public function handleImg(){
        $imgPath   = I("param.imgPath","","trim");
        $angle	   = I("param.angle",90,"intval");
        if(empty($imgPath)){
            $this->outError(\Think\ErrorCode::UPLOAD_ERROR);
        }

        $arrInfo = $this->_imgturn($imgPath,$angle);
        $this->response($arrInfo);
    }
    /*
     * 处理图片旋转接口
     * @param $src 图片的路径
     * @param $angle 图片旋转角度
     * */
    private function _imgturn($filename,$angle){
        $arrPathInfo = array();
        $this->cropServ = D("Ajax/Crop");
        $arrImgInfo = is_array($filename) ? $filename : array($filename);
        foreach ($arrImgInfo as $pathInfo){
            //处理双协议的图片
            $pathInfo = strpos(substr($pathInfo,0,4),"http") === false ? 'http:'.$pathInfo: $pathInfo;
            $info = pathinfo($pathInfo);
            if($info['extension'] == 'jpg'){
                $source = imagecreatefromjpeg($pathInfo);
            }elseif($info['extension'] == 'png'){
                $source =imagecreatefrompng($pathInfo);
            }
            $rotate = imagerotate($source, $angle, 0);
            $newFile = "/tmp/".md5(time()).".{$info['extension']}";
            if($info['extension'] == 'jpg'){
                imagejpeg($rotate,$newFile);
            }elseif($info['extension'] == 'png'){
                imagepng($rotate,$newFile);
            }
            array_push($arrPathInfo,$newFile);
        }
        $arrResult = $this->_upload($arrPathInfo);
        foreach ($arrPathInfo as $Info) {
            unlink($Info);
        }
        return $arrResult;
    }

    /*
     * 处理图片base64字符串换图片地址
     * @param src 字符串内容
     * */
    public function path() {
        $imgRes= I('param.src',"","trim");//图片的base64编码
        if(empty($imgRes)) {
            $arrRet = array();
            $arrRet['success'] = false;
            $arrRet['code'] = ErrorCode::PARMA_ERROR;
            $arrRet['message'] = ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR);

            $this -> response($arrRet);
        }
        $this->cropServ = D("Ajax/Crop");
        $arrContent = is_array($imgRes) ? $imgRes : array($imgRes);
        $arrImgPath = $this->_batchImg($arrContent);//批量图片路径
        $result		= $this->_upload($arrImgPath);
        if(is_array($arrImgPath)) {
            foreach ($arrImgPath as $info) {
                unlink($info);
            }
        }
        $this->response($result);
    }

    /**
     * 举报 话题、评论
     * @param int type 0:话题,1:一级回复
     * @param int reason 举报原因 0:色情低俗 1:营销广告 2:政治敏感  3:人身攻击 4:其他
     * @param string reportId 举报的话题或者评论
     */
    public function report(){
        $param = array();
        $param['type'] = I('param.type',0,"intval");
        $param['reason'] = I('param.reason',0,"intval");
        $param['reportId'] = I('param.reportId','',"trim");
        if( !$param['reportId'] ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            exit;
        }
        $topic = D('Group/Topic');
        $result = $topic->postData($topic->socialReport,$param);
        $this->response($result);
    }
}
