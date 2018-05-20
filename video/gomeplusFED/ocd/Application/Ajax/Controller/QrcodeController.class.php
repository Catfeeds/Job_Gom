<?php

namespace Ajax\Controller;

use Ajax\Controller\BaseController;

/**
 * Class Qrcode
 *
 * 二维码接口
 *
 * @author  <lishuai@gomeplus.com>
 * @date    2016-05-25
 * @package Ajax\Controller
 */
class QrcodeController extends BaseController
{
    public function urlcode(){
        Vendor('phpqrcode.phpqrcode');
        $url =  urldecode( $_GET['url']);//二维码地址
        $level=3;$size = 5;
        $errorCorrectionLevel =intval($level) ;//容错级别
        $matrixPointSize = intval($size);//生成图片大小
        //生成二维码图片
        $object = new \QRcode();
        $object->png($url, false, $errorCorrectionLevel, $matrixPointSize, 2);
    }
    
}