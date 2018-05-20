<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心 |
 * +----------------------------------------------------------------------+
 * | All rights reserved. |
 * +----------------------------------------------------------------------+
 * | @程序名称：PubliserController.class.php |
 * +----------------------------------------------------------------------+
 * | @程序功能：发布话题 |
 * +----------------------------------------------------------------------+
 * | Author: |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;

use Home\Controller\BaseController;
use Common\Lib\CurlHandler;

class PubliserController extends BaseController
{

    public function __construct()
    {
        parent::__construct();
        
        $this->publiser = D("Publiser"); // 默认是V2
        $this->publiser_v1 = D("PubliserV1");
        
        $this->__check_user();
    }

    /*
     * 检查用户登录态
     */
    private function __check_user()
    {
        // JSON
        $_lst = [
            'circle',
            'my_item_collect',
            'add_follow',
            'delete_follow',
            'select_group',
            'create',
            'search_item'
        ];
        if (in_array(ACTION_NAME, $_lst)) {
            // if( empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);
            if($this->userInfo['loginStatus'] !==3 && !$this->userId)
            {
                if(((isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || !empty($_POST[C('VAR_AJAX_SUBMIT')]) || !empty($_GET[C('VAR_AJAX_SUBMIT')]))){
                    $this->outError(\Think\ErrorCode::USER_NO_LOGIN);
                }
                header('location:'.APP_HTTP_GOME.C('GOME')['URL']['LOGIN_URL'].'?orginURI='.curPageURL());
                exit;
            }
        }

        // jump
        /*
         * $_jump_lst = [];
         * if( in_array( ACTION_NAME, $_jump_lst) ) {
         * if( empty( $this->token ) && empty( $this->userId ) ) login_redirect( curPageURL() );
         * }
         */

    }

    /*
     * 创建圈子 api
     */
    public function circle()
    {
        // 群组名称
        $name = I('param.name', '');
        
        // 二级分类ID
        $id = I('param.id', 0);
        
        // 0允许任何人加入 1:需要身份验证 2:不允许任何人加入
        $approval_type = I('param.approval_type', 0);
        
        // 群组最大成员数，默认1000
        $max_users = I('param.max_users', 1000);
        
        // 群简介
        $introduction = I('param.introduction', '');
        
        // 群头像url
        $icon = I('param.icon', '');
        
        if (empty($name))
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        if ($id == '')
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            
            // 名称 过滤敏感词
        sensitive($name);
        
        if (! empty($introduction))
            sensitive($introduction);
        
        $d = array();
        $d['name'] = trim($name);
        $d['category']['id'] = (int) $id;
        $d['approvalType'] = (int) $approval_type;
        $d['maxUsers'] = (int) $max_users;
        $d['introduction'] = $introduction;
        $d['icon'] = $icon;
        
        $lists = $this->publiser->postData($this->publiser->create_circle, $d);
        
        $this->response($lists);
    }

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
     * @param $_POST array 完整JSON
     */
    public function create()
    {
        if (empty($_POST))
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
            // 限制数量
        $limit_nums = 20;
        $good_nums = 9;
        $_P = $_POST;

        if (! empty($_P['name']))
            sensitive($_P['name']);
        
        if (isset($_P['components']) && ! empty($_P['components'])) {
            $images_count = $item_count = 0;
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
        
        $lists = $this->publiser->postData($this->publiser->create_topic, $_P);
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
                    $v['price'] = ($product_price['result']['price']);
                } else {
                    $v['price'] = ($v['price']);
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
}

