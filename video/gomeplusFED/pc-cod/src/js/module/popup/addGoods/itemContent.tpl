{{each itemlist}}
    <dl class="merchant-item  clearfix {{(indexof(changedList,$value.productId) !== -1 ? 'chosed-mer-true':'')}}" data-action="item" data-pId="{{$value.productId}}" data-shopId="{{$value.vshopId}}"><!--  -->
      <dt><img src={{$value.image}} alt=""></dt>
      <dd>
        <h4 node-data="itemTitle">{{$value.title}}</h4><span><em>￥</em><span node-data="itemPrice">{{$value.price}}</span></span>
      </dd>
    </dl>
    {{/each}}