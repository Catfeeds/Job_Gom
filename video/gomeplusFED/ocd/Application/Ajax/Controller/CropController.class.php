<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

/**
 * Class CropController
 *
 * 头像裁图接口
 *
 * @date    2016-07-28
 * @package Ajax\Controller
 */
class CropController extends BaseController
{
	public function __CONSTRUCT()
	{
		parent::__construct();
        if( empty( $this->token ) || empty( $this->userId ) ) $this->outError(\Think\ErrorCode::USER_NO_LOGIN);

        $this->cropServ = D("Crop");
	}
	
    /*
     * 头像裁图
     * @param $avatar_src string 源地址
     * @param $avatar_data josn 裁图位置 x,y,height,width
     * @param $_FILES array 图片信息
     * @return josn
     * */
    public function crop_img()
	{
        $files_name = 'avatar_file';

        //上传截图
        if( $_POST['type'] == 'crop' ) {
            $avatar_data = array();
            $avatar_data['x'] = $_POST['x'];
            $avatar_data['y'] = $_POST['y'];
            $avatar_data['height'] = $_POST['height'];
            $avatar_data['width'] = $_POST['width'];
            $avatar_data['rotate'] = $_POST['rotate'];

            $avatar_data_str = json_encode( $avatar_data );

            $crop = new \Common\Lib\CropImg( $_POST['avatar_src'], $avatar_data_str, $_FILES[$files_name] );
            $crop->post( $this->cropServ, $this->cropServ->upload_img  );

            $result = ( is_array( $crop->getResult() ) ) ? $crop->getResult() : array() ;
            echo $this->response( $result );
            exit;
        }

        //上传原图
        $size = $_FILES[$files_name]['size'];
        if(!empty($_FILES[$files_name]['tmp_name'])) {

            $filePath = $_FILES[$files_name]['tmp_name'];
            $data = array('size'=>$size,'imageArray'=>'@'.$filePath);
            if(version_compare(PHP_VERSION,'5.5.0','>')) {

                //PHP 版本大于5.5.0 文件上传使用CURLFile类
                $data['imageArray'] = new \CURLFile($filePath);
            }

            $result = $this->cropServ->postData(
                $this->cropServ->upload_img,
                $data
            );
            $this->response( $result );
            exit;
        } else {
            $this->outError(\Think\ErrorCode::UPLOAD_ERROR);
        }

    }
}