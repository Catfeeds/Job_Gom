<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 信息技术中心                                                                           |
 * +----------------------------------------------------------------------+
 * | All rights reserved.                                                 |
 * +----------------------------------------------------------------------+
 * | @程序名称：QrcodeController.class.php                                  |
 * +----------------------------------------------------------------------+
 * | @程序功能：                                                                                                                     |
 * +----------------------------------------------------------------------+
 * | Author:liluming <liluming@gomeplus.com>                                |
 * +----------------------------------------------------------------------+
 * | Date:2017-03-30                                     |
 * +----------------------------------------------------------------------+
 */

namespace Activity\Controller;
use Home\Controller\BaseController;

class QrcodeController extends BaseController
{

    /**
     * 生成二维码
     * @param level 二维码容错级别
     * @param size  二维码大小
     * @param url   二维码藏的跳转连接
     */
    public function urlcode(){

        $errorCorrectionLevel = I('param.level/d',0);
        $matrixPointSize = I('param.size/d',3);
        $url = rawurldecode($_GET['url']);

        //来路校验
        if(!isTrustedDomain($url)){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        Vendor('phpqrcode.phpqrcode');

        //生成二维码图片
        $object = new \QRcode();
        $object->png($url, false, $errorCorrectionLevel, $matrixPointSize, 2);
    }
}
