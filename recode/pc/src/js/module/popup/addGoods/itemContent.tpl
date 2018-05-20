{{each itemlist}}
    <dl
        class="merchant-item clearfix {{ (indexof(changedList,$value.skuId) !== -1 ? 'chosed-mer-true':'') }}"
        data-action="item"
        data-pId="{{ $value.pId }}"
        data-link="{{ $value.sUrl }}"
        data-skuId="{{ $value.skuId }}"
        >
        <dt><img src={{ $value.mainImage }} alt="11111"  onerror="imgError(this)"></dt>
        <dd>
            <h4 node-data="itemTitle">{{#$value.name }}</h4>
            <span class="itemPrice"><em>￥</em><span node-data="itemPrice">{{$value.salePrice !== null?$value.salePrice:'暂无售价'}}</span></span>
            <!-- {{if $value.rebateMoney > 0}}
            <div class="fan fan-s">
				<em class="icon-fan-s"></em>
				<span>最高返{{$value.rebateMoney}}国美币</span>
			</div>
            {{/if}} -->
        </dd>
    </dl>
{{/each}}
