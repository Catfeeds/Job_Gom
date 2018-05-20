<include file="Public:shop" />
<if condition="$shop['vshopType'] eq 2" >
    <if condition="!empty($shop['coupons'])">
        <div class="detail-coupons">
            <dl class="clearfix"  data-node="couponBox">
                <dt><em class="icon">&#xe93d;</em>
                <p>店铺优惠券</p>
                </dt>
                <div class="coupon-list clearfix">
                <volist name="shop.coupons" id="vo">
                    <dd>
                        <div class="clearfix">
                            <div class="fl">￥<span><{$vo.money}></span></div>
                            <div class="fr">
                                <span>满<{$vo.minAmount}>元可用</span>
                            </div>
                        </div><a href="javascript:;" class="pc-btn pc-btnw155 pc-btnh30"  data-action="getRed" data-redId="<{$vo.batchSn}>">立即领取</a>
                        <p><{$vo.effectiveStartTime|substr=0,10|date="Y.m.d",###}>-<{$vo.effectiveEndTime|substr=0,10|date="Y.m.d",###}></p>
                    </dd>
                </volist>
            </dl>
        </div>
    </if>
    <if condition="!empty($zdata[1]['items'])" >
    <h2 class="title">返利商品</h2>
    <div class="shop-list shop-list-bg">
        <ul class="clearfix" data-node="goodList">
            <volist name="zdata.1.items" id='vz'>
            <li>
                
                <div class="mg-negative"><em class="icon-fan">返</em>
                    <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P013", "shop_id": "<{$shopId}>", "product_id": "<{$vz.id}>"}'><img src="<{$vz.img|getResizeImg=###,230,230}>"  alt="<{$vz.title|htmlspecialchars}>"></a>
                <div class="btn-box">
                    <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40">立即购买</a>
                    <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753" data-action="addShopCar" data-shopId="<{$shopId}>" data-skuid="<{$vz.id}>">加入购物车</a></div>
                <div class="text">￥<span><{$vz.orginPrice|show_list_price=###,$vz['price']}></span>
                    <p title="<{$vz.title|htmlspecialchars}>"> <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P013", "shop_id": "<{$shopId}>", "product_id": "<{$vz.id}>"}'><{$vz.title|htmlspecialchars}></a></p>
                </div>
                </div>
            </li>
            </volist>
        </ul>
    </div>
    </if>
    <if condition="!empty($zdata[0]['items'])" >
        <h2 class="title">直降商品</h2>
        <div class="shop-list shop-list-bg">
            <ul class="clearfix"  data-node="goodList">
                <volist name="zdata.0.items" id='vz'>
                    <li>
                        <div class="mg-negative"><em class="icon-fan icon-jiang">降</em>
                            <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P014", "shop_id": "<{$shopId}>", "product_id": "<{$vz.id}>"}'><img src="<{$vz.img|getResizeImg=###,230,230}>"  alt="<{$vz.title|htmlspecialchars}>"></a>
                        <div class="btn-box">
                            <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                            <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753" data-action="addShopCar"  data-shopId="<{$shopId}>" data-skuid="<{$vz.id}>">加入购物车</a></div>
                        <div class="text">￥<span><{$vz.orginPrice|show_list_price=###,$vz['price']}></span>
                            <p title="<{$vz.title|htmlspecialchars}>"><a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P014", "shop_id": "<{$shopId}>", "product_id": "<{$vz.id}>"}'><{$vz.title|htmlspecialchars}></a></p>
                        </div>
                        </div>
                    </li>
                </volist>
            </ul>
        </div>
    </if>
</if>
<if condition="!empty($productList)" >
    <if condition="$shop['vshopType'] eq 2" >
    <h2 class="title">全部商品</h2>
    </if>
    <div class="shop-list shop-list-bg">
        <ul class="clearfix"  data-node="goodList">
            <volist name="productList" id='vp'>
            <li>
                <div class="mg-negative">
                <if condition="$vp['isRebate'] && $vp['isDiscount']">
                    <eq name="vp.isRebate" value="true" ><em class="icon-fan">返</em></eq>
                <else />
                    <eq name="vp.isRebate" value="true" ><em class="icon-fan">返</em></eq>
                    <eq name="vp.isDiscount" value="true" ><em class="icon-fan icon-jiang">降</em></eq>
                </if>
                <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P015", "shop_id": "<{$shopId}>", "product_id": "<{$vp.id}>"}'><img src="<{$vp.img|getResizeImg=###,230,230}>" alt="<{$vp.title|htmlspecialchars}>" ></a>
                <div class="btn-box">
                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753" data-action="addShopCar"  data-shopId="<{$shopId}>" data-skuid="<{$vp.id}>">加入购物车</a></div>
                <div class="text">￥<span><{$vp.orginPrice|show_list_price=###,$vp['price']}></span>
                    <p title="<{$vp.title|htmlspecialchars}>"><a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P015", "shop_id": "<{$shopId}>", "product_id": "<{$vp.id}>"}'><{$vp.title|htmlspecialchars}></a></p>
                </div>
                </div>
                
            </li>
            </volist>
        </ul>
    </div>
    <eq name="show_more" value="true"><div class="page-more"><a href="<{$mall_domain}>shop-<{$shopId}>-1.html" class="pc-btn pc-btnw">点击查看更多商品<em class="icon">&#xe98c;</em></a></div></eq>
</if>
</div>

<div class="totop" data-node="top"><a href="javascript:;"><em class="icon">&#xea55;</em><span>返回顶部</span></a></div>
<include file="Home@Front/Public/footer" />