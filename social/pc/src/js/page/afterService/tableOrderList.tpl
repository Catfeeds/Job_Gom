  <tr>
    <td class="order-number" data-node="id">{{id}}</td>
    <td data-node="name">{{#shop_name}}</td>
    <td data-node="maijia"><p class="product-name">{{#shop_user}}</p></td>
    <td class="trade-money" data-node ="paymentAmount">￥{{paymentAmount}}</td>
    <td class="refund-money" data-node="totalPrice">{{if totalPrice}}￥{{/if}}{{totalPrice}}</td>
    <td class="type" data-node="type">{{typedesc}}</td>
  
    <td class="time"><span class="date">{{createTime}}</span></td>
  
    <td class="refund" data-node="statusDesc">{{statusDesc}}</td>
    <td><a href="/CustomerInfo/showCustomerInfo?id={{id}}" class="check-detail"  target="_blank" data-id="{{id}}">查看详情</a><a href="javascript:;" class="lh23 {{cilckStyle}}" data-orderid={{orderid}} data-node="typedesc" data-id="{{id}}" >{{showStatus}}</a>
    {{if isThree}}
      <a href="javascript:;" class="lh23 {{cilckStyleTow}}" data-orderid={{orderid}} data-node="typedesc" data-id="{{id}}" >{{showStatusTow}}
    {{/if}}</td>
  </tr>