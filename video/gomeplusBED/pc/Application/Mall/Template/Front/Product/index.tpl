<?php
    $csspath = 'goodsdetail-new.css';
    $jspath = '/js/conf/goodInfo.js';
?>
<include file="Home@Front/Public/header" />
<include file="Public:tool" />
<div class="totop" data-node="top"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
<div class="wrap-box">
	<div class="crumbs-box"><{$prodCrumbs}></div>
	<div class="detail-cont clearfix" data-node="topGoodInfo">
		<div class="goods-menu">
			<eq name="shopInfo.shopType" value="xpop">
                <div class="fl">
    				商品分类<em class="iconn-2"></em><em class="iconn-1"></em>
    				<div class="menu-list">
    					<volist name="prodCtgyArr" id='ca'>
    					<a target="_blank" href="<{$ca.url}>"><{$ca.name}></a>
    					</volist>
    				</div>
    			</div>
    			<a target="_blank" href="<{$mall_domain}>shop/<{$shopId}>.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >店铺首页</a>
    			<a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-1.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >全部商品</a>
    			<a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-2.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >上新商品</a>
                <eq name="prodType" value="1">    			
    			<a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-3.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >店铺特惠</a>
                <a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-8.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >店铺动态</a>
                <else/>
    			<a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-7.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >热销商品</a>
                </eq>
			<else/>
			<a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-1.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >全部商品</a>
			<a target="_blank" href="<{$mall_domain}>shop-<{$shopId}>-2.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" >上新商品</a>
			</eq>
		</div>		
		<!--左侧轮播-->
		<include file="Mall@Front/Product/move" />
		<!--右侧数据内容-->
		<include file="Mall@Front/Product/detail" />
		<!--店铺介绍-->
		<include file="Mall@Front/Product/shop" />
	</div>
	<!--其他-->
	<include file="Mall@Front/Product/other" />
</div>
<script>
  $GLOBAL_CONFIG['productId'] = '<{$productId}>';
  $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
  $GLOBAL_CONFIG['shopName'] = '<{$shopInfo['shop']['name']}>';
  $GLOBAL_CONFIG['sku_list'] = <{:json_encode($skuList['jsonShow'])}>;
  $GLOBAL_CONFIG['kid'] = '<{$kid}>';
  $GLOBAL_CONFIG['onlineUserId'] = '<{$onlineUserId}>';
  $GLOBAL_CONFIG['pcImage'] = '<{$pcimgpath}>';
  $GLOBAL_CONFIG['fid'] = '<{$fid}>';
  $GLOBAL_CONFIG['weixin_share'] = '<{$wap_url}>item/<{$shopId}>-<{$productId}>.html';
  $GLOBAL_CONFIG['qr_url'] = '<{$qrUrl}>';
  $GLOBAL_CONFIG['sourceCode'] = '<{$sourceCode}>';
  $GLOBAL_CONFIG['skuId'] = '<{$skuInfo['skuIdDefault']}>';
  $GLOBAL_CONFIG['isRebate'] = '<{$isRebate}>';
  $GLOBAL_CONFIG['isCross'] = '<{$isCross}>';
  $GLOBAL_CONFIG['prodType'] = '<{$prodType}>';
  $GLOBAL_CONFIG['isDiscount'] = <{:isset($productInfo['item']['isDiscount']) && $productInfo['item']['isDiscount'] ? 1 : 0}>;
  $GLOBAL_CONFIG['colorShow'] = <{:json_encode($skuList['colorShow'])}>;
  $GLOBAL_CONFIG['detailUrl'] = '<{:isset($productInfo['item']['detailUrl']) ? $productInfo['item']['detailUrl'] : ''}>';
</script>
<include file="Home@Front/Public/footer" />