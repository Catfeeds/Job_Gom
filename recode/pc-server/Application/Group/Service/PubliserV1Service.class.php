<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ShopService.class.php
 * +----------------------------------------------------------------------+
 * | @程序功能：发布相关
 * +----------------------------------------------------------------------+
 * | Author:wujing-ds3 <wujing-ds3@yolo24.com> 
 * +----------------------------------------------------------------------+
 * | Date:2016/1/8 18:07
 * +----------------------------------------------------------------------+
 */

namespace Group\Service;
use Home\Service\BaseService;

class PubliserV1Service extends BaseService
{
    public $key = 'PubliserService';
    public $param = array();
    public $bs_version = 1;

    //商品搜索
    //public $search_item = 'carefulChoose/research_result_product.json';

    //公共上传图片
    public $upload_img = 'ul/upload_img.json';


}
