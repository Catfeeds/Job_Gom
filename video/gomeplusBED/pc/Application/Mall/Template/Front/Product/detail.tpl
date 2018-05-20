<!--右侧数据内容-->
<div class="detail-data">
	<h3 class="detail-data-tl" data-node="goodsName"><{$productInfo['item']['name']}></h3>
	<div class="detail-summary">
		<div class="summary-it">
			<label class="summary-label"><eq name="productInfo.item.isDiscount" value="1">促销价<else/>价格</eq>：</label>
			<div class="summary-more">
				<span class="red">￥<strong data-node="price" data-salePrice="<{$skuInfo['salePriceShow']}>"><{$skuInfo['salePriceShow']}></strong></span>
			</div>
		</div>
        <div class="summary-it <eq name="productInfo.item.isDiscount" value="0">hide</eq>">
			<div class="summary-more">
				<del>价格：￥<span data-node="originPrice" data-originPrice="<{$skuInfo['priceShow']}>"><{$skuInfo['priceShow']}></span></del>
			</div>
		</div>
		<if condition="!empty($promotion)">
		<div class="summary-it clearfix">
			<label class="summary-label">促销：</label>
			<div class="summary-more promotion clearfix" <if condition="isset($promotion['1']) && $promotion['1']">data-node="sale"</if>>
				<span class="coupon-list"><{$promotion.0}></span>
				<if condition="!empty($promotion['1'])" ><a href="##" class="iconn-2"></a></if>
				<ul class="promotion-list">
				<if condition="!empty($promotion['1'])" ><li><{$promotion.1}></li></if>
				</ul>
			</div>
		</div>
		</if>
		<eq name="showCoupon" value="1">
		<div class="summary-it">
			<label class="summary-label">领券：</label>
			<div class="summary-more">
				<foreach name="shopCouponsArr" item="shopCouponsItem">
				<p class="receive-coupon">￥<span><{$shopCouponsItem}></span><a href="javascript:;" data-active="coupon">领取</a></p>
				</foreach>
				<a href="javascript:;" class="red" data-active="coupon">点击领取优惠券</a>
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
						<span data-node="addressTop" <if condition="$defaultAddr['province']['id'] gt 1"> data-aid="<{$defaultAddr['province']['id']}>" </if>><{$defaultAddr['province']['name']}></span>
						<span  data-node="addressTop" <if condition="$defaultAddr['city']['id'] gt 1"> data-aid="<{$defaultAddr['city']['id']}>" </if>><{$defaultAddr['city']['name']}></span>
						<span data-node="addressTop" <if condition="$defaultAddr['borough']['id'] gt 1"> data-aid="<{$defaultAddr['borough']['id']}>" </if>><{$defaultAddr['borough']['name']}></span>
						</span>
						<em class="iconn-2"></em>
					</a>
					<div class="select-box" data-node="setAddressbox" >
						<em class="iconn-40" data-action="addressClose"></em>
						<div class="select-title">
							<a href="javascript:;" class="selected-span" data-action="setAddressTab" <if condition="$defaultAddr['province']['id'] gt 1"> data-aid="<{$defaultAddr['province']['id']}>" </if>><span data-node="tabName"><{$defaultAddr['province']['name']}></span><em class="iconn-2"></em></a>
							<a href="javascript:;" data-action="setAddressTab" <if condition="$defaultAddr['city']['id'] gt 1"> data-aid="<{$defaultAddr['city']['id']}>" </if>><span data-node="tabName"><{$defaultAddr['city']['name']}></span><em class="iconn-2"></em></a>
							<a href="javascript:;" data-action="setAddressTab" <if condition="$defaultAddr['borough']['id'] gt 1"> data-aid="<{$defaultAddr['borough']['id']}>" </if>><span data-node="tabName"><{$defaultAddr['borough']['name']}></span><em class="iconn-2"></em></a>
						</div>
						<ul class="select-content" data-node="setAddressList"></ul>
						<ul class="select-content" data-node="setAddressList"></ul>
						<ul class="select-content" data-node="setAddressList"></ul>
					</div>
				</div>
				<span class="choose-span" data-node="iscargo">
				<gt name="productInfo.item.stock" value="0">有货<else />无货</gt>
				</span>
			</div>
		</div>
		<!--规格参数列表begin-->
		<foreach name="skuList.pageShow" item="vo">
		<div class="choose-it clearfix" data-node="firstParams">
			<label class="choose-label"><{$key}>：</label>
			<div class="choose-cont">
				<foreach name="vo" item="vv">
				<a href="javascript:;" class="choose-cell <{:count($vo) == 1 ? 'choose-cell-true' : ''}> "><{$vv}></a>
				</foreach>
			</div>
		</div>
		</foreach>
		<!--规格参数列表end-->
		<div class="choose-it clearfix">
			<label class="choose-label">数量：</label>
			<div class="choose-cont">
				<div class="goods-num "  data-trigger="spinner" >
					<span class="num-add disabled"  data-spin="down">-</span>
					<input type="text" data-node="count" value="1" <neq name='productInfo.item.status' value="1">disabled</neq>/>
					<span class="num-minus" data-spin="up">+</span>
				</div>
				<span class="choose-span" data-node="stockBox" data-sumStock="<{$productInfo['item']['stock']}>">
                    <eq name="prodType" value="1">
                    库存<span data-node="repert"><{$productInfo['item']['stock']}></span>件
                    <else/>
                    <gt name="productInfo.item.stock" value="0">有货<else />无货</gt>
                    </eq>
                </span>
			</div>
		</div>
	</div>
	<div class="choose-bt <if condition="$productInfo['item']['status'] neq 1">disabled clearfix<else />clearfix</if>">
		<form  name="buynow" data-node="buynow" method='post' action='<{$order_domain}>cart/checkout?fid=<{$fid}>' >
			<a href="javascript:;" class="pc-btn pc-btnh45 <if condition="$productInfo['item']['stock'] elt 0"> btn-default</if>" data-action="buybtn">立即购买</a>
			<input type="hidden" data-node="buyInfo" value="" name="skuList"/>
			<input type="hidden" data-node="isCross" value="" name="otherParam"/>
		</form>
		<a href="javascript:;" class="pc-btn pc-bj-fc8753 pc-btnh45 <if condition="$productInfo['item']['stock'] elt 0"> btn-default</if>" data-action="addShopCar">加入购物车</a>
		<neq name='productInfo.item.status' value="1"><p class="off-shelf">此宝贝已下架</p></neq>
		<!-- 加入购物车动画 -->
		<div class="shop-img" id="goodsThum">
			<img onerror="imgError(this)" src="<{$goodsThum}>">
		</div>
		<div class="shop-ma <neq name='productInfo.item.status' value="1">hide</neq>" data-action="showQRCode">
			<span>手机购买</span>
			<img onerror="imgError(this)" src="<{$pcimgpath}>/images/public/ma1.jpg">
			<em class="iconn-1"></em>
			<em class="iconn-2"></em>
			<p><img ></p>
		</div>
		<p class="error hide" data-node="addCartErr">加入购物车失败</p>
	</div>
</div>