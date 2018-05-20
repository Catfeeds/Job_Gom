<include file="Public:shop" />
<if condition="!empty($discounted_lists['items'])" >
        <div class="shop-list shop-list-bg" data-node="goodsBox">
            <ul class="clearfix">
                <volist name="discounted_lists.items" id='vp'>
                    <li>
                        <a target="_blank" href="<{$vp.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>">
                            <div class="mg-negative">

                        <?php
                        //if($type==1 || $type==2){

                            //这里是返利和直降标识.
                        if( $vp['item']['promotionMarks']['itemProspectiveRebateAmount'] > 0 && $vp['item']['discount'] > 0 ) {
                                echo '<em class="icon-fan">返</em>';
                            } else {

                                if( $vp['item']['promotionMarks']['itemProspectiveRebateAmount'] > 0 ) {
                                    echo '<em class="icon-fan">返</em>';
                                }

                                if( $vp['item']['discount'] > 0 ) {
                                    echo '<em class="icon-fan icon-jiang">降</em>';
                                }
                            }

                        //}
                        ?>

                                <img onerror="imgError(this)" src="<{$vp.item.mainImage|getResizeImg=###,260,260}>" alt="<{$vp.item.name}>" >
                                <div class="btn-box">
                                    <a target="_blank" href="<{$vp.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                                    <a target="_blank" href="<{$vp.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a></div>
                                <div class="text">￥<span><{$vp.item.salePrice|convert_price=###}></span>
                                    <p title="<{$vp.item.name}>"><a target="_blank" href="<{$vp.item.id|productDetailUrlGen=$shopId,###,$sourceCode}>"><?php echo msubstr( $vp['item']['name'], 0,26 );?></a></p>
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
        <div class="no-new">
            <dl class="clearfix">
                <dt><em class="iconn-60"></em></dt>
                <dd><span>店铺最近没有特惠</span><a href="<{$mall_domain}>shop-<{$shopId}>-1.html" class="red-big">逛逛全部商品<em>》</em></a></dd>
            </dl>
        </div>
</if>
</div>
<include file="Home@Front/Public/footer" />