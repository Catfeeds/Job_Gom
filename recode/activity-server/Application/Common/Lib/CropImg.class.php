<?php
/*
* +----------------------------------------------------------------------+
* | Copyright (c) 美信 - 信息技术中心                                      |
* +----------------------------------------------------------------------+
* | All rights reserved.                                                 |
* +----------------------------------------------------------------------+
* | @程序名称：ProductController.class1.php                                      |
* +----------------------------------------------------------------------+
* | @程序功能：裁图                                                |
* +----------------------------------------------------------------------+
* | Author:                                |
* +----------------------------------------------------------------------+
* | Date: 2016/5/25 18:18                                                |
* +----------------------------------------------------------------------+
*/

//$crop = new \Common\Lib\CropImg( $_POST['avatar_src'], $_POST['avatar_data'], $_FILES['avatar_file'] );
//$crop->post( object, 'https://api.bs.test.gomeplus.com/api/ul/upload_img.json' );
//echo $crop->getResult();

namespace Common\Lib;

class CropImg {

    private $src;
    private $data;
    private $tmp;
    private $upload_result;
    private $type;
    private $extension;
    private $msg;

    /*
     *
     * @param $src
     * @param $data json x,y,height,width JSON值
     * @param $file $_FILES
     * @return
     * */
    function __construct($src, $data, $file) {
        $this->setSrc($src);
        $this->setData($data);
        $this->setFile($file);
        $this->crop($this->src, $this->data);
    }

    private function setSrc($src) {
        if (!empty($src)) {
            $type = $this->exif_imagetype($src);

            if ($type) {
                $this->src = $src;
                $this->type = $type;
                $this->extension = image_type_to_extension($type);
            }
        }
    }

    private function exif_imagetype($filename) {
        if ((list($width, $height, $type, $attr) = getimagesize($filename)) !== false) {
            return $type;
        }
        return false;
    }


    private function setData($data) {
        if (!empty($data)) {
            $this->data = json_decode(stripslashes($data));
        }
    }

