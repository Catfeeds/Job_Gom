<!--产品参数+图文详情-->
<if condition="!empty($productInfo['spu'])">
<h3 class="goods-title"><span>产品参数</span></h3>
<div class="goods-table">
<dl class="clearfix">
	<volist name="productInfo.spu.attributes" id="vat">
	<dt><{$vat.name}>：</dt>
	<dd title="<{$vat.value}>"><{$vat.value}></dd>
	</volist>
</dl>
</div>
</if>
<h3 class="goods-title"><span>图文详情</span></h3>
<div class="img-goods-box">
<if condition="count($productInfo['item']['detailImages']) gt 0">
	<foreach name="productInfo.item.detailImages" item="vd">
		<img src="<{$vd|getResizeImg=###,800}>" alt="<{$productInfo['item']['name']|htmlspecialchars}>">
	</foreach>
</if>
</div>