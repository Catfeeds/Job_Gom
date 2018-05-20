<?php
/*
 *
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                    |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：IndexController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能： 圈子                                                      |
 * +----------------------------------------------------------------------+
 * | Author:                            |
 * +----------------------------------------------------------------------+
 * | Date:2015-12-30 12:20:59 CST                                         |
 * +----------------------------------------------------------------------+
 */
namespace Group\Controller;
use Home\Controller\BaseController;
use Services\Service\CircleService;
use Common\Lib\Page;
use Common\Lib\Mconn;
class IndexController extends BaseController {

    public function __construct() {

        parent::__construct();
		$this->index = D( "Index" );

        //缓存时间
        $this->cachetime = 3600;

    }

	/*
	 * 圈子首页列表
	 * */
	public function index() {

        $cache_k = $this->_get_cache_k('tj12_cirlce');
		$prevView = I('param.preview','','trim');

		/*
		#CMS URL全路径
        $url = C('CMS_URL').'interface/return-group-commend?is_preview=';//历史接口
        if( isset( $_GET['preview'] ) && $this->checkUrlKey( $_GET['preview'] ) ) {
            $url .= '1';
            $data = json_decode(curl_get( $url ), 1);
        } else {
            $url .= '0';
            if( !S($cache_k) ) {
                $data = json_decode(curl_get( $url ), 1);
                S($cache_k, $data, $this->cachetime);
            } else {
                $data = S($cache_k);
            }
        }
		*/

		$info = S($cache_k);
		S($cache_k,NULL);
		if(!empty($prevView)) {
			$arrDataInfo = $this->index->getData($this->index->common);
			if($arrDataInfo['success']){
				$arrHandleInfo = $this->_sortCircleData($arrDataInfo);
				S($cache_k,$arrHandleInfo,$this->cachetime);	
			}
		}
		else{
			$cacheInfo = S($cache_k);
			if(empty($cacheInfo)) {
				$arrDataInfo = $this->index->getData($this->index->common);
				if($arrDataInfo['success']){
					$arrHandleInfo = $this->_sortCircleData($arrDataInfo);
					S($cache_k,$arrHandleInfo,$this->cachetime);	
				}
			}	
		}
		$arrInfo = S($cache_k);
		$arrHandleInfo = array_slice($arrInfo['data']['groups'],0,6);
        $lists = !empty($arrHandleInfo) ? $arrHandleInfo : array() ;

        $seoMap = seoMap('',array("{{1}}" => "圈子列表" ));
        $this->assign('nav_active', 4);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
		foreach ($lists as &$Item) {
			$count = mb_strlen($Item['category_name']);	
			$length=10-$count;
			$nameCount= mb_strlen($Item['cmsName']);	
			if($nameCount > $length){
				$Item['cmsName'] =mb_substr($Item['cmsName'],0,$length,'utf-8').'...';
			}
		}
        $this->assign( "lists", $lists);
        $this->display( 'Index/group_lists' );
	}

	private function _sortCircleData($arrDataInfo){
		$arrSort = array();
		if($arrDataInfo['success']){
			foreach ($arrDataInfo['data']['groups'] as $Item){
				$sort = intval($Item['sequence']);//排序字段
				array_push($arrSort,$sort);
			}
			array_multisort($arrSort,SORT_DESC,$arrDataInfo['data']['groups'],SORT_ASC);
		}	

		return $arrDataInfo;
	}



    //与cms预览定义验证方式
	private  function checkUrlKey($string){
	    $urlKey = C('ENCRYPT_CMS_KEY');
	    $str = md5($urlKey.date("Ymd"));
	    if( $str === $string ){
	        return true ;
	    }else{
	        return false;
	    }
	}

