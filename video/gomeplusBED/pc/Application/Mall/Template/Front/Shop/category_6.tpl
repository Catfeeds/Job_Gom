<include file="Public:shop" />
        <!--店铺分类商品模块-->
        <!--店铺分类商品模块 优惠券显示-->
        <?php if(!empty($shop['coupons'])){ ?>
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
        <?php } ?>
        <!--店铺分类商品模块 分类商品list-->
        <h2 class="title"><{$categoryName}></h2>
        <div class="shop-list shop-list-bg">
            <ul class="clearfix">
                <volist name="products.items" id='vp'>
                <li>
                    <a target="_blank" href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>">
                    <div class="mg-negative">
                        <if condition="$vp['promotionMarks']['itemProspectiveRebateAmount'] gt 0">
                            <em class="icon-fan">返</em>
                        </if>
                        <if condition="$vp['item']['discount'] gt 0">
                            <em class="icon-fan icon-jiang">降</em>
                        </if>
                        <img onerror="imgError(this)" src="<{$vp['item']['mainImage']|getResizeImg=###,260,260}>" alt="<{$vp['item']['name']}>" >
                        <div class="btn-box">
                            <a href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40">立即购买</a>
                            <a href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a></div>
                        <div class="text">￥<span><{$vp['item']['salePrice']|convert_price=###}></span>
                            <p title="<{$vp['item']['name']|htmlspecialchars}>"><?php echo msubstr( $vp['item']['name'], 0,26 );?></p>
                        </div>
                    </div>
                    </a>
                </li>
                </volist>
            </ul>
        </div>
        <?php if($show_more===true){ ?>
        <div class="page"><{$link_url}></div>
        <?php }  ?>
</div>

<include file="Home@Front/Public/footer" />