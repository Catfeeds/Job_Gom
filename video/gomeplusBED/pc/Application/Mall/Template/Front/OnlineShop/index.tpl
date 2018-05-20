<include file="Public:online_shop" />
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

                            <a target="_blank" href="<{$vs.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>"  bp-data='{"event_id": "G000P014", "shop_id": "<{$shopId}>", "product_id": "<{$vs.item.id}>"}'><img onerror="imgError(this)" src="<{$vs.item.mainImage|getResizeImg=###,230,230}>"  alt="<{$vs.item.name}>"></a>
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
<if condition="!empty( $all_item['items'] )" >
    <h2 class="title">全部商品</h2>
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

                <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" bp-data='{"event_id": "G000P015", "shop_id": "<{$shopId}>", "product_id": "<{$vp.id}>"}'><img onerror="imgError(this)" src="<{$vp.mainImage|getResizeImg=###,230,230}>" alt="<{$vp.name}>" ></a>
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
		            <dt><em class="iconn-61"></em></dt>
		            <dd><span>该店铺没有商品</span><a href="<{$mall_domain}>search" class="red-big"><span class="red-big">去逛逛<em>>></em></span></a></dd>
		        </dl>
		    </div>
		</if>
</if>
</div>

<div class="totop" data-node="top"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
<include file="Home@Front/Public/footer" />