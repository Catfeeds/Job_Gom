<?php
    $csspath = 'shop/goodsdetail.css';
    $jspath = '/js/conf/goodInfo.js';
    //print_r($productInfo);exit;
?>
<include file="Home@Front/Public/header" />
<include file="Public:tool" />
<div class="detail-top" data-action="sharePage">
    <div class="wrap-box">
      <div class="crumbs-box"><{$product_crumbs}></div>
      <div class="detail-cont clearfix" data-node="topGoodInfo">
        <!--左侧轮播-->
        <div class="goods-carousel" data-node="topleft">
          <div class="carousel-cont" >
            <ul style="width:2000px;" class="carousel-list" data-node="leftBigBox">
              <foreach name="img_list" item="vo">
                <if condition="$key eq 0 and $imgDefault eq ''">
				           <li style="display: list-item;"><img src="<{$vo.img|getResizeImg=###,400,400}>" alt="<{$productInfo['item']['name']}>"></li>
                <else />
                  <li style="display: none;"><img src="<{$vo.img|getResizeImg=###,400,400}>" alt="<{$productInfo['item']['name']}>"></li>
                </if>
              </foreach>
              <neq name="imgDefault" value="">
			          <li style="display: list-item;"><img src="<{$imgDefault|getResizeImg=###,400,400}>" alt="<{$productInfo['item']['name']}>"></li>
      				<else/>
      				  <li><img src="" alt=""></li>
      				</neq>
            </ul>
          </div>
          <div class="moving-main">
            <span class="icon moving-btn" data-action="sliderTop">&#xea55;</span>
            <div class="moving-cont" >
              <ol class="moving-list"  data-node="leftSmallBox">
                <foreach name="img_list" item="vo">
                  <li data-skuId="<{$vo.id}>"><img src="<{$vo.img|getResizeImg=###,80,80}>"  alt="<{$productInfo['item']['name']}>"></li>
                </foreach>
              </ol>
            </div><span class="icon moving-btn" data-action="sliderDown">&#xea57;</span>
          </div>
        </div>
        <!--右侧数据内容-->
        <div class="detail-data">
          <h1 class="detail-data-tl" data-node="goodsName"><{$productInfo['item']['name']|htmlspecialchars}></h1>
          <div class="detail-summary">
            <div class="summary-it clearfix">
              <label class="summary-label">价格：</label>
              <div class="summary-more">
				        <span class="red">￥<strong data-node="price"><{$skuInfo.sku_one_price|default='0.00'}></strong></span>
				         <del <egt name="skuInfo.sku_one_price" value="$skuInfo['price']">class="hide"</egt> data-node="originPrice">原价：￥<{$skuInfo['price']|default='0.00'}></del>
			        </div>
            </div>
            <if condition="!empty($promotion)">
            <div class="summary-it clearfix">
              <label class="summary-label">促销：</label>
              <div class="summary-more promotion clearfix" <if condition="isset($promotion['1']) && $promotion['1']">data-node="sale"</if>><span class="coupon-list">
                <{$promotion.0}></span><if condition="!empty($promotion['1'])" ><a href="##" class="icon icon-down">&#xea57;</a></if>
                <ul class="promotion-list">
                  <if condition="!empty($promotion['1'])" ><li><{$promotion.1}></li></if>
                  <!--<if condition="!empty($promotion['2'])" ><li><{$promotion.2}></li></if>-->
                </ul>
              </div>
            </div>
            </if>
            <eq name="show_coupon" value="true">
            <div class="summary-it clearfix">
              <label class="summary-label">领券：</label>
              <div class="summary-more">
			          <foreach name="shopCouponsArr" item="shopCouponsItem">
                  <p class="receive-coupon">￥<span><{$shopCouponsItem}></span><a href="javascript:;" data-active="coupon">领取</a></p>
			          </foreach>
                <a href="javascript:;" class="red" data-active="coupon">点击领取优惠券</a>
                <!-- <div style="display:none" class="tickets-more" data-node="couponlist">
                  <div class="ticket-cont">
                    <ul class="ticket-list" data-node="redlist">
                    </ul>
                  </div>
                </div> -->
              </div>
            </div>
            </eq>
          </div>
          <div class="data-choose <neq name='productInfo.item.status' value="1">disabled</neq>" data-node="goodToDo">
            <div class="choose-it clearfix">
              <label class="choose-label">配 送 至：</label>
              <div class="choose-cont">
                <div class="select-area" data-action="setAddress">
                  <a href="javascript:;" clear="clearfix">
                    <span  data-action="setAddressTopBox" class="chosed-area">
                      <span data-node="addressTop" <if condition="$default_address['province']['id'] gt 1"> data-aid="<{$default_address['province']['id']}>" </if>><{$default_address['province']['name']}></span>
                      <span  data-node="addressTop" <if condition="$default_address['city']['id'] gt 1"> data-aid="<{$default_address['city']['id']}>" </if>><{$default_address['city']['name']}></span>
                      <span data-node="addressTop" <if condition="$default_address['borough']['id'] gt 1"> data-aid="<{$default_address['borough']['id']}>" </if>><{$default_address['borough']['name']}></span>
                      <span data-node="addressTop" <if condition="$default_address['area']['id'] gt 1"> data-aid="<{$default_address['area']['id']}>" </if>><{$default_address['area']['name']}></span>
                    </span>
                    <em class="icon icon-down">&#xea57;</em>
                  </a>
                  <div class="select-box" data-node="setAddressbox" >
                    <em class="icon-close" data-action="addressClose">×</em>
                    <div class="select-title">
                      <a href="javascript:;" class="selected-span" data-action="setAddressTab" <if condition="$default_address['province']['id'] gt 1"> data-aid="<{$default_address['province']['id']}>" </if>><span data-node="tabName"><{$default_address['province']['name']}></span><em class="icon icon-down">&#xea57;</em></a>
                    <a href="javascript:;" data-action="setAddressTab" <if condition="$default_address['city']['id'] gt 1"> data-aid="<{$default_address['city']['id']}>" </if>><span data-node="tabName"><{$default_address['city']['name']}></span><em class="icon icon-down">&#xea57;</em></a>
                    <a href="javascript:;" data-action="setAddressTab" <if condition="$default_address['borough']['id'] gt 1"> data-aid="<{$default_address['borough']['id']}>" </if>><span data-node="tabName"><{$default_address['borough']['name']}></span><em class="icon icon-down">&#xea57;</em></a>
                    <a href="javascript:;" data-action="setAddressTab" <if condition="$default_address['area']['id'] gt 1"> data-aid="<{$default_address['area']['id']}>" </if>><span data-node="tabName"><{$default_address['area']['name']}></span><em class="icon icon-down">&#xea57;</em></a>
                    </div>
                    <ul class="select-content" data-node="setAddressList"></ul>
                    <ul class="select-content" data-node="setAddressList"></ul>
                    <ul class="select-content" data-node="setAddressList"></ul>
                    <ul class="select-content" data-node="setAddressList"></ul>
                  </div>
                </div>
                  <span class="choose-span" data-node="iscargo">
				<eq name="stockDefault" value="-1">
					<if condition="$productInfo['item']['stock'] gt 0">有货<else />无货</if>
				<else/>
					<if condition="$stockDefault gt 0">有货<else />无货</if>					
				</eq>					
				</span>
              </div>
            </div>
            <!--规格参数列表-->
            <foreach name="sku_attr" item="vo">
		        <assign name="skuKey" value="$key"/>
            <div class="choose-it clearfix" data-node="firstParams">
                <label class="choose-label"><{$key}>：</label>
                <div class="choose-cont">
                    <foreach name="vo" item="vv" id="vv_id">
                        <a href="javascript:;" class="choose-cell <eq name="skuDefault.$skuKey" value="$vv">choose-cell-true</eq> "><{$vv}></a>
                    </foreach>
                </div>

            </div>
            </foreach>
            <!--规格参数列表-->
            <div class="choose-it clearfix">
              <label class="choose-label">数量：</label>

              <div class="choose-cont"> 

                <div class="goods-num "  data-trigger="spinner" >
                  <span class="num-add disabled"  data-spin="down">-</span>
                  <input type="text" data-node="count" value="1" <neq name='productInfo.item.status' value="1">disabled</neq>/>
                  <span class="num-minus" data-spin="up">+</span>
                </div>
                <span class="choose-span">库存<span  data-node="repert"><eq name="stockDefault" value="-1"><{$productInfo['item']['stock']}><else/><{$stockDefault}></eq></span>件</span>
              </div>
            </div>
          </div>
          <div class="choose-bt <if condition="$productInfo['item']['status'] neq 1">disabled clearfix<else />clearfix</if>">
            <form  name="buynow" data-node="buynow" method='post' action='<{$order_domain}>cart/checkout?fid=<{$fid}>' >
              <a href="javascript:;" class="pc-btn pc-btnh45 
      					<eq name="stockDefault" value="-1">
      						<if condition="$productInfo['item']['stock'] elt 0"> btn-default</if>
      					<else/>
      						<if condition="$stockDefault elt 0"> btn-default</if>					
      					</eq>" data-action="buybtn">立即购买</a>
              <input type="hidden" data-node="buyInfo" value="" name="skuList"/>
              <input type="hidden" data-node="isCross" value="" name="otherParam"/>
            </form>
            <a href="javascript:;" class="pc-btn pc-bj-fc8753 pc-btnh45" data-action="addShopCar">加入购物车</a>
            <neq name='productInfo.item.status' value="1"><p class="off-shelf">此宝贝已下架</p></neq>
            <!-- 加入购物车动画 -->
            <div class="shop-img" id="goodsThum">
              <img src="<{$goods_thum}>">
            </div>
            <div class="shop-ma <neq name='productInfo.item.status' value="1">hide</neq>" data-action="showQRCode">
              <span>手机购买</span>
              <img src="<{$pcimgpath}>/images/public/ma1.jpg">
              <em class="icon icon-up">&#xea57;</em>
              <p><img src="/ajax/qrcode/urlcode?url=<{$qr_url}>"></p>
            </div>
            <p class="error hide" data-node="addCartErr">加入购物车失败</p>
          </div>
          <div class="a-shares <neq name='productInfo.item.status' value="1">hide</neq>">
              <span class="text-add" data-node="proAddnum">+1</span>
              <p class="error" data-node="collectProError">收藏加入失败</p>
              <div class="shares-collect" data-node="collectProSuccess"><em class="sanjiao"></em><em class="icon icon-close" data-action="collectProClose"></em>
                <p class="f16"><em class="icon icon-suc"></em>成功加入我的收藏</p>
                <p>你可以查看<a href="<{$i_domain}>collect" target="_blank">我的收藏</a>，或<a href="https://group.gomeplus.com/others/index.html" target="_blank">下载国美+APP</a></p>
              </div>
                <a href="javascript:;" data-action="collectProduct" class="collect" data-isCollect="<eq name='isCollectProduct' value='1'>0<else/>1</eq>"><em class="icon icon-collection <eq name='isCollectProduct' value='1'>active</eq>"></em>收藏商品</a>
                <span data-action="shareto">
                  <em class="icon icon-shares" ></em>分享
                  <p>
                    <a href="javascript:;" class="icon icon-weixin" data-shareto="weixin" >&#xe937;</a>
                    <a href="javascript:;" class="icon icon-qq" data-shareto="qq">&#xe900;</a>
                    <a href="javascript:;" class="icon icon-sina" data-shareto="sina">&#xe935;</a>
                    <a href="javascript:;" class="icon icon-kongjian" data-shareto="qzone">&#xe902;</a>
                  </p>
                </span>
		      </div>
        </div>
      </div>
    </div>
