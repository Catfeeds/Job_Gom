<!--店铺介绍-->
<div class="goods-shop">
	<div class="store-logo">
		<a target="_blank" href="<{$shopId|shopDetailUrlGen=###,$sourceCode}>">
			<img onerror="imgError(this)" src="<{$shopInfo['shop']['icon']|getResizeImg=###,160,0}>" alt="<{$shopInfo['shop']['name']}>">
		</a>
	</div>
	<p class="p-store-name">
		<a target="_blank" href="<{$shopId|shopDetailUrlGen=###,$sourceCode}>"><{$shopInfo['shop']['name']}></a>
		<!--美店为'shopType=mShop'不显示店铺等级及评分-->
	</p>
	<if condition="$shopInfo['shopType'] eq 'xpop'" >
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
	<p class="p-store-stars">商品描述：<span><{$shopInfo['shopLevel']['describeGrade']|default="0.0"}></span></p>
	<p class="p-store-stars">卖家服务：<span><{$shopInfo['shopLevel']['serviceGrade']|default="0.0"}></span></p>
	<p class="p-store-stars">物流服务：<span><{$shopInfo['shopLevel']['expressGrade']|default="0.0"}></span></p>
	</if>			
	<eq name="shopInfo.shopType" value="mShop">
	<p class="gray">由<{$shopInfo['xshop']['name']}>的店铺提供服务</p>
	</eq>
	<div class="btn-box2">
        <eq name="prodType" value="1">
	        <if condition="($shopInfo['shopType'] eq 'xpop')" >
			<a href="<?=imUrl('shop',$shopInfo['shop']['id'])?>" data-action="entryBtn" target="_blank" class="fl"   data-value="扫描二维码，下载国美 APP联系商家"><p>联系商家</p></a>
			<else/>
			<a href="<?=imUrl('shop',$shopInfo['xshop']['id'])?>" data-action="entryBtn" target="_blank" class="fl"   data-value="扫描二维码，下载国美 APP联系商家"><p>联系商家</p></a>
			</if>
        <else/>
        <a href="javascript:;" class="fl disabled">联系商家</a>
        </eq>
		<a href="javascript:;" class="fr" rel="nofollow" data-action="shopCollect" data-collect="<eq name='vshopCollect' value='1'>collect</eq>" ><eq name='vshopCollect' value='1'>取消</eq>收藏店铺</a>
		<a target="_blank" rel="nofollow" href="<{$shopId|shopDetailUrlGen=###,$sourceCode}>" bp-data='{"event_id": "B000P020", "shop_id": "<{$shopId}>", "product_id": "<{$productId}>"}'>逛逛店铺</a>
	</div>
    <if condition="($shopInfo['shopType'] eq 'xpop') and ($prodType eq 2 or $prodType eq 3)" ><p class="gray gray2">本店铺由国美在线提供，查看更多店铺资质信息请前往国美在线官网</p></if>
</div>
