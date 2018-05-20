<?php
/*
 * cms预览
 * @by maoxiaoqi
 * */

namespace Group\Controller;
use Home\Controller\BaseController;

class PreviewController extends BaseController {

    public function __construct() {
        parent::__construct();

        $this->_channel= D( "Services/Channel" );
        //channel控制器
        $this->_channel_contro = new ChannelController();
    }

    /*
     * 预览入口
     * */
    public function index() {
        $version = ( I( 'param.version' ) ) ? I( 'param.version' ) : die( 'version error' ) ;
        $unique_id = ( I( 'param.unique_id' ) ) ? I( 'param.unique_id' ) : die( 'unique_id error' ) ;
        $data = ( I( 'param.data' ) ) ? I( 'param.data' ) : die( 'data error' ) ;


        $tpl_path = $this->get_class().'/'.$version.'/';
//        $data = $this->_channel->group__topic();
//        $data = $this->_channel->group__banner();
//        $data = $this->_channel->group__hotImage();
//        $data = $this->_channel->group__hotText();
//        $data = $this->_channel->group__groupRecommend();
//        $data = $this->_channel->group__qualityLife();
//        $data = $this->_channel->group__fashionGroup();
//        $data = $this->_channel->group__fashionActivity();
//        $data = $this->_channel->group__liveGroup();
//        $data = $this->_channel->group__liveActivity();
//        $data = $this->_channel->group__videoTopic();
//        $data = $this->_channel->group__videoActivity();
//        $data = $this->_channel->group__strollProduct();

        //对特殊数据单独处理
//        switch( $unique_id ) {
//            case 'groupfashiongroup':
//                break;
//
//        }



        $datalists = 'datalists';
        !isset( $data['slot'] ) && die( 'slot信息不存在' );
        !isset( $data[ $datalists ] ) && die( 'datalists信息不存在' );


        $this->assign( 'slot', ( isset( $data['slot'] ) ) ? $data['slot'] : [] );
        $this->assign( 'datalists', ( isset( $data[ $datalists ] ) ) ? $data[ $datalists ] : [] );
        $content = $this->fetch( $tpl_path.$unique_id );
        echo $content;
    }

    /*
     * 获取类名
     * @return string
     * */
    private function get_class() {
        $arr = explode( '\\', get_class() );

        return ( isset( $arr[2] ) ) ? str_replace( 'Controller', '', $arr[2] ) : '' ;
    }
}
