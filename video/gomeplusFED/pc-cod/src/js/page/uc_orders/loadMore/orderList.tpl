{{each list as v}}
<table class="order-prod-info">
  <tr>
    <td colspan="7" class="order-base-nav">
      <ul class="clearfix">
        <li class="time">{{v.orderTime}}</li>
        <li class="order-number">订单号：
          {{if v.status == 0}}
          <a href="javascript:;" class="color-default">{{v.mergerId}}</a>
          {{else}}
          <a href="javascript:;" class="color-default">{{v.id}}</a>
          {{/if}}
        </li>
        {{if v.status == 0}}
        <li class="color-default"><em class="icon icon-platform">&#xe9df;</em>
          <a href="javascript:;">国美+购物平台</a>
        </li>
        {{/if}}
      </ul>
    </td>
  </tr>
  <tr>
    <td colspan="4" class="order-l clearfix">
    {{each v.orderItems as vv i}}
      <div class="order-l-list {{if (i+1) == v.orderItems.length}}bor-none{{/if}} clearfix">
        <a target="_blank" href="{{domain.mall_domain}}item/{{v.orderItems[0].mshop.id}}-{{vv.sku.item.id}}.html?skuid={{vv.sku.id}}">
          <img src="{{vv.sku.image}}" onerror="imgError(this);" class="order-img">
        </a>
        <div class="parameter">
          <a target="_blank" href="{{domain.mall_domain}}item/{{v.orderItems[0].mshop.id}}-{{vv.sku.item.id}}.html?skuid={{vv.sku.id}}">{{vv.sku.item.shortName}}</a>
          <p>{{each vv.sku.attributes as attr i}}{{attr.name}}：{{attr.value}}{{if i < vv.sku.attributes.length - 1}}&emsp;{{/if}}{{/each}}</p>
        </div>
        <span class="s-price">￥{{vv.sku.price}}</span>
        <span class="count-num">{{vv.quantity}}</span>
        <div class="connect-shop more" data-node="connect-firm" data-rechange='{"orderid":{{v.id}},"skuid":{{vv.sku.id}},"goodsid":{{vv.sku.item.id}} }'>
          <a href="javascript:;" data-action="ContactMerchant">联系商家</a>
          {{if vv.returnGoodsForSevenDays}}
            <a href="{{domain.i_domain}}order/showDataInfo?orderid={{v.id}}&skuid={{vv.sku.id}}&optype=1&goodid={{vv.sku.item.id}}" >退货</a>
          {{/if}}
          {{if vv.changeGoodsForFifteenDays}}
            <a href="{{domain.i_domain}}order/showDataInfo?orderid={{v.id}}&skuid={{vv.sku.id}}&optype=2&goodid={{vv.sku.item.id}}" >换货</a>
          {{/if}}
        </div>
      </div>
    {{/each}}
    </td>
    <td class="t-price"><span class="price">￥{{v.paymentAmount}}</span>
      <p class="fare">（含运费：￥{{v.shippingCost}}）</p>
    </td>
    <td class="trading-status">
      <span>{{v.statusDesc}}</span>
      {{if v.status == 0}}
      <a target="_blank" href="{{domain.i_domain}}order/detail?id={{v.mergerId}}&type=1">查看详情</a>
      {{else}}
      <a target="_blank" href="{{domain.i_domain}}order/detail?id={{v.id}}">查看详情</a>
      {{/if}}
      <!-- 查看物流 -->
      {{if v.hasLogistics}}
      <a target="_blank" href="{{domain.i_domain}}order/orderLogistics?orderId={{v.id}}&statu={{v.status}}" >查看物流</a>
      {{/if}}
    </td>
    <td class="order-operate">
    {{if v.status == 0}}
      <a target="_blank" href="{{domain.order_domain}}order/payDetail?mergerId={{v.mergerId}}" class="order-blank-btn order-pay-btn marb14">立即支付</a>
      <a href="javascript:;" data-action="unPayCancel" class="order-blank-btn" data-id="{{v.mergerId}}">取消订单</a>
    {{else if v.status == 1}}
      <a class="order-blank-btn" data-action="payedCancel" href="javascript:;" data-id="{{v.id}}" >取消订单</a>
    {{else if v.status == -1}}
      <a class="order-blank-btn order-blank-btn-disabled" data-action="cancelling" href="javascript:;">取消订单</a>
    {{else if v.status == 2}}
      <a href="javascript:;" data-action="confirmReceipt" class="order-blank-btn marb14" data-id="{{v.id}}" >确认收货</a>
      {{if v.allowDelayConfirm == 1}}
      <a href="javascript:;" data-action="delayReceipt" class="order-blank-btn" data-id="{{v.id}}">延迟收货</a>
      {{/if}}
    {{else if v.status == 3 && v.hasComment == 0}}
      <a target="_blank" href="{{domain.i_domain}}order/showCommentInfo?orderid={{v.id}}" class="order-blank-btn">立即评价</a>
    {{else if v.status == -12}}
    {{else if v.status == -5}}
    {{/if}}
    </td>
  </tr>
</table>
{{/each}}