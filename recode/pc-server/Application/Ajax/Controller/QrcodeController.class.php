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
    //公共方法
    public function urlcode(){
        //来路校验
        //入参校验
        $url =   rawurldecode( $_GET['url'] );//二维码地址
        if( !isTrustedDomain( $url ) ){
            $this->outError(\Think\ErrorCode::PARMA_ERROR);
        }
        Vendor('phpqrcode.phpqrcode');
        $level=0;$size = 3;
        $errorCorrectionLevel =intval($level) ;//容错级别
        $matrixPointSize = intval($size);//生成图片大小
        //生成二维码图片

        //url的query字符串=号后边的值需要编码
        //$urlArr = parse_url($url);
        
       /* if( $urlArr['query'] ){
            $queryArr = explode("&", $urlArr['query']);
            if( $queryArr ){
                foreach ($queryArr as $k => $v) {
                    $temp = explode("=",$v);
                    $queryArr[$temp[0]] = rawurlencode($temp[1]);
                }
                $queryString = http_build_query($queryArr);
                $url = str_replace($urlArr['query'], $queryString, $url);
            }
        }*/

        $object = new \QRcode();
        $object->png($url, false, $errorCorrectionLevel, $matrixPointSize, 2);
    }

    
    
}