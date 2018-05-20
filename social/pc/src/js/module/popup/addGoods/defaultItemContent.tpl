{{each itemlist}}
    <dl class="merchant-item  clearfix {{(indexof(changedList,$value.item.id) !== -1 ? 'chosed-mer-true':'')}}" data-action="item" data-pId="{{$value.item.id}}" data-shopId="{{$value.shopId}}" >
      <dt><img src={{$value.item.mainImage}} alt=""></dt>
      <dd>
        <h4 node-data="itemTitle">{{$value.item.name}}</h4><span><em>￥</em><span node-data="itemPrice">{{$value.item.price}}</span></span>
      </dd>
    </dl>
    {{/each}}