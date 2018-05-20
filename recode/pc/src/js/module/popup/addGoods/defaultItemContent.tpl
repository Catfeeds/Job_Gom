{{each itemlist}}
    <dl class="merchant-item  clearfix {{(indexof(changedList,$value.skuId) !== -1 ? 'chosed-mer-true':'')}}"
    data-action="item"
    data-pId="{{$value.pId}}"
    data-shopId="{{$value.shopId}}"
    data-link="{{$value.sUrl}}"
    data-skuId="{{$value.skuId}}"
    >
      <dt><img src={{$value.mainImage}} alt="" onerror="imgError(this,'m')"></dt>
      <dd>
        <h4 node-data="itemTitle">{{$value.name}}</h4>
        <span class="itemPrice"><em>￥</em><span node-data="itemPrice">{{$value.skuPrice}}</span></span>
        <!-- {{if $value.rebate > 0}}
        <div class="fan fan-s">
      		<em class="icon-fan-s"></em>
      		<span>最高返{{$value.rebate}}国美币</span>
    	</div>
		{{/if}} -->

      </dd>
    </dl>
    {{/each}}
