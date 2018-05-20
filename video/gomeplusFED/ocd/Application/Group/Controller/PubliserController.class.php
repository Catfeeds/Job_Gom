<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：PubliserController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：发布话题                                                |
 * +----------------------------------------------------------------------+
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;

class PubliserController extends BaseController {

    public function __construct() {
        parent::__construct();

        $this->publiser = D("Publiser");//默认是V2
        $this->publiser_v1 = D("PubliserV1");

        $this->__check_user();
    }

    /*
     * 检查用户登录态
     * */
    private function __check_user() {

        //JSON
        $_lst= ['circle', 'my_item_collect', 'add_follow', 'delete_follow', 'select_group', 'create', 'search_item'];
        if( in_array( ACTION_NAME, $_lst) ) {
            if( empty( $this->token ) || empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);
        }

        //jump
        /*
        $_jump_lst = [];
        if( in_array( ACTION_NAME, $_jump_lst) ) {
            if( empty( $this->token ) && empty( $this->userId ) ) login_redirect( curPageURL() );
        }
        */

    }

    /*
     * 创建圈子 api
     * */
    public function circle() {
        //群组名称
        $name = I( 'param.name', '' );

        //二级分类ID
        $id = I( 'param.id', 0 );

        //0允许任何人加入 1:需要身份验证 2:不允许任何人加入
        $approval_type = I( 'param.approval_type', 0 );

        //群组最大成员数，默认1000
        $max_users = I( 'param.max_users', 1000 );

        //群简介
        $introduction = I( 'param.introduction', '' );

        //群头像url
        $icon = I( 'param.icon', '' );

        if( empty($name) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);
        if( $id == '' ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        //名称 过滤敏感词
        sensitive( $name );

        if( !empty( $introduction ) ) sensitive( $introduction );

        $d = array();
        $d['name'] = $name;
        $d['category']['id'] = (int)$id;
        $d['approvalType'] = (int)$approval_type;
        $d['maxUsers'] = (int)$max_users;
        $d['introduction'] = $introduction;
        $d['icon'] = $icon;

        $lists = $this->publiser->postData(
            $this->publiser->create_circle,
            $d
        );

        echo $this->response( $lists );
    }

    /*
     * 加关注（需要登录）
     * */
    public function add_follow () {
        $userid = I( 'param.userid', 0 );
        if( empty($userid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        $lists = $this->publiser_v1->getData(
            $this->publiser_v1->add_follow,
            array(
                'imUserId' => $userid,
                'userRole' => 1,
                'loginToken' => $this->token,
            )
        );

        echo $this->response( $lists );
    }

    /*
     * 取消关注
     * */
    public function delete_follow() {

        $userid = I( 'param.userid', 0 );
        if( empty($userid) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        $lists = $this->publiser_v1->getData(
            $this->publiser_v1->delete_follow,
            array(
                'imUserId' => $userid,
                'userRole' => 1,
                'loginToken' => $this->token,
            )
        );

        echo $this->response( $lists );
    }

    /*
     * 表情列表
     * 访问地址:http://pc.meixin.com/group/publiser/faces?url=http://10.69.207.16:8006/dist/images/
     * @param $url string http://10.69.207.16:8006/dist/images/
     * */

    public function faces() {
        $url = I( 'param.url' );
        if( empty( $url ) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);


        $faces_arr = face_lists( $url );

        $this->response( $faces_arr );
    }

    /*
     * 选择圈子
     * */
    public function select_group() {

        $lists = $this->publiser->getData(
            $this->publiser->my_group_tj,
            array(
            )
        );

        //处理数据
        if( isset( $lists['data']['myRelatedGroups'] ) && !empty( $lists['data']['myRelatedGroups'] ) ) {

            foreach( $lists['data']['myRelatedGroups'] as $k => &$v ) {
                foreach( $v as $kk => &$vv ) {
                    $vv['icon'] = getResizeImg( $vv['icon'], 80, 80);
                }
            }
        }

        if( isset( $lists['data']['recommendGroups']['peas'] ) && !empty( $lists['data']['recommendGroups']['peas'] ) ) {
            foreach( $lists['data']['recommendGroups']['peas'] as $k => &$v ) {
                $v['icon'] = getResizeImg( $v['icon'], 80, 80);
            }
        }

        $this->response( $lists );
    }

    /*
     * 创建话题 POST
     * @param $_POST array 完整JSON
     * */
    public function create() {

        if( empty( $_POST ) ) $this->outError(\Think\ErrorCode::PARMA_ERROR);

        $_P = $_POST;

        //对提交的数据进行处理
        if( !empty( $_P['name'] ) ) sensitive( $_P['name'] );

        if( isset( $_P['components'] ) && !empty( $_P['components'] ) ) {
            foreach( $_P['components'] as $k => &$v ) {

                switch( $v['type'] ) {
                    //图片
                    case 'image':

                        //敏感词过滤
                        sensitive( $v['text'] );

                        //URL检查是否是本站
                        if( isset( $v['url'] ) && !empty( $v['url'] ) ) {
                            if( !isTrustedDomain( $v['url'] ) ) {
                                echo json_encode( output( 500, '图片上传失败,请重新上传.', '' ) );
                                exit;
                            }
                        }
                        break;
                    //文本和商品
                    case 'text':  case 'item':

                        sensitive( $v['text'] );
                        $v['text'] = strip_tags($v['text']);
                        $v['text'] = nl2br($v['text']);
                    break;
                }
            }
        }

        $lists = $this->publiser->postData(
            $this->publiser->create_topic,
            $_P
        );

        $this->response( $lists );
    }

    /*
     * 我的收藏
     * @param pagesize int 分页数量
     * @param page int 页码
     * */
    public function my_item_collect() {
        $pagesize = I( 'param.pagesize', 20 );
        $page = I( 'param.page', 1 );

        //获取圈子数据
        $lists = $this->publiser->getData(
            $this->publiser->my_item_collect,
            array(
                'userId' => $this->userId,
                'pageNum' => $page,
                'pageSize' => $pagesize,
            )
        );

        //头像缩略图
        if( !empty($lists) && isset($lists['data']['collections']) ) {
            foreach( $lists['data']['collections'] as $k => &$v ) {

                $v['item']['originalPrice'] = convert_price( $v['item']['originalPrice'] );
                $v['item']['price'] = convert_price( $v['item']['price'] );
                $v['item']['salePrice'] = convert_price( $v['item']['salePrice'] );

                $v['item']['mainImage'] = getResizeImg($v['item']['mainImage'], 230, 230);
            }
        }

        $this->response( $lists );
    }

    /*
     * 搜索商品
     * @param pagesize int 每页的数量
     * @param page int 页码
     * @param q string 关键字
     * @param sort_type int //(买家)排序条件（默认：0，新品:6，价格:9, 销量:10）（卖家）排序条件（佣金：5，销量:2，价格:1）
     * @param order int 1升序2降序(默认)
     * */
    public function search_item(){
        //参数
        $pagesize = I( 'param.pagesize', 20 );
        $page = I( 'param.page', 1 );
        $q = urlencode( I( 'param.q', '' ) );
        $sort_type = I( 'param.sort_type', 0 );
        $order = I( 'param.order', 2 );

        if( empty($q) ) {
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }

        //请求数据
        $lists = $this->publiser_v1->getData(
            $this->publiser_v1->search_item,
            array(
                'numPerPage' => $pagesize,//每页的数量
                'pageNum' => $page,//第几页
                'researchWord' => $q,//关键字（两个字符及以上）
                'sortType' => $sort_type,//(买家)排序条件（默认：0，新品:6，价格:9, 销量:10）（卖家）排序条件（佣金：5，销量:2，价格:1）
                'order' => $order,//1升序2降序(默认)
            )
        );

        //缩略图
        if( !empty($lists) && isset($lists['data']['catalogResultList']) ) {
            foreach( $lists['data']['catalogResultList'] as $k => &$v ) {
                $v['image'] = getResizeImg($v['image'], 230, 230);
            }
        }


        //输出
        $this->response( $lists );
    }

}