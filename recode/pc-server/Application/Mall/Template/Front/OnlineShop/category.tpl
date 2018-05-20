<include file="Public:online_shop" />
        <!--店铺分类商品模块-->
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
                        <img onerror="imgError(this)" src="<{$vp['item']['mainImage']|getResizeImg=###,230,230}>" alt="<{$vp['item']['name']}>" >
                        <div class="btn-box">
                            <a href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40">立即购买</a>
                            <a href="<{$vp.itemId|productDetailUrlGen=$shopId,###,$sourceCode}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a></div>
                        <div class="text">￥<span><{$vp['item']['salePrice']|convert_price=###}></span>
                            <p title="<{$vp['item']['name']|htmlspecialchars}>"><?php echo msubstr( $vp['item']['name'], 0,27 );?></p>
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