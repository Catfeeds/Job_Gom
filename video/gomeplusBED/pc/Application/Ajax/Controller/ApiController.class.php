<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：apiController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：话题接口                                                |
 * +----------------------------------------------------------------------+
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Ajax\Controller;
use Home\Controller\BaseController;

class ApiController extends BaseController {

    public function __construct() {
        parent::__construct();

        $this->api = D("Group/Api");//默认是V2
        $this->group  = D('Group/Group');
        $this->praise = D('Group/Praise');
        $this->search  = D('Group/Search');
    }

    /*
     * 下一篇话题
     * @param get.topicid 话题ID
     * @return json
     * */
    public function next_topic() {
        $topicid = xss_clean( I( 'get.topicid', '' ) );
        if( empty($topicid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        $data = $this->api->getData(
            $this->api->next_topic,
            array(
                'topicId' => $topicid
            )
        );

        if( isset( $data['data'] ) && isset( $data['data']['id'] ) ) {
            $_GET['tid'] = $data['data']['id'];
            unset($data);
            $data = A( 'Topic' )->detail_infos();
        }
		//下面是模拟数据宫前端测试调用
        $this->response( $data );
    }

    /*
     * 圈子推荐广场
     * */
    public function recommend() {
        $page = I( 'get.page', 1 );
        $pagesize = I( 'get.pagesize', 20 );
        $metaid = I( 'get.metaid', 41 );

        $data = $this->api->getData(
            $this->api->recommend,
            array(
                'pageSize' => $pagesize,
                'pageNum' => $page,
                'metaId' => $metaid //推荐位ID
            )
        );

		//处理数据
        if( isset( $data['data']['peas'] ) && !empty( $data['data']['peas'] ) ) {
            foreach( $data['data']['peas'] as $k => &$v ) {
			    //裁图
			    $v['icon'] = getResizeImg( $v['icon'], 120, 120);
            }
        }


        $this->response( $data );
    }

    /*
     * 分类集合接口
     * */
    public function categories() {

        $data = $this->api->getData(
            $this->api->categories,
            array(
            )
        );

        $this->response( $data );
    }

    /*
     * 搜索分类圈子相关列表
     * */
    public function group_lists() {
        $categoryid = I( 'get.categoryid', '' );
        $type = I( 'get.type', 1 );
        $page = I( 'get.page', 1 );
        $pagesize = I( 'get.pagesize', 20 );

        $data = $this->api->getData(
            $this->api->group_lists,
            array(
                'categoryId' => $categoryid,
                'type' => $type,
                'pageNum' => $page,
                'pageSize' => $pagesize,
            )
        );

        //处理数据
        if( isset( $data['data']['resultList'] ) && !empty( $data['data']['resultList'] ) ) {
            foreach( $data['data']['resultList'] as $k => &$v ) {

                //裁图
                $v['group']['icon'] = getResizeImg( $v['group']['icon'], 100, 100);
            }
        }

        $this->response( $data );
    }

    /*
     * 解析表情
     * @param $content string 字符串
     * */
    public function parse_face( $content ) {
        if( empty($content) ) return $content;

        $faces = face_lists();
        foreach( $faces as $kk => $vv ) {
            $img = "<img src='{$vv['url']}' style='height:32px;width:32px;vertical-align:middle;'/>";
            $content = str_replace( "[{$vv['name']}]", $img, $content );
        }

        return $content;

    }

    /*
     * 用户主动加入群
     * */
    public function circle() {
        $param['groupId'] = I('post.groupid', '', 'string');//圈子id
        $param['activityId'] = I('post.activityid', '', 'string');//圈子活动id

        $data = $this->group->postData(
            $this->group->group_circle_add,
            $param
        );
//        $group_info = A( 'Topic' )->get_member_infos($param['groupId']);
//         print_r($group_info);exit;
        $this->response( $data );
    }

    /*
     * 用户退出圈子
     * */
    public function quit_circle(){
        $param['id'] = I('param.groupid', '', 'string');//圈子id
        
        $data = $this->group->postData(
            $this->group->member_quit,
            $param
            );
        
        $this->response( $data );
    }
    /*
     * 圈子搜索更多
     * */
    public function search_more() {
        //关键字
        $keyword = urldecode(I( 'param.keyword', 0 ));
        //页码 默认第一页
        $page = I( 'param.page', 1, 'intval');
        //每页显示  默认20
        $pagesize = I( 'param.pagesize', 20, 'intval' );

        if( empty($keyword) ) {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }

        //获取圈子数据
        $lists = $this->search->getData(
            $this->search->search_group,
            array(
                'keyword' => $keyword,
                'pageNum' => $page,
                'pageSize' => $pagesize,
            )
        );

        //头像缩略图
        if( isset( $lists['data']['groups'] ) ) {
            foreach( $lists['data']['groups'] as $k => &$v ) {
                $v['icon'] = getResizeImg($v['icon'], 80, 80);
            }
        }

        $this->response( $lists );
    }

    /*
     * 更多话题
     * */
    public function topic_more() {
        $gid          = I( 'param.gid',0);
        $pagesize     = I( 'param.pagesize',0);
        //是否加精 0全部  1加精
        $essence_type = I( 'param.type',0);
        $page         = I( 'param.page',1);

        if( empty($gid) ) {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }

        $data = $this->get_topic_list( $gid, $essence_type, $page, $pagesize );

        //处理话题数据
        if( isset( $data['data']['topics'] ) ) {
            $data['data']['topics'] = $this->parse_components( $data['data']['topics'] );
        }


        if( isset( $data['data']['topTopics'] ) ) {
            $data['data']['topTopics'] = $this->parse_components( $data['data']['topTopics'] );
        }

        if( isset( $data['data']['topics'] ) && empty( $data['data']['topics'] ) && empty($data['data']['topTopics']) ) {
            $data['data'] = (object)array();
        }

        $this->response( $data );
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
                $v['user']['facePicUrl'] = getResizeImg( $v['user']['facePicUrl'], 16, 16 );
            }

            $images_lst = array();
            if( $v['components'] ) {
                foreach( $v['components'] as $kk =>$vv ) {
                    //商品 - 钱进行转换
                    if( $vv['type'] == 'item' ) {
                        $vv['item']['originalPrice'] = convert_price( $vv['item']['originalPrice'] );
                        $vv['item']['price'] = convert_price( $vv['item']['price'] );
                        $vv['item']['salePrice'] = convert_price( $vv['item']['salePrice'] );
                    }

                    //text
                    if( $vv['type'] == 'text' ) {
//                            $vv['text'] = xss_clean( $vv['text'] );
                               $vv['text'] = trim( $vv['text'] );
                    }

                    //components images 图片转换
                    if( $vv['type'] == 'image' ) {
                        $vv['url'] = getResizeImg( $vv['url'], 230, 0);

                        //过滤
                        $vv['url'] = strip_tags( $vv['url'] );
                        if( !isTrustedDomain( $vv['url'] ) ) $vv['url'] = '';

                        if(pathinfo($vv['url'], PATHINFO_EXTENSION) == "gif"){
                            $vv['url'] = str_replace(".gif", ".jpg", $vv['url']);
                        }
                        $images_lst[] = $vv['url'];
                    }

                    //components item 图片转换
                    if( $vv['type'] == 'item' ) {
                        $vv['item']['mainImage'] = getResizeImg( $vv['item']['mainImage'], 230, 0);
                        if(pathinfo($vv['item']['mainImage'], PATHINFO_EXTENSION) == "gif"){
                            $vv['item']['mainImage'] = str_replace(".gif", ".jpg", $vv['item']['mainImage']);
                        }
                        $images_lst[] = $vv['item'];
                    }

                    //components shop 图片转换
                    if( $vv['type'] == 'shop' ) {
                        $vv['shop']['icon'] = getResizeImg( $vv['shop']['icon'], 230, 0);
                        if(pathinfo($vv['shop']['icon'], PATHINFO_EXTENSION) == "gif"){
                            $vv['shop']['icon'] = str_replace(".gif", ".jpg", $vv['shop']['icon']);
                        }
                        $images_lst[] = $vv['shop']['icon'];
                    }



                    if( !isset($v['new_components'][$vv['type']]) ) {
                        $v['new_components'][$vv['type']] = $vv;
                    }

                    unset( $v['components'] );
                }
            } else {
                $v['new_components'] = array();
            }

            //统计图片数量
            $v['image_number'] = ( !empty( $images_lst ) ) ? count( $images_lst ) : 0 ;

            //最后回复时间
            if( $v['lastReplyTime'] ) $v['time_str'] = formatDateTime( $v['lastReplyTime'] );
        }

        return $topics;
    }

