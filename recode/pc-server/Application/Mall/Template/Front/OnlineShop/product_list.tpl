<include file="Public:online_shop" />
<if condition="!empty($all_item['items'])" >
        <div class="shop-list shop-list-bg" data-node="goodsBox">
            <ul class="clearfix">
                <volist name="all_item.items" id='vp'>
                    <li>
                        <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>">
                            <div class="mg-negative">

                        <?php

                            //这里是返利和直降标识.
                            $itemProspectiveRebateAmount = ( isset( $vp['promotionMarks']['itemProspectiveRebateAmount'] ) ) ? $vp['promotionMarks']['itemProspectiveRebateAmount'] : '' ;

                            $discount = ( isset( $vp['discount'] ) ) ? $vp['discount'] : '' ;
                            if( $itemProspectiveRebateAmount> 0 && $discount > 0 ) {
                                echo '<em class="icon-fan">返</em>';
                            } else {

                                if( $itemProspectiveRebateAmount > 0 ) {
                                    echo '<em class="icon-fan">返</em>';
                                }

                                if( $discount > 0 ) {
                                    echo '<em class="icon-fan icon-jiang">降</em>';
                                }
                            }

                        ?>

                                <img onerror="imgError(this)" src="<{$vp.mainImage|getResizeImg=###,230,230}>" alt="<{$vp.name}>" >
                                <div class="btn-box">
                                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a></div>
                                <div class="text">￥<span><{$vp.salePrice|convert_price=###}></span>
                                    <p title="<{$vp.name}>"><a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>"><?php echo msubstr( $vp['name'], 0,26 );?></a></p>
                                </div>
                            </div>
                        </a>
                    </li>
                </volist>
            </ul>
            <eq name="show_more" value="true">
                <div class="more-comments" >
                    <a href="javascript:;" class="clearfix" data-action="moreGoods">
                        <span>
                           <img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">点击查看更多商品<em class="iconn-9"></em>
                        </span>
                    </a>
                </div>
            </eq>
        </div>
<else />
    <eq name="type" value="1">
    <div class="no-new">
        <dl class="no-business clearfix">
            <dt><em class="iconn-61"></em></dt>
            <dd><span>该店铺没有商品</span><a href="<{$mall_domain}>search" class="red-big"><span class="red-big">去逛逛<em>>></em></span></a></dd>
        </dl>
    </div>
    </eq>
    <eq name="type" value="7">
        <div class="no-new">
            <dl class="clearfix">
                <dt><em class="iconn-61"></em></dt>
                <dd><span>店铺最近没有热销商品</span><a href="<{$mall_domain}>shop-<{$shopId}>-1.html" class="red-big">逛逛全部商品<em>》</em></a></dd>
            </dl>
        </div>
    </eq>
</if>
</div>
<include file="Home@Front/Public/footer" />