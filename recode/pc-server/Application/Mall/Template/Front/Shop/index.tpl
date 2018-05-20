<include file="Public:shop" />
<if condition="$vshop_type_num eq 2" >
    <if condition="!empty($shop['coupons'])">
        <div class="detail-coupons">
            <dl class="clearfix"  data-node="couponBox">
                <dt><em class="iconn-58"></em>
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
						<eq name="vo.timeType" value="1">
						<p>领到券后<{$vo.dayLimit}>天内可用</p>
						<else/>
						<p><{$vo.useStartTime|substr=0,10|date="Y.m.d",###}>-<{$vo.useEndTime|substr=0,10|date="Y.m.d",###}></p>
						</eq>
                    </dd>
                </volist>
            </dl>
        </div>
    </if>
    <if condition="!empty( $all_fanli )" >
    <h2 class="title">返利商品</h2>
    <div class="shop-list shop-list-bg">
        <ul class="clearfix" data-node="goodList">
            <volist name="all_fanli.items" id='vz'>
            <li>
                
                <div class="mg-negative"><em class="icon-fan">返</em>
                    <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P013", "shop_id": "<{$shopId}>", "product_id": "<{$vz.id}>"}' title="<{$vz.name}>"><img onerror="imgError(this)" src="<{$vz.mainImage|getResizeImg=###,260,260}>"  alt="<{$vz.name}>"></a>
                <div class="btn-box">
                    <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40">立即购买</a>
                    <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753" data-action="addShopCar" data-shopId="<{$shopId}>" data-skuid="<{$vz.id}>">加入购物车</a></div>
                <div class="text">￥<span><{$vz.salePrice|convert_price=###}></span>
                    <p title="<{$vz.name}>"> <a target="_blank" href="<{$vz.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P013", "shop_id": "<{$shopId}>", "product_id": "<{$vz.id}>"}'><{$vz.name}></a></p>
                </div>
                </div>
            </li>
            </volist>
        </ul>
    </div>
    </if>
    <if condition="!empty( $recommend['items'] )" >
        <h2 class="title">推荐商品</h2>
        <div class="shop-list shop-list-bg">
            <ul class="clearfix"  data-node="goodList">
                <volist name="recommend.items" id='vs'>
                    <li>
                        <div class="mg-negative">
                            <?php

                            //字段不存在
                            if( !isset( $vs['item']['promotionMarks']['itemProspectiveRebateAmount'] ) ) {
                                $vs['item']['promotionMarks']['itemProspectiveRebateAmount'] = '';
                            }

                            //这里是返利和直降标识.
                            if( $vs['item']['promotionMarks']['itemProspectiveRebateAmount'] > 0 && $vs['item']['discount'] > 0 ) {
                                echo '<em class="icon-fan">返</em>';
                            } else {

                                if( $vs['item']['promotionMarks']['itemProspectiveRebateAmount'] > 0 ) {
                                    echo '<em class="icon-fan">返</em>';
                                }

                                if( $vs['item']['discount'] > 0 ) {
                                    echo '<em class="icon-fan icon-jiang">降</em>';
                                }
                            }
                            ?>

                            <a target="_blank" href="<{$vs.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P014", "shop_id": "<{$shopId}>", "product_id": "<{$vs.item.id}>"}' title="<{$vs.item.name}>"><img onerror="imgError(this)" src="<{$vs.item.mainImage|getResizeImg=###,260,260}>"  alt="<{$vs.item.name}>"></a>
                        <div class="btn-box">
                            <a target="_blank" href="<{$vs.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                            <a target="_blank" href="<{$vs.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753" data-action="addShopCar"  data-shopId="<{$shopId}>" data-skuid="<{$vs.item.id}>">加入购物车</a></div>
                        <div class="text">￥<span><{$vs.item.salePrice|convert_price=###}></span>
                            <p title="<{$vs.item.name}>"><a target="_blank" href="<{$vs.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P014", "shop_id": "<{$shopId}>", "product_id": "<{$vs.item.id}>"}'><?php echo msubstr( $vs['item']['name'], 0,26 );?></a></p>
                        </div>
                        </div>
                    </li>
                </volist>
            </ul>
        </div>
    </if>
</if>
<if condition="!empty( $all_item['items'] )" >
    <if condition="$vshop_type_num eq 2" >
    <h2 class="title">全部商品</h2>
    </if>
    <div class="shop-list shop-list-bg">
        <ul class="clearfix"  data-node="goodList">
            <volist name="all_item.items" id='vp'>
            <li>
                <div class="mg-negative">
                    <?php
                        //这里是返利和直降标识.
                        if( $vp['promotionMarks']['itemProspectiveRebateAmount'] > 0 && $vp['discount'] > 0 ) {
                            echo '<em class="icon-fan">返</em>';
                        } else {

                            if( $vp['promotionMarks']['itemProspectiveRebateAmount'] > 0 ) {
                                echo '<em class="icon-fan">返</em>';
                            }

                            if( $vp['discount'] > 0 ) {
                                echo '<em class="icon-fan icon-jiang">降</em>';
                            }
                        }
                    ?>

                <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P015", "shop_id": "<{$shopId}>", "product_id": "<{$vp.id}>"}' title="<{$vp.name}>"><img onerror="imgError(this)" src="<{$vp.mainImage|getResizeImg=###,260,260}>" alt="<{$vp.name}>" ></a>
                <div class="btn-box">
                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753" data-action="addShopCar"  data-shopId="<{$shopId}>" data-skuid="<{$vp.id}>">加入购物车</a></div>
                <div class="text">￥<span><{$vp.salePrice|convert_price=###}></span>
                    <p title="<{$vp.name}>"><a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P015", "shop_id": "<{$shopId}>", "product_id": "<{$vp.id}>"}'><?php echo msubstr( $vp['name'], 0,26 );?></a></p>
                </div>
                </div>
                
            </li>
            </volist>
        </ul>
    </div>
    <eq name="show_more" value="true">
        <div class="page-more"><a href="<{$mall_domain}>shop-<{$shopId}>-1.html" class="pc-btn pc-btnw">点击查看更多商品<em class="iconn-9"></em></a></div>
    </eq>
<else />
	    <if condition="empty( $recommend['items'] )" >
			<div class="no-new">
		        <dl class="no-business clearfix">
		            <dt><em class="iconn-59"></em></dt>
		            <dd><span>该店铺没有商品</span><a href="<{$mall_domain}>search" class="red-big"><span class="red-big">去逛逛<em>>></em></span></a></dd>
		        </dl>
		    </div>
		</if>    
</if>
</div>

<div class="totop" data-node="top"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
<include file="Home@Front/Public/footer" />