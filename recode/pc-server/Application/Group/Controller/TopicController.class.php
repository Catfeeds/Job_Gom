<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：TopicController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：话题                                                      |
 * +----------------------------------------------------------------------+
 * | Author:                                                              |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;
use Common\Lib\Page;
use Think\ErrorCode;
use Services\Service\CircleService;
use Services\Service\TopicsService;
class TopicController extends BaseController {
    const OPEN_GROUP_CACHE = 1; //默认打开缓存
    private static $_loginlist = array('topicqrcode','publiser');
    private $circle_service,$topics_service;

    //是否显示美店标志位，1：显示，0：不显示，默认0
    private $mshop_flag = 0;

    //美店店铺链接
    private $mshop_url = '';

    public function __construct() {
        parent::__construct();
        $this->topic = D( 'Topic' );
        $this->topic_v1 = D( 'TopicV1' );
        $this->circle_service = new CircleService();
        $this->topics_service = new TopicsService();
        //缓存时间
        $this->cachetime = 3600;
        $this->g_cachetime = 600; //圈子列表第一页缓存10分钟
        $this->hotTopic_time = 300; //热门话题缓存时间5分钟
        $this->categoryGroup_time = 300; //分类下的圈子缓存时间5分钟
    }


    /*
     * 话题 全部话题,精选话题
     * @return null
     * */
    public function index() {
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        $gid = I( 'param.gid',0);
        $list = explode("_", $gid);
        $gid = isset($list[0]) ? $list[0] : '';
        $tid = isset($list[1]) ? intval( $list[1] ) : 0;//是否为精品
        $top_num = isset($list[2]) ? intval( $list[2] ) : 0;//置顶话题的数量
        $page_num = isset($list[3]) ? intval( $list[3] ) : 1;//页数
        $page_size = isset($list[4]) ? intval( $list[4] ) : 10;//每页数量默认为10
        //获取带会员圈子信息
        $g_m_infos = $this->group_infos( $gid );

        if(empty($g_m_infos)){
            $this->_cicleError($g_m_infos);
        }
        $group_lists = $this->_getCategoryGroups($g_m_infos);//同类别下的圈子列表

//print_r($group_lists);exit;
        $topics = $this->get_topics($gid,$page_size,$tid,$page_num,true);//话题列表
        $hot_topics = $this->_getHotTopics();//热门话题
        $link_url = '';
        if($topics['totalTopicQuantity'] > $page_size){
            $page = new Page();
            $tNum = !empty($topics['topTopics']) ?  count($topics['topTopics']) : $top_num;
            $url = APP_HTTP.C('GROUP_URL').'circle/'.$gid ;
            $params = "_".$tid."_".$tNum;
            $url_extension = '.html';
            $page->page_show_row = 10;
            $page->page_offset = 2;
            $page->show_more = false;
            $page->show_style = 2;
            $page->params = ['first_label'=>'首页','last_label'=>'最后一页'];
            $link_url =  $page->display($topics['totalTopicQuantity'] - $tNum,$page_size,$page_num,$url,$params,$url_extension);
        }
        $seo_title = $g_m_infos['name'].",".$g_m_infos['category']['parent']['name'].",".$g_m_infos['category']['name'].",".$g_m_infos['name']."圈子";
        //SEO
        $seo_description = "{$g_m_infos['name']}圈子,共{$g_m_infos['memberQuantity']}位{$g_m_infos['category']['name']}达人,分享了{$g_m_infos['topicQuantity']}个关于{$g_m_infos['category']['name']}相关热门话题.";
        $seoMap = seoMap(
            '',
            array("{{3}}" => $seo_title, "{{2}}" => $seo_description, "{{1}}" => ($page_num == 1) ? $g_m_infos['name'] : $g_m_infos['name'] ."_".$page_num)
        );

        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);

        $this->assign( 'gid', $gid);
        $this->assign( 'list', $topics);
        $this->assign( 'hot_topics', $hot_topics);
        $this->assign( 'link_url', $link_url);

        $this->assign( 'group_member_infos', $g_m_infos);
        $this->assign( 'group_lists', $group_lists);
        $this->assign( 'tid', $tid);
        $this->assign( 'bg_style', 'bg-fff');
        $this->assign( 'page_num', $page_num);
        $this->assign( 'page_size', $page_size);
        $this->assign( 'top_num', $top_num);


