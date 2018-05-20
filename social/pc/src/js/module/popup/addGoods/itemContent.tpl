{{each itemlist}}
    <dl class="merchant-item  clearfix {{(indexof(changedList,$value.id) !== -1 ? 'chosed-mer-true':'')}}" data-action="item" data-pId="{{$value.id}}" data-shopId="{{$value.shopId}}"><!--  -->
      <dt><img onerror="imgError(this, 'm')" src={{$value.mainImage}} alt=""></dt>
      <dd>
        <h4 node-data="itemTitle">{{$value.name}}</h4><span><em>￥</em><span node-data="itemPrice">{{$value.salePrice}}</span></span>
      </dd>
    </dl>
    {{/each}}