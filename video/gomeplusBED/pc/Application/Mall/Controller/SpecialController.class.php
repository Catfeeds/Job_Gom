<?php
/*
 * 专题模板
 *
 * @author maoxiaoqi
 **/

namespace Mall\Controller;
use Home\Controller\BaseController;

import('Common.Lib.EpiCurl');

class SpecialController extends BaseController {

    public function __construct() {
        parent::__construct();

        $this->spacial = D( 'Spacial' );
    }

    /*
     * 专题首页
     *
     * @return tpl
     * */
    public function index() {
        //获取数据
        $data = $this->get_data();
        $model2 = isset( $data['model2']['data'] ) ? $data['model2']['data'] : [] ;
        $model1 = isset( $data['model1']['data'] ) ? $data['model1']['data'] : [] ;

        //banner 取第一张图片
        $banner = isset( $model2['banner']['peas'][0] ) ? $model2['banner']['peas'][0] : 0 ;

        //页面信息 js _page_id
        $page_id = ( isset( $model2['banner']['subTitle'] ) ) ? $model2['banner']['subTitle'] : '' ;

        //专题title
        $main_title= ( isset( $model2['banner']['mainTitle'] ) ) ? $model2['banner']['mainTitle'] : '' ;

        //设置活动ID
        $this->setActiveNo( ( isset( $banner['activityId'] ) ) ? $banner['activityId'] : 0 );

        //右侧导航
        $right_nav = isset( $model2['top'] ) ? $model2['top'] : [] ;

        //主题数据
        $lists = $this->get_lists( $model1 );
        $lists = $this->get_lists( $model2, $lists );
		$arrInfo     = $this->_handleData($lists,$chunk=3,$key="picture-1Row3Column-left",$bol=true);
		$arrData     = $this->_handleData($lists,$chunk=4,$key="picture-2Row4Column",$bol=true);
		$arrRightData= $this->_handleData($lists,$chunk=3,$key="picture-1Row3Column-right",$bol=false);
        $active_no = session('active_no') ? session('active_no') : '';
        $this->assign('title', $main_title);
        $this->assign('page_id',$page_id);
        $this->assign('active_no',$active_no);
        $this->assign('active_id',session('active_id'));

        $this->assign( 'sourceCode', '');
        $this->assign( 'lists', $lists );
        $this->assign( 'banner', $banner );
        $this->assign( 'right_nav', $right_nav );
		$this->assign('info',$arrInfo);
		$this->assign('arrdata',$arrData);
		$this->assign('rightData',$arrRightData);
        $this->display();
    }

    /*
     * 获取列表
     *
     * @param $model [] BS数据
     * @param $lists [] 合并列表
     * @return []
     * */
    public function get_lists( $model, $lists = [] ) {

        //处理数据
        foreach( $model as $k => $v ) {
            if( !isset( $v['subject'] ) || empty( $v['subject'] ) ) continue;

            //获取子导航和数据
            $nav = [];
            foreach( $v['subject']['peas'] as $kp => $vp ) {
                if( !isset( $vp['itemType'] ) || empty( $vp['itemType'] )) continue;

                $nav[ $vp['itemType'] ]['bg'] = $vp['typeBackgroudColor'];
                $nav[ $vp['itemType'] ]['main_title'] = $v['subject']['mainTitle'];
                $nav[ $vp['itemType'] ]['font_color'] = $vp['fontColor'];
                $nav[ $vp['itemType'] ]['move_oncolor'] = $vp['moveOnColor'];
                $nav[ $vp['itemType'] ]['nav_id'] = rand(0,999);
                $nav[ $vp['itemType'] ]['data'][] = $vp;
            }

            //给一维赋值
            $v[ 'name'] = $k;
            $v[ 'nav' ] = $nav;
            $lists[ $v['subject']['subTitle'] ] = $v;
        }

        return $lists;
    }

    /*
     * 获取专题数据
     *
     * @param $args [] 参数
     * @return []
     * */
    public function get_data( $args = [] ) {
        $kv_params = [
            'model1' => ['url' => connectParam($this->spacial, $this->spacial->model1, '', 2)],
            'model2' => ['url' => connectParam($this->spacial, $this->spacial->model2, '', 2)],
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

   /*
     * 
     * 处理栏目数据通用
     * @param $lists  $index
     * @return []
     * */
	private function  _handleData($lists,$chunk,$index,$bol){
		$arrData = array();
		$arrReturn = array();
		foreach ($lists as  $key => $Item) {
			if($Item['name'] === $index) {
				$arrData = $Item;
			}
		}
		unset($lists);
		$arrTemp = $arrData['subject']['peas'];
		$arrInfo = array_chunk($arrTemp,$chunk,true);

		foreach ($arrInfo as &$value) {
			if($bol){
				$first = current($value);
				array_shift($value);
			}
			else{
				$first=end($value);	
				array_pop($value);
			}
			$arrReturn[] = array(
						"first"	 => $first,
						"end"    => $value,
					);
		}
		return $arrReturn;
	}
}
