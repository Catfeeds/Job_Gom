<?php
    $csspath = 'shop/shop-list.css';
	$jspath = '/js/conf/normal.js';
?>
<include file="Home@Front/Public/header" />
<script>
window._page_name_ = '店铺搜索';
window._page_id_ = 'D009';
</script>
<div class="wrap-box">
    <div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
    <div class="shop-title clearfix">
        <div class="crumbs-box"><{$search_shop|urldecode}></div>
		<div class="sort">
            <a href="<{$order_url.0}>" <?php if($search_params['order']==0){echo 'class="active"';} ?>>综合</a>
            <a href="<{$order_url.1}>" <?php if($search_params['order']==1){echo 'class="active"';} ?>>销量</a>
            <a href="<{$order_url.2}>" <?php if($search_params['order']==2){echo 'class="active"';} ?>>人气</a> 
        </div>
    </div>
	<volist name="search_data.list" id="vo">
    <div class="shop-list">
        <div class="list-name clearfix"><a href="<{$vo['shop']['id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>" target="_blank" class="pc-btn pc-btnw120 pc-btnh40">进入店铺</a>
          <div class="img"><a href="<{$vo['shop']['id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>" target="_blank"><img onerror="imgError(this, 'm')" src="<{$vo['shop']['icon']|getResizeImg=###,120,120}>"></a></div>
          <h2>
		  <a href="<{$vo['shop']['id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><{$vo['shop']['name']}></a>
		  <eq name="vo.shop.type" value="xpop" >
			<eq name="vo.level.medal" value="gold" >
				<for start="0" end="$vo.level.medalNum" >
					<span class="vip3"></span>
				</for>
			</eq>			
			<eq name="vo.level.medal" value="silver" >
				<for start="0" end="$vo.level.medalNum" >
					<span class="vip2"></span>
				</for>
			</eq>
			<eq name="vo.level.medal" value="copper" >
				<for start="0" end="$vo.level.medalNum" >
					<span class="vip1"></span>
				</for>
			</eq>
		  </eq>
		  </h2>
          <!--<p class="line2"><notempty name="vo.shop.description"><{$vo['shop']['description']}><else /><{$vo['shop']['name']}></notempty></p>-->
          <p class="counts">总销量：<span><{$vo['volume']}></span>收藏量：<span><{$vo['shopCollectionQuantity']['quantity']}></span></p>
		  <eq name="vo.shop.type" value="xpop" >
		  <p>
		  商品描述：<span><{$vo['shopLevel']['describeGrade']|default="0.0"}></span>
		  卖家服务：<span><{$vo['shopLevel']['serviceGrade']|default="0.0"}></span>
		  物流服务：<span><{$vo['shopLevel']['expressGrade']|default="0.0"}></span>
		  </p>
		  </eq>
        </div>

		<ul class="clearfix">
			<volist name="vo.items" id="items">
			<li>
				<a href="<{$items.id|productDetailUrlGen=$vo['shop']['id'],###}>" target="_blank">

					<img src="<{$items['item']['mainImage']|getResizeImg=###,230,230}>" onerror="imgError(this, 'm')">
					<div class="text">￥<span><{$items['item']['salePrice']|convert_price=###}></span>
					<p title="<{$items['item']['name']}>"><{$items['item']['name']}></p>
					</div>
				</a>
			</li>
           </volist>
        </ul>
      </div>
      </volist>
	  
      <div class="page"><{$link_url}></div>
</div>
<include file="Home@Front/Public/footer" />