	/*
	 * 创建圈子
	 * */
	public function create() {

		$circle_service = new CircleService();
		$cat_lists = $circle_service->get_categories();

		$cat_lists = ( isset( $cat_lists ) && !empty( $cat_lists ) ) ? $cat_lists['data'] : array() ;
//		print_r($cat_lists);exit;
        $imgpath = C('STATICPATH.IMG');
        foreach ($cat_lists as &$item){
            $item['icon'] = ( !$item['icon'] ) ? APP_HTTP.$imgpath.'/dist/images/public/circle-default-head.jpg' : $item['icon'];
        }
        //SEO
        $seoMap = seoMap(
            '',
            array("{{1}}" => "创建圈子" )
        );


        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);
		$this->assign( "cat_lists", $cat_lists );
        $this->display( 'Index/create_group' );
	}


    /**
     * 编辑圈子
     */
    public function edit() {
        $groupId = I('param.group_id/s','');
        if(empty($groupId)){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        $circleObj = new CircleService();

        //获取圈子信息
        $result = $circleObj->get_group_info($groupId);
        if( isset($result['code'])  && $result['code'] == 403 ) {

            $this->assign( 'title', '抱歉！该圈子审核未通过' );
            $this->assign( 'flag', '' );
            $this->assign( 'message', '抱歉！该圈子审核未通过' );
            $this->assign( 'images', '/images/public/404.png' );
            $this->display("Public:error_code");
            exit;
        }

        if( isset($result['code'])  && $result['code'] == 410 ) {
            $this->assign( 'title', '抱歉！该圈子已被创建人解散' );
            $this->assign( 'flag', '' );
            $this->assign( 'message', '抱歉！该圈子已被创建人解散' );
            $this->assign( 'images', '/images/public/404.png' );
            $this->display("Public:error_code");
            exit;
        } 

        //获取分类信息
        $categoryList = $circleObj->get_categories();
        $categoryList = !empty($categoryList) ? $categoryList['data'] : [];
		//print_r($cat_lists);exit;

        $imgPath = C('STATICPATH.IMG');
        foreach ($categoryList as &$item){
            $item['icon'] = ( !$item['icon'] ) ? APP_HTTP.$imgPath.'/dist/images/public/circle-default-head.jpg' : $item['icon'];
        }


        //SEO
        $seoMap = seoMap('', ["{{1}}" => "编辑圈子"]);
        $this->assign('title', $seoMap['title']);
        $this->assign('keywords',$seoMap['keywords']);
        $this->assign('description',$seoMap['description']);

        $this->assign( "cat_lists", $categoryList );
        $this->assign( "circleInfo", $result['data'] );
        $this->assign( "gid", $groupId );
        $this->display( 'Index/edit_group' );
    }



    public function get_error() {

        $code = I( 'get.code', '' );
        switch( $code ) {
            case 'group':
                $this->display('Public:error_group_verify');
                break;
            case 'topic':
                $this->display('Public:error_topic_verify');
                break;
			case 'topic_404';
				$this->assign( 'title', '抱歉！该话题已被删除' );
				$this->assign( 'message', '抱歉！该话题已被删除' );
				$this->assign( 'images', '/images/public/404.png' );
				$this->display("Public:error_code");
				break;
			case 'group_dissolve':
				$this->assign( 'title', '该圈子已被创建人解散.' );
				$this->display("Public:error_group_dissolve");
				break;
			case '500':
				$this->assign( 'title', '抱歉！服务器君正在打盹' );
				$this->assign( 'message', '抱歉！服务器君正在打盹' );
				$this->assign( 'images', '/images/public/404.png' );
				$this->display("Public:error_code");
				break;

        }

    }

    /*
     * 获取当前全路径
     * */
    public function _get_cache_k( $value ) {
        if( !empty( $value ) ) $value = '_'.$value;
        return MODULE_NAME.'_'.CONTROLLER_NAME.'_'.ACTION_NAME.$value;
    }


    public function category(){
        $cat_id = I('param.cid', 0, 'intval');
        $page_num = I('param.page_num', 1, 'intval');
        $page_size = 16;
        $category_id = $cat_id % 100000;
        $circle_service = new CircleService();
        $cat_lists = $circle_service->get_categories();
        $cat_lists = isset($cat_lists['data']) ? $cat_lists['data'] : [];

        $groups = $circle_service->get_category_groups( -$category_id ,1 ,$page_num ,$page_size );
        $groups = isset($groups['data']) ? $groups['data'] : [];
        foreach ($cat_lists as &$cat){
            if(abs($cat['id']) == $category_id) {
                $groups['groupQuantity'] = $cat['groupQuantity'];
                $cat['active'] = true;
                break;
            }

        }

        foreach ($groups['resultList'] as $key=>&$info){
            $info['group']['icon'] = getResizeImg($info['group']['icon'],260,260);
        }

        if($groups['groupQuantity'] > $page_size){
            $page = new Page();
            $url = APP_HTTP.C('GROUP_URL').$cat_id ;
            $url_extension = '.html';
            $page->page_show_row = 10;
            $page->page_offset = 2;
            $page->show_more = false;
            $page->show_style = 2;
            $page->delimiter = '-';
            $page->params = ['first_label'=>'首页','last_label'=>'最后一页'];
            $link_url =  $page->display($groups['groupQuantity'],$page_size,$page_num,$url,'',$url_extension);
        }

        $this->assign('page',$link_url);
        $this->assign('cat_lists',$cat_lists);
        $this->assign('groups',$groups);
        $this->display('category_groups');

    }

    /**
    *mongdo数据导入redis
    */
    public function insert(){

        //验证参数，防止恶意调用
        $token = $_GET['token'];
        if($_GET['token'] != 'mongotoredis'){
            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
        }

        $obj = new Mconn();
        $tablename = 'socialExpertDrafts';
        $res = $obj->find($tablename,[],[]);

        //print_r($res);die;
        echo '本次共导入数据：'.count($res)."条,操作时间：".date("Y-m-d H:i:s");
        echo "<br>";
        if($res){

            echo "开始导入<br>";
            $rconn = S([]);
            #$data = $rconn->zrevrange('drafts_list_100037566619',0, -1,true); var_dump($data);die;
            //集合的key
            foreach ($res as $key => $value){
                usleep(5000);
                echo "原数据id为：".current($value['_id'])."====";
                $did = getRandStr();
                $new_did = 'drafts_item_'.$value['userId'].'_'.$did;
                echo "新数据id为：".$new_did."====";

                //移除mongo数据的id
                $tmp = array_splice($value,1,count($value)-1);
                //print_r($tmp);die;

                //插入缓存
                $addRes1 = $rconn->set($new_did,json_encode($tmp),0);
                if($addRes1){
                    echo "插入成功!<br>";
                }else{
                    echo "插入失败!<br>";
                }
                //插入集合
                $set_key = 'drafts_list_'.$tmp['userId'];
                echo "集合key为：".$set_key."<br>";

                $rconn ->zadd($set_key, $tmp['addTime'], $did);

            }
            echo "导入完毕!";
        }else{
            echo '数据为空';
        }
        
    }

    public function deleteDrasfts(){
        //验证参数，防止恶意调用
        $token = $_GET['token'];
        if($_GET['token'] != 'mongotoredis'){
            $this->assign( 'title', '抱歉！服务器君正在打盹' );
            $this->assign( 'message', '抱歉！服务器君正在打盹' );
            $this->assign( 'images', '/images/public/404-2.png' );
            $this->display("Public:error_code");
        }
        $userId = $_GET['userid'];
        $list = explode(',',$userId);
        if(!$list){
            exit;
        }
        $redis = S([]);
        $arr = [];
        foreach ($list as $l){
            $zSetName = 'drafts_list_'.$l;
            $draft = $redis->zrevrange($zSetName,0, 20,true);
            $arr[$l] = $draft;
            foreach ($draft as $key=>$d){
                $redis->zrem($zSetName,$key);
            }
        }
        print_r($arr);
        exit;
    }

    public function jump()
    {
        $this->display('Index/jump');
//        exit;
    }


}