    private function setFile($file) {
        $errorCode = $file['error'];

        if ($errorCode === UPLOAD_ERR_OK) {
            $type = $this->exif_imagetype($file['tmp_name']);

            if ($type) {
                $extension = image_type_to_extension($type);

                if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_JPEG || $type == IMAGETYPE_PNG) {

                    $this->src = $file['tmp_name'];
                    $this->type = $type;
                    $this->extension = $extension;
                } else {
                    $this->msg = '允许上传图片类型: JPG, PNG, GIF';
                }
            } else {
                $this->msg = '请上传图片';
            }
        } else {
            $this->msg = $this->codeToMessage($errorCode);
        }
    }

    private function crop($src, $data) {
        ini_set('gd.jpeg_ignore_warning', 1);
        if (!empty($src)  && !empty($data)) {
            switch ($this->type) {
                case IMAGETYPE_GIF:
                    $src_img = imagecreatefromgif($src);
                    break;

                case IMAGETYPE_JPEG:
                    $src_img = imagecreatefromjpeg($src);
                    break;

                case IMAGETYPE_PNG:
                    $src_img = imagecreatefrompng($src);
                    break;
            }

            if (!$src_img) {
                $this->msg = "Failed to read the image file";
                return;
            }

            $size = getimagesize($src);
            $size_w = $size[0]; // natural width
            $size_h = $size[1]; // natural height

            $src_img_w = $size_w;
            $src_img_h = $size_h;

            $degrees = $data->rotate;

            // Rotate the source image
            if (is_numeric($degrees) && $degrees != 0) {
                // PHP's degrees is opposite to CSS's degrees
                $new_img = imagerotate($src_img, -$degrees, imagecolorallocatealpha($src_img, 0, 0, 0, 127));

                imagedestroy($src_img);
                $src_img = $new_img;

                $deg = abs($degrees) % 180;
                $arc = ($deg > 90 ? (180 - $deg) : $deg) * M_PI / 180;

                $src_img_w = $size_w * cos($arc) + $size_h * sin($arc);
                $src_img_h = $size_w * sin($arc) + $size_h * cos($arc);

                // Fix rotated image miss 1px issue when degrees < 0
                $src_img_w -= 1;
                $src_img_h -= 1;
            }

            $tmp_img_w = $data->width;
            $tmp_img_h = $data->height;
            $dst_img_w = 220;
            $dst_img_h = 220;

            $src_x = $data->x;
            $src_y = $data->y;

            if ($src_x <= -$tmp_img_w || $src_x > $src_img_w) {
                $src_x = $src_w = $dst_x = $dst_w = 0;
            } else if ($src_x <= 0) {
                $dst_x = -$src_x;
                $src_x = 0;
                $src_w = $dst_w = min($src_img_w, $tmp_img_w + $src_x);
            } else if ($src_x <= $src_img_w) {
                $dst_x = 0;
                $src_w = $dst_w = min($tmp_img_w, $src_img_w - $src_x);
            }

            if ($src_w <= 0 || $src_y <= -$tmp_img_h || $src_y > $src_img_h) {
                $src_y = $src_h = $dst_y = $dst_h = 0;
            } else if ($src_y <= 0) {
                $dst_y = -$src_y;
                $src_y = 0;
                $src_h = $dst_h = min($src_img_h, $tmp_img_h + $src_y);
            } else if ($src_y <= $src_img_h) {
                $dst_y = 0;
                $src_h = $dst_h = min($tmp_img_h, $src_img_h - $src_y);
            }

            // Scale to destination position and size
            $ratio = $tmp_img_w / $dst_img_w;
            $dst_x /= $ratio;
            $dst_y /= $ratio;
            $dst_w /= $ratio;
            $dst_h /= $ratio;

            $dst_img = imagecreatetruecolor($dst_img_w, $dst_img_h);

            // Add transparent background to destination image
            imagefill($dst_img, 0, 0, imagecolorallocatealpha($dst_img, 0, 0, 0, 127));
            imagesavealpha($dst_img, true);

            $result = imagecopyresampled($dst_img, $src_img, $dst_x, $dst_y, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);

            if ($result) {
                //打开缓冲
                ob_start();
                imagepng($dst_img);
                $this->tmp = ob_get_contents();
                ob_end_clean();
            } else {
                $this->msg = "无法裁剪图片";
            }

            imagedestroy($src_img);
            imagedestroy($dst_img);
        }
    }

    /*
     * @param $curl object 请求对象 暂时作废
     * @param $url string 图床地址
     * @return void
     * */
    public function post( $curl, $uri ) {

        $delimiter = md5(time());

        $fileFields = array(
            'imageArray' => array(
                'type' => 'image/png',
                'content' => $this->tmp,
            )
        );

        $data = '';
        foreach ($fileFields as $name => $file) {
            $data .= "--" . $delimiter . "\r\n";
            $data .= 'Content-Disposition: form-data; name="' . $name . '";' .' filename="' . $name . '"' . "\r\n";
            $data .= 'Content-Type: ' . $file['type'] . "\r\n";
            $data .= "\r\n";
            $data .= $file['content'] . "\r\n";
        }
        $data .= "--" . $delimiter . "--\r\n";

        $arr = array();
        $arr['boundary'] = $delimiter;
        $arr['content'] = $data;

        $this->upload_result = $curl->postUploadData( $uri, $arr );
    }

    private function codeToMessage($code)
    {
        switch ($code) {
            case UPLOAD_ERR_INI_SIZE:
                $message = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
                break;

            case UPLOAD_ERR_FORM_SIZE:
                $message = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
                break;

            case UPLOAD_ERR_PARTIAL:
                $message = 'The uploaded file was only partially uploaded';
                break;

            case UPLOAD_ERR_NO_FILE:
                $message = 'No file was uploaded';
                break;

            case UPLOAD_ERR_NO_TMP_DIR:
                $message = 'Missing a temporary folder';
                break;

            case UPLOAD_ERR_CANT_WRITE:
                $message = 'Failed to write file to disk';
                break;

            case UPLOAD_ERR_EXTENSION:
                $message = 'File upload stopped by extension';
                break;

            default:
                $message = 'Unknown upload error';
        }

        return $message;
    }

    /*
     * 直接返回图床接口
     * */
    public function getResult(){
        return $this->upload_result;
    }

    /*
     * 暂时不对接口输出信息（用来调试）
     * */
    public function getMsg() {
        return $this->msg;
    }

    /*
     * 结束
     * */
    public function __destruct() {

        if( file_exists( $this->tmp ) ) unlink( $this->tmp );
    }
}