        //如果不存在默认赋值1  表示不存在该圈子
        $memberType = ( isset($g_m_infos['memberType']) ) ? $g_m_infos['memberType'] : 1;
        $this->assign( 'member_type', ( $g_m_infos['memberQuantity'] >= $g_m_infos['maxUsers'] && $memberType == 1  && $this->userInfo['loginStatus'] == 3)  ? 1000 : $memberType  );
        $this->display( 'Index/circle_index' );
    }


    public function more_topics(){
        $gid = I( 'param.gid',0 );
        $tid = I( 'param.type', 0, 'intval' );
        $top_num = I( 'param.topnum', 0, 'intval' );
        $page_size = I( 'param.pagesize', 10, 'intval' );
        $page_num = I( 'param.page', 1, 'intval' );
        if(!$gid){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        $topics = $this->get_topics($gid,$page_size,$tid,$page_num,true);//话题列表

        $link_url = '';
        if($topics['totalTopicQuantity'] > $page_size){
            $page = new Page();
            $tNum = !empty($topics['topTopics']) ?  count($topics['topTopics']) : $top_num;
            $url = APP_HTTP.C('GROUP_URL').'circle/'.$gid ;
            $params = "_".$tid."_".$tNum;
            $url_extension = '.html';
            $page->page_show_row = 10;
            $page->page_offset = 2;
            $page->show_more = false;
            $page->show_style = 2;
            $page->params = ['first_label'=>'首页','last_label'=>'最后一页'];
            $link_url =  $page->display($topics['totalTopicQuantity'] - $tNum,$page_size,$page_num,$url,$params,$url_extension);
        }
        $topics['link_url'] = $link_url;
        $res = ['success'=>true,'code'=>200,'message'=>'','data'=>$topics];
        $this->response($res);
    }
    /*
     * 获取带会员的圈子
     * @param string $gid 圈子ID
     * @return array
     * */
    public function get_member_infos( $gid = 0 ){

        $data = $this->topic->getData(
            $this->topic->group_member_infos,
            array(
                'id' => $gid,
                'userId'=> $this->userId,
            )
        );

        $data = $data['data'];
        //处理圈子信息的图片
        if( !empty($data) ) {
            $data['group']['icon'] = getResizeImg( $data['group']['icon'], 100, 100 );
        }


        //output
        return $data;
    }

    /*
     * 圈子信息
     * @param string $gid 圈子ID
     * @result array
     * */
    public function group_infos( $gid ) {
        if( empty($gid) ) return array();

        $data = $this->circle_service->get_group_info($gid);
        $this->_cicleError($data);
        $data = $data['data'];
        //处理圈子信息的图片
        if( !empty($data) ) {
            $data['icon'] = getResizeImg( $data['icon'], 260, 260 );
            $data['user']['facePicUrl'] =  isset($data['user']['facePicUrl']) ? getResizeImg($data['user']['facePicUrl'],100,100) : '';
            $data['name'] = isset($data['name']) ? $data['name'] : '';
            $data['createTime'] = $time = date('Y年m月d日', substr( $data['createTime'], 0, 10));
        }
        //exit;

        //output
        return $data;
    }

    /**
     *  圈子错误处理
     * @param Array $data
     */
    private function _cicleError($data){
        if( empty($data) ) {
            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
            exit;
        }else{
            //圈子不存在
            if( isset($data['code']) && ($data['code'] == 404 || $data['code'] == 422 || $data['code'] == 500 )) {
                $this->assign( 'title', '抱歉！服务器君正在打盹' );
                $this->assign( 'message', '抱歉！服务器君正在打盹' );
                $this->assign( 'images', '/images/public/404-2.png' );
                $this->display("Public:error_code");
                exit;
            }

            if( isset($data['code'])  && $data['code'] == 403 ) {

                $this->assign( 'title', '抱歉！该圈子审核未通过' );
                $this->assign( 'message', '抱歉！该圈子审核未通过' );
                $this->assign( 'images', '/images/public/404-1.png' );
                $this->display("Public:error_code");
                exit;
            }

            if( isset($data['code'])  && $data['code'] == 410 ) {
                $this->assign( 'title', '该圈子已被创建人解散.' );
                $this->display("Public:error_group_dissolve");
                exit;
            }
        }


    }

    /**
     * 获取圈子话题
     * @param String $gid  圈子ID
     * @param Int $pagesize
     * @param Int $essence_type 是否加精  0:否  1:是
     * @param Int $page_num 页码
     * @param boolean $parse_components 是否需要处理components
     * @return array
     */
    public function get_topics($gid,$page_size,$essence_type,$page_num,$parse_components=false) {
        if( empty($gid) ) {
            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
            exit;
        }

//        print_r($all_res);exit;
        if($page_num == 1 && $essence_type!=1 && self::OPEN_GROUP_CACHE){
            $cache_k = $this->_get_cache_k('group', $gid);
            $topicsData = S($cache_k);

            if ($topicsData && ( (isset($topicsData['topTopics']) && $topicsData['topTopics']) || (isset($topicsData['topics']) && $topicsData['topics']) )) {
                $res = $topicsData;
            }else{
//                $topics_service = new TopicsService();
                $all_res = $this->topics_service->get_group_topics_list($gid,$essence_type,$page_num,$page_size);
                if($all_res['code'] == 200 && isset($all_res['data']['topics'])){
                    S($cache_k, $all_res['data'], $this->g_cachetime);
                }
                $res = $all_res['data'];
            }
        }else{
//            $topics_service = new TopicsService();
            $all_res = $this->topics_service->get_group_topics_list($gid,$essence_type,$page_num,$page_size);
            $res = $all_res['data'];
        }
//        print_r($res);exit;
        //处理话题数据
        if( isset( $res['topics'] ) && $res['topics']) {
            $res['topics'] = $this->parse_components( $res['topics'] );
        }
        if( isset( $res['topTopics'] ) && $res['topTopics']) {
            $res['topTopics'] = $this->parse_components( $res['topTopics'] );
        }
        $topics['topics'] = (isset($topics['topics'])) ? $topics['topics'] : [];
        $topics['topTopics'] = (isset($topics['topTopics'])) ? $topics['topTopics'] : [];
        $topics['totalTopicQuantity'] = (isset($topics['totalTopicQuantity'])) ? $topics['totalTopicQuantity'] : 0;

        return $res;
    }

    /*
     * 解析components
     * @param $topics array 话题详细数据
     * @return array
     * */
    public function parse_components( $topics ) {
        if( empty($topics) ) return $topics;

        foreach( $topics as $k => &$v ) {
            //头像尺寸
            if( isset( $v['user']['facePicUrl'] ) && !empty( $v['user']['facePicUrl'] ) ) {
                $v['user']['facePicUrl'] = getResizeImg($v['user']['facePicUrl'],60,60);
            }

            $images_lst = [];
            $text = '';
            if( $v['components'] ) {
                foreach( $v['components'] as $kk =>$vv ) {
                    if(count( $images_lst ) == 3 && in_array($vv['type'], ['item','image','shop','video']) ){
                        continue;
                    }

                    //text
                    if( $vv['type'] == 'text' ) {
                        $vv['text'] = trim( $vv['text'] );
                        $text .= trim( $vv['text'] )." ";
                    }

                    //components images 图片转换
                    if( $vv['type'] == 'image' ) {
                        $vv['url'] = getResizeImg( $vv['url'], 260, 146);
                        //过滤
                        $vv['url'] = strip_tags( $vv['url'] );
                        if( !isTrustedDomain( $vv['url'] ) ) $vv['url'] = '';

                        $vv['url'] = (pathinfo($vv['url'], PATHINFO_EXTENSION) == "gif") ? str_replace(".gif", ".jpg", $vv['url']) : $vv['url'];
                        $images_lst[] = [
                            'mainImage'=>$vv['url'],
                            'type'=>'image',
                            'name'=>$v['name']
                        ];
                    }
                    //components item 图片转换
                    if( $vv['type'] == 'item' ) {

                        $vv['item']['salePrice'] = isset($vv['item']['salePrice']) ? $vv['item']['salePrice'] : null;
                        $vv['item']['mainImage'] = isset($vv['item']['mainImage']) ? $vv['item']['mainImage'] : '';
                        $vv['item']['type'] = isset($vv['item']['type']) ? $vv['item']['type'] : 'item';
                        $vv['item']['name'] = isset($vv['item']['name']) ? $vv['item']['name'] : '';
                        $vv['item']['rebateSummary']['mostRebate'] = isset($vv['item']['rebateSummary']['mostRebate']) ? $vv['item']['rebateSummary']['mostRebate'] : 0;

                        $vv['item']['salePrice'] = ($vv['item']['salePrice']) ? convert_price( $vv['item']['salePrice'] ) : null;
                        $vv['item']['mainImage'] = getResizeImg( $vv['item']['mainImage'], 260, 146);

                        if(pathinfo($vv['item']['mainImage'], PATHINFO_EXTENSION) == "gif"){
                            $vv['item']['mainImage'] = str_replace(".gif", ".jpg", $vv['item']['mainImage']);
                        }
                        $vv['item']['type'] = 'item';
                        $images_lst[] = $vv['item'];
                    }

                    if( $vv['type'] == 'video'){
                        $images_lst[] = [
                            'mainImage'=>getResizeImg($vv['coverImage'],260,146),
                            'type'=>'video',
                            'name'=>isset($vv['name']) ? $vv['name'] : $v['name']
                        ];
                    }

                    unset( $v['components'] );
                }
            } else {
                $v['new_components'] = array();
            }

            //统计图片数量
            $v['image_number'] = ( !empty( $images_lst ) ) ? count( $images_lst ) : 0 ;
            $v['images_lst'] = $images_lst ;

            $v['text'] = msubstr(strip_tags($text) ,0,100);
            $startPos = mb_strrpos($v['text'], '[');
            $endPos = mb_strrpos($v['text'], ']');
            if( $startPos && $endPos && $startPos > $endPos ){
                $v['text'] = msubstr(strip_tags($text) , 0,mb_strrpos($v['text'], '['));
            }
//            $v['text'] = $this->string_parse_face( $v['text'],22 );
            //最后回复时间
            if( $v['lastReplyTime'] ) $v['time_str'] = formatDateTime( $v['lastReplyTime'] ,'Y年m月d日' );
            $v['like']['userQuantity']  = formatNum($v['like']['userQuantity']);
            $v['replyQuantity']  = formatNum($v['replyQuantity'] + $v['subReplyQuantity']);
            $v['topicCollectionQuantity']  = formatNum($v['topicCollectionQuantity']);
        }

        return $topics;
    }






    /*
     * 话题详情 错误页面
     * */
    public function detail_error_page( $code ) {

        switch( $code ) {
            case "404": case '410':
            $title = '抱歉！该话题已被删除';
            $message = '抱歉！该话题已被删除';
            $images = '/images/public/404-4.png';
            break;
            case "422";
                $title = '抱歉！服务器君正在打盹';
                $message = '抱歉！服务器君正在打盹';
                $images = '/images/public/404-2.png';
                break;
            case "403";
                $title = '抱歉！该话题审核未通过';
                $message = '抱歉！该话题审核未通过';
                $images = '/images/public/404-5.png';
                break;
            default:
                $title = $message = $images = '';
                $images = '/images/public/404-4.png';

        }
        if( $code == 200 ) return ;

        $this->assign( 'title', $title );
        $this->assign( 'message', $message );
        $this->assign( 'images', $images );
        $this->display("Public:error_code");
        exit;
    }

    /*
  * 话题详情页
  * */
    public function detail() {
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        $tid = I( 'param.tid' );

        //是否继续加载下一篇话题   1=不继续加载  0=继续
        $no_next = I( 'param.no_next', 0, 'intval');

        //热门话题推荐
        $hot_data = $this->_getHotTopics(6);

        //获取详情数据
        $data_detail = $this->get_detail( $tid );

        $data = ( isset( $data_detail['data'] ) ) ? $data_detail['data'] : array();

        //话题封面图url去掉协议
        $data['coverPic'] = !empty($data['coverPic']) ? str_replace(['http:', 'https'], '', $data['coverPic']) : '';

        $circle_name = isset($data['name']) ? $data['name'] : '';
        //错误页面
        $this->detail_error_page( $data_detail['code'] );

        //删除逻辑
        $groupInfo = isset($data['group']) ? $data['group'] : [];

        //页面删除按钮
        $data['user']['is_del'] = false;
        if( $this->userInfo['loginStatus'] == 3 ){
            if( (isset($data['user']['id']) && $data['user']['id'] == $this->userId ) || (isset($groupInfo['createrId'] ) && $this->userId == $groupInfo['createrId']) ){
                $data['user']['is_del'] = true;
            }
        }
        //商品,图片,店铺,优惠卷等内容
        $share_info = $this->_handle_share_info($data);
        $this->assign( "images_str", implode( '||', $share_info['images_lst'] ) );
        $share_text = $share_info['share_text'];
        $description = $share_info['description'];

        //处理话题详情基础数据
        $this->parse_detail_base( $data );

        //获取圈子信息
        $group_infos = array();
        if( isset( $data['groupId'] ) && !empty( $data['groupId'] ) ) {
            $group_infos = $this->group_infos( $data['groupId'] );
        }

        //面包屑
        $crumbs = crumbsMap(
            array(
                "{{1}}" => '/circle/'.$group_infos['id'].'.html'
            )
        );
        $crumbs = sprintf($crumbs,$circle_name);

        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => $data['name'], "{{2}}" => $description )
        );

        //下一篇话题
        $nextTopic_data = [];
        if(!$no_next){
            $nextTopic_data = $this->topics_service->get_next_topic_info($tid);
        }
        if($this->userId){
            //随机字符 uid|token|随机数字符串|数时间戳
            do{
                $randStr1 =  $this->userId.'|'.$this->token.'|'.'infopage'.rand().'|'.time();
            }
            while( S(substr(md5($randStr1),8,16) ) );

            $pageId = authcode($randStr1,  'ENCODE', C('ENCRYPT_APP_KEY') );
            $qrcodeUrlmodel = APP_HTTP.C('MAIN_URL').'qrupload/index?pageId={pageId}&qrcodeId={qrcodeId}';
            $this->assign('pageId',$pageId);
            $this->assign('qrcodeUrlmodel',$qrcodeUrlmodel);
        }

        //话题详情HTML
        $topic_html = $this->detail_infos( $tid, $data_detail);

        //美店相关信息
        $mshop_info = [
            'mshop_flag' => $this->mshop_flag,
            'mshop_url' => $this->mshop_url
        ];

        $this->assign('nextTopic_data', $nextTopic_data);//分享使用
        $this->assign('share_text', $share_text);//分享使用
        $this->assign('hot_data', $hot_data);//热门话题推荐
        $this->assign('topic_html', $topic_html);
        $this->assign('mshop_info', $mshop_info);
        $this->assign('praise_infos', $data['praise_infos']);
        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign( 'infos', $data);
        $this->assign( 'tid', $tid);
        $this->assign( 'group_infos', $group_infos);
        $this->assign( 'no_next', $no_next);//是否继续加载下一篇话题 1=不继续加载  0=继续
        //如果不存在默认赋值1  表示不存在该圈子
        $this->assign( 'member_type', ( isset($group_infos['memberType']) ) ? $group_infos['memberType'] : 1  );
        $this->display( 'Index/topic_detail' );

    }


    private function _handle_share_info($data){
        $share_text = $description = '';
        $images_lst = array();
        if( isset( $data['components'] ) && !empty( $data['components'] ) ) {
            $content_lists = $data['components'];
            //处理图片缩略图
            foreach( $content_lists as $k => &$v ) {

                //文本
                if( $v['type'] == 'text' ) {
                    $v['text'] = str_replace( ' ', '&nbsp;', $v['text'] );
//                     $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);
                    $share_text = preg_replace( "/\[(.+?)\]/", "" , $v['text'] );
                    $share_text = strip_tags( $share_text );
                    $share_text = str_replace( ['&nbsp;'], ' ', $share_text );
                    $description = empty($description) ? msubstr($share_text ,0 , 50, 'utf-8') : $description;//给分享使用
                    $share_text = msubstr($share_text ,0 , 110, 'utf-8');//给分享使用
                    $description = strip_tags($description);
                }
                //图片
                if( $v['type'] == 'image' ) {
                    //过滤
                    $v['url'] = strip_tags( $v['url'] );
                    if( !isTrustedDomain( $v['url'] ) ) $v['url'] = '';
                    if($v['url']){
                        $v['url'] = getResizeImg( $v['url'], 260,260);
                        $images_lst[] = preg_replace("(^http://|^//)", 'https://',$v['url']);
                    }
                }

                //商品
                if( $v['type'] == 'item' ) {
                    $v['item']['mainImage'] = isset($v['item']['mainImage']) ? $v['item']['mainImage'] : '';
                    $v['item']['mainImage'] =  getResizeImg( $v['item']['mainImage'], 260,260);
                    if($v['item']['mainImage']){
                        $images_lst[] =  preg_replace("(^http://|^//)", 'https://',$v['item']['mainImage']);
                    }
                }

                //店铺
                if( $v['type'] == 'shop' ) {
                    $v['shop']['icon'] = getResizeImg($v['shop']['icon'], 260, 260);
                    if($v['shop']['icon']) {
                        $images_lst[] =  preg_replace("(^http://|^//)", 'https://',$v['shop']['icon']);
                    }
                }
            }
        }
        return ['description'=>$description,'share_text'=>$share_text,'images_lst'=>$images_lst];
    }
    /*
     * 对话题详情相关字段进行处理
     * @param &$data array 字段数组
     * @return data
     * */
    public function parse_detail_base( &$data ) {
        //处理基础数据
//        $data['name'] = xss_clean( $data['name'] );

        //处理详情数据的图片, 缩略图
        if( !empty($data) ) {
            $data['user']['facePicUrl'] = (isset($data['user']['facePicUrl'])) ? getResizeImg( $data['user']['facePicUrl'], 80, 80): null ;
            $data['group']['icon'] = getResizeImg( $data['group']['icon'], 80, 80);
        }

        //收藏状态
        if( isset($data['userCollection']) ) {
            $data['userCollection']['result'] = ( $data['userCollection']['result'] ) ? 1 : 0 ;
        }

        //解析时间
        if( isset( $data['lastReplyTime'] ) && !empty( $data['lastReplyTime'] ) ) $data['lastReplyTime'] = formatDateTime( $data['lastReplyTime'] );

        //解析标题表情
        //if( isset($data['name']) ) $data['name'] = $this->string_parse_face( $data['name'] );
    }

    /*
     * 获取话题详情聚合数据
     * 话题详情带缓存
     * @param $tid string 话题ID
     * @return array
     * */
    public function get_detail( $tid ) {

        //缓存 话题详情数据
        $log = array();
        $log['memcache_infos']['tid'] = $tid;
        $cache_k = $this->_get_cache_k( 'detail', $tid);
        $data_detail = S($cache_k);
//        $data_detail = null;
        if( !$data_detail ) {
            $data_detail = $this->topic->getData(
                $this->topic->topic_detail,
                array(
                    'id' => $tid,
                    ///'userId' => $this->userId,
                    //'loginToken' => $this->token,
                    'areaCode' => getAddrGome()['cityId']
                )
            );
            //$data_detail = xss_clean_recursive($data_detail);
            if($data_detail['code'] == 200){
                $is_item = false;
                foreach($data_detail['data']['components'] as $key=>$val){
                    if(array_key_exists('item',$val)){
                        $is_item = true;
                        break;
                    }
                }
                if($is_item == false){
                    S($cache_k, $data_detail, $this->cachetime);
                }
            }
            $log['memcache_infos']['status'] = 'do not use memcache';
        } else {
            //检查 未审核话题,不是自己不允许查看
            if( $data_detail['data']['auditState'] == 1 && $this->userId != $data_detail['data']['user']['id'] ) {
                $data_detail['code'] = 404;
            }
            $log['memcache_infos']['status'] = 'use memcache';
        }
        \Think\Rsyslog::write($log, \Think\Rsyslog::INFO);
        if(isset($data_detail['data']['user']['facePicUrl'])){
            $data_detail['data']['user']['facePicUrl'] = getResizeImg($data_detail['data']['user']['facePicUrl'], 60, 60);;
        }

        if($this->userInfo['loginStatus'] == 3 ) {
            $collect = $this->topics_service->topcollect(3, $tid, $data_detail['group']['id']);
            $data_detail['userCollection']['result'] = isset($collect['data']['result']) ? $collect['data']['result'] : $data_detail['userCollection']['result'];
        }else{
            $data_detail['data']['userCollection']['result'] = false;
        }
        //处理点赞信息
        $praise_infos = $this->topics_service->get_like_info($tid,1,1,20,'simple');
        if( !empty($tid) ) {
            $data_detail['data']['praise_infos'] = $praise_infos['data'];
            $data_detail['data']['praise_infos']['is_status'] = (isset($praise_infos['data']['isLike']) && ( $praise_infos['data']['isLike'] ) ) ? 0 : 1 ;
        }
        return $data_detail;
    }


    /*
     * 话题详情 HTML
     * 接口+内部方法
     * @param $topic_id string 话题ID
     * @return html
     * */
    public function detail_infos( $topic_id = '', $topic_info=null ) {
        $tid = ( !empty( $topic_id ) ) ? $topic_id : I( 'get.tid', '' );
        $_data = $topic_info;
        if(!$_data){
            $_data = $this->get_detail( $tid );
        }
        $data = ( isset( $_data['data'] ) ) ? $_data['data'] : array();
        $arrLables = isset($data['labels']) ? $data['labels']: array();
        $html = $share_text = '';
        $images_lst = array();
        $html = '<div class="source-rig-box">';
        if( isset( $data['components'] ) && !empty( $data['components'] ) ) {
            $content_lists = $data['components'];
            foreach( $content_lists as $k => &$v ) {
                //文本
                if( $v['type'] == 'text' ) {
                    if( isset($v['richText'])  ){
                        if($v['richText']){
                            if($v['richText'] == '<p></p>'){
                                $v['text'] = str_replace('<p></p>','<p><br></p>',$v['richText']);
                            }else{
                                $v['text'] = preg_replace('/ src="(http|https):/',' src="',$v['richText']);
                                $v['text'] = preg_replace('/data-original="(http|https):/','data-original="',$v['text']);
                                $v['text'] = $v['text'];
                            }
                            $html .=<<<EOF
<div class="topic-content">{$v['text']}</div>
EOF;
                        }
                    }
                    else{
//                       $v['text'] = str_replace(' ', '&nbsp;', $v['text'] );
                        $v['text'] = xss_clean($v['text']);
                        $v['text'] = nl2br($v['text']);
                        $html .=<<<EOF
<div class="topic-content">{$v['text']}</div>
EOF;
                    }

                    $share_text = preg_replace( "/\[(.+?)\]/", "" , $v['text'] );
                    $share_text = strip_tags( $share_text );
                    $share_text = msubstr($share_text ,0 , 110, 'utf-8');//给分享使用


                }
                //图片
                if( $v['type'] == 'image' ) {

                    //过滤
                    $v['url'] = strip_tags( $v['url'] );
                    if( !isTrustedDomain( $v['url'] ) ) $v['url'] = '';

                    $imgArr = pathinfo($v['url']);
                    if(isset($v['isOnLine']) && $v['isOnLine']){
                        $v['url'] = getResizeImg($v['url'], 800, 800,'GFS','t');
                        $width =  600;
                        $height =  600;
                    }else{
                        if( !isset($v['isGif']) ){
                            $v['url'] = getResizeImg($v['url'], 600, 0, 'MEIXIN');
                        }else{
                            $v['url'] = handleUrl($v['url']);
                        }
                        $width =  ($v['picture']['width'] > 600) ? 600 : $v['picture']['width'];
                        if(isset($v['picture']['width']) && $v['picture']['width']){
                            $height =   intval($v['picture']['height']  * $width /$v['picture']['width']);
                        }
                        $width = ( $width ) ? $width : 400;
                        $height = ( $height ) ? $height : 400;
                    }

                    $images_lst[] = $v['url'];
                    $images_lst[] = $v['url'];
                    $imgpath = C('STATICPATH.IMG');
                    $default_img_url = APP_HTTP.$imgpath."dist/images/public/img-error.png?v=".C('JS_VERSION');

                    if( isset($v['richText'])  ){
                        $v['text'] = $v['richText'];
                        $v['text'] = preg_replace('/ src="(http|https):/',' src="',$v['text']);
                        $v['text'] = preg_replace('/data-original="(http|https):/','data-original="',$v['text']);
                        $v['text'] = xss_clean($v['text']);
                        if( $v['richText'] ){
                            $html .=<<<EOF
<div class="topic-content">{$v['text']}</div>
EOF;
                        }
                    }else{
                        $v['text'] = nl2br($v['text']);

                        $html .=<<<EOF
<div class="topic-content">
	<img src="{$default_img_url}" alt="{$data['name']}" data-original="{$v['url']}" width="{$width}px" height="{$height}px"/>
</div>
<div class="topic-content">{$v['text']}</div>
EOF;
                    }

                }

                //商品|richText不存在或者已经存在且有值才渲染
                if( $v['type'] == 'item' && ( !isset($v['richText'] ) || (isset($v['richText'] ) && $v['richText'])) ) {
                    $v['item']['mainImage'] = (isset($v['item']['mainImage'])) ? $v['item']['mainImage'] : '';
                    $v['item']['shopId'] = (isset($v['item']['shopId'])) ? $v['item']['shopId'] : 0;
                    $v['item']['salePrice'] = (isset($v['item']['salePrice'])) ? $v['item']['salePrice'] : 0;
                    $v['item']['name'] = (isset($v['item']['name'])) ? $v['item']['name'] : '';
                    $imgArr = pathinfo($v['item']['mainImage']);
                    if(isset($imgArr['extension']) && $imgArr['extension'] != "gif"){
                        //在线图床
                        $v['item']['mainImage'] =  getResizeImg($v['item']['mainImage'], 260, 260);
                    }

                    $v['text'] = nl2br($v['text']);
                    $v['text'] = preg_replace('/ src="(http|https):/',' src="',$v['text']);
                    $v['text'] = preg_replace('/data-original="(http|https):/','data-original="',$v['text']);
                    $images_lst[] = $v['item']['mainImage'];
                    $v['skuId'] = isset($v['skuId']) ? $v['skuId'] : 0;
                    $shopid = isset( $v['shopId'] ) ? $v['shopId'] : $v['item']['shopId'] ;
                    $item_url = productDetailUrlGen($v['item']['shopId'],$v['outProductId'],$v['skuId'], $v['kid']);
                    $money = convert_price( $v['item']['salePrice'] );

                    $html .=<<<EOF
<div class="publish-item">
	<a target="_blank" href="{$item_url}" class="img-out">
		<img onerror="imgError(this)" src="{$v['item']['mainImage']}" alt="{$v['item']['name']}" title="{$v['item']['name']}">
	</a>
	<div class="publish-cont">
		<h3 class="pub-tl">
			<a target="_blank" href="{$item_url}" title="{$v['item']['name']}">{$v['item']['name']}</a>
		</h3>
		<div class="pub-row hide" data-node="price">
			<span class="red">￥</span>
			<strong class="money-inf" data-id="{$v['outProductId']}" data-skuId="{$v['skuId']}">0</strong>
		</div>
	<a target="_blank" href="{$item_url}" class="scan-more" title="{$v['item']['name']}">查看详情</a>
	</div>
</div>
<div class="topic-content">{$v['text']}</div>
EOF;
                }


                //视频
                if( $v['type'] == 'video' ) {
                    $v['text'] = nl2br($v['text']);
                    $v['text'] = preg_replace('/ src="(http|https):/',' src="',$v['text']);
                    $v['text'] = preg_replace('/data-original="(http|https):/','data-original="',$v['text']);
                    $js= [];
                    $js['base']['id'] = $v['id'];

                    $js['config']['title'] = $v['text'];
                    $js['config']['poster'] = $v['coverImage'];
                    $js['config']['autoplay'] = 0;
                    $js['config']['elementId'] = 'mxvplayer'.$v['id']."_".$tid;
                    $js['config']['topicId'] = $tid;
                    $js['config']['env'] = 'dist';
                    if( $_SERVER['ENVIRONMENT'] != 'pro' && $_SERVER['ENVIRONMENT'] != 'sim' ){
                        $js['config']['env'] = 'pre';
                    }
                    $jhtml_obj = json_encode( $js );

                    $jhtml = '$GLOBAL_CONFIG[\'video_arr\'].push( '.$jhtml_obj.' );';
                    $html .=<<<EOF
<div id="topicvideo"></div>
<div  class="videoContainer" style="height:423px" id="videoContainer_{$v['id']}_{$tid}" ></div>
<div class="topic-content">{$v['text']}</div>
<script>
    {$jhtml}
</script>
EOF;
                }

                //链接=外链
                if( $v['type'] == 'link' ) {

                    $title = msubstr( $v['title'], 0,53 );
                    $v['coverImage'] = preg_replace('/(http|https):/','',$v['coverImage']);
                    $html .=<<<EOF
<div class="publish-text">
    <a href="#" ><img data-original="{$v['coverImage']}" src="{$v['coverImage']}" alt="{$v['title']}">{$v['text']}</a>
    <a href="{$v['url']}" target="_blank" title="{$v['title']}" class="link">{$title}</a>
    <a href="{$v['url']}" target="_blank" title="{$v['title']}" class="pc-btn">查看详情</a>
</div>
EOF;
                }

                //判断话题详情页是否显示美店
                if( 'mshop' == $v['type'] && !empty($v['mshopId']) ) {
                    $this->mshop_flag = 1;
                    $this->mshop_url = mshopDetailUrlGen($v['mshopId']);
                }
            }

        }
        $html.='</div>';

        //解析表情列表
        $html = $this->string_parse_face( $html );
        //标签渲染
        $strUl = "";
        if(!empty($arrLables)){
            $strLi = "";
            foreach ($arrLables as $Item) {
                $href = topicTaglUrlGen($Item['id'],$Item['name']);
                //$Item['name'] = htmlentities($Item['name']);
                $strLi.="<li data-id='{$Item['id']}'><a  target='_blank' href='{$href}'>{$Item['name']}</a></li>";
            }
            $strUl="<ul class='preview-label clearfix'>{$strLi}</ul>";
        }

        $html.=$strUl;
        if( !empty( $topic_id ) ) {
            //内部调用
            return $html;
        } else {
            //话题封面图url去掉协议
            $data['coverPic'] = !empty($data['coverPic']) ? str_replace(['http:', 'https'], '', $data['coverPic']) : '';

            //处理点赞信息
            $data['ext']['praise'] = $data['praise_infos'];
            $data['html'] = '';
            if( isset( $data['components'] ) ) {
                unset( $data['components'] );
                $data['html'] = $html;
            }
            foreach ($images_lst as &$img){
                $img = preg_replace("(^http://|^//)", 'https://', $img);
            }
            //处理话题详情基础数据
            $this->parse_detail_base( $data );
            $data['ext']['group_url']= groupDetailUrlGen( $data['group']['id'] );
            $data['ext']['images_lst'] = implode( '||', $images_lst );
            $data['ext']['share_text'] = $share_text;
            $data['ext']['surl'] = topicDetailUrlGen( $tid );

            //美店相关信息
            $data['ext']['mshop_flag'] = $this->mshop_flag;
            $data['ext']['mshop_url'] = $this->mshop_url;

            //删除逻辑
            $groupInfo = isset($data['group']) ? $data['group'] : [];
            //页面删除按钮
            $data['user']['is_del'] = false;
            if( $this->userInfo['loginStatus'] == 3 ){
                if( (isset($data['user']['id']) && $data['user']['id'] == $this->userId ) || (isset($groupInfo['createrId'] ) && $this->userId == $groupInfo['createrId']) ){
                    $data['user']['is_del'] = true;
                }
            }
            $_data['data'] = $data;
            $this->response( $_data );
        }

    }

    /*
     * 获取他人个人主页用户信息
     * */
    public function othermember_info( $memberid ) {
        if( empty($memberid) ) return array();
        $ta_service = D( 'Ta' );
        $data = $ta_service->getData(
            $ta_service->personalInfo,
            array(
                'ownerUserId' => $memberid,
            )
        );
        return $data['data'];
    }

    /*
     * 过滤表情
     * @param string $text 文本
     * @return void
     * */
    public function face_filter( &$text ) {
        if( empty($text) ) return $text;

        $faces = face_lists();
        foreach( $faces as $k => $v ) {
            $text = str_replace( "[{$v['name']}]", '', $text );
        }
    }

    /*
     * 解析表情
     * @param $content string 字符串
     * */
    public function string_parse_face( $content, $size=false ) {
        if( empty($content) ) return $content;

        $faces = face_lists();
        foreach( $faces as $kk => $vv ) {
            if($size){
                $img = "<img src='{$vv['url']}' class='imoji' width='".$size."px' height='".$size."px' data-original='{$vv['url']}' />";
            }else{
                $img = "<img src='{$vv['url']}' class='imoji' data-original='{$vv['url']}' />";
            }
            $content = str_replace( "[{$vv['name']}]", $img, $content );
        }
        return $content;
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



    /*
     * 发布话题
     * */
    public function publiser () {
        if($this->userInfo['loginStatus'] !==3 && !$this->userId)
        {
            header('location:'.APP_HTTP_GOME.C('GOME')['URL']['LOGIN_URL'].'?orginURI='.curPageURL());
            exit;
        }

        $gid = I( 'param.gid',0);
        $item_json = I( 'post.itemJson','',false);
        // 如果有Post数据，则计算用户评论时添加的图片数量
        if (!empty($item_json)){
            $item = json_decode($item_json,true);
            $commentPicNum = count($item['commentImages']);
        }
        //获取圈子信息
        $group_infos = $this->group_infos( $gid );
        $seoMap = seoMap(
            '',
            array("{{1}}" => ( isset($group_infos['name']) ) ? $group_infos['name'].' - ' : ' '  )
        );

        //随机字符 uid|token|随机数字符串|数时间戳
        do{
            $randStr1 =  $this->userId.'|'.$this->token.'|'.'addpage'.rand().'|'.time();
        }
        while( S(substr(md5($randStr1),8,16) ) );

        $pageId = authcode($randStr1,  'ENCODE', C('ENCRYPT_APP_KEY') );
        $qrcodeUrlmodel = APP_HTTP.C('MAIN_URL').'qrupload/index?pageId={pageId}&qrcodeId={qrcodeId}';

        //获取美店信息
        $mshop_obj = D('Mall/ShopV2');
        $mshop_param = ['userId' => $this->userId];
        $mshop_infos = $mshop_obj->getData($mshop_obj->get_shop_info, $mshop_param);

        $crumbs = crumbsMap();
        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('group_infos', $group_infos);
        $this->assign('item_json', $item_json);
        $this->assign('shinePicNum', isset($commentPicNum) ? (9 - $commentPicNum) : 9);
        $this->assign('pageId',$pageId);
        $this->assign('qrcodeUrlmodel',$qrcodeUrlmodel);
        $this->assign('mshop_infos',$mshop_infos);
        $this->display( "Index/publiser_topics" );

    }

    /**
     * 获取推荐话题列表
     * @param String $gid 圈子ID
     * @return Array
     */
    private function _handleHotTopics($lists){

        $hot_topics = ( isset( $lists['data'] ) ) ? $lists['data'] : array();

        $text = '';
        $hot_data = array();
        if( isset($hot_topics['peas']) && !empty($hot_topics['peas']) ) {
            foreach( $hot_topics['peas'] as $k => $v ) {
                if( isset($v['components']) ) {
                    foreach( $v['components'] as $kk => $vv ) {
                        if( $vv['type'] == 'image' && !isset( $v['hot_image'] ) ) {
                            if(isset($vv['isOnLine']) && $vv['isOnLine']){
                                $v['hot_image'] = getResizeImg($vv['url'], 80, 80,'ONLINE');
                            }else{
                                $v['hot_image'] = getResizeImg($vv['url'], 80, 80);
                            }
                        }

                        if( $vv['type'] == 'video' && !isset( $v['hot_image'] ) ) {
                            $v['hot_image'] = getResizeImg($vv['coverImage'], 230, 153);
                        }
                        $v['hot_type'] = $vv['type'];

                    }
                    unset( $v['components'] );
                    if( empty($v['hot_image']) ) continue;
                    $hot_data[] = $v;
                }
            }


            $v['text'] = isset($v['text']) ? $this->string_parse_face( $v['text'],22 ) : '';
        }
        return $hot_data;
    }
    /*
     * 获取缓存KEY
     * @param $name string 类型
     * @param $value string 值
     * */
    public function _get_cache_k( $name, $value ) {

        switch( $name ) {
            case 'detail':
                $k = 'p_t_'.$value;
                break;
            case 'group':
                $k = 'p_g_'.$value;
                break;
            default:
                $k = '';

        }
        return $k;
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
        header("Access-Control-Allow-Origin: *");
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
            $pathInfo = get_whole_url($pathInfo);
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

    //算出 图片缓存、页面状态缓存的key，
    private function _keyturn($string){
        return substr( md5($string),8,16 );
    }
    //二维码与页面可以需要单独的空格处理
    private function _strturn($string){
        return str_replace(" ","+",$string);
    }

    /*
     * 处理外部图片链接地址转换本地图片路径
     * @param src 图片链接地址
     * */
    public function url(){
        $arrReturn = array();
        $res = I("param.src","","trim");
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
            preg_match('/image\/([^\s]+)/',$arr['mime'],$Info);
            $type = $Info[1];
            if($type == "jpeg") {
                $fileType = ".jpg";
            }elseif($type == "png"){
                $fileType = ".png";
            }elseif($type == "gif"){
                $fileType = ".gif";
            }

            $fileName = md5(microtime()+mt_rand());
            $fileName = "/tmp/{$fileName}{$fileType}";
            $file     = file_get_contents($Item);
            file_put_contents($fileName,$file,FILE_APPEND);
            array_push($imgArr,$fileName);
        }
        $percent =1;
        $degree  =75;
        $arrInfo = $this->_comp_img($imgArr,$percent,$degree);
        $result  = $this->_upload($arrInfo);
        if(is_array($imgArr) && is_array($arrInfo)) {
            foreach ($imgArr as $file) {
                unlink($file);
            }
            foreach ($arrInfo as $Item) {
                unlink($Item);
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
        }
        return $arrInfo;
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
    /*
     * 删除话题
     * @param id
     * */
    public function del(){
        $arrReturn = array();
        $groupId = I('param.groupId','','trim');
        $topicId = I('param.id','','trim');
        if(empty($topicId)) {
            $arrReturn['success'] = false;
            $arrReturn['code'] = ErrorCode::PARMA_ERROR;
            $arrReturn['message'] = ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR);
            $this->response($arrReturn);
        }

        //s清除缓存
        deleteSocialCache('all',$groupId,$topicId);

        $arrParams =array('id'=>$topicId);
        $arrRet = $this->topic->deleteData($this->topic->del_topic,$arrParams);
        $this->response($arrRet);
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
     * 敏感词过滤
     * @param text
     * */
    public function check(){
        $text = I('param.text','','trim');
        if(empty($text)){
            $arr = array(
                'success' => false,
                'code'    => ErrorCode::PARMA_ERROR,
                'message' =>ErrorCode::getErrMsg(ErrorCode::PARMA_ERROR),
            );

            $this -> response($arr);
        }
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

        }
        $this->response($arrReturn);
    }

    /**
     * 获取热门话题
     * @return array|mixed
     */
    private function _getHotTopics($page_size=18){
//        $topics_service = new TopicsService();
        $hot_data = $this->topics_service->get_hot_topics(1,$page_size);
        return $hot_data;
    }


    private function _getCategoryGroups($group_info){
        $first_category = $group_info['category']['parent']['id'];
        $second_category = $group_info['category']['id'];
        $cache_k = get_cache_k( 'category_groups',$first_category."-".$second_category );
        $groups = S($cache_k);
        $groups = null;
//        print_r($groups);exixt;
        if(!$groups || !self::OPEN_GROUP_CACHE) {

            $lists = $this->circle_service->get_category_groups($second_category,2);
            // 如果圈子同类别二级分类没有数据，则取一级分类下的圈子
            if(isset($lists['data']['resultList']) && count($lists['data']['resultList']) == 1){
                $lists = $this->circle_service->get_category_groups($first_category);
            }

            $groups = (isset($lists['data']['resultList'])) ? $lists['data']['resultList'] : array();

            $res = S($cache_k,$groups,$this ->categoryGroup_time);
        }
        $g_ids = '';
        foreach ($groups as $g){
            if($g_ids != ''){
                $g_ids .= ',';
            }
            $g_ids .= $g['group']['id'];
        }
        $circle_service = new CircleService();
        $user_join_status = $this->circle_service->ids($g_ids);
//        print_r($user_join_status);exit;
        foreach ($groups as $key=>&$info){
            if($info['group']['id'] == $group_info['id']){
                unset($groups[$key]);
                continue;
            }
            $info['group']['icon'] = getResizeImg($info['group']['icon'],60,60);
            $info['group']['join_status'] = 1;
            foreach ($user_join_status['data']['groups'] as $item){
                if($item['id'] == $info['group']['id']){
                    $info['group']['join_status'] = ($item['maxUsers'] <= $info['group']['memberQuantity'] && $item['status'] == 1 && $this->userInfo['loginStatus'] == 3) ? 1000 : $item['status'] ;//用户加入圈子的状态 0为已加入 1为未加入 2为审核中 1000
                    $info['group']['max_users'] = $item['maxUsers'];
                    break;
                }
            }
        }
        $groups = array_values($groups);
        return $groups;
    }

}
