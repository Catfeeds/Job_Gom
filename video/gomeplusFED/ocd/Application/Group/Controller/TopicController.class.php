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
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;

class TopicController extends BaseController {


    public function __construct() {
        parent::__construct();

        $this->topic = D( 'Topic' );
        $this->topic_v1 = D( 'TopicV1' );

        //缓存时间
        $this->cachetime = 3600;
    }

    /*
public function upload() {
    if(isset( $_POST['submit'] ) && $_POST['submit']){
        $image_info = getimagesize($_FILES['file']['tmp_name']);//$_FILES['file']['tmp_name']即文件路径
        $base64_image_content = "data:{$image_info['mime']};base64," . chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));

        $delimiter = md5(time());
        $fileFields = array(
            'imageArray' => array(
                'type' => 'image/png',
                'content' => base64_decode(str_replace('data:image/png;base64,', '', $base64_image_content))
            )
        );

        $data = '';
        foreach ($fileFields as $name => $file) {
            $data .= "--" . $delimiter . "\r\n";
            $data .= 'Content-Disposition: form-data; name="' . $name . '";' .' filename="' . $name . '"' . "\r\n";
            $data .= 'Content-Type: ' . $file['type'] . "\r\n";
            $data .= "\r\n";
            $data .= $file['content'] . "\r\n";
        }
        $data .= "--" . $delimiter . "--\r\n";



//            echo $base64_image_content;die;
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){

            $arr = array();
            $arr['boundary'] = $delimiter;
            $arr['content'] = $data;


            $u = D("PubliserV1")->postUploadData(
                D("PubliserV1")->upload_img,
                $arr
            );
            print_r($u);
            exit;
        }
    }
    $this->display( 'Index/upload' );
    }
    */

    /*
     * 话题 全部话题,精选话题
     * @return null
     * */
    public function index() {
        $gid = I( 'param.gid',0);
        $tid = I( 'param.tid',0);


        //获取带会员圈子信息
        $g_m_infos = $this->get_member_infos( $gid );

        $goods_topics = $this->get_topic( $gid, 1, 1, 1 );

        $goods_status = 1;

        if( isset( $goods_topics['data']['topics'] ) && empty( $goods_topics['data']['topics'] ) ) {
            $goods_status = $tid = 0;
        }

        //SEO
        $seo_description = "{$g_m_infos['group']['name']}圈子，共{$g_m_infos['group']['memberQuantity']}位{$g_m_infos['group']['category']['name']}达人，分享了{$g_m_infos['group']['topicQuantity']}个关于{$g_m_infos['group']['category']['name']}相关热门话题.";
        $seoMap = seoMap(
            '',
            array("{{3}}" => $g_m_infos['group']['name'].','.$g_m_infos['group']['name'].'圈子', "{{2}}" => $seo_description, "{{1}}" => $g_m_infos['group']['name'])
        );

        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);

        $this->assign( 'gid', $gid);
        $this->assign( 'goods_status',  $goods_status );
        $this->assign( 'goods_topics', $goods_topics);

        $this->assign( 'group_member_infos', $g_m_infos);
        //如果不存在默认赋值1  表示不存在该圈子
        $this->assign( 'member_type', ( isset($g_m_infos['memberType']) ) ? $g_m_infos['memberType'] : 1  );
        $this->display( empty($tid)  ? 'Index/index' : 'Index/index_goods' );
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
            $data['group']['icon'] = getResizeImg( $data['group']['icon'], 80, 80 );
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

        $data = $this->topic->getData(
            $this->topic->group_infos,
            array(
                'id' => $gid,
                'integrity' => 'full'
            )
        );

        $data = $data['data'];
        //处理圈子信息的图片
        if( !empty($data) ) {
            $data['icon'] = getResizeImg( $data['icon'], 80, 80 );
        }

