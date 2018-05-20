<include file="Public:shop" />
<if condition="!empty($products)" >
<h2 class="title">全部商品</h2>
<div class="shop-list shop-list-bg" data-node="goodsBox">
    <ul class="clearfix">
        <volist name="products" id='vp'>
        <li>
            <a target="_blank" title="<{$vp['name']}>" href="<{$vp.id|productDetailUrlGen=$shopId,###,$vp['skuId']}>">
                <div class="mg-negative">
                    <?php
                        //这里是返利标识：融合后去掉直降标识
                        $rebateFlag = !empty($vp['rebate']) ? 1 : 0;
                        if($rebateFlag)
                        {
                            echo '<em class="icon-fan">返</em>';
                        }
                    ?>
                    <img onerror="imgError(this)" src="<{$vp['mainImage']|default=''|getResizeImg=###,260,260}>" alt="<{$vp['name']}>" >
                    <div class="btn-box">
                        <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$vp['skuId']}>" class="pc-btn pc-btnh40">立即购买</a>
                        <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$vp['skuId']}>" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
                    </div>
                    <div class="text">￥<span><{$vp['salePrice']|convert_price=###}></span>
                        <p title="<{$vp['name']}>">
                            <a target="_blank" href="<{$vp.id|productDetailUrlGen=$shopId,###,$vp['skuId']}>">
                                <?php echo msubstr( $vp['name'], 0,26 );?>
                            </a>
                        </p>
                    </div>
                </div>
            </a>
        </li>
        </volist>
    </ul>
    <eq name="showMore" value="1">
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
        <dt><em class="iconn-25"></em></dt>
        <dd>
            <p>抱歉，没有找到 “<em><{$shopWord}></em>” 相关的结果<br>建议您尝试其他关键词</p>
        </dd>
    </dl>
</div>
</if>
</div>
<include file="Home@Front/Public/footer" />