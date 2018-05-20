<!--店铺介绍-->   
<div class="shop-title clearfix"></div>
<div class="goods-box">
	<div class="store-logo"><a href="<{$shopId|shopDetailUrlGen=###,$sourceCode}>"><img src="<{$shop_info['shop']['icon']|getResizeImg=###,75,75}>" alt="<{$shop_info['shop']['name']}>"></a></div>
	<p class="p-store-name"><a href="<{$shopId|shopDetailUrlGen=###,$sourceCode}>"><{$shop_info['shop']['name']}></a>
		<!--美店为'shopType=mShop'不显示店铺等级及评分-->
		<if condition="$shop_info['shopType'] eq 'xpop'" >
		<eq name="level.medal" value="gold" >
			<for start="0" end="$level.medalNum" >
				<span class="icon-vip vip3"></span>
			</for>
		</eq>
		<eq name="level.medal" value="silver" >
			<for start="0" end="$level.medalNum" >
				<span class="icon-vip vip2"></span>
			</for>
		</eq>
		<eq name="level.medal" value="copper" >
			<for start="0" end="$level.medalNum" >
				<span class="icon-vip vip1"></span>
			</for>
		</eq>
		<p class="p-store-stars">
		  商品描述：<span><{$shop_info['shopLevel']['describeGrade']|default="0.0"}></span>
		  卖家服务：<span><{$shop_info['shopLevel']['serviceGrade']|default="0.0"}></span>
		  物流服务：<span><{$shop_info['shopLevel']['expressGrade']|default="0.0"}></span>
		</p>
		</if>
	</p>

	<eq name="shop_info.shopType" value="mShop">
	<p class="p-store-stars"> 服务：<span class="color333">由<{$shop_info['xshop']['name']}>发货并提供售后服务</span><span>国美＋平台已认证</span></p>
	</eq>
	<div class="btn-box2">
		<a target="_blank" rel="nofollow" href="<{$shopId|shopDetailUrlGen=###,$sourceCode}>" bp-data='{"event_id": "B000P020", "shop_id": "<{$shopId}>", "product_id": "<{$productId}>"}'>逛逛店铺</a>
		<a href="javascript:;" rel="nofollow" data-action="shopCollect" data-collect="<eq name='vshopCollect' value='1'>collect</eq>" class="<eq name='vshopCollect' value='1'>active</eq>"><eq name='vshopCollect' value='1'>取消</eq>收藏店铺</a>
	</div>
</div>