        //output
        return $data;
    }

    /*
     * 获取话题数据
     * @param strign $group_id 圈子ID
     * @param string $essence_type 是否加精  0:否  1:是
     * @param int    $page_num 页码
     * @return array
     * */
    public function get_topic( $group_id, $essence_type = 0, $page_num = 1, $pagesize = 20 ) {

        if( empty($group_id) ) {
            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
            exit;
        }

        $data = $this->topic->getData(
            $this->topic->topic,
            array(
                'pageNum' => $page_num,
                'pageSize' => $pagesize,
                'essenceType' => $essence_type,
                'groupId' => $group_id
            )
        );

        //圈子不存在
        if( $data && $data['code'] == 404 || $data['code'] == 422 ) {

            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
            exit;
        }

        if( $data && $data['code'] == 403 ) {

            $this->assign( 'title', '抱歉！该圈子审核未通过' );
            $this->assign( 'message', '抱歉！该圈子审核未通过' );
            $this->assign( 'images', '/images/public/404-1.png' );
            $this->display("Public:error_code");
            exit;
        }

        if( $data && $data['code'] == 410 ) {
            $this->assign( 'title', '该圈子已被创建人解散.' );
            $this->display("Public:error_group_dissolve");
            exit;
        }

        return $data;
    }

    /*
     * 批量获取话题详情接口
     * */
    public function get_multi_detail($args) {
        if( empty($args) ) return array();

        import('Common.Lib.EpiCurl');


        $kv_params = [
            'praise_infos' => ['url' => connectParam($this->topic,$this->topic->praised_list, $args['praise_infos'], 2)],
            'hot_topics' => ['url' => connectParam($this->topic,$this->topic->hot_topics, $args['hot_topics'], 2)],
        ];

        $res = multi_curl($kv_params);
        if( !empty($res) ) {
            foreach( $res as $k => &$v ) {
                if( empty($v) ) continue;

                $v = json_decode( $v, true );
            }
        }

        return $res;
    }

    public function del_mem() {
        S( $_GET['k'], null );
        echo "删除缓存成功.";
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
        $tid = I( 'param.tid' );

        //参数集合
        $args = [
            //获取点赞信息
            'praise_infos' => [
                'id' => $tid,//查询点赞的标示
                'type' => 1,//默认店铺,类型 0:店铺 1:话题 2:美店
                'pageNum' => 1,//分页页数 如果是full必传
                'pageSize' => 20,//分页页数 如果是full必传
                'integrity' => 'simple',//集成度
                //'userId' => '123',
            ],
			//热门话题推荐
			'hot_topics' => [
				"pageNum" => 1,
				"pageSize" => 6,
			]
        ];

        $lists = $this->get_multi_detail($args);

		//热门话题推荐
		$hot_topics = ( isset( $lists['hot_topics']['data'] ) ) ? $lists['hot_topics']['data'] : array();

		$hot_data = array();
		if( isset($hot_topics['peas']) && !empty($hot_topics['peas']) ) {
			foreach( $hot_topics['peas'] as $k => $v ) {
				if( isset($v['components']) ) {
					foreach( $v['components'] as $kk => $vv ) {
						if( $vv['type'] == 'image' && !isset( $v['hot_image'] ) ) {
							$v['hot_image'] = getResizeImg($vv['url'], 230, 153);
						}

                        if( $vv['type'] == 'video' && !isset( $v['hot_image'] ) ) {
                            $v['hot_image'] = getResizeImg($vv['coverImage'], 230, 153);
                        }
                        $v['hot_type'] = $vv['type'];
					}

					unset( $v['components'] );
					$v['like']['isLike'] = ( $v['like']['isLike'] ) ? 1 : 0 ;
					$v['like']['is_status'] = ( $v['like']['isLike'] ) ? 0 : 1 ;
                    if( empty($v['hot_image']) ) continue;
					$hot_data[] = $v;
				}
			}
		}

        //获取详情数据
		$data_detail = $this->get_detail( $tid );
		$data = ( isset( $data_detail['data'] ) ) ? $data_detail['data'] : array();

        //错误页面
        $this->detail_error_page( $data_detail['code'] );

        //商品,图片,店铺,优惠卷等内容
		$share_text = $description = '';

        if( isset( $data['components'] ) && !empty( $data['components'] ) ) {
            $content_lists = $data['components'];

            //处理图片缩略图
            $images_lst = array();
            foreach( $content_lists as $k => &$v ) {

                //文本
                if( $v['type'] == 'text' ) {
                    $v['text'] = str_replace( ' ', '&nbsp;', $v['text'] );
//                     $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);
					$share_text = preg_replace( "/\[(.+?)\]/", "" , $v['text'] );
					$share_text = strip_tags( $share_text );
                    $description = msubstr($share_text ,0 , 100, 'utf-8');//给分享使用
					$share_text = msubstr($share_text ,0 , 110, 'utf-8');//给分享使用
                }
                //图片
                if( $v['type'] == 'image' ) {

                    //过滤
                    $v['url'] = strip_tags( $v['url'] );
                    if( !isTrustedDomain( $v['url'] ) ) $v['url'] = '';
                    $images_lst[] = $v['url'];
                }

                //商品
                if( $v['type'] == 'item' ) {
                    $v['item']['mainImage'] =  getResizeImg($v['item']['mainImage'], 230, 230);
                    $images_lst[] = $v['item']['mainImage'];
                }

                //店铺
                if( $v['type'] == 'shop' ) {
                    $v['shop']['icon'] = getResizeImg($v['shop']['icon'], 230, 230);
                    $images_lst[] = $v['shop']['icon'];
                }
            }

            $this->assign( "images_str", implode( '||', $images_lst ) );
        }

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
                "{{1}}" => '/topic/index?gid='.$group_infos['id']
            )
        );

        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => $data['name'], "{{2}}" => $description )
        );


        //获取他人用户信息
        $othermember_info = $this->othermember_info( $data['user']['id'] );

		//处理点赞信息
        $praise_infos = array();
        if( !empty($tid) ) {
            $praise_infos = $lists['praise_infos']['data'];
            $praise_infos['is_status'] = ( $praise_infos['isLike'] ) ? 0 : 1 ;
        }

        $this->assign('share_text', $share_text);//分享使用
        $this->assign('hot_data', $hot_data);//热门话题推荐
        $this->assign('othermember_info', $othermember_info);
        $this->assign('topic_html', $this->detail_infos( $tid ) );//话题详情HTML
        $this->assign('praise_infos', $praise_infos);
        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign( 'infos', $data);
        $this->assign( 'tid', $tid);
        $this->assign( 'group_infos', $group_infos);
        //如果不存在默认赋值1  表示不存在该圈子
        $this->assign( 'member_type', ( isset($group_infos['memberType']) ) ? $group_infos['memberType'] : 1  );
        $this->display( 'Index/topic_detail' );

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
        if( isset( $data['lastReplyTime'] ) && !empty( $data['lastReplyTime'] ) ) $data['lastReplyTime'] = formatTime( $data['lastReplyTime'] );

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
        //$data_detail = S($cache_k);
		$data_detail = null;
        if( !$data_detail ) {
            $data_detail = $this->topic->getData(
                $this->topic->topic_detail,
                array(
                    'id' => $tid,
                    'userId' => $this->userId,
                    'loginToken' => $this->token,
                )
            );
            //$data_detail = xss_clean_recursive($data_detail);
            S($cache_k, $data_detail, $this->cachetime);
            $log['memcache_infos']['status'] = 'do not use memcache';
        } else {
            //检查 未审核话题,不是自己不允许查看
            if( $data_detail['data']['auditState'] == 1 && $this->userId != $data_detail['data']['user']['id'] ) {
				$data_detail['code'] = 404; 
            }
            $log['memcache_infos']['status'] = 'use memcache';
        }
        \Think\Rsyslog::write($log, \Think\Rsyslog::INFO);;

		return $data_detail;
	}

	/*
	 * 话题详情 HTML
	 * 接口+内部方法
	 * @param $topic_id string 话题ID
	 * @return html
	 * */
	public function detail_infos( $topic_id = '' ) {
		$tid = ( !empty( $topic_id ) ) ? $topic_id : I( 'get.tid', '' );

		$_data = $this->get_detail( $tid );
        $data = ( isset( $_data['data'] ) ) ? $_data['data'] : array();

        
		$html = $share_text = '';
		$images_lst = array();
		if( isset( $data['components'] ) && !empty( $data['components'] ) ) {
            $content_lists = $data['components'];

            foreach( $content_lists as $k => &$v ) {
                //文本
                if( $v['type'] == 'text' ) {
                    $v['text'] = str_replace( ' ', '&nbsp;', $v['text'] );
//                     $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);
					$share_text = preg_replace( "/\[(.+?)\]/", "" , $v['text'] );
					$share_text = strip_tags( $share_text );
					$share_text = msubstr($share_text ,0 , 110, 'utf-8');//给分享使用

					$html .=<<<EOF
<div class="topic-content">{$v['text']}</div>
EOF;
                }
                //图片
                if( $v['type'] == 'image' ) {

                    //过滤
                    $v['url'] = strip_tags( $v['url'] );
                    if( !isTrustedDomain( $v['url'] ) ) $v['url'] = '';

                    $imgArr = pathinfo($v['url']);
                    if(isset($imgArr['extension']) && $imgArr['extension'] != "gif"){
                        $v['url'] = getResizeImg($v['url'], 600, 0);
                    }

//                    $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);
                    $images_lst[] = $v['url'];

					$html .=<<<EOF
<div class="topic-content">
	<img src="{$v['url']}" alt="{$data['name']}" />
</div>
<div class="topic-content">{$v['text']}</div>
EOF;
                }

                //商品
                if( $v['type'] == 'item' ) {
                    $imgArr = pathinfo($v['item']['mainImage']);
                    if(isset($imgArr['extension']) && $imgArr['extension'] != "gif"){
                        $v['item']['mainImage'] =  getResizeImg($v['item']['mainImage'], 230, 230);
                    }
//                    $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);
                    $images_lst[] = $v['item']['mainImage'];

					$shopid = isset( $v['shopId'] ) ? $v['shopId'] : $v['item']['shopId'] ;
					$item_url = productDetailUrlGen( $shopid, $v['item']['id'], C('sourceCode')['social_group_topic_detail']);
					$money = convert_price( $v['item']['salePrice'] );

					$fan_html = '';
					if( !empty($v['item']['rebateSummary']['refRebateMoney']) ) {
						$gome_money = convert_price( $v['item']['rebateSummary']['refRebateMoney'] );
						$fan_html =<<<EOF
<div class="pub-row">
	<em class="icon-fan">返</em>
	购买该商品最高可返
	<span class="red">{$gome_money}</span>国美币
</div>
EOF;
					
					}
					$html .=<<<EOF
<div class="publish-item">
	<a target="_blank" href="{$item_url}" class="img-out">
		<img onerror="imgError(this)" src="{$v['item']['mainImage']}" alt="{$v['item']['name']}" title="{$v['item']['name']}">
	</a>
	<div class="publish-cont">
		<h3 class="pub-tl">
			<a target="_blank" href="{$item_url}" title="{$v['item']['name']}">{$v['item']['name']}</a>
		</h3>
		<div class="pub-row">
			<span class="red">￥</span>
			<strong class="money-inf">{$money}</strong>
		</div>
		{$fan_html}	
	<a target="_blank" href="{$item_url}" class="scan-more" title="{$v['item']['name']}">查看详情</a>
	</div>
</div>
<div class="topic-content">{$v['text']}</div>
EOF;
                }

                //店铺
                if( $v['type'] == 'shop' ) {
                    $v['shop']['icon'] = getResizeImg($v['shop']['icon'], 230, 230);
//                    $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);
                    $images_lst[] = $v['shop']['icon'];

					$has_coupon_plan_html = '';
					$shop_url = shopDetailUrlGen( $v['id'],  C('sourceCode')['social_group_topic_detail']);
					if( $v['shop']['promotionMark'][hasCouponPlan] ) {
						$has_coupon_plan_html = '<a href="javascript:;" class="icon-fan">优惠券</a>';	
					}
					$html .=<<<EOF
<div class="publish-item">
	<a href="{$shop_url}" class="img-out">
		<img src="{$v['shop']['icon']}" onerror="imgError(this)" alt="{$v['shop']['name']}" title="{$v['shop']['name']}">
	</a>
	<div class="publish-cont">
		<h3 class="pub-tl">
			<a href="{$shop_url}" title="{$v['shop']['name']}">{$v['shop']['name']}</a>
			{$has_coupon_plan_html}
		</h3>
	<a target="_blank" href="{$shop_url}" class="scan-more" title="{$v['shop']['name']}">进入店铺</a>
	</div>
</div>
EOF;
                }

                //视频
                if( $v['type'] == 'video' ) {
//                    $v['text'] = xss_clean($v['text']);
                    $v['text'] = nl2br($v['text']);

                    $js= [];
                    $js['base']['id'] = $v['id'];

                    $js['config']['title'] = $v['text'];
                    $js['config']['poster'] = $v['coverImage'];
                    $js['config']['autoplay'] = 0;
                    $js['config']['elementID'] = 'videoContainer_'.$v['id'];
                    $jhtml_obj = json_encode( $js );

					$jhtml = '$GLOBAL_CONFIG[\'video_arr\'].push( '.$jhtml_obj.' );';
					$html .=<<<EOF
<div id="topicvideo"></div>
<div  class="videoContainer" style="height:423px" id="videoContainer_{$v['id']}" ></div>
<div class="topic-content">{$v['text']}</div>
<script>
	{$jhtml}	
</script>
EOF;
                }
            }

			//解析表情列表
			$html = $this->string_parse_face( $html );

			if( !empty( $topic_id ) ) {
				//内部调用
				return $html;
			} else {
				//接口使用

				$args = [
					//获取点赞信息
					'praise_infos' => [
						'id' => $tid,//查询点赞的标示
						'type' => 1,//默认店铺,类型 0:店铺 1:话题 2:美店
						'pageNum' => 1,//分页页数 如果是full必传
						'pageSize' => 20,//分页页数 如果是full必传
						'integrity' => 'simple',//集成度
						//'userId' => '123',
					]
				];
				$lists = $this->get_multi_detail($args);
		
				//处理点赞信息
				$praise_infos = array();
				if( !empty($tid) ) {
					$praise_infos = $lists['praise_infos']['data'];
					//$praise_infos['is_status'] = ( $praise_infos['isLike'] ) ? 0 : 1 ;
				}
				$data['ext']['praise'] = $praise_infos;

				$data['html'] = '';
				if( isset( $data['components'] ) ) {
					unset( $data['components'] ); 
					$data['html'] = $html;
				} 

				//处理话题详情基础数据
				$this->parse_detail_base( $data );
				$data['ext']['group_url']= groupDetailUrlGen( $data['group']['id'] );
				$data['ext']['images_lst'] = implode( '||', $images_lst );
				$data['ext']['share_text'] = $share_text;

				$_data['data'] = $data;
				$this->response( $_data );
			}
        }
	}

    /*
     * 获取他人个人主页用户信息
     * */
    public function othermember_info( $memberid ) {
        if( empty($memberid) ) return array();

        $data = $this->topic_v1->getData(
            $this->topic_v1->othermember_info,
            array(
                'memberId' => $memberid,
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
    public function string_parse_face( $content ) {
        if( empty($content) ) return $content;

        $faces = face_lists();
        foreach( $faces as $kk => $vv ) {
			$img = "<img src='{$vv['url']}' class='imoji'/>";
            $content = str_replace( "[{$vv['name']}]", $img, $content );
        }
        return $content;
    }

    /*
     * 发布话题
     * */
    public function publiser () {
        if( empty( $this->userId ) ) {
			header('location:'.APP_HTTP.C('PASSPORT_URL').'login/index?redirect='.base64_encode(curPageURL()));
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

        $crumbs = crumbsMap();
        $this->assign('crumbs', $crumbs);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
        $this->assign('group_infos', $group_infos);
        $this->assign('item_json', $item_json);
        $this->assign('shinePicNum', isset($commentPicNum) ? (9 - $commentPicNum) : 9);
        $this->display( "Index/publiser_topics" );
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
            default:
                $k = '';

        }
        return $k;
    }


}
