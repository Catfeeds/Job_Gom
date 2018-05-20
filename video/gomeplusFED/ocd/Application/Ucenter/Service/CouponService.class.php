<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/5/23
 * Time: 11:26
 */
namespace Ucenter\Service;
use Home\Service\BaseService;
class CouponService extends BaseService
{
    public $key = "CouponService";
    public $param = array();
    public $other_user_info = "user/get_othermember_info.json";
    //public $comment_goods="order/comment_product_commentlist.json";//评价多个商品
    public $need_comment_goods="order/nocomment_product_list.json";//待评论多个商品
	public $change_product = "order/change_product_apply.json";//申请换货//确认收货后14天内
	public $return_product = "order/return_product_apply.json";//申请退货//确认收货后七天内
}
