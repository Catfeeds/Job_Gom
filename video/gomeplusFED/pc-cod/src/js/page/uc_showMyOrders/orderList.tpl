{{each list as v}}
<table class="order-prod-info">
  <tbody>
    <tr>
      <td colspan="7" class="order-base-nav">
        <ul class="clearfix">
          <li class="order-number">订单号：<a href="javascript:;" class="color-default">{{v.orderId}}</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td colspan="4" class="order-l clearfix">
        <div class="order-l-list bor-none clearfix"><a target="_blank" href="{{domain.mall_domain}}item/{{v.shopId}}-{{v.sku.item.id}}.html?skuid={{v.sku.id}}"><img onerror="imgError(this);" src="{{v.sku.image}}" class="order-img"></a>
          <div class="parameter"><a target="_blank" href="{{domain.mall_domain}}item/{{v.shopId}}-{{v.sku.item.id}}.html?skuid={{v.sku.id}}">{{v.sku.item.name | substrLen:24}}</a></div>
        </div>
      </td>
      <td class="t-price"><span class="price">￥{{v.sku.price}}</span></td>
      <td class="trading-status"><span class="mb0 font-grey-6">{{if v.hasComment}}已评价{{else}}---{{/if}}</span></td>
      <td class="order-operate">
        <input type="hidden" name="itemJson" value="{{v | strf}}">
        <a href="javascript:;" data-action="showGoods" class="order-blank-btn order-pay-btn">晒商品</a>
      </td>
    </tr>
  </tbody>
</table>
{{/each}}