<?php
/*
 * +----------------------------------------------------------------------+
 * | Copyright (c) 美信 - 系统开发部 - 点评 
 * +----------------------------------------------------------------------+
 * | All rights reserved.  
 * +----------------------------------------------------------------------+
 * | @程序名称： Class ProductV2Service
 * +----------------------------------------------------------------------+
 * | @程序功能： * @package Mall\Service
 * +----------------------------------------------------------------------+
 * | Author:liuzhen
 * +----------------------------------------------------------------------+
 * | Date:2016/07/21
 * +----------------------------------------------------------------------+
 */

namespace Mall\Service;
use Home\Service\BaseService;

class ProductV2Service extends BaseService
{
	public $key = 'ProductV2Service';
	public $bs_version = 2;
	public $param = array();
	
	public $productDetail = 'combo/item';	//商品的详细信息
	
	public $getProdCollect = 'collection/itemCollection';	//判断商品是否被收藏（GET方式）
	public $putProdCollect = 'collection/itemCollection';	//商品收藏（PUT方式）
	public $delProdCollect = 'collection/itemCollection';	//取消商品收藏（DELETE方式）
	
	public $recommend = 'ext/recommendation/items4Pc';	//商品详情页--商品推荐
	
	public $deliverCheck = 'shop/itemDeliverCheckAction';	//是否可配送
	public $itemComments = 'ext/trade/itemComments';	//商品评价列表
    public $itemCommentCount = 'trade/itemCommentCount';    //商品评论数
	public $shareRebateKid = 'rebate/shareChain/kid';	//获取商品返利的Id
    public $stockAndPrice = 'atomic/item/stockAndPrice';   //获取国美在线的SKU级区域库存、价格信息
}
