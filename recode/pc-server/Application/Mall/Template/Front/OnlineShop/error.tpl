<include file="Public:online_shop" />
    <div class="no-new">
        <dl class="no-business clearfix">
            <dt><em class="iconn-61"></em></dt>
            <dd><span><if condition="$shop_status gt 0">该店铺未在营业中<else />该店铺没有商品</if></span><a href="<{$mall_domain}>search" class="red-big"><span class="red-big">去逛逛<em>>></em></span></a></dd>
        </dl>
    </div>
</div>

<include file="Home@Front/Public/footer" />