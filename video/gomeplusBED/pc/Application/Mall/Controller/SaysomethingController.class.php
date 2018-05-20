<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：SaysomethingController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：美店说                                                      |
 * +----------------------------------------------------------------------+
 * | Author:lishuai                                                              |
 * +----------------------------------------------------------------------+
 * | Date:2017-12-05 14:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Mall\Controller;
use Home\Controller\BaseController;
use Think\ErrorCode;
use Services\Service\CircleService;
use Services\Service\TopicsService;
class SaysomethingController extends BaseController {
    const OPEN_GROUP_CACHE = 1; //默认打开缓存

    public function __construct() {
        parent::__construct();
        $this->circle_service = new CircleService();
        $this->topics_service = new TopicsService();
    }

    //是否显示美店标志位，1：显示，0：不显示，默认0
    private $mshop_flag = 0;

    //美店店铺链接
    private $mshop_url = '';


    //美店说详情页
    public function index(){
        C('HTTP_CACHE_CONTROL','no-cache,no-store');
        $tid = I( 'param.tid' );

        //是否继续加载下一篇话题   1=不继续加载  0=继续
        $no_next = I( 'param.no_next', 1, 'intval');


        //获取详情数据
        $data_detail = $this->get_detail( $tid );

        $data = ( isset( $data_detail['data'] ) ) ? $data_detail['data'] : array();

        //话题封面图url去掉协议
        $data['coverPic'] = !empty($data['coverPic']) ? str_replace(['http:', 'https'], '', $data['coverPic']) : '';

        $circle_name = isset($data['name']) ? $data['name'] : '';

        //公告头部头像
        $mshop_icon = '';
        if( $this->userInfo['loginStatus'] ==3 && $this->userId  ) {
            $mshopData = $this->getMshop($this->userId);
            $mshop_icon = isset($mshopData['icon']) && $mshopData['icon'] ? $mshopData['icon'] : $this->userInfo['ext']['account']['imagePath'];
        }
        $this->assign('mshop_icon',$mshop_icon);
        
        //错误页面
        $this->detail_error_page( $data_detail['code'] );


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


        //面包屑
        $crumbs = crumbsMap(
            array(
                "{{1}}" => '/shop-'.$data['mshop']['id'].'-3.html'
            )
        );
        $crumbs = sprintf($crumbs,htmlspecialchars($circle_name));

        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => $data['name'], "{{2}}" => $description )
        );


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

        $this->assign('share_text', $share_text);//分享使用
        $this->assign('topic_html', $topic_html);
        $this->assign('mshop_info', $mshop_info);
        $this->assign('praise_infos', $data['praise_infos']);
        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('infos', $data);
        $this->assign('tid', $tid);
        $this->assign('no_next', $no_next);//是否继续加载下一篇话题 1=不继续加载  0=继续
        //如果不存在默认赋值1  表示不存在该圈子

        //seo需要有圈子对应的wap地址
        $this->assign( 'mobile_url','//'. C('WAP_URL').'topic-'.$tid.'.html');
        //拼接店铺二维码
        $shopQrCode = getShopQrCode($data['mshop']['id']);
        $this->assign('shopQrCode', $shopQrCode);
        $this->assign( 'member_type', ( isset($group_infos['memberType']) ) ? $group_infos['memberType'] : 1  );
        $this->assign('shopId',$data_detail['mshop']['id']);
        //标明来路
        $this->assign('channel','meidian');


        $this->display('Saysomething/topic_detail');
    }

    /**
     * 根据用户user_id 获取美店信息（开店状态等）
     * @param $user_id
     * @return array
     */
    private function getMshop($user_id) {
        $data = [];
        $shop = D('Mall/ShopV2');
        $result = $shop->getData($shop->shopDetail, ['userId' => $user_id,'integrity'=>'full']);
        if ($result['code'] == 200 && isset($result['data']['id'])) {
            if( !session('mshop_id') || session('mshop_id') != $result['data']['id'] ){
                session('mshop_id',$result['data']['id'] );
            }
            return $result['data'];
        }
        return $data;
    }

    /*
    * 美店详情 HTML
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
        //标题转实体符号，便于在html内容结构中使用|此变量目前只有非富文本图片类型 的html结构 img中的alt会用到
        $temp_name = htmlspecialchars($data['name']);
        $this->face_filter($temp_name);
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
                            $imgInfo = pathinfo($v['url']);
                            $v['url'] = $imgInfo['dirname'] . '/' . $imgInfo['filename'] . '-600!80.'.$imgInfo['extension'];
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
	<img src="{$default_img_url}" alt="{$temp_name}" data-original="{$v['url']}" width="{$width}px" height="{$height}px"/>
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
                    //kid更新
                    $v['kid'] = I('param.kid','') ? I('param.kid','') : $v['kid'] ;
                    //美店对应的门店id
                    $stid = isset($data['mshop']) ? $data['mshop']['trId']  : 0 ;
                    $item_url = productDetailUrlGen($v['shopId'],$v['outProductId'],$v['skuId'],$v['kid'],$stid);
                    //拼接埋码规则,bs上线后需删除此处
                    if(false === strpos($item_url, 'html?')){
                        $item_url .= '?intcmp=sj-sa-'.$tid;
                    }else{
                        $item_url .= '&intcmp=sj-sa-'.$tid;
                    }
                    
                    //$money = convert_price( $v['item']['salePrice'] );

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
                    if(!isset($v['richText'])){

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
        /* $strUl = "";
        if(!empty($arrLables)){
            $strLi = "";
            foreach ($arrLables as $Item) {
                $href = topicTaglUrlGen($Item['id'],$Item['name']);
                $Item['name'] = htmlspecialchars($Item['name']);
                $strLi.="<li data-id='{$Item['id']}'><a  target='_blank' href='{$href}'>{$Item['name']}</a></li>";
            }
            $strUl="<ul class='preview-label clearfix'>{$strLi}</ul>";
        }*/

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
        $code = 200;
        $message = '成功';
        $dataArr = array('pageId'=>$pageId,'qrcodeId'=>$qrcodeId,'teststr'=> S("qrcodeIdMaxNum_".$newcodeKey) ,'num'=>$maxNum);
        $returnArr = output($code, $message, $dataArr);
        $this->ajaxReturn($returnArr);

    }

    /*
     * 对话题详情相关字段进行处理
     * @param &$data array 字段数组
     * @return data
     * */
    public function parse_detail_base( &$data ) {
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

    }

    /*
    * 获取美店说详情聚合数据
    * 美店说详情带缓存
    * @param $tid string 话题ID
    * @return array
    * */
    public function get_detail( $tid ) {

        //缓存 话题详情数据
        $log = array();
        $log['memcache_infos']['tid'] = $tid;
        $cache_k = $this->_get_cache_k( 'detail', $tid);
        $data_detail = S($cache_k);
        if( !$data_detail ) {
            $MshopTopic = D('MshopTopic');
            $data_detail = $MshopTopic->getData(
                $MshopTopic->mshopTopic,
                array(
                    'id' => $tid,
                    'showRichText' => true,
                    'areaCode' => getAddrGome()['cityId'],
                )
            );
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
            $collect = $this->topics_service->topcollect(3, $tid, $data_detail['data']['group']['id']);
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
    private function _handle_share_info($data){
        $share_text = $description = '';
        $images_lst = array();
        if( isset( $data['components'] ) && !empty( $data['components'] ) ) {
            $content_lists = $data['components'];
            //处理图片缩略图
            foreach( $content_lists as $k => &$v ) {

                //文本
                if( $v['type'] == 'text' &&  !$share_text && trim($v['text']) !='' ) {
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
    * 话题详情 错误页面
    * */
    public function detail_error_page( $code ) {

        switch( $code ) {
            case "404": case '410':
            $title = '抱歉！该美店说已被删除';
            $message = '抱歉！该美店说已被删除';
            $images = '/images/public/404.png';
            break;
            case "422";
                $title = '抱歉！服务器君正在打盹';
                $message = '抱歉！服务器君正在打盹';
                $images = '/images/public/500.png';
                break;
            case "403";
                $title = '抱歉！该美店说审核未通过';
                $message = '抱歉！该美店说审核未通过';
                $images = '/images/public/404.png';
                break;
            default:
                $title = $message = $images = '';
                $images = '/images/public/500.png';

        }
        if( $code == 200 ) return ;

        $this->assign( 'title', $title );
        $this->assign( 'message', $message );
        $this->assign( 'images', $images );
        $this->display("Public:error_code");
        exit;
    }



}