    /*
     * 获取话题列表 
     * @param string gid 圈子ID
     * @param string $essence_type 是否加精 查看精品话题标识 ：1；查看所有话题 ：0 
	 * @param int $page 页码
	 * @param int $pagesize 每页页数
     * @param string loginToken 登录token
     * */
    public function get_topic_list( $gid, $essence_type = 0, $page = 1, $pagesize=20 ) {
        if( empty($gid) ) {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }


        $data = $this->api->getData(
            $this->api->topic,
            array(
                'pageNum' => $page,
                'pageSize' => $pagesize,
                'essenceType' => $essence_type,
                'groupId' => $gid
            )
        );

        return $data;
    }

    /*********************************************下面 V2接口*********************************************************/

    /*
     * V2话题评论列表
     * @param
     * */
    public function mshop_reply_list_v2() {

        $page = I( 'param.page', 1 );//页码
        $pagesize = I( 'param.pagesize', 20 );//每页数量
        $topicid = I( 'param.topicid', 0 );//话题ID

        if( empty($topicid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);
        $userid = $this->userId;

        //获取
        $lists = $this->api->getData(
            $this->api->mshop_reply,
            array(
                'pageNum' => $page,
                'pageSize' => $pagesize,
                'userId' => $userid,
                'topicId' => $topicid,
                'areaCode' => getAddrGome()['cityId']
            )
        );

        if( !empty($lists) && isset($lists['data']['topicReplys']) ) {
            //解析
            foreach( $lists['data']['topicReplys'] as $k => &$v ) {
				if(!empty($v['pics'])) {
					foreach ($v['pics'] as &$Item) {
						$Item = getResizeImg($Item,120,120);	
					}	
				}
				if(isset($v['item']['mainImage'])){
				    $v['item']['mainImage'] = getResizeImg($v['item']['mainImage'],100,100);
				}
				if(isset($v['shop'])){
					$v['shop']['icon'] = isset($v['shop']['icon']) ? getResizeImg($v['shop']['icon'],100,100) : '';
				}

                //替换缩略图
                if( isset( $v['user']['facePicUrl'] ) && !empty( $v['user']['facePicUrl'] ) ) {
                    $v['user']['facePicUrl'] = getResizeImg($v['user']['facePicUrl'], 60, 60);
                }

                //分转换

                if( isset( $v['item']['salePrice'] ) ) {
                    $v['item']['salePrice'] = ( $v['item']['salePrice'] ) ? convert_price( $v['item']['salePrice'] ) : null;
                }


                //分转换
                if( isset( $v['item']['price'] ) && !empty( $v['item']['price'] ) ) {
                    $v['item']['price'] = convert_price( $v['item']['price'] );
                }

                if( isset( $v['item']['skuHighestPrice'] ) && !empty( $v['item']['skuHighestPrice'] ) ) {
                    $v['item']['skuHighestPrice'] = convert_price( $v['item']['skuHighestPrice'] );
                }

                if( isset( $v['item']['skuHighestSalePrice'] ) && !empty( $v['item']['skuHighestSalePrice'] ) ) {
                    $v['item']['skuHighestSalePrice'] = convert_price( $v['item']['skuHighestSalePrice'] );
                }

                //替换二级回复列表
                foreach( $v['topicSubReplys'] as $kk => &$vv ) {
                    //头像
                    if( isset( $vv['user']['facePicUrl'] ) && !empty( $vv['user']['facePicUrl'] ) ) {
                        $vv['user']['facePicUrl'] = getResizeImg($vv['user']['facePicUrl'],60,60);
                    }

                    if( isset( $vv['topicSubReplyUser']['facePicUrl'] ) && !empty( $vv['topicSubReplyUser']['facePicUrl'] ) ) {
                        $vv['topicSubReplyUser']['facePicUrl'] = getResizeImg($vv['topicSubReplyUser']['facePicUrl'], 100, 100);
                    }

                }
            }
        }

        $this->response( $lists );
    }

    /*
    * V2话题评论列表
    * @param
    * */
    public function reply_list_v2() {
        $page = I( 'param.page', 1 );//页码
        $pagesize = I( 'param.pagesize', 10 );//每页数量
        $topicid = I( 'param.topicid', 0 );//话题ID

        if( empty($topicid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);
        $userid = $this->userId;

        //获取
        $lists = $this->api->getData(
            $this->api->topic_reply,
            array(
                'pageNum' => $page,
                'pageSize' => $pagesize,
                'userId' => $userid,
                'topicId' => $topicid,
                'areaCode' => getAddrGome()['cityId']
            )
        );

        if( !empty($lists) && isset($lists['data']['topicReplys']) ) {
            //解析
            foreach( $lists['data']['topicReplys'] as $k => &$v ) {
                //回复本身图片
                if(!empty($v['pictures'])) {
                    foreach ($v['pictures'] as $item) {
                        $v['pics'][] = getResizeImg($item['url'],120,120);
                    }
                }

                //回复里商品图片+商品价格
                if(isset($v['item']['mainImage'])){
                    $v['item']['mainImage'] = getResizeImg($v['item']['mainImage'],100,100);
                }
                if( isset( $v['item']['salePrice'] ) ) {
                    $v['item']['salePrice'] = ( $v['item']['salePrice'] ) ? convert_price( $v['item']['salePrice'] ) : null;
                }

                //回复里店铺icon
                if(isset($v['shop'])){
                    $v['shop']['icon'] = isset($v['shop']['icon']) ? getResizeImg($v['shop']['icon'],100,100) : '';
                }

                //回复的用户头像
                if( isset( $v['user']['facePicUrl'] ) && !empty( $v['user']['facePicUrl'] ) ) {
                    $v['user']['facePicUrl'] = getResizeImg($v['user']['facePicUrl'], 60, 60);
                }

                //处理二级回复列表的用户头像
                if( isset($v['topicSubReplys']) ) {
                    foreach( $v['topicSubReplys'] as $kk => &$vv ) {
                        if( isset( $vv['user']['facePicUrl'] ) && !empty( $vv['user']['facePicUrl'] ) ) {
                            $vv['user']['facePicUrl'] = getResizeImg($vv['user']['facePicUrl'],60,60);
                        }

                        if( isset( $vv['topicSubReplyUser']['facePicUrl'] ) && !empty( $vv['topicSubReplyUser']['facePicUrl'] ) ) {
                            $vv['topicSubReplyUser']['facePicUrl'] = getResizeImg($vv['topicSubReplyUser']['facePicUrl'], 100, 100);
                        }
                        unset($vv);
                    }
                }
                unset($v);
            }
        }

        $this->response( $lists );
    }

        /*
     * 二级评论列表
     * @param
     * */
    public function second_reply_list_v2() {
        //页码
        $page = I( 'param.page', 1 );

        //每页数量
        $pagesize = I( 'param.pagesize', 20 );

        //一级评论ID
        $topic_replyid = I( 'param.topic_replyid', 0 );

        if( empty($topic_replyid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        //获取
        $lists = $this->api->getData(
            $this->api->topic_second_reply,
            array(
                'pageNum' => $page,
                'pageSize' => $pagesize,
                'topicReplyId' => $topic_replyid
            )
        );

        $this->response( $lists );
    }

    private function formatImgUrl($imgUrl){
        $imgArr = pathinfo($imgUrl);
        if(isset($imgArr['extension']) && $imgArr['extension'] == "gif"){
            $imgUrl = str_replace("gif", "jpg", $imgUrl);
        }
        return $imgUrl;
    }

    /**
     * 增加话题浏览量
     */
    public function otherMissing() {
        $topicid = xss_clean( I( 'get.topicid', '', 'strval') );
        if( empty($topicid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        $this->api->publicParamv2['id'] = $topicid;
        $data = $this->api->putData(
            $this->api->topicPageview,
            (object)array()
        );

        $this->response( $data );
    }
}
