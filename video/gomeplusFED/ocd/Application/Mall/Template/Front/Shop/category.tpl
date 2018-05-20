<include file="Public:shop" />
<if condition="!empty($products)" >
    <if condition="isset($products['totalQuantity'])">
        <!--店铺分类商品模块-->
        <!--店铺分类商品模块 优惠券显示-->
        <?php if($shop['vshopType']==2 && !empty($shop['coupons'])){ ?>
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
                        <img src="<{$vp['item']['mainImage']|getResizeImg=###,230,230}>" alt="<{$vp['item']['name']|htmlspecialchars}>" >
                        <div class="btn-box">
                            <a href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40">立即购买</a>
                            <a href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a></div>
                        <div class="text">￥<span><{$vp['item']['salePrice']|convert_price=###}></span>
                            <p title="<{$vp['item']['name']|htmlspecialchars}>"><{$vp['item']['name']|htmlspecialchars}></p>
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
    <else />
        <div class="shop-list shop-list-bg" data-node="goodsBox">
            <ul class="clearfix">
                <volist name="products" id='vp'>
                    <li>
                        <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>">
                            <div class="mg-negative">
                                <?php if($type==1 || $type==2){ ?>
                                <if condition="$vp['isRebate'] && $vp['isDiscount']">
                                    <eq name="vp.isRebate" value="true" ><em class="icon-fan">返</em></eq>
                                    <else />
                                    <eq name="vp.isRebate" value="true" ><em class="icon-fan">返</em></eq>
                                    <eq name="vp.isDiscount" value="true" ><em class="icon-fan icon-jiang">降</em></eq>
                                </if>
                                <?php } ?>
                                <img src="<{$vp.img|getResizeImg=###,230,230}>" alt="<{$vp.title|htmlspecialchars}>" >
                                <div class="btn-box">
                                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40" data-action="buybtn">立即购买</a>
                                    <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a></div>
                                <div class="text">￥<span><{$vp.orginPrice|show_list_price=###,$vp['price']}></span>
                                    <p title="<{$vp.title|htmlspecialchars}>"><a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$sourceCode}>"><{$vp.title|htmlspecialchars}></a></p>
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
                           <img src="<{$pcimgpath}>/images/circle/small-logo.png">点击查看更多商品<em class="icon icon-right"></em>
                        </span>
                    </a>
                </div>
            </eq>
        </div>
        </if>
<else />
    <eq name="type" value="1">
    <div class="no-new">
        <dl class="no-business clearfix">
            <dt><em class="icon icon-bag">&#xea5f;</em></dt>
            <dd><span>该店铺没有商品</span><a href="<{$mall_domain}>search" class="red-big"><span class="red-big">去逛逛<em>>></em></span></a></dd>
        </dl>
    </div>
    </eq>
    <eq name="type" value="2">
        <div class="no-new">
            <dl class="clearfix">
                <dt><em class="icon icon-bag">&#xea60;</em></dt>
                <dd><span>店铺最近没有更新</span><a href="<{$mall_domain}>shop-<{$shopId}>-1.html" class="red-big">逛逛全部商品<em>》</em></a></dd>
            </dl>
        </div>
    </eq>
    <eq name="type" value="3">
        <div class="no-new">
            <dl class="clearfix">
                <dt><em class="icon icon-bag">&#xe908;</em></dt>
                <dd><span>店铺最近没有特惠</span><a href="<{$mall_domain}>shop-<{$shopId}>-1.html" class="red-big">逛逛全部商品<em>》</em></a></dd>
            </dl>
        </div>
    </eq>
</if>
</div>
<include file="Home@Front/Public/footer" />