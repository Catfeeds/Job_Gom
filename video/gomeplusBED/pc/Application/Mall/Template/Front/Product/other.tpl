<!--图文+产品参数+评价+商品推荐+店内推荐-->
<div class="goods-box clearfix">
	<div class="w230">
		<div class="goods-tab"><p>店内推荐</p></div>
		<div class="shop-list push-shop" data-node="shopChoose"></div>
	</div>
	<div data-node="tabBox">
		<div class="goods-tab w960" data-node="tabBtnBox">
			<a href="javascript:;" class="active">图文详情</a>
			<if condition="isset($productInfo['item']['attributes']) && !empty($productInfo['item']['attributes'])"><a href="javascript:;">产品参数</a></if>
			<a href="javascript:;">商品评价<span>(<{$itemCommentCount}>)</span></a>
		</div>
	</div>
	<div class="w960">
        <eq name="prodType" value="1">
            <if condition="count($productInfo['item']['detailImages']) gt 0">
            <div class="tab-content goods-img" data-node="tabContent">
    			<foreach name="productInfo.item.detailImages" item="vd">
    				<img onerror="imgError(this, 'l')" src="<{$vd|getResizeImg=###,800}>" alt="<{$productInfo['item']['name']}>">
    			</foreach>
    		</div>
    		</if>
        <else/>
            <div class="tab-content goods-img" data-node="tabContent">
    			<iframe data-node="infoIframe" width="100%" scrolling="no" frameborder="0" src="about:blank"></iframe>
    		</div>
        </eq>
        
		<if condition="isset($productInfo['item']['attributes']) && !empty($productInfo['item']['attributes'])">
		<div class="tab-content goods-paramet hide" data-node="tabContent">
			<table>
				<tr>
					<th colspan="2">基本参数</th>
				</tr>
				<volist name="productInfo.item.attributes" id="vat">
				<tr>
					<td><{$vat.name}></td>
					<td title="<{$vat.value}>"><{$vat.value}></td>
				</tr>
				</volist>
			</table>
		</div>
		</if>
        
		<div class="tab-content goods-comments hide" data-node="tabContent">
			<div class="comments-list" data-node="discussBox">
				<div data-node="discussList"></div>
				<div class="page" data-node="discussPage"></div>
			</div>
		</div>
        
		<div class="push-goods">
			<div class="goods-tab"><p>商品推荐</p></div>
			<div class="shop-list" data-node="productChoose"></div>
		</div>
	</div>	
</div>