</div>
  <!--店铺介绍-->
<div class="wrap-box" data-node="goodsContent">
	<include file="Mall@Front/Product/shop" />
	<include file="Mall@Front/Product/goods" />
	<include file="Mall@Front/Product/recommend" />
	<include file="Mall@Front/Product/comment" />
</div>

<div class="totop" data-node="top"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
<script>
  $GLOBAL_CONFIG['productId'] = '<{$productId}>';
  $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
  $GLOBAL_CONFIG['sku_list'] = <{$sku_list}>;
  $GLOBAL_CONFIG['kid'] = '<{$kid}>';
  $GLOBAL_CONFIG['onlineUserId'] = '<{$onlineUserId}>';
  $GLOBAL_CONFIG['pcImage'] = '<{$pcimgpath}>';
  $GLOBAL_CONFIG['fid'] = '<{$fid}>';
  $GLOBAL_CONFIG['weixin_share'] = '<{$wap_url}>product/<{$shopId}>-<{$productId}>.html';
  $GLOBAL_CONFIG['qr_url'] = '<{$qr_url}>';
  $GLOBAL_CONFIG['sourceCode'] = '<{$sourceCode}>';
  $GLOBAL_CONFIG['skuId'] = '<{$skuInfo['skuIdDefault']}>';
  $GLOBAL_CONFIG['isRebate'] = '<{$isRebate}>';
  $GLOBAL_CONFIG['isCross'] = '<{$isCross}>';
</script>
<include file="Home@Front/Public/footer" />
